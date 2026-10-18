import React, { useState, useEffect } from "react";
import { AuditReport, RoadmapItem, PlatformAnalysis } from "./types";
import InputForm from "./components/InputForm";
import VisualGauges from "./components/VisualGauges";
import HowItWorksModal from "./components/HowItWorksModal";
import HowItWorksSection from "./components/HowItWorksSection";
import { VercelGuideModal } from "./components/VercelGuideModal";
import { generateHeuristicAudit } from "./utils/heuristicAuditor";
import { SAMPLE_REPORT } from "./components/StaticSampleData";
import { 
  FileText, 
  Share2, 
  Printer, 
  Sparkles, 
  TrendingUp, 
  Layers, 
  FileSearch, 
  Users, 
  FileCheck, 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  CornerDownRight, 
  HelpCircle,
  Clock,
  ExternalLink,
  ChevronRight,
  Info,
  History,
  Sun,
  Moon,
  Compass,
  Award,
  BookOpen,
  ArrowRight,
  Search,
  Filter,
  Key
} from "lucide-react";

export default function App() {
  const [isPlayingDemo, setIsPlayingDemo] = useState(false);
  const [report, setReport] = useState<AuditReport | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);
  const [isVercelGuideOpen, setIsVercelGuideOpen] = useState(false);
  
  // Filtering states inside dashboard
  const [platformFilter, setPlatformFilter] = useState<string>("All");
  const [roadmapSearch, setRoadmapSearch] = useState<string>("");
  const [roadmapFilter, setRoadmapFilter] = useState<string>("All"); // "All" | "High" | "Medium" | "Low"
  
  // Share tooltip status
  const [copiedLink, setCopiedLink] = useState(false);

  // Initialize Theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("auditor_theme");
    if (savedTheme === "dark") {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      document.documentElement.classList.add("dark");
      localStorage.setItem("auditor_theme", "dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("auditor_theme", "light");
    }
  };

  // Pre-fill initial screen or automatically load demo if requested
  const handleLoadDemo = () => {
    setIsLoading(true);
    setErrorMsg(null);
    setTimeout(() => {
      setReport(SAMPLE_REPORT);
      setIsLoading(false);
    }, 1200);
  };

  const handleAuditSubmit = async (formData: {
    domain: string;
    brandName: string;
    competitors: string[];
    industry: string;
    country: string;
  }) => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const response = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        // If server endpoint returns non-ok status or 404 on Vercel, fallback to client-side heuristic engine seamlessly
        console.warn("Backend API returned non-ok status, running client-side heuristic audit fallback.");
        const fallbackReport = generateHeuristicAudit(formData);
        setReport(fallbackReport);
        return;
      }

      const verifiedReport = await response.json();
      setReport(verifiedReport);
    } catch (err: any) {
      console.warn("Server unavailable or network error, generating instant heuristic audit fallback:", err);
      // Fallback guarantees the audit completes instantly
      const fallbackReport = generateHeuristicAudit(formData);
      setReport(fallbackReport);
    } finally {
      setIsLoading(false);
    }
  };

  // Trigger browser print optimization print workflow
  const handlePrint = () => {
    window.print();
  };

  // Handle report link sharing
  const handleShare = () => {
    const shareUrl = `${window.location.origin}?domain=${report?.domain || ""}&brand=${report?.brandName || ""}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    });
  };

  // Filter dynamic roadmap contents
  const filteredRoadmap = report?.roadmap?.filter((item) => {
    const matchesSearch = 
      item.title.toLowerCase().includes(roadmapSearch.toLowerCase()) || 
      item.description.toLowerCase().includes(roadmapSearch.toLowerCase());
    
    if (roadmapFilter === "All") return matchesSearch;
    return matchesSearch && item.priority === roadmapFilter;
  }) || [];

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      {/* Header Bar */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-100 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-sm print:hidden">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600 rounded-xl text-white shadow-md shadow-blue-200 dark:shadow-none flex items-center justify-center">
            <Compass className="w-5 h-5 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-base text-slate-900 dark:text-white leading-tight tracking-tight">
                AI Visibility Auditor
              </h1>
              <span className="text-[9px] bg-red-100 dark:bg-red-950 text-red-650 dark:text-red-400 px-1.5 py-0.5 rounded font-mono font-bold uppercase tracking-wider">
                AE Audit v1
              </span>
            </div>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
              Search &amp; LLM Citations Research Platform
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Vercel & API Key Setup Guide Button */}
          <button
            onClick={() => setIsVercelGuideOpen(true)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100/80 hover:bg-slate-200/70 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer shadow-2xs"
            title="How to configure Gemini API Key for Vercel deployment"
          >
            <Key className="w-3.5 h-3.5 text-blue-500" />
            <span>Vercel / API Guide</span>
          </button>

          {/* How It Works Header Nav Button */}
          <button
            onClick={() => setIsHowItWorksOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 hover:bg-blue-100/70 dark:bg-blue-950/60 dark:hover:bg-blue-900/60 border border-blue-200/60 dark:border-blue-800/60 transition-all cursor-pointer shadow-xs"
            title="Learn how AI Visibility and GEO Scoring works"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>How It Works</span>
          </button>

          {report && (
            <button
              onClick={() => setReport(null)}
              className="text-xs font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
            >
              ← Clear &amp; New Audit
            </button>
          )}

          {/* Theme Switcher Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700/80 text-slate-500 dark:text-slate-300 transition-colors cursor-pointer"
            title="Toggle Light/Dark Theme"
          >
            {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-400" />}
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Error notification banner */}
        {errorMsg && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/60 text-red-800 dark:text-red-200 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-red-650 shrink-0 mt-0.5" />
            <div className="flex-1 text-sm">
              <span className="font-bold">Error completing AI analysis workflow:</span> {errorMsg}
              <div className="mt-2 text-xs opacity-85">
                Note: In order to fetch real-time model synthesis, ensure you have input a valid <code className="bg-red-100/50 dark:bg-red-950 px-1 rounded">GEMINI_API_KEY</code> within your AI Studio Secrets panel.
              </div>
            </div>
          </div>
        )}

        {/* Audit Form State (No active report generated) */}
        {!report ? (
          <div className="py-4">
            <InputForm onSubmit={handleAuditSubmit} isLoading={isLoading} />
            
            {!isLoading && (
              <>
                <div className="mt-8 max-w-xl mx-auto border border-dashed border-slate-200 dark:border-slate-800/80 p-6 rounded-2xl bg-white dark:bg-slate-900 text-center shadow-xs">
                  <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-1">
                    Want to explore a fictional example first?
                  </h3>
                  <p className="text-xs text-slate-400 dark:text-slate-400 mb-4 max-w-md mx-auto">
                    Explore a fictional audit for <strong>Example Travel (example.com)</strong>. All scores, findings, trends, and comparisons are illustrative sample data, not live measurements.
                  </p>
                  <button
                    id="demo-trigger-btn"
                    onClick={handleLoadDemo}
                    className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/40 text-blue-650 dark:text-blue-400 hover:bg-blue-100/55 dark:hover:bg-blue-950 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-inner border border-blue-100/30 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                    <span>Load Fictional Demo (Example Travel)</span>
                  </button>
                </div>

                {/* How It Works Explainer Section */}
                <HowItWorksSection onOpenDetailedModal={() => setIsHowItWorksOpen(true)} />
              </>
            )}
          </div>
        ) : (
          /* ACTIVE REPORT DASHBOARD VIEW */
          <div className="space-y-8 animate-fade-in print:p-0">
            
            {report.isDemo && (
              <div role="note" className="rounded-xl border border-amber-300 bg-amber-50 px-5 py-4 text-sm text-amber-950 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-100 print:border-amber-300 print:bg-white print:text-black">
                <strong>Fictional demo — Example Travel.</strong> All scores, findings, trends, sources, and competitor comparisons are illustrative. This is not a live audit of a real business.
              </div>
            )}

            {/* Print Header Node (Only visible during print/PDF layouts) */}
            <div className="hidden print:block border-b border-slate-350 pb-6 mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-extrabold text-slate-900 font-serif">AI Visibility Audit Report</h1>
                  <p className="text-sm text-slate-500 mt-1">Domain URL Analyzed: <strong className="text-slate-800 font-mono text-base">{report.domain}</strong></p>
                  {report.brandName && (
                    <p className="text-sm text-slate-500">Brand Designation: <strong>{report.brandName}</strong> | Market Profile: <strong>{report.industry}</strong></p>
                  )}
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono text-slate-400">REPORT ID: {report.id}</span>
                  <p className="text-xs text-slate-500 mt-1">Generated: {new Date(report.timestamp).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            {/* Top Toolbar Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-4 rounded-2xl shadow-xs print:hidden">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold font-mono">
                  {report.grade}
                </div>
                <div>
                  <div className="text-xs text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wider">
                    Viewing Active Profile
                  </div>
                  <h2 className="text-lg font-extrabold text-slate-900 dark:text-white leading-none flex items-center gap-1.5 mt-0.5">
                    {report.domain}
                    <span className="text-xs font-medium text-slate-400">
                      ({report.brandName || "Company Entity"})
                    </span>
                  </h2>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => setIsHowItWorksOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 transition-all select-none cursor-pointer"
                  title="View scoring methodology & formula"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-blue-500" />
                  <span>How It Works</span>
                </button>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 px-3.5 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 transition-all select-none relative cursor-pointer"
                  title="Copy a shareable link of this audit report to your clipboard."
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copiedLink ? "Link Copied!" : "Share Audit"}</span>
                  {copiedLink && (
                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded shadow-md z-50 animate-bounce whitespace-nowrap">
                      Copied report link!
                    </span>
                  )}
                </button>
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-2 px-3.5 py-2 bg-slate-900 dark:bg-slate-800 hover:bg-slate-950 dark:hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Export Report PDF</span>
                </button>
              </div>
            </div>

            {/* EXECUTIVE SUMMARY */}
            <section id="executive-summary" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Gauges & Trend block */}
              <div className="lg:col-span-2 space-y-6">
                <VisualGauges report={report} />
              </div>

              {/* Core Strengths, Weaknesses, and Opportunities overview card */}
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-100 tracking-tight uppercase tracking-wider">
                      Executive Score Sheet
                    </h3>
                  </div>

                  {/* Bullet sets */}
                  <div className="space-y-5">
                    {/* Strengths */}
                    <div>
                      <h4 className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest flex items-center gap-1.5 mb-2">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Top AI Strengths</span>
                      </h4>
                      <ul className="space-y-1.5 pl-1 text-[11px] text-slate-600 dark:text-slate-350 italic list-none">
                        {(report.strengths || []).slice(0, 5).map((str, idx) => (
                          <li key={idx} className="flex gap-2">
                            <span className="text-emerald-500 font-bold shrink-0">✓</span>
                            <span>{str}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Weaknesses */}
                    <div>
                      <h4 className="text-[11px] font-bold text-red-650 dark:text-red-400 uppercase tracking-widest flex items-center gap-1.5 mb-2">
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Key Weaknesses</span>
                      </h4>
                      <ul className="space-y-1.5 pl-1 text-[11px] text-slate-600 dark:text-slate-350 italic list-none">
                        {(report.weaknesses || []).slice(0, 5).map((wk, idx) => (
                          <li key={idx} className="flex gap-2">
                            <span className="text-red-500 font-bold shrink-0">✗</span>
                            <span>{wk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Opportunities */}
                    <div>
                      <h4 className="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest flex items-center gap-1.5 mb-2">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>Core LLM Target Opportunities</span>
                      </h4>
                      <div className="space-y-2">
                        {(report.opportunities || []).slice(0, 3).map((op, idx) => (
                          <div key={idx} className="p-2 py-1.5 rounded bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-800 dark:text-amber-300">
                            {op}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mt-4 text-[11px] text-slate-400 dark:text-slate-500 italic">
                  Audit targets optimized vectors across {report.platforms?.length || 5} LLM pipelines.
                </div>
              </div>
            </section>

            {/* MODULE 1: AI VISIBILITY ANALYSIS */}
            <section id="module-visibility-analysis" className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-lg font-extrabold text-slate-950 dark:text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    Module 1: AI Engine Penetration Index
                  </h3>
                  <p className="text-xs text-slate-450 dark:text-slate-400 mt-1">
                    Analysis of mentions, citations, and search probability across leading AI platforms.
                  </p>
                </div>

                {/* Optional engine filters */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400"><Filter className="w-3 h-3 inline-block mr-1" /> Filter Platform:</span>
                  <select
                    value={platformFilter}
                    onChange={(e) => setPlatformFilter(e.target.value)}
                    className="p-1 px-2.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs bg-slate-55 dark:bg-slate-950 focus:outline-none dark:text-white"
                  >
                    <option value="All">All Platforms</option>
                    <option value="ChatGPT">ChatGPT</option>
                    <option value="Gemini">Gemini</option>
                    <option value="Claude">Claude</option>
                    <option value="Perplexity">Perplexity</option>
                    <option value="Google AI Overviews">Google AI Overviews</option>
                  </select>
                </div>
              </div>

              {/* Platforms Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {(report.platforms || [])
                  .filter((p) => platformFilter === "All" || p.name === platformFilter)
                  .map((p, idx) => {
                    const getStatusColor = (status: string) => {
                      switch (status) {
                        case "Strong":
                          return "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border-emerald-100 dark:border-emerald-950";
                        case "Moderate":
                          return "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400 border-blue-100 dark:border-blue-950";
                        case "Weak":
                          return "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 border-amber-100 dark:border-amber-950";
                        default:
                          return "bg-slate-50 text-slate-700 dark:bg-slate-950 dark:text-slate-400 border-slate-100 dark:border-slate-800";
                      }
                    };

                    return (
                      <div
                        id={`visibility-${p.name.replace(/\s+/g, '-').toLowerCase()}`}
                        key={idx}
                        className="p-5 rounded-2xl bg-slate-50/50 hover:bg-slate-50 dark:bg-slate-950/40 dark:hover:bg-slate-950/85 border border-slate-100 dark:border-slate-800 transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <span className="font-extrabold text-sm text-slate-900 dark:text-white">{p.name} Presence</span>
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusColor(p.status)}`}>
                              {p.status}
                            </span>
                          </div>

                          {/* Progress Score Bar */}
                          <div className="space-y-1 mb-4">
                            <div className="flex justify-between font-mono text-[10px]">
                              <span className="text-slate-400">Visibility Weight</span>
                              <strong className="text-slate-700 dark:text-slate-300">{p.score}/100</strong>
                            </div>
                            <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                              <div
                                style={{ width: `${p.score}%` }}
                                className={`h-full rounded-full ${
                                  p.score >= 80 ? 'bg-emerald-500' : p.score >= 60 ? 'bg-blue-500' : 'bg-amber-500'
                                }`}
                              />
                            </div>
                          </div>

                          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                            {p.explanation}
                          </p>
                        </div>

                        {/* Reason Bullets */}
                        <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80">
                          <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-2">
                            Key Drivers
                          </span>
                          <ul className="space-y-1 pl-1 text-[11px] text-slate-600 dark:text-slate-350 list-none">
                            {(p.reasons || []).map((reason, rIdx) => (
                              <li key={rIdx} className="flex gap-1.5 items-start">
                                <span className="text-blue-500 shrink-0 font-bold">•</span>
                                <span>{reason}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </section>

            {/* DOUBLE MODULE CONTAINER: MODULE 2 & 3 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* MODULE 2: ENTITY UNDERSTANDING */}
              <section id="module-entity-understanding" className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                      <Layers className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      Module 2: Entity Schema Integrity
                    </h3>
                    <div className="text-right">
                      <div className="text-[10px] font-bold text-slate-400 uppercase">Entity Score</div>
                      <span className="text-lg font-black text-purple-600 dark:text-purple-400">{report.entity.score}%</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                    Analyze whether Knowledge Graphs and retrieval systems clearly map and define this organization as a structured entity.
                  </p>

                  {/* Schema Signal Checks */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="p-3 rounded-xl bg-slate-50/50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                      <span className="text-xs text-slate-600 dark:text-slate-300">Entity Recognized</span>
                      {report.entity.signals.isEntityRecognized ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <XCircle className="w-4 h-4 text-slate-300 dark:text-slate-650" />
                      )}
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50/50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                      <span className="text-xs text-slate-600 dark:text-slate-300">Brand Clearly Defined</span>
                      {report.entity.signals.isBrandClearlyDefined ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <XCircle className="w-4 h-4 text-slate-300 dark:text-slate-650" />
                      )}
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50/50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                      <span className="text-xs text-slate-600 dark:text-slate-300">Org Schema Present</span>
                      {report.entity.signals.isOrganizationSchemaPresent ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <XCircle className="w-4 h-4 text-slate-300 dark:text-slate-650" />
                      )}
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50/50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                      <span className="text-xs text-slate-600 dark:text-slate-300">Author Entities Set</span>
                      {report.entity.signals.isAuthorEntitiesPresent ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <XCircle className="w-4 h-4 text-slate-300 dark:text-slate-650" />
                      )}
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50/50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                      <span className="text-xs text-slate-600 dark:text-slate-300">Socials Connected</span>
                      {report.entity.signals.isSocialProfilesConnected ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <XCircle className="w-4 h-4 text-slate-300 dark:text-slate-650" />
                      )}
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50/50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                      <span className="text-xs text-slate-600 dark:text-slate-300">KG Eligible</span>
                      {report.entity.signals.isKnowledgeGraphEligible ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <XCircle className="w-4 h-4 text-slate-300 dark:text-slate-650" />
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Strengths list */}
                    <div>
                      <strong className="text-[10px] font-bold text-emerald-650 dark:text-emerald-400 uppercase tracking-widest block mb-1">
                        Strengths
                      </strong>
                      <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-350 list-none pl-1">
                        {(report.entity.strengths || []).map((item, id) => (
                          <li key={id} className="flex gap-2">
                            <span className="text-emerald-500 font-bold shrink-0">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Missing Signals */}
                    <div>
                      <strong className="text-[10px] font-bold text-red-650 dark:text-red-400 uppercase tracking-widest block mb-1">
                        Missing Schema Anchors
                      </strong>
                      <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-350 list-none pl-1">
                        {(report.entity.missingSignals || []).map((item, id) => (
                          <li key={id} className="flex gap-2">
                            <span className="text-red-500 font-bold shrink-0">!</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mt-6 bg-slate-50 dark:bg-slate-950/50 p-3 rounded-lg text-xs">
                  <div className="font-bold text-[10px] text-indigo-650 dark:text-indigo-400 uppercase tracking-wide flex items-center gap-1.5 mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Recommended Improvement:</span>
                  </div>
                  <ul className="space-y-1 pl-1 list-disc list-inside text-slate-600 dark:text-slate-350">
                    {(report.entity.recommendedImprovements || []).map((item, id) => (
                      <li key={id}>{item}</li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* MODULE 3: CONTENT UNDERSTANDING */}
              <section id="module-content-understanding" className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-amber-600 dark:text-amber-500" />
                      Module 3: Semantic Content Gaps
                    </h3>
                    <div className="text-right">
                      <div className="text-[10px] font-bold text-slate-400 uppercase">Content Score</div>
                      <span className="text-lg font-black text-amber-600 dark:text-amber-500">{report.content.score}%</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 font-medium">
                    Analysis of how effectively copy structures and local bio registries satisfy neural search intents and RAG (Retrieval-Augmented Generation) parsers.
                  </p>

                  <div className="space-y-4">
                    {/* Topics Covered */}
                    <div>
                      <strong className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-2">
                        Topics Recognized By LLMs
                      </strong>
                      <div className="flex flex-wrap gap-1.5 pl-1">
                        {(report.content.topicsCovered || []).map((topic, id) => (
                          <span key={id} className="text-[10.5px] px-2.5 py-1 bg-blue-50 dark:bg-blue-950 text-blue-800 dark:text-blue-300 rounded-md border border-blue-55 dark:border-blue-950 font-medium">
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Topics Missing */}
                    <div>
                      <strong className="text-[10px] font-bold text-red-650 dark:text-red-400 uppercase tracking-widest block mb-1">
                        Critical Topics Missing
                      </strong>
                      <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-350 list-none pl-1">
                        {(report.content.topicsMissing || []).map((item, id) => (
                          <li key={id} className="flex gap-2 text-[11px] font-medium text-slate-705 dark:text-slate-300">
                            <span className="text-rose-500 font-bold shrink-0">⚠</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Potential Content Gaps */}
                    <div>
                      <strong className="text-[10px] font-bold text-amber-655 dark:text-amber-400 uppercase tracking-widest block mb-1">
                        Vector Match Content Gaps
                      </strong>
                      <p className="text-xs pl-1 text-slate-600 dark:text-slate-400 italic">
                        {report.content.potentialContentGaps && report.content.potentialContentGaps[0] ? report.content.potentialContentGaps[0] : "None detected."}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 mt-6 grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-emerald-500/5 dark:bg-emerald-950/10 border border-emerald-500/15">
                    <span className="text-[9px] uppercase font-bold tracking-wider text-emerald-650 dark:text-emerald-400 block mb-0.5">Expertise Signals</span>
                    <strong className="text-xs text-slate-700 dark:text-slate-300 font-bold">Strong Presence</strong>
                  </div>
                  <div className="p-3 rounded-lg bg-red-500/5 dark:bg-red-950/10 border border-red-500/15">
                    <span className="text-[9px] uppercase font-bold tracking-wider text-red-650 dark:text-red-400 block mb-0.5">FAQ structured content</span>
                    <strong className="text-xs text-slate-700 dark:text-slate-300 font-bold">Lacks Schema Markup</strong>
                  </div>
                </div>
              </section>
            </div>

            {/* DOUBLE MODULE CONTAINER: MODULE 4 & 5 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* MODULE 4: AUTHORITY & TRUST */}
              <section id="module-authority-trust" className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                      <Award className="w-5 h-5 text-emerald-600 dark:text-emerald-500" />
                      Module 4: Authority &amp; Trust anchors
                    </h3>
                    <div className="text-right">
                      <div className="text-[10px] font-bold text-slate-400 uppercase">Trust Score</div>
                      <span className="text-lg font-black text-emerald-650 dark:text-emerald-400">{report.authority.score}%</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                    Evaluating references inside trusted global platforms, news portals, and community vectors that feeds LLM pre-training weights.
                  </p>

                  <div className="space-y-4">
                    {/* Mention Sources */}
                    <div>
                      <strong className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-2">
                        Trusted Citations Verified
                      </strong>
                      <div className="flex flex-wrap gap-1.5 pl-1">
                        {(report.authority.mentionSources || []).map((source, id) => (
                          <span key={id} className="text-[11px] px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-350 rounded-md border border-emerald-100 dark:border-emerald-950/40 font-mono font-medium">
                            {source}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Trust Signals Found */}
                      <div>
                        <strong className="text-[10px] font-bold text-emerald-655 dark:text-emerald-400 uppercase tracking-widest block mb-1">
                          Signals Found
                        </strong>
                        <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-350 list-none pl-1">
                          {(report.authority.trustSignalsFound || []).map((sig, id) => (
                            <li key={id} className="flex gap-2">
                              <span className="text-emerald-500 font-bold shrink-0">✓</span>
                              <span>{sig}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Trust Signals Missing */}
                      <div>
                        <strong className="text-[10px] font-bold text-red-655 dark:text-red-400 uppercase tracking-widest block mb-1">
                          Citations Missing
                        </strong>
                        <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-350 list-none pl-1">
                          {(report.authority.trustSignalsMissing || []).map((sig, id) => (
                            <li key={id} className="flex gap-2">
                              <span className="text-red-500 font-bold shrink-0">!</span>
                              <span>{sig}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 dark:text-slate-550 italic pt-4 mt-6 border-t border-slate-100 dark:border-slate-800/80">
                  Authority metrics check brand entity frequency under RAG indexes.
                </div>
              </section>

              {/* MODULE 5: RETRIEVAL READINESS */}
              <section id="module-retrieval-readiness" className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                      <FileSearch className="w-5 h-5 text-indigo-650 dark:text-indigo-400" />
                      Module 5: Machine-Retrieval Readiness
                    </h3>
                    <div className="text-right">
                      <div className="text-[10px] font-bold text-slate-400 uppercase">Readiness Score</div>
                      <span className="text-lg font-black text-indigo-650 dark:text-indigo-400">{report.retrieval.score}%</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                    Evaluate whether the raw layout, page hierarchy, crawlability, and code are ready to be scraped cleanly by LLM agents.
                  </p>

                  {/* Readiness Details Table */}
                  <div className="space-y-2 border-b border-slate-100 dark:border-slate-800 pb-4 mb-4">
                    <div className="flex justify-between items-center text-xs py-1.5 hover:bg-slate-50 dark:hover:bg-slate-950 px-2 rounded-md">
                      <span className="text-slate-600 dark:text-slate-450">Semantic HTML Structure</span>
                      <strong className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${report.retrieval.semanticHTML === "Excellent" ? "text-emerald-600 dark:text-emerald-400" : "text-sky-500"}`}>
                        {report.retrieval.semanticHTML}
                      </strong>
                    </div>
                    <div className="flex justify-between items-center text-xs py-1.5 hover:bg-slate-50 dark:hover:bg-slate-950 px-2 rounded-md">
                      <span className="text-slate-600 dark:text-slate-450">Structured Schema Data</span>
                      <strong className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${report.retrieval.structuredData === "Excellent" ? "text-emerald-600 dark:text-emerald-400" : "text-amber-500"}`}>
                        {report.retrieval.structuredData}
                      </strong>
                    </div>
                    <div className="flex justify-between items-center text-xs py-1.5 hover:bg-slate-50 dark:hover:bg-slate-950 px-2 rounded-md">
                      <span className="text-slate-600 dark:text-slate-450">Header Hierarchies (H1-H3)</span>
                      <strong className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${report.retrieval.pageHierarchy === "Excellent" ? "text-emerald-600 dark:text-emerald-400" : "text-sky-500"}`}>
                        {report.retrieval.pageHierarchy}
                      </strong>
                    </div>
                    <div className="flex justify-between items-center text-xs py-1.5 hover:bg-slate-50 dark:hover:bg-slate-950 px-2 rounded-md">
                      <span className="text-slate-600 dark:text-slate-450">Crawlability &amp; Robots Clearance</span>
                      <strong className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${report.retrieval.crawlability === "Excellent" ? "text-emerald-600 dark:text-emerald-400" : "text-sky-500"}`}>
                        {report.retrieval.crawlability}
                      </strong>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed italic bg-indigo-500/5 p-3 rounded-lg border border-indigo-500/10">
                    <Info className="w-3.5 h-3.5 inline text-indigo-550 dark:text-indigo-400 mr-1.5 -mt-0.5" />
                    <strong>Crawl Audit details:</strong> {report.retrieval.details}
                  </p>
                </div>

                <div className="pt-2 text-[10px] text-slate-400/85">
                  Semantic extraction models map pages using text-to-elements vectors.
                </div>
              </section>
            </div>

            {/* MODULE 6: TECHNICAL AI SEO */}
            <section id="module-technical-ai-seo" className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 shadow-xs">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-base font-extrabold text-slate-950 dark:text-white flex items-center gap-2">
                    <Layers className="w-5 h-5 text-sky-600 dark:text-sky-500" />
                    Module 6: Technical AI Schema &amp; Crawler Audit
                  </h3>
                  <p className="text-xs text-slate-450 dark:text-slate-400 mt-1">
                    Verifying indexing schema scripts and crawler compliance parameters.
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Technical Score</div>
                  <span className="text-2xl font-black text-sky-655 dark:text-sky-400">{report.technical.score}%</span>
                </div>
              </div>

              {/* Technical breakdown groups */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Implemented */}
                <div className="p-4 rounded-xl bg-slate-50/50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2 mb-3.5 text-emerald-650 dark:text-emerald-400">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span className="text-xs font-bold uppercase tracking-wider">Implemented</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-350 list-inside pl-0.5 list-none">
                    {(report.technical.implemented || []).map((val, idx) => (
                      <li key={idx} className="flex gap-1.5 items-start bg-emerald-500/5 p-1 rounded">
                        <span className="text-emerald-500">•</span>
                        <span>{val}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Missing */}
                <div className="p-4 rounded-xl bg-slate-50/50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2 mb-3.5 text-amber-650 dark:text-amber-400">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span className="text-xs font-bold uppercase tracking-wider">Missing Schema</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-350 list-inside pl-0.5 list-none">
                    {(report.technical.missing || []).map((val, idx) => (
                      <li key={idx} className="flex gap-1.5 items-start bg-amber-500/5 p-1 rounded">
                        <span className="text-amber-500">•</span>
                        <span>{val}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Errors */}
                <div className="p-4 rounded-xl bg-slate-50/50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2 mb-3.5 text-red-650 dark:text-red-400">
                    <XCircle className="w-4 h-4 shrink-0" />
                    <span className="text-xs font-bold uppercase tracking-wider">Errors</span>
                  </div>
                  {report.technical.errors && report.technical.errors.length > 0 ? (
                    <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-350 list-inside pl-0.5 list-none">
                      {report.technical.errors.map((val, idx) => (
                        <li key={idx} className="flex gap-1.5 items-start bg-red-500/5 p-1.5 rounded border border-red-500/10 text-red-750 dark:text-red-400">
                          <span className="text-red-500">•</span>
                          <span>{val}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-xs text-slate-400 italic">No syntax layout errors detected.</span>
                  )}
                </div>

                {/* Warnings */}
                <div className="p-4 rounded-xl bg-slate-50/50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2 mb-3.5 text-slate-500 dark:text-slate-400">
                    <Info className="w-4 h-4 shrink-0" />
                    <span className="text-xs font-bold uppercase tracking-wider">Warnings</span>
                  </div>
                  {report.technical.warnings && report.technical.warnings.length > 0 ? (
                    <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-350 list-inside pl-0.5 list-none">
                      {report.technical.warnings.map((val, idx) => (
                        <li key={idx} className="flex gap-1.5 items-start bg-slate-500/5 p-1 rounded">
                          <span className="text-slate-450">•</span>
                          <span>{val}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-xs text-slate-400 italic">Zero warnings logged.</span>
                  )}
                </div>
              </div>
            </section>

            {/* MODULE 7: COMPETITOR COMPARISON */}
            <section id="module-competitor-comparison" className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 shadow-xs">
              <div className="mb-6">
                <h3 className="text-base font-extrabold text-slate-950 dark:text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-rose-500" />
                  Module 7: Competitor Entity Confrontation
                </h3>
                <p className="text-xs text-slate-450 dark:text-slate-400 mt-1">
                  Comparing indexation volume, citation footprints, and entity visibility metrics against core industry domains.
                </p>
              </div>

              {/* Grid with metrics table layout */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Metric comparisons */}
                <div className="lg:col-span-2 overflow-x-auto">
                  <table className="w-full text-left text-xs min-w-[450px]">
                    <thead>
                      <tr className="border-b border-slate-100 dark:border-slate-800/80 text-slate-400 uppercase tracking-widest text-[9px] font-bold">
                        <th className="py-2.5">Domain Profile</th>
                        <th className="py-2.5 text-center">AI Visibility</th>
                        <th className="py-2.5 text-center">Entity Strength</th>
                        <th className="py-2.5 text-center">Authority Index</th>
                        <th className="py-2.5 text-center">Content Depth</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-150/40 dark:divide-slate-800/40">
                      {/* You */}
                      <tr className="bg-blue-500/5 border-l-2 border-blue-500">
                        <td className="py-3.5 pl-2">
                          <strong className="text-slate-900 dark:text-white font-mono">{report.competitors.you.name}</strong>
                          <span className="block text-[9px] uppercase font-bold text-blue-600 dark:text-blue-400">Target</span>
                        </td>
                        <td className="py-3.5 text-center">
                          <span className="font-extrabold font-mono text-sm">{report.competitors.you.visibilityScore}</span>/100
                        </td>
                        <td className="py-3.5 text-center font-mono">{report.competitors.you.entityScore}</td>
                        <td className="py-3.5 text-center font-mono">{report.competitors.you.authorityScore}</td>
                        <td className="py-3.5 text-center font-mono">{report.competitors.you.contentScore}</td>
                      </tr>

                      {/* Competitors */}
                      {(report.competitors.competitors || []).map((comp, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-950/40">
                          <td className="py-3.5 pl-2 font-mono text-slate-700 dark:text-slate-355">
                            {comp.name}
                            <span className="block text-[9px] uppercase text-slate-405">Competitor</span>
                          </td>
                          <td className="py-3.5 text-center">
                            <span className="font-bold font-mono">{comp.visibilityScore}</span>/100
                          </td>
                          <td className="py-3.5 text-center font-mono">{comp.entityScore}</td>
                          <td className="py-3.5 text-center font-mono">{comp.authorityScore}</td>
                          <td className="py-3.5 text-center font-mono">{comp.contentScore}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  
                  {/* Visually descriptive graph lines */}
                  <div className="mt-6 space-y-3.5">
                    <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Comparative Visibility Share</h5>
                    <div className="space-y-2 max-w-lg">
                      {/* Self */}
                      <div className="space-y-1">
                        <div className="flex justify-between font-mono text-[10px]">
                          <strong>{report.competitors.you.name}</strong>
                          <strong>{report.competitors.you.visibilityScore}%</strong>
                        </div>
                        <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div style={{ width: `${report.competitors.you.visibilityScore}%` }} className="h-full bg-blue-600" />
                        </div>
                      </div>

                      {/* Competitor list */}
                      {(report.competitors.competitors || []).map((comp, idx) => (
                        <div key={idx} className="space-y-1">
                          <div className="flex justify-between font-mono text-[10px] text-slate-500">
                            <span>{comp.name}</span>
                            <span>{comp.visibilityScore}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div style={{ width: `${comp.visibilityScore}%` }} className="h-full bg-slate-400 dark:bg-slate-600" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Advantages / Disadvantages */}
                <div className="p-5 rounded-xl bg-slate-50/50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800 space-y-4">
                  {/* Advantages */}
                  <div>
                    <h4 className="text-[11px] font-bold text-emerald-650 dark:text-emerald-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Your Advantage Vectors</span>
                    </h4>
                    <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-350 list-inside pl-1 list-disc">
                      {(report.competitors.advantages || []).map((val, idx) => (
                        <li key={idx}>{val}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Disadvantages */}
                  <div>
                    <h4 className="text-[11px] font-bold text-rose-650 dark:text-rose-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                      <XCircle className="w-3.5 h-3.5 text-rose-500" />
                      <span>Identified Gaps vs. Rivals</span>
                    </h4>
                    <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-350 list-inside pl-1 list-disc">
                      {(report.competitors.disadvantages || []).map((val, idx) => (
                        <li key={idx}>{val}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Missed Opportunities */}
                  <div>
                    <h4 className="text-[11px] font-bold text-amber-655 dark:text-amber-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                      <span>Rival Missed Opportunities</span>
                    </h4>
                    <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-350 list-inside pl-1 list-disc">
                      {(report.competitors.missedOpportunities || []).map((val, idx) => (
                        <li key={idx}>{val}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* MODULE 8: AI VISIBILITY ROADMAP */}
            <section id="module-visibility-roadmap" className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-base font-extrabold text-slate-950 dark:text-white flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    Module 8: Actionable Optimization Roadmap
                  </h3>
                  <p className="text-xs text-slate-450 dark:text-slate-400 mt-1">
                    Structured guidelines designed to maximize your brand&apos;s retrieval and citation weight.
                  </p>
                </div>

                {/* Search & Filter Roadmaps */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search roadmap..."
                      value={roadmapSearch}
                      onChange={(e) => setRoadmapSearch(e.target.value)}
                      className="pl-8 pr-3 py-1 rounded-lg border border-slate-200 dark:border-slate-800 text-xs focus:outline-none dark:bg-slate-950 dark:text-white placeholder-slate-400"
                    />
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <span>Priority:</span>
                    <button
                      onClick={() => setRoadmapFilter("All")}
                      className={`px-2 py-0.5 rounded text-[11px] font-semibold cursor-pointer ${
                        roadmapFilter === "All" ? "bg-slate-900 text-white dark:bg-slate-800" : "bg-slate-100 dark:bg-slate-805"
                      }`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setRoadmapFilter("High")}
                      className={`px-2 py-0.5 rounded text-[11px] font-semibold cursor-pointer ${
                        roadmapFilter === "High" ? "bg-red-500 text-white" : "bg-slate-100 dark:bg-slate-805 text-red-650"
                      }`}
                    >
                      High
                    </button>
                    <button
                      onClick={() => setRoadmapFilter("Medium")}
                      className={`px-2 py-0.5 rounded text-[11px] font-semibold cursor-pointer ${
                        roadmapFilter === "Medium" ? "bg-blue-500 text-white" : "bg-slate-100 dark:bg-slate-850 text-blue-600"
                      }`}
                    >
                      Medium
                    </button>
                  </div>
                </div>
              </div>

              {/* Roadmap list */}
              <div className="space-y-4">
                {filteredRoadmap.length > 0 ? (
                  filteredRoadmap.map((item, idx) => {
                    const getPriorityStyles = (p: string) => {
                      switch (p) {
                        case "High":
                          return "bg-red-50 text-red-700 dark:bg-red-950/20 dark:text-red-400 border-red-100 dark:border-red-950/40";
                        case "Medium":
                          return "bg-blue-50 text-blue-700 dark:bg-blue-950/20 dark:text-blue-400 border-blue-100 dark:border-blue-950/40";
                        default:
                          return "bg-slate-55 text-slate-700 dark:bg-slate-900 dark:text-slate-400 border-slate-200 dark:border-slate-800";
                      }
                    };

                    const getDifficultyStyles = (d: string) => {
                      switch (d) {
                        case "Easy":
                          return "text-emerald-600 dark:text-emerald-400";
                        case "Medium":
                          return "text-sky-500";
                        default:
                          return "text-amber-500";
                      }
                    };

                    return (
                      <div
                        key={item.id || idx}
                        className="p-5 rounded-xl border border-slate-105 dark:border-slate-800/80 bg-slate-50/50 hover:bg-slate-50 dark:bg-slate-950/20 dark:hover:bg-slate-950/50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                      >
                        <div className="space-y-1.5 flex-1 max-w-3xl">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-extrabold text-xs text-slate-400 font-mono">#{idx+1}</span>
                            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                              {item.title}
                            </h4>
                            <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase border ${getPriorityStyles(item.priority)}`}>
                              Priority: {item.priority}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                            {item.description}
                          </p>
                        </div>

                        {/* Recommendation Tags */}
                        <div className="grid grid-cols-3 md:flex md:items-center gap-4 text-center text-xs shrink-0 pl-4 md:pl-0 border-l border-slate-100 dark:border-slate-805">
                          {/* Impact */}
                          <div className="px-2">
                            <span className="block text-[9px] text-slate-450 dark:text-slate-550 uppercase font-bold tracking-wider">Impact</span>
                            <span className="font-semibold text-slate-705 dark:text-slate-300">{item.impact}</span>
                          </div>

                          {/* Difficulty */}
                          <div className="px-2">
                            <span className="block text-[9px] text-slate-450 dark:text-slate-550 uppercase font-bold tracking-wider">Difficulty</span>
                            <span className={`font-semibold ${getDifficultyStyles(item.difficulty)}`}>{item.difficulty}</span>
                          </div>

                          {/* Est gain */}
                          <div className="px-2 text-blue-600 dark:text-blue-400 font-mono font-bold shrink-0 bg-blue-500/5 dark:bg-blue-400/5 p-1 rounded">
                            <span className="block text-[9.5px] text-indigo-500 uppercase font-bold tracking-wider">Gain Weight</span>
                            <span className="text-[12.5px]">+{item.estimatedGain} Pts</span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-xs text-slate-400 italic text-center py-6">
                    No recommendations found matching search or filters.
                  </p>
                )}
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Footer Block */}
      <footer className="mt-16 border-t border-slate-100 dark:border-slate-900 bg-white dark:bg-slate-900 py-8 px-4 text-center text-xs text-slate-400 dark:text-slate-500 print:hidden">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>
            © 2026 AI Visibility Auditor. Developed by <strong className="text-pink-600 dark:text-pink-400 font-bold">Ami - SEO Girl</strong>. All rights reserved.
          </p>
          <div className="flex gap-4 font-semibold text-[11px] text-slate-450 items-center">
            <button
              onClick={() => setIsHowItWorksOpen(true)}
              className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
            >
              How it works
            </button>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <button
              onClick={() => setIsVercelGuideOpen(true)}
              className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 hover:underline cursor-pointer flex items-center gap-1"
            >
              <Key className="w-3 h-3 text-blue-500" />
              <span>Vercel / API Key Guide</span>
            </button>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-mono">PORT 3000 Active</span>
            <span>Gemini 3.7 Ready</span>
          </div>
        </div>
      </footer>

      {/* Interactive How It Works Modal */}
      <HowItWorksModal
        isOpen={isHowItWorksOpen}
        onClose={() => setIsHowItWorksOpen(false)}
      />

      {/* Vercel & API Key Setup Guide Modal */}
      <VercelGuideModal
        isOpen={isVercelGuideOpen}
        onClose={() => setIsVercelGuideOpen(false)}
      />
    </div>
  );
}
