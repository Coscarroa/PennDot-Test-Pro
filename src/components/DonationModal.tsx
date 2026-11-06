import React, { useState } from 'react';
import {
  Heart,
  Copy,
  Check,
  X,
  CreditCard,
  QrCode,
  ShieldCheck,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { Language } from '../types';
import { sound } from '../utils/sound';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onShowToast: (title: string, body: string) => void;
}

export const DonationModal: React.FC<DonationModalProps> = ({
  isOpen,
  onClose,
  language,
  onShowToast
}) => {
  if (!isOpen) return null;

  const isEs = language === 'es';
  const [activeTab, setActiveTab] = useState<'zelle' | 'cashapp' | 'crypto'>('zelle');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [selectedCrypto, setSelectedCrypto] = useState<'btc' | 'eth' | 'ada' | 'sol'>('btc');

  const zelleEmail = 'Cesil.Roa@gmail.com';
  const cashAppTag = '$CesilRoa';
  const cashAppLink = 'https://cash.app/$CesilRoa';

  const cryptoWallets = {
    btc: {
      name: 'Bitcoin (BTC)',
      network: 'Bitcoin Network',
      address: '3DhKBMsYeUC5ZEmtRZLSS9aBRtu1kgenQR',
      badge: 'BTC'
    },
    eth: {
      name: 'Ethereum (ETH)',
      network: 'Ethereum Mainnet (ERC-20)',
      address: '0xe1355E5C3d9938979BdEecA3eED040BA78B4b1ED',
      badge: 'ETH'
    },
    ada: {
      name: 'Cardano (ADA)',
      network: 'Cardano Mainnet',
      address: 'addr1vypxplfll5xmxz3hpazz5wahqslpq3ef92gukkklrwq632qyt84hd',
      badge: 'ADA'
    },
    sol: {
      name: 'Solana (SOL)',
      network: 'Solana Mainnet',
      address: '8LJQYiMyKtQnnwnBDgm3xfJSktDJzNZ5ErsCukWNui4u',
      badge: 'SOL'
    }
  };

  const handleCopy = (text: string, key: string, label: string) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      sound.playCorrect();
      setTimeout(() => setCopiedKey(null), 2000);
      onShowToast(
        isEs ? '¡Copiado al Portapapeles!' : 'Copied to Clipboard!',
        `${label}: ${text}`
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 dark:hover:text-white p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 font-bold"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-500 text-white flex items-center justify-center shadow-lg shadow-rose-500/25 shrink-0">
            <Heart className="w-6 h-6 fill-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isEs ? 'Apoya este proyecto educativo' : 'Support this study project'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              {isEs ? 'Donaciones & Apoyo' : 'Donations & Support'}
            </h2>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
          {isEs
            ? 'Esta plataforma es 100% gratuita y sin anuncios molestos para ayudar a toda la comunidad hispana y angloparlante a prepararse y aprobar su examen de conducir en Pensilvania. Si te ha sido útil, puedes apoyar el desarrollo y mantenimiento del servidor mediante Zelle, Cash App o Criptomonedas.'
            : 'This platform is 100% free and ad-free to help all learners prepare and pass their PA PennDOT driving test. If this tool helped you, consider supporting server and development costs via Zelle, Cash App, or Cryptocurrency.'}
        </p>

        {/* Method Switch Tabs: Zelle vs Cash App vs Crypto */}
        <div className="grid grid-cols-3 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 mb-6 gap-1">
          <button
            onClick={() => setActiveTab('zelle')}
            className={`py-2 px-1.5 sm:px-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center gap-1 sm:gap-1.5 cursor-pointer ${
              activeTab === 'zelle'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <span className="text-sm sm:text-base font-black">Z</span>
            <span>Zelle®</span>
          </button>

          <button
            onClick={() => setActiveTab('cashapp')}
            className={`py-2 px-1.5 sm:px-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center gap-1 sm:gap-1.5 cursor-pointer ${
              activeTab === 'cashapp'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <span className="text-sm sm:text-base font-black">$</span>
            <span>Cash App</span>
          </button>

          <button
            onClick={() => setActiveTab('crypto')}
            className={`py-2 px-1.5 sm:px-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center gap-1 sm:gap-1.5 cursor-pointer ${
              activeTab === 'crypto'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <span className="text-sm sm:text-base font-bold">₿</span>
            <span>{isEs ? 'Cripto' : 'Crypto'}</span>
          </button>
        </div>

        {/* Tab 1: Zelle */}
        {activeTab === 'zelle' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="p-5 rounded-2xl bg-purple-50 dark:bg-purple-950/30 border-2 border-purple-200 dark:border-purple-800">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black uppercase text-purple-800 dark:text-purple-300 tracking-wider">
                  {isEs ? 'Pago Inmediato con Zelle®' : 'Instant Transfer with Zelle®'}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-black bg-purple-200 text-purple-900 dark:bg-purple-900 dark:text-purple-200">
                  {isEs ? 'Sin comisiones en EE. UU.' : 'Zero Fees in US'}
                </span>
              </div>

              <div className="mb-3">
                <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block mb-1">
                  {isEs ? 'Correo Electrónico de Zelle:' : 'Zelle Email Address:'}
                </label>
                <div className="flex items-center justify-between gap-2 p-3 bg-white dark:bg-slate-900 rounded-xl border border-purple-300 dark:border-purple-700">
                  <span className="font-mono font-black text-sm sm:text-base text-purple-950 dark:text-purple-200 select-all">
                    {zelleEmail}
                  </span>
                  <button
                    onClick={() => handleCopy(zelleEmail, 'zelle', 'Zelle Email')}
                    className="flex items-center gap-1 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-lg shadow-sm transition-colors cursor-pointer shrink-0"
                  >
                    {copiedKey === 'zelle' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'zelle' ? (isEs ? '¡Copiado!' : 'Copied!') : (isEs ? 'Copiar' : 'Copy')}</span>
                  </button>
                </div>
              </div>

              {/* Instructions list */}
              <div className="mt-4 pt-3 border-t border-purple-200 dark:border-purple-800/60 text-xs text-slate-700 dark:text-slate-300 space-y-1.5">
                <p className="font-bold text-purple-900 dark:text-purple-300">
                  {isEs ? 'Cómo enviar tu donación:' : 'How to send your donation:'}
                </p>
                <ol className="list-decimal list-inside space-y-1 text-[11px] text-slate-600 dark:text-slate-400">
                  <li>
                    {isEs
                      ? 'Abre la app de tu banco (PNC, Chase, Wells Fargo, BoA, Capital One, etc.).'
                      : 'Open your banking app (PNC, Chase, Wells Fargo, BoA, Capital One, etc.).'}
                  </li>
                  <li>
                    {isEs
                      ? 'Ve a la opción "Send money with Zelle®".'
                      : 'Select "Send money with Zelle®".'}
                  </li>
                  <li>
                    {isEs
                      ? `Ingresa el correo ${zelleEmail} y el monto deseado.`
                      : `Enter the email ${zelleEmail} and desired donation amount.`}
                  </li>
                  <li>
                    {isEs
                      ? 'Coloca en la nota: "PennDOT Exam Pro". ¡Muchas gracias por tu apoyo!'
                      : 'Add memo: "PennDOT Exam Pro". Thank you so much for your support!'}
                  </li>
                </ol>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Cash App */}
        {activeTab === 'cashapp' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border-2 border-emerald-300 dark:border-emerald-800">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black uppercase text-emerald-800 dark:text-emerald-300 tracking-wider">
                  {isEs ? 'Pago con Cash App ($Cashtag)' : 'Instant Transfer with Cash App'}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-black bg-emerald-200 text-emerald-900 dark:bg-emerald-900 dark:text-emerald-200">
                  {isEs ? 'Rápido & Seguro' : 'Fast & Secure'}
                </span>
              </div>

              <div className="mb-3">
                <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block mb-1">
                  {isEs ? 'Cashtag / Nombre de Usuario:' : 'Cash App $Cashtag:'}
                </label>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-emerald-300 dark:border-emerald-700">
                  <span className="font-mono font-black text-lg sm:text-xl text-emerald-700 dark:text-emerald-400 select-all tracking-tight">
                    {cashAppTag}
                  </span>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleCopy(cashAppTag, 'cashapp', 'Cash App Tag')}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg shadow-sm transition-colors cursor-pointer"
                    >
                      {copiedKey === 'cashapp' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey === 'cashapp' ? (isEs ? '¡Copiado!' : 'Copied!') : (isEs ? 'Copiar $Tag' : 'Copy $Tag')}</span>
                    </button>
                    <a
                      href={cashAppLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs rounded-lg shadow-sm transition-colors cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>{isEs ? 'Abrir App' : 'Open App'}</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Instructions list */}
              <div className="mt-4 pt-3 border-t border-emerald-200 dark:border-emerald-800/60 text-xs text-slate-700 dark:text-slate-300 space-y-1.5">
                <p className="font-bold text-emerald-900 dark:text-emerald-300">
                  {isEs ? 'Instrucciones para donar con Cash App:' : 'How to send with Cash App:'}
                </p>
                <ol className="list-decimal list-inside space-y-1 text-[11px] text-slate-600 dark:text-slate-400">
                  <li>
                    {isEs
                      ? 'Abre la app de Cash App en tu teléfono móvil o haz clic en "Abrir App".'
                      : 'Open the Cash App on your mobile device or tap "Open App".'}
                  </li>
                  <li>
                    {isEs
                      ? 'Digita la cantidad deseada y presiona el botón "Pay".'
                      : 'Type the donation amount and tap "Pay".'}
                  </li>
                  <li>
                    {isEs
                      ? `En el campo "To" ingresa el usuario: ${cashAppTag}.`
                      : `In the "To" field enter: ${cashAppTag}.`}
                  </li>
                  <li>
                    {isEs
                      ? 'En la nota ("For") escribe: "PennDOT Exam Pro". ¡Muchísimas gracias por tu apoyo!'
                      : 'In the note ("For") write: "PennDOT Exam Pro". Thank you so much for your support!'}
                  </li>
                </ol>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Crypto */}
        {activeTab === 'crypto' && (
          <div className="space-y-4 animate-fadeIn">
            {/* Crypto selector pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(['btc', 'eth', 'ada', 'sol'] as const).map(cKey => {
                const item = cryptoWallets[cKey];
                const active = selectedCrypto === cKey;
                return (
                  <button
                    key={cKey}
                    onClick={() => setSelectedCrypto(cKey)}
                    className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                      active
                        ? 'bg-amber-500 text-white border-amber-600 font-extrabold shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-amber-400 text-xs font-semibold'
                    }`}
                  >
                    <div className="text-xs">{item.badge}</div>
                  </button>
                );
              })}
            </div>

            {/* Selected Wallet Card */}
            {(() => {
              const current = cryptoWallets[selectedCrypto];
              return (
                <div className="p-5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border-2 border-amber-200 dark:border-amber-800">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-black text-sm text-slate-900 dark:text-white">
                      {current.name}
                    </h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200">
                      {current.network}
                    </span>
                  </div>

                  <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block mb-1">
                    {isEs ? 'Dirección de Billetera (Wallet Address):' : 'Wallet Address:'}
                  </label>
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-amber-300 dark:border-amber-700 flex flex-col gap-2">
                    <span className="font-mono text-xs font-black text-slate-900 dark:text-amber-200 break-all select-all">
                      {current.address}
                    </span>
                    <button
                      onClick={() => handleCopy(current.address, selectedCrypto, current.name)}
                      className="self-end flex items-center gap-1.5 px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-lg shadow-sm transition-colors cursor-pointer"
                    >
                      {copiedKey === selectedCrypto ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey === selectedCrypto ? (isEs ? '¡Dirección Copiada!' : 'Copied!') : (isEs ? 'Copiar Dirección' : 'Copy Address')}</span>
                    </button>
                  </div>

                  <p className="mt-3 text-[11px] text-amber-900 dark:text-amber-300">
                    {isEs
                      ? `⚠️ Asegúrate de enviar únicamente ${current.name} usando la red ${current.network}.`
                      : `⚠️ Please ensure you send only ${current.name} via ${current.network}.`}
                  </p>
                </div>
              );
            })()}
          </div>
        )}

        {/* Suggested Donation Amounts */}
        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-2 text-center">
            {isEs ? 'Montos Sugeridos de Apoyo:' : 'Suggested Support Amounts:'}
          </span>
          <div className="flex items-center justify-center gap-2">
            {['$5', '$10', '$25', '$50'].map(amount => (
              <span
                key={amount}
                className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-extrabold text-xs border border-slate-200 dark:border-slate-700"
              >
                {amount}
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs transition-colors cursor-pointer"
        >
          {isEs ? 'Cerrar' : 'Close'}
        </button>
      </div>
    </div>
  );
};
