import React, { useState, useRef, useEffect } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { useLanguage, LANGUAGE_OPTIONS } from '../i18n/LanguageContext';
import { Language } from '../i18n/translations';

interface LanguageSelectorProps {
  variant?: 'compact' | 'dropdown' | 'segmented';
  className?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  variant = 'dropdown',
  className = '',
}) => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentOption = LANGUAGE_OPTIONS.find((opt) => opt.code === language) || LANGUAGE_OPTIONS[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  if (variant === 'segmented') {
    return (
      <div className={`inline-flex p-1 bg-slate-800/90 rounded-lg border border-slate-700 ${className}`}>
        {LANGUAGE_OPTIONS.map((opt) => {
          const isActive = opt.code === language;
          return (
            <button
              key={opt.code}
              id={`lang-btn-${opt.code}`}
              type="button"
              onClick={() => setLanguage(opt.code)}
              className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer select-none ${
                isActive
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <span>{opt.flag}</span>
              <span>{opt.nativeLabel}</span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        id="language-switcher-button"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700/90 border border-slate-700 text-xs font-bold text-white shadow-xs transition-all cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        title="Switch Display Language / 切换语言 / Changer de langue"
      >
        <Globe className="w-3.5 h-3.5 text-blue-400 shrink-0" />
        <span className="text-base leading-none">{currentOption.flag}</span>
        <span className="font-semibold text-slate-100">{currentOption.nativeLabel}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div
          id="language-dropdown-menu"
          className="absolute right-0 top-full mt-1.5 z-50 w-44 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-1 text-slate-100 animate-in fade-in zoom-in-95 duration-100"
        >
          <div className="px-2.5 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800 mb-1">
            Display Language
          </div>
          {LANGUAGE_OPTIONS.map((opt) => {
            const isSelected = opt.code === language;
            return (
              <button
                key={opt.code}
                id={`select-lang-${opt.code}`}
                type="button"
                onClick={() => {
                  setLanguage(opt.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer text-left ${
                  isSelected
                    ? 'bg-blue-600/90 text-white font-bold'
                    : 'text-slate-200 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base leading-none">{opt.flag}</span>
                  <div>
                    <div className="font-semibold">{opt.nativeLabel}</div>
                    <div className="text-[10px] text-slate-400 leading-none">{opt.label}</div>
                  </div>
                </div>
                {isSelected && <Check className="w-4 h-4 text-white shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
