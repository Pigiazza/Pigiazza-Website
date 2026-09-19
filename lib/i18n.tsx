'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import en from '@/messages/en';
import it from '@/messages/it';
import type { Messages } from '@/messages/types';

export type Lang = 'en' | 'it';
export const LANG_KEY = 'lang';

const dictionaries: Record<Lang, Messages> = { en, it };

export function resolveLang(stored: string | null, navigatorLang: string): Lang {
  if (stored === 'en' || stored === 'it') return stored;
  return navigatorLang.toLowerCase().startsWith('it') ? 'it' : 'en';
}

const I18nContext = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: Messages }>({
  lang: 'en',
  setLang: () => {},
  t: en,
});

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(LANG_KEY);
    } catch {}
    setLangState(resolveLang(stored, navigator.language));
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(LANG_KEY, next);
    } catch {}
  }, []);

  return <I18nContext.Provider value={{ lang, setLang, t: dictionaries[lang] }}>{children}</I18nContext.Provider>;
}

export const useI18n = () => useContext(I18nContext);
