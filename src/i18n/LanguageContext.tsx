import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, translations, TranslationDict } from './translations';

export interface LanguageOption {
  code: Language;
  label: string;
  nativeLabel: string;
  flag: string;
}

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: 'en', label: 'English', nativeLabel: 'English', flag: 'EN' },
  { code: 'zh', label: 'Chinese', nativeLabel: '简体中文', flag: 'CN' },
  { code: 'fr', label: 'French', nativeLabel: 'Français', flag: 'FR' },
];

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationDict;
  formatNumber: (num: number, options?: Intl.NumberFormatOptions) => string;
  formatCurrency: (amount: number, digits?: number) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'bess_platform_language';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'en' || saved === 'zh' || saved === 'fr') {
        return saved;
      }
      // Check browser language
      const navLang = navigator.language.toLowerCase();
      if (navLang.startsWith('zh')) return 'zh';
      if (navLang.startsWith('fr')) return 'fr';
    } catch {
      // Ignore
    }
    return 'en';
  });

  const setLanguage = (newLang: Language) => {
    setLanguageState(newLang);
    try {
      localStorage.setItem(STORAGE_KEY, newLang);
    } catch {
      // Ignore
    }
  };

  const t = translations[language] || translations.en;

  const getLocale = (lang: Language) => {
    if (lang === 'zh') return 'zh-CN';
    if (lang === 'fr') return 'fr-FR';
    return 'en-US';
  };

  const formatNumber = (num: number, options?: Intl.NumberFormatOptions) => {
    return new Intl.NumberFormat(getLocale(language), options).format(num);
  };

  const formatCurrency = (amount: number, digits: number = 2) => {
    const formatted = new Intl.NumberFormat(getLocale(language), {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    }).format(amount);
    return `$${formatted}`;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, formatNumber, formatCurrency }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
