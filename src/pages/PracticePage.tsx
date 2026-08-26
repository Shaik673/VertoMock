import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle, 
  ChevronRight, 
  RotateCw, 
  Check, 
  Terminal, 
  Database, 
  Cpu, 
  Network, 
  Layers, 
  UserCheck, 
  Send
} from 'lucide-react';
import { QUESTION_BANK } from '../data/questionBank';
import { QuestionItem } from '../types';
import { api } from '../services/api';

export const PracticePage: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<string>('All');
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [practiceAnswer, setPracticeAnswer] = useState<string>('');
  const [feedback, setFeedback] = useState<any>(null);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);

  const topics = [
    { name: 'All', icon: Sparkles },
    { name: 'DSA', icon: Terminal },
    { name: 'DBMS', icon: Database },
    { name: 'Operating Systems', icon: Cpu },
    { name: 'Computer Networks', icon: Network },
    { name: 'System Design', icon: Layers },
    { name: 'Behavioral', icon: UserCheck }
  ];

  const filteredQuestions = selectedTopic === 'All'
    ? QUESTION_BANK
    : QUESTION_BANK.filter(q => q.topic.toLowerCase().includes(selectedTopic.toLowerCase()) || q.category.toLowerCase().includes(selectedTopic.toLowerCase()));

  const currentQ: QuestionItem = filteredQuestions[currentIdx % filteredQuestions.length] || QUESTION_BANK[0];

  const handleNext = () => {
    setCurrentIdx(prev => prev + 1);
    setShowAnswer(false);
    setPracticeAnswer('');
    setFeedback(null);
  };

  const handleEvaluate = async () => {
    if (!practiceAnswer.trim()) return;
    setIsEvaluating(true);
    try {
      const res = await api.evaluateAnswer(currentQ, practiceAnswer);
      setFeedback(res);
    } catch (e) {
      console.error(e);
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-200/60 dark:border-indigo-800/60">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-extrabold text-slate-900 dark:text-white">
              Targeted Topic Practice Arena
            </h1>
            <p className="text-xs text-slate-500">
              Rapid-fire technical flashcards, conceptual quizzes, and AI critique
            </p>
          </div>
        </div>

        <button
          onClick={handleNext}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-colors"
        >
          <span>Next Question</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Topic Switcher Bar */}
      <div className="flex items-center gap-2 overflow-x-auto p-1.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
        {topics.map((t) => {
          const Icon = t.icon;
          const isSelected = selectedTopic === t.name;
          return (
            <button
              key={t.name}
              onClick={() => {
                setSelectedTopic(t.name);
                setCurrentIdx(0);
                setShowAnswer(false);
                setFeedback(null);
              }}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                isSelected
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{t.name}</span>
            </button>
          );
        })}
      </div>

      {/* Main Flashcard Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60 font-mono">
              Card {((currentIdx) % filteredQuestions.length) + 1} / {filteredQuestions.length}
            </span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {currentQ.topic}
            </span>
          </div>

          <span className="text-[11px] capitalize font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            {currentQ.difficulty}
          </span>
        </div>

        <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white leading-snug">
          {currentQ.text}
        </h2>

        {/* Practice Textarea */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Your Practice Response:
          </label>
          <textarea
            value={practiceAnswer}
            onChange={(e) => setPracticeAnswer(e.target.value)}
            rows={4}
            placeholder="Type your structured answer to check understanding..."
            className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:border-indigo-500 leading-relaxed font-sans"
          />
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <button
            onClick={() => setShowAnswer(!showAnswer)}
            className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-colors"
          >
            {showAnswer ? 'Hide Benchmark Answer' : 'Reveal Ideal Answer Key'}
          </button>

          <button
            disabled={isEvaluating || !practiceAnswer.trim()}
            onClick={handleEvaluate}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold text-xs shadow-md transition-transform active:scale-95 disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isEvaluating ? 'Evaluating...' : 'Check with AI'}</span>
          </button>
        </div>

        {/* Ideal Answer Key Card */}
        {showAnswer && (
          <div className="p-5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200/80 dark:border-indigo-900/60 text-xs text-slate-800 dark:text-slate-200 space-y-2 animate-in fade-in">
            <span className="font-bold text-indigo-700 dark:text-indigo-400 block uppercase tracking-wider text-[11px]">
              Ideal Benchmark Answer & Key Rationale:
            </span>
            <p className="leading-relaxed whitespace-pre-line">
              {currentQ.idealAnswerOutline || 'A comprehensive response articulates the underlying design trade-offs, time and space complexity, and failure edge cases.'}
            </p>
          </div>
        )}

        {/* AI Evaluation feedback */}
        {feedback && (
          <div className="p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-900/60 text-xs space-y-2 animate-in fade-in">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>AI Assessment Score: {feedback.scores?.overall || 86}/100</span>
              </span>
              <span className="font-bold uppercase text-[10px] text-emerald-600">
                {feedback.classification}
              </span>
            </div>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              {feedback.idealAnswerSummary}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
