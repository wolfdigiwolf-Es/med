export type NavigationTab =
  | 'landing'
  | 'register'
  | 'dashboard'
  | 'patients'
  | 'patient-detail'
  | 'consultation'
  | 'agenda'
  | 'waiting-room'
  | 'prescriptions'
  | 'certificates'
  | 'documents'
  | 'medications'
  | 'finances'
  | 'statistics'
  | 'security-compliance'
  | 'settings'
  | 'support'
  | 'wolf-admin';

export interface DoctorRegistrationData {
  cabinetName: string;
  doctorName: string;
  speciality: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  ice: string; // 15 chiffres marocains
  inpe: string;
  cnom: string;
  password?: string;
  subscriptionPlan?: 'trial' | 'annual_paid';
}

export interface SecretaryRegistrationData {
  name: string;
  email: string;
  phone: string;
  password?: string;
  organizationId: string;
}

export type OrganismeAssuranceMaroc =
  | 'AMO CNSS'
  | 'AMO CNOPS'
  | 'AMO Tadamon'
  | 'Mutuelle Saham / Sanlam'
  | 'Mutuelle Wafa Assurance'
  | 'Mutuelle RMA'
  | 'Mutuelle AXA Assurance Maroc'
  | 'Mutuelle MGPAP'
  | 'Paiement Direct (Sans couverture)';

export type SubscriptionStatus =
  | 'active'
  | 'trial'
  | 'past_due'
  | 'suspended'
  | 'cancelled'
  | 'expired';

export type UserRoleType =
  | 'DOCTOR_OWNER' // Full medical and admin access to their own cabinet
  | 'SECRETARY' // Admin, appointments, waiting room, payments. NO sensitive diagnoses/private clinical notes
  | 'WOLF_DIGITAL_SUPERADMIN'; // Technical oversight, subscriptions, ARR, metrics. ZERO access to clinical data

export interface RolePermissions {
  canViewMedicalRecords: boolean;
  canEditMedicalRecords: boolean;
  canViewSensitiveDiagnoses: boolean;
  canViewPrivateDoctorNotes: boolean;
  canPrescribe: boolean;
  canGenerateCertificates: boolean;
  canManageAppointments: boolean;
  canManageWaitingRoom: boolean;
  canManagePayments: boolean;
  canViewFinancials: boolean;
  canExportData: boolean;
  canDeleteRecords: boolean;
  canManageUsers: boolean;
  canViewAuditLogs: boolean;
  canAccessTechnicalAdmin: boolean;
}

export interface Organization {
  id: string; // ex: 'org-elqyami'
  name: string;
  slug: string;
  speciality: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  ice: string; // Identifiant Commun de l'Entreprise (15 chiffres)
  inpe: string; // Identifiant National des Professionnels de Santé
  cnom: string; // Conseil National de l'Ordre des Médecins
  plan: 'MEDICAL_OS_STANDARD';
  priceMadPerYear: number; // 3000 MAD
  subscriptionStatus: SubscriptionStatus;
  subscriptionStart: string;
  subscriptionEnd: string;
  isAutoRenew: boolean;
  storageUsedMb: number;
  storageMaxMb: number;
  backupStatus: 'healthy' | 'syncing' | 'warning';
  lastBackupDate: string;
  cndpDeclaration: string;
  isDemoTenant?: boolean;
}

export interface UserAccount {
  id: string;
  organizationId: string;
  role: UserRoleType;
  roleLabel: string;
  name: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  status: 'active' | 'disabled' | 'pending_2fa';
  mfaEnabled: boolean;
  createdAt: string;
  lastLogin: string;
  permissions: RolePermissions;
}

