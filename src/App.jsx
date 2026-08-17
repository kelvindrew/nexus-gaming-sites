import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ConsoleCards from './components/ConsoleCards';
import ServiceCards from './components/ServiceCards';
import GameCatalog from './components/GameCatalog';
import PopularCarousel from './components/PopularCarousel';
import GameDetailModal from './components/GameDetailModal';
import ConsoleCompare from './components/ConsoleCompare';
import GamePackBuilder from './components/GamePackBuilder';
import CompatibilityChecker from './components/CompatibilityChecker';
import ContactForm from './components/ContactForm';
import FAQSection from './components/FAQSection';
import ReviewsSection from './components/ReviewsSection';
import AdminDashboard from './components/AdminDashboard';
import AdminLoginModal from './components/AdminLoginModal';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import MobileBottomNav from './components/MobileBottomNav';
import Footer from './components/Footer';

import { 
  getStoredGames, saveGames,
  getStoredServices, saveServices,
  getStoredConsoles, saveConsoles,
  getStoredPacks, savePacks,
  getStoredConfig, saveConfig,
  getFavorites, toggleFavoriteStorage,
  getRecentlyViewed, addRecentlyViewedStorage,
  getStoredMessages, addStoredMessage,
  getStoredHeroSlides, saveHeroSlides,
  getStoredFaqs, saveFaqs,
  getStoredReviews, saveReviews
} from './data/storage';

