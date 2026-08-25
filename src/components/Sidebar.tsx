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
  Sparkles,
  Award,
  Globe,
  LifeBuoy,
  Server,
  Building2,
  X,
  ChevronRight,
  ShieldAlert
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
  adminOnly?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen = false, onCloseMobile }) => {
  const {
    currentTab,
    setCurrentTab,
    waitingRoom,
    appointments,
    currentOrganization,
    currentUser,
    switchOrganizationAndUser,
    organizations
  } = useApp();

  const waitingCount = waitingRoom.filter((w) => w.statut === 'En attente').length;
  const todayRdvCount = appointments.filter((a) => a.date === '2026-08-25').length;

  const isDrElQyami = currentOrganization.id === 'org-elqyami';
  const isSuperAdmin = currentUser.role === 'WOLF_DIGITAL_SUPERADMIN';

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
    { id: 'patients', label: 'Patients (Dossiers)', icon: Users },
    { id: 'agenda', label: 'Agenda & Rendez-vous', icon: Calendar, badge: todayRdvCount, badgeColor: 'bg-blue-100 text-blue-700' },
    { id: 'waiting-room', label: "Salle d'attente", icon: Clock, badge: waitingCount > 0 ? waitingCount : undefined, badgeColor: 'bg-amber-100 text-amber-800' },
    { id: 'consultation', label: 'Consultations', icon: Stethoscope },
    { id: 'prescriptions', label: 'Ordonnances', icon: FileText },
    { id: 'certificates', label: 'Certificats Médicaux', icon: ShieldCheck },
    { id: 'documents', label: 'Coffre-Fort Privé', icon: FolderArchive },
    { id: 'medications', label: 'Médicaments (DMP)', icon: Pill },
    { id: 'finances', label: 'Finances & AMO (DH)', icon: Wallet },
    { id: 'statistics', label: 'Statistiques Cabinet', icon: BarChart3 },
    { id: 'security-compliance', label: 'Sécurité & Loi 09-08', icon: Lock, badge: 'CNDP', badgeColor: 'bg-emerald-50 text-emerald-700 border border-emerald-200' },
    { id: 'support', label: 'Support & SLA', icon: LifeBuoy },
    { id: 'settings', label: 'Paramètres Cabinet', icon: Settings }
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
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold italic shadow-xs">
              M
            </div>
            <div>
              <span className="font-bold text-base tracking-tight text-slate-900">
                MEDICAL <span className="text-blue-600 font-black">OS</span>
              </span>
              <p className="text-[10px] text-slate-400 font-medium">Par Wolf Digital · 3 000 MAD/an</p>
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

        {/* Prominent SaaS Landing Page & Super Admin Hub Switchers */}
        <div className="p-3 border-b border-slate-100 bg-slate-50/70 space-y-1.5">
          <button
            onClick={() => handleNavClick('landing')}
            className="w-full flex items-center justify-between px-3 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl shadow-xs text-xs font-bold transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-blue-200 group-hover:scale-110 transition-transform" />
              <span>Site Public & Landing SaaS</span>
            </div>
            <span className="text-[9px] bg-white/20 px-1.5 py-0.5 rounded-full font-bold">
              🇲🇦 3 000 DH
            </span>
          </button>

          <button
            onClick={() => handleNavClick('wolf-admin')}
            className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
              currentTab === 'wolf-admin'
                ? 'bg-amber-500 text-slate-900 border-amber-600 shadow-xs'
                : 'bg-slate-900 hover:bg-slate-800 text-amber-300 border-slate-800'
            }`}
          >
            <div className="flex items-center gap-2">
              <Server className="w-3.5 h-3.5 text-amber-400" />
              <span>Cockpit Wolf Digital</span>
            </div>
            <span className="text-[9px] bg-amber-400/20 text-amber-300 font-mono px-1.5 py-0.2 rounded">
              Super Admin
            </span>
          </button>
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

        {/* Active Tenant / Cabinet Card & Fast Tenant Switcher */}
        <div className="p-3 mt-auto border-t border-slate-100 space-y-2 bg-white">
          <div
            onClick={() => handleNavClick('settings')}
            className={`flex items-center gap-2.5 p-2 rounded-xl cursor-pointer border transition-colors ${
              isDrElQyami
                ? 'bg-emerald-50/70 border-emerald-200 hover:bg-emerald-100/60'
                : 'bg-slate-50 border-slate-200 hover:bg-slate-100/80'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full font-bold flex items-center justify-center text-xs shrink-0 ${
                isDrElQyami ? 'bg-emerald-600 text-white' : 'bg-blue-100 text-blue-700'
              }`}
            >
              {isDrElQyami ? 'EQ' : 'KB'}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1">
                <p className="text-xs font-bold text-slate-900 truncate">
                  {currentUser.name}
                </p>
                {isDrElQyami && (
                  <span className="text-[9px] bg-emerald-600 text-white px-1 py-0.2 rounded font-bold">
                    Client #1
                  </span>
                )}
              </div>
              <p className="text-[10px] text-slate-500 truncate">
                {currentOrganization.city} · ICE: {currentOrganization.ice}
              </p>
            </div>
          </div>

          {/* Quick Tenant Switcher Button */}
          <div className="flex items-center gap-1.5 pt-1">
            <button
              onClick={() =>
                switchOrganizationAndUser(
                  isDrElQyami ? 'org-bennani' : 'org-elqyami',
                  isDrElQyami ? 'usr-bennani-owner' : 'usr-elqyami-owner'
                )
              }
              title="Basculer entre les cabinets médicaux isolés"
              className={`w-full py-1.5 px-2 rounded-lg text-[10px] font-bold border transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                isDrElQyami
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                  : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200'
              }`}
            >
              <Award className="w-3 h-3 text-emerald-600" />
              <span>
                {isDrElQyami
                  ? 'Basculer vers Dr Bennani (Casablanca)'
                  : 'Charger Dr El Qyami (Agadir)'}
              </span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
