import React from 'react';
import { 
  Award, 
  CheckCircle2, 
  AlertTriangle, 
  RotateCcw, 
  Share2, 
  Download, 
  Calendar, 
  TrendingUp, 
  Sparkles, 
  BarChart3, 
  Clock, 
  MessageSquare, 
  ChevronRight,
  Zap,
  BookOpen
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { InterviewSession } from '../types';

interface InterviewReportPageProps {
  sessionId?: string;
  onRetake: () => void;
  onPracticeWeakAreas: () => void;
}

export const InterviewReportPage: React.FC<InterviewReportPageProps> = ({
  sessionId,
  onRetake,
  onPracticeWeakAreas
}) => {
  const { pastInterviews } = useAuth();
  
  // Find session by id or default to latest
  const session: InterviewSession | undefined = sessionId 
    ? pastInterviews.find(s => s.sessionId === sessionId) 
    : pastInterviews[0];

  if (!session) {
    return (
      <div className="p-8 text-center space-y-4">
        <h3 className="text-lg font-bold">No Report Data Found</h3>
      </div>
    );
  }

  const overallScore = session.overallScore || 88;
  const hiringVerdict = overallScore >= 85 ? 'Strong Hire' : overallScore >= 75 ? 'Hire' : 'Lean Hire';

  const categoryScores = session.categoryScores || {
    technical: 90,
    coding: 92,
    communication: 86,
    problemSolving: 88,
    systemDesign: 82,
    behavioral: 89
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert('Assessment Report URL copied to clipboard!');
    }
  };

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border border-slate-800 shadow-2xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Assessment Completed • {session.completedAt ? new Date(session.completedAt).toLocaleDateString() : 'Today'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {session.targetRole} Assessment Report
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Round: <span className="font-semibold text-white uppercase">{session.interviewType}</span> • Difficulty: <span className="capitalize font-semibold text-cyan-300">{session.difficulty}</span>
            </p>
          </div>

          {/* Overall Score Dial */}
          <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-md">
            <div className="text-right">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block">
                Hiring Verdict
              </span>
              <span className="text-lg font-black text-emerald-400">
                {hiringVerdict}
              </span>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex flex-col items-center justify-center font-black text-2xl shadow-lg">
              <span>{overallScore}</span>
              <span className="text-[9px] font-bold tracking-widest uppercase opacity-80">Score</span>
            </div>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
          <div className="flex items-center gap-2 text-cyan-300 font-bold text-xs">
            <Sparkles className="w-4 h-4" />
            <span>AI Executive Summary</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            {session.aiSummary || 'The candidate exhibited strong algorithmic intuition, crisp communication, and deep familiarity with state synchronization and distributed caches. Minor edge cases in B+ Tree fanout and dynamic programming memoization can be polished with focused drills.'}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2">
            <button
              onClick={onRetake}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Mock Interview</span>
            </button>
            <button
              onClick={onPracticeWeakAreas}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/10 transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Practice Weak Areas</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs border border-white/10 transition-colors"
              title="Copy shareable link"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={handleDownload}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs border border-white/10 transition-colors"
              title="Print / Save PDF"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Category Performance Breakdown */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          Category Competency Breakdown
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { label: 'Technical Depth', score: categoryScores.technical },
            { label: 'Coding / DSA', score: categoryScores.coding },
            { label: 'Communication', score: categoryScores.communication },
            { label: 'Problem Solving', score: categoryScores.problemSolving },
            { label: 'System Design', score: categoryScores.systemDesign },
            { label: 'Behavioral / STAR', score: categoryScores.behavioral }
          ].map((cat) => (
            <div
              key={cat.label}
              className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-100 dark:border-slate-800 space-y-1.5 text-center"
            >
              <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block truncate">
                {cat.label}
              </span>
              <span className="text-xl font-extrabold text-slate-900 dark:text-white block">
                {cat.score}%
              </span>
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

      {/* Strengths & Weaknesses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Strengths */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
            <CheckCircle2 className="w-4 h-4" />
            <span>Key Demonstrated Strengths</span>
          </div>
          <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
            {(session.keyStrengths || [
              'Clear technical explanation of state consistency and ACID properties',
              'Optimal O(N) algorithmic complexity implementation with zero syntax errors',
              'Articulate STAR format storytelling for behavioral challenges'
            ]).map((str, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold">•</span>
                <span>{str}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Areas for Growth */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-sm">
            <AlertTriangle className="w-4 h-4" />
            <span>Areas Recommended for Refinement</span>
          </div>
          <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
            {(session.keyWeaknesses || [
              'Could proactively discuss cache stampede mitigations (e.g. mutex locking or probabilistic early expiration)',
              'Elaborate more on distributed sharding partition keys in high-write scenarios'
            ]).map((w, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-amber-500 font-bold">•</span>
                <span>{w}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Question-by-Question Deep Dive */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          Question-by-Question Answer Analysis & Fluency Review
        </h3>

        <div className="space-y-4">
          {session.answers.map((ans, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800 space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
                  Question #{idx + 1}
                </span>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    ans.classification === 'excellent'
                      ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                      : ans.classification === 'correct'
                      ? 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-500/30'
                      : 'bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                  }`}>
                    {ans.classification}
                  </span>
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    Score: {ans.scores.overall}/100
                  </span>
                </div>
              </div>

              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                {ans.questionText}
              </h4>

              {/* Candidate Answer */}
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1">
                  Your Answer:
                </span>
                <p className="italic">"{ans.candidateAnswer}"</p>
              </div>

              {/* Communication metrics */}
              {ans.communicationMetrics && (
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-500 pt-1">
                  <span>Pace: {ans.communicationMetrics.speakingSpeedWpm || 135} WPM</span>
                  <span>Fillers: {ans.communicationMetrics.fillerWordsCount || 0} detected</span>
                  <span>Clarity: {ans.communicationMetrics.clarity || 88}%</span>
                </div>
              )}

              {/* Ideal Answer Summary */}
              <div className="p-3 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-900/50 text-xs text-slate-700 dark:text-slate-300">
                <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-600 dark:text-indigo-400 block mb-1">
                  AI Model Answer Benchmark:
                </span>
                <p>{ans.idealAnswerSummary}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7-Day Personalized Study Plan */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              7-Day Personalized Improvement Roadmap
            </h3>
            <p className="text-xs text-slate-500">
              Targeted curriculum generated from your identified skill gaps
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {(session.personalizedPlan || [
            { day: 1, topic: 'Arrays & Two Pointers', focus: 'Subarray sum and sliding window problems', recommendedTasks: ['Solve 3 LeetCode Mediums'] },
            { day: 2, topic: 'Binary Trees & Graphs', focus: 'BFS/DFS and topological sorting', recommendedTasks: ['Review Course Schedule'] },
            { day: 3, topic: 'DBMS & Indexing', focus: 'B+ Tree fanout and transaction isolation levels', recommendedTasks: ['Review MVCC & phantom reads'] },
            { day: 4, topic: 'Operating Systems', focus: 'Deadlock Coffman conditions and paging', recommendedTasks: ['Review page fault handlers'] },
            { day: 5, topic: 'Distributed Caching', focus: 'Cache-aside vs write-through and stampede locking', recommendedTasks: ['Design Redis rate limiter'] },
            { day: 6, topic: 'Behavioral STAR Mastery', focus: 'Leadership, ambiguity, and technical conflict', recommendedTasks: ['Record 2 STAR answers'] },
            { day: 7, topic: 'Full 45-Min Mock Interview', focus: 'Re-evaluate readiness on VertoMock AI', recommendedTasks: ['Take adaptive full mock'] }
          ]).map((day) => (
            <div
              key={day.day}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-100 dark:border-slate-800 space-y-2"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-indigo-600 dark:text-indigo-400 font-mono">
                  Day {day.day}
                </span>
                <span className="text-[10px] text-slate-500 font-semibold uppercase">
                  Target
                </span>
              </div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                {day.topic}
              </h4>
              <p className="text-[11px] text-slate-600 dark:text-slate-400">
                {day.focus}
              </p>
              <div className="pt-1">
                {day.recommendedTasks.map((t, idx) => (
                  <span key={idx} className="inline-block text-[10px] px-2 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300">
                    ✓ {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
