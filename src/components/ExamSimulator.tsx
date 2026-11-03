import React, { useState, useEffect, useRef } from 'react';
import {
  Car,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RotateCcw,
  Volume2,
  Bookmark,
  Award,
  ChevronRight,
  ChevronLeft,
  Languages,
  BookCheck,
  Check,
  Maximize2,
  ShieldAlert,
  Zap,
  Flame,
  ShieldX,
  Heart,
  BookOpen,
  Lightbulb,
  Info
} from 'lucide-react';
import { Question, Language, ExamResult, UserDataState, DifficultyLevel } from '../types';
import { generatePennDOTMockExam } from '../data/questionsData';
import { RoadSignSvg } from './RoadSignSvg';
import { PassingBadgeCertificate } from './PassingBadgeCertificate';
import { sound } from '../utils/sound';
import { tts } from '../utils/speech';
import { recordExamResult, toggleBookmarkQuestion } from '../utils/storage';

interface ExamSimulatorProps {
  language: Language;
  userState: UserDataState;
  setUserState: React.Dispatch<React.SetStateAction<UserDataState>>;
  onGoToPractice: () => void;
  onOpenDonations?: () => void;
}

const MAX_ERRORS_ALLOWED = 4;

const DIFFICULTY_DURATIONS: Record<DifficultyLevel, number> = {
  easy: 30 * 60, // 30 minutes
  normal: 25 * 60, // 25 minutes
  hard: 15 * 60 // 15 minutes
};

