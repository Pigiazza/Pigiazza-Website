'use client';

import { useI18n } from '@/lib/i18n';
import styles from './Toggles.module.css';

export function LangToggle() {
  const { lang, setLang, t } = useI18n();
  const next = lang === 'en' ? 'it' : 'en';
  return (
    <button type="button" className={styles.toggle} onClick={() => setLang(next)} aria-label={t.toggles.lang}>
      {next.toUpperCase()}
    </button>
  );
}
