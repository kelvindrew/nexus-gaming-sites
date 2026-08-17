import React, { useState, useEffect } from 'react';
import { Gamepad2, ShieldCheck, Download, ArrowUp, Lock } from 'lucide-react';

export default function Footer({ onNavigate, config, onOpenAdmin }) {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const handleInstallPWA = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the PWA install prompt');
        }
        setDeferredPrompt(null);
        setIsInstallable(false);
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#04060a] border-t border-white/[0.06] text-slate-400 py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('hero')}>
              <div className="p-2 rounded-xl bg-white/[0.06] border border-white/[0.1] text-white shadow">
                <Gamepad2 className="w-5 h-5" />
              </div>
              <span className="font-heading font-black text-lg text-white tracking-tight">
                NEXUS GAMING
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              Atelier spécialisé dans l'ingénierie, la maintenance et l'optimisation des systèmes de jeu. Prestations haut de gamme sur consoles PS3, PS4, PS5, Switch, PC Gaming et Téléphones.
            </p>

            {isInstallable && (
              <button
                onClick={handleInstallPWA}
                className="py-2.5 px-4 rounded-xl btn-secondary-glass font-bold text-xs flex items-center gap-2 transition-all shadow"
              >
                <Download className="w-4 h-4" />
                <span>Installer l'application PWA</span>
              </button>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-xs text-white uppercase tracking-wider mb-4">
              Navigation Rapide
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li><button onClick={() => onNavigate('compatibility')} className="hover:text-white transition-colors">Testeur Compatibilité</button></li>
              <li><button onClick={() => onNavigate('pack-builder')} className="hover:text-white transition-colors">Simulateur de Pack de Jeux</button></li>
              <li><button onClick={() => onNavigate('consoles')} className="hover:text-white transition-colors">Consoles & Matériels</button></li>
              <li><button onClick={() => onNavigate('services')} className="hover:text-white transition-colors">Nos Services Experts</button></li>
              <li><button onClick={() => onNavigate('catalog')} className="hover:text-white transition-colors">Catalogue de Jeux</button></li>
              <li><button onClick={() => onNavigate('faq')} className="hover:text-white transition-colors">Foire aux questions (FAQ)</button></li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div>
            <h4 className="font-heading font-bold text-xs text-white uppercase tracking-wider mb-4">
              Informations Atelier
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li><strong>WhatsApp Direct :</strong> {config?.phone || '+243821780077'}</li>
              <li><strong>Localisation :</strong> {config?.location || 'Atelier & Dépôt sécurisé (Envois disponibles)'}</li>
              <li><strong>Horaires :</strong> {config?.hours || 'Lun - Sam : 08h00 - 20h00'}</li>
              <li><strong>Support :</strong> Accompagnement technique personnalisé</li>
            </ul>
          </div>

          {/* Legal Compliance Disclaimer */}
          <div>
            <h4 className="font-heading font-bold text-xs text-white uppercase tracking-wider mb-4">
              Engagement Qualité
            </h4>
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-xs text-slate-400 leading-relaxed space-y-2">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>Interventions Garanties</span>
              </div>
              <p>
                Toutes nos interventions logicielles et matérielles sont exécutées selon les standards de l'art avec protection de vos données.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} NEXUS GAMING SERVICES. Tous droits réservés.</span>
            <button
              onClick={onOpenAdmin}
              className="text-slate-800 hover:text-white transition-colors p-1 cursor-pointer"
              title="Zone Administrateur"
              aria-label="Admin"
            >
              <Lock className="w-3 h-3" />
            </button>
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="p-2 px-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/10 transition-all flex items-center gap-1.5 active:scale-95"
            >
              <ArrowUp className="w-4 h-4" />
              <span>Haut de page</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
