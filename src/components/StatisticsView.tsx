import React from 'react';
import {
  BarChart3,
  TrendingUp,
  Award,
  Calendar,
  Flame,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Clock,
  RotateCcw,
  BookOpen
} from 'lucide-react';
import { UserDataState, Language } from '../types';
import { OFFICIAL_PENNDOT_QUESTIONS } from '../data/questionsData';

interface StatisticsViewProps {
  language: Language;
  userState: UserDataState;
  setUserState: React.Dispatch<React.SetStateAction<UserDataState>>;
  onStartExam: () => void;
  onGoToPractice: () => void;
}

export const StatisticsView: React.FC<StatisticsViewProps> = ({
  language,
  userState,
  setUserState,
  onStartExam,
  onGoToPractice
}) => {
  const isEs = language === 'es';

  const exams = userState.examHistory;
  const totalExams = exams.length;
  const passedExams = exams.filter(e => e.passed).length;
  const passRate = totalExams > 0 ? Math.round((passedExams / totalExams) * 100) : 0;

  // Total questions answered across all time
  const totalQuestionsAnswered = Object.values(userState.dailyActivity).reduce(
    (sum, d) => sum + d.questionsAnswered,
    0
  );

  // Calculate readiness score
  // Based on: average of recent exam scores (weight 60%) + proportion of official question bank attempted (weight 40%)
  const recentExams = exams.slice(0, 5);
  const avgRecentScore =
    recentExams.length > 0
      ? recentExams.reduce((sum, e) => sum + e.percentage, 0) / recentExams.length
      : 0;

  const attemptedCount = Object.keys(userState.questionStats).length;
  const totalBankCount = OFFICIAL_PENNDOT_QUESTIONS.length;
  const coverageRatio = Math.min(100, Math.round((attemptedCount / totalBankCount) * 100));

  const readinessScore = Math.min(
    100,
    Math.round(avgRecentScore * 0.7 + coverageRatio * 0.3)
  );

  // Topic Breakdown
  const topicStats: Record<string, { total: number; correct: number }> = {
    signs: { total: 0, correct: 0 },
    safe_driving: { total: 0, correct: 0 },
    alcohol_dui: { total: 0, correct: 0 },
    traffic_laws: { total: 0, correct: 0 }
  };

  Object.entries(userState.questionStats).forEach(([qid, stat]) => {
    const q = OFFICIAL_PENNDOT_QUESTIONS.find(item => item.id === qid);
    if (q) {
      const catKey =
        q.category === 'signs'
          ? 'signs'
          : q.category === 'alcohol_dui'
          ? 'alcohol_dui'
          : q.category === 'safe_driving'
          ? 'safe_driving'
          : 'traffic_laws';

      topicStats[catKey].total += stat.attempts;
      topicStats[catKey].correct += stat.correct;
    }
  });

  // Last 7 days activity
  const last7Days: { dateStr: string; label: string; count: number }[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const dayName = d.toLocaleDateString(isEs ? 'es-US' : 'en-US', { weekday: 'short' });
    const count = userState.dailyActivity[dateStr]?.questionsAnswered || 0;
    last7Days.push({ dateStr, label: dayName, count });
  }

  const maxDailyCount = Math.max(1, ...last7Days.map(d => d.count));

  // Missed Questions List
  const missedQuestionIds = Object.entries(userState.questionStats)
    .filter(([_, stat]) => !stat.lastAnsweredCorrect)
    .map(([id]) => id);

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            <BarChart3 className="w-4 h-4" />
            <span>{isEs ? 'Panel de Rendimiento Personalizado' : 'Personal Performance Analytics'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            {isEs ? 'Estadísticas y Progreso Diario' : 'Statistics & Daily Progress'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {isEs
              ? 'Seguimiento visual de tus simulacros, racha diaria, cobertura del temario y puntos débiles.'
              : 'Track your mock test scores, daily streaks, syllabus coverage, and weak spots.'}
          </p>
        </div>

        <button
          onClick={onStartExam}
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
        >
          <Award className="w-4 h-4" />
          <span>{isEs ? 'Tomar Simulacro' : 'Take Simulation'}</span>
        </button>
      </div>

      {/* Primary KPI Highlights */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
              {isEs ? 'Nivel de Preparación' : 'Readiness Score'}
            </span>
            <TrendingUp className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-white mt-2">
            {readinessScore}%
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden mt-2">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                readinessScore >= 80 ? 'bg-emerald-500' : readinessScore >= 60 ? 'bg-amber-500' : 'bg-rose-500'
              }`}
              style={{ width: `${readinessScore}%` }}
            />
          </div>
          <span className="text-[11px] font-semibold text-slate-400 mt-1 block">
            {readinessScore >= 83
              ? isEs ? '¡Listo para aprobar!' : 'Ready to pass!'
              : isEs ? 'Continúa practicando' : 'Keep practicing'}
          </span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
              {isEs ? 'Tasa de Aprobación' : 'Pass Rate'}
            </span>
            <Award className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-white mt-2">
            {passRate}%
          </div>
          <span className="text-[11px] font-semibold text-slate-400 mt-1 block">
            {passedExams} {isEs ? 'aprobados de' : 'passed out of'} {totalExams} {isEs ? 'exámenes' : 'tests'}
          </span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
              {isEs ? 'Preguntas Respondidas' : 'Questions Answered'}
            </span>
            <BookOpen className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-white mt-2">
            {totalQuestionsAnswered}
          </div>
          <span className="text-[11px] font-semibold text-slate-400 mt-1 block">
            {attemptedCount} / {totalBankCount} {isEs ? 'preguntas cubiertas' : 'questions covered'}
          </span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
              {isEs ? 'Racha de Estudio' : 'Study Streak'}
            </span>
            <Flame className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-3xl font-black text-amber-500 mt-2 flex items-center gap-1">
            <span>🔥</span>
            <span>{userState.streakDays}</span>
            <span className="text-sm font-bold text-slate-500 dark:text-slate-400">
              {isEs ? 'días' : 'days'}
            </span>
          </div>
          <span className="text-[11px] font-semibold text-slate-400 mt-1 block">
            {isEs ? 'Estudio diario consecutivo' : 'Consecutive daily study'}
          </span>
        </div>
      </div>

      {/* Visual Charts: Daily Activity Bar Chart + Exam History */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Daily Study Activity Bar Chart */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span>{isEs ? 'Actividad de Preguntas (Últimos 7 Días)' : 'Daily Questions (Last 7 Days)'}</span>
            </h3>
          </div>

          <div className="h-44 flex items-end justify-between gap-2 pt-6 px-2 border-b border-slate-100 dark:border-slate-800">
            {last7Days.map(item => {
              const heightPercent = Math.max(8, Math.round((item.count / maxDailyCount) * 100));
              return (
                <div key={item.dateStr} className="flex-1 flex flex-col items-center gap-2 group">
                  <span className="text-[10px] font-black text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.count}
                  </span>
                  <div className="w-full max-w-[28px] bg-slate-100 dark:bg-slate-800 rounded-t-lg h-32 flex items-end">
                    <div
                      className="w-full rounded-t-lg bg-gradient-to-t from-blue-600 to-indigo-500 group-hover:from-blue-500 group-hover:to-indigo-400 transition-all"
                      style={{ height: `${heightPercent}%` }}
                    />
                  </div>
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between items-center text-xs text-slate-400 pt-3">
            <span>{isEs ? 'Objetivo diario recomendado: 18 preguntas' : 'Recommended daily goal: 18 questions'}</span>
          </div>
        </div>

        {/* Topic Mastery Breakdown */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="font-extrabold text-base text-slate-900 dark:text-white mb-4">
            {isEs ? 'Dominio por Temática Oficial PennDOT' : 'PennDOT Topic Mastery'}
          </h3>

          <div className="space-y-4">
            {[
              {
                id: 'signs',
                nameEs: 'Señales de Tráfico & Semáforos (Cap. 2)',
                nameEn: 'Traffic Signs & Signals (Ch. 2)',
                color: 'bg-amber-500'
              },
              {
                id: 'safe_driving',
                nameEs: 'Conducción Segura, Clima & Emergencias (Cap. 3)',
                nameEn: 'Safe Driving, Weather & Hazards (Ch. 3)',
                color: 'bg-blue-600'
              },
              {
                id: 'alcohol_dui',
                nameEs: 'Leyes de Alcohol, BAC & Tolerancia Cero (Cap. 4)',
                nameEn: 'Alcohol Laws, BAC & Zero Tolerance (Ch. 4)',
                color: 'bg-rose-500'
              },
              {
                id: 'traffic_laws',
                nameEs: 'Leyes Especiales, Ciclistas & Cinturón (Cap. 1 & 5)',
                nameEn: 'Special Laws, Cyclists & Safety Seats (Ch. 1 & 5)',
                color: 'bg-emerald-600'
              }
            ].map(topic => {
              const stat = topicStats[topic.id];
              const pct = stat.total > 0 ? Math.round((stat.correct / stat.total) * 100) : 0;
              return (
                <div key={topic.id}>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-slate-700 dark:text-slate-300">
                      {isEs ? topic.nameEs : topic.nameEn}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400">
                      {pct}% ({stat.correct}/{stat.total})
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${topic.color} transition-all duration-500`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Exam History Log */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm mb-8">
        <h3 className="font-extrabold text-base text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <Clock className="w-4 h-4 text-blue-600" />
          <span>{isEs ? 'Historial de Simulacros Rendidos' : 'Past Mock Exam Attempts'}</span>
        </h3>

        {exams.length === 0 ? (
          <div className="py-8 text-center text-slate-400 text-xs sm:text-sm">
            {isEs
              ? 'Aún no has completado ningún simulacro. ¡Empieza hoy tu primer examen PennDOT!'
              : 'You have not taken any mock exams yet. Start your first PennDOT test today!'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold">
                  <th className="py-3 px-2">{isEs ? 'Fecha & Hora' : 'Date & Time'}</th>
                  <th className="py-3 px-2">{isEs ? 'Resultado' : 'Status'}</th>
                  <th className="py-3 px-2">{isEs ? 'Aciertos' : 'Score'}</th>
                  <th className="py-3 px-2">{isEs ? 'Porcentaje' : 'Percentage'}</th>
                  <th className="py-3 px-2">{isEs ? 'Tiempo' : 'Time'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {exams.slice(0, 10).map(item => (
                  <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="py-3 px-2 font-medium text-slate-600 dark:text-slate-300">
                      {new Date(item.date).toLocaleString(isEs ? 'es-US' : 'en-US', {
                        dateStyle: 'short',
                        timeStyle: 'short'
                      })}
                    </td>
                    <td className="py-3 px-2">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-black ${
                          item.passed
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                            : 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                        }`}
                      >
                        {item.passed ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>{isEs ? 'APROBADO' : 'PASSED'}</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3.5 h-3.5" />
                            <span>{isEs ? 'REPROBADO' : 'FAILED'}</span>
                          </>
                        )}
                      </span>
                    </td>
                    <td className="py-3 px-2 font-black text-slate-900 dark:text-white">
                      {item.score} / {item.total}
                    </td>
                    <td className="py-3 px-2 font-bold text-slate-700 dark:text-slate-300">
                      {item.percentage}%
                    </td>
                    <td className="py-3 px-2 font-mono text-xs text-slate-500">
                      {Math.floor(item.timeTakenSeconds / 60)}m {item.timeTakenSeconds % 60}s
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Missed Questions Bank Section */}
      {missedQuestionIds.length > 0 && (
        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/60 rounded-2xl p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-extrabold text-base text-amber-900 dark:text-amber-300 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-600" />
                <span>{isEs ? 'Banco de Fallos Pendientes' : 'Pending Mistakes Bank'}</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
                {isEs
                  ? `Tienes ${missedQuestionIds.length} preguntas en las que cometiste errores recientemente. ¡Repásalas para asegurar tu aprobación!`
                  : `You have ${missedQuestionIds.length} questions answered incorrectly in past attempts. Review them now to ensure a pass!`}
              </p>
            </div>

            <button
              onClick={onGoToPractice}
              className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm transition-colors cursor-pointer shrink-0"
            >
              {isEs ? 'Repasar Fallos en Práctica' : 'Practice Mistakes Now'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
