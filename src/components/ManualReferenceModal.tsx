import React from 'react';
import {
  FileText,
  ExternalLink,
  BookOpen,
  Download,
  X,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { Language } from '../types';

interface ManualReferenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

const MANUAL_PDF_PATH = '/assets/aistudio/PennDOT_-_Pennsylvania_Driver_s_Manual__Spanish__6094a799.pdf';

export const ManualReferenceModal: React.FC<ManualReferenceModalProps> = ({
  isOpen,
  onClose,
  language
}) => {
  if (!isOpen) return null;

  const isEs = language === 'es';

  const chapters = [
    {
      num: 1,
      titleEs: 'Capítulo 1: Permiso de Aprendiz no Comercial',
      titleEn: 'Chapter 1: Non-Commercial Learner Permit',
      descEs: 'Solicitud DL-180 válida por 1 año, 65 horas obligatorias de práctica (10 de noche, 5 con mal tiempo) para menores de 18, clases de licencias A, B, C y M.',
      descEn: 'DL-180 permit application valid 1 year, 65 mandatory practice hours (10 night, 5 inclement weather) for minors, license classes A, B, C, and M.'
    },
    {
      num: 2,
      titleEs: 'Capítulo 2: Semáforos, Señales y Marcas',
      titleEn: 'Chapter 2: Signals, Signs & Pavement Markings',
      descEs: 'Significado de formas y colores (Octágono Alto, Triángulo Ceder, Banderín No Pasar a la izquierda, Rombo Advertencia, Pentágono Escuela 15 mph, Cruce Ferroviario RXR, líneas continuas vs discontinuas).',
      descEn: 'Shape and color meanings (Octagon Stop, Triangle Yield, Left-hand Pennant No Passing, Diamond Warning, Pentagon School 15 mph, Railroad RXR, solid vs broken lines).'
    },
    {
      num: 3,
      titleEs: 'Capítulo 3: Habilidades de Conducción Segura',
      titleEn: 'Chapter 3: Safe Driving Skills & Hazards',
      descEs: 'Regla de los 4 segundos, distancia a ciclistas de 4 pies, detención a 10 pies de autobuses escolares, Ley de Moverse a un Lado (Move Over Law) a 20 mph por debajo del límite, hidroplaneo a 35 mph y técnica de derrape.',
      descEn: '4-second following rule, 4-foot bike clearance, 10-foot school bus stop rule, Move Over Law at 20 mph below limit, hydroplaning at 35 mph, skid recovery.'
    },
    {
      num: 4,
      titleEs: 'Capítulo 4: Expedientes, Puntos y Leyes de Alcohol',
      titleEn: 'Chapter 4: Driving Records, Points & DUI Laws',
      descEs: 'Sistema de puntos de Pensilvania (notificación a los 6 puntos, resta de 3 puntos cada 12 meses sin faltas), límite legal BAC 0.08%, Tolerancia Cero para menores de 21 años (BAC 0.02% con suspensión de 1 año) y consentimiento implícito.',
      descEn: 'PA point system (hearing notice at 6 pts, 3 pts removed every 12 clean months), adult BAC 0.08%, under-21 Zero Tolerance 0.02% with 1-year suspension, implied consent.'
    },
    {
      num: 5,
      titleEs: 'Capítulo 5: Leyes y Seguridad Infantil',
      titleEn: 'Chapter 5: Special Laws & Child Passenger Safety',
      descEs: 'Ley 229: niños menores de 2 años en asiento orientado hacia atrás en el asiento trasero; niños de 4 a 8 en booster seat; ley contra textear ($50 multa como falta primaria); método holandés al abrir puertas para ciclistas.',
      descEn: 'Law 229: rear-facing child seat under 2 years old in rear seat; ages 4-8 in booster seat; anti-texting law ($50 primary fine); Dutch reach for cyclist safety.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 dark:hover:text-white font-bold"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-900 dark:text-white">
              {isEs ? 'Manual del Conductor de Pensilvania (PUB 95)' : 'Pennsylvania Driver\'s Manual (PUB 95)'}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {isEs ? 'Edición Oficial PennDOT Bureau of Driver Licensing' : 'Official PennDOT Bureau of Driver Licensing Edition'}
            </p>
          </div>
        </div>

        {/* Direct Link to PDF */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 border border-blue-200 dark:border-blue-900 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-extrabold text-sm text-blue-900 dark:text-blue-200 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span>{isEs ? 'Acceso al Documento Completo' : 'Full Handbook Document'}</span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
              {isEs
                ? 'Puedes abrir el manual oficial de 104 páginas directamente en tu navegador o descargarlo para estudiar sin conexión.'
                : 'Open the 104-page official handbook directly in your browser or download for offline study.'}
            </p>
          </div>

          <a
            href={MANUAL_PDF_PATH}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center gap-1.5 shrink-0"
          >
            <span>{isEs ? 'Abrir PDF Oficial' : 'Open Official PDF'}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Chapter Breakdown */}
        <div className="space-y-3 mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {isEs ? 'Contenido por Capítulos Clave' : 'Key Chapter Summaries'}
          </h4>

          {chapters.map(chap => (
            <div
              key={chap.num}
              className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30"
            >
              <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white mb-1">
                {isEs ? chap.titleEs : chap.titleEn}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {isEs ? chap.descEs : chap.descEn}
              </p>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs transition-colors"
        >
          {isEs ? 'Cerrar' : 'Close'}
        </button>
      </div>
    </div>
  );
};
