import React, { useState } from 'react';
import {
  Stethoscope,
  Save,
  FileText,
  ShieldCheck,
  Printer,
  Heart,
  Activity,
  Thermometer,
  Scale,
  Sparkles,
  AlertTriangle,
  Plus,
  Trash2,
  CheckCircle2,
  User
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Vitals, Consultation } from '../types';

export const ConsultationView: React.FC = () => {
  const {
    patients,
    selectedPatientId,
    activeConsultationDraft,
    setActiveConsultationDraft,
    addConsultation,
    setCurrentTab,
    openPrintPreview,
    showToast
  } = useApp();

  const [selectedPatId, setSelectedPatId] = useState(
    activeConsultationDraft?.patientId || selectedPatientId || patients[0]?.id || 'pat-1'
  );

  const currentPatient = patients.find((p) => p.id === selectedPatId) || patients[0];

  // Draft state
  const [motif, setMotif] = useState(
    activeConsultationDraft?.motif || 'Consultation de contrôle & bilan médical'
  );
  const [vitals, setVitals] = useState<Vitals>({
    tensionSystolique: activeConsultationDraft?.constantes?.tensionSystolique || 120,
    tensionDiastolique: activeConsultationDraft?.constantes?.tensionDiastolique || 80,
    temperature: activeConsultationDraft?.constantes?.temperature || 37.0,
    poids: activeConsultationDraft?.constantes?.poids || currentPatient?.poidsRef || 65,
    taille: activeConsultationDraft?.constantes?.taille || currentPatient?.tailleRef || 170,
    frequenceCardiaque: activeConsultationDraft?.constantes?.frequenceCardiaque || 75,
    saturationO2: activeConsultationDraft?.constantes?.saturationO2 || 99,
    glycemie: activeConsultationDraft?.constantes?.glycemie || 0.95
  });

  const [symptomes, setSymptomes] = useState<string[]>(
    activeConsultationDraft?.symptomes || ['Fièvre > 38°C', 'Toux', 'Céphalées']
  );
  const [symptomInput, setSymptomInput] = useState('');

  const [examenClinique, setExamenClinique] = useState(
    activeConsultationDraft?.examenClinique ||
      'Conjonctives normocolorées. Oropharynx modérément inflammatoire sans enduit. Tympans gris normaux. Auscultation pulmonaire : râles bronchiques bilatéraux diffus. Bruits du cœur réguliers sans souffle. Abdomen souple.'
  );

  const [diagnostic, setDiagnostic] = useState(
    activeConsultationDraft?.diagnostic || 'Trachéobronchite aiguë virale'
  );
  const [codeCim10, setCodeCim10] = useState(
    activeConsultationDraft?.codeCim10 || 'J20.9 - Bronchite aiguë'
  );
  const [traitement, setTraitement] = useState(
    activeConsultationDraft?.traitement ||
      'Paracétamol 1g si douleurs/fièvre (max 3g/j). Sirop antitussif 3x/j pendant 4 jours. Lavage nasal.'
  );
  const [notesMedicales, setNotesMedicales] = useState(
    activeConsultationDraft?.notesMedicales ||
      'Revoir en consultation si persistance de la fièvre au-delà de 72h ou apparition d’une gêne respiratoire.'
  );
  const [typeConsultation, setTypeConsultation] = useState<Consultation['type']>('Présentiel');
  const [tarif, setTarif] = useState(250);
  const [reglementStatut, setReglementStatut] = useState<'Payé' | 'En attente' | 'Tiers-payant'>('Payé');
  const [modePaiement, setModePaiement] = useState<'Carte Bancaire' | 'Espèces' | 'Chèque' | 'Tiers Payant AMO'>('Espèces');

  // IMC Calculation
  const calculateIMC = () => {
    if (vitals.poids > 0 && vitals.taille > 0) {
      const heightInM = vitals.taille / 100;
      return Number((vitals.poids / (heightInM * heightInM)).toFixed(1));
    }
    return 22.0;
  };

  const currentIMC = calculateIMC();

  const getIMCClassification = (imc: number) => {
    if (imc < 18.5) return { label: 'Insuffisance pondérale', color: 'text-amber-600' };
    if (imc < 25) return { label: 'Corpulence normale', color: 'text-emerald-600' };
    if (imc < 30) return { label: 'Surpoids', color: 'text-amber-600' };
    return { label: 'Obésité', color: 'text-rose-600' };
  };

  const quickSymptoms = [
    'Fièvre > 38°C',
    'Toux sèche',
    'Toux grasse',
    'Céphalées',
    'Asthénie',
    'Douleur thoracique',
    'Dyspnée',
    'Courbatures',
    'Gonalgie',
    'Dorsalgie'
  ];

  const quickClinicalSnippets = [
    'Auscultation cardio-pulmonaire normale, murmure vésiculaire conservé.',
    'Oropharynx érythémateux sans exsudat, pas d’adénopathie satellite.',
    'Tympans physiologiques sans épanchement rétro-tympanique.',
    'Abdomen souple, dépressible, indolore à la palpation.'
  ];

  const handleAddSymptom = (sym: string) => {
    if (sym && !symptomes.includes(sym)) {
      setSymptomes([...symptomes, sym]);
    }
  };

  const handleRemoveSymptom = (sym: string) => {
    setSymptomes(symptomes.filter((s) => s !== sym));
  };

  const handleSaveConsultation = () => {
    if (!currentPatient) return;

    addConsultation({
      patientId: currentPatient.id,
      patientNomComplet: `${currentPatient.prenom} ${currentPatient.nom}`,
      date: '2026-08-25',
      heure: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      dureeMinutes: 20,
      type: typeConsultation,
      motif,
      constantes: {
        ...vitals,
        imc: currentIMC
      },
      symptomes,
      examenClinique,
      diagnostic,
      codeCim10,
      traitement,
      notesMedicales,
      tarif,
      reglementStatut,
      modePaiement
    });

    setCurrentTab('patient-detail');
  };

  if (!currentPatient) {
    return (
      <div className="p-6 md:p-12 max-w-xl mx-auto my-12 bg-white rounded-3xl border border-slate-200 shadow-sm text-center space-y-4 animate-in fade-in">
        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
          <Stethoscope className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-extrabold text-slate-900">Aucun dossier patient sélectionné</h3>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          Pour démarrer une consultation, rédiger une ordonnance ou saisir des constantes, veuillez d'abord créer votre premier dossier patient.
        </p>
        <div className="pt-2 flex justify-center gap-3">
          <button
            onClick={() => setCurrentTab('patients')}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all"
          >
            Accéder aux dossiers patients
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto animate-in fade-in">
      {/* Patient Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-sm shrink-0">
            {currentPatient.prenom[0]}
            {currentPatient.nom[0]}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-bold uppercase">Patient en consultation :</span>
              <select
                value={selectedPatId}
                onChange={(e) => setSelectedPatId(e.target.value)}
                className="text-base font-bold text-slate-900 bg-transparent border-b border-dashed border-slate-300 pb-0.5 focus:outline-hidden"
              >
                {patients.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.prenom} {p.nom} ({p.age} ans)
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1">
              <span>{currentPatient.sexe === 'F' ? 'Femme' : 'Homme'} · {currentPatient.age} ans</span>
              <span>•</span>
              <span className="font-mono">{currentPatient.numeroSecu}</span>
              <span>•</span>
              <span className="text-emerald-700 font-semibold">Médecin Traitant Déclaré</span>
            </div>
          </div>
        </div>

        {/* Quick Allergies Warning in Consultation Header */}
        {currentPatient.allergies.length > 0 && (
          <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-xs text-rose-900 font-bold shrink-0">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            <span>Allergie : {currentPatient.allergies.join(', ')}</span>
          </div>
        )}
      </div>

      {/* Main Consultation Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Clinical Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Section 1: Motif & Type */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-wider text-blue-700">
                1. Motif & Type de Consultation
              </h2>
              <div className="flex items-center gap-1.5 text-xs">
                {(['Présentiel', 'Téléconsultation', 'Urgence', 'Visite à domicile'] as Consultation['type'][]).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTypeConsultation(t)}
                    className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                      typeConsultation === t
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <input
              type="text"
              value={motif}
              onChange={(e) => setMotif(e.target.value)}
              placeholder="Ex: Syndrome grippal avec fièvre, toux grasse et céphalées"
              className="w-full px-3.5 py-2.5 text-xs font-semibold text-slate-800 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Section 2: Constantes Vitales */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-wider text-blue-700 flex items-center gap-1.5">
                <Activity className="w-4 h-4" />
                <span>2. Constantes Physiologiques</span>
              </h2>
              <span className="text-[11px] text-slate-400">Mesures per-consultation</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {/* Tension TA */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <label className="text-[11px] font-semibold text-slate-600 block">Tension (mmHg)</label>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    value={vitals.tensionSystolique}
                    onChange={(e) => setVitals({ ...vitals, tensionSystolique: Number(e.target.value) })}
                    className="w-14 px-2 py-1 text-xs font-bold text-center bg-white border border-slate-300 rounded"
                  />
                  <span className="text-slate-400 font-bold">/</span>
                  <input
                    type="number"
                    value={vitals.tensionDiastolique}
                    onChange={(e) => setVitals({ ...vitals, tensionDiastolique: Number(e.target.value) })}
                    className="w-14 px-2 py-1 text-xs font-bold text-center bg-white border border-slate-300 rounded"
                  />
                </div>
              </div>

              {/* Température */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <label className="text-[11px] font-semibold text-slate-600 block">Température (°C)</label>
                <input
                  type="number"
                  step="0.1"
                  value={vitals.temperature}
                  onChange={(e) => setVitals({ ...vitals, temperature: Number(e.target.value) })}
                  className="w-full px-2 py-1 text-xs font-bold text-center bg-white border border-slate-300 rounded"
                />
              </div>

              {/* Poids & Taille & IMC */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <label className="text-[11px] font-semibold text-slate-600 block">Poids (kg)</label>
                <input
                  type="number"
                  value={vitals.poids}
                  onChange={(e) => setVitals({ ...vitals, poids: Number(e.target.value) })}
                  className="w-full px-2 py-1 text-xs font-bold text-center bg-white border border-slate-300 rounded"
                />
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <label className="text-[11px] font-semibold text-slate-600 block">Taille (cm)</label>
                <input
                  type="number"
                  value={vitals.taille}
                  onChange={(e) => setVitals({ ...vitals, taille: Number(e.target.value) })}
                  className="w-full px-2 py-1 text-xs font-bold text-center bg-white border border-slate-300 rounded"
                />
              </div>

              {/* Fréquence cardiaque */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <label className="text-[11px] font-semibold text-slate-600 block">Pouls (bpm)</label>
                <input
                  type="number"
                  value={vitals.frequenceCardiaque}
                  onChange={(e) => setVitals({ ...vitals, frequenceCardiaque: Number(e.target.value) })}
                  className="w-full px-2 py-1 text-xs font-bold text-center bg-white border border-slate-300 rounded"
                />
              </div>

              {/* Saturation O2 */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <label className="text-[11px] font-semibold text-slate-600 block">SpO2 (%)</label>
                <input
                  type="number"
                  value={vitals.saturationO2}
                  onChange={(e) => setVitals({ ...vitals, saturationO2: Number(e.target.value) })}
                  className="w-full px-2 py-1 text-xs font-bold text-center bg-white border border-slate-300 rounded"
                />
              </div>

              {/* IMC Auto Display */}
              <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-200 space-y-1 sm:col-span-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-blue-900">IMC Calculé :</span>
                  <span className="font-bold text-sm text-blue-700">{currentIMC} kg/m²</span>
                </div>
                <p className={`text-[10px] font-bold ${getIMCClassification(currentIMC).color}`}>
                  {getIMCClassification(currentIMC).label}
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: Symptômes */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-700">
              3. Symptômes & Plaintes Fonctionnelles
            </h2>

            {/* Quick symptom pills */}
            <div className="flex flex-wrap gap-1.5">
              {quickSymptoms.map((sym) => (
                <button
                  key={sym}
                  type="button"
                  onClick={() => handleAddSymptom(sym)}
                  className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all ${
                    symptomes.includes(sym)
                      ? 'bg-blue-100 border-blue-300 text-blue-800 font-bold'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  + {sym}
                </button>
              ))}
            </div>

            {/* Active symptoms tags */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {symptomes.map((sym) => (
                <span
                  key={sym}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-800 text-white rounded-lg text-xs font-medium"
                >
                  <span>{sym}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSymptom(sym)}
                    className="hover:text-rose-300"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Section 4: Examen Clinique */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-wider text-blue-700">
                4. Examen Clinique
              </h2>
              <span className="text-[10px] text-slate-400">Modèles d'examen rapide</span>
            </div>

            {/* Quick snippets */}
            <div className="flex flex-wrap gap-1 text-[11px]">
              {quickClinicalSnippets.map((snip, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setExamenClinique((prev) => (prev ? `${prev}\n${snip}` : snip))}
                  className="px-2 py-1 bg-slate-50 hover:bg-blue-50 hover:text-blue-700 border border-slate-200 rounded text-slate-600 truncate max-w-xs text-left"
                >
                  + {snip.slice(0, 35)}...
                </button>
              ))}
            </div>

            <textarea
              rows={4}
              value={examenClinique}
              onChange={(e) => setExamenClinique(e.target.value)}
              placeholder="Auscultation cardio-pulmonaire, examen ORL, palpation abdominale..."
              className="w-full p-3 text-xs border border-slate-200 rounded-xl leading-relaxed focus:ring-2 focus:ring-blue-500 font-sans"
            />
          </div>

          {/* Section 5: Diagnostic & CIM-10 */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-700">
              5. Diagnostic & Codage CIM-10
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Diagnostic principal</label>
                <input
                  type="text"
                  value={diagnostic}
                  onChange={(e) => setDiagnostic(e.target.value)}
                  placeholder="Ex: Trachéobronchite aiguë"
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Code CIM-10</label>
                <input
                  type="text"
                  value={codeCim10}
                  onChange={(e) => setCodeCim10(e.target.value)}
                  placeholder="Ex: J20.9"
                  className="w-full px-3 py-2 text-xs font-mono border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Section 6: Traitement & Notes */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-700">
              6. Conduite à Tenir & Notes Médicales Privées
            </h2>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Prescription & Recommandations au patient
              </label>
              <textarea
                rows={3}
                value={traitement}
                onChange={(e) => setTraitement(e.target.value)}
                placeholder="Prescription médicamenteuse, repos, hydratation..."
                className="w-full p-3 text-xs border border-slate-200 rounded-xl leading-relaxed focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Notes d'observation internes (non imprimées)
              </label>
              <textarea
                rows={2}
                value={notesMedicales}
                onChange={(e) => setNotesMedicales(e.target.value)}
                placeholder="Notes confidentielles..."
                className="w-full p-2.5 text-xs bg-amber-50/40 border border-amber-200/80 rounded-xl text-slate-700 focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>
        </div>

        {/* Right 1 Column: Billing, Documents & Completion */}
        <div className="space-y-6">
          {/* Facturation & Règlement */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Facturation & Règlements (DH)
              </h3>
              <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                Maroc
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">Honoraires de consultation</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="10"
                    value={tarif}
                    onChange={(e) => setTarif(Number(e.target.value))}
                    className="w-28 px-3 py-1.5 text-sm font-bold border border-slate-300 rounded-lg text-slate-900 font-mono"
                  />
                  <span className="text-xs font-semibold text-slate-600">DH (Honoraires Cabinet)</span>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">Statut du règlement</label>
                <div className="grid grid-cols-3 gap-1.5 text-xs font-semibold">
                  {(['Payé', 'En attente', 'Tiers-payant'] as const).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setReglementStatut(st)}
                      className={`py-1.5 rounded-lg border text-center transition-all ${
                        reglementStatut === st
                          ? 'bg-emerald-600 text-white border-emerald-600 font-bold'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">Mode de règlement</label>
                <select
                  value={modePaiement}
                  onChange={(e) => setModePaiement(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white font-medium"
                >
                  <option value="Espèces">Espèces (DH)</option>
                  <option value="Carte Bancaire">Carte Bancaire (CMI)</option>
                  <option value="Chèque">Chèque bancaire</option>
                  <option value="Tiers Payant AMO">Tiers Payant AMO (CNSS / CNOPS)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Quick Document Links */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Documents associés
            </h3>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setCurrentTab('prescriptions')}
                className="w-full px-3 py-2 text-left bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 rounded-xl border border-slate-200 text-xs font-semibold flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span>Rédiger l'ordonnance</span>
                </div>
                <span>→</span>
              </button>

              <button
                type="button"
                onClick={() => setCurrentTab('certificates')}
                className="w-full px-3 py-2 text-left bg-slate-50 hover:bg-purple-50 text-slate-700 hover:text-purple-700 rounded-xl border border-slate-200 text-xs font-semibold flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-purple-600" />
                  <span>Délivrer un certificat / arrêt</span>
                </div>
                <span>→</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  openPrintPreview('feuille_soin', 'Feuille de soins électronique', {
                    patientNomComplet: `${currentPatient.prenom} ${currentPatient.nom}`,
                    patientAge: currentPatient.age,
                    tarif: tarif,
                    date: '25/08/2026'
                  })
                }
                className="w-full px-3 py-2 text-left bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl border border-slate-200 text-xs font-semibold flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Printer className="w-4 h-4 text-slate-500" />
                  <span>Aperçu Feuille de Soins</span>
                </div>
                <span>→</span>
              </button>
            </div>
          </div>

          {/* Save & Finish Buttons */}
          <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-lg space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Clôturer la consultation
            </h3>
            <p className="text-xs text-slate-400">
              Enregistre le compte-rendu, met à jour le dossier et valide la télétransmission.
            </p>

            <button
              type="button"
              onClick={handleSaveConsultation}
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <Save className="w-4 h-4" />
              <span>Enregistrer la consultation</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
