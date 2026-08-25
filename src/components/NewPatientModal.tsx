import React, { useState } from 'react';
import { X, UserPlus, ShieldAlert, Heart, Activity, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Patient } from '../types';

interface NewPatientModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewPatientModal: React.FC<NewPatientModalProps> = ({ isOpen, onClose }) => {
  const { addPatient, openPatientDetail } = useApp();

  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    sexe: 'F' as 'F' | 'M',
    dateNaissance: '1995-01-01',
    telephone: '',
    email: '',
    adresse: '',
    ville: 'Casablanca',
    cin: '',
    numeroAmo: '',
    organismeAssurance: 'AMO CNSS' as 'AMO CNSS' | 'AMO CNOPS' | 'Mutuelle Privée' | 'Aucune (Privé)',
    numAffiliationMutuelle: '',
    groupeSanguin: 'A+',
    medecinTraitant: true,
    allergies: '',
    antecedentsMedicaux: '',
    traitementsActuels: '',
    ald: false,
    nomAld: '',
    notesGenerales: '',
    poidsRef: 68,
    tailleRef: 170,
    taRef: '120/80'
  });

  if (!isOpen) return null;

  const calculateAge = (birthDate: string) => {
    const today = new Date(2026, 7, 25);
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age > 0 ? age : 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nom || !formData.prenom) return;

    const newPatient: Omit<Patient, 'id'> = {
      nom: formData.nom.toUpperCase(),
      prenom: formData.prenom.charAt(0).toUpperCase() + formData.prenom.slice(1),
      sexe: formData.sexe,
      dateNaissance: formData.dateNaissance,
      age: calculateAge(formData.dateNaissance),
      telephone: formData.telephone || '06 00 00 00 00',
      email: formData.email,
      adresse: formData.adresse || 'Casablanca',
      ville: formData.ville,
      codePostal: '20000',
      cin: formData.cin ? formData.cin.toUpperCase() : 'BE' + Math.floor(100000 + Math.random() * 900000),
      numeroAmo: formData.numeroAmo || '1' + Math.floor(100000000 + Math.random() * 900000000),
      organismeAssurance: formData.organismeAssurance,
      numAffiliationMutuelle: formData.numAffiliationMutuelle,
      groupeSanguin: formData.groupeSanguin,
      medecinTraitant: formData.medecinTraitant,
      statut: formData.ald ? 'Chronique' : 'Nouveau',
      allergies: formData.allergies ? formData.allergies.split(',').map((s) => s.trim()) : [],
      antecedents: {
        medicaux: formData.antecedentsMedicaux ? formData.antecedentsMedicaux.split(',').map((s) => s.trim()) : [],
        chirurgicaux: [],
        familiaux: []
      },
      traitementsActuels: formData.traitementsActuels ? formData.traitementsActuels.split(',').map((s) => s.trim()) : [],
      ald: formData.ald,
      nomAld: formData.nomAld,
      notesGenerales: formData.notesGenerales,
      poidsRef: Number(formData.poidsRef),
      tailleRef: Number(formData.tailleRef),
      taRef: formData.taRef
    };

    const newId = addPatient(newPatient);
    onClose();
    openPatientDetail(newId);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
              <UserPlus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">Créer un nouveau dossier patient (Maroc)</h3>
              <p className="text-xs text-slate-500">Enregistrement CIN, AMO (CNSS/CNOPS) et profil médical</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[78vh] overflow-y-auto">
          {/* État civil & CIN */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-3 flex items-center gap-1.5">
              <span>1. État Civil & Identité Nationale</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nom de famille *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: BENJELLOUN"
                  value={formData.nom}
                  onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-semibold"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Prénom *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Mehdi"
                  value={formData.prenom}
                  onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-semibold"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Sexe</label>
                <select
                  value={formData.sexe}
                  onChange={(e) => setFormData({ ...formData, sexe: e.target.value as 'F' | 'M' })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                >
                  <option value="F">Féminin (Femme)</option>
                  <option value="M">Masculin (Homme)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Date de naissance</label>
                <input
                  type="date"
                  value={formData.dateNaissance}
                  onChange={(e) => setFormData({ ...formData, dateNaissance: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">N° CIN (Carte Nationale)</label>
                <input
                  type="text"
                  placeholder="Ex: BE892014"
                  value={formData.cin}
                  onChange={(e) => setFormData({ ...formData, cin: e.target.value })}
                  className="w-full px-3 py-2 text-xs font-mono font-bold uppercase border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Groupe Sanguin</label>
                <select
                  value={formData.groupeSanguin}
                  onChange={(e) => setFormData({ ...formData, groupeSanguin: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white font-bold"
                >
                  {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Couverture Médicale & AMO */}
          <div className="pt-2 border-t border-slate-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-3 flex items-center gap-1.5">
              <span>2. Assurance Maladie Obligatoire (AMO) & Mutuelle</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Organisme AMO</label>
                <select
                  value={formData.organismeAssurance}
                  onChange={(e) => setFormData({ ...formData, organismeAssurance: e.target.value as any })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white font-semibold text-blue-800"
                >
                  <option value="AMO CNSS">AMO CNSS (Salariés & TNS)</option>
                  <option value="AMO CNOPS">AMO CNOPS (Secteur Public)</option>
                  <option value="Mutuelle Privée">Assurance / Mutuelle Privée</option>
                  <option value="Aucune (Privé)">Aucune (Paiement Direct)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Numéro Immatriculation AMO</label>
                <input
                  type="text"
                  placeholder="Ex: 182930482"
                  value={formData.numeroAmo}
                  onChange={(e) => setFormData({ ...formData, numeroAmo: e.target.value })}
                  className="w-full px-3 py-2 text-xs font-mono border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">N° Affiliation Mutuelle</label>
                <input
                  type="text"
                  placeholder="Ex: MUT-88291"
                  value={formData.numAffiliationMutuelle}
                  onChange={(e) => setFormData({ ...formData, numAffiliationMutuelle: e.target.value })}
                  className="w-full px-3 py-2 text-xs font-mono border border-slate-300 rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Coordonnées */}
          <div className="pt-2 border-t border-slate-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-3">
              3. Coordonnées & Contact
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Téléphone portable (Maroc)</label>
                <input
                  type="tel"
                  placeholder="Ex: 06 61 23 45 67"
                  value={formData.telephone}
                  onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                  className="w-full px-3 py-2 text-xs font-mono border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  placeholder="patient@domaine.ma"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">Adresse</label>
                <input
                  type="text"
                  placeholder="Ex: Bd d'Anfa, Résidence Al Manar"
                  value={formData.adresse}
                  onChange={(e) => setFormData({ ...formData, adresse: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Ville</label>
                <input
                  type="text"
                  placeholder="Casablanca"
                  value={formData.ville}
                  onChange={(e) => setFormData({ ...formData, ville: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Dossier Médical de Base */}
          <div className="pt-2 border-t border-slate-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-3">
              4. Profil Médical & Antécédents
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Allergies & Intolérances</label>
                <input
                  type="text"
                  placeholder="Pénicilline, AINS, Latex, Arachide..."
                  value={formData.allergies}
                  onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Antécédents majeurs</label>
                <input
                  type="text"
                  placeholder="Diabète T2, HTA, Asthme..."
                  value={formData.antecedentsMedicaux}
                  onChange={(e) => setFormData({ ...formData, antecedentsMedicaux: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                />
              </div>
            </div>

            <div className="mt-3">
              <label className="block text-xs font-semibold text-slate-700 mb-1">Traitements en cours</label>
              <input
                type="text"
                placeholder="Ex: Glucophage 1000mg, Tahor 20mg..."
                value={formData.traitementsActuels}
                onChange={(e) => setFormData({ ...formData, traitementsActuels: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
              />
            </div>

            <div className="mt-3 flex items-center gap-6">
              <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.medecinTraitant}
                  onChange={(e) => setFormData({ ...formData, medecinTraitant: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span>Médecin traitant référent</span>
              </label>

              <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.ald}
                  onChange={(e) => setFormData({ ...formData, ald: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span>Patient en ALD / ALC (Prise en charge 100% AMO)</span>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-all active:scale-95 cursor-pointer"
            >
              Créer le dossier patient
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
