import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  FileText,
  Calculator,
  Pill,
  Search,
  CheckCircle2,
  Printer,
  User,
  ArrowRight,
  Zap,
  Activity,
  Layers,
  ChevronRight,
  ShieldCheck,
  Stethoscope,
  X,
  Plus,
  Radio,
  Clock,
  Eye
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import {
  ALL_DENTAL_ACTS,
  DENTAL_QUICK_PRESCRIPTIONS,
  FDI_ADULT_TEETH_QUADRANTS,
  TOOTH_NAMES
} from '../../data/dentalActsData';
import { DentalAct, DentalToothCondition } from '../../types';

interface DentalQuickAccessProps {
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  defaultTab?: 'shortcuts' | 'odontogram' | 'prescriptions' | 'acts' | 'quote';
}

export const DentalQuickAccess: React.FC<DentalQuickAccessProps> = ({
  isOpen: controlledIsOpen,
  onOpen: controlledOnOpen,
  onClose: controlledOnClose,
  defaultTab = 'shortcuts'
}) => {
  const {
    currentTab,
    setCurrentTab,
    patients,
    selectedPatientId,
    setSelectedPatientId,
    getPatientOdontogram,
    updateToothState,
    addPrescription,
    openPrintPreview,
    showToast,
    loadDrSaraAlamiProfile,
    currentOrganization,
    currentUser
  } = useApp();

  const [internalIsOpen, setInternalIsOpen] = useState<boolean>(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const handleClose = () => {
    if (controlledOnClose) {
      controlledOnClose();
    } else {
      setInternalIsOpen(false);
    }
  };

  const [activeTab, setActiveTab] = useState<'shortcuts' | 'odontogram' | 'prescriptions' | 'acts' | 'quote'>(defaultTab);
  const [actSearch, setActSearch] = useState<string>('');
  const [selectedQuickTooth, setSelectedQuickTooth] = useState<number>(16);

  // Active patient
  const activePatient = useMemo(() => {
    return patients.find((p) => p.id === selectedPatientId) || patients[0] || null;
  }, [patients, selectedPatientId]);

  const odontogram = useMemo(() => {
    if (!activePatient) return {};
    return getPatientOdontogram(activePatient.id);
  }, [activePatient, getPatientOdontogram]);

  const filteredActs = useMemo(() => {
    if (!actSearch.trim()) return ALL_DENTAL_ACTS.slice(0, 8);
    return ALL_DENTAL_ACTS.filter(
      (a) =>
        a.nom.toLowerCase().includes(actSearch.toLowerCase()) ||
        a.code.toLowerCase().includes(actSearch.toLowerCase()) ||
        a.categorie.toLowerCase().includes(actSearch.toLowerCase())
    ).slice(0, 8);
  }, [actSearch]);

  // Apply Quick Dental Prescription
  const handleApplyPrescription = (template: typeof DENTAL_QUICK_PRESCRIPTIONS[0]) => {
    if (!activePatient) {
      showToast('Sélectionnez un patient', 'Veuillez sélectionner un patient actif', 'warning');
      return;
    }

    addPrescription({
      patientId: activePatient.id,
      patientNom: `${activePatient.nom.toUpperCase()} ${activePatient.prenom}`,
      date: new Date().toISOString().split('T')[0],
      statut: 'Délivrée',
      medicaments: template.medicaments.map((m, idx) => ({
        id: `med-dt-${Date.now()}-${idx}`,
        nom: m.medicament,
        dosage: m.dosage,
        forme: 'Comprimé / Gélule / Flacon',
        posologie: m.posologie,
        duree: m.duree,
        instructions: m.instructions,
        remboursableAmo: true,
        tauxRemboursement: 70
      })),
      notes: `Protocole Dentaire Rapide : ${template.titre} (${template.indication})`
    });

    showToast(
      'Ordonnance dentaire générée',
      `Protocole "${template.titre}" appliqué au dossier de ${activePatient.prenom} ${activePatient.nom}`,
      'success'
    );
  };

  // Direct Tooth Condition Quick Set
  const handleQuickSetToothCondition = (cond: DentalToothCondition) => {
    if (!activePatient) return;
    updateToothState(activePatient.id, selectedQuickTooth, { condition: cond });
    showToast(
      `Dent #${selectedQuickTooth} mise à jour`,
      `Statut défini sur : ${cond.toUpperCase()}`,
      'success'
    );
  };

  // Direct Navigation to Full Dental View
  const handleGoToDental = () => {
    setCurrentTab('dental');
    handleClose();
  };

  return (
    <>
      {/* Floating Trigger Button for Instant Access from any screen */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
          <button
            id="btn-dental-quick-access-trigger"
            onClick={() => {
              if (controlledOnOpen) {
                controlledOnOpen();
              } else {
                setInternalIsOpen(true);
              }
            }}
            title="Accès Rapide Dentiste (Odontogramme, Devis, Ordonnances types, Actes NGAP)"
            className="flex items-center gap-2.5 px-4 py-3 bg-linear-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200 border border-teal-400/30 cursor-pointer font-sans group"
          >
            <div className="w-7 h-7 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-xs group-hover:rotate-12 transition-transform">
              <span className="text-base">🦷</span>
            </div>
            <div className="text-left">
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-teal-100 flex items-center gap-1">
                <span>Accès Rapide</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse"></span>
              </div>
              <div className="text-xs font-black tracking-tight text-white">
                Espace Dentiste
              </div>
            </div>
          </button>
        </div>
      )}

      {/* Main Quick Access Modal / Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
          <div
            id="modal-dental-quick-access"
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] text-slate-900 dark:text-slate-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 bg-linear-to-r from-teal-700 via-teal-800 to-cyan-900 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center border border-white/20 shadow-inner">
                  <span className="text-2xl">🦷</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base sm:text-lg font-black tracking-tight">
                      Accès Rapide Praticien Dentiste
                    </h2>
                    <span className="text-[10px] font-bold bg-teal-500/40 text-teal-100 px-2 py-0.5 rounded-full border border-teal-400/30 font-mono">
                      FDI · NGAP · AMO
                    </span>
                  </div>
                  <p className="text-xs text-teal-100/80">
                    Outils cliniques express, prescriptions types et schéma dentaire interactif
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleGoToDental}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-white/15 hover:bg-white/25 text-white rounded-xl text-xs font-bold transition-all border border-white/20 cursor-pointer"
                >
                  <span>Vue Dentaire Complète</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={handleClose}
                  className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-teal-100 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Active Patient & Mode Bar */}
            <div className="px-4 py-2.5 bg-teal-50 dark:bg-slate-800/80 border-b border-teal-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 shrink-0">
              <div className="flex items-center gap-2 text-xs">
                <span className="font-bold text-teal-900 dark:text-teal-300">Patient actif :</span>
                <select
                  value={selectedPatientId || ''}
                  onChange={(e) => setSelectedPatientId(e.target.value)}
                  className="bg-white dark:bg-slate-900 border border-teal-300 dark:border-slate-700 rounded-lg px-2.5 py-1 text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-teal-500 cursor-pointer"
                >
                  {patients.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nom.toUpperCase()} {p.prenom} (CIN: {p.cin || 'N/A'})
                    </option>
                  ))}
                </select>
                {activePatient && (
                  <span className="text-[11px] text-teal-700 dark:text-teal-400 font-mono bg-teal-100/60 dark:bg-teal-950/60 px-2 py-0.5 rounded">
                    AMO: {activePatient.numeroAmo || 'Immatriculé'}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    loadDrSaraAlamiProfile();
                    showToast('Profil Dentiste Chargé', 'Dr Sara Alami (Chirurgien-Dentiste, Casablanca)', 'success');
                  }}
                  title="Charger le profil type Chirurgien-Dentiste (Dr Sara Alami)"
                  className="text-[11px] font-semibold text-teal-800 dark:text-teal-300 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Zap className="w-3 h-3 text-amber-500" />
                  <span>Mode Dr Sara Alami (Dentiste)</span>
                </button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-1 px-4 pt-3 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0 overflow-x-auto">
              <button
                onClick={() => setActiveTab('shortcuts')}
                className={`px-3 py-2 text-xs font-bold border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  activeTab === 'shortcuts'
                    ? 'border-teal-600 text-teal-700 dark:text-teal-400'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Raccourcis Cliniques</span>
              </button>

              <button
                onClick={() => setActiveTab('odontogram')}
                className={`px-3 py-2 text-xs font-bold border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  activeTab === 'odontogram'
                    ? 'border-teal-600 text-teal-700 dark:text-teal-400'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <span>🦷</span>
                <span>Odontogramme Rapide</span>
              </button>

              <button
                onClick={() => setActiveTab('prescriptions')}
                className={`px-3 py-2 text-xs font-bold border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  activeTab === 'prescriptions'
                    ? 'border-teal-600 text-teal-700 dark:text-teal-400'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <Pill className="w-3.5 h-3.5" />
                <span>Ordonnances Types Dentaires</span>
              </button>

              <button
                onClick={() => setActiveTab('acts')}
                className={`px-3 py-2 text-xs font-bold border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  activeTab === 'acts'
                    ? 'border-teal-600 text-teal-700 dark:text-teal-400'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>Nomenclature NGAP & Tarifs</span>
              </button>
            </div>

            {/* Tab Contents */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 bg-slate-50/50 dark:bg-slate-900/50">
              {/* TAB 1: SHORTCUTS DASHBOARD */}
              {activeTab === 'shortcuts' && (
                <div className="space-y-6">
                  {/* Big Action Tiles */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                    <button
                      onClick={() => setActiveTab('odontogram')}
                      className="p-4 rounded-2xl bg-linear-to-br from-teal-500/10 to-teal-600/20 border border-teal-200 dark:border-teal-800/60 hover:border-teal-400 transition-all text-left group cursor-pointer"
                    >
                      <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center text-lg font-black shadow-xs mb-3 group-hover:scale-105 transition-transform">
                        🦷
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">Odontogramme FDI</h3>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                        Schéma 32 dents, surfaces et sondage parodontal
                      </p>
                    </button>

                    <button
                      onClick={() => setActiveTab('prescriptions')}
                      className="p-4 rounded-2xl bg-linear-to-br from-blue-500/10 to-blue-600/20 border border-blue-200 dark:border-blue-800/60 hover:border-blue-400 transition-all text-left group cursor-pointer"
                    >
                      <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center text-lg font-black shadow-xs mb-3 group-hover:scale-105 transition-transform">
                        <Pill className="w-5 h-5" />
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">Ordonnances 1-Clic</h3>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                        Birodogyl, Amox-Clav, antalgiques et bains de bouche
                      </p>
                    </button>

                    <button
                      onClick={() => setActiveTab('acts')}
                      className="p-4 rounded-2xl bg-linear-to-br from-purple-500/10 to-purple-600/20 border border-purple-200 dark:border-purple-800/60 hover:border-purple-400 transition-all text-left group cursor-pointer"
                    >
                      <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center text-lg font-black shadow-xs mb-3 group-hover:scale-105 transition-transform">
                        <Calculator className="w-5 h-5" />
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">Tarifs NGAP & AMO</h3>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                        Cotations D, DC, SPR et calcul de prise en charge
                      </p>
                    </button>

                    <button
                      onClick={handleGoToDental}
                      className="p-4 rounded-2xl bg-linear-to-br from-emerald-500/10 to-emerald-600/20 border border-emerald-200 dark:border-emerald-800/60 hover:border-emerald-400 transition-all text-left group cursor-pointer"
                    >
                      <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-lg font-black shadow-xs mb-3 group-hover:scale-105 transition-transform">
                        <FileText className="w-5 h-5" />
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">Devis & Traitements</h3>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                        Devis conformes ANAM avec reste à charge patient
                      </p>
                    </button>
                  </div>

                  {/* Fast Clinical Protocols */}
                  <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                      <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                        <Zap className="w-4 h-4 text-amber-500" />
                        <span>Protocoles Dentaires Rapides (Prêts à délivrer)</span>
                      </h3>
                      <span className="text-[11px] text-slate-400">Recommandations DMP Maroc</span>
                    </div>

                    <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                      {DENTAL_QUICK_PRESCRIPTIONS.map((tmpl) => (
                        <div
                          key={tmpl.id}
                          className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/50 flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-teal-800 dark:text-teal-300">
                                {tmpl.titre}
                              </span>
                              <span className="text-[10px] text-slate-500 font-medium">
                                {tmpl.indication}
                              </span>
                            </div>
                            <ul className="mt-2 space-y-1 text-[11px] text-slate-600 dark:text-slate-400">
                              {tmpl.medicaments.map((m, idx) => (
                                <li key={idx} className="flex items-center gap-1">
                                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                                  <span className="font-semibold text-slate-800 dark:text-slate-200">{m.medicament} {m.dosage}</span>
                                  <span className="text-slate-400">({m.posologie})</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-700/60 flex items-center justify-between">
                            <span className="text-[10px] text-slate-400">Pour {activePatient?.prenom || 'patient'}</span>
                            <button
                              onClick={() => handleApplyPrescription(tmpl)}
                              className="px-2.5 py-1 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                              <span>Prescrire en 1 Clic</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: FAST ODONTOGRAM SELECTOR */}
              {activeTab === 'odontogram' && (
                <div className="space-y-4">
                  <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 gap-2">
                      <div>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                          <span>Sélecteur Express de Dent & Diagnostic</span>
                          <span className="text-xs text-teal-600 font-mono">Dent active : #{selectedQuickTooth}</span>
                        </h3>
                        <p className="text-xs text-slate-500">
                          Sélectionnez une dent pour lui assigner un diagnostic instantané
                        </p>
                      </div>

                      <button
                        onClick={handleGoToDental}
                        className="text-xs font-bold text-teal-600 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>Ouvrir l'Odontogramme FDI complet</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Tooth selector Grid (Quadrant 1 to 4) */}
                    <div className="mt-4 space-y-3">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                          Maxillaire Supérieur (Haut)
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {[...FDI_ADULT_TEETH_QUADRANTS.q1, ...FDI_ADULT_TEETH_QUADRANTS.q2].map((num) => {
                            const cond = odontogram[num]?.condition || 'saine';
                            const isSelected = selectedQuickTooth === num;
                            return (
                              <button
                                key={num}
                                onClick={() => setSelectedQuickTooth(num)}
                                className={`w-9 h-11 rounded-lg border text-center flex flex-col items-center justify-between p-1 transition-all cursor-pointer ${
                                  isSelected
                                    ? 'ring-2 ring-teal-500 bg-teal-50 dark:bg-teal-950/60 border-teal-500'
                                    : 'border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                                }`}
                              >
                                <span className="text-[10px] font-mono font-bold">{num}</span>
                                <span className="text-[10px]">
                                  {cond === 'saine' ? '🦷' : cond === 'carie' ? '🔴' : cond === 'obturée' ? '🔵' : cond === 'couronne' ? '👑' : cond === 'implant' ? '🔩' : '⚡'}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                          Mandibule Inférieure (Bas)
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {[...FDI_ADULT_TEETH_QUADRANTS.q4, ...FDI_ADULT_TEETH_QUADRANTS.q3].map((num) => {
                            const cond = odontogram[num]?.condition || 'saine';
                            const isSelected = selectedQuickTooth === num;
                            return (
                              <button
                                key={num}
                                onClick={() => setSelectedQuickTooth(num)}
                                className={`w-9 h-11 rounded-lg border text-center flex flex-col items-center justify-between p-1 transition-all cursor-pointer ${
                                  isSelected
                                    ? 'ring-2 ring-teal-500 bg-teal-50 dark:bg-teal-950/60 border-teal-500'
                                    : 'border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                                }`}
                              >
                                <span className="text-[10px] font-mono font-bold">{num}</span>
                                <span className="text-[10px]">
                                  {cond === 'saine' ? '🦷' : cond === 'carie' ? '🔴' : cond === 'obturée' ? '🔵' : cond === 'couronne' ? '👑' : cond === 'implant' ? '🔩' : '⚡'}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Quick Diagnostic Setter for Selected Tooth */}
                    <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                          Appliquer un état à la dent #{selectedQuickTooth} ({TOOTH_NAMES[selectedQuickTooth] || 'Dent'}) :
                        </span>
                        <span className="text-xs font-mono font-bold text-teal-600">
                          Actuel : {odontogram[selectedQuickTooth]?.condition || 'saine'}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {[
                          { id: 'saine', label: '🦷 Saine', color: 'hover:bg-emerald-50 text-emerald-700' },
                          { id: 'carie', label: '🔴 Carie Active', color: 'hover:bg-rose-50 text-rose-700 font-bold' },
                          { id: 'obturée', label: '🔵 Obturation / Comp', color: 'hover:bg-blue-50 text-blue-700' },
                          { id: 'couronne', label: '👑 Couronne Zircone', color: 'hover:bg-amber-50 text-amber-700' },
                          { id: 'devitalisee', label: '⚡ Dévitalisée (Endo)', color: 'hover:bg-indigo-50 text-indigo-700' },
                          { id: 'implant', label: '🔩 Implant Titane', color: 'hover:bg-purple-50 text-purple-700' },
                          { id: 'absente', label: '✖️ Absente / Extraite', color: 'hover:bg-slate-100 text-slate-500' },
                          { id: 'extraire', label: '⚠️ À Extraire', color: 'hover:bg-orange-50 text-orange-700' }
                        ].map((item) => (
                          <button
                            key={item.id}
                            onClick={() => handleQuickSetToothCondition(item.id as DentalToothCondition)}
                            className={`px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold transition-all text-left cursor-pointer ${item.color}`}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: PRESCRIPTION TEMPLATES */}
              {activeTab === 'prescriptions' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-slate-500">
                      Modèles d'ordonnances dentaires prêts pour impression ou signature CNDP
                    </p>
                    <span className="text-xs font-bold text-teal-700 font-mono">
                      Patient : {activePatient?.nom} {activePatient?.prenom}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {DENTAL_QUICK_PRESCRIPTIONS.map((tmpl) => (
                      <div
                        key={tmpl.id}
                        className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                                {tmpl.titre}
                              </h4>
                              <p className="text-[10px] text-teal-600 font-semibold">
                                Indication : {tmpl.indication}
                              </p>
                            </div>
                            <span className="text-xs">💊</span>
                          </div>

                          <div className="mt-3 space-y-1.5 bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-100 dark:border-slate-700/60">
                            {tmpl.medicaments.map((m, idx) => (
                              <div key={idx} className="text-xs flex flex-col">
                                <span className="font-bold text-slate-800 dark:text-slate-200">
                                  {idx + 1}. {m.medicament} {m.dosage}
                                </span>
                                <span className="text-[10px] text-slate-500">
                                  {m.posologie} · Pendant {m.duree}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleApplyPrescription(tmpl)}
                            className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Générer Ordonnance</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: NGAP ACTS & TARIFS */}
              {activeTab === 'acts' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
                    <Search className="w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Rechercher acte dentaire (Ex: composite, détartrage, couronne, D16, SPR50...)"
                      value={actSearch}
                      onChange={(e) => setActSearch(e.target.value)}
                      className="w-full bg-transparent text-xs font-medium focus:outline-hidden"
                    />
                  </div>

                  <div className="space-y-2">
                    {filteredActs.map((act) => (
                      <div
                        key={act.code}
                        className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 hover:border-teal-300 transition-colors"
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                              {act.nom}
                            </span>
                            <span className="text-[10px] font-mono font-bold bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-400 px-1.5 py-0.5 rounded border border-teal-200 dark:border-teal-800">
                              {act.cotationNgap}
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-500 truncate mt-0.5">
                            {act.description}
                          </p>
                        </div>

                        <div className="text-right shrink-0">
                          <div className="text-xs font-extrabold font-mono text-teal-600 dark:text-teal-400">
                            {act.tarifRefDH} DH
                          </div>
                          <div className="text-[9px] text-slate-400">
                            Remb. AMO: {act.partAmoDH} DH
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-3 sm:p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0 text-xs">
              <div className="flex items-center gap-2 text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span className="hidden sm:inline">Module Cabinet Dentaire conforme CNDP & AMO Maroc</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleClose}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 font-semibold cursor-pointer"
                >
                  Fermer
                </button>
                <button
                  onClick={handleGoToDental}
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Accéder à l'Espace Dentaire</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
