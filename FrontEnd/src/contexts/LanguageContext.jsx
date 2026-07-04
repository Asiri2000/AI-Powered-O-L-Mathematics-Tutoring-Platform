import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const STORAGE_KEY = 'appLanguage';

/**
 * Supported languages across the platform.
 *   en = English
 *   si = සිංහල (Sinhala)
 *   ta = தமிழ் (Tamil)
 */
export const LANGUAGES = [
  { code: 'en', label: 'EN',    native: 'English' },
  { code: 'si', label: 'සිං',   native: 'සිංහල' },
  { code: 'ta', label: 'தமிழ்', native: 'தமிழ்' },
];

const LanguageContext = createContext({
  language: 'en',
  setLanguage: () => {},
  languageInfo: LANGUAGES[0],
});

function readPersisted() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && LANGUAGES.some((l) => l.code === stored)) return stored;
  } catch (_) { /* localStorage unavailable */ }
  return 'en';
}

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(readPersisted);

  const setLanguage = useCallback((code) => {
    if (!LANGUAGES.some((l) => l.code === code)) return;
    setLanguageState(code);
    try { localStorage.setItem(STORAGE_KEY, code); } catch (_) {}
  }, []);

  // Sync across tabs
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === STORAGE_KEY && e.newValue) setLanguageState(e.newValue);
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const languageInfo = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, languageInfo }}>
      {children}
    </LanguageContext.Provider>
  );
}

/** Access language state from any component. */
export function useLanguage() {
  return useContext(LanguageContext);
}
