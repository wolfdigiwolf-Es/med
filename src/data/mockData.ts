import {
  Organization,
  UserAccount,
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
  PatientConsent,
  RetentionPolicy,
  DataExportJob,
  SupportTicket,
  WolfDigitalMetric,
  DentalQuote
} from '../types';

// ============================================================================
// 1. ORGANIZATIONS (TENANTS DU SAAS MEDICAL OS)
// ============================================================================

export const ORGANIZATIONS: Organization[] = [
  {
    id: 'org-elqyami',
    name: 'Cabinet de Pédiatrie & Néonatalogie — Dr. Yassine EL QYAMI',
    slug: 'cabinet-pediatrie-dr-yassine-elqyami',
    speciality: 'Pédiatrie, Néonatalogie & Suivi de Développement',
    city: 'Agadir',
    address: 'Résidence Médicale, 3ème étage, Apt 7',
    phone: '+212 5 28 84 10 20',
    email: 'dr.yassine.elqyami@gmail.com',
    ice: '003311669000022',
    inpe: '8029381029',
    cnom: '18492',
    plan: 'MEDICAL_OS_STANDARD',
    priceMadPerYear: 3000,
    subscriptionStatus: 'active',
    subscriptionStart: '2026-01-01',
    subscriptionEnd: '2026-12-31',
    isAutoRenew: true,
    storageUsedMb: 245,
    storageMaxMb: 5000,
    backupStatus: 'healthy',
    lastBackupDate: '2026-08-25 04:00:00 (Géo-redondant chiffré AES-256)',
    cndpDeclaration: 'D-M-588/2026',
    isDemoTenant: false
  },
  {
    id: 'org-bennani',
    name: 'Cabinet Médical Anfa Santé Dr Karim Bennani',
    slug: 'cabinet-anfa-sante-casablanca',
    speciality: 'Médecine Générale, Diabétologie & Maladies Métaboliques',
    city: 'Casablanca',
    address: "48 Boulevard d'Anfa, 4ème étage, Apt 12",
    phone: '+212 5 22 36 12 40',
    email: 'contact@cabinet-anfa-sante.ma',
    ice: '002938472000034',
    inpe: '1048291039',
    cnom: '12480',
    plan: 'MEDICAL_OS_STANDARD',
    priceMadPerYear: 3000,
    subscriptionStatus: 'active',
    subscriptionStart: '2026-02-15',
    subscriptionEnd: '2027-02-14',
    isAutoRenew: true,
    storageUsedMb: 480,
    storageMaxMb: 5000,
    backupStatus: 'healthy',
    lastBackupDate: '2026-08-25 04:00:00 (Géo-redondant chiffré AES-256)',
    cndpDeclaration: 'D-M-492/2026',
    isDemoTenant: true
  },
  {
    id: 'org-tazi',
    name: 'Cabinet de Gynécologie & Obstétrique Dr Amina Tazi',
    slug: 'cabinet-gyneco-tazi-marrakech',
    speciality: 'Gynécologie, Échographie Obstétricale & Fertilité',
    city: 'Marrakech',
    address: 'Avenue Mohammed V, Espace Guéliz, 2ème étage',
    phone: '+212 5 24 43 19 80',
    email: 'secretariat@dr-aminatazi-marrakech.ma',
    ice: '004829182000019',
    inpe: '2093810294',
    cnom: '16920',
    plan: 'MEDICAL_OS_STANDARD',
    priceMadPerYear: 3000,
    subscriptionStatus: 'trial',
    subscriptionStart: '2026-08-15',
    subscriptionEnd: '2026-09-14',
    isAutoRenew: false,
    storageUsedMb: 110,
    storageMaxMb: 5000,
    backupStatus: 'healthy',
    lastBackupDate: '2026-08-25 04:00:00',
    cndpDeclaration: 'En cours de déclaration',
    isDemoTenant: true
  },
  {
    id: 'org-dentaire-alami',
    name: 'Cabinet Dentaire & Implantologie — Dr. Sara ALAMI',
    slug: 'cabinet-dentaire-dr-sara-alami-casablanca',
    speciality: 'Chirurgie Dentaire, Implantologie, Odontologie & Orthodontie',
    city: 'Casablanca',
    address: "Boulevard d'Anfa, Espace Dentaire Casablanca, 2ème étage",
    phone: '+212 5 22 25 30 40',
    email: 'dr.sara.dentiste@gmail.com',
    ice: '003829104000088',
    inpe: '7029182390',
    cnom: 'D-8492',
    plan: 'MEDICAL_OS_STANDARD',
    priceMadPerYear: 3000,
    subscriptionStatus: 'active',
    subscriptionStart: '2026-01-10',
    subscriptionEnd: '2026-12-31',
    isAutoRenew: true,
    storageUsedMb: 390,
    storageMaxMb: 5000,
    backupStatus: 'healthy',
    lastBackupDate: '2026-08-25 04:00:00 (Géo-redondant chiffré AES-256)',
    cndpDeclaration: 'D-M-742/2026',
    isDemoTenant: false
  },
  {
    id: 'org-elkettani',
    name: 'Cabinet Médical & Cardiologie — Dr. Mehdi EL KETTANI',
    slug: 'dr-elkettani',
    speciality: 'Cardiologie, Échographie Cardiaque & Médecine Interne',
    city: 'Casablanca',
    address: "124 Boulevard d'Anfa, Espace Médical Anfa, 3ème étage, Casablanca",
    phone: '+212 5 22 45 67 89',
    email: 'dr.elkettani@gmail.com',
    ice: '003847291000055',
    inpe: '9028374820',
    cnom: '21490',
    plan: 'MEDICAL_OS_STANDARD',
    priceMadPerYear: 3000,
    subscriptionStatus: 'active',
    subscriptionStart: '2026-01-15',
    subscriptionEnd: '2026-12-31',
    isAutoRenew: true,
    storageUsedMb: 310,
    storageMaxMb: 5000,
    backupStatus: 'healthy',
    lastBackupDate: '2026-08-25 04:00:00 (Géo-redondant chiffré AES-256)',
    cndpDeclaration: 'D-M-612/2026',
    isDemoTenant: false
  }
];

// ============================================================================
// 2. UTILISATEURS DU SAAS & RÔLES (RBAC)
// ============================================================================

