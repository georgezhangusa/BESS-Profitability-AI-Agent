import React, { useState, useEffect } from 'react';
import { BookOpen, Mail, Linkedin, Copy, Check, ExternalLink, X, Sparkles, FileCode } from 'lucide-react';

interface ReadmeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RAW_README_CONTENT = `A BESS profitability AI agent for energy arbitrage and ancillary service revenues across independent electricity wholesale market operators such as CAISO and ERCOT.

This is a conceptual demonstration. If you think it could become a useful application, we can collaborate to make it happen.
Please get in touch with the author, George Zhang, by email: z_george@yahoo.com or reach me on LinkedIn: georgezhangusa`;

export const ReadmeModal: React.FC<ReadmeModalProps> = ({ isOpen, onClose }) => {
  const [copiedType, setCopiedType] = useState<'email' | 'linkedin' | 'raw' | null>(null);
  const [showRaw, setShowRaw] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopy = (text: string, type: 'email' | 'linkedin' | 'raw') => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => {
      setCopiedType((prev) => (prev === type ? null : prev));
    }, 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="bg-white border border-slate-300 rounded-2xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl text-slate-900 animate-in zoom-in-95 duration-150 relative space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shadow-xs">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black tracking-tight text-slate-900">
                  README.md
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-blue-100 text-blue-800 border border-blue-200">
                  Project Info
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-500 mt-0.5">
                BESS Profitability AI Agent • Author: George Zhang
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Section */}
        {!showRaw ? (
          <div className="space-y-4">
            {/* Overview Box */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm leading-relaxed text-slate-800 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Executive Summary</span>
              </div>
              <p className="font-medium text-slate-900">
                A BESS profitability AI agent for energy arbitrage and ancillary service revenues across independent electricity wholesale market operators such as CAISO and ERCOT.
              </p>
            </div>

            {/* Collaboration Note */}
            <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 text-sm leading-relaxed text-blue-950">
              <p className="font-semibold">
                This is a conceptual demonstration. If you think it could become a useful application, we can collaborate to make it happen.
              </p>
            </div>

            {/* Author & Contact Details */}
            <div className="rounded-xl border border-slate-200 p-4 space-y-3 bg-white">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Contact & Collaboration
              </div>

              {/* Email Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-lg bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-slate-500 uppercase">Email</div>
                    <a
                      href="mailto:z_george@yahoo.com"
                      className="text-sm font-semibold text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      z_george@yahoo.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <a
                    href="mailto:z_george@yahoo.com"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-2xs cursor-pointer transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Send Email</span>
                  </a>
                  <button
                    onClick={() => handleCopy('z_george@yahoo.com', 'email')}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg cursor-pointer transition-colors"
                    title="Copy email address"
                  >
                    {copiedType === 'email' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700 font-bold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-500" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* LinkedIn Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-lg bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-sky-100 flex items-center justify-center text-sky-700">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-slate-500 uppercase">LinkedIn</div>
                    <a
                      href="https://www.linkedin.com/in/georgezhangusa"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1"
                    >
                      <span>georgezhangusa</span>
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <a
                    href="https://www.linkedin.com/in/georgezhangusa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-sky-600 hover:bg-sky-500 rounded-lg shadow-2xs cursor-pointer transition-colors"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                    <span>Open Profile</span>
                  </a>
                  <button
                    onClick={() => handleCopy('https://www.linkedin.com/in/georgezhangusa', 'linkedin')}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg cursor-pointer transition-colors"
                    title="Copy LinkedIn URL"
                  >
                    {copiedType === 'linkedin' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700 font-bold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-500" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Raw Markdown View */
          <div className="space-y-3">
            <div className="relative">
              <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs leading-relaxed overflow-x-auto whitespace-pre-wrap max-h-72 border border-slate-800">
                {RAW_README_CONTENT}
              </pre>
              <button
                onClick={() => handleCopy(RAW_README_CONTENT, 'raw')}
                className="absolute top-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-md cursor-pointer transition-colors"
              >
                {copiedType === 'raw' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-300" />
                    <span>Copy Markdown</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Footer actions */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-200">
          <button
            onClick={() => setShowRaw(!showRaw)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
          >
            <FileCode className="w-3.5 h-3.5 text-slate-500" />
            <span>{showRaw ? 'Show Formatted View' : 'View Raw Markdown'}</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold shadow-xs cursor-pointer transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
