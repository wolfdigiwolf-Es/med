import React, { useState } from 'react';
import {
  ShieldCheck,
  FileText,
  Printer,
  Download,
  Plus,
  Eye,
  Calendar,
  CheckCircle2,
  Edit3
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CertificateType, MedicalCertificate } from '../types';

export const CertificatesView: React.FC = () => {
  const {
    patients,
    selectedPatientId,
    certificates,
    addCertificate,
    settings,
    openPrintPreview,
    showToast
  } = useApp();

  const [patientId, setPatientId] = useState(selectedPatientId || patients[0]?.id || 'pat-1');
  const [certType, setCertType] = useState<CertificateType>('arret_travail');
  const [date, setDate] = useState('2026-08-25');
  const [dureeJours, setDureeJours] = useState(3);
  const [sportPratique, setSportPratique] = useState('Course à pied en compétition et Boxe anglaise');
  const [sortiesAutorisees, setSortiesAutorisees] = useState<'Avec restriction' | 'Sans restriction' | 'Non autorisées'>('Avec restriction');

  const selectedPatient = patients.find((p) => p.id === patientId) || patients[0];

  const getPresetTitle = () => {
    switch (certType) {
      case 'arret_travail':
        return "Certificat Médical d'Arrêt de Travail";
      case 'aptitude_sport':
        return "Certificat de Non Contre-Indication à la Pratique Sportive";
      case 'scolaire':
        return "Certificat Médical d'Exemption / Repos Scolaire";
      case 'personnalise':
        return "Certificat Médical Confidentiel";
      default:
        return "Certificat Médical";
    }
  };

  const [titre, setTitre] = useState(getPresetTitle());

  const generateDefaultText = (type: CertificateType, patient: typeof selectedPatient) => {
    switch (type) {
      case 'arret_travail':
        return `Je soussigné, Dr Karim AHMED, certifie avoir examiné ce jour ${patient.sexe === 'F' ? 'Mme' : 'M.'} ${patient.nom.toUpperCase()} ${patient.prenom} (né(e) le ${patient.dateNaissance}) et constate un état de santé justifiant un arrêt de travail à titre thérapeutique pour une durée de ${dureeJours} jours, du 25/08/2026 au 28/08/2026 inclus.\nSorties autorisées : ${sortiesAutorisees} (horaires réglementaires 10h-12h et 16h-18h).`;
      case 'aptitude_sport':
        return `Je soussigné, Dr Karim AHMED, certifie avoir examiné ce jour ${patient.sexe === 'F' ? 'Mme' : 'M.'} ${patient.nom.toUpperCase()} ${patient.prenom} (né(e) le ${patient.dateNaissance}) et n'avoir pas constaté à ce jour de contre-indication clinique apparente à la pratique de : ${sportPratique}.\nExamen cardio-vasculaire au repos satisfaisant.`;
      case 'scolaire':
        return `Je soussigné, Dr Karim AHMED, certifie que l'état de santé de l'élève ${patient.nom.toUpperCase()} ${patient.prenom} nécessite une dispense d'éducation physique et sportive (EPS) pour une durée de 8 jours à compter de ce jour.`;
      default:
        return `Je soussigné, Dr Karim AHMED, docteur en médecine, certifie avoir examiné ce jour ${patient.sexe === 'F' ? 'Mme' : 'M.'} ${patient.nom.toUpperCase()} ${patient.prenom} et atteste que son état de santé est compatible avec la vie en collectivité.`;
    }
  };

  const [texteContenu, setTexteContenu] = useState(generateDefaultText('arret_travail', selectedPatient));

  const handleTypeChange = (newType: CertificateType) => {
    setCertType(newType);
    setTitre(
      newType === 'arret_travail'
        ? "Certificat Médical d'Arrêt de Travail"
        : newType === 'aptitude_sport'
        ? "Certificat de Non Contre-Indication à la Pratique Sportive"
        : newType === 'scolaire'
        ? "Certificat Médical d'Exemption Scolaire"
        : "Certificat Médical"
    );
    setTexteContenu(generateDefaultText(newType, selectedPatient));
  };

  const handleSaveAndPrint = () => {
    const newId = addCertificate({
      type: certType,
      titre,
      patientId: selectedPatient.id,
      patientNomComplet: `${selectedPatient.prenom} ${selectedPatient.nom}`,
      date,
      dureeArretJours: certType === 'arret_travail' ? dureeJours : undefined,
      sortiesAutorisees: certType === 'arret_travail' ? sortiesAutorisees : undefined,
      sportPratique: certType === 'aptitude_sport' ? sportPratique : undefined,
      texteContenu
    });

    openPrintPreview('certificate', titre, {
      titre,
      patientNomComplet: `${selectedPatient.prenom} ${selectedPatient.nom}`,
      patientAge: selectedPatient.age,
      date,
      texteContenu
    });
  };

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
            Certificats Médicaux & Arrêts de Travail
          </h1>
          <p className="text-xs md:text-sm text-slate-500">
            Génération conforme et sécurisée de certificats médicaux, aptitudes et arrêts
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              openPrintPreview('certificate', titre, {
                titre,
                patientNomComplet: `${selectedPatient.prenom} ${selectedPatient.nom}`,
                patientAge: selectedPatient.age,
                date,
                texteContenu
              });
            }}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
          >
            <Eye className="w-4 h-4" />
            <span>Aperçu</span>
          </button>
          <button
            onClick={handleSaveAndPrint}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all active:scale-95"
          >
            <Printer className="w-4 h-4" />
            <span>Valider & Imprimer</span>
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Certificate Generator */}
        <div className="lg:col-span-2 space-y-6">
          {/* Certificate Type Selection Buttons */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Type de document à délivrer
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { id: 'arret_travail', label: 'Arrêt de travail / Repos', icon: Calendar },
                { id: 'aptitude_sport', label: 'Aptitude sportive', icon: ShieldCheck },
                { id: 'medical_standard', label: 'Certificat médical', icon: FileText },
                { id: 'scolaire', label: 'Exemption scolaire', icon: Edit3 },
              ].map((item) => {
                const isSelected = certType === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleTypeChange(item.id as CertificateType)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-blue-50 border-blue-600 text-blue-900 font-bold shadow-2xs'
                        : 'bg-slate-50/70 border-slate-200 text-slate-700 hover:bg-white'
                    }`}
                  >
                    <p className="text-xs">{item.label}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form Settings */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Patient destinataire</label>
                <select
                  value={patientId}
                  onChange={(e) => {
                    setPatientId(e.target.value);
                    const p = patients.find((pat) => pat.id === e.target.value);
                    if (p) setTexteContenu(generateDefaultText(certType, p));
                  }}
                  className="w-full px-3 py-2 text-xs font-bold border border-slate-300 rounded-lg bg-white"
                >
                  {patients.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nom} {p.prenom} ({p.age} ans)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Date d'examen</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                />
              </div>
            </div>

            {/* Custom parameters based on type */}
            {certType === 'arret_travail' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Durée de l'arrêt (jours)
                  </label>
                  <input
                    type="number"
                    value={dureeJours}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setDureeJours(val);
                      setTexteContenu(
                        `Je soussigné, Dr Karim AHMED, certifie avoir examiné ce jour ${selectedPatient.sexe === 'F' ? 'Mme' : 'M.'} ${selectedPatient.nom.toUpperCase()} ${selectedPatient.prenom} et constate un état de santé justifiant un arrêt de travail pour une durée de ${val} jours à compter du ${date}.\nSorties autorisées : ${sortiesAutorisees}.`
                      );
                    }}
                    className="w-full px-3 py-2 text-xs font-bold border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Sorties autorisées</label>
                  <select
                    value={sortiesAutorisees}
                    onChange={(e) => setSortiesAutorisees(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="Avec restriction">Avec restriction (10h-12h / 16h-18h)</option>
                    <option value="Sans restriction">Sans restriction d'horaire</option>
                    <option value="Non autorisées">Sorties non autorisées</option>
                  </select>
                </div>
              </div>
            )}

            {certType === 'aptitude_sport' && (
              <div className="pt-2 border-t border-slate-100">
                <label className="block text-xs font-semibold text-slate-700 mb-1">Discipline(s) sportive(s)</label>
                <input
                  type="text"
                  value={sportPratique}
                  onChange={(e) => {
                    setSportPratique(e.target.value);
                    setTexteContenu(
                      `Je soussigné, Dr Karim AHMED, certifie avoir examiné ce jour ${selectedPatient.sexe === 'F' ? 'Mme' : 'M.'} ${selectedPatient.nom.toUpperCase()} ${selectedPatient.prenom} et n'avoir pas constaté à ce jour de contre-indication clinique apparente à la pratique de : ${e.target.value}.\nExamen cardio-vasculaire satisfaisant.`
                    );
                  }}
                  placeholder="Ex: Tennis en compétition, Football, Natation..."
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                />
              </div>
            )}

            {/* Editable Content */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <label className="block text-xs font-semibold text-slate-700">Texte rédigé du certificat</label>
              <textarea
                rows={6}
                value={texteContenu}
                onChange={(e) => setTexteContenu(e.target.value)}
                className="w-full p-3.5 text-xs font-serif leading-relaxed border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Right 1 Column: Certificate Live Preview */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Aperçu en temps réel
            </h3>

            {/* Mini preview card */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 text-xs">
              <div className="border-b border-slate-200 pb-2 text-center">
                <p className="font-extrabold text-[11px] uppercase tracking-wide text-slate-900">{titre}</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Cabinet Médical des Lilas</p>
              </div>

              <p className="text-[11px] leading-relaxed text-slate-700 whitespace-pre-line font-serif italic">
                {texteContenu}
              </p>

              <div className="pt-2 border-t border-slate-200 flex justify-between items-end text-[10px] text-slate-500">
                <span>Fait le {date}</span>
                <span className="font-bold text-slate-800">Dr Karim AHMED</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSaveAndPrint}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimer le certificat</span>
            </button>
          </div>

          {/* Historical certificates list */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Certificats récents délivrés
            </h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs flex items-center justify-between"
                >
                  <div>
                    <p className="font-bold text-slate-900">{cert.patientNomComplet}</p>
                    <p className="text-[10px] text-slate-500">{cert.titre} · {cert.date}</p>
                  </div>
                  <button
                    onClick={() =>
                      openPrintPreview('certificate', cert.titre, {
                        titre: cert.titre,
                        patientNomComplet: cert.patientNomComplet,
                        date: cert.date,
                        texteContenu: cert.texteContenu
                      })
                    }
                    className="p-1 text-slate-500 hover:text-blue-600"
                    title="Aperçu"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
