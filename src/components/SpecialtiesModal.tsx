import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Search,
  Check,
  Stethoscope,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Activity,
  Layers,
  Baby,
  Smile,
  Eye,
  HeartPulse,
  Brain,
  Headphones,
  Bone,
  SmilePlus,
  FlaskConical,
  Filter
} from 'lucide-react';
import gsap from 'gsap';
import { useApp } from '../context/AppContext';
import { ALL_MEDICAL_SPECIALTIES, SPECIALTY_CATEGORIES, MedicalSpecialtyConfig } from '../data/specialtiesData';
import { WorldMedicalProLogo } from './WorldMedicalProLogo';

interface SpecialtiesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SpecialtiesModal: React.FC<SpecialtiesModalProps> = ({ isOpen, onClose }) => {
  const { currentOrganization, updateSettings, settings, showToast, loadDrSaraAlamiProfile, setCurrentTab } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSpecialty, setActiveSpecialty] = useState<MedicalSpecialtyConfig>(ALL_MEDICAL_SPECIALTIES[0]);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.95, y: 15 },
        { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: 'power3.out' }
      );
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredSpecialties = ALL_MEDICAL_SPECIALTIES.filter(spec => {
    const matchesCat = selectedCategory === 'Tous' || spec.category === selectedCategory;
    const matchesSearch = spec.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          spec.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          spec.keyTools.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const handleApplySpecialty = (spec: MedicalSpecialtyConfig) => {
    if (spec.id === 'dentaire') {
      loadDrSaraAlamiProfile();
      setCurrentTab('dental');
      onClose();
      return;
    }

    updateSettings({
      ...settings,
      medecin: {
        ...settings.medecin,
        specialite: spec.name,
        enteteTexte: `${settings.medecin.nom || 'Dr.'} — Spécialiste en ${spec.name} · ${settings.cabinet.ville || 'Maroc'}`
      }
    });

    showToast(
      'Spécialité appliquée !',
      `Le cabinet est désormais configuré pour : ${spec.name}. Outils cliniques adaptés.`,
      'success'
    );
    onClose();
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Smile': return <Smile className="w-5 h-5" />;
      case 'Baby': return <Baby className="w-5 h-5" />;
      case 'HeartPulse': return <HeartPulse className="w-5 h-5" />;
      case 'Eye': return <Eye className="w-5 h-5" />;
      case 'Activity': return <Activity className="w-5 h-5" />;
      case 'Brain': return <Brain className="w-5 h-5" />;
      case 'Headphones': return <Headphones className="w-5 h-5" />;
      case 'Bone': return <Bone className="w-5 h-5" />;
      case 'SmilePlus': return <SmilePlus className="w-5 h-5" />;
      case 'FlaskConical': return <FlaskConical className="w-5 h-5" />;
      default: return <Stethoscope className="w-5 h-5" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div
        ref={modalRef}
        className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-5xl w-full max-h-[90vh] flex flex-col overflow-hidden text-slate-900"
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-blue-50/80 via-white to-slate-50 border-b border-slate-200 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <WorldMedicalProLogo size="md" />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black text-slate-900">
                  Catalogue Universel des Spécialités Médicales
                </h2>
                <span className="bg-blue-100 text-blue-800 text-[10px] font-black px-2 py-0.5 rounded-full border border-blue-200">
                  {ALL_MEDICAL_SPECIALTIES.length} Spécialités
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                World Medical Pro s'adapte automatiquement à chaque discipline clinique avec ses outils dédiés.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filters & Search */}
        <div className="p-4 sm:px-6 bg-slate-50/70 border-b border-slate-200/80 flex flex-col sm:flex-row gap-3 items-center justify-between">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
            {SPECIALTY_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Rechercher une spécialité, outil..."
              className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Two Columns Body: List & Selected Specialty Details */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden min-h-0">
          {/* Left: Specialty Cards Grid */}
          <div className="lg:col-span-6 p-4 sm:p-5 overflow-y-auto space-y-2.5 border-b lg:border-b-0 lg:border-r border-slate-200">
            {filteredSpecialties.map(spec => {
              const isCurrentSelected = activeSpecialty.id === spec.id;
              const isCabinetActive = currentOrganization.speciality.toLowerCase().includes(spec.name.toLowerCase()) ||
                                      settings.medecin.specialite.toLowerCase().includes(spec.name.toLowerCase());

              return (
                <div
                  key={spec.id}
                  onClick={() => setActiveSpecialty(spec)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                    isCurrentSelected
                      ? 'bg-blue-50/60 border-blue-500 ring-2 ring-blue-500/10 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${spec.badgeBg} ${spec.badgeText}`}>
                    {getIcon(spec.iconName)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-sm font-black text-slate-900 truncate">
                        {spec.name}
                      </h4>
                      {isCabinetActive && (
                        <span className="text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded-full shrink-0">
                          Actif
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-0.5">
                      {spec.description}
                    </p>
                    <div className="flex items-center gap-1.5 flex-wrap mt-2">
                      {spec.keyTools.slice(0, 2).map(tool => (
                        <span key={tool} className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md border border-slate-200">
                          {tool}
                        </span>
                      ))}
                      {spec.keyTools.length > 2 && (
                        <span className="text-[10px] text-slate-400 font-medium">
                          +{spec.keyTools.length - 2} outils
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Active Specialty Live Feature Matrix & Actions */}
          <div className="lg:col-span-6 p-5 sm:p-6 overflow-y-auto bg-slate-50/50 flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-xs ${activeSpecialty.badgeBg} ${activeSpecialty.badgeText}`}>
                    {getIcon(activeSpecialty.iconName)}
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                      Module Spécialisé · {activeSpecialty.category}
                    </span>
                    <h3 className="text-lg font-black text-slate-900">
                      {activeSpecialty.name}
                    </h3>
                  </div>
                </div>
                <span className="text-xs font-black text-blue-700 bg-blue-100/80 px-2.5 py-1 rounded-xl border border-blue-200">
                  Tarif réf. {activeSpecialty.defaultConsultationFee} DH
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed bg-white p-3.5 rounded-2xl border border-slate-200">
                {activeSpecialty.description}
              </p>

              {/* Specific Clinical Tools */}
              <div>
                <h5 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-blue-600" />
                  Outils & Fonctionnalités Dédiés :
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeSpecialty.keyTools.map(tool => (
                    <div key={tool} className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-slate-200 text-xs text-slate-700 font-semibold shadow-2xs">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate">{tool}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Popular Acts & NGAP Codes */}
              <div>
                <h5 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-cyan-600" />
                  Actes & Tarification Recommandée :
                </h5>
                <div className="space-y-1.5 bg-white p-3 rounded-2xl border border-slate-200">
                  {activeSpecialty.popularActs.map(act => (
                    <div key={act.nom} className="flex items-center justify-between text-xs py-1 border-b last:border-0 border-slate-100">
                      <span className="font-medium text-slate-700">{act.nom}</span>
                      <div className="flex items-center gap-2">
                        {act.codeNgap && (
                          <span className="text-[10px] font-mono font-bold bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">
                            {act.codeNgap}
                          </span>
                        )}
                        <span className="font-bold text-slate-900">{act.tarifRef} DH</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Action */}
            <div className="pt-4 border-t border-slate-200">
              <button
                onClick={() => handleApplySpecialty(activeSpecialty)}
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 transition-all cursor-pointer active:scale-98"
              >
                <span>Activer le mode {activeSpecialty.name}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
