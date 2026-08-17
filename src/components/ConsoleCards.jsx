import React from 'react';
import { CheckCircle2, Cpu, ArrowRight } from 'lucide-react';

export default function ConsoleCards({ consoles, onSelectConsole }) {
  return (
    <section id="consoles" className="py-16 sm:py-24 relative bg-[#06080d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.1] text-slate-300 text-xs font-semibold uppercase tracking-wider mb-3 shadow">
            <Cpu className="w-3.5 h-3.5 text-blue-400" />
            <span>Matériel & Plateformes Supportées</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-3">
            Consoles & Équipements
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto">
            Consoles de salon, portables, PC Gaming et smartphones pris en charge dans notre atelier technique.
          </p>
        </div>

        {/* Console Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {consoles.map((consoleItem) => (
            <div
              key={consoleItem.id}
              className="group rounded-3xl glass-card-matte overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5"
            >
              <div>
                {/* Console Image Banner */}
                <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-slate-950">
                  <img
                    src={consoleItem.image}
                    alt={consoleItem.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f17] via-transparent to-transparent" />
                  
                  {/* Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-black/60 backdrop-blur-md text-white border border-white/20 shadow">
                      {consoleItem.badge}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-4 right-4">
                    <span className="text-[11px] font-semibold text-slate-400 block mb-0.5 uppercase tracking-wider">
                      {consoleItem.brand}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white font-heading tracking-tight">
                      {consoleItem.name}
                    </h3>
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-5 sm:p-6">
                  {/* Status Box */}
                  <div className="mb-4 p-3 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-xs text-slate-200 flex items-center gap-2.5">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                    <span className="truncate font-medium">{consoleItem.compatibilityStatus}</span>
                  </div>

                  <p className="text-slate-300 text-xs sm:text-sm mb-5 leading-relaxed line-clamp-2">
                    {consoleItem.description}
                  </p>

                  {/* Available Services */}
                  <div className="space-y-2 mb-6">
                    <p className="text-[11px] tracking-wider text-slate-400 uppercase font-bold">
                      Prestations atelier :
                    </p>
                    {consoleItem.availableServices?.map((service, index) => (
                      <div key={index} className="flex items-center gap-2.5 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate">{service}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Button */}
              <div className="p-5 sm:p-6 pt-0">
                <button
                  onClick={() => onSelectConsole(consoleItem)}
                  className="w-full py-3.5 px-4 rounded-2xl btn-secondary-glass text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow"
                >
                  <span className="truncate">Services pour {consoleItem.name}</span>
                  <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
