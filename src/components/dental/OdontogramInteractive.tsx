import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Search,
  Plus,
  Printer,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Activity,
  Layers,
  Check,
  X,
  RotateCcw,
  Stethoscope,
  Pill,
  DollarSign,
  Info,
  Calendar,
  Filter,
  Eye,
  Shield,
  HelpCircle
} from 'lucide-react';
import { ToothSvgIcon } from './ToothSvgIcon';
import {
  DentalToothCondition,
  DentalToothState,
  DentalToothSurface,
  DentalAct,
  DentalQuoteItem
} from '../../types';
import {
  FDI_ADULT_TEETH_QUADRANTS,
  FDI_DECIDUOUS_TEETH_QUADRANTS,
  TOOTH_NAMES,
  ALL_DENTAL_ACTS
} from '../../data/dentalActsData';
import { useApp } from '../../context/AppContext';

interface OdontogramInteractiveProps {
  patientId: string;
  patientNomComplet: string;
  odontogram: Record<number, DentalToothState>;
  onUpdateTooth: (toothNumber: number, updates: Partial<DentalToothState>) => void;
  onResetOdontogram: () => void;
  onAddActToQuote?: (act: DentalAct, toothNumber?: number) => void;
}

export const OdontogramInteractive: React.FC<OdontogramInteractiveProps> = ({
  patientId,
  patientNomComplet,
  odontogram,
  onUpdateTooth,
  onResetOdontogram,
  onAddActToQuote
}) => {
  const { showToast, openPrintPreview, setCurrentTab, addPrescription } = useApp();

  // Selected tooth for detailed annotation
  const [selectedToothNumber, setSelectedToothNumber] = useState<number>(26);
  // Adult vs Deciduous teeth toggle
  const [isDeciduousMode, setIsDeciduousMode] = useState<boolean>(false);
  // View mode
  const [viewMode, setViewMode] = useState<'anatomical' | 'compact' | 'perio' | 'summary'>('anatomical');
  // Status filter for quick review
  const [statusFilter, setStatusFilter] = useState<'all' | 'pathological' | 'restored' | 'missing' | 'notes'>('all');
  // Temporary note editor state
  const [currentNoteInput, setCurrentNoteInput] = useState<string>('');
  // Quick act search query in tooth inspector
  const [actSearchInTooth, setActSearchInTooth] = useState<string>('');

  // Selected tooth full state
  const selectedToothState: DentalToothState = useMemo(() => {
    return (
      odontogram[selectedToothNumber] || {
        number: selectedToothNumber,
        condition: 'saine',
        surfaces: [],
        periodontalPocketDepthMm: 2,
        bleedingOnProbing: false,
        mobility: 0
      }
    );
  }, [odontogram, selectedToothNumber]);

  // Sync note input when selected tooth changes
  React.useEffect(() => {
    setCurrentNoteInput(selectedToothState.notes || '');
  }, [selectedToothNumber, selectedToothState.notes]);

  // Condition handlers
  const handleSetCondition = (condition: DentalToothCondition) => {
    onUpdateTooth(selectedToothNumber, { condition });
    showToast('Diagnostic appliqué', `Dent #${selectedToothNumber} : statut "${condition}".`);
  };

  // Surface toggler
  const handleToggleSurface = (toothNum: number, surface: DentalToothSurface) => {
    setSelectedToothNumber(toothNum);
    const tooth = odontogram[toothNum] || { number: toothNum, condition: 'saine', surfaces: [] };
    const currentSurfaces = tooth.surfaces || [];
    const exists = currentSurfaces.includes(surface);
    const nextSurfaces = exists
      ? currentSurfaces.filter((s) => s !== surface)
      : [...currentSurfaces, surface];

    onUpdateTooth(toothNum, {
      surfaces: nextSurfaces,
      // Auto-set condition to carie if saine when adding surfaces
      condition: tooth.condition === 'saine' && nextSurfaces.length > 0 ? 'carie' : tooth.condition
    });
  };

  // Quick surface combo presets
  const handleApplySurfacePreset = (preset: DentalToothSurface[]) => {
    onUpdateTooth(selectedToothNumber, {
      surfaces: preset,
      condition: selectedToothState.condition === 'saine' ? 'carie' : selectedToothState.condition
    });
  };

  // Note auto-save
  const handleSaveNote = () => {
    onUpdateTooth(selectedToothNumber, { notes: currentNoteInput.trim() });
    showToast('Note clinique enregistrée', `Observation pour dent #${selectedToothNumber} sauvegardée.`);
  };

  // Quick annotation tags
  const QUICK_CLINICAL_TAGS = [
    'Sensibilité thermique vive +++',
    'Fêlure émail disto-vestibulaire',
    'Carie sous-gingivale profonde',
    'Poche parodontale active 6mm',
    'Reconstitution coronaire requise',
    'Couronne provisoire scellée',
    'Suppuration au sondage',
    'À surveiller prochaine séance',
    'Traitement endodontique à reprendre'
  ];

  const handleAddClinicalTag = (tag: string) => {
    const next = currentNoteInput ? `${currentNoteInput} • ${tag}` : tag;
    setCurrentNoteInput(next);
    onUpdateTooth(selectedToothNumber, { notes: next });
  };

  // Summary Metrics calculations
  const metrics = useMemo(() => {
    const teeth = Object.values(odontogram) as DentalToothState[];
    const totalCaries = teeth.filter((t) => t.condition === 'carie').length;
    const totalFilled = teeth.filter((t) => t.condition === 'obturée').length;
    const totalCrowns = teeth.filter((t) => t.condition === 'couronne').length;
    const totalImplants = teeth.filter((t) => t.condition === 'implant').length;
    const totalMissing = teeth.filter((t) => t.condition === 'absente' || t.condition === 'extraire').length;
    const totalDevitalized = teeth.filter((t) => t.condition === 'devitalisee').length;
    const totalWithNotes = teeth.filter((t) => t.notes && t.notes.trim().length > 0).length;
    const bleedingCount = teeth.filter((t) => t.bleedingOnProbing).length;
    const bopPercentage = teeth.length > 0 ? Math.round((bleedingCount / 32) * 100) : 0;
    const deepPocketsCount = teeth.filter((t) => (t.periodontalPocketDepthMm || 0) >= 5).length;

    return {
      totalCaries,
      totalFilled,
      totalCrowns,
      totalImplants,
      totalMissing,
      totalDevitalized,
      totalWithNotes,
      bleedingCount,
      bopPercentage,
      deepPocketsCount
    };
  }, [odontogram]);

  // Filtered teeth for summary view
  const annotatedOrPathologicalTeeth = useMemo(() => {
    const all = isDeciduousMode
      ? [
          ...FDI_DECIDUOUS_TEETH_QUADRANTS.q5,
          ...FDI_DECIDUOUS_TEETH_QUADRANTS.q6,
          ...FDI_DECIDUOUS_TEETH_QUADRANTS.q8,
          ...FDI_DECIDUOUS_TEETH_QUADRANTS.q7
        ]
      : [
          ...FDI_ADULT_TEETH_QUADRANTS.q1,
          ...FDI_ADULT_TEETH_QUADRANTS.q2,
          ...FDI_ADULT_TEETH_QUADRANTS.q4,
          ...FDI_ADULT_TEETH_QUADRANTS.q3
        ];

    return all
      .map((num) => odontogram[num] || { number: num, condition: 'saine' })
      .filter((t) => {
        if (statusFilter === 'all') return true;
        if (statusFilter === 'pathological') return t.condition === 'carie' || t.condition === 'fracture' || t.condition === 'extraire' || (t.periodontalPocketDepthMm || 0) >= 5;
        if (statusFilter === 'restored') return t.condition === 'obturée' || t.condition === 'devitalisee';
        if (statusFilter === 'missing') return t.condition === 'absente' || t.condition === 'implant';
        if (statusFilter === 'notes') return !!t.notes && t.notes.trim().length > 0;
        return true;
      });
  }, [isDeciduousMode, odontogram, statusFilter]);

  // Acts suggestions for selected tooth
  const filteredActsForTooth = useMemo(() => {
    return ALL_DENTAL_ACTS.filter((act) => {
      if (!actSearchInTooth.trim()) return true;
      return (
        act.nom.toLowerCase().includes(actSearchInTooth.toLowerCase()) ||
        act.code.toLowerCase().includes(actSearchInTooth.toLowerCase()) ||
        act.categorie.toLowerCase().includes(actSearchInTooth.toLowerCase())
      );
    }).slice(0, 6);
  }, [actSearchInTooth]);

  // Print Odontogram Sheet
  const handlePrintOdontogram = () => {
    openPrintPreview('certificate', `Schéma Dentaire & Bilan Clinique FDI - ${patientNomComplet}`, {
      patientNomComplet,
      date: new Date().toISOString().split('T')[0],
      titre: 'SCHÉMA DENTAIRE NUMÉRIQUE (ODONTOGRAMME FDI / ISO 3950)',
      texteContenu: `BILAN CLINIQUE BUCCO-DENTAIRE & ODONTOGRAMME NORMALISÉ
Patient : ${patientNomComplet}
Date d'examen : ${new Date().toLocaleDateString('fr-FR')}
Praticien : Dr. Sara ALAMI — N° INPE: 849204820 / N° Ordre ONMD: 5821

SYNTHÈSE CLINIQUE :
• Dents cariées actives : ${metrics.totalCaries}
• Dents obturées (composites / soins) : ${metrics.totalFilled}
• Couronnes / Prothèses fixes : ${metrics.totalCrowns}
• Implants ostéo-intégrés : ${metrics.totalImplants}
• Dents dévitalisées (traitements endodontiques) : ${metrics.totalDevitalized}
• Dents absentes ou à extraire : ${metrics.totalMissing}
• Indice de saignement gingival au sondage (BOP) : ${metrics.bopPercentage}%
• Poches parodontales profondes (>= 5mm) : ${metrics.deepPocketsCount}

DÉTAIL DES DENTS ANNOTÉES & PATHOLOGIQUES :
${annotatedOrPathologicalTeeth
  .filter((t) => t.condition !== 'saine' || (t.notes && t.notes.trim().length > 0))
  .map(
    (t) =>
      `• Dent FDI #${t.number} (${TOOTH_NAMES[t.number] || 'Dent ' + t.number}) : Statut [${t.condition.toUpperCase()}] ${
        t.surfaces && t.surfaces.length > 0 ? `- Surfaces: ${t.surfaces.join('')}` : ''
      } - Poche: ${t.periodontalPocketDepthMm || 2}mm ${t.bleedingOnProbing ? '(BOP+)' : ''} ${
        t.notes ? `\n  Observation clinique: ${t.notes}` : ''
      }`
  )
  .join('\n\n')}

Plan de traitement établi selon la nomenclature des actes dentaires (ANAM / CNOPS / CNSS).`
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Clinical Stats & Control Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-wrap items-center justify-between gap-4">
        {/* Left: Metrics badges */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="font-bold text-slate-700 dark:text-slate-200 mr-1 flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-teal-600" />
            <span>Synthèse :</span>
          </span>

          <span className="px-2.5 py-1 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 font-bold border border-rose-200 dark:border-rose-800">
            {metrics.totalCaries} Caries
          </span>

          <span className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-bold border border-blue-200 dark:border-blue-800">
            {metrics.totalFilled} Obturations
          </span>

          <span className="px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-bold border border-amber-200 dark:border-amber-800">
            {metrics.totalCrowns} Couronnes
          </span>

          <span className="px-2.5 py-1 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 font-bold border border-purple-200 dark:border-purple-800">
            {metrics.totalImplants} Implants
          </span>

          <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
            {metrics.totalMissing} Absentes
          </span>

          <span
            className={`px-2.5 py-1 rounded-lg font-bold border ${
              metrics.bopPercentage >= 25
                ? 'bg-red-50 text-red-700 border-red-200'
                : 'bg-emerald-50 text-emerald-700 border-emerald-200'
            }`}
            title="Pourcentage de saignement au sondage gingival"
          >
            BOP: {metrics.bopPercentage}%
          </span>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Mode switch */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setViewMode('anatomical')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'anatomical'
                  ? 'bg-white dark:bg-slate-700 text-teal-700 dark:text-teal-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Anatomique (SVG)
            </button>
            <button
              onClick={() => setViewMode('perio')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'perio'
                  ? 'bg-white dark:bg-slate-700 text-teal-700 dark:text-teal-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Bilan Parodontal
            </button>
            <button
              onClick={() => setViewMode('summary')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'summary'
                  ? 'bg-white dark:bg-slate-700 text-teal-700 dark:text-teal-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Tableau Annotations ({metrics.totalWithNotes})
            </button>
          </div>

          {/* Deciduous toggle */}
          <button
            onClick={() => setIsDeciduousMode(!isDeciduousMode)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
              isDeciduousMode
                ? 'bg-amber-100 text-amber-900 border-amber-300'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50'
            }`}
          >
            {isDeciduousMode ? 'Mode Dents Lait (51-85)' : 'Mode Adulte (11-48)'}
          </button>

          {/* Print button */}
          <button
            onClick={handlePrintOdontogram}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
            title="Imprimer ou exporter la fiche d'odontogramme"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Fiche FDI</span>
          </button>

          {/* Reset */}
          <button
            onClick={onResetOdontogram}
            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-all border border-slate-200 dark:border-slate-700"
            title="Réinitialiser toutes les dents à l'état sain"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Grid: Odontogram Chart (Left 8 cols) + Selected Tooth Inspector & Annotation Hub (Right 4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ========================================================================= */}
        {/* LEFT COLUMN: ODONTOGRAM CHART AREA (8 COLS) */}
        {/* ========================================================================= */}
        <div className="lg:col-span-8 space-y-6">
          {viewMode === 'anatomical' && (
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                    <span>Odontogramme FDI Interactif — Système ISO 3950</span>
                    <span className="px-2 py-0.5 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 text-[11px] font-bold">
                      {isDeciduousMode ? 'Dents Temporaires (20)' : 'Dents Permanentes (32)'}
                    </span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Cliquez sur une dent pour l'annoter ou directement sur une de ses 5 faces (O, M, D, V, L/P).
                  </p>
                </div>
              </div>

              {/* DENTAL ARCH VISUALIZATION */}
              <div className="mt-6 space-y-8 select-none">
                {/* ------------------------------------------------------------- */}
                {/* UPPER JAW / MAXILLAIRE SUPÉRIEUR (Q1 & Q2 ou Q5 & Q6) */}
                {/* ------------------------------------------------------------- */}
                <div className="bg-slate-50/70 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-3 px-2">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-teal-500" />
                      Quadrant 1 : Maxillaire Droit (18 → 11)
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-teal-100/80 dark:bg-teal-900/60 text-teal-800 dark:text-teal-200 text-[10px] uppercase tracking-wider font-extrabold">
                      Maxillaire Supérieur (Haut)
                    </span>
                    <span className="flex items-center gap-1.5">
                      Quadrant 2 : Maxillaire Gauche (21 → 28)
                      <span className="w-2 h-2 rounded-full bg-teal-500" />
                    </span>
                  </div>

                  {!isDeciduousMode ? (
                    <div className="grid grid-cols-16 gap-1 overflow-x-auto pb-2">
                      {/* Q1: 18..11 */}
                      {FDI_ADULT_TEETH_QUADRANTS.q1.map((num) => (
                        <ToothSvgIcon
                          key={num}
                          toothNumber={num}
                          toothState={odontogram[num]}
                          isSelected={selectedToothNumber === num}
                          isUpper={true}
                          onToothClick={(n) => setSelectedToothNumber(n)}
                          onSurfaceClick={handleToggleSurface}
                          size="md"
                        />
                      ))}

                      {/* Q2: 21..28 */}
                      {FDI_ADULT_TEETH_QUADRANTS.q2.map((num) => (
                        <ToothSvgIcon
                          key={num}
                          toothNumber={num}
                          toothState={odontogram[num]}
                          isSelected={selectedToothNumber === num}
                          isUpper={true}
                          onToothClick={(n) => setSelectedToothNumber(n)}
                          onSurfaceClick={handleToggleSurface}
                          size="md"
                        />
                      ))}
                    </div>
                  ) : (
                    /* Deciduous Upper (55..51 | 61..65) */
                    <div className="grid grid-cols-10 gap-2 max-w-2xl mx-auto overflow-x-auto pb-2">
                      {FDI_DECIDUOUS_TEETH_QUADRANTS.q5.map((num) => (
                        <ToothSvgIcon
                          key={num}
                          toothNumber={num}
                          toothState={odontogram[num]}
                          isSelected={selectedToothNumber === num}
                          isUpper={true}
                          onToothClick={(n) => setSelectedToothNumber(n)}
                          onSurfaceClick={handleToggleSurface}
                          size="md"
                        />
                      ))}
                      {FDI_DECIDUOUS_TEETH_QUADRANTS.q6.map((num) => (
                        <ToothSvgIcon
                          key={num}
                          toothNumber={num}
                          toothState={odontogram[num]}
                          isSelected={selectedToothNumber === num}
                          isUpper={true}
                          onToothClick={(n) => setSelectedToothNumber(n)}
                          onSurfaceClick={handleToggleSurface}
                          size="md"
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* OCCLUSION MIDLINE SEPARATOR */}
                <div className="relative flex py-1 items-center justify-center">
                  <div className="grow border-t-2 border-dashed border-teal-300 dark:border-teal-800" />
                  <div className="shrink mx-4 flex items-center gap-2 px-4 py-1 rounded-full bg-teal-50 dark:bg-teal-950 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-800 text-[11px] font-extrabold uppercase tracking-widest shadow-xs">
                    <span>Ligne d'Occlusion Médiane</span>
                  </div>
                  <div className="grow border-t-2 border-dashed border-teal-300 dark:border-teal-800" />
                </div>

                {/* ------------------------------------------------------------- */}
                {/* LOWER JAW / MANDIBULE INFÉRIEURE (Q4 & Q3 ou Q8 & Q7) */}
                {/* ------------------------------------------------------------- */}
                <div className="bg-slate-50/70 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-3 px-2">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-cyan-500" />
                      Quadrant 4 : Mandibule Droite (48 → 41)
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-cyan-100/80 dark:bg-cyan-900/60 text-cyan-800 dark:text-cyan-200 text-[10px] uppercase tracking-wider font-extrabold">
                      Mandibule Inférieure (Bas)
                    </span>
                    <span className="flex items-center gap-1.5">
                      Quadrant 3 : Mandibule Gauche (31 → 38)
                      <span className="w-2 h-2 rounded-full bg-cyan-500" />
                    </span>
                  </div>

                  {!isDeciduousMode ? (
                    <div className="grid grid-cols-16 gap-1 overflow-x-auto pb-2">
                      {/* Q4: 48..41 */}
                      {FDI_ADULT_TEETH_QUADRANTS.q4.map((num) => (
                        <ToothSvgIcon
                          key={num}
                          toothNumber={num}
                          toothState={odontogram[num]}
                          isSelected={selectedToothNumber === num}
                          isUpper={false}
                          onToothClick={(n) => setSelectedToothNumber(n)}
                          onSurfaceClick={handleToggleSurface}
                          size="md"
                        />
                      ))}

                      {/* Q3: 31..38 */}
                      {FDI_ADULT_TEETH_QUADRANTS.q3.map((num) => (
                        <ToothSvgIcon
                          key={num}
                          toothNumber={num}
                          toothState={odontogram[num]}
                          isSelected={selectedToothNumber === num}
                          isUpper={false}
                          onToothClick={(n) => setSelectedToothNumber(n)}
                          onSurfaceClick={handleToggleSurface}
                          size="md"
                        />
                      ))}
                    </div>
                  ) : (
                    /* Deciduous Lower (85..81 | 71..75) */
                    <div className="grid grid-cols-10 gap-2 max-w-2xl mx-auto overflow-x-auto pb-2">
                      {FDI_DECIDUOUS_TEETH_QUADRANTS.q8.map((num) => (
                        <ToothSvgIcon
                          key={num}
                          toothNumber={num}
                          toothState={odontogram[num]}
                          isSelected={selectedToothNumber === num}
                          isUpper={false}
                          onToothClick={(n) => setSelectedToothNumber(n)}
                          onSurfaceClick={handleToggleSurface}
                          size="md"
                        />
                      ))}
                      {FDI_DECIDUOUS_TEETH_QUADRANTS.q7.map((num) => (
                        <ToothSvgIcon
                          key={num}
                          toothNumber={num}
                          toothState={odontogram[num]}
                          isSelected={selectedToothNumber === num}
                          isUpper={false}
                          onToothClick={(n) => setSelectedToothNumber(n)}
                          onSurfaceClick={handleToggleSurface}
                          size="md"
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Interactive Legend */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded bg-emerald-500 shrink-0" />
                  <span>Saine</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded bg-rose-500 shrink-0" />
                  <span>Carie Active</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded bg-blue-500 shrink-0" />
                  <span>Obturée / Composite</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded bg-amber-500 shrink-0" />
                  <span>Couronne Céramique</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded bg-purple-500 shrink-0" />
                  <span>Implant Titane</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded bg-indigo-500 shrink-0" />
                  <span>Dévitalisée (Endo)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded bg-slate-300 line-through shrink-0" />
                  <span>Absente / Extraite</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded bg-teal-500 shrink-0" />
                  <span>Appareil Ortho</span>
                </div>
              </div>
            </div>
          )}

          {/* VIEW MODE: PERIODONTAL CHART (BILAN PARODONTAL) */}
          {viewMode === 'perio' && (
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                    <Shield className="w-5 h-5 text-teal-600" />
                    <span>Chart Parodontal & Profondeurs de Poches (PSR)</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    Relevé millimétrique du sulcus gingival et saignement au sondage (BOP).
                  </p>
                </div>
                <span className="text-xs font-bold text-teal-700 bg-teal-50 dark:bg-teal-950 px-3 py-1 rounded-full border border-teal-200">
                  Seuil d'alerte : ≥ 4mm
                </span>
              </div>

              {/* Perio Bars for Upper Arch */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Maxillaire Supérieur (Q1 & Q2)
                </h4>
                <div className="grid grid-cols-16 gap-1 bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
                  {[...FDI_ADULT_TEETH_QUADRANTS.q1, ...FDI_ADULT_TEETH_QUADRANTS.q2].map((num) => {
                    const depth = odontogram[num]?.periodontalPocketDepthMm || 2;
                    const bop = odontogram[num]?.bleedingOnProbing;
                    return (
                      <button
                        key={num}
                        onClick={() => setSelectedToothNumber(num)}
                        className={`p-1 rounded-lg flex flex-col items-center justify-end h-28 transition-all cursor-pointer ${
                          selectedToothNumber === num ? 'ring-2 ring-teal-500 bg-teal-50 dark:bg-teal-950/60' : 'hover:bg-slate-200/50'
                        }`}
                      >
                        <span className="text-[10px] font-bold font-mono text-slate-700 dark:text-slate-300">
                          {num}
                        </span>
                        {/* Vertical Bar */}
                        <div className="w-3 bg-slate-200 dark:bg-slate-700 rounded-t h-16 relative flex items-end justify-center my-1 overflow-hidden">
                          <div
                            style={{ height: `${Math.min(100, (depth / 10) * 100)}%` }}
                            className={`w-full rounded-t transition-all ${
                              depth >= 6
                                ? 'bg-rose-600'
                                : depth >= 4
                                ? 'bg-amber-500'
                                : 'bg-emerald-500'
                            }`}
                          />
                        </div>
                        <span className="text-[10px] font-bold font-mono text-slate-600 dark:text-slate-400">
                          {depth}mm
                        </span>
                        {bop && <span className="w-2 h-2 rounded-full bg-rose-600 mt-0.5 animate-pulse" title="Saignement au sondage" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Perio Bars for Lower Arch */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Mandibule Inférieure (Q4 & Q3)
                </h4>
                <div className="grid grid-cols-16 gap-1 bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
                  {[...FDI_ADULT_TEETH_QUADRANTS.q4, ...FDI_ADULT_TEETH_QUADRANTS.q3].map((num) => {
                    const depth = odontogram[num]?.periodontalPocketDepthMm || 2;
                    const bop = odontogram[num]?.bleedingOnProbing;
                    return (
                      <button
                        key={num}
                        onClick={() => setSelectedToothNumber(num)}
                        className={`p-1 rounded-lg flex flex-col items-center justify-end h-28 transition-all cursor-pointer ${
                          selectedToothNumber === num ? 'ring-2 ring-teal-500 bg-teal-50 dark:bg-teal-950/60' : 'hover:bg-slate-200/50'
                        }`}
                      >
                        <span className="text-[10px] font-bold font-mono text-slate-700 dark:text-slate-300">
                          {num}
                        </span>
                        {/* Vertical Bar */}
                        <div className="w-3 bg-slate-200 dark:bg-slate-700 rounded-t h-16 relative flex items-end justify-center my-1 overflow-hidden">
                          <div
                            style={{ height: `${Math.min(100, (depth / 10) * 100)}%` }}
                            className={`w-full rounded-t transition-all ${
                              depth >= 6
                                ? 'bg-rose-600'
                                : depth >= 4
                                ? 'bg-amber-500'
                                : 'bg-emerald-500'
                            }`}
                          />
                        </div>
                        <span className="text-[10px] font-bold font-mono text-slate-600 dark:text-slate-400">
                          {depth}mm
                        </span>
                        {bop && <span className="w-2 h-2 rounded-full bg-rose-600 mt-0.5 animate-pulse" title="Saignement au sondage" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* VIEW MODE: SUMMARY TABLE OF ANNOTATIONS */}
          {viewMode === 'summary' && (
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                    <FileText className="w-5 h-5 text-teal-600" />
                    <span>Tableau Récapitulatif FDI & Journal Clinique</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    Liste structurée des dents annotées et des pathologies bucco-dentaires.
                  </p>
                </div>

                {/* Filter chips */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                  <button
                    onClick={() => setStatusFilter('all')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer ${
                      statusFilter === 'all'
                        ? 'bg-teal-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    Toutes ({annotatedOrPathologicalTeeth.length})
                  </button>
                  <button
                    onClick={() => setStatusFilter('pathological')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer ${
                      statusFilter === 'pathological'
                        ? 'bg-rose-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    Pathologies
                  </button>
                  <button
                    onClick={() => setStatusFilter('notes')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer ${
                      statusFilter === 'notes'
                        ? 'bg-amber-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    Avec Notes
                  </button>
                </div>
              </div>

              {/* Table list */}
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 border-b border-slate-200 dark:border-slate-700">
                    <tr>
                      <th className="py-2.5 px-3">Dent FDI</th>
                      <th className="py-2.5 px-3">Anatomie</th>
                      <th className="py-2.5 px-3">Diagnostic</th>
                      <th className="py-2.5 px-3">Surfaces</th>
                      <th className="py-2.5 px-3">Sondage</th>
                      <th className="py-2.5 px-3">Observations & Notes</th>
                      <th className="py-2.5 px-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {annotatedOrPathologicalTeeth.map((tooth) => (
                      <tr
                        key={tooth.number}
                        onClick={() => setSelectedToothNumber(tooth.number)}
                        className={`hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer ${
                          selectedToothNumber === tooth.number ? 'bg-teal-50/60 dark:bg-teal-950/40' : ''
                        }`}
                      >
                        <td className="py-2.5 px-3 font-mono font-extrabold text-teal-700 dark:text-teal-300">
                          #{tooth.number}
                        </td>
                        <td className="py-2.5 px-3 font-medium text-slate-800 dark:text-slate-200">
                          {TOOTH_NAMES[tooth.number] || `Dent ${tooth.number}`}
                        </td>
                        <td className="py-2.5 px-3">
                          <span
                            className={`px-2 py-0.5 rounded-md font-bold uppercase text-[10px] ${
                              tooth.condition === 'carie'
                                ? 'bg-rose-100 text-rose-800'
                                : tooth.condition === 'obturée'
                                ? 'bg-blue-100 text-blue-800'
                                : tooth.condition === 'couronne'
                                ? 'bg-amber-100 text-amber-800'
                                : tooth.condition === 'implant'
                                ? 'bg-purple-100 text-purple-800'
                                : tooth.condition === 'devitalisee'
                                ? 'bg-indigo-100 text-indigo-800'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            {tooth.condition}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 font-mono font-bold text-blue-700">
                          {tooth.surfaces && tooth.surfaces.length > 0 ? tooth.surfaces.join('') : '—'}
                        </td>
                        <td className="py-2.5 px-3 font-mono">
                          <span className={tooth.periodontalPocketDepthMm && tooth.periodontalPocketDepthMm >= 4 ? 'text-rose-600 font-bold' : 'text-slate-600'}>
                            {tooth.periodontalPocketDepthMm || 2}mm
                          </span>
                          {tooth.bleedingOnProbing && <span className="text-rose-600 font-bold ml-1">🩸</span>}
                        </td>
                        <td className="py-2.5 px-3 text-slate-600 dark:text-slate-400 max-w-xs truncate">
                          {tooth.notes || <span className="text-slate-400 italic">Aucune note</span>}
                        </td>
                        <td className="py-2.5 px-3 text-right">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedToothNumber(tooth.number);
                            }}
                            className="px-2 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-teal-50 text-slate-700 hover:text-teal-700 rounded text-xs font-semibold cursor-pointer"
                          >
                            Éditer
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: DETAILED CLINICAL INSPECTOR & ANNOTATION HUB (4 COLS) */}
        {/* ========================================================================= */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-5 sticky top-24">
            {/* Header: Selected Tooth Info */}
            <div className="flex items-start justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600">
                  Inspecteur & Annotation Clinique
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                  <span>Dent FDI #{selectedToothNumber}</span>
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  {TOOTH_NAMES[selectedToothNumber] || `Dent ${selectedToothNumber}`}
                </p>
              </div>

              <div className="text-right">
                <span className="px-2.5 py-1 rounded-full text-xs font-extrabold capitalize bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-200 border border-teal-300">
                  {selectedToothState.condition}
                </span>
              </div>
            </div>

            {/* 1. Diagnostic / Condition Switcher */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                Diagnostic & État de la dent :
              </label>
              <div className="grid grid-cols-2 gap-1.5 text-xs">
                {(
                  [
                    { id: 'saine', label: 'Saine', color: 'hover:bg-emerald-50 text-emerald-700' },
                    { id: 'carie', label: 'Carie Active', color: 'hover:bg-rose-50 text-rose-700' },
                    { id: 'obturée', label: 'Obturation (Comp.)', color: 'hover:bg-blue-50 text-blue-700' },
                    { id: 'couronne', label: 'Couronne Céram.', color: 'hover:bg-amber-50 text-amber-800' },
                    { id: 'implant', label: 'Implant Titane', color: 'hover:bg-purple-50 text-purple-800' },
                    { id: 'devitalisee', label: 'Dévitalisée (Endo)', color: 'hover:bg-indigo-50 text-indigo-800' },
                    { id: 'extraire', label: 'À Extraire', color: 'hover:bg-red-50 text-red-700' },
                    { id: 'absente', label: 'Absente', color: 'hover:bg-slate-100 text-slate-600' },
                    { id: 'appareil', label: 'Appareil Ortho', color: 'hover:bg-teal-50 text-teal-700' },
                    { id: 'fracture', label: 'Fracture', color: 'hover:bg-rose-100 text-rose-900' }
                  ] as { id: DentalToothCondition; label: string; color: string }[]
                ).map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSetCondition(item.id)}
                    className={`px-2.5 py-1.5 rounded-xl border text-left font-semibold text-xs transition-all cursor-pointer ${
                      selectedToothState.condition === item.id
                        ? 'bg-teal-600 text-white border-teal-600 shadow-xs font-bold'
                        : `bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 ${item.color}`
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Surfaces Anatomy Selector (MODVLP) */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Surfaces & Faces concernées :
                </label>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleApplySurfacePreset(['M', 'O', 'D'])}
                    className="text-[10px] px-1.5 py-0.5 bg-blue-50 text-blue-700 rounded font-mono font-bold hover:bg-blue-100 cursor-pointer"
                    title="Cavité Mésio-Occluso-Distale"
                  >
                    MOD
                  </button>
                  <button
                    onClick={() => handleApplySurfacePreset(['M', 'O'])}
                    className="text-[10px] px-1.5 py-0.5 bg-blue-50 text-blue-700 rounded font-mono font-bold hover:bg-blue-100 cursor-pointer"
                  >
                    MO
                  </button>
                  <button
                    onClick={() => handleApplySurfacePreset(['D', 'O'])}
                    className="text-[10px] px-1.5 py-0.5 bg-blue-50 text-blue-700 rounded font-mono font-bold hover:bg-blue-100 cursor-pointer"
                  >
                    DO
                  </button>
                  <button
                    onClick={() => onUpdateTooth(selectedToothNumber, { surfaces: [] })}
                    className="text-[10px] px-1.5 py-0.5 text-slate-400 hover:text-rose-600 cursor-pointer"
                  >
                    Reset
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-6 gap-1.5">
                {(
                  [
                    { key: 'O', label: 'Occlusal' },
                    { key: 'M', label: 'Mésial' },
                    { key: 'D', label: 'Distal' },
                    { key: 'V', label: 'Vestibulaire' },
                    { key: 'L', label: 'Lingual' },
                    { key: 'P', label: 'Palatin' }
                  ] as { key: DentalToothSurface; label: string }[]
                ).map((surf) => {
                  const isActive = selectedToothState.surfaces?.includes(surf.key);
                  return (
                    <button
                      key={surf.key}
                      onClick={() => handleToggleSurface(selectedToothNumber, surf.key)}
                      className={`h-10 rounded-xl font-mono font-bold text-xs flex flex-col items-center justify-center transition-all border cursor-pointer ${
                        isActive
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs scale-105'
                          : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                      }`}
                      title={`Face ${surf.label}`}
                    >
                      <span>{surf.key}</span>
                      <span className="text-[8px] font-normal opacity-70 leading-none">{surf.label.slice(0, 3)}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Text Clinical Annotations & Notes */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Observation & Note Clinique pour #{selectedToothNumber} :
              </label>

              <textarea
                rows={2}
                value={currentNoteInput}
                onChange={(e) => setCurrentNoteInput(e.target.value)}
                onBlur={handleSaveNote}
                placeholder="Ex: Sensibilité thermique vive, fêlure coronaire, contrôle radio 6 mois..."
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl text-xs border border-slate-200 dark:border-slate-700 focus:outline-hidden focus:ring-2 focus:ring-teal-500"
              />

              {/* Quick tags */}
              <div className="mt-2 flex flex-wrap gap-1">
                {QUICK_CLINICAL_TAGS.slice(0, 5).map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleAddClinicalTag(tag)}
                    className="text-[10px] px-2 py-0.5 bg-slate-100 dark:bg-slate-800 hover:bg-teal-50 hover:text-teal-700 text-slate-600 dark:text-slate-400 rounded-md transition-colors cursor-pointer"
                  >
                    + {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Periodontal Depth & BOP */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                <span>Poche parodontale :</span>
                <span
                  className={`font-mono text-xs px-2 py-0.5 rounded font-extrabold ${
                    (selectedToothState.periodontalPocketDepthMm || 2) >= 5
                      ? 'bg-rose-100 text-rose-800 ring-1 ring-rose-400'
                      : 'bg-teal-100 text-teal-800'
                  }`}
                >
                  {selectedToothState.periodontalPocketDepthMm || 2} mm
                </span>
              </div>

              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={selectedToothState.periodontalPocketDepthMm || 2}
                onChange={(e) =>
                  onUpdateTooth(selectedToothNumber, {
                    periodontalPocketDepthMm: Number(e.target.value)
                  })
                }
                className="w-full accent-teal-600 cursor-pointer"
              />

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={!!selectedToothState.bleedingOnProbing}
                    onChange={(e) =>
                      onUpdateTooth(selectedToothNumber, {
                        bleedingOnProbing: e.target.checked
                      })
                    }
                    className="rounded text-rose-600 focus:ring-rose-500"
                  />
                  <span>Saignement au sondage (BOP)</span>
                </label>

                {/* Mobility */}
                <select
                  value={selectedToothState.mobility || 0}
                  onChange={(e) =>
                    onUpdateTooth(selectedToothNumber, {
                      mobility: Number(e.target.value) as 0 | 1 | 2 | 3
                    })
                  }
                  className="text-[11px] bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1"
                >
                  <option value={0}>Mobilité 0 (Normale)</option>
                  <option value={1}>Mobilité I (1mm)</option>
                  <option value={2}>Mobilité II (&gt;1mm)</option>
                  <option value={3}>Mobilité III (Axiale)</option>
                </select>
              </div>
            </div>

            {/* 5. Quick Act assignment from Moroccan Dental Acts */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Associer un acte dentaire à dent #{selectedToothNumber} :
              </label>

              <div className="relative mb-2">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Rechercher acte (ex: composite, endo, implant...)"
                  value={actSearchInTooth}
                  onChange={(e) => setActSearchInTooth(e.target.value)}
                  className="w-full pl-8 pr-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 rounded-lg text-xs border border-slate-200 dark:border-slate-700 focus:outline-hidden"
                />
              </div>

              <div className="space-y-1 max-h-40 overflow-y-auto pr-1">
                {filteredActsForTooth.map((act) => (
                  <button
                    key={act.code}
                    onClick={() => {
                      if (onAddActToQuote) {
                        onAddActToQuote(act, selectedToothNumber);
                      } else {
                        showToast('Acte sélectionné', `${act.nom} pour dent #${selectedToothNumber}.`);
                      }
                    }}
                    className="w-full flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/70 hover:bg-teal-50 dark:hover:bg-teal-950/40 border border-slate-200 dark:border-slate-700 text-left transition-colors group cursor-pointer"
                  >
                    <div className="truncate pr-2">
                      <p className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-teal-700 truncate">
                        {act.nom}
                      </p>
                      <span className="text-[10px] text-slate-400 font-mono">{act.cotationNgap}</span>
                    </div>
                    <span className="text-xs font-extrabold text-teal-600 font-mono shrink-0">
                      {act.tarifRefDH} DH
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
