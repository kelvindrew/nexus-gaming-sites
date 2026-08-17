import React, { useState, useMemo } from 'react';
import { HardDrive, Plus, Trash2, Check, MessageSquare, ArrowRight, CheckCircle2 } from 'lucide-react';

const STORAGE_OPTIONS = [
  { label: '500 Go', value: 500, usable: 465 },
  { label: '1 To (Populaire)', value: 1000, usable: 930 },
  { label: '2 To (Gamer Pro)', value: 2000, usable: 1860 },
  { label: '4 To (Ultime Master)', value: 4000, usable: 3720 }
];

export default function GamePackBuilder({ games = [], config }) {
  const [selectedStorage, setSelectedStorage] = useState(STORAGE_OPTIONS[1]); // Default: 1 To
  const [selectedPlatform, setSelectedPlatform] = useState('PS4');
  const [selectedGameIds, setSelectedGameIds] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter games based on selected platform and search query
  const availableGames = useMemo(() => {
    return games.filter((g) => {
      const matchPlat = Array.isArray(g.platforms)
        ? g.platforms.some(p => p.toLowerCase().includes(selectedPlatform.toLowerCase()))
        : String(g.platforms || '').toLowerCase().includes(selectedPlatform.toLowerCase());
      
      const matchSearch = g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          g.genre.toLowerCase().includes(searchQuery.toLowerCase());
      return matchPlat && matchSearch;
    });
  }, [games, selectedPlatform, searchQuery]);

  // Parse game size string like "85 GB" or "50 Go" to number
  const parseGameSize = (sizeStr) => {
    if (!sizeStr) return 45;
    const num = parseInt(sizeStr.replace(/[^0-9]/g, ''));
    return isNaN(num) || num === 0 ? 45 : num;
  };

  // Calculate used space
  const selectedGames = useMemo(() => {
    return games.filter(g => selectedGameIds.includes(g.id));
  }, [games, selectedGameIds]);

  const totalUsedGB = useMemo(() => {
    return selectedGames.reduce((acc, g) => acc + parseGameSize(g.size), 0);
  }, [selectedGames]);

  const usagePercent = Math.min(Math.round((totalUsedGB / selectedStorage.usable) * 100), 100);
  const remainingGB = Math.max(selectedStorage.usable - totalUsedGB, 0);

  const toggleGame = (gameId) => {
    if (selectedGameIds.includes(gameId)) {
      setSelectedGameIds(selectedGameIds.filter(id => id !== gameId));
    } else {
      setSelectedGameIds([...selectedGameIds, gameId]);
    }
  };

  const handleOrderWhatsApp = () => {
    if (selectedGames.length === 0) return;
    const list = selectedGames.map((g, i) => `${i + 1}. *${g.title}* (~${g.size})`).join('\n');
    const text = `Bonjour NEXUS GAMING !
    
Je souhaite commander un pack de jeux sur-mesure pour ma *${selectedPlatform}* :
*Disque Dur :* ${selectedStorage.label} (~${totalUsedGB} Go sur ${selectedStorage.usable} Go)
*Nombre de jeux :* ${selectedGames.length}

*Liste de mes jeux choisis :*
${list}

Pouvez-vous me confirmer le tarif et la disponibilité pour l'installation ?`;

    const cleanPhone = (config?.phone || '+243821780077').replace(/[^0-9+]/g, '');
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="pack-builder" className="py-16 sm:py-24 relative bg-[#06080d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.1] text-slate-300 text-xs font-semibold uppercase tracking-wider mb-3 shadow">
            <HardDrive className="w-3.5 h-3.5 text-blue-400" />
            <span>Simulateur Sur-Mesure</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-3">
            Composez Votre Pack de Jeux
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto">
            Choisissez la capacité de votre disque dur, cochez vos jeux préférés et voyez votre stockage se remplir en temps réel.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          
          {/* Left Configuration Panel */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6">
            
            {/* Step 1 & 2: Platform & Storage Selectors */}
            <div className="glass-luxury p-5 sm:p-7 rounded-3xl space-y-5 shadow-xl">
              
              {/* Platform Selector */}
              <div>
                <label className="block text-xs font-semibold tracking-wider text-slate-300 uppercase mb-3">
                  1. Votre Plateforme :
                </label>
                <div className="flex flex-wrap gap-2">
                  {['PS4', 'PS5', 'PC Gaming', 'PS3', 'Xbox', 'Switch'].map((plat) => (
                    <button
                      key={plat}
                      onClick={() => setSelectedPlatform(plat)}
                      className={`px-4 py-2 rounded-full text-xs font-semibold transition-all border ${
                        selectedPlatform === plat
                          ? 'bg-white text-black font-bold border-white shadow-lg'
                          : 'bg-white/[0.03] text-slate-400 border-white/[0.06] hover:bg-white/[0.08] hover:text-white'
                      }`}
                    >
                      {plat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Storage Capacity Selector */}
              <div>
                <label className="block text-xs font-semibold tracking-wider text-slate-300 uppercase mb-3">
                  2. Capacité du Disque Dur / Stockage :
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {STORAGE_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setSelectedStorage(opt)}
                      className={`p-3.5 rounded-2xl text-center transition-all border flex flex-col items-center justify-center gap-1.5 ${
                        selectedStorage.value === opt.value
                          ? 'bg-white text-black font-bold border-white shadow-lg'
                          : 'bg-white/[0.03] text-slate-400 border-white/[0.06] hover:border-white/20 hover:text-white'
                      }`}
                    >
                      <HardDrive className={`w-4 h-4 ${selectedStorage.value === opt.value ? 'text-black' : 'text-slate-400'}`} />
                      <span className="font-heading font-bold text-xs sm:text-sm">{opt.label}</span>
                      <span className={`text-[10px] font-mono ${selectedStorage.value === opt.value ? 'text-black/70' : 'text-slate-500'}`}>~{opt.usable} Go utiles</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Step 3: Choose Games from List */}
            <div className="glass-luxury p-5 sm:p-7 rounded-3xl space-y-4 shadow-xl">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-heading font-bold text-sm sm:text-base text-white">
                  3. Cochez les jeux à installer ({availableGames.length})
                </h3>
                <input
                  type="text"
                  placeholder="Filtrer..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="px-3.5 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-xs w-36 sm:w-48 focus:outline-none focus:border-white/30 font-medium"
                />
              </div>

              {/* Games Scrollable Grid */}
              <div className="max-h-96 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                {availableGames.map((game) => {
                  const isSelected = selectedGameIds.includes(game.id);
                  const sizeGB = parseGameSize(game.size);

                  return (
                    <div
                      key={game.id}
                      onClick={() => toggleGame(game.id)}
                      className={`flex items-center justify-between p-3 rounded-2xl cursor-pointer transition-all border ${
                        isSelected
                          ? 'bg-white/[0.08] border-white/25 shadow-md'
                          : 'bg-white/[0.02] border-white/[0.05] hover:border-white/15'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={game.cover}
                          alt={game.title}
                          className="w-10 h-12 rounded-lg object-cover shrink-0 border border-white/10"
                        />
                        <div className="min-w-0">
                          <h4 className="text-xs sm:text-sm font-bold text-white truncate font-heading">
                            {game.title}
                          </h4>
                          <div className="flex items-center gap-2 text-[10px] text-slate-400">
                            <span className="text-slate-300 font-medium">{game.genre}</span>
                            <span>•</span>
                            <span className="font-mono text-slate-400">~{sizeGB} Go</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                          isSelected
                            ? 'bg-emerald-500 text-black font-bold'
                            : 'bg-white/[0.05] text-slate-500 border border-white/[0.08]'
                        }`}>
                          {isSelected ? <Check className="w-4 h-4 stroke-[3]" /> : <Plus className="w-3.5 h-3.5" />}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Summary Panel */}
          <div className="lg:col-span-5">
            <div className="glass-card-matte p-6 sm:p-8 rounded-3xl sticky top-24 space-y-6 shadow-2xl">
              <div className="flex items-center justify-between">
                <h3 className="font-heading font-bold text-lg text-white">Récapitulatif du Pack</h3>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-white/[0.08] text-white border border-white/15">
                  {selectedPlatform}
                </span>
              </div>

              {/* Space Storage Gauge */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-300 font-mono">
                  <span>Espace Utilisé : {totalUsedGB} Go</span>
                  <span>Max : {selectedStorage.usable} Go</span>
                </div>
                <div className="w-full h-3 rounded-full bg-black/50 overflow-hidden p-0.5 border border-white/[0.08]">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      usagePercent > 90 ? 'bg-rose-500' : usagePercent > 70 ? 'bg-amber-400' : 'bg-blue-500'
                    }`}
                    style={{ width: `${usagePercent}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>{usagePercent}% occupé</span>
                  <span>Reste : ~{remainingGB} Go</span>
                </div>
              </div>

              {/* Selected Games List */}
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
                  <span>Jeux sélectionnés ({selectedGames.length}) :</span>
                  {selectedGames.length > 0 && (
                    <button
                      onClick={() => setSelectedGameIds([])}
                      className="text-rose-400 hover:text-rose-300 normal-case font-normal text-xs"
                    >
                      Tout vider
                    </button>
                  )}
                </div>

                {selectedGames.length === 0 ? (
                  <div className="text-center py-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-slate-500 text-xs">
                    Cochez des jeux à gauche pour composer votre pack.
                  </div>
                ) : (
                  <div className="max-h-60 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                    {selectedGames.map((game) => (
                      <div key={game.id} className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.04] text-xs">
                        <span className="text-white truncate font-medium max-w-[200px]">{game.title}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-400 font-mono text-[10px]">~{game.size}</span>
                          <button
                            onClick={() => toggleGame(game.id)}
                            className="text-slate-500 hover:text-rose-400 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Pack CTA Button */}
              <button
                onClick={handleOrderWhatsApp}
                disabled={selectedGames.length === 0}
                className={`w-full py-3.5 px-6 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg transition-all ${
                  selectedGames.length > 0
                    ? 'btn-whatsapp-modern'
                    : 'bg-white/[0.05] text-slate-600 border border-white/[0.05] cursor-not-allowed'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>Commander ce Pack ({selectedGames.length} jeux)</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
