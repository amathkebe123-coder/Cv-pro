import React, { useEffect } from 'react';
import { X, Mail, ArrowUpRight, Sparkles } from 'lucide-react';
import { CONTACT_CONFIG } from '../config/contact';

export default function ContactModal({ isOpen, onClose }) {
  // Listen for Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Prevent background scroll when modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-charcoal-950/80 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div
        className="relative w-full max-w-lg bg-charcoal-850 border border-gold-500/30 rounded-[2.5rem] p-7 sm:p-9 shadow-2xl shadow-black/80 z-10 transition-all transform animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle Decorative Gold Ambient Glow */}
        <div className="absolute top-0 right-1/4 w-36 h-36 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header with Close Button */}
        <div className="flex items-start justify-between gap-4 mb-6 relative">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 font-mono text-xs uppercase tracking-wider mb-2">
              <Sparkles className="w-3 h-3 text-gold-400" />
              <span>Contact Direct</span>
            </div>
            <h3
              id="contact-modal-title"
              className="font-serif italic text-2xl sm:text-3xl text-cream-100 font-semibold"
            >
              Comment souhaitez-vous échanger ?
            </h3>
            <p className="text-cream-300/70 text-sm mt-1">
              Choisissez votre canal préféré pour entrer en relation directe.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-charcoal-800 hover:bg-charcoal-700 text-cream-200 hover:text-gold-400 flex items-center justify-center border border-charcoal-700 transition-colors flex-shrink-0"
            aria-label="Fermer la boîte de dialogue"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contact Options */}
        <div className="flex flex-col gap-4 my-6">
          {/* Option 1: WhatsApp */}
          <a
            href={CONTACT_CONFIG.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="group relative flex items-center justify-between p-4 sm:p-5 rounded-[2rem] bg-charcoal-900/90 hover:bg-emerald-950/30 border border-charcoal-700 hover:border-emerald-500/50 transition-all duration-300 hover:scale-[1.02] shadow-lg"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-charcoal-950 transition-all duration-300">
                {/* Official WhatsApp SVG Icon */}
                <svg
                  className="w-6 h-6 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
              </div>
              <div className="text-left">
                <span className="block font-semibold text-base text-cream-100 group-hover:text-emerald-400 transition-colors">
                  Me contacter sur WhatsApp
                </span>
                <span className="block text-xs font-mono text-cream-300/70 mt-0.5">
                  {CONTACT_CONFIG.phone} • Réponse rapide
                </span>
              </div>
            </div>

            <div className="w-8 h-8 rounded-full bg-charcoal-800 group-hover:bg-emerald-500/20 text-cream-300 group-hover:text-emerald-400 flex items-center justify-center transition-colors">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </a>

          {/* Option 2: Email */}
          <a
            href={CONTACT_CONFIG.mailtoUrl}
            onClick={onClose}
            className="group relative flex items-center justify-between p-4 sm:p-5 rounded-[2rem] bg-charcoal-900/90 hover:bg-gold-500/10 border border-charcoal-700 hover:border-gold-500/50 transition-all duration-300 hover:scale-[1.02] shadow-lg"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-gold-400 group-hover:scale-110 group-hover:bg-gold-500 group-hover:text-charcoal-950 transition-all duration-300">
                <Mail className="w-6 h-6" />
              </div>
              <div className="text-left">
                <span className="block font-semibold text-base text-cream-100 group-hover:text-gold-400 transition-colors">
                  Me contacter par email
                </span>
                <span className="block text-xs font-mono text-cream-300/70 mt-0.5">
                  {CONTACT_CONFIG.email}
                </span>
              </div>
            </div>

            <div className="w-8 h-8 rounded-full bg-charcoal-800 group-hover:bg-gold-500/20 text-cream-300 group-hover:text-gold-400 flex items-center justify-center transition-colors">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </a>
        </div>

        {/* Footer Note */}
        <div className="text-center pt-2 border-t border-charcoal-800">
          <p className="text-[11px] font-mono text-cream-300/50">
            Disponible 7j/7 pour projets SaaS, opportunités & collaborations.
          </p>
        </div>
      </div>
    </div>
  );
}