export const INITIAL_USER_ACCOUNTS: UserAccount[] = [
  {
    id: 'usr-alami-owner',
    organizationId: 'org-dentaire-alami',
    role: 'DOCTOR_OWNER',
    roleLabel: 'Chirurgien-Dentiste & Implantologue Titulaire',
    name: 'Dr. Sara ALAMI',
    email: 'dr.sara.dentiste@gmail.com',
    username: 'dr.sara',
    password: 'Sara@Dentiste2026',
    phone: '+212 6 61 33 44 55',
    status: 'active',
    mfaEnabled: true,
    createdAt: '2026-01-10',
    lastLogin: '2026-08-25 09:30:00',
    permissions: {
      canViewMedicalRecords: true,
      canEditMedicalRecords: true,
      canViewSensitiveDiagnoses: true,
      canViewPrivateDoctorNotes: true,
      canPrescribe: true,
      canGenerateCertificates: true,
      canManageAppointments: true,
      canManageWaitingRoom: true,
      canManagePayments: true,
      canViewFinancials: true,
      canExportData: true,
      canDeleteRecords: true,
      canManageUsers: true,
      canViewAuditLogs: true,
      canAccessTechnicalAdmin: false
    }
  },
  {
    id: 'usr-alami-sec',
    organizationId: 'org-dentaire-alami',
    role: 'SECRETARY',
    roleLabel: 'Secrétaire & Assistante Dentaire',
    name: 'Meryem KABBAJ (Secrétariat Dentaire)',
    email: 'secretariat.dentaire@cabinet-alami.ma',
    username: 'sec.dentaire',
    password: 'SecretariatDentaire2026!',
    phone: '+212 6 62 11 22 33',
    status: 'active',
    mfaEnabled: true,
    createdAt: '2026-01-12',
    lastLogin: '2026-08-25 08:35:00',
    permissions: {
      canViewMedicalRecords: false,
      canEditMedicalRecords: false,
      canViewSensitiveDiagnoses: false,
      canViewPrivateDoctorNotes: false,
      canPrescribe: false,
      canGenerateCertificates: false,
      canManageAppointments: true,
      canManageWaitingRoom: true,
      canManagePayments: true,
      canViewFinancials: true,
      canExportData: false,
      canDeleteRecords: false,
      canManageUsers: false,
      canViewAuditLogs: false,
      canAccessTechnicalAdmin: false
    }
  },
  {
    id: 'usr-elqyami-owner',
    organizationId: 'org-elqyami',
    role: 'DOCTOR_OWNER',
    roleLabel: 'Médecin Pédiatre Titulaire',
    name: 'Dr. Yassine EL QYAMI',
    email: 'dr.yassine.elqyami@gmail.com',
    username: 'dr.yassine',
    password: 'Yassine@Pediatrie2026',
    phone: '+212 6 61 84 90 20',
    status: 'active',
    mfaEnabled: true,
    createdAt: '2026-01-01',
    lastLogin: '2026-08-25 09:12:00',
    permissions: {
      canViewMedicalRecords: true,
      canEditMedicalRecords: true,
      canViewSensitiveDiagnoses: true,
      canViewPrivateDoctorNotes: true,
      canPrescribe: true,
      canGenerateCertificates: true,
      canManageAppointments: true,
      canManageWaitingRoom: true,
      canManagePayments: true,
      canViewFinancials: true,
      canExportData: true,
      canDeleteRecords: true,
      canManageUsers: true,
      canViewAuditLogs: true,
      canAccessTechnicalAdmin: false
    }
  },
  {
    id: 'usr-elqyami-sec',
    organizationId: 'org-elqyami',
    role: 'SECRETARY',
    roleLabel: 'Secrétaire Médicale',
    name: 'Soukaina CHAMI (Secrétariat)',
    email: 'secretariat@cabinet-pediatrie.ma',
    username: 'secretariat',
    password: 'Secretariat2026!',
    phone: '+212 6 72 10 34 89',
    status: 'active',
    mfaEnabled: true,
    createdAt: '2026-01-05',
    lastLogin: '2026-08-25 08:20:00',
    permissions: {
      canViewMedicalRecords: false, // Restricted by default (Least privilege)
      canEditMedicalRecords: false,
      canViewSensitiveDiagnoses: false,
      canViewPrivateDoctorNotes: false,
      canPrescribe: false,
      canGenerateCertificates: false,
      canManageAppointments: true,
      canManageWaitingRoom: true,
      canManagePayments: true,
      canViewFinancials: true,
      canExportData: false,
      canDeleteRecords: false,
      canManageUsers: false,
      canViewAuditLogs: false,
      canAccessTechnicalAdmin: false
    }
  },
  {
    id: 'usr-bennani-owner',
    organizationId: 'org-bennani',
    role: 'DOCTOR_OWNER',
    roleLabel: 'Médecin Titulaire',
    name: 'Dr Karim Bennani',
    email: 'dr.bennani@cabinet-anfa-sante.ma',
    phone: '+212 6 61 24 89 10',
    status: 'active',
    mfaEnabled: true,
    createdAt: '2026-02-15',
    lastLogin: '2026-08-25 09:42:15',
    permissions: {
      canViewMedicalRecords: true,
      canEditMedicalRecords: true,
      canViewSensitiveDiagnoses: true,
      canViewPrivateDoctorNotes: true,
      canPrescribe: true,
      canGenerateCertificates: true,
      canManageAppointments: true,
      canManageWaitingRoom: true,
      canManagePayments: true,
      canViewFinancials: true,
      canExportData: true,
      canDeleteRecords: true,
      canManageUsers: true,
      canViewAuditLogs: true,
      canAccessTechnicalAdmin: false
    }
  },
  {
    id: 'usr-wolf-superadmin',
    organizationId: 'global-wolf-digital',
    role: 'WOLF_DIGITAL_SUPERADMIN',
    roleLabel: 'Super Admin Technique (Wolf Digital)',
    name: 'Ingénieur Support Wolf Digital',
    email: 'support-ops@wolfdigital.ma',
    phone: '+212 5 22 00 00 00',
    status: 'active',
    mfaEnabled: true,
    createdAt: '2025-11-01',
    lastLogin: '2026-08-25 11:30:00',
    permissions: {
      canViewMedicalRecords: false, // STRICT ZERO CLINICAL ACCESS
      canEditMedicalRecords: false,
      canViewSensitiveDiagnoses: false,
      canViewPrivateDoctorNotes: false,
      canPrescribe: false,
      canGenerateCertificates: false,
      canManageAppointments: false,
      canManageWaitingRoom: false,
      canManagePayments: false,
      canViewFinancials: false,
      canExportData: false,
      canDeleteRecords: false,
      canManageUsers: false,
      canViewAuditLogs: false,
      canAccessTechnicalAdmin: true // ONLY TECHNICAL & SUBSCRIPTION METRICS
    }
  },
  {
    id: 'usr-elkettani-owner',
    organizationId: 'org-elkettani',
    role: 'DOCTOR_OWNER',
    roleLabel: 'Médecin Cardiologue Titulaire',
    name: 'Dr. Mehdi EL KETTANI',
    email: 'dr.elkettani@gmail.com',
    username: 'dr.elkettani',
    password: 'ElKettani@Medical2026',
    phone: '+212 6 61 55 66 77',
    status: 'active',
    mfaEnabled: true,
    createdAt: '2026-01-15',
    lastLogin: '2026-08-25 10:15:00',
    permissions: {
      canViewMedicalRecords: true,
      canEditMedicalRecords: true,
      canViewSensitiveDiagnoses: true,
      canViewPrivateDoctorNotes: true,
      canPrescribe: true,
      canGenerateCertificates: true,
      canManageAppointments: true,
      canManageWaitingRoom: true,
      canManagePayments: true,
      canViewFinancials: true,
      canExportData: true,
      canDeleteRecords: true,
      canManageUsers: true,
      canViewAuditLogs: true,
      canAccessTechnicalAdmin: false
    }
  },
  {
    id: 'usr-elkettani-sec',
    organizationId: 'org-elkettani',
    role: 'SECRETARY',
    roleLabel: 'Secrétaire Médicale (Accueil & Prise de RDV)',
    name: 'Hajar TAHIRI (Secrétariat)',
    email: 'secretariat.elkettani@gmail.com',
    username: 'sec.elkettani',
    password: 'SecKettani2026!',
    phone: '+212 6 63 44 55 66',
    status: 'active',
    mfaEnabled: true,
    createdAt: '2026-01-18',
    lastLogin: '2026-08-25 08:45:00',
    permissions: {
      canViewMedicalRecords: false,
      canEditMedicalRecords: false,
      canViewSensitiveDiagnoses: false,
      canViewPrivateDoctorNotes: false,
      canPrescribe: false,
      canGenerateCertificates: false,
      canManageAppointments: true,
      canManageWaitingRoom: true,
      canManagePayments: true,
      canViewFinancials: true,
      canExportData: false,
      canDeleteRecords: false,
      canManageUsers: false,
      canViewAuditLogs: false,
      canAccessTechnicalAdmin: false
    }
  }
];

// ============================================================================
// 3. PARAMÈTRES DES CABINETS
// ============================================================================

export const DR_EL_QYAMI_SETTINGS: PracticeSettings = {
  cabinet: {
    nom: 'Cabinet de Pédiatrie & Néonatalogie — Dr. Yassine EL QYAMI',
    adresse: 'Résidence Médicale, 3ème étage, Apt 7',
    codePostal: '80000',
    ville: 'Agadir',
    pays: 'Royaume du Maroc',
    telephone: '+212 5 28 84 10 20',
    email: 'dr.yassine.elqyami@gmail.com',
    ice: '003311669000022',
    identifiantFiscal: '50192837',
    patente: '48201948',
    horaires: 'Lundi - Vendredi: 8h30 à 18h30 · Samedi: 9h00 à 13h00 · Urgences sur appel'
  },
  medecin: {
    civilite: 'Dr',
    prenom: 'Yassine',
    nom: 'EL QYAMI',
    specialite: "Pédiatrie, Néonatalogie & Développement de l'Enfant",
    numeroInpe: '8029381029',
    numeroCnom: '18492',
    secteur: 'Pédiatrie Libérale Conventionnée AMO',
    signatureUrl: ''
  },
  tarifs: {
    secteur: 'Secteur Conventionné AMO',
    consultationAdulte: 250,
    consultationEnfant: 250,
    ecg: 200,
    visiteDomicile: 500,
    certificat: 100
  },
  documentSettings: {
    enteteTexte: "Cabinet de Pédiatrie — Dr. Yassine EL QYAMI · Spécialiste des Maladies de l'Enfant et du Nouveau-né",
    piedDePage: 'Cabinet de Pédiatrie Dr. Yassine EL QYAMI · Ordonnance Médicale Sécurisée · Conforme Loi 09-08 CNDP',
    afficherTampon: true,
    afficherLogo: true
  },
  privacyPolicy: {
    responsableTraitement: 'Médecin Pédiatre Titulaire',
    qualiteResponsable: 'Médecin Pédiatre Responsable du Cabinet Médical',
    numeroInpe: '8029381029',
    numeroCnom: '18492',
    statutDeclarationCndp: 'Récépissé de déclaration obtenu',
    numeroRecepisseCndp: 'D-M-588/2026',
    dateDeclarationCndp: '2026-02-10',
    contactDpoEmail: 'dpo@cabinet-pediatrie.ma',
    contactDpoTel: '+212 5 28 84 10 20',
    finalitesTraitement: [
      'Suivi pédiatrique, carnet de vaccination national, courbes de croissance OMS et néonatalogie',
      "Gestion administrative des dossiers d'enfants et rappels vaccinaux parentaux",
      'Télétransmission et feuilles de soins AMO (CNSS, CNOPS) et mutuelles marocaines',
      'Protection et confidentialité stricte des données médicales des mineurs (Loi 09-08)'
    ],
    destinatairesAutorises: [
      'Médecin Pédiatre Titulaire',
      'Personnel paramédical habilité sous secret médical',
      "Parents ou tuteurs légaux de l'enfant",
      'Organismes AMO (CNSS, CNOPS, Mutuelles)'
    ],
    droitsPatients: [
      "Droit d'accès exercé par les représentants légaux (Loi 09-08)",
      "Droit de rectification des données de l'enfant",
      "Droit d'opposition pour motifs légitimes",
      "Droit d'information sur les finalités pédiatriques"
    ],
    delaiConservationDossiers: "Conservation jusqu'à l'âge de 28 ans du patient (Dossier pédiatrique)",
    texteAfficheSalleAttente: "Conformément à la loi n° 09-08, les données médicales de votre enfant font l'objet d'un traitement sécurisé sous récépissé CNDP n° D-M-588/2026."
  }
};

