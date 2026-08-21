import React from "react";
import { X, Key, CheckCircle, ExternalLink, ShieldAlert, Cpu, Sparkles, Terminal, Copy, Check } from "lucide-react";

interface VercelGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VercelGuideModal: React.FC<VercelGuideModalProps> = ({ isOpen, onClose }) => {
  const [copiedKeyName, setCopiedKeyName] = React.useState(false);

  if (!isOpen) return null;

  const handleCopyKeyName = () => {
    navigator.clipboard.writeText("GEMINI_API_KEY");
    setCopiedKeyName(true);
    setTimeout(() => setCopiedKeyName(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/70 dark:bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-600 text-white shadow-sm">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                Deploying to Vercel &amp; API Key Setup
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                How to configure your Gemini API Key in Vercel in 3 simple steps
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-700 dark:text-slate-300">
          {/* Explanation Alert */}
          <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/40 text-xs leading-relaxed text-blue-900 dark:text-blue-200">
            <strong className="font-bold flex items-center gap-1.5 mb-1 text-blue-700 dark:text-blue-300">
              <Sparkles className="w-4 h-4" /> Why does this error happen on Vercel?
            </strong>
            When deploying fullstack applications to Vercel, environment variables from your local workspace or Google AI Studio are not copied automatically for security reasons. You must provide your <code>GEMINI_API_KEY</code> in your Vercel Project settings.
          </div>

          {/* 3 Steps */}
          <div className="space-y-4">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Step-by-Step Configuration Guide
            </h4>

            {/* Step 1 */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 flex gap-3.5">
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                1
              </div>
              <div className="space-y-1">
                <h5 className="font-bold text-slate-900 dark:text-white text-sm">
                  Open your Project Settings on Vercel
                </h5>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Go to your <a href="https://vercel.com/dashboard" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 font-semibold underline inline-flex items-center gap-0.5">Vercel Dashboard <ExternalLink className="w-3 h-3 inline" /></a>, select your project, and click the <strong>Settings</strong> tab at the top.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 flex gap-3.5">
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                2
              </div>
              <div className="space-y-2 flex-1">
                <h5 className="font-bold text-slate-900 dark:text-white text-sm">
                  Add the Environment Variable
                </h5>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Click <strong>Environment Variables</strong> in the left sidebar and enter:
                </p>
                <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
                  <div className="flex-1 bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center justify-between font-mono text-xs">
                    <span className="font-bold text-blue-600 dark:text-blue-400">Key: GEMINI_API_KEY</span>
                    <button
                      onClick={handleCopyKeyName}
                      className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                      title="Copy Key Name"
                    >
                      {copiedKeyName ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <div className="flex-1 bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 font-mono text-xs text-slate-500">
                    <span>Value: &lt;Your Gemini API Key&gt;</span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-500">
                  Get your free API key at <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline inline-flex items-center gap-0.5">Google AI Studio <ExternalLink className="w-2.5 h-2.5" /></a>.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 flex gap-3.5">
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                3
              </div>
              <div className="space-y-1">
                <h5 className="font-bold text-slate-900 dark:text-white text-sm">
                  Save &amp; Trigger a Redeployment
                </h5>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Click <strong>Save</strong>. In Vercel, go to the <strong>Deployments</strong> tab, select your latest deployment, click the three dots menu (⋯), and select <strong>Redeploy</strong> to inject the new environment variable.
                </p>
              </div>
            </div>
          </div>

          {/* Zero-Config Resilience Banner */}
          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs text-emerald-900 dark:text-emerald-200 leading-relaxed">
              <strong className="font-bold">Zero-Downtime Heuristic Fallback Enabled:</strong> We've now built an instant offline heuristic engine directly into the application. Even if your Vercel API key is not yet set or if the network drops, your audit will complete seamlessly!
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/80 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-sm"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
