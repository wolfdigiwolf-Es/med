import { DentalAct, DentalActCategory, DentalToothState, DentalQuote } from '../types';

export const ALL_DENTAL_ACTS: DentalAct[] = [
  // ============================================================================
  // 1. SOINS CONSERVATEURS & RESTAURATEURS (ÉMAIL, DENTINE & BIOMATÉRIAUX)
  // ============================================================================
  {
    id: 'act-sc-01',
    code: 'C-BUCCO',
    nom: 'Consultation & Examen Bucco-Dentaire Initial',
    categorie: 'Soins Conservateurs',
    cotationNgap: 'C',
    tarifRefDH: 200,
    baseRemboursementAMO: 150,
    tauxRemboursementAMO: 80,
    description: 'Examen clinique complet de la cavité buccale, dépistage carieux, examen muqueux et établissement du plan de traitement.',
    dureeMinutesEstimee: 20,
    isToothSpecific: false
  },
  {
    id: 'act-sc-02',
    code: 'SC12-1F',
    nom: 'Obturation composite 1 face (Cavité simple)',
    categorie: 'Soins Conservateurs',
    cotationNgap: 'SC 12',
    tarifRefDH: 350,
    baseRemboursementAMO: 250,
    tauxRemboursementAMO: 80,
    description: 'Restauration esthétique par résine composite nano-hybride photo-polymérisable sur une seule face dentaire.',
    dureeMinutesEstimee: 30,
    isToothSpecific: true,
    isSurfaceSpecific: true
  },
  {
    id: 'act-sc-03',
    code: 'SC17-2F',
    nom: 'Obturation composite 2 faces (Classe II Mésio/Disto-Occlusal)',
    categorie: 'Soins Conservateurs',
    cotationNgap: 'SC 17',
    tarifRefDH: 450,
    baseRemboursementAMO: 350,
    tauxRemboursementAMO: 80,
    description: 'Reconstitution carieuse proximale avec mise en place de matrice sectionnelle et coin interdentaire.',
    dureeMinutesEstimee: 40,
    isToothSpecific: true,
    isSurfaceSpecific: true
  },
  {
    id: 'act-sc-04',
    code: 'SC20-3F',
    nom: 'Obturation composite 3 faces et plus (MOD Complexe)',
    categorie: 'Soins Conservateurs',
    cotationNgap: 'SC 20',
    tarifRefDH: 550,
    baseRemboursementAMO: 420,
    tauxRemboursementAMO: 80,
    description: 'Restauration coronaire complexe multi-surfaces (Mésio-Occluso-Distale) avec stratification esthétique.',
    dureeMinutesEstimee: 50,
    isToothSpecific: true,
    isSurfaceSpecific: true
  },
  {
    id: 'act-sc-05',
    code: 'RECON-TENON',
    nom: 'Reconstitution corono-radiculaire avec Tenon Fibre de Verre',
    categorie: 'Soins Conservateurs',
    cotationNgap: 'SC 25',
    tarifRefDH: 650,
    baseRemboursementAMO: 450,
    tauxRemboursementAMO: 70,
    description: 'Ancrage radiculaire anatomique en fibre de quartz/verre radio-opaque et composite de reconstitution de moignon (core).',
    dureeMinutesEstimee: 45,
    isToothSpecific: true
  },
  {
    id: 'act-sc-06',
    code: 'INLAY-COMP',
    nom: 'Inlay / Onlay composite esthétique indirect (Labo)',
    categorie: 'Soins Conservateurs',
    cotationNgap: 'HN',
    tarifRefDH: 1200,
    baseRemboursementAMO: 600,
    tauxRemboursementAMO: 70,
    description: 'Pièce prothétique usinée ou polymérisée au laboratoire, scellée sous digue pour préserver la structure dentaire saine.',
    dureeMinutesEstimee: 45,
    isToothSpecific: true
  },
  {
    id: 'act-sc-07',
    code: 'INLAY-EMAX',
    nom: 'Inlay / Onlay Céramique Pure pressée E-Max',
    categorie: 'Soins Conservateurs',
    cotationNgap: 'HN',
    tarifRefDH: 2000,
    baseRemboursementAMO: 800,
    tauxRemboursementAMO: 70,
    description: 'Inlay-onlay en vitrocéramique disilicate de lithium garantissant une résistance mécanique et une biomimétique maximale.',
    dureeMinutesEstimee: 45,
    isToothSpecific: true
  },
  {
    id: 'act-sc-08',
    code: 'COIFF-DIR',
    nom: 'Coiffage pulpaire direct bio-actif (MTA / Biodentine)',
    categorie: 'Soins Conservateurs',
    cotationNgap: 'SC 10',
    tarifRefDH: 350,
    baseRemboursementAMO: 200,
    tauxRemboursementAMO: 80,
    description: 'Protection de la pulpe vivante dénudée par ciment silicate de calcium pour induire la néoformation d’un pont dentinaire.',
    dureeMinutesEstimee: 25,
    isToothSpecific: true
  },
  {
    id: 'act-sc-09',
    code: 'COIFF-IND',
    nom: 'Coiffage pulpaire indirect à l\'Hydroxyde de Calcium',
    categorie: 'Soins Conservateurs',
    cotationNgap: 'SC 7',
    tarifRefDH: 250,
    baseRemboursementAMO: 180,
    tauxRemboursementAMO: 80,
    description: 'Application d’un fond de cavité bactéricide et reminéralisant sous restauration profonde.',
    dureeMinutesEstimee: 20,
    isToothSpecific: true
  },
  {
    id: 'act-sc-10',
    code: 'SEALANT-P',
    nom: 'Scellement prophylactique des sillons (Sealant par dent)',
    categorie: 'Soins Conservateurs',
    cotationNgap: 'SC 8',
    tarifRefDH: 200,
    baseRemboursementAMO: 150,
    tauxRemboursementAMO: 100,
    description: 'Protection préventive des puits et sillons des molaires chez l’enfant et l’adolescent contre les caries occlusales.',
    dureeMinutesEstimee: 20,
    isToothSpecific: true
  },
  {
    id: 'act-sc-11',
    code: 'COLLET-C',
    nom: 'Traitement des lésions cervicales / Mylolyses & Érosion',
    categorie: 'Soins Conservateurs',
    cotationNgap: 'SC 12',
    tarifRefDH: 300,
    baseRemboursementAMO: 220,
    tauxRemboursementAMO: 80,
    description: 'Obturation des pertes de substance au collet dentaire par verre ionomère ou composite fluide souple.',
    dureeMinutesEstimee: 25,
    isToothSpecific: true
  },
  {
    id: 'act-sc-12',
    code: 'FACETTE-CER',
    nom: 'Facette dentaire pelliculaire céramique E-Max',
    categorie: 'Soins Conservateurs',
    cotationNgap: 'HN',
    tarifRefDH: 3000,
    baseRemboursementAMO: 0,
    tauxRemboursementAMO: 0,
    description: 'Restauration cosmétique antérieure ultra-fine collée (Smile Design) sans mutilation tissulaire.',
    dureeMinutesEstimee: 60,
    isToothSpecific: true
  },

  // ============================================================================
  // 2. ENDODONTIE & DÉVITALISATION (TRAITEMENTS CANALAIRES)
  // ============================================================================
  {
    id: 'act-endo-01',
    code: 'DEVIT-MONO',
    nom: 'Dévitalisation Incisive / Canine (1 canal radiculaire)',
    categorie: 'Endodontie',
    cotationNgap: 'SC 14',
    tarifRefDH: 500,
    baseRemboursementAMO: 400,
    tauxRemboursementAMO: 80,
    description: 'Pulpectomie, alésage mécanisé, désinfection sous digue et obturation canalaire tridimensionnelle à la gutta-percha chaude.',
    dureeMinutesEstimee: 40,
    isToothSpecific: true
  },
  {
    id: 'act-endo-02',
    code: 'DEVIT-BI',
    nom: 'Dévitalisation Prémolaire (2 canaux radiculaires)',
    categorie: 'Endodontie',
    cotationNgap: 'SC 22',
    tarifRefDH: 650,
    baseRemboursementAMO: 500,
    tauxRemboursementAMO: 80,
    description: 'Mise en forme canalaire avec localisateur d’apex électronique et obturation thermo-mécanique de 2 canaux.',
    dureeMinutesEstimee: 45,
    isToothSpecific: true
  },
  {
    id: 'act-endo-03',
    code: 'DEVIT-TRI',
    nom: 'Dévitalisation Molaire (3 à 4 canaux rotatifs)',
    categorie: 'Endodontie',
    cotationNgap: 'SC 33',
    tarifRefDH: 900,
    baseRemboursementAMO: 700,
    tauxRemboursementAMO: 80,
    description: 'Endodontie molaire complexe sous irrigation continue activée par ultrasons et obturation hermétique tridimensionnelle.',
    dureeMinutesEstimee: 60,
    isToothSpecific: true
  },
  {
    id: 'act-endo-04',
    code: 'RE-ENDO-MOL',
    nom: 'Retraitement Endodontique Complexe Molaire (RTE)',
    categorie: 'Endodontie',
    cotationNgap: 'HN / SC33+15',
    tarifRefDH: 1300,
    baseRemboursementAMO: 800,
    tauxRemboursementAMO: 70,
    description: 'Désobturation d\'une ancienne pâte d\'obturation défectueuse ou infectée, négociation des courbures et re-stérilisation canalaire.',
    dureeMinutesEstimee: 75,
    isToothSpecific: true
  },
  {
    id: 'act-endo-05',
    code: 'RET-INST-FRAC',
    nom: 'Ablation instrument fracturé intra-canalaire sous loupe',
    categorie: 'Endodontie',
    cotationNgap: 'HN',
    tarifRefDH: 700,
    baseRemboursementAMO: 0,
    tauxRemboursementAMO: 0,
    description: 'Technique d’extraction ultrasonore ou micro-lasso pour récupérer une lime séparée dans un canal radiculaire.',
    dureeMinutesEstimee: 45,
    isToothSpecific: true
  },
  {
    id: 'act-endo-06',
    code: 'APEX-BIOCER',
    nom: 'Apexification / Bouchon apical Bio-Céramique (MTA)',
    categorie: 'Endodontie',
    cotationNgap: 'SC 25',
    tarifRefDH: 850,
    baseRemboursementAMO: 550,
    tauxRemboursementAMO: 70,
    description: 'Création d’une barrière apicale synthétique sur dent immature ou résorbée par ciment bio-actif.',
    dureeMinutesEstimee: 45,
    isToothSpecific: true
  },
  {
    id: 'act-endo-07',
    code: 'PULP-URG',
    nom: 'Pulpotomie d\'urgence & Pansement antalgique décompressif',
    categorie: 'Endodontie',
    cotationNgap: 'SC 10',
    tarifRefDH: 300,
    baseRemboursementAMO: 200,
    tauxRemboursementAMO: 80,
    description: 'Évidement de la chambre pulpaire pour soulager immédiatement une pulpite aiguë hyperalgique (rage de dent).',
    dureeMinutesEstimee: 25,
    isToothSpecific: true
  },

  // ============================================================================
  // 3. CHIRURGIE ORALE, EXTRACTIONS & STOMATOLOGIE
  // ============================================================================
  {
    id: 'act-chir-01',
    code: 'EXT-MONO',
    nom: 'Avulsion dentaire simple monoradiculaire',
    categorie: 'Chirurgie & Extractions',
    cotationNgap: 'DC',
    tarifRefDH: 300,
    baseRemboursementAMO: 220,
    tauxRemboursementAMO: 80,
    description: 'Extraction non chirurgicale d\'une incisive ou canine avec curetage alvéolaire et hémostase locale.',
    dureeMinutesEstimee: 25,
    isToothSpecific: true
  },
  {
    id: 'act-chir-02',
    code: 'EXT-PLURI',
    nom: 'Avulsion dentaire pluriradiculaire (Molaire / Prémolaire)',
    categorie: 'Chirurgie & Extractions',
    cotationNgap: 'DC',
    tarifRefDH: 450,
    baseRemboursementAMO: 300,
    tauxRemboursementAMO: 80,
    description: 'Extraction d\'une dent postérieure avec séparation éventuelle des racines (séparation inter-radiculaire).',
    dureeMinutesEstimee: 35,
    isToothSpecific: true
  },
  {
    id: 'act-chir-03',
    code: 'EXT-SAGESSE-INC',
    nom: 'Extraction chirurgicale Dent de Sagesse Incluse Osseuse',
    categorie: 'Chirurgie & Extractions',
    cotationNgap: 'DC 16',
    tarifRefDH: 1200,
    baseRemboursementAMO: 800,
    tauxRemboursementAMO: 80,
    description: 'Incision muqueuse, décollement mucopériosté, alvéolectomie, odontosection sous irrigation stérile et sutures résorbables.',
    dureeMinutesEstimee: 50,
    isToothSpecific: true
  },
  {
    id: 'act-chir-04',
    code: 'EXT-SAGESSE-SEMI',
    nom: 'Extraction chirurgicale Dent de Sagesse Enclavée / Éruptée',
    categorie: 'Chirurgie & Extractions',
    cotationNgap: 'DC 12',
    tarifRefDH: 900,
    baseRemboursementAMO: 600,
    tauxRemboursementAMO: 80,
    description: 'Dégagement chirurgical et avulsion d\'une troisième molaire enclavée avec capuchon muqueux récidivant.',
    dureeMinutesEstimee: 40,
    isToothSpecific: true
  },
  {
    id: 'act-chir-05',
    code: 'EXT-RACINE',
    nom: 'Extraction chirurgicale de racine résiduelle enfouie',
    categorie: 'Chirurgie & Extractions',
    cotationNgap: 'DC 8',
    tarifRefDH: 500,
    baseRemboursementAMO: 350,
    tauxRemboursementAMO: 80,
    description: 'Avulsion avec volet gingival et dégagement à la fraise Zekrya d\'un apex fracturé intra-osseux.',
    dureeMinutesEstimee: 35,
    isToothSpecific: true
  },
  {
    id: 'act-chir-06',
    code: 'RESEC-APIC',
    nom: 'Résection apicale & Obturation a retro bio-céramique',
    categorie: 'Chirurgie & Extractions',
    cotationNgap: 'DC 20',
    tarifRefDH: 1400,
    baseRemboursementAMO: 900,
    tauxRemboursementAMO: 70,
    description: 'Chirurgie endodontique : ablation du tiers apical infecté, préparation rétrograde ultrasonore et scellement étanche.',
    dureeMinutesEstimee: 60,
    isToothSpecific: true
  },
  {
    id: 'act-chir-07',
    code: 'FREN-CHIR',
    nom: 'Frénectomie Labiale ou Linguale (Laser / Bistouri)',
    categorie: 'Chirurgie & Extractions',
    cotationNgap: 'DC 10',
    tarifRefDH: 600,
    baseRemboursementAMO: 400,
    tauxRemboursementAMO: 70,
    description: 'Section ou plastie d’un frein buccal restrictif responsable de diastème antérieur ou d’ankylose linguale.',
    dureeMinutesEstimee: 30,
    isToothSpecific: false
  },
  {
    id: 'act-chir-08',
    code: 'DRAIN-ABCES',
    nom: 'Incision, débridement et drainage d\'un abcès péri-maxillaire',
    categorie: 'Chirurgie & Extractions',
    cotationNgap: 'DC 6',
    tarifRefDH: 350,
    baseRemboursementAMO: 250,
    tauxRemboursementAMO: 80,
    description: 'Évacuation de collection purulente par abord muqueux et mise en place d\'un drain lamellaire.',
    dureeMinutesEstimee: 20,
    isToothSpecific: false
  },
  {
    id: 'act-chir-09',
    code: 'ELONG-COR',
    nom: 'Élongation coronaire chirurgicale pré-prothétique',
    categorie: 'Chirurgie & Extractions',
    cotationNgap: 'HN / DC15',
    tarifRefDH: 800,
    baseRemboursementAMO: 400,
    tauxRemboursementAMO: 70,
    description: 'Rétablissement de l’espace biologique par ostéotomie soustractive pour permettre le scellement étanche d’une couronne.',
    dureeMinutesEstimee: 45,
    isToothSpecific: true
  },
  {
    id: 'act-chir-10',
    code: 'KYST-ENUC',
    nom: 'Énucléation kystique périapicale & Curetage osseux',
    categorie: 'Chirurgie & Extractions',
    cotationNgap: 'DC 18',
    tarifRefDH: 1200,
    baseRemboursementAMO: 750,
    tauxRemboursementAMO: 70,
    description: 'Exérèse complète de la membrane d’un kyste radiculaire et comblement hémostatique.',
    dureeMinutesEstimee: 50,
    isToothSpecific: true
  },

  // ============================================================================
  // 4. PROTHÈSES FIXES (COURONNES, BRIDGES & INLAY-CORE)
  // ============================================================================
  {
    id: 'act-protf-01',
    code: 'CCM-DENT',
    nom: 'Couronne Céramo-Métallique (CCM Haute Définition)',
    categorie: 'Prothèses Fixes',
    cotationNgap: 'SPR 50',
    tarifRefDH: 2200,
    baseRemboursementAMO: 1200,
    tauxRemboursementAMO: 70,
    description: 'Couronne dentoportée avec armature en alliage biocompatible précieux/semi-précieux et cosmétique feldspathique multicouche.',
    dureeMinutesEstimee: 45,
    isToothSpecific: true
  },
  {
    id: 'act-protf-02',
    code: 'C-ZIRCONE',
    nom: 'Couronne Zircone Pure Monolithique Multicouche 3D',
    categorie: 'Prothèses Fixes',
    cotationNgap: 'SPR 50 + HN',
    tarifRefDH: 2800,
    baseRemboursementAMO: 1400,
    tauxRemboursementAMO: 70,
    description: 'Couronne tout céramique sans métal en dioxyde de zirconium haute translucidité, biocompatibilité et résistance exceptionnelle.',
    dureeMinutesEstimee: 45,
    isToothSpecific: true
  },
  {
    id: 'act-protf-03',
    code: 'C-EMAX',
    nom: 'Couronne Tout-Céramique E-Max Disilicate de Lithium',
    categorie: 'Prothèses Fixes',
    cotationNgap: 'SPR 50 + HN',
    tarifRefDH: 3200,
    baseRemboursementAMO: 1500,
    tauxRemboursementAMO: 70,
    description: 'Couronne unitaire d\'excellence pour secteur antérieur, mimétisme optique naturel avec fluorescence et opalescence.',
    dureeMinutesEstimee: 50,
    isToothSpecific: true
  },
  {
    id: 'act-protf-04',
    code: 'INLAY-CORE',
    nom: 'Inlay-Core à Clavette / Faux-Moignon Métallique Coulé',
    categorie: 'Prothèses Fixes',
    cotationNgap: 'SPR 30',
    tarifRefDH: 800,
    baseRemboursementAMO: 500,
    tauxRemboursementAMO: 70,
    description: 'Reconstitution prothétique corono-radiculaire sur mesure coulée en laboratoire pour ancrage solide de couronne.',
    dureeMinutesEstimee: 35,
    isToothSpecific: true
  },
  {
    id: 'act-protf-05',
    code: 'IC-ZIRC',
    nom: 'Inlay-Core Zircone Blanc Esthétique',
    categorie: 'Prothèses Fixes',
    cotationNgap: 'SPR 35 + HN',
    tarifRefDH: 1200,
    baseRemboursementAMO: 600,
    tauxRemboursementAMO: 70,
    description: 'Tenon et moignon usiné en zircone blanche pour éviter les liserés gris sous couronnes transparentes.',
    dureeMinutesEstimee: 40,
    isToothSpecific: true
  },
  {
    id: 'act-protf-06',
    code: 'C-PROV',
    nom: 'Couronne Provisoire Résine Fauteuil / Labo',
    categorie: 'Prothèses Fixes',
    cotationNgap: 'SPR 10',
    tarifRefDH: 300,
    baseRemboursementAMO: 150,
    tauxRemboursementAMO: 70,
    description: 'Protection pulpaire et parodontale immédiate pendant les étapes de fabrication de la prothèse définitive.',
    dureeMinutesEstimee: 20,
    isToothSpecific: true
  },
  {
    id: 'act-protf-07',
    code: 'BR-3CCM',
    nom: 'Bridge 3 Éléments Céramo-Métallique (2 piliers + 1 inter)',
    categorie: 'Prothèses Fixes',
    cotationNgap: 'SPR 150',
    tarifRefDH: 6000,
    baseRemboursementAMO: 3600,
    tauxRemboursementAMO: 70,
    description: 'Remplacement d’une dent manquante par prothèse fixée solidarisée aux dents adjacentes.',
    dureeMinutesEstimee: 60,
    isToothSpecific: true
  },
  {
    id: 'act-protf-08',
    code: 'BR-3ZIRC',
    nom: 'Bridge 3 Éléments Zircone Prettau Haute Résistance',
    categorie: 'Prothèses Fixes',
    cotationNgap: 'SPR 150 + HN',
    tarifRefDH: 8000,
    baseRemboursementAMO: 4000,
    tauxRemboursementAMO: 70,
    description: 'Bridge sans métal à haute résistance mécanique aux fractures pour édentement unitaire.',
    dureeMinutesEstimee: 60,
    isToothSpecific: true
  },
  {
    id: 'act-protf-09',
    code: 'RESCEL-COUR',
    nom: 'Re-scellement de couronne ou bridge décelé',
    categorie: 'Prothèses Fixes',
    cotationNgap: 'SC 5',
    tarifRefDH: 200,
    baseRemboursementAMO: 120,
    tauxRemboursementAMO: 80,
    description: 'Nettoyage de l’intrados, désinfection du moignon et scellement définitif au ciment verre ionomère renforcé.',
    dureeMinutesEstimee: 20,
    isToothSpecific: true
  },
  {
    id: 'act-protf-10',
    code: 'DEMONT-COUR',
    nom: 'Dépose / Découpe d\'une ancienne couronne défectueuse',
    categorie: 'Prothèses Fixes',
    cotationNgap: 'SC 8',
    tarifRefDH: 300,
    baseRemboursementAMO: 180,
    tauxRemboursementAMO: 80,
    description: 'Sectionnement à la fraise carbure de tungstène transmétal pour dépose atraumatique.',
    dureeMinutesEstimee: 25,
    isToothSpecific: true
  },

  // ============================================================================
  // 5. PROTHÈSES AMOVIBLES (STELLITES, RÉSINES & ADJOINTES)
  // ============================================================================
  {
    id: 'act-prota-01',
    code: 'PAC-1',
    nom: 'Prothèse Amovible Complète Unimaxillaire (Résine Rose + 14 Dents)',
    categorie: 'Prothèses Amovibles',
    cotationNgap: 'SPR 105',
    tarifRefDH: 4500,
    baseRemboursementAMO: 2800,
    tauxRemboursementAMO: 70,
    description: 'Appareil dentier complet haut ou bas en résine thermo-polymérisée avec montage personnalisé et prise d\'occlusion.',
    dureeMinutesEstimee: 45,
    isToothSpecific: false
  },
  {
    id: 'act-prota-02',
    code: 'PAC-2',
    nom: 'Prothèse Amovible Complète Bi-Maxillaire (Haut + Bas complets)',
    categorie: 'Prothèses Amovibles',
    cotationNgap: 'SPR 210',
    tarifRefDH: 8500,
    baseRemboursementAMO: 5600,
    tauxRemboursementAMO: 70,
    description: 'Réhabilitation globale de l’édentement total avec enregistrement de la dimension verticale (DVO) et équilibration occlusale.',
    dureeMinutesEstimee: 60,
    isToothSpecific: false
  },
  {
    id: 'act-prota-03',
    code: 'STEL-13',
    nom: 'Stellite Métallique Cobalt-Chrome (1 à 3 dents avec crochets)',
    categorie: 'Prothèses Amovibles',
    cotationNgap: 'SPR 75',
    tarifRefDH: 3500,
    baseRemboursementAMO: 2000,
    tauxRemboursementAMO: 70,
    description: 'Châssis métallique fin coulé sur mesure assurant légèreté, transmission des forces et préservation parodontale.',
    dureeMinutesEstimee: 45,
    isToothSpecific: false
  },
  {
    id: 'act-prota-04',
    code: 'STEL-48',
    nom: 'Stellite Métallique Cobalt-Chrome (4 à 8 dents avec crochets)',
    categorie: 'Prothèses Amovibles',
    cotationNgap: 'SPR 95',
    tarifRefDH: 4500,
    baseRemboursementAMO: 2600,
    tauxRemboursementAMO: 70,
    description: 'Prothèse adjointe partielle squelettique avec appuis occlusaux et crochets forgés ou coulés.',
    dureeMinutesEstimee: 45,
    isToothSpecific: false
  },
  {
    id: 'act-prota-05',
    code: 'STEL-COMP',
    nom: 'Stellite Métallique Complexe (> 9 dents ou Édentement Subtotal)',
    categorie: 'Prothèses Amovibles',
    cotationNgap: 'SPR 120',
    tarifRefDH: 5500,
    baseRemboursementAMO: 3200,
    tauxRemboursementAMO: 70,
    description: 'Grande étendue prothétique avec barres linguales ou bandeaux palatins de rigidification.',
    dureeMinutesEstimee: 50,
    isToothSpecific: false
  },
  {
    id: 'act-prota-06',
    code: 'PAP-PROV',
    nom: 'Appareil Provisoire Amovible Résine (1 à 3 dents)',
    categorie: 'Prothèses Amovibles',
    cotationNgap: 'SPR 30',
    tarifRefDH: 1200,
    baseRemboursementAMO: 700,
    tauxRemboursementAMO: 70,
    description: 'Prothèse immédiate de transition après extraction en attente de cicatrisation tissulaire.',
    dureeMinutesEstimee: 30,
    isToothSpecific: false
  },
  {
    id: 'act-prota-07',
    code: 'REBAS-PAC',
    nom: 'Rebasage complet d\'une prothèse amovible (Résine dure/souple)',
    categorie: 'Prothèses Amovibles',
    cotationNgap: 'SPR 35',
    tarifRefDH: 900,
    baseRemboursementAMO: 500,
    tauxRemboursementAMO: 70,
    description: 'Correction de l\'adaptation de l\'intrados suite à la résorption osseuse physiologique de la crête.',
    dureeMinutesEstimee: 30,
    isToothSpecific: false
  },
  {
    id: 'act-prota-08',
    code: 'REP-APP',
    nom: 'Réparation simple de prothèse amovible ou Adjonction de dent',
    categorie: 'Prothèses Amovibles',
    cotationNgap: 'SPR 15',
    tarifRefDH: 400,
    baseRemboursementAMO: 250,
    tauxRemboursementAMO: 80,
    description: 'Soudure de fracture de résine ou rescellement d\'un crochet métallique rompu.',
    dureeMinutesEstimee: 20,
    isToothSpecific: false
  },

  // ============================================================================
  // 6. IMPLANTOLOGIE & CHIRURGIE PRÉ-IMPLANTAIRE
  // ============================================================================
  {
    id: 'act-imp-01',
    code: 'IMP-TITANE',
    nom: 'Pose d\'un Implant Dentaire Titane Ostéo-Intégré (Grade V SLA)',
    categorie: 'Implantologie',
    cotationNgap: 'HN',
    tarifRefDH: 6000,
    baseRemboursementAMO: 0,
    tauxRemboursementAMO: 0,
    description: 'Pose chirurgicale stérile sous anesthésie locale d\'un implant dentaire haut de gamme avec traçabilité et passeport implantaire.',
    dureeMinutesEstimee: 60,
    isToothSpecific: true
  },
  {
    id: 'act-imp-02',
    code: 'IMP-ZIRC',
    nom: 'Pose d\'un Implant Céramique Zircone 100% Sans Métal',
    categorie: 'Implantologie',
    cotationNgap: 'HN',
    tarifRefDH: 8000,
    baseRemboursementAMO: 0,
    tauxRemboursementAMO: 0,
    description: 'Implantologie céramique blanche hypoallergénique garantissant un attachement gingival optimal en zone antérieure esthétique.',
    dureeMinutesEstimee: 60,
    isToothSpecific: true
  },
  {
    id: 'act-imp-03',
    code: 'VIS-CICAT',
    nom: 'Vis de cicatrisation & Dégagement deuxième temps chirurgical',
    categorie: 'Implantologie',
    cotationNgap: 'HN',
    tarifRefDH: 500,
    baseRemboursementAMO: 0,
    tauxRemboursementAMO: 0,
    description: 'Mise en place de la vis de conformation gingivale après ostéo-intégration de 3 à 6 mois.',
    dureeMinutesEstimee: 20,
    isToothSpecific: true
  },
  {
    id: 'act-imp-04',
    code: 'PILIER-IMP',
    nom: 'Pilier implantaire Titane ou Zircone personnalisé CAO/CFAO',
    categorie: 'Implantologie',
    cotationNgap: 'HN',
    tarifRefDH: 1500,
    baseRemboursementAMO: 0,
    tauxRemboursementAMO: 0,
    description: 'Connecteur usiné sur mesure avec profil d\'émergence anatomique adapté à la gencive du patient.',
    dureeMinutesEstimee: 30,
    isToothSpecific: true
  },
  {
    id: 'act-imp-05',
    code: 'COUR-SUR-IMP',
    nom: 'Couronne Zircone / Céramique transvissée sur implant',
    categorie: 'Implantologie',
    cotationNgap: 'HN + SPR50',
    tarifRefDH: 3800,
    baseRemboursementAMO: 1200,
    tauxRemboursementAMO: 70,
    description: 'Restauration finale transvissée serrée au couple dynamométrique prescrit par le fabricant.',
    dureeMinutesEstimee: 45,
    isToothSpecific: true
  },
  {
    id: 'act-imp-06',
    code: 'GREFFE-OS',
    nom: 'Greffe osseuse d\'apposition / Comblement bio-matériaux (Bio-Oss)',
    categorie: 'Implantologie',
    cotationNgap: 'HN',
    tarifRefDH: 3500,
    baseRemboursementAMO: 0,
    tauxRemboursementAMO: 0,
    description: 'Régénération Osseuse Guidée (ROG) avec biomatériau xénogénique et membrane résorbable en collagène.',
    dureeMinutesEstimee: 60,
    isToothSpecific: true
  },
  {
    id: 'act-imp-07',
    code: 'SINUS-LIFT-LAT',
    nom: 'Comblement de Sinus Maxillaire par abord latéral (Sinus Lift)',
    categorie: 'Implantologie',
    cotationNgap: 'HN',
    tarifRefDH: 6500,
    baseRemboursementAMO: 0,
    tauxRemboursementAMO: 0,
    description: 'Élévation de la membrane sinusienne de Schneider et comblement osseux pour permettre la pose d\'implants en secteur postérieur supérieur.',
    dureeMinutesEstimee: 75,
    isToothSpecific: true
  },
  {
    id: 'act-imp-08',
    code: 'SINUS-CREST',
    nom: 'Élévation sinusienne crestale fermée aux ostéotomes (Summers)',
    categorie: 'Implantologie',
    cotationNgap: 'HN',
    tarifRefDH: 3500,
    baseRemboursementAMO: 0,
    tauxRemboursementAMO: 0,
    description: 'Technique mini-invasive trans-alvéolaire simultanée au forage implantaire.',
    dureeMinutesEstimee: 45,
    isToothSpecific: true
  },
  {
    id: 'act-imp-09',
    code: 'GUIDE-CHIR-3D',
    nom: 'Guide chirurgical 3D pour chirurgie guidée assistée par ordinateur',
    categorie: 'Implantologie',
    cotationNgap: 'HN',
    tarifRefDH: 2000,
    baseRemboursementAMO: 0,
    tauxRemboursementAMO: 0,
    description: 'Impression 3D résine biocompatible issue de la fusion CBCT / Scan intra-oral pour une précision millimétrique de forage.',
    dureeMinutesEstimee: 30,
    isToothSpecific: false
  },

  // ============================================================================
  // 7. PARODONTOLOGIE, HYGIÈNE & DÉTARTRAGE
  // ============================================================================
  {
    id: 'act-paro-01',
    code: 'DET-BI',
    nom: 'Détartrage supra-gingival et polissage bi-maxillaire complet',
    categorie: 'Parodontologie',
    cotationNgap: 'SC 12',
    tarifRefDH: 400,
    baseRemboursementAMO: 300,
    tauxRemboursementAMO: 80,
    description: 'Élimination du tartre et de la plaque bactérienne aux ultrasons piézoélectriques suivie d\'un polissage prophylactique au fluor.',
    dureeMinutesEstimee: 30,
    isToothSpecific: false
  },
  {
    id: 'act-paro-02',
    code: 'DET-AERO',
    nom: 'Détartrage profond & Aéropolissage à la glycine / érythritol',
    categorie: 'Parodontologie',
    cotationNgap: 'SC 15 + HN',
    tarifRefDH: 600,
    baseRemboursementAMO: 350,
    tauxRemboursementAMO: 70,
    description: 'Nettoyage des colorations tenaces (café, tabac) et désorganisation du biofilm sans rayer l’émail ni les céramiques.',
    dureeMinutesEstimee: 40,
    isToothSpecific: false
  },
  {
    id: 'act-paro-03',
    code: 'SURFAC-SEXT',
    nom: 'Surfaçage radiculaire / Débridement parodontal sous-gingival (par sextant)',
    categorie: 'Parodontologie',
    cotationNgap: 'HN / SC18',
    tarifRefDH: 500,
    baseRemboursementAMO: 300,
    tauxRemboursementAMO: 70,
    description: 'Curetage doux du cément nécrosé et des poches parodontales aux curettes Gracey spécifiques sous anesthésie.',
    dureeMinutesEstimee: 40,
    isToothSpecific: false
  },
  {
    id: 'act-paro-04',
    code: 'BIL-PARO',
    nom: 'Bilan et Sondage parodontal complet informatisé (Chart 6 points)',
    categorie: 'Parodontologie',
    cotationNgap: 'HN',
    tarifRefDH: 400,
    baseRemboursementAMO: 0,
    tauxRemboursementAMO: 0,
    description: 'Cartographie détaillée des profondeurs de poches, récessions gingivales, mobilités dentaires et saignements au sondage (BOP).',
    dureeMinutesEstimee: 35,
    isToothSpecific: false
  },
  {
    id: 'act-paro-05',
    code: 'LASER-PARO',
    nom: 'Décontamination des poches parodontales au Laser Diode',
    categorie: 'Parodontologie',
    cotationNgap: 'HN',
    tarifRefDH: 800,
    baseRemboursementAMO: 0,
    tauxRemboursementAMO: 0,
    description: 'Stérilisation photo-thermique non invasive éliminant les bactéries parodonto-pathogènes anaerobies (P. gingivalis).',
    dureeMinutesEstimee: 30,
    isToothSpecific: false
  },
  {
    id: 'act-paro-06',
    code: 'GREF-GEN',
    nom: 'Greffe de gencive conjonctive / Épithélio-conjonctive',
    categorie: 'Parodontologie',
    cotationNgap: 'DC 25',
    tarifRefDH: 2500,
    baseRemboursementAMO: 1200,
    tauxRemboursementAMO: 70,
    description: 'Prélèvement au palais et greffe sur récession gingivale pour stopper le déchaussement et traiter l’hypersensibilité.',
    dureeMinutesEstimee: 60,
    isToothSpecific: true
  },
  {
    id: 'act-paro-07',
    code: 'GINGIV-ESTH',
    nom: 'Gingivectomie / Plastie gingivale esthétique au laser',
    categorie: 'Parodontologie',
    cotationNgap: 'DC 12',
    tarifRefDH: 800,
    baseRemboursementAMO: 400,
    tauxRemboursementAMO: 70,
    description: 'Harmonisation des collets gingivaux et correction du sourire gingival (Gummy Smile).',
    dureeMinutesEstimee: 30,
    isToothSpecific: false
  },
  {
    id: 'act-paro-08',
    code: 'VERNIS-FLUOR',
    nom: 'Application de vernis désensibilisant fluoré (Duraphat)',
    categorie: 'Parodontologie',
    cotationNgap: 'SC 6',
    tarifRefDH: 200,
    baseRemboursementAMO: 120,
    tauxRemboursementAMO: 80,
    description: 'Occlusion des canalicules dentinaires dénudés pour éliminer les douleurs au chaud et au froid.',
    dureeMinutesEstimee: 15,
    isToothSpecific: false
  },

  // ============================================================================
  // 8. ORTHODONTIE & ALIGNEURS INVISIBLES (ODF)
  // ============================================================================
  {
    id: 'act-odf-01',
    code: 'BIL-ODF',
    nom: 'Bilan Orthodontique Complet (Photos, Moulages & Céphalométrie)',
    categorie: 'Orthodontie & ODF',
    cotationNgap: 'TO 15',
    tarifRefDH: 600,
    baseRemboursementAMO: 400,
    tauxRemboursementAMO: 80,
    description: 'Diagnostic orthodontique approfondi avec analyse faciale, tracé céphalométrique et plan de traitement individualisé.',
    dureeMinutesEstimee: 45,
    isToothSpecific: false
  },
  {
    id: 'act-odf-02',
    code: 'ALIGN-INV',
    nom: 'Traitement Aligneurs Invisibles (Gouttières transparentes complètes)',
    categorie: 'Orthodontie & ODF',
    cotationNgap: 'HN / TO',
    tarifRefDH: 18000,
    baseRemboursementAMO: 4000,
    tauxRemboursementAMO: 70,
    description: 'Traitement d\'alignement orthodontique esthétique complet par série de gouttières thermoformées amovibles transparentes.',
    dureeMinutesEstimee: 45,
    isToothSpecific: false
  },
  {
    id: 'act-odf-03',
    code: 'ODF-MET',
    nom: 'Appareillage Multi-Attaches Métallique Bi-Maxillaire',
    categorie: 'Orthodontie & ODF',
    cotationNgap: 'TO 90',
    tarifRefDH: 12000,
    baseRemboursementAMO: 6000,
    tauxRemboursementAMO: 80,
    description: 'Pose de bagues métalliques auto-ligaturantes haut et bas pour correction des malocclusions.',
    dureeMinutesEstimee: 75,
    isToothSpecific: false
  },
  {
    id: 'act-odf-04',
    code: 'ODF-CERAM',
    nom: 'Appareillage Multi-Attaches Céramique / Saphir Esthétique',
    categorie: 'Orthodontie & ODF',
    cotationNgap: 'TO 90 + HN',
    tarifRefDH: 16000,
    baseRemboursementAMO: 6000,
    tauxRemboursementAMO: 70,
    description: 'Brackets discrets en céramique translucide assortis à la teinte naturelle des dents.',
    dureeMinutesEstimee: 75,
    isToothSpecific: false
  },
  {
    id: 'act-odf-05',
    code: 'SEANC-ODF',
    nom: 'Séance de contrôle / Activation mensuelle d\'orthodontie',
    categorie: 'Orthodontie & ODF',
    cotationNgap: 'TO 10',
    tarifRefDH: 400,
    baseRemboursementAMO: 300,
    tauxRemboursementAMO: 80,
    description: 'Changement d’arc nickel-titane / acier, ajustement des ligatures et suivi des déplacements dentaires.',
    dureeMinutesEstimee: 20,
    isToothSpecific: false
  },
  {
    id: 'act-odf-06',
    code: 'DISJONCT-MAX',
    nom: 'Disjoncteur Palatin Maxillaire Rapide (Expansion transversale)',
    categorie: 'Orthodontie & ODF',
    cotationNgap: 'TO 30',
    tarifRefDH: 3500,
    baseRemboursementAMO: 1800,
    tauxRemboursementAMO: 70,
    description: 'Appareil orthopédique scellé pour élargir le palais étroit chez l\'enfant en croissance.',
    dureeMinutesEstimee: 40,
    isToothSpecific: false
  },
  {
    id: 'act-odf-07',
    code: 'CONT-FIXE',
    nom: 'Contention orthodontique fixe (Fil lingual collé par arcade)',
    categorie: 'Orthodontie & ODF',
    cotationNgap: 'TO 15',
    tarifRefDH: 1200,
    baseRemboursementAMO: 600,
    tauxRemboursementAMO: 70,
    description: 'Collage d\'un fil de rétention tressé en acier chirurgical face interne des dents antérieures pour stabiliser les résultats.',
    dureeMinutesEstimee: 30,
    isToothSpecific: false
  },
  {
    id: 'act-odf-08',
    code: 'GOUT-CONT',
    nom: 'Gouttière thermoformée de contention nocturne Essix',
    categorie: 'Orthodontie & ODF',
    cotationNgap: 'TO 10',
    tarifRefDH: 800,
    baseRemboursementAMO: 400,
    tauxRemboursementAMO: 70,
    description: 'Gouttière transparente de maintien post-traitement.',
    dureeMinutesEstimee: 20,
    isToothSpecific: false
  },

  // ============================================================================
  // 9. ESTHÉTIQUE DENTAIRE, BLANCHIMENT & OCCLUSION
  // ============================================================================
  {
    id: 'act-esth-01',
    code: 'BLANCH-FAUTEUIL',
    nom: 'Éclaircissement dentaire au fauteuil par Lampe LED Bleue',
    categorie: 'Esthétique & Blanchiment',
    cotationNgap: 'HN',
    tarifRefDH: 2500,
    baseRemboursementAMO: 0,
    tauxRemboursementAMO: 0,
    description: 'Application de gel de peroxyde d\'hydrogène à haute concentration activé par lumière LED froide pour gagner 4 à 8 teintes en 1h.',
    dureeMinutesEstimee: 60,
    isToothSpecific: false
  },
  {
    id: 'act-esth-02',
    code: 'BLANCH-AMBUL',
    nom: 'Blanchiment ambulatoire à domicile (Gouttières + 4 seringues)',
    categorie: 'Esthétique & Blanchiment',
    cotationNgap: 'HN',
    tarifRefDH: 1800,
    baseRemboursementAMO: 0,
    tauxRemboursementAMO: 0,
    description: 'Kit sur-mesure au peroxyde de carbamide 16% à porter la nuit pendant 10 à 14 jours.',
    dureeMinutesEstimee: 30,
    isToothSpecific: false
  },
  {
    id: 'act-esth-03',
    code: 'GOUT-BRUX',
    nom: 'Gouttière occlusale de déprogrammation / Anti-Bruxisme Michigan',
    categorie: 'Esthétique & Blanchiment',
    cotationNgap: 'HN / SPR 40',
    tarifRefDH: 1500,
    baseRemboursementAMO: 800,
    tauxRemboursementAMO: 70,
    description: 'Gouttière rigide en résine transparente pour protéger les dents de l’usure nocturne et soulager l’articulation temporo-mandibulaire (ATM).',
    dureeMinutesEstimee: 35,
    isToothSpecific: false
  },
  {
    id: 'act-esth-04',
    code: 'EQUIL-OCC',
    nom: 'Analyse & Équilibration occlusale par meulage sélectif',
    categorie: 'Esthétique & Blanchiment',
    cotationNgap: 'SC 10',
    tarifRefDH: 400,
    baseRemboursementAMO: 250,
    tauxRemboursementAMO: 80,
    description: 'Suppression des prématurités et interférences occlusales au papier d\'articulé.',
    dureeMinutesEstimee: 25,
    isToothSpecific: false
  },

  // ============================================================================
  // 10. IMAGERIE & RADIOLOGIE NUMÉRIQUE DENTAIRE
  // ============================================================================
  {
    id: 'act-rad-01',
    code: 'RVG-RETRO',
    nom: 'Radiographie Rétro-Alvéolaire Numérique Haute Résolution RVG',
    categorie: 'Imagerie & Radio',
    cotationNgap: 'Z 6',
    tarifRefDH: 80,
    baseRemboursementAMO: 60,
    tauxRemboursementAMO: 80,
    description: 'Cliché intra-oral numérique instantané à très faible dose de rayons X pour diagnostic carieux ou périapical ciblé.',
    dureeMinutesEstimee: 5,
    isToothSpecific: true
  },
  {
    id: 'act-rad-02',
    code: 'BILAN-LONG-CONE',
    nom: 'Bilan Rétro-Alvéolaire Complet Long Cône (Status 14 clichés)',
    categorie: 'Imagerie & Radio',
    cotationNgap: 'Z 40',
    tarifRefDH: 600,
    baseRemboursementAMO: 450,
    tauxRemboursementAMO: 80,
    description: 'Cartographie radiologique intégrale des arcades dentaires.',
    dureeMinutesEstimee: 25,
    isToothSpecific: false
  },
  {
    id: 'act-rad-03',
    code: 'PANO-2D',
    nom: 'Radiographie Panoramique Numérique Dentaire (Orthopantomogramme)',
    categorie: 'Imagerie & Radio',
    cotationNgap: 'Z 15',
    tarifRefDH: 250,
    baseRemboursementAMO: 200,
    tauxRemboursementAMO: 80,
    description: 'Vue d’ensemble des maxillaires, sinus, ATM et germes des dents de sagesse.',
    dureeMinutesEstimee: 10,
    isToothSpecific: false
  },
  {
    id: 'act-rad-04',
    code: 'TELERAD-CRANE',
    nom: 'Téléradiographie du crâne de profil avec analyse céphalométrique',
    categorie: 'Imagerie & Radio',
    cotationNgap: 'Z 18',
    tarifRefDH: 250,
    baseRemboursementAMO: 200,
    tauxRemboursementAMO: 80,
    description: 'Cliché téléradiographique standardisé pour bilan d’orthodontie.',
    dureeMinutesEstimee: 10,
    isToothSpecific: false
  },
  {
    id: 'act-rad-05',
    code: 'CBCT-SECT',
    nom: 'Scanner 3D Cone Beam CBCT Sectoriel (Champ réduit 5x5 cm)',
    categorie: 'Imagerie & Radio',
    cotationNgap: 'HN / Scanner',
    tarifRefDH: 600,
    baseRemboursementAMO: 400,
    tauxRemboursementAMO: 70,
    description: 'Tomographie volumique 3D haute définition pour planification implantaire ou recherche de canal accessoire.',
    dureeMinutesEstimee: 15,
    isToothSpecific: true
  },
  {
    id: 'act-rad-06',
    code: 'CBCT-BIMAX',
    nom: 'Scanner 3D Cone Beam CBCT Bi-Maxillaire Complet (12x10 cm)',
    categorie: 'Imagerie & Radio',
    cotationNgap: 'HN / Scanner',
    tarifRefDH: 1000,
    baseRemboursementAMO: 600,
    tauxRemboursementAMO: 70,
    description: 'Reconstruction 3D globale des deux mâchoires pour cas d\'implantologie complexe ou chirurgie maxillo-faciale.',
    dureeMinutesEstimee: 20,
    isToothSpecific: false
  },

  // ============================================================================
  // 11. URGENCES, PÉDODONTIE & PRÉVENTION
  // ============================================================================
  {
    id: 'act-urg-01',
    code: 'URG-DENT',
    nom: 'Consultation bucco-dentaire d\'urgence non programmée',
    categorie: 'Urgences & Pédodontie',
    cotationNgap: 'C + URG',
    tarifRefDH: 300,
    baseRemboursementAMO: 200,
    tauxRemboursementAMO: 80,
    description: 'Prise en charge prioritaire d\'un traumatisme, hémorragie, cellulite ou douleur aiguë.',
    dureeMinutesEstimee: 25,
    isToothSpecific: false
  },
  {
    id: 'act-urg-02',
    code: 'PANS-SED',
    nom: 'Pansement sédatif à l\'Eugénol / Oxyde de zinc',
    categorie: 'Urgences & Pédodontie',
    cotationNgap: 'SC 5',
    tarifRefDH: 150,
    baseRemboursementAMO: 100,
    tauxRemboursementAMO: 80,
    description: 'Obturation temporaire antalgique calmant l\'inflammation pulpaire.',
    dureeMinutesEstimee: 15,
    isToothSpecific: true
  },
  {
    id: 'act-urg-03',
    code: 'HEMOST-CHIR',
    nom: 'Hémostase alvéolaire post-extractionnelle avec colle biologique / Surgicel',
    categorie: 'Urgences & Pédodontie',
    cotationNgap: 'DC 4',
    tarifRefDH: 200,
    baseRemboursementAMO: 150,
    tauxRemboursementAMO: 80,
    description: 'Traitement d\'un saignement alvéolaire persistant avec éponge résorbable et point en X.',
    dureeMinutesEstimee: 20,
    isToothSpecific: true
  },
  {
    id: 'act-urg-04',
    code: 'REIMP-DENT',
    nom: 'Réimplantation & Contention d\'une dent expulsée luxée',
    categorie: 'Urgences & Pédodontie',
    cotationNgap: 'DC 20',
    tarifRefDH: 1200,
    baseRemboursementAMO: 800,
    tauxRemboursementAMO: 80,
    description: 'Repositionnement d\'urgence de la dent traumatisée dans son alvéole et fixation par attelle flexible composite.',
    dureeMinutesEstimee: 45,
    isToothSpecific: true
  },
  {
    id: 'act-urg-05',
    code: 'PULP-LAIT',
    nom: 'Pulpotomie sur dent temporaire (Dent de lait pédiatrique)',
    categorie: 'Urgences & Pédodontie',
    cotationNgap: 'SC 10',
    tarifRefDH: 300,
    baseRemboursementAMO: 220,
    tauxRemboursementAMO: 100,
    description: 'Traitement de la carie profonde de la molaire temporaire avec conservation de la vitalité des racines.',
    dureeMinutesEstimee: 25,
    isToothSpecific: true
  },
  {
    id: 'act-urg-06',
    code: 'EXT-LAIT',
    nom: 'Extraction simple d\'une dent de lait mobile ou nécrosée',
    categorie: 'Urgences & Pédodontie',
    cotationNgap: 'DC',
    tarifRefDH: 200,
    baseRemboursementAMO: 150,
    tauxRemboursementAMO: 100,
    description: 'Avulsion douce sous anesthésie de contact et locale.',
    dureeMinutesEstimee: 15,
    isToothSpecific: true
  },
  {
    id: 'act-urg-07',
    code: 'MAINT-ESPACE',
    nom: 'Mainteneur d\'espace pédodontique fixe unilatéral (Bague + Boucle)',
    categorie: 'Urgences & Pédodontie',
    cotationNgap: 'TO 15',
    tarifRefDH: 800,
    baseRemboursementAMO: 500,
    tauxRemboursementAMO: 80,
    description: 'Maintien de l’espace nécessaire à l’éruption de la prémolaire définitive après perte prématurée d’une molaire de lait.',
    dureeMinutesEstimee: 30,
    isToothSpecific: true
  }
];

