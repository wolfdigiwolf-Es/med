import React, { useState } from 'react';
import {
  Search,
  Plus,
  Bell,
  Volume2,
  VolumeX,
  UserPlus,
  Stethoscope,
  CalendarPlus,
  FilePlus,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Menu
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface HeaderProps {
  onOpenNewPatient: () => void;
  onOpenNewAppointment: () => void;
  onOpenNewDocument?: () => void;
  onOpenMobileMenu?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenNewPatient,
  onOpenNewAppointment,
  onOpenNewDocument,
  onOpenMobileMenu
}) => {
  const {
    currentTab,
    setCurrentTab,
    settings,
    soundEnabled,
    setSoundEnabled,
    setIsCommandPaletteOpen,
    startConsultationForPatient,
    patients,
    waitingRoom
  } = useApp();

  const [isQuickActionsOpen, setIsQuickActionsOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const activeWaiting = waitingRoom.filter((w) => w.statut === 'En attente');

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 sm:px-8 flex items-center justify-between shrink-0 sticky top-0 z-20">
      {/* Left: Greetings & Date */}
      <div className="flex items-center gap-3">
        {onOpenMobileMenu && (
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 text-slate-600 hover:bg-slate-50 rounded-lg"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
        <div>
          <h1 className="text-xl font-semibold text-slate-800 tracking-tight">
            Bonjour, {settings.medecin.civilite} {settings.medecin.nom}
          </h1>
          <p className="text-xs text-slate-500 font-medium">Mardi 25 août 2026</p>
        </div>
      </div>

      {/* Center: Command Search Bar */}
      <div className="flex-1 max-w-md mx-6 hidden md:block">
        <button
          onClick={() => setIsCommandPaletteOpen(true)}
          className="w-full flex items-center justify-between px-3.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-500 text-xs hover:bg-slate-100/80 hover:border-slate-300 transition-all group"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600" />
            <span>Rechercher un patient, ordonnance, médicament...</span>
          </div>
          <div className="flex items-center gap-1 font-mono text-[10px] bg-white text-slate-500 border border-slate-200 px-1.5 py-0.5 rounded shadow-2xs">
            <span>⌘</span>
            <span>K</span>
          </div>
        </button>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        {/* Sound toggle for queue chime */}
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          title={soundEnabled ? 'Sonnerie activée' : 'Sonnerie désactivée'}
          className={`w-9 h-9 rounded-full border flex items-center justify-center text-xs transition-colors ${
            soundEnabled
              ? 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'
              : 'bg-amber-50 border-amber-200 text-amber-600'
          }`}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="w-10 h-10 border border-slate-200 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-50 relative transition-colors"
          >
            <Bell className="w-5 h-5" />
            {activeWaiting.length > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-600 ring-2 ring-white"></span>
            )}
          </button>

          {isNotificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-xl p-3 z-50 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-900">Activité en direct</span>
                <span className="text-[10px] text-blue-600 font-semibold bg-blue-50 px-2 py-0.5 rounded-full">
                  {activeWaiting.length} en attente
                </span>
              </div>
              <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto">
                {activeWaiting.map((w) => (
                  <div key={w.id} className="py-2 flex items-start gap-2.5 text-xs">
                    <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-slate-900">{w.nomComplet}</p>
                      <p className="text-slate-500 text-[11px]">
                        En attente depuis {w.tempsAttenteMinutes} min ({w.motif})
                      </p>
                    </div>
                  </div>
                ))}
                <div className="py-2 flex items-start gap-2.5 text-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-slate-900">Résultat d’analyse reçu</p>
                    <p className="text-slate-500 text-[11px]">Laboratoire Cerballiance - Sophie Martin</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Primary Action Button */}
        <div className="relative">
          <button
            onClick={() => onOpenNewPatient()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Nouveau Patient</span>
          </button>
        </div>
      </div>
    </header>
  );
};
