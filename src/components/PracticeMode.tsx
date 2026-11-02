import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Volume2,
  Bookmark,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Layers,
  BookCheck,
  Maximize2,
  ShieldAlert
} from 'lucide-react';
import { Question, Language, UserDataState } from '../types';
import { OFFICIAL_PENNDOT_QUESTIONS } from '../data/questionsData';
import { RoadSignSvg } from './RoadSignSvg';
import { sound } from '../utils/sound';
import { tts } from '../utils/speech';
import { recordQuestionAnswer, toggleBookmarkQuestion } from '../utils/storage';

interface PracticeModeProps {
  language: Language;
  userState: UserDataState;
  setUserState: React.Dispatch<React.SetStateAction<UserDataState>>;
}

export const PracticeMode: React.FC<PracticeModeProps> = ({
  language,
  userState,
  setUserState
}) => {
  const isEs = language === 'es';

  // Filters
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [questionLang, setQuestionLang] = useState<Language>(language);
  const [zoomedSignId, setZoomedSignId] = useState<string | null>(null);

  // Compute question list based on filter
  const filteredQuestions = useMemo(() => {
    switch (selectedFilter) {
      case 'high_probability':
        return OFFICIAL_PENNDOT_QUESTIONS.filter(q => q.isHighProbability);
      case 'ch2':
        return OFFICIAL_PENNDOT_QUESTIONS.filter(q => q.chapter === 2);
      case 'ch3':
        return OFFICIAL_PENNDOT_QUESTIONS.filter(q => q.chapter === 3);
      case 'ch4':
        return OFFICIAL_PENNDOT_QUESTIONS.filter(q => q.chapter === 4);
      case 'ch1_5':
        return OFFICIAL_PENNDOT_QUESTIONS.filter(q => q.chapter === 1 || q.chapter === 5);
      case 'mistakes':
        return OFFICIAL_PENNDOT_QUESTIONS.filter(
          q => userState.questionStats[q.id] && !userState.questionStats[q.id].lastAnsweredCorrect
        );
      case 'bookmarks':
        return OFFICIAL_PENNDOT_QUESTIONS.filter(q =>
          userState.bookmarkedQuestionIds.includes(q.id)
        );
      default:
        return OFFICIAL_PENNDOT_QUESTIONS;
    }
  }, [selectedFilter, userState]);

  const currentQ: Question | undefined = filteredQuestions[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (selectedAnswer !== null || !currentQ) return;
    setSelectedAnswer(idx);
    const isCorrect = idx === currentQ.correctAnswer;
    if (isCorrect) {
      sound.playCorrect();
    } else {
      sound.playIncorrect();
    }

    const nextState = recordQuestionAnswer(userState, currentQ.id, isCorrect);
    setUserState(nextState);
  };

  const handleNext = () => {
    tts.stop();
    setSelectedAnswer(null);
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    tts.stop();
    setSelectedAnswer(null);
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleReadAloud = (q: Question) => {
    const textToRead =
      questionLang === 'es'
        ? `${q.textEs}. Opción A: ${q.optionsEs[0]}. Opción B: ${q.optionsEs[1]}. Opción C: ${q.optionsEs[2]}. Opción D: ${q.optionsEs[3]}.`
        : `${q.textEn}. Option A: ${q.optionsEn[0]}. Option B: ${q.optionsEn[1]}. Option C: ${q.optionsEn[2]}. Option D: ${q.optionsEn[3]}.`;
    tts.speak(textToRead, questionLang);
  };

  const categories = [
    { id: 'all', labelEs: 'Todo el Banco Oficial', labelEn: 'All Official Questions', count: OFFICIAL_PENNDOT_QUESTIONS.length },
    {
      id: 'high_probability',
      labelEs: '⭐ Preguntas Más Frecuentes (Alta Probabilidad)',
      labelEn: '⭐ High-Probability Exam Questions',
      count: OFFICIAL_PENNDOT_QUESTIONS.filter(q => q.isHighProbability).length
    },
    { id: 'ch2', labelEs: 'Capítulo 2: Señales & Marcas', labelEn: 'Chapter 2: Signs & Markings', count: OFFICIAL_PENNDOT_QUESTIONS.filter(q => q.chapter === 2).length },
    { id: 'ch3', labelEs: 'Capítulo 3: Conducción & Emergencias', labelEn: 'Chapter 3: Safe Driving & Emergencies', count: OFFICIAL_PENNDOT_QUESTIONS.filter(q => q.chapter === 3).length },
    { id: 'ch4', labelEs: 'Capítulo 4: Puntos, DUI & Alcohol', labelEn: 'Chapter 4: Points & Alcohol Laws', count: OFFICIAL_PENNDOT_QUESTIONS.filter(q => q.chapter === 4).length },
    { id: 'ch1_5', labelEs: 'Capítulo 1 & 5: Permiso & Leyes', labelEn: 'Chapters 1 & 5: Permits & Laws', count: OFFICIAL_PENNDOT_QUESTIONS.filter(q => q.chapter === 1 || q.chapter === 5).length },
    {
      id: 'mistakes',
      labelEs: 'Banco de Fallos Recientes',
      labelEn: 'Recent Mistakes Bank',
      count: OFFICIAL_PENNDOT_QUESTIONS.filter(q => userState.questionStats[q.id] && !userState.questionStats[q.id].lastAnsweredCorrect).length
    },
    {
      id: 'bookmarks',
      labelEs: 'Preguntas Guardadas',
      labelEn: 'Bookmarked Questions',
      count: userState.bookmarkedQuestionIds.length
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      {/* Category Filter Pills */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Layers className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            {isEs ? 'Seleccionar Módulo de Estudio' : 'Select Study Chapter / Category'}
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => {
            const active = selectedFilter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  tts.stop();
                  setSelectedFilter(cat.id);
                  setCurrentIndex(0);
                  setSelectedAnswer(null);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  active
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-blue-400'
                }`}
              >
                <span>{isEs ? cat.labelEs : cat.labelEn}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    active ? 'bg-blue-800 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-500'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {filteredQuestions.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-10 text-center">
          <Sparkles className="w-12 h-12 text-amber-500 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-800 dark:text-white">
            {isEs ? '¡No hay preguntas en esta sección!' : 'No questions in this section!'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
            {selectedFilter === 'mistakes'
              ? isEs
                ? '¡Excelente! No tienes preguntas marcadas con error recientemente.'
                : 'Great job! You have no recent mistake records.'
              : isEs
              ? 'Guarda preguntas durante los exámenes para verlas aquí.'
              : 'Bookmark questions during mock tests to review them here.'}
          </p>
        </div>
      ) : currentQ ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-6 sm:p-8">
          {/* Header Row */}
          <div className="flex items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-extrabold text-xs flex items-center justify-center">
                #{currentIndex + 1}
              </span>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                {currentIndex + 1} / {filteredQuestions.length}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setQuestionLang(prev => (prev === 'es' ? 'en' : 'es'))}
                className="flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200"
                title="Cambiar idioma de la pregunta"
              >
                <span>{questionLang.toUpperCase()}</span>
              </button>

              <button
                onClick={() => handleReadAloud(currentQ)}
                className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                title="Leer en voz alta"
              >
                <Volume2 className="w-4 h-4 text-blue-600" />
              </button>

              <button
                onClick={() => {
                  const nextState = toggleBookmarkQuestion(userState, currentQ.id);
                  setUserState(nextState);
                }}
                className={`p-1.5 rounded-lg border transition-colors ${
                  userState.bookmarkedQuestionIds.includes(currentQ.id)
                    ? 'border-amber-300 bg-amber-50 dark:bg-amber-950/40 text-amber-500'
                    : 'border-slate-200 dark:border-slate-700 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
                title="Guardar pregunta"
              >
                <Bookmark className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* High Probability Exam Badge */}
          {currentQ.isHighProbability && (
            <div className="mb-4 p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-300 dark:border-amber-700/80 flex items-start gap-2.5 shadow-sm animate-fadeIn">
              <span className="text-lg leading-none shrink-0">⭐</span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-wider text-amber-900 dark:text-amber-200">
                    {isEs ? 'Pregunta de Alta Probabilidad en el Examen Real PennDOT' : 'High-Probability PennDOT Official Exam Question'}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-200 text-amber-900 dark:bg-amber-900 dark:text-amber-200">
                    {isEs ? 'Frecuencia Alta' : 'High Frequency'}
                  </span>
                </div>
                {(currentQ.probabilityReasonEs || currentQ.probabilityReasonEn) && (
                  <p className="text-xs text-amber-800 dark:text-amber-300 mt-1 leading-snug">
                    {questionLang === 'es' ? currentQ.probabilityReasonEs : currentQ.probabilityReasonEn}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Question Text */}
          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white leading-relaxed mb-6">
            {questionLang === 'es' ? currentQ.textEs : currentQ.textEn}
          </h3>

          {/* Sign Graphic if applicable */}
          {currentQ.signId && (
            <div className="my-6 p-5 bg-gradient-to-b from-slate-100 to-slate-200/60 dark:from-slate-800/80 dark:to-slate-900/80 rounded-2xl border-2 border-slate-300 dark:border-slate-700 shadow-inner flex flex-col items-center relative group">
              <div className="w-full flex items-center justify-between mb-3 text-xs">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-600 text-white font-bold text-[11px] shadow-sm">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>{isEs ? 'Señal Oficial PennDOT' : 'PennDOT Official Sign'}</span>
                </span>
                <button
                  type="button"
                  onClick={() => setZoomedSignId(currentQ.signId!)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/90 dark:bg-slate-700/90 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 font-bold text-xs shadow-sm transition-colors cursor-pointer"
                  title={isEs ? 'Ampliar señal a pantalla completa' : 'Enlarge sign'}
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>{isEs ? 'Ampliar' : 'Zoom'}</span>
                </button>
              </div>

              <div
                onClick={() => setZoomedSignId(currentQ.signId!)}
                className="py-3 px-6 cursor-zoom-in group-hover:scale-105 transition-transform duration-200 flex justify-center items-center"
              >
                <RoadSignSvg signId={currentQ.signId} size={160} />
              </div>

              <p className="mt-2 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                {isEs ? 'Haz clic en la señal para verla ampliada' : 'Click sign to inspect in high definition'}
              </p>
            </div>
          )}

          {/* Options with Instant Feedback */}
          <div className="space-y-3 mb-6">
            {(questionLang === 'es' ? currentQ.optionsEs : currentQ.optionsEn).map((opt, optIdx) => {
              const isSelected = selectedAnswer === optIdx;
              const isCorrect = currentQ.correctAnswer === optIdx;
              const isAnswered = selectedAnswer !== null;

              let style =
                'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:border-blue-400 text-slate-800 dark:text-slate-200';

              if (isAnswered) {
                if (isCorrect) {
                  style =
                    'border-emerald-500 bg-emerald-100/70 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-100 font-bold';
                } else if (isSelected && !isCorrect) {
                  style =
                    'border-rose-500 bg-rose-100/70 dark:bg-rose-950/60 text-rose-900 dark:text-rose-100 font-bold';
                } else {
                  style = 'opacity-50 border-slate-200 dark:border-slate-800 bg-transparent';
                }
              }

              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(optIdx)}
                  disabled={isAnswered}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between cursor-pointer ${style}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg border flex items-center justify-center font-bold text-xs shrink-0">
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span className="text-xs sm:text-sm">{opt}</span>
                  </div>
                  {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />}
                  {isAnswered && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Instant Official Explanation Card */}
          {selectedAnswer !== null && (
            <div
              className={`p-5 rounded-xl border mb-6 animate-fadeIn ${
                selectedAnswer === currentQ.correctAnswer
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800'
                  : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800'
              }`}
            >
              <div className="flex items-center gap-2 font-black text-sm mb-2">
                {selectedAnswer === currentQ.correctAnswer ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-emerald-800 dark:text-emerald-300">
                      {isEs ? '¡Correcto!' : 'Correct!'}
                    </span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                    <span className="text-rose-800 dark:text-rose-300">
                      {isEs ? 'Respuesta Incorrecta' : 'Incorrect Answer'}
                    </span>
                  </>
                )}
              </div>

              <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                {questionLang === 'es' ? currentQ.explanationEs : currentQ.explanationEn}
              </p>

              <div className="mt-2 text-xs font-semibold text-blue-700 dark:text-blue-400 flex items-center gap-1">
                <BookCheck className="w-3.5 h-3.5" />
                <span>
                  {isEs ? 'Fuente Manual PennDOT:' : 'PennDOT Handbook Reference:'} {currentQ.manualRef}
                </span>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between gap-4 border-t border-slate-100 dark:border-slate-800 pt-6">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs sm:text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>{isEs ? 'Anterior' : 'Previous'}</span>
            </button>

            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md transition-colors cursor-pointer"
            >
              <span>{isEs ? 'Siguiente Pregunta' : 'Next Question'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : null}

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
                ? 'Manual Oficial del Conductor de Pensilvania (PUB 95) • Capítulo 2'
                : 'Official Pennsylvania Driver\'s Manual (PUB 95) • Chapter 2'}
            </p>

            <button
              onClick={() => setZoomedSignId(null)}
              className="mt-6 w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
            >
              {isEs ? 'Cerrar Vista Ampliada' : 'Close Zoom'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
