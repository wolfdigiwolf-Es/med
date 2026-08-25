import React, { useState } from 'react';
import {
  LifeBuoy,
  MessageSquare,
  Send,
  Plus,
  ShieldCheck,
  Clock,
  Phone,
  Mail,
  CheckCircle2,
  FileText,
  AlertCircle,
  HelpCircle,
  Award,
  Sparkles,
  BookOpen,
  Download,
  Calendar,
  Lock
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SupportTicket } from '../types';

export const SupportView: React.FC = () => {
  const {
    currentOrganization,
    currentUser,
    supportTickets,
    addSupportTicket,
    addSupportTicketMessage,
    showToast
  } = useApp();

  const [isNewTicketModalOpen, setIsNewTicketModalOpen] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState<string>(
    supportTickets.find((t) => t.organizationId === currentOrganization.id)?.id || ''
  );
  const [replyMessage, setReplyMessage] = useState('');

  const [newTicketForm, setNewTicketForm] = useState<{
    category: SupportTicket['category'];
    priority: SupportTicket['priority'];
    subject: string;
    message: string;
  }>({
    category: 'Demande d\'évolution',
    priority: 'Normale',
    subject: '',
    message: ''
  });

  // Filter tickets for this cabinet
  const myCabinetTickets = supportTickets.filter(
    (t) => t.organizationId === currentOrganization.id
  );

  const selectedTicket =
    myCabinetTickets.find((t) => t.id === selectedTicketId) || myCabinetTickets[0];

  const handleCreateTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTicketForm.subject.trim() || !newTicketForm.message.trim()) {
      showToast('Formulaire incomplet', 'Veuillez renseigner l’objet et le message de votre demande.', 'warning');
      return;
    }

    addSupportTicket({
      category: newTicketForm.category,
      priority: newTicketForm.priority,
      subject: newTicketForm.subject.trim(),
      message: newTicketForm.message.trim()
    });

    setNewTicketForm({
      category: 'Demande d\'évolution',
      priority: 'Normale',
      subject: '',
      message: ''
    });
    setIsNewTicketModalOpen(false);
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyMessage.trim() || !selectedTicket) return;
    addSupportTicketMessage(selectedTicket.id, replyMessage.trim());
    setReplyMessage('');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] bg-blue-500/20 text-blue-300 font-bold px-2 py-0.5 rounded-full border border-blue-400/30 uppercase tracking-wider">
                Support Dédié Praticiens Maroc
              </span>
              <span className="text-xs text-blue-200">
                · Assistance {currentOrganization.name}
              </span>
            </div>
            <h1 className="text-xl font-black tracking-tight text-white flex items-center gap-2">
              <LifeBuoy className="w-5 h-5 text-blue-400" />
              Centre d'Assistance & Support Technique Wolf Digital
            </h1>
            <p className="text-xs text-slate-300">
              Assistance réactive incluse dans votre abonnement SaaS (3 000 MAD / an)
            </p>
          </div>

          <button
            onClick={() => setIsNewTicketModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-900 bg-white hover:bg-slate-100 shadow-md transition-all active:scale-95 cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4 text-blue-600" />
            <span>Nouveau Ticket d'Assistance</span>
          </button>
        </div>
      </div>

      {/* SLA & Direct Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900">Garanties & SLA Médical</h3>
              <p className="text-[11px] text-slate-500">Disponibilité 99.98% · RLS & Chiffrement AES-256</p>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-600 space-y-1">
            <div className="flex items-center justify-between">
              <span>Sauvegardes quotidiennes</span>
              <span className="font-semibold text-emerald-700">04:00 (Certifié)</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Temps de réponse critique</span>
              <span className="font-semibold text-slate-800">&lt; 2 heures ouvrées</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900">Assistance Téléphonique</h3>
              <p className="text-[11px] text-slate-500">Lundi au Samedi · 8h30 à 19h00</p>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-600 space-y-1">
            <div className="flex items-center justify-between">
              <span>Ligne Praticiens</span>
              <span className="font-bold text-blue-700 font-mono">+212 5 22 84 90 00</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Ligne d'Urgence Serveur</span>
              <span className="font-bold text-slate-800 font-mono">0800 00 90 20 (Gratuit)</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900">Emailing Dédié & DPO</h3>
              <p className="text-[11px] text-slate-500">support-sante@wolfdigital.ma</p>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-600 space-y-1">
            <div className="flex items-center justify-between">
              <span>Conformité Loi 09-08</span>
              <span className="font-semibold text-emerald-700">Récépissé D-M-588/2026</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Conseiller Régional</span>
              <span className="font-semibold text-slate-800">Souss-Massa / Agadir</span>
            </div>
          </div>
        </div>
      </div>

      {/* Ticket History & Messaging Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ticket List */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden lg:col-span-1 flex flex-col">
          <div className="p-4 border-b border-slate-200 bg-slate-50/70 flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold text-slate-900">Mes Demandes d'Assistance</h3>
              <p className="text-[10px] text-slate-500">{myCabinetTickets.length} ticket(s) actif(s)</p>
            </div>
            <button
              onClick={() => setIsNewTicketModalOpen(true)}
              className="p-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-slate-100 overflow-y-auto max-h-96 flex-1">
            {myCabinetTickets.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-xs">
                Aucun ticket en cours. Cliquez sur "Nouveau Ticket" pour solliciter nos ingénieurs.
              </div>
            ) : (
              myCabinetTickets.map((ticket) => {
                const isSelected = ticket.id === (selectedTicket?.id || '');
                return (
                  <div
                    key={ticket.id}
                    onClick={() => setSelectedTicketId(ticket.id)}
                    className={`p-3.5 cursor-pointer transition-colors ${
                      isSelected ? 'bg-blue-50/80 border-l-4 border-blue-600' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="font-bold text-xs text-slate-900 truncate">
                        {ticket.subject}
                      </span>
                      <span
                        className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold shrink-0 ${
                          ticket.status === 'Résolu'
                            ? 'bg-emerald-100 text-emerald-800'
                            : ticket.status === 'En cours de traitement'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {ticket.status}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-500 mt-1">
                      <span className="bg-slate-100 px-1.5 py-0.2 rounded text-slate-600 font-medium">
                        {ticket.category}
                      </span>
                      <span>{ticket.updatedAt}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Selected Ticket Conversation */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden lg:col-span-2 flex flex-col">
          {selectedTicket ? (
            <>
              <div className="p-4 border-b border-slate-200 bg-slate-50/70 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-bold text-slate-900">{selectedTicket.subject}</h3>
                    <span className="text-[10px] bg-slate-200 text-slate-700 font-mono px-1.5 py-0.2 rounded">
                      #{selectedTicket.id}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Catégorie: {selectedTicket.category} · Priorité: {selectedTicket.priority} · Créé le {selectedTicket.createdAt}
                  </p>
                </div>

                <span
                  className={`text-xs px-2.5 py-1 rounded-full font-bold ${
                    selectedTicket.status === 'Résolu'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {selectedTicket.status}
                </span>
              </div>

              {/* Message History */}
              <div className="p-4 space-y-3 flex-1 overflow-y-auto max-h-72 bg-slate-50/30">
                {selectedTicket.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${!msg.isWolfStaff ? 'items-end' : 'items-start'}`}
                  >
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mb-1">
                      <span className="font-bold text-slate-600">{msg.senderName}</span>
                      <span>({msg.senderRole})</span>
                      <span>· {msg.timestamp}</span>
                    </div>
                    <div
                      className={`max-w-lg p-3 rounded-xl text-xs leading-relaxed ${
                        !msg.isWolfStaff
                          ? 'bg-blue-600 text-white rounded-tr-none'
                          : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-2xs'
                      }`}
                    >
                      {msg.message}
                    </div>
                  </div>
                ))}
              </div>

              {/* Reply Box */}
              <form onSubmit={handleSendReply} className="p-3 border-t border-slate-200 bg-white">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Écrire une réponse à l'équipe technique..."
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Envoyer</span>
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="p-12 text-center text-slate-400 text-xs">
              Aucun ticket sélectionné
            </div>
          )}
        </div>
      </div>

      {/* New Ticket Modal */}
      {isNewTicketModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in duration-150">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                  <Plus className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Ouvrir un Ticket de Support</h3>
                  <p className="text-[11px] text-slate-500">Transmis directement aux ingénieurs Wolf Digital</p>
                </div>
              </div>
              <button
                onClick={() => setIsNewTicketModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold cursor-pointer p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateTicketSubmit} className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Catégorie</label>
                  <select
                    value={newTicketForm.category}
                    onChange={(e) =>
                      setNewTicketForm((prev) => ({ ...prev, category: e.target.value as any }))
                    }
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="Bug technique">Bug technique</option>
                    <option value="Compte & Accès">Compte & Accès</option>
                    <option value="Abonnement & Facturation">Abonnement & Facturation</option>
                    <option value="Sauvegarde & Export">Sauvegarde & Export</option>
                    <option value="Demande d'évolution">Demande d'évolution</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Priorité</label>
                  <select
                    value={newTicketForm.priority}
                    onChange={(e) =>
                      setNewTicketForm((prev) => ({ ...prev, priority: e.target.value as any }))
                    }
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="Basse">Basse</option>
                    <option value="Normale">Normale</option>
                    <option value="Haute">Haute (Prioritaire)</option>
                    <option value="Critique">Critique (Bloquant)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Objet de votre demande *</label>
                <input
                  type="text"
                  placeholder="Ex: Demande d'intégration d'un modèle d'ordonnance personnalisé..."
                  value={newTicketForm.subject}
                  onChange={(e) => setNewTicketForm((prev) => ({ ...prev, subject: e.target.value }))}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Message détaillé *</label>
                <textarea
                  rows={4}
                  placeholder="Décrivez votre besoin ou le comportement constaté..."
                  value={newTicketForm.message}
                  onChange={(e) => setNewTicketForm((prev) => ({ ...prev, message: e.target.value }))}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                  required
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsNewTicketModalOpen(false)}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm cursor-pointer flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Envoyer la demande</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
