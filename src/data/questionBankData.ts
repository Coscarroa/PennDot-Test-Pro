import questionsJson from '../../public/preguntas.json';

export type CategoryGroupId =
  | 'all'
  | 'favorites'
  | 'grupo1'
  | 'grupo2'
  | 'grupo3'
  | 'grupo4'
  | 'grupo5'
  | 'grupo6';

export interface QuestionBankItem {
  id: number;
  categoria: 'grupo1' | 'grupo2' | 'grupo3' | 'grupo4' | 'grupo5' | 'grupo6';
  pregunta: string;
  opciones: string[];
  correcta: string;
  explicacion: string;
}

export interface CategoryGroupMeta {
  id: CategoryGroupId;
  title: string;
  shortTitle: string;
  badge: string;
  icon: string;
  accentColor: string;
  bgLight: string;
  bgDark: string;
  borderLight: string;
  borderDark: string;
  textLight: string;
  textDark: string;
  description: string;
}

export const CATEGORY_GROUPS: CategoryGroupMeta[] = [
  {
    id: 'all',
    title: 'Todas las Preguntas',
    shortTitle: 'Todas',
    badge: 'Banco Completo',
    icon: '📚',
    accentColor: 'indigo',
    bgLight: 'bg-indigo-50',
    bgDark: 'dark:bg-indigo-950/40',
    borderLight: 'border-indigo-200',
    borderDark: 'dark:border-indigo-800',
    textLight: 'text-indigo-700',
    textDark: 'dark:text-indigo-300',
    description: 'Catálogo de estudio integral para el examen oficial de Pensilvania.'
  },
  {
    id: 'favorites',
    title: 'Mis Notas / Favoritas',
    shortTitle: 'Mis Notas',
    badge: 'Guardadas',
    icon: '⭐',
    accentColor: 'amber',
    bgLight: 'bg-amber-50',
    bgDark: 'dark:bg-amber-950/40',
    borderLight: 'border-amber-200',
    borderDark: 'dark:border-amber-800',
    textLight: 'text-amber-700',
    textDark: 'dark:text-amber-300',
    description: 'Preguntas difíciles o prioritarias marcadas con estrella para repaso rápido.'
  },
  {
    id: 'grupo1',
    title: 'Grupo 1: Señales de Tránsito, Formas y Colores',
    shortTitle: 'Señales & Formas',
    badge: 'Grupo 1',
    icon: '🛑',
    accentColor: 'rose',
    bgLight: 'bg-rose-50',
    bgDark: 'dark:bg-rose-950/40',
    borderLight: 'border-rose-200',
    borderDark: 'dark:border-rose-800',
    textLight: 'text-rose-700',
    textDark: 'dark:text-rose-300',
    description: 'Significado de octágonos, triángulos, banderines, colores y marcas en el pavimento.'
  },
  {
    id: 'grupo2',
    title: 'Grupo 2: Reglas de Prioridad e Intersecciones',
    shortTitle: 'Prioridad & Cruces',
    badge: 'Grupo 2',
    icon: '🚙',
    accentColor: 'blue',
    bgLight: 'bg-blue-50',
    bgDark: 'dark:bg-blue-950/40',
    borderLight: 'border-blue-200',
    borderDark: 'dark:border-blue-800',
    textLight: 'text-blue-700',
    textDark: 'dark:text-blue-300',
    description: '4-way stops, giro a la derecha en rojo, rotondas, peatones y vehículos de emergencia.'
  },
  {
    id: 'grupo3',
    title: 'Grupo 3: Límites de Velocidad y Zonas Escolares',
    shortTitle: 'Velocidad & Escuela',
    badge: 'Grupo 3',
    icon: '🚸',
    accentColor: 'amber',
    bgLight: 'bg-amber-50',
    bgDark: 'dark:bg-amber-950/40',
    borderLight: 'border-amber-200',
    borderDark: 'dark:border-amber-800',
    textLight: 'text-amber-700',
    textDark: 'dark:text-amber-300',
    description: 'Ley de 10 pies para autobuses escolares, 15 mph en zona escolar, distancias a hidrantes.'
  },
  {
    id: 'grupo4',
    title: 'Grupo 4: Alcohol, Drogas y Leyes de Conducción (DUI)',
    shortTitle: 'Alcohol & DUI',
    badge: 'Grupo 4',
    icon: '🚫',
    accentColor: 'red',
    bgLight: 'bg-red-50',
    bgDark: 'dark:bg-red-950/40',
    borderLight: 'border-red-200',
    borderDark: 'dark:border-red-800',
    textLight: 'text-red-700',
    textDark: 'dark:text-red-300',
    description: 'Límites de BAC (0.08%, 0.02% tolerancia cero), ley de consentimiento implícito y metabolización.'
  },
  {
    id: 'grupo5',
    title: 'Grupo 5: Conducción en Condiciones Especiales y Emergencias',
    shortTitle: 'Emergencias & Clima',
    badge: 'Grupo 5',
    icon: '🌧️',
    accentColor: 'cyan',
    bgLight: 'bg-cyan-50',
    bgDark: 'dark:bg-cyan-950/40',
    borderLight: 'border-cyan-200',
    borderDark: 'dark:border-cyan-800',
    textLight: 'text-cyan-700',
    textDark: 'dark:text-cyan-300',
    description: 'Regla de los 4 segundos, hidroplaneo, niebla, fallo de frenos y cruces de ferrocarril.'
  },
  {
    id: 'grupo6',
    title: 'Grupo 6: Leyes Generales, Licencias Junior y Sistema de Puntos',
    shortTitle: 'Leyes & Puntos',
    badge: 'Grupo 6',
    icon: '⚖️',
    accentColor: 'emerald',
    bgLight: 'bg-emerald-50',
    bgDark: 'dark:bg-emerald-950/40',
    borderLight: 'border-emerald-200',
    borderDark: 'dark:border-emerald-800',
    textLight: 'text-emerald-700',
    textDark: 'dark:text-emerald-300',
    description: 'Restricciones de 11pm a 5am en Licencia Junior, estacionamiento en pendientes, ciclistas y puntos.'
  }
];

export const QUESTION_BANK_DATABASE: QuestionBankItem[] = questionsJson as QuestionBankItem[];
