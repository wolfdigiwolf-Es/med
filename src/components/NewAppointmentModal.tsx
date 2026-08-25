import React, { useState } from 'react';
import { X, CalendarPlus, Clock, User } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Appointment } from '../types';

interface NewAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPatientId?: string;
}

export const NewAppointmentModal: React.FC<NewAppointmentModalProps> = ({
  isOpen,
  onClose,
  defaultPatientId
}) => {
  const { patients, addAppointment, addWaitingPatient } = useApp();

  const [patientId, setPatientId] = useState(defaultPatientId || patients[0]?.id || '');
  const [date, setDate] = useState('2026-08-25');
  const [heureDebut, setHeureDebut] = useState('11:30');
  const [motif, setMotif] = useState('Consultation de médecine générale');
  const [type, setType] = useState<Appointment['type']>('Consultation');
  const [addToWaitingRoomNow, setAddToWaitingRoomNow] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedPatient = patients.find((p) => p.id === patientId);
    if (!selectedPatient) return;

    // Calculate end time (+20 mins)
    const [h, m] = heureDebut.split(':').map(Number);
    const endMins = m + 25;
    const endH = endMins >= 60 ? h + 1 : h;
    const finalEndM = endMins >= 60 ? endMins - 60 : endMins;
    const heureFin = `${String(endH).padStart(2, '0')}:${String(finalEndM).padStart(2, '0')}`;

    addAppointment({
      patientId: selectedPatient.id,
      patientNomComplet: `${selectedPatient.prenom} ${selectedPatient.nom}`,
      date,
      heureDebut,
      heureFin,
      motif,
      type,
      statut: 'Confirmé'
    });

    if (addToWaitingRoomNow && date === '2026-08-25') {
      addWaitingPatient({
        patientId: selectedPatient.id,
        nomComplet: `${selectedPatient.prenom} ${selectedPatient.nom}`,
        age: selectedPatient.age,
        heureArrivee: heureDebut,
        tempsAttenteMinutes: 0,
        motif,
        avecRdv: true,
        statut: 'En attente'
      });
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <CalendarPlus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">Programmer un rendez-vous</h3>
              <p className="text-xs text-slate-500">Agenda du Dr Karim Ahmed</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Patient *</label>
            <select
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white"
            >
              {patients.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nom} {p.prenom} ({p.age} ans) — {p.numeroSecu}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Heure de début</label>
              <input
                type="time"
                value={heureDebut}
                onChange={(e) => setHeureDebut(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Type de consultation</label>
            <div className="grid grid-cols-3 gap-2">
              {(['Consultation', 'Contrôle', 'Urgence', 'Vaccination', 'Téléconsultation'] as Appointment['type'][]).map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => setType(t)}
                  className={`py-1.5 px-2 text-xs rounded-lg font-medium border text-center transition-all ${
                    type === t
                      ? 'bg-indigo-50 border-indigo-500 text-indigo-700 font-bold'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Motif de consultation</label>
            <input
              type="text"
              value={motif}
              onChange={(e) => setMotif(e.target.value)}
              placeholder="Ex: Renouvellement traitement, Douleurs articulaires..."
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="pt-2">
            <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer bg-slate-50 p-2.5 rounded-lg border border-slate-200">
              <input
                type="checkbox"
                checked={addToWaitingRoomNow}
                onChange={(e) => setAddToWaitingRoomNow(e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded"
              />
              <span>Le patient est déjà arrivé (Ajouter en salle d’attente)</span>
            </label>
          </div>

          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs"
            >
              Enregistrer le rendez-vous
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
