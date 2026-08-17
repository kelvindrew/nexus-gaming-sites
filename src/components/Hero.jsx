import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, ChevronRight, ChevronLeft, 
  ArrowRight, Wrench, Info
} from 'lucide-react';
import { INITIAL_HERO_SLIDES } from '../data/initialData';

export default function Hero({ slides = [], onNavigate }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const slidesList = slides && slides.length > 0 ? slides : INITIAL_HERO_SLIDES;

  useEffect(() => {
    if (isPaused || slidesList.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % slidesList.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, slidesList.length]);

  const currentSlide = slidesList[currentSlideIndex] || slidesList[0];

  const handleNext = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % slidesList.length);
  };

  const handlePrev = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + slidesList.length) % slidesList.length);
  };

  // Touch swipe handling for mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 45) {
      handleNext(); // swipe left -> next
    } else if (diff < -45) {
      handlePrev(); // swipe right -> prev
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const handleWhatsAppAction = (slide) => {
    let msg = "";
    if (slide.type === 'service') {
      msg = `Bonjour NEXUS GAMING, je souhaite commander la prestation atelier : ${slide.title} (${slide.subtitle || ''}).`;
    } else {
      msg = `Bonjour NEXUS GAMING, je souhaite demander le jeu : ${slide.title} sur mes plateformes (${Array.isArray(slide.platforms) ? slide.platforms.join(', ') : slide.platforms}).`;
    }
    window.open(`https://wa.me/243821780077?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section 
      className="relative min-h-[560px] xs:min-h-[620px] sm:min-h-[720px] lg:min-h-[820px] flex flex-col justify-between overflow-hidden bg-[#06080d] select-none pt-24 sm:pt-32"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* 1. BACKGROUND CINEMATIC BILLBOARD (100% FULL BLEED FROM TOP TO BOTTOM) */}
      <div className="absolute inset-0 z-0">
        {slidesList.map((slide, index) => (
          <div
            key={slide.id || index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlideIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover object-center filter brightness-[1.0] contrast-[1.03]"
            />
          </div>
        ))}

        {/* SUBTLE DIRECTIONAL VIGNETTES (TEXT READABILITY WITHOUT BLURRING ARTWORK) */}
        {/* Left side text backdrop */}
        <div className="absolute inset-y-0 left-0 w-full sm:w-3/5 lg:w-1/2 bg-gradient-to-r from-[#06080d]/95 via-[#06080d]/70 to-transparent z-1" />
        
        {/* Top subtle fade for transparent header */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#06080d]/80 via-[#06080d]/30 to-transparent z-1" />
        
        {/* Bottom smooth fade into game catalog */}
        <div className="absolute inset-x-0 bottom-0 h-40 sm:h-56 bg-gradient-to-t from-[#06080d] via-[#06080d]/60 to-transparent z-1" />
      </div>

      {/* 2. MAIN HERO BILLBOARD CONTENT (TEXT DIRECTLY OVER THE IMAGE) */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full my-auto py-8 sm:py-16 text-left">
        <div className="max-w-2xl space-y-3 sm:space-y-5">
          
          {/* Status Pills */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span className={`px-3 py-1 rounded-full text-white text-[10px] sm:text-xs font-bold tracking-wider uppercase shadow-md border ${
              currentSlide.type === 'service'
                ? 'bg-purple-600/90 border-purple-400/40'
                : 'bg-blue-600/90 border-blue-400/40'
            }`}>
              {currentSlide.type === 'service' ? 'SERVICE ATELIER' : 'NEXUS SELECTION'}
            </span>
            {currentSlide.badge && (
              <span className="px-3 py-1 rounded-full bg-black/60 text-slate-200 text-[10px] sm:text-xs font-semibold border border-white/15 backdrop-blur">
                {currentSlide.badge}
              </span>
            )}
            <span className="text-[10px] sm:text-xs text-slate-300 font-semibold tracking-wide">
              {Array.isArray(currentSlide.platforms) ? currentSlide.platforms.join(' • ') : currentSlide.platforms}
            </span>
          </div>

          {/* GIANT BILLBOARD TITLE */}
          <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight text-white font-heading leading-tight drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
            {currentSlide.title}
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-lg lg:text-2xl text-slate-200 font-semibold drop-shadow-md line-clamp-2">
            {currentSlide.subtitle}
          </p>

          {/* Description (Visible on Desktop, streamlined on Mobile) */}
          <p className="hidden sm:block text-xs sm:text-sm lg:text-base text-slate-300 max-w-xl font-normal leading-relaxed drop-shadow-md line-clamp-3">
            {currentSlide.description}
          </p>

          {/* LUXURY CTA BUTTONS */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-3 sm:pt-5">
            <button
              onClick={() => handleWhatsAppAction(currentSlide)}
              className="w-full sm:w-auto px-7 sm:px-9 py-3.5 sm:py-4 rounded-2xl btn-ps-primary text-xs sm:text-sm font-bold tracking-wide flex items-center justify-center gap-2.5 shadow-2xl transition-all"
            >
              {currentSlide.type === 'service' ? (
                <Wrench className="w-4 h-4 text-black" />
              ) : (
                <Play className="w-4 h-4 fill-black text-black" />
              )}
              <span>{currentSlide.ctaText || (currentSlide.type === 'service' ? "Commander sur WhatsApp" : "Demander sur WhatsApp")}</span>
            </button>

            <button
              onClick={() => onNavigate(currentSlide.targetSection || (currentSlide.type === 'service' ? 'services' : 'catalog'))}
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl btn-secondary-glass text-xs sm:text-sm font-semibold flex items-center justify-center gap-2"
            >
              <Info className="w-4 h-4 text-slate-300" />
              <span>{currentSlide.type === 'service' ? "Prestations" : "Catalogue"}</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>

        </div>
      </div>

      {/* 3. LARGE FLOATING NAVIGATION ARROWS (DESKTOP ONLY - NEVER OVERLAPPING TEXT) */}
      <button
        onClick={handlePrev}
        className="hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 p-3.5 lg:p-4 rounded-full bg-black/40 hover:bg-white/20 backdrop-blur-xl border border-white/15 text-white hover:scale-110 active:scale-95 transition-all shadow-2xl items-center justify-center"
        aria-label="Précédent"
      >
        <ChevronLeft className="w-6 h-6 lg:w-8 lg:h-8" />
      </button>

      <button
        onClick={handleNext}
        className="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 p-3.5 lg:p-4 rounded-full bg-black/40 hover:bg-white/20 backdrop-blur-xl border border-white/15 text-white hover:scale-110 active:scale-95 transition-all shadow-2xl items-center justify-center"
        aria-label="Suivant"
      >
        <ChevronRight className="w-6 h-6 lg:w-8 lg:h-8" />
      </button>

      {/* 4. MINIMALIST PAGINATION INDICATORS (TOUCH FRIENDLY AT THE BOTTOM) */}
      <div className="relative z-10 flex items-center justify-center gap-1.5 sm:gap-2 pb-6 sm:pb-8">
        {slidesList.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlideIndex(idx)}
            className={`h-1 sm:h-1.5 rounded-full transition-all duration-500 ${
              idx === currentSlideIndex 
                ? 'w-7 sm:w-10 bg-white shadow-lg' 
                : 'w-1.5 sm:w-2 bg-white/30 hover:bg-white/60'
            }`}
            aria-label={`Aller au slide ${idx + 1}`}
          />
        ))}
      </div>

    </section>
  );
}
