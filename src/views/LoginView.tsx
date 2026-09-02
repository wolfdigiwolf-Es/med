import React, { useState } from 'react';
import {
  Lock,
  Mail,
  KeyRound,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Eye,
  EyeOff,
  Building2,
  UserCheck,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PediatricLogo } from '../components/PediatricLogo';

export const LoginView: React.FC = () => {
  const { login, switchOrganizationAndUser, setCurrentTab, users } = useApp();

  const doctorUser =
    users.find((u) => u.id === 'usr-elqyami-owner') || users[0];
  const secretaryUser =
    users.find((u) => u.id === 'usr-elqyami-sec') || users[1];

  const [email, setEmail] = useState(doctorUser.email || 'dr.yassine.elqyami@gmail.com');
  const [password, setPassword] = useState(doctorUser.password || 'Yassine@Pediatrie2026');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      const success = login(email, password);
      setIsLoading(false);
      if (success) {
        setCurrentTab('dashboard');
      } else {
        setError('Identifiants non reconnus. Veuillez vérifier votre adresse email et votre mot de passe.');
      }
    }, 350);
  };

  const handleQuickLoginDoctor = () => {
    switchOrganizationAndUser('org-elqyami', 'usr-elqyami-owner');
    login(doctorUser.email, doctorUser.password);
    setCurrentTab('dashboard');
  };

  const handleQuickLoginSecretary = () => {
    switchOrganizationAndUser('org-elqyami', 'usr-elqyami-sec');
    if (secretaryUser) {
      login(secretaryUser.email, secretaryUser.password);
    }
    setCurrentTab('dashboard');
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950 flex flex-col justify-between text-slate-100 font-sans antialiased p-4 sm:p-6 selection:bg-teal-600 selection:text-white">
      {/* Top Brand Header */}
      <header className="max-w-5xl w-full mx-auto flex items-center justify-between py-2">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center p-1 backdrop-blur-xs">
            <PediatricLogo className="w-9 h-9" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base tracking-tight text-white">
                Cabinet de Pédiatrie <span className="text-teal-400">Dr. Yassine EL QYAMI</span>
              </span>
              <span className="text-[10px] bg-teal-500/20 text-teal-300 font-bold px-2 py-0.5 rounded-full border border-teal-500/30">
                Poste Praticien Sécurisé
              </span>
            </div>
            <p className="text-xs text-slate-400">Pédiatrie & Néonatalogie · Agadir (Loi 09-08 CNDP)</p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Conformité CNDP (Loi 09-08)</span>
        </div>
      </header>

      {/* Main Login Card */}
      <main className="max-w-md w-full mx-auto my-auto py-8">
        <div className="bg-slate-900/90 border border-slate-800 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          {/* Card Title & Practice Identification */}
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-2xl bg-teal-900/40 border border-teal-500/40 flex items-center justify-center mx-auto p-2 shadow-inner">
              <PediatricLogo className="w-12 h-12" />
            </div>
            <h1 className="text-xl font-black text-white tracking-tight">
              Espace Praticien Sécurisé
            </h1>
            <div className="inline-flex items-center gap-1.5 bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700/60 text-xs text-slate-300">
              <Building2 className="w-3.5 h-3.5 text-teal-400" />
              <span className="font-semibold text-slate-200">Dr. Yassine EL QYAMI · Agadir</span>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 rounded-xl bg-red-950/60 border border-red-800/60 text-red-200 text-xs flex items-center gap-2 animate-in shake">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Identifiant ou Email Professionnel
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="dr.yassine.elqyami@gmail.com"
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950/70 border border-slate-700 rounded-xl text-white text-xs placeholder-slate-500 focus:outline-hidden focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-300">
                  Mot de passe
                </label>
                <span className="text-[11px] text-teal-400 hover:underline cursor-pointer">
                  Clé 2FA / OTP SMS
                </span>
              </div>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-950/70 border border-slate-700 rounded-xl text-white text-xs placeholder-slate-500 focus:outline-hidden focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 p-1 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-teal-600 hover:bg-teal-500 active:scale-98 text-white font-bold text-xs rounded-xl shadow-lg shadow-teal-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Accéder à mon Cabinet</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </>
              )}
            </button>
          </form>

          {/* Confidentiality & Assistance Notice (Quick access moved to Super Admin Dashboard) */}
          <div className="pt-4 border-t border-slate-800 space-y-3">
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 text-left space-y-1.5">
              <div className="flex items-center gap-2 text-teal-400 font-bold text-xs">
                <ShieldCheck className="w-4 h-4" />
                <span>Accès Praticien Dédié & Confidentiel</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Chaque cabinet dispose d'un lien d'accès direct et sécurisé configuré par la direction médicale Wolf Digital. Si vous n'avez pas encore reçu votre lien dédié, contactez votre chargé de compte.
              </p>
            </div>

            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={() => setCurrentTab('landing')}
                className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
              >
                <span>← Retour au site public</span>
              </button>

              <span className="text-[11px] text-slate-500 font-mono">
                Portail v2.6.4
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Security Footer */}
      <footer className="max-w-5xl w-full mx-auto text-center py-3 text-xs text-slate-500 space-y-1">
        <div className="flex items-center justify-center gap-4 flex-wrap text-[11px]">
          <span className="flex items-center gap-1 text-slate-400">
            <Lock className="w-3 h-3 text-emerald-400" /> Chiffrement AES-256 / TLS 1.3
          </span>
          <span className="text-slate-700">·</span>
          <span className="flex items-center gap-1 text-slate-400">
            <CheckCircle2 className="w-3 h-3 text-teal-400" /> Récépissé CNDP D-M-588/2026
          </span>
          <span className="text-slate-700">·</span>
          <span className="text-slate-400">Cabinet de Pédiatrie Dr. Yassine EL QYAMI</span>
        </div>
        <p className="text-[10px] text-slate-600">
          MEDICAL OS v2.6.4 · Logiciel de Gestion Médicale Dédié
        </p>
      </footer>
    </div>
  );
};