export const DENTAL_ACT_CATEGORIES: DentalActCategory[] = [
  'Soins Conservateurs',
  'Endodontie',
  'Chirurgie & Extractions',
  'Prothèses Fixes',
  'Prothèses Amovibles',
  'Implantologie',
  'Parodontologie',
  'Orthodontie & ODF',
  'Esthétique & Blanchiment',
  'Imagerie & Radio',
  'Urgences & Pédodontie'
];

// 32 Dents adultes selon la nomenclature internationale FDI
export const FDI_ADULT_TEETH_QUADRANTS = {
  q1: [18, 17, 16, 15, 14, 13, 12, 11], // Maxillaire Supérieur Droit
  q2: [21, 22, 23, 24, 25, 26, 27, 28], // Maxillaire Supérieur Gauche
  q4: [48, 47, 46, 45, 44, 43, 42, 41], // Mandibulaire Inférieur Droit
  q3: [31, 32, 33, 34, 35, 36, 37, 38]  // Mandibulaire Inférieur Gauche
};

// 20 Dents temporaires (dents de lait pédiatriques)
export const FDI_DECIDUOUS_TEETH_QUADRANTS = {
  q5: [55, 54, 53, 52, 51], // Supérieur Droit
  q6: [61, 62, 63, 64, 65], // Supérieur Gauche
  q8: [85, 84, 83, 82, 81], // Inférieur Droit
  q7: [71, 72, 73, 74, 75]  // Inférieur Gauche
};

