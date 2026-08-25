import {
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
  DataExportJob
} from '../types';

export const INITIAL_SETTINGS: PracticeSettings = {
  cabinet: {
    nom: "Cabinet Médical Anfa Santé",
    adresse: "48 Boulevard d'Anfa, 4ème étage, Apt 12",
    codePostal: "20050",
    ville: "Casablanca",
    pays: "Royaume du Maroc",
    telephone: "+212 5 22 36 12 40",
    email: "contact@cabinet-anfa-sante.ma",
    ice: "002938472000034",
    identifiantFiscal: "40291847",
    patente: "34910284",
    horaires: "Du Lundi au Vendredi de 8h30 à 18h30 · Samedi de 9h00 à 13h00"
  },
  medecin: {
    civilite: "Dr",
    prenom: "Karim",
    nom: "Bennani",
    specialite: "Médecine Générale, Diabétologie & Maladies Métaboliques",
    numeroInpe: "1048291039",
    numeroCnom: "12480",
    secteur: "Secteur Libéral Conventionné AMO (CNSS / CNOPS)",
    signatureUrl: ""
  },
  tarifs: {
    secteur: "Secteur 1 Conventionné",
    consultationAdulte: 250,
    consultationEnfant: 200,
    ecg: 150,
    visiteDomicile: 400,
    certificat: 100
  },
  documentSettings: {
    enteteTexte: "Dr Karim BENNANI — Spécialiste en Médecine Générale & Diabétologie (Lauréat Faculté de Médecine de Casablanca)",
    piedDePage: "N° INPE : 1048291039 · N° Ordre CNOM : 12480 · ICE : 002938472000034 · Traitement des données sous encadrement Loi 09-08",
    afficherTampon: true,
    afficherLogo: true
  },
  privacyPolicy: {
    responsableTraitement: "Dr Karim BENNANI",
    qualiteResponsable: "Médecin Responsable du Cabinet Médical Anfa Santé",
    numeroInpe: "1048291039",
    numeroCnom: "12480",
    statutDeclarationCndp: "Récépissé de déclaration obtenu",
    numeroRecepisseCndp: "D-M-492/2026",
    dateDeclarationCndp: "2026-01-15",
    contactDpoEmail: "dpo@cabinet-anfa-sante.ma",
    contactDpoTel: "+212 5 22 36 12 40",
    finalitesTraitement: [
      "Prise en charge médicale, diagnostic, prescriptions et suivi thérapeutique",
      "Gestion administrative des rendez-vous et tenue du dossier médical patient",
      "Établissement des feuilles de soins AMO (CNSS, CNOPS) et prises en charge mutuelles",
      "Communication d'alertes médicales et rappels de consultations par SMS/Messagerie",
      "Traçabilité et archivage légal des actes médicaux conformément à la réglementation marocaine"
    ],
    destinatairesAutorises: [
      "Dr Karim BENNANI (Médecin titulaire)",
      "Personnel habilité du cabinet soumis au secret professionnel médical",
      "Organismes de prévoyance sociale et d'assurance maladie (AMO CNSS, CNOPS, Mutuelles agréées)",
      "Professionnels de santé correspondants et laboratoires d'analyses (avec consentement explicite)"
    ],
    droitsPatients: [
      "Droit d'accès à ses données de santé (Article 7 de la Loi 09-08)",
      "Droit de rectification des informations inexactes (Article 8 de la Loi 09-08)",
      "Droit d'opposition pour motifs légitimes (Article 9 de la Loi 09-08)",
      "Droit d'information préalable sur le traitement (Article 5 de la Loi 09-08)",
      "Droit de réclamation auprès de la CNDP (Commission Nationale de contrôle de la protection des Données à caractère Personnel)"
    ],
    delaiConservationDossiers: "20 ans à compter de la date de la dernière consultation (Délai légal de conservation des dossiers médicaux au Maroc)",
    texteAfficheSalleAttente: "Conformément à la loi n° 09-08 relative à la protection des personnes physiques à l'égard du traitement des données à caractère personnel, vous disposez d'un droit d'accès, de rectification et d'opposition pour motifs légitimes aux données vous concernant. Le traitement de vos données de santé au sein de ce cabinet a fait l'objet d'une déclaration auprès de la CNDP sous le numéro D-M-492/2026."
  }
};

export const INITIAL_ACCESS_USERS: AccessUser[] = [
  {
    id: "usr-1",
    nom: "Bennani",
    prenom: "Dr Karim",
    role: "Médecin Titulaire",
    email: "dr.bennani@cabinet-anfa-sante.ma",
    telephone: "+212 6 61 24 89 10",
    mfaEnabled: true,
    statut: "Actif",
    dernierAcces: "2026-08-25 09:42:15 (Session active)",
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
    id: "usr-2",
    nom: "El Amrani",
    prenom: "Dr Yassine",
    role: "Médecin Remplaçant",
    email: "dr.elamrani@cabinet-anfa-sante.ma",
    telephone: "+212 6 63 12 45 78",
    mfaEnabled: true,
    statut: "Actif",
    dernierAcces: "2026-08-24 18:20:04",
    permissions: {
      canViewMedicalRecords: true,
      canEditMedicalRecords: true,
      canPrescribe: true,
      canExportData: false,
      canDeleteRecords: false,
      canManageSecurity: false,
      canViewAuditLogs: false
    }
  },
  {
    id: "usr-3",
    nom: "Chraibi",
    prenom: "Kawtar",
    role: "Secrétaire Médicale",
    email: "kawtar.secretariat@cabinet-anfa-sante.ma",
    telephone: "+212 6 70 88 12 34",
    mfaEnabled: true,
    statut: "Actif",
    dernierAcces: "2026-08-25 08:30:11",
    permissions: {
      canViewMedicalRecords: false, // Données médicales masquées (secret médical strict)
      canEditMedicalRecords: false,
      canPrescribe: false,
      canExportData: false,
      canDeleteRecords: false,
      canManageSecurity: false,
      canViewAuditLogs: false
    }
  },
  {
    id: "usr-4",
    nom: "Tazi",
    prenom: "Maître Mehdi",
    role: "DPO / Délégué Protection",
    email: "dpo@cabinet-anfa-sante.ma",
    telephone: "+212 5 22 88 90 00",
    mfaEnabled: true,
    statut: "Actif",
    dernierAcces: "2026-08-22 14:15:30",
    permissions: {
      canViewMedicalRecords: false,
      canEditMedicalRecords: false,
      canPrescribe: false,
      canExportData: true,
      canDeleteRecords: false,
      canManageSecurity: true,
      canViewAuditLogs: true
    }
  }
];

