import React, { useState } from 'react';
import {
  ShieldAlert,
  Server,
  Database,
  Lock,
  Layers,
  Activity,
  DollarSign,
  Users,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Search,
  ChevronRight,
  HardDrive,
  Cpu,
  Key,
  ShieldCheck,
  Send,
  MessageSquare,
  Sparkles,
  Award,
  Clock,
  Building2,
  FileCode,
  ArrowUpRight,
  ExternalLink,
  EyeOff
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Organization, SubscriptionStatus } from '../types';

export const WolfAdminView: React.FC = () => {
  const {
    organizations,
    currentOrganization,
    switchOrganizationAndUser,
    renewSubscription,
    supportTickets,
    addSupportTicketMessage,
    wolfMetrics,
    showToast,
    currentUser
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | SubscriptionStatus>('ALL');
  const [selectedTicketId, setSelectedTicketId] = useState<string>(supportTickets[0]?.id || '');
  const [replyMessage, setReplyMessage] = useState('');

  const filteredOrganizations = organizations.filter((org) => {
    const matchesSearch =
      org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.ice.includes(searchQuery);
    const matchesStatus = statusFilter === 'ALL' || org.subscriptionStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const selectedTicket = supportTickets.find((t) => t.id === selectedTicketId) || supportTickets[0];

  const handleSendTicketReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyMessage.trim() || !selectedTicket) return;
    addSupportTicketMessage(selectedTicket.id, replyMessage.trim());
    setReplyMessage('');
    showToast('Réponse envoyée au cabinet', `Message transmis à ${selectedTicket.organizationName}.`);
  };

  return (
    <div className="space-y-6">
      {/* SuperAdmin Brand Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
                <Server className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold tracking-tight text-white">
                    Wolf Digital · Cockpit SaaS & Super Admin
                  </h1>
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded-full border border-amber-500/30">
                    Console Technique & ARR
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Supervision multi-tenant de la flotte des cabinets médicaux du Maroc (3 000 MAD / an / cabinet)
                </p>
              </div>
            </div>
          </div>

          {/* Strict Zero Clinical Access Security Badge */}
          <div className="flex items-center gap-3 bg-slate-800/80 border border-emerald-500/30 rounded-xl px-4 py-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
              <EyeOff className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-emerald-400">Cloisonnement RLS & Secret Médical</span>
                <span className="text-[9px] bg-emerald-950 text-emerald-300 font-bold px-1.5 py-0.2 rounded border border-emerald-500/30">
                  Loi 09-08
                </span>
              </div>
              <p className="text-[11px] text-slate-300">
                Accès administrateur strictement limité à l'infrastructure. Zéro visibilité sur les dossiers patients (PHI).
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Global SaaS Financial & Technical Metrics (ARR, MRR, Uptime) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">ARR (Revenu Récurrent Annuel)</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900">
              {wolfMetrics.arrTotalMAD.toLocaleString('fr-FR')} <span className="text-sm font-bold text-slate-500">MAD / an</span>
            </div>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-500">
              <span className="font-semibold text-emerald-600">3 000 MAD / cabinet</span>
              <span>· MRR : {wolfMetrics.mrrEquivalentMAD.toLocaleString('fr-FR')} MAD/m</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Cabinets Actifs & Déploiements</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900">
              {wolfMetrics.totalTenants} <span className="text-sm font-bold text-slate-500">cabinets</span>
            </div>
            <div className="flex items-center gap-2 mt-1 text-xs">
              <span className="text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.2 rounded">
                {wolfMetrics.activePaidTenants} payants
              </span>
              <span className="text-blue-700 font-semibold bg-blue-50 px-1.5 py-0.2 rounded">
                {wolfMetrics.trialTenants} en essai
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Disponibilité SLA & Erreurs</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900">
              {wolfMetrics.uptimePercentage}% <span className="text-sm font-bold text-emerald-600">SLA</span>
            </div>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-500">
              <span className="text-slate-600 font-medium">Taux d'erreur: {wolfMetrics.errorRatePercentage}%</span>
              <span>· {wolfMetrics.activeDatabaseConnections} connexions</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Stockage Coffre-Fort Privé</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <HardDrive className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900">
              {wolfMetrics.totalStorageUsedGb} <span className="text-sm font-bold text-slate-500">Go chiffrés</span>
            </div>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-500">
              <span className="font-semibold text-emerald-600">AES-256-GCM</span>
              <span>· {wolfMetrics.rlsPoliciesEnforced} politiques RLS</span>
            </div>
          </div>
        </div>
      </div>

      {/* Multi-Tenant SaaS Organizations Fleet */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-600" />
              Répertoire des Cabinets Médicaux (Tenants Isolés)
            </h2>
            <p className="text-xs text-slate-500">
              Gestion de chaque organisation client avec tarif unifié de 3 000 MAD / an
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Rechercher cabinet, ICE, ville..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="py-1.5 px-3 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ALL">Tous les statuts</option>
              <option value="active">Actif (Payé)</option>
              <option value="trial">Essai gratuit</option>
              <option value="past_due">En retard</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Cabinet / Praticien</th>
                <th className="py-3 px-4">Identifiants Maroc</th>
                <th className="py-3 px-4">Abonnement & Tarif</th>
                <th className="py-3 px-4">Période de Validité</th>
                <th className="py-3 px-4">Stockage Privé</th>
                <th className="py-3 px-4">Sauvegarde & RLS</th>
                <th className="py-3 px-4 text-right">Actions Super Admin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOrganizations.map((org) => {
                const isCurrent = org.id === currentOrganization.id;
                const isElQyami = org.id === 'org-elqyami';

                return (
                  <tr
                    key={org.id}
                    className={`hover:bg-slate-50/80 transition-colors ${
                      isCurrent ? 'bg-blue-50/40' : ''
                    }`}
                  >
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                            isElQyami
                              ? 'bg-emerald-600 text-white shadow-sm'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {org.name.includes('Dr') ? org.name.split('Dr')[1]?.trim()[0] || 'C' : 'C'}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-slate-900">{org.name}</span>
                            {isElQyami && (
                              <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded border border-emerald-300">
                                Premier Client
                              </span>
                            )}
                            {isCurrent && (
                              <span className="text-[9px] bg-blue-100 text-blue-800 font-bold px-1.5 py-0.2 rounded border border-blue-300">
                                Espace Actif
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-500">{org.speciality} · {org.city}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1 text-[11px] font-mono text-slate-800">
                          <span className="text-slate-400 font-sans text-[10px]">ICE :</span>
                          <span className="font-bold">{org.ice}</span>
                        </div>
                        <div className="flex items-center gap-1 text-[10px] text-slate-500 font-mono">
                          <span>INPE : {org.inpe}</span>
                          <span>· CNOM : {org.cnom}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-black text-slate-900">3 000 MAD</span>
                          <span className="text-[10px] text-slate-500 font-medium">/ an</span>
                        </div>
                        <span
                          className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full mt-0.5 ${
                            org.subscriptionStatus === 'active'
                              ? 'bg-emerald-100 text-emerald-800'
                              : org.subscriptionStatus === 'trial'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                          {org.subscriptionStatus === 'active' ? 'Licence Active' : 'Période d’essai'}
                        </span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="text-[11px] text-slate-600">
                        <div>Du {org.subscriptionStart}</div>
                        <div className="font-semibold text-slate-800">Au {org.subscriptionEnd}</div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[10px] text-slate-600">
                          <span>{org.storageUsedMb} Mo</span>
                          <span>/ {org.storageMaxMb} Mo</span>
                        </div>
                        <div className="w-24 bg-slate-200 rounded-full h-1.5 overflow-hidden">
                          <div
                            className="bg-blue-600 h-full rounded-full"
                            style={{ width: `${(org.storageUsedMb / org.storageMaxMb) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1 text-emerald-700 font-semibold text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Chiffré AES-256</span>
                        </div>
                        <p className="text-[10px] text-slate-400 truncate max-w-[140px]">
                          {org.lastBackupDate}
                        </p>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => renewSubscription(org.id)}
                          className="px-2.5 py-1 text-[11px] font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg shadow-2xs transition-colors cursor-pointer"
                        >
                          Renouveler (3 000 DH)
                        </button>
                        <button
                          onClick={() => switchOrganizationAndUser(org.id)}
                          className="px-2.5 py-1 text-[11px] font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-2xs transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <span>Basculer</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Support & Tickets Management System */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ticket List */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden lg:col-span-1 flex flex-col">
          <div className="p-4 border-b border-slate-200 bg-slate-50/70">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-blue-600" />
              Demandes & Support Cabinets
            </h3>
            <p className="text-xs text-slate-500">Tickets transmis par les médecins clients</p>
          </div>

          <div className="divide-y divide-slate-100 overflow-y-auto max-h-96 flex-1">
            {supportTickets.map((ticket) => {
              const isSelected = ticket.id === selectedTicketId;
              return (
                <div
                  key={ticket.id}
                  onClick={() => setSelectedTicketId(ticket.id)}
                  className={`p-3.5 cursor-pointer transition-colors ${
                    isSelected ? 'bg-blue-50/80 border-l-4 border-blue-600' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="font-bold text-xs text-slate-900 truncate">
                      {ticket.organizationName}
                    </span>
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold shrink-0 ${
                        ticket.status === 'Résolu'
                          ? 'bg-emerald-100 text-emerald-800'
                          : ticket.status === 'En cours de traitement'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {ticket.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 font-medium truncate">{ticket.subject}</p>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1.5">
                    <span>Par {ticket.userName}</span>
                    <span>{ticket.updatedAt}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Ticket Conversation Thread */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden lg:col-span-2 flex flex-col">
          {selectedTicket ? (
            <>
              <div className="p-4 border-b border-slate-200 bg-slate-50/70 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900">{selectedTicket.subject}</h3>
                    <span className="text-[10px] bg-slate-200 text-slate-700 font-mono px-1.5 py-0.2 rounded">
                      #{selectedTicket.id}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    {selectedTicket.organizationName} · Catégorie: {selectedTicket.category} · Priorité: {selectedTicket.priority}
                  </p>
                </div>

                <span
                  className={`text-xs px-2.5 py-1 rounded-full font-bold ${
                    selectedTicket.status === 'Résolu'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {selectedTicket.status}
                </span>
              </div>

              {/* Message History */}
              <div className="p-4 space-y-3 flex-1 overflow-y-auto max-h-72 bg-slate-50/30">
                {selectedTicket.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.isWolfStaff ? 'items-end' : 'items-start'}`}
                  >
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mb-1">
                      <span className="font-bold text-slate-600">{msg.senderName}</span>
                      <span>({msg.senderRole})</span>
                      <span>· {msg.timestamp}</span>
                    </div>
                    <div
                      className={`max-w-lg p-3 rounded-xl text-xs leading-relaxed ${
                        msg.isWolfStaff
                          ? 'bg-blue-600 text-white rounded-tr-none'
                          : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-2xs'
                      }`}
                    >
                      {msg.message}
                    </div>
                  </div>
                ))}
              </div>

              {/* Reply Box */}
              <form onSubmit={handleSendTicketReply} className="p-3 border-t border-slate-200 bg-white">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Rédiger une réponse d'assistance technique Wolf Digital..."
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Répondre</span>
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="p-12 text-center text-slate-400 text-xs">
              Sélectionnez un ticket pour afficher la conversation
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
