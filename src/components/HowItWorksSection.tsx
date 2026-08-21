import React, { useState } from "react";
import { 
  Bot, 
  Database, 
  FileCode2, 
  ShieldCheck, 
  Cpu, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  HelpCircle,
  TrendingUp,
  Layers
} from "lucide-react";

interface HowItWorksSectionProps {
  onOpenDetailedModal: () => void;
}

export default function HowItWorksSection({ onOpenDetailedModal }: HowItWorksSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const pillarsSummary = [
    {
      title: "AI Visibility",
      weight: "25%",
      icon: Bot,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-950/40",
      border: "border-blue-100 dark:border-blue-900/40",
      desc: "Zero-click answer inclusion & direct citation frequency in ChatGPT, Gemini, Claude, and Perplexity.",
    },
    {
      title: "Entity Clarity",
      weight: "20%",
      icon: Database,
      color: "text-indigo-600 dark:text-indigo-400",
      bg: "bg-indigo-50 dark:bg-indigo-950/40",
      border: "border-indigo-100 dark:border-indigo-900/40",
      desc: "JSON-LD schema, Wikidata linkage, and unambiguous Knowledge Graph presence.",
    },
    {
      title: "Content Retrieval",
      weight: "20%",
      icon: FileCode2,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-950/40",
      border: "border-emerald-100 dark:border-emerald-900/40",
      desc: "Semantic chunking density, conversational FAQ markup, and zero-click answer readiness.",
    },
    {
      title: "Authority Signals",
      weight: "20%",
      icon: ShieldCheck,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-950/40",
      border: "border-purple-100 dark:border-purple-900/40",
      desc: "Editorial citations, public reviews, and high-trust references powering LLM verification.",
    },
    {
      title: "Technical Access",
      weight: "15%",
      icon: Cpu,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-950/40",
      border: "border-amber-100 dark:border-amber-900/40",
      desc: "Explicit robots.txt permissions for GPTBot, ClaudeBot, and fast response times.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto mt-12 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 rounded-2xl">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">
              How the AI Visibility Audit Works
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Generative Engine Optimization (GEO) scoring framework &amp; methodology
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenDetailedModal}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 hover:bg-blue-100/70 dark:bg-blue-950/50 dark:hover:bg-blue-950 transition-colors border border-blue-200/50 dark:border-blue-900/50"
          >
            <span>Full Guide &amp; Formula</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
            title={isExpanded ? "Collapse overview" : "Expand overview"}
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* 3 Step Pipeline Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
        <div className="p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800/80">
          <div className="text-[11px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
            Step 1 · Ingestion
          </div>
          <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200 mb-1">
            Domain &amp; Entity Identification
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Crawls structured JSON-LD schemas, robots.txt, and verifies entity resolution against Wikidata and Google Knowledge Graph.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800/80">
          <div className="text-[11px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
            Step 2 · Multi-Model Analysis
          </div>
          <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200 mb-1">
            LLM Citation &amp; RAG Evaluation
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Measures mention likelihood across ChatGPT, Gemini, Claude, Perplexity Pro, and Google AI Overviews.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800/80">
          <div className="text-[11px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
            Step 3 · GEO Action Plan
          </div>
          <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200 mb-1">
            Prioritized Strategic Roadmap
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Generates Quick Wins, Content Gap fillers, and High-Impact Schema injections ranked by estimated score gain.
          </p>
        </div>
      </div>

      {/* Expandable 5-Pillar Score Cards */}
      {isExpanded && (
        <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 space-y-4 animate-fade-in">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Weighted Score Breakdown (100% Total)
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {pillarsSummary.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border ${pillar.border} ${pillar.bg} flex flex-col justify-between`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Icon className={`w-4 h-4 ${pillar.color}`} />
                        <span className="font-bold text-xs text-slate-800 dark:text-slate-200">
                          {pillar.title}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono font-extrabold px-2 py-0.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                        {pillar.weight}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
