import React, { useState, useEffect } from 'react';
import { Palette, Check } from 'lucide-react';

const THEMES = [
  {
    id: 'cyber-cyan',
    name: 'Cyan Cyber (Default)',
    color: '#00f0ff',
    primaryGrad: 'linear-gradient(135deg, #00f0ff 0%, #0072ff 100%)',
    bgDark: '#080b10'
  },
  {
    id: 'neon-purple',
    name: 'Violet Pro',
    color: '#9d00ff',
    primaryGrad: 'linear-gradient(135deg, #9d00ff 0%, #6e00ff 100%)',
    bgDark: '#0b0813'
  },
  {
    id: 'matrix-green',
    name: 'Xbox / Matrix',
    color: '#00ff9d',
    primaryGrad: 'linear-gradient(135deg, #00ff9d 0%, #00b368 100%)',
    bgDark: '#060f0a'
  },
  {
    id: 'crimson-red',
    name: 'Crimson Red',
    color: '#ff0055',
    primaryGrad: 'linear-gradient(135deg, #ff0055 0%, #b3003b 100%)',
    bgDark: '#0f0609'
  }
];

export default function ThemeSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState(() => {
    return localStorage.getItem('nexus_theme_id') || 'cyber-cyan';
  });

  const applyTheme = (themeId) => {
    setActiveTheme(themeId);
    localStorage.setItem('nexus_theme_id', themeId);

    const theme = THEMES.find(t => t.id === themeId) || THEMES[0];
    document.documentElement.style.setProperty('--neon-cyan', theme.color);
  };

  useEffect(() => {
    applyTheme(activeTheme);
  }, []);

  return (
    <div className="fixed bottom-20 sm:bottom-6 left-4 sm:left-6 z-40">
      
      {/* Theme Picker Popup */}
      {isOpen && (
        <div className="mb-3 p-3.5 rounded-2xl glass-panel border-cyan-500/40 shadow-2xl space-y-2 animate-fadeIn w-48">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-[10px] font-cyber uppercase font-bold text-slate-400">Ambiance RGB</span>
            <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-white text-xs">✕</button>
          </div>

          <div className="space-y-1.5">
            {THEMES.map((theme) => (
              <button
                key={theme.id}
                onClick={() => {
                  applyTheme(theme.id);
                  setIsOpen(false);
                }}
                className={`w-full p-2 rounded-xl text-left flex items-center justify-between text-xs transition-all ${
                  activeTheme === theme.id
                    ? 'bg-slate-800 text-white font-bold'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-3.5 h-3.5 rounded-full shrink-0 shadow"
                    style={{ backgroundColor: theme.color }}
                  />
                  <span className="truncate">{theme.name}</span>
                </div>
                {activeTheme === theme.id && <Check className="w-3.5 h-3.5 text-cyan-400" />}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Floating Theme Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 rounded-full glass-panel border-cyan-500/40 text-cyan-400 hover:text-white hover:border-cyan-400 active:scale-90 transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)]"
        title="Changer le thème RGB"
      >
        <Palette className="w-5 h-5" />
      </button>

    </div>
  );
}
