import React from 'react';
import {
  Car,
  BookOpen,
  ShieldCheck,
  BarChart3,
  MessageSquare,
  Moon,
  Sun,
  Palette,
  Bell,
  Cloud,
  FileText,
  Volume2,
  VolumeX,
  Wifi,
  WifiOff,
  Heart,
  Smartphone
} from 'lucide-react';
import { Language, ThemeMode } from '../types';
import { sound } from '../utils/sound';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  streakDays: number;
  isOnline: boolean;
  onOpenSync: () => void;
  onOpenNotifications: () => void;
  onOpenManual: () => void;
  onOpenDonations: () => void;
  onOpenInstallApp?: () => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  language,
  setLanguage,
  theme,
  setTheme,
  streakDays,
  isOnline,
  onOpenSync,
  onOpenNotifications,
  onOpenManual,
  onOpenDonations,
  onOpenInstallApp,
  soundEnabled,
  setSoundEnabled
}) => {
  const isEs = language === 'es';

  const cycleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('midnight');
    else setTheme('light');
  };

  const navItems = [
    {
      id: 'simulator',
      label: isEs ? 'Simulador Oficial' : 'Exam Simulator',
      sublabel: '18 Qs / 15 Pass',
      icon: Car
    },
    {
      id: 'practice',
      label: isEs ? 'Práctica Temática' : 'Practice Mode',
      sublabel: isEs ? 'Capítulos 1 - 5' : 'Chapters 1 - 5',
      icon: BookOpen
    },
    {
      id: 'signs',
      label: isEs ? 'Señales Viales' : 'Road Signs',
      sublabel: isEs ? 'Catálogo & Quiz' : 'Catalog & Quiz',
      icon: ShieldCheck
    },
    {
      id: 'stats',
      label: isEs ? 'Estadísticas' : 'Progress & Stats',
      sublabel: isEs ? 'Histórico & Fallos' : 'History & Weak Spots',
      icon: BarChart3
    },
    {
      id: 'forum',
      label: isEs ? 'Foro Comunitario' : 'Community Forum',
      sublabel: isEs ? 'Centros & Tips' : 'PA Centers & Tips',
      icon: MessageSquare
    }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b backdrop-blur-md transition-colors duration-200 bg-white/95 border-slate-200 dark:bg-slate-900/95 dark:border-slate-800">
      {/* Top Banner: PennDOT Branding & Utility Controls */}
      {/* Top Banner: PennDOT Branding Centralized & 2-Row Utility Controls */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-3 py-3">
          {/* Centralized Logo & Brand Title */}
          <div className="flex flex-col sm:flex-row items-center justify-center text-center gap-2.5 sm:gap-3.5">
            <img
              src="/assets/aistudio/PennDOT_PA_Driver_Exam_Pro_5c27bcf0.png"
              alt="PennDOT PA Driver Exam Pro"
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl object-contain shadow-lg shadow-blue-500/20 shrink-0 border border-slate-200 dark:border-slate-700 bg-blue-950 p-1"
            />
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="font-black text-lg sm:text-xl tracking-tight text-slate-900 dark:text-white">
                  PennDOT <span className="text-blue-600 dark:text-blue-400">PA Driver Exam Pro</span>
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-extrabold bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300 border border-amber-300 dark:border-amber-700">
                  PUB 95 Official
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">
                {isEs
                  ? 'Manual del Conductor de Pensilvania • Simulador Oficial & Práctica Interactiva'
                  : 'Pennsylvania Driver License Knowledge Test Simulator & Practice'}
              </p>
            </div>
          </div>

          {/* Action Icons & Toggles: ORGANIZED INTO 2 CENTERED ROWS (Auto Responsive) */}
          <div className="flex flex-col items-center justify-center gap-2 w-full pt-0.5">
            {/* ROW 1: Status & Core Settings (En Línea, Racha, Idioma, Sonido, Tema) */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5">
              {/* 1. En Línea / Offline status badge */}
              <div
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border transition-all ${
                  isOnline
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800'
                    : 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800'
                }`}
                title={isOnline ? 'Online Sync Active' : 'Offline Mode Active'}
              >
                {isOnline ? <Wifi className="w-3.5 h-3.5" /> : <WifiOff className="w-3.5 h-3.5" />}
                <span>{isOnline ? (isEs ? 'En Línea' : 'Online') : (isEs ? 'Modo Offline' : 'Offline')}</span>
              </div>

              {/* 2. Daily Streak */}
              <div
                className="flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 rounded-full font-extrabold text-xs"
                title={isEs ? `Racha de estudio: ${streakDays} días consecutivos` : `Study streak: ${streakDays} consecutive days`}
              >
                <span className="text-base leading-none">🔥</span>
                <span>{streakDays} {isEs ? 'días' : 'days'}</span>
              </div>

              {/* 3. Language Switcher */}
              <button
                onClick={() => {
                  const nextLang = language === 'es' ? 'en' : 'es';
                  setLanguage(nextLang);
                  sound.playCorrect();
                }}
                className="flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors shadow-sm cursor-pointer"
                title={isEs ? 'Switch to English' : 'Cambiar a Español'}
              >
                <span className="text-sm">{language === 'es' ? '🇺🇸' : '🇪🇸'}</span>
                <span>{language === 'es' ? 'English' : 'Español'}</span>
              </button>

              {/* 4. Sound FX Toggle */}
              <button
                onClick={() => {
                  const next = !soundEnabled;
                  setSoundEnabled(next);
                  sound.enabled = next;
                  if (next) sound.playCorrect();
                }}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer text-xs font-semibold"
                title={soundEnabled ? (isEs ? 'Silenciar sonidos' : 'Mute sounds') : (isEs ? 'Activar sonidos' : 'Enable sounds')}
              >
                {soundEnabled ? (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    <span className="hidden sm:inline">{isEs ? 'Sonido' : 'Sound'}</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-3.5 h-3.5 opacity-50" />
                    <span className="hidden sm:inline opacity-70">{isEs ? 'Silencio' : 'Muted'}</span>
                  </>
                )}
              </button>

              {/* 5. Theme Toggle */}
              <button
                onClick={cycleTheme}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer text-xs font-semibold"
                title={
                  theme === 'light'
                    ? 'Modo Claro (Click para Oscuro)'
                    : theme === 'dark'
                    ? 'Modo Oscuro (Click para Midnight Azul)'
                    : 'Modo Midnight (Click para Claro)'
                }
              >
                {theme === 'light' ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-500" />
                    <span className="hidden sm:inline">Claro</span>
                  </>
                ) : theme === 'dark' ? (
                  <>
                    <Moon className="w-3.5 h-3.5 text-blue-400" />
                    <span className="hidden sm:inline">Oscuro</span>
                  </>
                ) : (
                  <>
                    <Palette className="w-3.5 h-3.5 text-indigo-400" />
                    <span className="hidden sm:inline">Midnight</span>
                  </>
                )}
              </button>
            </div>

            {/* ROW 2: Community & Action Utilities (Notificaciones, Sincronizar, Manual PDF, Donar) */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5">
              {/* 6. Notifications Button */}
              <button
                onClick={onOpenNotifications}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold transition-colors relative cursor-pointer"
                title={isEs ? 'Notificaciones y Recordatorios Diarios' : 'Push Notifications & Daily Reminders'}
              >
                <Bell className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>{isEs ? 'Avisos' : 'Alerts'}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              </button>

              {/* 7. Cloud Sync Button */}
              <button
                onClick={onOpenSync}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shadow-sm cursor-pointer"
                title={isEs ? 'Sincronizar entre dispositivos (Nube)' : 'Cloud Multi-Device Sync'}
              >
                <Cloud className="w-3.5 h-3.5" />
                <span>{isEs ? 'Sincronizar' : 'Cloud Sync'}</span>
              </button>

              {/* 8. Official PDF Handbook Link */}
              <button
                onClick={onOpenManual}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold text-xs transition-colors cursor-pointer"
                title="Manual Oficial PennDOT PDF"
              >
                <FileText className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>{isEs ? 'Manual PDF' : 'PA Manual'}</span>
              </button>

              {/* 9. Donations Button */}
              <button
                onClick={onOpenDonations}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-bold text-xs transition-all shadow-sm hover:shadow-rose-500/20 cursor-pointer"
                title={isEs ? 'Apoyar el proyecto con una donación (Zelle / Cash App / Cripto)' : 'Support with a donation (Zelle / Cash App / Crypto)'}
              >
                <Heart className="w-3.5 h-3.5 fill-white" />
                <span>{isEs ? 'Donar' : 'Donate'}</span>
              </button>

              {/* 10. Install PWA App Button */}
              {onOpenInstallApp && (
                <button
                  onClick={onOpenInstallApp}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900 font-bold text-xs transition-all shadow-sm cursor-pointer"
                  title={isEs ? 'Instalar aplicación en móvil o escritorio' : 'Install web app on mobile or desktop'}
                >
                  <Smartphone className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>{isEs ? 'Instalar App' : 'Install App'}</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Tab Navigation Menu (Visible on Desktop / Tablet, on Mobile handled by ergonomic bottom navigation) */}
        <nav className="hidden sm:flex justify-center flex-wrap gap-2 py-2.5 border-t border-slate-100 dark:border-slate-800/60">
          {navItems.map(item => {
            const Icon = item.icon;
            const active = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                  active
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-blue-600 dark:text-blue-400'}`} />
                <div className="text-left">
                  <div className="leading-tight">{item.label}</div>
                  <div className={`text-[10px] font-normal leading-tight opacity-80 ${active ? 'text-blue-100' : 'text-slate-400 dark:text-slate-500'}`}>
                    {item.sublabel}
                  </div>
                </div>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