export const TOOTH_NAMES: Record<number, string> = {
  // Quadrant 1 (Haut Droit)
  18: '3e Molaire / Dent de Sagesse Sup. Dte',
  17: '2e Molaire Supérieure Droite',
  16: '1re Molaire Supérieure Droite (Dent de 6 ans)',
  15: '2e Prémolaire Supérieure Droite',
  14: '1re Prémolaire Supérieure Droite',
  13: 'Canine Supérieure Droite',
  12: 'Incisive Latérale Supérieure Droite',
  11: 'Incisive Centrale Supérieure Droite',

  // Quadrant 2 (Haut Gauche)
  21: 'Incisive Centrale Supérieure Gauche',
  22: 'Incisive Latérale Supérieure Gauche',
  23: 'Canine Supérieure Gauche',
  24: '1re Prémolaire Supérieure Gauche',
  25: '2e Prémolaire Supérieure Gauche',
  26: '1re Molaire Supérieure Gauche (Dent de 6 ans)',
  27: '2e Molaire Supérieure Gauche',
  28: '3e Molaire / Dent de Sagesse Sup. Gche',

  // Quadrant 3 (Bas Gauche)
  31: 'Incisive Centrale Inférieure Gauche',
  32: 'Incisive Latérale Inférieure Gauche',
  33: 'Canine Inférieure Gauche',
  34: '1re Prémolaire Inférieure Gauche',
  35: '2e Prémolaire Inférieure Gauche',
  36: '1re Molaire Inférieure Gauche (Dent de 6 ans)',
  37: '2e Molaire Inférieure Gauche',
  38: '3e Molaire / Dent de Sagesse Inf. Gche',

  // Quadrant 4 (Bas Droit)
  41: 'Incisive Centrale Inférieure Droite',
  42: 'Incisive Latérale Inférieure Droite',
  43: 'Canine Inférieure Droite',
  44: '1re Prémolaire Inférieure Droite',
  45: '2e Prémolaire Inférieure Droite',
  46: '1re Molaire Inférieure Droite (Dent de 6 ans)',
  47: '2e Molaire Inférieure Droite',
  48: '3e Molaire / Dent de Sagesse Inf. Dte',

  // Dents de lait (51-85)
  51: 'Incisive Centrale de Lait Sup. Dte',
  52: 'Incisive Latérale de Lait Sup. Dte',
  53: 'Canine de Lait Sup. Dte',
  54: '1re Molaire de Lait Sup. Dte',
  55: '2e Molaire de Lait Sup. Dte',
  61: 'Incisive Centrale de Lait Sup. Gche',
  62: 'Incisive Latérale de Lait Sup. Gche',
  63: 'Canine de Lait Sup. Gche',
  64: '1re Molaire de Lait Sup. Gche',
  65: '2e Molaire de Lait Sup. Gche',
  71: 'Incisive Centrale de Lait Inf. Gche',
  72: 'Incisive Latérale de Lait Inf. Gche',
  73: 'Canine de Lait Inf. Gche',
  74: '1re Molaire de Lait Inf. Gche',
  75: '2e Molaire de Lait Inf. Gche',
  81: 'Incisive Centrale de Lait Inf. Dte',
  82: 'Incisive Latérale de Lait Inf. Dte',
  83: 'Canine de Lait Inf. Dte',
  84: '1re Molaire de Lait Inf. Dte',
  85: '2e Molaire de Lait Inf. Dte'
};

