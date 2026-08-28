import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import {
  Activity,
  Heart,
  Shield,
  Zap,
  Layers,
  Sparkles,
  ChevronUp,
  Stethoscope,
  Eye,
  Baby,
  Smile,
  Brain,
  Bone,
  Flame,
  Radio,
  Cpu,
  Clock,
  CheckCircle2,
  Maximize2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { WorldMedicalLogo } from './WorldMedicalLogo';

export interface MedicalSpecialtyConfig {
  id: string;
  name: string;
  category: string;
  icon: string;
  color: string;
  badgeColor: string;
  description: string;
  specificTools: string[];
}

export const ALL_MEDICAL_SPECIALTIES: MedicalSpecialtyConfig[] = [
  {
    id: 'pediatrie',
    name: 'Pédiatrie & Néonatalogie',
    category: 'Enfance',
    icon: '👶',
    color: 'from-sky-500 to-teal-500',
    badgeColor: 'bg-sky-50 text-sky-700 border-sky-200',
    description: 'Courbes OMS poids/taille/PC, calendrier vaccinal marocain, carnet de santé & dosages pédiatriques par kg.',
    specificTools: ['Courbes de Croissance OMS', 'Calendrier Vaccinal', 'Dosages / kg', 'AeroChamber & Asthme']
  },
  {
    id: 'dentaire',
    name: 'Dentisterie & Chirurgie Dentaire',
    category: 'Odontologie',
    icon: '🦷',
    color: 'from-blue-600 to-cyan-500',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    description: 'Schéma dentaire interactif (Odontogramme), implants, parodontologie, devis prothèses et radiographies panoramiques.',
    specificTools: ['Odontogramme 32 dents', 'Fiches Implants & Devis', 'Ordonnances Antibiotiques', 'Feuilles AMO Soins Dentaires']
  },
  {
    id: 'gynecologie',
    name: 'Gynécologie & Obstétrique',
    category: 'Santé Féminine',
    icon: '🤰',
    color: 'from-rose-500 to-pink-500',
    badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
    description: 'Suivi de grossesse par trimestre, calcul du terme (DPA/SA), biométrie fœtale, frottis FCU et bilans de fertilité.',
    specificTools: ['Calculateur SA & DPA', 'Biométrie Échographique', 'Suivi Frottis & Mammographie', 'Dossier Maternité']
  },
  {
    id: 'ophtalmologie',
    name: 'Ophtalmologie & Réfraction',
    category: 'Vision',
    icon: '👁️',
    color: 'from-indigo-600 to-blue-500',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    description: 'Acuité visuelle Monoyer & Parinaud, réfraction subjective, tonométrie (PIO), fond d’œil et prescriptions de verres/lentilles.',
    specificTools: ['Réfraction OD/OG & Verres', 'Tension Oculaire (PIO)', 'Fond d\'œil & Rétine', 'Ordonnance Lunettes']
  },
  {
    id: 'generale',
    name: 'Médecine Générale & Interne',
    category: 'Soins Primaires',
    icon: '🩺',
    color: 'from-blue-700 to-indigo-600',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    description: 'Dossier médical complet, ALD/ALC 100%, bilan diabète & HTA, dépistage et coordination des soins spécialistes.',
    specificTools: ['Bilan HTA & Diabète', 'Suivi ALD 100% AMO', 'Calculateur IMC & Risque CV', 'Ordonnances Sécurisées']
  },
  {
    id: 'cardiologie',
    name: 'Cardiologie & Angiologie',
    category: 'Cardio-Vasculaire',
    icon: '🫀',
    color: 'from-red-600 to-rose-600',
    badgeColor: 'bg-red-50 text-red-700 border-red-200',
    description: 'Enregistrement ECG, fraction d’éjection (FEVG), score SCORE2, écho-Doppler vasculaire et bilans d’anticoagulation (INR).',
    specificTools: ['Télémétrie ECG & Rythme', 'Suivi INR & AVK', 'Écho-Doppler Vasculaire', 'Calculateur SCORE2']
  },
  {
    id: 'neurologie',
    name: 'Neurologie & Neurochirurgie',
    category: 'Neurosciences',
    icon: '🧠',
    color: 'from-purple-600 to-indigo-600',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
    description: 'Score de Glasgow, échelles MMS & EDSS, suivi migraines, épilepsies, neuropathies et bilans EEG.',
    specificTools: ['Échelle de Glasgow & MMS', 'Protocole Crises Épilepsie', 'Bilan Migraines & Céphalées', 'Tracés EEG']
  },
  {
    id: 'orthopedie',
    name: 'Traumatologie & Orthopédie',
    category: 'Appareil Locomoteur',
    icon: '🦴',
    color: 'from-amber-600 to-orange-500',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
    description: 'Goniométrie articulaire, fiches d’infiltrations, protocoles post-opératoires, plâtres et certificats d’accidents de travail.',
    specificTools: ['Goniométrie & Mobilité', 'Fiche Infiltration & PRP', 'Certificats AT / ITT', 'Imagerie Radio & IRM']
  },
  {
    id: 'dermatologie',
    name: 'Dermatologie & Vénérologie',
    category: 'Dermatologie',
    icon: '🌿',
    color: 'from-emerald-600 to-teal-600',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    description: 'Cartographie des nævus (dermoscopie), échelle PASI (psoriasis), biopsies cutanées et préparations magistrales dermatologiques.',
    specificTools: ['Cartographie Dermoscopique', 'Score PASI / SCORAD', 'Préparations Magistrales', 'Fiches Biopsies']
  },
  {
    id: 'orl',
    name: 'O.R.L. & Chirurgie Cervico-Faciale',
    category: 'ORL',
    icon: '👂',
    color: 'from-teal-600 to-cyan-600',
    badgeColor: 'bg-teal-50 text-teal-700 border-teal-200',
    description: 'Audiogramme tonal & vocal, tympanométrie, vidéofibroscopie des cordes vocales et bilans de vertiges (VNG).',
    specificTools: ['Tracé Audiogramme dB', 'Fibroscopie ORL', 'Bilan Vertiges & Manœuvres', 'Dépistage Auditif']
  },
  {
    id: 'endocrinologie',
    name: 'Endocrinologie & Nutrition',
    category: 'Métabolisme',
    icon: '🥗',
    color: 'from-lime-600 to-emerald-600',
    badgeColor: 'bg-lime-50 text-lime-700 border-lime-200',
    description: 'Courbes HbA1c, surveillance de la thyroïde (TSH/T4), métabolisme de base et plans diététiques sur-mesure.',
    specificTools: ['Suivi HbA1c & Glycémie', 'Échographie Thyroïdienne', 'Plan Nutritionnel Personnalisé', 'Bilans Hormonaux']
  },
  {
    id: 'psychiatrie',
    name: 'Psychiatrie & Pédopsychiatrie',
    category: 'Santé Mentale',
    icon: '🧘',
    color: 'from-violet-600 to-purple-600',
    badgeColor: 'bg-violet-50 text-violet-700 border-violet-200',
    description: 'Échelles PHQ-9 (dépression), GAD-7 (anxiété), dossiers de psychothérapie et ordonnances sécurisées de psychotropes.',
    specificTools: ['Échelles PHQ-9 & GAD-7', 'Notes d’Entretien Confidentielles', 'Prescription Psychotropes', 'Suivi Thérapeutique']
  }
];

interface CinematicBottomBarProps {
  onOpenNewPatient?: () => void;
  onOpenNewAppointment?: () => void;
}

export const CinematicBottomBar: React.FC<CinematicBottomBarProps> = ({
  onOpenNewPatient,
  onOpenNewAppointment
}) => {
  const {
    currentOrganization,
    currentUser,
    switchOrganization,
    organizations,
    patients,
    appointments,
    setCurrentTab,
    showToast
  } = useApp();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const metricsRef = useRef<HTMLDivElement | null>(null);

  const [isSpecialtyDrawerOpen, setIsSpecialtyDrawerOpen] = useState(false);
  const [activeSpecialty, setActiveSpecialty] = useState<string>(() => {
    return localStorage.getItem('worldmed_active_specialty') || 'pediatrie';
  });
  const [heartBpm, setHeartBpm] = useState<number>(72);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // GSAP Entrance & Pulse Animations
  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      );
    }

    if (metricsRef.current) {
      gsap.fromTo(
        metricsRef.current.children,
        { opacity: 0, y: 15, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.08, duration: 0.6, ease: 'back.out(1.4)', delay: 0.3 }
      );
    }
  }, []);

  // Heartbeat interval simulation for telemetry
  useEffect(() => {
    const interval = setInterval(() => {
      setHeartBpm((prev) => {
        const delta = Math.floor(Math.random() * 5) - 2;
        return Math.min(Math.max(prev + delta, 68), 78);
      });
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // 2D Cinematic Canvas ECG & Particle Wave Simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth * window.devicePixelRatio || 600);
    let height = (canvas.height = canvas.offsetHeight * window.devicePixelRatio || 40);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth * window.devicePixelRatio || 600;
      height = canvas.height = canvas.offsetHeight * window.devicePixelRatio || 40;
    };

    window.addEventListener('resize', handleResize);

    // Particle nodes for floating clinical mesh
    const particles: { x: number; y: number; vx: number; vy: number; radius: number; alpha: number }[] = [];
    const particleCount = 20;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 1.5 + 0.8,
        alpha: Math.random() * 0.5 + 0.2
      });
    }

    let ecgOffset = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle background medical grid lines
      ctx.strokeStyle = 'rgba(2, 132, 199, 0.05)';
      ctx.lineWidth = 1;
      const step = 20 * window.devicePixelRatio;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Draw 2D floating medical particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = `rgba(14, 165, 233, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw dynamic ECG Waveform line across canvas
      ecgOffset += 1.2;
      ctx.lineWidth = 1.8 * window.devicePixelRatio;
      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0, 'rgba(2, 132, 199, 0.1)');
      gradient.addColorStop(0.5, 'rgba(14, 165, 233, 0.85)');
      gradient.addColorStop(1, 'rgba(37, 99, 235, 0.95)');
      ctx.strokeStyle = gradient;

      ctx.beginPath();
      const midY = height / 2;
      const segmentWidth = 140 * window.devicePixelRatio;

      for (let x = 0; x < width; x += 2) {
        const localX = (x + ecgOffset) % segmentWidth;
        let y = midY;

        // ECG P-Q-R-S-T wave calculation
        if (localX > 40 && localX < 50) {
          // P wave
          y -= Math.sin(((localX - 40) / 10) * Math.PI) * 4 * window.devicePixelRatio;
        } else if (localX >= 50 && localX < 55) {
          // Q dip
          y += 3 * window.devicePixelRatio;
        } else if (localX >= 55 && localX < 65) {
          // R peak
          const t = (localX - 55) / 10;
          y -= Math.sin(t * Math.PI) * 16 * window.devicePixelRatio;
        } else if (localX >= 65 && localX < 70) {
          // S dip
          y += 5 * window.devicePixelRatio;
        } else if (localX > 80 && localX < 100) {
          // T wave
          y -= Math.sin(((localX - 80) / 20) * Math.PI) * 6 * window.devicePixelRatio;
        }

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleSelectSpecialty = (spec: MedicalSpecialtyConfig) => {
    setActiveSpecialty(spec.id);
    localStorage.setItem('worldmed_active_specialty', spec.id);

    // Animate selection with GSAP
    gsap.to('.specialty-badge-active', {
      scale: 1.05,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      ease: 'power2.out'
    });

    showToast(
      `Spécialité activée : ${spec.name}`,
      `Les outils et modules dédiés pour ${spec.name} sont prêts.`,
      'success'
    );
    setIsSpecialtyDrawerOpen(false);
  };

  const currentSpecObj =
    ALL_MEDICAL_SPECIALTIES.find((s) => s.id === activeSpecialty) ||
    ALL_MEDICAL_SPECIALTIES[0];

  return (
    <>
      {/* Specialty Selector Floating Modal / Drawer */}
      {isSpecialtyDrawerOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className="w-full max-w-4xl bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-5 sm:p-6 border-b border-slate-100 bg-gradient-to-r from-blue-50/50 via-white to-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <WorldMedicalLogo size="md" />
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-black text-slate-900">
                      Toutes les Spécialités Médicales
                    </h2>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                      12 Spécialités Disponibles
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Sélectionnez le mode de pratique pour adapter instantanément les protocoles cliniques et ordonnances.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsSpecialtyDrawerOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-all cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Specialties Grid */}
            <div className="p-5 sm:p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 bg-slate-50/40">
              {ALL_MEDICAL_SPECIALTIES.map((spec) => {
                const isSelected = spec.id === activeSpecialty;
                return (
                  <div
                    key={spec.id}
                    onClick={() => handleSelectSpecialty(spec)}
                    className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between text-left ${
                      isSelected
                        ? 'bg-blue-50/80 border-blue-500 shadow-md ring-2 ring-blue-500/20'
                        : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-sm'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">{spec.icon}</span>
                        {isSelected && (
                          <span className="flex items-center gap-1 text-[10px] font-black text-blue-700 bg-blue-100/90 px-2 py-0.5 rounded-full border border-blue-300">
                            <CheckCircle2 className="w-3 h-3" /> ACTIF
                          </span>
                        )}
                      </div>
                      <h3 className="text-xs font-black text-slate-900 leading-snug">
                        {spec.name}
                      </h3>
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                        {spec.description}
                      </p>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap gap-1">
                      {spec.specificTools.slice(0, 2).map((tool, idx) => (
                        <span
                          key={idx}
                          className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 truncate max-w-full"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="p-4 bg-white border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-blue-600" />
                Dossier médical universel & conforme CNDP Loi 09-08 (Royaume du Maroc)
              </span>
              <button
                onClick={() => setIsSpecialtyDrawerOpen(false)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs shadow-sm transition-all cursor-pointer"
              >
                Confirmer le mode clinique
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cinematic 2D Bottom Bar Dock */}
      <footer
        ref={containerRef}
        className="sticky bottom-0 z-40 w-full bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-4px_25px_rgba(0,0,0,0.06)] transition-all duration-300 select-none"
      >
        {/* Subtle Canvas 2D ECG & Particle Telemetry strip */}
        <div className="w-full h-2 bg-slate-100/80 relative overflow-hidden border-b border-slate-100">
          <canvas ref={canvasRef} className="w-full h-full block" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3 text-xs">
          {/* Left: World Medical Pro Identity & Live Specialty Switcher */}
          <div className="flex items-center gap-3">
            <div
              onClick={() => setIsSpecialtyDrawerOpen(true)}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200/80 hover:border-blue-300 transition-all cursor-pointer group specialty-badge-active"
              title="Cliquez pour changer de spécialité médicale"
            >
              <span className="text-base group-hover:scale-110 transition-transform">
                {currentSpecObj.icon}
              </span>
              <div className="flex flex-col text-left">
                <span className="text-[10px] font-black text-blue-700 tracking-tight leading-none">
                  WORLD MEDICAL PRO
                </span>
                <span className="text-[11px] font-bold text-slate-800 leading-tight">
                  {currentSpecObj.name.split('&')[0]}
                </span>
              </div>
              <ChevronUp className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-colors" />
            </div>

            {/* Quick Multi-Specialty Pills */}
            <div className="hidden lg:flex items-center gap-1.5">
              {[
                { id: 'pediatrie', name: '👶 Pédiatrie' },
                { id: 'dentaire', name: '🦷 Dentiste' },
                { id: 'gynecologie', name: '🤰 Gynéco' },
                { id: 'ophtalmologie', name: '👁️ Ophtalmo' },
                { id: 'generale', name: '🩺 Généraliste' }
              ].map((pill) => (
                <button
                  key={pill.id}
                  onClick={() => {
                    const spec = ALL_MEDICAL_SPECIALTIES.find((s) => s.id === pill.id);
                    if (spec) handleSelectSpecialty(spec);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                    activeSpecialty === pill.id
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/70'
                  }`}
                >
                  {pill.name}
                </button>
              ))}

              <button
                onClick={() => setIsSpecialtyDrawerOpen(true)}
                className="px-2 py-1 text-[10px] font-bold text-blue-700 hover:underline cursor-pointer"
              >
                +7 autres...
              </button>
            </div>
          </div>

          {/* Right: Live Clinical Telemetry & Direct Actions */}
          <div ref={metricsRef} className="flex items-center gap-2 sm:gap-3">
            {/* Heart Rate Live Monitor */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-rose-50/70 border border-rose-200/60 text-[11px] font-bold text-rose-700">
              <Heart className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
              <span>{heartBpm} BPM</span>
            </div>

            {/* CNDP AES-256 Vault Status */}
            <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50/70 border border-emerald-200/60 text-[11px] font-bold text-emerald-700">
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              <span>AES-256 · CNDP OK</span>
            </div>

            {/* Quick Action Button: New Patient */}
            {onOpenNewPatient && (
              <button
                onClick={onOpenNewPatient}
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-xs transition-all active:scale-95 cursor-pointer flex items-center gap-1"
              >
                <span>+ Patient</span>
              </button>
            )}

            {/* Quick Action Button: Consultation */}
            <button
              onClick={() => setCurrentTab('consultation')}
              className="px-3.5 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs shadow-blue-500/20 transition-all active:scale-95 cursor-pointer flex items-center gap-1.5"
            >
              <Stethoscope className="w-3.5 h-3.5" />
              <span>Consultation</span>
            </button>
          </div>
        </div>
      </footer>
    </>
  );
};
