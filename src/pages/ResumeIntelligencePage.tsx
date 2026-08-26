import React, { useState } from 'react';
import { 
  FileText, 
  Upload, 
  Sparkles, 
  CheckCircle2, 
  Award, 
  Briefcase, 
  GraduationCap, 
  Code2, 
  Layers, 
  PlayCircle,
  TrendingUp,
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { SAMPLE_RESUME } from '../data/mockData';

interface ResumeIntelligencePageProps {
  onStartCustomInterview: () => void;
}

export const ResumeIntelligencePage: React.FC<ResumeIntelligencePageProps> = ({ onStartCustomInterview }) => {
  const { resume, updateResume, user } = useAuth();
  const [resumeText, setResumeText] = useState<string>(resume?.rawText || SAMPLE_RESUME.rawText);
  const [targetRole, setTargetRole] = useState<string>(user?.targetRoles?.[0] || 'Full Stack Developer');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [dragOver, setDragOver] = useState<boolean>(false);

  const handleAnalyze = async () => {
    if (!resumeText.trim()) {
      alert('Please enter or paste your resume text first.');
      return;
    }
    setIsAnalyzing(true);
    try {
      const parsed = await api.analyzeResume(resumeText, targetRole);
      updateResume(parsed);
    } catch (e) {
      console.error(e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleLoadSample = (sampleType: 'senior' | 'fresher' | 'ai') => {
    if (sampleType === 'senior') {
      setResumeText(SAMPLE_RESUME.rawText);
    } else if (sampleType === 'ai') {
      setResumeText(`MAYA LIN - AI & ML Engineer
Email: maya.lin@vertomock.ai | Seattle, WA
Education: M.S. in Computer Science (Stanford University, GPA: 3.92)

EXPERIENCE:
DeepScale AI Lab - Machine Learning Engineer (2024 - Present)
• Fine-tuned 7B and 70B parameter open-source LLMs using LoRA, QLoRA, and FlashAttention-2.
• Architected low-latency RAG vector search engine over 50M documents with Milvus and hybrid reranking.
• Optimized ONNX runtime and TensorRT inference throughput by 3.2x.

SKILLS:
Python, PyTorch, Transformers, Hugging Face, RAG, Milvus, Qdrant, FastAPI, Docker, CUDA, Kubernetes.`);
    } else {
      setResumeText(`JORDAN REED - Junior Software Engineer
Email: jordan.reed@vertomock.ai | Austin, TX
Education: B.S. in Computer Science (UT Austin, 2025)

EXPERIENCE:
CodeCraft Bootcamp - Teaching Assistant (2024 - 2025)
• Mentored 60+ junior students in Data Structures, Algorithms, JavaScript, and React.
• Built full-stack collaborative task management app in React, Node.js, Express, and PostgreSQL.

SKILLS:
Java, Python, JavaScript, React, HTML5/CSS3, Node.js, Express, PostgreSQL, Git.`);
    }
  };

  const scores = resume?.scores || SAMPLE_RESUME.scores;

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-200/60 dark:border-blue-800/60">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-extrabold text-slate-900 dark:text-white">
              Resume Intelligence & ATS Analyzer
            </h1>
            <p className="text-xs text-slate-500">
              Extract technical skills, assess ATS match score, and generate personalized interview questions
            </p>
          </div>
        </div>

        {/* Load Sample Buttons */}
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold">
          <span className="text-[11px] text-slate-500 px-2">Sample Resumes:</span>
          <button
            onClick={() => handleLoadSample('senior')}
            className="px-2.5 py-1 rounded-lg hover:bg-white dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 transition-colors"
          >
            Senior Fullstack
          </button>
          <button
            onClick={() => handleLoadSample('ai')}
            className="px-2.5 py-1 rounded-lg hover:bg-white dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 transition-colors"
          >
            AI / ML
          </button>
          <button
            onClick={() => handleLoadSample('fresher')}
            className="px-2.5 py-1 rounded-lg hover:bg-white dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 transition-colors"
          >
            Fresher
          </button>
        </div>
      </div>

      {/* Main Grid: Upload & Editor (Left) / ATS Analysis Results (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Input Textarea & Drag Zone (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                Target Role for ATS Optimization
              </label>
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                placeholder="e.g. Senior Full Stack Engineer"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Resume Text Area */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Resume Content (Text or PDF Paste)
                </label>
                <span className="text-[11px] text-slate-400 font-mono">
                  {resumeText.length} chars
                </span>
              </div>
              <textarea
                id="resume-text-input"
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                rows={12}
                placeholder="Paste your full resume text here..."
                className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 focus:outline-none focus:border-indigo-500 leading-relaxed"
              />
            </div>

            <button
              id="analyze-resume-btn"
              disabled={isAnalyzing}
              onClick={handleAnalyze}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/20 transition-transform active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isAnalyzing ? 'Extracting Skills & Benchmarking...' : 'Analyze Resume with AI'}</span>
            </button>
          </div>
        </div>

        {/* Right: ATS Score Breakdown & Extracted Profile (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* ATS Score Card */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  ATS Resume Strength & Match Score
                </h3>
                <p className="text-xs text-slate-500">
                  Benchmarked against top tech hiring rubrics for {targetRole}
                </p>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/60 dark:border-emerald-800/60 text-emerald-600 dark:text-emerald-400 font-extrabold text-sm">
                <Award className="w-4 h-4" />
                <span>{scores?.overall || 92}% Score</span>
              </div>
            </div>

            {/* Score Metric Bars */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { label: 'Tech Skills Match', val: scores?.technicalSkills || 94 },
                { label: 'Work Experience', val: scores?.experience || 90 },
                { label: 'Projects Quality', val: scores?.projects || 92 },
                { label: 'Education & Honors', val: scores?.education || 88 },
                { label: 'Keyword Density', val: scores?.keywordRelevance || 95 },
                { label: 'Formatting & ATS', val: 96 }
              ].map((s) => (
                <div
                  key={s.label}
                  className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800/80 space-y-1.5"
                >
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-slate-600 dark:text-slate-400">{s.label}</span>
                    <span className="font-bold text-slate-900 dark:text-white">{s.val}%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-indigo-600 dark:bg-indigo-400 h-full rounded-full"
                      style={{ width: `${s.val}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Parsed Skill Badges */}
            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Extracted Skills & Competencies ({resume?.skills.length || 10})
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {(resume?.skills || SAMPLE_RESUME.skills).map((skill, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60 text-xs font-semibold"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Suggested Tailored Questions */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                  <span>AI-Generated Questions Based on Your Resume</span>
                </h4>
              </div>

              <div className="space-y-2">
                {(resume?.suggestedQuestions || SAMPLE_RESUME.suggestedQuestions).map((q, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-200 flex items-start gap-2.5"
                  >
                    <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 font-bold flex items-center justify-center shrink-0 text-[10px]">
                      {idx + 1}
                    </span>
                    <p className="leading-relaxed">{q}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Launch Tailored Mock Button */}
            <div className="pt-2">
              <button
                onClick={onStartCustomInterview}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-500/20 transition-transform active:scale-95 flex items-center justify-center gap-2"
              >
                <PlayCircle className="w-4 h-4" />
                <span>Launch Mock Interview with These Questions</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
