import React, { useState } from 'react';
import { 
  Layers, 
  Plus, 
  Trash2, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Server, 
  Database, 
  HardDrive, 
  Network, 
  ShieldAlert,
  Cpu
} from 'lucide-react';
import { SystemDesignProblem } from '../types';

interface SystemDesignCanvasProps {
  problem: SystemDesignProblem;
  onSubmit: (notes: string, components: string[], nodes: any[]) => Promise<any>;
  isEvaluating?: boolean;
}

interface NodeItem {
  id: string;
  name: string;
  type: string;
  x: number;
  y: number;
  iconType: string;
}

export const SystemDesignCanvas: React.FC<SystemDesignCanvasProps> = ({
  problem,
  onSubmit,
  isEvaluating = false
}) => {
  const [architectureNotes, setArchitectureNotes] = useState<string>(
    `1. API Endpoints:
- POST /api/v1/data (Rate limited by Client IP / Token Bucket)
- GET /api/v1/data/:id (Cache-Aside with Redis, fallback to Read-Replica DB)

2. Data Storage Strategy:
- Primary DB: PostgreSQL / CockroachDB with Partition Key = Hash(ID)
- Caching: Redis Cluster with LRU 80/20 cache policy and 1-hour TTL
- Message Queue: Apache Kafka for async event ingestion and fanout`
  );

  const [nodes, setNodes] = useState<NodeItem[]>([
    { id: 'node-1', name: 'Clients (Web/Mobile)', type: 'client', x: 20, y: 30, iconType: 'client' },
    { id: 'node-2', name: 'Cloudflare CDN & Anycast', type: 'cdn', x: 200, y: 30, iconType: 'network' },
    { id: 'node-3', name: 'Envoy Load Balancer', type: 'lb', x: 380, y: 30, iconType: 'network' },
    { id: 'node-4', name: 'API Gateway & Rate Limiter', type: 'gw', x: 560, y: 30, iconType: 'server' },
    { id: 'node-5', name: 'App Server Cluster (Node/Go)', type: 'app', x: 560, y: 130, iconType: 'server' },
    { id: 'node-6', name: 'Redis Cache Tier', type: 'cache', x: 380, y: 220, iconType: 'cpu' },
    { id: 'node-7', name: 'PostgreSQL Primary & Replicas', type: 'db', x: 560, y: 220, iconType: 'database' },
    { id: 'node-8', name: 'Kafka Queue -> Async Workers', type: 'queue', x: 740, y: 130, iconType: 'harddrive' }
  ]);

  const [critiqueResult, setCritiqueResult] = useState<any>(null);

  const availableComponents = [
    { name: 'API Gateway', type: 'server', icon: 'server' },
    { name: 'Redis Cache', type: 'cache', icon: 'cpu' },
    { name: 'PostgreSQL DB', type: 'database', icon: 'database' },
    { name: 'MongoDB NoSQL', type: 'database', icon: 'database' },
    { name: 'Kafka Event Bus', type: 'queue', icon: 'harddrive' },
    { name: 'Worker Fleet', type: 'app', icon: 'server' },
    { name: 'S3 Blob Storage', type: 'storage', icon: 'harddrive' },
    { name: 'Elasticsearch Index', type: 'search', icon: 'database' }
  ];

  const handleAddComponent = (comp: { name: string; type: string; icon: string }) => {
    const newNode: NodeItem = {
      id: `node-${Date.now()}`,
      name: comp.name,
      type: comp.type,
      x: 100 + (nodes.length * 30) % 400,
      y: 100 + (nodes.length * 20) % 200,
      iconType: comp.icon
    };
    setNodes([...nodes, newNode]);
  };

  const handleRemoveNode = (id: string) => {
    setNodes(nodes.filter(n => n.id !== id));
  };

  const handleSubmitArchitecture = async () => {
    const compNames = nodes.map(n => n.name);
    try {
      const res = await onSubmit(architectureNotes, compNames, nodes);
      setCritiqueResult(res);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 text-slate-100 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between px-4 py-3 bg-slate-950 border-b border-slate-800 gap-2">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-bold text-slate-200">
            Interactive Architecture Canvas & Whiteboard
          </span>
        </div>

        <button
          id="submit-architecture-btn"
          disabled={isEvaluating}
          onClick={handleSubmitArchitecture}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-bold shadow-md shadow-cyan-900/30 transition-transform active:scale-95 disabled:opacity-50"
        >
          <Send className="w-3.5 h-3.5" />
          <span>{isEvaluating ? 'Reviewing Architecture...' : 'Submit to AI Architect'}</span>
        </button>
      </div>

      {/* Main Grid: Component Palette + Whiteboard Canvas */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-slate-800 min-h-[420px]">
        
        {/* Left: Component Palette & Notes */}
        <div className="p-4 bg-slate-950 flex flex-col gap-4 overflow-y-auto">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Add Architecture Building Blocks
            </h4>
            <div className="grid grid-cols-2 gap-1.5">
              {availableComponents.map((c) => (
                <button
                  key={c.name}
                  onClick={() => handleAddComponent(c)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[11px] font-semibold text-slate-300 transition-colors text-left"
                >
                  <Plus className="w-3 h-3 text-cyan-400" />
                  <span className="truncate">{c.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 flex flex-col">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              System Architecture & Trade-Off Notes
            </h4>
            <textarea
              id="architecture-notes-textarea"
              value={architectureNotes}
              onChange={(e) => setArchitectureNotes(e.target.value)}
              placeholder="Detail your data flow, caching rules, database sharding key, and fault tolerance..."
              className="w-full flex-1 min-h-[140px] p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-500 leading-5"
            />
          </div>
        </div>

        {/* Right 2 Cols: Visual Canvas Stage */}
        <div className="lg:col-span-2 p-4 bg-slate-900/90 relative overflow-auto flex flex-col justify-between">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[11px] font-mono text-slate-400">
              Active Topology ({nodes.length} Components Placed)
            </span>
            <span className="text-[10px] text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/60">
              High Availability Topology
            </span>
          </div>

          {/* Node Grid Layout */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-auto py-4">
            {nodes.map((node, index) => (
              <div
                key={node.id}
                className="p-3 rounded-xl bg-slate-950/90 border border-cyan-900/50 shadow-md flex flex-col justify-between group hover:border-cyan-500/80 transition-all duration-150"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-7 h-7 rounded-lg bg-cyan-950/80 text-cyan-400 flex items-center justify-center border border-cyan-800/60">
                    {node.iconType === 'database' ? (
                      <Database className="w-3.5 h-3.5" />
                    ) : node.iconType === 'cpu' ? (
                      <Cpu className="w-3.5 h-3.5" />
                    ) : node.iconType === 'harddrive' ? (
                      <HardDrive className="w-3.5 h-3.5" />
                    ) : (
                      <Server className="w-3.5 h-3.5" />
                    )}
                  </div>
                  <button
                    onClick={() => handleRemoveNode(node.id)}
                    className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-rose-400 transition-opacity"
                    title="Remove component"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="font-semibold text-xs text-slate-200 truncate">
                  {node.name}
                </div>
                <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                  Tier {index + 1}
                </div>
              </div>
            ))}
          </div>

          <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
            <Network className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Data Flow: Client &rarr; CDN / Anycast &rarr; API Gateway &rarr; Cache-Aside Layer &rarr; Partitioned Primary DB + Kafka Workers</span>
          </div>
        </div>
      </div>

      {/* AI Review Results Drawer */}
      {critiqueResult && (
        <div className="p-4 bg-slate-950 border-t border-slate-800 animate-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs">
              <Sparkles className="w-4 h-4" />
              <span>AI Principal Architect Verdict & Trade-off Review</span>
            </div>
            <div className="text-xs font-bold text-emerald-400">
              Architecture Score: {critiqueResult.scores?.overall || 88}/100
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900 border border-emerald-900/60">
              <div className="text-emerald-400 font-bold mb-1 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Architectural Strengths</span>
              </div>
              <ul className="space-y-1 text-slate-300 text-[11px]">
                {critiqueResult.strengths?.map((s: string, idx: number) => (
                  <li key={idx}>• {s}</li>
                ))}
              </ul>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-amber-900/60">
              <div className="text-amber-400 font-bold mb-1 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Identified Bottlenecks</span>
              </div>
              <ul className="space-y-1 text-slate-300 text-[11px]">
                {critiqueResult.bottlenecks?.map((b: string, idx: number) => (
                  <li key={idx}>• {b}</li>
                ))}
              </ul>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-cyan-900/60">
              <div className="text-cyan-400 font-bold mb-1 flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Interviewer Deep Probes</span>
              </div>
              <ul className="space-y-1 text-slate-300 text-[11px]">
                {critiqueResult.followUpQuestions?.map((q: string, idx: number) => (
                  <li key={idx}>• {q}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
