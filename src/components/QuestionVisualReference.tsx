import React from 'react';
import { RoadSignSvg } from './RoadSignSvg';
import {
  ShieldAlert,
  Car,
  AlertTriangle,
  Clock,
  Gauge,
  Droplets,
  Wine,
  UserCheck,
  Footprints,
  ArrowRight,
  Flame,
  HelpCircle,
  Eye,
  CheckCircle2
} from 'lucide-react';

interface QuestionVisualReferenceProps {
  questionId: number;
  category: string;
  size?: number;
  className?: string;
  showCaption?: boolean;
}

export const QuestionVisualReference: React.FC<QuestionVisualReferenceProps> = ({
  questionId,
  category,
  size = 130,
  className = '',
  showCaption = true
}) => {
  // Renders the specific official visual reference or schematic for each question
  const renderVisualGraphic = () => {
    switch (questionId) {
      // --- GRUPO 1: SEÑALES, FORMAS Y COLORES ---
      case 1:
        return (
          <div className="flex flex-col items-center">
            <RoadSignSvg signId="sign-stop" size={size} />
            {showCaption && (
              <span className="text-[10px] font-black uppercase tracking-wider text-rose-600 dark:text-rose-400 mt-1.5">
                Alto • Octágono Rojo
              </span>
            )}
          </div>
        );

      case 2:
        return (
          <div className="flex flex-col items-center">
            <RoadSignSvg signId="sign-yield" size={size} />
            {showCaption && (
              <span className="text-[10px] font-black uppercase tracking-wider text-rose-600 dark:text-rose-400 mt-1.5">
                Ceda el Paso • Triángulo
              </span>
            )}
          </div>
        );

      case 3:
        return (
          <div className="flex flex-col items-center">
            <RoadSignSvg signId="sign-slippery-wet" size={size} />
            {showCaption && (
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 mt-1.5">
                Advertencia • Diamante
              </span>
            )}
          </div>
        );

      case 4:
        return (
          <div className="flex flex-col items-center">
            <RoadSignSvg signId="sign-no-passing-zone" size={size * 0.9} />
            {showCaption && (
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 dark:text-amber-400 mt-1.5">
                Banderín (Lado Izquierdo)
              </span>
            )}
          </div>
        );

      case 5:
        return (
          <div className="flex flex-col items-center">
            <RoadSignSvg signId="sign-railroad-advance" size={size} />
            {showCaption && (
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 dark:text-amber-400 mt-1.5">
                Cruce FFCC Adelantado
              </span>
            )}
          </div>
        );

      case 6:
        return (
          <div className="flex flex-col items-center">
            <RoadSignSvg signId="sign-school-zone" size={size} />
            {showCaption && (
              <span className="text-[10px] font-black uppercase tracking-wider text-lime-700 dark:text-lime-400 mt-1.5">
                Zona Escolar • Pentágono
              </span>
            )}
          </div>
        );

      case 7:
        return (
          <div className="flex flex-col items-center">
            <RoadSignSvg signId="sign-work-zone" size={size} />
            {showCaption && (
              <span className="text-[10px] font-black uppercase tracking-wider text-orange-600 dark:text-orange-400 mt-1.5">
                Zona de Obras • Anaranjado
              </span>
            )}
          </div>
        );

      case 8:
        return (
          <div className="flex flex-col items-center">
            <RoadSignSvg signId="sign-pavement-double-yellow" size={size} />
            {showCaption && (
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 mt-1.5">
                Línea Continua Blanca
              </span>
            )}
          </div>
        );

      // --- GRUPO 2: REGLAS DE PRIORIDAD E INTERSECCIONES ---
      case 9:
        // 4-Way Stop Intersection Diagram
        return (
          <div className="flex flex-col items-center">
            <svg width={size} height={size} viewBox="0 0 120 120" className="drop-shadow-sm select-none">
              {/* Intersection roads */}
              <rect x="0" y="42" width="120" height="36" fill="#334155" />
              <rect x="42" y="0" width="36" height="120" fill="#334155" />
              {/* Dashed center lines */}
              <line x1="0" y1="60" x2="42" y2="60" stroke="#facc15" strokeDasharray="4 3" strokeWidth="2" />
              <line x1="78" y1="60" x2="120" y2="60" stroke="#facc15" strokeDasharray="4 3" strokeWidth="2" />
              <line x1="60" y1="0" x2="60" y2="42" stroke="#facc15" strokeDasharray="4 3" strokeWidth="2" />
              <line x1="60" y1="78" x2="60" y2="120" stroke="#facc15" strokeDasharray="4 3" strokeWidth="2" />
              {/* Stop lines */}
              <line x1="42" y1="42" x2="42" y2="78" stroke="#ffffff" strokeWidth="3" />
              <line x1="78" y1="42" x2="78" y2="78" stroke="#ffffff" strokeWidth="3" />
              <line x1="42" y1="42" x2="78" y2="42" stroke="#ffffff" strokeWidth="3" />
              <line x1="42" y1="78" x2="78" y2="78" stroke="#ffffff" strokeWidth="3" />
              {/* Car A (at bottom, turning or going straight) */}
              <rect x="63" y="86" width="12" height="20" rx="3" fill="#3b82f6" stroke="#ffffff" strokeWidth="1" />
              {/* Car B (at right - has right of way) */}
              <rect x="86" y="45" width="20" height="12" rx="3" fill="#10b981" stroke="#ffffff" strokeWidth="1" />
              <circle cx="96" cy="36" r="8" fill="#10b981" />
              <text x="96" y="40" fill="#ffffff" fontSize="9" fontWeight="900" textAnchor="middle">1º</text>
              <circle cx="79" cy="96" r="8" fill="#ef4444" />
              <text x="79" y="100" fill="#ffffff" fontSize="9" fontWeight="900" textAnchor="middle">2º</text>
            </svg>
            {showCaption && (
              <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 mt-1.5">
                Vehículo a la Derecha Primero
              </span>
            )}
          </div>
        );

      case 10:
        // Right Turn on Red
        return (
          <div className="flex flex-col items-center">
            <svg width={size} height={size} viewBox="0 0 120 120" className="drop-shadow-sm select-none">
              {/* Traffic light housing */}
              <rect x="15" y="10" width="30" height="80" rx="6" fill="#1e293b" stroke="#475569" strokeWidth="2" />
              <circle cx="30" cy="25" r="8" fill="#ef4444" />
              <circle cx="30" cy="50" r="8" fill="#334155" />
              <circle cx="30" cy="75" r="8" fill="#334155" />
              {/* Turn arrow */}
              <path d="M 60 75 Q 85 75 85 45" fill="none" stroke="#10b981" strokeWidth="6" strokeLinecap="round" />
              <polygon points="85,32 78,46 92,46" fill="#10b981" />
              <rect x="52" y="94" width="60" height="18" rx="4" fill="#047857" />
              <text x="82" y="106" fill="#ffffff" fontSize="9" fontWeight="900" textAnchor="middle">ALTO PREVIO</text>
            </svg>
            {showCaption && (
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mt-1.5">
                Giro en Rojo (Alto Completo)
              </span>
            )}
          </div>
        );

      case 11:
        return (
          <div className="flex flex-col items-center">
            <RoadSignSvg signId="sign-roundabout" size={size} />
            {showCaption && (
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 mt-1.5">
                Rotonda: Tráfico Dentro Tiene Prioridad
              </span>
            )}
          </div>
        );

      case 12:
        // Left Turn Facing Oncoming Traffic
        return (
          <div className="flex flex-col items-center">
            <svg width={size} height={size} viewBox="0 0 120 120" className="drop-shadow-sm select-none">
              <rect x="0" y="42" width="120" height="36" fill="#334155" />
              <rect x="42" y="0" width="36" height="120" fill="#334155" />
              {/* Straight Oncoming car (Green - Priority) */}
              <rect x="54" y="15" width="12" height="20" rx="3" fill="#10b981" />
              <path d="M 60 38 L 60 85" stroke="#10b981" strokeWidth="3" strokeDasharray="3 2" />
              {/* Left turning car (Red/Blue - Must Yield) */}
              <rect x="54" y="85" width="12" height="20" rx="3" fill="#3b82f6" />
              <path d="M 60 82 Q 60 60 25 60" fill="none" stroke="#ef4444" strokeWidth="3" strokeDasharray="3 2" />
              <polygon points="18,60 26,55 26,65" fill="#ef4444" />
            </svg>
            {showCaption && (
              <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 mt-1.5">
                Ceder al Tráfico en Sentido Contrario
              </span>
            )}
          </div>
        );

      case 13:
        // Pull over for emergency vehicles
        return (
          <div className="flex flex-col items-center">
            <svg width={size} height={size} viewBox="0 0 120 120" className="drop-shadow-sm select-none">
              <rect x="15" y="0" width="90" height="120" fill="#334155" />
              <line x1="60" y1="0" x2="60" y2="120" stroke="#facc15" strokeDasharray="6 4" strokeWidth="2" />
              {/* Right shoulder curb */}
              <line x1="105" y1="0" x2="105" y2="120" stroke="#ffffff" strokeWidth="4" />
              {/* Police/Ambulance vehicle with siren */}
              <rect x="25" y="65" width="22" height="40" rx="4" fill="#dc2626" />
              <circle cx="36" cy="85" r="5" fill="#38bdf8" className="animate-pulse" />
              {/* Civilian car pulled over to the right */}
              <rect x="75" y="25" width="20" height="38" rx="4" fill="#3b82f6" />
              <path d="M 70 85 Q 85 70 85 45" fill="none" stroke="#facc15" strokeWidth="2" />
              <rect x="18" y="10" width="84" height="16" rx="4" fill="#0f172a" />
              <text x="60" y="22" fill="#38bdf8" fontSize="8" fontWeight="900" textAnchor="middle">ORILLARSE A LA DERECHA</text>
            </svg>
            {showCaption && (
              <span className="text-[10px] font-black uppercase tracking-wider text-rose-600 dark:text-rose-400 mt-1.5">
                Alto a la Derecha por Sirena
              </span>
            )}
          </div>
        );

      case 14:
        // Move Over Law
        return (
          <div className="flex flex-col items-center">
            <svg width={size} height={size} viewBox="0 0 120 120" className="drop-shadow-sm select-none">
              <rect x="10" y="0" width="100" height="120" fill="#334155" />
              <line x1="60" y1="0" x2="60" y2="120" stroke="#ffffff" strokeDasharray="5 5" strokeWidth="2" />
              {/* Stopped emergency vehicle on shoulder */}
              <rect x="85" y="45" width="18" height="35" rx="3" fill="#ea580c" />
              <circle cx="94" cy="55" r="4" fill="#facc15" />
              {/* Car moving to left lane */}
              <rect x="25" y="40" width="18" height="35" rx="3" fill="#2563eb" />
              <path d="M 72 95 Q 40 70 34 50" fill="none" stroke="#38bdf8" strokeWidth="3" />
              <polygon points="34,42 29,52 39,52" fill="#38bdf8" />
              <rect x="15" y="6" width="90" height="16" rx="4" fill="#1e293b" />
              <text x="60" y="18" fill="#facc15" fontSize="8" fontWeight="900" textAnchor="middle">MOVE OVER LAW</text>
            </svg>
            {showCaption && (
              <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 mt-1.5">
                Despejar Carril / -20 mph
              </span>
            )}
          </div>
        );

      case 15:
        return (
          <div className="flex flex-col items-center">
            <RoadSignSvg signId="sign-merging-traffic" size={size} />
            {showCaption && (
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 mt-1.5">
                Autopista Tiene Prioridad
              </span>
            )}
          </div>
        );

      case 16:
        return (
          <div className="flex flex-col items-center">
            <RoadSignSvg signId="sign-pedestrian-crossing" size={size} />
            {showCaption && (
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 mt-1.5">
                Ceder Paso a Peatones
              </span>
            )}
          </div>
        );

      // --- GRUPO 3: LÍMITES DE VELOCIDAD Y ZONAS ESCOLARES ---
      case 17:
        // School zone 15 MPH with flashing lights
        return (
          <div className="flex flex-col items-center">
            <svg width={size} height={size} viewBox="0 0 110 110" className="drop-shadow-sm select-none">
              <rect x="15" y="10" width="80" height="90" rx="6" fill="#ffffff" stroke="#000000" strokeWidth="3" />
              <rect x="19" y="14" width="72" height="20" fill="#facc15" />
              <text x="55" y="28" fill="#000000" fontSize="10" fontWeight="900" textAnchor="middle">ESCOLAR</text>
              <text x="55" y="52" fill="#000000" fontSize="8" fontWeight="800" textAnchor="middle">LÍMITE</text>
              <text x="55" y="80" fill="#000000" fontSize="28" fontWeight="900" textAnchor="middle">15</text>
              <circle cx="28" cy="94" r="5" fill="#f59e0b" className="animate-pulse" />
              <circle cx="82" cy="94" r="5" fill="#f59e0b" className="animate-pulse" />
            </svg>
            {showCaption && (
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 mt-1.5">
                15 MPH Luces Intermitentes
              </span>
            )}
          </div>
        );

      case 18:
        return (
          <div className="flex flex-col items-center">
            <RoadSignSvg signId="sign-school-bus-stop" size={size} />
            {showCaption && (
              <span className="text-[10px] font-black uppercase tracking-wider text-rose-600 dark:text-rose-400 mt-1.5">
                10 Pies de Distancia Mínima
              </span>
            )}
          </div>
        );

      case 19:
        // Penalties: 60 days suspension, 5 points
        return (
          <div className="flex flex-col items-center">
            <svg width={size} height={size} viewBox="0 0 120 120" className="drop-shadow-sm select-none">
              <rect x="10" y="10" width="100" height="100" rx="12" fill="#7f1d1d" stroke="#f87171" strokeWidth="2" />
              <text x="60" y="32" fill="#fca5a5" fontSize="9" fontWeight="900" textAnchor="middle">SANCIÓN PENNDOT</text>
              <rect x="20" y="40" width="80" height="26" rx="6" fill="#991b1b" />
              <text x="60" y="58" fill="#ffffff" fontSize="13" fontWeight="900" textAnchor="middle">60 DÍAS</text>
              <text x="60" y="76" fill="#fecaca" fontSize="8" fontWeight="800" textAnchor="middle">SUSPENSIÓN LICENCIA</text>
              <text x="60" y="98" fill="#fef08a" fontSize="12" fontWeight="900" textAnchor="middle">+ 5 PUNTOS</text>
            </svg>
            {showCaption && (
              <span className="text-[10px] font-black uppercase tracking-wider text-rose-600 dark:text-rose-400 mt-1.5">
                Suspensión 60 Días + 5 Pts
              </span>
            )}
          </div>
        );

      case 20:
        // Divided Highway Physical Barrier vs Bus
        return (
          <div className="flex flex-col items-center">
            <RoadSignSvg signId="sign-divided-highway" size={size} />
            {showCaption && (
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 mt-1.5">
                Barrera Física = Exento Opuesto
              </span>
            )}
          </div>
        );

      case 21:
        return (
          <div className="flex flex-col items-center">
            <RoadSignSvg signId="sign-speed-limit-35" size={size} />
            {showCaption && (
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 mt-1.5">
                35 MPH Comercial Urbano
              </span>
            )}
          </div>
        );

      case 22:
        // Fire hydrant 15 FT buffer
        return (
          <div className="flex flex-col items-center">
            <svg width={size} height={size} viewBox="0 0 120 120" className="drop-shadow-sm select-none">
              {/* Sidewalk & Street */}
              <rect x="0" y="10" width="120" height="40" fill="#94a3b8" />
              <rect x="0" y="50" width="120" height="65" fill="#334155" />
              {/* Red curb area (15 FT both sides) */}
              <rect x="25" y="47" width="70" height="6" fill="#ef4444" />
              {/* Hydrant icon */}
              <rect x="56" y="22" width="8" height="22" rx="2" fill="#ef4444" />
              <circle cx="60" cy="20" r="6" fill="#facc15" />
              <line x1="50" y1="28" x2="70" y2="28" stroke="#ef4444" strokeWidth="4" />
              {/* Distance dimension arrow */}
              <path d="M 28 75 L 92 75" stroke="#facc15" strokeWidth="2" />
              <polygon points="25,75 32,71 32,79" fill="#facc15" />
              <polygon points="95,75 88,71 88,79" fill="#facc15" />
              <rect x="38" y="85" width="44" height="18" rx="4" fill="#0f172a" />
              <text x="60" y="98" fill="#facc15" fontSize="10" fontWeight="900" textAnchor="middle">15 PIES</text>
            </svg>
            {showCaption && (
              <span className="text-[10px] font-black uppercase tracking-wider text-rose-600 dark:text-rose-400 mt-1.5">
                Prohibido Estacionar &lt; 15 Pies
              </span>
            )}
          </div>
        );

      case 23:
        // Stop Sign / Traffic Light 30 FT buffer
        return (
          <div className="flex flex-col items-center">
            <svg width={size} height={size} viewBox="0 0 120 120" className="drop-shadow-sm select-none">
              <rect x="0" y="10" width="120" height="40" fill="#94a3b8" />
              <rect x="0" y="50" width="120" height="65" fill="#334155" />
              {/* Stop Sign on post */}
              <line x1="95" y1="20" x2="95" y2="50" stroke="#64748b" strokeWidth="3" />
              <polygon points="90,12 100,12 106,18 106,28 100,34 90,34 84,28 84,18" fill="#dc2626" />
              <text x="95" y="25" fill="#ffffff" fontSize="6" fontWeight="900" textAnchor="middle">STOP</text>
              {/* 30 FT arrow */}
              <path d="M 25 75 L 92 75" stroke="#facc15" strokeWidth="2" />
              <polygon points="25,75 32,71 32,79" fill="#facc15" />
              <polygon points="95,75 88,71 88,79" fill="#facc15" />
              <rect x="38" y="85" width="44" height="18" rx="4" fill="#0f172a" />
              <text x="60" y="98" fill="#facc15" fontSize="10" fontWeight="900" textAnchor="middle">30 PIES</text>
            </svg>
            {showCaption && (
              <span className="text-[10px] font-black uppercase tracking-wider text-rose-600 dark:text-rose-400 mt-1.5">
                Prohibido Estacionar &lt; 30 Pies
              </span>
            )}
          </div>
        );

      case 24:
        return (
          <div className="flex flex-col items-center">
            <RoadSignSvg signId="sign-speed-limit" size={size} />
            {showCaption && (
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 mt-1.5">
                65 / 70 MPH Interestatal Rural
              </span>
            )}
          </div>
        );

      // --- GRUPO 4: ALCOHOL, DROGAS Y DUI ---
      case 25:
        // BAC 0.08% Legal Limit Gauge
        return (
          <div className="flex flex-col items-center">
            <svg width={size} height={size} viewBox="0 0 120 120" className="drop-shadow-sm select-none">
              <rect x="8" y="8" width="104" height="104" rx="14" fill="#1e293b" stroke="#334155" strokeWidth="2" />
              {/* Gauge arc */}
              <path d="M 25 80 A 40 40 0 0 1 95 80" fill="none" stroke="#334155" strokeWidth="12" strokeLinecap="round" />
              <path d="M 25 80 A 40 40 0 0 1 50 42" fill="none" stroke="#10b981" strokeWidth="12" />
              <path d="M 50 42 A 40 40 0 0 1 75 45" fill="none" stroke="#f59e0b" strokeWidth="12" />
              <path d="M 75 45 A 40 40 0 0 1 95 80" fill="none" stroke="#ef4444" strokeWidth="12" />
              {/* 0.08 text */}
              <text x="60" y="78" fill="#ffffff" fontSize="18" fontWeight="900" textAnchor="middle">0.08%</text>
              <text x="60" y="94" fill="#f87171" fontSize="9" fontWeight="900" textAnchor="middle">LÍMITE DUI PA (≥21)</text>
            </svg>
            {showCaption && (
              <span className="text-[10px] font-black uppercase tracking-wider text-rose-600 dark:text-rose-400 mt-1.5">
                BAC 0.08% = Límite Legal Adultos
              </span>
            )}
          </div>
        );

      case 26:
        // Zero Tolerance 0.02% Under 21
        return (
          <div className="flex flex-col items-center">
            <svg width={size} height={size} viewBox="0 0 120 120" className="drop-shadow-sm select-none">
              <path d="M 60 10 L 105 25 L 105 65 Q 105 105 60 115 Q 15 105 15 65 L 15 25 Z" fill="#991b1b" stroke="#f87171" strokeWidth="2" />
              <text x="60" y="38" fill="#fecaca" fontSize="8" fontWeight="900" textAnchor="middle">TOLERANCIA CERO</text>
              <text x="60" y="48" fill="#fecaca" fontSize="7" fontWeight="800" textAnchor="middle">&lt; 21 AÑOS</text>
              <text x="60" y="78" fill="#ffffff" fontSize="22" fontWeight="900" textAnchor="middle">0.02%</text>
              <text x="60" y="96" fill="#fef08a" fontSize="8" fontWeight="900" textAnchor="middle">SUSPENSIÓN 1 AÑO</text>
            </svg>
            {showCaption && (
              <span className="text-[10px] font-black uppercase tracking-wider text-rose-600 dark:text-rose-400 mt-1.5">
                BAC 0.02% Tolerancia Cero
              </span>
            )}
          </div>
        );

      case 27:
        // CDL 0.04% BAC
        return (
          <div className="flex flex-col items-center">
            <svg width={size} height={size} viewBox="0 0 120 120" className="drop-shadow-sm select-none">
              <rect x="10" y="15" width="100" height="90" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
              <rect x="25" y="24" width="70" height="18" rx="4" fill="#312e81" />
              <text x="60" y="37" fill="#c7d2fe" fontSize="10" fontWeight="900" textAnchor="middle">CDL COMERCIAL</text>
              <text x="60" y="70" fill="#ffffff" fontSize="22" fontWeight="900" textAnchor="middle">0.04%</text>
              <text x="60" y="90" fill="#f43f5e" fontSize="9" fontWeight="900" textAnchor="middle">REVOCACIÓN CDL</text>
            </svg>
            {showCaption && (
              <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mt-1.5">
                BAC 0.04% Camiones CDL
              </span>
            )}
          </div>
        );

      case 28:
        // Implied Consent Breath Test
        return (
          <div className="flex flex-col items-center">
            <svg width={size} height={size} viewBox="0 0 120 120" className="drop-shadow-sm select-none">
              <rect x="10" y="10" width="100" height="100" rx="14" fill="#0f172a" stroke="#ef4444" strokeWidth="2" />
              <circle cx="60" cy="50" r="26" fill="#1e293b" stroke="#f87171" strokeWidth="2" />
              <text x="60" y="46" fill="#fca5a5" fontSize="7" fontWeight="900" textAnchor="middle">TEST QUÍMICO</text>
              <text x="60" y="58" fill="#ffffff" fontSize="9" fontWeight="900" textAnchor="middle">OBLIGATORIO</text>
              <line x1="38" y1="72" x2="82" y2="28" stroke="#ef4444" strokeWidth="3" />
              <rect x="18" y="85" width="84" height="18" rx="4" fill="#7f1d1d" />
              <text x="60" y="98" fill="#fecaca" fontSize="8" fontWeight="900" textAnchor="middle">NEGARSE = -12 MESES</text>
            </svg>
            {showCaption && (
              <span className="text-[10px] font-black uppercase tracking-wider text-rose-600 dark:text-rose-400 mt-1.5">
                Consentimiento Implícito (12 Meses)
              </span>
            )}
          </div>
        );

      case 29:
        // Alcohol metabolism: 1 drink per hour
        return (
          <div className="flex flex-col items-center">
            <svg width={size} height={size} viewBox="0 0 120 120" className="drop-shadow-sm select-none">
              <circle cx="60" cy="60" r="48" fill="#0f172a" stroke="#38bdf8" strokeWidth="3" />
              {/* Clock hands */}
              <line x1="60" y1="60" x2="60" y2="26" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
              <line x1="60" y1="60" x2="82" y2="60" stroke="#facc15" strokeWidth="3" strokeLinecap="round" />
              <circle cx="60" cy="60" r="4" fill="#ffffff" />
              <rect x="25" y="78" width="70" height="18" rx="4" fill="#0369a1" />
              <text x="60" y="90" fill="#ffffff" fontSize="8" fontWeight="900" textAnchor="middle">1 HORA = 1 TRAGO</text>
            </svg>
            {showCaption && (
              <span className="text-[10px] font-black uppercase tracking-wider text-sky-600 dark:text-sky-400 mt-1.5">
                Solo el Tiempo Reduce el BAC
              </span>
            )}
          </div>
        );

      case 30:
        // Alcohol + Drugs Synergistic Effect
        return (
          <div className="flex flex-col items-center">
            <svg width={size} height={size} viewBox="0 0 120 120" className="drop-shadow-sm select-none">
              <rect x="10" y="10" width="100" height="100" rx="14" fill="#450a0a" stroke="#ef4444" strokeWidth="2" />
              <text x="60" y="32" fill="#fca5a5" fontSize="8" fontWeight="900" textAnchor="middle">ALCOHOL + FÁRMACOS</text>
              <text x="60" y="65" fill="#facc15" fontSize="30" fontWeight="900" textAnchor="middle">⚠️ × 10</text>
              <rect x="18" y="82" width="84" height="20" rx="4" fill="#991b1b" />
              <text x="60" y="96" fill="#ffffff" fontSize="8" fontWeight="900" textAnchor="middle">EFECTO SINÉRGICO</text>
            </svg>
            {showCaption && (
              <span className="text-[10px] font-black uppercase tracking-wider text-rose-600 dark:text-rose-400 mt-1.5">
                Efecto Multiplicador Sinérgico
              </span>
            )}
          </div>
        );

      case 31:
        // Open Container Prohibited
        return (
          <div className="flex flex-col items-center">
            <svg width={size} height={size} viewBox="0 0 120 120" className="drop-shadow-sm select-none">
              <circle cx="60" cy="60" r="50" fill="#ffffff" stroke="#dc2626" strokeWidth="8" />
              {/* Bottle / can silhouette */}
              <rect x="52" y="35" width="16" height="50" rx="2" fill="#1e293b" />
              <rect x="56" y="24" width="8" height="12" fill="#1e293b" />
              {/* Red strike through */}
              <line x1="25" y1="25" x2="95" y2="95" stroke="#dc2626" strokeWidth="8" />
            </svg>
            {showCaption && (
              <span className="text-[10px] font-black uppercase tracking-wider text-rose-600 dark:text-rose-400 mt-1.5">
                Contenedor Abierto Ilegal
              </span>
            )}
          </div>
        );

      // --- GRUPO 5: CONDICIONES ESPECIALES Y EMERGENCIAS ---
      case 32:
        // 4-Second Following Distance
        return (
          <div className="flex flex-col items-center">
            <svg width={size} height={size} viewBox="0 0 120 120" className="drop-shadow-sm select-none">
              <rect x="20" y="0" width="80" height="120" fill="#334155" />
              <line x1="60" y1="0" x2="60" y2="120" stroke="#facc15" strokeDasharray="6 4" strokeWidth="2" />
              {/* Front car */}
              <rect x="52" y="15" width="16" height="26" rx="3" fill="#10b981" />
              {/* Landmark tree */}
              <circle cx="106" cy="50" r="10" fill="#15803d" />
              <line x1="106" y1="50" x2="106" y2="70" stroke="#78350f" strokeWidth="3" />
              {/* Rear car */}
              <rect x="52" y="80" width="16" height="26" rx="3" fill="#3b82f6" />
              {/* 4 SECONDS label */}
              <rect x="35" y="47" width="50" height="24" rx="4" fill="#0f172a" />
              <text x="60" y="63" fill="#facc15" fontSize="12" fontWeight="900" textAnchor="middle">4 SEG</text>
            </svg>
            {showCaption && (
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mt-1.5">
                Regla de los 4 Segundos
              </span>
            )}
          </div>
        );

      case 33:
        // Hydroplaning tire water wedge
        return (
          <div className="flex flex-col items-center">
            <svg width={size} height={size} viewBox="0 0 120 120" className="drop-shadow-sm select-none">
              <rect x="0" y="90" width="120" height="30" fill="#1e293b" />
              {/* Water layer */}
              <rect x="0" y="80" width="120" height="10" fill="#38bdf8" />
              {/* Tire */}
              <circle cx="60" cy="45" r="35" fill="#0f172a" stroke="#475569" strokeWidth="8" />
              <circle cx="60" cy="45" r="15" fill="#94a3b8" />
              {/* Water wedge lifting tire */}
              <polygon points="50,88 75,76 85,88" fill="#0284c7" />
              <rect x="15" y="6" width="90" height="18" rx="4" fill="#0369a1" />
              <text x="60" y="19" fill="#ffffff" fontSize="9" fontWeight="900" textAnchor="middle">HIDROPLANEO (AGUA)</text>
            </svg>
            {showCaption && (
              <span className="text-[10px] font-black uppercase tracking-wider text-sky-600 dark:text-sky-400 mt-1.5">
                Desacelerar Sin Frenar
              </span>
            )}
          </div>
        );

      case 34:
        // Low beams in fog
        return (
          <div className="flex flex-col items-center">
            <svg width={size} height={size} viewBox="0 0 120 120" className="drop-shadow-sm select-none">
              <rect x="10" y="10" width="100" height="100" rx="14" fill="#1e293b" />
              {/* Fog clouds */}
              <path d="M 20 40 Q 40 30 60 40 Q 80 50 100 40" stroke="#94a3b8" strokeWidth="4" fill="none" opacity="0.6" />
              <path d="M 15 65 Q 40 55 70 65 Q 90 75 105 65" stroke="#94a3b8" strokeWidth="4" fill="none" opacity="0.6" />
              {/* Low beam light downward */}
              <polygon points="25,50 95,75 95,95 25,60" fill="#fef08a" opacity="0.5" />
              <rect x="15" y="85" width="90" height="18" rx="4" fill="#047857" />
              <text x="60" y="98" fill="#ffffff" fontSize="8" fontWeight="900" textAnchor="middle">LUCES BAJAS EN NIEBLA</text>
            </svg>
            {showCaption && (
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 mt-1.5">
                Usar Luces Bajas en Niebla
              </span>
            )}
          </div>
        );

      case 35:
        // Wipers on, lights on
        return (
          <div className="flex flex-col items-center">
            <svg width={size} height={size} viewBox="0 0 120 120" className="drop-shadow-sm select-none">
              <rect x="10" y="10" width="100" height="100" rx="14" fill="#0c4a6e" stroke="#38bdf8" strokeWidth="2" />
              <text x="60" y="32" fill="#bae6fd" fontSize="8" fontWeight="900" textAnchor="middle">LEY DE PENSILVANIA</text>
              <text x="60" y="52" fill="#ffffff" fontSize="11" fontWeight="900" textAnchor="middle">LIMPIAPARABRISAS</text>
              <text x="60" y="68" fill="#facc15" fontSize="16" fontWeight="900" textAnchor="middle">=</text>
              <rect x="20" y="78" width="80" height="22" rx="6" fill="#0284c7" />
              <text x="60" y="93" fill="#ffffff" fontSize="10" fontWeight="900" textAnchor="middle">FAROS ENCENDIDOS</text>
            </svg>
            {showCaption && (
              <span className="text-[10px] font-black uppercase tracking-wider text-sky-600 dark:text-sky-400 mt-1.5">
                Wipers On = Lights On
              </span>
            )}
          </div>
        );

      case 36:
        // Brake failure
        return (
          <div className="flex flex-col items-center">
            <svg width={size} height={size} viewBox="0 0 120 120" className="drop-shadow-sm select-none">
              <rect x="10" y="10" width="100" height="100" rx="14" fill="#450a0a" stroke="#f87171" strokeWidth="2" />
              <text x="60" y="30" fill="#fca5a5" fontSize="8" fontWeight="900" textAnchor="middle">FALLA DE FRENOS</text>
              <text x="60" y="52" fill="#fef08a" fontSize="11" fontWeight="900" textAnchor="middle">1. BOMBEAR PEDAL</text>
              <text x="60" y="72" fill="#ffffff" fontSize="11" fontWeight="900" textAnchor="middle">2. MARCHA BAJA</text>
              <text x="60" y="92" fill="#fca5a5" fontSize="11" fontWeight="900" textAnchor="middle">3. FRENO DE MANO</text>
            </svg>
            {showCaption && (
              <span className="text-[10px] font-black uppercase tracking-wider text-rose-600 dark:text-rose-400 mt-1.5">
                Bombear y Marcha Baja
              </span>
            )}
          </div>
        );

      case 37:
        // Train crossing 15 to 50 FT
        return (
          <div className="flex flex-col items-center">
            <RoadSignSvg signId="sign-railroad-crossbuck" size={size * 0.9} />
            {showCaption && (
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 mt-1.5">
                Detenerse a 15 - 50 Pies
              </span>
            )}
          </div>
        );

      case 38:
        // Tire Blowout steering
        return (
          <div className="flex flex-col items-center">
            <svg width={size} height={size} viewBox="0 0 120 120" className="drop-shadow-sm select-none">
              <rect x="10" y="10" width="100" height="100" rx="14" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
              {/* Steering wheel */}
              <circle cx="60" cy="52" r="28" fill="none" stroke="#facc15" strokeWidth="6" />
              <circle cx="60" cy="52" r="8" fill="#facc15" />
              <line x1="32" y1="52" x2="88" y2="52" stroke="#facc15" strokeWidth="5" />
              <line x1="60" y1="52" x2="60" y2="80" stroke="#facc15" strokeWidth="5" />
              <rect x="15" y="86" width="90" height="18" rx="4" fill="#b45309" />
              <text x="60" y="99" fill="#ffffff" fontSize="8" fontWeight="900" textAnchor="middle">SUJETAR VOLANTE FIRME</text>
            </svg>
            {showCaption && (
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 mt-1.5">
                Reventón: No Frenar de Golpe
              </span>
            )}
          </div>
        );

      // --- GRUPO 6: LEYES GENERALES, LICENCIAS JUNIOR Y PUNTOS ---
      case 39:
        // Junior license curfew 11 PM to 5 AM
        return (
          <div className="flex flex-col items-center">
            <svg width={size} height={size} viewBox="0 0 120 120" className="drop-shadow-sm select-none">
              <circle cx="60" cy="60" r="48" fill="#0f172a" stroke="#6366f1" strokeWidth="3" />
              {/* Restricted zone arc from 11 PM to 5 AM */}
              <path d="M 45 22 A 44 44 0 0 1 98 60" fill="none" stroke="#ef4444" strokeWidth="10" />
              {/* 11 PM & 5 AM text */}
              <text x="32" y="22" fill="#ef4444" fontSize="9" fontWeight="900">11 PM</text>
              <text x="86" y="78" fill="#ef4444" fontSize="9" fontWeight="900">5 AM</text>
              <rect x="25" y="52" width="70" height="24" rx="4" fill="#312e81" />
              <text x="60" y="65" fill="#ffffff" fontSize="8" fontWeight="900" textAnchor="middle">NOCHE RESTRINGIDA</text>
              <text x="60" y="73" fill="#c7d2fe" fontSize="6" fontWeight="800" textAnchor="middle">LICENCIA JUNIOR</text>
            </svg>
            {showCaption && (
              <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mt-1.5">
                Toque de Queda 11 PM a 5 AM
              </span>
            )}
          </div>
        );

      case 40:
        // 1 passenger rule
        return (
          <div className="flex flex-col items-center">
            <svg width={size} height={size} viewBox="0 0 120 120" className="drop-shadow-sm select-none">
              <rect x="10" y="10" width="100" height="100" rx="14" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
              <text x="60" y="32" fill="#93c5fd" fontSize="8" fontWeight="900" textAnchor="middle">PRIMEROS 6 MESES</text>
              <text x="60" y="66" fill="#ffffff" fontSize="34" fontWeight="900" textAnchor="middle">1</text>
              <rect x="15" y="78" width="90" height="22" rx="6" fill="#1d4ed8" />
              <text x="60" y="93" fill="#ffffff" fontSize="8" fontWeight="900" textAnchor="middle">MÁXIMO 1 PASAJERO &lt; 18</text>
            </svg>
            {showCaption && (
              <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 mt-1.5">
                Máximo 1 Pasajero No Familiar
              </span>
            )}
          </div>
        );

      case 41:
        // Downhill with curb: Wheels toward curb (RIGHT)
        return (
          <div className="flex flex-col items-center">
            <svg width={size} height={size} viewBox="0 0 120 120" className="drop-shadow-sm select-none">
              {/* Street slope */}
              <rect x="10" y="10" width="100" height="100" rx="10" fill="#334155" />
              {/* Curb on right side */}
              <rect x="95" y="10" width="15" height="100" fill="#94a3b8" />
              {/* Car heading downhill (facing downward) */}
              <rect x="45" y="30" width="36" height="60" rx="6" fill="#2563eb" />
              {/* Wheels turned toward curb (Right) */}
              <rect x="42" y="72" width="8" height="18" rx="2" fill="#0f172a" transform="rotate(22 46 81)" />
              <rect x="74" y="72" width="8" height="18" rx="2" fill="#0f172a" transform="rotate(22 78 81)" />
              {/* Arrow toward curb */}
              <path d="M 62 82 Q 85 85 92 88" fill="none" stroke="#facc15" strokeWidth="3" />
              <polygon points="95,88 88,83 88,93" fill="#facc15" />
              <rect x="15" y="14" width="75" height="16" rx="4" fill="#0f172a" />
              <text x="52" y="25" fill="#facc15" fontSize="7" fontWeight="900" textAnchor="middle">BAJADA: RUEDAS AL BORDILLO</text>
            </svg>
            {showCaption && (
              <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 mt-1.5">
                Bajada con Bordillo: Ruedas a la Derecha
              </span>
            )}
          </div>
        );

      case 42:
        // Uphill with curb: Wheels away from curb (LEFT)
        return (
          <div className="flex flex-col items-center">
            <svg width={size} height={size} viewBox="0 0 120 120" className="drop-shadow-sm select-none">
              <rect x="10" y="10" width="100" height="100" rx="10" fill="#334155" />
              <rect x="95" y="10" width="15" height="100" fill="#94a3b8" />
              <rect x="45" y="30" width="36" height="60" rx="6" fill="#10b981" />
              {/* Wheels turned away from curb (Left) */}
              <rect x="42" y="34" width="8" height="18" rx="2" fill="#0f172a" transform="rotate(-22 46 43)" />
              <rect x="74" y="34" width="8" height="18" rx="2" fill="#0f172a" transform="rotate(-22 78 43)" />
              {/* Arrow away from curb */}
              <path d="M 62 43 Q 35 40 28 36" fill="none" stroke="#facc15" strokeWidth="3" />
              <polygon points="24,35 32,31 32,41" fill="#facc15" />
              <rect x="15" y="90" width="75" height="16" rx="4" fill="#0f172a" />
              <text x="52" y="101" fill="#facc15" fontSize="7" fontWeight="900" textAnchor="middle">SUBIDA: RUEDAS A LA CALLE</text>
            </svg>
            {showCaption && (
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mt-1.5">
                Subida con Bordillo: Ruedas a la Izquierda
              </span>
            )}
          </div>
        );

      case 43:
        return (
          <div className="flex flex-col items-center">
            <RoadSignSvg signId="sign-bike-passing-4ft" size={size} />
            {showCaption && (
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 mt-1.5">
                Mínimo 4 Pies con Ciclistas
              </span>
            )}
          </div>
        );

      case 44:
        // PennDOT Points Notice: 6 points
        return (
          <div className="flex flex-col items-center">
            <svg width={size} height={size} viewBox="0 0 120 120" className="drop-shadow-sm select-none">
              <rect x="10" y="10" width="100" height="100" rx="14" fill="#450a0a" stroke="#ef4444" strokeWidth="2" />
              <text x="60" y="32" fill="#fca5a5" fontSize="8" fontWeight="900" textAnchor="middle">SISTEMA DE PUNTOS</text>
              <text x="60" y="65" fill="#fef08a" fontSize="32" fontWeight="900" textAnchor="middle">6 PTS</text>
              <rect x="15" y="78" width="90" height="22" rx="6" fill="#991b1b" />
              <text x="60" y="92" fill="#ffffff" fontSize="8" fontWeight="900" textAnchor="middle">EXAMEN ESCRITO OBLIGATORIO</text>
            </svg>
            {showCaption && (
              <span className="text-[10px] font-black uppercase tracking-wider text-rose-600 dark:text-rose-400 mt-1.5">
                6 Puntos = Examen Obligatorio
              </span>
            )}
          </div>
        );

      case 45:
        // Points reduction: 3 points per 12 months
        return (
          <div className="flex flex-col items-center">
            <svg width={size} height={size} viewBox="0 0 120 120" className="drop-shadow-sm select-none">
              <rect x="10" y="10" width="100" height="100" rx="14" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
              <text x="60" y="32" fill="#a7f3d0" fontSize="8" fontWeight="900" textAnchor="middle">REDUCCIÓN LIMPIA</text>
              <text x="60" y="65" fill="#6ee7b7" fontSize="28" fontWeight="900" textAnchor="middle">-3 PTS</text>
              <rect x="15" y="78" width="90" height="22" rx="6" fill="#047857" />
              <text x="60" y="92" fill="#ffffff" fontSize="8" fontWeight="900" textAnchor="middle">POR CADA 12 MESES LIMPIOS</text>
            </svg>
            {showCaption && (
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mt-1.5">
                -3 Puntos por Cada 12 Meses
              </span>
            )}
          </div>
        );

      case 46:
        // Child safety seat rear-facing < 2 years
        return (
          <div className="flex flex-col items-center">
            <svg width={size} height={size} viewBox="0 0 120 120" className="drop-shadow-sm select-none">
              <rect x="10" y="10" width="100" height="100" rx="14" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
              <text x="60" y="30" fill="#c7d2fe" fontSize="8" fontWeight="900" textAnchor="middle">ASIENTO INFANTIL PA</text>
              {/* Rear-facing silhouette */}
              <path d="M 40 45 Q 35 75 60 75 L 80 75" fill="none" stroke="#facc15" strokeWidth="5" strokeLinecap="round" />
              <circle cx="50" cy="55" r="7" fill="#ffffff" />
              <path d="M 75 48 L 50 48" stroke="#38bdf8" strokeWidth="3" />
              <polygon points="45,48 53,44 53,52" fill="#38bdf8" />
              <rect x="15" y="85" width="90" height="20" rx="4" fill="#4338ca" />
              <text x="60" y="98" fill="#ffffff" fontSize="8" fontWeight="900" textAnchor="middle">&lt; 2 AÑOS MIRANDO ATRÁS</text>
            </svg>
            {showCaption && (
              <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mt-1.5">
                &lt; 2 Años Orientado Hacia Atrás
              </span>
            )}
          </div>
        );

      default:
        return (
          <div className="flex flex-col items-center">
            <RoadSignSvg signId="sign-stop" size={size} />
          </div>
        );
    }
  };

  return (
    <div className={`inline-flex flex-col items-center justify-center p-2 rounded-2xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 shadow-sm ${className}`}>
      {renderVisualGraphic()}
    </div>
  );
};
