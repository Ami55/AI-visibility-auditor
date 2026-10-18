import React, { useState, useEffect } from "react";

interface InputFormProps {
  onSubmit: (data: {
    domain: string;
    brandName: string;
    competitors: string[];
    industry: string;
    country: string;
  }) => void;
  isLoading: boolean;
}

const LOADING_STEPS = [
  "Initializing AI Visibility Auditor baseline...",
  "Querying ChatGPT web scraper index logs & crawl blocks...",
  "Testing Google Knowledge Graph entity status anchors...",
  "Extracting semantic page structure and header lists...",
  "Synthesizing RAG retrieval density with pre-trained vectors...",
  "Calculating citation authority distribution vs. main competitors...",
  "Verifying Organization schema and Wikidata SameAs link alignment...",
  "Compiling technical AI SEO audits and Roadmap recommendations...",
  "Refining weighted scores and generating report visualization matrices..."
];

export default function InputForm({ onSubmit, isLoading }: InputFormProps) {
  const [domain, setDomain] = useState("");
  const [brandName, setBrandName] = useState("");
  const [competitorsInput, setCompetitorsInput] = useState("");
  const [industry, setIndustry] = useState("");
  const [country, setCountry] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [loadingStepIndex, setLoadingStepIndex] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      setLoadingStepIndex(0);
      interval = setInterval(() => {
        setLoadingStepIndex((prev) => (prev + 1) % LOADING_STEPS.length);
      }, 3500);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain) return;

    // Clean competitors input
    const competitors = competitorsInput
      .split(",")
      .map((c) => c.trim())
      .filter((c) => c !== "");

    // Ensure http/https is stripped or cleaned as required, but we keep it general
    let cleanedDomain = domain.trim();
    cleanedDomain = cleanedDomain.replace(/^(https?:\/\/)?(www\.)?/, "");
    // strip trailing slash
    cleanedDomain = cleanedDomain.replace(/\/$/, "");

    onSubmit({
      domain: cleanedDomain,
      brandName: brandName.trim(),
      competitors: competitors.map(c => c.replace(/^(https?:\/\/)?(www\.)?/, "").replace(/\/$/, "")),
      industry: industry.trim(),
      country: country.trim(),
    });
  };

  return (
    <div id="input-form-container" className="max-w-xl mx-auto my-12 p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xl transition-all duration-300">
      <div className="text-center mb-8">
        <h2 id="auditor-title" className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          AI Visibility Auditor
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm max-w-md mx-auto">
          Audit how visible, understandable, and retrievable your organization is across ChatGPT, Gemini, Claude, Perplexity, and Google AI Overviews.
        </p>
      </div>

      {isLoading ? (
        <div id="auditor-loading" className="flex flex-col items-center justify-center py-10">
          <div className="relative flex items-center justify-center w-24 h-24 mb-6">
            <span className="absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-20 animate-ping"></span>
            <div className="w-16 h-16 rounded-full border-4 border-blue-100 border-t-blue-600 animate-spin"></div>
            <div className="absolute text-blue-600 dark:text-blue-400 font-extrabold text-xs">AI</div>
          </div>
          <div className="text-center max-w-sm px-4">
            <h4 className="text-slate-800 dark:text-slate-200 font-semibold text-base mb-1">
              Analyzing Brand Retrieval Profiles
            </h4>
            <p className="text-blue-600 dark:text-blue-400 font-mono text-xs animate-pulse tracking-wide min-h-[3rem] flex items-center justify-center">
              {LOADING_STEPS[loadingStepIndex]}
            </p>
            <p className="text-slate-400 dark:text-slate-500 text-xs mt-4">
              This deeper analysis checks schemas, references, and citation indexes server-side.
            </p>
          </div>
        </div>
      ) : (
        <form id="audit-input-form" onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="domain-input" className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              Domain URL <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus-within:border-blue-500 dark:focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all overflow-hidden shadow-inner">
              <span className="px-3.5 py-3 text-slate-400 dark:text-slate-500 font-mono text-sm select-none border-r border-slate-200 dark:border-slate-800/80 bg-slate-100/70 dark:bg-slate-900/70">
                https://
              </span>
              <input
                id="domain-input"
                type="text"
                required
                placeholder="yoursite.com"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="flex-1 px-3.5 py-3 bg-transparent outline-none font-medium text-slate-800 dark:text-slate-100 placeholder-slate-400 text-sm"
              />
            </div>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 pl-1">
              Example: example.com
            </p>
          </div>

          <div className="border-t border-slate-100 dark:border-slate-800/80 my-4" />

          <div>
            <button
              id="expand-advanced-btn"
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center justify-between w-full py-1.5 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <span>{showAdvanced ? "▼ Hide Optional Profiles" : "▶ Show Optional Profiles"}</span>
              <span className="text-[10px] lowercase text-slate-400 normal-case font-normal">
                {showAdvanced ? "less options" : "competitors, industry, country"}
              </span>
            </button>

            {showAdvanced && (
              <div id="advanced-fields" className="mt-4 space-y-4 p-4 rounded-xl bg-slate-50/55 dark:bg-slate-950/30 border border-slate-100 dark:border-slate-800/50 transition-all duration-300">
                <div>
                  <label htmlFor="brand-name-input" className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                    Brand Name
                  </label>
                  <input
                    id="brand-name-input"
                    type="text"
                    placeholder="e.g. Example Travel"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    className="w-full px-4 py-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-blue-500 dark:focus:border-blue-500 rounded-lg outline-none font-medium text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400/80 transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="competitor-input" className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                    Competitor Domains
                  </label>
                  <input
                    id="competitor-input"
                    type="text"
                    placeholder="viator.com, getyourguide.com"
                    value={competitorsInput}
                    onChange={(e) => setCompetitorsInput(e.target.value)}
                    className="w-full px-4 py-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-blue-500 dark:focus:border-blue-500 rounded-lg outline-none font-medium text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400/80 transition-all"
                  />
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 pl-1">
                    Separate multiple domains with commas.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="industry-input" className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                      Industry
                    </label>
                    <input
                      id="industry-input"
                      type="text"
                      placeholder="e.g. Travel"
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      className="w-full px-4 py-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-blue-500 dark:focus:border-blue-500 rounded-lg outline-none font-medium text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400/85 transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="country-input" className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                      Target Country
                    </label>
                    <input
                      id="country-input"
                      type="text"
                      placeholder="e.g. Worldwide"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full px-4 py-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-blue-500 dark:focus:border-blue-500 rounded-lg outline-none font-medium text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400/85 transition-all"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <button
            id="audit-submit-btn"
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 hover:from-blue-700 hover:to-indigo-700 dark:hover:from-blue-600 dark:hover:to-indigo-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 text-sm uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Run AI Visibility Audit</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </button>
        </form>
      )}
    </div>
  );
}