export const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: "log-101",
    timestamp: "2026-08-25 09:42:15",
    userId: "usr-1",
    userName: "Dr Karim Bennani",
    userRole: "Médecin Titulaire",
    actionType: "LECTURE_DOSSIER",
    categorie: "Dossier Patient",
    patientId: "pat-1",
    patientName: "Fatima Zahra ALAOUI",
    ipAddress: "196.200.148.42 (Réseau Cabinet Sécurisé)",
    details: "Ouverture du dossier médical complet, consultation historique diabétologie et constantes",
    hashIntegrite: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
  },
  {
    id: "log-102",
    timestamp: "2026-08-25 09:15:02",
    userId: "usr-1",
    userName: "Dr Karim Bennani",
    userRole: "Médecin Titulaire",
    actionType: "PRESCRIPTION_MEDICAMENTEUSE",
    categorie: "Prescription",
    patientId: "pat-2",
    patientName: "Mohamed TAHA",
    ipAddress: "196.200.148.42 (Réseau Cabinet Sécurisé)",
    details: "Émission ordonnance sécurisée : Glucophage 1000mg + Coversyl 5mg (ALD ALC 100%)",
    hashIntegrite: "7d793037a0760186574b0282f2f435e7b1e7a66d16947e6b0c4833da5f49acf4"
  },
  {
    id: "log-103",
    timestamp: "2026-08-25 08:45:22",
    userId: "usr-3",
    userName: "Kawtar Chraibi",
    userRole: "Secrétaire Médicale",
    actionType: "MODIFICATION_CONSENTEMENT",
    categorie: "Consentement",
    patientId: "pat-3",
    patientName: "Driss EL FASSI",
    ipAddress: "196.200.148.45 (Poste Accueil)",
    details: "Enregistrement du consentement Loi 09-08 (Rappels SMS et transmission AMO CNSS)",
    hashIntegrite: "3f79bb7b435b05321651daefd374cd681b61b47b2c9e7a71f0ffc06a4b1f6211"
  },
  {
    id: "log-104",
    timestamp: "2026-08-24 17:30:10",
    userId: "usr-1",
    userName: "Dr Karim Bennani",
    userRole: "Médecin Titulaire",
    actionType: "EXPORT_DONNEES_LOI_0908",
    categorie: "Export",
    patientId: "pat-4",
    patientName: "Salma BENJELLOUN",
    ipAddress: "196.200.148.42",
    details: "Exportation du dossier médical au format PDF chiffré à la demande du patient (Art. 8 Loi 09-08)",
    hashIntegrite: "9b71d224bd62f3785d96d46ad3ea3d73319bfbc2890caadae2dff72519673ca7"
  },
  {
    id: "log-105",
    timestamp: "2026-08-24 08:12:00",
    userId: "usr-3",
    userName: "Kawtar Chraibi",
    userRole: "Secrétaire Médicale",
    actionType: "CREATION_PATIENT",
    categorie: "Dossier Patient",
    patientId: "pat-6",
    patientName: "Youssef NACIRI",
    ipAddress: "196.200.148.45",
    details: "Création fiche administrative avec vérification CIN (BE492019) et immatriculation AMO",
    hashIntegrite: "ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb"
  },
  {
    id: "log-106",
    timestamp: "2026-08-23 16:40:50",
    userId: "usr-4",
    userName: "Maître Mehdi Tazi",
    userRole: "DPO / Délégué Protection",
    actionType: "EXPORT_DONNEES_LOI_0908",
    categorie: "Sécurité & Accès",
    ipAddress: "105.159.20.18 (Connexion VPN DPO)",
    details: "Génération de l'export périodique du Registre des traitements CNDP",
    hashIntegrite: "185f8db32271fe25f561a6fc938b2e264306ec304eda518007d1764826381969"
  }
];

export const INITIAL_PATIENT_CONSENTS: PatientConsent[] = [
  {
    id: "cst-1",
    patientId: "pat-1",
    patientNom: "Fatima Zahra ALAOUI",
    cin: "BE628190",
    typeConsentement: "traitement_donnees_sante",
    libelle: "Traitement et conservation des données de santé au dossier médical informatisé",
    baseLegale: "Articles 4 & 12 de la Loi 09-08",
    dateConsentement: "2026-01-10",
    statut: "Accordé",
    methodeRecueil: "Signature électronique sur tablette",
    recueilliPar: "Dr Karim Bennani",
    notes: "Consentement éclairé signé lors de la consultation initiale."
  },
  {
    id: "cst-2",
    patientId: "pat-1",
    patientNom: "Fatima Zahra ALAOUI",
    cin: "BE628190",
    typeConsentement: "rappels_sms_whatsapp",
    libelle: "Notification de confirmation et rappel de rendez-vous par SMS / WhatsApp",
    baseLegale: "Article 4 de la Loi 09-08",
    dateConsentement: "2026-01-10",
    statut: "Accordé",
    methodeRecueil: "Signature électronique sur tablette",
    recueilliPar: "Kawtar Chraibi"
  },
  {
    id: "cst-3",
    patientId: "pat-1",
    patientNom: "Fatima Zahra ALAOUI",
    cin: "BE628190",
    typeConsentement: "transmission_amo_mutuelle",
    libelle: "Transmission des feuilles de soins et bordereaux à l'AMO (CNSS) et Mutuelle Saham/Sanlam",
    baseLegale: "Articles 12 & 23 de la Loi 09-08",
    dateConsentement: "2026-01-10",
    statut: "Accordé",
    methodeRecueil: "Formulaire papier émargé",
    recueilliPar: "Kawtar Chraibi"
  },
  {
    id: "cst-4",
    patientId: "pat-2",
    patientNom: "Mohamed TAHA",
    cin: "A748291",
    typeConsentement: "traitement_donnees_sante",
    libelle: "Traitement et conservation des données de santé au dossier médical informatisé",
    baseLegale: "Articles 4 & 12 de la Loi 09-08",
    dateConsentement: "2025-11-20",
    statut: "Accordé",
    methodeRecueil: "Signature électronique sur tablette",
    recueilliPar: "Dr Karim Bennani"
  },
  {
    id: "cst-5",
    patientId: "pat-2",
    patientNom: "Mohamed TAHA",
    cin: "A748291",
    typeConsentement: "partage_confraternel",
    libelle: "Partage sécurisé des bilans cardiologiques avec le Dr Cardiologue correspondant",
    baseLegale: "Article 4 de la Loi 09-08 & Secret médical partagé",
    dateConsentement: "2026-02-14",
    statut: "Accordé",
    methodeRecueil: "Accord oral tracé en consultation",
    recueilliPar: "Dr Karim Bennani"
  },
  {
    id: "cst-6",
    patientId: "pat-3",
    patientNom: "Driss EL FASSI",
    cin: "BK382910",
    typeConsentement: "teleconsultation",
    libelle: "Consentement exprès aux actes de téléconsultation médicale et enregistrement des comptes-rendus",
    baseLegale: "Loi 131-13 & Loi 09-08",
    dateConsentement: "2026-04-05",
    statut: "Accordé",
    methodeRecueil: "Signature électronique sur tablette",
    recueilliPar: "Dr Karim Bennani"
  },
  {
    id: "cst-7",
    patientId: "pat-4",
    patientNom: "Salma BENJELLOUN",
    cin: "EE892019",
    typeConsentement: "rappels_sms_whatsapp",
    libelle: "Rappels et alertes automatiques SMS",
    baseLegale: "Article 4 de la Loi 09-08",
    dateConsentement: "2026-07-01",
    statut: "Refusé",
    methodeRecueil: "Formulaire papier émargé",
    recueilliPar: "Kawtar Chraibi",
    notes: "La patiente préfère être contactée exclusivement par appel téléphonique direct."
  }
];

