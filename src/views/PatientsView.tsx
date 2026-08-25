import React, { useState } from 'react';
import {
  Search,
  Plus,
  Filter,
  User,
  Phone,
  Calendar,
  ChevronRight,
  Stethoscope,
  FileText,
  ShieldAlert,
  ArrowUpDown,
  FileSpreadsheet
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface PatientsViewProps {
  onOpenNewPatient: () => void;
}

export const PatientsView: React.FC<PatientsViewProps> = ({ onOpenNewPatient }) => {
  const { patients, openPatientDetail, startConsultationForPatient, setCurrentTab } = useApp();

  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<'Tous' | 'Actif' | 'Chronique' | 'Nouveau'>('Tous');

  const filteredPatients = patients.filter((p) => {
    const matchesSearch =
      p.nom.toLowerCase().includes(search.toLowerCase()) ||
      p.prenom.toLowerCase().includes(search.toLowerCase()) ||
      p.numeroSecu.includes(search) ||
      p.telephone.includes(search);

    if (!matchesSearch) return false;
    if (filterType === 'Tous') return true;
    return p.statut === filterType;
  });

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto animate-in fade-in">
      {/* Header & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
            Répertoire des Patients
          </h1>
          <p className="text-xs md:text-sm text-slate-500">
            {patients.length} dossiers médicaux actifs enregistrés au cabinet
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => onOpenNewPatient()}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Nouveau patient</span>
          </button>
        </div>
      </div>

      {/* Search Bar & Filters */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Rechercher par nom, prénom, N° Sécurité Sociale, téléphone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder:text-slate-400"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {(['Tous', 'Actif', 'Chronique', 'Nouveau'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setFilterType(filter)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  filterType === filter
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {filter} {filter === 'Tous' ? `(${patients.length})` : ''}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Patient Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3 px-4">Patient</th>
                <th className="py-3 px-4">Âge / Sexe</th>
                <th className="py-3 px-4">Contact & Sécu</th>
                <th className="py-3 px-4">Dernière visite</th>
                <th className="py-3 px-4">Prochain RDV</th>
                <th className="py-3 px-4">Statut</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filteredPatients.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    Aucun patient ne correspond à votre recherche.
                  </td>
                </tr>
              ) : (
                filteredPatients.map((patient) => {
                  return (
                    <tr
                      key={patient.id}
                      onClick={() => openPatientDetail(patient.id)}
                      className="hover:bg-blue-50/40 transition-colors cursor-pointer group"
                    >
                      {/* Name & Avatar */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-800 flex items-center justify-center font-bold text-xs group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            {patient.prenom[0]}
                            {patient.nom[0]}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                              <span>{patient.nom} {patient.prenom}</span>
                              {patient.ald && (
                                <span className="text-[10px] px-1.5 py-0.2 rounded font-bold bg-amber-100 text-amber-800" title="Affection de Longue Durée">
                                  ALD
                                </span>
                              )}
                            </p>
                            <p className="text-[11px] text-slate-400 font-normal">
                              {patient.ville} ({patient.codePostal})
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Age & Sex */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <p className="font-semibold text-slate-800">{patient.age} ans</p>
                        <p className="text-[11px] text-slate-400">
                          {patient.sexe === 'F' ? 'Femme' : 'Homme'} · {patient.groupeSanguin}
                        </p>
                      </td>

                      {/* Contact & NIR */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <p className="text-slate-800 font-mono">{patient.telephone}</p>
                        <p className="text-[11px] font-mono text-slate-400">{patient.numeroSecu}</p>
                      </td>

                      {/* Last consultation */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        {patient.derniereConsultation ? (
                          <span className="text-slate-700 font-medium">
                            {patient.derniereConsultation}
                          </span>
                        ) : (
                          <span className="text-slate-400 italic">Première visite</span>
                        )}
                      </td>

                      {/* Next appointment */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        {patient.prochainRdv ? (
                          <span className="text-blue-700 font-semibold bg-blue-50 px-2 py-0.5 rounded-full text-[11px]">
                            {patient.prochainRdv}
                          </span>
                        ) : (
                          <span className="text-slate-400 text-[11px]">Aucun</span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span
                          className={`text-[11px] px-2.5 py-1 rounded-full font-bold ${
                            patient.statut === 'Actif'
                              ? 'bg-emerald-50 text-emerald-700'
                              : patient.statut === 'Chronique'
                              ? 'bg-amber-50 text-amber-700'
                              : 'bg-blue-50 text-blue-700'
                          }`}
                        >
                          {patient.statut}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => startConsultationForPatient(patient.id)}
                            title="Nouvelle consultation"
                            className="p-1.5 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
                          >
                            <Stethoscope className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => openPatientDetail(patient.id)}
                            title="Ouvrir le dossier"
                            className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
