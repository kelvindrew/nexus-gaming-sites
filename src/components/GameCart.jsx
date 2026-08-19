import React, { useState } from 'react';
import { 
  ShoppingBag, X, Trash2, Send, HardDrive, 
  Sparkles, ChevronUp, ChevronDown, CheckCircle, Gamepad2 
} from 'lucide-react';

export default function GameCart({ 
  cart = [], 
  onRemoveFromCart, 
  onClearCart, 
  config 
}) {
  const [isOpen, setIsOpen] = useState(false);

  if (!cart || cart.length === 0) return null;

  // Calculate total GB
  const parseSizeToGB = (sizeStr) => {
    if (!sizeStr) return 40;
    const match = sizeStr.match(/(\d+(\.\d+)?)/);
    if (!match) return 40;
    const num = parseFloat(match[1]);
    if (sizeStr.toLowerCase().includes('mb')) return num / 1024;
    return num;
  };

  const totalGB = Math.round(cart.reduce((acc, game) => acc + parseSizeToGB(game.size), 0));

  // Estimate price in USD (DRC rate)
  const calculateEstimatedPrice = (count, gb) => {
    if (count === 1) return 3;
    if (count <= 5) return 12;
    if (count <= 10) return 20;
    if (gb > 1500) return 60; // 2TB
    if (gb > 700) return 35;  // 1TB
    return Math.min(Math.round(count * 1.8), 35);
  };

  const estimatedPrice = calculateEstimatedPrice(cart.length, totalGB);

  // Recommended HDD
  const recommendedStorage = totalGB <= 450 ? '500 Go' : totalGB <= 950 ? '1 To (1000 Go)' : '2 To (2000 Go)';
  const storageCapacity = totalGB <= 450 ? 500 : totalGB <= 950 ? 1000 : 2000;
  const storagePercentage = Math.min(Math.round((totalGB / storageCapacity) * 100), 100);

  const handleSendWhatsAppOrder = () => {
    const cleanPhone = (config?.phone || '+243821780077').replace(/[^0-9+]/g, '');
    
    let msg = `🎮 *COMMANDE PACK MULTI-JEUX — NEXUS GAMING*\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `Bonjour NEXUS GAMING, je souhaite commander cette sélection de *${cart.length} jeux* pour mon stockage :\n\n`;
    
    cart.forEach((g, i) => {
      const plat = Array.isArray(g.platforms) ? g.platforms.join(', ') : g.platforms;
      msg += `${i + 1}. *${g.title}* (${g.size || 'Taille standard'}) — _${plat}_\n`;
    });
    
    msg += `\n━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `💾 *Espace Total Requis :* ~${totalGB} Go\n`;
    msg += `📦 *Disque Conseillé :* ${recommendedStorage}\n`;
    msg += `💵 *Tarif Estimatif RDC :* ~${estimatedPrice} $\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `Pouvez-vous me confirmer la disponibilité et le délai de chargement ? Merci !`;

    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <>
      {/* 1. FLOATING MINIMALIST CART TRIGGER (Always visible when items > 0) */}
      <div className="fixed bottom-20 lg:bottom-6 right-4 sm:right-6 z-40 animate-slideUp">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group flex items-center gap-3 px-4 py-3 rounded-full bg-[#0d121f]/90 hover:bg-[#131b2e] backdrop-blur-2xl border border-white/20 hover:border-white/40 text-white shadow-[0_8px_30px_rgba(0,0,0,0.8)] active:scale-95 transition-all"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
            <span className="absolute -top-2 -right-2 bg-emerald-500 text-black font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-lg animate-pulse">
              {cart.length}
            </span>
          </div>

          <div className="text-left hidden xs:block">
            <div className="text-[11px] font-bold text-white flex items-center gap-1.5">
              <span>Pack {cart.length} {cart.length > 1 ? 'Jeux' : 'Jeu'}</span>
              <span className="text-emerald-400 font-mono">({totalGB} Go)</span>
            </div>
            <div className="text-[9px] text-slate-400 font-medium">
              ~{estimatedPrice} $ • Envoyer sur WhatsApp
            </div>
          </div>

          <div className="p-1 rounded-full bg-white/[0.08] text-slate-300">
            {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </div>
        </button>
      </div>

      {/* 2. EXPANDED CART MODAL DRAWER */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-xl animate-fadeIn">
          <div 
            className="relative w-full max-w-lg bg-[#080c14] border-t sm:border border-white/15 rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.9)] max-h-[85vh] flex flex-col animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Header */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-[#0a0f1d] to-slate-900 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-black text-base sm:text-lg text-white">
                    Mon Pack Multi-Jeux ({cart.length})
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Commande groupée en 1 clic sur WhatsApp
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full bg-white/[0.05] hover:bg-white/15 text-slate-400 hover:text-white transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Storage Progress Gauge */}
            <div className="p-4 bg-white/[0.02] border-b border-white/[0.06] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                  <HardDrive className="w-4 h-4 text-cyan-400" />
                  Espace disque requis :
                </span>
                <span className="font-mono font-bold text-cyan-400">
                  {totalGB} Go / {storageCapacity} Go ({storagePercentage}%)
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/[0.06] overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-full transition-all duration-500"
                  style={{ width: `${storagePercentage}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-400 pt-0.5">
                <span>Disque conseillé : <strong className="text-white">{recommendedStorage}</strong></span>
                <span>Tarif estimatif RDC : <strong className="text-emerald-400 font-bold text-xs">~{estimatedPrice} $</strong></span>
              </div>
            </div>

            {/* Games List (Scrollable) */}
            <div className="p-4 overflow-y-auto flex-1 divide-y divide-white/[0.06] space-y-1">
              {cart.map((game, index) => (
                <div key={`${game.id}-${index}`} className="flex items-center justify-between py-2.5 gap-3 group">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={game.cover}
                      alt={game.title}
                      className="w-10 h-14 object-cover rounded-lg border border-white/10 shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="font-bold text-xs sm:text-sm text-white truncate group-hover:text-cyan-400 transition-colors">
                        {game.title}
                      </h4>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                        <span className="font-mono text-cyan-300">{game.size || '40 Go'}</span>
                        <span>•</span>
                        <span className="truncate">{Array.isArray(game.platforms) ? game.platforms.join(', ') : game.platforms}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveFromCart(game.id)}
                    className="p-2 rounded-lg bg-white/[0.03] hover:bg-rose-500/20 text-slate-500 hover:text-rose-400 transition-all shrink-0"
                    title="Retirer du pack"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Footer Actions */}
            <div className="p-4 bg-[#0a0f1d] border-t border-white/10 space-y-3">
              <div className="flex items-center justify-between text-xs px-1">
                <button
                  onClick={onClearCart}
                  className="text-slate-400 hover:text-rose-400 text-xs flex items-center gap-1 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Vider la sélection</span>
                </button>

                <div className="text-right">
                  <span className="text-slate-400 text-[11px]">Total Estimé : </span>
                  <span className="font-black text-base text-emerald-400 font-mono">~{estimatedPrice} $</span>
                </div>
              </div>

              <button
                onClick={handleSendWhatsAppOrder}
                className="w-full py-3.5 px-4 rounded-2xl btn-whatsapp-modern font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-2xl active:scale-95 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Envoyer ma commande sur WhatsApp ({cart.length} jeux)</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
