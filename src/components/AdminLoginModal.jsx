import React, { useState } from 'react';
import { X, Lock, User, Eye, EyeOff, ShieldCheck, KeyRound } from 'lucide-react';

export default function AdminLoginModal({ onClose, onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Default credentials
  const DEFAULT_USER = 'admin';
  const DEFAULT_PASS = 'nexus2026';

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (username.trim().toLowerCase() === DEFAULT_USER && password === DEFAULT_PASS) {
      onLoginSuccess();
    } else {
      setErrorMsg('Identifiants incorrects. Nom d\'utilisateur ou mot de passe invalide.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fadeIn">
      
      <div className="relative w-full max-w-md bg-[#090d16] border border-purple-500/40 rounded-3xl p-8 shadow-[0_0_50px_rgba(157,0,255,0.3)]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Icon & Title */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600/30 to-cyan-500/20 border border-purple-400/50 text-purple-400 mx-auto flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(157,0,255,0.4)]">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-white font-heading">ESPACE ADMINISTRATEUR</h2>
          <p className="text-xs text-slate-400 mt-1">Connectez-vous pour gérer le catalogue et les paramètres.</p>
        </div>

        {/* Credentials Info Box */}
        <div className="mb-6 p-3.5 rounded-2xl bg-purple-950/40 border border-purple-500/30 text-xs text-purple-300 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-purple-400 shrink-0" />
            <span>Identifiants par défaut :</span>
          </div>
          <code className="font-mono text-cyan-300 font-bold bg-slate-900 px-2 py-0.5 rounded border border-slate-700">
            admin / nexus2026
          </code>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="mb-6 p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs text-center font-medium animate-fadeIn">
            {errorMsg}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          
          <div>
            <label className="block text-xs font-cyber tracking-widest text-slate-300 uppercase font-bold mb-2">
              Nom d'utilisateur
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                required
                placeholder="Entrez admin..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-purple-400 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-cyber tracking-widest text-slate-300 uppercase font-bold mb-2">
              Mot de passe
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="Entrez nexus2026..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-purple-400 text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl btn-cyber-purple font-bold text-sm flex items-center justify-center gap-2 shadow-xl"
          >
            <ShieldCheck className="w-5 h-5" />
            <span>Se connecter au Dashboard</span>
          </button>

        </form>

      </div>
    </div>
  );
}
