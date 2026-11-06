import React, { useState } from 'react';
import {
  Bell,
  Clock,
  Volume2,
  Sparkles,
  CheckCircle2,
  X,
  Send,
  Calendar
} from 'lucide-react';
import { UserDataState, Language } from '../types';
import { sound } from '../utils/sound';
import { saveUserState } from '../utils/storage';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  userState: UserDataState;
  setUserState: React.Dispatch<React.SetStateAction<UserDataState>>;
  onShowToast: (title: string, body: string) => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  language,
  userState,
  setUserState,
  onShowToast
}) => {
  if (!isOpen) return null;

  const isEs = language === 'es';
  const settings = userState.notificationSettings;

  const [reminderTime, setReminderTime] = useState<string>(settings.reminderTime || '19:30');
  const [enabled, setEnabled] = useState<boolean>(settings.enabled);
  const [soundEnabled, setSoundAlert] = useState<boolean>(settings.sound);
  const [dailyTips, setDailyTips] = useState<boolean>(settings.dailyTips);

  const handleSave = () => {
    const updatedSettings = {
      ...settings,
      enabled,
      reminderTime,
      sound: soundEnabled,
      dailyTips
    };

    const nextState = {
      ...userState,
      notificationSettings: updatedSettings
    };

    setUserState(nextState);
    saveUserState(nextState);
    sound.playCorrect();
    onClose();

    onShowToast(
      isEs ? 'Recordatorios Guardados' : 'Reminders Saved',
      isEs
        ? `Notificaciones diarias programadas a las ${reminderTime}`
        : `Daily reminders scheduled for ${reminderTime}`
    );
  };

  const handleTestNotification = async () => {
    sound.playNotificationChime();

    const title = isEs
      ? '🔔 Recordatorio PennDOT Pro'
      : '🔔 PennDOT Pro Daily Reminder';
    const body = isEs
      ? '¡Es hora de tu práctica diaria! Tómate 5 minutos para responder 18 preguntas oficiales y mantener tu racha 🔥.'
      : 'Time for your daily practice! Take 5 minutes for 18 official questions and keep your streak 🔥 alive.';

    // Try browser web notification if supported
    if (typeof window !== 'undefined' && 'Notification' in window) {
      if (Notification.permission === 'granted') {
        new Notification(title, { body, icon: '/favicon.ico' });
      } else if (Notification.permission !== 'denied') {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          new Notification(title, { body, icon: '/favicon.ico' });
        }
      }
    }

    onShowToast(title, body);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn"
    >
      <div
        onClick={e => e.stopPropagation()}
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full p-5 sm:p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 dark:hover:text-white font-bold p-1"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-900 dark:text-white">
              {isEs ? 'Notificaciones & Recordatorios' : 'Push Notifications & Reminders'}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {isEs ? 'Mantén tu racha diaria y aprueba al primer intento' : 'Keep your daily study streak alive'}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Main Toggle */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <div>
              <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white block">
                {isEs ? 'Activar Recordatorio Diario' : 'Enable Daily Push Reminder'}
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                {isEs ? 'Aviso diario para practicar 18 preguntas' : 'Daily prompt to practice 18 questions'}
              </span>
            </div>
            <input
              type="checkbox"
              checked={enabled}
              onChange={e => setEnabled(e.target.checked)}
              className="w-5 h-5 accent-blue-600 rounded cursor-pointer"
            />
          </div>

          {/* Time Picker */}
          {enabled && (
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>{isEs ? 'Hora de Estudio Preferida' : 'Preferred Study Time'}</span>
              </label>
              <input
                type="time"
                value={reminderTime}
                onChange={e => setReminderTime(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-mono font-bold"
              />
            </div>
          )}

          {/* Sound alert */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-slate-500" />
              <div>
                <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white block">
                  {isEs ? 'Sonido de Notificación' : 'Sound Alert'}
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  {isEs ? 'Chime sonoro para recordatorio' : 'Play audio chime on alert'}
                </span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={soundEnabled}
              onChange={e => setSoundAlert(e.target.checked)}
              className="w-5 h-5 accent-blue-600 rounded cursor-pointer"
            />
          </div>

          {/* Question of the Day tip */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <div>
                <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white block">
                  {isEs ? 'Pregunta del Día' : 'Question of the Day'}
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  {isEs ? 'Consejos clave del manual oficial' : 'Include daily PennDOT handbook tips'}
                </span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={dailyTips}
              onChange={e => setDailyTips(e.target.checked)}
              className="w-5 h-5 accent-blue-600 rounded cursor-pointer"
            />
          </div>

          {/* Test notification button */}
          <button
            type="button"
            onClick={handleTestNotification}
            className="w-full py-2.5 rounded-xl border border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 hover:bg-blue-100 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isEs ? 'Probar Notificación Ahora' : 'Test Push Notification Now'}</span>
          </button>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300"
          >
            {isEs ? 'Cancelar' : 'Cancel'}
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
          >
            {isEs ? 'Guardar Cambios' : 'Save Settings'}
          </button>
        </div>
      </div>
    </div>
  );
};
