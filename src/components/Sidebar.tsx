import React from 'react';
import {
  LayoutDashboard,
  Users,
  Stethoscope,
  Calendar,
  Clock,
  FileText,
  ShieldCheck,
  FolderArchive,
  Pill,
  Wallet,
  BarChart3,
  Settings,
  Lock,
  LifeBuoy,
  X,
  LogOut,
  KeyRound,
  Layers,
  Sparkles,
  Sun,
  Moon
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { NavigationTab } from '../types';
import { WorldMedicalProLogo } from './WorldMedicalProLogo';

interface SidebarProps {
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
  onOpenSpecialtiesModal?: () => void;
}

interface NavItem {
  id: NavigationTab;
  label: string;
  icon: React.ElementType;
  badge?: number | string;
  badgeColor?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isMobileOpen = false,
  onCloseMobile,
  onOpenSpecialtiesModal
}) => {
  const {
    currentTab,
    setCurrentTab,
    waitingRoom,
    appointments,
    currentOrganization,
    currentUser,
    theme,
    toggleTheme,
    logout,
    openCredentialsModal
  } = useApp();

  const waitingCount = waitingRoom.filter((w) => w.statut === 'En attente').length;
  const todayRdvCount = appointments.filter((a) => a.date === '2026-08-25').length;

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
    { id: 'dental', label: 'Espace Dentiste & Actes', icon: Sparkles, badge: 'Dentaire', badgeColor: 'bg-teal-100 text-teal-800 border border-teal-300' },
    { id: 'patients', label: 'Dossiers Patients', icon: Users },
    { id: 'agenda', label: 'Agenda & Rendez-vous', icon: Calendar, badge: todayRdvCount, badgeColor: 'bg-blue-100 text-blue-800' },
    { id: 'waiting-room', label: "Salle d'attente", icon: Clock, badge: waitingCount > 0 ? waitingCount : undefined, badgeColor: 'bg-amber-100 text-amber-800' },
    { id: 'consultation', label: 'Consultations & Actes', icon: Stethoscope },
    { id: 'prescriptions', label: 'Ordonnances & Posologies', icon: FileText },
    { id: 'certificates', label: 'Certificats Médicaux', icon: ShieldCheck },
    { id: 'documents', label: 'Documents & Coffre-Fort', icon: FolderArchive },
    { id: 'medications', label: 'Médicaments (DMP Maroc)', icon: Pill },
    { id: 'finances', label: 'Finances & AMO (DH)', icon: Wallet },
    { id: 'statistics', label: 'Statistiques Cabinet', icon: BarChart3 },
    { id: 'security-compliance', label: 'Sécurité & Loi 09-08', icon: Lock, badge: 'CNDP', badgeColor: 'bg-emerald-50 text-emerald-700 border border-emerald-200' },
    { id: 'settings', label: 'Paramètres Cabinet', icon: Settings },
    { id: 'support', label: 'Support & Télémaintenance', icon: LifeBuoy }
  ];

  const handleNavClick = (id: NavigationTab) => {
    setCurrentTab(id);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {/* Mobile overlay backdrop */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      <aside
        className={`w-64 bg-white border-r border-slate-200/90 flex flex-col h-screen shrink-0 select-none z-50 fixed lg:static top-0 bottom-0 left-0 transition-transform duration-200 ease-in-out pb-12 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <WorldMedicalProLogo showText size="md" subtitle={currentOrganization.speciality || 'Toutes Spécialités'} />

          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 text-slate-400 hover:text-slate-600 rounded-md cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Multi-Specialties Quick Selector Button */}
        {onOpenSpecialtiesModal && (
          <div className="px-3 pt-3">
            <button
              onClick={onOpenSpecialtiesModal}
              className="w-full p-2.5 rounded-2xl bg-gradient-to-r from-blue-50 to-cyan-50/60 border border-blue-200/80 hover:border-blue-300 text-slate-900 flex items-center justify-between transition-all group cursor-pointer shadow-2xs"
            >
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-xs">
                  <Layers className="w-3.5 h-3.5" />
                </div>
                <div className="text-left min-w-0">
                  <p className="text-[11px] font-black text-slate-900 leading-tight truncate">
                    Spécialités Médicales
                  </p>
                  <p className="text-[9px] text-blue-700 font-bold leading-tight">
                    Dentaire, Pédiatrie, Gynéco...
                  </p>
                </div>
              </div>
              <Sparkles className="w-3.5 h-3.5 text-cyan-600 shrink-0 group-hover:rotate-12 transition-transform" />
            </button>
          </div>
        )}

        {/* Main Navigation */}
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              currentTab === item.id ||
              (item.id === 'patients' && currentTab === 'patient-detail');

            return (
              <div
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center justify-between px-3 py-2 rounded-xl font-medium text-xs cursor-pointer transition-colors ${
                  isActive
                    ? 'bg-blue-50/90 text-blue-900 font-black border border-blue-200 shadow-2xs'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Icon
                    className={`w-4 h-4 shrink-0 transition-colors ${
                      isActive ? 'text-blue-600' : 'text-slate-500'
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </div>

                {item.badge !== undefined && (
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold leading-none shrink-0 ${
                      item.badgeColor || 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </div>
            );
          })}
        </nav>

        {/* Active Doctor Profile & Logout Footer */}
        <div className="p-3 mt-auto border-t border-slate-100 space-y-2 bg-slate-50/50">
          {/* Quick Ergonomic Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors cursor-pointer shadow-2xs"
            title="Basculer le mode visuel anti-fatigue"
          >
            <div className="flex items-center gap-2">
              {theme === 'dark' ? (
                <Moon className="w-3.5 h-3.5 text-sky-400" />
              ) : (
                <Sun className="w-3.5 h-3.5 text-amber-500" />
              )}
              <span className="text-[11px]">Mode {theme === 'dark' ? 'Sombre Clinique' : 'Clair Jour'}</span>
            </div>
            <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
              {theme === 'dark' ? 'NUIT' : 'JOUR'}
            </span>
          </button>

          <div
            onClick={openCredentialsModal}
            title="Cliquez pour gérer les accès et mot de passe"
            className="flex items-center gap-2.5 p-2 rounded-xl cursor-pointer bg-white border border-slate-200 hover:border-blue-300 hover:shadow-xs transition-all"
          >
            <WorldMedicalProLogo size="sm" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold text-slate-900 truncate">
                  {currentUser.name}
                </p>
                <KeyRound className="w-3 h-3 text-blue-600 shrink-0" />
              </div>
              <p className="text-[10px] text-blue-700 truncate font-mono">
                {currentUser.email}
              </p>
            </div>
          </div>

          <button
            onClick={() => logout()}
            className="w-full py-1.5 px-3 rounded-lg text-xs font-semibold text-slate-600 hover:text-red-700 hover:bg-red-50 border border-slate-200 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Verrouiller la session</span>
          </button>
        </div>
      </aside>
    </>
  );
};

