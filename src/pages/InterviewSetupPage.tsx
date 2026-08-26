import React, { useState } from 'react';
import { 
  PlayCircle, 
  Sparkles, 
  CheckCircle2, 
  Sliders, 
  Clock, 
  HelpCircle, 
  FileText, 
  Cpu, 
  Terminal, 
  Layers, 
  UserCheck, 
  Briefcase,
  Zap
} from 'lucide-react';
import { InterviewType, TargetRole, DifficultyLevel, ExperienceLevel } from '../types';
import { useInterview } from '../context/InterviewContext';
import { useAuth } from '../context/AuthContext';

interface InterviewSetupPageProps {
  onStart: () => void;
}

export const InterviewSetupPage: React.FC<InterviewSetupPageProps> = ({ onStart }) => {
  const { startInterview, isEvaluating } = useInterview();
  const { user, resume } = useAuth();

  const [targetRole, setTargetRole] = useState<TargetRole>(
    (user?.targetRoles?.[0] as TargetRole) || 'Full Stack Developer'
  );
  const [interviewType, setInterviewType] = useState<InterviewType>('full-mock');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('adaptive');
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>('mid');
  const [durationMinutes, setDurationMinutes] = useState<number>(30);
  const [questionCount, setQuestionCount] = useState<number>(5);
  const [useResumeContext, setUseResumeContext] = useState<boolean>(true);

  const roles: TargetRole[] = [
    'Full Stack Developer',
    'Software Engineer',
    'Backend Developer',
    'Frontend Developer',
    'AI Engineer',
    'ML Engineer',
    'Data Scientist',
    'DevOps Engineer',
    'Cloud Architect'
  ];

  const interviewTypes: { id: InterviewType; title: string; desc: string; icon: any; badge: string }[] = [
    {
      id: 'full-mock',
      title: 'Full Mock Simulation',
      desc: 'End-to-end real simulation covering Technical, Coding, System Design & HR rounds.',
      icon: Sparkles,
      badge: 'Most Popular'
    },
    {
      id: 'technical',
      title: 'Technical Fundamentals',
      desc: 'Deep questions on DSA, DBMS, Operating Systems, Computer Networks & OOP.',
      icon: Terminal,
      badge: 'Core Theory'
    },
    {
      id: 'coding',
      title: 'Algorithmic Coding Round',
      desc: 'Solve algorithmic challenges in a real-time sandbox with automated test cases.',
      icon: Cpu,
      badge: 'Sandbox'
    },
    {
      id: 'system-design',
      title: 'System Design & Scalability',
      desc: 'Architect high-throughput distributed systems on an interactive whiteboard.',
      icon: Layers,
      badge: 'Architecture'
    },
    {
      id: 'aiml',
      title: 'AI / ML & LLM Architecture',
      desc: 'Transformers, RAG pipelines, fine-tuning, embeddings, and deep learning.',
      icon: Zap,
      badge: 'Cutting Edge'
    },
    {
      id: 'hr',
      title: 'HR & Behavioral Reasoning',
      desc: 'STAR method evaluation, conflict resolution, leadership and culture fit.',
      icon: UserCheck,
      badge: 'Leadership'
    }
  ];

  const handleLaunch = async () => {
    await startInterview({
      targetRole,
      interviewType,
      difficulty,
      experienceLevel,
      durationMinutes,
      questionCount,
      resumeId: useResumeContext ? resume?.id : undefined
    });
    onStart();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200/60 dark:border-indigo-800/60 text-xs font-bold text-indigo-600 dark:text-indigo-400">
          <Sliders className="w-3.5 h-3.5" />
          <span>Interactive Session Builder</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Configure Your AI Mock Interview
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          Tailor the role, difficulty, time constraints, and round types to simulate your exact upcoming job interview.
        </p>
      </div>

      {/* Configuration Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-8">
        
        {/* 1. Target Role */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-indigo-500" />
            <span>1. Select Target Job Role</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {roles.map((role) => (
              <button
                key={role}
                onClick={() => setTargetRole(role)}
                className={`p-3 rounded-2xl border text-xs font-semibold text-left transition-all duration-150 flex items-center justify-between ${
                  targetRole === role
                    ? 'border-indigo-600 dark:border-indigo-500 bg-indigo-50/80 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 shadow-sm ring-1 ring-indigo-500/20'
                    : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300'
                }`}
              >
                <span>{role}</span>
                {targetRole === role && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Interview Round Type */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-500" />
            <span>2. Select Interview Round Type</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {interviewTypes.map((type) => {
              const Icon = type.icon;
              const isSelected = interviewType === type.id;
              return (
                <div
                  key={type.id}
                  onClick={() => setInterviewType(type.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 flex flex-col justify-between space-y-3 relative group ${
                    isSelected
                      ? 'border-indigo-600 dark:border-indigo-500 bg-indigo-50/60 dark:bg-indigo-950/40 shadow-md ring-1 ring-indigo-500/20'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-950/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                      isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {type.badge}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                      {type.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                      {type.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Difficulty & Experience Level */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          {/* Difficulty */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
              Difficulty Mode
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'adaptive', label: 'Adaptive (AI tuned)', desc: 'Adjusts per answer' },
                { id: 'medium', label: 'Medium', desc: 'Standard industry bar' },
                { id: 'hard', label: 'Hard / FAANG', desc: 'Deep distributed edge-cases' },
                { id: 'easy', label: 'Easy / Warmup', desc: 'Fundamental concepts' }
              ].map((d) => (
                <button
                  key={d.id}
                  onClick={() => setDifficulty(d.id as DifficultyLevel)}
                  className={`p-2.5 rounded-xl border text-left text-xs transition-colors ${
                    difficulty === d.id
                      ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-950/40 text-cyan-800 dark:text-cyan-300 font-bold'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 text-slate-700 dark:text-slate-400'
                  }`}
                >
                  <div className="font-semibold">{d.label}</div>
                  <div className="text-[10px] text-slate-500 font-normal">{d.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Experience Level */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
              Candidate Seniority
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'fresher', label: 'Fresher' },
                { id: 'junior', label: 'Junior (1-2y)' },
                { id: 'mid', label: 'Mid (2-5y)' },
                { id: 'senior', label: 'Senior (5y+)' },
                { id: 'lead', label: 'Staff / Lead' },
                { id: 'intern', label: 'Intern' }
              ].map((exp) => (
                <button
                  key={exp.id}
                  onClick={() => setExperienceLevel(exp.id as ExperienceLevel)}
                  className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition-colors ${
                    experienceLevel === exp.id
                      ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 text-slate-700 dark:text-slate-400'
                  }`}
                >
                  {exp.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 4. Duration & Question Count */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-indigo-500" />
              <span>Target Duration</span>
            </label>
            <div className="flex items-center gap-2">
              {[15, 30, 45, 60].map((mins) => (
                <button
                  key={mins}
                  onClick={() => setDurationMinutes(mins)}
                  className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition-colors ${
                    durationMinutes === mins
                      ? 'border-indigo-600 bg-indigo-600 text-white shadow-sm'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {mins} min
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-indigo-500" />
              <span>Questions Count</span>
            </label>
            <div className="flex items-center gap-2">
              {[3, 5, 8, 10].map((count) => (
                <button
                  key={count}
                  onClick={() => setQuestionCount(count)}
                  className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition-colors ${
                    questionCount === count
                      ? 'border-indigo-600 bg-indigo-600 text-white shadow-sm'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {count} Questions
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 5. Resume Personalization Context Checkbox */}
        <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200/60 dark:border-indigo-800/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">
                Incorporate Uploaded Resume Context
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                {resume ? `Using "${resume.fileName}" (${resume.skills.slice(0, 4).join(', ')}...)` : 'No resume uploaded yet (generic questions will be used)'}
              </div>
            </div>
          </div>
          <input
            type="checkbox"
            checked={useResumeContext}
            onChange={(e) => setUseResumeContext(e.target.checked)}
            className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
          />
        </div>

        {/* Launch CTA Button */}
        <div className="pt-2">
          <button
            id="launch-interview-btn"
            disabled={isEvaluating}
            onClick={handleLaunch}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 hover:from-indigo-500 hover:via-blue-500 hover:to-cyan-400 text-white font-extrabold text-base shadow-xl shadow-indigo-600/25 transition-transform hover:scale-[1.01] active:scale-98 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <PlayCircle className="w-5 h-5 fill-current" />
            <span>{isEvaluating ? 'Configuring AI Session...' : 'Enter AI Interview Room'}</span>
          </button>
          <p className="text-center text-[11px] text-slate-500 dark:text-slate-400 mt-2">
            Microphone & Camera will be activated for realistic voice interaction and proctoring.
          </p>
        </div>
      </div>
    </div>
  );
};
