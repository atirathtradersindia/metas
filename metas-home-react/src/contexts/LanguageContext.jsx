import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../data/translations';


const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [currentLang, setCurrentLang] = useState('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('preferredLang') || 'en';
    setCurrentLang(savedLang);
  }, []);

  useEffect(() => {
    // Set document direction for RTL languages
    const dir = ['ur', 'ar'].includes(currentLang) ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = currentLang;
  }, [currentLang]);

  const setLanguage = (lang) => {
    if (!translations[lang]) {
      console.warn(`Language ${lang} not supported`);
      return;
    }
    setCurrentLang(lang);
    localStorage.setItem('preferredLang', lang);
  };

  const t = (key, params = {}) => {
    let text = translations[currentLang][key] || key;
    // Replace placeholders like {year}
    Object.keys(params).forEach((param) => {
      text = text.replace(`{${param}}`, params[param]);
    });
    return text;
  };

  const value = {
    currentLang,
    setLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};