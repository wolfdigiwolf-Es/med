import React, { useState } from 'react';
import {
  Stethoscope,
  UserCheck,
  Building2,
  ShieldCheck,
  Lock,
  Mail,
  Phone,
  MapPin,
  FileBadge,
  CheckCircle2,
  ArrowRight,
  UserPlus,
  LogIn,
  Award,
  Calendar,
  HeartPulse,
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DoctorRegistrationData, SecretaryRegistrationData } from '../types';

export const RegisterView: React.FC = () => {
  const {
    setCurrentTab,
    organizations,
    registerDoctorCabinet,
    registerSecretary,
    login,
    switchOrganizationAndUser
  } = useApp();

  const [activeTab, setActiveTab] = useState<'doctor' | 'secretary' | 'login'>('doctor');

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
  const [loginError, setLoginError] = useState('');

  const handleDoctorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!doctorForm.doctorName || !doctorForm.email) return;
    registerDoctorCabinet(doctorForm);
  };

  const handleSecretarySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!secretaryForm.name || !secretaryForm.email) return;
    registerSecretary(secretaryForm);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const success = login(loginEmail);
    if (success) {
      setCurrentTab('dashboard');
    } else {
      setLoginError('Email non reconnu. Veuillez sélectionner un des accès rapides ci-dessous.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      {/* Top Header */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentTab('landing')}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Retour à l'accueil</span>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-black text-white text-base shadow-md shadow-blue-500/20">
                M
              </div>
              <span className="font-extrabold text-white text-base">
                MediPro <span className="text-blue-400">Cloud Maroc</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex text-xs text-slate-400 font-medium">
              Déjà un cabinet actif ?
            </span>
            <button
              onClick={() => setActiveTab('login')}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-blue-300 border border-slate-700 transition-colors cursor-pointer"
            >
              Connexion
            </button>
          </div>
        </div>
      </header>

      {/* Main Form Container */}
      <main className="max-w-4xl mx-auto px-4 py-8 w-full">
        {/* Title Header */}
        <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-500/30 text-blue-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Portail d'Inscription Front-End</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Créer votre Espace Cabinet ou Secrétariat
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Conforme CNDP Loi 09-08 · Télétransmission AMO CNSS & CNOPS · 3 000 MAD / An
          </p>
        </div>

        {/* Card Container */}
        <div className="bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
          {/* Tab Switcher */}
          <div className="grid grid-cols-3 bg-slate-100 p-2 border-b border-slate-200 gap-1.5 text-xs font-bold">
            <button
              onClick={() => setActiveTab('doctor')}
              className={`py-3 px-3 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === 'doctor'
                  ? 'bg-white text-blue-700 shadow-sm border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Stethoscope className="w-4 h-4 text-blue-600" />
              <span>1. Médecin (Nouveau Cabinet)</span>
            </button>

            <button
              onClick={() => setActiveTab('secretary')}
              className={`py-3 px-3 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === 'secretary'
                  ? 'bg-white text-indigo-700 shadow-sm border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <UserCheck className="w-4 h-4 text-indigo-600" />
              <span>2. Secrétaire (Rattachement)</span>
            </button>

            <button
              onClick={() => setActiveTab('login')}
              className={`py-3 px-3 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === 'login'
                  ? 'bg-white text-emerald-700 shadow-sm border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <LogIn className="w-4 h-4 text-emerald-600" />
              <span>3. Connexion Rapide</span>
            </button>
          </div>

          <div className="p-6 sm:p-8">
            {/* DOCTOR FORM */}
            {activeTab === 'doctor' && (
              <form onSubmit={handleDoctorSubmit} className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div className="text-xs text-blue-900">
                    <p className="font-bold text-sm">Inscription Médecin Titulaire & Création d'Organisation</p>
                    <p className="text-blue-700 mt-1">
                      Votre cabinet bénéficie instantanément d'un espace isolé (Row-Level Security), du module d'ordonnances sécurisées, de l'agenda partagé et de la facturation AMO en Dirhams.
                    </p>
                  </div>
                </div>

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
                        placeholder="Cabinet de Pédiatrie Dr El Qyami"
                        value={doctorForm.cabinetName}
                        onChange={(e) => setDoctorForm({ ...doctorForm, cabinetName: e.target.value })}
                        className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-hidden bg-slate-50 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Nom & Prénom du Praticien *
                    </label>
                    <div className="relative">
                      <Stethoscope className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        placeholder="Dr. Yassine EL QYAMI"
                        value={doctorForm.doctorName}
                        onChange={(e) => setDoctorForm({ ...doctorForm, doctorName: e.target.value })}
                        className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-hidden bg-slate-50 focus:bg-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Spécialité Médicale
                    </label>
                    <select
                      value={doctorForm.speciality}
                      onChange={(e) => setDoctorForm({ ...doctorForm, speciality: e.target.value })}
                      className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-hidden bg-slate-50 focus:bg-white font-medium"
                    >
                      <option value="Pédiatrie">Pédiatrie & Néonatologie</option>
                      <option value="Médecine Générale">Médecine Générale</option>
                      <option value="Gynécologie-Obstétrique">Gynécologie - Obstétrique</option>
                      <option value="Cardiologie">Cardiologie</option>
                      <option value="Dermatologie">Dermatologie</option>
                      <option value="Ophtalmologie">Ophtalmologie</option>
                      <option value="ORL">ORL</option>
                      <option value="Autre Spécialité">Autre spécialité</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Ville d'Exercice (Maroc)
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <select
                        value={doctorForm.city}
                        onChange={(e) => setDoctorForm({ ...doctorForm, city: e.target.value })}
                        className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-hidden bg-slate-50 focus:bg-white font-medium"
                      >
                        <option value="Agadir">Agadir (Souss-Massa)</option>
                        <option value="Casablanca">Casablanca</option>
                        <option value="Rabat">Rabat</option>
                        <option value="Marrakech">Marrakech</option>
                        <option value="Tanger">Tanger</option>
                        <option value="Fès">Fès</option>
                        <option value="Autre">Autre ville</option>
                      </select>
                    </div>
                  </div>
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
                        placeholder="dr.yassine@cabinet.ma"
                        value={doctorForm.email}
                        onChange={(e) => setDoctorForm({ ...doctorForm, email: e.target.value })}
                        className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-hidden bg-slate-50 focus:bg-white"
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
                        className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-hidden bg-slate-50 focus:bg-white font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* Moroccan Regulatory Compliance Box */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                  <p className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <FileBadge className="w-4 h-4 text-blue-600" />
                    Identifiants Professionnels Maroc (Feuilles de Soin & CNDP)
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
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:border-blue-500 outline-hidden bg-white font-mono"
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
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:border-blue-500 outline-hidden bg-white font-mono"
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
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:border-blue-500 outline-hidden bg-white font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* Plan selector */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label
                    onClick={() => setDoctorForm({ ...doctorForm, subscriptionPlan: 'trial' })}
                    className={`p-4 rounded-xl border text-xs cursor-pointer transition-all flex items-start gap-3 ${
                      doctorForm.subscriptionPlan === 'trial'
                        ? 'bg-blue-50 border-blue-500 text-blue-900 ring-2 ring-blue-500'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="plan"
                      checked={doctorForm.subscriptionPlan === 'trial'}
                      onChange={() => setDoctorForm({ ...doctorForm, subscriptionPlan: 'trial' })}
                      className="mt-1 text-blue-600"
                    />
                    <div>
                      <p className="font-bold text-slate-900 text-sm">Essai Gratuit 14 Jours</p>
                      <p className="text-slate-500 mt-0.5">Accès immédiat à toutes les fonctions sans carte bancaire requise.</p>
                    </div>
                  </label>

                  <label
                    onClick={() => setDoctorForm({ ...doctorForm, subscriptionPlan: 'annual_paid' })}
                    className={`p-4 rounded-xl border text-xs cursor-pointer transition-all flex items-start gap-3 ${
                      doctorForm.subscriptionPlan === 'annual_paid'
                        ? 'bg-blue-50 border-blue-500 text-blue-900 ring-2 ring-blue-500'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="plan"
                      checked={doctorForm.subscriptionPlan === 'annual_paid'}
                      onChange={() => setDoctorForm({ ...doctorForm, subscriptionPlan: 'annual_paid' })}
                      className="mt-1 text-blue-600"
                    />
                    <div>
                      <p className="font-bold text-slate-900 text-sm">3 000 MAD / An</p>
                      <p className="text-slate-500 mt-0.5">Licence annuelle complète, support dédié et sauvegardes certifiées.</p>
                    </div>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <UserPlus className="w-5 h-5" />
                  <span>Finaliser la Création du Cabinet & Ouvrir le Tableau de Bord</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            )}

            {/* SECRETARY FORM */}
            {activeTab === 'secretary' && (
              <form onSubmit={handleSecretarySubmit} className="space-y-6">
                <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 flex items-start gap-3">
                  <UserCheck className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                  <div className="text-xs text-indigo-900">
                    <p className="font-bold text-sm">Inscription Secrétaire Médicale & Accueil</p>
                    <p className="text-indigo-700 mt-1">
                      Créez votre accès collaboratif pour gérer la salle d'attente, les rendez-vous, les dossiers d'assurance AMO et la caisse du cabinet.
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
                      placeholder="Fatima Zahra EL IDRISSI"
                      value={secretaryForm.name}
                      onChange={(e) => setSecretaryForm({ ...secretaryForm, name: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-slate-200 focus:border-indigo-500 outline-hidden bg-slate-50 focus:bg-white"
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
                      className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-slate-200 focus:border-indigo-500 outline-hidden bg-slate-50 focus:bg-white font-medium"
                    >
                      {organizations.map((org) => (
                        <option key={org.id} value={org.id}>
                          {org.name} — {org.city} ({org.speciality})
                        </option>
                      ))}
                    </select>
                  </div>
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
                        placeholder="fatima.accueil@cabinet.ma"
                        value={secretaryForm.email}
                        onChange={(e) => setSecretaryForm({ ...secretaryForm, email: e.target.value })}
                        className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-slate-200 focus:border-indigo-500 outline-hidden bg-slate-50 focus:bg-white"
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
                        placeholder="+212 6 61 00 11 22"
                        value={secretaryForm.phone}
                        onChange={(e) => setSecretaryForm({ ...secretaryForm, phone: e.target.value })}
                        className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-slate-200 focus:border-indigo-500 outline-hidden bg-slate-50 focus:bg-white font-mono"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <UserCheck className="w-5 h-5" />
                  <span>Créer mon Accès Secrétariat & Accéder</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            )}

            {/* LOGIN / QUICK PROFILES */}
            {activeTab === 'login' && (
              <div className="space-y-6">
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  {loginError && (
                    <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700">
                      {loginError}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Email Professionnel
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="email"
                        required
                        placeholder="dr.elqyami@medicalos.ma"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-slate-200 focus:border-blue-500 outline-hidden bg-slate-50 focus:bg-white"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-blue-600/20"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Se Connecter</span>
                  </button>
                </form>

                <div className="border-t border-slate-200 pt-6">
                  <p className="text-xs font-bold text-slate-700 mb-3">
                    Profils Démo Pré-chargés (1-clic) :
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        switchOrganizationAndUser('org-elqyami', 'usr-elqyami-owner');
                      }}
                      className="p-3.5 rounded-xl border border-blue-200 bg-blue-50/50 hover:bg-blue-100 text-left transition-all cursor-pointer flex items-center gap-3"
                    >
                      <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                        Dr
                      </div>
                      <div>
                        <p className="text-xs font-bold text-blue-900">Dr Yassine EL QYAMI</p>
                        <p className="text-[11px] text-blue-700">Pédiatre · Agadir (Titulaire)</p>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        switchOrganizationAndUser('org-elqyami', 'usr-elqyami-sec');
                      }}
                      className="p-3.5 rounded-xl border border-indigo-200 bg-indigo-50/50 hover:bg-indigo-100 text-left transition-all cursor-pointer flex items-center gap-3"
                    >
                      <div className="w-9 h-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                        FZ
                      </div>
                      <div>
                        <p className="text-xs font-bold text-indigo-900">Fatima Zahra</p>
                        <p className="text-[11px] text-indigo-700">Secrétaire Médicale · Agadir</p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-6 px-4 text-center text-xs text-slate-500">
        <p>© 2026 MediPro Cloud Maroc · Plateforme Médicale SaaS Certifiée CNDP · 3 000 MAD / An</p>
      </footer>
    </div>
  );
};
