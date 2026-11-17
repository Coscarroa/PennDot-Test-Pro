import React, { useState } from 'react';
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  FileCheck2,
  ShieldAlert,
  Gauge,
  CheckCircle2
} from 'lucide-react';
import { Language } from '../types';

interface QuickStudyGuideProps {
  language: Language;
  defaultExpanded?: boolean;
}

type GuideTabId = 'permit' | 'signs' | 'braking';

export const QuickStudyGuide: React.FC<QuickStudyGuideProps> = ({
  language,
  defaultExpanded = true
}) => {
  const isEs = language === 'es';
  const [isExpanded, setIsExpanded] = useState<boolean>(defaultExpanded);
  const [activeTab, setActiveTab] = useState<GuideTabId>('permit');

  const tabs: { id: GuideTabId; labelEs: string; labelEn: string; icon: React.FC<{ className?: string }> }[] = [
    {
      id: 'permit',
      labelEs: '1. Permiso de Aprendizaje (PA)',
      labelEn: '1. PA Learner\'s Permit',
      icon: FileCheck2
    },
    {
      id: 'signs',
      labelEs: '2. Formas y Colores de Señales',
      labelEn: '2. Sign Shapes & Colors',
      icon: ShieldAlert
    },
    {
      id: 'braking',
      labelEs: '3. Frenado y Zonas Escolares',
      labelEn: '3. Braking & School Zones',
      icon: Gauge
    }
  ];

  return (
    <section
      aria-label={isEs ? 'Guía Rápida para el Examen de Manejo en Pensilvania' : 'Pennsylvania Driving Exam Quick Study Guide'}
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-lg overflow-hidden mt-8 transition-all"
    >
      {/* Collapsible Header */}
      <button
        type="button"
        onClick={() => setIsExpanded((prev) => !prev)}
        aria-expanded={isExpanded}
        className="w-full p-5 sm:p-6 flex items-center justify-between gap-4 text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
      >
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="p-2.5 rounded-xl bg-blue-100 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 shrink-0">
            <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <span className="inline-block text-[10px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">
              {isEs ? 'Resumen Esencial PennDOT PUB 95' : 'PennDOT PUB 95 Quick Summary'}
            </span>
            <h2 className="text-base sm:text-xl font-black text-slate-900 dark:text-white leading-snug">
              {isEs
                ? 'Guía Rápida para el Examen de Manejo en Pensilvania'
                : 'Quick Study Guide for the Pennsylvania Driver\'s Exam'}
            </h2>
          </div>
        </div>

        <div className="shrink-0 flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400">
          <span className="hidden sm:inline">
            {isExpanded ? (isEs ? 'Ocultar guía' : 'Hide guide') : (isEs ? 'Mostrar guía' : 'Show guide')}
          </span>
          <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800">
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </div>
      </button>

      {/* Expandable Study Guide Body */}
      {isExpanded && (
        <div className="px-5 pb-6 sm:px-6 sm:pb-7 pt-2 border-t border-slate-100 dark:border-slate-800 space-y-5 animate-fadeIn">
          {/* Interactive Tabs Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-extrabold transition-all text-left cursor-pointer border ${
                    active
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20'
                      : 'bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-white' : 'text-blue-600 dark:text-blue-400'}`} />
                  <span className="leading-tight">{isEs ? tab.labelEs : tab.labelEn}</span>
                </button>
              );
            })}
          </div>

          {/* 3 Brief, SEO-rich Educational Content Blocks */}
          <div className="space-y-4">
            {/* Block 1: Requisitos básicos para el permiso de aprendizaje (Learner's Permit) en PA */}
            <article
              className={`p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 space-y-2.5 ${
                activeTab === 'permit' ? 'block' : 'hidden'
              }`}
            >
              <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                <span>
                  {isEs
                    ? 'Requisitos básicos para el permiso de aprendizaje (Learner\'s Permit) en PA'
                    : 'Basic Requirements for a Pennsylvania Learner\'s Permit'}
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {isEs
                  ? 'Para solicitar tu permiso de aprendizaje (Learner\'s Permit) en Pensilvania debes tener al menos 16 años y acudir a un Centro de Licencias de PennDOT con la documentación original requerida:'
                  : 'To apply for a Pennsylvania Learner\'s Permit you must be at least 16 years old and visit a PennDOT Driver License Center with original documentation:'}
              </p>
              <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>Formulario DL-180:</strong>{' '}
                    {isEs
                      ? 'Solicitud completada con examen físico médico firmado (y formulario DL-180TD de consentimiento de padre o tutor si eres menor de 18 años).'
                      : 'Completed application with a signed physical medical exam (plus DL-180TD parent/guardian consent if under 18).'}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>{isEs ? 'Identidad, Seguro Social y Residencia:' : 'Identity, SSN & Residency:'}</strong>{' '}
                    {isEs
                      ? 'Acta de nacimiento o pasaporte/estatus migratorio vigente, tarjeta de Seguro Social original y dos comprobantes de domicilio en Pensilvania.'
                      : 'Birth certificate or valid passport/lawful status, original Social Security card, and two proofs of PA residency.'}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>{isEs ? 'Exámenes en ventanilla:' : 'In-Person Tests:'}</strong>{' '}
                    {isEs
                      ? 'Aprobar el examen de la vista, pagar las tarifas correspondientes y responder correctamente al menos 15 de 18 preguntas (83%) en el examen teórico.'
                      : 'Pass the vision screening, pay applicable fees, and answer at least 15 out of 18 knowledge test questions (83%) correctly.'}
                  </span>
                </li>
              </ul>
            </article>

            {/* Block 2: Significado de las formas y colores de las señales de tránsito */}
            <article
              className={`p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 space-y-2.5 ${
                activeTab === 'signs' ? 'block' : 'hidden'
              }`}
            >
              <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                <span>
                  {isEs
                    ? 'Significado de las formas y colores de las señales de tránsito'
                    : 'Meaning of Traffic Sign Shapes and Colors'}
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {isEs
                  ? 'PennDOT evalúa la identificación inmediata de señales incluso a distancia por su silueta geométrica y color oficial:'
                  : 'PennDOT tests immediate recognition of road signs even from afar using their geometric shape and color:'}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/70">
                  <div className="font-extrabold text-slate-900 dark:text-white mb-1">
                    {isEs ? 'Formas Clave' : 'Key Shapes'}
                  </div>
                  <p className="text-xs leading-relaxed">
                    {isEs
                      ? '• Octágono: Exclusivo de ALTO (STOP). • Triángulo invertido: Ceda el Paso (YIELD). • Pentágono: Zona escolar. • Banderín: Zona de no rebasar. • Diamante: Advertencia de peligro. • Círculo: Cruce de ferrocarril.'
                      : '• Octagon: STOP only. • Inverted Triangle: YIELD. • Pentagon: School zone. • Pennant: No passing zone. • Diamond: Hazard warning. • Circle: Railroad advance.'}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/70">
                  <div className="font-extrabold text-slate-900 dark:text-white mb-1">
                    {isEs ? 'Colores Oficiales' : 'Official Colors'}
                  </div>
                  <p className="text-xs leading-relaxed">
                    {isEs
                      ? '• Rojo: Pare o prohibición. • Amarillo: Advertencia vial. • Naranja: Obras y construcción. • Verde/Amarillo Fluorescente: Escuelas y peatones. • Blanco: Leyes reglamentarias. • Verde: Rutas y salidas. • Azul: Servicios.'
                      : '• Red: Stop or prohibition. • Yellow: Warning. • Orange: Construction/work zones. • Fluorescent Yellow-Green: Schools/pedestrians. • White: Regulatory. • Green: Directions. • Blue: Services.'}
                  </p>
                </div>
              </div>
            </article>

            {/* Block 3: Reglas clave sobre distancias de frenado y límites de velocidad en zonas escolares */}
            <article
              className={`p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 space-y-2.5 ${
                activeTab === 'braking' ? 'block' : 'hidden'
              }`}
            >
              <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Gauge className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                <span>
                  {isEs
                    ? 'Reglas clave sobre distancias de frenado y límites de velocidad en zonas escolares'
                    : 'Key Rules on Stopping Distances & School Zone Speed Limits'}
                </span>
              </h3>
              <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>{isEs ? 'Regla de los 4 segundos:' : '4-Second Rule:'}</strong>{' '}
                    {isEs
                      ? 'Mantén al menos 4 segundos de distancia respecto al vehículo de adelante en pavimento seco; amplíala a 5 o 6+ segundos con lluvia, hielo, nieve o neblina.'
                      : 'Maintain at least a 4-second following distance on dry roads; increase to 5–6+ seconds in rain, snow, ice, or fog.'}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>{isEs ? 'Distancia de frenado:' : 'Stopping Distance:'}</strong>{' '}
                    {isEs
                      ? 'Combina percepción, reacción y frenado. Si duplicas tu velocidad, tu distancia de frenado se multiplica aproximadamente por cuatro.'
                      : 'Combines perception, reaction, and braking distance. Doubling your speed roughly quadruples your braking distance.'}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>{isEs ? 'Zonas y Autobuses Escolares:' : 'School Zones & Buses:'}</strong>{' '}
                    {isEs
                      ? 'El límite máximo en zonas escolares es de 15 mph cuando parpadean las luces ámbar. Ante un autobús escolar con luces rojas intermitentes debes detenerte al menos a 10 pies de distancia (la infracción conlleva 60 días de suspensión y 5 puntos).'
                      : 'School zone speed limit is strictly 15 mph when amber lights flash. Stop at least 10 feet from a school bus with flashing red lights (violations carry a 60-day suspension and 5 points).'}
                  </span>
                </li>
              </ul>
            </article>
          </div>
        </div>
      )}
    </section>
  );
};
