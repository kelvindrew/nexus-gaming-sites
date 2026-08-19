import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Search, Heart, ShieldCheck, 
  Gamepad2, LogOut, Phone
} from 'lucide-react';

export default function Navbar({ 
  activeSection, 
  setActiveSection, 
  favoritesCount, 
  onOpenSearch, 
  onOpenAdmin,
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
    { id: 'catalog', label: 'Catalogue Jeux' },
    { id: 'services', label: 'Services Atelier' },
    { id: 'compatibility', label: 'Diagnostic' },
    { id: 'pack-builder', label: 'Pack Sur-Mesure' },
    { id: 'consoles', label: 'Consoles' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: 'Contact' }
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
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent("Bonjour NEXUS GAMING, je souhaite un renseignement.")}`, '_blank');
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 w-full transition-all duration-300 ${
      scrolled 
        ? 'bg-[#06080d]/85 backdrop-blur-2xl py-2 sm:py-3 shadow-[0_4px_30px_rgba(0,0,0,0.8)]' 
        : 'bg-gradient-to-b from-[#06080d]/90 via-[#06080d]/40 to-transparent py-4 sm:py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo with Stealth Admin Trigger on PRO */}
          <div 
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="p-2 sm:p-2.5 rounded-2xl bg-white/[0.08] backdrop-blur-xl border border-white/20 group-hover:border-white/40 transition-all duration-300 shadow-[0_4px_25px_rgba(0,0,0,0.6)]">
              <Gamepad2 className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-black text-lg sm:text-2xl tracking-tight text-white drop-shadow-md">
                  NEXUS<span className="text-slate-300 font-light">GAMING</span>
                </span>
                <span 
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenAdmin();
                  }}
                  className="px-2 py-0.5 text-[9px] sm:text-[10px] font-bold tracking-widest bg-white/[0.12] hover:bg-white/[0.25] text-white border border-white/20 rounded-full uppercase cursor-pointer active:scale-95 transition-all shadow"
                  title="Nexus Pro"
                >
                  PRO
                </span>
              </div>
            </div>
          </div>

          {/* Right Clean Action Controls (Zero clutter, pure floating icons & WhatsApp) */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Global Search Icon Button */}
            <button
              onClick={onOpenSearch}
              className="p-2.5 sm:p-3 rounded-full bg-black/40 hover:bg-white/20 backdrop-blur-xl border border-white/15 text-white transition-all shadow-lg active:scale-95"
              title="Rechercher"
              aria-label="Rechercher"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Favorites Counter Button */}
            <button
              onClick={() => handleNavClick('catalog')}
              className="relative p-2.5 sm:p-3 rounded-full bg-black/40 hover:bg-white/20 backdrop-blur-xl border border-white/15 text-white transition-all shadow-lg active:scale-95"
              title="Mes Favoris"
              aria-label="Mes Favoris"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500 fill-rose-500/20" />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-lg">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Admin Dashboard Pill (When Logged In) */}
            {isAdminLoggedIn && (
              <div className="flex items-center gap-1 p-0.5 sm:p-1 rounded-full bg-purple-950/80 border border-purple-500/40 backdrop-blur animate-fadeIn">
                <button
                  onClick={onOpenAdmin}
                  className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white text-[11px] sm:text-xs font-bold flex items-center gap-1 sm:gap-1.5 transition-all shadow"
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
                  <LogOut className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </button>
              </div>
            )}

            {/* WhatsApp Direct Header Button (Desktop / Tablet) */}
            <button
              onClick={handleDirectWhatsApp}
              className="hidden sm:inline-flex py-2.5 sm:py-3 px-5 sm:px-6 rounded-full btn-whatsapp-modern text-xs sm:text-sm font-bold items-center gap-2 shadow-2xl transition-all"
            >
              <Phone className="w-4 h-4 fill-white/20" />
              <span>WhatsApp</span>
            </button>

            {/* Hamburger Toggle Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 sm:p-3 rounded-full bg-black/40 hover:bg-white/20 backdrop-blur-xl border border-white/15 text-white transition-all shadow-lg active:scale-95"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </div>

      {/* Slide-out / Dropdown Menu Drawer */}
      {mobileMenuOpen && (
        <div className="bg-[#06080d]/95 backdrop-blur-2xl border-b border-white/[0.08] px-4 py-6 mt-3 max-w-4xl mx-auto rounded-3xl shadow-2xl animate-fadeIn">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`p-3.5 rounded-2xl text-left text-xs sm:text-sm font-semibold transition-all border flex items-center justify-between ${
                  activeSection === link.id
                    ? 'bg-white text-black font-bold border-white shadow-lg'
                    : 'bg-white/[0.04] text-slate-300 border-white/[0.08] hover:bg-white/[0.08] hover:text-white'
                }`}
              >
                <span>{link.label}</span>
                <span className="text-slate-500 text-xs">→</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
