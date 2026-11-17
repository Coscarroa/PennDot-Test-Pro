import React from 'react';
import { X, Shield, FileText, ExternalLink, Mail } from 'lucide-react';
import { Language } from '../types';

export type LegalModalType = 'privacy' | 'terms' | null;

interface LegalModalProps {
  type: LegalModalType;
  onClose: () => void;
  language: Language;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose, language }) => {
  if (!type) return null;

  const isEs = language === 'es';
  const isPrivacy = type === 'privacy';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
    >
      <div
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400">
              {isPrivacy ? <Shield className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
            </div>
            <div>
              <h2 id="legal-modal-title" className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                {isPrivacy
                  ? isEs
                    ? 'Política de Privacidad'
                    : 'Privacy Policy'
                  : isEs
                  ? 'Términos de Uso'
                  : 'Terms of Use'}
              </h2>
              <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                PennDOT PA Driver Exam Pro
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label={isEs ? 'Cerrar' : 'Close'}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          {isPrivacy ? (
            <>
              <p>
                {isEs
                  ? 'En PennDOT PA Driver Exam Pro respetamos y protegemos la privacidad de nuestros usuarios. Esta Política de Privacidad describe cómo se recopila y utiliza la información cuando navegas y utilizas nuestro simulador educativo.'
                  : 'At PennDOT PA Driver Exam Pro, we respect and protect user privacy. This Privacy Policy explains how information is handled when you use our educational simulator.'}
              </p>

              <section className="space-y-2">
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                  {isEs
                    ? '1. Cookies de Terceros y Google AdSense'
                    : '1. Third-Party Cookies & Google AdSense'}
                </h3>
                <p>
                  {isEs
                    ? 'Este sitio web utiliza servicios de publicidad de terceros, incluido Google AdSense, para financiar el mantenimiento gratuito de la plataforma. Proveedores externos, incluido Google, utilizan cookies para mostrar anuncios relevantes basados en las visitas anteriores del usuario a este sitio web o a otros sitios en Internet.'
                    : 'This website uses third-party advertising services, including Google AdSense, to keep the platform free. Third-party vendors, including Google, use cookies to serve ads based on a user\'s prior visits to this website or other websites.'}
                </p>
                <p>
                  {isEs
                    ? 'El uso de cookies publicitarias permite a Google y a sus socios mostrar anuncios personalizados basados en sus intereses y navegación previa.'
                    : 'Google\'s use of advertising cookies enables it and its partners to serve personalized ads to users based on their visit to this site and/or other sites on the Internet.'}
                </p>
              </section>

              <section className="space-y-2 p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60">
                <h3 className="font-extrabold text-sm sm:text-base text-blue-900 dark:text-blue-200">
                  {isEs
                    ? '2. Cómo desactivar las cookies y anuncios personalizados'
                    : '2. How to Opt Out of Personalized Ads & Cookies'}
                </h3>
                <p>
                  {isEs
                    ? 'Los usuarios pueden inhabilitar la publicidad personalizada en cualquier momento accediendo directamente a la Configuración de Anuncios de Google. También pueden gestionar o desactivar el uso de cookies de terceros en la configuración de su navegador web o visitando aboutads.info.'
                    : 'Users may opt out of personalized advertising at any time by visiting Google Ads Settings, or disable third-party cookies in their browser settings or at aboutads.info.'}
                </p>
                <a
                  href="https://adssettings.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-bold text-blue-600 dark:text-blue-400 hover:underline pt-1"
                >
                  <span>
                    {isEs
                      ? 'Ir a Configuración de Anuncios de Google'
                      : 'Go to Google Ads Settings'}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </section>

              <section className="space-y-2">
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                  {isEs
                    ? '3. Almacenamiento Local (LocalStorage) y Datos de Estudio'
                    : '3. Local Storage & Study Data'}
                </h3>
                <p>
                  {isEs
                    ? 'Tu historial de exámenes, estadísticas, racha de estudio, preferencias de tema/idioma y preguntas favoritas se guardan localmente en tu navegador (localStorage). No vendemos ni compartimos datos personales sensibles con terceros.'
                    : 'Your exam history, study streak, theme/language preferences, and bookmarked questions are stored locally in your browser (localStorage). We do not sell sensitive personal data.'}
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                  {isEs ? '4. Contacto de Privacidad' : '4. Privacy Contact'}
                </h3>
                <p>
                  {isEs
                    ? 'Si tienes preguntas sobre esta Política de Privacidad o el uso de datos, puedes escribirnos a:'
                    : 'If you have questions about this Privacy Policy, please contact us at:'}{' '}
                  <a
                    href="mailto:contacto@penndottestpro.com"
                    className="font-bold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    contacto@penndottestpro.com
                  </a>
                </p>
              </section>
            </>
          ) : (
            <>
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/70 text-amber-950 dark:text-amber-200 font-semibold">
                {isEs
                  ? 'Herramienta educativa independiente. No estamos afiliados ni respaldados por PennDOT (Pennsylvania Department of Transportation) ni por ninguna entidad gubernamental.'
                  : 'Independent educational tool. We are not affiliated with or endorsed by PennDOT or any government agency.'}
              </div>

              <section className="space-y-2">
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                  {isEs
                    ? '1. Fines Exclusivamente Educativos'
                    : '1. Educational Purpose Only'}
                </h3>
                <p>
                  {isEs
                    ? 'Este simulador, el banco de preguntas y las guías de estudio tienen fines exclusivamente educativos e informativos, y están basados en el Manual del Conductor de Pensilvania (PennDOT PUB 95).'
                    : 'This simulator, question bank, and study guides are provided strictly for educational and informational purposes based on the Pennsylvania Driver\'s Manual (PennDOT PUB 95).'}
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                  {isEs
                    ? '2. Sin Garantía de Aprobación Oficial'
                    : '2. No Guarantee of Official Exam Passing'}
                </h3>
                <p>
                  {isEs
                    ? 'El uso de esta aplicación y la obtención de puntajes aprobatorios en los simulacros no garantizan la aprobación del examen teórico ni práctico oficial administrado por PennDOT. Las leyes de tránsito, señales y requisitos de examen pueden ser actualizados por el estado de Pensilvania en cualquier momento; recomendamos verificar siempre el manual oficial vigente.'
                    : 'Using this app or passing practice simulations does not guarantee passing the official PennDOT knowledge or road test. Traffic laws and exam requirements may change at any time; always consult the latest official manual.'}
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                  {isEs
                    ? '3. Uso Aceptable y Limitación de Responsabilidad'
                    : '3. Acceptable Use & Limitation of Liability'}
                </h3>
                <p>
                  {isEs
                    ? 'El contenido se ofrece "tal cual" sin garantías de ningún tipo. Los desarrolladores no se hacen responsables por decisiones tomadas a partir del material de práctica ni por resultados obtenidos en centros oficiales de licencias.'
                    : 'Content is provided "as is" without warranties of any kind. Developers are not liable for official licensing test outcomes.'}
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                  {isEs ? '4. Contacto' : '4. Contact'}
                </h3>
                <p>
                  {isEs
                    ? 'Para dudas, sugerencias o reportes de contenido, contáctanos en:'
                    : 'For questions or content feedback, contact us at:'}{' '}
                  <a
                    href="mailto:contacto@penndottestpro.com"
                    className="font-bold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    contacto@penndottestpro.com
                  </a>
                </p>
              </section>
            </>
          )}
        </div>

        {/* Footer Button */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-colors cursor-pointer"
          >
            {isEs ? 'Entendido' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
