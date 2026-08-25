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
  WolfDigitalMetric
} from '../types';

// ============================================================================
// 1. ORGANIZATIONS (TENANTS DU SAAS MEDICAL OS)
// ============================================================================

export const ORGANIZATIONS: Organization[] = [
  {
    id: 'org-elqyami',
    name: 'Cabinet de Pédiatrie & Néonatalogie Dr Yassine EL QYAMI',
    slug: 'pediatrie-elqyami-agadir',
    speciality: 'Pédiatrie, Néonatalogie & Suivi de Développement',
    city: 'Agadir',
    address: 'Boulevard Hassan II, Résidence Médicale Al Manar, 3ème étage, Apt 7',
    phone: '+212 5 28 84 10 20',
    email: 'contact@pediatrie-elqyami-agadir.ma',
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
  }
];

// ============================================================================
// 2. UTILISATEURS DU SAAS & RÔLES (RBAC)
// ============================================================================

export const INITIAL_USER_ACCOUNTS: UserAccount[] = [
  {
    id: 'usr-elqyami-owner',
    organizationId: 'org-elqyami',
    role: 'DOCTOR_OWNER',
    roleLabel: 'Médecin Titulaire (Propriétaire du Cabinet)',
    name: 'Dr Yassine EL QYAMI',
    email: 'dr.elqyami@pediatrie-elqyami-agadir.ma',
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
    name: 'Soukaina CHAMI',
    email: 'secretariat@pediatrie-elqyami-agadir.ma',
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
  }
];

// ============================================================================
// 3. PARAMÈTRES DES CABINETS
// ============================================================================