export const DR_SARA_ALAMI_SETTINGS: PracticeSettings = {
  cabinet: {
    nom: 'Cabinet Dentaire & Implantologie — Dr. Sara ALAMI',
    adresse: "Boulevard d'Anfa, Espace Dentaire Casablanca, 2ème étage",
    codePostal: '20000',
    ville: 'Casablanca',
    pays: 'Royaume du Maroc',
    telephone: '+212 5 22 25 30 40',
    email: 'dr.sara.dentiste@gmail.com',
    ice: '003829104000088',
    identifiantFiscal: '60392817',
    patente: '59201934',
    horaires: 'Lundi - Vendredi: 9h00 à 19h00 · Samedi: 9h00 à 14h00 · Urgences dentaires sur RDV'
  },
  medecin: {
    civilite: 'Dr',
    prenom: 'Sara',
    nom: 'ALAMI',
    specialite: 'Chirurgie Dentaire, Implantologie, Odontologie & Orthodontie',
    numeroInpe: '7029182390',
    numeroCnom: 'D-8492',
    secteur: 'Chirurgie Dentaire Libérale & Conventionnée AMO',
    signatureUrl: ''
  },
  tarifs: {
    secteur: 'Secteur Dentaire Conventionné AMO & HN',
    consultationAdulte: 200,
    consultationEnfant: 150,
    ecg: 0,
    visiteDomicile: 0,
    certificat: 100
  },
  documentSettings: {
    enteteTexte: 'Cabinet de Chirurgie Dentaire & Implantologie — Dr. Sara ALAMI · Odontologie, Prothèses & Orthodontie',
    piedDePage: 'Cabinet Dentaire Dr. Sara ALAMI · Devis & Ordonnance Bucco-Dentaire Conforme AMO & CNDP Loi 09-08',
    afficherTampon: true,
    afficherLogo: true
  },
  privacyPolicy: {
    responsableTraitement: 'Dr. Sara ALAMI',
    qualiteResponsable: 'Chirurgien-Dentiste Responsable du Cabinet',
    numeroInpe: '7029182390',
    numeroCnom: 'D-8492',
    statutDeclarationCndp: 'Récépissé de déclaration obtenu',
    numeroRecepisseCndp: 'D-M-742/2026',
    dateDeclarationCndp: '2026-02-18',
    contactDpoEmail: 'dpo@cabinet-alami-dentaire.ma',
    contactDpoTel: '+212 5 22 25 30 40',
    finalitesTraitement: [
      'Dossier bucco-dentaire informatisé, odontogramme 32 dents, radiographies numériques RVG & Cone Beam CBCT',
      'Établissement des devis dentaires détaillés, feuilles de soins et télétransmission AMO (CNSS, CNOPS) et mutuelles',
      'Traçabilité des implants, dispositifs médicaux sur mesure et prothèses dentaires',
      'Protection des données de santé bucco-dentaire selon la Loi 09-08'
    ],
    destinatairesAutorises: [
      'Dr. Sara ALAMI (Chirurgien-Dentiste titulaire)',
      'Assistante et secrétaire dentaire sous secret professionnel',
      'Laboratoire de prothèse dentaire sous contrat de sous-traitance conforme CNDP',
      'Organismes AMO (CNSS, CNOPS, Mutuelles)'
    ],
    droitsPatients: [
      'Droit d’accès aux radiographies et odontogrammes (Article 7)',
      'Droit de rectification (Article 8)',
      'Droit d’opposition pour motifs légitimes (Article 9)',
      'Droit de réclamation auprès de la CNDP'
    ],
    delaiConservationDossiers: "20 ans pour les dossiers d'implantologie et soins bucco-dentaires",
    texteAfficheSalleAttente: "Cabinet Dentaire Dr. Sara ALAMI : Traitement informatique de vos dossiers bucco-dentaires conforme à la loi 09-08 CNDP (Récépissé D-M-742/2026)."
  }
};

export const DR_EL_KETTANI_SETTINGS: PracticeSettings = {
  cabinet: {
    nom: 'Cabinet Médical & Cardiologie — Dr. Mehdi EL KETTANI',
    adresse: "124 Boulevard d'Anfa, Espace Médical Anfa, 3ème étage",
    codePostal: '20050',
    ville: 'Casablanca',
    pays: 'Royaume du Maroc',
    telephone: '+212 5 22 45 67 89',
    email: 'dr.elkettani@gmail.com',
    ice: '003847291000055',
    identifiantFiscal: '61492019',
    patente: '50392819',
    horaires: 'Du Lundi au Vendredi de 8h30 à 18h30 · Samedi de 9h00 à 13h00 · Urgences cardio 24/7'
  },
  medecin: {
    civilite: 'Dr',
    prenom: 'Mehdi',
    nom: 'EL KETTANI',
    specialite: 'Cardiologie, Échographie Cardiaque & Pathologies Vasculaires',
    numeroInpe: '9028374820',
    numeroCnom: '21490',
    secteur: 'Secteur Libéral Conventionné AMO (CNSS / CNOPS)',
    signatureUrl: ''
  },
  tarifs: {
    secteur: 'Secteur 1 Conventionné AMO',
    consultationAdulte: 300,
    consultationEnfant: 250,
    ecg: 200,
    visiteDomicile: 600,
    certificat: 150
  },
  documentSettings: {
    enteteTexte: 'Dr Mehdi EL KETTANI — Spécialiste en Cardiologie & Maladies Vasculaires (Lauréat Faculté de Médecine)',
    piedDePage: 'N° INPE : 9028374820 · N° Ordre CNOM : 21490 · ICE : 003847291000055 · Traitement conforme Loi 09-08 CNDP D-M-612/2026',
    afficherTampon: true,
    afficherLogo: true
  },
  privacyPolicy: {
    responsableTraitement: 'Dr. Mehdi EL KETTANI',
    qualiteResponsable: 'Médecin Spécialiste Responsable du Cabinet',
    numeroInpe: '9028374820',
    numeroCnom: '21490',
    statutDeclarationCndp: 'Récépissé de déclaration obtenu',
    numeroRecepisseCndp: 'D-M-612/2026',
    dateDeclarationCndp: '2026-01-20',
    contactDpoEmail: 'dpo@cabinet-kettani-cardio.ma',
    contactDpoTel: '+212 5 22 45 67 89',
    finalitesTraitement: [
      'Diagnostic cardiologique, holter tensionnel, ECG et suivi vasculaire',
      'Prescriptions médicales sécurisées et télétransmission AMO (CNSS, CNOPS)',
      'Protection des données de santé conformément à la Loi 09-08'
    ],
    destinatairesAutorises: [
      'Dr. Mehdi EL KETTANI (Médecin titulaire)',
      'Secrétariat médical sous secret professionnel',
      'Organismes AMO (CNSS, CNOPS, Mutuelles)'
    ],
    droitsPatients: [
      'Droit d’accès aux examens et ECG (Article 7)',
      'Droit de rectification (Article 8)',
      'Droit d’opposition pour motifs légitimes (Article 9)'
    ],
    delaiConservationDossiers: '20 ans à compter de la dernière consultation',
    texteAfficheSalleAttente: 'Cabinet Dr. Mehdi EL KETTANI : Dossiers cardiologiques protégés conformément à la loi 09-08 CNDP (Récépissé D-M-612/2026).'
  }
};

export const INITIAL_SETTINGS: PracticeSettings = {
  cabinet: {
    nom: 'Cabinet Médical Anfa Santé',
    adresse: "48 Boulevard d'Anfa, 4ème étage, Apt 12",
    codePostal: '20050',
    ville: 'Casablanca',
    pays: 'Royaume du Maroc',
    telephone: '+212 5 22 36 12 40',
    email: 'contact@cabinet-anfa-sante.ma',
    ice: '002938472000034',
    identifiantFiscal: '40291847',
    patente: '34910284',
    horaires: 'Du Lundi au Vendredi de 8h30 à 18h30 · Samedi de 9h00 à 13h00'
  },
  medecin: {
    civilite: 'Dr',
    prenom: 'Karim',
    nom: 'Bennani',
    specialite: 'Médecine Générale, Diabétologie & Maladies Métaboliques',
    numeroInpe: '1048291039',
    numeroCnom: '12480',
    secteur: 'Secteur Libéral Conventionné AMO (CNSS / CNOPS)',
    signatureUrl: ''
  },
  tarifs: {
    secteur: 'Secteur 1 Conventionné',
    consultationAdulte: 250,
    consultationEnfant: 200,
    ecg: 150,
    visiteDomicile: 400,
    certificat: 100
  },
  documentSettings: {
    enteteTexte: 'Dr Karim BENNANI — Spécialiste en Médecine Générale & Diabétologie (Lauréat Faculté de Médecine de Casablanca)',
    piedDePage: 'N° INPE : 1048291039 · N° Ordre CNOM : 12480 · ICE : 002938472000034 · Traitement des données sous encadrement Loi 09-08',
    afficherTampon: true,
    afficherLogo: true
  },
  privacyPolicy: {
    responsableTraitement: 'Dr Karim BENNANI',
    qualiteResponsable: 'Médecin Responsable du Cabinet Médical Anfa Santé',
    numeroInpe: '1048291039',
    numeroCnom: '12480',
    statutDeclarationCndp: 'Récépissé de déclaration obtenu',
    numeroRecepisseCndp: 'D-M-492/2026',
    dateDeclarationCndp: '2026-01-15',
    contactDpoEmail: 'dpo@cabinet-anfa-sante.ma',
    contactDpoTel: '+212 5 22 36 12 40',
    finalitesTraitement: [
      'Prise en charge médicale, diagnostic, prescriptions et suivi thérapeutique',
      'Gestion administrative des rendez-vous et tenue du dossier médical patient',
      'Établissement des feuilles de soins AMO (CNSS, CNOPS) et prises en charge mutuelles',
      'Communication d’alertes médicales et rappels de consultations par SMS/Messagerie',
      'Traçabilité et archivage légal des actes médicaux conformément à la réglementation marocaine'
    ],
    destinatairesAutorises: [
      'Dr Karim BENNANI (Médecin titulaire)',
      'Personnel habilité du cabinet soumis au secret professionnel médical',
      'Organismes de prévoyance sociale et d’assurance maladie (AMO CNSS, CNOPS, Mutuelles agréées)',
      'Professionnels de santé correspondants et laboratoires d’analyses (avec consentement explicite)'
    ],
    droitsPatients: [
      'Droit d’accès à ses données de santé (Article 7 de la Loi 09-08)',
      'Droit de rectification des informations inexactes (Article 8 de la Loi 09-08)',
      'Droit d’opposition pour motifs légitimes (Article 9 de la Loi 09-08)',
      'Droit d’information préalable sur le traitement (Article 5 de la Loi 09-08)',
      'Droit de réclamation auprès de la CNDP'
    ],
    delaiConservationDossiers: '20 ans à compter de la date de la dernière consultation',
    texteAfficheSalleAttente: "Conformément à la loi n° 09-08 relative à la protection des personnes physiques à l'égard du traitement des données à caractère personnel, vous disposez d'un droit d'accès, de rectification et d'opposition pour motifs légitimes aux données vous concernant. Récépissé CNDP D-M-492/2026."
  }
};