export const INITIAL_RETENTION_POLICIES: RetentionPolicy[] = [
  {
    id: "ret-1",
    categorieDonnees: "Dossiers Médicaux Patients (Consultations, Constantes, Diagnostics, Prescriptions)",
    dureeConservationAnnees: 20,
    baseReglementaire: "Délai légal de conservation des dossiers médicaux au Maroc (Code de Déontologie & Prescription légale)",
    actionFinCycle: "Archivage sécurisé à froid",
    statut: "Actif",
    description: "Conservation intégrale pendant 20 ans après le dernier contact médical, puis archivage probatoire ou purge validée."
  },
  {
    id: "ret-2",
    categorieDonnees: "Examens Complémentaires, Imagerie médicale & Comptes-rendus de biologie",
    dureeConservationAnnees: 20,
    baseReglementaire: "Loi 09-08 et Décret d'application de l'Ordre National des Médecins",
    actionFinCycle: "Archivage sécurisé à froid",
    statut: "Actif",
    description: "Archivage numérique chiffré adossé à l'historique clinique du patient."
  },
  {
    id: "ret-3",
    categorieDonnees: "Feuilles de Soins AMO, Factures, Reçus d'honoraires & Règlements",
    dureeConservationAnnees: 10,
    baseReglementaire: "Code Général des Impôts marocain (CGI) & Code de Commerce (Obligations comptables)",
    actionFinCycle: "Anonymisation irréversible",
    statut: "Actif",
    description: "Conservation des pièces justificatives comptables et fiscales pendant 10 ans."
  },
  {
    id: "ret-4",
    categorieDonnees: "Journaux d'audit de sécurité, Logs d'accès & Traces d'intégrité",
    dureeConservationAnnees: 3,
    baseReglementaire: "Directives de sécurité des systèmes d'information de la CNDP & DGSSI",
    actionFinCycle: "Suppression définitive",
    statut: "Actif",
    description: "Conservation des traces de connexion, lectures de dossiers et modifications pendant 3 ans."
  }
];

export const INITIAL_EXPORT_JOBS: DataExportJob[] = [
  {
    id: "exp-1",
    dateDemande: "2026-08-24 17:30",
    demandeur: "Dr Karim Bennani (Pour Mme Salma BENJELLOUN)",
    typeExport: "Dossier patient individuel (Portabilité Art. 8)",
    format: "PDF",
    statut: "Généré",
    taille: "2.4 Mo",
    emprunteSha256: "9b71d224bd62f3785d96d46ad3ea3d73319bfbc2890caadae2dff72519673ca7"
  },
  {
    id: "exp-2",
    dateDemande: "2026-08-23 16:40",
    demandeur: "Maître Mehdi Tazi (DPO)",
    typeExport: "Registre des traitements CNDP",
    format: "JSON",
    statut: "Généré",
    taille: "480 Ko",
    emprunteSha256: "185f8db32271fe25f561a6fc938b2e264306ec304eda518007d1764826381969"
  },
  {
    id: "exp-3",
    dateDemande: "2026-08-20 20:00",
    demandeur: "Système de Sauvegarde Automatique Souveraine",
    typeExport: "Sauvegarde chiffrée de la base",
    format: "ZIP",
    statut: "Généré",
    taille: "145 Mo",
    emprunteSha256: "a1c2e3f4b5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2"
  }
];

