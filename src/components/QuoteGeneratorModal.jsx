import React, { useState } from 'react';
import { 
  FileText, X, Check, Calculator, Send, 
  Gamepad2, Wrench, HardDrive, ShieldCheck, Printer, Sparkles 
} from 'lucide-react';

export default function QuoteGeneratorModal({ 
  isOpen, 
  onClose, 
  services = [], 
  config 
}) {
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [selectedDevice, setSelectedDevice] = useState('PS4 (Fat / Slim / Pro)');
  const [selectedServices, setSelectedServices] = useState(['maintenance']);
  const [selectedGamePack, setSelectedGamePack] = useState('pack-1tb');
  const [generatedQuote, setGeneratedQuote] = useState(null);

  if (!isOpen) return null;

  const DEVICES_LIST = [
    { id: 'PS5', name: 'PlayStation 5 / PS5 Pro' },
    { id: 'PS4', name: 'PlayStation 4 (Fat / Slim / Pro)' },
    { id: 'PS3', name: 'PlayStation 3 (Fat / Slim / SuperSlim)' },
    { id: 'PC', name: 'PC Gaming & Ordinateur Portable' },
    { id: 'Switch', name: 'Nintendo Switch (V1/V2/OLED)' },
    { id: 'Xbox', name: 'Xbox Series X/S / Xbox 360' },
    { id: 'GSM', name: 'Smartphone Android (Samsung/Tecno/Infinix/Xiaomi)' }
  ];

  const ATELIER_SERVICES = [
    { id: 'maintenance', name: 'Nettoyage Dépoussiérage + Pâte Thermique MX-4', price: 15 },
    { id: 'jailbreak', name: 'Jailbreak / Flash Système (GoldHEN / HEN / Atmosphère)', price: 20 },
    { id: 'hdmi', name: 'Réparation / Remplacement Port HDMI', price: 30 },
    { id: 'controller', name: 'Réparation Joystick Drift Manette', price: 8 },
    { id: 'pc-os', name: 'Formatage PC + Windows 11 Pro + Suite Office 2024', price: 15 },
    { id: 'frp', name: 'Déblocage Compte Google FRP / Réseau', price: 15 }
  ];

  const GAME_STORAGE_PACKS = [
    { id: 'none', name: 'Aucun pack de jeux (Service uniquement)', price: 0, gb: '0 Go' },
    { id: 'pack-3', name: 'Pack 3 Jeux au choix (Majs & DLCs)', price: 15, gb: '~120 Go' },
    { id: 'pack-4-promo', name: 'Pack Promo 4 Gros Jeux Récentes', price: 35, gb: '~220 Go' },
    { id: 'pack-5', name: 'Pack 5 Jeux au choix', price: 25, gb: '~180 Go' },
    { id: 'pack-500gb', name: 'Remplissage Disque 500 Go (~8-10 jeux)', price: 35, gb: '500 Go' },
    { id: 'pack-1tb', name: 'Remplissage Disque 1 To (~18-25 jeux)', price: 60, gb: '1000 Go' },
    { id: 'pack-2tb', name: 'Remplissage Disque 2 To (~40-50 jeux)', price: 100, gb: '2000 Go' }
  ];

  const toggleService = (id) => {
    if (selectedServices.includes(id)) {
      setSelectedServices(selectedServices.filter(s => s !== id));
    } else {
      setSelectedServices([...selectedServices, id]);
    }
  };

  // Compute Total
  const servicesTotal = selectedServices.reduce((sum, id) => {
    const s = ATELIER_SERVICES.find(item => item.id === id);
    return sum + (s ? s.price : 0);
  }, 0);

  const gamePackObj = GAME_STORAGE_PACKS.find(p => p.id === selectedGamePack) || GAME_STORAGE_PACKS[0];
  const gamesTotal = gamePackObj.price;
  const rawSubtotal = servicesTotal + gamesTotal;

  // Bundle Discount (if service >= 1 and pack >= 500gb)
  const discount = (selectedServices.length > 0 && gamesTotal >= 20) ? 5 : 0;
  const grandTotal = Math.max(rawSubtotal - discount, 0);
  const cdfTotal = (grandTotal * 2850).toLocaleString('fr-FR');

  const handleGenerateQuote = (e) => {
    e.preventDefault();
    const quoteNumber = `DEV-${Date.now().toString().slice(-4)}-${Math.floor(100 + Math.random() * 900)}`;
    const dateStr = new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' });
    
    setGeneratedQuote({
      quoteNumber,
      dateStr,
      clientName: clientName || 'Client Particulier',
      clientPhone: clientPhone || 'WhatsApp',
      device: selectedDevice,
      selectedServicesList: selectedServices.map(id => ATELIER_SERVICES.find(s => s.id === id)).filter(Boolean),
      gamePack: gamePackObj,
      rawSubtotal,
      discount,
      grandTotal,
      cdfTotal
    });
  };

  const handleSendWhatsAppQuote = () => {
    if (!generatedQuote) return;
    const cleanPhone = (config?.phone || '+243821780077').replace(/[^0-9+]/g, '');

    let msg = `🧾 *DEMANDE DE DEVIS & PROFORMA — NEXUS GAMING*\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `*Réf Devis :* ${generatedQuote.quoteNumber}\n`;
    msg += `*Client :* ${generatedQuote.clientName} (${generatedQuote.clientPhone})\n`;
    msg += `*Matériel :* ${generatedQuote.device}\n\n`;
    
    msg += `🛠️ *PRESTATIONS CHOISIES :*\n`;
    generatedQuote.selectedServicesList.forEach((s, idx) => {
      msg += `• ${s.name} : *${s.price} $*\n`;
    });
    if (generatedQuote.gamePack.id !== 'none') {
      msg += `• ${generatedQuote.gamePack.name} : *${generatedQuote.gamePack.price} $*\n`;
    }

    if (generatedQuote.discount > 0) {
      msg += `\n🎁 *Remise Pack Fidélité :* -${generatedQuote.discount} $\n`;
    }

    msg += `\n━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `💵 *TOTAL ESTIMATIF :* *${generatedQuote.grandTotal} $* (~${generatedQuote.cdfTotal} FC)\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `Bonjour NEXUS GAMING, je souhaite valider ce devis pour déposer mon matériel à votre atelier. Merci !`;

    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-2xl overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#090d16] border border-white/15 rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.9)] my-auto max-h-[92vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-950/80 via-slate-900 to-purple-950/80 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 sm:p-2.5 rounded-2xl bg-white/[0.08] text-white border border-white/20 shadow">
              <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
            </div>
            <div>
              <h2 className="text-base sm:text-xl font-black text-white font-heading tracking-tight">
                Générateur de Devis & Proforma
              </h2>
              <p className="text-[10px] sm:text-xs text-slate-400 font-medium">
                Tarifs officiels atelier RDC • Estimation transparente en 1 clic
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 sm:p-2.5 rounded-full bg-white/[0.05] hover:bg-white/20 text-slate-400 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto custom-scrollbar flex-1 space-y-6">
          
          {!generatedQuote ? (
            <form onSubmit={handleGenerateQuote} className="space-y-5">
              
              {/* 1. Client Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">Votre Nom / Pseudo *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Landry K."
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white/[0.04] border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 outline-none focus:border-blue-400"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">Numéro WhatsApp (Optionnel)</label>
                  <input
                    type="text"
                    placeholder="Ex: +243..."
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white/[0.04] border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 outline-none focus:border-blue-400"
                  />
                </div>
              </div>

              {/* 2. Device Selection */}
              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-2">1. Choisissez votre Console ou Équipement :</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {DEVICES_LIST.map((dev) => (
                    <button
                      key={dev.id}
                      type="button"
                      onClick={() => setSelectedDevice(dev.name)}
                      className={`p-2.5 rounded-xl text-left text-xs font-semibold transition-all border ${
                        selectedDevice === dev.name
                          ? 'bg-blue-600/30 text-blue-300 border-blue-400 shadow-md'
                          : 'bg-white/[0.03] text-slate-400 border-white/[0.06] hover:bg-white/[0.06] hover:text-white'
                      }`}
                    >
                      {dev.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Services Selection */}
              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-2">2. Cochez les Prestations Atelier Souhaitées :</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {ATELIER_SERVICES.map((serv) => {
                    const isChecked = selectedServices.includes(serv.id);
                    return (
                      <div
                        key={serv.id}
                        onClick={() => toggleService(serv.id)}
                        className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                          isChecked 
                            ? 'bg-purple-600/20 text-white border-purple-400 shadow-sm' 
                            : 'bg-white/[0.02] text-slate-400 border-white/[0.06] hover:bg-white/[0.05]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className={`w-4 h-4 rounded-md border flex items-center justify-center text-[10px] ${
                            isChecked ? 'bg-purple-500 border-purple-500 text-white font-black' : 'border-slate-600'
                          }`}>
                            {isChecked && '✓'}
                          </div>
                          <span className="text-xs font-medium truncate">{serv.name}</span>
                        </div>
                        <span className="font-mono font-bold text-xs text-purple-300 shrink-0 ml-2">{serv.price} $</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 4. Game Storage Pack Selection */}
              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-2">3. Pack Remplissage Jeux & Disque Dur :</label>
                <div className="space-y-1.5">
                  {GAME_STORAGE_PACKS.map((pack) => {
                    const isChecked = selectedGamePack === pack.id;
                    return (
                      <div
                        key={pack.id}
                        onClick={() => setSelectedGamePack(pack.id)}
                        className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                          isChecked 
                            ? 'bg-emerald-600/20 text-white border-emerald-400 shadow-sm' 
                            : 'bg-white/[0.02] text-slate-400 border-white/[0.06] hover:bg-white/[0.05]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center text-[8px] ${
                            isChecked ? 'bg-emerald-500 border-emerald-500 text-black font-black' : 'border-slate-600'
                          }`}>
                            {isChecked && '●'}
                          </div>
                          <span className="text-xs font-semibold">{pack.name}</span>
                        </div>
                        <div className="flex items-center gap-2 font-mono text-xs shrink-0">
                          <span className="text-slate-500 text-[10px]">{pack.gb}</span>
                          <span className="font-bold text-emerald-400">{pack.price === 0 ? 'Inclus' : `${pack.price} $`}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Realtime Summary Card */}
              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="text-xs text-slate-400">Total Estimatif Atelier :</div>
                  <div className="text-xl font-black text-white font-mono flex items-baseline gap-2">
                    <span>{grandTotal} $</span>
                    <span className="text-xs text-slate-400 font-normal">~ {cdfTotal} FC</span>
                    {discount > 0 && <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/20 px-2 py-0.5 rounded">Économie -{discount}$</span>}
                  </div>
                </div>

                <button
                  type="submit"
                  className="py-3 px-6 rounded-xl btn-ps-primary text-xs font-bold flex items-center justify-center gap-2 shadow-xl"
                >
                  <Calculator className="w-4 h-4 text-black" />
                  <span>Calculer & Éditer le Devis</span>
                </button>
              </div>

            </form>
          ) : (
            /* 🧾 GENERATED DIGITAL PROFORMA TICKET */
            <div className="space-y-4 animate-fadeIn">
              
              <div className="p-6 rounded-3xl bg-[#0c1220] border-2 border-dashed border-white/20 space-y-4 text-left relative overflow-hidden shadow-2xl">
                
                {/* Watermark Logo */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <h3 className="font-heading font-black text-lg text-white tracking-wider">
                      NEXUS<span className="text-slate-400 font-light">GAMING</span> <span className="text-xs font-mono px-2 py-0.5 bg-blue-600/30 text-blue-300 rounded border border-blue-400/30">DEVIS OFFICIEL</span>
                    </h3>
                    <p className="text-[10px] text-slate-400">Atelier Consoles & Tech Expert • RDC</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-mono font-bold text-cyan-400">{generatedQuote.quoteNumber}</div>
                    <div className="text-[10px] text-slate-500">{generatedQuote.dateStr}</div>
                  </div>
                </div>

                {/* Client / Device Details */}
                <div className="grid grid-cols-2 gap-2 text-xs bg-white/[0.03] p-3 rounded-xl border border-white/5">
                  <div>
                    <span className="text-slate-500 text-[10px] block">Client :</span>
                    <strong className="text-white">{generatedQuote.clientName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] block">Matériel Pris en Charge :</span>
                    <strong className="text-cyan-300">{generatedQuote.device}</strong>
                  </div>
                </div>

                {/* Line Items Table */}
                <div className="space-y-2 text-xs">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Détail des Prestations :</div>
                  <div className="divide-y divide-white/[0.06]">
                    {generatedQuote.selectedServicesList.map((s, i) => (
                      <div key={i} className="py-2 flex items-center justify-between">
                        <span className="text-slate-300">• {s.name}</span>
                        <span className="font-mono font-bold text-white">{s.price} $</span>
                      </div>
                    ))}
                    {generatedQuote.gamePack.id !== 'none' && (
                      <div className="py-2 flex items-center justify-between">
                        <span className="text-slate-300">• {generatedQuote.gamePack.name}</span>
                        <span className="font-mono font-bold text-emerald-400">{generatedQuote.gamePack.price} $</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Totals Box */}
                <div className="border-t border-white/10 pt-3 flex items-center justify-between bg-black/40 p-4 rounded-2xl">
                  <div>
                    <span className="text-xs text-slate-400 block">Total Net à Payer :</span>
                    <span className="text-[10px] text-slate-500">Taux indicatif : 1$ = 2 850 FC</span>
                  </div>
                  <div className="text-right">
                    <span className="font-black text-2xl text-emerald-400 font-mono block">
                      {generatedQuote.grandTotal} $
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      ~ {generatedQuote.cdfTotal} FC
                    </span>
                  </div>
                </div>

                <div className="text-[10px] text-slate-500 italic text-center pt-1">
                  * Devis valable 15 jours. Prise en charge rapide et garantie atelier sur toutes les pièces.
                </div>

              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-2">
                <button
                  onClick={handleSendWhatsAppQuote}
                  className="w-full sm:flex-1 py-3.5 px-4 rounded-2xl btn-whatsapp-modern font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-2xl active:scale-95 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Valider & Transmettre sur WhatsApp</span>
                </button>

                <button
                  onClick={() => setGeneratedQuote(null)}
                  className="w-full sm:w-auto py-3 px-5 rounded-2xl btn-secondary-glass text-xs font-semibold text-slate-300 hover:text-white"
                >
                  Modifier les options
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
