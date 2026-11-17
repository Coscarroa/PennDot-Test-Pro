import React from 'react';
import { X, Megaphone } from 'lucide-react';
import { Language } from '../types';

export type AdBannerVariant = 'top-leaderboard' | 'results-rectangle' | 'mobile-anchor';

interface AdBannerProps {
  variant: AdBannerVariant;
  language: Language;
  onDismiss?: () => void;
  className?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({
  variant,
  language,
  onDismiss,
  className = ''
}) => {
  const isEs = language === 'es';
  const adLabel = isEs ? 'Publicidad' : 'Advertisement';

  if (variant === 'top-leaderboard') {
    return (
      <aside
        aria-label={adLabel}
        className={`w-full max-w-5xl mx-auto px-3 sm:px-6 pt-3 pb-1 ${className}`}
      >
        <div className="relative flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 dark:border-slate-700/80 bg-slate-100/70 dark:bg-slate-900/60 px-4 py-2 min-h-[60px] sm:min-h-[90px] text-center transition-colors">
          <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-0.5 select-none">
            <Megaphone className="w-2.5 h-2.5" />
            <span>{adLabel}</span>
          </span>
          {/* AdSense Leaderboard Slot Container (728x90 Desktop / 320x50 Mobile) */}
          <div
            data-ad-slot="top-leaderboard"
            className="w-full flex items-center justify-center text-[11px] sm:text-xs font-medium text-slate-400 dark:text-slate-500"
          >
            <span>
              {isEs
                ? 'Espacio publicitario superior responsivo (728×90 / 320×50)'
                : 'Responsive Top Leaderboard Ad Slot (728×90 / 320×50)'}
            </span>
          </div>
        </div>
      </aside>
    );
  }

  if (variant === 'results-rectangle') {
    return (
      <aside
        aria-label={adLabel}
        className={`w-full flex justify-center mb-6 ${className}`}
      >
        <div className="w-full max-w-[360px] min-h-[250px] flex flex-col items-center justify-between rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/90 dark:bg-slate-900/70 p-4 text-center shadow-sm">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-200/70 dark:bg-slate-800 text-[9px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 select-none">
            <Megaphone className="w-2.5 h-2.5" />
            <span>{adLabel}</span>
          </span>

          {/* AdSense Medium Rectangle Slot Container (300x250 / 336x280) */}
          <div
            data-ad-slot="results-rectangle"
            className="flex-1 flex flex-col items-center justify-center px-3 py-6 text-xs text-slate-400 dark:text-slate-500 space-y-1.5"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-200/60 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500 mb-1">
              <Megaphone className="w-5 h-5" />
            </div>
            <p className="font-bold text-slate-500 dark:text-slate-400">
              {isEs ? 'Espacio Publicitario Pre-Resultados' : 'Pre-Results Rectangular Ad Slot'}
            </p>
            <p className="text-[11px] opacity-80">
              {isEs ? 'Formato rectangular estándar (300×250 / 336×280)' : 'Standard rectangular format (300×250 / 336×280)'}
            </p>
          </div>

          <span className="text-[9px] text-slate-400 dark:text-slate-600 select-none">
            Google AdSense Ready
          </span>
        </div>
      </aside>
    );
  }

  // mobile-anchor variant: thin fixed banner above the mobile bottom nav with dismiss button
  return (
    <aside
      aria-label={adLabel}
      className={`sm:hidden fixed left-0 right-0 z-30 px-2 pb-1 pointer-events-none ${className}`}
      style={{ bottom: 'calc(3.65rem + env(safe-area-inset-bottom, 0px))' }}
    >
      <div className="pointer-events-auto relative mx-auto max-w-md h-12 rounded-xl border border-slate-300/90 dark:border-slate-700 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-lg flex items-center justify-between px-3 gap-2">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <span className="shrink-0 px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[8px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {adLabel}
          </span>
          <div
            data-ad-slot="mobile-anchor"
            className="truncate text-[11px] font-semibold text-slate-500 dark:text-slate-400"
          >
            {isEs ? 'Banner móvil fijo (320×50)' : 'Mobile Anchor Banner (320×50)'}
          </div>
        </div>

        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            aria-label={isEs ? 'Cerrar anuncio' : 'Close ad'}
            title={isEs ? 'Cerrar anuncio' : 'Close ad'}
            className="shrink-0 w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </aside>
  );
};