export const INITIAL_PATIENTS: Patient[] = [
  {
    id: "pat-1",
    nom: "ALAOUI",
    prenom: "Fatima Zahra",
    sexe: "F",
    dateNaissance: "1990-04-14",
    age: 36,
    telephone: "+212 6 61 89 12 04",
    email: "fatimazahra.alaoui@gmail.com",
    adresse: "28 Boulevard Zerktouni, Résidence Al Manar",
    ville: "Casablanca",
    codePostal: "20070",
    cin: "BE628190",
    numeroAmo: "190 414 200 492",
    organismeAssurance: "AMO CNSS",
    numAffiliationMutuelle: "SAN-892019-CS",
    groupeSanguin: "A+",
    medecinTraitant: true,
    statut: "Actif",
    derniereConsultation: "2026-08-10",
    prochainRdv: "2026-08-25",
    allergies: ["Pénicilline (réaction cutanée urticarienne)", "Pollen d'olivier"],
    antecedents: {
      medicaux: ["Asthme modéré intermittent", "Migraine cataméniale"],
      chirurgicaux: ["Césarienne programmée (2020)"],
      familiaux: ["Père : HTA essentielle", "Mère : Diabète de type 2"]
    },
    traitementsActuels: ["Ventoline 100µg (en cas de crise de dyspnée)", "Aerius 5mg (saisonnier)"],
    ald: false,
    notesGenerales: "Patiente rigoureuse. Bonne observance thérapeutique. Surveillance spirométrie annuelle recommandée.",
    poidsRef: 63,
    tailleRef: 168,
    taRef: "120/78",
    consentementLoi0908: true
  },
  {
    id: "pat-2",
    nom: "TAHA",
    prenom: "Mohamed",
    sexe: "M",
    dateNaissance: "1962-11-03",
    age: 63,
    telephone: "+212 6 62 45 78 90",
    email: "m.taha.immo@menara.ma",
    adresse: "14 Rue Jean Jaurès, Quartier Gauthier",
    ville: "Casablanca",
    codePostal: "20050",
    cin: "A748291",
    numeroAmo: "162 110 300 103",
    organismeAssurance: "AMO CNSS",
    numAffiliationMutuelle: "WAF-402918-MA",
    groupeSanguin: "O+",
    medecinTraitant: true,
    statut: "Chronique",
    derniereConsultation: "2026-07-22",
    prochainRdv: "2026-08-25",
    allergies: ["Aucune allergie médicamenteuse connue"],
    antecedents: {
      medicaux: [
        "Diabète de type 2 sous antidiabétiques oraux depuis 2017",
        "Hypertension Artérielle essentielle modérée",
        "Dyslipidémie mixte"
      ],
      chirurgicaux: ["Cholécystectomie par cœlioscopie (2015)"],
      familiaux: ["Père : AVC ischémique à 68 ans"]
    },
    traitementsActuels: [
      "Glucophage 1000mg (1 cp 2x/jour au milieu des repas)",
      "Coversyl 5mg (1 cp le matin)",
      "Tahor 20mg (1 cp le soir)",
      "Kardegic 75mg (1 sachet le midi)"
    ],
    ald: true,
    nomAld: "ALD / ALC - Diabète de type 2 et HTA compliquée (Prise en charge AMO 100%)",
    notesGenerales: "HbA1c à 7.1% au dernier contrôle. Fond d'œil annuel normal. Microalbuminurie négative.",
    poidsRef: 84,
    tailleRef: 174,
    taRef: "135/82",
    consentementLoi0908: true
  },
  {
    id: "pat-3",
    nom: "EL FASSI",
    prenom: "Driss",
    sexe: "M",
    dateNaissance: "1985-09-18",
    age: 40,
    telephone: "+212 6 70 30 19 88",
    email: "driss.elfassi@ocp.ma",
    adresse: "85 Avenue des Nations Unies, Agdal",
    ville: "Rabat",
    codePostal: "10090",
    cin: "BK382910",
    numeroAmo: "185 091 800 231",
    organismeAssurance: "AMO CNOPS",
    numAffiliationMutuelle: "MGPAP-781920",
    groupeSanguin: "B+",
    medecinTraitant: true,
    statut: "Actif",
    derniereConsultation: "2026-06-15",
    prochainRdv: "2026-08-25",
    allergies: ["Aspirine & AINS (bronchospasme type Widal)"],
    antecedents: {
      medicaux: ["Reflux Gastro-Œsophagien (RGO)", "Lombalgie commune d'effort"],
      chirurgicaux: ["Méniscectomie interne genou gauche (2012)"],
      familiaux: ["Mère : Ulcère gastroduodénal"]
    },
    traitementsActuels: ["Inexium 20mg (1 gélule le matin si pyrosis)", "Paracétamol 1g (si douleur)"],
    ald: false,
    notesGenerales: "Cadre ingénieur. Épisode de gastrite en cours d'amélioration. Fibroscopie haute programmée si persistance.",
    poidsRef: 78,
    tailleRef: 180,
    taRef: "122/75",
    consentementLoi0908: true
  },
  {
    id: "pat-4",
    nom: "BENJELLOUN",
    prenom: "Salma",
    sexe: "F",
    dateNaissance: "1998-03-22",
    age: 28,
    telephone: "+212 6 64 12 40 85",
    email: "salma.benjelloun@archidesign.ma",
    adresse: "54 Rue Ibn Toumert, Quartier Palmier",
    ville: "Casablanca",
    codePostal: "20100",
    cin: "EE892019",
    numeroAmo: "298 032 200 391",
    organismeAssurance: "Mutuelle Saham / Sanlam",
    numAffiliationMutuelle: "SAN-104928-PB",
    groupeSanguin: "O-",
    medecinTraitant: true,
    statut: "Actif",
    derniereConsultation: "2026-05-02",
    prochainRdv: "2026-08-25",
    allergies: ["Fruits de mer", "Produits de contraste iodés"],
    antecedents: {
      medicaux: ["Anémie ferriprive modérée corrigée en 2024", "Hypothyroïdie fruste"],
      chirurgicaux: ["Amygdalectomie (2008)"],
      familiaux: ["Mère : Goitre euthyroïdien"]
    },
    traitementsActuels: ["Lévothyrox 50µg (1 cp à jeun)", "Tardyferon 80mg (cure de 3 mois terminée)"],
    ald: false,
    notesGenerales: "Bilan biologique de contrôle satisfaisant. TSH stabilisée à 1.8 mUI/L.",
    poidsRef: 57,
    tailleRef: 165,
    taRef: "115/70",
    consentementLoi0908: true
  },
  {
    id: "pat-5",
    nom: "CHRAIBI",
    prenom: "Lalla Keltoum",
    sexe: "F",
    dateNaissance: "1950-07-30",
    age: 76,
    telephone: "+212 5 22 25 10 90",
    email: "famille.chraibi@menara.ma",
    adresse: "12 Avenue Hassan II, Résidence Les Jardins d'Anfa",
    ville: "Casablanca",
    codePostal: "20000",
    cin: "C192834",
    numeroAmo: "250 073 000 892",
    organismeAssurance: "AMO CNOPS",
    numAffiliationMutuelle: "MGPAP-309182",
    groupeSanguin: "AB+",
    medecinTraitant: true,
    statut: "Chronique",
    derniereConsultation: "2026-08-01",
    prochainRdv: "2026-08-25",
    allergies: ["Sulfamides", "Amiodarone"],
    antecedents: {
      medicaux: [
        "Cardiopathie hypertensive avec FEVG préservée",
        "Ostéoporose post-ménopausique documentée",
        "Gonarthrose bilatérale évoluée"
      ],
      chirurgicaux: ["Prothèse totale de hanche droite (2018)"],
      familiaux: ["Frère aîné : Maladie d'Alzheimer"]
    },
    traitementsActuels: [
      "Triatec 5mg (1 cp le matin)",
      "Lasilix 20mg (1 cp un matin sur deux)",
      "Prolia 60mg (1 injection s/c semestrielle)",
      "Doliprane 1000mg (si douleurs articulaires)"
    ],
    ald: true,
    nomAld: "ALD 5 - Insuffisance cardiaque et cardiopathie hypertensive",
    notesGenerales: "Autonome avec aide familiale. Surveillance tensionnelle et ionogramme sanguin semestriel.",
    poidsRef: 69,
    tailleRef: 158,
    taRef: "128/76",
    consentementLoi0908: true
  },
  {
    id: "pat-6",
    nom: "NACIRI",
    prenom: "Youssef",
    sexe: "M",
    dateNaissance: "2001-06-12",
    age: 25,
    telephone: "+212 6 68 90 23 11",
    email: "youssef.naciri@etu.encgc.ma",
    adresse: "72 Boulevard Moulay Youssef",
    ville: "Casablanca",
    codePostal: "20060",
    cin: "BE492019",
    numeroAmo: "101 061 200 482",
    organismeAssurance: "AMO CNSS",
    groupeSanguin: "A+",
    medecinTraitant: true,
    statut: "Nouveau",
    derniereConsultation: "2026-08-25",
    allergies: ["Aucune allergie connue"],
    antecedents: {
      medicaux: ["Syndrome grippal récent", "Traumatisme sportif cheville droite"],
      chirurgicaux: ["Aucun"],
      familiaux: ["Pas d'antécédents notables"]
    },
    traitementsActuels: ["Doliprane 1000mg (à la demande)"],
    ald: false,
    notesGenerales: "Étudiant sportif. Vient pour certificat médical d'aptitude sportive et bilan de santé général.",
    poidsRef: 75,
    tailleRef: 182,
    taRef: "118/74",
    consentementLoi0908: true
  }
];

