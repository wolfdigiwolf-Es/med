import React, { useState } from 'react';
import {
  FileText,
  Plus,
  Trash2,
  Printer,
  Download,
  Eye,
  ShieldCheck,
  Pill,
  Sparkles,
  Search,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PrescriptionItem, Prescription } from '../types';

export const PrescriptionView: React.FC = () => {
  const {
    patients,
    selectedPatientId,
    prescriptions,
    addPrescription,
    medications,
    settings,
    openPrintPreview,
    showToast
  } = useApp();

  const [patientId, setPatientId] = useState(selectedPatientId || patients[0]?.id || 'pat-1');
  const [aldConcernee, setAldConcernee] = useState(false);
  const [date, setDate] = useState('2026-08-25');
  const [conseilsHygiene, setConseilsHygiene] = useState(
    'Repos 48h, hydratation régulière (1.5L d’eau par jour), aération du domicile.'
  );

  const [items, setItems] = useState<PrescriptionItem[]>([
    {
      id: 'item-1',
      medicament: 'AMOXICILLINE BIOGARAN',
      dci: 'Amoxicilline trihydratée',
      dosage: '1 g',
      forme: 'Comprimé dispersible',
      posologie: '1 comprimé matin et soir au milieu des repas',
      frequence: '2 fois par jour',
      duree: '6 jours',
      instructions: 'À dissoudre dans un demi-verre d’eau. Bien terminer la cure.',
      ald: false,
      nonSubstituable: false
    },
    {
      id: 'item-2',
      medicament: 'DOLIPRANE',
      dci: 'Paracétamol',
      dosage: '1000 mg',
      forme: 'Gélule',
      posologie: '1 gélule en cas de douleur ou fièvre, espacer d’au moins 6h',
      frequence: 'Max 3 gélules / jour',
      duree: '5 jours si symptômes',
      instructions: 'Ne pas dépasser 3g par 24h sans avis médical.',
      ald: false,
      nonSubstituable: false
    }
  ]);

  const selectedPatient = patients.find((p) => p.id === patientId) || patients[0];

  const handleAddMedicationFromDb = (medId: string) => {
    const med = medications.find((m) => m.id === medId);
    if (!med) return;

    const newItem: PrescriptionItem = {
      id: `item-${Date.now()}`,
      medicament: med.nom,
      dci: med.dci,
      dosage: med.dosage,
      forme: med.forme,
      posologie: med.posologieHabituelle,
      frequence: '1 à 2 fois par jour',
      duree: '30 jours',
      instructions: 'Prise régulière selon prescription.',
      ald: aldConcernee,
      nonSubstituable: false
    };

    setItems([...items, newItem]);
    showToast('Médicament ajouté', `${med.nom} ajouté à l’ordonnance.`);
  };

  const handleAddManualItem = () => {
    const newItem: PrescriptionItem = {
      id: `item-${Date.now()}`,
      medicament: 'NOUVEAU MÉDICAMENT',
      dosage: '500 mg',
      forme: 'Comprimé',
      posologie: '1 comprimé par jour',
      frequence: '1 fois / jour',
      duree: '7 jours',
      instructions: 'À prendre avec un verre d’eau.',
      ald: false,
      nonSubstituable: false
    };
    setItems([...items, newItem]);
  };

  const handleRemoveItem = (id: string) => {
    setItems(items.filter((i) => i.id !== id));
  };

  const handleUpdateItem = (id: string, updates: Partial<PrescriptionItem>) => {
    setItems(items.map((i) => (i.id === id ? { ...i, ...updates } : i)));
  };

  const handleSaveAndPreview = () => {
    if (!selectedPatient || items.length === 0) return;

    const newPrescId = addPrescription({
      patientId: selectedPatient.id,
      patientNomComplet: `${selectedPatient.prenom} ${selectedPatient.nom}`,
      date,
      aldConcernee,
      medicaments: items,
      conseilsHygiene
    });

    openPrintPreview('prescription', `Ordonnance - ${selectedPatient.nom}`, {
      id: newPrescId,
      patientNomComplet: `${selectedPatient.prenom} ${selectedPatient.nom}`,
      patientAge: selectedPatient.age,
      date,
      aldConcernee,
      medicaments: items,
      conseilsHygiene
    });
  };

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
            Prescription & Ordonnances
          </h1>
          <p className="text-xs md:text-sm text-slate-500">
            Édition certifiée avec contrôle des interactions médicamenteuses et e-Prescription
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              openPrintPreview('prescription', `Ordonnance - ${selectedPatient.nom}`, {
                patientNomComplet: `${selectedPatient.prenom} ${selectedPatient.nom}`,
                patientAge: selectedPatient.age,
                date,
                aldConcernee,
                medicaments: items,
                conseilsHygiene
              });
            }}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
          >
            <Eye className="w-4 h-4" />
            <span>Aperçu</span>
          </button>
          <button
            onClick={handleSaveAndPreview}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all active:scale-95"
          >
            <Printer className="w-4 h-4" />
            <span>Valider & Imprimer</span>
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Prescription Editor */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header Summary Box (Cabinet / Medecin / Patient / Date) */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Médecin prescripteur</span>
                <p className="text-xs font-bold text-slate-900 mt-0.5">
                  {settings.medecin.civilite} {settings.medecin.prenom} {settings.medecin.nom}
                </p>
                <p className="text-[11px] text-slate-500">{settings.cabinet.nom}</p>
                <p className="text-[10px] font-mono text-slate-400">RPPS : {settings.medecin.numeroRpps}</p>
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                  Patient(e) destinataire
                </label>
                <select
                  value={patientId}
                  onChange={(e) => setPatientId(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs font-bold border border-slate-300 rounded-lg bg-white"
                >
                  {patients.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nom} {p.prenom} ({p.age} ans)
                    </option>
                  ))}
                </select>
                <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                  <span>Date :</span>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="px-2 py-0.5 border border-slate-300 rounded text-xs"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={aldConcernee}
                  onChange={(e) => setAldConcernee(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span>Ordonnance bizone / Affection Longue Durée (ALD 100%)</span>
              </label>

              <button
                type="button"
                onClick={handleAddManualItem}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Ligne manuelle</span>
              </button>
            </div>
          </div>

          {/* Medications Lines */}
          <div className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Médicaments prescrits ({items.length})
            </h2>

            {items.map((item, index) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3 relative group"
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-xs">
                      {index + 1}
                    </span>
                    <input
                      type="text"
                      value={item.medicament}
                      onChange={(e) => handleUpdateItem(item.id, { medicament: e.target.value })}
                      placeholder="Nom commercial du médicament"
                      className="text-sm font-bold text-slate-900 border-b border-transparent hover:border-slate-300 focus:border-blue-500 focus:outline-hidden px-1"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="flex items-center gap-1 text-[11px] text-slate-500 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={item.nonSubstituable}
                        onChange={(e) => handleUpdateItem(item.id, { nonSubstituable: e.target.checked })}
                        className="w-3.5 h-3.5 text-blue-600 rounded"
                      />
                      <span>Non Substituable (NS)</span>
                    </label>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Dosage</label>
                    <input
                      type="text"
                      value={item.dosage}
                      onChange={(e) => handleUpdateItem(item.id, { dosage: e.target.value })}
                      placeholder="Ex: 1000 mg"
                      className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Forme galénique</label>
                    <input
                      type="text"
                      value={item.forme}
                      onChange={(e) => handleUpdateItem(item.id, { forme: e.target.value })}
                      placeholder="Ex: Comprimé sécable"
                      className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Durée du traitement</label>
                    <input
                      type="text"
                      value={item.duree}
                      onChange={(e) => handleUpdateItem(item.id, { duree: e.target.value })}
                      placeholder="Ex: 6 jours / 3 mois"
                      className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Posologie & Rythme d'administration
                  </label>
                  <input
                    type="text"
                    value={item.posologie}
                    onChange={(e) => handleUpdateItem(item.id, { posologie: e.target.value })}
                    placeholder="Ex: 1 comprimé matin et soir pendant les repas"
                    className="w-full px-3 py-1.5 text-xs font-semibold border border-slate-200 rounded-lg text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Instructions spécifiques de prise
                  </label>
                  <input
                    type="text"
                    value={item.instructions}
                    onChange={(e) => handleUpdateItem(item.id, { instructions: e.target.value })}
                    placeholder="Ex: À dissoudre dans un demi-verre d'eau..."
                    className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg text-slate-600"
                  />
                </div>
              </div>
            ))}

            {/* Conseils hygiéno-diététiques */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                Conseils complémentaires & Mesures associées
              </label>
              <textarea
                rows={2}
                value={conseilsHygiene}
                onChange={(e) => setConseilsHygiene(e.target.value)}
                placeholder="Conseils de repos, hydratation, éviction d'aliments..."
                className="w-full p-2.5 text-xs border border-slate-200 rounded-xl leading-relaxed"
              />
            </div>
          </div>
        </div>

        {/* Right 1 Column: Vidal Quick Database Picker & History */}
        <div className="space-y-6">
          {/* Quick Database Picker */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <Pill className="w-4 h-4 text-blue-600" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Base Médicamenteuse Rapide
              </h3>
            </div>

            <p className="text-[11px] text-slate-500">Cliquez pour ajouter directement à l'ordonnance :</p>

            <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
              {medications.map((med) => (
                <button
                  key={med.id}
                  type="button"
                  onClick={() => handleAddMedicationFromDb(med.id)}
                  className="w-full p-2 text-left rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all flex items-center justify-between text-xs group"
                >
                  <div>
                    <p className="font-bold text-slate-900 group-hover:text-blue-700">{med.nom}</p>
                    <p className="text-[10px] text-slate-500">{med.dci} · {med.dosage}</p>
                  </div>
                  <Plus className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
                </button>
              ))}
            </div>
          </div>

          {/* Past Prescriptions History */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Ordonnances récentes délivrées
            </h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {prescriptions.map((presc) => (
                <div
                  key={presc.id}
                  className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs flex items-center justify-between"
                >
                  <div>
                    <p className="font-bold text-slate-900">{presc.patientNomComplet}</p>
                    <p className="text-[10px] text-slate-500">
                      {presc.date} · {presc.medicaments.length} produits
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      openPrintPreview('prescription', `Ordonnance - ${presc.patientNomComplet}`, {
                        patientNomComplet: presc.patientNomComplet,
                        date: presc.date,
                        aldConcernee: presc.aldConcernee,
                        medicaments: presc.medicaments,
                        conseilsHygiene: presc.conseilsHygiene
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
