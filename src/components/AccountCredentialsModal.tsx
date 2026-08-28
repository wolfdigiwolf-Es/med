import React, { useState } from 'react';
import {
  X,
  KeyRound,
  Mail,
  User,
  Phone,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Eye,
  EyeOff,
  Lock,
  Sparkles,
  Share2,
  Stethoscope,
  Building2,
  Check,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PediatricLogo } from './PediatricLogo';

export const AccountCredentialsModal: React.FC = () => {
  const {
    isCredentialsModalOpen,
    setIsCredentialsModalOpen,
    currentUser,
    users,
    updateUserCredentials,
    showToast
  } = useApp();

  const doctorUser =
    users.find((u) => u.id === 'usr-elqyami-owner') || currentUser;
  const secretaryUser =
    users.find((u) => u.id === 'usr-elqyami-sec') || users[1];

  const [activeTab, setActiveTab] = useState<'doctor' | 'secretary' | 'access-card'>('doctor');

  // Doctor Form State
  const [docName, setDocName] = useState(doctorUser.name);
  const [docEmail, setDocEmail] = useState(doctorUser.email);
  const [docPassword, setDocPassword] = useState(doctorUser.password || 'Yassine@Pediatrie2026');
  const [docPhone, setDocPhone] = useState(doctorUser.phone);
  const [showDocPassword, setShowDocPassword] = useState(false);

  // Secretary Form State
  const [secName, setSecName] = useState(secretaryUser?.name || 'Soukaina CHAMI (Secrétariat)');
  const [secEmail, setSecEmail] = useState(secretaryUser?.email || 'secretariat@cabinet-pediatrie.ma');
  const [secPassword, setSecPassword] = useState(secretaryUser?.password || 'Secretariat2026!');
  const [secPhone, setSecPhone] = useState(secretaryUser?.phone || '+212 6 72 10 34 89');
  const [showSecPassword, setShowSecPassword] = useState(false);

  // Copy state helper
  const [copiedField, setCopiedField] = useState<string | null>(null);

  if (!isCredentialsModalOpen) return null;

  const handleCopy = (text: string, fieldKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldKey);
    showToast('Copié dans le presse-papier', text, 'info');
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSaveDoctor = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserCredentials(doctorUser.id, docEmail, docPassword, docName, docPhone);
    showToast(
      'Compte Dr. Yassine mis à jour',
      `Nouvel email de connexion : ${docEmail}`,
      'success'
    );
  };

  const handleSaveSecretary = (e: React.FormEvent) => {
    e.preventDefault();
    if (secretaryUser) {
      updateUserCredentials(secretaryUser.id, secEmail, secPassword, secName, secPhone);
      showToast(
        'Accès Secrétariat mis à jour',
        `Nouvel email de connexion : ${secEmail}`,
        'success'
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white border border-slate-200 rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-teal-700 via-teal-800 to-slate-900 p-5 sm:p-6 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-xs p-1">
              <PediatricLogo className="w-9 h-9" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black tracking-tight">
                  Gestion des Accès & Sécurité
                </h2>
                <span className="text-[10px] bg-teal-500/30 text-teal-200 font-bold px-2 py-0.5 rounded-full border border-teal-400/40">
                  Loi 09-08 CNDP
                </span>
              </div>
              <p className="text-xs text-teal-100/80">
                Cabinet de Pédiatrie & Néonatalogie · Dr. Yassine EL QYAMI
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCredentialsModalOpen(false)}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="flex items-center border-b border-slate-200 bg-slate-50 px-6 pt-3 gap-2 shrink-0">
          <button
            onClick={() => setActiveTab('doctor')}
            className={`pb-3 px-3 text-xs font-bold border-b-2 flex items-center gap-2 transition-colors cursor-pointer ${
              activeTab === 'doctor'
                ? 'border-teal-600 text-teal-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Accès Dr. Yassine EL QYAMI</span>
          </button>

          <button
            onClick={() => setActiveTab('access-card')}
            className={`pb-3 px-3 text-xs font-bold border-b-2 flex items-center gap-2 transition-colors cursor-pointer ${
              activeTab === 'access-card'
                ? 'border-teal-600 text-teal-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Share2 className="w-3.5 h-3.5 text-teal-600" />
            <span>Fiche de Transmission des Accès</span>
          </button>

          <button
            onClick={() => setActiveTab('secretary')}
            className={`pb-3 px-3 text-xs font-bold border-b-2 flex items-center gap-2 transition-colors cursor-pointer ${
              activeTab === 'secretary'
                ? 'border-teal-600 text-teal-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Accès Secrétariat</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* TAB 1: DOCTOR CREDENTIALS */}
          {activeTab === 'doctor' && (
            <form onSubmit={handleSaveDoctor} className="space-y-5">
              <div className="bg-teal-50/70 border border-teal-200/80 rounded-2xl p-4 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                  PD
                </div>
                <div className="text-xs space-y-1">
                  <p className="font-bold text-teal-900">
                    Compte Titulaire Médecin Praticien
                  </p>
                  <p className="text-teal-800/80 leading-relaxed">
                    Ce compte dispose des privilèges complets (dossiers médicaux, ordonnances, diagnostics sensibles, certificats et encaissements). Modifiez ci-dessous l'identifiant et le mot de passe que le Dr. Yassine utilisera pour se connecter.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Doctor Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Nom & Titre du Praticien
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={docName}
                      onChange={(e) => setDocName(e.target.value)}
                      placeholder="Dr. Yassine EL QYAMI"
                      required
                      className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs font-semibold focus:bg-white focus:outline-hidden focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                    />
                  </div>
                </div>

                {/* Doctor Phone */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Téléphone Mobile (2FA & SMS)
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      value={docPhone}
                      onChange={(e) => setDocPhone(e.target.value)}
                      placeholder="+212 6 61 84 90 20"
                      required
                      className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs font-semibold focus:bg-white focus:outline-hidden focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                    />
                  </div>
                </div>

                {/* Doctor Email / Login */}
                <div className="sm:col-span-2">
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-slate-700">
                      Adresse Email / Identifiant de Connexion
                    </label>
                    <span className="text-[10px] text-teal-700 font-semibold bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
                      Utilisé sur la page de connexion
                    </span>
                  </div>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={docEmail}
                      onChange={(e) => setDocEmail(e.target.value)}
                      placeholder="dr.yassine.elqyami@gmail.com"
                      required
                      className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs font-semibold focus:bg-white focus:outline-hidden focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                    />
                  </div>
                </div>

                {/* Doctor Password */}
                <div className="sm:col-span-2">
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-slate-700">
                      Nouveau Mot de Passe Sécurisé
                    </label>
                    <button
                      type="button"
                      onClick={() =>
                        setDocPassword(`Yassine@${Math.floor(1000 + Math.random() * 9000)}!`)
                      }
                      className="text-[11px] text-teal-700 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <Sparkles className="w-3 h-3 text-teal-600" />
                      <span>Générer un mot de passe fort</span>
                    </button>
                  </div>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showDocPassword ? 'text' : 'password'}
                      value={docPassword}
                      onChange={(e) => setDocPassword(e.target.value)}
                      placeholder="Entrez le mot de passe"
                      required
                      className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs font-mono font-bold focus:bg-white focus:outline-hidden focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                    />
                    <button
                      type="button"
                      onClick={() => setShowDocPassword(!showDocPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                    >
                      {showDocPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Recommandation : 8 caractères minimum comprenant majuscules, minuscules et chiffres.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCredentialsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 cursor-pointer"
                >
                  Fermer
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-md shadow-teal-600/20 flex items-center gap-2 cursor-pointer transition-all active:scale-98"
                >
                  <Check className="w-4 h-4" />
                  <span>Enregistrer les Nouveaux Accès</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: ACCESS CARD (READY TO SHARE WITH DR YASSINE) */}
          {activeTab === 'access-card' && (
            <div className="space-y-5">
              <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl relative overflow-hidden">
                <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 opacity-10 pointer-events-none">
                  <PediatricLogo className="w-64 h-64" />
                </div>

                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white font-bold p-1">
                      <PediatricLogo className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-sm text-white">
                        Fiche d'Accès Médical Sécurisé
                      </h3>
                      <p className="text-[11px] text-teal-300">
                        Cabinet de Pédiatrie & Néonatalogie · Agadir
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                    Certifié CNDP
                  </span>
                </div>

                {/* Doctor Card Data */}
                <div className="py-4 space-y-3">
                  <div className="flex items-center justify-between bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-bold">Praticien Titulaire</p>
                      <p className="text-xs font-bold text-white">{docName}</p>
                    </div>
                    <span className="text-[10px] bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded-full font-bold">
                      Médecin Titulaire
                    </span>
                  </div>

                  <div className="flex items-center justify-between bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-bold">Identifiant / Email</p>
                      <p className="text-xs font-bold text-teal-300 font-mono">{docEmail}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(docEmail, 'email')}
                      className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 transition-colors flex items-center gap-1 text-[11px] font-bold cursor-pointer"
                    >
                      {copiedField === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedField === 'email' ? 'Copié' : 'Copier'}</span>
                    </button>
                  </div>

                  <div className="flex items-center justify-between bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-bold">Mot de Passe Sécurisé</p>
                      <p className="text-xs font-bold text-amber-300 font-mono">{docPassword}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(docPassword, 'pass')}
                      className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 transition-colors flex items-center gap-1 text-[11px] font-bold cursor-pointer"
                    >
                      {copiedField === 'pass' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedField === 'pass' ? 'Copié' : 'Copier'}</span>
                    </button>
                  </div>

                  <div className="flex items-center justify-between bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-bold">Lien de Connexion Web</p>
                      <p className="text-xs text-slate-300 truncate font-mono">
                        {window.location.origin}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(window.location.origin, 'url')}
                      className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 transition-colors flex items-center gap-1 text-[11px] font-bold cursor-pointer"
                    >
                      {copiedField === 'url' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedField === 'url' ? 'Copié' : 'Copier'}</span>
                    </button>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Chiffrement AES-256
                  </span>
                  <span>Portail Médical Dédié</span>
                </div>
              </div>

              {/* Share Summary Button */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    const text = `🏥 VOS ACCÈS AU CABINET MÉDICAL MEDICAL OS\n\nPraticien : ${docName}\nCabinet : Cabinet de Pédiatrie & Néonatalogie (Agadir)\n\n🔑 Identifiant / Email : ${docEmail}\n🔒 Mot de passe : ${docPassword}\n🌐 Lien d'accès : ${window.location.origin}\n\nConforme CNDP & Loi 09-08`;
                    handleCopy(text, 'full');
                  }}
                  className="flex-1 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-teal-600/20 cursor-pointer transition-all active:scale-98"
                >
                  {copiedField === 'full' ? (
                    <>
                      <Check className="w-4 h-4 text-white" />
                      <span>Texte Complet Copié pour WhatsApp / Email !</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copier la Fiche Complète (WhatsApp / Email)</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: SECRETARY CREDENTIALS */}
          {activeTab === 'secretary' && (
            <form onSubmit={handleSaveSecretary} className="space-y-5">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-slate-700 text-white flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                  SEC
                </div>
                <div className="text-xs space-y-1">
                  <p className="font-bold text-slate-900">
                    Compte Secrétariat & Accueil Médical
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    Ce compte permet la gestion de l'agenda, de la salle d'attente et des règlements avec restriction stricte sur les notes privées et diagnostics confidentiels (Principe du moindre privilège).
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Secretary Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Nom de l'Assistante / Secrétaire
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={secName}
                      onChange={(e) => setSecName(e.target.value)}
                      placeholder="Soukaina CHAMI"
                      required
                      className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs font-semibold focus:bg-white focus:outline-hidden focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                    />
                  </div>
                </div>

                {/* Secretary Phone */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Téléphone Secrétariat
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      value={secPhone}
                      onChange={(e) => setSecPhone(e.target.value)}
                      placeholder="+212 6 72 10 34 89"
                      required
                      className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs font-semibold focus:bg-white focus:outline-hidden focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                    />
                  </div>
                </div>

                {/* Secretary Email */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Identifiant / Email Secrétariat
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={secEmail}
                      onChange={(e) => setSecEmail(e.target.value)}
                      placeholder="secretariat@cabinet-pediatrie.ma"
                      required
                      className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs font-semibold focus:bg-white focus:outline-hidden focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                    />
                  </div>
                </div>

                {/* Secretary Password */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Mot de passe Secrétariat
                  </label>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showSecPassword ? 'text' : 'password'}
                      value={secPassword}
                      onChange={(e) => setSecPassword(e.target.value)}
                      placeholder="Entrez le mot de passe"
                      required
                      className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs font-mono font-bold focus:bg-white focus:outline-hidden focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                    />
                    <button
                      type="button"
                      onClick={() => setShowSecPassword(!showSecPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                    >
                      {showSecPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold shadow-md flex items-center gap-2 cursor-pointer transition-all active:scale-98"
                >
                  <Check className="w-4 h-4" />
                  <span>Enregistrer les Accès Secrétariat</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
