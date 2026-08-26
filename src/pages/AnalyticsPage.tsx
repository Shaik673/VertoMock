import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Award, 
  Flame, 
  Calendar, 
  Clock, 
  ChevronRight, 
  FileText,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { INITIAL_ANALYTICS } from '../data/mockData';

interface AnalyticsPageProps {
  onViewReport: (sessionId: string) => void;
}

export const AnalyticsPage: React.FC<AnalyticsPageProps> = ({ onViewReport }) => {
  const { user, pastInterviews } = useAuth();

  const analytics = INITIAL_ANALYTICS;
  const history = pastInterviews;

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-200/60 dark:border-indigo-800/60">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-extrabold text-slate-900 dark:text-white">
              Performance Analytics & History
            </h1>
            <p className="text-xs text-slate-500">
              Track readiness trajectories, historical scores, and granular skill growth
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs font-semibold">
          <div className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            {pastInterviews.length} Total Sessions
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60 font-bold">
            Avg Score: 86.4%
          </div>
        </div>
      </div>

      {/* Trajectory & Progression Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Score Progression Over Time */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Assessment Score Progression
            </h3>
            <span className="text-xs text-emerald-500 font-bold flex items-center gap-0.5">
              <TrendingUp className="w-3.5 h-3.5" /> +14 pts over 6 weeks
            </span>
          </div>

          <div className="space-y-3 pt-2">
            {analytics.scoreProgression.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-600 dark:text-slate-400">{item.date}</span>
                  <span className="text-slate-900 dark:text-white font-bold">{item.score}%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-indigo-600 to-cyan-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${item.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skill Category Benchmarking */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Domain Competency Ratings
            </h3>
            <span className="text-xs text-slate-500 font-medium">Industry Benchmark: 80%</span>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            {analytics.categoryScores.map((cat, idx) => (
              <div
                key={idx}
                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-100 dark:border-slate-800 space-y-1"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-600 dark:text-slate-400 truncate">{cat.category}</span>
                  <span className="font-bold text-slate-900 dark:text-white">{cat.score}%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-indigo-600 h-full rounded-full"
                    style={{ width: `${cat.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Full Historical Sessions Table */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          Historical Assessment Sessions Log
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-200 dark:border-slate-800 font-mono">
              <tr>
                <th className="pb-3">Session & Target Role</th>
                <th className="pb-3">Round Type</th>
                <th className="pb-3">Difficulty</th>
                <th className="pb-3">Date</th>
                <th className="pb-3">Overall Score</th>
                <th className="pb-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
              {history.map((sess) => (
                <tr key={sess.sessionId} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 pr-4">
                    <div className="font-bold text-slate-900 dark:text-white">
                      {sess.targetRole}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      {sess.sessionId}
                    </div>
                  </td>
                  <td className="py-3.5 pr-4 uppercase text-[11px] font-semibold text-slate-600 dark:text-slate-300">
                    {sess.interviewType}
                  </td>
                  <td className="py-3.5 pr-4">
                    <span className="capitalize px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-semibold">
                      {sess.difficulty}
                    </span>
                  </td>
                  <td className="py-3.5 pr-4 text-slate-500 font-mono text-[11px]">
                    {sess.completedAt ? new Date(sess.completedAt).toLocaleDateString() : 'Recent'}
                  </td>
                  <td className="py-3.5 pr-4">
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                      {sess.overallScore || 88}%
                    </span>
                  </td>
                  <td className="py-3.5 text-right">
                    <button
                      onClick={() => onViewReport(sess.sessionId)}
                      className="px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 hover:bg-indigo-100 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60 font-bold transition-colors"
                    >
                      View Report
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
