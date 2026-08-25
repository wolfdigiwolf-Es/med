import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  User,
  Stethoscope,
  CheckCircle2,
  AlertCircle,
  Play
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Appointment } from '../types';

interface AgendaViewProps {
  onOpenNewAppointment: () => void;
}

export const AgendaView: React.FC<AgendaViewProps> = ({ onOpenNewAppointment }) => {
  const {
    appointments,
    updateAppointmentStatus,
    startConsultationForPatient,
    openPatientDetail
  } = useApp();

  const [viewMode, setViewMode] = useState<'jour' | 'semaine' | 'mois'>('jour');
  const [selectedDate, setSelectedDate] = useState('2026-08-25');

  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00'
  ];

  const weekDays = [
    { date: '2026-08-24', label: 'Lun 24 Août', count: 6 },
    { date: '2026-08-25', label: 'Mar 25 Août (Auj.)', count: 8, isToday: true },
    { date: '2026-08-26', label: 'Mer 26 Août', count: 5 },
    { date: '2026-08-27', label: 'Jeu 27 Août', count: 7 },
    { date: '2026-08-28', label: 'Ven 28 Août', count: 6 },
    { date: '2026-08-29', label: 'Sam 29 Août', count: 3 }
  ];

  const todayAppointments = appointments.filter((a) => a.date === selectedDate);

  const getStatusBadge = (statut: Appointment['statut']) => {
    switch (statut) {
      case 'Terminé':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'En cours':
        return 'bg-blue-600 text-white border-blue-600 animate-pulse';
      case 'Confirmé':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'En attente':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto animate-in fade-in">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
            Agenda Médical
          </h1>
          <p className="text-xs md:text-sm text-slate-500">
            Planning des consultations du Dr Karim Ahmed
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View mode switcher */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl">
            {(['jour', 'semaine', 'mois'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all ${
                  viewMode === mode
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          <button
            onClick={() => onOpenNewAppointment()}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Nouveau rendez-vous</span>
          </button>
        </div>
      </div>

      {/* Date Navigation Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-sm font-bold text-slate-900">Mardi 25 août 2026</span>
          <button className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg">
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => setSelectedDate('2026-08-25')}
            className="text-[11px] font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 px-2 py-0.5 rounded-md ml-2"
          >
            Aujourd'hui
          </button>
        </div>

        {/* Quick summary counters */}
        <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
          <span>{todayAppointments.length} rendez-vous au planning</span>
          <span>•</span>
          <span className="text-emerald-700 font-semibold">
            {todayAppointments.filter((a) => a.statut === 'Terminé').length} terminés
          </span>
          <span>•</span>
          <span className="text-blue-700 font-semibold">
            {todayAppointments.filter((a) => a.statut !== 'Terminé').length} restants
          </span>
        </div>
      </div>

      {/* Main Calendar View: Day View Grid */}
      {viewMode === 'jour' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="divide-y divide-slate-100">
            {timeSlots.map((slot) => {
              const appt = todayAppointments.find((a) => a.heureDebut.startsWith(slot.slice(0, 4)));

              return (
                <div
                  key={slot}
                  className={`flex items-stretch min-h-[58px] hover:bg-slate-50/60 transition-colors group ${
                    slot === '12:00' ? 'bg-slate-50/40' : ''
                  }`}
                >
                  {/* Time column */}
                  <div className="w-20 sm:w-24 p-3 font-mono text-xs font-bold text-slate-500 border-r border-slate-100 shrink-0 text-right pr-4 flex items-center justify-end">
                    {slot}
                  </div>

                  {/* Slot content */}
                  <div className="flex-1 p-2 sm:p-2.5 flex items-center">
                    {slot === '12:00' ? (
                      <div className="w-full text-center text-xs text-slate-400 font-medium py-1">
                        Pause méridienne & Visites à domicile
                      </div>
                    ) : appt ? (
                      <div
                        className={`w-full p-3 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs ${getStatusBadge(
                          appt.statut
                        )}`}
                      >
                        <div className="flex items-start sm:items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-white/80 text-slate-800 flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                            {appt.patientNomComplet[0]}
                          </div>

                          <div>
                            <div className="flex items-center gap-2">
                              <span
                                onClick={() => openPatientDetail(appt.patientId)}
                                className="font-bold text-xs hover:underline cursor-pointer"
                              >
                                {appt.patientNomComplet}
                              </span>
                              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/70">
                                {appt.type}
                              </span>
                            </div>
                            <p className="text-[11px] opacity-90 mt-0.5">{appt.motif}</p>
                          </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                          <span className="text-[10px] font-mono font-bold bg-white/80 px-2 py-1 rounded">
                            {appt.heureDebut} - {appt.heureFin}
                          </span>

                          {appt.statut === 'Terminé' ? (
                            <span className="text-[11px] font-semibold bg-white/90 text-emerald-800 px-2.5 py-1 rounded-lg flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              Fait
                            </span>
                          ) : (
                            <button
                              onClick={() => startConsultationForPatient(appt.patientId, appt.motif)}
                              className="text-xs font-bold bg-white text-slate-900 hover:bg-slate-100 px-3 py-1 rounded-lg shadow-2xs flex items-center gap-1"
                            >
                              <Play className="w-3 h-3 fill-current text-blue-600" />
                              <span>Consulter</span>
                            </button>
                          )}
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => onOpenNewAppointment()}
                        className="w-full h-full py-1 text-left text-slate-300 hover:text-blue-600 text-xs font-medium pl-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Disponible — Cliquer pour planifier</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Week View Grid */}
      {viewMode === 'semaine' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {weekDays.map((day) => (
              <div
                key={day.date}
                onClick={() => {
                  setSelectedDate(day.date);
                  setViewMode('jour');
                }}
                className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                  day.isToday
                    ? 'bg-blue-50/70 border-blue-400 shadow-xs'
                    : 'bg-slate-50/50 border-slate-200 hover:border-slate-300 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-900">{day.label}</span>
                </div>
                <p className="text-lg font-bold text-blue-700">{day.count} RDV</p>
                <p className="text-[11px] text-slate-500 mt-1">8h30 - 18h30</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Month View Grid placeholder */}
      {viewMode === 'mois' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs text-center space-y-4">
          <p className="text-sm font-bold text-slate-900">Vue mensuelle — Août 2026</p>
          <div className="grid grid-cols-7 gap-2 text-xs">
            {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((d) => (
              <div key={d} className="font-bold text-slate-400 py-1">
                {d}
              </div>
            ))}
            {Array.from({ length: 31 }).map((_, idx) => {
              const dayNum = idx + 1;
              const isToday = dayNum === 25;
              return (
                <div
                  key={idx}
                  onClick={() => {
                    setSelectedDate(`2026-08-${String(dayNum).padStart(2, '0')}`);
                    setViewMode('jour');
                  }}
                  className={`p-2.5 rounded-xl border text-center cursor-pointer transition-all ${
                    isToday
                      ? 'bg-blue-600 text-white font-bold shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-blue-50'
                  }`}
                >
                  <span>{dayNum}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
