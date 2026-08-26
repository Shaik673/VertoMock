import React, { useState } from 'react';
import { 
  Layers, 
  Sparkles, 
  Cpu, 
  Database, 
  HardDrive, 
  Network, 
  TrendingUp, 
  CheckCircle2,
  Server
} from 'lucide-react';
import { SYSTEM_DESIGN_PROBLEMS } from '../data/systemDesignProblems';
import { SystemDesignProblem } from '../types';
import { SystemDesignCanvas } from '../components/SystemDesignCanvas';
import { api } from '../services/api';

export const SystemDesignPage: React.FC = () => {
  const [selectedProblem, setSelectedProblem] = useState<SystemDesignProblem>(SYSTEM_DESIGN_PROBLEMS[0]);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);

  const handleSubmit = async (notes: string, components: string[], nodes: any[]) => {
    setIsEvaluating(true);
    try {
      const res = await api.evaluateSystemDesign(selectedProblem, notes, components, nodes);
      setIsEvaluating(false);
      return res;
    } catch (e) {
      setIsEvaluating(false);
      throw e;
    }
  };

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 flex items-center justify-center border border-cyan-200/60 dark:border-cyan-800/60">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-extrabold text-slate-900 dark:text-white">
              System Design Studio & Whiteboard
            </h1>
            <p className="text-xs text-slate-500">
              Interactive high-level architecture diagramming with AI Principal Architect review
            </p>
          </div>
        </div>

        {/* Problem Switcher Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-semibold">
          {SYSTEM_DESIGN_PROBLEMS.map((prob) => (
            <button
              key={prob.id}
              onClick={() => setSelectedProblem(prob)}
              className={`px-3 py-1 rounded-lg whitespace-nowrap transition-colors ${
                selectedProblem.id === prob.id
                  ? 'bg-white dark:bg-slate-900 text-cyan-600 dark:text-cyan-400 shadow-sm font-bold'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {prob.title.split(' ')[1] || prob.title}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Architecture Problem Specs (Left) & Canvas (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Problem Details & Back-of-the-Envelope Math (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5 overflow-y-auto max-h-[720px]">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-cyan-50 dark:bg-cyan-950/80 text-cyan-600 dark:text-cyan-400 border border-cyan-200/50">
                {selectedProblem.scaleTarget}
              </span>
              <h2 className="text-lg font-extrabold text-slate-900 dark:text-white mt-2">
                {selectedProblem.title}
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                {selectedProblem.description}
              </p>
            </div>

            {/* Functional Requirements */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Functional Requirements
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                {selectedProblem.functionalRequirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Non-Functional Requirements */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Non-Functional Requirements
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                {selectedProblem.nonFunctionalRequirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-cyan-500 shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Back of Envelope Estimates */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-100 dark:border-slate-800 space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Capacity Estimations
              </h4>
              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                  <span className="text-slate-500 block text-[10px]">Read QPS</span>
                  <span className="text-slate-900 dark:text-white font-bold">{selectedProblem.estimations.readQps}</span>
                </div>
                <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                  <span className="text-slate-500 block text-[10px]">Write QPS</span>
                  <span className="text-slate-900 dark:text-white font-bold">{selectedProblem.estimations.writeQps}</span>
                </div>
                <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                  <span className="text-slate-500 block text-[10px]">Storage / Year</span>
                  <span className="text-slate-900 dark:text-white font-bold">{selectedProblem.estimations.storagePerYear}</span>
                </div>
                <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                  <span className="text-slate-500 block text-[10px]">Bandwidth</span>
                  <span className="text-slate-900 dark:text-white font-bold">{selectedProblem.estimations.bandwidth}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Architecture Whiteboard & Notes Canvas (8 Cols) */}
        <div className="lg:col-span-8">
          <SystemDesignCanvas
            problem={selectedProblem}
            onSubmit={handleSubmit}
            isEvaluating={isEvaluating}
          />
        </div>
      </div>
    </div>
  );
};
