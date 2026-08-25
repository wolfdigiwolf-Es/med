import React, { useState } from 'react';
import {
  TrendingUp,
  CreditCard,
  Banknote,
  FileCheck,
  AlertCircle,
  Download,
  Send,
  CheckCircle2,
  Calendar,
  Filter,
  CheckCheck,
  ShieldCheck,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PaymentTransaction } from '../types';

export const FinancesView: React.FC = () => {
  const { transactions, paySingleTransaction, payAllPendingTodayTransactions, showToast } = useApp();

  const [filterMode, setFilterMode] = useState<string>('Tous');
  const [filterStatut, setFilterStatut] = useState<string>('Tous');
  const [isEveningSettleOpen, setIsEveningSettleOpen] = useState(false);
  const [settlePayMode, setSettlePayMode] = useState<PaymentTransaction['modePaiement']>('Espèces');

  const today = '2026-08-25';
  const todayTransactions = transactions.filter((t) => t.date === today);
  const todayPending = todayTransactions.filter((t) => t.statut !== 'Payé');
  const todayPendingAmount = todayPending.reduce((acc, t) => acc + t.montant, 0);

  const totalMois = transactions.reduce((acc, t) => acc + (t.statut === 'Payé' ? t.montant : 0), 0);
  const totalImpayes = transactions
    .filter((t) => t.statut === 'Impayé' || t.statut === 'En attente')
    .reduce((acc, t) => acc + t.montant, 0);

  const totalCB = transactions.filter((t) => (t.modePaiement === 'Carte Bancaire' || (t.modePaiement as string) === 'CB') && t.statut === 'Payé').reduce((acc, t) => acc + t.montant, 0);
  const totalEspeces = transactions.filter((t) => t.modePaiement === 'Espèces' && t.statut === 'Payé').reduce((acc, t) => acc + t.montant, 0);
  const totalCheque = transactions.filter((t) => t.modePaiement === 'Chèque' && t.statut === 'Payé').reduce((acc, t) => acc + t.montant, 0);
  const totalAMO = transactions.filter((t) => t.modePaiement === 'Tiers Payant AMO' || (t.modePaiement as string) === 'Tiers Payant CPAM').reduce((acc, t) => acc + (t.statut === 'Payé' ? t.montant : 0), 0);

  const handleTeletransmitAMO = () => {
    showToast(
      'Télétransmission AMO (CNSS & CNOPS) réussie',
      'Lot de bordereaux électroniques #AMO-2026-0825 télétransmis vers les portails CNSS / CNOPS avec accusé de réception conforme.'
    );
  };

  const handleExportAccounting = () => {
    showToast(
      'Export comptable marocain généré',
      'Fichier journal_recettes_maroc_août_2026.csv téléchargé pour votre expert-comptable / Déclaration Fiscale DGI.'
    );
  };

  const handleConfirmEveningSettlement = () => {
    payAllPendingTodayTransactions(settlePayMode);
    setIsEveningSettleOpen(false);
  };

  const filteredTransactions = transactions.filter((t) => {
    if (filterMode !== 'Tous') {
      if (filterMode === 'Carte Bancaire' && (t.modePaiement === 'Carte Bancaire' || (t.modePaiement as string) === 'CB')) {
        // match
      } else if (filterMode === 'Tiers Payant AMO' && (t.modePaiement === 'Tiers Payant AMO' || (t.modePaiement as string) === 'Tiers Payant CPAM')) {
        // match
      } else if (t.modePaiement !== filterMode) {
        return false;
      }
    }
    if (filterStatut !== 'Tous' && t.statut !== filterStatut) return false;
    return true;
  });

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase tracking-widest font-extrabold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
              Marché Marocain · En Dirhams (DH)
            </span>
            <span className="text-xs text-slate-500 font-medium">Cabinet Médical Libéral</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
            Comptabilité Médicale & Gestion des Honoraires (DH)
          </h1>
          <p className="text-xs md:text-sm text-slate-500">
            Suivi des encaissements en Dirhams, télétransmission AMO (CNSS & CNOPS), mutuelles et clôture journalière
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportAccounting}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Journal Recettes / CSV (DGI)</span>
          </button>
          <button
            onClick={handleTeletransmitAMO}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all active:scale-95 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Télétransmettre Lot AMO</span>
          </button>
        </div>
      </div>

      {/* Evening Settle Banner for Moroccan Market */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-5 rounded-2xl border border-slate-800 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start md:items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 flex items-center justify-center shrink-0">
            <Banknote className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white">Clôture de Caisse & Règlements du Soir (DH)</h3>
            <p className="text-xs text-slate-300 mt-0.5">
              {todayPending.length > 0 ? (
                <>
                  Il reste <span className="text-amber-300 font-bold">{todayPendingAmount.toLocaleString('fr-FR')} DH</span> en attente d'encaissement ({todayPending.length} consultation(s) du 25/08/2026).
                </>
              ) : (
                <span className="text-emerald-300 font-medium">
                  Tous les actes et consultations du jour ont été entièrement réglés en Dirhams (DH).
                </span>
              )}
            </p>
          </div>
        </div>

        <div>
          {todayPending.length > 0 ? (
            <button
              onClick={() => setIsEveningSettleOpen(true)}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs rounded-xl shadow-xs transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <CheckCheck className="w-4 h-4" />
              <span>Régler tout ce soir en Dirhams ({todayPendingAmount} DH)</span>
            </button>
          ) : (
            <div className="px-3.5 py-1.5 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 rounded-xl text-xs font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Caisse du jour équilibrée</span>
            </div>
          )}
        </div>
      </div>

      {/* KPI Cards in DH */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs font-semibold text-slate-500">Recettes perçues (Mois en cours)</span>
          <p className="text-2xl font-bold text-slate-900 tracking-tight">{totalMois.toLocaleString('fr-FR')} DH</p>
          <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +8% par rapport au mois précédent
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs font-semibold text-slate-500">Tiers-payant AMO (CNSS & CNOPS)</span>
          <p className="text-2xl font-bold text-blue-700 tracking-tight">{totalAMO.toLocaleString('fr-FR')} DH</p>
          <p className="text-[11px] text-slate-500">Prises en charge ALD & Règlements directs</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs font-semibold text-slate-500">Reste à recouvrer / Impayés</span>
          <p className="text-2xl font-bold text-rose-700 tracking-tight">{totalImpayes.toLocaleString('fr-FR')} DH</p>
          <p className="text-[11px] text-rose-700 font-semibold">
            {todayPending.length > 0 ? `${todayPending.length} acte(s) en attente aujourd'hui` : 'Aucun impayé bloquant'}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs font-semibold text-slate-500">Taux de Bordereaux AMO validés</span>
          <p className="text-2xl font-bold text-slate-900 tracking-tight">98.4 %</p>
          <p className="text-[11px] text-emerald-700 font-semibold">Conforme télétransmission CNSS/CNOPS</p>
        </div>
      </div>

      {/* Ventilation Modes de Paiement en DH */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">
          Ventilation des encaissements par mode de règlement (Dirhams DH)
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-xs text-slate-500 flex items-center gap-1">
              <CreditCard className="w-3.5 h-3.5 text-blue-600" />
              Carte Bancaire (CMI)
            </span>
            <p className="text-base font-bold text-slate-900 mt-1">{totalCB.toLocaleString('fr-FR')} DH</p>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-xs text-slate-500 flex items-center gap-1">
              <Banknote className="w-3.5 h-3.5 text-emerald-600" />
              Espèces (DH)
            </span>
            <p className="text-base font-bold text-slate-900 mt-1">{totalEspeces.toLocaleString('fr-FR')} DH</p>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-xs text-slate-500 flex items-center gap-1">
              <FileCheck className="w-3.5 h-3.5 text-indigo-600" />
              Chèques bancaires
            </span>
            <p className="text-base font-bold text-slate-900 mt-1">{totalCheque.toLocaleString('fr-FR')} DH</p>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-xs text-slate-500 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
              Tiers Payant AMO / Mutuelle
            </span>
            <p className="text-base font-bold text-slate-900 mt-1">{totalAMO.toLocaleString('fr-FR')} DH</p>
          </div>
        </div>
      </div>

      {/* Transaction Table in DH */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            Livre journal des recettes & honoraires ({filteredTransactions.length} écritures en DH)
          </h2>

          <div className="flex items-center gap-2">
            <select
              value={filterMode}
              onChange={(e) => setFilterMode(e.target.value)}
              className="text-xs px-2.5 py-1.5 border border-slate-200 rounded-lg bg-slate-50 font-medium"
            >
              <option value="Tous">Tous les modes</option>
              <option value="Espèces">Espèces</option>
              <option value="Carte Bancaire">Carte Bancaire (CMI)</option>
              <option value="Chèque">Chèque</option>
              <option value="Tiers Payant AMO">Tiers Payant AMO</option>
            </select>

            <select
              value={filterStatut}
              onChange={(e) => setFilterStatut(e.target.value)}
              className="text-xs px-2.5 py-1.5 border border-slate-200 rounded-lg bg-slate-50 font-medium"
            >
              <option value="Tous">Tous les statuts</option>
              <option value="Payé">Payé</option>
              <option value="En attente">En attente</option>
              <option value="Impayé">Impayé</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Patient</th>
                <th className="py-3 px-4">Acte médical</th>
                <th className="py-3 px-4">Mode règlement</th>
                <th className="py-3 px-4">Montant (DH)</th>
                <th className="py-3 px-4">Statut</th>
                <th className="py-3 px-4 text-right">Action / Règlements</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filteredTransactions.map((tx) => {
                const isPaid = tx.statut === 'Payé';
                const actName = tx.typeActe || (tx as any).acte || 'Consultation de médecine générale';

                return (
                  <tr key={tx.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-4 font-mono text-slate-500">{tx.date}</td>
                    <td className="py-3 px-4 font-bold text-slate-900">{tx.patientNomComplet}</td>
                    <td className="py-3 px-4">
                      <span className="font-semibold text-slate-800">{actName}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1 text-slate-700 font-medium">
                        {tx.modePaiement}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-slate-900 text-sm">
                      {tx.montant.toLocaleString('fr-FR')} DH
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                          isPaid
                            ? 'bg-emerald-100 text-emerald-800'
                            : tx.statut === 'En attente'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {tx.statut}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      {isPaid ? (
                        <span className="text-[11px] text-emerald-700 font-semibold inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Encaissé
                        </span>
                      ) : (
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => paySingleTransaction(tx.id, 'Espèces')}
                            className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[10px] font-bold transition-all active:scale-95 cursor-pointer"
                          >
                            Encaisser (DH)
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Evening Settlement Modal in Finances */}
      {isEveningSettleOpen && (
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
                onClick={() => setIsEveningSettleOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <div className="flex justify-between text-xs text-slate-600">
                <span>Nombre d'actes à solder :</span>
                <span className="font-bold text-slate-900">{todayPending.length} consultation(s)</span>
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
                    onClick={() => setSettlePayMode(mode)}
                    className={`py-2 px-3 rounded-lg border text-left font-semibold transition-all ${
                      settlePayMode === mode
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
                onClick={() => setIsEveningSettleOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleConfirmEveningSettlement}
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
