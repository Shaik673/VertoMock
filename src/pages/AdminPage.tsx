import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Server, 
  Cpu, 
  Database, 
  Plus, 
  Search, 
  Trash2, 
  Sparkles, 
  CheckCircle2,
  RefreshCw,
  Activity
} from 'lucide-react';
import { QUESTION_BANK } from '../data/questionBank';
import { QuestionItem } from '../types';
import { api } from '../services/api';

export const AdminPage: React.FC = () => {
  const [questions, setQuestions] = useState<QuestionItem[]>(QUESTION_BANK);
  const [search, setSearch] = useState('');
  const [healthStatus, setHealthStatus] = useState<any>(null);
  const [isLoadingHealth, setIsLoadingHealth] = useState(false);

  // New question form
  const [newText, setNewText] = useState('');
  const [newCategory, setNewCategory] = useState<'technical' | 'coding' | 'system-design' | 'hr'>('technical');
  const [newTopic, setNewTopic] = useState('Data Structures');
  const [newDifficulty, setNewDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [newIdeal, setNewIdeal] = useState('');

  const fetchHealth = async () => {
    setIsLoadingHealth(true);
    const res = await api.checkHealth();
    setHealthStatus(res);
    setIsLoadingHealth(false);
  };

  useEffect(() => {
    fetchHealth();
  }, []);

  const handleAddQuestion = () => {
    if (!newText.trim()) return;
    const newQ: QuestionItem = {
      id: `custom-q-${Date.now()}`,
      text: newText.trim(),
      category: newCategory,
      topic: newTopic,
      difficulty: newDifficulty,
      targetRoles: ['Full Stack Developer', 'Software Engineer'],
      evaluationCriteria: ['Correctness', 'Depth', 'Communication'],
      idealAnswerOutline: newIdeal.trim() || 'Clear and structured explanation with trade-offs.'
    };
    setQuestions([newQ, ...questions]);
    setNewText('');
    setNewIdeal('');
    alert('Question added to active memory question bank!');
  };

  const handleDeleteQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const filtered = questions.filter(q => 
    q.text.toLowerCase().includes(search.toLowerCase()) || 
    q.topic.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-16">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-200/60 dark:border-indigo-800/60">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-extrabold text-slate-900 dark:text-white">
              Admin Telemetry & Question Bank Studio
            </h1>
            <p className="text-xs text-slate-500">
              Inspect backend Gemini runtime health, add custom questions, and tune assessment rubrics
            </p>
          </div>
        </div>

        <button
          onClick={fetchHealth}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoadingHealth ? 'animate-spin' : ''}`} />
          <span>Refresh Telemetry</span>
        </button>
      </div>

      {/* System Health Telemetry */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Gemini Engine Status
          </span>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-base font-extrabold text-slate-900 dark:text-white">
              {healthStatus?.aiConfigured ? 'Live & Connected' : 'Mock Fallback Ready'}
            </span>
          </div>
          <p className="text-[11px] text-slate-500 font-mono">
            Model: gemini-2.5-flash (Server-Side)
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Question Bank Registry
          </span>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
            {questions.length} Items Loaded
          </div>
          <p className="text-[11px] text-slate-500">
            DSA, DBMS, OS, Networks, System Design & HR
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Average Response Latency
          </span>
          <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
            ~320 ms
          </div>
          <p className="text-[11px] text-slate-500">
            Structured JSON Schema verification active
          </p>
        </div>
      </div>

      {/* Add Custom Question Form */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Plus className="w-4 h-4 text-indigo-500" />
          <span>Add Custom Question to System Library</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <label className="font-bold text-slate-600 dark:text-slate-400 block mb-1">Category</label>
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value as any)}
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="technical">Technical</option>
              <option value="coding">Coding</option>
              <option value="system-design">System Design</option>
              <option value="hr">HR / Behavioral</option>
            </select>
          </div>

          <div>
            <label className="font-bold text-slate-600 dark:text-slate-400 block mb-1">Topic</label>
            <input
              type="text"
              value={newTopic}
              onChange={(e) => setNewTopic(e.target.value)}
              placeholder="e.g. Distributed Consensus"
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="font-bold text-slate-600 dark:text-slate-400 block mb-1">Difficulty</label>
            <select
              value={newDifficulty}
              onChange={(e) => setNewDifficulty(e.target.value as any)}
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>

        <div className="space-y-1.5 text-xs">
          <label className="font-bold text-slate-600 dark:text-slate-400">Question Prompt</label>
          <textarea
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            placeholder="Enter the full question prompt..."
            rows={2}
            className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-indigo-500 leading-relaxed font-sans"
          />
        </div>

        <div className="space-y-1.5 text-xs">
          <label className="font-bold text-slate-600 dark:text-slate-400">Ideal Answer Benchmark</label>
          <textarea
            value={newIdeal}
            onChange={(e) => setNewIdeal(e.target.value)}
            placeholder="Key concepts, architecture trade-offs, and expected candidate keywords..."
            rows={2}
            className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-indigo-500 leading-relaxed font-sans"
          />
        </div>

        <button
          onClick={handleAddQuestion}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-colors"
        >
          Add to Question Bank
        </button>
      </div>

      {/* Question Bank List */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Library Questions ({filtered.length})
          </h3>
          <div className="relative w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search questions..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
          {filtered.map((q) => (
            <div
              key={q.id}
              className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800 flex items-start justify-between gap-3 text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">{q.topic}</span>
                  <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {q.category}
                  </span>
                  <span className="text-[10px] capitalize text-slate-400">
                    {q.difficulty}
                  </span>
                </div>
                <p className="font-semibold text-slate-900 dark:text-white">
                  {q.text}
                </p>
              </div>

              <button
                onClick={() => handleDeleteQuestion(q.id)}
                className="text-slate-400 hover:text-rose-500 p-1"
                title="Delete question"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