export interface Patient {
  id: string;
  organizationId: string; // Strict multi-tenant organization boundary
  nom: string;
  prenom: string;
  sexe: 'F' | 'M';
  dateNaissance: string; // YYYY-MM-DD
  age: number;
  telephone: string;
  email: string;
  adresse: string;
  ville: string;
  codePostal: string;
  cin: string; // Carte d'Identité Nationale (ex: BK628190)
  numeroAmo?: string; // N° Immatriculation AMO (CNSS / CNOPS)
  organismeAssurance: OrganismeAssuranceMaroc;
  numAffiliationMutuelle?: string;
  groupeSanguin: string;
  medecinTraitant: boolean;
  statut: 'Actif' | 'Nouveau' | 'Chronique' | 'Inactif';
  derniereConsultation?: string;
  prochainRdv?: string;
  allergies: string[];
  antecedents: {
    medicaux: string[];
    chirurgicaux: string[];
    familiaux: string[];
  };
  traitementsActuels: string[];
  ald: boolean; // Affection Longue Durée (ALD / ALC reconnue AMO)
  nomAld?: string;
  notesGenerales?: string;
  notesConfidentiellesMedecin?: string; // Restricted: Hidden from secretary role
  estDossierSensible?: boolean; // If true, requires DOCTOR_OWNER level
  poidsRef?: number;
  tailleRef?: number;
  taRef?: string;
  contactUrgence?: {
    nom: string;
    lien: string;
    telephone: string;
  };
  consentementLoi0908?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Vitals {
  tensionSystolique: number; // mmHg
  tensionDiastolique: number; // mmHg
  temperature: number; // °C
  poids: number; // kg
  taille: number; // cm
  imc?: number;
  frequenceCardiaque: number; // bpm
  saturationO2: number; // %
  glycemie?: number; // g/L
}

export interface Consultation {
  id: string;
  organizationId: string; // Multi-tenant isolation
  patientId: string;
  doctorId: string;
  patientNomComplet: string;
  date: string;
  heure: string;
  dureeMinutes: number;
  type: 'Présentiel' | 'Téléconsultation' | 'Urgence' | 'Visite à domicile';
  motif: string;
  constantes: Vitals;
  symptomes: string[];
  examenClinique: string;
  diagnostic: string;
  codeCim10?: string;
  traitement: string;
  notesMedicales: string;
  notesPriveesMedecin?: string; // Non accessible à la secrétaire
  tarif: number; // En DH
  reglementStatut: 'Payé' | 'En attente' | 'Tiers-payant';
  modePaiement?: 'Espèces' | 'Carte Bancaire' | 'Chèque' | 'Tiers Payant AMO' | 'Tiers Payant Mutuelle';
  ordonnanceId?: string;
  certificatId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface PrescriptionItem {
  id: string;
  medicament: string;
  dci?: string;
  dosage: string;
  forme: string;
  posologie: string;
  frequence: string;
  duree: string;
  instructions: string;
  ald: boolean;
  nonSubstituable: boolean;
}

export interface Prescription {
  id: string;
  organizationId: string;
  consultationId?: string;
  patientId: string;
  doctorId: string;
  patientNomComplet: string;
  date: string;
  aldConcernee: boolean;
  medicaments: PrescriptionItem[];
  conseilsHygiene?: string;
  createdAt?: string;
}

export type CertificateType =
  | 'medical_standard'
  | 'arret_travail'
  | 'aptitude_sport'
  | 'scolaire'
  | 'personnalise';

export interface MedicalCertificate {
  id: string;
  organizationId: string;
  type: CertificateType;
  titre: string;
  patientId: string;
  doctorId: string;
  patientNomComplet: string;
  date: string;
  dureeArretJours?: number;
  dateDebut?: string;
  dateFin?: string;
  sortiesAutorisees?: 'Avec restriction' | 'Sans restriction' | 'Non autorisées';
  sportPratique?: string;
  texteContenu: string;
  createdAt?: string;
}

export interface Appointment {
  id: string;
  organizationId: string;
  patientId: string;
  doctorId?: string;
  patientNomComplet: string;
  date: string; // YYYY-MM-DD
  heureDebut: string; // HH:mm
  heureFin: string;
  motif: string;
  type: 'Consultation' | 'Contrôle' | 'Urgence' | 'Vaccination' | 'Téléconsultation';
  statut: 'Confirmé' | 'En attente' | 'En cours' | 'Terminé' | 'Annulé';
  notes?: string;
  createdAt?: string;
}

export interface WaitingPatient {
  id: string;
  organizationId: string;
  patientId: string;
  nomComplet: string;
  age: number;
  heureArrivee: string; // HH:mm
  tempsAttenteMinutes: number;
  motif: string;
  avecRdv: boolean;
  statut: 'En attente' | 'Appelé' | 'En consultation' | 'Terminé';
  urgence?: boolean;
}

export interface MedicalDocument {
  id: string;
  organizationId: string;
  patientId: string;
  patientNomComplet: string;
  nom: string;
  categorie: 'Analyses' | 'Radios' | 'Ordonnances' | 'Certificats' | 'Courriers' | 'Feuille AMO';
  date: string;
  taille: string;
  auteur: string;
  uploadedByUserId: string;
  typeMime: string;
  apercuContenu?: string;
  // Private Cloud Storage Vault properties
  isPrivateVault: boolean;
  vaultStoragePath: string;
  encryptionAlgorithm: 'AES-256-GCM';
  checksumSha256: string;
  signedUrlExpiresInMinutes?: number;
}

export interface Medication {
  id: string;
  nom: string;
  dci: string; // DCI
  dosage: string;
  forme: string;
  classeTherapeutique: string;
  indicationsCourantes: string;
  contreIndications: string;
  posologieHabituelle: string;
  statutRemboursement: 'Remboursable AMO' | '100% (ALD/ALC)' | 'Non remboursable';
  prixPublicMarocDH?: number;
}

export interface PaymentTransaction {
  id: string;
  organizationId: string;
  date: string;
  patientId: string;
  patientNomComplet: string;
  montant: number; // En DH
  typeActe: string;
  modePaiement: 'Espèces' | 'Carte Bancaire' | 'Chèque' | 'Tiers Payant AMO' | 'Tiers Payant Mutuelle';
  statut: 'Payé' | 'En attente' | 'Impayé';
  dateEcheance?: string;
  enregistreParUserId?: string;
}

export interface ExpenseItem {
  id: string;
  organizationId: string;
  date: string;
  fournisseur: string;
  description: string;
  categorie: 'Matériel médical' | 'Logiciels & Informatique' | 'Loyer & Charges' | 'Consommables' | 'Assurance & Cotisations';
  montant: number; // En DH
  statut: 'Réglé' | 'À régler';
}

// -------------------------------------------------------------
// TYPES CONFORMITÉ & PROTECTION DES DONNÉES (LOI 09-08 & CNDP)
// -------------------------------------------------------------

export type UserRole = 'Médecin Titulaire' | 'Médecin Remplaçant' | 'Secrétaire Médicale' | 'DPO / Délégué Protection';

export interface AccessUser {
  id: string;
  organizationId: string;
  nom: string;
  prenom: string;
  role: UserRole;
  email: string;
  telephone: string;
  mfaEnabled: boolean;
  statut: 'Actif' | 'Suspendu' | 'Inactif';
  dernierAcces: string;
  permissions: {
    canViewMedicalRecords: boolean;
    canEditMedicalRecords: boolean;
    canPrescribe: boolean;
    canExportData: boolean;
    canDeleteRecords: boolean;
    canManageSecurity: boolean;
    canViewAuditLogs: boolean;
  };
}

export type AuditActionType =
  | 'LECTURE_DOSSIER'
  | 'MODIFICATION_DOSSIER'
  | 'CREATION_PATIENT'
  | 'PRESCRIPTION_MEDICAMENTEUSE'
  | 'EXPORT_DONNEES_LOI_0908'
  | 'SUPPRESSION_DONNEES'
  | 'MODIFICATION_CONSENTEMENT'
  | 'CONNEXION_UTILISATEUR'
  | 'TENTATIVE_ACCES_NON_AUTORISE'
  | 'PURGE_ARCHIVAGE'
  | 'TELECHARGEMENT_DOCUMENT_PRIVE'
  | 'RENOUVELLEMENT_ABONNEMENT'
  | 'CHANGEMENT_ORGANISATION';

export interface AuditLogEntry {
  id: string;
  organizationId: string;
  timestamp: string; // YYYY-MM-DD HH:mm:ss
  userId: string;
  userName: string;
  userRole: string;
  actionType: AuditActionType;
  categorie: 'Dossier Patient' | 'Prescription' | 'Sécurité & Accès' | 'Export' | 'Consentement' | 'Stockage Privé';
  patientId?: string;
  patientName?: string;
  ipAddress: string;
  details: string;
  hashIntegrite: string; // SHA-256 integrity seal
}

export type ConsentType =
  | 'traitement_donnees_sante'
  | 'teleconsultation'
  | 'rappels_sms_whatsapp'
  | 'partage_confraternel'
  | 'transmission_amo_mutuelle';

export interface PatientConsent {
  id: string;
  organizationId: string;
  patientId: string;
  patientNom: string;
  cin: string;
  typeConsentement: ConsentType;
  libelle: string;
  baseLegale: string; // Ex: "Art. 4 & 12 Loi 09-08"
  dateConsentement: string;
  dateExpiration?: string;
  statut: 'Accordé' | 'Refusé' | 'Révoqué';
  methodeRecueil: 'Signature électronique sur tablette' | 'Formulaire papier émargé' | 'Accord oral tracé en consultation';
  recueilliPar: string;
  notes?: string;
}

export interface RetentionPolicy {
  id: string;
  categorieDonnees: string;
  dureeConservationAnnees: number;
  baseReglementaire: string;
  actionFinCycle: 'Anonymisation irréversible' | 'Archivage sécurisé à froid' | 'Suppression définitive';
  statut: 'Actif';
  description: string;
}

export interface DataExportJob {
  id: string;
  organizationId: string;
  dateDemande: string;
  demandeur: string;
  typeExport: 'Dossier patient individuel (Portabilité Art. 8)' | 'Registre des traitements CNDP' | 'Journal d\'audit certifié' | 'Sauvegarde chiffrée de la base' | 'Export Intégral Cabinet (CSV & JSON)';
  format: 'PDF' | 'JSON' | 'ZIP' | 'CSV';
  statut: 'Généré' | 'En cours' | 'Téléchargé';
  taille: string;
  emprunteSha256: string;
}

export interface PrivacyPolicyConfig {
  responsableTraitement: string;
  qualiteResponsable: string;
  numeroInpe: string;
  numeroCnom: string;
  statutDeclarationCndp: 'Récépissé de déclaration obtenu' | 'Déclaration préalable déposée' | 'Demande d\'autorisation en cours' | 'Dossier en préparation';
  numeroRecepisseCndp: string;
  dateDeclarationCndp: string;
  contactDpoEmail: string;
  contactDpoTel: string;
  finalitesTraitement: string[];
  destinatairesAutorises: string[];
  droitsPatients: string[];
  texteAfficheSalleAttente: string;
  delaiConservationDossiers: string;
}

export interface PracticeSettings {
  cabinet: {
    nom: string;
    adresse: string;
    codePostal: string;
    ville: string;
    pays: string;
    telephone: string;
    email: string;
    ice: string; // Identifiant Commun de l'Entreprise (Maroc)
    identifiantFiscal: string; // IF
    patente: string; // N° Patente
    horaires: string;
  };
  medecin: {
    civilite: string;
    prenom: string;
    nom: string;
    specialite: string;
    numeroInpe: string; // Identifiant National des Professionnels de Santé (Maroc)
    numeroCnom: string; // N° Inscription Conseil National de l'Ordre des Médecins
    secteur: string;
    signatureUrl?: string;
  };
  tarifs: {
    secteur: string;
    consultationAdulte: number; // DH
    consultationEnfant: number; // DH
    ecg: number; // DH
    visiteDomicile: number; // DH
    certificat: number; // DH
  };
  documentSettings: {
    enteteTexte: string;
    piedDePage: string;
    afficherTampon: boolean;
    afficherLogo: boolean;
  };
  privacyPolicy: PrivacyPolicyConfig;
}

// -------------------------------------------------------------
// SUPPORT TICKETS & WOLF DIGITAL TECHNICAL COCKPIT
// -------------------------------------------------------------

export interface SupportTicketMessage {
  id: string;
  senderName: string;
  senderRole: string;
  isWolfStaff: boolean;
  timestamp: string;
  message: string;
}

export interface SupportTicket {
  id: string;
  organizationId: string;
  organizationName: string;
  userId: string;
  userName: string;
  category: 'Bug technique' | 'Compte & Accès' | 'Abonnement & Facturation' | 'Sauvegarde & Export' | 'Demande d\'évolution';
  priority: 'Basse' | 'Normale' | 'Haute' | 'Critique';
  subject: string;
  message: string;
  status: 'Ouvert' | 'En cours de traitement' | 'Résolu' | 'Fermé';
  createdAt: string;
  updatedAt: string;
  messages: SupportTicketMessage[];
}

export interface WolfDigitalMetric {
  totalTenants: number;
  activePaidTenants: number;
  trialTenants: number;
  annualPricePerTenantMAD: number; // 3000 MAD
  arrTotalMAD: number; // Total Annual Recurring Revenue
  mrrEquivalentMAD: number;
  uptimePercentage: number;
  errorRatePercentage: number;
  totalStorageUsedGb: number;
  activeDatabaseConnections: number;
  rlsPoliciesEnforced: number;
  lastBackupSyncTime: string;
  version: string;
}
