import React, { useState } from 'react';
import { Unlock, Gamepad2, Cpu, Wrench, ShieldAlert, Zap, Check, ArrowRight, Smartphone, Laptop, KeyRound } from 'lucide-react';

const ICON_MAP = {
  Unlock: Unlock,
  Gamepad2: Gamepad2,
  Cpu: Cpu,
  Wrench: Wrench,
  ShieldAlert: ShieldAlert,
  Zap: Zap,
  Smartphone: Smartphone,
  Laptop: Laptop,
  KeyRound: KeyRound
};

export default function ServiceCards({ services, onSelectService }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    { id: 'All', label: 'Toutes les prestations' },
    { id: 'Consoles', label: 'Consoles & Jeux' },
    { id: 'PC', label: 'PC & Logiciels' },
    { id: 'Mobile', label: 'Déblocage Téléphones' }
  ];

  const filteredServices = services.filter((serv) => {
    if (selectedCategory === 'All') return true;
    if (selectedCategory === 'Consoles') return ['Modification', 'Jeux', 'Software', 'Hardware', 'Performance', 'Consoles'].includes(serv.category);
    if (selectedCategory === 'PC') return ['PC', 'Software', 'Logiciels', 'PC Gaming'].includes(serv.category) || serv.title.includes('PC') || serv.title.includes('Licences');
    if (selectedCategory === 'Mobile') return ['Mobile', 'GSM Mobile'].includes(serv.category) || serv.title.includes('Téléphones') || serv.title.includes('FRP');
    return true;
  });

  return (
    <section id="services" className="py-16 sm:py-24 relative bg-[#06080d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.1] text-slate-300 text-xs font-semibold uppercase tracking-wider mb-3 shadow">
            <Wrench className="w-3.5 h-3.5 text-purple-400" />
            <span>Savoir-Faire & Prestations Spécialisées</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-3">
            Nos Prestations Atelier
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto">
            Modification Consoles, Maintenance PC Gaming, Vente de Licences Authentiques et Déverrouillage Smartphone GSM.
          </p>
        </div>

        {/* Category Filter Tabs (Apple Dark Segmented Pill) */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 mb-10 sm:justify-center">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-white text-black font-bold border-white shadow-lg'
                  : 'bg-white/[0.03] text-slate-400 border-white/[0.06] hover:bg-white/[0.08] hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map((service) => {
            const IconComponent = ICON_MAP[service.iconName] || Wrench;

            return (
              <div
                key={service.id}
                className="group rounded-3xl glass-card-matte p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5"
              >
                <div>
                  {/* Top Bar: Icon + Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3.5 rounded-2xl bg-white/[0.06] border border-white/[0.1] text-white group-hover:scale-105 transition-transform duration-300 shadow">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] font-semibold tracking-wide px-3 py-1 rounded-full bg-white/[0.06] text-slate-300 border border-white/[0.08] inline-block mb-1">
                        {service.badge}
                      </span>
                      <span className="font-heading font-bold text-xs sm:text-sm text-slate-300 block">
                        Sur Devis & Atelier
                      </span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-heading mb-2.5 tracking-tight group-hover:text-purple-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Service Features / Keypoints */}
                  <div className="space-y-2.5 mb-6">
                    {service.details?.map((detail, index) => (
                      <div key={index} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <div className="p-0.5 rounded-full bg-emerald-500/20 text-emerald-400 mt-0.5 shrink-0">
                          <Check className="w-3 h-3" />
                        </div>
                        <span className="leading-snug">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer */}
                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1">
                    {service.consoles?.slice(0, 3).map((cons, idx) => (
                      <span key={idx} className="text-[9px] px-2 py-0.5 rounded bg-white/[0.04] text-slate-400 font-mono">
                        {cons}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => onSelectService(service)}
                    className="py-2.5 px-4 rounded-xl btn-secondary-glass text-xs font-bold flex items-center gap-1.5 transition-all shadow"
                  >
                    <span>Demander</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
