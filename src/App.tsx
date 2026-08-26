import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { InterviewProvider, useInterview } from './context/InterviewContext';
import { Navbar } from './components/Navbar';
import { DashboardPage } from './pages/DashboardPage';
import { InterviewSetupPage } from './pages/InterviewSetupPage';
import { InterviewRoomPage } from './pages/InterviewRoomPage';
import { CodingInterviewPage } from './pages/CodingInterviewPage';
import { SystemDesignPage } from './pages/SystemDesignPage';
import { ResumeIntelligencePage } from './pages/ResumeIntelligencePage';
import { InterviewReportPage } from './pages/InterviewReportPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { PracticePage } from './pages/PracticePage';
import { ProfilePage } from './pages/ProfilePage';
import { AdminPage } from './pages/AdminPage';
import { Sparkles, Shield, Cpu, Heart } from 'lucide-react';

const MainApp: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [activeReportSessionId, setActiveReportSessionId] = useState<string | undefined>(undefined);
  const { isInterviewActive } = useInterview();

  const handleViewReport = (sessionId: string) => {
    setActiveReportSessionId(sessionId);
    setCurrentTab('report');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* Top Navigation */}
      <Navbar currentTab={currentTab} setCurrentTab={setCurrentTab} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
        {currentTab === 'dashboard' && (
          <DashboardPage
            setCurrentTab={setCurrentTab}
            onViewReport={handleViewReport}
          />
        )}

        {currentTab === 'interview-setup' && (
          <InterviewSetupPage
            onStart={() => setCurrentTab('interview-room')}
          />
        )}

        {currentTab === 'interview-room' && (
          <InterviewRoomPage
            onComplete={(sessionId) => handleViewReport(sessionId)}
            onSwitchToCoding={() => setCurrentTab('coding')}
            onSwitchToSystemDesign={() => setCurrentTab('system-design')}
          />
        )}

        {currentTab === 'coding' && (
          <CodingInterviewPage />
        )}

        {currentTab === 'system-design' && (
          <SystemDesignPage />
        )}

        {currentTab === 'resume' && (
          <ResumeIntelligencePage
            onStartCustomInterview={() => setCurrentTab('interview-setup')}
          />
        )}

        {currentTab === 'report' && (
          <InterviewReportPage
            sessionId={activeReportSessionId}
            onRetake={() => setCurrentTab('interview-setup')}
            onPracticeWeakAreas={() => setCurrentTab('practice')}
          />
        )}

        {currentTab === 'analytics' && (
          <AnalyticsPage
            onViewReport={handleViewReport}
          />
        )}

        {currentTab === 'practice' && (
          <PracticePage />
        )}

        {currentTab === 'profile' && (
          <ProfilePage />
        )}

        {currentTab === 'admin' && (
          <AdminPage />
        )}
      </main>

      {/* Footer */}
      <footer className="w-full bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-6 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <Sparkles className="w-3 h-3" />
            </div>
            <span className="font-bold text-slate-700 dark:text-slate-300">VertoMock AI</span>
            <span>— Intelligent Mock Assessment & Technical Interview Prep Platform</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-mono">
            <span className="flex items-center gap-1">
              <Shield className="w-3 h-3 text-emerald-500" />
              <span>Proctored Audio/Video</span>
            </span>
            <span className="flex items-center gap-1">
              <Cpu className="w-3 h-3 text-indigo-400" />
              <span>Gemini 2.5 Flash Engine</span>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <InterviewProvider>
        <MainApp />
      </InterviewProvider>
    </AuthProvider>
  );
}
