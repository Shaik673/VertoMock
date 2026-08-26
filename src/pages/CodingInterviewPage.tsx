import React, { useState } from 'react';
import { 
  Code2, 
  CheckCircle2, 
  Sparkles, 
  ChevronRight, 
  Terminal, 
  Cpu, 
  Clock, 
  ArrowLeft,
  Filter
} from 'lucide-react';
import { CODING_PROBLEMS } from '../data/codingProblems';
import { CodingProblem } from '../types';
import { CodeEditor } from '../components/CodeEditor';
import { api } from '../services/api';

export const CodingInterviewPage: React.FC = () => {
  const [selectedProblem, setSelectedProblem] = useState<CodingProblem>(CODING_PROBLEMS[0]);
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);

  const filteredProblems = CODING_PROBLEMS.filter(p => {
    if (filterDifficulty !== 'all' && p.difficulty !== filterDifficulty) return false;
    return true;
  });

  const handleEvaluate = async (code: string, language: 'javascript' | 'python' | 'cpp' | 'java') => {
    setIsEvaluating(true);
    try {
      const res = await api.evaluateCode(selectedProblem, language, code);
      setIsEvaluating(false);
      return res;
    } catch (e) {
      setIsEvaluating(false);
      throw e;
    }
  };

  return (
    <div className="space-y-6 pb-16">
      
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-200/60 dark:border-emerald-800/60">
            <Code2 className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-extrabold text-slate-900 dark:text-white">
              Algorithmic Coding Arena
            </h1>
            <p className="text-xs text-slate-500">
              Interactive sandbox with automated test-case runner & AI code complexity analyzer
            </p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold">
          {['all', 'easy', 'medium', 'hard'].map((diff) => (
            <button
              key={diff}
              onClick={() => setFilterDifficulty(diff)}
              className={`px-3 py-1 rounded-lg capitalize transition-colors ${
                filterDifficulty === diff
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Problem Selector + Problem Description (Left) / IDE (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Problem Details & Problem Drawer (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Quick Problem Switcher Pills */}
          <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-2 overflow-x-auto">
            {filteredProblems.map((prob) => (
              <button
                key={prob.id}
                onClick={() => setSelectedProblem(prob)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedProblem.id === prob.id
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {prob.title}
              </button>
            ))}
          </div>

          {/* Problem Statement Card */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5 overflow-y-auto max-h-[700px]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                  selectedProblem.difficulty === 'easy'
                    ? 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50'
                    : selectedProblem.difficulty === 'medium'
                    ? 'bg-amber-50 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 border border-amber-200/50'
                    : 'bg-rose-50 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 border border-rose-200/50'
                }`}>
                  {selectedProblem.difficulty}
                </span>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {selectedProblem.category}
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                <span>Time: {selectedProblem.timeComplexityTarget}</span>
              </div>
            </div>

            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {selectedProblem.title}
            </h2>

            <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-3 leading-relaxed whitespace-pre-line">
              {selectedProblem.description}
            </div>

            {/* Examples */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Examples
              </h4>
              {selectedProblem.examples.map((ex, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-100 dark:border-slate-800 text-xs font-mono space-y-1.5"
                >
                  <div className="text-slate-800 dark:text-slate-200">
                    <strong className="text-slate-500 font-sans">Input:</strong> {ex.input}
                  </div>
                  <div className="text-emerald-600 dark:text-emerald-400">
                    <strong className="text-slate-500 font-sans">Output:</strong> {ex.output}
                  </div>
                  {ex.explanation && (
                    <div className="text-slate-500 font-sans text-[11px]">
                      <em>Explanation: {ex.explanation}</em>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Constraints */}
            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Constraints
              </h4>
              <ul className="list-disc list-inside text-xs font-mono text-slate-600 dark:text-slate-400 space-y-1">
                {selectedProblem.constraints.map((c, idx) => (
                  <li key={idx}>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right: Code Editor & Runner (7 Cols) */}
        <div className="lg:col-span-7">
          <CodeEditor
            problem={selectedProblem}
            onSubmit={handleEvaluate}
            isEvaluating={isEvaluating}
          />
        </div>
      </div>
    </div>
  );
};