// ============================================================================
// 4. PATIENTS ISOLÉS PAR ORGANISATION (MULTI-TENANT)
// ============================================================================

export const INITIAL_PATIENTS: Patient[] = [
  // --- Cabinet Médical & Cardiologie Dr. Mehdi EL KETTANI (Casablanca) ---
  {
    id: 'pat-kettani-1',
    organizationId: 'org-elkettani',
    nom: 'AMRAOUI',
    prenom: 'Youssef',
    sexe: 'M',
    dateNaissance: '1972-04-14',
    age: 54,
    telephone: '+212 6 61 22 33 44',
    email: 'youssef.amraoui@gmail.com',
    adresse: '78 Boulevard Ghandi, Casablanca',
    ville: 'Casablanca',
    codePostal: '20100',
    cin: 'BE392810',
    numeroAmo: '20492819039',
    organismeAssurance: 'AMO CNSS',
    numAffiliationMutuelle: 'MUT-SAHAM-92019',
    groupeSanguin: 'A+',
    medecinTraitant: true,
    statut: 'Actif',
    derniereConsultation: '2026-08-25',
    prochainRdv: '2026-09-15',
    allergies: ['Aspirine (intolérance gastrique sévère)'],
    antecedents: {
      medicaux: ['Hypertension artérielle essentielle stade 2 (depuis 2018)', 'Dyslipidémie mixte', 'Tabagisme sevré (15 PA)'],
      chirurgicaux: ['Appendicectomie en 1995'],
      familiaux: ['Père décédé IDM à 58 ans']
    },
    traitementsActuels: ['Amlodipine 5mg 1cp/j', 'Atorvastatine 20mg 1cp le soir', 'Co-Aprovel 300/12.5mg'],
    ald: true,
    nomAld: 'Affections cardiovasculaires graves (ALD 5)',
    notesGenerales: 'Suivi régulier HTA. Échographie cardiaque normale FEVG 62%. Holter ECG satisfaisant.',
    notesConfidentiellesMedecin: 'Patient observant. Pression artérielle stabilisée à 128/82 mmHg sous bithérapie.',
    estDossierSensible: false,
    poidsRef: 82,
    tailleRef: 176,
    taRef: '128/82',
    contactUrgence: {
      nom: 'Mme Latifa Amraoui (Épouse)',
      lien: 'Épouse',
      telephone: '+212 6 61 88 99 00'
    }
  },
  {
    id: 'pat-kettani-2',
    organizationId: 'org-elkettani',
    nom: 'ZAHRAOUI',
    prenom: 'Fatima',
    sexe: 'F',
    dateNaissance: '1964-11-20',
    age: 62,
    telephone: '+212 6 63 77 11 22',
    email: 'fatima.zahraoui@yahoo.fr',
    adresse: '15 Rue de Tiznit, Casablanca',
    ville: 'Casablanca',
    codePostal: '20000',
    cin: 'B592019',
    numeroAmo: '10392810492',
    organismeAssurance: 'AMO CNOPS',
    numAffiliationMutuelle: 'MUT-CNOPS-44920',
    groupeSanguin: 'O+',
    medecinTraitant: true,
    statut: 'Actif',
    derniereConsultation: '2026-08-25',
    prochainRdv: '2026-10-10',
    allergies: ['Iode (allergie cutanée)'],
    antecedents: {
      medicaux: ['Palpitations post-effort', 'Surpoids IMC 28.4', 'Hypothyroïdie traitée'],
      chirurgicaux: ['Cholécystectomie sous coelioscopie 2012'],
      familiaux: ['Mère AVC ischémique à 74 ans']
    },
    traitementsActuels: ['Lévothyrox 75µg', 'Bisoprolol 2.5mg 1cp/matin'],
    ald: false,
    notesGenerales: 'Bilan cardiaque annuel. ECG rythme sinusal régulier, absence de trouble de repolarisation.',
    notesConfidentiellesMedecin: 'Épreuve d effort négative pour l ischémie à 85% de la FMT.',
    estDossierSensible: false,
    poidsRef: 69,
    tailleRef: 162,
    taRef: '120/75',
    contactUrgence: {
      nom: 'M. Karim Zahraoui (Fils)',
      lien: 'Fils',
      telephone: '+212 6 64 33 22 11'
    }
  },
  // --- Cabinet Dentaire Dr. Sara ALAMI (Casablanca - Chirurgie Dentaire & Implantologie) ---
  {
    id: 'pat-dent-1',
    organizationId: 'org-dentaire-alami',
    nom: 'TAZI',
    prenom: 'Othmane',
    sexe: 'M',
    dateNaissance: '1992-05-18',
    age: 34,
    telephone: '+212 6 61 77 88 99',
    email: 'othmane.tazi@gmail.com',
    adresse: '24 Boulevard Zerktouni, Résidence Les Jardins, Casablanca',
    ville: 'Casablanca',
    codePostal: '20050',
    cin: 'BK542890',
    numeroAmo: '10984920194',
    organismeAssurance: 'AMO CNSS',
    numAffiliationMutuelle: 'MUT-WAFA-84291',
    groupeSanguin: 'O+',
    medecinTraitant: false,
    statut: 'Actif',
    derniereConsultation: '2026-08-20',
    prochainRdv: '2026-09-02',
    allergies: ['Pénicilline'],
    antecedents: {
      medicaux: ['Asthme léger à l\'effort'],
      chirurgicaux: ['Avulsion 26 suite à fracture radiculaire en 2024'],
      familiaux: ['Père diabétique']
    },
    traitementsActuels: ['Ventoline si crise d\'asthme'],
    ald: false,
    notesGenerales: 'Plan de réhabilitation implantaire en secteur 26 + Couronne Zircone 14.',
    notesConfidentiellesMedecin: 'Bone graft (Bio-Oss) réussi en 2025. Prêt pour pose d\'implant Titane 4.2x11.5mm.',
    estDossierSensible: false,
    poidsRef: 76,
    tailleRef: 180,
    taRef: '125/80',
    contactUrgence: {
      nom: 'Mme Kenza Tazi (Épouse)',
      lien: 'Épouse',
      telephone: '+212 6 62 33 44 55'
    }
  },
  {
    id: 'pat-dent-2',
    organizationId: 'org-dentaire-alami',
    nom: 'BENJELLOUN',
    prenom: 'Salma',
    sexe: 'F',
    dateNaissance: '1998-09-12',
    age: 28,
    telephone: '+212 6 64 22 33 44',
    email: 'salma.benjelloun@outlook.com',
    adresse: '8 Rue Jean Jaurès, Gauthier, Casablanca',
    ville: 'Casablanca',
    codePostal: '20100',
    cin: 'BE719283',
    numeroAmo: '20491829401',
    organismeAssurance: 'AMO CNOPS',
    numAffiliationMutuelle: 'MUT-CNOPS-9201',
    groupeSanguin: 'A+',
    medecinTraitant: false,
    statut: 'Actif',
    derniereConsultation: '2026-08-22',
    prochainRdv: '2026-08-30',
    allergies: [],
    antecedents: {
      medicaux: ['Aucun'],
      chirurgicaux: ['Extraction 38 et 48'],
      familiaux: ['Aucun antécédent notable']
    },
    traitementsActuels: [],
    ald: false,
    notesGenerales: 'Demande esthétique : Éclaircissement dentaire fauteuil + Facettes céramiques E-Max 11, 21.',
    notesConfidentiellesMedecin: 'Gencive saine, biotype épais favorable.',
    estDossierSensible: false,
    poidsRef: 58,
    tailleRef: 167,
    taRef: '115/75',
    contactUrgence: {
      nom: 'M. Mehdi Benjelloun (Frère)',
      lien: 'Frère',
      telephone: '+212 6 61 99 88 77'
    }
  },
  {
    id: 'pat-dent-3',
    organizationId: 'org-dentaire-alami',
    nom: 'EL FASSI',
    prenom: 'Karim',
    sexe: 'M',
    dateNaissance: '1981-04-05',
    age: 45,
    telephone: '+212 6 61 40 50 60',
    email: 'karim.elfassi@gmail.com',
    adresse: '15 Avenue Hassan II, Casablanca',
    ville: 'Casablanca',
    codePostal: '20000',
    cin: 'BJ392810',
    numeroAmo: '10394820192',
    organismeAssurance: 'AMO CNSS',
    numAffiliationMutuelle: 'MUT-SAHAM-3920',
    groupeSanguin: 'B+',
    medecinTraitant: false,
    statut: 'Chronique',
    derniereConsultation: '2026-08-15',
    prochainRdv: '2026-09-10',
    allergies: ['AINS'],
    antecedents: {
      medicaux: ['Tabagisme sevré', 'Parodontite stade III grade B'],
      chirurgicaux: [],
      familiaux: ['Perte précoce de dents chez les parents']
    },
    traitementsActuels: [],
    ald: false,
    notesGenerales: 'Suivi parodontal : surfaçage radiculaire par sextants et maintenance tous les 3 mois.',
    notesConfidentiellesMedecin: 'Poches à 5-6mm en interproximal molaires 16-17 et 26-27.',
    estDossierSensible: false,
    poidsRef: 82,
    tailleRef: 178,
    taRef: '130/85',
    contactUrgence: {
      nom: 'Mme Souad El Fassi (Épouse)',
      lien: 'Épouse',
      telephone: '+212 6 63 22 11 00'
    }
  },
  // --- Cabinet Dr Yassine EL QYAMI (Agadir - Pédiatrie) : Espace Vierge pour démarrer l'activité réelle ---

  // --- Cabinet Dr Karim Bennani (Casablanca - Médecine Générale / Diabétologie) ---
  {
    id: 'pat-casa-1',
    organizationId: 'org-bennani',
    nom: 'ALAOUI',
    prenom: 'Fatima Zahra',
    sexe: 'F',
    dateNaissance: '1988-03-14',
    age: 38,
    telephone: '+212 6 61 28 39 40',
    email: 'fz.alaoui@gmail.com',
    adresse: '12 Rue Abou Dhabi, Résidence Al Amal 2, Apt 8, Maarif',
    ville: 'Casablanca',
    codePostal: '20100',
    cin: 'BE628190',
    numeroAmo: '10849201948',
    organismeAssurance: 'AMO CNSS',
    numAffiliationMutuelle: 'MUT-SAHAM-49201',
    groupeSanguin: 'A+',
    medecinTraitant: true,
    statut: 'Chronique',
    derniereConsultation: '2026-08-25',
    prochainRdv: '2026-09-20',
    allergies: ['Pénicilline (Urticaire sévère)', 'AINS (Intolérance gastrique)'],
    antecedents: {
      medicaux: ['Diabète Type 2 diagnostiqué en 2021', 'HTA essentielle modérée sous IEC'],
      chirurgicaux: ['Appendicectomie en 2004', 'Césarienne en 2018'],
      familiaux: ['Père décédé IDM à 62 ans', 'Mère diabétique type 2']
    },
    traitementsActuels: ['Metformine 850mg (1 cp x 2 / jour)', 'Coversyl 5mg (1 cp le matin)'],
    ald: true,
    nomAld: 'ALD 8 - Diabète de type 2 et HTA',
    notesGenerales: 'Patiente très assidue. HbA1c cible < 7.0%. Auto-surveillance glycémique régulière.',
    notesConfidentiellesMedecin: 'Suivi néphropathie débutante (microalbuminurie à 42 mg/24h).',
    estDossierSensible: false,
    poidsRef: 63.5,
    tailleRef: 168,
    taRef: '120/78',
    contactUrgence: {
      nom: 'M. Mehdi Alaoui (Époux)',
      lien: 'Époux',
      telephone: '+212 6 61 99 88 77'
    },
    consentementLoi0908: true,
    createdAt: '2026-01-10',
    updatedAt: '2026-08-25'
  },
  {
    id: 'pat-casa-2',
    organizationId: 'org-bennani',
    nom: 'TAHA',
    prenom: 'Mohamed',
    sexe: 'M',
    dateNaissance: '1962-11-20',
    age: 63,
    telephone: '+212 6 63 12 45 89',
    email: 'm.taha.trans@menara.ma',
    adresse: '45 Boulevard Ghandi, Résidence Les Jardins d’Anfa, Apt 14',
    ville: 'Casablanca',
    codePostal: '20250',
    cin: 'A748291',
    numeroAmo: '20938491029',
    organismeAssurance: 'AMO CNOPS',
    numAffiliationMutuelle: 'MUT-MGPAP-10294',
    groupeSanguin: 'O+',
    medecinTraitant: true,
    statut: 'Chronique',
    derniereConsultation: '2026-08-25',
    prochainRdv: '2026-09-10',
    allergies: ['Sulfamides antibactériens'],
    antecedents: {
      medicaux: ['Coronaropathie sténosante avec stent IVA (2020)', 'Diabète T2 mal équilibré'],
      chirurgicaux: ['Angioplastie coronaire en 2020'],
      familiaux: ['Frère aîné pontage coronarien']
    },
    traitementsActuels: ['Kardegic 75mg (1 sachet/j)', 'Tahor 20mg (1 cp soir)', 'Glucophage 1000mg'],
    ald: true,
    nomAld: 'ALD 1 - Cardiopathie ischémique & ALD 8',
    notesGenerales: 'Bilan lipidique et ECG semestriel. Conduite automobile professionnelle.',
    poidsRef: 82.0,
    tailleRef: 174,
    taRef: '135/85',
    contactUrgence: {
      nom: 'Mme Touria Taha',
      lien: 'Épouse',
      telephone: '+212 6 63 12 45 89'
    },
    consentementLoi0908: true,
    createdAt: '2026-01-12',
    updatedAt: '2026-08-25'
  }
];

