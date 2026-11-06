import React, { useState, useEffect } from 'react';
import {
  Smartphone,
  Download,
  Share,
  PlusSquare,
  CheckCircle2,
  X,
  Sparkles,
  WifiOff,
  Zap,
  ShieldCheck
} from 'lucide-react';
import { Language } from '../types';
import { sound } from '../utils/sound';

interface InstallPwaModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const InstallPwaModal: React.FC<InstallPwaModalProps> = ({
  isOpen,
  onClose,
  language
}) => {
  const isEs = language === 'es';
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isIOS, setIsIOS] = useState<boolean>(false);
  const [isStandalone, setIsStandalone] = useState<boolean>(false);

  useEffect(() => {
    // Check if already installed in standalone mode
    if (typeof window !== 'undefined') {
      const isStandaloneMode =
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as any).standalone === true;
      setIsStandalone(isStandaloneMode);

      // Detect iOS
      const ua = window.navigator.userAgent.toLowerCase();
      const isIosDevice = /iphone|ipad|ipod/.test(ua);
      setIsIOS(isIosDevice);

      // Listen for beforeinstallprompt event (Android / Chromium)
      const handleBeforeInstall = (e: Event) => {
        e.preventDefault();
        setDeferredPrompt(e);
      };

      window.addEventListener('beforeinstallprompt', handleBeforeInstall);
      return () => {
        window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      };
    }
  }, []);

  const handleInstallClick = async () => {
    sound.playCorrect();
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
        onClose();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn"
    >
      <div
        onClick={e => e.stopPropagation()}
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative text-left"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with App Icon */}
        <div className="flex items-center gap-3.5 mb-5">
          <img
            src="/assets/aistudio/PennDOT_PA_Driver_Exam_Pro_5c27bcf0.png"
            alt="PennDOT PA Driver Exam Pro"
            className="w-14 h-14 rounded-2xl object-contain shadow-md border border-slate-200 dark:border-slate-700 bg-blue-950 p-1"
          />
          <div>
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-[10px] font-black uppercase tracking-wider mb-1">
              <Sparkles className="w-3 h-3 text-blue-500" />
              <span>{isEs ? 'Aplicación Web & Móvil' : 'Web & Mobile PWA'}</span>
            </div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white leading-tight">
              {isEs ? 'Instalar en tu Teléfono' : 'Install on Your Phone'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              PennDOT PA Driver Exam Pro
            </p>
          </div>
        </div>

        {/* Benefits Cards */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-center">
            <WifiOff className="w-4 h-4 text-emerald-500 mx-auto mb-1" />
            <div className="text-[11px] font-bold text-slate-800 dark:text-slate-200">
              {isEs ? '100% Offline' : '100% Offline'}
            </div>
            <div className="text-[9px] text-slate-500 dark:text-slate-400">
              {isEs ? 'Sin internet' : 'No data needed'}
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-center">
            <Zap className="w-4 h-4 text-amber-500 mx-auto mb-1" />
            <div className="text-[11px] font-bold text-slate-800 dark:text-slate-200">
              {isEs ? 'Ultrarrápida' : 'Instant Load'}
            </div>
            <div className="text-[9px] text-slate-500 dark:text-slate-400">
              {isEs ? 'Acceso directo' : 'Home screen'}
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-center">
            <ShieldCheck className="w-4 h-4 text-blue-500 mx-auto mb-1" />
            <div className="text-[11px] font-bold text-slate-800 dark:text-slate-200">
              {isEs ? 'PUB 95' : 'Official PA'}
            </div>
            <div className="text-[9px] text-slate-500 dark:text-slate-400">
              {isEs ? 'Actualizado' : 'Up to date'}
            </div>
          </div>
        </div>

        {/* Android / Desktop Instant Install Button */}
        {deferredPrompt ? (
          <div>
            <button
              onClick={handleInstallClick}
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-sm shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Download className="w-5 h-5" />
              <span>{isEs ? 'Instalar Ahora en este Dispositivo' : 'Install Now on this Device'}</span>
            </button>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 text-center mt-2">
              {isEs
                ? 'Se agregará a tu pantalla de inicio como una aplicación nativa.'
                : 'Adds directly to your home screen or desktop as a native app.'}
            </p>
          </div>
        ) : isIOS ? (
          /* iOS Safari Specific Guide */
          <div className="space-y-3 p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/60 dark:border-blue-900/40">
            <div className="text-xs font-bold text-blue-900 dark:text-blue-300 flex items-center gap-1.5">
              <Smartphone className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>{isEs ? 'Cómo instalar en iPhone / iPad (Safari):' : 'How to install on iPhone / iPad (Safari):'}</span>
            </div>

            <div className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
              <div className="flex items-start gap-2.5">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  1
                </span>
                <div>
                  {isEs ? (
                    <>
                      Toca el botón <strong>Compartir</strong> en la barra inferior de Safari{' '}
                      <Share className="w-3.5 h-3.5 inline text-blue-600 -mt-0.5" />.
                    </>
                  ) : (
                    <>
                      Tap the <strong>Share</strong> icon on the bottom Safari toolbar{' '}
                      <Share className="w-3.5 h-3.5 inline text-blue-600 -mt-0.5" />.
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  2
                </span>
                <div>
                  {isEs ? (
                    <>
                      Desplázate hacia abajo y selecciona <strong>"Agregar a Inicio"</strong>{' '}
                      <PlusSquare className="w-3.5 h-3.5 inline text-slate-700 dark:text-slate-300 -mt-0.5" />.
                    </>
                  ) : (
                    <>
                      Scroll down and tap <strong>"Add to Home Screen"</strong>{' '}
                      <PlusSquare className="w-3.5 h-3.5 inline text-slate-700 dark:text-slate-300 -mt-0.5" />.
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  3
                </span>
                <div>
                  {isEs ? (
                    <>
                      Toca <strong>"Agregar"</strong> en la esquina superior derecha. ¡Listo!
                    </>
                  ) : (
                    <>
                      Tap <strong>"Add"</strong> in the top-right corner. Ready to use!
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* General Browser Guide / Cloudflare info */
          <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs text-slate-600 dark:text-slate-300 space-y-2">
            <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>
                {isEs
                  ? 'Aplicación Web Compatible con Cloudflare & Móviles'
                  : 'Cloudflare & Mobile-Optimized Web App'}
              </span>
            </div>
            <p>
              {isEs
                ? 'Puedes abrir esta web directamente en el navegador de tu teléfono (Chrome, Safari, Firefox) o instalarla agregándola a tu pantalla principal.'
                : 'You can open this website directly on your mobile browser or install it to your home screen for full-screen offline use.'}
            </p>
          </div>
        )}

        <div className="mt-5 text-center">
          <button
            onClick={onClose}
            className="text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer"
          >
            {isEs ? 'Continuar en la Web' : 'Continue in Web Browser'}
          </button>
        </div>
      </div>
    </div>
  );
};
