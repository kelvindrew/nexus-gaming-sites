import React, { useState, useEffect } from 'react';
import { 
  Flame, Clock, Zap, Check, ArrowRight, 
  MessageSquare, Sparkles, Tag, ShieldCheck 
} from 'lucide-react';
import { INITIAL_FLASH_DEALS } from '../data/initialData';

export default function FlashDealsSection({ deals = [], config }) {
  const dealsList = deals && deals.length > 0 ? deals : INITIAL_FLASH_DEALS;

  // Countdown timer state (hours, minutes, seconds)
  const [timeLeft, setTimeLeft] = useState({
    hours: 38,
    minutes: 42,
    seconds: 19
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 48, minutes: 0, seconds: 0 }; // Loop for demo
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleClaimDealWhatsApp = (deal) => {
    const cleanPhone = (config?.phone || '+243821780077').replace(/[^0-9+]/g, '');
    
    let msg = `🔥 *COMMANDE OFFRE FLASH — NEXUS GAMING*\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `Bonjour NEXUS GAMING, je souhaite profiter de la promotion flash en cours :\n\n`;
    msg += `🎁 *Offre :* ${deal.title}\n`;
    msg += `📦 *Détails :* ${deal.subtitle}\n`;
    msg += `💵 *Tarif Promo Flash :* *${deal.promoPrice} $* (au lieu de ~${deal.originalPrice} $)\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `Pouvez-vous me bloquer cette offre pour mon passage à l'atelier ? Merci !`;

    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section className="py-8 sm:py-20 bg-gradient-to-b from-[#06080d] via-[#090e1a] to-[#06080d] relative overflow-hidden">
      
      {/* Subtle Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-rose-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-amber-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header with Live Countdown */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-12">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-bold uppercase tracking-wider shadow">
              <Flame className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />
              <span>Promotions Limitées du Moment</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white font-heading tracking-tight">
              Offres Flash & Packs Éco
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              Économisez sur vos forfaits de jeux et révisions d'atelier avec nos tarifs promotionnels exclusifs.
            </p>
          </div>

          {/* Countdown Clock Box */}
          <div className="flex items-center gap-2 self-start md:self-auto p-2 sm:p-3 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/15 shadow-xl">
            <div className="flex items-center gap-1.5 pr-2 border-r border-white/10 text-xs font-semibold text-slate-300">
              <Clock className="w-4 h-4 text-amber-400 animate-spin-slow" />
              <span className="hidden xs:inline">Fin de l'offre :</span>
            </div>

            <div className="flex items-center gap-1 font-mono font-black text-white text-sm sm:text-base">
              <div className="bg-white/[0.08] px-2.5 py-1 rounded-lg">
                {String(timeLeft.hours).padStart(2, '0')}
                <span className="text-[9px] text-slate-400 block font-sans font-normal -mt-0.5">H</span>
              </div>
              <span className="text-slate-500">:</span>
              <div className="bg-white/[0.08] px-2.5 py-1 rounded-lg">
                {String(timeLeft.minutes).padStart(2, '0')}
                <span className="text-[9px] text-slate-400 block font-sans font-normal -mt-0.5">MIN</span>
              </div>
              <span className="text-slate-500">:</span>
              <div className="bg-white/[0.08] px-2.5 py-1 rounded-lg text-rose-400">
                {String(timeLeft.seconds).padStart(2, '0')}
                <span className="text-[9px] text-slate-400 block font-sans font-normal -mt-0.5">SEC</span>
              </div>
            </div>
          </div>
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {dealsList.map((deal) => (
            <div
              key={deal.id}
              className="glass-card-matte rounded-3xl overflow-hidden border border-white/10 hover:border-white/25 flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1 shadow-2xl relative"
            >
              
              {/* Image & Badges */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                <img
                  src={deal.image}
                  alt={deal.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090e1a] via-[#090e1a]/30 to-transparent" />
                
                {/* Discount Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-600 text-white font-black text-xs shadow-lg">
                  <Tag className="w-3.5 h-3.5" />
                  <span>-{deal.discountPercentage}%</span>
                </div>

                <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur text-[10px] font-bold text-amber-300 border border-white/10">
                  {deal.badge}
                </div>

                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="font-heading font-black text-lg text-white drop-shadow-md">
                    {deal.title}
                  </h3>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-5 space-y-4 flex-1 flex flex-col justify-between text-left">
                
                <div className="space-y-3">
                  <p className="text-xs text-slate-300 font-medium line-clamp-2">
                    {deal.subtitle}
                  </p>

                  {/* Platforms */}
                  <div className="flex flex-wrap gap-1">
                    {deal.platforms.map((p, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-white/[0.04] text-slate-400 border border-white/[0.06]">
                        {p}
                      </span>
                    ))}
                  </div>

                  {/* Included Perks List */}
                  <ul className="space-y-1.5 pt-1 text-xs text-slate-300">
                    {deal.features.map((f, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="text-[11px] truncate">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price & Action */}
                <div className="pt-4 border-t border-white/10 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-[10px] text-slate-500 line-through mr-1 font-mono">
                        {deal.originalPrice} $
                      </span>
                      <span className="text-xs text-emerald-400 font-bold">Prix Promo :</span>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-black text-white font-mono">
                        {deal.promoPrice} $
                      </span>
                      <span className="text-[10px] text-slate-400 block -mt-0.5">
                        ~ {(deal.promoPrice * 2850).toLocaleString('fr-FR')} FC
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleClaimDealWhatsApp(deal)}
                    className="w-full py-3 px-4 rounded-xl btn-whatsapp-modern font-bold text-xs flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Profiter de l'Offre sur WhatsApp</span>
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