// ============================================================================
// 5. CONSULTATIONS ISOLÉES PAR TENANT
// ============================================================================

export const INITIAL_CONSULTATIONS: Consultation[] = [
  // --- Consultations Cabinet Casablanca (Dr Mehdi EL KETTANI - Cardiologie) ---
  {
    id: 'cons-kettani-1',
    organizationId: 'org-elkettani',
    patientId: 'pat-kettani-1',
    doctorId: 'usr-elkettani-owner',
    patientNomComplet: 'Youssef AMRAOUI',
    date: '2026-08-25',
    heure: '10:00',
    dureeMinutes: 25,
    type: 'Présentiel',
    motif: 'Contrôle tensionnel et échocardiographie de suivi annuel',
    constantes: {
      tensionSystolique: 128,
      tensionDiastolique: 82,
      temperature: 36.8,
      poids: 82,
      taille: 176,
      imc: 26.5,
      frequenceCardiaque: 64,
      saturationO2: 99,
      glycemie: 1.02
    },
    symptomes: ['Bonne tolérance à l effort modéré', 'Absence de dyspnée de repos ou orthopnée'],
    examenClinique: 'Bruits du cœur réguliers sans souffle surajouté. Pas de signes de surcharge droite ou gauche. Échocardiographie transthoracique : FEVG conservée à 62%.',
    diagnostic: 'Hypertension artérielle essentielle équilibrée sous Co-Aprovel + Amlodipine',
    codeCim10: 'I10 - Hypertension essentielle',
    traitement: 'Co-Aprovel 300/12.5mg (1 cp/matin), Amlodipine 5mg (1 cp/soir), Atorvastatine 20mg',
    notesMedicales: 'Feuille de soins AMO CNSS et devis holter remis.',
    tarif: 300,
    reglementStatut: 'Payé',
    modePaiement: 'Carte Bancaire',
    createdAt: '2026-08-25 10:25:00'
  },
  // --- Consultations Cabinet Agadir (Dr Yassine EL QYAMI) : Vierge ---

  // --- Consultations Cabinet Casablanca (Dr Karim Bennani) ---
  {
    id: 'cons-casa-1',
    organizationId: 'org-bennani',
    patientId: 'pat-casa-1',
    doctorId: 'usr-bennani-owner',
    patientNomComplet: 'Fatima Zahra ALAOUI',
    date: '2026-08-25',
    heure: '09:30',
    dureeMinutes: 20,
    type: 'Présentiel',
    motif: 'Renouvellement traitement diabète type 2 et bilan tensionnel',
    constantes: {
      tensionSystolique: 120,
      tensionDiastolique: 78,
      temperature: 37.1,
      poids: 63.5,
      taille: 168,
      imc: 22.5,
      frequenceCardiaque: 72,
      saturationO2: 98,
      glycemie: 0.96
    },
    symptomes: ['Aucune complication aiguë', 'Glycémies capillaires à jeun entre 0.90 et 1.15 g/L'],
    examenClinique: 'Examen cardio-vasculaire sans anomalie. Pouls périphériques bien perçus. Examen des pieds normal sans lésion cutanée.',
    diagnostic: 'Diabète de type 2 parfaitement équilibré sous monothérapie Metformine',
    codeCim10: 'E11.9 - Diabète de type 2 sans complication',
    traitement: 'Metformine 850mg (1 cp midi et soir) + Coversyl 5mg (1 cp matin)',
    notesMedicales: 'Feuille de soins AMO CNSS délivrée.',
    tarif: 250,
    reglementStatut: 'Payé',
    modePaiement: 'Carte Bancaire',
    createdAt: '2026-08-25 09:55:00'
  }
];

// ============================================================================
// 6. ORDONNANCES ISOLÉES PAR TENANT
// ============================================================================

export const INITIAL_PRESCRIPTIONS: Prescription[] = [
  // --- Cabinet Agadir : Vierge ---

  // --- Cabinet Casablanca (Dr Karim Bennani) ---
  {
    id: 'ord-casa-1',
    organizationId: 'org-bennani',
    patientId: 'pat-casa-1',
    doctorId: 'usr-bennani-owner',
    patientNomComplet: 'Fatima Zahra ALAOUI',
    date: '2026-08-25',
    aldConcernee: true,
    medicaments: [
      {
        id: 'med-3',
        medicament: 'GLUCOPHAGE 850 mg',
        dci: 'Metformine chlorhydrate',
        dosage: '850 mg',
        forme: 'Comprimé pelliculé',
        posologie: '1 comprimé au milieu du déjeuner et 1 comprimé au dîner',
        frequence: '2 fois par jour',
        duree: '3 mois',
        instructions: 'À prendre au cours des repas pour optimiser la tolérance digestive.',
        ald: true,
        nonSubstituable: false
      }
    ],
    conseilsHygiene: 'Régime méditerranéen pauvre en sucres rapides et activité physique de 30 minutes de marche quotidienne.',
    createdAt: '2026-08-25 09:55:00'
  }
];

