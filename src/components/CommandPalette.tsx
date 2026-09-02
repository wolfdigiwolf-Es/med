import React, { useState, useEffect } from 'react';
import {
  Search,
  User,
  Stethoscope,
  Calendar,
  FileText,
  Clock,
  Pill,
  Wallet,
  Settings,
  ArrowRight,
  ShieldCheck,
  Lock,
  Moon,
  Sun,
  Sparkles,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CommandPalette: React.FC = () => {
  const {
    isCommandPaletteOpen,
    setIsCommandPaletteOpen,
    patients,
    openPatientDetail,
    setCurrentTab,
    startConsultationForPatient,
    medications,
    theme,
    toggleTheme,
    setTheme
  } = useApp();

  const [query, setQuery] = useState('');

  useEffect(() => {
    if (isCommandPaletteOpen) {
      setQuery('');
    }
  }, [isCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  const filteredPatients = patients.filter(
    (p) =>
      p.nom.toLowerCase().includes(query.toLowerCase()) ||
      p.prenom.toLowerCase().includes(query.toLowerCase()) ||
      p.cin.toLowerCase().includes(query.toLowerCase()) ||
      p.numeroAmo.includes(query) ||
      p.telephone.includes(query)
  );

  const filteredMeds = medications.filter(
    (m) =>
      m.nom.toLowerCase().includes(query.toLowerCase()) ||
      m.dci.toLowerCase().includes(query.toLowerCase())
  );

  const navShortcuts = [
    { label: 'Espace Dentiste & Odontogramme 32 Dents', tab: 'dental' as const, icon: Sparkles },
    { label: 'Tableau de bord', tab: 'dashboard' as const, icon: Stethoscope },
    { label: 'Agenda du jour', tab: 'agenda' as const, icon: Calendar },
    { label: "Salle d'attente", tab: 'waiting-room' as const, icon: Clock },
    { label: 'Base Médicaments (DMP Maroc)', tab: 'medications' as const, icon: Pill },
    { label: 'Finances & Recettes (AMO / Espèces)', tab: 'finances' as const, icon: Wallet },
    { label: 'Certificats médicaux officiels', tab: 'certificates' as const, icon: ShieldCheck },
    { label: 'Sécurité & Protection des données (Loi 09-08)', tab: 'security-compliance' as const, icon: Lock },
    { label: 'Paramètres du cabinet & Praticien', tab: 'settings' as const, icon: Settings },
  ].filter((s) => s.label.toLowerCase().includes(query.toLowerCase()) || (query.toLowerCase().includes('dent') && s.tab === 'dental'));

  const themeMatches = [
    {
      label: theme === 'dark' ? 'Basculer en Mode Jour (Thème Clair)' : 'Basculer en Mode Sombre Clinique (Anti-fatigue oculaire)',
      action: () => toggleTheme(),
      icon: theme === 'dark' ? Sun : Moon,
      badge: theme === 'dark' ? 'Actif: Sombre' : 'Actif: Clair'
    }
  ].filter((t) => 'sombre clair theme dark light mode nuit jour confort'.toLowerCase().includes(query.toLowerCase()) || t.label.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-start justify-center pt-20 p-4 animate-in fade-in">
      <div
        className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input header */}
        <div className="p-3.5 border-b border-slate-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-blue-600 shrink-0" />
          <input
            type="text"
            placeholder="Rechercher patient (Nom, CIN, AMO), médicament DMP, action..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden font-medium"
          />
          <button
            onClick={() => setIsCommandPaletteOpen(false)}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-md cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-3">
          {/* Patients */}
          {filteredPatients.length > 0 && (
            <div>
              <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Patients ({filteredPatients.length})
              </div>
              <div className="space-y-0.5 mt-1">
                {filteredPatients.slice(0, 4).map((p) => (
                  <div
                    key={p.id}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-blue-50 text-slate-700 hover:text-blue-900 transition-colors group cursor-pointer"
                    onClick={() => {
                      openPatientDetail(p.id);
                      setIsCommandPaletteOpen(false);
                    }}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs">
                        {p.prenom[0]}
                        {p.nom[0]}
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-900 group-hover:text-blue-900">
                          {p.prenom} {p.nom}{' '}
                          <span className="font-normal text-slate-400">
                            · {p.age} ans ({p.sexe === 'F' ? 'Femme' : 'Homme'})
                          </span>
                        </p>
                        <p className="text-[11px] text-slate-400 font-mono">
                          CIN: {p.cin} · AMO: {p.organismeAssurance} · {p.telephone}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          startConsultationForPatient(p.id);
                          setIsCommandPaletteOpen(false);
                        }}
                        className="text-[11px] font-semibold bg-blue-600 text-white px-2 py-1 rounded cursor-pointer"
                      >
                        Consulter
                      </button>
                      <ArrowRight className="w-4 h-4 text-blue-600" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Medications */}
          {query.trim().length > 1 && filteredMeds.length > 0 && (
            <div>
              <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Base Médicaments DMP ({filteredMeds.length})
              </div>
              <div className="space-y-0.5 mt-1">
                {filteredMeds.slice(0, 3).map((m) => (
                  <div
                    key={m.id}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700 cursor-pointer"
                    onClick={() => {
                      setCurrentTab('medications');
                      setIsCommandPaletteOpen(false);
                    }}
                  >
                    <div className="flex items-center gap-2.5">
                      <Pill className="w-4 h-4 text-blue-600 shrink-0" />
                      <div>
                        <p className="text-xs font-semibold text-slate-900">
                          {m.nom} {m.dosage}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          {m.dci} · {m.forme} · {m.ppv} DH (Remb. {m.remboursable ? 'Oui' : 'Non'})
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Theme Switcher Quick Actions */}
          {themeMatches.length > 0 && (
            <div>
              <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Thème & Ergonomie Visuelle
              </div>
              <div className="space-y-0.5 mt-1">
                {themeMatches.map((t, idx) => {
                  const Icon = t.icon;
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        t.action();
                        setIsCommandPaletteOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700 text-xs font-medium transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4 text-sky-500" />
                        <span className="font-semibold text-slate-800">{t.label}</span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-50 text-sky-700 border border-sky-200">
                        {t.badge}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Navigation Shortcuts */}
          {navShortcuts.length > 0 && (
            <div>
              <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Navigation rapide & Modules
              </div>
              <div className="space-y-0.5 mt-1">
                {navShortcuts.map((s, idx) => {
                  const Icon = s.icon;
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        setCurrentTab(s.tab);
                        setIsCommandPaletteOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700 text-xs font-medium transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4 text-slate-500" />
                        <span>{s.label}</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
