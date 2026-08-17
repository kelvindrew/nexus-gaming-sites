import React, { useState } from 'react';
import { Cpu, CheckCircle2, AlertTriangle, ArrowRight, MessageSquare, ShieldCheck, Zap } from 'lucide-react';

const COMPATIBILITY_RULES = [
  {
    device: 'PlayStation 4 (FAT / Slim / Pro)',
    versions: [
      {
        version: 'Firmware 5.05 à 9.00 (Inclus)',
        status: 'COMPATIBLE_FULL',
        title: '100% Compatible GoldHEN & Déverrouillage USB Immédiat',
        badge: 'EXPLOIT OR (LE MEILLEUR)',
        details: [
          'Jailbreak instantané et ultra-stable via clé USB GoldHEN v2.4+',
          'Accès illimité à tous les jeux PS4 récents (Backports 2024–2026)',
          'Déblocage des patchs 60 FPS, émulateurs PS2/PS1/RetroArch et cheats',
          'Gestion personnalisée des ventilateurs pour éviter la surchauffe'
        ],
        actionText: 'Demander le pack GoldHEN 9.00'
      },
      {
        version: 'Firmware 9.03 à 11.00 (Inclus)',
        status: 'COMPATIBLE_PPPwn',
        title: '100% Déverrouillable via Exploit PPPwn (Câble Réseau)',
        badge: 'DÉVERROUILLAGE PPPwn 11.00',
        details: [
          'Déverrouillage logiciel PPPwn (par TheFloW) via port Ethernet',
          'Installation de GoldHEN 11.00 et prise en charge des jeux complets',
          'Boîtier d\'automatisation disponible pour démarrage automatique sans PC',
          'Installation en atelier ou télé-assistance pas à pas'
        ],
        actionText: 'Demander le déblocage PPPwn 11.00'
      },
      {
        version: 'Firmware 11.02 à 12.50',
        status: 'RESTRICTED_WAIT',
        title: 'En Attente d\'Exploit Public — Conseil : NE PAS METTRE À JOUR',
        badge: 'CONSEIL : RESTEZ SUR CETTE VERSION',
        details: [
          'Des failles de sécurité sont en cours d\'analyse par les développeurs de la scène',
          'Règle d\'or : Désactivez les mises à jour automatiques pour préserver vos chances',
          'Solutions immédiates disponibles : Pack jeux en partage de compte officiel',
          'Nettoyage en profondeur & remplacement de pâte thermique Artic MX-4'
        ],
        actionText: 'Consulter l\'atelier pour 11.02 - 12.50'
      },
      {
        version: 'Firmware 13.00 à 13.52 (Dernière version Sony)',
        status: 'RESTRICTED_LATEST',
        title: 'Firmware Récent — Prestations d\'Entretien & Forfaits Numériques',
        badge: 'VERSION SONY 13.XX',
        details: [
          'La version 13.52 est la dernière mise à jour de sécurité déployée par Sony',
          'Aucun jailbreak public kernel à ce jour sur 13.52 (bloquez les futures MAJ)',
          'Prestations disponibles : Remplacement de disque dur par un SSD Ultra-Rapide',
          'Réparation des ports HDMI, blocs d\'alimentation et lentilles de lecture'
        ],
        actionText: 'Voir les services pour PS4 13.xx'
      }
    ]
  },
  {
    device: 'PlayStation 5 (Standard / Digital / Slim)',
    versions: [
      {
        version: 'Firmware 1.00 à 4.51',
        status: 'COMPATIBLE_FULL',
        title: '100% Compatible KStuff & etaHEN (Hypervisor Débloqué)',
        badge: 'EXPERT PS5 (TRÈS RECHERCHÉ)',
        details: [
          'Accès développeur kernel + hypervisor complet',
          'Lancement de homebrew PS5, dumps natifs et jeux PS4 en 60FPS',
          'Support des clés USB haute vitesse et chargement instantané',
          'Possibilité de dual-boot Linux PS5 pour les passionnés'
        ],
        actionText: 'Demander le pack KStuff 4.51'
      },
      {
        version: 'Firmware 5.00 à 10.01',
        status: 'COMPATIBLE_ETAHEN',
        title: 'Compatible Exploit WebKit / Poopsploit & etaHEN',
        badge: 'DÉBLOCAGE PARTIEL PS5',
        details: [
          'Exploit WebKit moderne avec injection de payload rapide',
          'Prise en charge de etaHEN et lancement des backups PS4',
          'Gestion des émulateurs et serveurs FTP intégrés'
        ],
        actionText: 'Demander le pack etaHEN 10.01'
      },
      {
        version: 'Firmware 10.02 à 13.60 (Dernière version Sony)',
        status: 'SERVICE_STANDARD',
        title: 'Optimisation Haute Performance & Extension SSD NVMe',
        badge: 'ENTRETIEN OFFICIEL PS5',
        details: [
          'Installation et formatage de SSD M.2 NVMe PCIe 4.0 (jusqu\'à 7400 Mo/s)',
          'Dépoussiérage atelier & réapplication du Métal Liquide thermique d\'origine',
          'Réparation drift des joysticks sur manettes DualSense'
        ],
        actionText: 'Réserver un entretien PS5'
      }
    ]
  },
  {
    device: 'PlayStation 3 (FAT / Slim / SuperSlim)',
    versions: [
      {
        version: 'Toutes versions (Firmware 4.80 à 4.91 / 4.92)',
        status: 'COMPATIBLE_FULL',
        title: '100% Déblocable : CFW Evilnat Cobra ou PS3HEN 4.91',
        badge: 'DÉVERROUILLAGE TOTAL 100%',
        details: [
          'Installation de CFW Evilnat Cobra 4.91 (PS3 FAT & Slim compatibles)',
          'Installation de PS3HEN 4.91 (pour toutes les PS3 y compris SuperSlim)',
          'Accès complet à la ludothèque PS3, PS2, PS1, PSP et RetroArch',
          'Régulation thermique automatique via WebMAN MOD'
        ],
        actionText: 'Demander le pack PS3HEN / CFW'
      }
    ]
  },
  {
    device: 'PC Gaming (Windows 10 / 11)',
    versions: [
      {
        version: 'Configuration Gamer (Intel Core i5/i7/i9 ou AMD Ryzen)',
        status: 'COMPATIBLE_FULL',
        title: 'Installation Complète Jeux AAA & Packs Disques Externes',
        badge: 'COMPATIBILITÉ TOTALE PC',
        details: [
          'Installation directe de jeux pré-configurés avec lanceur unifié',
          'Mise à jour des redistribuables DirectX, Visual C++ et derniers pilotes GPU',
          'Activation permanente de Windows 11 Pro & Office 2024 authentiques',
          'Prêt à jouer sans aucune manipulation complexe'
        ],
        actionText: 'Commander un Pack Jeux PC'
      }
    ]
  }
];

