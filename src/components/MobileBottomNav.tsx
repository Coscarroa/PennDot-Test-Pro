import React from 'react';
import {
  Car,
  BookOpen,
  ShieldCheck,
  BarChart3,
  MessageSquare
} from 'lucide-react';
import { Language } from '../types';
import { sound } from '../utils/sound';

interface MobileBottomNavProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  language: Language;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentTab,
  setCurrentTab,
  language
}) => {
  const isEs = language === 'es';

  const navItems = [
    {
      id: 'simulator',
      label: isEs ? 'Simulador' : 'Exam',
      icon: Car
    },
    {
      id: 'practice',
      label: isEs ? 'Práctica' : 'Practice',
      icon: BookOpen
    },
    {
      id: 'signs',
      label: isEs ? 'Señales' : 'Signs',
      icon: ShieldCheck
    },
    {
      id: 'stats',
      label: isEs ? 'Progreso' : 'Stats',
      icon: BarChart3
    },
    {
      id: 'forum',
      label: isEs ? 'Foro' : 'Forum',
      icon: MessageSquare
    }
  ];

  return (
    <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_-4px_20px_rgba(0,0,0,0.3)] pb-[max(0.5rem,env(safe-area-inset-bottom))]">
      <div className="grid grid-cols-5 h-14">
        {navItems.map(item => {
          const Icon = item.icon;
          const active = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                sound.playCorrect();
                setCurrentTab(item.id);
                // Scroll to top when changing tab
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex flex-col items-center justify-center gap-0.5 relative transition-colors cursor-pointer ${
                active
                  ? 'text-blue-600 dark:text-blue-400 font-extrabold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 font-medium'
              }`}
            >
              {active && (
                <span className="absolute top-0 w-8 h-1 bg-blue-600 dark:bg-blue-400 rounded-b-full shadow-sm" />
              )}
              <div
                className={`p-1 rounded-xl transition-transform ${
                  active ? 'scale-110 bg-blue-50 dark:bg-blue-950/60' : ''
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] leading-tight tracking-tight">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
