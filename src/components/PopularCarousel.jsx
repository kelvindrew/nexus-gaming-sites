import React, { useRef, useState } from 'react';
import { Flame, Star, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

export default function PopularCarousel({ games, onSelectGame }) {
  const scrollRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState('Top Tendances');

  const categories = [
    { id: 'Top Tendances', label: 'Top Tendances', filter: (g) => (g.popularity || 0) > 85 },
    { id: 'GOTY', label: 'Mieux Notés', filter: (g) => (g.rating || 0) >= 4.8 },
    { id: 'PlayStation', label: 'Exclusivités PlayStation', filter: (g) => (Array.isArray(g.platforms) ? g.platforms.includes('PS5') || g.platforms.includes('PS4') : true) },
    { id: 'PC', label: 'Hits PC Gaming', filter: (g) => (Array.isArray(g.platforms) ? g.platforms.includes('PC Gaming') : true) }
  ];

  const currentFilter = categories.find(c => c.id === activeCategory)?.filter || (() => true);
  const displayedGames = games.filter(currentFilter);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-8 sm:py-20 relative bg-[#06080d] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex items-end justify-between mb-6 sm:mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.1] text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2 shadow">
              <Flame className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span>Sélection Incontournable</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white font-heading tracking-tight">
              Les Titres les Plus Demandés
            </h2>
          </div>

          {/* Nav buttons */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="p-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] text-slate-300 hover:text-white active:scale-95 transition-all"
              title="Précédent"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] text-slate-300 hover:text-white active:scale-95 transition-all"
              title="Suivant"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Category Tabs (Apple Dark Segmented Pills with smooth mobile edge scrolling) */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 mb-6 -mx-4 px-4 sm:mx-0 sm:px-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all shrink-0 border ${
                activeCategory === cat.id
                  ? 'bg-white text-black font-bold border-white shadow-lg'
                  : 'bg-white/[0.03] text-slate-400 border-white/[0.06] hover:bg-white/[0.08] hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Horizontal Scroll Carousel */}
        <div
          ref={scrollRef}
          className="flex items-center gap-4 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth py-2"
        >
          {displayedGames.map((game) => (
            <div
              key={game.id}
              onClick={() => onSelectGame(game)}
              className="group shrink-0 w-44 sm:w-64 rounded-3xl glass-card-matte overflow-hidden cursor-pointer flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5"
            >
              <div>
                <div className="relative h-56 sm:h-80 w-full overflow-hidden bg-slate-950">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-transparent to-black/30" />
                  
                  <div className="absolute top-2.5 left-2.5">
                    <span className="px-2.5 py-0.5 rounded-md text-[9px] font-semibold bg-black/70 backdrop-blur-md text-white border border-white/15">
                      {game.genre}
                    </span>
                  </div>

                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1 font-bold text-white px-2 py-0.5 rounded-md bg-black/80 backdrop-blur border border-white/10 text-[10px]">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      {game.rating}
                    </span>
                    <span className="text-[10px] font-mono text-slate-300 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur border border-white/10">
                      {game.year}
                    </span>
                  </div>
                </div>

                <div className="p-3.5 sm:p-4">
                  <h3 className="text-xs sm:text-base font-bold text-white font-heading line-clamp-1 group-hover:text-blue-400 transition-colors">
                    {game.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                    {Array.isArray(game.platforms) ? game.platforms.join(' • ') : game.platforms}
                  </p>
                </div>
              </div>

              <div className="p-3.5 sm:p-4 pt-0">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectGame(game);
                  }}
                  className="w-full py-2 rounded-xl btn-secondary-glass text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                >
                  <Eye className="w-3.5 h-3.5 text-slate-400" />
                  <span>Voir la fiche</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