export const DR_EL_QYAMI_SETTINGS: PracticeSettings = {
  cabinet: {
    nom: 'Cabinet de Pédiatrie & Néonatalogie Dr Yassine EL QYAMI',
    adresse: 'Boulevard Hassan II, Résidence Médicale Al Manar, 3ème étage, Apt 7',
    codePostal: '80000',
    ville: 'Agadir',
    pays: 'Royaume du Maroc',
    telephone: '+212 5 28 84 10 20',
    email: 'contact@pediatrie-elqyami-agadir.ma',
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
    secteur: 'Pédiatrie Libérale Conventionnée AMO (Agadir)',
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
    enteteTexte: "Dr Yassine EL QYAMI — Pédiatre à Agadir · Spécialiste des Maladies de l'Enfant et du Nouveau-né (Lauréat Faculté de Médecine)",
    piedDePage: 'Cabinet de Pédiatrie Dr EL QYAMI · ICE : 003311669000022 · Agadir · N° INPE : 8029381029 · N° Ordre CNOM : 18492 · Conforme Loi 09-08',
    afficherTampon: true,
    afficherLogo: true
  },
  privacyPolicy: {
    responsableTraitement: 'Dr Yassine EL QYAMI',
    qualiteResponsable: 'Médecin Pédiatre Responsable du Cabinet Médical (Agadir)',
    numeroInpe: '8029381029',
    numeroCnom: '18492',
    statutDeclarationCndp: 'Récépissé de déclaration obtenu',
    numeroRecepisseCndp: 'D-M-588/2026',
    dateDeclarationCndp: '2026-02-10',
    contactDpoEmail: 'dpo@pediatrie-elqyami-agadir.ma',
    contactDpoTel: '+212 5 28 84 10 20',
    finalitesTraitement: [
      'Suivi pédiatrique, carnet de vaccination national, courbes de croissance OMS et néonatalogie',
      "Gestion administrative des dossiers d'enfants et rappels vaccinaux parentaux",
      'Télétransmission et feuilles de soins AMO (CNSS, CNOPS) et mutuelles marocaines',
      'Protection et confidentialité stricte des données médicales des mineurs (Loi 09-08)'
    ],
    destinatairesAutorises: [
      'Dr Yassine EL QYAMI (Pédiatre Titulaire)',
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
    texteAfficheSalleAttente: "Conformément à la loi n° 09-08, les données médicales de votre enfant font l'objet d'un traitement sécurisé sous récépissé CNDP n° D-M-588/2026 par le Dr Yassine EL QYAMI (ICE: 003311669000022)."
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
  // --- Cabinet Dr Yassine EL QYAMI (Agadir - Pédiatrie) ---
  {
    id: 'pat-agadir-1',
    organizationId: 'org-elqyami',
    nom: 'EL AMRI',
    prenom: 'Rayan',
    sexe: 'M',
    dateNaissance: '2021-04-12',
    age: 5,
    telephone: '+212 6 61 98 22 10',
    email: 'parents.elamri@gmail.com',
    adresse: 'Résidence Islane, Bâtiment C, Apt 14, Hay Mohammadi',
    ville: 'Agadir',
    codePostal: '80000',
    cin: 'Enfant (Tuteur: JC489201)',
    numeroAmo: '10984920491',
    organismeAssurance: 'AMO CNSS',
    numAffiliationMutuelle: 'MUT-SAHAM-84920',
    groupeSanguin: 'O+',
    medecinTraitant: true,
    statut: 'Chronique',
    derniereConsultation: '2026-08-25',
    prochainRdv: '2026-09-15',
    allergies: ['Protéines de lait de vache (PLV - résolu)', 'Acariens'],
    antecedents: {
      medicaux: ['Asthme du nourrisson à l’âge de 18 mois', 'Bronchiolites récidivantes'],
      chirurgicaux: ['Adénoïdectomie en 2024'],
      familiaux: ['Père asthmatique', 'Mère rhinite allergique']
    },
    traitementsActuels: ['Flixotide 50µg 1 bouffée matin et soir (chambre d’inhalation)', 'Ventoline 100µg si sifflement'],
    ald: true,
    nomAld: 'ALD 14 - Asthme sévère de l’enfant',
    notesGenerales: 'Enfant coopératif. Carnet vaccinal à jour (Hexavalent, Pneumocoque, ROR faits).',
    notesConfidentiellesMedecin: 'Terrain atopique familial marqué. Surveillance spirométrie pédiatrique prévue en automne.',
    estDossierSensible: false,
    poidsRef: 18.5,
    tailleRef: 110,
    taRef: '95/60',
    contactUrgence: {
      nom: 'Mme Meryem El Amri (Mère)',
      lien: 'Mère',
      telephone: '+212 6 61 98 22 10'
    },
    consentementLoi0908: true,
    createdAt: '2026-01-10',
    updatedAt: '2026-08-25'
  },
  {
    id: 'pat-agadir-2',
    organizationId: 'org-elqyami',
    nom: 'TAZI',
    prenom: 'Inès',
    sexe: 'F',
    dateNaissance: '2024-11-05',
    age: 1,
    telephone: '+212 6 63 45 78 90',
    email: 'famille.tazi.agadir@gmail.com',
    adresse: 'Boulevard du 20 Août, Résidence Al Manzah, Apt 6',
    ville: 'Agadir',
    codePostal: '80000',
    cin: 'Nourrisson (Tuteur: JB938201)',
    numeroAmo: '20394819203',
    organismeAssurance: 'AMO CNOPS',
    numAffiliationMutuelle: 'MUT-MGPAP-99201',
    groupeSanguin: 'A+',
    medecinTraitant: true,
    statut: 'Actif',
    derniereConsultation: '2026-08-20',
    prochainRdv: '2026-08-25',
    allergies: ['Aucune allergie connue'],
    antecedents: {
      medicaux: ['Nouveau-né à terme (38 SA, PN 3.200 kg), APGAR 10/10', 'Ictère néonatal physiologique'],
      chirurgicaux: ['Aucun'],
      familiaux: ['Pas d’antécédents pathologiques']
    },
    traitementsActuels: ['Vitamine D3 (ZymaD 4 gouttes/jour)', 'Stérimar Bébé hygiène nasale'],
    ald: false,
    notesGenerales: 'Visite systématique du 9ème mois avec rappel vaccinal ROR & Méningocoque B.',
    notesConfidentiellesMedecin: 'Bonne prise pondérale (+350g ce mois). Acquisition station assise sans appui OK.',
    estDossierSensible: false,
    poidsRef: 8.9,
    tailleRef: 72,
    contactUrgence: {
      nom: 'M. Karim Tazi (Père)',
      lien: 'Père',
      telephone: '+212 6 63 45 78 90'
    },
    consentementLoi0908: true,
    createdAt: '2026-02-14',
    updatedAt: '2026-08-20'
  },
  {
    id: 'pat-agadir-3',
    organizationId: 'org-elqyami',
    nom: 'BOUSSAID',
    prenom: 'Adam',
    sexe: 'M',
    dateNaissance: '2018-09-18',
    age: 7,
    telephone: '+212 6 70 12 34 56',
    email: 'boussaid.family@yahoo.fr',
    adresse: 'Quartier Dakhla, Rue 2 Mars, Villa 88',
    ville: 'Agadir',
    codePostal: '80000',
    cin: 'Enfant (Tuteur: JH102938)',
    numeroAmo: '19482910394',
    organismeAssurance: 'AMO CNSS',
    numAffiliationMutuelle: 'MUT-WAFA-10928',
    groupeSanguin: 'B+',
    medecinTraitant: true,
    statut: 'Actif',
    derniereConsultation: '2026-08-25',
    prochainRdv: '2026-09-02',
    allergies: ['Pénicilline (Éruption cutanée à 2 ans)'],
    antecedents: {
      medicaux: ['Épisodes d’otites moyennes aiguës bilatérales récidivantes'],
      chirurgicaux: ['Pose d’aérateurs transtympaniques (yoyos) en 2023'],
      familiaux: ['Terrain de surdité familiale maternelle']
    },
    traitementsActuels: ['Aucun en cours'],
    ald: false,
    notesGenerales: 'Contrôle oto-rhino pédiatrique et certificat médical de rentrée scolaire.',
    notesConfidentiellesMedecin: 'Tympans intègres, pas de rétraction ni épanchement rétrotympanique.',
    estDossierSensible: false,
    poidsRef: 24.0,
    tailleRef: 124,
    contactUrgence: {
      nom: 'Mme Samira Boussaid (Mère)',
      lien: 'Mère',
      telephone: '+212 6 70 12 34 56'
    },
    consentementLoi0908: true,
    createdAt: '2026-03-01',
    updatedAt: '2026-08-25'
  },
  {
    id: 'pat-agadir-4',
    organizationId: 'org-elqyami',
    nom: 'BENSAID',
    prenom: 'Lina',
    sexe: 'F',
    dateNaissance: '2023-06-30',
    age: 3,
    telephone: '+212 6 62 89 01 23',
    email: 'bensaid.agadir@gmail.com',
    adresse: 'Sonaba Founty, Résidence Les Palmiers, Apt 10',
    ville: 'Agadir',
    codePostal: '80000',
    cin: 'Enfant (Tuteur: JC559201)',
    numeroAmo: '30492810294',
    organismeAssurance: 'AMO Tadamon',
    numAffiliationMutuelle: '',
    groupeSanguin: 'O-',
    medecinTraitant: true,
    statut: 'Nouveau',
    derniereConsultation: '2026-08-25',
    allergies: ['Aucune allergie signalée'],
    antecedents: {
      medicaux: ['Gastro-entérite aiguë à 1 an'],
      chirurgicaux: ['Aucun'],
      familiaux: ['Diabète type 1 grand-mère']
    },
    traitementsActuels: ['Doliprane sirop 2.4% si fièvre > 38.5°C'],
    ald: false,
    notesGenerales: 'Fièvre isolée à 38.8°C depuis 24h avec toux sèche quinteuse.',
    poidsRef: 14.2,
    tailleRef: 96,
    contactUrgence: {
      nom: 'M. Omar Bensaid (Père)',
      lien: 'Père',
      telephone: '+212 6 62 89 01 23'
    },
    consentementLoi0908: true,
    createdAt: '2026-08-25',
    updatedAt: '2026-08-25'
  },

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
  // --- Consultations Cabinet Agadir (Dr Yassine EL QYAMI) ---
  {
    id: 'cons-agadir-1',
    organizationId: 'org-elqyami',
    patientId: 'pat-agadir-1',
    doctorId: 'usr-elqyami-owner',
    patientNomComplet: 'Rayan EL AMRI',
    date: '2026-08-25',
    heure: '09:00',
    dureeMinutes: 25,
    type: 'Présentiel',
    motif: 'Contrôle trimestriel asthme pédiatrique & renouvellement ordonnance de fond',
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
    symptomes: ['Aucune crise nocturne depuis 2 mois', 'Excellente tolérance aux activités sportives scolaires'],
    examenClinique: 'Enfant eupnéique au repos. Murmure vésiculaire symétrique sans râle sibilant. Oropharynx non inflammatoire. Tympans normaux. Courbe de croissance pondérale régulière.',
    diagnostic: 'Asthme pédiatrique bien contrôlé sous corticothérapie inhalée à dose minimale',
    codeCim10: 'J45.0 - Asthme allergique de l’enfant',
    traitement: 'Poursuite Flixotide 50µg (1 bouffée matin et soir) + renouvellement chambre d’inhalation',
    notesMedicales: 'Très bonne observance parentale. Feuille de soins AMO CNSS délivrée avec prise en charge ALD 100%.',
    notesPriveesMedecin: 'Proposer test de baisse de palier au printemps 2027 si stabilité continue.',
    tarif: 250,
    reglementStatut: 'Payé',
    modePaiement: 'Carte Bancaire',
    ordonnanceId: 'ord-agadir-1',
    certificatId: 'cert-agadir-1',
    createdAt: '2026-08-25 09:30:00'
  },
  {
    id: 'cons-agadir-2',
    organizationId: 'org-elqyami',
    patientId: 'pat-agadir-3',
    doctorId: 'usr-elqyami-owner',
    patientNomComplet: 'Adam BOUSSAID',
    date: '2026-08-25',
    heure: '10:00',
    dureeMinutes: 20,
    type: 'Présentiel',
    motif: 'Examen médical complet de rentrée scolaire & certificat d’aptitude aux activités sportives',
    constantes: {
      tensionSystolique: 100,
      tensionDiastolique: 65,
      temperature: 37.0,
      poids: 24.0,
      taille: 124,
      imc: 15.6,
      frequenceCardiaque: 82,
      saturationO2: 99
    },
    symptomes: ['Aucune plainte fonctionnelle', 'Bonne audition signalée par les parents'],
    examenClinique: 'Examen cardio-pulmonaire normal. Otoscopie : membranes tympaniques cicatricielles sans perforation. Acuité visuelle 10/10 aux deux yeux. Développement psychomoteur parfait.',
    diagnostic: 'Enfant en excellente santé générale. Absence de contre-indication au sport scolaire et natation.',
    codeCim10: 'Z00.1 - Examen de santé de routine de l’enfant',
    traitement: 'Hygiène de vie, alimentation variée, conseils d’hydratation',
    notesMedicales: 'Certificat médical d’aptitude sportive délivré (Football et Natation).',
    tarif: 250,
    reglementStatut: 'Payé',
    modePaiement: 'Espèces',
    certificatId: 'cert-agadir-2',
    createdAt: '2026-08-25 10:25:00'
  },

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
  {
    id: 'ord-agadir-1',
    organizationId: 'org-elqyami',
    consultationId: 'cons-agadir-1',
    patientId: 'pat-agadir-1',
    doctorId: 'usr-elqyami-owner',
    patientNomComplet: 'Rayan EL AMRI',
    date: '2026-08-25',
    aldConcernee: true,
    medicaments: [
      {
        id: 'med-1',
        medicament: 'FLIXOTIDE 50 µg / dose',
        dci: 'Propionate de fluticasone',
        dosage: '50 µg',
        forme: 'Suspension pour inhalation buccale',
        posologie: '1 bouffée le matin et 1 bouffée le soir avec chambre d’inhalation (AeroChamber)',
        frequence: 'Matin et Soir',
        duree: '3 mois (Traitement de fond)',
        instructions: 'Bien rincer la bouche à l’eau après chaque prise.',
        ald: true,
        nonSubstituable: true
      },
      {
        id: 'med-2',
        medicament: 'VENTOLINE 100 µg / dose',
        dci: 'Salbutamol',
        dosage: '100 µg',
        forme: 'Aérosol-doseur',
        posologie: '1 à 2 bouffées en cas de toux quinteuse ou sifflement respiratoire',
        frequence: 'Si besoin',
        duree: 'En cas de crise',
        instructions: 'À administrer immédiatement avec la chambre d’inhalation.',
        ald: true,
        nonSubstituable: false
      }
    ],
    conseilsHygiene: 'Aérer la chambre 15 minutes chaque matin. Éviter l’exposition aux fumées de tabac et aux parfums d’ambiance.',
    createdAt: '2026-08-25 09:30:00'
  },
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
  {
    id: 'cert-agadir-1',
    organizationId: 'org-elqyami',
    type: 'aptitude_sport',
    titre: 'Certificat Médical d’Aptitude Sportive Scolaire',
    patientId: 'pat-agadir-3',
    doctorId: 'usr-elqyami-owner',
    patientNomComplet: 'Adam BOUSSAID',
    date: '2026-08-25',
    sportPratique: 'Éducation physique scolaire, Football & Natation',
    texteContenu: "Je soussigné, Dr Yassine EL QYAMI, Docteur en Médecine, spécialiste en Pédiatrie à Agadir, certifie avoir examiné ce jour l'enfant Adam BOUSSAID, né le 18/09/2018, et atteste qu'il ne présente à ce jour aucun signe clinique décelable contre-indiquant la pratique des activités physiques et sportives scolaires (Football, Gymnastique, Natation).\n\nCertificat délivré aux représentants légaux pour servir et valoir ce que de droit.",
    createdAt: '2026-08-25 10:25:00'
  }
];

// ============================================================================
// 8. RENDEZ-VOUS (AGENDA)
// ============================================================================

export const INITIAL_APPOINTMENTS: Appointment[] = [
  // --- Cabinet Agadir (Dr Yassine EL QYAMI) ---
  {
    id: 'rdv-agadir-1',
    organizationId: 'org-elqyami',
    patientId: 'pat-agadir-1',
    doctorId: 'usr-elqyami-owner',
    patientNomComplet: 'Rayan EL AMRI',
    date: '2026-08-25',
    heureDebut: '09:00',
    heureFin: '09:30',
    motif: 'Contrôle asthme & ordonnance de fond',
    type: 'Consultation',
    statut: 'Terminé'
  },
  {
    id: 'rdv-agadir-2',
    organizationId: 'org-elqyami',
    patientId: 'pat-agadir-3',
    doctorId: 'usr-elqyami-owner',
    patientNomComplet: 'Adam BOUSSAID',
    date: '2026-08-25',
    heureDebut: '10:00',
    heureFin: '10:30',
    motif: 'Certificat médical de rentrée sportive',
    type: 'Consultation',
    statut: 'Terminé'
  },
  {
    id: 'rdv-agadir-3',
    organizationId: 'org-elqyami',
    patientId: 'pat-agadir-2',
    doctorId: 'usr-elqyami-owner',
    patientNomComplet: 'Inès TAZI',
    date: '2026-08-25',
    heureDebut: '11:00',
    heureFin: '11:30',
    motif: 'Visite systématique du 9ème mois & Vaccin',
    type: 'Vaccination',
    statut: 'En cours'
  },
  {
    id: 'rdv-agadir-4',
    organizationId: 'org-elqyami',
    patientId: 'pat-agadir-4',
    doctorId: 'usr-elqyami-owner',
    patientNomComplet: 'Lina BENSAID',
    date: '2026-08-25',
    heureDebut: '11:45',
    heureFin: '12:15',
    motif: 'Fièvre aiguë à 38.8°C et toux sèche',
    type: 'Urgence',
    statut: 'En attente'
  },

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
  // --- Salle d'attente Cabinet Agadir ---
  {
    id: 'wait-agadir-1',
    organizationId: 'org-elqyami',
    patientId: 'pat-agadir-2',
    nomComplet: 'Inès TAZI (1 an)',
    age: 1,
    heureArrivee: '10:50',
    tempsAttenteMinutes: 15,
    motif: 'Vaccin du 9ème mois & Pesée',
    avecRdv: true,
    statut: 'En consultation',
    urgence: false
  },
  {
    id: 'wait-agadir-2',
    organizationId: 'org-elqyami',
    patientId: 'pat-agadir-4',
    nomComplet: 'Lina BENSAID (3 ans)',
    age: 3,
    heureArrivee: '11:05',
    tempsAttenteMinutes: 10,
    motif: 'Fièvre aiguë 38.8°C & toux',
    avecRdv: false,
    statut: 'En attente',
    urgence: true
  },

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
  {
    id: 'doc-agadir-1',
    organizationId: 'org-elqyami',
    patientId: 'pat-agadir-1',
    patientNomComplet: 'Rayan EL AMRI',
    nom: 'Exploration Fonctionnelle Respiratoire (EFR Pédiatrique) - Clinique Agadir.pdf',
    categorie: 'Analyses',
    date: '2026-05-18',
    taille: '1.4 Mo',
    auteur: 'Dr Yassine EL QYAMI',
    uploadedByUserId: 'usr-elqyami-owner',
    typeMime: 'application/pdf',
    apercuContenu: 'VEMS/CVF = 84%. Absence de syndrome obstructif significatif.',
    isPrivateVault: true,
    vaultStoragePath: 'vault/org-elqyami/patients/pat-agadir-1/efr-2026-05.pdf.enc',
    encryptionAlgorithm: 'AES-256-GCM',
    checksumSha256: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
    signedUrlExpiresInMinutes: 15
  },
  {
    id: 'doc-agadir-2',
    organizationId: 'org-elqyami',
    patientId: 'pat-agadir-1',
    patientNomComplet: 'Rayan EL AMRI',
    nom: 'Ordonnance Sécurisée du 25/08/2026 (Flixotide & Ventoline).pdf',
    categorie: 'Ordonnances',
    date: '2026-08-25',
    taille: '120 Ko',
    auteur: 'Dr Yassine EL QYAMI',
    uploadedByUserId: 'usr-elqyami-owner',
    typeMime: 'application/pdf',
    apercuContenu: 'Flixotide 50µg + Ventoline 100µg + Chambre AeroChamber',
    isPrivateVault: true,
    vaultStoragePath: 'vault/org-elqyami/patients/pat-agadir-1/ord-2026-08-25.pdf.enc',
    encryptionAlgorithm: 'AES-256-GCM',
    checksumSha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    signedUrlExpiresInMinutes: 15
  },
  {
    id: 'doc-agadir-3',
    organizationId: 'org-elqyami',
    patientId: 'pat-agadir-3',
    patientNomComplet: 'Adam BOUSSAID',
    nom: 'Certificat Aptitude Sportive Scolaire 2026-2027.pdf',
    categorie: 'Certificats',
    date: '2026-08-25',
    taille: '95 Ko',
    auteur: 'Dr Yassine EL QYAMI',
    uploadedByUserId: 'usr-elqyami-owner',
    typeMime: 'application/pdf',
    apercuContenu: 'Aptitude Football & Natation',
    isPrivateVault: true,
    vaultStoragePath: 'vault/org-elqyami/patients/pat-agadir-3/cert-sport-2026.pdf.enc',
    encryptionAlgorithm: 'AES-256-GCM',
    checksumSha256: '5d41402abc4b2a76b9719d911017c592',
    signedUrlExpiresInMinutes: 15
  },
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
  // --- Transactions Cabinet Agadir ---
  {
    id: 'tx-agadir-1',
    organizationId: 'org-elqyami',
    date: '2026-08-25',
    patientId: 'pat-agadir-1',
    patientNomComplet: 'Rayan EL AMRI',
    montant: 250,
    typeActe: 'Consultation Pédiatrique & Suivi ALD',
    modePaiement: 'Carte Bancaire',
    statut: 'Payé'
  },
  {
    id: 'tx-agadir-2',
    organizationId: 'org-elqyami',
    date: '2026-08-25',
    patientId: 'pat-agadir-3',
    patientNomComplet: 'Adam BOUSSAID',
    montant: 250,
    typeActe: 'Consultation & Certificat Médical Sportif',
    modePaiement: 'Espèces',
    statut: 'Payé'
  },
  {
    id: 'tx-agadir-3',
    organizationId: 'org-elqyami',
    date: '2026-08-24',
    patientId: 'pat-agadir-2',
    patientNomComplet: 'Inès TAZI',
    montant: 250,
    typeActe: 'Visite Nourrisson & Courbes OMS',
    modePaiement: 'Carte Bancaire',
    statut: 'Payé'
  },

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
  // --- Dépenses Cabinet Agadir ---
  {
    id: 'exp-agadir-1',
    organizationId: 'org-elqyami',
    date: '2026-08-01',
    fournisseur: 'SCI Résidence Al Manar Agadir',
    description: 'Loyer mensuel du cabinet médical (Août 2026)',
    categorie: 'Loyer & Charges',
    montant: 6500,
    statut: 'Réglé'
  },
  {
    id: 'exp-agadir-2',
    organizationId: 'org-elqyami',
    date: '2026-08-05',
    fournisseur: 'Médical Souss Distribution',
    description: 'Draps d’examen pédiatriques, abaisse-langues et thermomètres',
    categorie: 'Consommables',
    montant: 1250,
    statut: 'Réglé'
  },
  {
    id: 'exp-agadir-3',
    organizationId: 'org-elqyami',
    date: '2026-01-01',
    fournisseur: 'Wolf Digital SARL',
    description: 'Abonnement Annuel SaaS MEDICAL OS Standard (3 000 MAD / an)',
    categorie: 'Logiciels & Informatique',
    montant: 3000,
    statut: 'Réglé'
  },

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
    id: 'log-agadir-1',
    organizationId: 'org-elqyami',
    timestamp: '2026-08-25 09:30:00',
    userId: 'usr-elqyami-owner',
    userName: 'Dr Yassine EL QYAMI',
    userRole: 'Médecin Titulaire',
    actionType: 'PRESCRIPTION_MEDICAMENTEUSE',
    categorie: 'Prescription',
    patientId: 'pat-agadir-1',
    patientName: 'Rayan EL AMRI',
    ipAddress: '196.200.180.12 (Cabinet Agadir Sécurisé)',
    details: 'Émission ordonnance sécurisée pédiatrique (Flixotide 50µg + Ventoline 100µg)',
    hashIntegrite: '8f92b4920c81a920b78491829103948192039481029384910293849102938491'
  },
  {
    id: 'log-agadir-2',
    organizationId: 'org-elqyami',
    timestamp: '2026-08-25 09:00:15',
    userId: 'usr-elqyami-owner',
    userName: 'Dr Yassine EL QYAMI',
    userRole: 'Médecin Titulaire',
    actionType: 'LECTURE_DOSSIER',
    categorie: 'Dossier Patient',
    patientId: 'pat-agadir-1',
    patientName: 'Rayan EL AMRI',
    ipAddress: '196.200.180.12',
    details: 'Consultation du dossier pédiatrique et carnet vaccinal',
    hashIntegrite: '3f79bb7b435b05321651daefd374cd681b61b47b2c9e7a71f0ffc06a4b1f6211'
  },
  {
    id: 'log-agadir-3',
    organizationId: 'org-elqyami',
    timestamp: '2026-08-25 08:30:00',
    userId: 'usr-elqyami-sec',
    userName: 'Soukaina CHAMI',
    userRole: 'Secrétaire Médicale',
    actionType: 'CONNEXION_UTILISATEUR',
    categorie: 'Sécurité & Accès',
    ipAddress: '196.200.180.14 (Poste Secrétariat Agadir)',
    details: 'Authentification réussie 2FA SMS au poste d’accueil du cabinet',
    hashIntegrite: 'ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb'
  },
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
    id: 'cst-agadir-1',
    organizationId: 'org-elqyami',
    patientId: 'pat-agadir-1',
    patientNom: 'Rayan EL AMRI',
    cin: 'Tuteur: JC489201',
    typeConsentement: 'traitement_donnees_sante',
    libelle: 'Traitement sécurisé des données pédiatriques sous encadrement Loi 09-08',
    baseLegale: 'Articles 4 & 12 de la Loi 09-08',
    dateConsentement: '2026-01-10',
    statut: 'Accordé',
    methodeRecueil: 'Signature électronique sur tablette',
    recueilliPar: 'Dr Yassine EL QYAMI',
    notes: 'Consentement signé par Mme Meryem El Amri (Mère et représentante légale).'
  },
  {
    id: 'cst-agadir-2',
    organizationId: 'org-elqyami',
    patientId: 'pat-agadir-1',
    patientNom: 'Rayan EL AMRI',
    cin: 'Tuteur: JC489201',
    typeConsentement: 'rappels_sms_whatsapp',
    libelle: 'Rappels de rendez-vous vaccinaux et alertes médicales par SMS',
    baseLegale: 'Article 4 de la Loi 09-08',
    dateConsentement: '2026-01-10',
    statut: 'Accordé',
    methodeRecueil: 'Signature électronique sur tablette',
    recueilliPar: 'Soukaina CHAMI'
  },
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
