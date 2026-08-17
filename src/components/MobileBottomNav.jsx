import React from 'react';
import { Home, Gamepad2, Wrench, MessageSquare, Search } from 'lucide-react';

export default function MobileBottomNav({ 
  activeSection, 
  onNavigate, 
  favoritesCount, 
  onOpenSearch, 
  config 
}) {
  const cleanPhone = (config?.phone || '+243821780077').replace(/[^0-9+]/g, '');
  const directWhatsAppUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent('Bonjour NEXUS GAMING, je souhaite obtenir des informations sur vos services.')}`;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#06080d]/85 backdrop-blur-2xl border-t border-white/[0.08] px-3 py-2 pb-safe">
      <div className="flex items-center justify-around max-w-md mx-auto">
        
        {/* 1. Home */}
        <button
          onClick={() => onNavigate('hero')}
          className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-2xl transition-all duration-200 active:scale-95 ${
            activeSection === 'hero' 
              ? 'text-white font-bold' 
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="relative">
            <Home className="w-5 h-5" />
            {activeSection === 'hero' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white" />
            )}
          </div>
          <span className="text-[10px] mt-1 tracking-tight font-medium">Accueil</span>
        </button>

        {/* 2. Catalog */}
        <button
          onClick={() => onNavigate('catalog')}
          className={`relative flex flex-col items-center justify-center py-1.5 px-3 rounded-2xl transition-all duration-200 active:scale-95 ${
            activeSection === 'catalog' 
              ? 'text-white font-bold' 
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="relative">
            <Gamepad2 className="w-5 h-5" />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-rose-500 text-white font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center shadow">
                {favoritesCount}
              </span>
            )}
            {activeSection === 'catalog' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white" />
            )}
          </div>
          <span className="text-[10px] mt-1 tracking-tight font-medium">Catalogue</span>
        </button>

        {/* 3. CENTER PRIMARY WHATSAPP BUTTON (Apple Dark Floating Circle) */}
        <a
          href={directWhatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative -mt-5 p-3.5 rounded-full btn-whatsapp-modern border-4 border-[#06080d] shadow-[0_8px_25px_rgba(16,185,129,0.4)] flex items-center justify-center transform active:scale-95 transition-transform"
          title="Contacter sur WhatsApp"
        >
          <MessageSquare className="w-5 h-5 fill-white text-white" />
        </a>

        {/* 4. Services */}
        <button
          onClick={() => onNavigate('services')}
          className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-2xl transition-all duration-200 active:scale-95 ${
            activeSection === 'services' 
              ? 'text-white font-bold' 
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="relative">
            <Wrench className="w-5 h-5" />
            {activeSection === 'services' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white" />
            )}
          </div>
          <span className="text-[10px] mt-1 tracking-tight font-medium">Services</span>
        </button>

        {/* 5. Search */}
        <button
          onClick={onOpenSearch}
          className="flex flex-col items-center justify-center py-1.5 px-3 rounded-2xl text-slate-400 hover:text-white transition-all active:scale-95"
        >
          <Search className="w-5 h-5" />
          <span className="text-[10px] mt-1 tracking-tight font-medium">Chercher</span>
        </button>

      </div>
    </div>
  );
}
