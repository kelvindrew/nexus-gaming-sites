import React, { useState, useEffect } from 'react';
import { Send, MessageSquare, CheckCircle2, ShieldCheck, MapPin, Clock, Phone } from 'lucide-react';

export default function ContactForm({ 
  initialConsole = '', 
  initialService = '', 
  initialGame = '',
  config,
  onSubmitMessage
}) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    whatsapp: '',
    console: initialConsole || 'PS5',
    model: '',
    service: initialService || 'Déverrouillage / Modification',
    game: initialGame || '',
    message: ''
  });

  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  useEffect(() => {
    if (initialConsole) setFormData(prev => ({ ...prev, console: initialConsole }));
    if (initialService) setFormData(prev => ({ ...prev, service: initialService }));
    if (initialGame) setFormData(prev => ({ ...prev, game: initialGame }));
  }, [initialConsole, initialService, initialGame]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateWhatsAppMessage = () => {
    const text = `Bonjour NEXUS GAMING !
    
*Nom :* ${formData.name || 'Client'}
*Téléphone/WhatsApp :* ${formData.whatsapp || formData.phone || 'Non renseigné'}
*Console / Matériel :* ${formData.console} ${formData.model ? `(${formData.model})` : ''}
*Service souhaité :* ${formData.service || 'Demande d\'information'}
${formData.game ? `*Jeu demandé :* ${formData.game}` : ''}
${formData.message ? `*Message :* ${formData.message}` : ''}

Merci de m'indiquer la prise en charge et le devis.`;

    const cleanPhone = (config?.phone || '+243821780077').replace(/[^0-9+]/g, '');
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitMessage(formData);
    setSubmittedSuccess(true);
    setTimeout(() => setSubmittedSuccess(false), 6000);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 relative bg-[#06080d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.1] text-slate-300 text-xs font-semibold uppercase tracking-wider mb-3 shadow">
            <MessageSquare className="w-3.5 h-3.5 text-blue-400" />
            <span>Assistance & Devis Immédiat</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-3">
            Demander un Service ou Devis
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto">
            Remplissez le formulaire ci-dessous ou contactez-nous directement sur WhatsApp pour une réponse prioritaire.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10">
          
          {/* Left Info Panel */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6">
            <div className="glass-luxury p-6 sm:p-8 rounded-3xl space-y-6 shadow-2xl">
              <h3 className="font-heading font-bold text-xl sm:text-2xl text-white">Nexus Gaming Atelier</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Notre équipe est disponible pour répondre à vos questions, configurer vos matériels et préparer vos forfaits personnalisés.
              </p>

              <div className="space-y-4 pt-4 border-t border-white/[0.08] text-xs sm:text-sm">
                <div className="flex items-start gap-3 text-slate-300">
                  <MapPin className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white font-heading font-bold">Localisation & Atelier</strong>
                    <span className="text-slate-400">{config?.location || 'Atelier & Dépôt sécurisé (Livraison et expédition disponibles)'}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-slate-300">
                  <Clock className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white font-heading font-bold">Horaires d'intervention</strong>
                    <span className="text-slate-400">{config?.hours || 'Lun - Sam : 08h00 - 20h00'}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-slate-300">
                  <Phone className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white font-heading font-bold">Contact Direct</strong>
                    <span className="text-slate-400 font-mono">{config?.phone || '+243821780077'}</span>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Box */}
              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-white">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Réponse Rapide Garantie</span>
                </div>
                <p className="text-slate-400 text-xs">
                  Vous avez une question urgente ? Nos techniciens vous répondent directement sur WhatsApp.
                </p>
                <a
                  href={`https://wa.me/${(config?.phone || '+243821780077').replace(/[^0-9+]/g, '')}?text=${encodeURIComponent("Bonjour NEXUS GAMING, je souhaite un devis.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl btn-whatsapp-modern text-xs font-bold flex items-center justify-center gap-2 shadow"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Discuter sur WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Form Panel */}
          <div className="lg:col-span-7">
            <div className="glass-card-matte p-6 sm:p-8 rounded-3xl shadow-2xl">
              
              {submittedSuccess ? (
                <div className="text-center py-12 space-y-4 animate-fadeIn">
                  <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto animate-bounce" />
                  <h3 className="text-2xl font-bold text-white font-heading">Message Envoyé avec Succès !</h3>
                  <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto">
                    Nous avons bien reçu votre demande. Pour accélérer le traitement, vous pouvez également nous joindre en 1 clic sur WhatsApp.
                  </p>
                  <div className="pt-4">
                    <a
                      href={generateWhatsAppMessage()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full btn-whatsapp-modern text-xs sm:text-sm font-bold shadow-lg"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Ouvrir dans WhatsApp avec mes infos</span>
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Votre Nom *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Ex: David Mulamba"
                        className="w-full p-3.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-xs sm:text-sm placeholder-slate-500 outline-none focus:border-white/30 focus:bg-white/[0.06] transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Numéro Téléphone / WhatsApp *
                      </label>
                      <input
                        type="text"
                        name="whatsapp"
                        required
                        value={formData.whatsapp}
                        onChange={handleChange}
                        placeholder="Ex: +243 821 780 077"
                        className="w-full p-3.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-xs sm:text-sm placeholder-slate-500 outline-none focus:border-white/30 focus:bg-white/[0.06] transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Console ou Équipement *
                      </label>
                      <select
                        name="console"
                        value={formData.console}
                        onChange={handleChange}
                        className="w-full p-3.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-xs sm:text-sm outline-none focus:border-white/30 cursor-pointer"
                      >
                        <option value="PS5" className="bg-[#0b0f19] text-white">PlayStation 5</option>
                        <option value="PS4 Pro" className="bg-[#0b0f19] text-white">PlayStation 4 Pro</option>
                        <option value="PS4 Slim / FAT" className="bg-[#0b0f19] text-white">PlayStation 4 Slim / FAT</option>
                        <option value="PS3" className="bg-[#0b0f19] text-white">PlayStation 3</option>
                        <option value="PC Gaming" className="bg-[#0b0f19] text-white">PC Gaming</option>
                        <option value="Xbox Series X/S" className="bg-[#0b0f19] text-white">Xbox Series X/S & One</option>
                        <option value="Nintendo Switch" className="bg-[#0b0f19] text-white">Nintendo Switch</option>
                        <option value="Smartphone GSM" className="bg-[#0b0f19] text-white">Smartphone / Tablette (Déblocage)</option>
                        <option value="Autre" className="bg-[#0b0f19] text-white">Autre équipement</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Prestation Souhaitée *
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full p-3.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-xs sm:text-sm outline-none focus:border-white/30 cursor-pointer"
                      >
                        <option value="Modification GoldHEN / Jailbreak" className="bg-[#0b0f19] text-white">Modification GoldHEN / Jailbreak</option>
                        <option value="Pack de Jeux Dématérialisés" className="bg-[#0b0f19] text-white">Pack de Jeux Dématérialisés</option>
                        <option value="Formatage & Windows 11 PC Gaming" className="bg-[#0b0f19] text-white">Formatage & Windows 11 PC Gaming</option>
                        <option value="Entretien & Nettoyage Thermique" className="bg-[#0b0f19] text-white">Entretien & Nettoyage Thermique</option>
                        <option value="Déblocage Réseau & FRP Smartphone" className="bg-[#0b0f19] text-white">Déblocage Réseau & FRP Smartphone</option>
                        <option value="Réparation Matérielle (HDMI, Port...)" className="bg-[#0b0f19] text-white">Réparation Matérielle (HDMI, Port...)</option>
                        <option value="Autre Demande" className="bg-[#0b0f19] text-white">Autre Demande</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Jeu ou Précision spécifique (Optionnel)
                    </label>
                    <input
                      type="text"
                      name="game"
                      value={formData.game}
                      onChange={handleChange}
                      placeholder="Ex: GTA V, EA FC 24, Cyberpunk, Black Myth Wukong..."
                      className="w-full p-3.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-xs sm:text-sm placeholder-slate-500 outline-none focus:border-white/30 focus:bg-white/[0.06] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Détails de votre demande ou message
                    </label>
                    <textarea
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Précisez votre modèle de console, version système ou toute question particulière..."
                      className="w-full p-3.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-xs sm:text-sm placeholder-slate-500 outline-none focus:border-white/30 focus:bg-white/[0.06] transition-all"
                    />
                  </div>

                  {/* Dual Action Buttons */}
                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <button
                      type="submit"
                      className="flex-1 py-3.5 px-6 rounded-xl btn-ps-primary text-xs sm:text-sm font-bold shadow-lg flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>Envoyer la demande</span>
                    </button>

                    <a
                      href={generateWhatsAppMessage()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-3.5 px-6 rounded-xl btn-whatsapp-modern text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Envoyer sur WhatsApp</span>
                    </a>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
