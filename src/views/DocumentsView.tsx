import React, { useState } from 'react';
import {
  FolderArchive,
  Search,
  Plus,
  FileText,
  Download,
  Eye,
  Trash2,
  Calendar,
  Filter,
  FileSpreadsheet,
  Activity
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MedicalDocument } from '../types';

interface DocumentsViewProps {
  onOpenNewDocument: () => void;
}

export const DocumentsView: React.FC<DocumentsViewProps> = ({ onOpenNewDocument }) => {
  const { documents, deleteDocument, openPrintPreview } = useApp();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');

  const categories = ['Tous', 'Biologie', 'Imagerie', 'Compte-rendu', 'Courrier', 'Certificat', 'Autre'];

  const filteredDocs = documents.filter((doc) => {
    const matchesSearch =
      doc.nom.toLowerCase().includes(search.toLowerCase()) ||
      doc.patientNomComplet.toLowerCase().includes(search.toLowerCase()) ||
      doc.auteur.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;
    if (selectedCategory === 'Tous') return true;
    return doc.categorie === selectedCategory;
  });

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
            Gestion Électronique des Documents (GED)
          </h1>
          <p className="text-xs md:text-sm text-slate-500">
            {documents.length} examens, bilans biologiques et comptes-rendus numérisés
          </p>
        </div>

        <button
          onClick={() => onOpenNewDocument()}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all active:scale-95 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Ajouter un document</span>
        </button>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Rechercher par intitulé du document, patient, laboratoire ou médecin correspondant..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Documents Grid / Table */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocs.length === 0 ? (
          <div className="col-span-full py-16 text-center text-slate-400 text-xs">
            Aucun document ne correspond à vos critères.
          </div>
        ) : (
          filteredDocs.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-blue-300 hover:shadow-sm transition-all space-y-3 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
                    {doc.categorie}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">{doc.date}</span>
                </div>

                <h3 className="font-bold text-xs text-slate-900 mt-2 line-clamp-2">{doc.nom}</h3>
                <p className="text-xs font-semibold text-blue-600 mt-0.5">{doc.patientNomComplet}</p>
                <p className="text-[11px] text-slate-500 mt-1 italic">{doc.auteur}</p>

                {doc.apercuContenu && (
                  <p className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100 mt-2 line-clamp-2 font-mono">
                    {doc.apercuContenu}
                  </p>
                )}
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-400 font-mono">{doc.taille}</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() =>
                      openPrintPreview('consultation', doc.nom, {
                        patientNomComplet: doc.patientNomComplet,
                        date: doc.date,
                        texteContenu: doc.apercuContenu || 'Contenu archivé du document.'
                      })
                    }
                    className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Consulter"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteDocument(doc.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Supprimer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
