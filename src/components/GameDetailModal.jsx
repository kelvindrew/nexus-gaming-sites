import React, { useState, useEffect } from 'react';
import { X, Gamepad2, Star, HardDrive, Calendar, ShieldCheck, Heart, MessageSquare, CheckCircle2, Play, Sparkles, Cpu, Monitor, Zap, Layers } from 'lucide-react';
import { getDefaultPcRequirements } from '../data/initialData.js';

export default function GameDetailModal({ 
  game, 
  allGames, 
  onClose, 
  isFavorite, 
  onToggleFavorite, 
  onSendWhatsAppRequest,
  onSelectGame,
  initialTab = 'overview'
}) {
  const [selectedConsole, setSelectedConsole] = useState(
    Array.isArray(game?.platforms) ? game.platforms[0] : (game?.platforms || 'PS5')
  );
  const [activeTab, setActiveTab] = useState(initialTab); // 'overview' | 'pcSpecs' | 'screenshots' | 'trailer'
  const [selectedPcTier, setSelectedPcTier] = useState('recommended'); // 'minimum' | 'recommended' | 'ultra'
  const [previewImage, setPreviewImage] = useState(null);
  const [previewIndex, setPreviewIndex] = useState(0);

  // Sync tab when initialTab prop changes
  useEffect(() => {
    if (initialTab) setActiveTab(initialTab);
  }, [initialTab]);

  // Lock body scroll on mobile when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!game) return null;

  const pcSpecs = game.pcRequirements || getDefaultPcRequirements(game);
  const isPcCompatible = Array.isArray(game.platforms) 
    ? game.platforms.some(p => p.toLowerCase().includes('pc')) 
    : String(game.platforms).toLowerCase().includes('pc');

  const screenshotsList = game.screenshots && game.screenshots.length > 0 
    ? game.screenshots 
    : [game.banner || game.cover];

  const handleOpenPreview = (img, idx) => {
    setPreviewImage(img);
    setPreviewIndex(idx);
  };

  const handleNextPreview = (e) => {
    e.stopPropagation();
    const nextIdx = (previewIndex + 1) % screenshotsList.length;
    setPreviewIndex(nextIdx);
    setPreviewImage(screenshotsList[nextIdx]);
  };

  const handlePrevPreview = (e) => {
    e.stopPropagation();
    const prevIdx = (previewIndex - 1 + screenshotsList.length) % screenshotsList.length;
    setPreviewIndex(prevIdx);
    setPreviewImage(screenshotsList[prevIdx]);
  };

  // Filter similar games
  const similarGames = allGames
    .filter(g => g.id !== game.id && (g.genre === game.genre || (Array.isArray(g.platforms) && g.platforms.some(p => (Array.isArray(game.platforms) ? game.platforms.includes(p) : true)))))
    .slice(0, 4);

  const handleWhatsAppClick = () => {
    onSendWhatsAppRequest(game, selectedConsole);
  };

  const currentTierSpec = pcSpecs[selectedPcTier] || pcSpecs.recommended || pcSpecs.minimum;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 bg-black/85 backdrop-blur-xl animate-fadeIn">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />
      
      {/* Modal Card Box */}
      <div className="relative w-full max-w-5xl bg-[#090d16] border-t sm:border border-cyan-500/30 rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,240,255,0.25)] max-h-[94vh] sm:max-h-[90vh] flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 p-2 sm:p-2.5 rounded-full bg-black/70 text-slate-300 hover:text-white hover:bg-rose-500/80 active:scale-90 transition-all border border-white/10"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Scrollable Container */}
        <div className="overflow-y-auto custom-scrollbar flex-1 pb-20 sm:pb-6">
          
          {/* Hero Banner Section */}
          <div className="relative h-52 sm:h-80 md:h-96 w-full overflow-hidden bg-slate-950">
            <img
              src={game.banner || game.cover}
              alt={game.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-[#090d16]/70 to-transparent" />

            {/* Header Content Overlay */}
            <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 flex items-end gap-3 sm:gap-6 z-10">
              
              <div className="relative w-20 sm:w-36 aspect-[3/4] rounded-xl sm:rounded-2xl overflow-hidden border-2 border-cyan-400/50 shadow-2xl shrink-0 bg-slate-950">
                <div className="absolute top-0 left-0 right-0 z-10 py-0.5 px-1.5 bg-black/80 backdrop-blur text-cyan-300 font-heading font-black text-[7px] sm:text-[9px] uppercase tracking-wider flex items-center justify-between border-b border-white/10">
                  <span className="truncate">{game.platforms?.[0] || 'CONSOLE'}</span>
                  <span className="font-mono text-[7px] text-amber-300">★ {game.rating}</span>
                </div>
                <img
                  src={game.cover}
                  alt={game.title}
                  className="w-full h-full object-cover pt-3"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop";
                  }}
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
                  <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-cyber font-bold tracking-wider bg-purple-600 text-white uppercase shadow">
                    {game.genre}
                  </span>
                  <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-cyber font-bold tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    {game.year}
                  </span>
                  {isPcCompatible && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-cyber font-bold tracking-wider bg-blue-500/20 text-blue-300 border border-blue-500/30">
                      💻 Config PC Disponible
                    </span>
                  )}
                </div>

                <h1 className="text-lg sm:text-3xl md:text-4xl font-black text-white font-heading leading-tight truncate sm:line-clamp-2">
                  {game.title}
                </h1>

                <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-300 mt-1">
                  <span className="flex items-center gap-1 font-bold text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    {game.rating}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 font-mono text-cyan-300 text-xs">
                    <HardDrive className="w-3.5 h-3.5" />
                    {game.size}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="px-4 sm:px-6 border-b border-white/[0.08] flex items-center gap-3 sm:gap-6 text-xs sm:text-sm font-semibold text-slate-400 bg-black/40 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-3 sm:py-4 border-b-2 whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeTab === 'overview'
                  ? 'border-cyan-400 text-cyan-400 font-bold'
                  : 'border-transparent hover:text-white'
              }`}
            >
              <span>Présentation</span>
            </button>

            <button
              onClick={() => setActiveTab('screenshots')}
              className={`py-3 sm:py-4 border-b-2 whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeTab === 'screenshots'
                  ? 'border-white text-white font-bold'
                  : 'border-transparent hover:text-white'
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Captures Gameplay ({screenshotsList.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('pcSpecs')}
              className={`py-3 sm:py-4 border-b-2 whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeTab === 'pcSpecs'
                  ? 'border-cyan-400 text-cyan-400 font-bold'
                  : 'border-transparent hover:text-white'
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-blue-400" />
              <span>Config PC (Mini / Rec / Max)</span>
            </button>

            {game.trailerUrl && (
              <button
                onClick={() => setActiveTab('trailer')}
                className={`py-3 sm:py-4 border-b-2 whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  activeTab === 'trailer'
                    ? 'border-cyan-400 text-cyan-400 font-bold'
                    : 'border-transparent hover:text-white'
                }`}
              >
                <Play className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                <span>Trailer</span>
              </button>
            )}
          </div>

          {/* Content Body */}
          <div className="p-4 sm:p-6 space-y-6">
            
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-6 animate-fadeIn">
                
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-300 uppercase tracking-wider mb-2">
                    À propos du jeu
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {game.description || 'Prestation d\'installation et d\'optimisation pour votre console ou PC Gaming.'}
                  </p>
                </div>

                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Choisissez votre console / support :
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {(Array.isArray(game.platforms) ? game.platforms : [game.platforms]).map((p) => {
                      const isSelected = selectedConsole === p;
                      return (
                        <button
                          key={p}
                          onClick={() => setSelectedConsole(p)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                            isSelected
                              ? p === 'PS3'
                                ? 'bg-amber-500 text-black border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.5)] font-black'
                                : p === 'PS5' || p === 'PS4'
                                ? 'bg-blue-600 text-white border-blue-400 shadow-[0_0_15px_rgba(37,99,235,0.5)]'
                                : p === 'Switch'
                                ? 'bg-red-600 text-white border-red-400 shadow-[0_0_15px_rgba(220,38,38,0.5)]'
                                : p.includes('Xbox')
                                ? 'bg-emerald-600 text-white border-emerald-400 shadow-[0_0_15px_rgba(5,150,105,0.5)]'
                                : 'bg-cyan-500 text-black border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                              : 'bg-slate-900 text-slate-300 border-white/10 hover:border-white/20'
                          }`}
                        >
                          {p}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* IN-GAME GAMEPLAY SHOWCASE STRIP */}
                {screenshotsList.length > 0 && (
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/20 via-black/40 to-purple-950/20 border border-white/[0.08] space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                        <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider font-heading">
                          📸 Aperçu Gameplay In-Game ({screenshotsList.length} Captures HD)
                        </h4>
                      </div>
                      <button
                        onClick={() => setActiveTab('screenshots')}
                        className="text-xs text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1"
                      >
                        <span>Voir la galerie complète</span>
                        <span>➔</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
                      {screenshotsList.slice(0, 3).map((img, sIdx) => (
                        <div
                          key={sIdx}
                          onClick={() => handleOpenPreview(img, sIdx)}
                          className="group relative aspect-video rounded-xl overflow-hidden cursor-pointer border border-white/10 hover:border-cyan-400 transition-all bg-slate-950 shadow-md"
                        >
                          <img
                            src={img}
                            alt={`${game.title} Gameplay ${sIdx + 1}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = game.banner || game.cover;
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                            <span className="text-[10px] font-bold text-white flex items-center gap-1">
                              🔍 Zoomer Gameplay
                            </span>
                          </div>
                          <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-black/80 backdrop-blur text-[8px] font-mono text-cyan-300 font-bold border border-white/10">
                            Capture #{sIdx + 1}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* PC Requirements Fast Teaser Card (If PC is supported) */}
                {isPcCompatible && (
                  <div 
                    onClick={() => setActiveTab('pcSpecs')}
                    className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/40 via-purple-950/30 to-slate-900 border border-blue-500/30 hover:border-cyan-400 transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-blue-500/20 text-cyan-300 border border-blue-400/30">
                        <Cpu className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-heading font-bold text-xs sm:text-sm text-white">
                          Configuration PC Recommandée : {pcSpecs.recommended.gpu}
                        </h4>
                        <p className="text-[11px] text-slate-400">
                          {pcSpecs.recommended.cpu} • {pcSpecs.recommended.ram} • {pcSpecs.recommended.storage}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-cyan-300 font-bold flex items-center gap-1">
                      <span>Voir toutes les configs (Min/Rec/Max)</span>
                      <span>➔</span>
                    </span>
                  </div>
                )}

                {/* Features List */}
                {game.features && game.features.length > 0 && (
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-300 uppercase tracking-wider mb-2">
                      Avantages & Caractéristiques :
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {game.features.map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-200 p-3 rounded-xl bg-slate-900/70 border border-white/[0.06]">
                          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Similar Games Carousel */}
                {similarGames.length > 0 && (
                  <div className="pt-4 border-t border-white/[0.08]">
                    <h3 className="text-xs sm:text-sm font-bold text-slate-300 uppercase tracking-wider mb-3">
                      Jeux similaires qui pourraient vous plaire :
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {similarGames.map((simGame) => (
                        <div
                          key={simGame.id}
                          onClick={() => onSelectGame(simGame)}
                          className="group cursor-pointer rounded-2xl glass-card-neon p-2 transition-all hover:-translate-y-1"
                        >
                          <img
                            src={simGame.cover}
                            alt={simGame.title}
                            className="w-full aspect-[3/4] object-cover rounded-xl mb-1.5 group-hover:scale-105 transition-transform"
                          />
                          <p className="text-xs font-bold text-white truncate">{simGame.title}</p>
                          <p className="text-[10px] text-cyan-400 font-mono">{simGame.genre}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* SCREENSHOTS / GAMEPLAY GALLERY TAB */}
            {activeTab === 'screenshots' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider font-heading">
                      Captures d'écran & Visuels de Gameplay HD (1080p / 4K)
                    </h3>
                    <p className="text-xs text-slate-400">
                      Images réelles in-game capturées sur console & PC Gaming pour <strong>{game.title}</strong>
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-cyan-500/10 text-cyan-300 text-[10px] font-mono font-bold border border-cyan-500/20">
                    {screenshotsList.length} Captures Disponibles
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {screenshotsList.map((img, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleOpenPreview(img, idx)}
                      className="relative rounded-2xl overflow-hidden cursor-pointer border border-white/10 hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(0,240,255,0.3)] transition-all group aspect-video bg-slate-900 shadow-xl"
                    >
                      <img
                        src={img}
                        alt={`${game.title} Gameplay ${idx + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = game.banner || game.cover;
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3">
                        <span className="text-xs font-bold text-white flex items-center gap-1.5">
                          🔍 Agrandir en plein écran
                        </span>
                        <span className="text-[10px] font-mono text-cyan-300 bg-black/60 px-2 py-0.5 rounded border border-white/10">
                          1920x1080
                        </span>
                      </div>
                      <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-lg bg-black/80 backdrop-blur text-[9px] font-mono text-cyan-300 font-bold border border-white/10 shadow">
                        Capture #{idx + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PC SYSTEM REQUIREMENTS TAB */}
            {activeTab === 'pcSpecs' && (
              <div className="space-y-6 animate-fadeIn">
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-2xl bg-blue-950/30 border border-blue-500/30">
                  <div>
                    <h3 className="text-sm font-black text-white font-heading uppercase flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-cyan-400" />
                      <span>CONFIGURATIONS SYSTÈME PC REQUISES</span>
                    </h3>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Spécifications matérielles testées et optimisées pour <strong>{game.title}</strong>
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/60 border border-white/10 w-full sm:w-auto overflow-x-auto no-scrollbar">
                    <button
                      onClick={() => setSelectedPcTier('minimum')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
                        selectedPcTier === 'minimum'
                          ? 'bg-amber-500 text-black shadow-md'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      🟡 Minimale
                    </button>
                    <button
                      onClick={() => setSelectedPcTier('recommended')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
                        selectedPcTier === 'recommended'
                          ? 'bg-cyan-500 text-black shadow-md'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      🔵 Recommandée
                    </button>
                    <button
                      onClick={() => setSelectedPcTier('ultra')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
                        selectedPcTier === 'ultra'
                          ? 'bg-purple-600 text-white shadow-md'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      🟣 Ultra
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl glass-card-neon space-y-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-cyan-300">
                      <Cpu className="w-4 h-4 text-cyan-400" />
                      <span>PROCESSEUR (CPU)</span>
                    </div>
                    <p className="text-sm font-bold text-white font-mono">{currentTierSpec.cpu}</p>
                  </div>

                  <div className="p-4 rounded-2xl glass-card-neon space-y-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-purple-300">
                      <Monitor className="w-4 h-4 text-purple-400" />
                      <span>CARTE GRAPHIQUE (GPU)</span>
                    </div>
                    <p className="text-sm font-bold text-white font-mono">{currentTierSpec.gpu}</p>
                  </div>

                  <div className="p-4 rounded-2xl glass-card-neon space-y-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
                      <Zap className="w-4 h-4 text-emerald-400" />
                      <span>MÉMOIRE VIVE (RAM)</span>
                    </div>
                    <p className="text-sm font-bold text-white font-mono">{currentTierSpec.ram}</p>
                  </div>

                  <div className="p-4 rounded-2xl glass-card-neon space-y-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                      <HardDrive className="w-4 h-4 text-amber-400" />
                      <span>ESPACE DISQUE (SSD RECOMMANDÉ)</span>
                    </div>
                    <p className="text-sm font-bold text-white font-mono">{currentTierSpec.storage}</p>
                  </div>

                  <div className="p-4 rounded-2xl glass-card-neon space-y-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                      <Layers className="w-4 h-4 text-cyan-400" />
                      <span>SYSTÈME & DIRECTX</span>
                    </div>
                    <p className="text-xs sm:text-sm font-bold text-white font-mono">
                      {currentTierSpec.os} • {currentTierSpec.directx}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl glass-card-neon space-y-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-rose-300">
                      <Sparkles className="w-4 h-4 text-rose-400" />
                      <span>OBJECTIF DE FLUIDITÉ & RÉSOLUTION</span>
                    </div>
                    <p className="text-xs sm:text-sm font-bold text-white font-mono">{currentTierSpec.resolution}</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-xs text-slate-300 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white font-bold mb-0.5">Assistance & Configuration Atelier NEXUS</strong>
                    <span>
                      Nous installons et optimisons les pilotes graphiques Nvidia GeForce / AMD Radeon, les bibliothèques DirectX, Visual C++ et configurons les profils graphiques selon votre matériel pour garantir un framerate 60FPS stable.
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* TRAILER TAB */}
            {activeTab === 'trailer' && game.trailerUrl && (
              <div className="animate-fadeIn">
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-cyan-500/30 bg-black shadow-2xl">
                  <iframe
                    src={game.trailerUrl}
                    title="Bande-annonce"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            )}

          </div>

        </div>

        {/* STICKY BOTTOM ACTION BAR (Mobile & Desktop) */}
        <div className="p-3 sm:p-5 bg-black/90 border-t border-white/[0.08] flex items-center justify-between gap-3 shrink-0">
          <button
            onClick={() => onToggleFavorite(game.id)}
            className={`p-3 rounded-2xl border transition-all flex items-center gap-2 text-xs font-bold ${
              isFavorite
                ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                : 'bg-white/[0.04] text-slate-300 border-white/10 hover:text-rose-400'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
            <span className="hidden sm:inline">{isFavorite ? 'Dans vos favoris' : 'Ajouter aux favoris'}</span>
          </button>

          <button
            onClick={handleWhatsAppClick}
            className="flex-1 py-3.5 px-4 rounded-xl btn-whatsapp font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xl"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Demander pour {selectedConsole} sur WhatsApp</span>
          </button>
        </div>

      </div>

      {/* FULLSCREEN GAMEPLAY SCREENSHOT LIGHTBOX MODAL */}
      {previewImage && (
        <div 
          className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center p-2 sm:p-6 animate-fadeIn"
          onClick={() => setPreviewImage(null)}
        >
          <div className="absolute top-3 left-3 right-3 sm:top-5 sm:left-6 sm:right-6 flex items-center justify-between z-30" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur border border-white/10 text-white text-xs font-heading font-bold">
              <span className="text-cyan-400">🎮 {game.title}</span>
              <span className="text-slate-400">• Capture {previewIndex + 1}/{screenshotsList.length}</span>
            </div>

            <button
              onClick={() => setPreviewImage(null)}
              className="p-2 sm:p-2.5 rounded-full bg-black/80 hover:bg-rose-600 text-white border border-white/20 transition-all active:scale-90"
              title="Fermer le plein écran"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          <div className="relative max-w-6xl w-full max-h-[80vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <img
              src={previewImage}
              alt={`${game.title} Gameplay Plein Écran`}
              className="max-w-full max-h-[80vh] object-contain rounded-2xl border border-cyan-500/40 shadow-[0_0_60px_rgba(0,240,255,0.3)]"
            />

            {screenshotsList.length > 1 && (
              <>
                <button
                  onClick={handlePrevPreview}
                  className="absolute left-2 sm:-left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/80 hover:bg-cyan-500 hover:text-black text-white border border-white/20 transition-all shadow-2xl active:scale-90"
                  aria-label="Précédent"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNextPreview}
                  className="absolute right-2 sm:-right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/80 hover:bg-cyan-500 hover:text-black text-white border border-white/20 transition-all shadow-2xl active:scale-90"
                  aria-label="Suivant"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 max-w-md mx-auto flex items-center justify-center p-2 rounded-xl bg-black/80 backdrop-blur border border-white/10 text-slate-300 text-xs" onClick={(e) => e.stopPropagation()}>
            <span>Cliquez n'importe où pour fermer ou utilisez les flèches</span>
          </div>
        </div>
      )}

    </div>
  );
}