export default function App() {
  const [games, setGames] = useState(getStoredGames);
  const [services, setServices] = useState(getStoredServices);
  const [consoles, setConsoles] = useState(getStoredConsoles);
  const [packs, setPacks] = useState(getStoredPacks);
  const [heroSlides, setHeroSlides] = useState(getStoredHeroSlides);
  const [faqs, setFaqs] = useState(getStoredFaqs);
  const [reviews, setReviews] = useState(getStoredReviews);

  const [config, setConfig] = useState(() => {
    const cfg = getStoredConfig();
    return {
      phone: '+243821780077',
      location: 'Service disponible & Envoi / Prise en charge rapide',
      ...cfg
    };
  });

  const [favorites, setFavorites] = useState(getFavorites);
  const [recentlyViewed, setRecentlyViewed] = useState(getRecentlyViewed);
  const [messages, setMessages] = useState(getStoredMessages);

  // Admin Auth state
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return sessionStorage.getItem('nexus_admin_session') === 'active';
  });
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const [activeSection, setActiveSection] = useState('hero');
  const [selectedGame, setSelectedGame] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Prefilled contact form values
  const [contactPreset, setContactPreset] = useState({ console: '', service: '', game: '' });

  // Unregister legacy Service Workers to force instant live update
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (let registration of registrations) {
          registration.unregister();
        }
      });
    }
  }, []);

  // Admin Authentication Actions
  const handleOpenAdminTrigger = () => {
    if (isAdminLoggedIn) {
      setIsAdminOpen(true);
    } else {
      setIsAdminLoginOpen(true);
    }
  };

  // Secret URL Hash (#admin) & Keyboard Shortcut (Ctrl+Shift+A or Alt+A)
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#admin') {
        handleOpenAdminTrigger();
      }
    };

    const handleKeyDown = (e) => {
      if ((e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') || (e.altKey && e.key.toLowerCase() === 'a')) {
        e.preventDefault();
        handleOpenAdminTrigger();
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', handleHash);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isAdminLoggedIn]);

  const handleAdminLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    sessionStorage.setItem('nexus_admin_session', 'active');
    setIsAdminLoginOpen(false);
    setIsAdminOpen(true);
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    sessionStorage.removeItem('nexus_admin_session');
    setIsAdminOpen(false);
  };

  // Delete Game handler
  const handleDeleteGame = (gameId) => {
    if (window.confirm('Voulez-vous vraiment supprimer ce jeu du catalogue ?')) {
      const updated = games.filter(g => g.id !== gameId);
      setGames(updated);
      saveGames(updated);
    }
  };

  // Open Admin dashboard directly targeting a game
  const handleOpenAdminWithGame = () => {
    if (!isAdminLoggedIn) {
      setIsAdminLoginOpen(true);
      return;
    }
    setIsAdminOpen(true);
  };

  // Favorites toggle
  const handleToggleFavorite = (gameId) => {
    const updated = toggleFavoriteStorage(gameId);
    setFavorites(updated);
  };

  const [selectedGameTab, setSelectedGameTab] = useState('overview');

  // Select game for Detail Modal
  const handleSelectGame = (game, initialTab = 'overview') => {
    setSelectedGame(game);
    setSelectedGameTab(initialTab);
    const updatedRecent = addRecentlyViewedStorage(game.id);
    setRecentlyViewed(updatedRecent);
  };

  // Console Card selection -> Navigates to contact or filters
  const handleSelectConsole = (consoleItem) => {
    setContactPreset({ console: consoleItem.name, service: '', game: '' });
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Service Card selection -> Navigates to contact
  const handleSelectService = (serviceItem) => {
    setContactPreset({ console: '', service: serviceItem.title, game: '' });
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Direct WhatsApp request from Game Card
  const handleQuickWhatsAppRequest = (game) => {
    const text = `Bonjour NEXUS GAMING, je souhaite demander l'installation de *${game.title}* sur ma console ou PC.`;
    const cleanPhone = (config?.phone || '+243821780077').replace(/[^0-9+]/g, '');
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  // WhatsApp request from Game Detail Modal
  const handleModalWhatsAppRequest = (game, consoleName) => {
    const text = `Bonjour NEXUS GAMING, je souhaite demander l'installation de *${game.title}* pour *${consoleName}*.`;
    const cleanPhone = (config?.phone || '+243821780077').replace(/[^0-9+]/g, '');
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  // Submit client message
  const handleSubmitMessage = (msgData) => {
    const updated = addStoredMessage(msgData);
    setMessages(updated);
  };

  // Updates from Admin Dashboard
  const handleUpdateGames = (newGames) => {
    setGames(newGames);
    saveGames(newGames);
  };

  const handleUpdateConsoles = (newConsoles) => {
    setConsoles(newConsoles);
    saveConsoles(newConsoles);
  };

  const handleUpdateServices = (newServices) => {
    setServices(newServices);
    saveServices(newServices);
  };

  const handleUpdateHeroSlides = (newSlides) => {
    setHeroSlides(newSlides);
    saveHeroSlides(newSlides);
  };

  const handleUpdateFaqs = (newFaqs) => {
    setFaqs(newFaqs);
    saveFaqs(newFaqs);
  };

  const handleUpdateReviews = (newReviews) => {
    setReviews(newReviews);
    saveReviews(newReviews);
  };

  const handleAddReview = (newReview) => {
    const updated = [newReview, ...reviews];
    setReviews(updated);
    saveReviews(updated);
  };

  const handleUpdateConfig = (newConfig) => {
    setConfig(newConfig);
    saveConfig(newConfig);
  };

  // Search Results inside Modal
  const searchFilteredGames = games.filter(g => 
    g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    g.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
    g.platforms.some(p => p.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#080b10] text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-black">
      
      {/* Sticky Navigation */}
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        favoritesCount={favorites.length}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAdmin={handleOpenAdminTrigger}
        isAdminLoggedIn={isAdminLoggedIn}
        onLogoutAdmin={handleAdminLogout}
        config={config}
      />

      {/* Main Page Content */}
      <main className="flex-1 pb-16 lg:pb-0">
        {/* Hero Section */}
        <Hero 
          slides={heroSlides}
          onNavigate={(sec) => {
            setActiveSection(sec);
            const el = document.getElementById(sec);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }} 
        />

        {/* 🎮 Full Game Catalog (PRIMARY FEATURE #1) */}
        <GameCatalog
          games={games}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          onSelectGame={handleSelectGame}
          onQuickWhatsAppRequest={handleQuickWhatsAppRequest}
          isAdminLoggedIn={isAdminLoggedIn}
          onOpenAdminWithGame={handleOpenAdminWithGame}
          onDeleteGame={handleDeleteGame}
        />

        {/* 🔥 Popular & Categorized Carousel */}
        <PopularCarousel
          games={games}
          onSelectGame={handleSelectGame}
        />

        {/* 🛠️ Services Atelier Section */}
        <ServiceCards
          services={services}
          onSelectService={handleSelectService}
        />

        {/* 🔍 Testeur de Compatibilité & Assistant Diagnostic */}
        <CompatibilityChecker config={config} />

        {/* 📦 Simulateur de Pack de Jeux Sur-Mesure */}
        <GamePackBuilder games={games} config={config} />

        {/* Consoles Section */}
        <ConsoleCards
          consoles={consoles}
          onSelectConsole={handleSelectConsole}
        />

        {/* Console Comparison Tool */}
        <ConsoleCompare />

        {/* Customer Reviews with Live Submission */}
        <ReviewsSection reviews={reviews} onAddReview={handleAddReview} />

        {/* FAQ Accordion */}
        <FAQSection faqs={faqs} />

        {/* Contact Form */}
        <ContactForm
          initialConsole={contactPreset.console}
          initialService={contactPreset.service}
          initialGame={contactPreset.game}
          config={config}
          onSubmitMessage={handleSubmitMessage}
        />
      </main>

      {/* Footer */}
      <Footer
        config={config}
        onOpenAdmin={handleOpenAdminTrigger}
        onNavigate={(sec) => {
          setActiveSection(sec);
          const el = document.getElementById(sec);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Floating WhatsApp Action Drawer */}
      <FloatingWhatsApp config={config} />



      {/* Mobile Bottom Navigation Bar (Sticky Thumb Navigation) */}
      <MobileBottomNav
        activeSection={activeSection}
        onNavigate={(sec) => {
          setActiveSection(sec);
          const el = document.getElementById(sec);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        favoritesCount={favorites.length}
        onOpenSearch={() => setIsSearchOpen(true)}
        config={config}
      />

      {/* Game Detail Modal */}
      {selectedGame && (
        <GameDetailModal
          game={selectedGame}
          allGames={games}
          onClose={() => setSelectedGame(null)}
          isFavorite={favorites.includes(selectedGame.id)}
          onToggleFavorite={handleToggleFavorite}
          onSendWhatsAppRequest={handleModalWhatsAppRequest}
          onSelectGame={handleSelectGame}
          initialTab={selectedGameTab}
        />
      )}

      {/* Admin Authentication Login Modal */}
      {isAdminLoginOpen && (
        <AdminLoginModal
          onClose={() => setIsAdminLoginOpen(false)}
          onLoginSuccess={handleAdminLoginSuccess}
        />
      )}

      {/* Admin Dashboard Modal */}
      {isAdminOpen && (
        <AdminDashboard
          onClose={() => setIsAdminOpen(false)}
          games={games}
          onUpdateGames={handleUpdateGames}
          consoles={consoles}
          onUpdateConsoles={handleUpdateConsoles}
          services={services}
          onUpdateServices={handleUpdateServices}
          heroSlides={heroSlides}
          onUpdateHeroSlides={handleUpdateHeroSlides}
          faqs={faqs}
          onUpdateFaqs={handleUpdateFaqs}
          reviews={reviews}
          onUpdateReviews={handleUpdateReviews}
          messages={messages}
          config={config}
          onUpdateConfig={handleUpdateConfig}
        />
      )}

      {/* Global Search Overlay Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-start justify-center p-4 pt-20 animate-fadeIn">
          <div className="w-full max-w-3xl glass-panel p-6 rounded-3xl border-cyan-500/40 shadow-2xl relative">
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              ✕
            </button>
            <h3 className="text-xl font-bold text-white mb-4 font-heading">Recherche Globale NEXUS</h3>
            <input
              type="text"
              autoFocus
              placeholder="Tapez un jeu, une console ou un service..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-4 rounded-2xl bg-slate-900 border border-cyan-500/50 text-white text-base mb-6 focus:outline-none"
            />

            <div className="max-h-96 overflow-y-auto space-y-3 custom-scrollbar">
              {(searchQuery.toLowerCase().includes('admin') || searchQuery.toLowerCase() === 'nexus') && (
                <div
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery('');
                    handleOpenAdminTrigger();
                  }}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-purple-950/60 border border-purple-500/50 hover:bg-purple-900/60 cursor-pointer transition-all shadow-lg animate-fadeIn"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-purple-500/30 text-purple-300">
                      🔐
                    </div>
                    <div>
                      <h4 className="font-bold text-purple-200 text-sm font-cyber uppercase tracking-wider">Espace Administrateur Secret</h4>
                      <p className="text-xs text-purple-400">Cliquez ici pour ouvrir la fenêtre de connexion admin</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-xl bg-purple-600 text-white text-xs font-bold font-cyber">Ouvrir</span>
                </div>
              )}

              {searchFilteredGames.length === 0 && !(searchQuery.toLowerCase().includes('admin') || searchQuery.toLowerCase() === 'nexus') ? (
                <p className="text-sm text-slate-400 text-center py-6">Aucun jeu trouvé pour "{searchQuery}"</p>
              ) : (
                searchFilteredGames.map((g) => (
                  <div
                    key={g.id}
                    onClick={() => {
                      setIsSearchOpen(false);
                      handleSelectGame(g);
                    }}
                    className="flex items-center gap-4 p-3 rounded-2xl bg-slate-900/80 hover:bg-cyan-500/20 cursor-pointer border border-slate-800 hover:border-cyan-500/40 transition-all"
                  >
                    <img src={g.cover} alt={g.title} className="w-12 h-16 object-cover rounded-xl" />
                    <div>
                      <h4 className="font-bold text-white text-sm">{g.title}</h4>
                      <p className="text-xs text-cyan-400 font-mono">{g.platforms.join(', ')} • {g.genre}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
