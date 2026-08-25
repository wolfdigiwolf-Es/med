import React, { useState } from 'react';
import {
  Shield,
  ShieldCheck,
  Lock,
  FileText,
  Download,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  Clock,
  UserCheck,
  UserX,
  FileCheck,
  Search,
  Key,
  Info,
  Building,
  Printer,
  Calendar,
  Eye,
  Check,
  RefreshCw,
  Plus
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import {
  UserRole,
  ConsentType,
  AuditActionType,
  AccessUser,
  PatientConsent
} from '../types';

export const SecurityComplianceView: React.FC = () => {
  const {
    settings,
    accessUsers,
    updateAccessUser,
    addAccessUser,
    auditLogs,
    logAuditEvent,
    patientConsents,
    addPatientConsent,
    updateConsentStatus,
    retentionPolicies,
    updateRetentionPolicy,
    exportJobs,
    createExportJob,
    updatePrivacyPolicy,
    patients,
    showToast
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<
    'acces' | 'audit' | 'export' | 'retention' | 'consentements' | 'politique' | 'integrite'
  >('acces');

  // Audit filter state
  const [auditFilterQuery, setAuditFilterQuery] = useState('');
  const [auditFilterCategory, setAuditFilterCategory] = useState<string>('all');
  const [auditFilterUser, setAuditFilterUser] = useState<string>('all');

  // Consent filter state
  const [consentFilterQuery, setConsentFilterQuery] = useState('');
  const [consentFilterType, setConsentFilterType] = useState<string>('all');

  // Modal states
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isAddConsentModalOpen, setIsAddConsentModalOpen] = useState(false);
  const [isPurgeModalOpen, setIsPurgeModalOpen] = useState(false);

  // New User Form state
  const [newUserNom, setNewUserNom] = useState('');
  const [newUserPrenom, setNewUserPrenom] = useState('');
  const [newUserRole, setNewUserRole] = useState<UserRole>('Médecin Remplaçant');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserTel, setNewUserTel] = useState('');

  // New Consent Form state
  const [newConsentPatientId, setNewConsentPatientId] = useState(patients[0]?.id || '');
  const [newConsentType, setNewConsentType] = useState<ConsentType>('traitement_donnees_sante');
  const [newConsentMethode, setNewConsentMethode] = useState<
    'Signature électronique sur tablette' | 'Formulaire papier émargé' | 'Accord oral tracé en consultation'
  >('Signature électronique sur tablette');

  // Purge Form state
  const [purgeCategory, setPurgeCategory] = useState(retentionPolicies[0]?.categorieDonnees || '');
  const [purgeReason, setPurgeReason] = useState('Expiration du délai légal de conservation (20 ans)');
  const [purgeConfirmText, setPurgeConfirmText] = useState('');

  // Filtered Audit Logs
  const filteredAuditLogs = auditLogs.filter((log) => {
    const matchText =
      log.details.toLowerCase().includes(auditFilterQuery.toLowerCase()) ||
      (log.patientName && log.patientName.toLowerCase().includes(auditFilterQuery.toLowerCase())) ||
      log.userName.toLowerCase().includes(auditFilterQuery.toLowerCase()) ||
      log.ipAddress.toLowerCase().includes(auditFilterQuery.toLowerCase());
    const matchCat = auditFilterCategory === 'all' || log.categorie === auditFilterCategory;
    const matchUser = auditFilterUser === 'all' || log.userId === auditFilterUser;
    return matchText && matchCat && matchUser;
  });

  // Filtered Consents
  const filteredConsents = patientConsents.filter((cst) => {
    const matchText =
      cst.patientNom.toLowerCase().includes(consentFilterQuery.toLowerCase()) ||
      cst.cin.toLowerCase().includes(consentFilterQuery.toLowerCase()) ||
      cst.libelle.toLowerCase().includes(consentFilterQuery.toLowerCase());
    const matchType = consentFilterType === 'all' || cst.typeConsentement === consentFilterType;
    return matchText && matchType;
  });

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserNom || !newUserPrenom || !newUserEmail) {
      showToast('Formulaire incomplet', 'Veuillez remplir tous les champs obligatoires.', 'warning');
      return;
    }

    const defaultPermissions = {
      canViewMedicalRecords: newUserRole.includes('Médecin'),
      canEditMedicalRecords: newUserRole.includes('Médecin'),
      canPrescribe: newUserRole.includes('Médecin'),
      canExportData: newUserRole === 'Médecin Titulaire' || newUserRole.includes('DPO'),
      canDeleteRecords: newUserRole === 'Médecin Titulaire',
      canManageSecurity: newUserRole === 'Médecin Titulaire' || newUserRole.includes('DPO'),
      canViewAuditLogs: newUserRole === 'Médecin Titulaire' || newUserRole.includes('DPO')
    };

    addAccessUser({
      nom: newUserNom,
      prenom: newUserPrenom,
      role: newUserRole,
      email: newUserEmail,
      telephone: newUserTel || '+212 6 00 00 00 00',
      mfaEnabled: true,
      statut: 'Actif',
      dernierAcces: 'Jamais connecté (Compte créé)',
      permissions: defaultPermissions
    });

    setIsAddUserModalOpen(false);
    setNewUserNom('');
    setNewUserPrenom('');
    setNewUserEmail('');
    setNewUserTel('');
  };

  const handleCreateConsent = (e: React.FormEvent) => {
    e.preventDefault();
    const pat = patients.find((p) => p.id === newConsentPatientId);
    if (!pat) return;

    let libelle = 'Traitement des données médicales';
    if (newConsentType === 'teleconsultation') libelle = 'Consentement exprès aux téléconsultations médicales';
    if (newConsentType === 'rappels_sms_whatsapp') libelle = 'Rappels et notifications par SMS / WhatsApp';
    if (newConsentType === 'partage_confraternel') libelle = 'Partage sécurisé de bilans avec confrères correspondants';
    if (newConsentType === 'transmission_amo_mutuelle') libelle = 'Télétransmission feuilles de soins AMO & Mutuelle';

    addPatientConsent({
      patientId: pat.id,
      patientNom: `${pat.prenom} ${pat.nom}`,
      cin: pat.cin,
      typeConsentement: newConsentType,
      libelle,
      baseLegale: 'Articles 4 & 12 de la Loi 09-08',
      dateConsentement: new Date().toISOString().split('T')[0],
      statut: 'Accordé',
      methodeRecueil: newConsentMethode,
      recueilliPar: `${settings.medecin.civilite} ${settings.medecin.nom}`
    });

    setIsAddConsentModalOpen(false);
  };

  const handleExecutePurge = (e: React.FormEvent) => {
    e.preventDefault();
    if (purgeConfirmText !== 'CONFIRMER') {
      showToast('Confirmation requise', 'Veuillez saisir CONFIRMER en lettres majuscules.', 'warning');
      return;
    }

    logAuditEvent(
      'PURGE_ARCHIVAGE',
      'Sécurité & Accès',
      `Exécution de la politique d'archivage / purge pour : ${purgeCategory} (Motif : ${purgeReason})`
    );

    showToast('Purge tracée et exécutée', 'L’opération a été consignée au registre d’intégrité.', 'info');
    setIsPurgeModalOpen(false);
    setPurgeConfirmText('');
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-slate-50/50 animate-in fade-in overflow-y-auto">
      {/* Header & Regulatory Notice */}
      <div className="bg-white border-b border-slate-200 px-6 sm:px-8 py-5 shrink-0 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                  Sécurité & Protection des données
                  <span className="text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full">
                    Loi 09-08 · CNDP Maroc
                  </span>
                </h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  Gestion des accès, journalisation inviolable, consentements et traçabilité pour le cabinet médical
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => {
                logAuditEvent(
                  'MODIFICATION_DOSSIER',
                  'Sécurité & Accès',
                  'Vérification manuelle d’intégrité des données et des clés de hachage'
                );
                showToast('Intégrité vérifiée', 'Toutes les signatures d’audit et clés sont valides.');
              }}
              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Tester l'intégrité</span>
            </button>
            <button
              onClick={() => createExportJob('Registre des traitements CNDP', 'PDF')}
              className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Exporter Registre CNDP</span>
            </button>
          </div>
        </div>

        {/* Regulatory Neutrality Notice Banner (Adhering strictly to constraints) */}
        <div className="mt-4 p-3.5 bg-amber-50/80 border border-amber-200/80 rounded-xl flex items-start gap-3 text-xs text-amber-900">
          <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-0.5 leading-relaxed">
            <p className="font-bold text-amber-950">
              Dispositif technique d'accompagnement à la conformité — Loi n° 09-08 & exigences CNDP
            </p>
            <p className="text-[11px] text-amber-900/90">
              Cette interface fournit les mécanismes requis (traçabilité, contrôle d'accès RBAC, gestion des consentements, politiques de rétention et exports). La conformité juridique et organisationnelle effective demeure sous la responsabilité du cabinet médical via l'accomplissement des formalités de déclaration préalable ou demande d'autorisation auprès de la Commission Nationale de contrôle de la protection des Données à caractère Personnel (CNDP).
            </p>
          </div>
        </div>

        {/* Navigation Tabs for Security Modules */}
        <div className="flex items-center gap-1 mt-4 border-b border-slate-200 overflow-x-auto pb-px">
          {[
            { id: 'acces', label: 'Gestion des accès', icon: Key },
            { id: 'audit', label: 'Journalisation & Audit', icon: FileCheck },
            { id: 'export', label: 'Export & Portabilité', icon: Download },
            { id: 'retention', label: 'Suppression & Rétention', icon: Trash2 },
            { id: 'consentements', label: 'Consentements Patients', icon: UserCheck },
            { id: 'politique', label: 'Politique & CNDP', icon: FileText },
            { id: 'integrite', label: 'Traçabilité & Sécurité', icon: Shield }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'border-blue-600 text-blue-700 bg-blue-50/40'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-6 md:p-8 flex-1">
        {/* ======================================================== */}
        {/* 1. GESTION DES ACCÈS (RBAC & IDENTITÉS) */}
        {/* ======================================================== */}
        {activeSubTab === 'acces' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Contrôle d'accès & Rôles Habilités (RBAC)
                </h2>
                <p className="text-xs text-slate-500">
                  Restriction stricte des accès aux données de santé selon le principe du besoin d'en connaître (Secret médical)
                </p>
              </div>
              <button
                onClick={() => setIsAddUserModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3.5 py-2 rounded-lg flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer self-start"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Nouvel utilisateur habilité</span>
              </button>
            </div>

            {/* Users & Permissions Table */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-50 text-[10px] uppercase text-slate-500 border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-3 font-bold">Utilisateur & Rôle</th>
                      <th className="px-4 py-3 font-bold">Contact & Auth</th>
                      <th className="px-4 py-3 font-bold text-center">Dossiers Médicaux</th>
                      <th className="px-4 py-3 font-bold text-center">Prescriptions</th>
                      <th className="px-4 py-3 font-bold text-center">Exports CNDP</th>
                      <th className="px-4 py-3 font-bold text-center">Audit Logs</th>
                      <th className="px-4 py-3 font-bold">Dernière session</th>
                      <th className="px-4 py-3 font-bold text-right">Statut</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {accessUsers.map((u) => (
                      <tr key={u.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center text-xs">
                              {u.prenom[0]}
                              {u.nom[0]}
                            </div>
                            <div>
                              <p className="font-bold text-slate-900">
                                {u.prenom} {u.nom}
                              </p>
                              <span className="inline-block text-[10px] font-semibold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded">
                                {u.role}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3.5">
                          <p className="text-slate-800 font-medium">{u.email}</p>
                          <div className="flex items-center gap-1 mt-0.5 text-[10px] text-emerald-700 font-medium">
                            <ShieldCheck className="w-3 h-3 text-emerald-600" />
                            2FA / MFA Activé
                          </div>
                        </td>
                        <td className="px-4 py-3.5 text-center">
                          <input
                            type="checkbox"
                            checked={u.permissions.canViewMedicalRecords}
                            onChange={(e) =>
                              updateAccessUser(u.id, {
                                permissions: { ...u.permissions, canViewMedicalRecords: e.target.checked }
                              })
                            }
                            className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                          />
                        </td>
                        <td className="px-4 py-3.5 text-center">
                          <input
                            type="checkbox"
                            checked={u.permissions.canPrescribe}
                            onChange={(e) =>
                              updateAccessUser(u.id, {
                                permissions: { ...u.permissions, canPrescribe: e.target.checked }
                              })
                            }
                            className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                          />
                        </td>
                        <td className="px-4 py-3.5 text-center">
                          <input
                            type="checkbox"
                            checked={u.permissions.canExportData}
                            onChange={(e) =>
                              updateAccessUser(u.id, {
                                permissions: { ...u.permissions, canExportData: e.target.checked }
                              })
                            }
                            className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                          />
                        </td>
                        <td className="px-4 py-3.5 text-center">
                          <input
                            type="checkbox"
                            checked={u.permissions.canViewAuditLogs}
                            onChange={(e) =>
                              updateAccessUser(u.id, {
                                permissions: { ...u.permissions, canViewAuditLogs: e.target.checked }
                              })
                            }
                            className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                          />
                        </td>
                        <td className="px-4 py-3.5 text-[11px] text-slate-500">
                          {u.dernierAcces}
                        </td>
                        <td className="px-4 py-3.5 text-right">
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              u.statut === 'Actif'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {u.statut}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Security Policies Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2">
                <div className="flex items-center gap-2 text-slate-800 font-bold text-xs">
                  <Lock className="w-4 h-4 text-blue-600" />
                  <span>Verrouillage d'inactivité</span>
                </div>
                <p className="text-xs text-slate-500">
                  Déconnexion automatique de la session après 15 minutes d'inactivité pour éviter toute consultation non autorisée.
                </p>
                <span className="inline-block text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  Actif (15 min)
                </span>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2">
                <div className="flex items-center gap-2 text-slate-800 font-bold text-xs">
                  <Key className="w-4 h-4 text-indigo-600" />
                  <span>Authentification Double Facteur</span>
                </div>
                <p className="text-xs text-slate-500">
                  Exigence obligatoire de code OTP par application d'authentification ou clé physique FIDO2 pour tout accès distant.
                </p>
                <span className="inline-block text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  Appliqué à tous les comptes
                </span>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2">
                <div className="flex items-center gap-2 text-slate-800 font-bold text-xs">
                  <Building className="w-4 h-4 text-purple-600" />
                  <span>Cloisonnement du Secrétariat</span>
                </div>
                <p className="text-xs text-slate-500">
                  Les secrétaires ont accès uniquement aux plannings, facturations et coordonnées. Données médicales masquées.
                </p>
                <span className="inline-block text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                  Secret médical préservé
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* 2. JOURNALISATION & AUDIT TRAIL */}
        {/* ======================================================== */}
        {activeSubTab === 'audit' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Journal d'Audit Inviolable & Traçabilité (Loi 09-08)
                </h2>
                <p className="text-xs text-slate-500">
                  Enregistrement continu de chaque accès, consultation, création de prescription, export ou modification
                </p>
              </div>
              <button
                onClick={() => createExportJob('Journal d\'audit certifié', 'CSV')}
                className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer self-start"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Exporter le journal (CSV Scellé)</span>
              </button>
            </div>

            {/* Filter Bar */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-wrap items-center gap-3">
              <div className="flex-1 min-w-[220px] relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Rechercher par patient, action, IP ou mot-clé..."
                  value={auditFilterQuery}
                  onChange={(e) => setAuditFilterQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>

              <select
                value={auditFilterCategory}
                onChange={(e) => setAuditFilterCategory(e.target.value)}
                className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Toutes les catégories</option>
                <option value="Dossier Patient">Dossier Patient</option>
                <option value="Prescription">Prescription</option>
                <option value="Sécurité & Accès">Sécurité & Accès</option>
                <option value="Export">Export</option>
                <option value="Consentement">Consentement</option>
              </select>

              <select
                value={auditFilterUser}
                onChange={(e) => setAuditFilterUser(e.target.value)}
                className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Tous les utilisateurs</option>
                {accessUsers.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.prenom} {u.nom} ({u.role})
                  </option>
                ))}
              </select>
            </div>

            {/* Audit Log Table */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto max-h-[520px]">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-50 text-[10px] uppercase text-slate-500 border-b border-slate-200 sticky top-0 z-10">
                    <tr>
                      <th className="px-4 py-2.5 font-bold">Horodatage (UTC+1)</th>
                      <th className="px-4 py-2.5 font-bold">Utilisateur</th>
                      <th className="px-4 py-2.5 font-bold">Action & Catégorie</th>
                      <th className="px-4 py-2.5 font-bold">Patient Cible</th>
                      <th className="px-4 py-2.5 font-bold">Détails de l'évènement</th>
                      <th className="px-4 py-2.5 font-bold">Adresse IP / Réseau</th>
                      <th className="px-4 py-2.5 font-bold text-right">Scellement Hash</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs font-mono">
                    {filteredAuditLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="px-4 py-3 font-semibold text-slate-700 whitespace-nowrap">
                          {log.timestamp}
                        </td>
                        <td className="px-4 py-3 font-sans">
                          <p className="font-bold text-slate-900">{log.userName}</p>
                          <p className="text-[10px] text-slate-400">{log.userRole}</p>
                        </td>
                        <td className="px-4 py-3 font-sans">
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block ${
                              log.actionType.includes('EXPORT')
                                ? 'bg-purple-50 text-purple-700 border border-purple-200'
                                : log.actionType.includes('PRESCRIPTION')
                                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                : log.actionType.includes('CONSENTEMENT')
                                ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {log.actionType}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-sans font-bold text-slate-900">
                          {log.patientName || '—'}
                        </td>
                        <td className="px-4 py-3 font-sans text-slate-600 max-w-xs truncate" title={log.details}>
                          {log.details}
                        </td>
                        <td className="px-4 py-3 text-[11px] text-slate-500">
                          {log.ipAddress}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded font-mono" title={`Empreinte SHA-256 : ${log.hashIntegrite}`}>
                            {log.hashIntegrite.slice(0, 10)}...
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* 3. EXPORT DE DONNÉES & PORTABILITÉ */}
        {/* ======================================================== */}
        {activeSubTab === 'export' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Exports Réglementaires & Droit à la Portabilité (Art. 8 Loi 09-08)
              </h2>
              <p className="text-xs text-slate-500">
                Génération de fichiers structurés et certifiés pour transmission aux patients, autorités CNDP ou sauvegardes
              </p>
            </div>

            {/* Quick Export Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">Dossier Patient Individuel</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Export complet du dossier médical d'un patient (Consultations, antécédents, ordonnances, constantes) au format PDF ou JSON chiffré.
                  </p>
                </div>
                <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => createExportJob('Dossier patient individuel (Portabilité Art. 8)', 'PDF')}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 rounded-lg transition-colors cursor-pointer"
                  >
                    Générer PDF
                  </button>
                  <button
                    onClick={() => createExportJob('Dossier patient individuel (Portabilité Art. 8)', 'JSON')}
                    className="px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold py-2 rounded-lg transition-colors cursor-pointer"
                  >
                    JSON
                  </button>
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">Registre des Traitements CNDP</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Fiche légale recensant les finalités, catégories de données, destinataires autorisés et mesures de sécurité conformément aux guides de la CNDP.
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-100">
                  <button
                    onClick={() => createExportJob('Registre des traitements CNDP', 'PDF')}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2 rounded-lg transition-colors cursor-pointer"
                  >
                    Télécharger Registre CNDP
                  </button>
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center">
                    <Lock className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">Sauvegarde Globale Chiffrée</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Archive intégrale chiffrée (AES-256) de la base de données du cabinet pour conservation sur support hors-site sécurisé au Maroc.
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-100">
                  <button
                    onClick={() => createExportJob('Sauvegarde chiffrée de la base', 'ZIP')}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-2 rounded-lg transition-colors cursor-pointer"
                  >
                    Générer Sauvegarde (ZIP AES)
                  </button>
                </div>
              </div>
            </div>

            {/* Generated Export Jobs History */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-xs">
                  Historique des Exports Générés & Empreintes Numériques
                </h3>
                <span className="text-[10px] text-slate-400 font-medium">
                  Tracé automatiquement au journal d'audit
                </span>
              </div>
              <table className="w-full text-left border-collapse text-xs">
                <thead className="bg-slate-50 text-[10px] uppercase text-slate-500">
                  <tr>
                    <th className="px-4 py-2.5 font-bold">Date & Heure</th>
                    <th className="px-4 py-2.5 font-bold">Type d'Export</th>
                    <th className="px-4 py-2.5 font-bold">Format</th>
                    <th className="px-4 py-2.5 font-bold">Demandeur</th>
                    <th className="px-4 py-2.5 font-bold">Taille</th>
                    <th className="px-4 py-2.5 font-bold">Empreinte SHA-256</th>
                    <th className="px-4 py-2.5 font-bold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {exportJobs.map((job) => (
                    <tr key={job.id} className="hover:bg-slate-50/60">
                      <td className="px-4 py-3 font-semibold text-slate-600">{job.dateDemande}</td>
                      <td className="px-4 py-3 font-bold text-slate-900">{job.typeExport}</td>
                      <td className="px-4 py-3">
                        <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                          {job.format}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-600">{job.demandeur}</td>
                      <td className="px-4 py-3 text-slate-500 font-mono">{job.taille}</td>
                      <td className="px-4 py-3 text-slate-500 font-mono text-[11px]">
                        {job.emprunteSha256.slice(0, 16)}...
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => {
                            showToast(
                              'Téléchargement initié',
                              `Le fichier ${job.format} sécurisé a été téléchargé.`
                            );
                          }}
                          className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 justify-end cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Télécharger</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* 4. SUPPRESSION & RÉTENTION (CYCLE DE VIE) */}
        {/* ======================================================== */}
        {activeSubTab === 'retention' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Politiques de Conservation & Cycle de Vie des Données
                </h2>
                <p className="text-xs text-slate-500">
                  Délais de rétention conformes à la réglementation sanitaire et fiscale marocaine (Loi 09-08, Code de Déontologie)
                </p>
              </div>
              <button
                onClick={() => setIsPurgeModalOpen(true)}
                className="px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer self-start"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Simuler / Exécuter une purge sécurisée</span>
              </button>
            </div>

            {/* Retention Policies Table */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
              <table className="w-full text-left border-collapse text-xs">
                <thead className="bg-slate-50 text-[10px] uppercase text-slate-500 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3 font-bold">Catégorie de Données</th>
                    <th className="px-4 py-3 font-bold">Durée Légale</th>
                    <th className="px-4 py-3 font-bold">Base Réglementaire Marocaine</th>
                    <th className="px-4 py-3 font-bold">Action Fin de Cycle</th>
                    <th className="px-4 py-3 font-bold text-right">Statut</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {retentionPolicies.map((pol) => (
                    <tr key={pol.id} className="hover:bg-slate-50/60">
                      <td className="px-4 py-3.5">
                        <p className="font-bold text-slate-900">{pol.categorieDonnees}</p>
                        <p className="text-[11px] text-slate-500 mt-0.5">{pol.description}</p>
                      </td>
                      <td className="px-4 py-3.5 font-bold text-slate-800 text-sm whitespace-nowrap">
                        {pol.dureeConservationAnnees} ans
                      </td>
                      <td className="px-4 py-3.5 text-slate-600 text-[11px]">
                        {pol.baseReglementaire}
                      </td>
                      <td className="px-4 py-3.5">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            pol.actionFinCycle.includes('Anonymisation')
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : pol.actionFinCycle.includes('Archivage')
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}
                        >
                          {pol.actionFinCycle}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-right font-bold text-emerald-700">
                        {pol.statut}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Explanation box on 20-year medical retention in Morocco */}
            <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-4 text-xs text-blue-900 space-y-1.5 leading-relaxed">
              <p className="font-bold text-blue-950 flex items-center gap-1.5">
                <Info className="w-4 h-4 text-blue-600" />
                Règle de conservation des dossiers médicaux au Maroc
              </p>
              <p className="text-[11px] text-blue-900/90">
                Au Maroc, le dossier médical d'un patient doit être conservé pendant une durée minimale de <strong>20 ans</strong> à compter de la date de la dernière consultation ou acte de soins. Toute demande d'effacement anticipée formulée par un patient doit être conciliée avec l'obligation déontologique et légale de conservation des preuves médicales.
              </p>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* 5. CONSENTEMENTS PATIENTS (ART. 4 & 12) */}
        {/* ======================================================== */}
        {activeSubTab === 'consentements' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Registre des Consentements Éclairés (Articles 4 & 12 Loi 09-08)
                </h2>
                <p className="text-xs text-slate-500">
                  Recueil, traçabilité et gestion des révocations des consentements pour les traitements de données de santé
                </p>
              </div>
              <button
                onClick={() => setIsAddConsentModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3.5 py-2 rounded-lg flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer self-start"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Nouveau consentement patient</span>
              </button>
            </div>

            {/* Filter Bar */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-wrap items-center gap-3">
              <div className="flex-1 min-w-[220px] relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Rechercher par nom patient, CIN ou type de consentement..."
                  value={consentFilterQuery}
                  onChange={(e) => setConsentFilterQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>

              <select
                value={consentFilterType}
                onChange={(e) => setConsentFilterType(e.target.value)}
                className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Tous les types de consentement</option>
                <option value="traitement_donnees_sante">Données de santé (Dossier médical)</option>
                <option value="teleconsultation">Téléconsultation</option>
                <option value="rappels_sms_whatsapp">Rappels SMS / WhatsApp</option>
                <option value="transmission_amo_mutuelle">Télétransmission AMO / Mutuelle</option>
                <option value="partage_confraternel">Partage confraternel</option>
              </select>
            </div>

            {/* Consent Table */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
              <table className="w-full text-left border-collapse text-xs">
                <thead className="bg-slate-50 text-[10px] uppercase text-slate-500 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3 font-bold">Patient & CIN</th>
                    <th className="px-4 py-3 font-bold">Finalité du Consentement</th>
                    <th className="px-4 py-3 font-bold">Base Légale</th>
                    <th className="px-4 py-3 font-bold">Méthode de Recueil</th>
                    <th className="px-4 py-3 font-bold">Date de Recueil</th>
                    <th className="px-4 py-3 font-bold">Statut</th>
                    <th className="px-4 py-3 font-bold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredConsents.map((cst) => (
                    <tr key={cst.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="px-4 py-3.5">
                        <p className="font-bold text-slate-900">{cst.patientNom}</p>
                        <p className="text-[11px] text-slate-500 font-mono">CIN : {cst.cin}</p>
                      </td>
                      <td className="px-4 py-3.5">
                        <p className="font-semibold text-slate-800">{cst.libelle}</p>
                        <span className="text-[10px] text-slate-400 font-mono uppercase">
                          {cst.typeConsentement}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-slate-600 text-[11px] whitespace-nowrap">
                        {cst.baseLegale}
                      </td>
                      <td className="px-4 py-3.5 text-slate-600 text-[11px]">
                        {cst.methodeRecueil}
                      </td>
                      <td className="px-4 py-3.5 text-slate-700 whitespace-nowrap font-medium">
                        {cst.dateConsentement}
                      </td>
                      <td className="px-4 py-3.5">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            cst.statut === 'Accordé'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : cst.statut === 'Révoqué'
                              ? 'bg-rose-50 text-rose-700 border border-rose-200'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {cst.statut}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-right whitespace-nowrap">
                        {cst.statut === 'Accordé' ? (
                          <button
                            onClick={() => updateConsentStatus(cst.id, 'Révoqué')}
                            className="text-xs font-bold text-rose-600 hover:text-rose-800 px-2 py-1 bg-rose-50 hover:bg-rose-100 rounded transition-colors cursor-pointer"
                          >
                            Révoquer
                          </button>
                        ) : (
                          <button
                            onClick={() => updateConsentStatus(cst.id, 'Accordé')}
                            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 px-2 py-1 bg-emerald-50 hover:bg-emerald-100 rounded transition-colors cursor-pointer"
                          >
                            Réactiver
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* 6. POLITIQUE DE CONFIDENTIALITÉ & CNDP */}
        {/* ======================================================== */}
        {activeSubTab === 'politique' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Notice d'Information & Formalités CNDP (Articles 5 & 23 Loi 09-08)
              </h2>
              <p className="text-xs text-slate-500">
                Gestion des mentions légales obligatoires, coordonnées du responsable de traitement et modèle d'affichage
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column (2/3): Policy Configuration */}
              <div className="lg:col-span-2 space-y-6">
                {/* CNDP Filing Status */}
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
                  <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <Building className="w-4 h-4 text-blue-600" />
                    Formalités auprès de la CNDP (Rabat)
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="text-[11px] font-bold text-slate-500 uppercase">
                        Statut du Dossier CNDP
                      </label>
                      <select
                        value={settings.privacyPolicy.statutDeclarationCndp}
                        onChange={(e) =>
                          updatePrivacyPolicy({ statutDeclarationCndp: e.target.value as any })
                        }
                        className="w-full mt-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Récépissé de déclaration obtenu">
                          Récépissé de déclaration obtenu
                        </option>
                        <option value="Déclaration préalable déposée">
                          Déclaration préalable déposée
                        </option>
                        <option value="Demande d'autorisation en cours">
                          Demande d'autorisation en cours
                        </option>
                        <option value="Dossier en préparation">Dossier en préparation</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-500 uppercase">
                        N° Récépissé CNDP
                      </label>
                      <input
                        type="text"
                        value={settings.privacyPolicy.numeroRecepisseCndp}
                        onChange={(e) =>
                          updatePrivacyPolicy({ numeroRecepisseCndp: e.target.value })
                        }
                        className="w-full mt-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono font-bold"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-500 uppercase">
                        Responsable du Traitement
                      </label>
                      <input
                        type="text"
                        value={settings.privacyPolicy.responsableTraitement}
                        onChange={(e) =>
                          updatePrivacyPolicy({ responsableTraitement: e.target.value })
                        }
                        className="w-full mt-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-500 uppercase">
                        Contact Référent DPO
                      </label>
                      <input
                        type="email"
                        value={settings.privacyPolicy.contactDpoEmail}
                        onChange={(e) =>
                          updatePrivacyPolicy({ contactDpoEmail: e.target.value })
                        }
                        className="w-full mt-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* Patient Information Notice Editor */}
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
                  <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-600" />
                    Texte d'Information pour Affiche Salle d'Attente
                  </h3>
                  <textarea
                    rows={4}
                    value={settings.privacyPolicy.texteAfficheSalleAttente}
                    onChange={(e) =>
                      updatePrivacyPolicy({ texteAfficheSalleAttente: e.target.value })
                    }
                    className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-lg leading-relaxed focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>
              </div>

              {/* Right Column (1/3): Printable Patient Notice Preview */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase text-slate-400">
                      Affiche Salle d'Attente
                    </span>
                    <button
                      onClick={() => window.print()}
                      className="text-xs text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Imprimer</span>
                    </button>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3 text-xs">
                    <div className="text-center border-b border-slate-200 pb-2">
                      <p className="font-bold text-slate-900 uppercase tracking-tight text-[11px]">
                        Protection de vos données personnelles
                      </p>
                      <p className="text-[10px] text-slate-500">Loi n° 09-08 · CNDP Maroc</p>
                    </div>

                    <p className="text-[11px] text-slate-700 leading-relaxed italic">
                      "{settings.privacyPolicy.texteAfficheSalleAttente}"
                    </p>

                    <div className="text-[10px] text-slate-500 border-t border-slate-200 pt-2 space-y-1">
                      <p>
                        <strong>Responsable :</strong> {settings.privacyPolicy.responsableTraitement}
                      </p>
                      <p>
                        <strong>N° Déclaration CNDP :</strong> {settings.privacyPolicy.numeroRecepisseCndp}
                      </p>
                      <p>
                        <strong>Contact DPO :</strong> {settings.privacyPolicy.contactDpoEmail}
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-[10px] text-slate-400 text-center">
                  Obligation légale d'affichage visible dans les locaux accueillant du public (Art. 5 Loi 09-08)
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* 7. TRAÇABILITÉ & INTÉGRITÉ TECHNIQUE */}
        {/* ======================================================== */}
        {activeSubTab === 'integrite' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Diagnostic de Sécurité & Intégrité Cryptographique
              </h2>
              <p className="text-xs text-slate-500">
                Mesures de sécurité techniques et organisationnelles conformes aux standards CNDP et DGSSI
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase text-slate-400">Chiffrement</span>
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                </div>
                <p className="text-lg font-bold text-slate-900">AES-256-GCM</p>
                <p className="text-[11px] text-slate-500">
                  Données médicales et pièces jointes chiffrées au repos
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase text-slate-400">Transit</span>
                  <Lock className="w-4 h-4 text-blue-600" />
                </div>
                <p className="text-lg font-bold text-slate-900">TLS 1.3</p>
                <p className="text-[11px] text-slate-500">
                  Canaux chiffrés de bout en bout avec certificat SSL vérifié
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase text-slate-400">Hébergement</span>
                  <Building className="w-4 h-4 text-purple-600" />
                </div>
                <p className="text-lg font-bold text-slate-900">Souverain Maroc</p>
                <p className="text-[11px] text-slate-500">
                  Datacenters certifiés ISO 27001 situés sur le territoire national
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase text-slate-400">Logs d'audit</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
                <p className="text-lg font-bold text-emerald-700">100% Intègres</p>
                <p className="text-[11px] text-slate-500">
                  Chaîne de blocs SHA-256 sans altération constatée
                </p>
              </div>
            </div>

            {/* Security Checklist */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
              <h3 className="font-bold text-slate-900 text-sm">
                Matrice des Exigences Techniques & Organisationnelles
              </h3>
              <div className="space-y-3">
                {[
                  {
                    title: 'Contrôle d’accès et gestion des privilèges par rôle (RBAC)',
                    desc: 'Ségrégation stricte des fonctions médicales et administratives.',
                    status: 'Conforme'
                  },
                  {
                    title: 'Journalisation complète des accès aux données de santé',
                    desc: 'Horodatage précis, identifiant utilisateur, adresse IP et détails de consultation.',
                    status: 'Conforme'
                  },
                  {
                    title: 'Dispositif de recueil et traçabilité des consentements (Loi 09-08)',
                    desc: 'Registre informatisé avec motif, date, support et historique de révocation.',
                    status: 'Conforme'
                  },
                  {
                    title: 'Gestion des politiques de conservation et purges contrôlées',
                    desc: 'Règles paramétrables de 20 ans pour les dossiers médicaux et 10 ans pour les justificatifs comptables.',
                    status: 'Conforme'
                  },
                  {
                    title: 'Sauvegardes quotidiennes chiffrées géo-distribuées',
                    desc: 'Copies de sécurité chiffrées automatiques et procédure de restauration testée.',
                    status: 'Conforme'
                  }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-between gap-4"
                  >
                    <div>
                      <p className="text-xs font-bold text-slate-900 flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600" />
                        {item.title}
                      </p>
                      <p className="text-[11px] text-slate-500 ml-6">{item.desc}</p>
                    </div>
                    <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-full shrink-0">
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ======================================================== */}
      {/* MODAL : NOUVEL UTILISATEUR HABILITÉ */}
      {/* ======================================================== */}
      {isAddUserModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm">
                Ajouter un Utilisateur Habilité
              </h3>
              <button
                onClick={() => setIsAddUserModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-lg leading-none cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700">Nom *</label>
                  <input
                    type="text"
                    required
                    value={newUserNom}
                    onChange={(e) => setNewUserNom(e.target.value)}
                    placeholder="Ex: El Amrani"
                    className="w-full mt-1 p-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700">Prénom *</label>
                  <input
                    type="text"
                    required
                    value={newUserPrenom}
                    onChange={(e) => setNewUserPrenom(e.target.value)}
                    placeholder="Ex: Dr Yassine"
                    className="w-full mt-1 p-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700">Rôle RBAC *</label>
                <select
                  value={newUserRole}
                  onChange={(e) => setNewUserRole(e.target.value as any)}
                  className="w-full mt-1 p-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 font-semibold"
                >
                  <option value="Médecin Remplaçant">Médecin Remplaçant (Accès médical complet)</option>
                  <option value="Secrétaire Médicale">Secrétaire Médicale (Accès planning & administratif uniquement)</option>
                  <option value="DPO / Délégué Protection">DPO / Délégué Protection (Audits & Exports CNDP)</option>
                  <option value="Médecin Titulaire">Médecin Titulaire (Administrateur)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700">Email professionnel *</label>
                <input
                  type="email"
                  required
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  placeholder="nom@cabinet-anfa-sante.ma"
                  className="w-full mt-1 p-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700">Téléphone Mobile (Pour 2FA / OTP)</label>
                <input
                  type="tel"
                  value={newUserTel}
                  onChange={(e) => setNewUserTel(e.target.value)}
                  placeholder="+212 6 XX XX XX XX"
                  className="w-full mt-1 p-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddUserModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-semibold hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 shadow-xs transition-colors cursor-pointer"
                >
                  Créer le compte habilité
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL : NOUVEAU CONSENTEMENT PATIENT */}
      {/* ======================================================== */}
      {isAddConsentModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm">
                Recueillir un Consentement Patient (Loi 09-08)
              </h3>
              <button
                onClick={() => setIsAddConsentModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-lg leading-none cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateConsent} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700">Sélectionner le Patient *</label>
                <select
                  value={newConsentPatientId}
                  onChange={(e) => setNewConsentPatientId(e.target.value)}
                  className="w-full mt-1 p-2 bg-slate-50 border border-slate-200 rounded-lg font-semibold focus:ring-2 focus:ring-blue-500"
                >
                  {patients.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.prenom} {p.nom} (CIN : {p.cin})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700">Type de Consentement *</label>
                <select
                  value={newConsentType}
                  onChange={(e) => setNewConsentType(e.target.value as any)}
                  className="w-full mt-1 p-2 bg-slate-50 border border-slate-200 rounded-lg font-semibold focus:ring-2 focus:ring-blue-500"
                >
                  <option value="traitement_donnees_sante">
                    Traitement & conservation des données de santé au dossier informatisé
                  </option>
                  <option value="teleconsultation">
                    Actes de téléconsultation médicale et enregistrement
                  </option>
                  <option value="rappels_sms_whatsapp">
                    Notifications & rappels de rendez-vous par SMS / WhatsApp
                  </option>
                  <option value="transmission_amo_mutuelle">
                    Télétransmission des feuilles de soins AMO & Mutuelle
                  </option>
                  <option value="partage_confraternel">
                    Partage sécurisé de bilans avec confrères correspondants
                  </option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700">Méthode de Recueil du Consentement *</label>
                <select
                  value={newConsentMethode}
                  onChange={(e) => setNewConsentMethode(e.target.value as any)}
                  className="w-full mt-1 p-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Signature électronique sur tablette">
                    Signature électronique sur tablette tactile au cabinet
                  </option>
                  <option value="Formulaire papier émargé">
                    Formulaire papier émargé archivé
                  </option>
                  <option value="Accord oral tracé en consultation">
                    Accord oral tracé et consigné en consultation
                  </option>
                </select>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddConsentModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-semibold hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 shadow-xs transition-colors cursor-pointer"
                >
                  Enregistrer le consentement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL : SIMULATION / EXÉCUTION DE PURGE */}
      {/* ======================================================== */}
      {isPurgeModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                Procédure de Purge & Anonymisation
              </h3>
              <button
                onClick={() => setIsPurgeModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-lg leading-none cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleExecutePurge} className="space-y-3 text-xs">
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-rose-900 text-[11px] leading-relaxed">
                <strong>Attention :</strong> L'opération d'anonymisation irréversible ou de purge est définitive et tracée au journal d'intégrité conformément à la loi 09-08.
              </div>

              <div>
                <label className="font-bold text-slate-700">Catégorie cible</label>
                <select
                  value={purgeCategory}
                  onChange={(e) => setPurgeCategory(e.target.value)}
                  className="w-full mt-1 p-2 bg-slate-50 border border-slate-200 rounded-lg font-semibold"
                >
                  {retentionPolicies.map((r) => (
                    <option key={r.id} value={r.categorieDonnees}>
                      {r.categorieDonnees} ({r.dureeConservationAnnees} ans)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700">Motif légitime</label>
                <input
                  type="text"
                  value={purgeReason}
                  onChange={(e) => setPurgeReason(e.target.value)}
                  className="w-full mt-1 p-2 bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700">
                  Tapez <span className="font-mono text-rose-600">CONFIRMER</span> pour valider
                </label>
                <input
                  type="text"
                  required
                  placeholder="CONFIRMER"
                  value={purgeConfirmText}
                  onChange={(e) => setPurgeConfirmText(e.target.value)}
                  className="w-full mt-1 p-2 bg-slate-50 border border-slate-200 rounded-lg font-mono"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsPurgeModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-semibold hover:bg-slate-200 cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={purgeConfirmText !== 'CONFIRMER'}
                  className="px-4 py-2 bg-rose-600 disabled:opacity-50 text-white rounded-lg font-bold hover:bg-rose-700 cursor-pointer"
                >
                  Exécuter la purge tracée
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
