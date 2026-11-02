export type Language = 'es' | 'en';

export type ThemeMode = 'light' | 'dark' | 'midnight';

export type QuestionCategory =
  | 'signs'
  | 'traffic_laws'
  | 'safe_driving'
  | 'emergencies'
  | 'alcohol_dui'
  | 'penndot_rules'
  | 'work_zone';

export type DifficultyLevel = 'easy' | 'normal' | 'hard';

export interface Question {
  id: string;
  chapter: 1 | 2 | 3 | 4 | 5;
  category: QuestionCategory;
  difficulty?: DifficultyLevel;
  textEs: string;
  textEn: string;
  optionsEs: string[];
  optionsEn: string[];
  correctAnswer: number; // 0-based index
  explanationEs: string;
  explanationEn: string;
  manualRef: string;
  signId?: string; // Optional sign reference
  isHighProbability?: boolean; // Most frequent question on PennDOT official exams
  probabilityReasonEs?: string;
  probabilityReasonEn?: string;
}

export type SignCategory =
  | 'regulatory'
  | 'warning'
  | 'guide'
  | 'work_zone'
  | 'pavement_markings';

export interface TrafficSign {
  id: string;
  category: SignCategory;
  titleEs: string;
  titleEn: string;
  descriptionEs: string;
  descriptionEn: string;
  actionEs: string;
  actionEn: string;
  shape: string;
  color: string;
  manualPage: number;
}

export interface ExamAnswerRecord {
  questionId: string;
  selectedAnswer: number;
  correct: boolean;
}

export interface ExamResult {
  id: string;
  date: string;
  mode: 'real_exam' | 'practice_chapter' | 'signs_marathon' | 'mistakes_review';
  difficulty?: DifficultyLevel;
  terminatedDueToErrors?: boolean;
  score: number;
  total: number;
  percentage: number;
  passed: boolean;
  timeTakenSeconds: number;
  chapterBreakdown: Record<number, { correct: number; total: number }>;
  answers: ExamAnswerRecord[];
}

export interface NotificationSettings {
  enabled: boolean;
  reminderTime: string; // e.g. "20:00"
  sound: boolean;
  dailyTips: boolean;
  mockAlerts: boolean;
}

export interface UserStats {
  attempts: number;
  correct: number;
  lastAnsweredCorrect: boolean;
  lastSeenAt: string;
}

export interface DailyActivityItem {
  date: string; // YYYY-MM-DD
  questionsAnswered: number;
  examsTaken: number;
  studyMinutes: number;
}

export interface UserDataState {
  version: number;
  syncCode: string;
  lastSynced: string | null;
  userName: string;
  targetExamDate: string;
  streakDays: number;
  lastStudyDate: string; // YYYY-MM-DD
  bookmarkedQuestionIds: string[];
  examHistory: ExamResult[];
  questionStats: Record<string, UserStats>;
  dailyActivity: Record<string, DailyActivityItem>;
  notificationSettings: NotificationSettings;
  theme: ThemeMode;
  language: Language;
}

export interface ForumComment {
  id: string;
  author: string;
  authorLocation: string;
  content: string;
  createdAt: string;
  likes: number;
}

export interface ForumPost {
  id: string;
  title: string;
  category: 'exam_tips' | 'signs' | 'penndot_centers' | 'rules' | 'general';
  center?: string;
  content: string;
  author: string;
  authorCity: string;
  createdAt: string;
  likes: number;
  comments: ForumComment[];
}
