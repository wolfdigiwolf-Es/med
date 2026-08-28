import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { CommandPalette } from './components/CommandPalette';
import { PrintModal } from './components/PrintModal';
import { RegisterModal } from './components/RegisterModal';
import { NewPatientModal } from './components/NewPatientModal';
import { NewAppointmentModal } from './components/NewAppointmentModal';
import { NewDocumentModal } from './components/NewDocumentModal';
import { AccountCredentialsModal } from './components/AccountCredentialsModal';

// Views
import { LandingPageView } from './views/LandingPageView';
import { RegisterView } from './views/RegisterView';
import { LoginView } from './views/LoginView';
import { DashboardView } from './views/DashboardView';
import { PatientsView } from './views/PatientsView';
import { PatientDetailView } from './views/PatientDetailView';
import { ConsultationView } from './views/ConsultationView';
import { PrescriptionView } from './views/PrescriptionView';
import { CertificatesView } from './views/CertificatesView';
import { AgendaView } from './views/AgendaView';
import { WaitingRoomView } from './views/WaitingRoomView';
import { DocumentsView } from './views/DocumentsView';
import { MedicationsView } from './views/MedicationsView';
import { FinancesView } from './views/FinancesView';
import { StatisticsView } from './views/StatisticsView';
import { SettingsView } from './views/SettingsView';
import { SecurityComplianceView } from './views/SecurityComplianceView';
import { SupportView } from './views/SupportView';
import { WolfAdminView } from './views/WolfAdminView';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const AppContent: React.FC = () => {
  const { currentTab, toasts, dismissToast, isLoggedIn } = useApp();

  // Modals state
  const [isNewPatientOpen, setIsNewPatientOpen] = useState(false);
  const [isNewAppointmentOpen, setIsNewAppointmentOpen] = useState(false);
  const [isNewDocumentOpen, setIsNewDocumentOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (!isLoggedIn && currentTab !== 'landing' && currentTab !== 'register') {
    return <LoginView />;
  }

  const renderCurrentView = () => {
    switch (currentTab) {
      case 'register':
        return <RegisterView />;
      case 'dashboard':
        return (
          <DashboardView
            onOpenNewPatient={() => setIsNewPatientOpen(true)}
            onOpenNewAppointment={() => setIsNewAppointmentOpen(true)}
          />
        );
      case 'patients':
        return <PatientsView onOpenNewPatient={() => setIsNewPatientOpen(true)} />;
      case 'patient-detail':
        return (
          <PatientDetailView
            onOpenNewDocument={() => setIsNewDocumentOpen(true)}
            onOpenNewAppointment={() => setIsNewAppointmentOpen(true)}
          />
        );
      case 'consultation':
        return <ConsultationView />;
      case 'prescriptions':
        return <PrescriptionView />;
      case 'certificates':
        return <CertificatesView />;
      case 'agenda':
        return <AgendaView onOpenNewAppointment={() => setIsNewAppointmentOpen(true)} />;
      case 'waiting-room':
        return <WaitingRoomView />;
      case 'documents':
        return <DocumentsView onOpenNewDocument={() => setIsNewDocumentOpen(true)} />;
      case 'medications':
        return <MedicationsView />;
      case 'finances':
        return <FinancesView />;
      case 'statistics':
        return <StatisticsView />;
      case 'security-compliance':
        return <SecurityComplianceView />;
      case 'settings':
        return <SettingsView />;
      case 'support':
        return <SupportView />;
      case 'wolf-admin':
        return <WolfAdminView />;
      default:
        return (
          <DashboardView
            onOpenNewPatient={() => setIsNewPatientOpen(true)}
            onOpenNewAppointment={() => setIsNewAppointmentOpen(true)}
          />
        );
    }
  };

  if (currentTab === 'landing') {
    return (
      <div className="w-full min-h-screen bg-slate-900 text-slate-100 font-sans antialiased">
        <LandingPageView />

        {/* Global Modals */}
        <RegisterModal />
        <CommandPalette />
        <PrintModal />
        <NewPatientModal isOpen={isNewPatientOpen} onClose={() => setIsNewPatientOpen(false)} />
        <NewAppointmentModal
          isOpen={isNewAppointmentOpen}
          onClose={() => setIsNewAppointmentOpen(false)}
        />
        <NewDocumentModal isOpen={isNewDocumentOpen} onClose={() => setIsNewDocumentOpen(false)} />

        {/* Toast Notification Alerts */}
        {toasts && toasts.length > 0 && (
          <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none">
            {toasts.map((toast) => (
              <div
                key={toast.id}
                className={`flex items-start gap-3 p-3.5 rounded-xl shadow-xl border text-xs max-w-sm backdrop-blur-md pointer-events-auto animate-in slide-in-from-bottom-3 duration-200 ${
                  toast.type === 'success'
                    ? 'bg-slate-900/95 text-white border-slate-700'
                    : toast.type === 'warning'
                    ? 'bg-amber-900/95 text-white border-amber-700'
                    : 'bg-slate-900/95 text-white border-slate-700'
                }`}
              >
                {toast.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                ) : toast.type === 'warning' ? (
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                ) : (
                  <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                )}

                <div className="flex-1 space-y-0.5">
                  <p className="font-bold text-xs">{toast.title}</p>
                  {toast.description && (
                    <p className="text-[11px] text-slate-300 leading-relaxed">{toast.description}</p>
                  )}
                </div>

                <button
                  onClick={() => dismissToast(toast.id)}
                  className="text-slate-400 hover:text-white p-0.5 rounded transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full bg-[#f8fafc] text-slate-900 overflow-hidden font-sans antialiased selection:bg-blue-600 selection:text-white">
      {/* Sidebar */}
      <Sidebar
        isMobileOpen={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Top Header */}
        <Header
          onOpenNewPatient={() => setIsNewPatientOpen(true)}
          onOpenNewAppointment={() => setIsNewAppointmentOpen(true)}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        />

        {/* Dynamic View Container */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden relative bg-[#f8fafc] focus:outline-hidden pb-8 flex flex-col">
          {renderCurrentView()}
        </main>
      </div>

      {/* Global Modals */}
      <RegisterModal />
      <CommandPalette />
      <PrintModal />
      <AccountCredentialsModal />
      <NewPatientModal isOpen={isNewPatientOpen} onClose={() => setIsNewPatientOpen(false)} />
      <NewAppointmentModal
        isOpen={isNewAppointmentOpen}
        onClose={() => setIsNewAppointmentOpen(false)}
      />
      <NewDocumentModal isOpen={isNewDocumentOpen} onClose={() => setIsNewDocumentOpen(false)} />

      {/* Toast Notification Alerts */}
      {toasts && toasts.length > 0 && (
        <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className={`flex items-start gap-3 p-3.5 rounded-xl shadow-xl border text-xs max-w-sm backdrop-blur-md pointer-events-auto animate-in slide-in-from-bottom-3 duration-200 ${
                toast.type === 'success'
                  ? 'bg-slate-900/95 text-white border-slate-700'
                  : toast.type === 'warning'
                  ? 'bg-amber-900/95 text-white border-amber-700'
                  : 'bg-slate-900/95 text-white border-slate-700'
              }`}
            >
              {toast.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              ) : toast.type === 'warning' ? (
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              ) : (
                <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              )}

              <div className="flex-1 space-y-0.5">
                <p className="font-bold text-xs">{toast.title}</p>
                {toast.description && (
                  <p className="text-[11px] text-slate-300 leading-relaxed">{toast.description}</p>
                )}
              </div>

              <button
                onClick={() => dismissToast(toast.id)}
                className="text-slate-400 hover:text-white p-0.5 rounded transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
