import React, { useState } from 'react';
import { Search, CheckCircle2, Clock, Wrench, Package, ShieldCheck, ArrowRight, MessageSquare, AlertCircle, Sparkles } from 'lucide-react';

const STATUS_STEPS = [
  { id: 'RECEIVED', label: '1. Matériel Reçu', desc: 'Diagnostic initial & vérification en atelier', icon: Clock },
  { id: 'IN_PROGRESS', label: '2. En Cours', desc: 'Installation des logiciels / maintenance', icon: Wrench },
  { id: 'TESTING', label: '3. Contrôle Qualité', desc: 'Tests de performance & stabilité 60FPS', icon: ShieldCheck },
  { id: 'READY', label: '4. Prêt', desc: 'Disponible au retrait ou en cours de livraison', icon: Package }
];

export default function OrderTracker({ orders = [], config }) {
  const [searchCode, setSearchCode] = useState('');
  const [foundOrder, setFoundOrder] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchCode.trim()) return;

    const query = searchCode.trim().toUpperCase();
    const result = orders.find(
      (ord) => ord.trackingCode.toUpperCase() === query || 
               (ord.phone && ord.phone.includes(query))
    );

    setFoundOrder(result || null);
    setHasSearched(true);
  };

  const getStepIndex = (status) => {
    switch (status) {
      case 'RECEIVED': return 0;
      case 'IN_PROGRESS': return 1;
      case 'TESTING': return 2;
      case 'READY': return 3;
      default: return 0;
    }
  };

  const handleWhatsAppContact = () => {
    if (!foundOrder) return;
    const text = `Bonjour NEXUS GAMING, je souhaite avoir des précisions sur mon ticket *#${foundOrder.trackingCode}* (${foundOrder.clientName} - ${foundOrder.device}).`;
    const cleanPhone = (config?.phone || '+243821780077').replace(/[^0-9+]/g, '');
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="tracking" className="py-12 sm:py-20 relative bg-[#05070B] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-3 shadow-lg">
            <Package className="w-3.5 h-3.5 text-purple-400" />
            <span>Suivi & Transparence Atelier</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-3">
            SUIVI DE VOTRE <span className="text-gradient-purple">COMMANDE EN DIRECT</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-base max-w-xl mx-auto">
            Entrez votre numéro de ticket (ex: <strong>NEX-1042</strong>) pour suivre l'avancement de votre console ou de votre PC en temps réel.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          
          {/* Search Box */}
          <div className="glass-panel p-4 sm:p-6 rounded-2xl sm:rounded-3xl border-white/[0.08] shadow-2xl">
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center gap-3">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Tapez votre code de ticket (ex: NEX-1042)..."
                  value={searchCode}
                  onChange={(e) => setSearchCode(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-purple-400 text-xs sm:text-sm font-medium"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl btn-solid-purple text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg shrink-0"
              >
                <span>Rechercher</span>
              </button>
            </form>

            <div className="flex flex-wrap items-center gap-2 mt-3.5 text-xs text-slate-400">
              <span className="font-medium">Exemples :</span>
              <button 
                type="button" 
                onClick={() => { setSearchCode('NEX-1042'); }} 
                className="px-2.5 py-0.5 rounded-md bg-white/[0.05] hover:bg-white/[0.1] text-cyan-300 font-mono border border-white/10"
              >
                NEX-1042
              </button>
              <button 
                type="button" 
                onClick={() => { setSearchCode('NEX-1055'); }} 
                className="px-2.5 py-0.5 rounded-md bg-white/[0.05] hover:bg-white/[0.1] text-purple-300 font-mono border border-white/10"
              >
                NEX-1055
              </button>
            </div>
          </div>

          {/* Search Result View */}
          {hasSearched && foundOrder && (
            <div className="glass-panel p-5 sm:p-8 rounded-2xl sm:rounded-3xl border-cyan-500/40 shadow-2xl space-y-6 animate-fadeIn">
              
              {/* Header Info */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
                <div>
                  <span className="text-[10px] font-semibold text-cyan-400 uppercase tracking-wider block">
                    Ticket #{foundOrder.trackingCode}
                  </span>
                  <h3 className="font-heading font-bold text-xl sm:text-2xl text-white">
                    {foundOrder.clientName} — {foundOrder.device}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 inline-block">
                    {foundOrder.statusLabel}
                  </span>
                  <p className="text-xs text-slate-400 mt-1">Délai estimé : <strong className="text-white">{foundOrder.estimatedDate}</strong></p>
                </div>
              </div>

              {/* Progress Timeline */}
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-300 font-semibold">
                  <span>Progression de la prise en charge :</span>
                  <span className="text-cyan-300 font-mono font-bold">{foundOrder.progressPercent || 75}%</span>
                </div>

                <div className="h-3 w-full bg-black/60 rounded-full overflow-hidden p-0.5 border border-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-400 transition-all duration-700 shadow-[0_0_15px_rgba(0,240,255,0.5)]"
                    style={{ width: `${foundOrder.progressPercent || 75}%` }}
                  />
                </div>

                {/* Steps Visual Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                  {STATUS_STEPS.map((step, idx) => {
                    const currentIdx = getStepIndex(foundOrder.status);
                    const isDone = idx <= currentIdx;
                    const isCurrent = idx === currentIdx;

                    return (
                      <div
                        key={step.id}
                        className={`p-3 rounded-xl border text-center transition-all ${
                          isDone
                            ? isCurrent
                              ? 'bg-cyan-950/60 text-cyan-300 border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.3)] ring-1 ring-cyan-400'
                              : 'bg-emerald-950/40 text-emerald-300 border-emerald-500/30'
                            : 'bg-black/30 text-slate-500 border-white/[0.05]'
                        }`}
                      >
                        <step.icon className="w-4 h-4 mx-auto mb-1" />
                        <span className="text-xs font-bold block leading-tight">
                          {step.label}
                        </span>
                        <p className="text-[10px] text-slate-400 mt-1 hidden sm:block">
                          {step.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Technician Notes */}
              {foundOrder.notes && (
                <div className="p-4 rounded-xl bg-black/40 border border-white/[0.08] space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold block">
                    Notes de l'Atelier / Technicien :
                  </span>
                  <p className="text-xs sm:text-sm text-slate-200">
                    {foundOrder.notes}
                  </p>
                </div>
              )}

              {/* WhatsApp Inquiry Button */}
              <button
                onClick={handleWhatsAppContact}
                className="w-full py-3.5 rounded-xl btn-whatsapp font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Poser une question au technicien sur WhatsApp</span>
              </button>

            </div>
          )}

          {hasSearched && !foundOrder && (
            <div className="glass-panel p-6 rounded-2xl border-rose-500/30 text-center space-y-3 animate-fadeIn">
              <AlertCircle className="w-10 h-10 text-rose-400 mx-auto" />
              <h4 className="text-base font-bold text-white">Aucun ticket trouvé pour "{searchCode}"</h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Vérifiez l'orthographe du code remis lors du dépôt ou contactez l'atelier directement sur WhatsApp.
              </p>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
