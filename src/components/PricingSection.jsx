import React, { useState } from 'react';
import { Tag, Check, Sparkles, ArrowRight, ShieldAlert } from 'lucide-react';

export default function PricingSection({ packs, onSelectPack }) {
  const [activeTab, setActiveTab] = useState('console'); // 'console' | 'game'

  const consolePacks = packs?.consolePacks || [];
  const gamePacks = packs?.gamePacks || [];

  return (
    <section id="pricing" className="py-20 relative bg-[#0a0e17]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border-cyan-500/30 text-cyan-300 text-xs font-cyber font-semibold uppercase tracking-wider mb-4">
            <Tag className="w-4 h-4 text-cyan-400" />
            <span>Transparence & Forfaits Fixes</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            NOS <span className="text-gradient-cyan">TARIFS & PACKS</span> DE PRESTATION
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Des tarifs clairs, sans mauvaise surprise. Choisissez le forfait adapté à vos besoins ou contactez-nous pour un pack sur-mesure.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex justify-center mb-14">
          <div className="p-1.5 rounded-2xl glass-panel border-cyan-500/30 inline-flex items-center gap-2">
            <button
              onClick={() => setActiveTab('console')}
              className={`px-6 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'console'
                  ? 'bg-cyan-500 text-black shadow-[0_0_20px_rgba(0,240,255,0.4)]'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              🛠️ Prestations Consoles
            </button>
            <button
              onClick={() => setActiveTab('game')}
              className={`px-6 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'game'
                  ? 'bg-purple-600 text-white shadow-[0_0_20px_rgba(157,0,255,0.4)]'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              🎮 Packs Installation Jeux
            </button>
          </div>
        </div>

        {/* Console Packs View */}
        {activeTab === 'console' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {consolePacks.map((pack) => (
              <div
                key={pack.id}
                className={`relative rounded-3xl glass-panel-hover glass-card-neon p-7 flex flex-col justify-between ${
                  pack.popular ? 'border-cyan-400 shadow-[0_0_30px_rgba(0,240,255,0.25)]' : ''
                }`}
              >
                {pack.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-cyan-500 text-black text-xs font-cyber font-bold tracking-widest uppercase shadow-lg">
                    {pack.badge || 'Populaire'}
                  </div>
                )}

                <div>
                  <div className="mb-6 text-center pt-2">
                    <h3 className="font-heading font-bold text-xl text-white mb-2">{pack.name}</h3>
                    <div className="font-heading font-black text-4xl text-gradient-cyan">
                      {pack.price}
                    </div>
                  </div>

                  <div className="space-y-3 mb-8 border-t border-slate-800 pt-6">
                    {pack.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => onSelectPack(pack, 'Console')}
                  className={`w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 ${
                    pack.popular ? 'btn-cyber-primary' : 'btn-cyber-outline'
                  }`}
                >
                  <span>Sélectionner ce pack</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Game Installation Packs View */}
        {activeTab === 'game' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {gamePacks.map((pack) => (
              <div
                key={pack.id}
                className={`relative rounded-3xl glass-panel-hover glass-card-neon p-7 flex flex-col justify-between ${
                  pack.popular ? 'border-purple-500 shadow-[0_0_30px_rgba(157,0,255,0.25)]' : ''
                }`}
              >
                {pack.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-purple-600 text-white text-xs font-cyber font-bold tracking-widest uppercase shadow-lg">
                    Offre Recommandée
                  </div>
                )}

                <div>
                  <div className="mb-6 text-center pt-2">
                    <h3 className="font-heading font-bold text-xl text-white mb-2">{pack.name}</h3>
                    <div className="font-heading font-black text-4xl text-gradient-purple">
                      {pack.price}
                    </div>
                    {pack.unit && <p className="text-xs text-slate-400 font-mono mt-1">{pack.unit}</p>}
                  </div>

                  <div className="space-y-3 mb-8 border-t border-slate-800 pt-6">
                    {pack.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => onSelectPack(pack, 'Installation Jeux')}
                  className={`w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 ${
                    pack.popular ? 'btn-cyber-purple' : 'btn-cyber-outline'
                  }`}
                >
                  <span>Commander ce forfait</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
