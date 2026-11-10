import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  Star,
  BookOpen,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  XCircle,
  Volume2,
  Download,
  Filter,
  Sparkles,
  Layers,
  Copy,
  Check,
  RotateCcw,
  ExternalLink,
  HelpCircle,
  Bookmark,
  Eye,
  Maximize2,
  X
} from 'lucide-react';
import { Language } from '../types';
import { QuestionVisualReference } from './QuestionVisualReference';
import {
  QUESTION_BANK_DATABASE,
  CATEGORY_GROUPS,
  CategoryGroupId,
  QuestionBankItem
} from '../data/questionBankData';
import { sound } from '../utils/sound';

interface QuestionBankViewProps {
  language: Language;
}

const FAVORITES_STORAGE_KEY = 'penndot_favorite_questions';

export const QuestionBankView: React.FC<QuestionBankViewProps> = ({ language }) => {
  const isEs = language === 'es';

  // State
  const [selectedGroup, setSelectedGroup] = useState<CategoryGroupId>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set());
  const [favoriteIds, setFavoriteIds] = useState<Set<number>>(() => {
    try {
      const saved = localStorage.getItem(FAVORITES_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return new Set<number>(parsed);
      }
    } catch {
      // fallback
    }
    return new Set<number>();
  });

  const [copiedJson, setCopiedJson] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'accordion' | 'flashcard'>('accordion');
  const [flashcardIndex, setFlashcardIndex] = useState<number>(0);
  const [isFlashcardFlipped, setIsFlashcardFlipped] = useState<boolean>(false);
  const [zoomedQuestion, setZoomedQuestion] = useState<QuestionBankItem | null>(null);

  // Sync favorites to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        FAVORITES_STORAGE_KEY,
        JSON.stringify(Array.from(favoriteIds))
      );
    } catch {
      // ignore
    }
  }, [favoriteIds]);

  // Toggle favorite
  const toggleFavorite = (id: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setFavoriteIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
        sound.playCorrect();
      }
      return next;
    });
  };

  // Toggle accordion card
  const toggleAccordion = (id: number) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Expand all / Collapse all
  const expandAll = (ids: number[]) => {
    setExpandedIds(new Set(ids));
  };

  const collapseAll = () => {
    setExpandedIds(new Set());
  };

  // Filtered questions
  const filteredQuestions = useMemo(() => {
    return QUESTION_BANK_DATABASE.filter(item => {
      // Category filter
      if (selectedGroup === 'favorites') {
        if (!favoriteIds.has(item.id)) return false;
      } else if (selectedGroup !== 'all') {
        if (item.categoria !== selectedGroup) return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const inQuestion = item.pregunta.toLowerCase().includes(query);
        const inCorrect = item.correcta.toLowerCase().includes(query);
        const inExplanation = item.explicacion.toLowerCase().includes(query);
        const inOptions = item.opciones.some(opt => opt.toLowerCase().includes(query));
        return inQuestion || inCorrect || inExplanation || inOptions;
      }

      return true;
    });
  }, [selectedGroup, favoriteIds, searchQuery]);

  // Group counts map
  const groupCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: QUESTION_BANK_DATABASE.length,
      favorites: favoriteIds.size
    };
    QUESTION_BANK_DATABASE.forEach(item => {
      counts[item.categoria] = (counts[item.categoria] || 0) + 1;
    });
    return counts;
  }, [favoriteIds]);

  // TTS read aloud
  const speakText = (text: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-US';
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  };

  // Copy JSON snippet
  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(filteredQuestions, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  // Flashcard helpers
  const currentFlashcard = filteredQuestions[flashcardIndex] || filteredQuestions[0];

  const handleNextFlashcard = () => {
    setIsFlashcardFlipped(false);
    setFlashcardIndex(prev => (prev + 1) % filteredQuestions.length);
  };

  const handlePrevFlashcard = () => {
    setIsFlashcardFlipped(false);
    setFlashcardIndex(prev => (prev - 1 + filteredQuestions.length) % filteredQuestions.length);
  };

  // Selected group meta
  const currentGroupMeta = CATEGORY_GROUPS.find(g => g.id === selectedGroup) || CATEGORY_GROUPS[0];

  return (
    <section className="max-w-6xl mx-auto px-3 sm:px-6 py-4 sm:py-8 space-y-6 animate-fadeIn">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-700 rounded-3xl p-5 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
          <BookOpen className="w-80 h-80" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{isEs ? 'Módulo de Consulta Oficial' : 'Official Study Query Module'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
              {isEs ? 'Banco de Preguntas PennDOT' : 'PennDOT Question Bank'}
            </h1>
            <p className="text-sm sm:text-base text-blue-100 font-medium leading-relaxed">
              {isEs
                ? 'Estudia de forma organizada las preguntas oficiales del Manual del Conductor de Pensilvania (PUB 95) en español, divididas en 6 grupos temáticos clave.'
                : 'Study official Pennsylvania Driver Manual questions systematically organized across 6 key topic groups.'}
            </p>
          </div>

          {/* Quick Action Badges */}
          <div className="flex flex-wrap sm:flex-col gap-2.5 shrink-0">
            <a
              href="/preguntas.json"
              download="preguntas.json"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-blue-900 hover:bg-blue-50 font-extrabold text-xs sm:text-sm rounded-xl shadow transition-all cursor-pointer"
              title="Descargar archivo preguntas.json estructurado"
            >
              <Download className="w-4 h-4 text-blue-600" />
              <span>{isEs ? 'Descargar preguntas.json' : 'Download JSON'}</span>
            </a>

            <button
              onClick={handleCopyJson}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white/15 hover:bg-white/25 text-white font-bold text-xs sm:text-sm rounded-xl border border-white/30 backdrop-blur-md transition-all cursor-pointer"
            >
              {copiedJson ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>{isEs ? '¡Copiado!' : 'Copied!'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>{isEs ? 'Copiar JSON filtrado' : 'Copy Filtered JSON'}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Quick Stats Pill row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-white/20 text-xs">
          <div className="bg-white/10 rounded-xl p-2.5 text-center backdrop-blur-sm">
            <span className="text-white/70 block">{isEs ? 'Total en Banco' : 'Total in Bank'}</span>
            <span className="text-lg font-black">{QUESTION_BANK_DATABASE.length} {isEs ? 'preguntas' : 'Qs'}</span>
          </div>
          <div className="bg-white/10 rounded-xl p-2.5 text-center backdrop-blur-sm">
            <span className="text-white/70 block">{isEs ? 'Grupos Temáticos' : 'Topic Groups'}</span>
            <span className="text-lg font-black">6 {isEs ? 'Grupos' : 'Groups'}</span>
          </div>
          <div className="bg-white/10 rounded-xl p-2.5 text-center backdrop-blur-sm">
            <span className="text-white/70 block">{isEs ? 'Favoritas Guardadas' : 'Saved Favorites'}</span>
            <span className="text-lg font-black text-amber-300">{favoriteIds.size} ⭐</span>
          </div>
          <div className="bg-white/10 rounded-xl p-2.5 text-center backdrop-blur-sm">
            <span className="text-white/70 block">{isEs ? 'Modo de Estudio' : 'Study Mode'}</span>
            <span className="text-lg font-black capitalize">{viewMode}</span>
          </div>
        </div>
      </div>

      {/* Real-Time Search Bar & Mode Switcher */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={
                isEs
                  ? 'Buscar por palabra clave: BAC, autobús, 4 segundos, pies, señales, bordillo...'
                  : 'Search by keyword: BAC, school bus, 4 seconds, feet, signs, curb...'
              }
              className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs font-bold"
              >
                ✕
              </button>
            )}
          </div>

          {/* Mode Switcher Buttons */}
          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
            <div className="inline-flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setViewMode('accordion')}
                className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                  viewMode === 'accordion'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {isEs ? '📋 Acordeón' : '📋 Accordion'}
              </button>
              <button
                onClick={() => setViewMode('flashcard')}
                className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                  viewMode === 'flashcard'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {isEs ? '🗂️ Flashcard' : '🗂️ Flashcard'}
              </button>
            </div>

            {viewMode === 'accordion' && (
              <div className="hidden sm:flex items-center gap-1.5">
                <button
                  onClick={() => expandAll(filteredQuestions.map(q => q.id))}
                  className="px-2.5 py-1.5 text-xs font-bold rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
                  title="Expandir todas las preguntas"
                >
                  {isEs ? 'Expandir Todo' : 'Expand All'}
                </button>
                <button
                  onClick={collapseAll}
                  className="px-2.5 py-1.5 text-xs font-bold rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
                  title="Colapsar todas"
                >
                  {isEs ? 'Colapsar' : 'Collapse'}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Active search filter badge */}
        {searchQuery && (
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 pt-1">
            <span>{isEs ? 'Filtrando por:' : 'Filtering by:'}</span>
            <span className="font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-md border border-blue-200 dark:border-blue-800">
              "{searchQuery}"
            </span>
            <span>• {filteredQuestions.length} {isEs ? 'coincidencias encontradas' : 'matches found'}</span>
          </div>
        )}
      </div>

      {/* Category Tabs Filter Buttons (Grid on desktop / horizontal scroll on mobile) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5" />
            {isEs ? 'Categorías y Grupos del Manual' : 'Manual Categories & Groups'}
          </span>
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            {isEs ? `Mostrando ${filteredQuestions.length} preguntas` : `Showing ${filteredQuestions.length} questions`}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {CATEGORY_GROUPS.map(group => {
            const active = selectedGroup === group.id;
            const count = groupCounts[group.id] || 0;

            return (
              <button
                key={group.id}
                onClick={() => {
                  setSelectedGroup(group.id);
                  setFlashcardIndex(0);
                  setIsFlashcardFlipped(false);
                }}
                className={`flex flex-col items-start justify-between p-3 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                  active
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20 ring-2 ring-blue-500/30'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="text-lg">{group.icon}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] font-black ${
                      active
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {count}
                  </span>
                </div>
                <div className="font-extrabold text-xs leading-tight line-clamp-2">
                  {group.shortTitle}
                </div>
              </button>
            );
          })}
        </div>

        {/* Category Description Banner */}
        <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-base">{currentGroupMeta.icon}</span>
            <span className="font-black text-slate-900 dark:text-white">
              {currentGroupMeta.title}:
            </span>
            <span className="text-slate-600 dark:text-slate-400 hidden sm:inline">
              {currentGroupMeta.description}
            </span>
          </div>

          <div className="text-[11px] font-bold text-slate-500 shrink-0">
            {filteredQuestions.length} {isEs ? 'preguntas disponibles' : 'questions'}
          </div>
        </div>
      </div>

      {/* Main Content Area: ACCORDION or FLASHCARD */}
      {viewMode === 'flashcard' ? (
        /* Flashcard Study Mode */
        <div className="max-w-2xl mx-auto py-4 space-y-4">
          {filteredQuestions.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 p-8 space-y-3">
              <span className="text-4xl">🔍</span>
              <h3 className="font-bold text-base text-slate-800 dark:text-slate-200">
                {isEs ? 'No hay preguntas con los filtros seleccionados' : 'No questions found'}
              </h3>
              <p className="text-xs text-slate-500">
                {isEs
                  ? 'Prueba cambiando de grupo temático o borrando el término de búsqueda.'
                  : 'Try selecting a different group or clearing your search term.'}
              </p>
            </div>
          ) : (
            <>
              {/* Flashcard Header Controls */}
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 px-1">
                <span>
                  {isEs ? 'Tarjeta' : 'Card'} {flashcardIndex + 1} {isEs ? 'de' : 'of'} {filteredQuestions.length}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleFavorite(currentFlashcard.id)}
                    className="flex items-center gap-1 hover:text-amber-500 transition-colors cursor-pointer"
                  >
                    <Star
                      className={`w-4 h-4 ${
                        favoriteIds.has(currentFlashcard.id)
                          ? 'fill-amber-400 text-amber-500'
                          : 'text-slate-400'
                      }`}
                    />
                    <span>{favoriteIds.has(currentFlashcard.id) ? (isEs ? 'Guardada' : 'Saved') : (isEs ? 'Guardar' : 'Save')}</span>
                  </button>
                  <button
                    onClick={() => speakText(currentFlashcard.pregunta)}
                    className="p-1 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    title="Escuchar pregunta"
                  >
                    <Volume2 className="w-4 h-4 text-blue-500" />
                  </button>
                </div>
              </div>

              {/* Interactive Flip Card */}
              <article
                onClick={() => setIsFlashcardFlipped(!isFlashcardFlipped)}
                className={`min-h-[300px] sm:min-h-[340px] p-6 sm:p-8 rounded-3xl border-2 transition-all cursor-pointer flex flex-col justify-between shadow-lg relative ${
                  isFlashcardFlipped
                    ? 'bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40 border-emerald-400 dark:border-emerald-700'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-700'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-black uppercase bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                      #{currentFlashcard.id} • {currentFlashcard.categoria.toUpperCase()}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      {isFlashcardFlipped ? (isEs ? 'Respuesta Revelada' : 'Answer Revealed') : (isEs ? 'Toca para voltear' : 'Click to flip')}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white leading-snug">
                    {currentFlashcard.pregunta}
                  </h3>

                  {/* Visual Reference Illustration for Flashcard */}
                  <div
                    className="flex flex-col items-center justify-center my-3 cursor-zoom-in"
                    onClick={(e) => {
                      e.stopPropagation();
                      setZoomedQuestion(currentFlashcard);
                    }}
                    title="Click para ampliar imagen"
                  >
                    <QuestionVisualReference
                      questionId={currentFlashcard.id}
                      category={currentFlashcard.categoria}
                      size={140}
                      showCaption={true}
                      className="hover:scale-105 transition-transform"
                    />
                    <div className="flex items-center gap-1 mt-1 text-[10px] font-bold text-blue-600 dark:text-blue-400">
                      <Maximize2 className="w-3 h-3" />
                      <span>{isEs ? 'Toca para ampliar imagen' : 'Tap to zoom'}</span>
                    </div>
                  </div>

                  {isFlashcardFlipped ? (
                    <div className="space-y-3 pt-4 border-t border-emerald-200 dark:border-emerald-800 animate-fadeIn">
                      <div className="p-4 rounded-2xl bg-emerald-100/70 dark:bg-emerald-900/60 border border-emerald-300 dark:border-emerald-700">
                        <div className="flex items-center gap-2 font-black text-xs text-emerald-800 dark:text-emerald-200 mb-1">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                          <span>{isEs ? 'RESPUESTA CORRECTA OFICIAL' : 'OFFICIAL CORRECT ANSWER'}</span>
                        </div>
                        <p className="font-extrabold text-sm sm:text-base text-emerald-950 dark:text-emerald-100">
                          {currentFlashcard.correcta}
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-emerald-200 dark:border-emerald-800/60 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                        <span className="font-black text-slate-900 dark:text-white block mb-0.5">
                          {isEs ? 'Explicación del Manual de PennDOT:' : 'PennDOT Manual Justification:'}
                        </span>
                        {currentFlashcard.explicacion}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2 pt-2">
                      <p className="text-xs text-slate-400 font-semibold mb-2">
                        {isEs ? 'Opciones posibles:' : 'Options:'}
                      </p>
                      {currentFlashcard.opciones.map((opt, i) => (
                        <div
                          key={i}
                          className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 font-medium"
                        >
                          <span className="font-bold text-slate-400 mr-2">{String.fromCharCode(65 + i)}.</span>
                          {opt}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="text-center text-xs font-bold text-slate-400 mt-4">
                  {isFlashcardFlipped
                    ? (isEs ? '🔄 Toca de nuevo para volver a la pregunta' : '🔄 Tap again to hide answer')
                    : (isEs ? '👆 Toca en cualquier lugar para ver la respuesta y justificación' : '👆 Tap to reveal official answer & PennDOT reason')}
                </div>
              </article>

              {/* Navigation buttons */}
              <div className="flex items-center justify-between gap-3 pt-2">
                <button
                  onClick={handlePrevFlashcard}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-extrabold text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                >
                  ← {isEs ? 'Anterior' : 'Previous'}
                </button>

                <button
                  onClick={() => setIsFlashcardFlipped(!isFlashcardFlipped)}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs transition-colors shadow-sm cursor-pointer"
                >
                  {isFlashcardFlipped ? (isEs ? 'Ocultar' : 'Hide') : (isEs ? 'Mostrar Respuesta' : 'Show Answer')}
                </button>

                <button
                  onClick={handleNextFlashcard}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-extrabold text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                >
                  {isEs ? 'Siguiente' : 'Next'} →
                </button>
              </div>
            </>
          )}
        </div>
      ) : (
        /* Accordion Study Mode */
        <div className="space-y-3">
          {filteredQuestions.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 p-8 space-y-3">
              <span className="text-4xl">🔍</span>
              <h3 className="font-bold text-base text-slate-800 dark:text-slate-200">
                {isEs ? 'No se encontraron preguntas' : 'No questions found'}
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                {selectedGroup === 'favorites'
                  ? (isEs ? 'Aún no has guardado preguntas como favoritas. Haz clic en la estrella ⭐ de cualquier pregunta para repasarla aquí.' : 'No favorites saved yet. Click the star ⭐ on any question to review it here.')
                  : (isEs ? 'Intenta con otro término de búsqueda o selecciona "Todas las Preguntas".' : 'Try searching for another keyword or select "All Questions".')}
              </p>
              {selectedGroup === 'favorites' && (
                <button
                  onClick={() => setSelectedGroup('all')}
                  className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  {isEs ? 'Ver todas las preguntas' : 'View all questions'}
                </button>
              )}
            </div>
          ) : (
            filteredQuestions.map((item, index) => {
              const isExpanded = expandedIds.has(item.id);
              const isFav = favoriteIds.has(item.id);

              return (
                <article
                  key={item.id}
                  className={`bg-white dark:bg-slate-900 rounded-2xl border transition-all duration-200 shadow-sm overflow-hidden ${
                    isExpanded
                      ? 'border-blue-300 dark:border-blue-700/70 ring-1 ring-blue-500/10'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  {/* Accordion Header (Click to toggle) */}
                  <header
                    onClick={() => toggleAccordion(item.id)}
                    className="p-4 sm:p-5 flex items-start justify-between gap-3 cursor-pointer hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors select-none"
                  >
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      {/* Question Index Badge */}
                      <span className="shrink-0 w-7 h-7 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-black flex items-center justify-center mt-0.5 border border-slate-200 dark:border-slate-700">
                        {item.id}
                      </span>

                      {/* Visual Reference Thumbnail on Header */}
                      <div
                        className="shrink-0 cursor-zoom-in group hidden sm:block"
                        onClick={(e) => {
                          e.stopPropagation();
                          setZoomedQuestion(item);
                        }}
                        title={isEs ? 'Ampliar imagen de referencia' : 'Enlarge reference image'}
                      >
                        <QuestionVisualReference
                          questionId={item.id}
                          category={item.categoria}
                          size={46}
                          showCaption={false}
                          className="p-1 group-hover:border-blue-400 dark:group-hover:border-blue-500 group-hover:scale-105 transition-all"
                        />
                      </div>

                      <div className="space-y-1.5 flex-1 min-w-0">
                        {/* Group Category Tag */}
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                            {item.categoria.toUpperCase()}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            • {isExpanded ? (isEs ? 'Ocultar explicación' : 'Hide details') : (isEs ? 'Ver respuesta & gráfico' : 'Reveal answer & graphic')}
                          </span>
                        </div>

                        {/* Question Text */}
                        <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white leading-snug">
                          {item.pregunta}
                        </h3>
                      </div>
                    </div>

                    {/* Action Controls on Card Header */}
                    <div className="flex items-center gap-1.5 shrink-0 ml-2" onClick={e => e.stopPropagation()}>
                      {/* TTS Speak */}
                      <button
                        onClick={e => speakText(item.pregunta, e)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors"
                        title={isEs ? 'Escuchar pregunta' : 'Listen to question'}
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>

                      {/* Favorite Star */}
                      <button
                        onClick={e => toggleFavorite(item.id, e)}
                        className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                          isFav
                            ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/60'
                            : 'text-slate-400 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                        title={isFav ? (isEs ? 'Quitar de Mis Notas' : 'Remove favorite') : (isEs ? 'Guardar en Mis Notas' : 'Save to favorites')}
                      >
                        <Star className={`w-4 h-4 ${isFav ? 'fill-amber-400' : ''}`} />
                      </button>

                      {/* Accordion Chevron */}
                      <div
                        onClick={() => toggleAccordion(item.id)}
                        className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-transform cursor-pointer"
                      >
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </div>
                    </div>
                  </header>

                  {/* Accordion Expanded Body */}
                  {isExpanded && (
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-1 space-y-4 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50 animate-fadeIn">
                      {/* Top Visual Section: Visual Graphic + Options Grid */}
                      <div className="flex flex-col md:flex-row items-center md:items-start gap-4 pt-2">
                        {/* Interactive Visual Graphic Card */}
                        <div
                          className="shrink-0 flex flex-col items-center justify-center p-3 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-sm cursor-zoom-in group transition-all hover:border-blue-400 dark:hover:border-blue-500 w-full sm:w-auto"
                          onClick={() => setZoomedQuestion(item)}
                          title={isEs ? 'Click para ampliar en alta resolución' : 'Click to enlarge graphic'}
                        >
                          <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1">
                            <Eye className="w-3 h-3 text-blue-500" />
                            <span>{isEs ? 'Referencia Visual' : 'Visual Graphic'}</span>
                          </div>
                          <QuestionVisualReference
                            questionId={item.id}
                            category={item.categoria}
                            size={135}
                            showCaption={true}
                            className="group-hover:scale-105 transition-transform"
                          />
                          <div className="flex items-center gap-1 mt-2 text-[10px] font-bold text-blue-600 dark:text-blue-400 group-hover:underline">
                            <Maximize2 className="w-3 h-3" />
                            <span>{isEs ? 'Ampliar imagen' : 'Zoom image'}</span>
                          </div>
                        </div>

                        {/* Options List */}
                        <div className="flex-1 w-full space-y-2">
                          <div className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                            {isEs ? 'Opciones de Examen:' : 'Exam Choices:'}
                          </div>
                          <div className="grid grid-cols-1 gap-2">
                            {item.opciones.map((opcion, i) => {
                              const isCorrectOption = opcion === item.correcta;
                              return (
                                <div
                                  key={i}
                                  className={`p-3 rounded-xl text-xs sm:text-sm font-medium flex items-start gap-2.5 transition-colors border ${
                                    isCorrectOption
                                      ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-100 border-emerald-300 dark:border-emerald-700 shadow-sm'
                                      : 'bg-white dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700/60'
                                  }`}
                                >
                                  {isCorrectOption ? (
                                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                                  ) : (
                                    <span className="w-4 h-4 rounded-full border border-slate-300 dark:border-slate-600 text-[10px] font-bold text-slate-400 flex items-center justify-center shrink-0 mt-0.5">
                                      {String.fromCharCode(65 + i)}
                                    </span>
                                  )}
                                  <span className={isCorrectOption ? 'font-bold' : ''}>
                                    {opcion}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      {/* Correct Answer Highlight Box */}
                      <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800">
                        <div className="flex items-center gap-1.5 text-xs font-black text-emerald-800 dark:text-emerald-300 mb-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{isEs ? 'Respuesta Correcta:' : 'Correct Answer:'}</span>
                        </div>
                        <p className="text-xs sm:text-sm font-extrabold text-emerald-900 dark:text-emerald-100">
                          {item.correcta}
                        </p>
                      </div>

                      {/* Official Justification / Manual Explanation */}
                      <div className="p-3.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 space-y-1.5">
                        <div className="flex items-center gap-1.5 text-xs font-black text-blue-800 dark:text-blue-300">
                          <BookOpen className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                          <span>{isEs ? 'Justificación Oficial de PennDOT (PUB 95):' : 'Official PennDOT Justification:'}</span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                          {item.explicacion}
                        </p>
                      </div>
                    </div>
                  )}
                </article>
              );
            })
          )}
        </div>
      )}

      {/* Modal: Enlarge Visual Graphic & Diagram */}
      {zoomedQuestion && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-fadeIn"
          onClick={() => setZoomedQuestion(null)}
        >
          <div
            className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-7 max-w-md w-full border border-slate-200 dark:border-slate-700 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full text-xs font-black bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300">
                  #{zoomedQuestion.id} • {zoomedQuestion.categoria.toUpperCase()}
                </span>
                <span className="font-extrabold text-xs text-slate-500">
                  {isEs ? 'Ilustración Oficial' : 'Official Illustration'}
                </span>
              </div>
              <button
                onClick={() => setZoomedQuestion(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col items-center justify-center py-6 bg-slate-50 dark:bg-slate-950/60 rounded-2xl border border-slate-200 dark:border-slate-800">
              <QuestionVisualReference
                questionId={zoomedQuestion.id}
                category={zoomedQuestion.categoria}
                size={200}
                showCaption={true}
              />
            </div>

            <div className="space-y-2">
              <h4 className="font-black text-sm text-slate-900 dark:text-white leading-snug">
                {zoomedQuestion.pregunta}
              </h4>
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs font-extrabold text-emerald-800 dark:text-emerald-200 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{zoomedQuestion.correcta}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
