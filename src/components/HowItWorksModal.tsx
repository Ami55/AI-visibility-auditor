import React, { useState } from "react";
import { 
  Compass, 
  Sparkles, 
  Cpu, 
  Database, 
  FileCode2, 
  Layers, 
  Share2, 
  CheckCircle2, 
  X, 
  ArrowRight, 
  Bot, 
  Search, 
  ShieldCheck, 
  TrendingUp, 
  HelpCircle,
  BarChart3,
  ExternalLink,
  BookOpen
} from "lucide-react";

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HowItWorksModal({ isOpen, onClose }: HowItWorksModalProps) {
  const [activeTab, setActiveTab] = useState<"process" | "pillars" | "faq">("process");

  if (!isOpen) return null;

  const pillars = [
    {
      id: "visibility",
      title: "AI Visibility Score",
      weight: "25%",
      icon: Bot,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-950/40",
      borderColor: "border-blue-200 dark:border-blue-800",
      description: "Measures direct mention frequency, zero-click answer placement, and recommendation likelihood across ChatGPT, Gemini, Claude, Perplexity, and Google AI Overviews.",
      signals: [
        "Prompt answer inclusion rate",
        "Direct citation in footnote URLs",
        "Sentiment & contextual brand relevance",
        "Top-of-funnel niche recommendation rank"
      ]
    },
    {
      id: "entity",
      title: "Entity & Knowledge Graph",
      weight: "20%",
      icon: Database,
      color: "text-indigo-600 dark:text-indigo-400",
      bgColor: "bg-indigo-50 dark:bg-indigo-950/40",
      borderColor: "border-indigo-200 dark:border-indigo-800",
      description: "Evaluates how cleanly LLMs and Search engines understand your brand as an unambiguous real-world entity with verified relationships.",
      signals: [
        "JSON-LD Organization & Person schema",
        "Wikidata / Wikipedia knowledge mapping",
        "sameAs links to verified social & legal profiles",
        "Consistency in brand naming & taxonomy"
      ]
    },
    {
      id: "content",
      title: "Content Retrieval & Utility",
      weight: "20%",
      icon: FileCode2,
      color: "text-emerald-600 dark:text-emerald-400",
      bgColor: "bg-emerald-50 dark:bg-emerald-950/40",
      borderColor: "border-emerald-200 dark:border-emerald-800",
      description: "Assesses how well your textual content can be chunked, embedded into vector databases, and directly synthesized by RAG pipelines.",
      signals: [
        "Direct conversational Q&A and FAQPage markup",
        "Semantic HTML hierarchy (H1, H2, H3)",
        "Factual, high-information-density phrasing",
        "Topic coverage vs competitive content gaps"
      ]
    },
    {
      id: "authority",
      title: "Authority & Citation Footprint",
      weight: "20%",
      icon: ShieldCheck,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-50 dark:bg-purple-950/40",
      borderColor: "border-purple-200 dark:border-purple-800",
      description: "Audits the strength of third-party citations, trusted editorial publications, and community consensus that LLMs use to verify credibility.",
      signals: [
        "Editorial press & industry directory coverage",
        "Trustpilot / G2 / review consensus metrics",
        "Community discussion volume (Reddit, Quora)",
        "Verified author E-E-A-T credentials"
      ]
    },
    {
      id: "technical",
      title: "Technical AI Crawlability",
      weight: "15%",
      icon: Cpu,
      color: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-50 dark:bg-amber-950/40",
      borderColor: "border-amber-200 dark:border-amber-800",
      description: "Inspects your server robots.txt policies, bot blocklists, rendering pipeline, and technical structure for AI crawlers.",
      signals: [
        "robots.txt rules for GPTBot, ClaudeBot, PerplexityBot",
        "Google-Extended & CCBot scraper permissions",
        "Time-to-First-Byte (TTFB) & clean HTML output",
        "Absence of aggressive Cloudflare bot traps"
      ]
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Target Domain & Market Intake",
      summary: "You enter your website domain, optional brand name, competitors, and primary operating industry.",
      details: "The auditor initializes a multi-dimensional analysis profile calibrated to your target vertical."
    },
    {
      number: "02",
      title: "Multi-Model Synthesis & Signal Audit",
      summary: "Our audit engine evaluates visibility signals across major LLM ecosystems.",
      details: "Checks ChatGPT (OpenAI), Gemini (Google), Claude (Anthropic), Perplexity Pro Search, and Google AI Overviews for entity recognition and citation share."
    },
    {
      number: "03",
      title: "Comprehensive 5-Pillar Score Calculation",
      summary: "Scores are weighted across Visibility (25%), Entity (20%), Content (20%), Authority (20%), and Technical (15%).",
      details: "Produces an overall letter grade (A through F) with granular sub-scores and historical projections."
    },
    {
      number: "04",
      title: "Actionable GEO Roadmap & Impact Matrix",
      summary: "Receive a prioritized tactical checklist of schema updates, FAQ structures, and crawler fixes.",
      details: "Prioritized into Quick Wins, Strategic Focus, Content Gap, and Low Priority with estimated score gains."
    }
  ];

  const faqs = [
    {
      q: "What is Generative Engine Optimization (GEO)?",
      a: "GEO is the practice of optimizing your brand's digital presence so that artificial intelligence search engines and large language models (like ChatGPT, Gemini, Perplexity, and Claude) cite, reference, and recommend your organization when answering user queries."
    },
    {
      q: "How is AI Search Visibility different from traditional Google SEO?",
      a: "Traditional SEO focuses on keyword density, backlinks, and ranking in standard blue link result pages. AI Search Visibility focuses on entity resolution, semantic information density for vector embedding models, zero-click answer extraction, and inclusion in RAG (Retrieval-Augmented Generation) context windows."
    },
    {
      q: "Why do robots.txt permissions for AI bots matter?",
      a: "If your robots.txt or firewall accidentally blocks GPTBot, ClaudeBot, or PerplexityBot, conversational AI models cannot index your latest pricing, guides, or offerings, leading to hallucinations or complete omission from AI search recommendations."
    },
    {
      q: "How can I improve my website's score?",
      a: "Follow the prioritized Roadmap generated in your audit report. The most impactful quick wins are typically adding JSON-LD Organization schema with sameAs links, embedding conversational FAQPage markup, and ensuring AI scrapers are explicitly permitted in robots.txt."
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 sm:px-8 py-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-600 text-white rounded-2xl shadow-sm">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                How It Works
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-mono">
                  GEO Methodology
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Understanding Generative Engine Optimization &amp; AI Search Visibility
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 sm:px-8 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex gap-2 pt-2">
          <button
            onClick={() => setActiveTab("process")}
            className={`pb-3 px-3 text-xs font-bold uppercase tracking-wider transition-all border-b-2 ${
              activeTab === "process"
                ? "border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400"
                : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
            }`}
          >
            1. The Audit Process
          </button>
          <button
            onClick={() => setActiveTab("pillars")}
            className={`pb-3 px-3 text-xs font-bold uppercase tracking-wider transition-all border-b-2 ${
              activeTab === "pillars"
                ? "border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400"
                : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
            }`}
          >
            2. The 5 Scoring Pillars
          </button>
          <button
            onClick={() => setActiveTab("faq")}
            className={`pb-3 px-3 text-xs font-bold uppercase tracking-wider transition-all border-b-2 ${
              activeTab === "faq"
                ? "border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400"
                : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
            }`}
          >
            3. GEO Concepts &amp; FAQs
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-4 sm:p-6 md:p-8 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: THE PROCESS */}
          {activeTab === "process" && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-950 dark:to-slate-900 border border-blue-100 dark:border-slate-800 p-4 sm:p-5 rounded-2xl">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-1.5">
                  <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span>What is the AI Visibility Auditor?</span>
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  As search transitions from keyword-based web lists to AI conversational synthesis (such as ChatGPT Search, Perplexity, Claude, Gemini, and Google AI Overviews), brands must optimize for <strong>entity clarity, semantic vector embeddings, and citation authority</strong> rather than just traditional backlinks.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {steps.map((step) => (
                  <div
                    key={step.number}
                    className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/60 shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-black font-mono text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/80 px-2 py-0.5 rounded border border-blue-100 dark:border-blue-900/40">
                          STEP {step.number}
                        </span>
                      </div>
                      <h5 className="font-bold text-sm text-slate-900 dark:text-white mb-1.5">
                        {step.title}
                      </h5>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
                        {step.summary}
                      </p>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 pt-2.5 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/40 -mx-4 -mb-4 sm:-mx-5 sm:-mb-5 p-3 rounded-b-2xl">
                      <strong className="text-slate-700 dark:text-slate-300 font-semibold">How it works: </strong>
                      {step.details}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: THE 5 PILLARS */}
          {activeTab === "pillars" && (
            <div className="space-y-4">
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                The overall AI Visibility score is mathematically calculated using a weighted composite index across 5 fundamental dimensions:
              </p>
              <div className="space-y-3">
                {pillars.map((pillar) => {
                  const Icon = pillar.icon;
                  return (
                    <div
                      key={pillar.id}
                      className={`p-4 sm:p-5 rounded-2xl border ${pillar.borderColor} bg-white dark:bg-slate-950/80 shadow-xs`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-xl ${pillar.bgColor} ${pillar.color} shrink-0`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <h5 className="font-bold text-sm text-slate-900 dark:text-white">
                              {pillar.title}
                            </h5>
                            <span className="text-[11px] text-slate-400">
                              Weight in composite grade: <strong className="text-slate-700 dark:text-slate-300 font-mono">{pillar.weight}</strong>
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mb-3 leading-relaxed">
                        {pillar.description}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                        {pillar.signals.map((sig, sIdx) => (
                          <div key={sIdx} className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            <span>{sig}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: FAQS */}
          {activeTab === "faq" && (
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/60 shadow-xs"
                >
                  <h5 className="font-bold text-sm text-slate-900 dark:text-white flex items-start gap-2 mb-2">
                    <HelpCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                    <span>{faq.q}</span>
                  </h5>
                  <p className="text-xs text-slate-600 dark:text-slate-400 pl-6 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer with flexible wrapping */}
        <div className="px-4 sm:px-6 md:px-8 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-950/90 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="text-[11px] text-slate-500 dark:text-slate-400 flex flex-wrap items-center gap-1.5 leading-relaxed">
            <span className="font-bold text-slate-700 dark:text-slate-300">Composite Formula:</span>
            <span className="font-mono bg-white dark:bg-slate-900 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-800 text-[10.5px]">
              (Visibility × 25%) + (Entity × 20%) + (Content × 20%) + (Authority × 20%) + (Technical × 15%)
            </span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer shrink-0 text-center"
          >
            Got it, Let's Audit
          </button>
        </div>
      </div>
    </div>
  );
}
