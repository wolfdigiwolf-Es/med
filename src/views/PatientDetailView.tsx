import React, { useState } from 'react';
import {
  ArrowLeft,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Stethoscope,
  FileText,
  ShieldAlert,
  ShieldCheck,
  FolderArchive,
  Plus,
  Heart,
  Activity,
  Printer,
  Download,
  Clock,
  Pill,
  Lock,
  UserCheck,
  Building,
  CheckCircle2,
  FileCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface PatientDetailViewProps {
  onOpenNewDocument: () => void;
  onOpenNewAppointment: () => void;
}

export const PatientDetailView: React.FC<PatientDetailViewProps> = ({
  onOpenNewDocument,
  onOpenNewAppointment
}) => {
  const {
    selectedPatientId,
    patients,
    setCurrentTab,
    startConsultationForPatient,
    consultations,
    prescriptions,
    documents,
    certificates,
    patientConsents,
    updateConsentStatus,
    addPatientConsent,
    auditLogs,
    createExportJob,
    openPrintPreview,
    settings,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<
    'general' | 'consultations' | 'antecedents' | 'allergies' | 'traitements' | 'documents' | 'cndp'
  >('general');

  const patient = patients.find((p) => p.id === selectedPatientId) || patients[0];

  if (!patient) {
    return (
      <div className="p-8 text-center">
        <p className="text-sm text-slate-500">Aucun patient sélectionné.</p>
        <button
          onClick={() => setCurrentTab('patients')}
          className="mt-3 px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg"
        >
          Retour aux patients
        </button>
      </div>
    );
  }

  const patientConsultations = consultations.filter((c) => c.patientId === patient.id);
  const patientPrescriptions = prescriptions.filter((p) => p.patientId === patient.id);
  const patientDocuments = documents.filter((d) => d.patientId === patient.id);
  const patientCertificates = certificates.filter((c) => c.patientId === patient.id);
  const thisPatientConsents = patientConsents.filter((c) => c.patientId === patient.id);
  const thisPatientAuditLogs = auditLogs.filter((a) => a.patientId === patient.id);

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto animate-in fade-in">
      {/* Back button & Navigation Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentTab('patients')}
          className="flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-2xs transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour à la liste des patients</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-mono">Dossier N° {patient.id.toUpperCase()}</span>
          <span className="text-xs font-mono font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-100">
            CIN : {patient.cin}
          </span>
        </div>
      </div>

      {/* Main Patient Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Identity Info */}
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-extrabold text-xl shadow-sm shadow-blue-500/20 shrink-0">
              {patient.prenom[0]}
              {patient.nom[0]}
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
                  {patient.prenom} {patient.nom}
                </h1>
                <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full">
                  {patient.age} ans · {patient.sexe === 'F' ? 'Femme' : 'Homme'}
                </span>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {patient.organismeAssurance || 'AMO CNSS'}
                </span>
                {patient.ald && (
                  <span className="text-xs font-bold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full">
                    {patient.nomAld || 'ALD / ALC 100%'}
                  </span>
                )}
              </div>

              {/* Patient Meta Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2 text-xs text-slate-600">
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-mono">{patient.telephone}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{patient.ville || 'Casablanca'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-mono">AMO : {patient.numeroAmo}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-rose-500" />
                  <span>Groupe {patient.groupeSanguin}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={() => onOpenNewAppointment()}
              className="px-3 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold border border-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Prendre RDV</span>
            </button>
            <button
              onClick={() => onOpenNewDocument()}
              className="px-3 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold border border-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <FolderArchive className="w-3.5 h-3.5" />
              <span>Document</span>
            </button>
            <button
              onClick={() => startConsultationForPatient(patient.id)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
            >
              <Stethoscope className="w-4 h-4" />
              <span>Nouvelle consultation</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 mt-6 border-b border-slate-200 overflow-x-auto">
          {[
            { id: 'general', label: 'Vue générale' },
            { id: 'consultations', label: `Consultations (${patientConsultations.length})` },
            { id: 'antecedents', label: 'Antécédents' },
            { id: 'allergies', label: `Allergies (${patient.allergies.length})` },
            { id: 'traitements', label: `Traitements (${patient.traitementsActuels.length})` },
            { id: 'documents', label: `Documents (${patientDocuments.length})` },
            { id: 'cndp', label: `Protection Données & CNDP (${thisPatientConsents.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 text-xs font-bold border-b-2 whitespace-nowrap transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab 1: Vue générale */}
      {activeTab === 'general' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column (2/3): Medical Summary & Vitals */}
          <div className="lg:col-span-2 space-y-6">
            {/* Constantes vitales récentes */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-blue-600" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    Constantes physiologiques de référence
                  </h3>
                </div>
                <span className="text-[11px] text-slate-400">Dernière mesure : 10/08/2026</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[11px] text-slate-500 block">Tension Artérielle</span>
                  <span className="text-base font-bold text-slate-900 mt-0.5 block">{patient.taRef || '120/80'}</span>
                  <span className="text-[10px] text-emerald-600 font-semibold">Normotendu</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[11px] text-slate-500 block">Poids & Taille</span>
                  <span className="text-base font-bold text-slate-900 mt-0.5 block">
                    {patient.poidsRef} kg · {patient.tailleRef} cm
                  </span>
                  <span className="text-[10px] text-slate-500">IMC : {(patient.poidsRef! / Math.pow(patient.tailleRef! / 100, 2)).toFixed(1)}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[11px] text-slate-500 block">Fréquence Cardiaque</span>
                  <span className="text-base font-bold text-slate-900 mt-0.5 block">72 bpm</span>
                  <span className="text-[10px] text-emerald-600 font-semibold">Rythme sinusal</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[11px] text-slate-500 block">Saturation SpO2</span>
                  <span className="text-base font-bold text-slate-900 mt-0.5 block">98 %</span>
                  <span className="text-[10px] text-emerald-600 font-semibold">Normale</span>
                </div>
              </div>
            </div>

            {/* Dernières Consultations */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Historique récent des consultations
                </h3>
                <button
                  onClick={() => setActiveTab('consultations')}
                  className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
                >
                  Voir tout ({patientConsultations.length})
                </button>
              </div>

              <div className="space-y-3">
                {patientConsultations.length === 0 ? (
                  <p className="text-xs text-slate-400 py-4 text-center">Aucune consultation enregistrée.</p>
                ) : (
                  patientConsultations.map((c) => (
                    <div key={c.id} className="p-4 bg-slate-50/70 border border-slate-200 rounded-xl space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-slate-900">
                          {c.date} à {c.heure} ({c.type})
                        </span>
                        <span className="text-[10px] font-semibold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                          {c.codeCim10 || 'CIM-10'}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-slate-700">Motif : {c.motif}</p>
                      <p className="text-xs text-slate-600 italic">Diagnostic : {c.diagnostic}</p>
                      <p className="text-[11px] text-slate-500 border-t border-slate-200/60 pt-1.5">
                        Traitement : {c.traitement}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Right Column (1/3): Allergies & Risk Alerts */}
          <div className="space-y-6">
            {/* Allergies Card */}
            <div className="bg-white p-5 rounded-2xl border border-rose-200 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-rose-600">
                <ShieldAlert className="w-4 h-4" />
                <h3 className="text-xs font-bold uppercase tracking-wider">Allergies & Facteurs de Risque</h3>
              </div>
              <div className="space-y-1.5">
                {patient.allergies.map((alg, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 bg-rose-50 border border-rose-200 rounded-lg text-xs font-bold text-rose-900 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-600 shrink-0"></span>
                    <span>{alg}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Traitements actuels */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-800">
                  <Pill className="w-4 h-4 text-blue-600" />
                  <h3 className="text-xs font-bold uppercase tracking-wider">Traitements en cours</h3>
                </div>
              </div>
              <div className="space-y-2">
                {patient.traitementsActuels.map((trait, idx) => (
                  <div key={idx} className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-xs font-medium text-slate-800">
                    {trait}
                  </div>
                ))}
              </div>
            </div>

            {/* Notes médicales générales */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Synthèse & Notes du médecin
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed bg-amber-50/50 p-3 rounded-xl border border-amber-200/60">
                {patient.notesGenerales || 'Aucune note particulière.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Consultations */}
      {activeTab === 'consultations' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Historique complet des consultations</h2>
              <p className="text-xs text-slate-500">Comptes-rendus d’examen clinique et diagnostics</p>
            </div>
            <button
              onClick={() => startConsultationForPatient(patient.id)}
              className="px-3.5 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Nouvelle consultation</span>
            </button>
          </div>

          <div className="space-y-4">
            {patientConsultations.map((c) => (
              <div key={c.id} className="p-5 border border-slate-200 rounded-xl bg-slate-50/50 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-2">
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 rounded bg-blue-600 text-white text-xs font-bold">
                      {c.date}
                    </span>
                    <span className="font-semibold text-xs text-slate-700">
                      {c.heure} ({c.dureeMinutes} min · {c.type})
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-700 bg-white border border-slate-200 px-2 py-0.5 rounded">
                      {c.tarif} DH · {c.reglementStatut} ({c.modePaiement})
                    </span>
                    <button
                      onClick={() =>
                        openPrintPreview('feuille_soin', 'Feuille de Soins AMO CNSS / CNOPS', {
                          patientNomComplet: `${patient.prenom} ${patient.nom}`,
                          cin: patient.cin,
                          numeroAmo: patient.numeroAmo,
                          date: c.date,
                          tarif: c.tarif
                        })
                      }
                      className="p-1 text-slate-500 hover:text-slate-800 cursor-pointer"
                      title="Feuille de soins AMO"
                    >
                      <Printer className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="font-bold text-slate-500 block text-[10px] uppercase">Motif de consultation</span>
                    <p className="font-semibold text-slate-900 mt-0.5">{c.motif}</p>
                  </div>
                  <div>
                    <span className="font-bold text-slate-500 block text-[10px] uppercase">Diagnostic retenu</span>
                    <p className="font-semibold text-blue-700 mt-0.5">{c.diagnostic}</p>
                    {c.codeCim10 && <span className="text-[10px] font-mono text-slate-400">({c.codeCim10})</span>}
                  </div>
                </div>

                {c.examenClinique && (
                  <div className="text-xs bg-white p-3 rounded-lg border border-slate-200">
                    <span className="font-bold text-slate-700 block text-[11px] mb-1">Examen clinique :</span>
                    <p className="text-slate-600 leading-relaxed">{c.examenClinique}</p>
                  </div>
                )}

                {c.traitement && (
                  <div className="text-xs bg-emerald-50/60 p-3 rounded-lg border border-emerald-200 text-emerald-950">
                    <span className="font-bold block text-[11px] mb-1">Traitement & Conduite à tenir :</span>
                    <p className="leading-relaxed">{c.traitement}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Antécédents */}
      {activeTab === 'antecedents' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
          <h2 className="text-sm font-bold text-slate-900">Antécédents personnels et familiaux</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-blue-700">
                Antécédents Médicaux
              </h3>
              <ul className="space-y-2 text-xs text-slate-700">
                {patient.antecedents.medicaux.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-white p-2 rounded border border-slate-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 mt-1.5"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-700">
                Antécédents Chirurgicaux
              </h3>
              <ul className="space-y-2 text-xs text-slate-700">
                {patient.antecedents.chirurgicaux.length > 0 ? (
                  patient.antecedents.chirurgicaux.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-white p-2 rounded border border-slate-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0 mt-1.5"></span>
                      <span>{item}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-xs text-slate-400 italic">Aucun antécédent chirurgical</li>
                )}
              </ul>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-700">
                Antécédents Familiaux
              </h3>
              <ul className="space-y-2 text-xs text-slate-700">
                {patient.antecedents.familiaux.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-white p-2 rounded border border-slate-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0 mt-1.5"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Allergies */}
      {activeTab === 'allergies' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900">Allergies médicamenteuses et environnementales</h2>
          <div className="space-y-3">
            {patient.allergies.map((alg, idx) => (
              <div
                key={idx}
                className="p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-3">
                  <ShieldAlert className="w-5 h-5 text-rose-600" />
                  <div>
                    <p className="font-bold text-rose-900 text-sm">{alg}</p>
                    <p className="text-rose-700 text-[11px]">Risque d'anaphylaxie ou intolérance documentée</p>
                  </div>
                </div>
                <span className="font-bold uppercase text-[10px] bg-rose-200 text-rose-900 px-2 py-0.5 rounded">
                  Alerte Thérapeutique
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Traitements */}
      {activeTab === 'traitements' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900">Traitements chroniques et en cours</h2>
            <button
              onClick={() => setCurrentTab('prescriptions')}
              className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-semibold cursor-pointer"
            >
              + Rédiger ordonnance
            </button>
          </div>
          <div className="space-y-3">
            {patient.traitementsActuels.map((tr, idx) => (
              <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <Pill className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{tr}</p>
                    <p className="text-slate-500 text-[11px]">Traitement régulier sous surveillance</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 6: Documents */}
      {activeTab === 'documents' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900">Documents et examens du patient</h2>
            <button
              onClick={() => onOpenNewDocument()}
              className="px-3.5 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Ajouter un document</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {patientDocuments.length === 0 ? (
              <div className="col-span-2 py-8 text-center text-slate-400 text-xs">
                Aucun document enregistré pour ce patient.
              </div>
            ) : (
              patientDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-start justify-between gap-3 hover:bg-white hover:border-blue-300 transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-xs text-slate-900">{doc.nom}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {doc.categorie} · {doc.date} · {doc.taille}
                      </p>
                      <p className="text-[11px] text-slate-400 italic mt-1">{doc.auteur}</p>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      openPrintPreview('consultation', doc.nom, {
                        patientNomComplet: `${patient.prenom} ${patient.nom}`,
                        date: doc.date,
                        texteContenu: doc.apercuContenu || 'Document médical numérisé conforme.'
                      })
                    }
                    className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Tab 7: PROTECTION DES DONNÉES & CNDP (LOI 09-08) */}
      {activeTab === 'cndp' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Protection des Données & Traçabilité (Articles 4, 7, 8 Loi 09-08)
              </h2>
              <p className="text-xs text-slate-500">
                Consentements exprès du patient, registre d'accès à son dossier et portabilité
              </p>
            </div>
            <button
              onClick={() => {
                createExportJob('Dossier patient individuel (Portabilité Art. 8)', 'PDF');
                showToast(
                  'Dossier exporté',
                  `L'archive PDF chiffrée de ${patient.prenom} ${patient.nom} a été générée.`
                );
              }}
              className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer self-start"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Exporter le dossier patient (Art. 8)</span>
            </button>
          </div>

          {/* Consents table for this patient */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-blue-600" />
              Consentements Recueillis pour ce Patient
            </h3>

            {thisPatientConsents.length === 0 ? (
              <p className="text-xs text-slate-400 py-2">Aucun consentement spécifique enregistré.</p>
            ) : (
              <div className="divide-y divide-slate-100 text-xs">
                {thisPatientConsents.map((cst) => (
                  <div key={cst.id} className="py-3 flex items-center justify-between gap-4">
                    <div>
                      <p className="font-bold text-slate-900">{cst.libelle}</p>
                      <p className="text-[11px] text-slate-500">
                        {cst.baseLegale} · Recueilli le {cst.dateConsentement} ({cst.methodeRecueil})
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          cst.statut === 'Accordé'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}
                      >
                        {cst.statut}
                      </span>
                      {cst.statut === 'Accordé' ? (
                        <button
                          onClick={() => updateConsentStatus(cst.id, 'Révoqué')}
                          className="text-xs font-bold text-rose-600 hover:text-rose-800 cursor-pointer"
                        >
                          Révoquer
                        </button>
                      ) : (
                        <button
                          onClick={() => updateConsentStatus(cst.id, 'Accordé')}
                          className="text-xs font-bold text-emerald-700 hover:text-emerald-800 cursor-pointer"
                        >
                          Réactiver
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Audit Trail for this patient */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-600" />
              Historique des Accès & Consultations de ce Dossier (Art. 7)
            </h3>

            <div className="divide-y divide-slate-100 text-xs font-mono">
              {thisPatientAuditLogs.map((log) => (
                <div key={log.id} className="py-2.5 flex items-center justify-between gap-4">
                  <div className="font-sans">
                    <span className="font-semibold text-slate-900">{log.userName}</span>
                    <span className="text-[11px] text-slate-500 ml-2">({log.details})</span>
                  </div>
                  <div className="text-right text-[11px] text-slate-400 font-mono whitespace-nowrap">
                    {log.timestamp}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
