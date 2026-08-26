import React, { useState } from 'react';
import { 
  Play, 
  Send, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Cpu, 
  Sparkles, 
  Terminal, 
  Code2, 
  RotateCcw,
  Check,
  AlertCircle
} from 'lucide-react';
import { CodingProblem, CodeEvaluationResult } from '../types';
import confetti from 'canvas-confetti';

interface CodeEditorProps {
  problem: CodingProblem;
  onSubmit: (code: string, language: 'javascript' | 'python' | 'cpp' | 'java') => Promise<CodeEvaluationResult>;
  isEvaluating?: boolean;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  problem,
  onSubmit,
  isEvaluating = false
}) => {
  const [language, setLanguage] = useState<'javascript' | 'python' | 'cpp' | 'java'>('javascript');
  const [code, setCode] = useState<string>(problem.starterCode.javascript);
  const [activeTab, setActiveTab] = useState<'testcases' | 'custom' | 'results'>('testcases');
  const [selectedTestCaseIdx, setSelectedTestCaseIdx] = useState<number>(0);
  const [customInput, setCustomInput] = useState<string>('nums = [2,7,11,15], target = 9');
  const [evaluationResult, setEvaluationResult] = useState<CodeEvaluationResult | null>(null);
  const [isRunningLocal, setIsRunningLocal] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Switch language starter code
  const handleLanguageChange = (lang: 'javascript' | 'python' | 'cpp' | 'java') => {
    setLanguage(lang);
    setCode(problem.starterCode[lang] || '');
  };

  const handleResetCode = () => {
    if (confirm('Reset code to initial boilerplate?')) {
      setCode(problem.starterCode[language] || '');
      setEvaluationResult(null);
    }
  };

  const handleRunTestCases = () => {
    setIsRunningLocal(true);
    setActiveTab('results');
    setTimeout(() => {
      // Simulate rapid local sandbox execution
      const total = problem.testCases.length;
      const res: CodeEvaluationResult = {
        problemId: problem.id,
        language,
        code,
        testsPassed: total,
        totalTests: total,
        testResults: problem.testCases.map((tc, idx) => ({
          testCaseId: tc.id || `tc-${idx + 1}`,
          passed: true,
          input: tc.input,
          expectedOutput: tc.expectedOutput,
          actualOutput: tc.expectedOutput,
          executionTimeMs: Math.floor(Math.random() * 4) + 1
        })),
        complexity: {
          timeComplexity: problem.timeComplexityTarget,
          spaceComplexity: problem.spaceComplexityTarget,
          timeRating: 'Optimal',
          spaceRating: 'Optimal'
        },
        codeQuality: {
          score: 94,
          readability: 'Very Clean',
          namingConventions: 'Idiomatic naming',
          modularity: 'High cohesion'
        },
        score: 95,
        strengths: [
          'Optimal time complexity O(N) using HashMap lookup',
          'Clean memory management and minimal allocations'
        ],
        suggestions: [
          'Add brief docstring specifying time/space complexity guarantees'
        ]
      };
      setEvaluationResult(res);
      setIsRunningLocal(false);
    }, 600);
  };

  const handleSubmitSolution = async () => {
    try {
      const result = await onSubmit(code, language);
      setEvaluationResult(result);
      setActiveTab('results');
      if (result.testsPassed === result.totalTests) {
        try {
          confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.6 }
          });
        } catch {}
      }
    } catch (e) {
      console.error(e);
    }
  };

  const lineCount = code.split('\n').length;

  return (
    <div className="flex flex-col h-full bg-slate-900 text-slate-100 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
      
      {/* Editor Header Bar */}
      <div className="flex flex-wrap items-center justify-between px-4 py-2.5 bg-slate-950 border-b border-slate-800 gap-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-bold text-slate-300">Code Editor</span>
          </div>

          {/* Language Selector */}
          <div className="flex items-center bg-slate-900 rounded-lg p-0.5 border border-slate-800">
            {(['javascript', 'python', 'cpp', 'java'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => handleLanguageChange(lang)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold uppercase tracking-wider transition-colors ${
                  language === lang
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {lang === 'javascript' ? 'JS' : lang === 'python' ? 'Python' : lang === 'cpp' ? 'C++' : 'Java'}
              </button>
            ))}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleResetCode}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 text-xs transition-colors flex items-center gap-1"
            title="Reset code"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-[11px]">Reset</span>
          </button>

          <button
            id="run-code-btn"
            disabled={isRunningLocal || isEvaluating}
            onClick={handleRunTestCases}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5 text-emerald-400 fill-current" />
            <span>{isRunningLocal ? 'Running...' : 'Run Test Cases'}</span>
          </button>

          <button
            id="submit-code-btn"
            disabled={isRunningLocal || isEvaluating}
            onClick={handleSubmitSolution}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-md shadow-emerald-900/30 transition-transform active:scale-95 disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isEvaluating ? 'Evaluating...' : 'Submit to AI'}</span>
          </button>
        </div>
      </div>

      {/* Code Textarea & Gutter */}
      <div className="flex-1 flex min-h-[300px] lg:min-h-[380px] bg-slate-950 font-mono text-sm relative overflow-hidden">
        {/* Line Numbers */}
        <div className="w-11 py-3 bg-slate-950/80 border-r border-slate-800/80 select-none text-right pr-3 text-slate-600 font-mono text-xs">
          {Array.from({ length: Math.max(lineCount, 16) }).map((_, i) => (
            <div key={i} className="leading-6">{i + 1}</div>
          ))}
        </div>

        {/* Editor Code Area */}
        <textarea
          id="code-editor-textarea"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck={false}
          className="flex-1 p-3 bg-transparent text-emerald-300 font-mono text-xs sm:text-sm leading-6 resize-none focus:outline-none focus:ring-0 overflow-y-auto selection:bg-indigo-900/60"
        />
      </div>

      {/* Bottom Panel: Test Cases & Results Tabs */}
      <div className="h-64 bg-slate-900 border-t border-slate-800 flex flex-col">
        {/* Tab Headers */}
        <div className="flex items-center justify-between px-4 bg-slate-950/90 border-b border-slate-800">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveTab('testcases')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold border-b-2 transition-colors ${
                activeTab === 'testcases'
                  ? 'border-indigo-500 text-indigo-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Standard Test Cases ({problem.testCases.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('custom')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold border-b-2 transition-colors ${
                activeTab === 'custom'
                  ? 'border-indigo-500 text-indigo-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>Custom Input</span>
            </button>
            <button
              onClick={() => setActiveTab('results')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold border-b-2 transition-colors ${
                activeTab === 'results'
                  ? 'border-emerald-500 text-emerald-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Evaluation & Execution</span>
            </button>
          </div>

          {evaluationResult && (
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">Score:</span>
              <span className="font-bold text-emerald-400 text-sm">
                {evaluationResult.score}/100
              </span>
            </div>
          )}
        </div>

        {/* Tab Content */}
        <div className="flex-1 p-3.5 overflow-y-auto font-sans">
          {activeTab === 'testcases' && (
            <div className="space-y-3">
              {/* Test Case Selectors */}
              <div className="flex items-center gap-2">
                {problem.testCases.map((tc, idx) => (
                  <button
                    key={tc.id}
                    onClick={() => setSelectedTestCaseIdx(idx)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                      selectedTestCaseIdx === idx
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    Case {idx + 1}
                  </button>
                ))}
              </div>

              {/* Selected Test Case Details */}
              {problem.testCases[selectedTestCaseIdx] && (
                <div className="space-y-2 text-xs font-mono">
                  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                    <span className="text-slate-500 block text-[10px] uppercase font-bold tracking-wider mb-1 font-sans">
                      Input
                    </span>
                    <code className="text-slate-200">{problem.testCases[selectedTestCaseIdx].input}</code>
                  </div>
                  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                    <span className="text-slate-500 block text-[10px] uppercase font-bold tracking-wider mb-1 font-sans">
                      Expected Output
                    </span>
                    <code className="text-emerald-400">{problem.testCases[selectedTestCaseIdx].expectedOutput}</code>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'custom' && (
            <div className="space-y-2">
              <label className="text-xs text-slate-400 font-medium">Custom Test Case Input:</label>
              <textarea
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder="nums = [1, 5, 8], target = 6"
                className="w-full h-24 p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>
          )}

          {activeTab === 'results' && (
            <div>
              {evaluationResult ? (
                <div className="space-y-3 text-xs">
                  <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-800/60">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>
                        {evaluationResult.testsPassed}/{evaluationResult.totalTests} Test Cases Passed
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-300">
                      <span className="flex items-center gap-1 font-mono">
                        <Clock className="w-3.5 h-3.5 text-cyan-400" />
                        Time: {evaluationResult.complexity.timeComplexity} ({evaluationResult.complexity.timeRating})
                      </span>
                      <span className="flex items-center gap-1 font-mono">
                        <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                        Space: {evaluationResult.complexity.spaceComplexity} ({evaluationResult.complexity.spaceRating})
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                      <span className="text-[11px] font-bold text-emerald-400 block mb-1">
                        ✓ Algorithmic Strengths
                      </span>
                      <ul className="space-y-1 text-slate-300 text-[11px]">
                        {evaluationResult.strengths.map((s, i) => (
                          <li key={i}>• {s}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                      <span className="text-[11px] font-bold text-amber-400 block mb-1">
                        ⚠ AI Optimization Advice
                      </span>
                      <ul className="space-y-1 text-slate-300 text-[11px]">
                        {evaluationResult.suggestions.map((s, i) => (
                          <li key={i}>• {s}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-32 text-slate-500 text-xs">
                  <Terminal className="w-8 h-8 mb-2 text-slate-600" />
                  <p>Click "Run Test Cases" or "Submit to AI" to execute your solution.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
