import React, { useState } from 'react';
import {
  Clock,
  UserCheck,
  Phone,
  Play,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Users,
  Volume2,
  UserPlus
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const WaitingRoomView: React.FC = () => {
  const {
    waitingRoom,
    patients,
    callWaitingPatient,
    updateWaitingPatientStatus,
    removeWaitingPatient,
    addWaitingPatient,
    startConsultationForPatient,
    openPatientDetail,
    showToast
  } = useApp();

  const [selectedPatId, setSelectedPatId] = useState(patients[0]?.id || 'pat-1');
  const [motifInput, setMotifInput] = useState('Consultation de médecine générale');

  const handleAddPatientToQueue = () => {
    const p = patients.find((pat) => pat.id === selectedPatId);
    if (!p) return;

    addWaitingPatient({
      patientId: p.id,
      nomComplet: `${p.prenom} ${p.nom}`,
      heureArrivee: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      tempsAttenteMinutes: 1,
      statut: 'En attente',
      motif: motifInput
    });

    showToast('Patient accueilli', `${p.prenom} ${p.nom} ajouté(e) en salle d'attente.`);
  };

  const waitingCount = waitingRoom.filter((w) => w.statut === 'En attente').length;
  const inConsultationCount = waitingRoom.filter((w) => w.statut === 'En consultation').length;

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
            Salle d'Attente Interactive
          </h1>
          <p className="text-xs md:text-sm text-slate-500">
            Gestion du flux des patients en temps réel et appels au cabinet
          </p>
        </div>

        {/* Quick status counters */}
        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-xl text-xs font-bold text-amber-800 flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-amber-600" />
            <span>{waitingCount} en attente</span>
          </div>
          <div className="px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-xl text-xs font-bold text-blue-800 flex items-center gap-1.5">
            <UserCheck className="w-4 h-4 text-blue-600" />
            <span>{inConsultationCount} en consultation</span>
          </div>
        </div>
      </div>

      {/* Grid: Queue & Quick Add */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Live Queue Table */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-600" />
                <span>Ordre d'arrivée des patients</span>
              </h2>
              <span className="text-[11px] text-slate-400">Actualisé en direct</span>
            </div>

            <div className="divide-y divide-slate-100">
              {waitingRoom.length === 0 ? (
                <div className="p-12 text-center text-slate-400 text-xs">
                  Aucun patient en salle d'attente pour le moment.
                </div>
              ) : (
                waitingRoom.map((patient, index) => {
                  const isWaiting = patient.statut === 'En attente';
                  const isInConsult = patient.statut === 'En consultation';

                  return (
                    <div
                      key={patient.id}
                      className={`p-4 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                        isInConsult
                          ? 'bg-blue-50/50'
                          : isWaiting && patient.tempsAttenteMinutes > 15
                          ? 'bg-amber-50/30'
                          : 'bg-white hover:bg-slate-50/50'
                      }`}
                    >
                      {/* Left: Queue Number, Name, Motif */}
                      <div className="flex items-center gap-3.5">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                            isInConsult
                              ? 'bg-blue-600 text-white shadow-xs'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {index + 1}
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <span
                              onClick={() => openPatientDetail(patient.patientId)}
                              className="font-bold text-xs text-slate-900 hover:text-blue-600 cursor-pointer"
                            >
                              {patient.nomComplet}
                            </span>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                isInConsult
                                  ? 'bg-blue-600 text-white animate-pulse'
                                  : patient.statut === 'Terminé'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-amber-100 text-amber-800'
                              }`}
                            >
                              {patient.statut}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-0.5">{patient.motif}</p>
                        </div>
                      </div>

                      {/* Right: Times & Action Buttons */}
                      <div className="flex items-center gap-3 self-end sm:self-auto">
                        <div className="text-right text-xs">
                          <span className="font-mono text-slate-600 font-bold block">
                            Arrivé : {patient.heureArrivee}
                          </span>
                          <span
                            className={`text-[11px] font-bold ${
                              patient.tempsAttenteMinutes > 20
                                ? 'text-rose-600'
                                : patient.tempsAttenteMinutes > 10
                                ? 'text-amber-600'
                                : 'text-emerald-600'
                            }`}
                          >
                            Attente : {patient.tempsAttenteMinutes} min
                          </span>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-1.5">
                          {isWaiting && (
                            <button
                              onClick={() => callWaitingPatient(patient.id)}
                              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                              <span>Appeler</span>
                            </button>
                          )}

                          {isInConsult && (
                            <button
                              onClick={() => startConsultationForPatient(patient.patientId, patient.motif)}
                              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5"
                            >
                              <Play className="w-3.5 h-3.5 fill-current" />
                              <span>Dossier</span>
                            </button>
                          )}

                          <button
                            onClick={() => removeWaitingPatient(patient.id)}
                            title="Retirer"
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Right 1 Column: Add Patient to Queue Form */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <UserPlus className="w-4 h-4 text-blue-600" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Enregistrer une arrivée
              </h3>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Sélectionner le patient
                </label>
                <select
                  value={selectedPatId}
                  onChange={(e) => setSelectedPatId(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-bold border border-slate-300 rounded-xl bg-white"
                >
                  {patients.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nom} {p.prenom} ({p.age} ans)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Motif ou urgence ressentie
                </label>
                <input
                  type="text"
                  value={motifInput}
                  onChange={(e) => setMotifInput(e.target.value)}
                  placeholder="Ex: Douleur lombaire aiguë, Renouvellement..."
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl"
                />
              </div>

              <button
                type="button"
                onClick={handleAddPatientToQueue}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Ajouter en salle d'attente</span>
              </button>
            </div>
          </div>

          {/* Guidelines Box */}
          <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-2xl text-xs text-blue-950 space-y-2">
            <h4 className="font-bold flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-blue-600" />
              <span>Gestion des priorités</span>
            </h4>
            <p className="text-[11px] leading-relaxed text-blue-900">
              L'affichage au cabinet signale automatiquement les patients ayant plus de 20 minutes d'attente pour optimiser la ponctualité de la patientèle.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
