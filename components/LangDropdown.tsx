'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown, Languages } from 'lucide-react';
import { useI18n, type Lang } from '@/lib/i18n';
import styles from './LangDropdown.module.css';

const LANGS: Lang[] = ['en', 'it'];

export function LangDropdown() {
  const { lang, setLang, t } = useI18n();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const options = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    options.current[LANGS.indexOf(lang)]?.focus();
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open, lang]);

  function onListKey(e: React.KeyboardEvent) {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    e.preventDefault();
    const i = options.current.findIndex((el) => el === document.activeElement);
    const next = (i + (e.key === 'ArrowDown' ? 1 : -1) + LANGS.length) % LANGS.length;
    options.current[next]?.focus();
  }

  return (
    <div className={styles.root} ref={root}>
      <button
        type="button"
        className={styles.trigger}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${t.toggles.lang}: ${t.langs[lang]}`}
        onClick={() => setOpen((v) => !v)}
      >
        <Languages aria-hidden="true" className={styles.icon} />
        <span>{lang.toUpperCase()}</span>
        <ChevronDown aria-hidden="true" className={styles.chevron} />
      </button>
      <div className={styles.menu} data-open={open} role="listbox" aria-label={t.toggles.lang} onKeyDown={onListKey}>
        {LANGS.map((code, i) => (
          <button
            key={code}
            ref={(el) => {
              options.current[i] = el;
            }}
            type="button"
            role="option"
            aria-selected={code === lang}
            tabIndex={open ? 0 : -1}
            className={styles.option}
            style={{ '--i': i } as React.CSSProperties}
            onClick={() => {
              setLang(code);
              setOpen(false);
            }}
          >
            <span className={styles.code}>{code.toUpperCase()}</span>
            <span className={styles.name}>{t.langs[code]}</span>
            <Check aria-hidden="true" className={styles.check} />
          </button>
        ))}
      </div>
    </div>
  );
}
