/**
 * LanguageSelector - Dropdown for switching between supported languages
 * 
 * Uses hash-based routing (#/en, #/es, etc.) for GitHub Pages compatibility.
 * Persists selection to localStorage.
 */

'use client';

import { useState, useEffect, useRef } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { supportedLanguages, changeLanguage, getCurrentLanguage } from '../lib/i18n';

export default function LanguageSelector() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(null);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('nothing-store-lang');
    const hash = window.location.hash;
    let langCode = stored || 'en';
    if (hash && hash.startsWith('#/')) {
      const hashLang = hash.slice(2);
      if (supportedLanguages.some(l => l.code === hashLang)) {
        langCode = hashLang;
      }
    }
    setCurrentLang(supportedLanguages.find(l => l.code === langCode) || supportedLanguages[0]);
    
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash && hash.startsWith('#/')) {
        const lang = hash.slice(2);
        const found = supportedLanguages.find(l => l.code === lang);
        if (found) setCurrentLang(found);
      }
    };
    
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (lang) => {
    changeLanguage(lang.code);
    setCurrentLang(lang);
    setIsOpen(false);
  };

  const activeLang = mounted && currentLang ? currentLang : supportedLanguages[0];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-2 py-1.5 md:py-3 md:px-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-lg border border-white/20 transition-all duration-200 text-sm md:text-base font-medium"
      >
        <Globe size={14} className="text-purple-300" />
        <span>{activeLang.code.toUpperCase()}</span>
        <ChevronDown 
          size={12} 
          className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="fixed top-auto left-0 mt-2 w-32 bg-slate-900/95 backdrop-blur-lg rounded-lg border border-white/20 shadow-xl overflow-hidden z-[100] animate-fade-in">
          {supportedLanguages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleSelect(lang)}
              className={`w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-white/10 transition-colors ${
                activeLang.code === lang.code ? 'bg-purple-500/20' : ''
              }`}
            >
              <span className="text-lg">{lang.flag}</span>
              <span className={activeLang.code === lang.code ? 'text-purple-300 font-semibold' : 'text-white'}>
                {lang.code.toUpperCase()}
              </span>
              {activeLang.code === lang.code && (
                <span className="ml-auto text-purple-400">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

LanguageSelector.displayName = 'LanguageSelector';