// ============================================================================
// 7. CERTIFICATS MÉDICAUX
// ============================================================================

export const INITIAL_CERTIFICATES: MedicalCertificate[] = [
  // --- Cabinet Agadir : Vierge ---
];

// ============================================================================
// 8. RENDEZ-VOUS (AGENDA)
// ============================================================================

export const INITIAL_APPOINTMENTS: Appointment[] = [
  // --- Cabinet Casablanca (Dr Mehdi EL KETTANI - Cardiologie) ---
  {
    id: 'rdv-kettani-1',
    organizationId: 'org-elkettani',
    patientId: 'pat-kettani-1',
    doctorId: 'usr-elkettani-owner',
    patientNomComplet: 'Youssef AMRAOUI',
    date: '2026-08-25',
    heureDebut: '10:00',
    heureFin: '10:30',
    motif: 'Contrôle tensionnel & échocardiographie',
    type: 'Consultation',
    statut: 'Terminé'
  },
  {
    id: 'rdv-kettani-2',
    organizationId: 'org-elkettani',
    patientId: 'pat-kettani-2',
    doctorId: 'usr-elkettani-owner',
    patientNomComplet: 'Fatima ZAHRAOUI',
    date: '2026-08-25',
    heureDebut: '11:15',
    heureFin: '11:45',
    motif: 'Bilan cardiaque annuel & ECG d effort',
    type: 'Consultation',
    statut: 'Confirmé'
  },
  // --- Cabinet Dentaire Dr. Sara ALAMI (Casablanca) ---
  {
    id: 'rdv-dent-1',
    organizationId: 'org-dentaire-alami',
    patientId: 'pat-dent-1',
    doctorId: 'usr-alami-owner',
    patientNomComplet: 'Othmane TAZI',
    date: '2026-08-25',
    heureDebut: '10:00',
    heureFin: '11:00',
    motif: 'Pose Implant Titane secteur 26 & RVG de contrôle',
    type: 'Consultation',
    statut: 'En cours'
  },
  {
    id: 'rdv-dent-2',
    organizationId: 'org-dentaire-alami',
    patientId: 'pat-dent-2',
    doctorId: 'usr-alami-owner',
    patientNomComplet: 'Salma BENJELLOUN',
    date: '2026-08-25',
    heureDebut: '11:30',
    heureFin: '12:30',
    motif: 'Séance Éclaircissement Dentaire Fauteuil LED',
    type: 'Consultation',
    statut: 'Confirmé'
  },
  {
    id: 'rdv-dent-3',
    organizationId: 'org-dentaire-alami',
    patientId: 'pat-dent-3',
    doctorId: 'usr-alami-owner',
    patientNomComplet: 'Karim EL FASSI',
    date: '2026-08-25',
    heureDebut: '14:30',
    heureFin: '15:15',
    motif: 'Surfaçage radiculaire sextant 2 et 3',
    type: 'Contrôle',
    statut: 'Confirmé'
  },

  // --- Cabinet Agadir (Dr Yassine EL QYAMI) : Vierge ---

  // --- Cabinet Casablanca (Dr Karim Bennani) ---
  {
    id: 'rdv-casa-1',
    organizationId: 'org-bennani',
    patientId: 'pat-casa-1',
    doctorId: 'usr-bennani-owner',
    patientNomComplet: 'Fatima Zahra ALAOUI',
    date: '2026-08-25',
    heureDebut: '09:30',
    heureFin: '10:00',
    motif: 'Suivi diabète T2 & tension',
    type: 'Consultation',
    statut: 'Terminé'
  },
  {
    id: 'rdv-casa-2',
    organizationId: 'org-bennani',
    patientId: 'pat-casa-2',
    doctorId: 'usr-bennani-owner',
    patientNomComplet: 'Mohamed TAHA',
    date: '2026-08-25',
    heureDebut: '10:30',
    heureFin: '11:00',
    motif: 'Contrôle coronarien & ECG de repos',
    type: 'Consultation',
    statut: 'Confirmé'
  }
];

// ============================================================================
// 9. SALLE D'ATTENTE (WAITING ROOM)
// ============================================================================

export const INITIAL_WAITING_ROOM: WaitingPatient[] = [
  // --- Salle d'attente Cabinet Dr. Mehdi EL KETTANI ---
  {
    id: 'wait-kettani-1',
    organizationId: 'org-elkettani',
    patientId: 'pat-kettani-2',
    nomComplet: 'Fatima ZAHRAOUI',
    age: 62,
    heureArrivee: '11:05',
    tempsAttenteMinutes: 10,
    motif: 'Bilan cardiaque annuel & ECG d effort',
    avecRdv: true,
    statut: 'En attente',
    urgence: false
  },
  // --- Salle d'attente Cabinet Agadir : Vierge ---

  // --- Salle d'attente Cabinet Casablanca ---
  {
    id: 'wait-casa-1',
    organizationId: 'org-bennani',
    patientId: 'pat-casa-2',
    nomComplet: 'Mohamed TAHA',
    age: 63,
    heureArrivee: '10:20',
    tempsAttenteMinutes: 20,
    motif: 'Contrôle ECG et ordonnance',
    avecRdv: true,
    statut: 'En attente',
    urgence: false
  }
];

// ============================================================================
// 10. DOCUMENTS MÉDICAUX (STOCKAGE PRIVÉ SÉCURISÉ)
// ============================================================================

export const INITIAL_DOCUMENTS: MedicalDocument[] = [
  // --- Cabinet Agadir : Vierge ---

  // --- Cabinet Casablanca ---
  {
    id: 'doc-casa-1',
    organizationId: 'org-bennani',
    patientId: 'pat-casa-1',
    patientNomComplet: 'Fatima Zahra ALAOUI',
    nom: 'Bilan Biologique Trimestriel HbA1c & Fonction Rénale - Laboratoire Anfa.pdf',
    categorie: 'Analyses',
    date: '2026-08-10',
    taille: '840 Ko',
    auteur: 'Dr Karim Bennani',
    uploadedByUserId: 'usr-bennani-owner',
    typeMime: 'application/pdf',
    apercuContenu: 'HbA1c = 6.4%, Créatininémie = 7.2 mg/L, Clairance DFG = 98 ml/min',
    isPrivateVault: true,
    vaultStoragePath: 'vault/org-bennani/patients/pat-casa-1/bilan-2026-08.pdf.enc',
    encryptionAlgorithm: 'AES-256-GCM',
    checksumSha256: '7b52009b64fd0a2a49e6d8a939753077792b0554',
    signedUrlExpiresInMinutes: 15
  }
];

// ============================================================================
// 11. BASE MÉDICAMENTEUSE MAROC (DCI & PRIX PUBLICS)
// ============================================================================

export const INITIAL_MEDICATIONS: Medication[] = [
  {
    id: 'med-db-1',
    nom: 'FLIXOTIDE 50 µg',
    dci: 'Fluticasone propionate',
    dosage: '50 µg / dose',
    forme: 'Aérosol-doseur (120 doses)',
    classeTherapeutique: 'Pneumologie / Corticoïde inhalé',
    indicationsCourantes: 'Traitement de fond quotidien de l’asthme persistant',
    contreIndications: 'Allergie connue à la fluticasone',
    posologieHabituelle: '1 à 2 bouffées 2 fois par jour avec chambre d’inhalation chez l’enfant',
    statutRemboursement: '100% (ALD/ALC)',
    prixPublicMarocDH: 89.50
  },
  {
    id: 'med-db-2',
    nom: 'VENTOLINE 100 µg',
    dci: 'Salbutamol sulfate',
    dosage: '100 µg / dose',
    forme: 'Suspension pour inhalation (200 doses)',
    classeTherapeutique: 'Pneumologie / Bronchodilatateur bêta-2 mimétique',
    indicationsCourantes: 'Traitement symptomatique de la crise d’asthme',
    contreIndications: 'Hypersensibilité au principe actif',
    posologieHabituelle: '1 à 2 bouffées en cas de crise (max 8 bouffées / 24h)',
    statutRemboursement: 'Remboursable AMO',
    prixPublicMarocDH: 36.20
  },
  {
    id: 'med-db-3',
    nom: 'DOLIPRANE 2.4% Sans Sucre',
    dci: 'Paracétamol',
    dosage: '24 mg / ml',
    forme: 'Suspension buvable enfant (Flacon 100ml)',
    classeTherapeutique: 'Antalgique & Antipyrétique pédiatrique',
    indicationsCourantes: 'Douleur légère à modérée, fièvre de l’enfant',
    contreIndications: 'Insuffisance hépatocellulaire sévère',
    posologieHabituelle: '15 mg/kg toutes les 6 heures (soit 1 graduation/kg/prise)',
    statutRemboursement: 'Remboursable AMO',
    prixPublicMarocDH: 15.90
  },
  {
    id: 'med-db-4',
    nom: 'AUGMENTIN 100 mg / 12.5 mg Nourrisson',
    dci: 'Amoxicilline + Acide Clavulanique',
    dosage: '100 mg/ml amoxicilline',
    forme: 'Poudre pour suspension buvable pédiatrique',
    classeTherapeutique: 'Infectiologie / Pénicilline à large spectre',
    indicationsCourantes: 'Otite moyenne aiguë purulente, pneumopathie bactérienne',
    contreIndications: 'Allergie confirmée aux bêta-lactamines, antécédent d’ictère sous amox/clav',
    posologieHabituelle: '80 mg/kg/jour en 3 prises au cours des repas',
    statutRemboursement: 'Remboursable AMO',
    prixPublicMarocDH: 68.30
  },
  {
    id: 'med-db-5',
    nom: 'GLUCOPHAGE 850 mg',
    dci: 'Metformine chlorhydrate',
    dosage: '850 mg',
    forme: 'Comprimé pelliculé (Boîte de 30)',
    classeTherapeutique: 'Diabétologie / Biguanide',
    indicationsCourantes: 'Diabète de type 2 en 1ère intention',
    contreIndications: 'Insuffisance rénale sévère (DFG < 30 ml/min), acidose métabolique',
    posologieHabituelle: '1 comprimé 2 à 3 fois par jour aux repas',
    statutRemboursement: '100% (ALD/ALC)',
    prixPublicMarocDH: 34.80
  },
  {
    id: 'med-db-6',
    nom: 'COVERSYL 5 mg',
    dci: 'Périndopril arginine',
    dosage: '5 mg',
    forme: 'Comprimé pelliculé sécable (Boîte de 30)',
    classeTherapeutique: 'Cardiologie / Inhibiteur de l’enzyme de conversion (IEC)',
    indicationsCourantes: 'Hypertension artérielle essentielle, insuffisance cardiaque',
    contreIndications: 'Grossesse (2e et 3e trimestres), antécédent d’angioedème',
    posologieHabituelle: '1 comprimé le matin au lever',
    statutRemboursement: '100% (ALD/ALC)',
    prixPublicMarocDH: 85.00
  }
];

