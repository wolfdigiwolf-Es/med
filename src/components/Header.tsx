import React, { useState } from 'react';
import {
  Search,
  Plus,
  Bell,
  Volume2,
  VolumeX,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Menu,
  Globe,
  Award,
  Building2,
  ChevronDown,
  Lock,
  RefreshCw,
  Server,
  UserCheck
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
    soundEnabled,
    setSoundEnabled,
    setIsCommandPaletteOpen,
    currentOrganization,
    currentUser,
    organizations,
    switchOrganizationAndUser,
    sessionMinutesRemaining,
    extendSession,
    openRegisterModal,
    waitingRoom
  } = useApp();

  const [isTenantMenuOpen, setIsTenantMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const activeWaiting = waitingRoom.filter((w) => w.statut === 'En attente');
  const isDrElQyami = currentOrganization.id === 'org-elqyami';

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between shrink-0 sticky top-0 z-20">
      {/* Left: Organization & Active User */}
      <div className="flex items-center gap-3">
        {onOpenMobileMenu && (
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 text-slate-600 hover:bg-slate-50 rounded-lg cursor-pointer"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        {/* Tenant Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsTenantMenuOpen(!isTenantMenuOpen)}
            className="flex items-center gap-2 p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl hover:bg-slate-100 border border-slate-200 text-left transition-colors cursor-pointer"
          >
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                isDrElQyami
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'bg-blue-600 text-white shadow-2xs'
              }`}
            >
              <Building2 className="w-4 h-4" />
            </div>
            <div className="hidden sm:block min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-slate-900 truncate max-w-[200px]">
                  {currentOrganization.name}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </div>
              <p className="text-[10px] text-slate-500 font-medium">
                {currentOrganization.city} · 3 000 MAD/an
              </p>
            </div>
          </button>

          {isTenantMenuOpen && (
            <div className="absolute left-0 mt-2 w-72 bg-white border border-slate-200 rounded-xl shadow-xl p-2 z-50 animate-in fade-in zoom-in-95">
              <div className="px-2 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Basculer d'Organisation (Multi-Tenant)
              </div>
              <div className="space-y-1">
                {organizations.map((org) => {
                  const active = org.id === currentOrganization.id;
                  return (
                    <button
                      key={org.id}
                      onClick={() => {
                        switchOrganizationAndUser(org.id);
                        setIsTenantMenuOpen(false);
                      }}
                      className={`w-full text-left p-2 rounded-lg text-xs flex items-center justify-between transition-colors cursor-pointer ${
                        active
                          ? 'bg-blue-50 text-blue-700 font-bold'
                          : 'hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="truncate font-semibold">{org.name}</div>
                        <div className="text-[10px] text-slate-400">
                          {org.city} · ICE: {org.ice}
                        </div>
                      </div>
                      {org.id === 'org-elqyami' && (
                        <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded shrink-0">
                          Client #1
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="mt-2 pt-2 border-t border-slate-100 space-y-1">
                <button
                  onClick={() => {
                    openRegisterModal('doctor');
                    setIsTenantMenuOpen(false);
                  }}
                  className="w-full text-left p-2 rounded-lg text-xs bg-blue-50 text-blue-800 font-bold flex items-center gap-2 hover:bg-blue-100 cursor-pointer"
                >
                  <Building2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>+ Créer un Nouveau Cabinet (Médecin)</span>
                </button>

                <button
                  onClick={() => {
                    openRegisterModal('secretary');
                    setIsTenantMenuOpen(false);
                  }}
                  className="w-full text-left p-2 rounded-lg text-xs bg-indigo-50 text-indigo-800 font-bold flex items-center gap-2 hover:bg-indigo-100 cursor-pointer"
                >
                  <UserCheck className="w-3.5 h-3.5 text-indigo-600" />
                  <span>+ Inscrire une Secrétaire Médicale</span>
                </button>

                <button
                  onClick={() => {
                    setCurrentTab('wolf-admin');
                    setIsTenantMenuOpen(false);
                  }}
                  className="w-full text-left p-2 rounded-lg text-xs bg-slate-900 text-amber-300 font-bold flex items-center gap-2 hover:bg-slate-800 cursor-pointer"
                >
                  <Server className="w-3.5 h-3.5 text-amber-400" />
                  <span>Ouvrir Cockpit Wolf Digital</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Center: Command Palette Trigger */}
      <div className="flex-1 max-w-md mx-4 hidden md:block">
        <button
          onClick={() => setIsCommandPaletteOpen(true)}
          className="w-full flex items-center justify-between px-3.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-500 text-xs hover:bg-slate-100/80 hover:border-slate-300 transition-all group cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600" />
            <span>Rechercher patient, ordonnance, médicament...</span>
          </div>
          <div className="flex items-center gap-1 font-mono text-[10px] bg-white text-slate-500 border border-slate-200 px-1.5 py-0.5 rounded shadow-2xs">
            <span>⌘</span>
            <span>K</span>
          </div>
        </button>
      </div>

      {/* Right Actions: Session, Sound, Notifications, New Patient */}
      <div className="flex items-center gap-2.5">
        {/* Session Inactivity Countdown */}
        <div
          onClick={extendSession}
          title="Session sécurisée active (Loi 09-08). Cliquez pour renouveler pour 30 min."
          className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-xs font-mono text-slate-600 cursor-pointer transition-colors"
        >
          <Lock className="w-3 h-3 text-emerald-600" />
          <span>{sessionMinutesRemaining} min</span>
          <RefreshCw className="w-2.5 h-2.5 text-slate-400 hover:rotate-180 transition-transform" />
        </div>

        {/* Public SaaS Landing Page switcher */}
        <button
          onClick={() => setCurrentTab('landing')}
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border border-blue-200 text-blue-800 text-xs font-bold rounded-lg transition-colors cursor-pointer"
        >
          <Globe className="w-3.5 h-3.5 text-blue-600" />
          <span>Site SaaS</span>
        </button>

        {/* Sound toggle for queue chime */}
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          title={soundEnabled ? 'Sonnerie activée' : 'Sonnerie désactivée'}
          className={`w-8 h-8 rounded-lg border flex items-center justify-center text-xs transition-colors cursor-pointer ${
            soundEnabled
              ? 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'
              : 'bg-amber-50 border-amber-200 text-amber-600'
          }`}
        >
          {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
        </button>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="w-8 h-8 border border-slate-200 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-50 relative transition-colors cursor-pointer"
          >
            <Bell className="w-4 h-4" />
            {activeWaiting.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600 ring-2 ring-white"></span>
            )}
          </button>

          {isNotificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-xl p-3 z-50 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-900">Activité du cabinet</span>
                <span className="text-[10px] text-blue-600 font-semibold bg-blue-50 px-2 py-0.5 rounded-full">
                  {activeWaiting.length} en attente
                </span>
              </div>
              <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto">
                {activeWaiting.length === 0 ? (
                  <div className="py-4 text-center text-xs text-slate-400">
                    Salle d'attente vide pour le moment
                  </div>
                ) : (
                  activeWaiting.map((w) => (
                    <div key={w.id} className="py-2 flex items-start gap-2.5 text-xs">
                      <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-slate-900">{w.nomComplet}</p>
                        <p className="text-slate-500 text-[11px]">
                          Attente {w.tempsAttenteMinutes} min ({w.motif})
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Primary Action Button */}
        <button
          onClick={() => onOpenNewPatient()}
          className="bg-blue-600 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-700 shadow-2xs flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Nouveau Patient</span>
        </button>
      </div>
    </header>
  );
};
