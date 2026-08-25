import React, { useState } from 'react';
import { X, UploadCloud, FileText, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MedicalDocument } from '../types';

interface NewDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPatientId?: string;
}

export const NewDocumentModal: React.FC<NewDocumentModalProps> = ({
  isOpen,
  onClose,
  defaultPatientId
}) => {
  const { patients, addDocument } = useApp();

  const [patientId, setPatientId] = useState(defaultPatientId || patients[0]?.id || '');
  const [nom, setNom] = useState('');
  const [categorie, setCategorie] = useState<MedicalDocument['categorie']>('Analyses');
  const [auteur, setAuteur] = useState('Laboratoire Cerballiance');
  const [date, setDate] = useState('2026-08-25');
  const [isDragging, setIsDragging] = useState(false);
  const [fileAttached, setFileAttached] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSimulatedDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setFileAttached('Compte-rendu_Medical_Numérisé.pdf');
    if (!nom) setNom('Bilan biologique complet numérisé');
  };

  const handleFileSelect = () => {
    setFileAttached('Document_Scanné_Cabinet.pdf');
    if (!nom) setNom('Compte-rendu de consultation spécialisée');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const patient = patients.find((p) => p.id === patientId);
    if (!patient) return;

    addDocument({
      patientId: patient.id,
      patientNomComplet: `${patient.prenom} ${patient.nom}`,
      nom: nom || 'Document médical importé',
      categorie,
      date,
      taille: '450 Ko',
      auteur: auteur || 'Médecin / Laboratoire externe',
      typeMime: 'application/pdf',
      apercuContenu: 'Document numérisé et classé dans le dossier médical sécurisé.'
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
              <UploadCloud className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">Ajouter un document au dossier</h3>
              <p className="text-xs text-slate-500">Numérisation et classement DMP / Dossier patient</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Dossier Patient *</label>
            <select
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
            >
              {patients.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nom} {p.prenom} ({p.age} ans)
                </option>
              ))}
            </select>
          </div>

          {/* Drag & Drop Simulation */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleSimulatedDrop}
            onClick={handleFileSelect}
            className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
              isDragging
                ? 'border-blue-500 bg-blue-50/50'
                : fileAttached
                ? 'border-emerald-500 bg-emerald-50/30'
                : 'border-slate-300 bg-slate-50/50 hover:bg-slate-50'
            }`}
          >
            {fileAttached ? (
              <div className="flex flex-col items-center gap-1.5 text-emerald-700">
                <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                <p className="text-xs font-bold">{fileAttached}</p>
                <p className="text-[11px] text-slate-500">Prêt pour archivage sécurisé (450 Ko · PDF)</p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-1.5 text-slate-600">
                <UploadCloud className="w-8 h-8 text-slate-400" />
                <p className="text-xs font-bold text-slate-700">
                  Glissez-déposez le fichier ici, ou <span className="text-blue-600 underline">parcourir</span>
                </p>
                <p className="text-[11px] text-slate-400">PDF, JPEG, DICOM, PNG jusqu'à 50 Mo</p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Catégorie</label>
              <select
                value={categorie}
                onChange={(e) => setCategorie(e.target.value as any)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
              >
                <option value="Analyses">Analyses Biologiques</option>
                <option value="Radios">Radiologie & Imagerie</option>
                <option value="Ordonnances">Ordonnance externe</option>
                <option value="Certificats">Certificat</option>
                <option value="Courriers">Courrier confrère / CR</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Date du document</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Titre du document</label>
            <input
              type="text"
              required
              placeholder="Ex: Échographie abdomino-pelvienne"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Émetteur / Auteur</label>
            <input
              type="text"
              placeholder="Ex: Dr Martin (Cardiologue), Laboratoire..."
              value={auteur}
              onChange={(e) => setAuteur(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
            />
          </div>

          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs"
            >
              Enregistrer le document
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
