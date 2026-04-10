/**
 * i18n Configuration
 * 
 * Client-side internationalization with hash-based routing.
 * Designed for static hosting (GitHub Pages) without server-side routing.
 * 
 * Language is stored in URL hash (#/en, #/es, etc.) and localStorage.
 * Falls back to browser language detection, then English.
 */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './translations/en.json';
import es from './translations/es.json';
import fr from './translations/fr.json';
import de from './translations/de.json';
import ja from './translations/ja.json';
import ko from './translations/ko.json';
import sw from './translations/sw.json';

export const supportedLanguages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'sw', name: 'Kiswahili', flag: '🇹🇿' }
];

const resources = {
  en: { translation: en },
  es: { translation: es },
  fr: { translation: fr },
  de: { translation: de },
  ja: { translation: ja },
  ko: { translation: ko },
  sw: { translation: sw }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

function detectLanguage() {
  const hash = window.location.hash;
  if (hash && hash.startsWith('#/')) {
    const lang = hash.slice(2);
    if (supportedLanguages.some(l => l.code === lang)) {
      return lang;
    }
  }
  
  const stored = localStorage.getItem('nothing-store-lang');
  if (stored && supportedLanguages.some(l => l.code === stored)) {
    return stored;
  }
  
  const browserLang = navigator.language?.split('-')[0];
  if (browserLang && supportedLanguages.some(l => l.code === browserLang)) {
    return browserLang;
  }
  
  return 'en';
}

export function syncLanguage() {
  const lang = detectLanguage();
  if (lang !== 'en') {
    i18n.changeLanguage(lang);
  }
}

export function changeLanguage(lang) {
  if (supportedLanguages.some(l => l.code === lang)) {
    i18n.changeLanguage(lang);
    localStorage.setItem('nothing-store-lang', lang);
    window.location.hash = `/${lang}`;
  }
}

export function getCurrentLanguage() {
  return supportedLanguages.find(l => l.code === i18n.language) || supportedLanguages[0];
}

export default i18n;
