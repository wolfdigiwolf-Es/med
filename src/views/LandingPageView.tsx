import React, { useState } from 'react';
import {
  Stethoscope,
  ShieldCheck,
  Baby,
  FileText,
  Wallet,
  Clock,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Users,
  Building2,
  Lock,
  Calendar,
  Pill,
  Award,
  TrendingUp,
  HelpCircle,
  Phone,
  Mail,
  MapPin,
  Check,
  Play,
  LogIn,
  UserCheck,
  BarChart3,
  Layers,
  Palette,
  CheckCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const LandingPageView: React.FC = () => {
  const { setCurrentTab, openRegisterModal, showToast } = useApp();

  const [activeFeatureTab, setActiveFeatureTab] = useState<'pediatrie' | 'dossier' | 'amo' | 'cndp' | 'agenda'>('pediatrie');
  const [billingCycle, setBillingCycle] = useState<'mensuel' | 'annuel'>('annuel');
  
  // Interactive ROI Calculator State
  const [patientsPerDay, setPatientsPerDay] = useState(25);
  const [consultationFee, setConsultationFee] = useState(250);

  // Demo modal state
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [demoForm, setDemoForm] = useState({
    nomComplet: '',
    specialite: 'Pédiatrie',
    ville: 'Agadir',
    telephone: '',
    email: ''
  });

  const hoursSavedPerMonth = Math.round((patientsPerDay * 6 * 24) / 60);
  const potentialMonthlyRevenue = patientsPerDay * consultationFee * 24;

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDemoModalOpen(false);
    showToast(
      'Demande de démo transmise avec succès',
      `Merci Dr ${demoForm.nomComplet || 'Cher Confrère'}. Notre conseiller médical vous contactera au ${demoForm.telephone || 'numéro indiqué'}.`
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-teal-500 selection:text-white">
      {/* Top Banner / Announcement */}
      <div className="bg-gradient-to-r from-teal-900 via-teal-800 to-cyan-900 text-teal-100 px-4 py-2 text-center text-xs font-semibold flex flex-wrap items-center justify-center gap-2 border-b border-teal-700/50">
        <span className="bg-teal-950 text-teal-300 text-[10px] uppercase font-extrabold tracking-wider px-2 py-0.5 rounded-full border border-teal-500/40">
          SaaS Médical · Licence Blanche
        </span>
        <span>Conforme à 100% CNDP (Loi 09-08) & Prise en charge AMO en Dirhams (DH)</span>
        <div className="flex items-center gap-3 ml-2">
          <button
            onClick={() => openRegisterModal('doctor')}
            className="underline hover:text-white font-bold cursor-pointer text-teal-200"
          >
            Créer un Cabinet (Médecin)
          </button>
          <span className="opacity-40 text-teal-400">|</span>
          <button
            onClick={() => openRegisterModal('secretary')}
            className="underline hover:text-white font-bold cursor-pointer text-cyan-200"
          >
            Espace Secrétaire
          </button>
        </div>
      </div>

      {/* Main SaaS Navigation Bar */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentTab('landing')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 to-cyan-500 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-teal-500/20">
              M
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg text-white tracking-tight">
                  MEDICAL <span className="text-teal-400">OS</span>
                </span>
                <span className="text-[10px] bg-teal-950 text-teal-300 font-bold px-1.5 py-0.5 rounded border border-teal-800">
                  Licence Blanche
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Logiciel Médical & Pédiatrie au Maroc</p>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
            <a href="#fonctionnalites" className="hover:text-teal-400 transition-colors">
              Fonctionnalités
            </a>
            <a href="#pediatrie" className="hover:text-teal-400 transition-colors flex items-center gap-1 text-teal-300 font-semibold">
              <Baby className="w-4 h-4 text-teal-400" /> Pédiatrie & OMS
            </a>
            <a href="#licence-blanche" className="hover:text-teal-400 transition-colors">
              Marque Blanche
            </a>
            <a href="#cndp" className="hover:text-teal-400 transition-colors">
              Conformité CNDP
            </a>
            <a href="#tarifs" className="hover:text-teal-400 transition-colors">
              Tarifs (3 000 DH/an)
            </a>
          </nav>

          <div className="flex items-center gap-2.5">
            {/* Direct Login Button */}
            <button
              onClick={() => openRegisterModal('login')}
              className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Connexion</span>
            </button>

            {/* Inscription Secretary Button */}
            <button
              onClick={() => openRegisterModal('secretary')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-cyan-300 bg-cyan-950/60 hover:bg-cyan-900/80 border border-cyan-500/30 transition-all cursor-pointer"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Secrétaire</span>
            </button>

            {/* Create Doctor Cabinet Button */}
            <button
              onClick={() => openRegisterModal('doctor')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 shadow-md shadow-teal-600/30 transition-all active:scale-95 cursor-pointer"
            >
              <Stethoscope className="w-3.5 h-3.5" />
              <span>Créer mon Cabinet</span>
            </button>

            {/* Demander une Démo */}
            <button
              onClick={() => setIsDemoModalOpen(true)}
              className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
              <span>Demander une Démo</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-14 pb-20 overflow-hidden border-b border-slate-800/80">
        {/* Glow gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[320px] bg-teal-600/15 blur-[130px] pointer-events-none -z-10 rounded-full" />
        <div className="absolute top-1/3 right-10 w-[450px] h-[280px] bg-cyan-600/15 blur-[110px] pointer-events-none -z-10 rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Pill status */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-teal-500/30 text-slate-300 text-xs font-medium backdrop-blur-sm shadow-sm">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              <span>SaaS Médical Dédié aux Médecins & Pédiatres au Maroc</span>
              <span className="text-slate-600">|</span>
              <span className="text-teal-400 font-semibold">3 000 MAD / an</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
              Le Système d'Exploitation <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-300 to-emerald-400">
                Médical en Licence Blanche
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
              Dossier médical informatisé, carnet de vaccination & courbes OMS pour la pédiatrie,
              base médicamenteuse marocaine (DMP), facturation & clôture en Dirhams (DH), 
              et conformité totale <strong className="text-white font-semibold">CNDP (Loi 09-08)</strong>.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              {/* Doctor Registration */}
              <button
                onClick={() => openRegisterModal('doctor')}
                className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-bold text-sm rounded-xl shadow-xl shadow-teal-600/30 transition-all active:scale-95 flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <Stethoscope className="w-4 h-4" />
                <span>Créer mon Cabinet (Médecin)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Request Demo Button */}
              <button
                onClick={() => setIsDemoModalOpen(true)}
                className="w-full sm:w-auto px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-teal-300 hover:text-white font-semibold text-sm rounded-xl border border-teal-500/30 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-teal-400" />
                <span>Demander une Démo Guidée</span>
              </button>
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-400" /> Zéro installation (100% Web)
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-400" /> Homologation CNDP Loi 09-08
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-400" /> 3 000 MAD / an / cabinet
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-400" /> Support médical réactif
              </span>
            </div>
          </div>

          {/* Interactive Hero UI Preview - White Label Mockup */}
          <div className="mt-14 max-w-5xl mx-auto">
            <div className="relative rounded-2xl bg-slate-950 border border-slate-800 p-2 sm:p-3 shadow-2xl shadow-teal-950/40">
              {/* Fake browser bar */}
              <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-teal-500/80" />
                  <span className="ml-2 font-mono text-[11px] text-slate-400">app.medical-os.ma/cabinet/dashboard</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-semibold text-teal-400 bg-teal-950/60 px-2 py-0.5 rounded border border-teal-500/30">
                  <Lock className="w-3 h-3" /> TLS 1.3 · Chiffrement AES-256
                </div>
              </div>

              {/* Mock Dashboard preview */}
              <div className="p-4 sm:p-6 bg-slate-900 rounded-xl space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-base font-bold text-white">Cabinet de Pédiatrie · Espace Clinique</h2>
                      <span className="text-[10px] uppercase font-bold text-teal-400 bg-teal-950 px-2 py-0.5 rounded border border-teal-800">
                        Marché Marocain (DH)
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">Pratique Libérale · Mardi 25 Août 2026</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsDemoModalOpen(true)}
                      className="px-3.5 py-1.5 bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold rounded-lg shadow transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Demander une Démo</span>
                    </button>
                  </div>
                </div>

                {/* 4 Mini Cards in DH */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                    <span className="text-[11px] text-slate-400 font-medium">Patients du jour</span>
                    <p className="text-xl font-bold text-white mt-0.5">18 consultations</p>
                    <span className="text-[10px] text-teal-400 font-semibold">12 terminées · 6 en attente</span>
                  </div>
                  <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                    <span className="text-[11px] text-slate-400 font-medium">Recettes du jour (DH)</span>
                    <p className="text-xl font-bold text-teal-400 mt-0.5">4 500 DH</p>
                    <span className="text-[10px] text-slate-400 font-semibold">100% encaissé ou AMO</span>
                  </div>
                  <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                    <span className="text-[11px] text-slate-400 font-medium">Suivi Vaccinal & OMS</span>
                    <p className="text-xl font-bold text-cyan-400 mt-0.5">7 Bébés suivis</p>
                    <span className="text-[10px] text-cyan-300 font-semibold">Vaccins Pentavalent & ROR</span>
                  </div>
                  <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                    <span className="text-[11px] text-slate-400 font-medium">Conformité CNDP</span>
                    <p className="text-xl font-bold text-emerald-300 mt-0.5">100% Conforme</p>
                    <span className="text-[10px] text-emerald-400 font-semibold">Loi 09-08 Registre Actif</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHITE LABEL & CUSTOMIZATION SHOWCASE */}
      <section id="licence-blanche" className="py-20 bg-slate-900/60 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950/80 border border-teal-500/40 text-teal-300 text-xs font-bold">
              <Palette className="w-4 h-4 text-teal-400" />
              <span>Licence Blanche & Personnalisation Complète</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Votre Identité Médicale, Votre Logo, Vos En-têtes
            </h2>
            <p className="text-sm sm:text-base text-slate-400">
              Chaque praticien dispose d'un espace complètement personnalisable. Intégrez votre logo, vos mentions légales (INPE, CNOM, ICE), votre spécialité et vos ordonnances sécurisées.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Nom du Cabinet & Logo</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Affichez instantanément la marque de votre cabinet sur l'ensemble de l'interface, les fiches patients et les comptes-rendus.
              </p>
            </div>

            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Ordonnances & Certificats</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                En-tête officielle avec coordonnées, téléphone WhatsApp, mentions légales et cachet électronique sécurisé.
              </p>
            </div>

            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Isolation Stricte des Données</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Architecture multi-tenant sécurisée avec politiques Row Level Security (RLS) garantissant une étanchéité totale de vos dossiers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* KEY PILLARS FOR MOROCCAN MEDICAL PRACTICES */}
      <section id="fonctionnalites" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs uppercase font-extrabold tracking-widest text-teal-400">
            Conçu pour les Médecins Libéraux au Maroc
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Tous les modules indispensables dans un seul abonnement Cloud
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Fini les logiciels obsolètes installés localement. Bénéficiez d'une solution moderne,
            sécurisée et accessible depuis n'importe quel ordinateur ou tablette.
          </p>
        </div>

        {/* 6 Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Pillar 1: Pédiatrie */}
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 hover:border-teal-500/50 transition-all group space-y-3">
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Baby className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Module Pédiatrie & Croissance</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Tracé automatique des courbes de croissance OMS (Poids, Taille, Périmètre Crânien) et
              calendrier vaccinal du Ministère de la Santé marocain (BCG, Pentavalent, ROR, Pneumo).
            </p>
          </div>

          {/* Pillar 2: Base Médicaments DMP */}
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 hover:border-cyan-500/50 transition-all group space-y-3">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Pill className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Base Médicamenteuse DMP (Maroc)</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Accédez aux DCI, noms commerciaux marocains, dosages, prix publics de vente (PPV en DH)
              et alertes d'interactions médicamenteuses ou allergies en temps réel.
            </p>
          </div>

          {/* Pillar 3: CNDP Loi 09-08 */}
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 hover:border-emerald-500/50 transition-all group space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Conformité CNDP (Loi 09-08)</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Registre des consentements éclairés, gestion des accès par rôle (RBAC),
              piste d'audit inviolable et modèle d'affiche obligatoire pour salle d'attente.
            </p>
          </div>

          {/* Pillar 4: AMO & Finances en DH */}
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 hover:border-amber-500/50 transition-all group space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Wallet className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Finances & Clôture en Dirhams (DH)</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Livre journal des recettes, suivi AMO CNSS / CNOPS / Mutuelles, bouton de clôture groupée
              du soir et export conforme pour l'expert-comptable et la DGI (ICE/IF).
            </p>
          </div>

          {/* Pillar 5: Agenda & Salle d'attente */}
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 hover:border-rose-500/50 transition-all group space-y-3">
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Agenda & Carillon Salle d'Attente</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Prise de rendez-vous rapide, gestion du statut des patients (En attente, En cours, Terminé)
              et appel du patient suivant par carillon sonore paramétrable.
            </p>
          </div>

          {/* Pillar 6: Certificats & Documents Officiels */}
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 hover:border-teal-500/50 transition-all group space-y-3">
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center group-hover:scale-105 transition-transform">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Édition & Impression Pro</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Générez en 1 clic des ordonnances soignées, certificats d'aptitude, arrêts de travail,
              et lettres de liaison avec en-tête officielle, mentions légales (INPE, CNOM, ICE) et tampon.
            </p>
          </div>
        </div>
      </section>

      {/* INTERACTIVE FEATURE TABS SHOWCASE */}
      <section id="pediatrie" className="py-20 bg-slate-950 border-t border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs uppercase font-extrabold tracking-widest text-teal-400">
              Expérience Utilisateur Intuitive
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Une interface ultra-fluide pensée pour la consultation réelle
            </h2>
          </div>

          {/* Tabs Selector */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { id: 'pediatrie', label: 'Pédiatrie & Vaccins', icon: Baby },
              { id: 'dossier', label: 'Consultation & DMP', icon: Stethoscope },
              { id: 'amo', label: 'Finances & Clôture DH', icon: Wallet },
              { id: 'cndp', label: 'Sécurité CNDP (Loi 09-08)', icon: ShieldCheck },
              { id: 'agenda', label: 'Agenda & Salle d’attente', icon: Calendar }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeFeatureTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFeatureTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/30'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content Cards */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 sm:p-8 max-w-4xl mx-auto shadow-xl">
            {activeFeatureTab === 'pediatrie' && (
              <div className="space-y-6 animate-in fade-in">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center">
                      <Baby className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-base">Module Pédiatrique & Nouveau-né</h4>
                      <p className="text-xs text-slate-400">Courbes de croissance OMS & Calendrier Vaccinal National</p>
                    </div>
                  </div>
                  <span className="text-xs bg-teal-950 text-teal-300 font-bold px-2.5 py-1 rounded border border-teal-500/30">
                    OMS Percentiles + Vaccins
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                    <h5 className="font-bold text-slate-200 flex items-center gap-2">
                      <Check className="w-4 h-4 text-teal-400" />
                      Calendrier Vaccinal Marocain
                    </h5>
                    <p className="text-slate-400 leading-relaxed">
                      Suivi précis de la naissance à 18 mois : BCG, VHB, Polio, Pentavalent (DTC-Hib-VHB), Pneumocoque, Rotavirus et ROR.
                    </p>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                    <h5 className="font-bold text-slate-200 flex items-center gap-2">
                      <Check className="w-4 h-4 text-teal-400" />
                      Courbes Percentiles OMS
                    </h5>
                    <p className="text-slate-400 leading-relaxed">
                      Calcul automatique de l'IMC pédiatrique, surveillance de la cassure de courbe de poids et du périmètre crânien.
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => setIsDemoModalOpen(true)}
                    className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>Demander une démo Pédiatrie</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {activeFeatureTab === 'dossier' && (
              <div className="space-y-6 animate-in fade-in">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                      <Stethoscope className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-base">Consultation & Ordonnances Sécurisées</h4>
                      <p className="text-xs text-slate-400">Intégration directe du Vidal & DMP Marocain avec PPV en DH</p>
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Rédigez vos prescriptions en quelques clics grâce à la recherche instantanée par DCI ou nom de spécialité marocaine (ex: Doliprane, Amoclan, Co-Renitec, Augmentin). Posologies suggérées par kg pour les enfants, alertes d'interactions et vérification des allergies.
                </p>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => setIsDemoModalOpen(true)}
                    className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>Demander une démo Consultation</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {activeFeatureTab === 'amo' && (
              <div className="space-y-6 animate-in fade-in">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                      <Wallet className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-base">Comptabilité en Dirhams & Clôture du Soir</h4>
                      <p className="text-xs text-slate-400">Prise en charge AMO CNSS, CNOPS, Mutuelles & Espèces</p>
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Fini le comptage fastidieux en fin de journée : le bouton <strong>« Tout solder ce soir en Dirhams »</strong> permet d'encaisser l'ensemble des actes de la journée en choisissant le mode de règlement (Espèces DH, Carte CMI, Chèque, Tiers Payant AMO) avec traçabilité comptable immédiate.
                </p>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => setIsDemoModalOpen(true)}
                    className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-xl transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>Demander une démo Comptabilité AMO</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {activeFeatureTab === 'cndp' && (
              <div className="space-y-6 animate-in fade-in">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-base">Conformité Totale CNDP · Loi 09-08</h4>
                      <p className="text-xs text-slate-400">Protection des données à caractère personnel de santé</p>
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Le cabinet médical traite des données hautement sensibles. MEDICAL OS intègre nativement le registre des consentements, l'historique d'audit inviolable de chaque ouverture de dossier, et le formulaire pré-rempli pour votre déclaration de traitement auprès de la CNDP.
                </p>
              </div>
            )}

            {activeFeatureTab === 'agenda' && (
              <div className="space-y-6 animate-in fade-in">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-base">Agenda & Salle d'attente synchronisée</h4>
                      <p className="text-xs text-slate-400">Gestion fluide du flux patients en temps réel</p>
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Coordination parfaite entre l'assistante médicale et le médecin : enregistrement des arrivées en salle d'attente, calcul du temps d'attente moyen, appel sonore du patient suivant et statut de rendez-vous en temps réel.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ROI & TIME SAVING INTERACTIVE CALCULATOR */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-teal-950 via-slate-900 to-cyan-950 rounded-3xl border border-teal-800/40 p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs uppercase font-extrabold tracking-widest text-teal-400">
                Calculateur de Rentabilité Médicale
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Combien de temps et d'argent gagnez-vous chaque mois ?
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Ajustez votre volume de consultation pour estimer vos gains en productivité et la réduction des impayés grâce à notre plateforme.
              </p>

              {/* Slider 1: Consultations/jour */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-300">Consultations par jour :</span>
                  <span className="text-teal-400 font-bold">{patientsPerDay} patients / jour</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="60"
                  step="5"
                  value={patientsPerDay}
                  onChange={(e) => setPatientsPerDay(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-500"
                />
              </div>

              {/* Slider 2: Tarif consultation */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-300">Honoraires moyens :</span>
                  <span className="text-cyan-400 font-bold">{consultationFee} DH / consultation</span>
                </div>
                <input
                  type="range"
                  min="150"
                  max="500"
                  step="25"
                  value={consultationFee}
                  onChange={(e) => setConsultationFee(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 text-center space-y-1">
                <Clock className="w-6 h-6 text-teal-400 mx-auto mb-2" />
                <span className="text-xs text-slate-400 font-medium">Temps gagné par mois</span>
                <p className="text-3xl font-black text-white">{hoursSavedPerMonth} heures</p>
                <p className="text-[10px] text-slate-500">Soit ~1 heure de sérénité par jour</p>
              </div>

              <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 text-center space-y-1">
                <TrendingUp className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                <span className="text-xs text-slate-400 font-medium">Recettes sécurisées</span>
                <p className="text-3xl font-black text-cyan-400">{potentialMonthlyRevenue.toLocaleString('fr-FR')} DH</p>
                <p className="text-[10px] text-slate-500">Zéro consultation oubliée</p>
              </div>

              <div className="sm:col-span-2 bg-teal-600/10 border border-teal-500/30 p-4 rounded-xl flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white">Prêt à moderniser votre cabinet ?</h4>
                  <p className="text-[11px] text-slate-300">Activez votre licence au tarif de 3 000 MAD/an.</p>
                </div>
                <button
                  onClick={() => openRegisterModal('doctor')}
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
                >
                  Créer mon Cabinet
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING TIERS IN MOROCCAN DIRHAMS (DH) */}
      <section id="tarifs" className="py-20 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs uppercase font-extrabold tracking-widest text-teal-400">
              Tarifs Transparents & Sans Surprise
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Abonnement SaaS en Dirhams Marocains (DH)
            </h2>
            <p className="text-sm sm:text-base text-slate-400">
              Prix commercial officiel : <strong>3 000 MAD / an / cabinet</strong>. Tout inclus : hébergement souverain, mises à jour réglementaires CNDP & AMO, sauvegardes quotidiennes.
            </p>

            {/* Monthly / Annual Toggle */}
            <div className="pt-4 flex items-center justify-center gap-3">
              <span className={`text-xs font-bold ${billingCycle === 'mensuel' ? 'text-white' : 'text-slate-400'}`}>
                Mensuel
              </span>
              <button
                type="button"
                onClick={() => setBillingCycle(billingCycle === 'mensuel' ? 'annuel' : 'mensuel')}
                className="w-12 h-6 bg-slate-800 rounded-full p-1 border border-slate-700 transition-colors relative cursor-pointer"
              >
                <div
                  className={`w-4 h-4 rounded-full bg-teal-500 transition-transform ${
                    billingCycle === 'annuel' ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
              <span className={`text-xs font-bold flex items-center gap-1 ${billingCycle === 'annuel' ? 'text-white' : 'text-slate-400'}`}>
                Annuel <span className="text-[10px] bg-teal-950 text-teal-400 border border-teal-500/40 px-1.5 py-0.5 rounded font-extrabold">-2 mois offerts</span>
              </span>
            </div>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Plan 1: Starter Solo */}
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-white">Starter Solo</h3>
                  <p className="text-xs text-slate-400">Idéal pour médecin généraliste débutant</p>
                </div>

                <div className="pt-2">
                  <span className="text-3xl font-black text-white">
                    {billingCycle === 'annuel' ? '250' : '290'} DH
                  </span>
                  <span className="text-xs text-slate-400 font-medium"> / mois</span>
                  {billingCycle === 'annuel' && (
                    <p className="text-[11px] text-teal-400 font-semibold mt-0.5">3 000 DH facturés par an</p>
                  )}
                </div>

                <ul className="space-y-2.5 text-xs text-slate-300 border-t border-slate-800 pt-4">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-teal-400 shrink-0" />
                    <span>Dossiers patients illimités</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-teal-400 shrink-0" />
                    <span>Ordonnances & Base DMP Maroc</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-teal-400 shrink-0" />
                    <span>Livre journal des recettes en DH</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-teal-400 shrink-0" />
                    <span>Sauvegarde Cloud quotidienne</span>
                  </li>
                  <li className="flex items-center gap-2 text-slate-500">
                    <span className="w-4 h-4 shrink-0 text-center font-bold">✕</span>
                    <span>Module pédiatrie & courbes OMS</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => openRegisterModal('doctor')}
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl border border-slate-700 transition-colors cursor-pointer"
              >
                Choisir Starter
              </button>
            </div>

            {/* Plan 2: Pro Cabinet (Popular) */}
            <div className="bg-gradient-to-b from-slate-900 to-slate-950 p-6 rounded-2xl border-2 border-teal-500 shadow-xl shadow-teal-500/10 space-y-6 flex flex-col justify-between relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-teal-500 text-slate-950 text-[10px] uppercase tracking-wider font-extrabold px-3 py-0.5 rounded-full shadow">
                Recommandé Spécialistes & Pédiatres
              </div>

              <div className="space-y-4 pt-1">
                <div>
                  <h3 className="text-lg font-bold text-white">Pro Cabinet (Pédiatrie)</h3>
                  <p className="text-xs text-slate-300">La solution complète pour pédiatres & spécialistes</p>
                </div>

                <div className="pt-2">
                  <span className="text-3xl font-black text-teal-400">
                    {billingCycle === 'annuel' ? '250' : '300'} DH
                  </span>
                  <span className="text-xs text-slate-400 font-medium"> / mois</span>
                  {billingCycle === 'annuel' && (
                    <p className="text-[11px] text-teal-400 font-semibold mt-0.5">3 000 DH facturés par an</p>
                  )}
                </div>

                <ul className="space-y-2.5 text-xs text-slate-200 border-t border-slate-800 pt-4">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-teal-400 shrink-0" />
                    <span className="font-semibold text-white">Tout du pack Starter +</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-teal-400 shrink-0" />
                    <span><strong>Module Pédiatrie :</strong> Courbes OMS & Calendrier Vaccinal</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-teal-400 shrink-0" />
                    <span><strong>Télétransmission AMO :</strong> CNSS & CNOPS</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-teal-400 shrink-0" />
                    <span><strong>Bouton Clôture du Soir</strong> groupée en Dirhams</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-teal-400 shrink-0" />
                    <span>Accès multi-postes (Médecin + Secrétaire)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-teal-400 shrink-0" />
                    <span>Piste d'audit & Registre CNDP (Loi 09-08)</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => openRegisterModal('doctor')}
                className="w-full py-3 bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-teal-600/30 transition-all active:scale-95 cursor-pointer"
              >
                Créer mon Cabinet Pro (3 000 DH/an)
              </button>
            </div>

            {/* Plan 3: Clinique & Poly-Cabinets */}
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-white">Clinique & Poly-Cabinets</h3>
                  <p className="text-xs text-slate-400">Centres médicaux, cabinets de groupe & polycliniques</p>
                </div>

                <div className="pt-2">
                  <span className="text-3xl font-black text-white">
                    Sur mesure
                  </span>
                  <p className="text-[11px] text-teal-400 font-semibold mt-0.5">Selon le nombre de praticiens</p>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-300 border-t border-slate-800 pt-4">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-teal-400 shrink-0" />
                    <span>Multi-médecins & spécialités illimitées</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-teal-400 shrink-0" />
                    <span>Gestion avancée des droits & rôles (RBAC)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-teal-400 shrink-0" />
                    <span>Statistiques consolidées par praticien</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-teal-400 shrink-0" />
                    <span>Support VIP dédié & formation sur site</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => setIsDemoModalOpen(true)}
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl border border-slate-700 transition-colors cursor-pointer"
              >
                Demander un devis personnalisé
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3">
          <span className="text-xs uppercase font-extrabold tracking-widest text-teal-400">
            Foire Aux Questions
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Tout ce que vous devez savoir avant de nous rejoindre
          </h2>
        </div>

        <div className="space-y-4">
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-2">
            <h4 className="font-bold text-sm text-white flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-teal-400 shrink-0" />
              Est-ce conforme aux exigences de la CNDP et de la Loi 09-08 ?
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed pl-6">
              Oui, à 100%. Notre SaaS intègre tous les mécanismes de protection des données imposés par la Commission Nationale de contrôle de la protection des Données à caractère Personnel (CNDP) : recueil du consentement éclairé, journal d'audit des consultations et formulaires types pour votre déclaration légale.
            </p>
          </div>

          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-2">
            <h4 className="font-bold text-sm text-white flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-teal-400 shrink-0" />
              Quel est le modèle tarifaire exact du logiciel ?
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed pl-6">
              Le logiciel fonctionne sous licence SaaS annuelle à 3 000 MAD / an par cabinet. Le praticien achète un droit d'utilisation complet incluant les mises à jour et la sauvegarde, sans frais de maintenance cachés.
            </p>
          </div>

          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-2">
            <h4 className="font-bold text-sm text-white flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-teal-400 shrink-0" />
              Comment fonctionne la clôture de caisse du soir en Dirhams (DH) ?
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed pl-6">
              En un seul clic sur « Tout solder ce soir », le praticien ou l'assistante médicale peut régulariser l'ensemble des consultations de la journée, répartir les encaissements par mode (Espèces, Carte Bancaire CMI, Chèque, Tiers Payant AMO) et éditer le livre journal des recettes pour sa déclaration fiscale DGI.
            </p>
          </div>

          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-2">
            <h4 className="font-bold text-sm text-white flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-teal-400 shrink-0" />
              Mes données médicales sont-elles sécurisées et exportables ?
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed pl-6">
              Vos données restent votre propriété exclusive. Vous pouvez à tout moment exporter l'intégralité de vos dossiers patients, ordonnances et écritures comptables sous formats standardisés (CSV, PDF, JSON).
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950 border-t border-slate-800 text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          <div className="w-14 h-14 bg-teal-600/20 text-teal-400 rounded-2xl border border-teal-500/30 flex items-center justify-center mx-auto shadow-lg">
            <Stethoscope className="w-7 h-7" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Prêt à équiper votre cabinet médical avec MEDICAL OS ?
          </h2>
          <p className="text-sm text-slate-300 max-w-2xl mx-auto">
            Testez l'application immédiatement sans engagement ou demandez une démonstration pour votre cabinet.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setIsDemoModalOpen(true)}
              className="w-full sm:w-auto px-8 py-4 bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm rounded-xl shadow-xl shadow-teal-600/30 transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Demander une démonstration personnalisée</span>
            </button>
            <button
              onClick={() => openRegisterModal('doctor')}
              className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 text-teal-300 font-bold text-sm rounded-xl border border-teal-500/40 transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Award className="w-4 h-4" />
              <span>Créer un Cabinet (Licence 3 000 DH/an)</span>
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 py-12 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-teal-600 flex items-center justify-center text-white font-bold text-sm">
                M
              </div>
              <span className="font-extrabold text-white text-base">MEDICAL OS</span>
            </div>
            <p className="text-slate-500 leading-relaxed">
              La solution SaaS en marque blanche pour la gestion des cabinets médicaux libéraux et polycliniques au Maroc. Par Wolf Digital.
            </p>
          </div>

          <div className="space-y-2">
            <h5 className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">Spécialités & Modules</h5>
            <p className="text-slate-300 font-semibold">Pédiatrie & Néonatalogie</p>
            <p className="text-slate-400">Médecine Générale & Spécialités</p>
            <p className="font-mono text-teal-400">Tarif : 3 000 MAD / an</p>
            <p className="text-slate-500 text-[11px]">Licence Blanche Paramétrable</p>
          </div>

          <div className="space-y-2">
            <h5 className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">Conformité & Légal</h5>
            <p className="text-slate-400">CNDP (Loi n° 09-08)</p>
            <p className="text-slate-400">AMO (CNSS, CNOPS, Tadamon)</p>
            <p className="text-slate-400">DMP (Ministère de la Santé)</p>
            <p className="text-slate-400">Identifiants : ICE, IF, INPE, CNOM</p>
          </div>

          <div className="space-y-2">
            <h5 className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">Assistance & Villes</h5>
            <p className="text-slate-400">Casablanca · Rabat · Marrakech</p>
            <p className="text-slate-400">Agadir · Tanger · Fès · Oujda</p>
            <p className="text-slate-300 font-semibold pt-1 flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-teal-400" /> +212 5 28 84 10 20 / +212 5 22 36 12 40
            </p>
            <p className="text-slate-400 flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-teal-400" /> support@medical-os.ma
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 mt-8 pt-6 border-t border-slate-900 text-center text-slate-600 text-[11px]">
          © 2026 MEDICAL OS · Wolf Digital. Tous droits réservés. Dédié aux professionnels de santé du Royaume du Maroc.
        </div>
      </footer>

      {/* DEMO REQUEST MODAL */}
      {isDemoModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-base text-white">Demander une Démo Gratuite</h3>
                <p className="text-xs text-slate-400">Présentation personnalisée en 15 minutes</p>
              </div>
              <button
                onClick={() => setIsDemoModalOpen(false)}
                className="text-slate-500 hover:text-white p-1 rounded-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleDemoSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Nom et Prénom du Praticien</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Dr Pédiatre"
                  value={demoForm.nomComplet}
                  onChange={(e) => setDemoForm({ ...demoForm, nomComplet: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-teal-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Spécialité</label>
                  <select
                    value={demoForm.specialite}
                    onChange={(e) => setDemoForm({ ...demoForm, specialite: e.target.value })}
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-teal-500 focus:outline-none"
                  >
                    <option value="Pédiatrie">Pédiatrie</option>
                    <option value="Médecine Générale">Médecine Générale</option>
                    <option value="Cardiologie">Cardiologie</option>
                    <option value="Gynécologie">Gynécologie</option>
                    <option value="Autre spécialité">Autre spécialité</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Ville</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Agadir, Casablanca..."
                    value={demoForm.ville}
                    onChange={(e) => setDemoForm({ ...demoForm, ville: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-teal-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Téléphone (WhatsApp)</label>
                <input
                  type="tel"
                  required
                  placeholder="+212 6 XX XX XX XX"
                  value={demoForm.telephone}
                  onChange={(e) => setDemoForm({ ...demoForm, telephone: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-teal-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Email Professionnel</label>
                <input
                  type="email"
                  placeholder="docteur@cabinet.ma"
                  value={demoForm.email}
                  onChange={(e) => setDemoForm({ ...demoForm, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-teal-500 focus:outline-none"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsDemoModalOpen(false)}
                  className="px-4 py-2 text-slate-400 hover:text-white cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl shadow transition-all cursor-pointer"
                >
                  Confirmer la demande
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