export const INITIAL_WAITING_ROOM: WaitingPatient[] = [
  {
    id: "wait-1",
    patientId: "pat-1",
    nomComplet: "Fatima Zahra ALAOUI",
    age: 36,
    heureArrivee: "08:45",
    tempsAttenteMinutes: 20,
    motif: "Renouvellement traitement asthme et spirométrie de contrôle",
    avecRdv: true,
    statut: "En attente"
  },
  {
    id: "wait-2",
    patientId: "pat-2",
    nomComplet: "Mohamed TAHA",
    age: 63,
    heureArrivee: "09:00",
    tempsAttenteMinutes: 10,
    motif: "Suivi ALD Diabète type 2, contrôle tensionnel & résultats bilan lipidique",
    avecRdv: true,
    statut: "En attente"
  },
  {
    id: "wait-3",
    patientId: "pat-6",
    nomComplet: "Youssef NACIRI",
    age: 25,
    heureArrivee: "09:10",
    tempsAttenteMinutes: 5,
    motif: "Certificat d'aptitude sportive compétition + Bilan général",
    avecRdv: true,
    statut: "En attente"
  }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: "apt-1",
    patientId: "pat-1",
    patientNomComplet: "Fatima Zahra ALAOUI",
    date: "2026-08-25",
    heureDebut: "09:00",
    heureFin: "09:30",
    motif: "Renouvellement traitement & contrôle asthme",
    type: "Consultation",
    statut: "En cours"
  },
  {
    id: "apt-2",
    patientId: "pat-2",
    patientNomComplet: "Mohamed TAHA",
    date: "2026-08-25",
    heureDebut: "09:30",
    heureFin: "10:00",
    motif: "Suivi trimestriel ALD Diabète type 2 & HTA",
    type: "Contrôle",
    statut: "Confirmé"
  },
  {
    id: "apt-3",
    patientId: "pat-3",
    patientNomComplet: "Driss EL FASSI",
    date: "2026-08-25",
    heureDebut: "10:00",
    heureFin: "10:30",
    motif: "Douleurs épigastriques et bilan dyspeptique",
    type: "Consultation",
    statut: "Confirmé"
  },
  {
    id: "apt-4",
    patientId: "pat-4",
    patientNomComplet: "Salma BENJELLOUN",
    date: "2026-08-25",
    heureDebut: "10:30",
    heureFin: "11:00",
    motif: "Contrôle bilan thyroïdien et asthénie",
    type: "Consultation",
    statut: "Confirmé"
  },
  {
    id: "apt-5",
    patientId: "pat-5",
    patientNomComplet: "Lalla Keltoum CHRAIBI",
    date: "2026-08-25",
    heureDebut: "11:30",
    heureFin: "12:00",
    motif: "Bilan tensionnel et renouvellement ALD 5",
    type: "Consultation",
    statut: "Confirmé"
  },
  {
    id: "apt-6",
    patientId: "pat-6",
    patientNomComplet: "Youssef NACIRI",
    date: "2026-08-25",
    heureDebut: "14:30",
    heureFin: "15:00",
    motif: "Certificat d'aptitude sport & ECG de repos",
    type: "Consultation",
    statut: "Confirmé"
  }
];

