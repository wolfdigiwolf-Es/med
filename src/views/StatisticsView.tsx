import React from 'react';
import {
  TrendingUp,
  Users,
  Activity,
  Award,
  PieChart,
  Calendar,
  Clock,
  HeartPulse,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const StatisticsView: React.FC = () => {
  const { patients, consultations } = useApp();

  const monthlyConsultations = [
    { month: 'Jan', count: 320 },
    { month: 'Fév', count: 345 },
    { month: 'Mar', count: 380 },
    { month: 'Avr', count: 310 },
    { month: 'Mai', count: 360 },
    { month: 'Juin', count: 375 },
    { month: 'Juil', count: 290 },
    { month: 'Août (en cours)', count: 340, current: true }
  ];

  const topPathologies = [
    { name: 'Pathologies respiratoires aiguës', pct: 28, count: '382 consultations' },
    { name: 'Hypertension artérielle essentielle (HTA)', pct: 22, count: '304 consultations' },
    { name: 'Diabète de type 2 & métabolisme', pct: 16, count: '218 consultations' },
    { name: 'Troubles musculo-squelettiques / Lombalgie', pct: 14, count: '190 consultations' },
    { name: 'Dépression & anxiété réactionnelle', pct: 11, count: '150 consultations' },
    { name: 'Autres motifs & Prévention', pct: 9, count: '124 consultations' }
  ];

  const ageDistribution = [
    { range: '0 - 15 ans', count: '14 %', width: '14%', color: 'bg-indigo-500' },
    { range: '16 - 35 ans', count: '26 %', width: '26%', color: 'bg-blue-500' },
    { range: '36 - 60 ans', count: '38 %', width: '38%', color: 'bg-emerald-500' },
    { range: '60+ ans (Seniors & ALD)', count: '22 %', width: '22%', color: 'bg-amber-500' }
  ];

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto animate-in fade-in">
      {/* Header */}
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
          Statistiques & Indicateurs du Cabinet
        </h1>
        <p className="text-xs md:text-sm text-slate-500">
          Suivi épidémiologique, démographie de la patientèle et indicateurs ROSP
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs font-semibold text-slate-500">Moyenne consultations / jour</span>
          <p className="text-2xl font-bold text-slate-900">22.4</p>
          <p className="text-[11px] text-slate-500">Sur 21 jours travaillés / mois</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs font-semibold text-slate-500">Durée moyenne de consultation</span>
          <p className="text-2xl font-bold text-blue-700">18.5 min</p>
          <p className="text-[11px] text-emerald-700 font-semibold">Examen clinique approfondi</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs font-semibold text-slate-500">Patientèle Médecin Traitant</span>
          <p className="text-2xl font-bold text-slate-900">920 patients</p>
          <p className="text-[11px] text-emerald-700 font-semibold">+18 nouveaux ce trimestre</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs font-semibold text-slate-500">Score Qualité Pratique ROSP</span>
          <p className="text-2xl font-bold text-emerald-700">580 / 600 pts</p>
          <p className="text-[11px] text-emerald-700 font-semibold">Objectif conventionnel atteint</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Consultation Bar Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span>Volume des consultations par mois (2026)</span>
            </h2>
          </div>

          <div className="h-48 flex items-end justify-between gap-2 pt-4 px-2 border-b border-slate-100 pb-2">
            {monthlyConsultations.map((m, idx) => {
              const maxVal = 400;
              const heightPct = (m.count / maxVal) * 100;

              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                  <span className="text-[10px] font-bold text-slate-600 group-hover:text-blue-600">
                    {m.count}
                  </span>
                  <div className="w-full bg-slate-100 rounded-t-lg h-36 flex items-end p-1">
                    <div
                      style={{ height: `${heightPct}%` }}
                      className={`w-full rounded-t-md transition-all duration-500 ${
                        m.current ? 'bg-blue-600' : 'bg-slate-300 group-hover:bg-blue-400'
                      }`}
                    ></div>
                  </div>
                  <span className="text-[10px] font-semibold text-slate-500">{m.month}</span>
                </div>
              );
            })}
          </div>

          <p className="text-[11px] text-slate-500 text-right">
            Total annuel cumulé : <span className="font-bold text-slate-800">2 721 actes</span>
          </p>
        </div>

        {/* Demographics & Age pyramid */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-600" />
              <span>Pyramide des âges & Répartition</span>
            </h2>
            <span className="text-xs font-semibold text-slate-500">54% F · 46% H</span>
          </div>

          <div className="space-y-3 pt-2">
            {ageDistribution.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>{item.range}</span>
                  <span className="font-bold text-slate-900">{item.count}</span>
                </div>
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                  <div style={{ width: item.width }} className={`h-full ${item.color} rounded-full`}></div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-600 mt-2">
            <span className="font-bold text-slate-800">Note démographique :</span> Patientèle équilibrée avec forte prévalence des pathologies chroniques chez les plus de 50 ans.
          </div>
        </div>
      </div>

      {/* Pathologies Récurrentes */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
          <HeartPulse className="w-4 h-4 text-rose-600" />
          <span>Pathologies & Motifs de consultation les plus fréquents</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {topPathologies.map((patho, idx) => (
            <div key={idx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-900">{patho.name}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">{patho.count}</p>
              </div>
              <span className="text-xs font-extrabold text-blue-700 bg-blue-100 px-2.5 py-1 rounded-lg">
                {patho.pct} %
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
