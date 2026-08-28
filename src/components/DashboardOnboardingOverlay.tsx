import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  UserPlus,
  Calendar,
  Stethoscope,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  X,
  Play,
  KeyRound,
  HelpCircle,
  Clock,
  Check,
  ChevronRight,
  Info,
  Layers,
  FileText
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PediatricLogo } from './PediatricLogo';

interface DashboardOnboardingOverlayProps {
  onOpenNewPatient: () => void;
  onOpenNewAppointment: () => void;
  onOpenNewDocument?: () => void;
}

export const DashboardOnboardingOverlay: React.FC<DashboardOnboardingOverlayProps> = ({
  onOpenNewPatient,
  onOpenNewAppointment
}) => {
  const {
    patients,
    appointments,
    currentOrganization,
    currentUser,
    openCredentialsModal,
    setCurrentTab,
    addPatient,
    addAppointment,
    showToast
  } = useApp();

  const [isDismissed, setIsDismissed] = useState<boolean>(() => {
    return localStorage.getItem('medicabinet_onboarding_dismissed') === 'true';
  });
  const [isMinimized, setIsMinimized] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(1);

  const hasPatients = patients.length > 0;
  const hasAppointments = appointments.length > 0;

  // Auto-advance active step based on progress
  useEffect(() => {
    if (!hasPatients) {
      setActiveStep(1);
    } else if (!hasAppointments) {
      setActiveStep(2);
    } else {
      setActiveStep(3);
    }
  }, [hasPatients, hasAppointments]);

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem('medicabinet_onboarding_dismissed', 'true');
  };

  const handleRestore = () => {
    setIsDismissed(false);
    setIsMinimized(false);
    localStorage.removeItem('medicabinet_onboarding_dismissed');
  };

  // Quick helper to insert an exemplary pediatric patient
  const handleCreateSamplePatient = () => {
    const samplePatientId = `pat-${Date.now().toString(36)}`;
    addPatient({
      nom: 'BENALI',
      prenom: 'Sami',
      sexe: 'M',
      dateNaissance: '2022-04-14',
      age: 4,
      telephone: '06 61 24 88 90',
      email: 'famille.benali@email.ma',
      adresse: 'Boulevard Mohammed V, Agadir',
      ville: 'Agadir',
      codePostal: '80000',
      cin: 'Tuteur: JE901243',
      numeroAmo: '10982348712',
      organismeAssurance: 'AMO CNSS',
      numAffiliationMutuelle: 'CNSS-889012-P',
      groupeSanguin: 'O+',
      medecinTraitant: true,
      allergies: 'Allergie modérée aux acariens',
      antecedentsMedicaux: 'Bronchiolite à 8 mois, pas d\'hospitalisation',
      traitementsActuels: 'Aucun traitement au long cours',
      ald: false,
      notesGenerales: 'Enfant suivi en pédiatrie préventive. Carnet de santé complet.',
      poidsRef: 16.2,
      tailleRef: 104,
      taRef: '95/60'
    });

    // Also offer appointment
    showToast(
      'Dossier patient créé !',
      'Le premier dossier pédiatrique de Sami BENALI a été initialisé.',
      'success'
    );
  };

  const steps = [
    {
      id: 1,
      title: 'Créer votre premier dossier patient',
      description: 'Enregistrez l\'état civil, les antécédents pédiatriques, l\'assurance AMO CNSS et les coordonnées des tuteurs légaux.',
      icon: UserPlus,
      completed: hasPatients,
      badge: hasPatients ? 'Dossier créé' : 'Étape 1 requise',
      color: 'teal',
      actionLabel: 'Nouveau Patient',
      onAction: onOpenNewPatient,
      secondaryActionLabel: 'Insérer un patient test',
      onSecondaryAction: handleCreateSamplePatient
    },
    {
      id: 2,
      title: 'Planifier le premier rendez-vous',
      description: 'Programmez une consultation ou une visite vaccinale dans l\'agenda partagé conforme CNDP.',
      icon: Calendar,
      completed: hasAppointments,
      badge: hasAppointments ? 'Rendez-vous planifié' : 'Étape 2',
      color: 'cyan',
      actionLabel: 'Planifier un Rendez-vous',
      onAction: onOpenNewAppointment
    },
    {
      id: 3,
      title: 'Démarrer une consultation & ordonnance',
      description: 'Saisissez les constantes, rédigez une ordonnance sécurisée avec posologies automatiques en pédiatrie et imprimez au format A4.',
      icon: Stethoscope,
      completed: false,
      badge: 'Module Clinique',
      color: 'emerald',
      actionLabel: 'Ouvrir le Module Clinique',
      onAction: () => setCurrentTab('consultation')
    }
  ];

  const completedCount = (hasPatients ? 1 : 0) + (hasAppointments ? 1 : 0);
  const totalStepCount = 3;
  const progressPercent = Math.round((completedCount / totalStepCount) * 100);

  if (isDismissed) {
    return (
      <div className="mb-4 bg-white/90 backdrop-blur-xs border border-teal-200/80 rounded-2xl p-3.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-900">
              Guide de démarrage · Cabinet {currentOrganization.name}
            </p>
            <p className="text-[11px] text-slate-500">
              Progression : {completedCount}/{totalStepCount} étapes complétées ({progressPercent}%)
            </p>
          </div>
        </div>
        <button
          onClick={handleRestore}
          className="px-3 py-1.5 bg-teal-50 hover:bg-teal-100 text-teal-800 text-xs font-bold rounded-lg border border-teal-200 transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Afficher le guide</span>
        </button>
      </div>
    );
  }

  return (
    <div className="mb-6 rounded-3xl bg-gradient-to-br from-white via-slate-50 to-teal-50/40 border-2 border-teal-200/90 shadow-xl overflow-hidden relative animate-in fade-in slide-in-from-top-4 duration-300">
      {/* Decorative accent top bar */}
      <div className="h-1.5 bg-gradient-to-r from-teal-500 via-cyan-500 to-emerald-400 w-full" />

      {/* Main Header Banner */}
      <div className="p-5 sm:p-6 bg-white/80 backdrop-blur-xs border-b border-slate-200/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-4">
          <div className="w-13 h-13 rounded-2xl bg-teal-600/10 border border-teal-300/40 flex items-center justify-center p-2 shrink-0 shadow-inner">
            <PediatricLogo className="w-10 h-10" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-teal-800 bg-teal-100/70 border border-teal-300/60 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-teal-700" /> Guide de Démarrage Praticien
              </span>
              <span className="text-xs text-slate-500 font-semibold">
                Bienvenue, {currentUser.name}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
              Configurez vos premières activités cliniques en 3 étapes
            </h2>
            <p className="text-xs text-slate-600 mt-0.5 max-w-2xl">
              Votre espace médical est vierge et sécurisé (Loi 09-08 & CNDP). Suivez les étapes guidées ci-dessous pour démarrer vos consultations.
            </p>
          </div>
        </div>

        {/* Progress & Controls */}
        <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
          <div className="text-right hidden sm:block">
            <span className="text-xs font-bold text-slate-700">
              Progression : {completedCount}/{totalStepCount}
            </span>
            <div className="w-32 bg-slate-200 h-2 rounded-full mt-1 overflow-hidden">
              <div
                className="bg-gradient-to-r from-teal-500 to-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.max(progressPercent, 8)}%` }}
              />
            </div>
          </div>

          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-all cursor-pointer"
            title={isMinimized ? 'Développer' : 'Réduire'}
          >
            <Layers className="w-4 h-4" />
          </button>

          <button
            onClick={handleDismiss}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-all cursor-pointer"
            title="Masquer le guide"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Step Cards Grid */}
      {!isMinimized && (
        <div className="p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-3 gap-4.5 bg-slate-50/50">
          {steps.map((step) => {
            const Icon = step.icon;
            const isCurrent = activeStep === step.id && !step.completed;

            return (
              <div
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={`relative rounded-2xl p-5 transition-all duration-200 border flex flex-col justify-between cursor-pointer ${
                  step.completed
                    ? 'bg-emerald-50/50 border-emerald-200 shadow-xs'
                    : isCurrent
                    ? 'bg-white border-teal-500 shadow-md ring-2 ring-teal-500/20'
                    : 'bg-white/80 border-slate-200/80 hover:border-slate-300 shadow-2xs'
                }`}
              >
                {/* Step Header */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shadow-xs ${
                        step.completed
                          ? 'bg-emerald-500 text-white'
                          : isCurrent
                          ? 'bg-teal-600 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {step.completed ? <Check className="w-5 h-5 stroke-[2.5]" /> : <Icon className="w-5 h-5" />}
                    </div>

                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                        step.completed
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : isCurrent
                          ? 'bg-teal-100 text-teal-900 border-teal-300'
                          : 'bg-slate-100 text-slate-600 border-slate-200'
                      }`}
                    >
                      {step.badge}
                    </span>
                  </div>

                  <h3 className="text-sm font-extrabold text-slate-900 leading-snug">
                    {step.id}. {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Step Actions */}
                <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      step.onAction();
                    }}
                    className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-98 ${
                      step.completed
                        ? 'bg-white border border-emerald-300 text-emerald-800 hover:bg-emerald-50'
                        : isCurrent
                        ? 'bg-teal-600 hover:bg-teal-700 text-white shadow-teal-600/20'
                        : 'bg-slate-900 hover:bg-slate-800 text-white'
                    }`}
                  >
                    <span>{step.completed ? `Refaire : ${step.actionLabel}` : step.actionLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  {step.secondaryActionLabel && !step.completed && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (step.onSecondaryAction) step.onSecondaryAction();
                      }}
                      className="w-full py-1.5 px-2 text-[11px] font-semibold text-teal-700 hover:text-teal-900 hover:underline flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Sparkles className="w-3 h-3 text-teal-600" />
                      <span>{step.secondaryActionLabel}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Footer Support & Credentials Reminder */}
      {!isMinimized && (
        <div className="px-6 py-3.5 bg-slate-100/80 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
            <span>
              Conformité ordonnances et feuilles de soins AMO certifiées pour le Maroc.
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={openCredentialsModal}
              className="text-slate-700 hover:text-teal-700 font-bold flex items-center gap-1 hover:underline cursor-pointer"
            >
              <KeyRound className="w-3.5 h-3.5 text-slate-500" />
              <span>Gérer mes accès</span>
            </button>
            <span className="text-slate-300">|</span>
            <button
              onClick={() => setCurrentTab('settings')}
              className="text-teal-700 hover:text-teal-900 font-bold flex items-center gap-1 hover:underline cursor-pointer"
            >
              <span>Personnaliser l'ordonnance</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
