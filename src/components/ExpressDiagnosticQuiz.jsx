import React, { useState } from 'react';
import { 
  HelpCircle, CheckCircle2, ArrowRight, RotateCcw, 
  MessageSquare, Sparkles, Wrench, ShieldCheck, Gamepad2, Laptop, Smartphone, Flame, Zap
} from 'lucide-react';

export default function ExpressDiagnosticQuiz({ config, onOpenQuote }) {
  const [step, setStep] = useState(1);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [selectedIssue, setSelectedIssue] = useState(null);

  const DEVICES = [
    { id: 'ps4', name: 'PlayStation 4', subtitle: 'FAT, Slim ou PS4 Pro', icon: Gamepad2, color: 'text-blue-400' },
    { id: 'ps5', name: 'PlayStation 5', subtitle: 'Standard, Digital ou Pro', icon: Gamepad2, color: 'text-cyan-400' },
    { id: 'ps3', name: 'PlayStation 3', subtitle: 'FAT, Slim, SuperSlim', icon: Gamepad2, color: 'text-purple-400' },
    { id: 'switch', name: 'Nintendo Switch', subtitle: 'V1, V2, Lite ou OLED', icon: Gamepad2, color: 'text-rose-400' },
    { id: 'pc', name: 'PC Fixe / Portable', subtitle: 'Gaming ou Bureautique', icon: Laptop, color: 'text-emerald-400' },
    { id: 'gsm', name: 'Smartphone', subtitle: 'Samsung, Tecno, Infinix, Xiaomi', icon: Smartphone, color: 'text-amber-400' }
  ];

  const ISSUES_BY_DEVICE = {
    ps4: [
      { id: 'jailbreak', label: 'Je veux des jeux sans acheter de disques', solution: 'Jailbreak PS4 GoldHEN + 3 Jeux Blockbusters', price: 25, time: '45 min' },
      { id: 'heat', label: 'Ma console chauffe fort ou fait un bruit d\'avion', solution: 'Dépoussiérage Ultrasons + Pâte Thermique Arctic MX-4', price: 20, time: '1 heure' },
      { id: 'hdmi', label: 'Écran noir / Pas de signal TV (Port HDMI cassé)', solution: 'Remplacement Micro-Soudure Port HDMI 4K', price: 35, time: '2 heures' },
      { id: 'storage', label: 'Disque plein / Je veux un gros disque dur 1 To / 2 To', solution: 'Remplissage Disque Dur 1 To (~18-25 Jeux)', price: 60, time: '1h30' }
    ],
    ps5: [
      { id: 'maintenance', label: 'Entretien & Nettoyage préventif', solution: 'Nettoyage Dépoussiérage + Métal Liquide PS5', price: 25, time: '1 heure' },
      { id: 'ssd', label: 'Ajout de stockage SSD M.2 Ultra Rapide', solution: 'Configuration & Installation SSD NVMe Gen4', price: 20, time: '30 min' },
      { id: 'controller', label: 'Manette DualSense qui bouge toute seule (Drift)', solution: 'Remplacement Bloc Joystick Drift Hall Effect', price: 10, time: '45 min' },
      { id: 'games', label: 'Installation de jeux PS5 / PS4', solution: 'Installation bibliothèque de jeux & patches', price: 25, time: '1 heure' }
    ],
    ps3: [
      { id: 'flash', label: 'Flash HEN / CFW pour jouer gratuitement', solution: 'Installation CFW Evilnat 4.91 + Multiman + 5 Jeux PS3', price: 20, time: '45 min' },
      { id: 'retro', label: 'Installer des jeux PS1, PS2, PSP & Rétro', solution: 'Pack Rétro Émulateurs + Jeux d\'arcade', price: 15, time: '45 min' },
      { id: 'heat', label: 'Surchauffe / Voyant jaune ou rouge (YLOD)', solution: 'Remplacement Pâte Thermique + Contrôle WebMAN', price: 15, time: '1 heure' }
    ],
    switch: [
      { id: 'atmosphere', label: 'Modification pour installer des jeux sur MicroSD', solution: 'Flash Atmosphere / Puce Picofly + EmuNAND', price: 40, time: '2 heures' },
      { id: 'joycon', label: 'Joy-Con Drift / Manettes défectueuses', solution: 'Remplacement Sticks Analogiques Joy-Con', price: 8, time: '30 min' }
    ],
    pc: [
      { id: 'format', label: 'PC lent, virus ou Windows bloqué', solution: 'Formatage Propre Windows 11 Pro + Suite Office 2024', price: 10, time: '1 heure' },
      { id: 'gamer', label: 'Optimisation PC Gamer (Gain FPS & Pilotes GPU)', solution: 'Optimisation Système, DirectX, VCRedist & Overclocking', price: 10, time: '45 min' },
      { id: 'paste', label: 'PC chauffe fort / Ventilateur tourne à fond', solution: 'Dépoussiérage Intégral + Pâte Thermique Arctic MX-4', price: 15, time: '1 heure' }
    ],
    gsm: [
      { id: 'frp', label: 'Téléphone bloqué sur compte Google après reset', solution: 'Bypass FRP Compte Google en 20 minutes', price: 15, time: '20 min' },
      { id: 'network', label: 'Téléphone bloqué sur opérateur étranger (SIM)', solution: 'Déblocage Réseau & Désimlockage Permanent', price: 20, time: '30 min' },
      { id: 'password', label: 'Code / Schéma / Mot de passe oublié', solution: 'Restauration Système & Suppression Verrouillage', price: 10, time: '30 min' }
    ]
  };

  const handleSelectDevice = (dev) => {
    setSelectedDevice(dev);
    setStep(2);
  };

  const handleSelectIssue = (issue) => {
    setSelectedIssue(issue);
    setStep(3);
  };

  const handleReset = () => {
    setStep(1);
    setSelectedDevice(null);
    setSelectedIssue(null);
  };

  const handleWhatsAppBooking = () => {
    if (!selectedDevice || !selectedIssue) return;
    const cleanPhone = (config?.phone || '+243821780077').replace(/[^0-9+]/g, '');

    let msg = `🤖 *DIAGNOSTIC EXPRESS — NEXUS GAMING*\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `Bonjour NEXUS GAMING, j'ai fait le diagnostic sur votre site :\n\n`;
    msg += `📱 *Mon Matériel :* ${selectedDevice.name}\n`;
    msg += `⚠️ *Mon Problème / Souhait :* ${selectedIssue.label}\n`;
    msg += `🛠️ *Prestation Recommandée :* ${selectedIssue.solution}\n`;
    msg += `💵 *Tarif Estimé RDC :* ~${selectedIssue.price} $\n`;
    msg += `⏱️ *Délai Estimé :* ${selectedIssue.time}\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `Quand puis-je déposer mon matériel à l'atelier ? Merci !`;

    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const currentIssues = selectedDevice ? ISSUES_BY_DEVICE[selectedDevice.id] || [] : [];

  return (
    <section className="py-8 sm:py-16 bg-[#06080d] relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-slate-300 text-xs font-semibold uppercase tracking-wider shadow">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>Assistant Intelligent en 3 Clics</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white font-heading tracking-tight">
            Diagnostic & Tarif Express
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Trouvez instantanément la solution exacte et le prix pour votre console, PC ou smartphone.
          </p>
        </div>

        {/* Diagnostic Box */}
        <div className="glass-luxury p-5 sm:p-8 rounded-3xl border border-white/15 shadow-2xl relative overflow-hidden">
          
          {/* Stepper Header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10 text-xs">
            <div className="flex items-center gap-2">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                step >= 1 ? 'bg-cyan-500 text-black font-black' : 'bg-white/10 text-slate-400'
              }`}>1</span>
              <span className={`hidden xs:inline font-semibold ${step === 1 ? 'text-white' : 'text-slate-500'}`}>Matériel</span>
              
              <span className="text-slate-600">→</span>
              
              <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                step >= 2 ? 'bg-cyan-500 text-black font-black' : 'bg-white/10 text-slate-400'
              }`}>2</span>
              <span className={`hidden xs:inline font-semibold ${step === 2 ? 'text-white' : 'text-slate-500'}`}>Besoin</span>
              
              <span className="text-slate-600">→</span>
              
              <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                step === 3 ? 'bg-emerald-500 text-black font-black' : 'bg-white/10 text-slate-400'
              }`}>3</span>
              <span className={`hidden xs:inline font-semibold ${step === 3 ? 'text-white' : 'text-slate-500'}`}>Diagnostic</span>
            </div>

            {step > 1 && (
              <button
                onClick={handleReset}
                className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Recommencer</span>
              </button>
            )}
          </div>

          {/* STEP 1: SELECT DEVICE */}
          {step === 1 && (
            <div className="space-y-4 animate-fadeIn">
              <h3 className="text-sm sm:text-base font-bold text-white text-left">
                1. Quel est votre matériel ou console ?
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {DEVICES.map((dev) => {
                  const Icon = dev.icon;
                  return (
                    <button
                      key={dev.id}
                      onClick={() => handleSelectDevice(dev)}
                      className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] hover:border-cyan-400/50 text-left transition-all active:scale-95 group flex flex-col justify-between min-h-[110px]"
                    >
                      <Icon className={`w-6 h-6 ${dev.color} group-hover:scale-110 transition-transform mb-2`} />
                      <div>
                        <div className="font-bold text-xs sm:text-sm text-white">{dev.name}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{dev.subtitle}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: SELECT ISSUE */}
          {step === 2 && selectedDevice && (
            <div className="space-y-4 animate-fadeIn">
              <h3 className="text-sm sm:text-base font-bold text-white text-left">
                2. Quel est votre besoin pour votre <span className="text-cyan-400">{selectedDevice.name}</span> ?
              </h3>
              <div className="space-y-2.5">
                {currentIssues.map((issue) => (
                  <button
                    key={issue.id}
                    onClick={() => handleSelectIssue(issue)}
                    className="w-full p-4 rounded-2xl bg-white/[0.03] hover:bg-cyan-500/10 border border-white/[0.08] hover:border-cyan-400/60 text-left transition-all active:scale-98 flex items-center justify-between gap-3 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-cyan-400 group-hover:scale-150 transition-transform" />
                      <span className="font-semibold text-xs sm:text-sm text-white">{issue.label}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-300 group-hover:translate-x-1 transition-all shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: INSTANT DIAGNOSTIC RESULT */}
          {step === 3 && selectedDevice && selectedIssue && (
            <div className="space-y-5 animate-slideUp text-left">
              
              <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#0c1527] to-[#080d1a] border border-cyan-500/30 space-y-4 shadow-xl">
                
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] sm:text-xs font-bold border border-emerald-500/30 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Solution Immédiate Identifiée
                  </span>
                  <span className="text-xs text-slate-400">{selectedDevice.name}</span>
                </div>

                <div>
                  <div className="text-xs text-slate-400 uppercase font-semibold tracking-wider">Prestation Recommandée :</div>
                  <h4 className="text-base sm:text-xl font-black text-white font-heading mt-1">
                    {selectedIssue.solution}
                  </h4>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/10">
                  <div className="bg-black/30 p-3 rounded-xl">
                    <span className="text-[10px] text-slate-400 block">Tarif Estimé Atelier :</span>
                    <strong className="text-lg font-black text-emerald-400 font-mono">~{selectedIssue.price} $</strong>
                  </div>

                  <div className="bg-black/30 p-3 rounded-xl">
                    <span className="text-[10px] text-slate-400 block">Délai Réalisation :</span>
                    <strong className="text-sm font-bold text-cyan-300">{selectedIssue.time}</strong>
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={handleWhatsAppBooking}
                  className="w-full sm:flex-1 py-3.5 px-6 rounded-2xl btn-whatsapp-modern text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-2xl active:scale-95 transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Réserver cette prestation sur WhatsApp</span>
                </button>

                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto py-3 px-5 rounded-2xl btn-secondary-glass text-xs font-semibold text-slate-300 hover:text-white"
                >
                  Autre diagnostic
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
}
