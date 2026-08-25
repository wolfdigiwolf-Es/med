import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Play,
  CheckCircle2,
  Stethoscope,
  Banknote,
  CreditCard,
  CheckCheck,
  AlertCircle,
  TrendingUp,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PaymentTransaction } from '../types';

interface DashboardViewProps {
  onOpenNewPatient: () => void;
  onOpenNewAppointment: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onOpenNewAppointment
}) => {
  const {
    patients,
    appointments,
    waitingRoom,
    callWaitingPatient,
    startConsultationForPatient,
    openPatientDetail,
    setCurrentTab,
    transactions,
    payAllPendingTodayTransactions
  } = useApp();

  const [isSettlementModalOpen, setIsSettlementModalOpen] = useState(false);
  const [selectedPayMode, setSelectedPayMode] = useState<PaymentTransaction['modePaiement']>('Espèces');

  const totalPatients = patients.length;
  const todayAppointments = appointments.filter((a) => a.date === '2026-08-25');
  const waitingPatients = waitingRoom.filter((w) => w.statut === 'En attente');
  const finishedAppointments = todayAppointments.filter((a) => a.statut === 'Terminé');
  
  const todayPaidTransactions = transactions.filter((t) => t.date === '2026-08-25' && t.statut === 'Payé');
  const todayPendingTransactions = transactions.filter((t) => t.date === '2026-08-25' && t.statut !== 'Payé');
  
  const todayRevenue = todayPaidTransactions.reduce((acc, t) => acc + t.montant, 0);
  const todayPendingAmount = todayPendingTransactions.reduce((acc, t) => acc + t.montant, 0);

  const handlePayEverythingTonight = () => {
    payAllPendingTodayTransactions(selectedPayMode);
    setIsSettlementModalOpen(false);
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 animate-in fade-in">
      {/* Top High-Density Metric Grid */}
      <section className="p-6 md:p-8 pb-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Metric 1: Total Patients */}
        <div
          onClick={() => setCurrentTab('patients')}
          className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs cursor-pointer hover:border-slate-300 transition-colors"
        >
          <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
            Total Patients
          </p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{totalPatients}</p>
          <div className="text-[10px] text-emerald-600 font-bold mt-2">+12 cette semaine</div>
        </div>

        {/* Metric 2: RDV Aujourd'hui */}
        <div
          onClick={() => setCurrentTab('agenda')}
          className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs cursor-pointer hover:border-slate-300 transition-colors"
        >
          <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
            RDV Aujourd'hui
          </p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{todayAppointments.length}</p>
          <div className="text-[10px] text-blue-600 font-bold mt-2">
            {finishedAppointments.length} terminés
          </div>
        </div>

        {/* Metric 3: En attente */}
        <div
          onClick={() => setCurrentTab('waiting-room')}
          className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs cursor-pointer hover:border-slate-300 transition-colors"
        >
          <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
            En attente
          </p>
          <p className="text-2xl font-bold text-blue-600 mt-1">{waitingPatients.length}</p>
          <div className="text-[10px] text-slate-500 font-bold mt-2">Moyenne: 14 min</div>
        </div>

        {/* Metric 4: Recettes du jour en DH */}
        <div
          onClick={() => setCurrentTab('finances')}
          className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs cursor-pointer hover:border-slate-300 transition-colors"
        >
          <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
            Recettes du jour (DH)
          </p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{todayRevenue.toLocaleString('fr-FR')} DH</p>
          <div className="text-[10px] text-emerald-600 font-bold mt-2">
            {todayPendingAmount > 0 ? `${todayPendingAmount} DH en attente` : '100% encaissé'}
          </div>
        </div>

        {/* Metric 5 & 6 (Span 2): Alerte Médicaments */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs col-span-2 flex flex-col justify-between">
          <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
            Alerte Médicaments
          </p>
          <div className="space-y-1.5 mt-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-orange-500 shrink-0"></div>
              <p className="text-xs text-slate-700 font-medium truncate">
                Rupture de stock : Amoxicilline 1g
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0"></div>
              <p className="text-xs text-slate-700 font-medium truncate">
                2 ordonnances ALD à renouveler
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Blackboard Daily Financial & Evening Settle Banner */}
      <section className="px-6 md:px-8 pb-4">
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-4 md:p-5 rounded-2xl border border-slate-800 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start md:items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 text-blue-300 flex items-center justify-center shrink-0">
              <Banknote className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-widest font-extrabold text-blue-400 bg-blue-900/60 px-2 py-0.5 rounded">
                  Marché Marocain · En Dirhams (DH)
                </span>
                <span className="text-xs text-slate-400 font-medium">Tableau du jour (25 Août 2026)</span>
              </div>
              <p className="text-sm font-semibold text-slate-100 mt-1">
                Total encaissé aujourd'hui : <span className="text-emerald-400 font-bold">{todayRevenue.toLocaleString('fr-FR')} DH</span>
                {todayPendingAmount > 0 && (
                  <span className="text-slate-300 ml-2">
                    · Reste à solder ce soir : <span className="text-amber-300 font-bold">{todayPendingAmount.toLocaleString('fr-FR')} DH</span> ({todayPendingTransactions.length} acte{todayPendingTransactions.length > 1 ? 's' : ''})
                  </span>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {todayPendingAmount > 0 ? (
              <button
                onClick={() => setIsSettlementModalOpen(true)}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs rounded-xl shadow-xs transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <CheckCheck className="w-4 h-4" />
                <span>Tout solder ce soir en Dirhams ({todayPendingAmount} DH)</span>
              </button>
            ) : (
              <div className="px-3.5 py-1.5 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 rounded-xl text-xs font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Tous les actes du jour sont soldés en DH</span>
              </div>
            )}
            <button
              onClick={() => setCurrentTab('finances')}
              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
            >
              Livre journal
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Section (2/3 Agenda + 1/3 Waiting & Activity) */}
      <section className="px-6 md:px-8 flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 pb-8">
        {/* Left (2/3): Agenda du jour */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col shadow-xs">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-bold text-slate-800 flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-blue-600" />
              Agenda du jour
            </h2>
            <div className="flex items-center gap-3">
              <button
                onClick={() => onOpenNewAppointment()}
                className="text-xs font-bold text-blue-600 hover:text-blue-700"
              >
                + Ajouter
              </button>
              <button
                onClick={() => setCurrentTab('agenda')}
                className="text-xs font-bold text-blue-600 hover:text-blue-700"
              >
                Voir tout
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 text-[10px] uppercase text-slate-400">
                <tr>
                  <th className="px-4 py-2 font-bold">Heure</th>
                  <th className="px-4 py-2 font-bold">Patient</th>
                  <th className="px-4 py-2 font-bold">Motif</th>
                  <th className="px-4 py-2 font-bold">Statut</th>
                  <th className="px-4 py-2 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-slate-50">
                {todayAppointments.map((appt) => {
                  const isCurrent = appt.statut === 'En cours';
                  const isDone = appt.statut === 'Terminé';

                  return (
                    <tr
                      key={appt.id}
                      className={`hover:bg-slate-50 cursor-pointer transition-colors ${
                        isCurrent ? 'bg-blue-50/30 border-l-4 border-l-blue-600' : ''
                      }`}
                    >
                      <td className="px-4 py-3 font-semibold text-slate-600 text-xs">
                        {appt.heureDebut}
                      </td>
                      <td
                        onClick={() => openPatientDetail(appt.patientId)}
                        className="px-4 py-3 font-bold text-slate-900 hover:text-blue-600"
                      >
                        {appt.patientNomComplet}
                      </td>
                      <td className="px-4 py-3 text-slate-500 text-xs">{appt.motif}</td>
                      <td className="px-4 py-3">
                        {isDone ? (
                          <span className="bg-emerald-50 text-emerald-700 text-[10px] px-2 py-1 rounded-full font-bold">
                            Terminé
                          </span>
                        ) : isCurrent ? (
                          <span className="bg-blue-100 text-blue-700 text-[10px] px-2 py-1 rounded-full font-bold">
                            En cours
                          </span>
                        ) : (
                          <span className="bg-slate-100 text-slate-600 text-[10px] px-2 py-1 rounded-full font-bold">
                            En attente
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right">
                        {isDone ? (
                          <span className="text-[11px] font-semibold text-emerald-700 flex items-center justify-end gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Fait
                          </span>
                        ) : isCurrent ? (
                          <button
                            onClick={() => startConsultationForPatient(appt.patientId, appt.motif)}
                            className="text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 px-2.5 py-1 rounded-md shadow-xs inline-flex items-center gap-1"
                          >
                            <Stethoscope className="w-3 h-3" />
                            Consulter
                          </button>
                        ) : (
                          <button
                            onClick={() => startConsultationForPatient(appt.patientId, appt.motif)}
                            className="text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md transition-colors inline-flex items-center gap-1"
                          >
                            <Play className="w-3 h-3 fill-current" />
                            Démarrer
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right (1/3): Salle d'attente & Activité Mensuelle */}
        <div className="space-y-6 flex flex-col">
          {/* Salle d'attente */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col shadow-xs flex-1">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="font-bold text-slate-800 flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-orange-500" />
                Salle d'attente
              </h2>
              <span className="text-[10px] font-bold bg-amber-50 text-amber-800 px-2 py-0.5 rounded-full border border-amber-200">
                {waitingPatients.length} présents
              </span>
            </div>

            <div className="p-4 space-y-3 overflow-auto max-h-56">
              {waitingPatients.length === 0 ? (
                <div className="text-center text-xs text-slate-400 py-6">
                  Aucun patient en attente
                </div>
              ) : (
                waitingPatients.map((w, idx) => (
                  <div
                    key={w.id}
                    className={`p-3 bg-slate-50 border border-slate-100 rounded-lg flex justify-between items-center ${
                      idx > 0 ? 'opacity-90' : ''
                    }`}
                  >
                    <div>
                      <p className="text-sm font-bold text-slate-900">{w.nomComplet}</p>
                      <p className="text-[10px] text-slate-500">
                        Arrivé: {w.heureArrivee} • {w.tempsAttenteMinutes} min
                      </p>
                    </div>
                    <button
                      onClick={() => callWaitingPatient(w.id)}
                      className="bg-white border border-slate-200 text-blue-600 text-xs px-3 py-1 rounded-md font-bold hover:bg-blue-600 hover:text-white transition-colors cursor-pointer"
                    >
                      Appeler
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Activité Mensuelle */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-slate-800 text-sm">Activité Mensuelle</h2>
              <span className="text-[10px] font-semibold text-slate-400">Total : 2 721 actes</span>
            </div>
            <div className="h-28 flex items-end justify-between px-2 gap-2">
              <div className="w-full bg-slate-100 h-1/2 rounded-t-xs hover:bg-blue-300 transition-colors" title="Mai"></div>
              <div className="w-full bg-slate-100 h-2/3 rounded-t-xs hover:bg-blue-300 transition-colors" title="Juin"></div>
              <div className="w-full bg-slate-100 h-1/3 rounded-t-xs hover:bg-blue-300 transition-colors" title="Juillet"></div>
              <div className="w-full bg-blue-200 h-3/4 rounded-t-xs hover:bg-blue-400 transition-colors" title="Semaine 1"></div>
              <div className="w-full bg-blue-500 h-[90%] rounded-t-xs hover:bg-blue-600 transition-colors" title="Semaine 2"></div>
              <div className="w-full bg-blue-600 h-[95%] rounded-t-xs shadow-xs" title="Semaine 3 (En cours)"></div>
              <div className="w-full bg-blue-400 h-2/3 rounded-t-xs hover:bg-blue-500 transition-colors" title="Semaine 4"></div>
              <div className="w-full bg-slate-200 h-1/2 rounded-t-xs" title="Prévision"></div>
            </div>
            <div className="flex justify-between text-[10px] text-slate-400 mt-4 font-bold uppercase tracking-wider">
              <span>MAI</span>
              <span>JUIN</span>
              <span>JUIL</span>
              <span>AOÛT</span>
            </div>
          </div>
        </div>
      </section>

      {/* Evening Settlement Modal */}
      {isSettlementModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <Banknote className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900">Règlement du soir en Dirhams (DH)</h3>
                  <p className="text-xs text-slate-500">Clôture de caisse & Encaissement des actes du jour</p>
                </div>
              </div>
              <button
                onClick={() => setIsSettlementModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <div className="flex justify-between text-xs text-slate-600">
                <span>Nombre d'actes à solder :</span>
                <span className="font-bold text-slate-900">{todayPendingTransactions.length} consultation(s)</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-200">
                <span>Montant total à encaisser ce soir :</span>
                <span className="text-emerald-700 font-mono text-base">{todayPendingAmount.toLocaleString('fr-FR')} DH</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Mode d'encaissement principal pour ce soir :
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {(['Espèces', 'Carte Bancaire', 'Chèque', 'Tiers Payant AMO'] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setSelectedPayMode(mode)}
                    className={`py-2 px-3 rounded-lg border text-left font-semibold transition-all ${
                      selectedPayMode === mode
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-900 shadow-xs'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setIsSettlementModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handlePayEverythingTonight}
                className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
              >
                <CheckCheck className="w-4 h-4" />
                <span>Valider le paiement ({todayPendingAmount} DH)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