export const INITIAL_CONSULTATIONS: Consultation[] = [
  {
    id: "csl-1",
    patientId: "pat-1",
    patientNomComplet: "Fatima Zahra ALAOUI",
    date: "2026-08-10",
    heure: "10:15",
    dureeMinutes: 25,
    type: "Présentiel",
    motif: "Épisode de toux sèche nocturne et gêne respiratoire",
    constantes: {
      tensionSystolique: 120,
      tensionDiastolique: 78,
      temperature: 37.1,
      poids: 63,
      taille: 168,
      imc: 22.3,
      frequenceCardiaque: 72,
      saturationO2: 98
    },
    symptomes: ["Toux sèche quinteuse", "Oppression thoracique modérée", "Pas de fièvre"],
    examenClinique: "Auscultation pulmonaire : quelques râles sibilants disséminés aux deux bases. Oropharynx calme. Auscultation cardiaque régulière sans souffle.",
    diagnostic: "Exacerbation asthmatique modérée sur terrain allergique saisonnier",
    codeCim10: "J45.0 - Asthme à prédominance allergique",
    traitement: "Ventoline 100µg (2 bouffées si crise) + Solupred 20mg (3 cp/j pendant 4 jours) + Aerius 5mg",
    notesMedicales: "Bonne réponse au traitement de crise. Éviction des allergènes conseillée.",
    tarif: 250,
    reglementStatut: "Payé",
    modePaiement: "Carte Bancaire"
  },
  {
    id: "csl-2",
    patientId: "pat-2",
    patientNomComplet: "Mohamed TAHA",
    date: "2026-07-22",
    heure: "11:00",
    dureeMinutes: 30,
    type: "Présentiel",
    motif: "Consultation de suivi ALD Diabète & HTA",
    constantes: {
      tensionSystolique: 136,
      tensionDiastolique: 84,
      temperature: 36.8,
      poids: 84,
      taille: 174,
      imc: 27.7,
      frequenceCardiaque: 68,
      saturationO2: 97,
      glycemie: 1.28
    },
    symptomes: ["Asymptomatique", "Bonne tolérance du traitement oral"],
    examenClinique: "Pouls périphériques présents et symétriques. Sensibilité au monofilament normale aux 2 pieds. Pas de lésion cutanée.",
    diagnostic: "Diabète de type 2 équilibré sous bithérapie - HTA contrôlée",
    codeCim10: "E11.9 - Diabète sucré de type 2 sans complication",
    traitement: "Poursuite Glucophage 1000mg (2 cp/j) + Coversyl 5mg (1 cp/j) + Tahor 20mg",
    notesMedicales: "Feuille de soins AMO CNSS délivrée pour tiers payant ALD 100%.",
    tarif: 250,
    reglementStatut: "Payé",
    modePaiement: "Tiers Payant AMO"
  }
];

export const INITIAL_MEDICATIONS: Medication[] = [
  {
    id: "med-1",
    nom: "Doliprane 1000 mg",
    dci: "Paracétamol",
    dosage: "1000 mg",
    forme: "Comprimé pelliculé sécable (Boîte de 8)",
    classeTherapeutique: "Antalgique et Antipyrétique (Palier 1 OMS)",
    indicationsCourantes: "Douleurs d'intensité légère à modérée, états fébriles",
    contreIndications: "Insuffisance hépatocellulaire sévère, hypersensibilité au paracétamol",
    posologieHabituelle: "1 comprimé toutes les 6 à 8 heures si besoin (Max 3 à 4g par 24h)",
    statutRemboursement: "Remboursable AMO",
    prixPublicMarocDH: 14.50
  },
  {
    id: "med-2",
    nom: "Amoclan 1 g / 125 mg (Augmentin)",
    dci: "Amoxicilline + Acide Clavulanique",
    dosage: "1000 mg / 125 mg",
    forme: "Comprimé pelliculé (Boîte de 16 ou 24)",
    classeTherapeutique: "Antibiotique - Bêta-lactamine / Pénicilline à large spectre",
    indicationsCourantes: "Infections ORL, broncho-pulmonaires, urinaires et stomatologiques",
    contreIndications: "Allergie aux pénicillines et céphalosporines, antécédent d'ictère sous amoxicilline-acide clavulanique",
    posologieHabituelle: "1 comprimé matin et soir au début des repas pendant 7 à 10 jours",
    statutRemboursement: "Remboursable AMO",
    prixPublicMarocDH: 112.00
  },
  {
    id: "med-3",
    nom: "Glucophage 1000 mg",
    dci: "Metformine chlorhydrate",
    dosage: "1000 mg",
    forme: "Comprimé pelliculé (Boîte de 30 et 60)",
    classeTherapeutique: "Antidiabétique oral - Biguanide",
    indicationsCourantes: "Traitement du Diabète de type 2 chez l'adulte en première intention",
    contreIndications: "Insuffisance rénale sévère (DFG < 30 ml/min), acidose métabolique, état d'hypoxie tissulaire",
    posologieHabituelle: "1 comprimé 1 à 2 fois par jour au milieu ou à la fin des principaux repas",
    statutRemboursement: "100% (ALD/ALC)",
    prixPublicMarocDH: 48.00
  },
  {
    id: "med-4",
    nom: "Coversyl 5 mg",
    dci: "Périndopril arginine",
    dosage: "5 mg",
    forme: "Comprimé pelliculé sécable (Boîte de 30)",
    classeTherapeutique: "Antihypertenseur - Inhibiteur de l'Enzyme de Conversion (IEC)",
    indicationsCourantes: "Hypertension artérielle essentielle, insuffisance cardiaque, prévention secondaire coronarienne",
    contreIndications: "Grossesse (2e et 3e trimestres), antécédent d'angio-œdème sous IEC, sténose bilatérale des artères rénales",
    posologieHabituelle: "1 comprimé une fois par jour le matin avant le petit-déjeuner",
    statutRemboursement: "100% (ALD/ALC)",
    prixPublicMarocDH: 89.50
  },
  {
    id: "med-5",
    nom: "Inexium 20 mg / 40 mg",
    dci: "Ésoméprazole",
    dosage: "20 mg",
    forme: "Comprimé gastro-résistant (Boîte de 14 et 28)",
    classeTherapeutique: "Inhibiteur de la Pompe à Protons (IPP) - Antisécrétoire gastrique",
    indicationsCourantes: "Reflux gastro-œsophagien (RGO), ulcère gastroduodénal, éradication d'Helicobacter pylori",
    contreIndications: "Hypersensibilité aux benzimidazoles substitués, association au nelfinavir",
    posologieHabituelle: "1 comprimé le matin à jeun 30 minutes avant le petit-déjeuner",
    statutRemboursement: "Remboursable AMO",
    prixPublicMarocDH: 76.00
  },
  {
    id: "med-6",
    nom: "Ventoline 100 µg / dose",
    dci: "Salbutamol",
    dosage: "100 µg par bouffée",
    forme: "Aérosol-doseur pressurisé (Flacon de 200 doses)",
    classeTherapeutique: "Bronchodilatateur bêta-2 mimétique d'action rapide",
    indicationsCourantes: "Traitement symptomatique de la crise d'asthme et de l'exacerbation de BPCO",
    contreIndications: "Hypersensibilité à la substance active ou aux gaz propulseurs",
    posologieHabituelle: "1 à 2 bouffées dès l'apparition des symptômes respiratoires (à renouveler après 10 min si besoin)",
    statutRemboursement: "Remboursable AMO",
    prixPublicMarocDH: 42.00
  },
  {
    id: "med-7",
    nom: "Solupred 20 mg",
    dci: "Prednisolone métasulfobenzoate sodique",
    dosage: "20 mg",
    forme: "Comprimé orodispersible (Boîte de 20)",
    classeTherapeutique: "Corticoïde de synthèse par voie générale",
    indicationsCourantes: "Affections inflammatoires aiguës, crise d'asthme sévère, sinusite aiguë",
    contreIndications: "États infectieux non contrôlés, viroses en évolution, ulcère gastrique évolutif",
    posologieHabituelle: "0.5 à 1 mg/kg/jour le matin au cours du petit-déjeuner pendant 3 à 5 jours",
    statutRemboursement: "Remboursable AMO",
    prixPublicMarocDH: 49.50
  },
  {
    id: "med-8",
    nom: "Kardegic 75 mg / 160 mg",
    dci: "Acétylsalicylate de lysine (Aspirine)",
    dosage: "75 mg",
    forme: "Poudre pour solution buvable en sachet (Boîte de 30)",
    classeTherapeutique: "Antiagrégant plaquettaire",
    indicationsCourantes: "Prévention secondaire des accidents cardiovasculaires et cérébrovasculaires ischémiques",
    contreIndications: "Ulcère gastroduodénal en évolution, maladie hémorragique, hypersensibilité aux dérivés salicylés",
    posologieHabituelle: "1 sachet par jour au milieu d'un repas, dissous dans un verre d'eau",
    statutRemboursement: "100% (ALD/ALC)",
    prixPublicMarocDH: 22.00
  }
];

