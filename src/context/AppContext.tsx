import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  NavigationTab,
  Organization,
  UserAccount,
  RolePermissions,
  Patient,
  Consultation,
  Prescription,
  MedicalCertificate,
  Appointment,
  WaitingPatient,
  MedicalDocument,
  Medication,
  PaymentTransaction,
  ExpenseItem,
  PracticeSettings,
  AccessUser,
  AuditLogEntry,
  AuditActionType,
  PatientConsent,
  RetentionPolicy,
  DataExportJob,
  PrivacyPolicyConfig,
  SupportTicket,
  WolfDigitalMetric
} from '../types';
import {
  ORGANIZATIONS,
  INITIAL_USER_ACCOUNTS,
  INITIAL_PATIENTS,
  INITIAL_WAITING_ROOM,
  INITIAL_APPOINTMENTS,
  INITIAL_CONSULTATIONS,
  INITIAL_PRESCRIPTIONS,
  INITIAL_CERTIFICATES,
  INITIAL_DOCUMENTS,
  INITIAL_MEDICATIONS,
  INITIAL_TRANSACTIONS,
  INITIAL_EXPENSES,
  INITIAL_SETTINGS,
  DR_EL_QYAMI_SETTINGS,
  INITIAL_ACCESS_USERS,
  INITIAL_AUDIT_LOGS,
  INITIAL_PATIENT_CONSENTS,
  INITIAL_RETENTION_POLICIES,
  INITIAL_EXPORT_JOBS,
  INITIAL_SUPPORT_TICKETS,
  WOLF_DIGITAL_METRICS
} from '../data/mockData';

interface PrintPreviewState {
  isOpen: boolean;
  type: 'prescription' | 'certificate' | 'consultation' | 'feuille_soin';
  title: string;
  data: any;
}

interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning';
  title: string;
  description?: string;
}