// Preset standard pour initialiser l'odontogramme d'un patient
export const createDefaultOdontogram = (): Record<number, DentalToothState> => {
  const chart: Record<number, DentalToothState> = {};
  const allTeeth = [
    ...FDI_ADULT_TEETH_QUADRANTS.q1,
    ...FDI_ADULT_TEETH_QUADRANTS.q2,
    ...FDI_ADULT_TEETH_QUADRANTS.q3,
    ...FDI_ADULT_TEETH_QUADRANTS.q4
  ];

  allTeeth.forEach((num) => {
    chart[num] = {
      number: num,
      condition: 'saine',
      surfaces: [],
      periodontalPocketDepthMm: 2,
      bleedingOnProbing: false,
      mobility: 0
    };
  });

  return chart;
};

// Prescription types prêtes pour le dentiste
export const DENTAL_QUICK_PRESCRIPTIONS = [
  {
    id: 'pack-douleur-aigue',
    titre: 'Pack Douleur Pulpaire Aiguë / Rage de Dent',
    indication: 'Pulpite irréversible ou parodontite apicale aiguë',
    medicaments: [
      {
        medicament: 'Paracétamol / Codéine 500mg/30mg',
        dosage: '1 comprimé',
        posologie: '1 comprimé toutes les 6 heures si douleur vive (Max 4/jour)',
        duree: '4 jours',
        instructions: 'À prendre pendant les repas. Ne pas associer à d\'autres paracétamols.'
      },
      {
        medicament: 'Ibuprofène 400mg (AINS)',
        dosage: '400 mg',
        posologie: '1 comprimé 3 fois par jour au milieu des repas',
        duree: '3 jours',
        instructions: 'Toujours au cours du repas. Contre-indiqué si ulcère gastrique ou grossesse.'
      }
    ]
  },
  {
    id: 'pack-chirurgie-lourde',
    titre: 'Pack Post-Chirurgie Orale & Implantologie',
    indication: 'Avulsion dent de sagesse, implant, sinus lift ou résection',
    medicaments: [
      {
        medicament: 'Amoxicilline 1g (ou Clamoxyl)',
        dosage: '1 g',
        posologie: '1 comprimé matin et soir (1x2/j)',
        duree: '6 jours',
        instructions: 'À prendre au début des repas, terminer impérativement le traitement antibiotique.'
      },
      {
        medicament: 'Bi-Profenid 100mg (Kétoprofène LP)',
        dosage: '100 mg',
        posologie: '1 comprimé matin et soir au cours du repas',
        duree: '4 jours',
        instructions: 'Anti-inflammatoire puissant pour réduire l\'œdème post-opératoire.'
      },
      {
        medicament: 'Paracétamol 1000mg',
        dosage: '1 g',
        posologie: '1 comprimé toutes les 6h en alternance avec l\'AINS',
        duree: '5 jours',
        instructions: 'En cas de douleur résiduelle.'
      },
      {
        medicament: 'Bain de Bouche Chlorhexidine 0.12% (Eludril / Hextril)',
        dosage: 'Flacon 200ml',
        posologie: 'Bain de bouche 3 fois par jour après brossage',
        duree: '7 jours',
        instructions: 'Commencer 24h après l\'acte chirurgical pour ne pas déloger le caillot sanguin.'
      }
    ]
  },
  {
    id: 'pack-parodontite-abces',
    titre: 'Pack Parodontite Aiguë & Abcès Parodontal',
    indication: 'Infection bactérienne mixte anaérobie / abcès sous-muqueux',
    medicaments: [
      {
        medicament: 'Rodogyl (Spiramycine 1.5 MUI + Métronidazole 250mg)',
        dosage: '1 comprimé',
        posologie: '1 comprimé 3 fois par jour au cours des repas',
        duree: '6 jours',
        instructions: 'Ne pas consommer d\'alcool pendant toute la durée du traitement (effet antabuse).'
      },
      {
        medicament: 'Paracétamol 1000mg',
        dosage: '1000 mg',
        posologie: '1 comprimé toutes les 6 à 8h si douleurs',
        duree: '4 jours',
        instructions: 'Max 3g par jour.'
      },
      {
        medicament: 'Gel gingival Chlorhexidine 0.2% (Elugel / PerioKin)',
        dosage: 'Tube 40ml',
        posologie: 'Application locale au doigt ou à la brossette 3x/jour',
        duree: '10 jours',
        instructions: 'Masser délicatement les gencives enflammées après brossage doux.'
      }
    ]
  },
  {
    id: 'pack-allergie-penicilline',
    titre: 'Pack Antibiothérapie (Allergie Pénicillines)',
    indication: 'Alternative antibiotique en cas d\'allergie confirmée aux bêtalactamines',
    medicaments: [
      {
        medicament: 'Clindamycine 300mg (Dalacine)',
        dosage: '300 mg',
        posologie: '1 gélule matin et soir',
        duree: '6 jours',
        instructions: 'Prendre avec un grand verre d\'eau en position assise.'
      },
      {
        medicament: 'Paracétamol 1000mg',
        dosage: '1 g',
        posologie: '1 comprimé toutes les 6h',
        duree: '4 jours',
        instructions: 'Si douleurs.'
      }
    ]
  }
];