// ============================================================================
// 12. TRANSACTIONS & FINANCES EN DIRHAMS (ISOLÉES PAR TENANT)
// ============================================================================

export const INITIAL_TRANSACTIONS: PaymentTransaction[] = [
  // --- Transactions Cabinet Agadir : Vierge ---

  // --- Transactions Cabinet Casablanca ---
  {
    id: 'tx-casa-1',
    organizationId: 'org-bennani',
    date: '2026-08-25',
    patientId: 'pat-casa-1',
    patientNomComplet: 'Fatima Zahra ALAOUI',
    montant: 250,
    typeActe: 'Consultation Médecine Générale & Diabète',
    modePaiement: 'Carte Bancaire',
    statut: 'Payé'
  },
  {
    id: 'tx-casa-2',
    organizationId: 'org-bennani',
    date: '2026-08-25',
    patientId: 'pat-casa-2',
    patientNomComplet: 'Mohamed TAHA',
    montant: 400,
    typeActe: 'Consultation & Électrocardiogramme (ECG)',
    modePaiement: 'Chèque',
    statut: 'Payé'
  }
];

export const INITIAL_EXPENSES: ExpenseItem[] = [
  // --- Dépenses Cabinet Agadir : Vierge ---

  // --- Dépenses Cabinet Casablanca ---
  {
    id: 'exp-casa-1',
    organizationId: 'org-bennani',
    date: '2026-08-01',
    fournisseur: 'Société Immobilière Anfa',
    description: 'Loyer cabinet médical Anfa Casablanca',
    categorie: 'Loyer & Charges',
    montant: 8000,
    statut: 'Réglé'
  },
  {
    id: 'exp-casa-2',
    organizationId: 'org-bennani',
    date: '2026-02-15',
    fournisseur: 'Wolf Digital SARL',
    description: 'Abonnement Annuel SaaS MEDICAL OS Standard (3 000 MAD / an)',
    categorie: 'Logiciels & Informatique',
    montant: 3000,
    statut: 'Réglé'
  }
];

// ============================================================================
// 13. JOURNAL D'AUDIT TECHNIQUE (AUDIT LOGS)
// ============================================================================

export const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'log-casa-1',
    organizationId: 'org-bennani',
    timestamp: '2026-08-25 09:42:15',
    userId: 'usr-bennani-owner',
    userName: 'Dr Karim Bennani',
    userRole: 'Médecin Titulaire',
    actionType: 'LECTURE_DOSSIER',
    categorie: 'Dossier Patient',
    patientId: 'pat-casa-1',
    patientName: 'Fatima Zahra ALAOUI',
    ipAddress: '196.200.148.42 (Cabinet Casablanca)',
    details: 'Ouverture du dossier médical et historique diabétologie',
    hashIntegrite: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
  }
];

// ============================================================================
// 14. CONSENTEMENTS PATIENTS (LOI 09-08)
// ============================================================================

export const INITIAL_PATIENT_CONSENTS: PatientConsent[] = [
  {
    id: 'cst-casa-1',
    organizationId: 'org-bennani',
    patientId: 'pat-casa-1',
    patientNom: 'Fatima Zahra ALAOUI',
    cin: 'BE628190',
    typeConsentement: 'traitement_donnees_sante',
    libelle: 'Traitement des données de santé au dossier médical informatisé',
    baseLegale: 'Articles 4 & 12 de la Loi 09-08',
    dateConsentement: '2026-01-10',
    statut: 'Accordé',
    methodeRecueil: 'Signature électronique sur tablette',
    recueilliPar: 'Dr Karim Bennani'
  }
];

// ============================================================================
// 15. POLITIQUES DE RÉTENTION & ARCHIVAGE LÉGAL
// ============================================================================

export const INITIAL_RETENTION_POLICIES: RetentionPolicy[] = [
  {
    id: 'ret-1',
    categorieDonnees: 'Dossiers Médicaux Pédiatriques & Carnet de Santé',
    dureeConservationAnnees: 28,
    baseReglementaire: 'Loi 09-08 & Recommandations CNDP / Ordre National des Médecins (Conservation jusqu’à 28 ans du patient)',
    actionFinCycle: 'Archivage sécurisé à froid',
    statut: 'Actif',
    description: 'Conservation légale renforcée pour les dossiers de mineurs.'
  },
  {
    id: 'ret-2',
    categorieDonnees: 'Dossiers Médicaux Adultes & Consultations',
    dureeConservationAnnees: 20,
    baseReglementaire: 'Code de Déontologie Médicale Marocain & Loi 09-08',
    actionFinCycle: 'Archivage sécurisé à froid',
    statut: 'Actif',
    description: 'Conservation de 20 ans à compter de la dernière consultation.'
  },
  {
    id: 'ret-3',
    categorieDonnees: 'Pièces Comptables, Honoraires & Feuilles AMO',
    dureeConservationAnnees: 10,
    baseReglementaire: 'Code Général des Impôts (CGI) & Code de Commerce Marocain',
    actionFinCycle: 'Archivage sécurisé à froid',
    statut: 'Actif',
    description: 'Obligation fiscale et légale de conservation décennale.'
  },
  {
    id: 'ret-4',
    categorieDonnees: 'Journaux d’Audit & Logs d’Accès de Sécurité',
    dureeConservationAnnees: 5,
    baseReglementaire: 'Normes de Sécurité CNDP & Traçabilité de l’Hébergement de Santé',
    actionFinCycle: 'Anonymisation irréversible',
    statut: 'Actif',
    description: 'Conservation de 5 ans pour les enquêtes de sécurité et conformité.'
  }
];

// ============================================================================
// 16. EXPORTS DE DONNÉES (PORTABILITÉ STRICTE ISOLÉE)
// ============================================================================

export const INITIAL_EXPORT_JOBS: DataExportJob[] = [
  {
    id: 'exp-agadir-1',
    organizationId: 'org-elqyami',
    dateDemande: '2026-08-20 16:30',
    demandeur: 'Dr Yassine EL QYAMI',
    typeExport: 'Export Intégral Cabinet (CSV & JSON)',
    format: 'ZIP',
    statut: 'Généré',
    taille: '8.2 Mo',
    emprunteSha256: 'a1b2c3d4e5f6789012345678abcdef9876543210'
  },
  {
    id: 'exp-casa-1',
    organizationId: 'org-bennani',
    dateDemande: '2026-08-15 11:20',
    demandeur: 'Dr Karim Bennani',
    typeExport: 'Registre des traitements CNDP',
    format: 'PDF',
    statut: 'Généré',
    taille: '1.8 Mo',
    emprunteSha256: '9876543210abcdef1234567890abcdef12345678'
  }
];

// ============================================================================
// 17. TICKETS DE SUPPORT TECHNIQUE (WOLF DIGITAL)
// ============================================================================