// Generate simple deterministic SHA-256 placeholder hash for audit log integrity seal
const generateAuditHash = (content: string) => {
  let hash = 0;
  for (let i = 0; i < content.length; i++) {
    const char = content.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  const hex = Math.abs(hash).toString(16).padStart(8, '0');
  return `sha256_${hex}${Date.now().toString(16).slice(-6)}`;
};

interface AppContextType {
  // Navigation & UI State
  currentTab: NavigationTab;
  setCurrentTab: (tab: NavigationTab) => void;
  selectedPatientId: string | null;
  setSelectedPatientId: (id: string | null) => void;
  openPatientDetail: (id: string) => void;

  // Multi-Tenant SaaS & Auth State
  organizations: Organization[];
  currentOrganization: Organization;
  users: UserAccount[];
  currentUser: UserAccount;
  isLoggedIn: boolean;
  login: (email: string) => boolean;
  logout: () => void;
  switchOrganizationAndUser: (orgId: string, userId?: string) => void;
  sessionMinutesRemaining: number;
  extendSession: () => void;
  hasPermission: (permissionKey: keyof RolePermissions) => boolean;
  renewSubscription: (orgId: string) => void;

  // Multi-Tenant Scoped Medical & Admin Entities (Row-Level Security Filtered)
  patients: Patient[];
  addPatient: (patient: Omit<Patient, 'id' | 'organizationId'>) => string;
  updatePatient: (id: string, updates: Partial<Patient>) => void;
  deletePatientControlled: (id: string, reason: string) => boolean;

  waitingRoom: WaitingPatient[];
  callWaitingPatient: (id: string) => void;
  setWaitingStatus: (id: string, statut: WaitingPatient['statut']) => void;
  addWaitingPatient: (item: Omit<WaitingPatient, 'id' | 'organizationId'>) => void;
  removeWaitingPatient: (id: string) => void;

  appointments: Appointment[];
  addAppointment: (appt: Omit<Appointment, 'id' | 'organizationId'>) => void;
  updateAppointmentStatus: (id: string, statut: Appointment['statut']) => void;

  consultations: Consultation[];
  addConsultation: (consultation: Omit<Consultation, 'id' | 'organizationId' | 'doctorId'>) => string;
  startConsultationForPatient: (patientId: string, motifInitial?: string) => void;
  activeConsultationDraft: Partial<Consultation> | null;
  setActiveConsultationDraft: React.Dispatch<React.SetStateAction<Partial<Consultation> | null>>;

  prescriptions: Prescription[];
  addPrescription: (presc: Omit<Prescription, 'id' | 'organizationId' | 'doctorId'>) => string;

  certificates: MedicalCertificate[];
  addCertificate: (cert: Omit<MedicalCertificate, 'id' | 'organizationId' | 'doctorId'>) => string;

  documents: MedicalDocument[];
  addDocument: (doc: Omit<MedicalDocument, 'id' | 'organizationId' | 'uploadedByUserId' | 'isPrivateVault' | 'vaultStoragePath' | 'encryptionAlgorithm' | 'checksumSha256'>) => void;
  requestSignedDocumentUrl: (docId: string) => { signedUrl: string; expiresAt: string; checksum: string };

  medications: Medication[];

  // Finances (Scoped to current organization)
  transactions: PaymentTransaction[];
  addTransaction: (tx: Omit<PaymentTransaction, 'id' | 'organizationId'>) => void;
  updateTransaction: (id: string, updates: Partial<PaymentTransaction>) => void;
  paySingleTransaction: (id: string, modePaiement?: PaymentTransaction['modePaiement']) => void;
  payAllPendingTodayTransactions: (modePaiement?: PaymentTransaction['modePaiement']) => number;
  expenses: ExpenseItem[];
  addExpense: (expense: Omit<ExpenseItem, 'id' | 'organizationId'>) => void;

  // Settings & Profile
  settings: PracticeSettings;
  updateSettings: (newSettings: PracticeSettings) => void;
  loadDrElQyamiProfile: () => void;
  resetToDefaultProfile: () => void;

  // Modals & UI utilities
  printPreview: PrintPreviewState;
  openPrintPreview: (type: PrintPreviewState['type'], title: string, data: any) => void;
  closePrintPreview: () => void;
  isCommandPaletteOpen: boolean;
  setIsCommandPaletteOpen: (open: boolean) => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  toasts: ToastMessage[];
  showToast: (title: string, description?: string, type?: ToastMessage['type']) => void;
  dismissToast: (id: string) => void;
  quickSearchQuery: string;
  setQuickSearchQuery: (q: string) => void;

  // Security, Audit & CNDP Compliance
  accessUsers: AccessUser[];
  updateAccessUser: (id: string, updates: Partial<AccessUser>) => void;
  addAccessUser: (user: Omit<AccessUser, 'id' | 'organizationId'>) => void;
  auditLogs: AuditLogEntry[];
  logAuditEvent: (
    actionType: AuditActionType,
    categorie: AuditLogEntry['categorie'],
    details: string,
    patientId?: string,
    patientName?: string
  ) => void;
  patientConsents: PatientConsent[];
  addPatientConsent: (consent: Omit<PatientConsent, 'id' | 'organizationId'>) => void;
  updateConsentStatus: (id: string, statut: PatientConsent['statut']) => void;
  retentionPolicies: RetentionPolicy[];
  updateRetentionPolicy: (id: string, updates: Partial<RetentionPolicy>) => void;
  exportJobs: DataExportJob[];
  createExportJob: (typeExport: DataExportJob['typeExport'], format: DataExportJob['format']) => void;
  updatePrivacyPolicy: (updates: Partial<PrivacyPolicyConfig>) => void;

  // Support Tickets & Wolf Digital SaaS Cockpit
  supportTickets: SupportTicket[];
  addSupportTicket: (ticket: {
    category: SupportTicket['category'];
    priority: SupportTicket['priority'];
    subject: string;
    message: string;
  }) => void;
  addSupportTicketMessage: (ticketId: string, message: string) => void;
  wolfMetrics: WolfDigitalMetric;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [currentTab, setCurrentTab] = useState<NavigationTab>('dashboard');
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>('pat-agadir-1');

  // Multi-Tenant SaaS State
  const [organizations, setOrganizations] = useState<Organization[]>(ORGANIZATIONS);
  const [currentOrgId, setCurrentOrgId] = useState<string>('org-elqyami'); // Default: Dr Yassine EL QYAMI (Agadir)

  const [users, setUsers] = useState<UserAccount[]>(INITIAL_USER_ACCOUNTS);
  const [currentUserId, setCurrentUserId] = useState<string>('usr-elqyami-owner');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [sessionMinutesRemaining, setSessionMinutesRemaining] = useState<number>(30);

  // Global Master Datasets (Containing all organizations with strict RLS partition)
  const [allPatients, setAllPatients] = useState<Patient[]>(INITIAL_PATIENTS);
  const [allWaitingRoom, setAllWaitingRoom] = useState<WaitingPatient[]>(INITIAL_WAITING_ROOM);
  const [allAppointments, setAllAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
  const [allConsultations, setAllConsultations] = useState<Consultation[]>(INITIAL_CONSULTATIONS);
  const [allPrescriptions, setAllPrescriptions] = useState<Prescription[]>(INITIAL_PRESCRIPTIONS);
  const [allCertificates, setAllCertificates] = useState<MedicalCertificate[]>(INITIAL_CERTIFICATES);
  const [allDocuments, setAllDocuments] = useState<MedicalDocument[]>(INITIAL_DOCUMENTS);
  const [medications] = useState<Medication[]>(INITIAL_MEDICATIONS);
  const [allTransactions, setAllTransactions] = useState<PaymentTransaction[]>(INITIAL_TRANSACTIONS);
  const [allExpenses, setAllExpenses] = useState<ExpenseItem[]>(INITIAL_EXPENSES);

  // Security & Compliance
  const [allAccessUsers, setAllAccessUsers] = useState<AccessUser[]>(INITIAL_ACCESS_USERS);
  const [allAuditLogs, setAllAuditLogs] = useState<AuditLogEntry[]>(INITIAL_AUDIT_LOGS);
  const [allPatientConsents, setAllPatientConsents] = useState<PatientConsent[]>(INITIAL_PATIENT_CONSENTS);
  const [retentionPolicies, setRetentionPolicies] = useState<RetentionPolicy[]>(INITIAL_RETENTION_POLICIES);
  const [allExportJobs, setAllExportJobs] = useState<DataExportJob[]>(INITIAL_EXPORT_JOBS);

  // Support & Global Wolf Digital Cockpit
  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>(INITIAL_SUPPORT_TICKETS);
  const [wolfMetrics, setWolfMetrics] = useState<WolfDigitalMetric>(WOLF_DIGITAL_METRICS);

  // Active Practice Settings
  const [settings, setSettings] = useState<PracticeSettings>(DR_EL_QYAMI_SETTINGS);

  // Consultation Draft
  const [activeConsultationDraft, setActiveConsultationDraft] = useState<Partial<Consultation> | null>({
    patientId: 'pat-agadir-1',
    patientNomComplet: 'Rayan EL AMRI',
    date: '2026-08-25',
    heure: '09:00',
    dureeMinutes: 25,
    type: 'Présentiel',
    motif: 'Contrôle asthme & renouvellement ordonnance de fond',
    constantes: {
      tensionSystolique: 95,
      tensionDiastolique: 60,
      temperature: 36.9,
      poids: 18.5,
      taille: 110,
      imc: 15.3,
      frequenceCardiaque: 88,
      saturationO2: 99
    },
    symptomes: ['Aucune crise nocturne depuis 2 mois', 'Excellente tolérance à l’effort'],
    examenClinique: 'Enfant eupnéique au repos. Murmure vésiculaire symétrique sans sibilant. Oropharynx calme.',
    diagnostic: 'Asthme pédiatrique bien contrôlé sous corticothérapie inhalée à dose minimale',
    codeCim10: 'J45.0 - Asthme allergique de l’enfant',
    traitement: 'Flixotide 50µg (1 bouffée matin et soir avec chambre AeroChamber) + Ventoline si besoin',
    notesMedicales: 'Feuille de soins AMO CNSS délivrée avec prise en charge ALD 100%.',
    notesPriveesMedecin: 'Proposer test de baisse de palier au printemps 2027.',
    tarif: 250,
    reglementStatut: 'Payé',
    modePaiement: 'Carte Bancaire'
  });

  const [printPreview, setPrintPreview] = useState<PrintPreviewState>({
    isOpen: false,
    type: 'prescription',
    title: '',
    data: null
  });

  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [quickSearchQuery, setQuickSearchQuery] = useState('');

  // -------------------------------------------------------------
  // CURRENT TENANT & USER RESOLUTION
  // -------------------------------------------------------------
  const currentOrganization = useMemo(() => {
    return organizations.find((o) => o.id === currentOrgId) || organizations[0];
  }, [organizations, currentOrgId]);

  const currentUser = useMemo(() => {
    return users.find((u) => u.id === currentUserId) || users[0];
  }, [users, currentUserId]);

  const hasPermission = (permissionKey: keyof RolePermissions): boolean => {
    if (!currentUser || !currentUser.permissions) return false;
    return !!currentUser.permissions[permissionKey];
  };

  // -------------------------------------------------------------
  // ROW-LEVEL SECURITY (RLS) FILTERS
  // Strict tenant boundary: A user can only access resources of their organization
  // -------------------------------------------------------------
  const patients = useMemo(() => {
    if (currentUser.role === 'WOLF_DIGITAL_SUPERADMIN') return []; // ZERO CLINICAL ACCESS
    return allPatients.filter((p) => p.organizationId === currentOrganization.id);
  }, [allPatients, currentOrganization.id, currentUser.role]);

  const consultations = useMemo(() => {
    if (currentUser.role === 'WOLF_DIGITAL_SUPERADMIN') return []; // ZERO CLINICAL ACCESS
    return allConsultations.filter((c) => c.organizationId === currentOrganization.id);
  }, [allConsultations, currentOrganization.id, currentUser.role]);

  const prescriptions = useMemo(() => {
    if (currentUser.role === 'WOLF_DIGITAL_SUPERADMIN') return []; // ZERO CLINICAL ACCESS
    return allPrescriptions.filter((pr) => pr.organizationId === currentOrganization.id);
  }, [allPrescriptions, currentOrganization.id, currentUser.role]);

  const certificates = useMemo(() => {
    if (currentUser.role === 'WOLF_DIGITAL_SUPERADMIN') return []; // ZERO CLINICAL ACCESS
    return allCertificates.filter((ce) => ce.organizationId === currentOrganization.id);
  }, [allCertificates, currentOrganization.id, currentUser.role]);

  const documents = useMemo(() => {
    if (currentUser.role === 'WOLF_DIGITAL_SUPERADMIN') return []; // ZERO CLINICAL ACCESS
    return allDocuments.filter((d) => d.organizationId === currentOrganization.id);
  }, [allDocuments, currentOrganization.id, currentUser.role]);

  const appointments = useMemo(() => {
    if (currentUser.role === 'WOLF_DIGITAL_SUPERADMIN') return [];
    return allAppointments.filter((a) => a.organizationId === currentOrganization.id);
  }, [allAppointments, currentOrganization.id, currentUser.role]);

  const waitingRoom = useMemo(() => {
    if (currentUser.role === 'WOLF_DIGITAL_SUPERADMIN') return [];
    return allWaitingRoom.filter((w) => w.organizationId === currentOrganization.id);
  }, [allWaitingRoom, currentOrganization.id, currentUser.role]);

  const transactions = useMemo(() => {
    if (currentUser.role === 'WOLF_DIGITAL_SUPERADMIN') return [];
    return allTransactions.filter((t) => t.organizationId === currentOrganization.id);
  }, [allTransactions, currentOrganization.id, currentUser.role]);

  const expenses = useMemo(() => {
    if (currentUser.role === 'WOLF_DIGITAL_SUPERADMIN') return [];
    return allExpenses.filter((e) => e.organizationId === currentOrganization.id);
  }, [allExpenses, currentOrganization.id, currentUser.role]);

  const accessUsers = useMemo(() => {
    return allAccessUsers.filter((u) => u.organizationId === currentOrganization.id);
  }, [allAccessUsers, currentOrganization.id]);

  const auditLogs = useMemo(() => {
    return allAuditLogs.filter((l) => l.organizationId === currentOrganization.id);
  }, [allAuditLogs, currentOrganization.id]);

  const patientConsents = useMemo(() => {
    return allPatientConsents.filter((c) => c.organizationId === currentOrganization.id);
  }, [allPatientConsents, currentOrganization.id]);

  const exportJobs = useMemo(() => {
    return allExportJobs.filter((j) => j.organizationId === currentOrganization.id);
  }, [allExportJobs, currentOrganization.id]);

  // Sync practice settings when organization switches
  useEffect(() => {
    if (currentOrgId === 'org-elqyami') {
      setSettings(DR_EL_QYAMI_SETTINGS);
    } else if (currentOrgId === 'org-bennani') {
      setSettings(INITIAL_SETTINGS);
    }
    // Select first patient of the new org
    const firstPat = allPatients.find((p) => p.organizationId === currentOrgId);
    if (firstPat) {
      setSelectedPatientId(firstPat.id);
    } else {
      setSelectedPatientId(null);
    }
  }, [currentOrgId, allPatients]);

  // Session timeout simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setSessionMinutesRemaining((prev) => {
        if (prev <= 1) {
          showToast('Session expirée', 'Veuillez vous reconnecter pour poursuivre.', 'warning');
          return 0;
        }
        return prev - 1;
      });
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const extendSession = () => {
    setSessionMinutesRemaining(30);
    showToast('Session prolongée', 'Votre session a été renouvelée pour 30 minutes.');
  };

  const login = (email: string) => {
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (user) {
      setCurrentUserId(user.id);
      setCurrentOrgId(user.organizationId);
      setIsLoggedIn(true);
      setSessionMinutesRemaining(30);
      showToast(`Connexion réussie`, `Bienvenue, ${user.name} (${user.roleLabel}).`);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
    showToast('Déconnexion réussie', 'Votre session sécurisée a été clôturée.');
  };

  const switchOrganizationAndUser = (orgId: string, userId?: string) => {
    const org = organizations.find((o) => o.id === orgId);
    if (!org) return;

    setCurrentOrgId(orgId);

    // Find default user for this org if not specified
    let targetUser: UserAccount | undefined;
    if (userId) {
      targetUser = users.find((u) => u.id === userId);
    } else {
      targetUser = users.find((u) => u.organizationId === orgId);
    }

    if (targetUser) {
      setCurrentUserId(targetUser.id);
    }

    logAuditEvent(
      'CHANGEMENT_ORGANISATION',
      'Sécurité & Accès',
      `Basculement vers l'organisation : ${org.name} (Rôle actif: ${targetUser?.roleLabel || 'Inconnu'})`
    );

    if (targetUser?.role === 'WOLF_DIGITAL_SUPERADMIN') {
      setCurrentTab('wolf-admin');
    } else {
      setCurrentTab('dashboard');
    }

    showToast(
      'Organisation active basculée',
      `Vous opérez désormais dans : ${org.name} [3 000 MAD/an]`
    );
  };

  const renewSubscription = (orgId: string) => {
    setOrganizations((prev) =>
      prev.map((o) =>
        o.id === orgId
          ? {
              ...o,
              subscriptionStatus: 'active',
              subscriptionStart: '2026-08-25',
              subscriptionEnd: '2027-08-24'
            }
          : o
      )
    );

    logAuditEvent(
      'RENOUVELLEMENT_ABONNEMENT',
      'Sécurité & Accès',
      `Renouvellement de l'abonnement annuel MEDICAL OS Standard (3 000 MAD / an)`
    );

    showToast('Abonnement renouvelé', 'Licence annuelle active jusqu’au 24/08/2027 (3 000 MAD).');
  };

  // Toast Helper
  const showToast = (title: string, description?: string, type: ToastMessage['type'] = 'success') => {
    const id = `toast-${Date.now()}`;
    setToasts((prev) => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      dismissToast(id);
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Audit Logging
  const logAuditEvent = (
    actionType: AuditActionType,
    categorie: AuditLogEntry['categorie'],
    details: string,
    patientId?: string,
    patientName?: string
  ) => {
    const now = new Date();
    const timestampStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    const hash = generateAuditHash(`${timestampStr}-${actionType}-${details}-${patientId || ''}`);

    const newLog: AuditLogEntry = {
      id: `log-${Date.now()}`,
      organizationId: currentOrganization.id,
      timestamp: timestampStr,
      userId: currentUser.id,
      userName: currentUser.name,
      userRole: currentUser.roleLabel,
      actionType,
      categorie,
      patientId,
      patientName,
      ipAddress: '196.200.180.12 (Cabinet Médical Sécurisé)',
      details,
      hashIntegrite: hash
    };

    setAllAuditLogs((prev) => [newLog, ...prev]);
  };

  const playChime = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime);
      osc.frequency.setValueAtTime(880.00, audioCtx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.5);
    } catch {
      // Audio context restricted
    }
  };

  const openPatientDetail = (id: string) => {
    const patient = patients.find((p) => p.id === id);
    setSelectedPatientId(id);
    setCurrentTab('patient-detail');
    if (patient) {
      logAuditEvent(
        'LECTURE_DOSSIER',
        'Dossier Patient',
        `Consultation du dossier médical informatisé et antécédents`,
        patient.id,
        `${patient.prenom} ${patient.nom}`
      );
    }
  };

  const addPatient = (patientData: Omit<Patient, 'id' | 'organizationId'>): string => {
    const newId = `pat-${Date.now()}`;
    const newPatient: Patient = {
      id: newId,
      organizationId: currentOrganization.id,
      ...patientData,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };
    setAllPatients((prev) => [newPatient, ...prev]);

    // Mandatory health data consent record under Loi 09-08
    const consentItem: PatientConsent = {
      id: `cst-${Date.now()}`,
      organizationId: currentOrganization.id,
      patientId: newId,
      patientNom: `${newPatient.prenom} ${newPatient.nom}`,
      cin: newPatient.cin,
      typeConsentement: 'traitement_donnees_sante',
      libelle: 'Traitement et conservation des données de santé au dossier médical informatisé',
      baseLegale: 'Articles 4 & 12 de la Loi 09-08',
      dateConsentement: new Date().toISOString().split('T')[0],
      statut: 'Accordé',
      methodeRecueil: 'Signature électronique sur tablette',
      recueilliPar: currentUser.name
    };
    setAllPatientConsents((prev) => [consentItem, ...prev]);

    logAuditEvent(
      'CREATION_PATIENT',
      'Dossier Patient',
      `Création nouveau dossier patient (CIN ${newPatient.cin}, ${newPatient.organismeAssurance})`,
      newId,
      `${newPatient.prenom} ${newPatient.nom}`
    );

    showToast('Patient enregistré', `${newPatient.prenom} ${newPatient.nom} a été ajouté au dossier médical.`);
    return newId;
  };

  const updatePatient = (id: string, updates: Partial<Patient>) => {
    setAllPatients((prev) =>
      prev.map((p) =>
        p.id === id && p.organizationId === currentOrganization.id
          ? { ...p, ...updates, updatedAt: new Date().toISOString().split('T')[0] }
          : p
      )
    );
    const patient = patients.find((p) => p.id === id);
    if (patient) {
      logAuditEvent(
        'MODIFICATION_DOSSIER',
        'Dossier Patient',
        `Mise à jour des informations du dossier patient (coordonnées / antécédents)`,
        id,
        `${patient.prenom} ${patient.nom}`
      );
    }
    showToast('Dossier mis à jour', 'Les modifications ont été sauvegardées.');
  };

  const deletePatientControlled = (id: string, reason: string): boolean => {
    if (!hasPermission('canDeleteRecords')) {
      showToast('Action refusée', 'Seul le médecin titulaire peut archiver un dossier patient.', 'warning');
      return false;
    }

    const patient = patients.find((p) => p.id === id);
    if (!patient) return false;

    // Soft delete / Archival workflow
    setAllPatients((prev) =>
      prev.map((p) => (p.id === id ? { ...p, statut: 'Inactif', notesGenerales: `${p.notesGenerales || ''} [Archivé: ${reason}]` } : p))
    );

    logAuditEvent(
      'SUPPRESSION_DONNEES',
      'Dossier Patient',
      `Archivage contrôlé du dossier patient avec motif légal : ${reason}`,
      id,
      `${patient.prenom} ${patient.nom}`
    );

    showToast('Dossier archivé', `${patient.prenom} ${patient.nom} a été basculé en statut inactif conformément aux règles de rétention.`);
    return true;
  };

  const callWaitingPatient = (id: string) => {
    playChime();
    setAllWaitingRoom((prev) =>
      prev.map((w) => {
        if (w.id === id && w.organizationId === currentOrganization.id) {
          const nextStatus = w.statut === 'En attente' ? 'Appelé' : 'En consultation';
          return { ...w, statut: nextStatus };
        }
        return w;
      })
    );
    const patient = waitingRoom.find((w) => w.id === id);
    if (patient) {
      showToast(
        `Patient appelé : ${patient.nomComplet}`,
        `Le patient a été invité à entrer en cabinet de consultation.`,
        'info'
      );
    }
  };

  const setWaitingStatus = (id: string, statut: WaitingPatient['statut']) => {
    setAllWaitingRoom((prev) =>
      prev.map((w) => (w.id === id && w.organizationId === currentOrganization.id ? { ...w, statut } : w))
    );
  };

  const addWaitingPatient = (item: Omit<WaitingPatient, 'id' | 'organizationId'>) => {
    const newItem: WaitingPatient = {
      id: `wait-${Date.now()}`,
      organizationId: currentOrganization.id,
      ...item
    };
    setAllWaitingRoom((prev) => [...prev, newItem]);
    showToast('Patient en salle d’attente', `${item.nomComplet} a été enregistré.`);
  };

  const removeWaitingPatient = (id: string) => {
    setAllWaitingRoom((prev) => prev.filter((w) => w.id !== id));
  };

  const addAppointment = (appt: Omit<Appointment, 'id' | 'organizationId'>) => {
    const newAppt: Appointment = {
      id: `rdv-${Date.now()}`,
      organizationId: currentOrganization.id,
      ...appt,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setAllAppointments((prev) => [...prev, newAppt]);
    showToast('Rendez-vous programmé', `RDV pour ${appt.patientNomComplet} le ${appt.date} à ${appt.heureDebut}.`);
  };

  const updateAppointmentStatus = (id: string, statut: Appointment['statut']) => {
    setAllAppointments((prev) =>
      prev.map((a) => (a.id === id && a.organizationId === currentOrganization.id ? { ...a, statut } : a))
    );
  };

  const addConsultation = (consData: Omit<Consultation, 'id' | 'organizationId' | 'doctorId'>): string => {
    const newId = `cons-${Date.now()}`;
    const newCons: Consultation = {
      id: newId,
      organizationId: currentOrganization.id,
      doctorId: currentUser.id,
      ...consData,
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 19),
      updatedAt: new Date().toISOString().replace('T', ' ').slice(0, 19)
    };
    setAllConsultations((prev) => [newCons, ...prev]);

    // Update patient last consultation date
    setAllPatients((prev) =>
      prev.map((p) =>
        p.id === consData.patientId && p.organizationId === currentOrganization.id
          ? { ...p, derniereConsultation: consData.date }
          : p
      )
    );

    // Record payment transaction
    const newTx: PaymentTransaction = {
      id: `tx-${Date.now()}`,
      organizationId: currentOrganization.id,
      date: consData.date,
      patientId: consData.patientId,
      patientNomComplet: consData.patientNomComplet,
      montant: consData.tarif,
      typeActe: `Consultation (${consData.type})`,
      modePaiement: consData.modePaiement || 'Carte Bancaire',
      statut: consData.reglementStatut === 'Payé' ? 'Payé' : 'En attente',
      enregistreParUserId: currentUser.id
    };
    setAllTransactions((prev) => [newTx, ...prev]);

    // Mark in waiting room if present
    setAllWaitingRoom((prev) =>
      prev.map((w) =>
        w.patientId === consData.patientId && w.organizationId === currentOrganization.id
          ? { ...w, statut: 'Terminé' }
          : w
      )
    );

    logAuditEvent(
      'MODIFICATION_DOSSIER',
      'Dossier Patient',
      `Saisie d'une consultation (${consData.type}) - Diagnostic : ${consData.diagnostic || 'Non spécifié'}`,
      consData.patientId,
      consData.patientNomComplet
    );

    showToast('Consultation enregistrée', `Dossier de ${consData.patientNomComplet} actualisé (${consData.tarif} DH).`);
    return newId;
  };

  const startConsultationForPatient = (patientId: string, motifInitial?: string) => {
    const patient = patients.find((p) => p.id === patientId);
    if (!patient) return;

    setSelectedPatientId(patientId);
    setActiveConsultationDraft({
      patientId: patient.id,
      patientNomComplet: `${patient.prenom} ${patient.nom}`,
      date: '2026-08-25',
      heure: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      dureeMinutes: 20,
      type: 'Présentiel',
      motif: motifInitial || (currentOrgId === 'org-elqyami' ? 'Examen pédiatrique & suivi' : 'Consultation de médecine générale & suivi'),
      constantes: {
        tensionSystolique: 115,
        tensionDiastolique: 75,
        temperature: 37.0,
        poids: patient.poidsRef || 20,
        taille: patient.tailleRef || 110,
        imc: patient.poidsRef && patient.tailleRef ? Number((patient.poidsRef / Math.pow(patient.tailleRef / 100, 2)).toFixed(1)) : 16.5,
        frequenceCardiaque: 78,
        saturationO2: 99,
        glycemie: 0.95
      },
      symptomes: [],
      examenClinique: '',
      diagnostic: '',
      traitement: '',
      notesMedicales: '',
      tarif: 250,
      reglementStatut: 'Payé',
      modePaiement: 'Carte Bancaire'
    });

    logAuditEvent(
      'LECTURE_DOSSIER',
      'Dossier Patient',
      `Démarrage d'une nouvelle consultation médicale pour le patient`,
      patient.id,
      `${patient.prenom} ${patient.nom}`
    );

    setCurrentTab('consultation');
  };

  const addPrescription = (prescData: Omit<Prescription, 'id' | 'organizationId' | 'doctorId'>): string => {
    const newId = `ord-${Date.now()}`;
    const newPresc: Prescription = {
      id: newId,
      organizationId: currentOrganization.id,
      doctorId: currentUser.id,
      ...prescData,
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 19)
    };
    setAllPrescriptions((prev) => [newPresc, ...prev]);

    // Also add to documents library (Private Vault storage)
    const newDoc: MedicalDocument = {
      id: `doc-${Date.now()}`,
      organizationId: currentOrganization.id,
      patientId: prescData.patientId,
      patientNomComplet: prescData.patientNomComplet,
      nom: `Ordonnance du ${prescData.date} (${prescData.medicaments.length} produits).pdf`,
      categorie: 'Ordonnances',
      date: prescData.date,
      taille: '120 Ko',
      auteur: currentUser.name,
      uploadedByUserId: currentUser.id,
      typeMime: 'application/pdf',
      apercuContenu: prescData.medicaments.map((m) => m.medicament).join(', '),
      isPrivateVault: true,
      vaultStoragePath: `vault/${currentOrganization.id}/patients/${prescData.patientId}/ord-${newId}.pdf.enc`,
      encryptionAlgorithm: 'AES-256-GCM',
      checksumSha256: generateAuditHash(`ord-${newId}`),
      signedUrlExpiresInMinutes: 15
    };
    setAllDocuments((prev) => [newDoc, ...prev]);

    logAuditEvent(
      'PRESCRIPTION_MEDICAMENTEUSE',
      'Prescription',
      `Émission ordonnance (${prescData.medicaments.length} médicaments) : ${prescData.medicaments.map((m) => m.medicament).slice(0, 3).join(', ')}`,
      prescData.patientId,
      prescData.patientNomComplet
    );

    showToast('Ordonnance créée', `Ordonnance générée pour ${prescData.patientNomComplet}.`);
    return newId;
  };

  const addCertificate = (certData: Omit<MedicalCertificate, 'id' | 'organizationId' | 'doctorId'>): string => {
    const newId = `cert-${Date.now()}`;
    const newCert: MedicalCertificate = {
      id: newId,
      organizationId: currentOrganization.id,
      doctorId: currentUser.id,
      ...certData,
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 19)
    };
    setAllCertificates((prev) => [newCert, ...prev]);

    const newDoc: MedicalDocument = {
      id: `doc-${Date.now()}`,
      organizationId: currentOrganization.id,
      patientId: certData.patientId,
      patientNomComplet: certData.patientNomComplet,
      nom: `${certData.titre} - ${certData.date}.pdf`,
      categorie: 'Certificats',
      date: certData.date,
      taille: '95 Ko',
      auteur: currentUser.name,
      uploadedByUserId: currentUser.id,
      typeMime: 'application/pdf',
      apercuContenu: certData.texteContenu.slice(0, 100) + '...',
      isPrivateVault: true,
      vaultStoragePath: `vault/${currentOrganization.id}/patients/${certData.patientId}/cert-${newId}.pdf.enc`,
      encryptionAlgorithm: 'AES-256-GCM',
      checksumSha256: generateAuditHash(`cert-${newId}`),
      signedUrlExpiresInMinutes: 15
    };
    setAllDocuments((prev) => [newDoc, ...prev]);

    logAuditEvent(
      'MODIFICATION_DOSSIER',
      'Dossier Patient',
      `Délivrance certificat médical : ${certData.titre}`,
      certData.patientId,
      certData.patientNomComplet
    );

    showToast('Certificat généré', `${certData.titre} prêt pour impression.`);
    return newId;
  };

  const addDocument = (docData: Omit<MedicalDocument, 'id' | 'organizationId' | 'uploadedByUserId' | 'isPrivateVault' | 'vaultStoragePath' | 'encryptionAlgorithm' | 'checksumSha256'>) => {
    const docId = `doc-${Date.now()}`;
    const newDoc: MedicalDocument = {
      id: docId,
      organizationId: currentOrganization.id,
      uploadedByUserId: currentUser.id,
      isPrivateVault: true,
      vaultStoragePath: `vault/${currentOrganization.id}/patients/${docData.patientId}/${docId}.enc`,
      encryptionAlgorithm: 'AES-256-GCM',
      checksumSha256: generateAuditHash(`${docId}-${docData.nom}`),
      signedUrlExpiresInMinutes: 15,
      ...docData
    };
    setAllDocuments((prev) => [newDoc, ...prev]);

    logAuditEvent(
      'MODIFICATION_DOSSIER',
      'Stockage Privé',
      `Téléversement sécurisé dans le coffre-fort chiffré AES-256 : ${docData.nom}`,
      docData.patientId,
      docData.patientNomComplet
    );

    showToast('Document chiffré et archivé', `${docData.nom} sauvegardé dans le stockage privé.`);
  };

  // Secure tokenized temporary signed URL generator (Private cloud storage vault)
  const requestSignedDocumentUrl = (docId: string) => {
    const doc = documents.find((d) => d.id === docId);
    if (!doc) {
      throw new Error('Document introuvable ou accès non autorisé.');
    }

    const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString();
    const token = generateAuditHash(`${doc.id}-${currentUser.id}-${expiresAt}`);
    const signedUrl = `https://storage.medicalos.ma/vault/v1/${currentOrganization.id}/${doc.patientId}/${doc.id}?token=${token}&expires=${expiresAt}`;

    logAuditEvent(
      'TELECHARGEMENT_DOCUMENT_PRIVE',
      'Stockage Privé',
      `Génération d'un lien temporaire signé (validité 15 min) pour le document : ${doc.nom}`,
      doc.patientId,
      doc.patientNomComplet
    );

    showToast(
      'Lien signé généré',
      `Accès temporaire sécurisé (15 min) généré pour : ${doc.nom}`,
      'info'
    );

    return {
      signedUrl,
      expiresAt,
      checksum: doc.checksumSha256
    };
  };

  const addTransaction = (txData: Omit<PaymentTransaction, 'id' | 'organizationId'>) => {
    const newTx: PaymentTransaction = {
      id: `tx-${Date.now()}`,
      organizationId: currentOrganization.id,
      enregistreParUserId: currentUser.id,
      ...txData
    };
    setAllTransactions((prev) => [newTx, ...prev]);
    showToast('Paiement enregistré', `${txData.montant.toFixed(0)} DH reçu.`);
  };

  const updateTransaction = (id: string, updates: Partial<PaymentTransaction>) => {
    setAllTransactions((prev) =>
      prev.map((t) => (t.id === id && t.organizationId === currentOrganization.id ? { ...t, ...updates } : t))
    );
  };

  const paySingleTransaction = (id: string, modePaiement?: PaymentTransaction['modePaiement']) => {
    const tx = transactions.find((t) => t.id === id);
    if (!tx) return;

    const chosenMode = modePaiement || tx.modePaiement || 'Espèces';
    setAllTransactions((prev) =>
      prev.map((t) =>
        t.id === id && t.organizationId === currentOrganization.id
          ? { ...t, statut: 'Payé', modePaiement: chosenMode }
          : t
      )
    );

    logAuditEvent(
      'MODIFICATION_DOSSIER',
      'Sécurité & Accès',
      `Règlement encaissé pour ${tx.patientNomComplet} : ${tx.montant} DH (${chosenMode})`,
      tx.patientId,
      tx.patientNomComplet
    );

    showToast('Règlement validé', `${tx.montant} DH encaissés pour ${tx.patientNomComplet} (${chosenMode}).`);
  };

  const payAllPendingTodayTransactions = (modePaiement: PaymentTransaction['modePaiement'] = 'Espèces'): number => {
    const today = '2026-08-25';
    let totalPaid = 0;
    let count = 0;

    setAllTransactions((prev) =>
      prev.map((t) => {
        if (t.organizationId === currentOrganization.id && t.date === today && t.statut !== 'Payé') {
          totalPaid += t.montant;
          count++;
          return {
            ...t,
            statut: 'Payé',
            modePaiement: modePaiement || t.modePaiement || 'Espèces'
          };
        }
        return t;
      })
    );

    setAllConsultations((prev) =>
      prev.map((c) => {
        if (c.organizationId === currentOrganization.id && c.date === today && c.reglementStatut !== 'Payé') {
          return {
            ...c,
            reglementStatut: 'Payé',
            modePaiement: modePaiement || c.modePaiement || 'Espèces'
          };
        }
        return c;
      })
    );

    logAuditEvent(
      'MODIFICATION_DOSSIER',
      'Sécurité & Accès',
      `Clôture de caisse du soir : Règlement groupé de ${count} actes pour ${totalPaid} DH (${modePaiement})`
    );

    showToast(
      'Clôture & Règlements du soir validés',
      `${count} acte(s) soldé(s) pour un montant total de ${totalPaid} DH (${modePaiement}).`
    );

    return totalPaid;
  };

  const addExpense = (expenseData: Omit<ExpenseItem, 'id' | 'organizationId'>) => {
    const newExp: ExpenseItem = {
      id: `exp-${Date.now()}`,
      organizationId: currentOrganization.id,
      ...expenseData
    };
    setAllExpenses((prev) => [newExp, ...prev]);
    showToast('Dépense enregistrée', `${expenseData.montant} DH pour ${expenseData.fournisseur}.`);
  };

  const updateSettings = (newSettings: PracticeSettings) => {
    setSettings(newSettings);
    logAuditEvent(
      'MODIFICATION_DOSSIER',
      'Sécurité & Accès',
      `Mise à jour des paramètres du cabinet et informations légales CNDP/INPE`
    );
    showToast('Paramètres sauvegardés', 'Les modifications du cabinet ont été appliquées.');
  };

  const loadDrElQyamiProfile = () => {
    switchOrganizationAndUser('org-elqyami', 'usr-elqyami-owner');
  };

  const resetToDefaultProfile = () => {
    switchOrganizationAndUser('org-bennani', 'usr-bennani-owner');
  };

  const openPrintPreview = (type: PrintPreviewState['type'], title: string, data: any) => {
    setPrintPreview({
      isOpen: true,
      type,
      title,
      data
    });
  };

  const closePrintPreview = () => {
    setPrintPreview((prev) => ({ ...prev, isOpen: false }));
  };

  const updateAccessUser = (id: string, updates: Partial<AccessUser>) => {
    setAllAccessUsers((prev) =>
      prev.map((u) => (u.id === id && u.organizationId === currentOrganization.id ? { ...u, ...updates } : u))
    );
    logAuditEvent(
      'MODIFICATION_DOSSIER',
      'Sécurité & Accès',
      `Mise à jour des droits et privilèges d'accès pour l'utilisateur ID ${id}`
    );
    showToast('Droits d’accès mis à jour', 'Les privilèges utilisateur ont été actualisés.');
  };

  const addAccessUser = (userData: Omit<AccessUser, 'id' | 'organizationId'>) => {
    const newId = `usr-${Date.now()}`;
    const newUser: AccessUser = {
      id: newId,
      organizationId: currentOrganization.id,
      ...userData
    };
    setAllAccessUsers((prev) => [...prev, newUser]);
    logAuditEvent(
      'MODIFICATION_DOSSIER',
      'Sécurité & Accès',
      `Création d'un nouveau compte utilisateur habilité : ${newUser.prenom} ${newUser.nom} (${newUser.role})`
    );
    showToast('Utilisateur ajouté', `Le compte de ${newUser.prenom} ${newUser.nom} a été créé.`);
  };

  const addPatientConsent = (consentData: Omit<PatientConsent, 'id' | 'organizationId'>) => {
    const newId = `cst-${Date.now()}`;
    const newConsent: PatientConsent = {
      id: newId,
      organizationId: currentOrganization.id,
      ...consentData
    };
    setAllPatientConsents((prev) => [newConsent, ...prev]);
    logAuditEvent(
      'MODIFICATION_CONSENTEMENT',
      'Consentement',
      `Enregistrement du consentement (${newConsent.typeConsentement}) pour le patient - Statut : ${newConsent.statut}`,
      newConsent.patientId,
      newConsent.patientNom
    );
    showToast('Consentement enregistré', `Consentement tracé conformément à la loi 09-08.`);
  };

  const updateConsentStatus = (id: string, statut: PatientConsent['statut']) => {
    setAllPatientConsents((prev) =>
      prev.map((c) => (c.id === id && c.organizationId === currentOrganization.id ? { ...c, statut } : c))
    );
    const consent = patientConsents.find((c) => c.id === id);
    if (consent) {
      logAuditEvent(
        'MODIFICATION_CONSENTEMENT',
        'Consentement',
        `Modification du statut du consentement (${consent.typeConsentement}) -> ${statut}`,
        consent.patientId,
        consent.patientNom
      );
    }
    showToast('Consentement actualisé', `Le statut du consentement est passé à : ${statut}.`);
  };

  const updateRetentionPolicy = (id: string, updates: Partial<RetentionPolicy>) => {
    setRetentionPolicies((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...updates } : r))
    );
    logAuditEvent(
      'MODIFICATION_DOSSIER',
      'Sécurité & Accès',
      `Ajustement de la politique de rétention pour la catégorie ID ${id}`
    );
    showToast('Politique de rétention mise à jour', 'Délai et règles de conservation ajustés.');
  };

  const createExportJob = (typeExport: DataExportJob['typeExport'], format: DataExportJob['format']) => {
    const newJob: DataExportJob = {
      id: `exp-${Date.now()}`,
      organizationId: currentOrganization.id,
      dateDemande: new Date().toISOString().replace('T', ' ').slice(0, 16),
      demandeur: currentUser.name,
      typeExport,
      format,
      statut: 'Généré',
      taille: format === 'ZIP' ? '12.4 Mo' : format === 'PDF' ? '3.1 Mo' : '650 Ko',
      emprunteSha256: generateAuditHash(`${typeExport}-${Date.now()}`)
    };
    setAllExportJobs((prev) => [newJob, ...prev]);
    logAuditEvent(
      'EXPORT_DONNEES_LOI_0908',
      'Export',
      `Export de données généré pour le cabinet : ${typeExport} [Format: ${format}, Hash: ${newJob.emprunteSha256.slice(0, 16)}...]`
    );
    showToast('Export généré', `Le fichier ${format} est prêt pour téléchargement sécurisé.`);
  };

  const updatePrivacyPolicy = (updates: Partial<PrivacyPolicyConfig>) => {
    setSettings((prev) => ({
      ...prev,
      privacyPolicy: {
        ...prev.privacyPolicy,
        ...updates
      }
    }));
    logAuditEvent(
      'MODIFICATION_DOSSIER',
      'Sécurité & Accès',
      `Mise à jour des mentions de la politique de confidentialité et du statut CNDP`
    );
    showToast('Politique CNDP mise à jour', 'Les mentions d’information des patients ont été modifiées.');
  };

  // Support Tickets
  const addSupportTicket = (ticketData: {
    category: SupportTicket['category'];
    priority: SupportTicket['priority'];
    subject: string;
    message: string;
  }) => {
    const newTicketId = `tkt-${Date.now()}`;
    const newTicket: SupportTicket = {
      id: newTicketId,
      organizationId: currentOrganization.id,
      organizationName: currentOrganization.name,
      userId: currentUser.id,
      userName: currentUser.name,
      category: ticketData.category,
      priority: ticketData.priority,
      subject: ticketData.subject,
      message: ticketData.message,
      status: 'Ouvert',
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      updatedAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      messages: [
        {
          id: `msg-${Date.now()}`,
          senderName: currentUser.name,
          senderRole: currentUser.roleLabel,
          isWolfStaff: false,
          timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
          message: ticketData.message
        }
      ]
    };
    setSupportTickets((prev) => [newTicket, ...prev]);
    showToast('Ticket créé', `Votre demande #${newTicketId} a été transmise à l'équipe Wolf Digital.`);
  };

  const addSupportTicketMessage = (ticketId: string, message: string) => {
    setSupportTickets((prev) =>
      prev.map((t) => {
        if (t.id === ticketId) {
          const isStaff = currentUser.role === 'WOLF_DIGITAL_SUPERADMIN';
          const newMsg = {
            id: `msg-${Date.now()}`,
            senderName: currentUser.name,
            senderRole: currentUser.roleLabel,
            isWolfStaff: isStaff,
            timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
            message
          };
          return {
            ...t,
            updatedAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
            status: isStaff ? 'En cours de traitement' : t.status,
            messages: [...t.messages, newMsg]
          };
        }
        return t;
      })
    );
    showToast('Message envoyé', 'Votre réponse a été ajoutée au ticket de support.');
  };

  return (
    <AppContext.Provider
      value={{
        currentTab,
        setCurrentTab,
        selectedPatientId,
        setSelectedPatientId,
        openPatientDetail,

        organizations,
        currentOrganization,
        users,
        currentUser,
        isLoggedIn,
        login,
        logout,
        switchOrganizationAndUser,
        sessionMinutesRemaining,
        extendSession,
        hasPermission,
        renewSubscription,

        patients,
        addPatient,
        updatePatient,
        deletePatientControlled,

        waitingRoom,
        callWaitingPatient,
        setWaitingStatus,
        addWaitingPatient,
        removeWaitingPatient,

        appointments,
        addAppointment,
        updateAppointmentStatus,

        consultations,
        addConsultation,
        startConsultationForPatient,
        activeConsultationDraft,
        setActiveConsultationDraft,

        prescriptions,
        addPrescription,

        certificates,
        addCertificate,

        documents,
        addDocument,
        requestSignedDocumentUrl,

        medications,

        transactions,
        addTransaction,
        updateTransaction,
        paySingleTransaction,
        payAllPendingTodayTransactions,
        expenses,
        addExpense,

        settings,
        updateSettings,
        loadDrElQyamiProfile,
        resetToDefaultProfile,

        printPreview,
        openPrintPreview,
        closePrintPreview,
        isCommandPaletteOpen,
        setIsCommandPaletteOpen,
        soundEnabled,
        setSoundEnabled,
        toasts,
        showToast,
        dismissToast,
        quickSearchQuery,
        setQuickSearchQuery,

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

        supportTickets,
        addSupportTicket,
        addSupportTicketMessage,
        wolfMetrics
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
