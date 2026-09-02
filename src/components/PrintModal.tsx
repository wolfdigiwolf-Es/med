import React from 'react';
import { X, Printer, Download, Check, ShieldCheck, QrCode } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PrintModal: React.FC = () => {
  const { printPreview, closePrintPreview, settings, showToast } = useApp();

  if (!printPreview.isOpen || !printPreview.data) return null;

  const handlePrint = () => {
    window.print();
    showToast('Impression lancée', 'Le document a été envoyé à l’imprimante du cabinet.');
  };

  const handleDownloadPDF = () => {
    showToast(
      'Téléchargement PDF généré',
      `${printPreview.title || 'Document_Medical'}.pdf a été enregistré avec succès.`
    );
  };

  const { type, data } = printPreview;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6 flex flex-col max-h-[92vh]">
        {/* Header Bar */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">{printPreview.title || 'Aperçu du Document Médical'}</h3>
              <p className="text-[11px] text-slate-400">Format certifié et sécurisé SESAM-Vitale / RPPS</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadPDF}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold transition-colors border border-slate-700"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Télécharger PDF</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold transition-colors shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimer</span>
            </button>
            <button
              onClick={closePrintPreview}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document A4 Sheet Simulation */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-slate-100/70 flex justify-center">
          <div
            id="printable-document"
            className="w-full max-w-[210mm] min-h-[260mm] bg-white border border-slate-200 shadow-lg rounded-sm p-10 flex flex-col justify-between text-slate-900 font-sans select-text relative"
          >
            {/* Watermark/Security background pattern */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none text-9xl font-bold tracking-widest uppercase">
              MÉDICAL
            </div>

            {/* Top Medical Header */}
            <div>
              <div className="border-b-2 border-slate-900 pb-4 flex justify-between items-start">
                <div>
                  <h1 className="text-base font-extrabold uppercase tracking-tight text-slate-900">
                    {settings.medecin.civilite} {settings.medecin.prenom} {settings.medecin.nom}
                  </h1>
                  <p className="text-xs font-semibold text-blue-800 mt-0.5">
                    {settings.medecin.specialite}
                  </p>
                  <p className="text-[11px] text-slate-600">
                    Diplômé de la Faculté de Médecine de Paris
                  </p>
                  <div className="text-[11px] font-mono text-slate-500 mt-1 space-y-0.5">
                    <p>N° RPPS : {settings.medecin.numeroRpps} · ADELI : {settings.medecin.numeroAdeli}</p>
                    <p>{settings.medecin.conventionnement}</p>
                  </div>
                </div>

                <div className="text-right text-xs">
                  <p className="font-bold text-slate-900">{settings.cabinet.nom}</p>
                  <p className="text-slate-600">{settings.cabinet.adresse}</p>
                  <p className="text-slate-600">{settings.cabinet.codePostal} {settings.cabinet.ville}</p>
                  <p className="text-slate-600 font-mono mt-1">Tél : {settings.cabinet.telephone}</p>
                  <p className="text-slate-500 text-[10px]">{settings.cabinet.email}</p>
                </div>
              </div>

              {/* Patient and Date Banner */}
              <div className="my-6 p-4 bg-slate-50 border border-slate-200 rounded-lg flex justify-between items-center text-xs">
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold tracking-wider">
                    Patient(e)
                  </span>
                  <span className="text-sm font-bold text-slate-900">
                    {data.patientNomComplet || 'Patient'}
                  </span>
                  {data.patientAge && (
                    <span className="text-slate-500 ml-1.5">({data.patientAge} ans)</span>
                  )}
                </div>

                <div className="text-right">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold tracking-wider">
                    Date et lieu
                  </span>
                  <span className="font-semibold text-slate-800">
                    Fait à {settings.cabinet.ville}, le {data.date || '25/08/2026'}
                  </span>
                </div>
              </div>

              {/* Body Content according to document type */}
              {type === 'prescription' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      PRESCRIPTION MÉDICALE {data.aldConcernee && '— (AFFECTION DE LONGUE DURÉE)'}
                    </h2>
                    <span className="text-[10px] text-slate-400 font-mono">
                      Ref: {data.id || 'ORD-2026'}
                    </span>
                  </div>

                  <div className="space-y-5 pt-2">
                    {data.medicaments && data.medicaments.map((item: any, idx: number) => (
                      <div key={idx} className="border-l-2 border-blue-600 pl-3.5 space-y-1">
                        <div className="flex items-baseline justify-between">
                          <span className="font-bold text-sm text-slate-900">
                            {idx + 1}. {item.medicament} {item.dosage}
                          </span>
                          <span className="text-xs font-semibold text-slate-600">
                            {item.forme}
                          </span>
                        </div>
                        {item.dci && (
                          <p className="text-[11px] text-slate-500 italic">DCI : {item.dci}</p>
                        )}
                        <p className="text-xs font-semibold text-slate-800">
                          {item.posologie} — Pendant {item.duree}
                        </p>
                        {item.instructions && (
                          <p className="text-xs text-slate-600 bg-slate-50 p-1.5 rounded">
                            ℹ️ {item.instructions}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>

                  {data.conseilsHygiene && (
                    <div className="mt-8 pt-4 border-t border-slate-100 text-xs text-slate-600">
                      <p className="font-bold text-slate-800 mb-1">Conseils hygiéno-diététiques :</p>
                      <p className="italic">{data.conseilsHygiene}</p>
                    </div>
                  )}
                </div>
              )}

              {type === 'certificate' && (
                <div className="space-y-6 pt-4">
                  <div className="text-center pb-4 border-b border-slate-100">
                    <h2 className="text-sm font-extrabold uppercase tracking-wide text-slate-900">
                      {data.titre || 'CERTIFICAT MÉDICAL'}
                    </h2>
                  </div>

                  <div className="text-xs leading-relaxed text-slate-800 space-y-4 whitespace-pre-line text-justify font-serif text-[13px]">
                    {data.texteContenu}
                  </div>

                  <p className="text-xs text-slate-500 italic mt-6">
                    Certificat rédigé à la demande de l'intéressé(e) et remis en main propre pour faire valoir ce que de droit.
                  </p>
                </div>
              )}

              {type === 'feuille_soin' && (
                <div className="space-y-4 pt-2">
                  <div className="text-center border-b border-slate-200 pb-2">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                      RÉCAPITULATIF DE PRISE EN CHARGE AMO & MUTUELLE (MAROC)
                    </h2>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="p-3 bg-slate-50 rounded border border-slate-200">
                      <p className="font-bold text-slate-700">Acte médical</p>
                      <p className="text-sm font-bold text-slate-900 mt-1">Consultation Médecine Générale</p>
                      <p className="text-slate-500 mt-0.5">Honoraires : 250 DH</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded border border-slate-200">
                      <p className="font-bold text-slate-700">Régime de Couverture</p>
                      <p className="text-sm font-bold text-emerald-700 mt-1">AMO CNSS / CNOPS : 70% · Mutuelle : 30%</p>
                      <p className="text-slate-500 mt-0.5">Bordereau électronique conforme ANAM</p>
                    </div>
                  </div>
                </div>
              )}

              {type === 'devis_dentaire' && (
                <div className="space-y-5 pt-2">
                  <div className="text-center border-b border-slate-200 pb-3">
                    <h2 className="text-sm font-extrabold uppercase tracking-wide text-slate-900">
                      PROPOSITION DE PLAN DE TRAITEMENT & DEVIS DENTAIRE NORMALISÉ
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5 font-mono">
                      N° Devis : {data.numeroDevis} · Date : {data.date} · Validité : {data.validiteJours || 90} jours
                    </p>
                  </div>

                  {data.notes && (
                    <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-lg text-xs text-blue-900">
                      <span className="font-bold">Indications cliniques :</span> {data.notes}
                    </div>
                  )}

                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="border-b-2 border-slate-300 text-slate-700 bg-slate-50">
                        <th className="py-2 px-2 text-left">Dent (FDI)</th>
                        <th className="py-2 px-2 text-left">Description de l'acte dentaire</th>
                        <th className="py-2 px-2 text-center">Cot. AMO</th>
                        <th className="py-2 px-2 text-right">Tarif (DH)</th>
                        <th className="py-2 px-2 text-right">Remise</th>
                        <th className="py-2 px-2 text-right">Total Net</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {data.items?.map((item: any, idx: number) => (
                        <tr key={idx} className="hover:bg-slate-50/60">
                          <td className="py-2 px-2 font-mono font-bold text-blue-700">
                            {item.toothNumber ? `#${item.toothNumber}` : 'Général'}
                          </td>
                          <td className="py-2 px-2">
                            <p className="font-semibold text-slate-900">{item.actNom}</p>
                            <p className="text-[10px] text-slate-400">{item.categorie}</p>
                          </td>
                          <td className="py-2 px-2 text-center font-mono text-[11px] text-slate-500">
                            {item.cotation || 'HN'}
                          </td>
                          <td className="py-2 px-2 text-right font-mono">{item.tarifUnitaireDH} DH</td>
                          <td className="py-2 px-2 text-right font-mono text-slate-400">
                            {item.remiseDH > 0 ? `-${item.remiseDH} DH` : '—'}
                          </td>
                          <td className="py-2 px-2 text-right font-mono font-bold text-slate-900">
                            {item.totalDH} DH
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Financial Summary */}
                  <div className="flex justify-end pt-3 border-t border-slate-200">
                    <div className="w-72 space-y-1.5 text-xs bg-slate-50 p-3 rounded-lg border border-slate-200">
                      <div className="flex justify-between text-slate-600">
                        <span>Montant Brut Total :</span>
                        <span className="font-mono">{data.totalBrutDH} DH</span>
                      </div>
                      {data.remiseTotaleDH > 0 && (
                        <div className="flex justify-between text-emerald-600 font-medium">
                          <span>Remise accordée :</span>
                          <span className="font-mono">-{data.remiseTotaleDH} DH</span>
                        </div>
                      )}
                      <div className="flex justify-between font-bold text-slate-900 border-t border-slate-200 pt-1 text-sm">
                        <span>Total Net à Régler :</span>
                        <span className="font-mono text-blue-700">{data.totalNetDH} DH</span>
                      </div>
                      {data.totalAmoEstimeDH > 0 && (
                        <div className="flex justify-between text-[11px] text-emerald-700 pt-1 border-t border-dashed border-slate-200">
                          <span>Prise en charge AMO estimée :</span>
                          <span className="font-mono">{data.totalAmoEstimeDH} DH</span>
                        </div>
                      )}
                      {data.resteAChargePatientDH > 0 && (
                        <div className="flex justify-between text-[11px] font-semibold text-slate-700">
                          <span>Reste à charge patient estimé :</span>
                          <span className="font-mono">{data.resteAChargePatientDH} DH</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-[10px] text-slate-500 italic p-2 bg-slate-50/50 rounded border border-slate-100">
                    * Devis préalable conforme aux recommandations de l'Ordre National des Médecins Dentistes du Maroc (ONMD). Le patient reconnaît avoir reçu l'information claire et détaillée sur le traitement proposé.
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Signature & Stamp */}
            <div className="pt-10 border-t border-slate-200 mt-12 flex justify-between items-end">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 border border-slate-200 rounded p-1 bg-slate-50 flex items-center justify-center">
                  <QrCode className="w-12 h-12 text-slate-700" />
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  <p>Ordonnance Numérique e-Prescription</p>
                  <p>ID: {data.id || 'SEC-2026-X9'}</p>
                  <p>Signature électronique valide</p>
                </div>
              </div>

              <div className="text-right space-y-1">
                <p className="text-xs font-bold text-slate-800">
                  {settings.medecin.civilite} {settings.medecin.prenom} {settings.medecin.nom}
                </p>
                <div className="w-36 h-14 border border-dashed border-slate-300 rounded flex items-center justify-center text-[10px] text-slate-400 bg-slate-50/50 italic font-serif">
                  Signature & Tampon
                </div>
              </div>
            </div>

            {/* Legal footer */}
            <div className="text-center text-[9px] text-slate-400 mt-4 border-t border-slate-100 pt-2">
              {settings.documentSettings.piedDePage}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
