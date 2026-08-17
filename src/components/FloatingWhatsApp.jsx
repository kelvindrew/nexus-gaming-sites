import React, { useState } from 'react';
import { MessageSquare, X, Send, Gamepad2, Wrench, Sparkles } from 'lucide-react';

export default function FloatingWhatsApp({ config }) {
  const [isOpen, setIsOpen] = useState(false);
  const [quickMsg, setQuickMsg] = useState('Bonjour NEXUS GAMING, je souhaite obtenir des informations sur vos services console & PC.');

  const cleanPhone = (config?.phone || '+243821780077').replace(/[^0-9+]/g, '');
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(quickMsg)}`;

  return (
    <div className="hidden lg:flex fixed bottom-6 right-6 z-40 flex-col items-end">
      
      {/* Quick Drawer Panel */}
      {isOpen && (
        <div className="mb-3 w-[calc(100vw-2rem)] max-w-sm sm:w-96 glass-panel rounded-3xl p-5 border-emerald-500/40 shadow-[0_10px_40px_rgba(37,211,102,0.3)] animate-fadeIn">
          
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-heading font-bold text-sm text-white">Assistance WhatsApp Directe</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-300 mb-3 leading-relaxed">
            Posez vos questions directement à nos techniciens pour une réponse prioritaire.
          </p>

          {/* Quick Presets */}
          <div className="space-y-1.5 mb-3">
            <button
              onClick={() => setQuickMsg('Bonjour, je souhaite un devis pour la modification de ma console.')}
              className="w-full text-left p-2.5 rounded-xl bg-black/40 hover:bg-black/60 text-xs text-slate-200 border border-white/[0.06] flex items-center gap-2 transition-all"
            >
              <Wrench className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="truncate">Devis Modification Console / PC</span>
            </button>

            <button
              onClick={() => setQuickMsg('Bonjour, je souhaite installer des jeux sur ma console/PC.')}
              className="w-full text-left p-2.5 rounded-xl bg-black/40 hover:bg-black/60 text-xs text-slate-200 border border-white/[0.06] flex items-center gap-2 transition-all"
            >
              <Gamepad2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              <span className="truncate">Installation de Jeux Possédés</span>
            </button>
          </div>

          <textarea
            rows={3}
            value={quickMsg}
            onChange={(e) => setQuickMsg(e.target.value)}
            className="w-full p-3 rounded-xl bg-black/40 border border-white/10 text-white text-xs mb-3 focus:outline-none focus:border-emerald-400 font-medium"
          />

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="w-full py-3 rounded-xl btn-whatsapp text-xs font-bold flex items-center justify-center gap-2 shadow-lg"
          >
            <Send className="w-4 h-4" />
            <span>Démarrer la discussion WhatsApp</span>
          </a>

        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-3.5 sm:p-4 rounded-full btn-whatsapp shadow-[0_4px_25px_rgba(37,211,102,0.5)] group transition-all duration-300 active:scale-90 sm:hover:scale-105"
        title="Discuter sur WhatsApp"
      >
        <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7 fill-white text-white" />
        <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-300 animate-ping" />
      </button>

    </div>
  );
}
