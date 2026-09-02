import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Users,
  Search,
  Plus,
  FileText,
  DollarSign,
  Printer,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Shield,
  Layers,
  ChevronRight,
  Filter,
  Trash2,
  Edit3,
  Calendar,
  Zap,
  Info,
  Check,
  X,
  Stethoscope,
  Activity,
  HeartPulse,
  Syringe,
  Pill,
  Award
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { OdontogramInteractive } from '../components/dental/OdontogramInteractive';
import {
  ALL_DENTAL_ACTS,
  DENTAL_ACT_CATEGORIES,
  FDI_ADULT_TEETH_QUADRANTS,
  FDI_DECIDUOUS_TEETH_QUADRANTS,
  TOOTH_NAMES,
  DENTAL_QUICK_PRESCRIPTIONS,
  createDefaultOdontogram
} from '../data/dentalActsData';
import {
  DentalAct,
  DentalQuote,
  DentalQuoteItem,
  DentalToothCondition,
  DentalToothState,
  DentalToothSurface
} from '../types';

export const DentalView: React.FC = () => {
  const {
    currentOrganization,
    currentUser,
    patients,
    selectedPatientId,
    setSelectedPatientId,
    dentalQuotes,
    addDentalQuote,
    updateDentalQuote,
    deleteDentalQuote,
    getPatientOdontogram,
    updateToothState,
    resetPatientOdontogram,
    openPrintPreview,
    addPrescription,
    showToast,
    loadDrSaraAlamiProfile,
    setCurrentTab
  } = useApp();

  // Active sub-tab in Dental Workspace
  const [activeDentalTab, setActiveDentalTab] = useState<'odontogram' | 'acts' | 'quotes' | 'prescriptions'>('odontogram');

  // Odontogram state
  const activePatient = useMemo(() => {
    return patients.find((p) => p.id === selectedPatientId) || patients[0] || null;
  }, [patients, selectedPatientId]);

  const [selectedToothNumber, setSelectedToothNumber] = useState<number>(26);
  const [showDeciduousTeeth, setShowDeciduousTeeth] = useState<boolean>(false);

  // Acts catalog search and filter
  const [actSearchQuery, setActSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');

  // Quotes filter and creation modal
  const [quoteSearchQuery, setQuoteSearchQuery] = useState<string>('');
  const [isNewQuoteModalOpen, setIsNewQuoteModalOpen] = useState<boolean>(false);
  const [newQuoteItems, setNewQuoteItems] = useState<DentalQuoteItem[]>([]);
  const [newQuoteNotes, setNewQuoteNotes] = useState<string>('');
  const [newQuoteValidite, setNewQuoteValidite] = useState<number>(90);
  const [selectedActToAdd, setSelectedActToAdd] = useState<string>('');
  const [selectedToothForAct, setSelectedToothForAct] = useState<number | undefined>(undefined);

  const odontogram = useMemo(() => {
    if (!activePatient) return createDefaultOdontogram();
    return getPatientOdontogram(activePatient.id);
  }, [activePatient, getPatientOdontogram]);

  const selectedToothState: DentalToothState = useMemo(() => {
    return odontogram[selectedToothNumber] || { number: selectedToothNumber, condition: 'saine' };
  }, [odontogram, selectedToothNumber]);

  // Filtered Acts
  const filteredActs = useMemo(() => {
    return ALL_DENTAL_ACTS.filter((act) => {
      const matchCat = selectedCategory === 'Tous' || act.categorie === selectedCategory;
      const matchSearch =
        !actSearchQuery.trim() ||
        act.nom.toLowerCase().includes(actSearchQuery.toLowerCase()) ||
        act.code.toLowerCase().includes(actSearchQuery.toLowerCase()) ||
        act.description.toLowerCase().includes(actSearchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [actSearchQuery, selectedCategory]);

  // Tooth Condition Color Mapper
  const getConditionColor = (cond: DentalToothCondition) => {
    switch (cond) {
      case 'saine':
        return 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:border-emerald-500';
      case 'carie':
        return 'bg-rose-100 text-rose-800 border-rose-400 font-bold shadow-inner';
      case 'obturée':
        return 'bg-blue-100 text-blue-800 border-blue-400 font-semibold';
      case 'couronne':
        return 'bg-amber-100 text-amber-900 border-amber-500 font-bold ring-2 ring-amber-300';
      case 'implant':
        return 'bg-purple-100 text-purple-900 border-purple-500 font-bold ring-2 ring-purple-400';
      case 'absente':
      case 'extraire':
        return 'bg-slate-200 text-slate-400 border-slate-300 line-through opacity-70';
      case 'devitalisee':
        return 'bg-indigo-100 text-indigo-900 border-indigo-400';
      case 'appareil':
      case 'prothese_amovible':
        return 'bg-teal-100 text-teal-900 border-teal-400';
      case 'fracture':
        return 'bg-red-200 text-red-900 border-red-500 animate-pulse';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const getConditionLabel = (cond: DentalToothCondition): string => {
    switch (cond) {
      case 'saine': return 'Saine';
      case 'carie': return 'Carie';
      case 'obturée': return 'Obturée (Composite)';
      case 'couronne': return 'Couronne';
      case 'implant': return 'Implant Titane';
      case 'devitalisee': return 'Dévitalisée (Endo)';
      case 'absente': return 'Absente';
      case 'extraire': return 'À Extraire';
      case 'appareil': return 'Appareil Ortho';
      case 'prothese_amovible': return 'Prothèse Amovible';
      case 'fracture': return 'Fracture Coronaire';
      default: return cond;
    }
  };

  const handleConditionChange = (condition: DentalToothCondition) => {
    if (!activePatient) return;
    updateToothState(activePatient.id, selectedToothNumber, { condition });
    showToast('Dent mise à jour', `Dent #${selectedToothNumber} marquée comme "${getConditionLabel(condition)}".`);
  };

  const handleToggleSurface = (surface: DentalToothSurface) => {
    if (!activePatient) return;
    const currentSurfaces = selectedToothState.surfaces || [];
    const exists = currentSurfaces.includes(surface);
    const nextSurfaces = exists
      ? currentSurfaces.filter((s) => s !== surface)
      : [...currentSurfaces, surface];
    updateToothState(activePatient.id, selectedToothNumber, { surfaces: nextSurfaces });
  };

  const handlePocketDepthChange = (depth: number) => {
    if (!activePatient) return;
    updateToothState(activePatient.id, selectedToothNumber, { periodontalPocketDepthMm: depth });
  };

  const handleToggleBleeding = () => {
    if (!activePatient) return;
    updateToothState(activePatient.id, selectedToothNumber, {
      bleedingOnProbing: !selectedToothState.bleedingOnProbing
    });
  };

  const calculateActAmo = (act: DentalAct) => {
    return Math.round((act.baseRemboursementAMO * act.tauxRemboursementAMO) / 100);
  };

  const handleAddActToDraftQuote = (act: DentalAct, toothNum?: number) => {
    const amoEstime = calculateActAmo(act);
    const newItem: DentalQuoteItem = {
      id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      actCode: act.code,
      actNom: act.nom,
      categorie: act.categorie,
      toothNumber: toothNum,
      cotation: act.cotationNgap,
      quantite: 1,
      tarifUnitaireDH: act.tarifRefDH,
      remiseDH: 0,
      totalDH: act.tarifRefDH,
      amoEstimeDH: amoEstime,
      resteAChargeDH: Math.max(0, act.tarifRefDH - amoEstime),
      statut: 'Planifié'
    };
    setNewQuoteItems((prev) => [...prev, newItem]);
    setIsNewQuoteModalOpen(true);
    showToast('Acte ajouté au devis', `${act.nom} ${toothNum ? `(#${toothNum})` : ''} inséré dans le devis.`);
  };

  const handleRemoveQuoteItem = (itemId: string) => {
    setNewQuoteItems((prev) => prev.filter((i) => i.id !== itemId));
  };

  const handleUpdateQuoteItem = (itemId: string, updates: Partial<DentalQuoteItem>) => {
    setNewQuoteItems((prev) =>
      prev.map((item) => {
        if (item.id !== itemId) return item;
        const updated = { ...item, ...updates };
        const total = (updated.tarifUnitaireDH * updated.quantite) - (updated.remiseDH || 0);
        const amo = (updated.amoEstimeDH || 0) * updated.quantite;
        return {
          ...updated,
          totalDH: Math.max(0, total),
          resteAChargeDH: Math.max(0, total - amo)
        };
      })
    );
  };

  const calculateQuoteTotals = (items: DentalQuoteItem[]) => {
    const totalBrut = items.reduce((acc, i) => acc + i.tarifUnitaireDH * i.quantite, 0);
    const remiseTotale = items.reduce((acc, i) => acc + (i.remiseDH || 0), 0);
    const totalNet = Math.max(0, totalBrut - remiseTotale);
    const totalAmo = items.reduce((acc, i) => acc + (i.amoEstimeDH || 0) * i.quantite, 0);
    const resteACharge = Math.max(0, totalNet - totalAmo);
    return { totalBrut, remiseTotale, totalNet, totalAmo, resteACharge };
  };

  const handleSaveNewQuote = () => {
    if (!activePatient) {
      showToast('Erreur', 'Veuillez sélectionner un patient.', 'warning');
      return;
    }
    if (newQuoteItems.length === 0) {
      showToast('Devis vide', 'Ajoutez au moins un acte dentaire au devis.', 'warning');
      return;
    }

    const { totalBrut, remiseTotale, totalNet, totalAmo, resteACharge } = calculateQuoteTotals(newQuoteItems);
    const quoteCount = dentalQuotes.length + 1;
    const numDevis = `DEV-${new Date().getFullYear()}-${String(quoteCount).padStart(4, '0')}`;

    addDentalQuote({
      patientId: activePatient.id,
      patientNomComplet: `${activePatient.prenom} ${activePatient.nom}`,
      numeroDevis: numDevis,
      date: new Date().toISOString().split('T')[0],
      validiteJours: newQuoteValidite,
      praticien: currentUser.name || 'Dr. Sara ALAMI',
      statut: 'Brouillon',
      notes: newQuoteNotes,
      totalBrutDH: totalBrut,
      remiseTotaleDH: remiseTotale,
      totalNetDH: totalNet,
      totalAmoEstimeDH: totalAmo,
      resteAChargePatientDH: resteACharge,
      items: newQuoteItems
    });

    setIsNewQuoteModalOpen(false);
    setNewQuoteItems([]);
    setNewQuoteNotes('');
    setActiveDentalTab('quotes');
  };

  const handleApplyQuickPrescription = (preset: typeof DENTAL_QUICK_PRESCRIPTIONS[0]) => {
    if (!activePatient) {
      showToast('Attention', 'Veuillez sélectionner un patient au préalable.', 'warning');
      return;
    }

    addPrescription({
      patientId: activePatient.id,
      patientNomComplet: `${activePatient.prenom} ${activePatient.nom}`,
      date: new Date().toISOString().split('T')[0],
      aldConcernee: false,
      medicaments: preset.medicaments.map((m, idx) => ({
        id: `med-dent-${Date.now()}-${idx}`,
        medicament: m.medicament,
        dosage: m.dosage,
        posologie: m.posologie,
        frequence: m.posologie,
        duree: m.duree,
        instructions: m.instructions,
        ald: false,
        nonSubstituable: false
      })),
      conseilsHygiene: `Protocole dentaire : ${preset.indication}. Soins bucco-dentaires rigoureux.`
    });

    showToast(
      'Ordonnance dentaire générée',
      `Protocole "${preset.titre}" prescrit pour ${activePatient.prenom} ${activePatient.nom}.`
    );
    setCurrentTab('prescriptions');
  };

  const getToothShortLabel = (num: number): string => {
    const name = TOOTH_NAMES[num] || `Dent ${num}`;
    return name.split(' ')[0] || String(num);
  };

  return (
    <div className="min-h-full pb-16 bg-slate-50/60 dark:bg-slate-950 transition-colors duration-200">
      {/* Dental Specialty Header Banner */}
      <div className="bg-gradient-to-r from-teal-900 via-cyan-900 to-slate-900 text-white p-6 border-b border-teal-800 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300 shadow-inner">
              <Sparkles className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-2xl font-extrabold tracking-tight text-white flex items-center gap-2">
                  Espace Chirurgie Dentaire & Implantologie
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-teal-500/30 border border-teal-400/40 text-teal-200 text-xs font-semibold uppercase tracking-wider">
                  FDI Maroc
                </span>
              </div>
              <p className="text-sm text-teal-100/80 mt-1 flex items-center gap-2">
                <span>{currentOrganization.name}</span>
                <span>•</span>
                <span className="text-teal-300 font-medium">Dr. Sara ALAMI</span>
                <span>•</span>
                <span className="text-xs text-teal-200/70">Cotations AMO CNOPS / CNSS / Mutuelles</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {currentOrganization.id !== 'org-dentaire-alami' && (
              <button
                onClick={loadDrSaraAlamiProfile}
                className="flex items-center gap-2 px-4 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl text-xs transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>Basculer sur Accès Dentiste</span>
              </button>
            )}

            <button
              onClick={() => {
                setNewQuoteItems([]);
                setIsNewQuoteModalOpen(true);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl text-xs backdrop-blur-xs transition-all border border-white/20 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Nouveau Devis Dentaire</span>
            </button>
          </div>
        </div>

        {/* Patient selector bar */}
        <div className="max-w-7xl mx-auto mt-6 pt-4 border-t border-teal-800/60 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-teal-200 w-full sm:w-auto">
            <Users className="w-4 h-4 text-teal-300 shrink-0" />
            <span className="font-semibold text-white">Patient Dentaire actif :</span>
            <select
              value={activePatient?.id || ''}
              onChange={(e) => setSelectedPatientId(e.target.value)}
              className="bg-slate-800/90 text-white text-xs rounded-lg px-3 py-1.5 border border-teal-500/40 focus:outline-hidden focus:ring-2 focus:ring-teal-400"
            >
              {patients.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nom.toUpperCase()} {p.prenom} ({p.age} ans) — CIN: {p.cin || 'N/A'} [{p.organismeAssurance || 'AMO'}]
                </option>
              ))}
            </select>
          </div>

          {activePatient && (
            <div className="flex items-center gap-3 text-xs text-teal-200/90">
              <span>CIN : <strong className="text-white">{activePatient.cin || 'Non renseigné'}</strong></span>
              <span>•</span>
              <span>AMO : <strong className="text-emerald-300">{activePatient.organismeAssurance || 'CNSS'}</strong></span>
              {activePatient.allergies && activePatient.allergies.length > 0 && (
                <span className="px-2 py-0.5 bg-rose-500/30 border border-rose-400 text-rose-200 rounded text-[11px] font-bold">
                  ⚠️ Allergie : {activePatient.allergies.join(', ')}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Main Navigation Tabs within Dental Specialty */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 overflow-x-auto">
          <button
            onClick={() => setActiveDentalTab('odontogram')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
              activeDentalTab === 'odontogram'
                ? 'bg-teal-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Odontogramme FDI Interactif (Schéma Dentaire)</span>
          </button>

          <button
            onClick={() => setActiveDentalTab('acts')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
              activeDentalTab === 'acts'
                ? 'bg-teal-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Catalogue Complet des Actes ({ALL_DENTAL_ACTS.length} actes)</span>
          </button>

          <button
            onClick={() => setActiveDentalTab('quotes')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
              activeDentalTab === 'quotes'
                ? 'bg-teal-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>Devis & Plans de Traitement ({dentalQuotes.length})</span>
          </button>

          <button
            onClick={() => setActiveDentalTab('prescriptions')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
              activeDentalTab === 'prescriptions'
                ? 'bg-teal-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            <Pill className="w-4 h-4" />
            <span>Ordonnances Types Dentaires</span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: ODONTOGRAMME INTERACTIF FDI */}
        {/* ========================================================================= */}
        {activeDentalTab === 'odontogram' && (
          <div className="mt-6">
            <OdontogramInteractive
              patientId={activePatient?.id || 'p1'}
              patientNomComplet={
                activePatient
                  ? `${activePatient.nom.toUpperCase()} ${activePatient.prenom}`
                  : 'Patient non sélectionné'
              }
              odontogram={odontogram}
              onUpdateTooth={(toothNumber, updates) => {
                if (activePatient) {
                  updateToothState(activePatient.id, toothNumber, updates);
                }
              }}
              onResetOdontogram={() => {
                if (activePatient) {
                  resetPatientOdontogram(activePatient.id);
                }
              }}
              onAddActToQuote={(act, toothNumber) => {
                handleAddActToDraftQuote(act, toothNumber);
              }}
            />
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: CATALOGUE COMPLET DES ACTES DENTAIRES */}
        {/* ========================================================================= */}
        {activeDentalTab === 'acts' && (
          <div className="mt-6 space-y-6">
            {/* Search & Category Filter */}
            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="relative w-full md:w-96">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Rechercher un acte dentaire, code, cotation..."
                  value={actSearchQuery}
                  onChange={(e) => setActSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs border border-slate-200 dark:border-slate-700 focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
                {['Tous', ...DENTAL_ACT_CATEGORIES].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-teal-600 text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Acts Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredActs.map((act) => {
                const amo = calculateActAmo(act);
                return (
                  <div
                    key={act.code}
                    className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-teal-400 dark:hover:border-teal-500 transition-all flex flex-col justify-between shadow-xs hover:shadow-md"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <span className="px-2 py-0.5 rounded bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 text-[10px] font-bold font-mono">
                          {act.code}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-semibold">
                          {act.categorie}
                        </span>
                      </div>

                      <h4 className="font-bold text-sm text-slate-900 dark:text-white mt-2.5 line-clamp-2">
                        {act.nom}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                        {act.description}
                      </p>

                      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-[10px] text-slate-400 uppercase font-semibold">Cotation AMO</span>
                          <p className="font-mono font-bold text-slate-700 dark:text-slate-200">
                            {act.cotationNgap}
                          </p>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 uppercase font-semibold">Remboursement</span>
                          <p className="font-mono font-semibold text-emerald-600">
                            {amo > 0 ? `~${amo} DH (${act.tauxRemboursementAMO}%)` : 'Hors Nomenclature'}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 block font-semibold">Tarif Cabinet</span>
                        <span className="text-base font-extrabold text-teal-700 dark:text-teal-400 font-mono">
                          {act.tarifRefDH} DH
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleAddActToDraftQuote(act)}
                          className="flex items-center gap-1 px-3 py-1.5 bg-teal-50 hover:bg-teal-100 dark:bg-teal-950/60 dark:hover:bg-teal-900 text-teal-800 dark:text-teal-200 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Devis</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: DEVIS ET PLANS DE TRAITEMENT DENTAIRES */}
        {/* ========================================================================= */}
        {activeDentalTab === 'quotes' && (
          <div className="mt-6 space-y-6">
            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between gap-4">
              <div className="relative w-96">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Rechercher un devis par patient, numéro..."
                  value={quoteSearchQuery}
                  onChange={(e) => setQuoteSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs border border-slate-200 dark:border-slate-700 focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <button
                onClick={() => {
                  setNewQuoteItems([]);
                  setIsNewQuoteModalOpen(true);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl text-xs transition-colors shadow-xs cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Nouveau Devis Dentaire</span>
              </button>
            </div>

            {/* List of Quotes */}
            <div className="space-y-4">
              {dentalQuotes
                .filter(
                  (q) =>
                    !quoteSearchQuery ||
                    q.numeroDevis.toLowerCase().includes(quoteSearchQuery.toLowerCase()) ||
                    q.patientNomComplet.toLowerCase().includes(quoteSearchQuery.toLowerCase())
                )
                .map((quote) => (
                  <div
                    key={quote.id}
                    className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs hover:shadow-md transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 gap-3">
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="text-base font-bold text-slate-900 dark:text-white">
                            {quote.numeroDevis}
                          </h3>
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                              quote.statut === 'Validé Patient'
                                ? 'bg-emerald-100 text-emerald-800'
                                : quote.statut === 'En cours'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {quote.statut}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">
                          Patient : <strong className="text-slate-800 dark:text-slate-200">{quote.patientNomComplet}</strong> · Date : {quote.date} · Validité : {quote.validiteJours} jours
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openPrintPreview('devis_dentaire', `Devis Dentaire ${quote.numeroDevis}`, quote)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                        >
                          <Printer className="w-3.5 h-3.5" />
                          <span>Imprimer / PDF</span>
                        </button>

                        <button
                          onClick={() => {
                            const nextStatut = quote.statut === 'Brouillon' ? 'Validé Patient' : quote.statut === 'Validé Patient' ? 'En cours' : 'Soldé';
                            updateDentalQuote(quote.id, { statut: nextStatut });
                          }}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-50 dark:bg-teal-950/60 hover:bg-teal-100 text-teal-800 dark:text-teal-200 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Avancer Statut</span>
                        </button>

                        <button
                          onClick={() => deleteDentalQuote(quote.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition-colors cursor-pointer"
                          title="Supprimer ce devis"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Line Items Table */}
                    <div className="mt-4 overflow-x-auto">
                      <table className="w-full text-xs text-left">
                        <thead>
                          <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400">
                            <th className="py-2 px-2">Dent</th>
                            <th className="py-2 px-2">Acte</th>
                            <th className="py-2 px-2">Catégorie</th>
                            <th className="py-2 px-2 text-center">Cotation</th>
                            <th className="py-2 px-2 text-right">Tarif Unitaire</th>
                            <th className="py-2 px-2 text-right">Remise</th>
                            <th className="py-2 px-2 text-right">Total Net</th>
                            <th className="py-2 px-2 text-right">AMO Estimée</th>
                            <th className="py-2 px-2 text-right">Reste à charge</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                          {quote.items.map((item) => (
                            <tr key={item.id} className="hover:bg-slate-50/50">
                              <td className="py-2 px-2 font-mono font-bold text-teal-600">
                                {item.toothNumber ? `#${item.toothNumber}` : '—'}
                              </td>
                              <td className="py-2 px-2 font-semibold text-slate-800 dark:text-slate-200">
                                {item.actNom}
                              </td>
                              <td className="py-2 px-2 text-slate-500">{item.categorie}</td>
                              <td className="py-2 px-2 text-center font-mono text-slate-500">
                                {item.cotation || 'HN'}
                              </td>
                              <td className="py-2 px-2 text-right font-mono">{item.tarifUnitaireDH} DH</td>
                              <td className="py-2 px-2 text-right font-mono text-slate-400">
                                {item.remiseDH > 0 ? `-${item.remiseDH} DH` : '—'}
                              </td>
                              <td className="py-2 px-2 text-right font-mono font-bold text-slate-900 dark:text-white">
                                {item.totalDH} DH
                              </td>
                              <td className="py-2 px-2 text-right font-mono text-emerald-600">
                                {item.amoEstimeDH > 0 ? `${item.amoEstimeDH} DH` : '0 DH'}
                              </td>
                              <td className="py-2 px-2 text-right font-mono font-bold text-teal-700 dark:text-teal-400">
                                {item.resteAChargeDH} DH
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Financial Summary */}
                    <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-end justify-between gap-4">
                      {quote.notes && (
                        <p className="text-xs text-slate-500 italic max-w-lg">
                          📝 {quote.notes}
                        </p>
                      )}
                      <div className="flex items-center gap-6 text-xs font-mono ml-auto">
                        <div>
                          <span className="text-slate-400 block text-[10px]">Total Brut</span>
                          <span className="font-bold text-slate-700 dark:text-slate-300">{quote.totalBrutDH} DH</span>
                        </div>
                        {quote.remiseTotaleDH > 0 && (
                          <div>
                            <span className="text-slate-400 block text-[10px]">Remise</span>
                            <span className="font-bold text-emerald-600">-{quote.remiseTotaleDH} DH</span>
                          </div>
                        )}
                        <div>
                          <span className="text-slate-400 block text-[10px]">Total Net à payer</span>
                          <span className="text-base font-extrabold text-teal-700 dark:text-teal-400">{quote.totalNetDH} DH</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px]">Prise en charge AMO</span>
                          <span className="font-bold text-emerald-600">{quote.totalAmoEstimeDH} DH</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px]">Reste Patient</span>
                          <span className="font-bold text-blue-700 dark:text-blue-400">{quote.resteAChargePatientDH} DH</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: ORDONNANCES TYPES DENTAIRES */}
        {/* ========================================================================= */}
        {activeDentalTab === 'prescriptions' && (
          <div className="mt-6 space-y-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                Protocoles & Ordonnances Types de Chirurgie Dentaire
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Prescrivez en un clic des posologies complètes avec règles de délivrance et conseils d'hygiène post-opératoire.
              </p>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {DENTAL_QUICK_PRESCRIPTIONS.map((preset) => (
                  <div
                    key={preset.id}
                    className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:border-teal-400 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded bg-teal-100 text-teal-900 text-[10px] font-bold">
                          Protocole Dentaire
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white mt-2">
                        {preset.titre}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">{preset.indication}</p>

                      {/* Meds list */}
                      <div className="mt-4 space-y-2">
                        {preset.medicaments.map((med, idx) => (
                          <div key={idx} className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 text-xs">
                            <p className="font-bold text-slate-900 dark:text-white">{med.medicament}</p>
                            <p className="text-slate-500 text-[11px] mt-0.5">
                              {med.posologie} — Pendant {med.duree}
                            </p>
                            {med.instructions && (
                              <p className="text-[10px] text-teal-700 dark:text-teal-400 mt-1 italic">
                                ℹ️ {med.instructions}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-5 pt-3 border-t border-slate-200 dark:border-slate-700 flex justify-end">
                      <button
                        onClick={() => handleApplyQuickPrescription(preset)}
                        className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl text-xs transition-colors shadow-xs cursor-pointer"
                      >
                        <Zap className="w-3.5 h-3.5 fill-current" />
                        <span>Prescrire pour {activePatient?.prenom || 'le patient'}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* MODAL: NOUVEAU DEVIS DENTAIRE MULTI-ACTES */}
      {/* ========================================================================= */}
      {isNewQuoteModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="w-full max-w-4xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-6 flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 bg-teal-900 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center">
                  <DollarSign className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Édition d'un Devis Dentaire Normalisé (ONMD)</h3>
                  <p className="text-[11px] text-teal-200">
                    Patient : {activePatient?.prenom} {activePatient?.nom} · Date : {new Date().toLocaleDateString('fr-FR')}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsNewQuoteModalOpen(false)}
                className="p-1.5 text-teal-300 hover:text-white hover:bg-teal-800 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6">
              {/* Add Acts Selector */}
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-3">
                  Ajouter un acte au devis
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
                  <div className="md:col-span-3">
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      Numéro Dent (Optionnel) :
                    </label>
                    <input
                      type="number"
                      placeholder="Ex: 14, 26..."
                      value={selectedToothForAct || ''}
                      onChange={(e) => setSelectedToothForAct(e.target.value ? Number(e.target.value) : undefined)}
                      className="w-full px-3 py-2 bg-white dark:bg-slate-900 rounded-xl text-xs border border-slate-200 dark:border-slate-700"
                    />
                  </div>

                  <div className="md:col-span-7">
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      Choisir l'acte dans la nomenclature dentaire :
                    </label>
                    <select
                      value={selectedActToAdd}
                      onChange={(e) => setSelectedActToAdd(e.target.value)}
                      className="w-full px-3 py-2 bg-white dark:bg-slate-900 rounded-xl text-xs border border-slate-200 dark:border-slate-700"
                    >
                      <option value="">-- Sélectionner un acte dentaire --</option>
                      {ALL_DENTAL_ACTS.map((a) => (
                        <option key={a.code} value={a.code}>
                          [{a.code}] {a.nom} — {a.tarifRefDH} DH ({a.cotationNgap})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <button
                      onClick={() => {
                        const act = ALL_DENTAL_ACTS.find((a) => a.code === selectedActToAdd);
                        if (act) {
                          handleAddActToDraftQuote(act, selectedToothForAct);
                          setSelectedActToAdd('');
                          setSelectedToothForAct(undefined);
                        }
                      }}
                      disabled={!selectedActToAdd}
                      className="w-full py-2 bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Ajouter</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Items List */}
              <div>
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-3">
                  Lignes du devis ({newQuoteItems.length} actes)
                </h4>

                {newQuoteItems.length === 0 ? (
                  <div className="p-8 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl text-xs text-slate-400">
                    Aucun acte ajouté pour le moment. Sélectionnez un acte ci-dessus pour composer le devis.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {newQuoteItems.map((item) => (
                      <div
                        key={item.id}
                        className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs"
                      >
                        <div className="grow">
                          <div className="flex items-center gap-2">
                            {item.toothNumber && (
                              <span className="px-2 py-0.5 bg-teal-100 text-teal-800 rounded font-mono font-bold">
                                #{item.toothNumber}
                              </span>
                            )}
                            <p className="font-bold text-slate-900 dark:text-white">{item.actNom}</p>
                            <span className="text-[10px] text-slate-400 font-mono">({item.cotation})</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <div>
                            <span className="text-[10px] text-slate-400 block">Tarif (DH)</span>
                            <input
                              type="number"
                              value={item.tarifUnitaireDH}
                              onChange={(e) => handleUpdateQuoteItem(item.id, { tarifUnitaireDH: Number(e.target.value) })}
                              className="w-20 px-2 py-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 rounded font-mono text-right"
                            />
                          </div>

                          <div>
                            <span className="text-[10px] text-slate-400 block">Remise (DH)</span>
                            <input
                              type="number"
                              value={item.remiseDH || 0}
                              onChange={(e) => handleUpdateQuoteItem(item.id, { remiseDH: Number(e.target.value) })}
                              className="w-16 px-2 py-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 rounded font-mono text-right"
                            />
                          </div>

                          <div>
                            <span className="text-[10px] text-slate-400 block">Total Net</span>
                            <span className="font-mono font-bold text-teal-700">{item.totalDH} DH</span>
                          </div>

                          <button
                            onClick={() => handleRemoveQuoteItem(item.id)}
                            className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Notes & Validity */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Indications cliniques & modalité de règlement :
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Ex: Acompte de 30% à la commande, solde à la pose..."
                    value={newQuoteNotes}
                    onChange={(e) => setNewQuoteNotes(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs border border-slate-200 dark:border-slate-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Durée de validité (jours) :
                  </label>
                  <input
                    type="number"
                    value={newQuoteValidite}
                    onChange={(e) => setNewQuoteValidite(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs border border-slate-200 dark:border-slate-700 font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Footer Summary & Save */}
            <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
              {(() => {
                const { totalBrut, remiseTotale, totalNet, totalAmo, resteACharge } = calculateQuoteTotals(newQuoteItems);
                return (
                  <div className="flex items-center gap-4 text-xs font-mono">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Total Brut</span>
                      <span className="font-bold text-slate-700 dark:text-slate-300">{totalBrut} DH</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Remise</span>
                      <span className="font-bold text-emerald-600">-{remiseTotale} DH</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Total Net</span>
                      <span className="text-base font-extrabold text-teal-700">{totalNet} DH</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Reste Patient</span>
                      <span className="font-bold text-blue-700">{resteACharge} DH</span>
                    </div>
                  </div>
                );
              })()}

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsNewQuoteModalOpen(false)}
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-xl text-xs transition-colors cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  onClick={handleSaveNewQuote}
                  disabled={newQuoteItems.length === 0}
                  className="px-5 py-2 bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white font-bold rounded-xl text-xs transition-colors shadow-md cursor-pointer"
                >
                  Valider & Enregistrer le Devis
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
