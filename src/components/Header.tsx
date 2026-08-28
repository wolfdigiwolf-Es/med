import React, { useState } from 'react';
import {
  Search,
  Plus,
  Bell,
  Volume2,
  VolumeX,
  ShieldCheck,
  Clock,
  Menu,
  Building2,
  Lock,
  RefreshCw,
  LogOut,
  Settings,
  ChevronDown,
  User,
  KeyRound,
  Layers,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { WorldMedicalProLogo } from './WorldMedicalProLogo';

interface HeaderProps {
  onOpenNewPatient: () => void;
  onOpenNewAppointment: () => void;
  onOpenNewDocument?: () => void;
  onOpenMobileMenu?: () => void;
  onOpenSpecialtiesModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenNewPatient,
  onOpenNewAppointment,
  onOpenMobileMenu,
  onOpenSpecialtiesModal
}) => {
  const {
    setCurrentTab,
    soundEnabled,
    setSoundEnabled,
    setIsCommandPaletteOpen,
    currentOrganization,
    currentUser,
    sessionMinutesRemaining,
    extendSession,
    waitingRoom,
    logout,
    openCredentialsModal
  } = useApp();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const activeWaiting = waitingRoom.filter((w) => w.statut === 'En attente');

  return (
    <header className="h-16 bg-white border-b border-slate-200/90 px-4 sm:px-6 flex items-center justify-between shrink-0 sticky top-0 z-20 shadow-xs">
      {/* Left: Organization & Active User Identity */}
      <div className="flex items-center gap-3">
        {onOpenMobileMenu && (
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 text-slate-600 hover:bg-slate-50 rounded-lg cursor-pointer"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <div className="flex items-center gap-3">
          <WorldMedicalProLogo size="md" />
          <div className="hidden sm:block min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-slate-900 truncate max-w-[240px]">
                {currentOrganization.name}
              </span>
              <span className="text-[10px] bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded-full border border-blue-200">
                {currentOrganization.speciality || 'Médical'}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">
              {currentOrganization.city} · {currentUser.name}
            </p>
          </div>
        </div>
      </div>

      {/* Center: Command Palette Trigger */}
      <div className="flex-1 max-w-md mx-4 hidden md:block">
        <button
          onClick={() => setIsCommandPaletteOpen(true)}
          className="w-full flex items-center justify-between px-3.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-500 text-xs hover:bg-slate-100 hover:border-slate-300 transition-all group cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600" />
            <span>Rechercher patient, ordonnance, vaccin, acte...</span>
          </div>
          <div className="flex items-center gap-1 font-mono text-[10px] bg-white text-slate-500 border border-slate-200 px-1.5 py-0.5 rounded shadow-2xs">
            <span>⌘</span>
            <span>K</span>
          </div>
        </button>
      </div>

      {/* Right Actions: Session, Sound, Notifications, New Patient, Profile Menu */}
      <div className="flex items-center gap-2 sm:gap-2.5">
        {/* Specialties Switcher Button */}
        {onOpenSpecialtiesModal && (
          <button
            onClick={onOpenSpecialtiesModal}
            title="Catalogue des spécialités médicales"
            className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 bg-blue-50/70 hover:bg-blue-100/80 text-blue-800 border border-blue-200 rounded-xl text-xs font-bold transition-all cursor-pointer"
          >
            <Layers className="w-3.5 h-3.5 text-blue-600" />
            <span>Spécialités</span>
          </button>
        )}

        {/* Session Inactivity Countdown (Loi 09-08) */}
        <div
          onClick={extendSession}
          title="Session sécurisée active (Loi 09-08). Cliquez pour renouveler 30 min."
          className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-mono text-slate-600 cursor-pointer transition-colors"
        >
          <Lock className="w-3 h-3 text-emerald-600" />
          <span>{sessionMinutesRemaining} min</span>
          <RefreshCw className="w-2.5 h-2.5 text-slate-400 hover:rotate-180 transition-transform" />
        </div>

        {/* Quick Credentials Modal Shortcut */}
        <button
          onClick={openCredentialsModal}
          title="Gérer les identifiants et le mot de passe de connexion"
          className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300/80 rounded-xl text-xs font-bold transition-all cursor-pointer"
        >
          <KeyRound className="w-3.5 h-3.5 text-blue-600" />
          <span className="hidden md:inline">Mes Accès</span>
        </button>

        {/* Sound toggle for queue chime */}
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          title={soundEnabled ? 'Sonnerie de file activée' : 'Sonnerie désactivée'}
          className={`w-8 h-8 rounded-xl border flex items-center justify-center text-xs transition-colors cursor-pointer ${
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
            className="w-8 h-8 border border-slate-200 rounded-xl flex items-center justify-center text-slate-500 hover:bg-slate-50 relative transition-colors cursor-pointer"
          >
            <Bell className="w-4 h-4" />
            {activeWaiting.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600 ring-2 ring-white"></span>
            )}
          </button>

          {isNotificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl p-3 z-50 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-800">Notifications & Alertes</span>
                <span className="text-[10px] text-blue-600 font-bold">{activeWaiting.length} en attente</span>
              </div>
              <div className="py-2 space-y-2 max-h-60 overflow-y-auto">
                {activeWaiting.length > 0 ? (
                  activeWaiting.map((p) => (
                    <div key={p.id} className="p-2 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                      <p className="font-bold text-slate-800">{p.nomPatient}</p>
                      <p className="text-[10px] text-slate-500">Motif : {p.motif} · Arrivé à {p.heureArrivee}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400 text-center py-3">Aucune notification en attente</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center gap-1.5 p-1 pl-1.5 sm:px-2 rounded-xl hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
          >
            <WorldMedicalProLogo size="sm" />
            <ChevronDown className="w-3 h-3 text-slate-400 hidden sm:block" />
          </button>

          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 z-50 animate-in fade-in zoom-in-95">
              <div className="p-2 border-b border-slate-100">
                <p className="text-xs font-bold text-slate-900">{currentUser.name}</p>
                <p className="text-[11px] text-slate-500">{currentUser.roleLabel}</p>
                <p className="text-[10px] text-blue-700 font-mono mt-0.5">{currentUser.email}</p>
                <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-bold mt-1">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Session CNDP Active</span>
                </div>
              </div>

              <div className="py-1 space-y-0.5 text-xs">
                <button
                  onClick={() => {
                    setIsUserMenuOpen(false);
                    openCredentialsModal();
                  }}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 text-blue-700 hover:bg-blue-50 rounded-lg font-bold transition-colors cursor-pointer"
                >
                  <KeyRound className="w-3.5 h-3.5 text-blue-600" />
                  <span>Modifier mes Accès & Mot de Passe</span>
                </button>

                <button
                  onClick={() => {
                    setCurrentTab('settings');
                    setIsUserMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 text-slate-700 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
                >
                  <Settings className="w-3.5 h-3.5 text-slate-400" />
                  <span>Paramètres du Cabinet</span>
                </button>

                <button
                  onClick={() => {
                    setCurrentTab('security-compliance');
                    setIsUserMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 text-slate-700 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Sécurité & Loi 09-08</span>
                </button>
              </div>

              <div className="pt-1 border-t border-slate-100">
                <button
                  onClick={() => {
                    setIsUserMenuOpen(false);
                    logout();
                  }}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 text-red-600 hover:bg-red-50 rounded-lg font-semibold text-xs transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5 text-red-500" />
                  <span>Verrouiller / Déconnexion</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};


