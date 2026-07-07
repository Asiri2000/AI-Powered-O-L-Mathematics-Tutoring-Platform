import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const STORAGE_KEY = 'appLanguage';
const COOKIE_KEY = 'googtrans';

/** Supported languages */
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

/**
 * Set the googtrans cookie that Google Translate reads on init.
 * Format: /en/si  (from English to Sinhala), /en/en (English)
 */
function setGoogleTranslateCookie(targetLang) {
  // Clear any stale cookie first
  document.cookie = `${COOKIE_KEY}=;path=/;max-age=0`;
  document.cookie = `${COOKIE_KEY}=;path=/;domain=${window.location.hostname};max-age=0`;

  const value = targetLang === 'en' ? '/en/en' : `/en/${targetLang}`;
  document.cookie = `${COOKIE_KEY}=${value};path=/`;
  document.cookie = `${COOKIE_KEY}=${value};path=/;domain=${window.location.hostname}`;
}

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(readPersisted);

  /**
   * On language change:
   * 1. Update React state for immediate UI feedback (pill highlight)
   * 2. Persist to localStorage
   * 3. Set the googtrans cookie (GT reads it on the next page load)
   * 4. Reload the page — GT auto-inits with the cookie and translates
   */
  const setLanguage = useCallback((code) => {
    if (!LANGUAGES.some((l) => l.code === code)) return;
    if (code === language) return;

    setLanguageState(code);
    try { localStorage.setItem(STORAGE_KEY, code); } catch (_) {}

    setGoogleTranslateCookie(code);

    // Small delay so the user sees the pill highlight before reload
    setTimeout(() => {
      window.location.reload();
    }, 80);
  }, [language]);

  /* Sync across browser tabs — other tabs reload when language changes */
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === STORAGE_KEY && e.newValue && e.newValue !== language) {
        setLanguageState(e.newValue);
        setGoogleTranslateCookie(e.newValue);
        window.location.reload();
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [language]);

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