export default function CompatibilityChecker({ config }) {
  const [selectedDeviceIndex, setSelectedDeviceIndex] = useState(0);
  const [selectedVersionIndex, setSelectedVersionIndex] = useState(0);

  const currentDevice = COMPATIBILITY_RULES[selectedDeviceIndex];
  const currentResult = currentDevice.versions[selectedVersionIndex] || currentDevice.versions[0];

  const handleWhatsAppInquiry = () => {
    const cleanPhone = (config?.phone || '+243821780077').replace(/[^0-9+]/g, '');
    const msg = `Bonjour NEXUS GAMING, j'ai vérifié ma console sur votre outil : ${currentDevice.device} (${currentResult.version}). Je souhaite la prestation : ${currentResult.title}.`;
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section id="compatibility" className="py-16 sm:py-24 bg-[#06080d] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.1] text-slate-300 text-xs font-semibold uppercase tracking-wider mb-3 shadow">
            <Cpu className="w-3.5 h-3.5 text-blue-400" />
            <span>Assistant Diagnostic Immédiat</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-3">
            Vérificateur de Compatibilité
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto">
            Sélectionnez votre console et version de firmware pour connaître instantanément les solutions disponibles.
          </p>
        </div>

        {/* Diagnostic Module Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          
          {/* Left Column: Selectors */}
          <div className="lg:col-span-5 glass-luxury p-6 sm:p-8 rounded-3xl space-y-6">
            
            {/* Step 1: Device Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
                1. Choisissez votre appareil :
              </label>
              <div className="space-y-2">
                {COMPATIBILITY_RULES.map((rule, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedDeviceIndex(idx);
                      setSelectedVersionIndex(0);
                    }}
                    className={`w-full p-3.5 rounded-2xl text-left text-xs sm:text-sm font-semibold transition-all border flex items-center justify-between ${
                      selectedDeviceIndex === idx
                        ? 'bg-white text-black font-bold border-white shadow-lg'
                        : 'bg-white/[0.03] text-slate-300 border-white/[0.06] hover:bg-white/[0.06] hover:text-white'
                    }`}
                  >
                    <span>{rule.device}</span>
                    <ArrowRight className={`w-4 h-4 ${selectedDeviceIndex === idx ? 'text-black' : 'text-slate-500'}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Firmware Version Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
                2. Version Système / Firmware :
              </label>
              <div className="space-y-2">
                {currentDevice.versions.map((ver, vIdx) => (
                  <button
                    key={vIdx}
                    onClick={() => setSelectedVersionIndex(vIdx)}
                    className={`w-full p-3.5 rounded-2xl text-left text-xs font-semibold transition-all border flex items-center justify-between ${
                      selectedVersionIndex === vIdx
                        ? 'bg-white text-black font-bold border-white shadow-lg'
                        : 'bg-white/[0.03] text-slate-400 border-white/[0.06] hover:bg-white/[0.06] hover:text-white'
                    }`}
                  >
                    <span className="truncate">{ver.version}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      selectedVersionIndex === vIdx ? 'bg-black/20 text-black' : 'bg-white/10 text-slate-400'
                    }`}>
                      {ver.status === 'COMPATIBLE_FULL' ? '100% Déblocable' : 'Support Atelier'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Diagnostic Result Card */}
          <div className="lg:col-span-7 glass-card-matte p-6 sm:p-8 rounded-3xl flex flex-col justify-between">
            <div>
              {/* Badge & Status Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                <span className="px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider bg-white/[0.08] text-white border border-white/15 shadow">
                  {currentResult.badge}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {currentDevice.device}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-bold text-white font-heading mb-4 tracking-tight">
                {currentResult.title}
              </h3>

              {/* Feature Points */}
              <div className="space-y-3 mb-8">
                {currentResult.details.map((point, pIdx) => (
                  <div key={pIdx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                    <div className="p-0.5 rounded-full bg-emerald-500/20 text-emerald-400 mt-0.5 shrink-0">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span className="leading-relaxed">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Diagnostic CTA */}
            <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-[11px] text-slate-400 font-medium">
                  Prise en charge rapide en atelier ou assistance à distance.
                </p>
                <p className="text-xs font-bold text-emerald-400">
                  ✓ Diagnostic & Devis Gratuit
                </p>
              </div>

              <button
                onClick={handleWhatsAppInquiry}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl btn-whatsapp-modern text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{currentResult.actionText}</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
