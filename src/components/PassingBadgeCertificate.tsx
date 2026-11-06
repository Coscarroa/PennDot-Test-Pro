import React, { useState, useRef } from 'react';
import {
  Award,
  Download,
  Share2,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Check,
  Calendar,
  Flame
} from 'lucide-react';
import { Language, DifficultyLevel } from '../types';
import { sound } from '../utils/sound';

interface PassingBadgeCertificateProps {
  score: number;
  totalQuestions: number;
  missedCount: number;
  percentage: number;
  difficulty: DifficultyLevel;
  durationSeconds: number;
  language: Language;
}

export const PassingBadgeCertificate: React.FC<PassingBadgeCertificateProps> = ({
  score,
  totalQuestions,
  missedCount,
  percentage,
  difficulty,
  language
}) => {
  const isEs = language === 'es';
  const [candidateName, setCandidateName] = useState<string>('');
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  const verificationId = useRef<string>(
    `PA-${difficulty.slice(0, 1).toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`
  ).current;

  const issueDate = new Date().toLocaleDateString(isEs ? 'es-ES' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const displayName = candidateName.trim() || (isEs ? 'Conductor Aprobado' : 'Certified Driver');

  // Generate high-resolution Certificate PNG using HTML5 Canvas
  const handleDownloadBadge = () => {
    sound.playCorrect();
    setIsDownloading(true);

    try {
      const canvas = document.createElement('canvas');
      canvas.width = 1200;
      canvas.height = 800;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // 1. Rich Deep Navy Blue Background
      const bgGrad = ctx.createLinearGradient(0, 0, 1200, 800);
      bgGrad.addColorStop(0, '#0a192f');
      bgGrad.addColorStop(0.5, '#0f274a');
      bgGrad.addColorStop(1, '#061325');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 1200, 800);

      // 2. Ornate Outer Gold Border
      ctx.strokeStyle = '#d4af37';
      ctx.lineWidth = 10;
      ctx.strokeRect(24, 24, 1152, 752);

      // Inner thin gold border
      ctx.strokeStyle = '#fef08a';
      ctx.lineWidth = 2;
      ctx.strokeRect(36, 36, 1128, 728);

      // Corner decorative accents
      const corners = [
        [44, 44],
        [1156, 44],
        [44, 756],
        [1156, 756]
      ];
      corners.forEach(([cx, cy]) => {
        ctx.fillStyle = '#d4af37';
        ctx.beginPath();
        ctx.arc(cx, cy, 10, 0, Math.PI * 2);
        ctx.fill();
      });

      // 3. PennDOT Keystone Emblem at the top
      ctx.save();
      ctx.translate(600, 105);

      // Keystone shape
      ctx.beginPath();
      ctx.moveTo(-45, -35);
      ctx.lineTo(45, -35);
      ctx.lineTo(55, 10);
      ctx.lineTo(35, 45);
      ctx.lineTo(-35, 45);
      ctx.lineTo(-55, 10);
      ctx.closePath();
      ctx.fillStyle = '#1e3a8a';
      ctx.fill();
      ctx.strokeStyle = '#d4af37';
      ctx.lineWidth = 4;
      ctx.stroke();

      // Green road inside Keystone
      ctx.beginPath();
      ctx.moveTo(-25, 40);
      ctx.quadraticCurveTo(-5, 0, 20, -30);
      ctx.lineTo(35, -30);
      ctx.quadraticCurveTo(10, 5, 5, 40);
      ctx.closePath();
      ctx.fillStyle = '#16a34a';
      ctx.fill();

      // White star in Keystone
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(-15, 15, 6, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      // 4. Header Titles
      ctx.textAlign = 'center';
      ctx.fillStyle = '#93c5fd';
      ctx.font = 'bold 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.fillText('COMMONWEALTH OF PENNSYLVANIA • DEPARTMENT OF TRANSPORTATION', 600, 185);

      ctx.fillStyle = '#fef08a';
      ctx.font = 'bold 13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.fillText('BUREAU OF DRIVER LICENSING • OFFICIAL PUB 95 KNOWLEDGE EXAMINATION', 600, 208);

      // Gold divider line
      ctx.strokeStyle = '#d4af37';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(350, 222);
      ctx.lineTo(850, 222);
      ctx.stroke();

      // 5. Main Certificate Title
      ctx.fillStyle = '#ffffff';
      ctx.font = '900 36px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.fillText(
        isEs ? 'INSIGNIA OFICIAL DE APROBACIÓN' : 'OFFICIAL PASSING ACHIEVEMENT BADGE',
        600,
        270
      );

      ctx.fillStyle = '#cbd5e1';
      ctx.font = '16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.fillText(
        isEs
          ? 'Por haber superado satisfactoriamente el Examen Teórico de Conducir de Pensilvania'
          : 'For successfully passing the Pennsylvania Official Driver Knowledge Examination',
        600,
        300
      );

      // 6. Candidate Name
      ctx.fillStyle = '#fef08a';
      ctx.font = 'bold 38px Georgia, serif';
      ctx.fillText(displayName, 600, 365);

      // Decorative underline for candidate name
      ctx.strokeStyle = '#d4af37';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(300, 385);
      ctx.lineTo(900, 385);
      ctx.stroke();

      // Small diamond in center of underline
      ctx.fillStyle = '#facc15';
      ctx.beginPath();
      ctx.moveTo(600, 380);
      ctx.lineTo(606, 385);
      ctx.lineTo(600, 390);
      ctx.lineTo(594, 385);
      ctx.closePath();
      ctx.fill();

      // 7. Performance Badges Section (4 boxes)
      const boxes = [
        {
          label: isEs ? 'Puntaje Oficial' : 'Official Score',
          value: `${score} / ${totalQuestions}`,
          sub: `${percentage}% (${isEs ? 'Aprobado' : 'Passed'})`,
          color: '#10b981'
        },
        {
          label: isEs ? 'Margen de Errores' : 'Mistakes Made',
          value: `${missedCount} / 4`,
          sub: isEs ? 'Dentro del límite' : 'Within legal limit',
          color: '#38bdf8'
        },
        {
          label: isEs ? 'Dificultad' : 'Difficulty',
          value: difficulty.toUpperCase(),
          sub: isEs ? 'Estándar PennDOT' : 'PennDOT Standard',
          color: '#f59e0b'
        },
        {
          label: isEs ? 'Fecha' : 'Date',
          value: issueDate,
          sub: `ID: ${verificationId}`,
          color: '#a78bfa'
        }
      ];

      const startX = 140;
      const boxW = 210;
      const gap = 30;
      const boxY = 430;
      const boxH = 100;

      boxes.forEach((b, i) => {
        const x = startX + i * (boxW + gap);
        // Box background
        ctx.fillStyle = 'rgba(15, 39, 74, 0.85)';
        ctx.strokeStyle = b.color;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(x, boxY, boxW, boxH, 12);
        ctx.fill();
        ctx.stroke();

        // Label
        ctx.fillStyle = '#94a3b8';
        ctx.font = 'bold 12px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.fillText(b.label, x + boxW / 2, boxY + 28);

        // Value
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 22px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.fillText(b.value, x + boxW / 2, boxY + 58);

        // Sub
        ctx.fillStyle = b.color;
        ctx.font = 'bold 11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.fillText(b.sub, x + boxW / 2, boxY + 82);
      });

      // 8. Official Gold Medallion & Seal (Bottom Center)
      ctx.save();
      ctx.translate(600, 630);

      // Outer gold jagged/ribbon circle
      ctx.fillStyle = '#d4af37';
      ctx.beginPath();
      ctx.arc(0, 0, 48, 0, Math.PI * 2);
      ctx.fill();

      // Inner darker gold
      ctx.fillStyle = '#b45309';
      ctx.beginPath();
      ctx.arc(0, 0, 42, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#fef08a';
      ctx.beginPath();
      ctx.arc(0, 0, 36, 0, Math.PI * 2);
      ctx.fill();

      // Seal text
      ctx.fillStyle = '#78350f';
      ctx.font = '900 11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.fillText('PENNDOT', 0, -12);
      ctx.font = '900 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.fillText('PASSED', 0, 6);
      ctx.font = 'bold 9px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.fillText('PUB 95 PA', 0, 20);

      // Ribbons hanging from seal
      ctx.fillStyle = '#dc2626';
      ctx.beginPath();
      ctx.moveTo(-18, 40);
      ctx.lineTo(-30, 85);
      ctx.lineTo(-12, 75);
      ctx.lineTo(0, 85);
      ctx.lineTo(-6, 40);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#1d4ed8';
      ctx.beginPath();
      ctx.moveTo(6, 40);
      ctx.lineTo(0, 85);
      ctx.lineTo(12, 75);
      ctx.lineTo(30, 85);
      ctx.lineTo(18, 40);
      ctx.closePath();
      ctx.fill();

      ctx.restore();

      // 9. Signatures & Verification Code
      ctx.textAlign = 'left';
      ctx.fillStyle = '#94a3b8';
      ctx.font = '12px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.fillText('Sistema de Evaluación Teórica PennDOT Exam Pro', 90, 715);
      ctx.fillText('Acreditación según Manual PUB 95 del Estado de PA', 90, 735);

      ctx.textAlign = 'right';
      ctx.fillStyle = '#fef08a';
      ctx.font = 'bold 12px monospace';
      ctx.fillText(`VERIFICACIÓN: ${verificationId}`, 1110, 715);
      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.fillText('Válido para fines de preparación y acreditación personal', 1110, 735);

      // Trigger automatic PNG download
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `Insignia_Aprobado_PennDOT_PA_${verificationId}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Error generating badge:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = () => {
    sound.playCorrect();
    const shareText = isEs
      ? `🎉 ¡Aprobé el examen oficial del Manual de Conducir de Pensilvania (PennDOT PUB 95)!\n\n` +
        `🏆 Puntaje: ${score}/${totalQuestions} (${percentage}%)\n` +
        `🛡️ Errores: ${missedCount}/4 permitidos\n` +
        `⭐ Dificultad: ${difficulty.toUpperCase()}\n` +
        `📅 Fecha: ${issueDate}\n` +
        `🆔 Código: ${verificationId}\n\n` +
        `¡Prepárate tú también con la app PennDOT PA Driver Exam Pro!`
      : `🎉 I just passed the Pennsylvania PennDOT Driver License Knowledge Exam!\n\n` +
        `🏆 Score: ${score}/${totalQuestions} (${percentage}%)\n` +
        `🛡️ Mistakes: ${missedCount}/4 allowed\n` +
        `⭐ Difficulty: ${difficulty.toUpperCase()}\n` +
        `📅 Date: ${issueDate}\n` +
        `🆔 Credential ID: ${verificationId}\n\n` +
        `Study with PennDOT PA Driver Exam Pro!`;

    if (navigator.share) {
      navigator
        .share({
          title: 'PennDOT PA Driver Exam Pro',
          text: shareText
        })
        .catch(() => {
          // If user cancelled or failed, fallback to clipboard
          if (navigator.clipboard) {
            navigator.clipboard.writeText(shareText);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 3000);
          }
        });
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 3000);
    }
  };

  return (
    <div className="my-8 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-blue-950 via-slate-900 to-slate-950 border-4 border-amber-400/80 shadow-2xl relative overflow-hidden text-white">
      {/* Decorative Gold Corner Badges */}
      <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-amber-400 rounded-tl-3xl pointer-events-none" />
      <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-amber-400 rounded-tr-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-amber-400 rounded-bl-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-amber-400 rounded-br-3xl pointer-events-none" />

      {/* Header with Ribbon & Keystone */}
      <div className="text-center relative z-10 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 font-black text-xs uppercase tracking-wider mb-3">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{isEs ? 'Insignia de Logro Oficial PennDOT' : 'Official PennDOT Passing Credential'}</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          {isEs ? '¡Certificado de Aprobación Oficial!' : 'Official Knowledge Exam Certificate!'}
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 mt-1">
          {isEs
            ? 'Has demostrado el dominio de las normas de tránsito, leyes de DUI y señales de Pensilvania.'
            : 'You have mastered PA traffic safety rules, DUI statutes, and official road signs.'}
        </p>

        {/* Personalized Candidate Name Input */}
        <div className="mt-5 p-3 sm:p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 max-w-md mx-auto">
          <label className="block text-xs font-bold text-amber-300 mb-1.5 flex items-center justify-center gap-1.5">
            <UserCheck className="w-4 h-4" />
            <span>{isEs ? 'Personaliza tu nombre en la insignia:' : 'Customize your name on badge:'}</span>
          </label>
          <input
            type="text"
            value={candidateName}
            onChange={e => setCandidateName(e.target.value)}
            placeholder={isEs ? 'Ej: Juan Pérez / María Gómez' : 'e.g. John Doe'}
            className="w-full px-3.5 py-2 rounded-xl bg-slate-900/80 border border-amber-400/50 text-white font-extrabold text-center text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-amber-400 placeholder:text-slate-500"
          />
        </div>
      </div>

      {/* Visual Badge Card Preview */}
      <div className="my-6 p-5 sm:p-6 rounded-2xl bg-slate-900/90 border-2 border-amber-400/50 shadow-inner max-w-2xl mx-auto relative">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-white/10 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 p-0.5 shadow-lg flex items-center justify-center shrink-0">
              <Award className="w-8 h-8 text-blue-950" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-amber-300 uppercase tracking-wider">
                COMMONWEALTH OF PENNSYLVANIA
              </div>
              <div className="text-lg font-black text-white">{displayName}</div>
              <div className="text-xs text-slate-400 flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-blue-400" />
                <span>{issueDate}</span>
                <span className="text-amber-400">•</span>
                <span className="font-mono text-amber-300">{verificationId}</span>
              </div>
            </div>
          </div>

          <div className="text-center sm:text-right">
            <span className="px-3 py-1 rounded-full text-xs font-black uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 inline-flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{isEs ? 'APROBADO' : 'PASSED'}</span>
            </span>
            <div className="text-xl font-black text-amber-300 mt-1">{percentage}%</div>
          </div>
        </div>

        {/* 4 Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
            <div className="text-[10px] text-slate-400">{isEs ? 'Aciertos' : 'Score'}</div>
            <div className="text-base font-black text-emerald-400">{score} / {totalQuestions}</div>
          </div>
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
            <div className="text-[10px] text-slate-400">{isEs ? 'Errores' : 'Mistakes'}</div>
            <div className="text-base font-black text-blue-400">{missedCount} / 4</div>
          </div>
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
            <div className="text-[10px] text-slate-400">{isEs ? 'Dificultad' : 'Difficulty'}</div>
            <div className="text-base font-black text-amber-400">{difficulty.toUpperCase()}</div>
          </div>
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
            <div className="text-[10px] text-slate-400">{isEs ? 'Norma' : 'Standard'}</div>
            <div className="text-base font-black text-purple-300">PUB 95</div>
          </div>
        </div>
      </div>

      {/* Action Buttons: Download PNG & Share */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto relative z-10">
        <button
          onClick={handleDownloadBadge}
          disabled={isDownloading}
          className="w-full sm:w-auto flex-1 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-black text-sm sm:text-base shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2.5 cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Download className="w-5 h-5 text-slate-950" />
          <span>
            {isDownloading
              ? isEs
                ? 'Generando Insignia...'
                : 'Generating Badge...'
              : isEs
              ? 'Descargar Insignia Oficial (PNG)'
              : 'Download Official Badge (PNG)'}
          </span>
        </button>

        <button
          onClick={handleShare}
          className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-bold text-sm sm:text-base border border-white/20 flex items-center justify-center gap-2 cursor-pointer transition-all"
        >
          {isCopied ? (
            <>
              <Check className="w-5 h-5 text-emerald-400" />
              <span className="text-emerald-400">{isEs ? '¡Copiado!' : 'Copied!'}</span>
            </>
          ) : (
            <>
              <Share2 className="w-5 h-5 text-amber-300" />
              <span>{isEs ? 'Compartir' : 'Share'}</span>
            </>
          )}
        </button>
      </div>

      <div className="mt-4 text-center text-[11px] text-slate-400">
        {isEs
          ? '✓ Imagen de alta resolución (1200x800px) con sello dorado oficial y código único de validación.'
          : '✓ High-resolution (1200x800px) certificate graphic with gold seal and verification ID.'}
      </div>
    </div>
  );
};
