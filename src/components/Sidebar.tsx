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
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { NavigationTab } from '../types';

interface SidebarProps {
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

interface NavItem {
  id: NavigationTab;
  label: string;
  icon: React.ElementType;
  badge?: number | string;
  badgeColor?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen = false, onCloseMobile }) => {
  const { currentTab, setCurrentTab, waitingRoom, appointments, settings } = useApp();

  const waitingCount = waitingRoom.filter((w) => w.statut === 'En attente').length;
  const todayRdvCount = appointments.filter((a) => a.date === '2026-08-25').length;

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
    { id: 'patients', label: 'Patients', icon: Users },
    { id: 'agenda', label: 'Agenda', icon: Calendar, badge: todayRdvCount, badgeColor: 'bg-blue-100 text-blue-700' },
    { id: 'waiting-room', label: "Salle d'attente", icon: Clock, badge: waitingCount > 0 ? waitingCount : undefined, badgeColor: 'bg-amber-100 text-amber-800' },
    { id: 'consultation', label: 'Consultations', icon: Stethoscope },
    { id: 'prescriptions', label: 'Ordonnances', icon: FileText },
    { id: 'certificates', label: 'Certificats', icon: ShieldCheck },
    { id: 'documents', label: 'Documents', icon: FolderArchive },
    { id: 'medications', label: 'Médicaments (DMP)', icon: Pill },
    { id: 'finances', label: 'Finances & AMO', icon: Wallet },
    { id: 'statistics', label: 'Statistiques', icon: BarChart3 },
    { id: 'security-compliance', label: 'Sécurité & Données', icon: Lock, badge: 'Loi 09-08', badgeColor: 'bg-emerald-50 text-emerald-700 border border-emerald-200' },
    { id: 'settings', label: 'Paramètres Cabinet', icon: Settings },
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
        className={`w-64 bg-white border-r border-slate-200 flex flex-col h-screen shrink-0 select-none z-50 fixed lg:static top-0 bottom-0 left-0 transition-transform duration-200 ease-in-out ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold italic shadow-xs">
              M
            </div>
            <div>
              <span className="font-bold text-base tracking-tight text-slate-900">
                MediPro <span className="text-blue-600 font-extrabold">Maroc</span>
              </span>
              <p className="text-[10px] text-slate-400 font-medium">Cabinet Médical Libéral</p>
            </div>
          </div>

          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 text-slate-400 hover:text-slate-600 rounded-md cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

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
                className={`flex items-center justify-between px-3 py-2 rounded-lg font-medium text-xs cursor-pointer transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 font-semibold'
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

        {/* Bottom Footer & Doctor Profile */}
        <div className="p-3 mt-auto border-t border-slate-100 space-y-2">
          <div
            onClick={() => handleNavClick('settings')}
            className="flex items-center gap-2.5 bg-slate-50 p-2 rounded-lg cursor-pointer hover:bg-slate-100/80 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs shrink-0">
              {settings.medecin.prenom[0]}
              {settings.medecin.nom[0]}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-slate-900 truncate">
                {settings.medecin.civilite} {settings.medecin.prenom} {settings.medecin.nom}
              </p>
              <p className="text-[10px] text-slate-500 truncate">INPE : {settings.medecin.numeroInpe}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
