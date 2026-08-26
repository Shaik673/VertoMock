import React from 'react';
import { 
  TrendingUp, 
  PlayCircle, 
  Code2, 
  FileText, 
  Layers, 
  BookOpen, 
  Zap, 
  Award, 
  Clock, 
  ChevronRight,
  Flame,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useInterview } from '../context/InterviewContext';
import { INITIAL_ANALYTICS } from '../data/mockData';

interface DashboardPageProps {
  setCurrentTab: (tab: string) => void;
  onViewReport: (sessionId: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ setCurrentTab, onViewReport }) => {
  const { user, resume, pastInterviews } = useAuth();
  const { isInterviewActive } = useInterview();

  const readinessScore = user?.readinessScore || 86;
  const streakDays = user?.streakDays || 6;
  const completedCount = user?.interviewsCompleted || 14;

  const categoryScores = INITIAL_ANALYTICS.categoryScores;
  const recentSession = pastInterviews[0];

  return (
    <div className="space-y-6 pb-12">
      
      {/* Top Banner / Greeting */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900 via-blue-900 to-slate-900 p-6 sm:p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-cyan-300 border border-white/10">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Evaluation Engine v2.5 Online</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, {user?.fullName || 'Candidate'} 👋
            </h1>
            <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
              Target Role: <strong className="text-white">{user?.targetRoles?.[0] || 'Full Stack Developer'}</strong>. Your interview readiness is currently trending <span className="text-emerald-400 font-bold">↑ 8%</span> higher than last month.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              id="dash-start-interview-btn"
              onClick={() => setCurrentTab(isInterviewActive ? 'interview-room' : 'interview-setup')}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-extrabold text-sm shadow-lg shadow-cyan-500/25 transition-all hover:scale-105 active:scale-95"
            >
              <PlayCircle className="w-4 h-4 fill-current" />
              <span>{isInterviewActive ? 'Resume Active Session' : 'Start Mock Interview'}</span>
            </button>
            <button
              onClick={() => setCurrentTab('coding')}
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-semibold text-sm border border-white/15 transition-colors"
            >
              <Code2 className="w-4 h-4 text-indigo-300" />
              <span>Coding Arena</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Overall Readiness Ring Card */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Interview Readiness
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                {readinessScore}%
              </span>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center">
                <TrendingUp className="w-3 h-3 mr-0.5" /> +8%
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Target benchmark: 85%+
            </p>
          </div>

          {/* Mini circular dial */}
          <div className="relative w-14 h-14 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-200 dark:text-slate-800"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-indigo-600 dark:text-indigo-400"
                strokeDasharray={`${readinessScore}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <Zap className="w-5 h-5 text-indigo-500 absolute" />
          </div>
        </div>

        {/* Interviews Completed */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Mocks Completed
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                {completedCount}
              </span>
              <span className="text-xs font-medium text-slate-500">Sessions</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Avg score: 84.5 / 100
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-200/50 dark:border-blue-800/60">
            <Award className="w-6 h-6" />
          </div>
        </div>

        {/* Current Streak */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Practice Streak
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-amber-500">
                {streakDays} Days
              </span>
              <span className="text-xs font-bold text-amber-500 flex items-center">
                <Flame className="w-3.5 h-3.5 fill-current" /> Hot
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Keep it going for +10% boost
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-500 flex items-center justify-center border border-amber-200/50 dark:border-amber-800/60">
            <Flame className="w-6 h-6 fill-current" />
          </div>
        </div>

        {/* Resume Match Score */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Resume ATS Score
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
                {resume?.scores?.overall || 92}%
              </span>
              <span className="text-xs font-bold text-emerald-500">Strong</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              {resume?.skills?.length || 10} verified skills parsed
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-200/50 dark:border-emerald-800/60">
            <FileText className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Grid: Category Performance & Quick Action Center */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Category Breakdown (2 Cols) */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Skill Mastery & Domain Performance
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Evaluated from your past technical, coding, system design and HR mock rounds
              </p>
            </div>
            <button
              onClick={() => setCurrentTab('analytics')}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-0.5"
            >
              <span>Full Analytics</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {categoryScores.map((cat) => (
              <div
                key={cat.category}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-100 dark:border-slate-800/80 space-y-2"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    {cat.category}
                  </span>
                  <span className="font-extrabold text-slate-900 dark:text-white">
                    {cat.score} / 100
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      cat.score >= 88
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                        : cat.score >= 80
                        ? 'bg-gradient-to-r from-indigo-500 to-blue-500'
                        : 'bg-gradient-to-r from-amber-500 to-orange-400'
                    }`}
                    style={{ width: `${cat.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Weak Topics Alert Box */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs">
              <span className="font-bold text-amber-800 dark:text-amber-300 block">
                Recommended Focus Area: Distributed System Caching & DP
              </span>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Your performance in B+ Tree indexing and cache stampede mitigation scored slightly below your 86% benchmark. Practice 5 targeted questions to boost your readiness.
              </p>
              <button
                onClick={() => setCurrentTab('practice')}
                className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-amber-700 dark:text-amber-400 hover:underline"
              >
                <span>Start Practice Drill</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Launch Cards & Recent Report (1 Col) */}
        <div className="space-y-6">
          
          {/* Quick Practice Modules */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Practice Arenas
            </h3>
            
            <div className="space-y-2.5">
              <div
                onClick={() => setCurrentTab('coding')}
                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/80 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 border border-slate-100 dark:border-slate-800 cursor-pointer transition-colors flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                    <Code2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-indigo-500 transition-colors">
                      Live Coding Arena
                    </h4>
                    <p className="text-[11px] text-slate-500">DSA & Sandbox Runner</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </div>

              <div
                onClick={() => setCurrentTab('system-design')}
                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/80 hover:bg-cyan-50 dark:hover:bg-cyan-950/40 border border-slate-100 dark:border-slate-800 cursor-pointer transition-colors flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-cyan-500 transition-colors">
                      System Design Studio
                    </h4>
                    <p className="text-[11px] text-slate-500">Architecture Whiteboard</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </div>

              <div
                onClick={() => setCurrentTab('resume')}
                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/80 hover:bg-blue-50 dark:hover:bg-blue-950/40 border border-slate-100 dark:border-slate-800 cursor-pointer transition-colors flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors">
                      Resume Intelligence
                    </h4>
                    <p className="text-[11px] text-slate-500">Skill Parser & ATS Score</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Recent Interview Card */}
          {recentSession && (
            <div className="p-5 rounded-3xl bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-slate-900 dark:to-indigo-950/40 border border-indigo-200/60 dark:border-indigo-900/50 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase font-bold tracking-wider text-indigo-600 dark:text-indigo-400">
                  Latest Mock Report
                </span>
                <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
                  {recentSession.overallScore}% Score
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                {recentSession.targetRole} • {recentSession.interviewType.toUpperCase()}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                {recentSession.aiSummary || 'Strong problem solving and clear articulation of distributed systems trade-offs.'}
              </p>
              <button
                onClick={() => onViewReport(recentSession.sessionId)}
                className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors shadow-sm"
              >
                View Full Assessment Report
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
