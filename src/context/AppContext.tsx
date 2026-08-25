import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  NavigationTab,
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
  PrivacyPolicyConfig
} from '../types';
import {
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
  INITIAL_ACCESS_USERS,
  INITIAL_AUDIT_LOGS,
  INITIAL_PATIENT_CONSENTS,
  INITIAL_RETENTION_POLICIES,
  INITIAL_EXPORT_JOBS
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
  currentTab: NavigationTab;
  setCurrentTab: (tab: NavigationTab) => void;
  selectedPatientId: string | null;
  setSelectedPatientId: (id: string | null) => void;
  openPatientDetail: (id: string) => void;
  patients: Patient[];
  addPatient: (patient: Omit<Patient, 'id'>) => string;
  updatePatient: (id: string, updates: Partial<Patient>) => void;
  waitingRoom: WaitingPatient[];
  callWaitingPatient: (id: string) => void;
  setWaitingStatus: (id: string, statut: WaitingPatient['statut']) => void;
  addWaitingPatient: (item: Omit<WaitingPatient, 'id'>) => void;
  removeWaitingPatient: (id: string) => void;
  appointments: Appointment[];
  addAppointment: (appt: Omit<Appointment, 'id'>) => void;
  updateAppointmentStatus: (id: string, statut: Appointment['statut']) => void;
  consultations: Consultation[];
  addConsultation: (consultation: Omit<Consultation, 'id'>) => string;
  startConsultationForPatient: (patientId: string, motifInitial?: string) => void;
  activeConsultationDraft: Partial<Consultation> | null;
  setActiveConsultationDraft: React.Dispatch<React.SetStateAction<Partial<Consultation> | null>>;
  prescriptions: Prescription[];
  addPrescription: (presc: Omit<Prescription, 'id'>) => string;
  certificates: MedicalCertificate[];
  addCertificate: (cert: Omit<MedicalCertificate, 'id'>) => string;
  documents: MedicalDocument[];
  addDocument: (doc: Omit<MedicalDocument, 'id'>) => void;
  medications: Medication[];
  transactions: PaymentTransaction[];
  addTransaction: (tx: Omit<PaymentTransaction, 'id'>) => void;
  updateTransaction: (id: string, updates: Partial<PaymentTransaction>) => void;
  paySingleTransaction: (id: string, modePaiement?: PaymentTransaction['modePaiement']) => void;
  payAllPendingTodayTransactions: (modePaiement?: PaymentTransaction['modePaiement']) => number;
  expenses: ExpenseItem[];
  settings: PracticeSettings;
  updateSettings: (newSettings: PracticeSettings) => void;
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

  // -------------------------------------------------------------
  // SÉCURITÉ & PROTECTION DES DONNÉES (LOI 09-08 & CNDP)
  // -------------------------------------------------------------
  accessUsers: AccessUser[];
  updateAccessUser: (id: string, updates: Partial<AccessUser>) => void;
  addAccessUser: (user: Omit<AccessUser, 'id'>) => void;
  auditLogs: AuditLogEntry[];
  logAuditEvent: (
    actionType: AuditActionType,
    categorie: AuditLogEntry['categorie'],
    details: string,
    patientId?: string,
    patientName?: string
  ) => void;
  patientConsents: PatientConsent[];
  addPatientConsent: (consent: Omit<PatientConsent, 'id'>) => void;
  updateConsentStatus: (id: string, statut: PatientConsent['statut']) => void;
  retentionPolicies: RetentionPolicy[];
  updateRetentionPolicy: (id: string, updates: Partial<RetentionPolicy>) => void;
  exportJobs: DataExportJob[];
  createExportJob: (typeExport: DataExportJob['typeExport'], format: DataExportJob['format']) => void;
  updatePrivacyPolicy: (updates: Partial<PrivacyPolicyConfig>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('dashboard');
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>('pat-1');
  const [patients, setPatients] = useState<Patient[]>(INITIAL_PATIENTS);
  const [waitingRoom, setWaitingRoom] = useState<WaitingPatient[]>(INITIAL_WAITING_ROOM);
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
  const [consultations, setConsultations] = useState<Consultation[]>(INITIAL_CONSULTATIONS);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>(INITIAL_PRESCRIPTIONS);
  const [certificates, setCertificates] = useState<MedicalCertificate[]>(INITIAL_CERTIFICATES);
  const [documents, setDocuments] = useState<MedicalDocument[]>(INITIAL_DOCUMENTS);
  const [medications] = useState<Medication[]>(INITIAL_MEDICATIONS);
  const [transactions, setTransactions] = useState<PaymentTransaction[]>(INITIAL_TRANSACTIONS);
  const [expenses] = useState<ExpenseItem[]>(INITIAL_EXPENSES);
  const [settings, setSettings] = useState<PracticeSettings>(INITIAL_SETTINGS);

  // Security & Data Protection states (Loi 09-08 & CNDP)
  const [accessUsers, setAccessUsers] = useState<AccessUser[]>(INITIAL_ACCESS_USERS);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(INITIAL_AUDIT_LOGS);
  const [patientConsents, setPatientConsents] = useState<PatientConsent[]>(INITIAL_PATIENT_CONSENTS);
  const [retentionPolicies, setRetentionPolicies] = useState<RetentionPolicy[]>(INITIAL_RETENTION_POLICIES);
  const [exportJobs, setExportJobs] = useState<DataExportJob[]>(INITIAL_EXPORT_JOBS);

  const [activeConsultationDraft, setActiveConsultationDraft] = useState<Partial<Consultation> | null>({
    patientId: 'pat-1',
    patientNomComplet: 'Fatima Zahra ALAOUI',
    date: '2026-08-25',
    heure: '09:30',
    dureeMinutes: 20,
    type: 'Présentiel',
    motif: 'Renouvellement traitement asthme et contrôle spirométrique',
    constantes: {
      tensionSystolique: 120,
      tensionDiastolique: 78,
      temperature: 37.1,
      poids: 63.0,
      taille: 168,
      imc: 22.3,
      frequenceCardiaque: 72,
      saturationO2: 98,
      glycemie: 0.96
    },
    symptomes: ['Gêne respiratoire nocturne modérée', 'Exposition récente aux pollens d’olivier'],
    examenClinique: 'Conjonctives claires. Oropharynx calme. Murmure vésiculaire perçu symétriquement, rares sibilants expiratoires aux bases sans détresse respiratoire. Bruits du cœur réguliers sans souffle.',
    diagnostic: 'Asthme intermittent sur terrain allergique - Bonne tolérance clinique',
    codeCim10: 'J45.0 - Asthme à prédominance allergique',
    traitement: 'Ventoline 100µg (2 bouffées si crise) + Aerius 5mg (1 cp au coucher pendant 30 jours)',
    notesMedicales: 'Patiente adhérente aux mesures de prévention. Feuille de soins AMO CNSS délivrée.',
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

  // Audit logging helper
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
      timestamp: timestampStr,
      userId: 'usr-1',
      userName: `${settings.medecin.civilite} ${settings.medecin.nom}`,
      userRole: 'Médecin Titulaire',
      actionType,
      categorie,
      patientId,
      patientName,
      ipAddress: '196.200.148.42 (Réseau Sécurisé Cabinet)',
      details,
      hashIntegrite: hash
    };

    setAuditLogs((prev) => [newLog, ...prev]);
  };

  // Keyboard shortcut for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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

  const playChime = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.setValueAtTime(880.00, audioCtx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.5);
    } catch {
      // Audio context might be restricted
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

  const addPatient = (patientData: Omit<Patient, 'id'>): string => {
    const newId = `pat-${Date.now()}`;
    const newPatient: Patient = {
      id: newId,
      ...patientData
    };
    setPatients((prev) => [newPatient, ...prev]);

    // Automatically create mandatory health data consent record under Loi 09-08
    const consentItem: PatientConsent = {
      id: `cst-${Date.now()}`,
      patientId: newId,
      patientNom: `${newPatient.prenom} ${newPatient.nom}`,
      cin: newPatient.cin,
      typeConsentement: 'traitement_donnees_sante',
      libelle: 'Traitement et conservation des données de santé au dossier médical informatisé',
      baseLegale: 'Articles 4 & 12 de la Loi 09-08',
      dateConsentement: new Date().toISOString().split('T')[0],
      statut: 'Accordé',
      methodeRecueil: 'Signature électronique sur tablette',
      recueilliPar: `${settings.medecin.civilite} ${settings.medecin.nom}`
    };
    setPatientConsents((prev) => [consentItem, ...prev]);

    logAuditEvent(
      'CREATION_PATIENT',
      'Dossier Patient',
      `Création nouveau dossier patient avec CIN ${newPatient.cin} et immatriculation AMO (${newPatient.organismeAssurance})`,
      newId,
      `${newPatient.prenom} ${newPatient.nom}`
    );

    showToast('Patient enregistré', `${newPatient.prenom} ${newPatient.nom} a été ajouté au dossier médical.`);
    return newId;
  };

  const updatePatient = (id: string, updates: Partial<Patient>) => {
    setPatients((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
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

  const callWaitingPatient = (id: string) => {
    playChime();
    setWaitingRoom((prev) =>
      prev.map((w) => {
        if (w.id === id) {
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
    setWaitingRoom((prev) =>
      prev.map((w) => (w.id === id ? { ...w, statut } : w))
    );
  };

  const addWaitingPatient = (item: Omit<WaitingPatient, 'id'>) => {
    const newItem: WaitingPatient = {
      id: `wait-${Date.now()}`,
      ...item
    };
    setWaitingRoom((prev) => [...prev, newItem]);
    showToast('Patient en salle d’attente', `${item.nomComplet} a été enregistré.`);
  };

  const removeWaitingPatient = (id: string) => {
    setWaitingRoom((prev) => prev.filter((w) => w.id !== id));
  };

  const addAppointment = (appt: Omit<Appointment, 'id'>) => {
    const newAppt: Appointment = {
      id: `rdv-${Date.now()}`,
      ...appt
    };
    setAppointments((prev) => [...prev, newAppt]);
    showToast('Rendez-vous programmé', `RDV pour ${appt.patientNomComplet} le ${appt.date} à ${appt.heureDebut}.`);
  };

  const updateAppointmentStatus = (id: string, statut: Appointment['statut']) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, statut } : a))
    );
  };

  const addConsultation = (consData: Omit<Consultation, 'id'>): string => {
    const newId = `cons-${Date.now()}`;
    const newCons: Consultation = {
      id: newId,
      ...consData
    };
    setConsultations((prev) => [newCons, ...prev]);

    // Update patient last consultation date
    setPatients((prev) =>
      prev.map((p) =>
        p.id === consData.patientId
          ? { ...p, derniereConsultation: consData.date }
          : p
      )
    );

    // Record payment transaction
    const newTx: PaymentTransaction = {
      id: `tx-${Date.now()}`,
      date: consData.date,
      patientId: consData.patientId,
      patientNomComplet: consData.patientNomComplet,
      montant: consData.tarif,
      typeActe: `Consultation (${consData.type})`,
      modePaiement: consData.modePaiement || 'Carte Bancaire',
      statut: consData.reglementStatut === 'Payé' ? 'Payé' : 'En attente'
    };
    setTransactions((prev) => [newTx, ...prev]);

    // Mark in waiting room if present
    setWaitingRoom((prev) =>
      prev.map((w) =>
        w.patientId === consData.patientId ? { ...w, statut: 'Terminé' } : w
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
      motif: motifInitial || 'Consultation de médecine générale & suivi',
      constantes: {
        tensionSystolique: 120,
        tensionDiastolique: 80,
        temperature: 37.0,
        poids: patient.poidsRef || 70,
        taille: patient.tailleRef || 170,
        imc: patient.poidsRef && patient.tailleRef ? Number((patient.poidsRef / Math.pow(patient.tailleRef / 100, 2)).toFixed(1)) : 22.5,
        frequenceCardiaque: 72,
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

  const addPrescription = (prescData: Omit<Prescription, 'id'>): string => {
    const newId = `ord-${Date.now()}`;
    const newPresc: Prescription = {
      id: newId,
      ...prescData
    };
    setPrescriptions((prev) => [newPresc, ...prev]);

    // Also add to documents library
    const newDoc: MedicalDocument = {
      id: `doc-${Date.now()}`,
      patientId: prescData.patientId,
      patientNomComplet: prescData.patientNomComplet,
      nom: `Ordonnance du ${prescData.date} (${prescData.medicaments.length} produits)`,
      categorie: 'Ordonnances',
      date: prescData.date,
      taille: '120 Ko',
      auteur: `${settings.medecin.civilite} ${settings.medecin.nom}`,
      typeMime: 'application/pdf',
      apercuContenu: prescData.medicaments.map((m) => m.medicament).join(', ')
    };
    setDocuments((prev) => [newDoc, ...prev]);

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

  const addCertificate = (certData: Omit<MedicalCertificate, 'id'>): string => {
    const newId = `cert-${Date.now()}`;
    const newCert: MedicalCertificate = {
      id: newId,
      ...certData
    };
    setCertificates((prev) => [newCert, ...prev]);

    const newDoc: MedicalDocument = {
      id: `doc-${Date.now()}`,
      patientId: certData.patientId,
      patientNomComplet: certData.patientNomComplet,
      nom: `${certData.titre} - ${certData.date}`,
      categorie: 'Certificats',
      date: certData.date,
      taille: '95 Ko',
      auteur: `${settings.medecin.civilite} ${settings.medecin.nom}`,
      typeMime: 'application/pdf',
      apercuContenu: certData.texteContenu.slice(0, 100) + '...'
    };
    setDocuments((prev) => [newDoc, ...prev]);

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

  const addDocument = (docData: Omit<MedicalDocument, 'id'>) => {
    const newDoc: MedicalDocument = {
      id: `doc-${Date.now()}`,
      ...docData
    };
    setDocuments((prev) => [newDoc, ...prev]);

    logAuditEvent(
      'MODIFICATION_DOSSIER',
      'Dossier Patient',
      `Importation et archivage du document : ${docData.nom}`,
      docData.patientId,
      docData.patientNomComplet
    );

    showToast('Document importé', `${docData.nom} archivé avec succès.`);
  };

  const addTransaction = (txData: Omit<PaymentTransaction, 'id'>) => {
    const newTx: PaymentTransaction = {
      id: `tx-${Date.now()}`,
      ...txData
    };
    setTransactions((prev) => [newTx, ...prev]);
    showToast('Paiement enregistré', `${txData.montant.toFixed(0)} DH reçu.`);
  };

  const updateTransaction = (id: string, updates: Partial<PaymentTransaction>) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
  };

  const paySingleTransaction = (id: string, modePaiement?: PaymentTransaction['modePaiement']) => {
    const tx = transactions.find((t) => t.id === id);
    if (!tx) return;

    const chosenMode = modePaiement || tx.modePaiement || 'Espèces';
    setTransactions((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, statut: 'Payé', modePaiement: chosenMode } : t
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

    setTransactions((prev) =>
      prev.map((t) => {
        if (t.date === today && t.statut !== 'Payé') {
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

    // Also update any pending consultations from today
    setConsultations((prev) =>
      prev.map((c) => {
        if (c.date === today && c.reglementStatut !== 'Payé') {
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
      `Clôture de caisse du soir : Règlement groupé de ${count} actes du jour pour un total de ${totalPaid} DH (${modePaiement})`
    );

    showToast(
      'Clôture & Règlements du soir validés',
      `${count} acte(s) soldé(s) pour un montant total de ${totalPaid} DH (${modePaiement}).`
    );

    return totalPaid;
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

  // -------------------------------------------------------------
  // SÉCURITÉ & CNDP METHODS
  // -------------------------------------------------------------
  const updateAccessUser = (id: string, updates: Partial<AccessUser>) => {
    setAccessUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, ...updates } : u))
    );
    logAuditEvent(
      'MODIFICATION_DOSSIER',
      'Sécurité & Accès',
      `Mise à jour des droits et privilèges d'accès pour l'utilisateur ID ${id}`
    );
    showToast('Droits d’accès mis à jour', 'Les privilèges utilisateur ont été actualisés.');
  };

  const addAccessUser = (userData: Omit<AccessUser, 'id'>) => {
    const newId = `usr-${Date.now()}`;
    const newUser: AccessUser = {
      id: newId,
      ...userData
    };
    setAccessUsers((prev) => [...prev, newUser]);
    logAuditEvent(
      'MODIFICATION_DOSSIER',
      'Sécurité & Accès',
      `Création d'un nouveau compte utilisateur habilité : ${newUser.prenom} ${newUser.nom} (${newUser.role})`
    );
    showToast('Utilisateur ajouté', `Le compte de ${newUser.prenom} ${newUser.nom} a été créé.`);
  };

  const addPatientConsent = (consentData: Omit<PatientConsent, 'id'>) => {
    const newId = `cst-${Date.now()}`;
    const newConsent: PatientConsent = {
      id: newId,
      ...consentData
    };
    setPatientConsents((prev) => [newConsent, ...prev]);
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
    setPatientConsents((prev) =>
      prev.map((c) => (c.id === id ? { ...c, statut } : c))
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
      dateDemande: new Date().toISOString().replace('T', ' ').slice(0, 16),
      demandeur: `${settings.medecin.civilite} ${settings.medecin.nom}`,
      typeExport,
      format,
      statut: 'Généré',
      taille: format === 'ZIP' ? '12.4 Mo' : format === 'PDF' ? '3.1 Mo' : '650 Ko',
      emprunteSha256: generateAuditHash(`${typeExport}-${Date.now()}`)
    };
    setExportJobs((prev) => [newJob, ...prev]);
    logAuditEvent(
      'EXPORT_DONNEES_LOI_0908',
      'Export',
      `Export de données généré avec succès : ${typeExport} [Format: ${format}, Hash: ${newJob.emprunteSha256.slice(0, 16)}...]`
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

  return (
    <AppContext.Provider
      value={{
        currentTab,
        setCurrentTab,
        selectedPatientId,
        setSelectedPatientId,
        openPatientDetail,
        patients,
        addPatient,
        updatePatient,
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
        medications,
        transactions,
        addTransaction,
        updateTransaction,
        paySingleTransaction,
        payAllPendingTodayTransactions,
        expenses,
        settings,
        updateSettings,
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
        updatePrivacyPolicy
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