export const INITIAL_PRESCRIPTIONS: Prescription[] = [
  {
    id: "psc-1",
    consultationId: "csl-1",
    patientId: "pat-1",
    patientNomComplet: "Fatima Zahra ALAOUI",
    date: "2026-08-10",
    aldConcernee: false,
    medicaments: [
      {
        id: "pi-1",
        medicament: "Ventoline 100 µg",
        dci: "Salbutamol",
        dosage: "100 µg/dose",
        forme: "Aérosol doseur (Flacon de 200 bouffées)",
        posologie: "2 bouffées",
        frequence: "Si sensation de gêne respiratoire ou crise d'asthme",
        duree: "3 mois (1 flacon)",
        instructions: "Bien agiter avant emploi. Utiliser la chambre d'inhalation si besoin.",
        ald: false,
        nonSubstituable: true
      },
      {
        id: "pi-2",
        medicament: "Solupred 20 mg",
        dci: "Prednisolone",
        dosage: "20 mg",
        forme: "Comprimé orodispersible",
        posologie: "2 comprimés",
        frequence: "Le matin au petit-déjeuner pendant 4 jours",
        duree: "4 jours",
        instructions: "Dissoudre dans un verre d'eau le matin.",
        ald: false,
        nonSubstituable: false
      },
      {
        id: "pi-3",
        medicament: "Aerius 5 mg",
        dci: "Desloratadine",
        dosage: "5 mg",
        forme: "Comprimé pelliculé",
        posologie: "1 comprimé",
        frequence: "Le soir au coucher",
        duree: "1 mois",
        instructions: "Traitement de fond de la rhinite allergique saisonnière.",
        ald: false,
        nonSubstituable: false
      }
    ],
    conseilsHygiene: "Éviter l'exposition aux fumées de tabac et pollens. Aérer la chambre 15 minutes par jour tôt le matin. Reconsulter sans délai si essoufflement inhabituel."
  },
  {
    id: "psc-2",
    consultationId: "csl-2",
    patientId: "pat-2",
    patientNomComplet: "Mohamed TAHA",
    date: "2026-07-22",
    aldConcernee: true,
    medicaments: [
      {
        id: "pi-4",
        medicament: "Glucophage 1000 mg",
        dci: "Metformine",
        dosage: "1000 mg",
        forme: "Comprimé pelliculé",
        posologie: "1 comprimé",
        frequence: "2 fois par jour au milieu du déjeuner et du dîner",
        duree: "3 mois (Renouvelable 1 fois)",
        instructions: "Ne pas interrompre sans avis médical.",
        ald: true,
        nonSubstituable: false
      },
      {
        id: "pi-5",
        medicament: "Coversyl 5 mg",
        dci: "Périndopril",
        dosage: "5 mg",
        forme: "Comprimé pelliculé",
        posologie: "1 comprimé",
        frequence: "Le matin à jeun",
        duree: "3 mois",
        instructions: "Surveillance de la pression artérielle à domicile.",
        ald: true,
        nonSubstituable: false
      }
    ],
    conseilsHygiene: "Régime hygiéno-diététique pauvre en sucres rapides et en sel. Marche quotidienne de 30 minutes. Bilan biologique de contrôle (HbA1c, Créatinine) dans 3 mois."
  }
];

