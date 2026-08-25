import React, { useState } from 'react';
import {
  X,
  Stethoscope,
  UserCheck,
  Building2,
  ShieldCheck,
  Sparkles,
  Lock,
  Mail,
  Phone,
  MapPin,
  FileBadge,
  CheckCircle2,
  ArrowRight,
  KeyRound,
  Eye,
  EyeOff,
  UserPlus,
  LogIn,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DoctorRegistrationData, SecretaryRegistrationData } from '../types';

export const RegisterModal: React.FC = () => {
  const {
    isRegisterModalOpen,
    setIsRegisterModalOpen,
    registerModalTab,
    setRegisterModalTab,
    organizations,
    registerDoctorCabinet,
    registerSecretary,
    login,
    switchOrganizationAndUser,
    setCurrentTab
  } = useApp();

  const [showPassword, setShowPassword] = useState(false);

  // Doctor Form State
  const [doctorForm, setDoctorForm] = useState<DoctorRegistrationData>({
    cabinetName: '',
    doctorName: '',
    speciality: 'Pédiatrie',
    city: 'Agadir',
    address: 'Boulevard Mohammed V',
    phone: '+212 5 28 84 12 34',
    email: '',
    ice: '003311669000022',
    inpe: '8039281099',
    cnom: '19842',
    password: '',
    subscriptionPlan: 'trial'
  });

  // Secretary Form State
  const [secretaryForm, setSecretaryForm] = useState<SecretaryRegistrationData>({
    name: '',
    email: '',
    phone: '+212 6 61 00 11 22',
    password: '',
    organizationId: organizations[0]?.id || 'org-elqyami'
  });

  // Login Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  if (!isRegisterModalOpen) return null;

  const handleDoctorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!doctorForm.doctorName || !doctorForm.email) {
      return;
    }
    registerDoctorCabinet(doctorForm);
  };

  const handleSecretarySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!secretaryForm.name || !secretaryForm.email) {
      return;
    }
    registerSecretary(secretaryForm);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const success = login(loginEmail);
    if (success) {
      setIsRegisterModalOpen(false);
      setCurrentTab('dashboard');
    } else {
      setLoginError('Email non reconnu. Utilisez l’un des accès rapides ci-dessous.');
    }
  };

  const handleQuickLogin = (email: string, orgId?: string, userId?: string) => {
    if (orgId && userId) {
      switchOrganizationAndUser(orgId, userId);
      setIsRegisterModalOpen(false);
    } else {
      const success = login(email);
      if (success) {
        setIsRegisterModalOpen(false);
        setCurrentTab('dashboard');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="bg-slate-900 text-white px-6 py-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md shadow-blue-500/20">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                Portail d'Accès & Inscription
                <span className="text-[10px] uppercase font-bold bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full border border-blue-400/30">
                  Maroc · CNDP
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Espace dédié aux Médecins Praticiens et Secrétaires Médicales
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsRegisterModalOpen(false)}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="bg-slate-100 p-1.5 border-b border-slate-200 flex gap-1 text-xs font-semibold">
          <button
            type="button"
            onClick={() => {
              setRegisterModalTab('doctor');
              setLoginError('');
            }}
            className={`flex-1 py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
              registerModalTab === 'doctor'
                ? 'bg-white text-blue-700 shadow-sm font-bold border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <Stethoscope className="w-4 h-4 text-blue-600" />
            <span>Médecin (Créer Cabinet)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setRegisterModalTab('secretary');
              setLoginError('');
            }}
            className={`flex-1 py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
              registerModalTab === 'secretary'
                ? 'bg-white text-blue-700 shadow-sm font-bold border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <UserCheck className="w-4 h-4 text-indigo-600" />
            <span>Secrétaire (Rejoindre)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setRegisterModalTab('login');
              setLoginError('');
            }}
            className={`flex-1 py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
              registerModalTab === 'login'
                ? 'bg-white text-blue-700 shadow-sm font-bold border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <LogIn className="w-4 h-4 text-slate-700" />
            <span>Connexion Directe</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto flex-1 text-slate-800 space-y-6">
          {/* TAB 1: DOCTOR REGISTRATION */}
          {registerModalTab === 'doctor' && (
            <form onSubmit={handleDoctorSubmit} className="space-y-5">
              <div className="bg-blue-50/80 border border-blue-200 rounded-xl p-3.5 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div className="text-xs text-blue-900">
                  <p className="font-bold">Espace Cabinet Isolé & Conforme CNDP (Loi 09-08)</p>
                  <p className="text-blue-700 mt-0.5">
                    Chaque cabinet bénéficie d'une base de données cloisonnée, de la télétransmission AMO (CNSS & CNOPS) et d'un certificat d'audit de sécurité.
                  </p>
                </div>
              </div>

              {/* Cabinet & Doctor Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nom du Cabinet Médical *
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="Ex: Cabinet de Pédiatrie Dr El Qyami"
                      value={doctorForm.cabinetName}
                      onChange={(e) => setDoctorForm({ ...doctorForm, cabinetName: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-hidden bg-slate-50 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nom & Prénom du Médecin *
                  </label>
                  <div className="relative">
                    <Stethoscope className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="Ex: Dr. Yassine EL QYAMI"
                      value={doctorForm.doctorName}
                      onChange={(e) => setDoctorForm({ ...doctorForm, doctorName: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-hidden bg-slate-50 focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Speciality & City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Spécialité Médicale
                  </label>
                  <select
                    value={doctorForm.speciality}
                    onChange={(e) => setDoctorForm({ ...doctorForm, speciality: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-hidden bg-slate-50 focus:bg-white font-medium"
                  >
                    <option value="Pédiatrie">Pédiatrie & Néonatologie</option>
                    <option value="Médecine Générale">Médecine Générale</option>
                    <option value="Gynécologie-Obstétrique">Gynécologie - Obstétrique</option>
                    <option value="Cardiologie">Cardiologie & Maladies Vasculaires</option>
                    <option value="Dermatologie">Dermatologie & Vénérologie</option>
                    <option value="Ophtalmologie">Ophtalmologie</option>
                    <option value="ORL">Oto-Rhino-Laryngologie (ORL)</option>
                    <option value="Traumatologie - Orthopédie">Traumatologie - Orthopédie</option>
                    <option value="Psychiatrie">Psychiatrie</option>
                    <option value="Neurologie">Neurologie</option>
                    <option value="Gastro-Entérologie">Gastro-Entérologie</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Ville (Maroc)
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <select
                      value={doctorForm.city}
                      onChange={(e) => setDoctorForm({ ...doctorForm, city: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-hidden bg-slate-50 focus:bg-white font-medium"
                    >
                      <option value="Agadir">Agadir (Souss-Massa)</option>
                      <option value="Casablanca">Casablanca</option>
                      <option value="Rabat">Rabat</option>
                      <option value="Marrakech">Marrakech</option>
                      <option value="Tanger">Tanger</option>
                      <option value="Fès">Fès</option>
                      <option value="Meknès">Meknès</option>
                      <option value="Oujda">Oujda</option>
                      <option value="Tétouan">Tétouan</option>
                      <option value="Kénitra">Kénitra</option>
                      <option value="Autre">Autre ville</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Professionnel *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      placeholder="dr.nom@cabinet.ma"
                      value={doctorForm.email}
                      onChange={(e) => setDoctorForm({ ...doctorForm, email: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-hidden bg-slate-50 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Téléphone Professionnel
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      placeholder="+212 5 28 84 XX XX"
                      value={doctorForm.phone}
                      onChange={(e) => setDoctorForm({ ...doctorForm, phone: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-hidden bg-slate-50 focus:bg-white font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Moroccan Identifiers (ICE, INPE, CNOM) */}
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <p className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <FileBadge className="w-4 h-4 text-blue-600" />
                  Identifiants Réglementaires Maroc (Ordonnances & Facturation AMO)
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      ICE (15 chiffres)
                    </label>
                    <input
                      type="text"
                      maxLength={15}
                      placeholder="003311669000022"
                      value={doctorForm.ice}
                      onChange={(e) => setDoctorForm({ ...doctorForm, ice: e.target.value })}
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-hidden bg-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      N° INPE
                    </label>
                    <input
                      type="text"
                      placeholder="8039281099"
                      value={doctorForm.inpe}
                      onChange={(e) => setDoctorForm({ ...doctorForm, inpe: e.target.value })}
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-hidden bg-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      N° Ordre (CNOM)
                    </label>
                    <input
                      type="text"
                      placeholder="19842"
                      value={doctorForm.cnom}
                      onChange={(e) => setDoctorForm({ ...doctorForm, cnom: e.target.value })}
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-hidden bg-white font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Subscription Option */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label
                  onClick={() => setDoctorForm({ ...doctorForm, subscriptionPlan: 'trial' })}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex items-start gap-2.5 ${
                    doctorForm.subscriptionPlan === 'trial'
                      ? 'bg-blue-50 border-blue-500 text-blue-900 ring-1 ring-blue-500'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="plan"
                    checked={doctorForm.subscriptionPlan === 'trial'}
                    onChange={() => setDoctorForm({ ...doctorForm, subscriptionPlan: 'trial' })}
                    className="mt-0.5 text-blue-600"
                  />
                  <div>
                    <p className="font-bold text-slate-900">Essai Gratuit 14 Jours</p>
                    <p className="text-[11px] text-slate-500">Accès complet sans engagement</p>
                  </div>
                </label>

                <label
                  onClick={() => setDoctorForm({ ...doctorForm, subscriptionPlan: 'annual_paid' })}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex items-start gap-2.5 ${
                    doctorForm.subscriptionPlan === 'annual_paid'
                      ? 'bg-blue-50 border-blue-500 text-blue-900 ring-1 ring-blue-500'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="plan"
                    checked={doctorForm.subscriptionPlan === 'annual_paid'}
                    onChange={() => setDoctorForm({ ...doctorForm, subscriptionPlan: 'annual_paid' })}
                    className="mt-0.5 text-blue-600"
                  />
                  <div>
                    <p className="font-bold text-slate-900">3 000 MAD / An</p>
                    <p className="text-[11px] text-slate-500">Licence Cabinet Standard</p>
                  </div>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <UserPlus className="w-4 h-4" />
                <span>Créer Mon Cabinet Médical & Accéder</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* TAB 2: SECRETARY REGISTRATION */}
          {registerModalTab === 'secretary' && (
            <form onSubmit={handleSecretarySubmit} className="space-y-5">
              <div className="bg-indigo-50/80 border border-indigo-200 rounded-xl p-3.5 flex items-start gap-3">
                <UserCheck className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                <div className="text-xs text-indigo-900">
                  <p className="font-bold">Espace Secrétariat Médical & Accueil</p>
                  <p className="text-indigo-700 mt-0.5">
                    Accès dédié à la gestion de la salle d'attente, prise de rendez-vous, encaissements et accueil des patients. Conformément au secret médical, les notes cliniques confidentielles restent réservées au médecin traitant.
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nom & Prénom de la Secrétaire *
                </label>
                <div className="relative">
                  <UserCheck className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="Ex: Fatima Zahra EL IDRISSI"
                    value={secretaryForm.name}
                    onChange={(e) => setSecretaryForm({ ...secretaryForm, name: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-hidden bg-slate-50 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Cabinet Médical de Rattachement *
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <select
                    value={secretaryForm.organizationId}
                    onChange={(e) => setSecretaryForm({ ...secretaryForm, organizationId: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-hidden bg-slate-50 focus:bg-white font-medium"
                  >
                    {organizations.map((org) => (
                      <option key={org.id} value={org.id}>
                        {org.name} ({org.city} · {org.speciality})
                      </option>
                    ))}
                  </select>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Sélectionnez le cabinet où vous exercez vos fonctions d'accueil.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Professionnel *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      placeholder="secretaire@cabinet.ma"
                      value={secretaryForm.email}
                      onChange={(e) => setSecretaryForm({ ...secretaryForm, email: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-hidden bg-slate-50 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Téléphone Direct
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      placeholder="+212 6 61 XX XX XX"
                      value={secretaryForm.phone}
                      onChange={(e) => setSecretaryForm({ ...secretaryForm, phone: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-hidden bg-slate-50 focus:bg-white font-mono"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Mot de Passe Provisoire
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••••••"
                    value={secretaryForm.password}
                    onChange={(e) => setSecretaryForm({ ...secretaryForm, password: e.target.value })}
                    className="w-full pl-9 pr-10 py-2 text-xs rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-hidden bg-slate-50 focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <UserCheck className="w-4 h-4" />
                <span>Créer Mon Compte Secrétaire & Rejoindre</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* TAB 3: LOGIN / QUICK AUTH */}
          {registerModalTab === 'login' && (
            <div className="space-y-6">
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                {loginError && (
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{loginError}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email de Connexion
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      placeholder="dr.elqyami@medicalos.ma"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-hidden bg-slate-50 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mot de passe
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="password"
                      placeholder="••••••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-hidden bg-slate-50 focus:bg-white"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-blue-600/20"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Se Connecter</span>
                </button>
              </form>

              {/* Quick Login / Demo Profiles */}
              <div className="border-t border-slate-200 pt-4 space-y-3">
                <p className="text-xs font-bold text-slate-700 flex items-center justify-between">
                  <span>Accès Rapides Pré-configurés</span>
                  <span className="text-[10px] text-slate-500 font-normal">1-clic pour tester</span>
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {/* Dr El Qyami */}
                  <button
                    type="button"
                    onClick={() => handleQuickLogin('dr.elqyami@medicalos.ma', 'org-elqyami', 'usr-elqyami-owner')}
                    className="p-3 rounded-xl border border-blue-200 bg-blue-50/50 hover:bg-blue-100/70 text-left transition-all cursor-pointer flex items-center gap-2.5"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                      Dr
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-blue-900 truncate">Dr Yassine EL QYAMI</p>
                      <p className="text-[10px] text-blue-700 truncate">Pédiatre · Agadir (Titulaire)</p>
                    </div>
                  </button>

                  {/* Fatima Zahra Secretary */}
                  <button
                    type="button"
                    onClick={() => handleQuickLogin('fatima.sec@cabinet-elqyami.ma', 'org-elqyami', 'usr-elqyami-sec')}
                    className="p-3 rounded-xl border border-indigo-200 bg-indigo-50/50 hover:bg-indigo-100/70 text-left transition-all cursor-pointer flex items-center gap-2.5"
                  >
                    <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                      FZ
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-indigo-900 truncate">Fatima Zahra</p>
                      <p className="text-[10px] text-indigo-700 truncate">Secrétaire Médicale · Agadir</p>
                    </div>
                  </button>

                  {/* Dr Bennani */}
                  <button
                    type="button"
                    onClick={() => handleQuickLogin('dr.bennani@medicalos.ma', 'org-bennani', 'usr-bennani-owner')}
                    className="p-3 rounded-xl border border-emerald-200 bg-emerald-50/50 hover:bg-emerald-100/70 text-left transition-all cursor-pointer flex items-center gap-2.5"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                      Dr
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-emerald-900 truncate">Dr Karim BENNANI</p>
                      <p className="text-[10px] text-emerald-700 truncate">Généraliste · Casablanca</p>
                    </div>
                  </button>

                  {/* Superadmin Wolf Digital */}
                  <button
                    type="button"
                    onClick={() => handleQuickLogin('admin@wolfdigital.ma', 'org-elqyami', 'usr-wolf-superadmin')}
                    className="p-3 rounded-xl border border-purple-200 bg-purple-50/50 hover:bg-purple-100/70 text-left transition-all cursor-pointer flex items-center gap-2.5"
                  >
                    <div className="w-8 h-8 rounded-lg bg-purple-700 text-white flex items-center justify-center font-bold text-xs shrink-0">
                      WD
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-purple-900 truncate">Wolf Digital Admin</p>
                      <p className="text-[10px] text-purple-700 truncate">Super Admin Technique SaaS</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Guarantee */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 font-semibold text-slate-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              Chiffrement AES-256
            </span>
            <span className="flex items-center gap-1 font-semibold text-slate-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              Serveurs Maroc & CNDP
            </span>
          </div>
          <p>Assistance Maroc : +212 5 28 84 00 00</p>
        </div>
      </div>
    </div>
  );
};
