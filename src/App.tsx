import React, { useState, useEffect } from 'react';
import {
  Bell,
  Sparkles,
  Wifi,
  WifiOff,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  X,
  Heart
} from 'lucide-react';
import { UserDataState, Language, ThemeMode } from './types';
import { loadUserState, saveUserState, defaultInitialState } from './utils/storage';
import { Navbar } from './components/Navbar';
import { ExamSimulator } from './components/ExamSimulator';
import { PracticeMode } from './components/PracticeMode';
import { SignsCatalog } from './components/SignsCatalog';
import { StatisticsView } from './components/StatisticsView';
import { CommunityForum } from './components/CommunityForum';
import { NotificationsModal } from './components/NotificationsModal';
import { CloudSyncModal } from './components/CloudSyncModal';
import { ManualReferenceModal } from './components/ManualReferenceModal';
import { DonationModal } from './components/DonationModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { InstallPwaModal } from './components/InstallPwaModal';

interface ToastNotification {
  id: string;
  title: string;
  body: string;
}

export default function App() {
  const [userState, setUserState] = useState<UserDataState>(() => loadUserState());
  const [currentTab, setCurrentTab] = useState<string>('simulator');
  const [isOnline, setIsOnline] = useState<boolean>(typeof navigator !== 'undefined' ? navigator.onLine : true);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Modals state
  const [isSyncModalOpen, setIsSyncModalOpen] = useState<boolean>(false);
  const [isNotifModalOpen, setIsNotifModalOpen] = useState<boolean>(false);
  const [isManualModalOpen, setIsManualModalOpen] = useState<boolean>(false);
  const [isDonationModalOpen, setIsDonationModalOpen] = useState<boolean>(false);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState<boolean>(false);

  // Toast notification state
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  const language = userState.language;
  const isEs = language === 'es';

  // Apply Theme Mode (light / dark / midnight) to document root
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark', 'midnight');

    if (userState.theme === 'dark') {
      root.classList.add('dark');
    } else if (userState.theme === 'midnight') {
      root.classList.add('dark', 'midnight');
    }
  }, [userState.theme]);

  // Online / Offline listener
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      showToast(
        isEs ? 'Conexión Restablecida' : 'Connection Restored',
        isEs ? 'Ahora sincronizado en línea' : 'Now synced online'
      );
    };
    const handleOffline = () => {
      setIsOnline(false);
      showToast(
        isEs ? 'Modo Offline Activado' : 'Offline Mode Active',
        isEs ? 'Toda la app y preguntas funcionan sin internet' : 'All questions & app work without internet'
      );
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [isEs]);

  const showToast = (title: string, body: string) => {
    const id = `toast-${Date.now()}`;
    setToasts(prev => [...prev, { id, title, body }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  const setLanguage = (lang: Language) => {
    setUserState(prev => {
      const next = { ...prev, language: lang };
      saveUserState(next);
      return next;
    });
  };

  const setTheme = (theme: ThemeMode) => {
    setUserState(prev => {
      const next = { ...prev, theme };
      saveUserState(next);
      return next;
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Navbar with full navigation and quick switches */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        language={language}
        setLanguage={setLanguage}
        theme={userState.theme}
        setTheme={setTheme}
        streakDays={userState.streakDays}
        isOnline={isOnline}
        onOpenSync={() => setIsSyncModalOpen(true)}
        onOpenNotifications={() => setIsNotifModalOpen(true)}
        onOpenManual={() => setIsManualModalOpen(true)}
        onOpenDonations={() => setIsDonationModalOpen(true)}
        onOpenInstallApp={() => setIsInstallModalOpen(true)}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
      />

      {/* Main Content Area (Extra bottom padding on mobile to clear the thumb-friendly bottom nav bar) */}
      <main className="flex-1 pb-24 sm:pb-16 px-2 sm:px-0">
        {currentTab === 'simulator' && (
          <ExamSimulator
            language={language}
            userState={userState}
            setUserState={setUserState}
            onGoToPractice={() => setCurrentTab('practice')}
            onOpenDonations={() => setIsDonationModalOpen(true)}
          />
        )}

        {currentTab === 'practice' && (
          <PracticeMode
            language={language}
            userState={userState}
            setUserState={setUserState}
          />
        )}

        {currentTab === 'signs' && (
          <SignsCatalog language={language} />
        )}

        {currentTab === 'stats' && (
          <StatisticsView
            language={language}
            userState={userState}
            setUserState={setUserState}
            onStartExam={() => setCurrentTab('simulator')}
            onGoToPractice={() => setCurrentTab('practice')}
          />
        )}

        {currentTab === 'forum' && (
          <CommunityForum language={language} />
        )}
      </main>

      {/* Footer (Safe bottom padding on mobile so it clears bottom nav) */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md py-6 px-4 sm:px-6 mb-14 sm:mb-0">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 text-center sm:text-left">
            <img
              src="/assets/aistudio/PennDOT_PA_Driver_Exam_Pro_5c27bcf0.png"
              alt="PennDOT PA Driver Exam Pro"
              className="w-6 h-6 rounded-md object-contain border border-slate-200 dark:border-slate-700 bg-blue-950"
            />
            <span className="font-extrabold text-slate-800 dark:text-slate-200">
              PennDOT Driver Exam Pro
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="text-[11px] sm:text-xs">
              {isEs
                ? 'Basado en el Manual del Conductor de Pensilvania (PUB 95)'
                : 'Based on official Pennsylvania Driver\'s Manual (PUB 95)'}
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setIsInstallModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900 transition-colors cursor-pointer"
            >
              <span>📲 {isEs ? 'Instalar App' : 'Install PWA'}</span>
            </button>
            <button
              onClick={() => setIsDonationModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-bold bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200 dark:border-rose-800 hover:bg-rose-100 dark:hover:bg-rose-900 transition-colors cursor-pointer"
            >
              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
              <span>{isEs ? 'Donar' : 'Donate'}</span>
            </button>
            <button
              onClick={() => setIsManualModalOpen(true)}
              className="hover:underline font-semibold text-blue-600 dark:text-blue-400"
            >
              {isEs ? 'Manual PDF' : 'PA Handbook'}
            </button>
            <button
              onClick={() => setIsSyncModalOpen(true)}
              className="hover:underline font-semibold text-slate-600 dark:text-slate-300"
            >
              {isEs ? 'Sincronizar' : 'Sync Code'}
            </button>
            <span className="text-slate-400">v1.1.0 Cloudflare Ready</span>
          </div>
        </div>
      </footer>

      {/* Ergonomic Mobile Bottom Navigation Bar (Smart Thumb Nav for Phones) */}
      <MobileBottomNav
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        language={language}
      />

      {/* Floating In-App Toast Notifications */}
      <div className="fixed bottom-16 sm:bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-[calc(100%-2rem)] sm:w-full pointer-events-none">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className="pointer-events-auto bg-slate-900 dark:bg-white text-white dark:text-slate-900 p-4 rounded-2xl shadow-2xl border border-slate-700 dark:border-slate-200 animate-fadeIn flex items-start justify-between gap-3"
          >
            <div>
              <div className="font-black text-xs sm:text-sm">{toast.title}</div>
              <div className="text-xs text-slate-300 dark:text-slate-600 mt-0.5 leading-snug">
                {toast.body}
              </div>
            </div>
            <button
              onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
              className="text-slate-400 hover:text-white dark:hover:text-black p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Modals */}
      <NotificationsModal
        isOpen={isNotifModalOpen}
        onClose={() => setIsNotifModalOpen(false)}
        language={language}
        userState={userState}
        setUserState={setUserState}
        onShowToast={showToast}
      />

      <CloudSyncModal
        isOpen={isSyncModalOpen}
        onClose={() => setIsSyncModalOpen(false)}
        language={language}
        userState={userState}
        setUserState={setUserState}
        onShowToast={showToast}
      />

      <ManualReferenceModal
        isOpen={isManualModalOpen}
        onClose={() => setIsManualModalOpen(false)}
        language={language}
      />

      <DonationModal
        isOpen={isDonationModalOpen}
        onClose={() => setIsDonationModalOpen(false)}
        language={language}
        onShowToast={showToast}
      />

      <InstallPwaModal
        isOpen={isInstallModalOpen}
        onClose={() => setIsInstallModalOpen(false)}
        language={language}
      />
    </div>
  );
}