export const INITIAL_SUPPORT_TICKETS: SupportTicket[] = [
  {
    id: 'tkt-101',
    organizationId: 'org-elqyami',
    organizationName: 'Cabinet de Pédiatrie Dr Yassine EL QYAMI (Agadir)',
    userId: 'usr-elqyami-owner',
    userName: 'Dr Yassine EL QYAMI',
    category: 'Demande d\'évolution',
    priority: 'Normale',
    subject: 'Ajout de la courbe de périmètre crânien OMS pour nourrissons prématurés',
    message: 'Bonjour l’équipe Wolf Digital, nous aimerions pouvoir basculer sur les courbes Fenton ou OMS ajustées pour l’âge corrigé lors du suivi des bébés prématurés.',
    status: 'En cours de traitement',
    createdAt: '2026-08-24 14:00',
    updatedAt: '2026-08-25 10:15',
    messages: [
      {
        id: 'msg-1',
        senderName: 'Dr Yassine EL QYAMI',
        senderRole: 'Médecin Pédiatre',
        isWolfStaff: false,
        timestamp: '2026-08-24 14:00',
        message: 'Bonjour l’équipe Wolf Digital, nous aimerions pouvoir basculer sur les courbes Fenton ou OMS ajustées pour l’âge corrigé lors du suivi des bébés prématurés.'
      },
      {
        id: 'msg-2',
        senderName: 'Ingénieur Produit Wolf Digital',
        senderRole: 'Support Technique',
        isWolfStaff: true,
        timestamp: '2026-08-25 10:15',
        message: 'Bonjour Dr EL QYAMI. Excellente suggestion pédiatrique ! Notre équipe produit a intégré cette spécification dans le sprint de la semaine prochaine.'
      }
    ]
  },
  {
    id: 'tkt-102',
    organizationId: 'org-bennani',
    organizationName: 'Cabinet Médical Anfa Santé (Casablanca)',
    userId: 'usr-bennani-owner',
    userName: 'Dr Karim Bennani',
    category: 'Sauvegarde & Export',
    priority: 'Basse',
    subject: 'Confirmation de la dernière sauvegarde chiffrée nocturne',
    message: 'Bonjour, pouvez-vous me confirmer que la sauvegarde automatique s’est bien synchronisée la nuit dernière ?',
    status: 'Résolu',
    createdAt: '2026-08-25 08:00',
    updatedAt: '2026-08-25 08:45',
    messages: [
      {
        id: 'msg-3',
        senderName: 'Dr Karim Bennani',
        senderRole: 'Médecin Titulaire',
        isWolfStaff: false,
        timestamp: '2026-08-25 08:00',
        message: 'Bonjour, pouvez-vous me confirmer que la sauvegarde automatique s’est bien synchronisée la nuit dernière ?'
      },
      {
        id: 'msg-4',
        senderName: 'Support Infrastructure Wolf Digital',
        senderRole: 'DevOps & Sécurité',
        isWolfStaff: true,
        timestamp: '2026-08-25 08:45',
        message: 'Bonjour Dr Bennani. La sauvegarde chiffrée AES-256 de votre cabinet a été validée avec succès à 04:00:00 avec une intégrité SHA-256 certifiée (Taille 480 Mo).'
      }
    ]
  }
];

// ============================================================================
// 18. MÉTRIQUES GLOBALES WOLF DIGITAL (SUPER ADMIN TECHNIQUE)
// ============================================================================

export const WOLF_DIGITAL_METRICS: WolfDigitalMetric = {
  totalTenants: 148,
  activePaidTenants: 132,
  trialTenants: 16,
  annualPricePerTenantMAD: 3000,
  arrTotalMAD: 396000, // 132 * 3000 MAD = 396,000 MAD / an
  mrrEquivalentMAD: 33000, // 396,000 / 12 = 33,000 MAD / mois
  uptimePercentage: 99.98,
  errorRatePercentage: 0.01,
  totalStorageUsedGb: 48.6,
  activeDatabaseConnections: 312,
  rlsPoliciesEnforced: 42,
  lastBackupSyncTime: '2026-08-25 04:00:00 UTC',
  version: 'MEDICAL OS v2.6.4-MultiTenant'
};

export const INITIAL_ACCESS_USERS: AccessUser[] = [
  {
    id: 'usr-1',
    organizationId: 'org-bennani',
    nom: 'Bennani',
    prenom: 'Dr Karim',
    role: 'Médecin Titulaire',
    email: 'dr.bennani@cabinet-anfa-sante.ma',
    telephone: '+212 6 61 24 89 10',
    mfaEnabled: true,
    statut: 'Actif',
    dernierAcces: '2026-08-25 09:42:15 (Session active)',
    permissions: {
      canViewMedicalRecords: true,
      canEditMedicalRecords: true,
      canPrescribe: true,
      canExportData: true,
      canDeleteRecords: true,
      canManageSecurity: true,
      canViewAuditLogs: true
    }
  },
  {
    id: 'usr-2',
    organizationId: 'org-bennani',
    nom: 'Chraibi',
    prenom: 'Kawtar',
    role: 'Secrétaire Médicale',
    email: 'kawtar.secretariat@cabinet-anfa-sante.ma',
    telephone: '+212 6 70 88 12 34',
    mfaEnabled: true,
    statut: 'Actif',
    dernierAcces: '2026-08-25 08:30:11',
    permissions: {
      canViewMedicalRecords: false,
      canEditMedicalRecords: false,
      canPrescribe: false,
      canExportData: false,
      canDeleteRecords: false,
      canManageSecurity: false,
      canViewAuditLogs: false
    }
  }
];

// ============================================================================
// 19. DEVIS DENTAIRES (QUOTES)
// ============================================================================

export const INITIAL_DENTAL_QUOTES: DentalQuote[] = [
  {
    id: 'dev-dent-001',
    organizationId: 'org-dentaire-alami',
    patientId: 'pat-dent-1',
    patientNomComplet: 'Othmane TAZI',
    numeroDevis: 'DEV-2026-0042',
    date: '2026-08-20',
    validiteJours: 90,
    praticien: 'Dr. Sara ALAMI',
    statut: 'Validé Patient',
    notes: 'Devis pour réhabilitation implanto-portée 26 + Couronne Zircone 14. Acompte de 30% versé à la commande des pièces.',
    createdAt: '2026-08-20 11:20:00',
    totalBrutDH: 14100,
    remiseTotaleDH: 1100,
    totalNetDH: 13000,
    totalAmoEstimeDH: 1800,
    resteAChargePatientDH: 11200,
    items: [
      {
        id: 'item-1',
        actCode: 'IMP-TITANE',
        actNom: 'Pose d\'un Implant Dentaire Titane Ostéo-Intégré (Grade V SLA)',
        categorie: 'Implantologie',
        toothNumber: 26,
        cotation: 'HN',
        quantite: 1,
        tarifUnitaireDH: 6000,
        remiseDH: 500,
        totalDH: 5500,
        amoEstimeDH: 0,
        resteAChargeDH: 5500,
        statut: 'En cours',
        notes: 'Implant Ø 4.2mm x L 11.5mm'
      },
      {
        id: 'item-2',
        actCode: 'PILIER-IMP',
        actNom: 'Pilier implantaire Titane personnalisé CAO/CFAO',
        categorie: 'Implantologie',
        toothNumber: 26,
        cotation: 'HN',
        quantite: 1,
        tarifUnitaireDH: 1500,
        remiseDH: 0,
        totalDH: 1500,
        amoEstimeDH: 0,
        resteAChargeDH: 1500,
        statut: 'Planifié'
      },
      {
        id: 'item-3',
        actCode: 'COUR-SUR-IMP',
        actNom: 'Couronne Zircone / Céramique transvissée sur implant',
        categorie: 'Implantologie',
        toothNumber: 26,
        cotation: 'HN + SPR50',
        quantite: 1,
        tarifUnitaireDH: 3800,
        remiseDH: 300,
        totalDH: 3500,
        amoEstimeDH: 840,
        resteAChargeDH: 2660,
        statut: 'Planifié'
      },
      {
        id: 'item-4',
        actCode: 'C-ZIRCONE',
        actNom: 'Couronne Zircone Pure Monolithique Multicouche 3D',
        categorie: 'Prothèses Fixes',
        toothNumber: 14,
        cotation: 'SPR 50 + HN',
        quantite: 1,
        tarifUnitaireDH: 2800,
        remiseDH: 300,
        totalDH: 2500,
        amoEstimeDH: 960,
        resteAChargeDH: 1540,
        statut: 'Planifié'
      }
    ]
  },
  {
    id: 'dev-dent-002',
    organizationId: 'org-dentaire-alami',
    patientId: 'pat-dent-2',
    patientNomComplet: 'Salma BENJELLOUN',
    numeroDevis: 'DEV-2026-0043',
    date: '2026-08-22',
    validiteJours: 60,
    praticien: 'Dr. Sara ALAMI',
    statut: 'Brouillon',
    notes: 'Projet esthétique Sourire : Blanchiment + 2 facettes E-Max antérieures.',
    createdAt: '2026-08-22 14:10:00',
    totalBrutDH: 8500,
    remiseTotaleDH: 500,
    totalNetDH: 8000,
    totalAmoEstimeDH: 0,
    resteAChargePatientDH: 8000,
    items: [
      {
        id: 'item-5',
        actCode: 'BLANCH-FAUTEUIL',
        actNom: 'Éclaircissement dentaire au fauteuil par Lampe LED Bleue',
        categorie: 'Esthétique & Blanchiment',
        cotation: 'HN',
        quantite: 1,
        tarifUnitaireDH: 2500,
        remiseDH: 500,
        totalDH: 2000,
        amoEstimeDH: 0,
        resteAChargeDH: 2000,
        statut: 'Planifié'
      },
      {
        id: 'item-6',
        actCode: 'FACETTE-CER',
        actNom: 'Facette dentaire pelliculaire céramique E-Max',
        categorie: 'Soins Conservateurs',
        toothNumber: 11,
        cotation: 'HN',
        quantite: 1,
        tarifUnitaireDH: 3000,
        remiseDH: 0,
        totalDH: 3000,
        amoEstimeDH: 0,
        resteAChargeDH: 3000,
        statut: 'Planifié'
      },
      {
        id: 'item-7',
        actCode: 'FACETTE-CER',
        actNom: 'Facette dentaire pelliculaire céramique E-Max',
        categorie: 'Soins Conservateurs',
        toothNumber: 21,
        cotation: 'HN',
        quantite: 1,
        tarifUnitaireDH: 3000,
        remiseDH: 0,
        totalDH: 3000,
        amoEstimeDH: 0,
        resteAChargeDH: 3000,
        statut: 'Planifié'
      }
    ]
  }
];

