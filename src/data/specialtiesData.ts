export interface MedicalSpecialtyConfig {
  id: string;
  name: string;
  category: 'Dentaire' | 'Pédiatrique' | 'Spécialités Médicales' | 'Spécialités Chirurgicales' | 'Femme & Enfant' | 'Générale & Urgences';
  shortCode: string;
  iconName: string;
  accentColor: string;
  badgeBg: string;
  badgeText: string;
  description: string;
  keyTools: string[];
  vitalSignsSpecific: string[];
  defaultConsultationFee: number;
  popularActs: { nom: string; codeNgap?: string; tarifRef: number }[];
  quickPrescriptions: { nom: string; description: string }[];
}

export const ALL_MEDICAL_SPECIALTIES: MedicalSpecialtyConfig[] = [
  {
    id: 'dentisterie',
    name: 'Chirurgie Dentaire & Odontologie',
    category: 'Dentaire',
    shortCode: 'DENT',
    iconName: 'Smile',
    accentColor: '#0ea5e9',
    badgeBg: 'bg-sky-50 border-sky-200',
    badgeText: 'text-sky-700',
    description: 'Gestion complète du cabinet dentaire : Odontogramme interactif 2D/3D, soins conservateurs, prothèses, orthodontie et devis AMO/Mutuelle.',
    keyTools: ['Odontogramme FDI (32 dents)', 'Devis Prothèse & Devis Dentaire', 'Bilan Parodontal', 'Suivi Implants', 'Radio Panoramique & Rétro-alvéolaire'],
    vitalSignsSpecific: ['Indice de plaque', 'Saignement au sondage (BOP)', 'Hygiène bucco-dentaire', 'Pression Artérielle'],
    defaultConsultationFee: 300,
    popularActs: [
      { nom: 'Consultation & Bilan Bucco-Dentaire', codeNgap: 'C', tarifRef: 200 },
      { nom: 'Détartrage & Polissage bi-maxillaire', codeNgap: 'SC12', tarifRef: 400 },
      { nom: 'Obturation composite 3 faces', codeNgap: 'SC17', tarifRef: 450 },
      { nom: 'Dévitalisation molaire / Endodontie', codeNgap: 'SC33', tarifRef: 800 },
      { nom: 'Couronne Céramo-Métallique (CCM)', codeNgap: 'SPR50', tarifRef: 2500 },
      { nom: 'Pose Implant Titane Ostéo-intégré', codeNgap: 'HN', tarifRef: 6000 }
    ],
    quickPrescriptions: [
      { nom: 'Pack Post-Extraction / Soin Lourd', description: 'Amoxicilline 1g (1x2/j 6j) + Bi-Profenid 100mg + Paracétamol 1g + Bain de bouche Chlorhexidine' },
      { nom: 'Pack Douleur Aiguë Pulpaire', description: 'Paracétamol Codéiné 500mg/30mg + Ibuprofène 400mg' },
      { nom: 'Pack Parodontopathie & Gingivite', description: 'Rodogyl (Spiramycine/Métronidazole) + Hextril 0.1%' }
    ]
  },
  {
    id: 'pediatrie',
    name: 'Pédiatrie & Néonatalogie',
    category: 'Pédiatrique',
    shortCode: 'PED',
    iconName: 'Baby',
    accentColor: '#14b8a6',
    badgeBg: 'bg-teal-50 border-teal-200',
    badgeText: 'text-teal-700',
    description: 'Suivi de la naissance à 18 ans : Courbes OMS (Poids, Taille, Périmètre Crânien, IMC), calendrier vaccinal national marocain, posologies au kilo automatiques.',
    keyTools: ['Courbes de Croissance OMS 0-18 ans', 'Calendrier Vaccinal National', 'Calculateur Posologies pédiatriques / kg', 'Examen systématique 9e/24e mois', 'Dépistage sensoriel'],
    vitalSignsSpecific: ['Poids (kg)', 'Taille (cm)', 'Périmètre Crânien (cm)', 'Température (°C)', 'Saturation SpO2 (%)'],
    defaultConsultationFee: 250,
    popularActs: [
      { nom: 'Consultation pédiatrique de routine', codeNgap: 'CS', tarifRef: 250 },
      { nom: 'Visite systématique du nourrisson', codeNgap: 'CS+FPE', tarifRef: 300 },
      { nom: 'Séance de vaccination & enregistrement carnet', codeNgap: 'V', tarifRef: 150 },
      { nom: 'Aérosolthérapie / Nébulisation d\'urgence', codeNgap: 'ATM', tarifRef: 200 }
    ],
    quickPrescriptions: [
      { nom: 'Pack Bronchiolite / Rhinopharyngite', description: 'Lavage Sérum Physiologique + Paracétamol sirop 15mg/kg/6h + Aération' },
      { nom: 'Pack Gastro-Entérite Aiguë', description: 'Soluté de Réhydratation Orale (SRO) Adiaril + Tiorfan nourrisson + Smecta' },
      { nom: 'Pack Asthme Pédiatrique', description: 'Flixotide 50µg + Ventoline 100µg avec chambre AeroChamber' }
    ]
  },
  {
    id: 'gynecologie',
    name: 'Gynécologie-Obstétrique & Fertilité',
    category: 'Femme & Enfant',
    shortCode: 'GYN',
    iconName: 'HeartPulse',
    accentColor: '#ec4899',
    badgeBg: 'bg-pink-50 border-pink-200',
    badgeText: 'text-pink-700',
    description: 'Suivi gynécologique complet, suivi de grossesse, calcul du terme (DDR/DPA), échographie obstétricale, frottis cervico-vaginal et fertilité.',
    keyTools: ['Calculateur DDR / DPA / SA', 'Compte-rendu Échographie Morphologique', 'Frottis Cervico-Utérin (FCU)', 'Suivi Grossesse à Risque', 'Bilan Hormonal & Fertilité'],
    vitalSignsSpecific: ['Pression Artérielle (Dépistage Prééclampsie)', 'Poids maternel', 'Hauteur Utérine (cm)', 'Bruits du Cœur Fœtal (BDCF)', 'Protéinurie bandelette'],
    defaultConsultationFee: 350,
    popularActs: [
      { nom: 'Consultation Gynécologique de suivi', codeNgap: 'CS', tarifRef: 300 },
      { nom: 'Échographie Pelvienne / Endovaginale', codeNgap: 'ECH', tarifRef: 450 },
      { nom: 'Échographie Obstétricale T1/T2/T3', codeNgap: 'ECH-OB', tarifRef: 600 },
      { nom: 'Frottis Cervico-Vaginal de dépistage', codeNgap: 'FCU', tarifRef: 250 },
      { nom: 'Pose / Retrait Dispositif Intra-Utérin (Stérilet)', codeNgap: 'DIU', tarifRef: 500 }
    ],
    quickPrescriptions: [
      { nom: 'Pack Supplémentation Grossesse T1', description: 'Acide Folique 5mg + Gestarelle G3 + Tardyferon B9' },
      { nom: 'Pack Mycose Vaginale', description: 'Gynopevaryl ovule LP 150mg + Crème Econazole 1% + Savon Saforelle' },
      { nom: 'Pack Contraception Régulière', description: 'Optilova / Jasmine + Bilan lipidique annuel' }
    ]
  },
  {
    id: 'ophtalmologie',
    name: 'Ophtalmologie & Chirurgie Réfractive',
    category: 'Spécialités Médicales',
    shortCode: 'OPHT',
    iconName: 'Eye',
    accentColor: '#6366f1',
    badgeBg: 'bg-indigo-50 border-indigo-200',
    badgeText: 'text-indigo-700',
    description: 'Examen de la vue complet, échelle Monoyer/Parinaud, tonométrie à aplanation, lampe à fente, fond d\'œil et prescription normalisée de lunettes & lentilles.',
    keyTools: ['Prescription Verres Correcteurs (OD/OG Sphère/Cylindre/Axe/Add)', 'Mesure Acuité Visuelle Loin/Près', 'Tonométrie (Pression Intraoculaire)', 'Fond d\'œil & OCT', 'Champ Visuel'],
    vitalSignsSpecific: ['Pression Intra-Oculaire OD/OG (mmHg)', 'Acuité sans correction', 'Acuité avec correction', 'Réfraction auto'],
    defaultConsultationFee: 350,
    popularActs: [
      { nom: 'Bilan Visuel & Réfraction Subjective', codeNgap: 'CS+R', tarifRef: 300 },
      { nom: 'Examen à la lampe à fente & Fond d\'œil', codeNgap: 'FO', tarifRef: 400 },
      { nom: 'Tonométrie oculaire & Dépistage Glaucome', codeNgap: 'TO', tarifRef: 200 },
      { nom: 'OCT Macula & Papille', codeNgap: 'OCT', tarifRef: 800 }
    ],
    quickPrescriptions: [
      { nom: 'Pack Sécheresse Oculaire & Écrans', description: 'Larmes artificielles (Hyabak / Vismed) 1 gte x4/j + Règles d\'ergonomie visuelle' },
      { nom: 'Pack Conjonctivite Bactérienne', description: 'Tobrex 0.3% collyre (1 gte x4/j pendant 7 jours) + Lavage au sérum' },
      { nom: 'Pack Allergie Oculaire Saisonnière', description: 'Zalerg / Zaditen collyre 1 gte matin et soir' }
    ]
  },
  {
    id: 'cardiologie',
    name: 'Cardiologie & Maladies Vasculaires',
    category: 'Spécialités Médicales',
    shortCode: 'CARD',
    iconName: 'Activity',
    accentColor: '#ef4444',
    badgeBg: 'bg-rose-50 border-rose-200',
    badgeText: 'text-rose-700',
    description: 'Évaluation hémodynamique, tracé ECG 12 dérivations, Holter ECG/MAPA, échocardiographie Doppler transthoracique et suivi de l\'HTA.',
    keyTools: ['Tracé ECG Numérisé', 'Calculateur Score SCORE2 Risque Cardiovasculaire', 'Échocardiographie Transthoracique (ETT)', 'MAPA Tensionnelle 24h', 'Suivi ALD HTA / Coronaropathie'],
    vitalSignsSpecific: ['Pression Artérielle Couché/Debout', 'Fréquence Cardiaque (BPM)', 'Rythme ECG', 'IMC & Périmètre Abdominal', 'SpO2'],
    defaultConsultationFee: 450,
    popularActs: [
      { nom: 'Consultation Cardiologique & ECG 12D', codeNgap: 'CSC+ECG', tarifRef: 450 },
      { nom: 'Échocardiographie Doppler Cardiaque', codeNgap: 'ETT', tarifRef: 800 },
      { nom: 'Épreuve d\'effort sur tapis roulant', codeNgap: 'EE', tarifRef: 700 },
      { nom: 'Pose et lecture Holter ECG 24H', codeNgap: 'HECG', tarifRef: 600 }
    ],
    quickPrescriptions: [
      { nom: 'Pack HTA Essentielle Débutante', description: 'Amlodipine 5mg (1 cp le matin) + Bilan ionogramme/créatinine + Règles hygiéno-diététiques' },
      { nom: 'Pack Prévention Secondaire Cardiovasculaire', description: 'Kardegic 75mg + Atorvastatine 40mg + Bisoprolol 5mg + Ramipril 5mg' }
    ]
  },
  {
    id: 'dermatologie',
    name: 'Dermatologie & Vénérologie',
    category: 'Spécialités Médicales',
    shortCode: 'DERM',
    iconName: 'Sparkles',
    accentColor: '#f59e0b',
    badgeBg: 'bg-amber-50 border-amber-200',
    badgeText: 'text-amber-700',
    description: 'Diagnostic cutané, dermoscopie haute résolution, cartographie des grains de beauté, cryothérapie, biopsie cutanée et prise en charge de l\'acné/eczéma.',
    keyTools: ['Cartographie Nævus / Lésions cutanées', 'Compte-rendu Dermoscopique', 'Plan de traitement Acné / Isotretinoïne', 'Suivi Psoriasis / Eczéma', 'Cryothérapie à l\'Azote Liquide'],
    vitalSignsSpecific: ['Phototype Fitzpatrick (I-VI)', 'Surface corporelle atteinte (PASI)', 'Prurit EVA /10'],
    defaultConsultationFee: 300,
    popularActs: [
      { nom: 'Consultation Dermatologique & Dermoscopie', codeNgap: 'CS', tarifRef: 300 },
      { nom: 'Séance Cryothérapie (Verrues / Kératoses)', codeNgap: 'CRYO', tarifRef: 250 },
      { nom: 'Biopsie cutanée avec examen anapath', codeNgap: 'BIO-C', tarifRef: 500 },
      { nom: 'Exérèse chirurgicale de lésion suspecte', codeNgap: 'EXER', tarifRef: 900 }
    ],
    quickPrescriptions: [
      { nom: 'Pack Acné Polymorphe Juvénile', description: 'Epiduo Gel (Adapalène/Peroxyde de benzoyle) 1 applic/soir + Effaclar nettoyant + Crème hydratante non comédogène' },
      { nom: 'Pack Dermite Séborrhéique / Eczéma', description: 'Diprosone 0.05% crème (cure courte 5j) + Ketoderm 2% gel moussant' }
    ]
  },
  {
    id: 'medecine_generale',
    name: 'Médecine Générale & Urgences',
    category: 'Générale & Urgences',
    shortCode: 'MG',
    iconName: 'Stethoscope',
    accentColor: '#3b82f6',
    badgeBg: 'bg-blue-50 border-blue-200',
    badgeText: 'text-blue-700',
    description: 'Premier recours, médecine de famille, dépistages systématiques, gestion des maladies chroniques ALD (Diabète, HTA) et coordination du parcours de soins.',
    keyTools: ['Bilan de Santé Global', 'Suivi ALD 100% AMO', 'Vaccination Adulte & Voyageur', 'Dépistage Diabète / Syndrome métabolique', 'Feuille de soins AMO CNSS/CNOPS'],
    vitalSignsSpecific: ['Tension Artérielle', 'Fréquence Cardiaque', 'Température', 'Poids / IMC', 'Glycémie capillaire'],
    defaultConsultationFee: 200,
    popularActs: [
      { nom: 'Consultation de Médecine Générale', codeNgap: 'C', tarifRef: 200 },
      { nom: 'Visite à domicile d\'urgence', codeNgap: 'V', tarifRef: 350 },
      { nom: 'Électrocardiogramme de repos (ECG)', codeNgap: 'ECG', tarifRef: 150 },
      { nom: 'Suture de plaie simple', codeNgap: 'SUT', tarifRef: 300 }
    ],
    quickPrescriptions: [
      { nom: 'Pack Infection Respiratoire Haute', description: 'Paracétamol 1g (1 cp x3/j) + Lavage de nez + Sirop antitussif + Repos' },
      { nom: 'Pack Diabète Type 2 Suivi', description: 'Metformine 850mg (1 cp midi et soir au repas) + Bilan HbA1c tous les 3 mois' }
    ]
  },
  {
    id: 'neurologie',
    name: 'Neurologie & Neurophysiologie',
    category: 'Spécialités Médicales',
    shortCode: 'NEUR',
    iconName: 'Brain',
    accentColor: '#8b5cf6',
    badgeBg: 'bg-purple-50 border-purple-200',
    badgeText: 'text-purple-700',
    description: 'Exploration du système nerveux central et périphérique : Épilepsies, migraines, céphalées, sclérose en plaques, Parkinson et troubles de la mémoire.',
    keyTools: ['Échelle de Glasgow & MMSE', 'Journal des Crises Migraineuses / Épileptiques', 'Évaluation Motricité & Réflexes', 'Bilan Cognitif de Dépistage'],
    vitalSignsSpecific: ['Score Glasgow /15', 'Score MMSE /30', 'Réflexes ostéo-tendineux', 'Pression Artérielle'],
    defaultConsultationFee: 400,
    popularActs: [
      { nom: 'Consultation Neurologique Approfondie', codeNgap: 'CN', tarifRef: 400 },
      { nom: 'Électroencéphalogramme (EEG standard)', codeNgap: 'EEG', tarifRef: 750 },
      { nom: 'Électromyogramme 2 ou 4 membres (EMG)', codeNgap: 'EMG', tarifRef: 900 }
    ],
    quickPrescriptions: [
      { nom: 'Pack Crise Migraineuse Aiguë', description: 'Zomig 2.5mg (1 cp dès l\'aura/début) + Kétoprofène 100mg' },
      { nom: 'Pack Neuropathie Périphérique', description: 'Lyrica 75mg (1 gélule le soir) + Vitamines B1-B6' }
    ]
  },
  {
    id: 'orl',
    name: 'Oto-Rhino-Laryngologie (O.R.L.)',
    category: 'Spécialités Chirurgicales',
    shortCode: 'ORL',
    iconName: 'Headphones',
    accentColor: '#10b981',
    badgeBg: 'bg-emerald-50 border-emerald-200',
    badgeText: 'text-emerald-700',
    description: 'Pathologies de l\'oreille, du nez, des sinus et de la gorge : Audiométrie tonale et vocale, otoscopie haute précision, fibroscopie et vertiges.',
    keyTools: ['Audiogramme Tonal & Vocal', 'Fibroscopie Naso-Pharyngo-Laryngée', 'Test d\'Équilibre & Vertiges', 'Tympanométrie'],
    vitalSignsSpecific: ['Acuité Auditive OD/OG (dB)', 'Perméabilité nasale', 'Aspect tympanique'],
    defaultConsultationFee: 300,
    popularActs: [
      { nom: 'Consultation O.R.L. & Otoscopie', codeNgap: 'CS', tarifRef: 300 },
      { nom: 'Audiométrie tonale en cabine', codeNgap: 'AUDIO', tarifRef: 350 },
      { nom: 'Fibroscopie des voies aérodigestives', codeNgap: 'FIBRO', tarifRef: 450 },
      { nom: 'Extraction de bouchon de cérumen', codeNgap: 'CER', tarifRef: 150 }
    ],
    quickPrescriptions: [
      { nom: 'Pack Otite Externe Aiguë', description: 'Polydexa collyre auriculaire (4 gtes x3/j 7j) + Paracétamol 1g' },
      { nom: 'Pack Rhinosinusite Aiguë Purulente', description: 'Augmentin 1g (1x2/j) + Lavage de nez eau de mer hypertonique + Rhinocort' }
    ]
  },
  {
    id: 'orthopedie',
    name: 'Chirurgie Orthopédique & Traumatologie',
    category: 'Spécialités Chirurgicales',
    shortCode: 'ORTH',
    iconName: 'Bone',
    accentColor: '#64748b',
    badgeBg: 'bg-slate-50 border-slate-200',
    badgeText: 'text-slate-700',
    description: 'Affections de l\'appareil locomoteur, traumatismes du sport, arthrose, chirurgie du genou/hanche/rachis, plâtres et infiltrations sous échographie.',
    keyTools: ['Bilan Articulaire Gonarthrose/Coxarthrose', 'Protocole Infiltrations Acide Hyaluronique / Corticoïdes', 'Gestion Immobilisations Plâtres/Résines', 'Certificat d\'Incapacité Totale de Travail (ITT)'],
    vitalSignsSpecific: ['Amplitudes articulaires (°)', 'Périmètre de marche', 'EVA Douleur /10'],
    defaultConsultationFee: 350,
    popularActs: [
      { nom: 'Consultation Orthopédique Spécialisée', codeNgap: 'CS', tarifRef: 350 },
      { nom: 'Infiltration articulaire sous guidage', codeNgap: 'INFIL', tarifRef: 400 },
      { nom: 'Confection plâtre / attelle résine', codeNgap: 'PLAT', tarifRef: 300 },
      { nom: 'Ponction évacuatrice d\'épanchement', codeNgap: 'PONC', tarifRef: 250 }
    ],
    quickPrescriptions: [
      { nom: 'Pack Poussée Inflammatoire Arthrose', description: 'Celebrex 200mg (1 cp/j aux repas 10j) + Inexium 20mg + Genouillère rotulienne' },
      { nom: 'Pack Entorse Cheville Stade 1-2', description: 'Attelle Aircast + Paracétamol 1g + Glaçage 20min x3/j + Surélévation' }
    ]
  },
  {
    id: 'psychiatrie',
    name: 'Psychiatrie & Santé Mentale',
    category: 'Spécialités Médicales',
    shortCode: 'PSY',
    iconName: 'SmilePlus',
    accentColor: '#14b8a6',
    badgeBg: 'bg-teal-50 border-teal-200',
    badgeText: 'text-teal-700',
    description: 'Prise en charge des troubles anxio-dépressifs, troubles bipolaires, burn-out, TDAH de l\'adulte et psychothérapies cognitives.',
    keyTools: ['Échelles Cliniques HAM-D / GAD-7 / PHQ-9', 'Suivi Thymorégulateurs & Bilan Lithium', 'Fiches de Suivi Psychothérapeutique', 'Certificats Médicaux Sécurisés'],
    vitalSignsSpecific: ['Score Dépression PHQ-9 /27', 'Score Anxiété GAD-7 /21', 'Poids (Suivi métabolique)'],
    defaultConsultationFee: 400,
    popularActs: [
      { nom: 'Consultation Psychiatrique & Entretien', codeNgap: 'CNPSY', tarifRef: 400 },
      { nom: 'Séance de Psychothérapie Individuelle (45 min)', codeNgap: 'THY', tarifRef: 500 }
    ],
    quickPrescriptions: [
      { nom: 'Pack Épisode Dépressif Caractérisé', description: 'Sertraline 50mg (1 cp le matin) + Suivi rapproché à J14' },
      { nom: 'Pack Anxiété Généralisée / Troubles du sommeil', description: 'Hydroxyzine (Atarax 25mg) le soir au coucher' }
    ]
  },
  {
    id: 'endocrinologie',
    name: 'Endocrinologie, Diabétologie & Nutrition',
    category: 'Spécialités Médicales',
    shortCode: 'ENDO',
    iconName: 'FlaskConical',
    accentColor: '#059669',
    badgeBg: 'bg-emerald-50 border-emerald-200',
    badgeText: 'text-emerald-700',
    description: 'Pathologies thyroïdiennes, diabète gestationnel et de type 1/2, obésité, dérèglements surrénaliens et hypophysaires.',
    keyTools: ['Suivi Courbes HbA1c & Glycémies', 'Ajustement Schéma Basal-Bolus Insuline', 'Échographie Thyroïdienne & Cytoponction', 'Plan Diététique Personnalisé'],
    vitalSignsSpecific: ['HbA1c (%)', 'Glycémie à jeun (g/L)', 'Poids & Tour de Taille', 'TSH us (mUI/L)'],
    defaultConsultationFee: 350,
    popularActs: [
      { nom: 'Consultation Diabétologie & Endocrinologie', codeNgap: 'CS', tarifRef: 350 },
      { nom: 'Échographie Thyroïdienne & Cervicale', codeNgap: 'ECH-THY', tarifRef: 500 }
    ],
    quickPrescriptions: [
      { nom: 'Pack Hypothyroïdie Primitive', description: 'Levothyrox 75µg (1 cp le matin à jeun 30 min avant le petit déjeuner)' },
      { nom: 'Pack Diabète avec Insulino-résistance', description: 'Metformine 1000mg + Empagliflozine (Jardiance 10mg) + Carnet d\'autosurveillance' }
    ]
  }
];

export const SPECIALTY_CATEGORIES = [
  'Tous',
  'Dentaire',
  'Pédiatrique',
  'Femme & Enfant',
  'Spécialités Médicales',
  'Spécialités Chirurgicales',
  'Générale & Urgences'
];

export function getSpecialtyById(id: string): MedicalSpecialtyConfig | undefined {
  return ALL_MEDICAL_SPECIALTIES.find(s => s.id === id || s.name.toLowerCase().includes(id.toLowerCase()));
}