export const INITIAL_CERTIFICATES: MedicalCertificate[] = [
  {
    id: "cert-1",
    type: "aptitude_sport",
    titre: "Certificat Médical de Non Contre-Indication à la Pratique Sportive",
    patientId: "pat-6",
    patientNomComplet: "Youssef NACIRI",
    date: "2026-08-25",
    sportPratique: "Course à pied, Marathon & Football en compétition",
    texteContenu: "Je soussigné, Dr Karim BENNANI, certifie avoir examiné ce jour M. Youssef NACIRI (CIN : BE492019) et n'avoir constaté aucune contre-indication clinique apparente à la pratique sportive de la course à pied et du football, y compris en compétition. Examen cardio-vasculaire et électrocardiogramme de repos normaux. Certificat délivré à la demande de l'intéressé pour faire valoir ce que de droit."
  },
  {
    id: "cert-2",
    type: "arret_travail",
    titre: "Certificat d'Arrêt de Travail Médical (Initial)",
    patientId: "pat-3",
    patientNomComplet: "Driss EL FASSI",
    date: "2026-06-15",
    dureeArretJours: 4,
    dateDebut: "2026-06-15",
    dateFin: "2026-06-18",
    sortiesAutorisees: "Avec restriction",
    texteContenu: "Je soussigné, Dr Karim BENNANI, certifie que l'état de santé de M. Driss EL FASSI (CIN : BK382910) nécessite un arrêt de travail d'une durée de 4 (quatre) jours, du 15/06/2026 au 18/06/2026 inclus, avec reprise prévisionnelle le 19/06/2026. Sorties autorisées entre 10h00 et 12h00 puis 16h00 et 18h00."
  }
];

export const INITIAL_DOCUMENTS: MedicalDocument[] = [
  {
    id: "doc-1",
    patientId: "pat-1",
    patientNomComplet: "Fatima Zahra ALAOUI",
    nom: "Bilan_Biologique_NFS_Iono_Août2026.pdf",
    categorie: "Analyses",
    date: "2026-08-11",
    taille: "420 Ko",
    auteur: "Laboratoire d'Analyses Médicales Al Anfa (Casablanca)",
    typeMime: "application/pdf",
    apercuContenu: "NFS complète : Hb 13.2 g/dL, Leucocytes 6800/mm3, Plaquettes 245 000/mm3. Ionogramme sanguin : Na 140 mEq/L, K 4.1 mEq/L. Créatinine : 7.8 mg/L."
  },
  {
    id: "doc-2",
    patientId: "pat-2",
    patientNomComplet: "Mohamed TAHA",
    nom: "Bordereau_Feuille_Soins_AMO_CNSS_ALD.pdf",
    categorie: "Feuille AMO",
    date: "2026-07-22",
    taille: "610 Ko",
    auteur: "Cabinet Médical Anfa Santé",
    typeMime: "application/pdf",
    apercuContenu: "Feuille de soins AMO CNSS n° 2026-07-22-492. Acte : Consultation de synthèse Diabète ALD (Code C-250 DH). Tiers-payant intégral activé."
  },
  {
    id: "doc-3",
    patientId: "pat-2",
    patientNomComplet: "Mohamed TAHA",
    nom: "Echographie_Doppler_Cardiaque_Juin2026.pdf",
    categorie: "Radios",
    date: "2026-06-20",
    taille: "1.8 Mo",
    auteur: "Centre de Cardiologie & d'Imagerie Gauthier",
    typeMime: "application/pdf",
    apercuContenu: "FEVG estimée à 60%. Absence d'anomalie de la cinétique segmentaire. Pas d'HVG significative. Pressions de remplissage normales."
  }
];

export const INITIAL_TRANSACTIONS: PaymentTransaction[] = [
  {
    id: "tx-1",
    date: "2026-08-25",
    patientId: "pat-1",
    patientNomComplet: "Fatima Zahra ALAOUI",
    montant: 250,
    typeActe: "Consultation Spécialisée",
    modePaiement: "Carte Bancaire",
    statut: "Payé"
  },
  {
    id: "tx-2",
    date: "2026-08-25",
    patientId: "pat-2",
    patientNomComplet: "Mohamed TAHA",
    montant: 250,
    typeActe: "Consultation Suivi ALD 100%",
    modePaiement: "Tiers Payant AMO",
    statut: "Payé"
  },
  {
    id: "tx-3",
    date: "2026-08-25",
    patientId: "pat-6",
    patientNomComplet: "Youssef NACIRI",
    montant: 350,
    typeActe: "Consultation + ECG de repos",
    modePaiement: "Espèces",
    statut: "Payé"
  },
  {
    id: "tx-4",
    date: "2026-08-25",
    patientId: "pat-3",
    patientNomComplet: "Driss EL FASSI",
    montant: 250,
    typeActe: "Consultation Générale",
    modePaiement: "Espèces",
    statut: "En attente"
  },
  {
    id: "tx-5",
    date: "2026-08-25",
    patientId: "pat-4",
    patientNomComplet: "Salma BENJELLOUN",
    montant: 250,
    typeActe: "Consultation Suivi HTA",
    modePaiement: "Chèque",
    statut: "En attente"
  },
  {
    id: "tx-6",
    date: "2026-08-24",
    patientId: "pat-5",
    patientNomComplet: "Amina CHRAIBI",
    montant: 300,
    typeActe: "Visite à domicile",
    modePaiement: "Espèces",
    statut: "Payé"
  }
];

export const INITIAL_EXPENSES: ExpenseItem[] = [
  {
    id: "exp-1",
    date: "2026-08-01",
    fournisseur: "Maroc Médical Pro Distribution",
    description: "Gants stériles, draps d'examen, désinfectant et spéculums à usage unique",
    categorie: "Consommables",
    montant: 2400,
    statut: "Réglé"
  },
  {
    id: "exp-2",
    date: "2026-08-05",
    fournisseur: "Maroc Telecom Entreprises",
    description: "Ligne Fibre Optique Pro Haut Débit & Téléphonie IP du cabinet",
    categorie: "Logiciels & Informatique",
    montant: 850,
    statut: "Réglé"
  },
  {
    id: "exp-3",
    date: "2026-08-05",
    fournisseur: "Société Immobilière Anfa Center",
    description: "Loyer professionnel et charges locatives du cabinet médical",
    categorie: "Loyer & Charges",
    montant: 12500,
    statut: "Réglé"
  },
  {
    id: "exp-4",
    date: "2026-08-10",
    fournisseur: "Conseil National de l'Ordre des Médecins (CNOM)",
    description: "Cotisation ordinale annuelle d'exercice médical libéral",
    categorie: "Assurance & Cotisations",
    montant: 1500,
    statut: "Réglé"
  }
];
