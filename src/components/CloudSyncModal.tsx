import React, { useState } from 'react';
import {
  Cloud,
  ArrowUpCircle,
  ArrowDownCircle,
  Copy,
  Check,
  Download,
  Upload,
  RefreshCw,
  Smartphone,
  Laptop,
  X,
  AlertCircle
} from 'lucide-react';
import { UserDataState, Language } from '../types';
import { pushStateToCloud, pullStateFromCloud, exportDataAsJson, saveUserState } from '../utils/storage';
import { sound } from '../utils/sound';

interface CloudSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  userState: UserDataState;
  setUserState: React.Dispatch<React.SetStateAction<UserDataState>>;
  onShowToast: (title: string, body: string) => void;
}

export const CloudSyncModal: React.FC<CloudSyncModalProps> = ({
  isOpen,
  onClose,
  language,
  userState,
  setUserState,
  onShowToast
}) => {
  if (!isOpen) return null;

  const isEs = language === 'es';

  const [inputCode, setInputCode] = useState<string>('');
  const [loadingPush, setLoadingPush] = useState<boolean>(false);
  const [loadingPull, setLoadingPull] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleCopyCode = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(userState.syncCode);
      setCopied(true);
      sound.playCorrect();
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePush = async () => {
    setLoadingPush(true);
    setErrorMessage(null);
    const res = await pushStateToCloud(userState);
    setLoadingPush(false);

    if (res.success) {
      sound.playCorrect();
      setUserState(prev => ({ ...prev, lastSynced: res.updatedAt || new Date().toISOString() }));
      onShowToast(
        isEs ? '¡Sincronizado con Éxito!' : 'Successfully Synced!',
        isEs
          ? `Tus datos están guardados en la nube con el código ${userState.syncCode}`
          : `Your progress is synced to the cloud with code ${userState.syncCode}`
      );
    } else {
      sound.playIncorrect();
      setErrorMessage(res.error || 'Error al conectar con el servidor.');
    }
  };

  const handlePull = async () => {
    if (!inputCode.trim()) return;
    setLoadingPull(true);
    setErrorMessage(null);

    const res = await pullStateFromCloud(inputCode.trim());
    setLoadingPull(false);

    if (res.success && res.data) {
      sound.playExamPass();
      setUserState(res.data);
      onShowToast(
        isEs ? '¡Progreso Restaurado!' : 'Progress Restored!',
        isEs
          ? `Se cargó el historial y estadísticas del código ${inputCode.toUpperCase()}`
          : `Loaded history and statistics from code ${inputCode.toUpperCase()}`
      );
      onClose();
    } else {
      sound.playIncorrect();
      setErrorMessage(res.error || (isEs ? 'Código no encontrado.' : 'Code not found.'));
    }
  };

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = event => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed && parsed.version && parsed.examHistory) {
          setUserState(parsed);
          saveUserState(parsed);
          sound.playCorrect();
          onShowToast(
            isEs ? 'Copia Importada' : 'Backup Restored',
            isEs ? 'Datos cargados correctamente del archivo' : 'File restored successfully'
          );
          onClose();
        } else {
          throw new Error('Invalid format');
        }
      } catch {
        sound.playIncorrect();
        setErrorMessage(isEs ? 'Archivo de copia de seguridad no válido.' : 'Invalid backup JSON file.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 dark:hover:text-white font-bold"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Cloud className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-900 dark:text-white">
              {isEs ? 'Sincronización en la Nube y Multi-Dispositivo' : 'Cloud & Multi-Device Sync'}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {isEs
                ? 'Estudia en el teléfono y continúa en la computadora sin perder tu progreso'
                : 'Study seamlessly across phone and desktop'}
            </p>
          </div>
        </div>

        {errorMessage && (
          <div className="p-3 mb-4 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-300 text-rose-800 dark:text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Sync Code Box */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 border border-blue-200 dark:border-blue-900 mb-6">
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-800 dark:text-blue-300 block mb-1">
            {isEs ? 'Tu Código de Sincronización Personal:' : 'Your Personal Sync Code:'}
          </span>
          <div className="flex items-center justify-between gap-3 bg-white dark:bg-slate-900 p-3 rounded-lg border border-blue-300 dark:border-blue-800">
            <span className="font-mono text-xl font-black text-blue-700 dark:text-blue-300 tracking-wider">
              {userState.syncCode}
            </span>
            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? (isEs ? '¡Copiado!' : 'Copied!') : (isEs ? 'Copiar' : 'Copy')}</span>
            </button>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mt-2">
            <span>
              {isEs ? 'Última sincronización:' : 'Last synced:'}{' '}
              {userState.lastSynced
                ? new Date(userState.lastSynced).toLocaleTimeString()
                : isEs ? 'Pendiente' : 'Never'}
            </span>
            <button
              onClick={handlePush}
              disabled={loadingPush}
              className="font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className={`w-3 h-3 ${loadingPush ? 'animate-spin' : ''}`} />
              <span>{isEs ? 'Subir a la nube ahora' : 'Upload to cloud now'}</span>
            </button>
          </div>
        </div>

        {/* Section: Pull from another device */}
        <div className="mb-6 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
          <h3 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-blue-600" />
            <Laptop className="w-4 h-4 text-blue-600" />
            <span>{isEs ? 'Cargar progreso de otro dispositivo' : 'Load progress from another device'}</span>
          </h3>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3">
            {isEs
              ? 'Ingresa el código generado en tu otro teléfono o navegador para transferir tu historial y racha.'
              : 'Enter the sync code generated on your other device to transfer your study history and streak.'}
          </p>

          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Ej: PA-9X4F"
              value={inputCode}
              onChange={e => setInputCode(e.target.value.toUpperCase())}
              className="flex-1 px-3 py-2 text-xs sm:text-sm font-mono font-bold uppercase rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
            />
            <button
              onClick={handlePull}
              disabled={loadingPull || !inputCode.trim()}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg shadow-sm disabled:opacity-50 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <ArrowDownCircle className="w-4 h-4" />
              <span>{isEs ? 'Restaurar' : 'Restore'}</span>
            </button>
          </div>
        </div>

        {/* Section: Offline JSON Backup */}
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
          <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">
            {isEs ? 'Copia de Seguridad Offline (Archivo JSON)' : 'Offline JSON Backup'}
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => exportDataAsJson(userState)}
              className="py-2 px-3 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isEs ? 'Descargar JSON' : 'Export JSON'}</span>
            </button>

            <label className="py-2 px-3 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer">
              <Upload className="w-3.5 h-3.5" />
              <span>{isEs ? 'Importar JSON' : 'Import JSON'}</span>
              <input
                type="file"
                accept=".json"
                onChange={handleFileImport}
                className="hidden"
              />
            </label>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs transition-colors"
        >
          {isEs ? 'Listo / Cerrar' : 'Done / Close'}
        </button>
      </div>
    </div>
  );
};
