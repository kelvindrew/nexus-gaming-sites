import React from 'react';
import { Sliders } from 'lucide-react';

export default function ConsoleCompare() {
  const compareData = [
    {
      feature: 'Statut Déverrouillage / Modding',
      ps5: 'Restreint (FW <= 4.51 / etaHEN)',
      ps4: '100% (FW <= 9.00 USB / 11.00 PPPwn)',
      ps3: '100% (CFW Evilnat / HEN 4.91)',
      xbox: 'Mode Développeur Actif'
    },
    {
      feature: 'Installation Jeux Dématérialisés',
      ps5: 'Oui (SSD M.2 NVMe Gen4)',
      ps4: 'Oui (HDD / SSD SATA)',
      ps3: 'Oui (HDD Interne / USB Externe)',
      xbox: 'Oui (Stockage USB 3.0)'
    },
    {
      feature: 'Homebrew Store & Custom PKG',
      ps5: 'Partiel (etaHEN)',
      ps4: 'Oui (ItemzFlow & PKGi)',
      ps3: 'Oui (PKGi & WebMAN MOD)',
      xbox: 'Oui (RetroArch & UWP)'
    },
    {
      feature: 'Émulation Rétro (PS1/PS2/PSP/Arcade)',
      ps5: 'Très Bonne (PS4/PS1)',
      ps4: 'Excellente (PS2/PS1/RetroArch)',
      ps3: 'Native Impeccable (PS1/PS2/PS3)',
      xbox: 'Parfaite jusqu\'à PS2 4K 60FPS'
    },
    {
      feature: 'Sécurité & Blocage Mises à Jour',
      ps5: 'Mode Offline Strict',
      ps4: 'DNS Sécurisé & Payload Blocker',
      ps3: 'PSNpatch & WebMAN Shield',
      xbox: 'Dev Mode Isolé (0 Risque)'
    },
    {
      feature: 'Temps d\'Intervention Atelier',
      ps5: '1h - 2h',
      ps4: '1h - 3h',
      ps3: '2h - 4h',
      xbox: '1h'
    }
  ];

  return (
    <section id="compare" className="py-16 sm:py-24 relative bg-[#06080d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.1] text-slate-300 text-xs font-semibold uppercase tracking-wider mb-3 shadow">
            <Sliders className="w-3.5 h-3.5 text-blue-400" />
            <span>Outil d'Analyse Technologique</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-3">
            Comparatif Consoles & Modding
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto">
            Comparez les fonctionnalités et le potentiel de chaque console avant de choisir votre prestation en atelier.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="glass-luxury rounded-3xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[640px]">
              <thead>
                <tr className="bg-white/[0.03] border-b border-white/[0.08] text-xs sm:text-sm font-heading">
                  <th className="p-4 sm:p-5 text-slate-400 font-semibold tracking-wider uppercase">Caractéristiques</th>
                  <th className="p-4 sm:p-5 text-blue-400 font-bold">PS5</th>
                  <th className="p-4 sm:p-5 text-slate-200 font-bold">PS4 / Pro</th>
                  <th className="p-4 sm:p-5 text-amber-400 font-bold">PS3</th>
                  <th className="p-4 sm:p-5 text-emerald-400 font-bold">Xbox Series</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.05] text-xs sm:text-sm text-slate-300">
                {compareData.map((row, index) => (
                  <tr key={index} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 sm:p-5 font-semibold text-white">{row.feature}</td>
                    <td className="p-4 sm:p-5 text-slate-300">{row.ps5}</td>
                    <td className="p-4 sm:p-5 text-slate-200 font-medium">{row.ps4}</td>
                    <td className="p-4 sm:p-5 text-slate-300">{row.ps3}</td>
                    <td className="p-4 sm:p-5 text-slate-300">{row.xbox}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}
