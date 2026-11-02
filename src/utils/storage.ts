import { UserDataState, ExamResult, Language, ThemeMode } from '../types';

const STORAGE_KEY = 'penndot_driver_exam_state_v1';

function generateRandomSyncCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = 'PA-';
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

function getTodayString(): string {
  const now = new Date();
  return now.toISOString().split('T')[0];
}

export const defaultInitialState: UserDataState = {
  version: 1,
  syncCode: generateRandomSyncCode(),
  lastSynced: null,
  userName: 'Aspirante PennDOT',
  targetExamDate: '',
  streakDays: 1,
  lastStudyDate: getTodayString(),
  bookmarkedQuestionIds: [],
  examHistory: [],
  questionStats: {},
  dailyActivity: {
    [getTodayString()]: {
      date: getTodayString(),
      questionsAnswered: 0,
      examsTaken: 0,
      studyMinutes: 0
    }
  },
  notificationSettings: {
    enabled: true,
    reminderTime: '19:30',
    sound: true,
    dailyTips: true,
    mockAlerts: true
  },
  theme: 'light',
  language: 'es'
};

export function loadUserState(): UserDataState {
  if (typeof window === 'undefined') return defaultInitialState;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      saveUserState(defaultInitialState);
      return defaultInitialState;
    }
    const parsed = JSON.parse(raw) as UserDataState;
    // Verify & update daily streak
    const today = getTodayString();
    if (parsed.lastStudyDate !== today) {
      const last = new Date(parsed.lastStudyDate).getTime();
      const curr = new Date(today).getTime();
      const diffDays = Math.round((curr - last) / (1000 * 3600 * 24));
      if (diffDays === 1) {
        parsed.streakDays += 1;
      } else if (diffDays > 1) {
        parsed.streakDays = 1;
      }
      parsed.lastStudyDate = today;
      if (!parsed.dailyActivity[today]) {
        parsed.dailyActivity[today] = {
          date: today,
          questionsAnswered: 0,
          examsTaken: 0,
          studyMinutes: 0
        };
      }
      saveUserState(parsed);
    }
    return parsed;
  } catch (e) {
    console.error('Failed to load local state:', e);
    return defaultInitialState;
  }
}

export function saveUserState(state: UserDataState): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save state to localStorage:', e);
  }
}

// Record an exam completion
export function recordExamResult(
  currentState: UserDataState,
  result: ExamResult
): UserDataState {
  const today = getTodayString();
  const nextState: UserDataState = {
    ...currentState,
    examHistory: [result, ...currentState.examHistory],
    lastStudyDate: today,
    questionStats: { ...currentState.questionStats }
  };

  // Update question stats
  result.answers.forEach(ans => {
    const prev = nextState.questionStats[ans.questionId] || {
      attempts: 0,
      correct: 0,
      lastAnsweredCorrect: false,
      lastSeenAt: new Date().toISOString()
    };
    nextState.questionStats[ans.questionId] = {
      attempts: prev.attempts + 1,
      correct: prev.correct + (ans.correct ? 1 : 0),
      lastAnsweredCorrect: ans.correct,
      lastSeenAt: new Date().toISOString()
    };
  });

  // Daily activity update
  const todayActivity = nextState.dailyActivity[today] || {
    date: today,
    questionsAnswered: 0,
    examsTaken: 0,
    studyMinutes: 0
  };

  nextState.dailyActivity[today] = {
    ...todayActivity,
    questionsAnswered: todayActivity.questionsAnswered + result.total,
    examsTaken: todayActivity.examsTaken + 1,
    studyMinutes: todayActivity.studyMinutes + Math.round(result.timeTakenSeconds / 60)
  };

  saveUserState(nextState);
  return nextState;
}

// Record single question practice answer
export function recordQuestionAnswer(
  currentState: UserDataState,
  questionId: string,
  isCorrect: boolean
): UserDataState {
  const today = getTodayString();
  const prev = currentState.questionStats[questionId] || {
    attempts: 0,
    correct: 0,
    lastAnsweredCorrect: false,
    lastSeenAt: new Date().toISOString()
  };

  const todayActivity = currentState.dailyActivity[today] || {
    date: today,
    questionsAnswered: 0,
    examsTaken: 0,
    studyMinutes: 0
  };

  const nextState: UserDataState = {
    ...currentState,
    lastStudyDate: today,
    questionStats: {
      ...currentState.questionStats,
      [questionId]: {
        attempts: prev.attempts + 1,
        correct: prev.correct + (isCorrect ? 1 : 0),
        lastAnsweredCorrect: isCorrect,
        lastSeenAt: new Date().toISOString()
      }
    },
    dailyActivity: {
      ...currentState.dailyActivity,
      [today]: {
        ...todayActivity,
        questionsAnswered: todayActivity.questionsAnswered + 1
      }
    }
  };

  saveUserState(nextState);
  return nextState;
}

// Toggle Bookmark
export function toggleBookmarkQuestion(
  currentState: UserDataState,
  questionId: string
): UserDataState {
  const exists = currentState.bookmarkedQuestionIds.includes(questionId);
  const nextBookmarks = exists
    ? currentState.bookmarkedQuestionIds.filter(id => id !== questionId)
    : [...currentState.bookmarkedQuestionIds, questionId];

  const nextState = {
    ...currentState,
    bookmarkedQuestionIds: nextBookmarks
  };
  saveUserState(nextState);
  return nextState;
}

// Cloud Sync Helpers
export async function pushStateToCloud(state: UserDataState): Promise<{ success: boolean; updatedAt?: string; error?: string }> {
  try {
    const res = await fetch(`/api/sync/${state.syncCode}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: state })
    });
    if (!res.ok) {
      throw new Error(`Sync failed with status: ${res.status}`);
    }
    const result = await res.json();
    const updatedState = { ...state, lastSynced: result.updatedAt };
    saveUserState(updatedState);
    return { success: true, updatedAt: result.updatedAt };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error syncing to cloud';
    return { success: false, error: message };
  }
}

export async function pullStateFromCloud(code: string): Promise<{ success: boolean; data?: UserDataState; error?: string }> {
  try {
    const res = await fetch(`/api/sync/${code.toUpperCase().trim()}`);
    if (!res.ok) {
      if (res.status === 404) {
        return { success: false, error: 'Código de sincronización no encontrado / Sync code not found' };
      }
      throw new Error(`Pull failed with status: ${res.status}`);
    }
    const result = await res.json();
    if (result.data) {
      const merged = { ...result.data, syncCode: code.toUpperCase().trim(), lastSynced: result.updatedAt };
      saveUserState(merged);
      return { success: true, data: merged };
    }
    return { success: false, error: 'Datos no válidos' };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error fetching from cloud';
    return { success: false, error: message };
  }
}

// Export / Import JSON for backup
export function exportDataAsJson(state: UserDataState): void {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(state, null, 2));
  const dlAnchorElem = document.createElement('a');
  dlAnchorElem.setAttribute('href', dataStr);
  dlAnchorElem.setAttribute('download', `penndot_exam_backup_${state.syncCode}_${getTodayString()}.json`);
  dlAnchorElem.click();
}
