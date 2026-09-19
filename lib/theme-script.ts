export type Theme = 'light' | 'dark';
export const THEME_KEY = 'theme';

export function resolveTheme(stored: string | null, prefersDark: boolean): Theme {
  if (stored === 'light' || stored === 'dark') return stored;
  return prefersDark ? 'dark' : 'light';
}

// Runs before first paint (inline in <head>) so there is no theme flash.
export const themeInitScript = `(function(){try{var s=localStorage.getItem('${THEME_KEY}');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.dataset.theme=(s==='light'||s==='dark')?s:(d?'dark':'light')}catch(e){}})();`;
