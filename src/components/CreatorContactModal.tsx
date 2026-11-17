import React, { useState, useEffect } from 'react';
import {
  X,
  MapPin,
  Briefcase,
  Mail,
  Copy,
  Check,
  ExternalLink,
  Heart,
  Sparkles
} from 'lucide-react';
import { Language } from '../types';

interface CreatorContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  language?: Language;
  onOpenSupport?: () => void;
}

const CORE_SKILLS = [
  'Systems Analysis',
  'Requirements Management',
  'Process Improvement',
  'SQL & Power BI',
  'SharePoint / M365',
  'Agile / Azure DevOps',
  'Bilingual (EN/ES)'
];

export const CreatorContactModal: React.FC<CreatorContactModalProps> = ({
  isOpen,
  onClose,
  language = 'en',
  onOpenSupport
}) => {
  const [copied, setCopied] = useState(false);
  const [activeLang, setActiveLang] = useState<Language>(language);

  useEffect(() => {
    setActiveLang(language);
  }, [language]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isEs = activeLang === 'es';
  const emailAddress = 'cesil.roa@gmail.com';

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback copy
      const textArea = document.createElement('textarea');
      textArea.value = emailAddress;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/80 animate-fadeIn overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="creator-contact-title"
    >
      <div
        className="relative w-full max-w-xl rounded-2xl bg-[#09111E] border border-[#D4AF37]/40 text-[#F8FAFC] shadow-[0_25px_70px_rgba(0,0,0,0.85)] overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Civic Accent Bar (Federal Blue, Keystone Gold, Crimson) */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#1D4ED8] via-[#D4AF37] to-[#B22234]" />

        {/* Top Bar Controls: Language Toggle & Close Button */}
        <div className="flex items-center justify-between px-6 pt-4 pb-1">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-[#D4AF37]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isEs ? 'Creador y Arquitecto del Proyecto' : 'Project Creator & Architect'}</span>
          </span>

          <div className="flex items-center gap-2">
            {/* EN / ES Quick Switch inside Modal */}
            <div className="inline-flex rounded-lg bg-[#0F1C30] p-0.5 border border-[#D4AF37]/30 text-[11px] font-bold">
              <button
                type="button"
                onClick={() => setActiveLang('en')}
                className={`px-2 py-0.5 rounded-md transition-colors cursor-pointer ${
                  !isEs
                    ? 'bg-[#1D4ED8] text-[#F8FAFC]'
                    : 'text-slate-400 hover:text-[#F8FAFC]'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setActiveLang('es')}
                className={`px-2 py-0.5 rounded-md transition-colors cursor-pointer ${
                  isEs
                    ? 'bg-[#1D4ED8] text-[#F8FAFC]'
                    : 'text-slate-400 hover:text-[#F8FAFC]'
                }`}
              >
                ES
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label={isEs ? 'Cerrar modal de contacto' : 'Close contact modal'}
              className="p-1.5 rounded-lg bg-[#0F1C30] hover:bg-[#1D4ED8]/30 text-slate-300 hover:text-[#F8FAFC] border border-slate-700/70 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="p-6 pt-3 space-y-5">
          {/* 1. Header with Professional Identity */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
            {/* Stylized Circular Avatar with CR Initials in Gold Serif on Federal Blue */}
            <div className="shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#1D4ED8] to-[#0F1C30] ring-2 ring-[#D4AF37] shadow-lg flex items-center justify-center select-none">
              <span
                className="text-2xl sm:text-3xl font-bold tracking-wider text-[#D4AF37]"
                style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
              >
                CR
              </span>
            </div>

            <div className="space-y-1.5 flex-1">
              <h2
                id="creator-contact-title"
                className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#F8FAFC]"
              >
                Cesil Roa
              </h2>

              <p className="text-xs sm:text-sm font-semibold text-[#D4AF37] leading-snug">
                {isEs
                  ? 'Analista Senior de Sistemas de Negocio | Gestión de Requerimientos y Mejora de Procesos'
                  : 'Senior Business Systems Analyst | Requirements & Process Improvement'}
              </p>

              {/* Location & Availability */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-3 gap-y-1.5 pt-1 text-xs text-slate-300">
                <span className="inline-flex items-center gap-1 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                  <span>Pennsylvania, United States</span>
                </span>

                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-500/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>
                    {isEs
                      ? 'Open to Remote & Hybrid Opportunities in the US'
                      : 'Open to Remote & Hybrid Opportunities in the US'}
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* 2. Biographical Summary Card */}
          <div className="p-4 rounded-xl bg-[#0F1C30] border border-slate-800/90 shadow-inner">
            <p className="text-xs sm:text-sm text-[#F8FAFC]/90 leading-relaxed">
              {isEs
                ? 'Analista Senior de Sistemas de Negocio con más de 10 años de experiencia conectando necesidades estratégicas con soluciones tecnológicas mediante análisis de sistemas, documentación de requerimientos, automatización de procesos y visualización de datos. Aplicando su experiencia en estructurar información compleja y transformarla en herramientas prácticas, creó Keystone ChronoMap como un atlas educativo de acceso abierto para las comunidades de Pensilvania.'
                : "Senior Business Systems Analyst with 10+ years of experience bridging business needs and technology solutions through systems analysis, requirements documentation, process automation, and data reporting. Leveraging his expertise in structuring complex information and translating requirements into practical software, he created Keystone ChronoMap as an open-access educational platform for Pennsylvania's communities."}
            </p>
          </div>

          {/* 3. Core Skills Badges */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              <Briefcase className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{isEs ? 'Especialidades Clave' : 'Core Competencies'}</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {CORE_SKILLS.map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 rounded-lg bg-[#0F1C30] border border-[#D4AF37]/30 text-[#F8FAFC] text-[11px] font-medium tracking-wide"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* 4. Direct Action & Contact Buttons */}
          <div className="space-y-3 pt-1">
            {/* Primary Button — Official LinkedIn Profile */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-[#0A66C2] hover:bg-[#004182] text-white font-medium text-xs sm:text-sm shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
              <span>{isEs ? 'Conectar en LinkedIn' : 'Connect on LinkedIn'}</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>

            {/* Secondary Button — Direct Email + Copy Email */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-2.5 rounded-xl bg-[#0F1C30] border border-slate-700/80">
              <div className="flex items-center gap-2 px-2 py-1 flex-1 min-w-0">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span className="text-xs sm:text-sm font-mono text-[#F8FAFC] truncate select-all">
                  {emailAddress}
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                    copied
                      ? 'bg-emerald-900/60 border-emerald-500/60 text-emerald-200'
                      : 'bg-[#09111E] hover:bg-slate-800 border-slate-700 text-[#F8FAFC]'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>✓ Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{isEs ? 'Copiar Correo' : 'Copy Email'}</span>
                    </>
                  )}
                </button>

                <a
                  href={`mailto:${emailAddress}`}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1D4ED8] hover:bg-blue-700 text-[#F8FAFC] text-xs font-semibold transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{isEs ? 'Enviar Email' : 'Send Email'}</span>
                </a>
              </div>
            </div>
          </div>

          {/* 5. Discrete Link to Community Support */}
          {onOpenSupport && (
            <div className="pt-3 border-t border-slate-800/90 text-center">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenSupport();
                }}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-[#D4AF37] transition-colors cursor-pointer"
              >
                <Heart className="w-3.5 h-3.5 text-[#B22234] fill-[#B22234]" />
                <span className="underline underline-offset-4">
                  {isEs
                    ? 'Apoyar este proyecto educativo'
                    : 'Support this open educational project'}
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
