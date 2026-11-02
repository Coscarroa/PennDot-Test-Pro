import React, { useState, useMemo } from 'react';
import {
  ShieldCheck,
  Search,
  Filter,
  Sparkles,
  Info,
  HelpCircle,
  RotateCw,
  CheckCircle2,
  XCircle,
  Eye,
  BookOpen
} from 'lucide-react';
import { TrafficSign, Language, SignCategory } from '../types';
import { OFFICIAL_TRAFFIC_SIGNS } from '../data/signsData';
import { RoadSignSvg } from './RoadSignSvg';
import { sound } from '../utils/sound';

interface SignsCatalogProps {
  language: Language;
}

export const SignsCatalog: React.FC<SignsCatalogProps> = ({ language }) => {
  const isEs = language === 'es';

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSign, setSelectedSign] = useState<TrafficSign | null>(null);
  const [studyMode, setStudyMode] = useState<'catalog' | 'flashcards'>('catalog');

  // Flashcards state
  const [flashcardIndex, setFlashcardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [flashcardScore, setFlashcardScore] = useState<{ correct: number; total: number }>({
    correct: 0,
    total: 0
  });

  const categories = [
    { id: 'all', labelEs: 'Todas las Señales', labelEn: 'All Signs' },
    { id: 'regulatory', labelEs: 'Restrictivas / Ley', labelEn: 'Regulatory' },
    { id: 'warning', labelEs: 'Preventivas / Peligro', labelEn: 'Warning' },
    { id: 'work_zone', labelEs: 'Zonas de Obras', labelEn: 'Work Zones' },
    { id: 'guide', labelEs: 'Informativas & Guía', labelEn: 'Guide & Interstate' }
  ];

  const filteredSigns = useMemo(() => {
    return OFFICIAL_TRAFFIC_SIGNS.filter(sign => {
      const matchesCat = activeCategory === 'all' || sign.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCat;
      const matchesText =
        sign.titleEs.toLowerCase().includes(q) ||
        sign.titleEn.toLowerCase().includes(q) ||
        sign.descriptionEs.toLowerCase().includes(q) ||
        sign.descriptionEn.toLowerCase().includes(q) ||
        sign.shape.toLowerCase().includes(q);
      return matchesCat && matchesText;
    });
  }, [activeCategory, searchQuery]);

  const currentFlashcard = filteredSigns[flashcardIndex] || filteredSigns[0];

  const handleNextFlashcard = (knewIt: boolean) => {
    setIsFlipped(false);
    if (knewIt) {
      sound.playCorrect();
      setFlashcardScore(prev => ({ correct: prev.correct + 1, total: prev.total + 1 }));
    } else {
      sound.playIncorrect();
      setFlashcardScore(prev => ({ ...prev, total: prev.total + 1 }));
    }

    if (flashcardIndex < filteredSigns.length - 1) {
      setFlashcardIndex(prev => prev + 1);
    } else {
      setFlashcardIndex(0);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6">
      {/* Header with Mode Switch */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>{isEs ? 'Manual Oficial PennDOT Capítulo 2' : 'Official PennDOT Chapter 2'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            {isEs ? 'Catálogo y Guía de Señalización Vial' : 'Traffic Signs & Markings Library'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {isEs
              ? 'Aprende las formas, colores, significados y acciones requeridas para cada señal vial en Pensilvania.'
              : 'Master the shapes, colors, meanings, and mandatory actions for PA road signs.'}
          </p>
        </div>

        {/* Catalog vs Flashcards Mode */}
        <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => {
              setStudyMode('catalog');
              setIsFlipped(false);
            }}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              studyMode === 'catalog'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {isEs ? 'Vista de Catálogo' : 'Catalog View'}
          </button>
          <button
            onClick={() => {
              setStudyMode('flashcards');
              setIsFlipped(false);
              setFlashcardIndex(0);
            }}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              studyMode === 'flashcards'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {isEs ? 'Modo Flashcards / Quiz' : 'Flashcards Quiz'}
          </button>
        </div>
      </div>

      {studyMode === 'flashcards' ? (
        /* Flashcards Study Quiz Mode */
        <div className="max-w-xl mx-auto py-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
              {isEs ? 'Tarjeta' : 'Card'} {flashcardIndex + 1} / {filteredSigns.length}
            </span>
            <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
              {isEs ? 'Aciertos:' : 'Score:'} {flashcardScore.correct} / {flashcardScore.total}
            </div>
          </div>

          {currentFlashcard && (
            <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl overflow-hidden p-8 text-center min-h-[380px] flex flex-col justify-between">
              {/* Top info */}
              <div className="flex justify-between items-center text-xs text-slate-400">
                <span>{currentFlashcard.shape}</span>
                <span>{currentFlashcard.color}</span>
              </div>

              {/* Big Sign Graphic */}
              <div className="my-6 flex justify-center py-4">
                <RoadSignSvg signId={currentFlashcard.id} size={150} />
              </div>

              {/* Flipped Content Reveal */}
              {isFlipped ? (
                <div className="animate-fadeIn p-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 text-left">
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">
                    {isEs ? currentFlashcard.titleEs : currentFlashcard.titleEn}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mt-1">
                    {isEs ? currentFlashcard.descriptionEs : currentFlashcard.descriptionEn}
                  </p>
                  <div className="mt-2 text-xs font-bold text-blue-600 dark:text-blue-400">
                    {isEs ? 'Acción requerida:' : 'Action required:'}{' '}
                    <span className="font-normal text-slate-700 dark:text-slate-300">
                      {isEs ? currentFlashcard.actionEs : currentFlashcard.actionEn}
                    </span>
                  </div>
                </div>
              ) : (
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 italic">
                  {isEs ? '¿Qué significa esta señal vial de PennDOT?' : 'What does this PennDOT sign mean?'}
                </p>
              )}

              {/* Bottom buttons */}
              <div className="mt-6 flex items-center justify-center gap-3">
                {!isFlipped ? (
                  <button
                    onClick={() => {
                      setIsFlipped(true);
                      sound.playCorrect();
                    }}
                    className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Eye className="w-4 h-4" />
                    <span>{isEs ? 'Revelar Significado' : 'Flip to Reveal Meaning'}</span>
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => handleNextFlashcard(false)}
                      className="flex-1 py-3 rounded-xl border-2 border-rose-300 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 font-bold text-xs sm:text-sm transition-all hover:bg-rose-100 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>{isEs ? 'No lo sabía' : 'Did not know'}</span>
                    </button>
                    <button
                      onClick={() => handleNextFlashcard(true)}
                      className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{isEs ? '¡Me lo sabía!' : 'I knew it!'}</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Catalog Grid Mode */
        <>
          {/* Search & Category Filter */}
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between mb-8">
            <div className="flex flex-wrap gap-2">
              {categories.map(c => {
                const active = activeCategory === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => setActiveCategory(c.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      active
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-blue-400'
                    }`}
                  >
                    {isEs ? c.labelEs : c.labelEn}
                  </button>
                );
              })}
            </div>

            <div className="relative min-w-[260px]">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder={isEs ? 'Buscar señal por nombre o forma...' : 'Search sign by name or shape...'}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl text-xs sm:text-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Grid of Signs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSigns.map(sign => (
              <div
                key={sign.id}
                onClick={() => setSelectedSign(sign)}
                className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 rounded-2xl shadow-sm hover:shadow-lg transition-all p-5 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  {/* Category badge & Page */}
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 mb-4">
                    <span className="uppercase tracking-wider">
                      {sign.category.replace('_', ' ')}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {isEs ? `Pág. ${sign.manualPage}` : `Page ${sign.manualPage}`}
                    </span>
                  </div>

                  {/* Sign SVG */}
                  <div className="flex justify-center py-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl mb-4 group-hover:scale-105 transition-transform duration-200">
                    <RoadSignSvg signId={sign.id} size={110} />
                  </div>

                  {/* Title & Shape */}
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {isEs ? sign.titleEs : sign.titleEn}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
                    {isEs ? sign.descriptionEs : sign.descriptionEn}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-blue-600 dark:text-blue-400 font-bold">
                  <span>{isEs ? 'Ver regla completa' : 'View full rule'}</span>
                  <span>→</span>
                </div>
              </div>
            ))}
          </div>

          {/* Sign Details Modal */}
          {selectedSign && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
                <button
                  onClick={() => setSelectedSign(null)}
                  className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white text-lg font-bold"
                >
                  ✕
                </button>

                <div className="flex justify-center p-6 bg-slate-50 dark:bg-slate-800/80 rounded-2xl mb-4">
                  <RoadSignSvg signId={selectedSign.id} size={150} />
                </div>

                <div className="space-y-3">
                  <h2 className="text-xl font-black text-slate-900 dark:text-white">
                    {isEs ? selectedSign.titleEs : selectedSign.titleEn}
                  </h2>

                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="px-2.5 py-1 rounded-md bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 font-semibold">
                      {isEs ? 'Forma:' : 'Shape:'} {selectedSign.shape}
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-semibold">
                      {isEs ? 'Color:' : 'Color:'} {selectedSign.color}
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold">
                      {isEs ? `Manual PUB 95, Pág. ${selectedSign.manualPage}` : `PUB 95 Page ${selectedSign.manualPage}`}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase text-slate-400">
                      {isEs ? 'Descripción Oficial:' : 'Official Meaning:'}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mt-1">
                      {isEs ? selectedSign.descriptionEs : selectedSign.descriptionEn}
                    </p>
                  </div>

                  <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-900">
                    <h4 className="text-xs font-bold text-blue-900 dark:text-blue-300 uppercase">
                      {isEs ? 'Acción Obligatoria del Conductor:' : 'Mandatory Driver Action:'}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 mt-1 font-semibold">
                      {isEs ? selectedSign.actionEs : selectedSign.actionEn}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedSign(null)}
                  className="mt-6 w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs"
                >
                  {isEs ? 'Cerrar' : 'Close'}
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
