import React, { useState } from 'react';
import {
  Settings,
  User,
  Building2,
  Clock,
  Coins,
  Save,
  ShieldCheck,
  FileBadge,
  Lock,
  ArrowRight,
  KeyRound
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SettingsView: React.FC = () => {
  const { settings, updateSettings, setCurrentTab, showToast, openCredentialsModal } = useApp();

  const [localSettings, setLocalSettings] = useState(settings);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(localSettings);
    showToast('Paramètres enregistrés', 'Les informations du médecin et du cabinet ont été mises à jour.');
  };

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
            Paramètres du Praticien & du Cabinet
          </h1>
          <p className="text-xs md:text-sm text-slate-500">
            Identifiants légaux marocains (INPE, CNOM, ICE), coordonnées, tarification en Dirhams (DH) et sécurité CNDP
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={openCredentialsModal}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            <KeyRound className="w-4 h-4 text-teal-600" />
            <span>Modifier Login & Mot de Passe</span>
          </button>
          <button
            type="button"
            onClick={() => setCurrentTab('security-compliance')}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Sécurité & Loi 09-08</span>
            <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all active:scale-95 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Enregistrer</span>
          </button>
        </div>
      </div>

      {/* Security & CNDP Quick Banner */}
      <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50/50 border border-blue-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shrink-0">
            <Lock className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-900">
              Module Sécurité & Protection des données (Loi 09-08 · CNDP)
            </p>
            <p className="text-[11px] text-slate-600">
              Gérez les accès RBAC, consultez les journaux d'audit inviolables, téléchargez les exports réglementaires et configurez la politique de confidentialité.
            </p>
          </div>
        </div>
        <button
          onClick={() => setCurrentTab('security-compliance')}
          className="px-3.5 py-1.5 bg-white text-blue-700 font-bold text-xs rounded-lg border border-blue-200 shadow-2xs hover:bg-blue-50 transition-colors whitespace-nowrap cursor-pointer"
        >
          Ouvrir le module Sécurité
        </button>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Card 1: Praticien & Identifiants Médicaux Marocains */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <User className="w-4 h-4 text-blue-600" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Identité du Praticien & N° Ordre (Maroc)
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Civilité & Prénom</label>
              <input
                type="text"
                value={localSettings.medecin.prenom}
                onChange={(e) =>
                  setLocalSettings({
                    ...localSettings,
                    medecin: { ...localSettings.medecin, prenom: e.target.value }
                  })
                }
                className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 font-semibold"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Nom d'exercice</label>
              <input
                type="text"
                value={localSettings.medecin.nom}
                onChange={(e) =>
                  setLocalSettings({
                    ...localSettings,
                    medecin: { ...localSettings.medecin, nom: e.target.value }
                  })
                }
                className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 font-semibold"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Spécialité médicale</label>
              <input
                type="text"
                value={localSettings.medecin.specialite}
                onChange={(e) =>
                  setLocalSettings({
                    ...localSettings,
                    medecin: { ...localSettings.medecin, specialite: e.target.value }
                  })
                }
                className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Numéro INPE (National)</label>
              <input
                type="text"
                value={localSettings.medecin.numeroInpe}
                onChange={(e) =>
                  setLocalSettings({
                    ...localSettings,
                    medecin: { ...localSettings.medecin, numeroInpe: e.target.value }
                  })
                }
                className="w-full px-3 py-2 font-mono border border-slate-200 rounded-lg bg-slate-50 font-bold text-blue-700"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Numéro CNOM (Ordre des Médecins)</label>
              <input
                type="text"
                value={localSettings.medecin.numeroCnom}
                onChange={(e) =>
                  setLocalSettings({
                    ...localSettings,
                    medecin: { ...localSettings.medecin, numeroCnom: e.target.value }
                  })
                }
                className="w-full px-3 py-2 font-mono border border-slate-200 rounded-lg bg-slate-50 font-bold"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Secteur d'exercice & Conventionnement</label>
              <input
                type="text"
                value={localSettings.medecin.secteur}
                onChange={(e) =>
                  setLocalSettings({
                    ...localSettings,
                    medecin: { ...localSettings.medecin, secteur: e.target.value }
                  })
                }
                className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50"
              />
            </div>
          </div>
        </div>

        {/* Card 2: Cabinet & Identifiants Fiscaux Marocains */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Building2 className="w-4 h-4 text-blue-600" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Coordonnées du Cabinet & Identifiants Fiscaux (Maroc)
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Nom de la structure</label>
              <input
                type="text"
                value={localSettings.cabinet.nom}
                onChange={(e) =>
                  setLocalSettings({
                    ...localSettings,
                    cabinet: { ...localSettings.cabinet, nom: e.target.value }
                  })
                }
                className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 font-semibold"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Adresse postale</label>
              <input
                type="text"
                value={localSettings.cabinet.adresse}
                onChange={(e) =>
                  setLocalSettings({
                    ...localSettings,
                    cabinet: { ...localSettings.cabinet, adresse: e.target.value }
                  })
                }
                className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Ville</label>
              <input
                type="text"
                value={localSettings.cabinet.ville}
                onChange={(e) =>
                  setLocalSettings({
                    ...localSettings,
                    cabinet: { ...localSettings.cabinet, ville: e.target.value }
                  })
                }
                className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Téléphone cabinet</label>
              <input
                type="text"
                value={localSettings.cabinet.telephone}
                onChange={(e) =>
                  setLocalSettings({
                    ...localSettings,
                    cabinet: { ...localSettings.cabinet, telephone: e.target.value }
                  })
                }
                className="w-full px-3 py-2 font-mono border border-slate-200 rounded-lg bg-slate-50"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Identifiant Commun de l'Entreprise (ICE)</label>
              <input
                type="text"
                value={localSettings.cabinet.ice}
                onChange={(e) =>
                  setLocalSettings({
                    ...localSettings,
                    cabinet: { ...localSettings.cabinet, ice: e.target.value }
                  })
                }
                className="w-full px-3 py-2 font-mono border border-slate-200 rounded-lg bg-slate-50 font-bold"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Identifiant Fiscal (IF)</label>
              <input
                type="text"
                value={localSettings.cabinet.identifiantFiscal}
                onChange={(e) =>
                  setLocalSettings({
                    ...localSettings,
                    cabinet: { ...localSettings.cabinet, identifiantFiscal: e.target.value }
                  })
                }
                className="w-full px-3 py-2 font-mono border border-slate-200 rounded-lg bg-slate-50 font-bold"
              />
            </div>
          </div>
        </div>

        {/* Card 3: Tarifs en Dirhams (DH) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Coins className="w-4 h-4 text-emerald-600" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Tarification des Actes en Dirhams Marocains (DH)
            </h2>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-950 flex items-center justify-between">
              <span className="font-bold">{localSettings.tarifs.secteur}</span>
              <span className="text-[11px] bg-emerald-200 text-emerald-900 font-bold px-2 py-0.5 rounded">
                Tarifs de Référence AMO CNSS / CNOPS
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Consultation Générale
                </label>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    value={localSettings.tarifs.consultationAdulte}
                    onChange={(e) =>
                      setLocalSettings({
                        ...localSettings,
                        tarifs: { ...localSettings.tarifs, consultationAdulte: Number(e.target.value) }
                      })
                    }
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg font-bold bg-slate-50"
                  />
                  <span className="font-bold text-slate-600">DH</span>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Consultation Enfant
                </label>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    value={localSettings.tarifs.consultationEnfant}
                    onChange={(e) =>
                      setLocalSettings({
                        ...localSettings,
                        tarifs: { ...localSettings.tarifs, consultationEnfant: Number(e.target.value) }
                      })
                    }
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg font-bold bg-slate-50"
                  />
                  <span className="font-bold text-slate-600">DH</span>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Électrocardiogramme (ECG)
                </label>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    value={localSettings.tarifs.ecg}
                    onChange={(e) =>
                      setLocalSettings({
                        ...localSettings,
                        tarifs: { ...localSettings.tarifs, ecg: Number(e.target.value) }
                      })
                    }
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg font-bold bg-slate-50"
                  />
                  <span className="font-bold text-slate-600">DH</span>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Certificat Médical Dédié
                </label>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    value={localSettings.tarifs.certificat}
                    onChange={(e) =>
                      setLocalSettings({
                        ...localSettings,
                        tarifs: { ...localSettings.tarifs, certificat: Number(e.target.value) }
                      })
                    }
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg font-bold bg-slate-50"
                  />
                  <span className="font-bold text-slate-600">DH</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 4: Entête & Pied de page des documents officiels */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <FileBadge className="w-4 h-4 text-indigo-600" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Mentions Légales des Ordonnances & Documents
            </h2>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Pied de page légal (INPE, ICE & Mention Loi 09-08)
              </label>
              <textarea
                rows={3}
                value={localSettings.documentSettings.piedDePage}
                onChange={(e) =>
                  setLocalSettings({
                    ...localSettings,
                    documentSettings: { ...localSettings.documentSettings, piedDePage: e.target.value }
                  })
                }
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-mono text-[11px]"
              />
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600">
              Les ordonnances, certificats et attestations générés incluront automatiquement les mentions ordinales et fiscales prescrites par la législation marocaine.
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
