import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Search, Heart, ShieldCheck, 
  Gamepad2, LogOut, Phone, FileText, Sparkles, MessageSquare
} from 'lucide-react';

export default function Navbar({ 
  activeSection, 
  setActiveSection, 
  favoritesCount, 
  onOpenSearch, 
  onOpenAdmin,
  onOpenQuote,
  isAdminLoggedIn,
  onLogoutAdmin,
  config 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'catalog', label: 'Catalogue Jeux', icon: '🎮' },
    { id: 'deals', label: 'Offres Flash', icon: '🔥' },
    { id: 'quiz', label: 'Diagnostic Express', icon: '⚡' },
    { id: 'services', label: 'Services Atelier', icon: '🛠️' },
    { id: 'pack-builder', label: 'Pack Sur-Mesure', icon: '📦' },
    { id: 'faq', label: 'FAQ', icon: '❓' },
    { id: 'contact', label: 'Contact & Atelier', icon: '📍' }
  ];

  const handleNavClick = (id) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDirectWhatsApp = () => {
    const cleanPhone = (config?.phone || '+243821780077').replace(/[^0-9+]/g, '');
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent("Bonjour NEXUS GAMING, je souhaite un renseignement sur vos services.")}`, '_blank');
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 w-full transition-all duration-300 ${
      scrolled 
        ? 'bg-[#06080d]/85 backdrop-blur-2xl py-2 sm:py-3 shadow-[0_4px_30px_rgba(0,0,0,0.8)]' 
        : 'bg-gradient-to-b from-[#06080d]/90 via-[#06080d]/40 to-transparent py-3 sm:py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo with Stealth Admin Trigger on PRO */}
          <div 
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-2 sm:gap-3 cursor-pointer group select-none shrink-0"
          >
            <div className="p-1.5 sm:p-2.5 rounded-xl sm:rounded-2xl bg-white/[0.08] backdrop-blur-xl border border-white/20 group-hover:border-white/40 transition-all duration-300 shadow-[0_4px_25px_rgba(0,0,0,0.6)]">
              <Gamepad2 className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-heading font-black text-base sm:text-2xl tracking-tight text-white drop-shadow-md">
                  NEXUS<span className="text-slate-300 font-light">GAMING</span>
                </span>
                <span 
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenAdmin();
                  }}
                  className="px-1.5 sm:px-2 py-0.5 text-[8px] sm:text-[10px] font-bold tracking-widest bg-white/[0.12] hover:bg-white/[0.25] text-white border border-white/20 rounded-full uppercase cursor-pointer active:scale-95 transition-all shadow"
                  title="Nexus Pro"
                >
                  PRO
                </span>
              </div>
            </div>
          </div>

          {/* Clean Action Controls (Optimized for both Mobile & Desktop) */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            
            {/* 1. Devis Proforma Button (Visible on Tablet & Desktop) */}
            {onOpenQuote && (
              <button
                onClick={onOpenQuote}
                className="hidden md:inline-flex py-2 sm:py-2.5 px-4 rounded-full bg-blue-600/20 hover:bg-blue-600/30 backdrop-blur-xl border border-blue-400/30 text-blue-300 hover:text-white transition-all shadow-lg active:scale-95 items-center gap-1.5 text-xs font-bold"
                title="Générateur de Devis Instantané"
              >
                <FileText className="w-3.5 h-3.5 text-blue-400" />
                <span>Devis Proforma</span>
              </button>
            )}

            {/* 2. Global Search Icon Button (Visible on Tablet & Desktop, mobile has it in bottom nav) */}
            <button
              onClick={onOpenSearch}
              className="hidden md:inline-flex p-2.5 sm:p-3 rounded-full bg-black/40 hover:bg-white/20 backdrop-blur-xl border border-white/15 text-white transition-all shadow-lg active:scale-95"
              title="Rechercher"
              aria-label="Rechercher"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* 3. Favorites Counter Button (Visible on all devices) */}
            <button
              onClick={() => handleNavClick('catalog')}
              className="relative p-2 sm:p-2.5 sm:px-3 rounded-full bg-black/40 hover:bg-white/20 backdrop-blur-xl border border-white/15 text-white transition-all shadow-lg active:scale-95 flex items-center gap-1"
              title="Mes Favoris"
              aria-label="Mes Favoris"
            >
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500/20" />
              {favoritesCount > 0 && (
                <span className="font-bold text-[10px] text-rose-400 font-mono">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* 4. Admin Dashboard Pill (When Logged In) */}
            {isAdminLoggedIn && (
              <div className="flex items-center gap-1 p-0.5 sm:p-1 rounded-full bg-purple-950/80 border border-purple-500/40 backdrop-blur animate-fadeIn">
                <button
                  onClick={onOpenAdmin}
                  className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white text-[10px] sm:text-xs font-bold flex items-center gap-1 transition-all shadow"
                  title="Tableau de Bord Admin"
                >
                  <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span>Admin</span>
                </button>
                <button
                  onClick={onLogoutAdmin}
                  className="p-1 sm:p-1.5 rounded-full text-purple-300 hover:text-white hover:bg-purple-800/50"
                  title="Se déconnecter de l'admin"
                >
                  <LogOut className="w-3 h-3" />
                </button>
              </div>
            )}

            {/* 5. WhatsApp Direct Header Button (Desktop / Tablet only) */}
            <button
              onClick={handleDirectWhatsApp}
              className="hidden lg:inline-flex py-2.5 px-5 rounded-full btn-whatsapp-modern text-xs font-bold items-center gap-2 shadow-2xl transition-all"
            >
              <Phone className="w-3.5 h-3.5 fill-white/20" />
              <span>WhatsApp</span>
            </button>

            {/* 6. Hamburger Menu Button (Always clean, never overflows) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 sm:p-2.5 rounded-full bg-black/40 hover:bg-white/20 backdrop-blur-xl border border-white/15 text-white transition-all shadow-lg active:scale-95 flex items-center justify-center"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>

          </div>

        </div>
      </div>

      {/* Slide-out / Dropdown Menu Drawer */}
      {mobileMenuOpen && (
        <div className="bg-[#06080d]/95 backdrop-blur-2xl border-b border-white/[0.08] px-4 py-5 mt-2 max-w-2xl mx-auto rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] animate-fadeIn space-y-4">
          
          {/* Featured Mobile Actions (Devis & WhatsApp) */}
          <div className="grid grid-cols-1 xs:grid-cols-2 gap-2">
            {onOpenQuote && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuote();
                }}
                className="p-3 rounded-2xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-400/40 text-blue-300 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow"
              >
                <FileText className="w-4 h-4 text-blue-400" />
                <span>Générer un Devis Proforma</span>
              </button>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleDirectWhatsApp();
              }}
              className="p-3 rounded-2xl btn-whatsapp-modern font-bold text-xs flex items-center justify-center gap-2 shadow"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Direct Atelier</span>
            </button>
          </div>

          {/* Section Navigation Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`p-3 rounded-2xl text-left text-xs font-semibold transition-all border flex items-center justify-between ${
                  activeSection === link.id
                    ? 'bg-white text-black font-bold border-white shadow-lg'
                    : 'bg-white/[0.04] text-slate-300 border-white/[0.08] hover:bg-white/[0.08] hover:text-white'
                }`}
              >
                <span className="flex items-center gap-1.5 truncate">
                  <span>{link.icon}</span>
                  <span className="truncate">{link.label}</span>
                </span>
                <span className="text-slate-500 text-[10px]">→</span>
              </button>
            ))}
          </div>

        </div>
      )}
    </header>
  );
}
