import React, { useState, useMemo } from 'react';
import { 
  Gamepad2, Search, Heart, Star, HardDrive, 
  Filter, Eye, MessageSquare, Plus, Edit3, 
  Trash2, Sparkles, Cpu, ChevronDown, CheckCircle2, 
  Camera, ArrowRight
} from 'lucide-react';

export default function GameCatalog({ 
  games, 
  favorites, 
  onToggleFavorite, 
  onSelectGame,
  onQuickWhatsAppRequest,
  isAdminLoggedIn,
  onOpenAdminWithGame,
  onDeleteGame
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('All');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [sortBy, setSortBy] = useState('popularity');
  const [visibleCount, setVisibleCount] = useState(24);

  const platformDefinitions = [
    { id: 'All', label: 'Tous les Jeux', match: () => true },
    { id: 'PS5', label: 'PlayStation 5', match: (p) => p.includes('ps5') },
    { id: 'PS4', label: 'PlayStation 4', match: (p) => p.includes('ps4') },
    { id: 'PS3', label: 'PlayStation 3', match: (p) => p.includes('ps3') },
    { id: 'PC Gaming', label: 'PC Gaming', match: (p) => p.includes('pc') },
    { id: 'Xbox Series X/S', label: 'Xbox Series / One', match: (p) => p.includes('xbox') },
    { id: 'Switch', label: 'Nintendo Switch', match: (p) => p.includes('switch') },
    { id: 'Retrogaming', label: 'Rétrogaming', match: (p) => p.includes('retro') || p.includes('ps2') || p.includes('ps1') || p.includes('arcade') }
  ];



  // 1. Platform Counts (Computed live over the full game list)
  const platformCounts = useMemo(() => {
    const counts = { All: games.length };
    platformDefinitions.forEach(def => {
      if (def.id !== 'All') {
        counts[def.id] = games.filter(g => {
          const plats = Array.isArray(g.platforms) ? g.platforms : [g.platforms];
          const pLower = plats.map(p => String(p).toLowerCase()).join(' ');
          return def.match(pLower);
        }).length;
      }
    });
    return counts;
  }, [games]);

  // 2. Genres list
  const genres = useMemo(() => {
    const set = new Set(games.map(g => g.genre).filter(Boolean));
    return ['All', ...Array.from(set).sort()];
  }, [games]);

  // 3. Filtered games
  const filteredGames = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return games.filter((game) => {
      // Platform Match
      let matchesPlatform = true;
      if (selectedPlatform !== 'All') {
        const plats = Array.isArray(game.platforms) ? game.platforms : [game.platforms];
        const pLower = plats.map(p => String(p).toLowerCase()).join(' ');
        const def = platformDefinitions.find(d => d.id === selectedPlatform);
        matchesPlatform = def ? def.match(pLower) : true;
      }

      // Genre Match
      const matchesGenre = selectedGenre === 'All' || game.genre === selectedGenre;

      // Search Query Match (Title, Genre, Platforms, Features)
      let matchesSearch = true;
      if (q) {
        const inTitle = (game.title || '').toLowerCase().includes(q);
        const inGenre = (game.genre || '').toLowerCase().includes(q);
        const inPlatforms = (Array.isArray(game.platforms) ? game.platforms.join(' ') : String(game.platforms || '')).toLowerCase().includes(q);
        const inYear = String(game.year || '').includes(q);
        matchesSearch = inTitle || inGenre || inPlatforms || inYear;
      }

      return matchesPlatform && matchesGenre && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      if (sortBy === 'year') return (b.year || 0) - (a.year || 0);
      if (sortBy === 'title') return (a.title || '').localeCompare(b.title || '');
      return (b.popularity || 0) - (a.popularity || 0);
    });
  }, [games, selectedPlatform, selectedGenre, searchQuery, sortBy]);

  const displayedGames = filteredGames.slice(0, visibleCount);

  return (
    <section id="catalog" className="py-8 sm:py-24 bg-[#06080d] relative overflow-hidden">
      
      {/* Subtle Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/[0.04] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.1] text-slate-300 text-xs font-semibold uppercase tracking-wider mb-3 shadow">
              <Gamepad2 className="w-3.5 h-3.5 text-blue-400" />
              <span>Ludothèque Officielle & Exclusivités</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-2">
              Catalogue Complet des Jeux
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm max-w-xl">
              Parcourez notre collection de plus de <strong>399 titres certifiés</strong> pour PS5, PS4, PS3, Xbox, Switch et PC Gaming.
            </p>
          </div>

          {isAdminLoggedIn && (
            <div className="flex items-center gap-2 p-2 rounded-2xl bg-purple-950/40 border border-purple-500/30">
              <span className="text-xs text-purple-300 font-bold uppercase tracking-wider px-2">Mode Admin Actif</span>
              <button
                onClick={() => onOpenAdminWithGame()}
                className="py-2 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow"
              >
                <Plus className="w-4 h-4" />
                <span>Ajouter un Jeu</span>
              </button>
            </div>
          )}
        </div>

        {/* CONTROLS BAR (Search, Filters, Sort) */}
        <div className="glass-luxury p-4 sm:p-6 rounded-3xl mb-8 sm:mb-10 space-y-4">
          
          {/* Top Row: Search & Sorter */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            <div className="sm:col-span-8 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Rechercher par titre, genre, plateforme (ex: GTA, FIFA, God of War, PS3, Spider-Man)..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisibleCount(24);
                }}
                className="w-full pl-11 pr-10 py-3.5 bg-white/[0.04] border border-white/[0.08] rounded-2xl text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-white/30 focus:bg-white/[0.07] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs p-1"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="sm:col-span-4 flex items-center gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3.5 bg-white/[0.04] border border-white/[0.08] rounded-2xl text-xs sm:text-sm text-slate-300 outline-none focus:border-white/30 cursor-pointer"
              >
                <option value="popularity" className="bg-[#0b0f19] text-white">Plus populaires</option>
                <option value="rating" className="bg-[#0b0f19] text-white">Meilleures notes</option>
                <option value="year" className="bg-[#0b0f19] text-white">Plus récents</option>
                <option value="title" className="bg-[#0b0f19] text-white">Alphabétique (A-Z)</option>
              </select>
            </div>
          </div>

          {/* Platform Filters Chips with Live Counters (Apple Dark Segmented Pill) */}
          <div>
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5">
              <span>Plateforme :</span>
              <span className="text-slate-400 lowercase font-normal">{filteredGames.length} jeux trouvés</span>
            </div>
            
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              {platformDefinitions.map((p) => {
                const count = platformCounts[p.id] || 0;
                const isSelected = selectedPlatform === p.id;

                return (
                  <button
                    key={p.id}
                    onClick={() => {
                      setSelectedPlatform(p.id);
                      setVisibleCount(24);
                    }}
                    className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 shrink-0 border flex items-center gap-2 ${
                      isSelected
                        ? 'bg-white text-black font-bold border-white shadow-lg'
                        : 'bg-white/[0.03] text-slate-400 border-white/[0.06] hover:bg-white/[0.08] hover:text-white'
                    }`}
                  >
                    <span>{p.label}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                      isSelected ? 'bg-black/20 text-black font-bold' : 'bg-white/10 text-slate-400'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Genre Filters Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 border-t border-white/[0.06] pt-3">
            <span className="text-xs font-medium text-slate-400 mr-2 shrink-0">Genre :</span>
            {genres.map((g) => (
              <button
                key={g}
                onClick={() => {
                  setSelectedGenre(g);
                  setVisibleCount(24);
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all shrink-0 border ${
                  selectedGenre === g
                    ? 'bg-white/[0.15] text-white border-white/30 font-bold'
                    : 'text-slate-400 border-transparent hover:text-slate-200 hover:bg-white/[0.04]'
                }`}
              >
                {g === 'All' ? 'Tous les Genres' : g}
              </button>
            ))}
          </div>

        </div>

        {/* Results Info Bar */}
        <div className="flex items-center justify-between mb-4 sm:mb-6 text-xs text-slate-400 px-1">
          <span className="flex items-center gap-2">
            <span>Affichage de <strong>{displayedGames.length}</strong> sur <strong>{filteredGames.length}</strong> jeux</span>
            {selectedPlatform !== 'All' && (
              <span className="px-2.5 py-0.5 rounded-full bg-white/[0.08] text-white font-semibold border border-white/[0.1]">
                {selectedPlatform}
              </span>
            )}
          </span>

          {selectedPlatform !== 'All' && (
            <button
              onClick={() => setSelectedPlatform('All')}
              className="text-slate-300 hover:text-white font-medium transition-colors"
            >
              Afficher tout ✕
            </button>
          )}
        </div>

        {/* Game Cards Grid (2 cols on mobile, 4 cols on desktop) */}
        {filteredGames.length === 0 ? (
          <div className="text-center py-16 glass-luxury rounded-3xl space-y-3">
            <Gamepad2 className="w-12 h-12 text-slate-600 mx-auto" />
            <h3 className="text-lg font-bold text-white">Aucun jeu trouvé pour ces critères</h3>
            <p className="text-slate-400 text-xs max-w-sm mx-auto">
              Essayez de réinitialiser la recherche ou de sélectionner « Tous les Jeux ».
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedPlatform('All');
                setSelectedGenre('All');
              }}
              className="mt-2 px-6 py-2.5 rounded-full btn-ps-primary text-xs font-bold shadow-lg"
            >
              Afficher toute la ludothèque
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {displayedGames.map((game) => {
              const isFav = favorites.includes(game.id);

              return (
                <div
                  key={game.id}
                  className="group rounded-3xl glass-card-matte overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5"
                >
                  <div onClick={() => onSelectGame(game)} className="cursor-pointer">
                    {/* Pure Game Box Cover Poster 3:4 */}
                    <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-950">
                      <img
                        src={game.cover}
                        alt={game.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                      {/* Favorite Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleFavorite(game.id);
                        }}
                        className={`absolute top-2.5 right-2.5 z-20 p-2 rounded-full backdrop-blur-md transition-all ${
                          isFav 
                            ? 'bg-rose-500/40 text-rose-400 border border-rose-500/50' 
                            : 'bg-black/60 text-slate-300 hover:text-rose-400 border border-white/10'
                        }`}
                        title={isFav ? "Retirer des favoris" : "Ajouter aux favoris"}
                      >
                        <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
                      </button>

                      {/* Rating & Size Bar */}
                      <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px] sm:text-xs text-white">
                        <span className="flex items-center gap-1 font-bold px-2 py-0.5 rounded-md bg-black/80 backdrop-blur border border-white/10">
                          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                          {game.rating}
                        </span>
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur border border-white/10 font-mono text-[10px] text-slate-300">
                          <HardDrive className="w-3 h-3 text-slate-400" />
                          {game.size}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-3.5 sm:p-4">
                      <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                        <span className="font-semibold text-slate-300 uppercase truncate max-w-[120px]">{game.genre}</span>
                        <span>{game.year}</span>
                      </div>

                      <h3 className="text-xs sm:text-base font-bold text-white font-heading line-clamp-1 group-hover:text-blue-400 transition-colors">
                        {game.title}
                      </h3>

                      {/* Platform Badges */}
                      <div className="flex flex-wrap gap-1 mt-2">
                        {(Array.isArray(game.platforms) ? game.platforms : [game.platforms]).slice(0, 3).map((p, pIdx) => (
                          <span key={pIdx} className="px-2 py-0.5 rounded-md text-[9px] font-mono font-medium bg-white/[0.04] text-slate-300 border border-white/[0.06]">
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions (Sleek Clean Buttons Layout) */}
                  <div className="p-3 sm:p-4 pt-0 space-y-1.5 sm:space-y-2">
                    {isAdminLoggedIn && (
                      <div className="flex items-center gap-1 pt-1 border-t border-purple-500/30">
                        <button
                          onClick={() => onOpenAdminWithGame(game)}
                          className="flex-1 py-1 rounded-lg bg-purple-600/30 hover:bg-purple-600 text-purple-200 text-[10px] font-bold flex items-center justify-center gap-1 border border-purple-500/40"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>Éditer</span>
                        </button>
                        <button
                          onClick={() => onDeleteGame(game.id)}
                          className="p-1 rounded-lg bg-rose-500/20 hover:bg-rose-500 text-rose-300 text-[10px] font-bold border border-rose-500/30"
                          title="Supprimer le jeu"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    )}

                    {/* Primary WhatsApp CTA */}
                    <button
                      onClick={() => onQuickWhatsAppRequest(game)}
                      className="w-full py-2 sm:py-2.5 px-3 rounded-xl btn-whatsapp-modern text-[11px] sm:text-xs font-bold shadow flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Commander</span>
                    </button>

                    {/* Secondary Action: Fiche & Captures */}
                    <button
                      onClick={() => onSelectGame(game, 'overview')}
                      className="w-full py-1.5 px-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/[0.08] text-[10px] font-semibold flex items-center justify-center gap-1.5 transition-all"
                    >
                      <Eye className="w-3 h-3 text-slate-400" />
                      <span>Détails & Captures</span>
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}

        {/* Load More Trigger */}
        {visibleCount < filteredGames.length && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setVisibleCount((prev) => prev + 24)}
              className="py-3 px-8 rounded-full btn-secondary-glass text-xs font-bold shadow-lg transition-all"
            >
              Afficher plus de jeux ({filteredGames.length - visibleCount} restants)
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