export const ExamSimulator: React.FC<ExamSimulatorProps> = ({
  language,
  userState,
  setUserState,
  onGoToPractice,
  onOpenDonations
}) => {
  const isEs = language === 'es';

  // Exam state
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('normal');
  const [examStarted, setExamStarted] = useState<boolean>(false);
  const [examFinished, setExamFinished] = useState<boolean>(false);
  const [terminatedDueToErrors, setTerminatedDueToErrors] = useState<boolean>(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [secondsRemaining, setSecondsRemaining] = useState<number>(DIFFICULTY_DURATIONS.normal);
  const [isTimerPaused, setIsTimerPaused] = useState<boolean>(false);
  const [activeQuestionLang, setActiveQuestionLang] = useState<Language>(language);
  const [filterMissedOnly, setFilterMissedOnly] = useState<boolean>(false);
  const [zoomedSignId, setZoomedSignId] = useState<string | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Sync internal question language with global language on mount or prop change
  useEffect(() => {
    setActiveQuestionLang(language);
  }, [language]);

  // Timer countdown
  useEffect(() => {
    if (examStarted && !examFinished && !isTimerPaused) {
      timerRef.current = setInterval(() => {
        setSecondsRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            finishExam(false, userAnswers);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [examStarted, examFinished, isTimerPaused, userAnswers]);

  // Calculate error count in real time
  const currentErrors = Object.entries(userAnswers).reduce((acc, [idxStr, ans]) => {
    const qIdx = Number(idxStr);
    if (questions[qIdx] && ans !== questions[qIdx].correctAnswer) {
      return acc + 1;
    }
    return acc;
  }, 0);

  const startNewExam = (customQuestions?: Question[], diff: DifficultyLevel = difficulty) => {
    tts.stop();
    setDifficulty(diff);
    const qs = customQuestions || generatePennDOTMockExam(diff);
    const duration = DIFFICULTY_DURATIONS[diff];
    setQuestions(qs);
    setCurrentIndex(0);
    setUserAnswers({});
    setSecondsRemaining(duration);
    setIsTimerPaused(false);
    setExamStarted(true);
    setExamFinished(false);
    setTerminatedDueToErrors(false);
    setFilterMissedOnly(false);
    sound.playCorrect();
  };

  const handleSelectOption = (optionIndex: number) => {
    if (examFinished) return;

    const nextAnswers = {
      ...userAnswers,
      [currentIndex]: optionIndex
    };
    setUserAnswers(nextAnswers);

    const isCorrect = optionIndex === questions[currentIndex].correctAnswer;
    if (isCorrect) {
      sound.playCorrect();
    } else {
      sound.playIncorrect();
    }

    // Check errors count
    let totalErrors = 0;
    Object.entries(nextAnswers).forEach(([idxStr, ans]) => {
      const qIdx = Number(idxStr);
      if (questions[qIdx] && ans !== questions[qIdx].correctAnswer) {
        totalErrors++;
      }
    });

    // Automatically terminate exam immediately if 4 errors reached!
    if (totalErrors >= MAX_ERRORS_ALLOWED) {
      if (timerRef.current) clearInterval(timerRef.current);
      finishExam(true, nextAnswers);
      return;
    }

    // Auto advance to next unanswered question after a brief delay if not last question
    if (currentIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
      }, 400);
    }
  };

  const finishExam = (isTerminatedByErrors = false, finalAnswers = userAnswers) => {
    if (timerRef.current) clearInterval(timerRef.current);
    tts.stop();

    let score = 0;
    const chapterBreakdown: Record<number, { correct: number; total: number }> = {};

    const answerRecords = questions.map((q, idx) => {
      const selected = finalAnswers[idx] ?? -1;
      const correct = selected === q.correctAnswer;
      if (correct) score += 1;

      if (!chapterBreakdown[q.chapter]) {
        chapterBreakdown[q.chapter] = { correct: 0, total: 0 };
      }
      chapterBreakdown[q.chapter].total += 1;
      if (correct) chapterBreakdown[q.chapter].correct += 1;

      return {
        questionId: q.id,
        selectedAnswer: selected,
        correct
      };
    });

    // PennDOT official standard: 15 / 18 (83.3%)
    const passed = !isTerminatedByErrors && score >= 15;
    const percentage = Math.round((score / questions.length) * 100);
    const totalDuration = DIFFICULTY_DURATIONS[difficulty];
    const timeSpent = Math.max(1, totalDuration - secondsRemaining);

    const examResult: ExamResult = {
      id: `exam-${Date.now()}`,
      date: new Date().toISOString(),
      mode: 'real_exam',
      difficulty,
      terminatedDueToErrors: isTerminatedByErrors,
      score,
      total: questions.length,
      percentage,
      passed,
      timeTakenSeconds: timeSpent,
      chapterBreakdown,
      answers: answerRecords
    };

    const nextState = recordExamResult(userState, examResult);
    setUserState(nextState);

    setTerminatedDueToErrors(isTerminatedByErrors);
    setExamFinished(true);

    if (passed) {
      sound.playExamPass();
    } else {
      sound.playIncorrect();
    }
  };

  const handleToggleBookmark = (qid: string) => {
    const nextState = toggleBookmarkQuestion(userState, qid);
    setUserState(nextState);
  };

  const handleReadAloud = (q: Question) => {
    const textToRead =
      activeQuestionLang === 'es'
        ? `${q.textEs}. Opción A: ${q.optionsEs[0]}. Opción B: ${q.optionsEs[1]}. Opción C: ${q.optionsEs[2]}. Opción D: ${q.optionsEs[3]}.`
        : `${q.textEn}. Option A: ${q.optionsEn[0]}. Option B: ${q.optionsEn[1]}. Option C: ${q.optionsEn[2]}. Option D: ${q.optionsEn[3]}.`;
    tts.speak(textToRead, activeQuestionLang);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Welcome / Launch Screen
  if (!examStarted) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl overflow-hidden p-6 sm:p-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
            <div className="flex items-center gap-4">
              <img
                src="/assets/aistudio/PennDOT_PA_Driver_Exam_Pro_5c27bcf0.png"
                alt="PennDOT PA Driver Exam Pro"
                className="w-16 h-16 rounded-2xl object-contain shadow-lg shadow-blue-500/25 shrink-0 border border-slate-200 dark:border-slate-700 bg-blue-950 p-1"
              />
              <div>
                <span className="text-xs font-bold tracking-wider uppercase text-blue-600 dark:text-blue-400">
                  {isEs ? 'Simulador Oficial de Examen' : 'Official Knowledge Exam Simulator'}
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  PennDOT Driver License Test
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 border border-amber-300 dark:border-amber-700">
                {isEs ? 'Manual PUB 95' : 'Official PA PUB 95'}
              </span>
            </div>
          </div>

          {/* Test specifications according to PennDOT PA Driver's Manual */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                {isEs ? 'Total de Preguntas' : 'Total Questions'}
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                18 {isEs ? 'Preguntas' : 'Questions'}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                {isEs ? 'Formato oficial de Pensilvania' : 'Official PA format'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800">
              <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                {isEs ? 'Puntaje Para Aprobar' : 'Passing Score'}
              </div>
              <div className="text-2xl font-black text-emerald-800 dark:text-emerald-300 mt-1">
                15 / 18 (83.3%)
              </div>
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1">
                {isEs ? 'Mínimo oficial requerido' : 'Official minimum passing'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800">
              <div className="text-xs font-semibold text-rose-700 dark:text-rose-400">
                {isEs ? 'Máximo de Errores' : 'Maximum Errors'}
              </div>
              <div className="text-2xl font-black text-rose-700 dark:text-rose-300 mt-1">
                4 {isEs ? 'Errores' : 'Errors'}
              </div>
              <p className="text-[11px] text-rose-600 dark:text-rose-400 mt-1">
                {isEs ? 'Termina automáticamente' : 'Auto-fails on 4th error'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                {isEs ? 'Tiempo Límite' : 'Time Limit'}
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                {Math.floor(DIFFICULTY_DURATIONS[difficulty] / 60)} {isEs ? 'Min' : 'Min'}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                {isEs ? 'Según dificultad elegida' : 'Based on chosen difficulty'}
              </p>
            </div>
          </div>

          {/* Difficulty Selection Section */}
          <div className="mb-8">
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-500" />
              <span>{isEs ? 'Selecciona el Nivel de Dificultad:' : 'Select Difficulty Level:'}</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              {isEs
                ? 'Elige tu nivel de preparación. Todos los modos finalizan automáticamente si acumulas 4 errores.'
                : 'Choose your preparation level. All modes automatically end if you make 4 errors.'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Easy */}
              <div
                onClick={() => setDifficulty('easy')}
                className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                  difficulty === 'easy'
                    ? 'border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/40 shadow-md ring-2 ring-emerald-400/30'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/40 hover:border-emerald-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300">
                      {isEs ? 'Fácil' : 'Easy'}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-400">30 min</span>
                  </div>
                  <h4 className="font-extrabold text-base text-slate-900 dark:text-white mb-1">
                    {isEs ? 'Modo Aprendiz' : 'Learner Mode'}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {isEs
                      ? 'Énfasis en señales visuales primarias, semáforos y reglas de seguridad esenciales. Más tiempo para responder.'
                      : 'Focuses on core road signs, signals, and essential safe driving rules. Generous 30-min clock.'}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-emerald-200/60 dark:border-emerald-900/40 text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
                  {isEs ? '✓ Máx. 4 errores permitidos' : '✓ Max 4 errors allowed'}
                </div>
              </div>

              {/* Normal */}
              <div
                onClick={() => setDifficulty('normal')}
                className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                  difficulty === 'normal'
                    ? 'border-blue-500 bg-blue-50/60 dark:bg-blue-950/40 shadow-md ring-2 ring-blue-400/30'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/40 hover:border-blue-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black uppercase px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300">
                      {isEs ? 'Normal' : 'Standard'}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-400">25 min</span>
                  </div>
                  <h4 className="font-extrabold text-base text-slate-900 dark:text-white mb-1">
                    {isEs ? 'Examen Oficial PennDOT' : 'Official PennDOT'}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {isEs
                      ? 'Simulación exacta del quiosco de PennDOT. Distribución balanceada oficial y tiempo reglamentario de 25 min.'
                      : 'Exact simulation of PA PennDOT touchscreen exam. Balanced official topics with 25-min timer.'}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-blue-200/60 dark:border-blue-900/40 text-[11px] font-bold text-blue-700 dark:text-blue-400">
                  {isEs ? '✓ Estándar Oficial PA PUB 95' : '✓ PA PUB 95 Standard'}
                </div>
              </div>

              {/* Hard */}
              <div
                onClick={() => setDifficulty('hard')}
                className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                  difficulty === 'hard'
                    ? 'border-rose-500 bg-rose-50/60 dark:bg-rose-950/40 shadow-md ring-2 ring-rose-400/30'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/40 hover:border-rose-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black uppercase px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-300">
                      {isEs ? 'Difícil' : 'Hard'}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-400">15 min</span>
                  </div>
                  <h4 className="font-extrabold text-base text-slate-900 dark:text-white mb-1">
                    {isEs ? 'Reto Experto' : 'Expert Challenge'}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {isEs
                      ? 'Preguntas complejas de leyes de DUI, BAC, sanciones por puntos, excepciones en autopistas y límite de 15 min.'
                      : 'Technical questions on DUI tiers, points, suspension laws, highway exceptions, under tight 15-min clock.'}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-rose-200/60 dark:border-rose-900/40 text-[11px] font-bold text-rose-700 dark:text-rose-400">
                  {isEs ? '⚡ Contrarreloj 15 minutos' : '⚡ 15-Minute Countdown'}
                </div>
              </div>
            </div>
          </div>

          {/* 4-Errors Warning Rule Alert */}
          <div className="bg-rose-50 dark:bg-rose-950/30 border-2 border-rose-300 dark:border-rose-800/60 rounded-xl p-5 mb-8 flex items-start gap-3">
            <ShieldX className="w-6 h-6 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-extrabold text-sm text-rose-900 dark:text-rose-300">
                {isEs ? 'Regla Estricta de 4 Errores (PennDOT Oficial)' : 'Strict 4-Mistake Rule (PennDOT Official)'}
              </h4>
              <p className="text-xs sm:text-sm text-rose-800 dark:text-rose-200 mt-1 leading-relaxed">
                {isEs
                  ? 'Para aprobar necesitas 15 aciertos de 18 (83.3%). Si acumulas 4 respuestas incorrectas, el sistema terminará inmediatamente el examen de forma automática y mostrará tus resultados.'
                  : 'You must answer 15 out of 18 correctly to pass. If you reach 4 incorrect answers, the test immediately ends automatically and displays your final score.'}
              </p>
            </div>
          </div>

          {/* Start Exam Button */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={() => startNewExam()}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-base shadow-lg shadow-blue-500/25 flex items-center justify-center gap-3 cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Car className="w-5 h-5" />
              <span>
                {isEs
                  ? `COMENZAR SIMULACRO (${difficulty.toUpperCase()})`
                  : `START SIMULATION (${difficulty.toUpperCase()})`}
              </span>
              <ChevronRight className="w-5 h-5" />
            </button>

            <button
              onClick={onGoToPractice}
              className="w-full sm:w-auto px-6 py-4 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-sm transition-colors text-center"
            >
              {isEs ? 'Practicar por temas primero' : 'Practice by topic first'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Finished / Results Screen
  if (examFinished) {
    let score = 0;
    questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctAnswer) score++;
    });

    const passed = !terminatedDueToErrors && score >= 15;
    const percentage = Math.round((score / questions.length) * 100);
    const missedQuestions = questions.filter((q, idx) => userAnswers[idx] !== undefined && userAnswers[idx] !== q.correctAnswer);
    const questionsToDisplay = filterMissedOnly ? missedQuestions : questions;
    const totalDuration = DIFFICULTY_DURATIONS[difficulty];

    return (
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-10 mb-8">
          {/* Automatic Termination Notice if 4 mistakes reached */}
          {terminatedDueToErrors && (
            <div className="mb-8 p-6 rounded-2xl bg-rose-600 text-white shadow-xl animate-fadeIn flex flex-col sm:flex-row items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                <ShieldX className="w-8 h-8 text-white animate-pulse" />
              </div>
              <div>
                <h3 className="text-xl font-black">
                  {isEs
                    ? '🛑 EXAMEN TERMINADO AUTOMÁTICAMENTE: 4 ERRORES ALCANZADOS'
                    : '🛑 TEST AUTOMATICALLY TERMINATED: 4 ERRORS REACHED'}
                </h3>
                <p className="text-xs sm:text-sm text-rose-100 mt-1 leading-relaxed">
                  {isEs
                    ? 'Has cometido 4 errores. PennDOT exige aprobar con al menos 15 aciertos de 18 (83.3%). Al fallar 4 preguntas, ya no es matemáticamente posible aprobar en este intento.'
                    : 'You have reached 4 incorrect answers. PennDOT mandates 15 correct answers out of 18 (83.3%) to pass. With 4 mistakes, passing is mathematically impossible on this attempt.'}
                </p>
              </div>
            </div>
          )}

          {/* Certificate / Result Header */}
          <div
            className={`text-center p-8 rounded-2xl border-2 mb-8 ${
              passed
                ? 'bg-gradient-to-b from-emerald-50 to-white dark:from-emerald-950/40 dark:to-slate-900 border-emerald-400 dark:border-emerald-700'
                : 'bg-gradient-to-b from-rose-50 to-white dark:from-rose-950/40 dark:to-slate-900 border-rose-300 dark:border-rose-800'
            }`}
          >
            <div className="inline-flex p-4 rounded-2xl mb-4 shadow-md bg-white dark:bg-slate-800">
              {passed ? (
                <Award className="w-16 h-16 text-emerald-500 animate-bounce" />
              ) : (
                <AlertTriangle className="w-16 h-16 text-rose-500" />
              )}
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white">
              {passed
                ? isEs
                  ? '¡FELICITACIONES! HAS APROBADO'
                  : 'CONGRATULATIONS! YOU PASSED'
                : isEs
                ? 'NO APROBADO — REPASAR Y REINTENTAR'
                : 'DID NOT PASS — REVIEW & RETAKE'}
            </h2>

            <div className="flex items-center justify-center gap-2 mt-2">
              <span className="text-xs font-bold px-3 py-1 rounded-full uppercase bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                {isEs ? 'Dificultad:' : 'Difficulty:'} {difficulty.toUpperCase()}
              </span>
            </div>

            <p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 mt-2 max-w-lg mx-auto">
              {passed
                ? isEs
                  ? 'Cumples con el estándar oficial de PennDOT para obtener tu permiso de aprendiz no comercial.'
                  : 'You met the official PennDOT standard required to earn your non-commercial learner permit.'
                : isEs
                ? 'Revisa abajo las preguntas que fallaste con la explicación oficial del manual de Pensilvania.'
                : 'Review the questions you missed below with the official PA manual citations.'}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-6">
              <div className="text-center px-4 py-2 bg-white/80 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 min-w-[110px]">
                <span className="text-xs text-slate-500 dark:text-slate-400">{isEs ? 'Aciertos' : 'Score'}</span>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                  {score} / {questions.length}
                </div>
              </div>

              <div className="text-center px-4 py-2 bg-white/80 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 min-w-[110px]">
                <span className="text-xs text-slate-500 dark:text-slate-400">{isEs ? 'Errores' : 'Mistakes'}</span>
                <div
                  className={`text-2xl sm:text-3xl font-black ${
                    missedQuestions.length >= MAX_ERRORS_ALLOWED ? 'text-rose-600' : 'text-slate-800 dark:text-slate-200'
                  }`}
                >
                  {missedQuestions.length} / {MAX_ERRORS_ALLOWED}
                </div>
              </div>

              <div className="text-center px-4 py-2 bg-white/80 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 min-w-[110px]">
                <span className="text-xs text-slate-500 dark:text-slate-400">{isEs ? 'Porcentaje' : 'Percentage'}</span>
                <div
                  className={`text-2xl sm:text-3xl font-black ${
                    passed ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                  }`}
                >
                  {percentage}%
                </div>
              </div>

              <div className="text-center px-4 py-2 bg-white/80 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 min-w-[110px]">
                <span className="text-xs text-slate-500 dark:text-slate-400">{isEs ? 'Tiempo Empleado' : 'Time Used'}</span>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono">
                  {formatTime(totalDuration - secondsRemaining)}
                </div>
              </div>
            </div>
          </div>

          {/* Celebratory Achievement Badge with High-Res PNG Download (When Passed) */}
          {passed && (
            <PassingBadgeCertificate
              score={score}
              totalQuestions={questions.length}
              missedCount={missedQuestions.length}
              percentage={percentage}
              difficulty={difficulty}
              durationSeconds={totalDuration - secondsRemaining}
              language={language}
            />
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-6 mb-6">
            <button
              onClick={() => startNewExam(undefined, difficulty)}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md flex items-center gap-2 cursor-pointer transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{isEs ? 'Reintentar Examen' : 'Retake Exam'}</span>
            </button>

            {missedQuestions.length > 0 && (
              <button
                onClick={() => startNewExam(missedQuestions, difficulty)}
                className="px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm shadow-md flex items-center gap-2 cursor-pointer transition-all"
              >
                <AlertTriangle className="w-4 h-4" />
                <span>
                  {isEs
                    ? `Reintentar solo las falladas (${missedQuestions.length})`
                    : `Retake Missed Only (${missedQuestions.length})`}
                </span>
              </button>
            )}

            <button
              onClick={() => setFilterMissedOnly(prev => !prev)}
              className={`px-5 py-3 rounded-xl border font-bold text-sm transition-colors cursor-pointer ${
                filterMissedOnly
                  ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 text-rose-700 dark:text-rose-300'
                  : 'border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {filterMissedOnly
                ? isEs ? 'Ver todas las preguntas' : 'Show all questions'
                : isEs ? `Filtrar solo incorrectas (${missedQuestions.length})` : `Filter missed only (${missedQuestions.length})`}
            </button>

            {onOpenDonations && (
              <button
                onClick={onOpenDonations}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-extrabold text-sm shadow-md flex items-center gap-2 cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Heart className="w-4 h-4 fill-white text-white" />
                <span>{isEs ? 'Donar (Zelle / Cripto)' : 'Donate (Zelle / Crypto)'}</span>
              </button>
            )}
          </div>

          {/* DEDICATED SECTION: Resumen de Errores con su Explicación */}
          {missedQuestions.length > 0 ? (
            <div className="mb-10 p-6 sm:p-8 rounded-2xl bg-rose-50/70 dark:bg-rose-950/20 border-2 border-rose-300 dark:border-rose-900/80 shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-rose-200 dark:border-rose-900/50 pb-5 mb-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black uppercase bg-rose-200 text-rose-900 dark:bg-rose-900/80 dark:text-rose-200 mb-2">
                    <ShieldX className="w-4 h-4 text-rose-700 dark:text-rose-300" />
                    <span>
                      {isEs
                        ? `Resumen de Errores: ${missedQuestions.length} de ${MAX_ERRORS_ALLOWED} permitidos`
                        : `Mistakes Summary: ${missedQuestions.length} of ${MAX_ERRORS_ALLOWED} allowed`}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                    {isEs
                      ? 'Resumen de Errores con su Explicación Oficial (PennDOT PUB 95)'
                      : 'Mistakes Summary & Official PennDOT Explanations (PUB 95)'}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
                    {isEs
                      ? 'Estudia minuciosamente por qué fallaste, la norma oficial del estado de Pensilvania y la regla clave para el volante.'
                      : 'Carefully study why your answer was wrong, the official Pennsylvania standard, and the key driving rule.'}
                  </p>
                </div>

                {onOpenDonations && (
                  <button
                    onClick={onOpenDonations}
                    className="self-start sm:self-auto px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-rose-300 dark:border-rose-700 text-rose-700 dark:text-rose-300 font-bold text-xs flex items-center gap-1.5 shadow-sm hover:bg-rose-100 dark:hover:bg-rose-900/40 transition-colors cursor-pointer"
                  >
                    <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                    <span>{isEs ? 'Apoyar con Zelle / Cripto' : 'Support via Zelle / Crypto'}</span>
                  </button>
                )}
              </div>

              {/* List of mistakes with detailed explanation cards */}
              <div className="space-y-6">
                {missedQuestions.map((q, errIdx) => {
                  const originalIndex = questions.findIndex(orig => orig.id === q.id);
                  const selected = userAnswers[originalIndex] ?? -1;
                  const options = activeQuestionLang === 'es' ? q.optionsEs : q.optionsEn;
                  const userPickedText = selected >= 0 ? options[selected] : (isEs ? 'Sin respuesta / No contestada' : 'No answer');
                  const correctText = options[q.correctAnswer];

                  return (
                    <div
                      key={`mistake-${q.id}`}
                      className="bg-white dark:bg-slate-900 rounded-2xl border-2 border-rose-200 dark:border-rose-900/60 p-5 sm:p-6 shadow-md transition-all hover:border-rose-400"
                    >
                      {/* Header */}
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-1 rounded-lg bg-rose-600 text-white font-black text-xs">
                            {isEs ? `Error #${errIdx + 1}` : `Mistake #${errIdx + 1}`}
                          </span>
                          {q.isHighProbability && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-amber-100 text-amber-900 dark:bg-amber-900/60 dark:text-amber-300 border border-amber-300 dark:border-amber-700">
                              ⭐ {isEs ? 'Pregunta Frecuente PennDOT' : 'Frequent Exam Question'}
                            </span>
                          )}
                          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                            {isEs ? `Pregunta ${originalIndex + 1} de ${questions.length}` : `Question ${originalIndex + 1} of ${questions.length}`}
                          </span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                            {isEs ? `Capítulo ${q.chapter}` : `Chapter ${q.chapter}`}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleReadAloud(q)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                            title="Escuchar / Listen"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleToggleBookmark(q.id)}
                            className={`p-1.5 rounded-lg cursor-pointer ${
                              userState.bookmarkedQuestionIds.includes(q.id)
                                ? 'text-amber-500'
                                : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                            }`}
                            title="Guardar / Bookmark"
                          >
                            <Bookmark className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Question Prompt */}
                      <h4 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white mb-4">
                        {activeQuestionLang === 'es' ? q.textEs : q.textEn}
                      </h4>

                      {/* Sign Graphic if associated */}
                      {q.signId && (
                        <div className="my-4 flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700">
                          <RoadSignSvg signId={q.signId} size={120} />
                          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mt-2">
                            {isEs ? 'Señal oficial evaluada en esta pregunta' : 'Official road sign evaluated in this question'}
                          </span>
                        </div>
                      )}

                      {/* Visual Comparison: What User Picked vs PennDOT Correct Answer */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                        {/* User's Incorrect Selection */}
                        <div className="p-3.5 rounded-xl border-2 border-rose-400 bg-rose-50/90 dark:bg-rose-950/50 text-rose-950 dark:text-rose-200">
                          <div className="flex items-center gap-2 mb-1.5">
                            <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                            <span className="text-xs font-black uppercase tracking-wider text-rose-700 dark:text-rose-300">
                              {isEs ? 'Tu Respuesta (Incorrecta):' : 'Your Answer (Incorrect):'}
                            </span>
                          </div>
                          <div className="text-xs sm:text-sm font-semibold pl-6">
                            {userPickedText}
                          </div>
                        </div>

                        {/* PennDOT Correct Choice */}
                        <div className="p-3.5 rounded-xl border-2 border-emerald-400 bg-emerald-50/90 dark:bg-emerald-950/50 text-emerald-950 dark:text-emerald-200">
                          <div className="flex items-center gap-2 mb-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                            <span className="text-xs font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                              {isEs ? 'Respuesta Correcta PennDOT:' : 'Correct PennDOT Answer:'}
                            </span>
                          </div>
                          <div className="text-xs sm:text-sm font-bold pl-6">
                            {correctText}
                          </div>
                        </div>
                      </div>

                      {/* Detailed Official Explanation Box */}
                      <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-slate-800 dark:text-slate-200 mb-3">
                        <div className="flex items-center gap-2 text-xs font-black text-blue-900 dark:text-blue-300 uppercase mb-1.5">
                          <BookCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          <span>{isEs ? 'Explicación Oficial del Manual PennDOT (PUB 95):' : 'Official PennDOT Manual Explanation (PUB 95):'}</span>
                        </div>
                        <p className="text-xs sm:text-sm leading-relaxed">
                          {activeQuestionLang === 'es' ? q.explanationEs : q.explanationEn}
                        </p>
                        <div className="mt-2 text-xs font-mono font-bold text-blue-700 dark:text-blue-400 flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>{isEs ? 'Referencia Oficial:' : 'Official Reference:'} {q.manualRef}</span>
                        </div>
                      </div>

                      {/* Key Takeaway Rule for Safe Driving */}
                      <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs flex items-start gap-2.5">
                        <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-extrabold">{isEs ? 'Regla Clave PennDOT: ' : 'PennDOT Key Rule: '}</span>
                          <span>
                            {isEs
                              ? 'Aprende y aplica esta norma oficial para garantizar tu aprobación en el examen teórico y conducir con total seguridad.'
                              : 'Learn and apply this official standard to guarantee passing the knowledge test and driving safely.'}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="mb-8 p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border-2 border-emerald-400 dark:border-emerald-700 text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 flex items-center justify-center mx-auto mb-2">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-emerald-900 dark:text-emerald-200">
                {isEs ? '¡Cero Errores! Examen Perfecto' : 'Zero Mistakes! Perfect Exam'}
              </h3>
              <p className="text-xs sm:text-sm text-emerald-800 dark:text-emerald-300 mt-1 max-w-md mx-auto">
                {isEs
                  ? 'No has cometido ningún error en este simulacro. Tienes un dominio total de las normas del Manual de Conductor de Pensilvania.'
                  : 'You answered every question correctly with zero mistakes. You have total mastery of PA driving laws.'}
              </p>
            </div>
          )}

          {/* Detailed Question Review List */}
          <div>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-4">
              {isEs ? 'Revisión Completa de Preguntas' : 'Full Question Review'}
            </h3>

            <div className="space-y-6">
              {questionsToDisplay.map((q) => {
                const originalIndex = questions.findIndex(orig => orig.id === q.id);
                const selected = userAnswers[originalIndex] ?? -1;
                const isCorrect = selected === q.correctAnswer;
                const options = activeQuestionLang === 'es' ? q.optionsEs : q.optionsEn;

                return (
                  <div
                    key={q.id}
                    className={`p-5 rounded-xl border-2 transition-all ${
                      isCorrect
                        ? 'border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/20 dark:bg-emerald-950/10'
                        : 'border-rose-200 dark:border-rose-900/60 bg-rose-50/20 dark:bg-rose-950/10'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-7 h-7 rounded-lg flex items-center justify-center font-black text-xs ${
                            isCorrect
                              ? 'bg-emerald-600 text-white'
                              : 'bg-rose-600 text-white'
                          }`}
                        >
                          {originalIndex + 1}
                        </span>
                        <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                          {isEs ? `Capítulo ${q.chapter}` : `Chapter ${q.chapter}`}
                        </span>
                        {!isCorrect && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
                            {isEs ? 'ERROR' : 'INCORRECT'}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleReadAloud(q)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                          title="Escuchar / Listen"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleToggleBookmark(q.id)}
                          className={`p-1.5 rounded-lg ${
                            userState.bookmarkedQuestionIds.includes(q.id)
                              ? 'text-amber-500'
                              : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                          }`}
                          title="Guardar / Bookmark"
                        >
                          <Bookmark className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Question text */}
                    <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-3">
                      {activeQuestionLang === 'es' ? q.textEs : q.textEn}
                    </h4>

                    {/* Sign Graphic if associated */}
                    {q.signId && (
                      <div className="my-3 flex justify-center p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                        <RoadSignSvg signId={q.signId} size={110} />
                      </div>
                    )}

                    {/* Options list */}
                    <div className="space-y-2 mb-3">
                      {options.map((opt, optIdx) => {
                        const isThisSelected = selected === optIdx;
                        const isThisCorrect = q.correctAnswer === optIdx;

                        let style =
                          'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300';
                        if (isThisCorrect) {
                          style =
                            'border-emerald-500 bg-emerald-100/70 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200 font-bold';
                        } else if (isThisSelected && !isThisCorrect) {
                          style =
                            'border-rose-500 bg-rose-100/70 dark:bg-rose-950/60 text-rose-900 dark:text-rose-200 font-bold';
                        }

                        return (
                          <div
                            key={optIdx}
                            className={`p-3 rounded-xl border flex items-center justify-between text-xs sm:text-sm ${style}`}
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="w-6 h-6 rounded-md border flex items-center justify-center font-bold text-xs opacity-75">
                                {String.fromCharCode(65 + optIdx)}
                              </span>
                              <span>{opt}</span>
                            </div>
                            {isThisCorrect && (
                              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                            )}
                            {isThisSelected && !isThisCorrect && (
                              <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Official PennDOT Explanation & Manual Reference */}
                    <div className="mt-2 p-3 bg-blue-50/60 dark:bg-blue-950/30 rounded-xl text-xs text-slate-700 dark:text-slate-300 border border-blue-200/60 dark:border-blue-900/40">
                      <div className="font-bold text-blue-900 dark:text-blue-300 mb-1 flex items-center gap-1.5">
                        <BookCheck className="w-3.5 h-3.5 text-blue-600" />
                        <span>{isEs ? 'Explicación Oficial PennDOT:' : 'Official PennDOT Explanation:'}</span>
                      </div>
                      <p>{activeQuestionLang === 'es' ? q.explanationEs : q.explanationEn}</p>
                      <div className="mt-1 text-[11px] font-semibold text-blue-700 dark:text-blue-400">
                        {isEs ? 'Referencia:' : 'Reference:'} {q.manualRef}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Active Exam In-Progress Screen
  const currentQuestion = questions[currentIndex];
  const selectedAnswer = userAnswers[currentIndex];
  const answeredCount = Object.keys(userAnswers).length;
  const currentOptions = activeQuestionLang === 'es' ? currentQuestion.optionsEs : currentQuestion.optionsEn;

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6">
      {/* Top Header Bar: Progress, Difficulty, 4-Errors Live Counter & Timer */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-lg p-4 sm:p-5 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 font-extrabold text-sm rounded-lg">
              {isEs ? 'Pregunta' : 'Question'} {currentIndex + 1} / {questions.length}
            </span>

            {/* Difficulty Badge */}
            <span
              className={`px-2.5 py-1 rounded-md text-xs font-black uppercase ${
                difficulty === 'easy'
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                  : difficulty === 'hard'
                  ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                  : 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
              }`}
            >
              {difficulty.toUpperCase()}
            </span>
          </div>

          {/* Live Errors Counter (Max 4 errors) */}
          <div
            className={`flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl border text-xs font-bold transition-all ${
              currentErrors >= 3
                ? 'bg-rose-50 border-rose-300 dark:bg-rose-950/50 dark:border-rose-800 text-rose-700 dark:text-rose-300 animate-pulse'
                : currentErrors > 0
                ? 'bg-amber-50 border-amber-300 dark:bg-amber-950/40 dark:border-amber-800 text-amber-800 dark:text-amber-300'
                : 'bg-slate-50 border-slate-200 dark:bg-slate-800 dark:border-slate-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            <div className="flex items-center gap-1">
              <span className="font-extrabold">{isEs ? 'Errores:' : 'Mistakes:'}</span>
              <span className="font-black font-mono">{currentErrors} / {MAX_ERRORS_ALLOWED}</span>
            </div>

            {/* 4 Slots Visual */}
            <div className="flex items-center gap-1">
              {[0, 1, 2, 3].map(slotIdx => (
                <div
                  key={slotIdx}
                  className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-black ${
                    slotIdx < currentErrors
                      ? 'bg-rose-600 text-white'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-400'
                  }`}
                >
                  {slotIdx < currentErrors ? '✕' : '•'}
                </div>
              ))}
            </div>

            {currentErrors === 3 && (
              <span className="text-[10px] font-bold text-rose-600 hidden sm:inline">
                {isEs ? '(¡Último error!)' : '(Last chance!)'}
              </span>
            )}
          </div>

          {/* Countdown Clock & Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono font-bold text-xs sm:text-sm border ${
                secondsRemaining < 300
                  ? 'bg-rose-50 text-rose-700 border-rose-300 dark:bg-rose-950/50 dark:text-rose-400 dark:border-rose-800 animate-pulse'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700'
              }`}
            >
              <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>{formatTime(secondsRemaining)}</span>
            </div>

            {/* Language Switcher */}
            <button
              onClick={() => {
                setActiveQuestionLang(prev => (prev === 'es' ? 'en' : 'es'));
                sound.playCorrect();
              }}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Cambiar idioma"
            >
              <Languages className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>{activeQuestionLang.toUpperCase()}</span>
            </button>

            {/* Read Aloud */}
            <button
              onClick={() => handleReadAloud(currentQuestion)}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={isEs ? 'Leer en voz alta' : 'Read aloud'}
            >
              <Volume2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            </button>

            {/* Finish Button */}
            <button
              onClick={() => finishExam()}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors cursor-pointer"
            >
              {isEs ? 'Terminar' : 'Submit'}
            </button>
          </div>
        </div>

        {/* 18-Question Grid Markers */}
        <div className="grid grid-cols-9 sm:grid-cols-18 gap-1.5 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
          {questions.map((_, idx) => {
            const isAnswered = userAnswers[idx] !== undefined;
            const isCurrent = idx === currentIndex;
            const isWrong = isAnswered && userAnswers[idx] !== questions[idx].correctAnswer;

            let bg = 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400';
            if (isAnswered) {
              bg = isWrong ? 'bg-rose-500 text-white font-bold' : 'bg-blue-600 text-white font-bold';
            }
            if (isCurrent) {
              bg = 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/60 text-blue-700 dark:text-blue-200 font-black';
            }

            return (
              <button
                key={idx}
                onClick={() => {
                  tts.stop();
                  setCurrentIndex(idx);
                }}
                className={`h-7 rounded-md text-xs flex items-center justify-center transition-all cursor-pointer ${bg}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Question Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-6 sm:p-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              {isEs ? `Capítulo ${currentQuestion.chapter} PennDOT` : `PennDOT Chapter ${currentQuestion.chapter}`}
            </span>
            {currentQuestion.isHighProbability && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300 border border-amber-300 dark:border-amber-700">
                <span>⭐</span>
                <span>{isEs ? 'Alta Probabilidad' : 'High Probability'}</span>
              </span>
            )}
          </div>
          <span className="text-xs text-slate-400 font-medium">
            {currentQuestion.manualRef}
          </span>
        </div>

        {/* Question Text */}
        <h2 className="text-lg sm:text-2xl font-black text-slate-900 dark:text-white leading-snug mb-6">
          {activeQuestionLang === 'es' ? currentQuestion.textEs : currentQuestion.textEn}
        </h2>

        {/* Traffic Sign Illustration with Zoom */}
        {currentQuestion.signId && (
          <div className="my-6 p-5 bg-gradient-to-b from-slate-100 to-slate-200/60 dark:from-slate-800/80 dark:to-slate-900/80 rounded-2xl border-2 border-slate-300 dark:border-slate-700 shadow-inner flex flex-col items-center relative group">
            <div className="w-full flex items-center justify-between mb-3 text-xs">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-600 text-white font-bold text-[11px] shadow-sm">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>{isEs ? 'Señal Oficial PennDOT' : 'PennDOT Official Sign'}</span>
              </span>
              <button
                type="button"
                onClick={() => setZoomedSignId(currentQuestion.signId!)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/90 dark:bg-slate-700/90 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 font-bold text-xs shadow-sm transition-colors cursor-pointer"
                title={isEs ? 'Ampliar señal' : 'Zoom sign'}
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>{isEs ? 'Ampliar' : 'Zoom'}</span>
              </button>
            </div>

            <div
              onClick={() => setZoomedSignId(currentQuestion.signId!)}
              className="py-3 px-6 cursor-zoom-in group-hover:scale-105 transition-transform duration-200 flex justify-center items-center"
            >
              <RoadSignSvg signId={currentQuestion.signId} size={160} />
            </div>

            <p className="mt-2 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
              {isEs ? 'Haz clic en la señal para verla ampliada' : 'Click sign to inspect in high definition'}
            </p>
          </div>
        )}

        {/* Multiple Choice Options */}
        <div className="space-y-3 mb-8">
          {currentOptions.map((opt, optIdx) => {
            const isSelected = selectedAnswer === optIdx;
            return (
              <button
                key={optIdx}
                onClick={() => handleSelectOption(optIdx)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between cursor-pointer group ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/80 dark:bg-blue-950/40 text-blue-950 dark:text-blue-100 shadow-md'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:border-blue-300 dark:hover:border-blue-700 text-slate-800 dark:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs sm:text-sm shrink-0 transition-colors ${
                      isSelected
                        ? 'bg-blue-600 text-white'
                        : 'bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 group-hover:border-blue-400'
                    }`}
                  >
                    {String.fromCharCode(65 + optIdx)}
                  </div>
                  <span className="text-sm sm:text-base font-semibold">{opt}</span>
                </div>
                {isSelected && <Check className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between gap-4 border-t border-slate-100 dark:border-slate-800 pt-6">
          <button
            onClick={() => {
              tts.stop();
              if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
            }}
            disabled={currentIndex === 0}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs sm:text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>{isEs ? 'Anterior' : 'Previous'}</span>
          </button>

          {currentIndex < questions.length - 1 ? (
            <button
              onClick={() => {
                tts.stop();
                setCurrentIndex(currentIndex + 1);
              }}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md transition-colors cursor-pointer"
            >
              <span>{isEs ? 'Siguiente' : 'Next'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => finishExam()}
              className="flex items-center gap-2 px-8 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-emerald-500/20 transition-colors cursor-pointer"
            >
              <Award className="w-4 h-4" />
              <span>{isEs ? 'CALIFICAR EXAMEN' : 'GRADE EXAM'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Fullscreen Sign Zoom Modal */}
      {zoomedSignId && (
        <div
          onClick={() => setZoomedSignId(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn cursor-zoom-out"
        >
          <div
            onClick={e => e.stopPropagation()}
            className="bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 rounded-3xl p-8 max-w-md w-full shadow-2xl flex flex-col items-center relative text-center"
          >
            <button
              onClick={() => setZoomedSignId(null)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-800 dark:hover:text-white font-bold"
            >
              ✕
            </button>

            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-4">
              {isEs ? 'Señal de Tránsito Oficial PennDOT' : 'Official PennDOT Road Sign'}
            </span>

            <div className="py-6 flex justify-center items-center">
              <RoadSignSvg signId={zoomedSignId} size={220} />
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2">
              {isEs
                ? 'Esta señalización forma parte del temario oficial exigido por PennDOT para la obtención del permiso de conducir de Pensilvania.'
                : 'This sign is part of the official PennDOT curriculum required for PA driver licensure.'}
            </p>

            <button
              onClick={() => setZoomedSignId(null)}
              className="mt-6 w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
            >
              {isEs ? 'Volver a la Pregunta' : 'Back to Question'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
