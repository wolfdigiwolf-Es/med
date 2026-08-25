import React, { useState } from 'react';
import {
  Pill,
  Search,
  ShieldAlert,
  Plus,
  ArrowRight,
  Info,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const MedicationsView: React.FC = () => {
  const { medications, setCurrentTab, showToast } = useApp();

  const [search, setSearch] = useState('');
  const [selectedClass, setSelectedClass] = useState('Toutes');

  const classes = ['Toutes', 'Antalgique / Antipyrétique', 'Antibiotique', 'AINS', 'Cardiovasculaire', 'Pneumologie'];

  const filteredMeds = medications.filter((med) => {
    const matchesSearch =
      med.nom.toLowerCase().includes(search.toLowerCase()) ||
      med.dci.toLowerCase().includes(search.toLowerCase()) ||
      med.classe.toLowerCase().includes(search.toLowerCase()) ||
      med.indications.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;
    if (selectedClass === 'Toutes') return true;
    return med.classe.includes(selectedClass);
  });

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
            Base Médicamenteuse & Thérapeutique (Vidal / BCB)
          </h1>
          <p className="text-xs md:text-sm text-slate-500">
            DCI, posologies de référence, vigilances et contre-indications
          </p>
        </div>

        <button
          onClick={() => setCurrentTab('prescriptions')}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all active:scale-95 self-start sm:self-auto"
        >
          <FileText className="w-4 h-4" />
          <span>Rédiger une ordonnance</span>
        </button>
      </div>

      {/* Search & Class Filter */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Rechercher par DCI (ex: Paracétamol), nom commercial (ex: Doliprane), classe..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {classes.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedClass(c)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedClass === c
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Medications List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredMeds.map((med) => (
          <div
            key={med.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-blue-300 transition-all space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-slate-900">{med.nom}</h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
                      {med.dosage}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">DCI : {med.dci}</p>
                </div>

                <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-semibold">
                  {med.forme}
                </span>
              </div>

              <div className="space-y-1.5 text-xs pt-1">
                <div>
                  <span className="font-semibold text-slate-500 text-[10px] uppercase">Classe :</span>
                  <p className="text-slate-800 font-medium">{med.classe}</p>
                </div>

                <div>
                  <span className="font-semibold text-slate-500 text-[10px] uppercase">Indications :</span>
                  <p className="text-slate-700">{med.indications}</p>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="font-semibold text-slate-500 text-[10px] uppercase block">
                    Posologie usuelle adulte :
                  </span>
                  <p className="text-slate-800 font-medium">{med.posologieHabituelle}</p>
                </div>

                {med.contreIndications && (
                  <div className="bg-rose-50/60 p-2.5 rounded-xl border border-rose-200/60 text-rose-900">
                    <span className="font-bold text-[10px] uppercase flex items-center gap-1 text-rose-700">
                      <ShieldAlert className="w-3.5 h-3.5" />
                      Contre-indications & Vigilances :
                    </span>
                    <p className="text-[11px] mt-0.5">{med.contreIndications}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-emerald-700 font-semibold">Base de données VIDAL 2026</span>

              <button
                onClick={() => {
                  setCurrentTab('prescriptions');
                  showToast('Prêt à prescrire', `Sélectionnez le patient pour prescrire ${med.nom}.`);
                }}
                className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold rounded-lg text-xs transition-colors flex items-center gap-1"
              >
                <span>Prescrire</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
