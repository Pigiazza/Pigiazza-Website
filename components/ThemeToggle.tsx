'use client';

import { useTheme } from '@/lib/theme';
import { useI18n } from '@/lib/i18n';
import styles from './Toggles.module.css';

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const { t } = useI18n();
  return (
    <button type="button" className={styles.toggle} onClick={toggle} aria-label={t.toggles.theme}>
      <span aria-hidden="true">{theme === 'dark' ? '☀️' : '🌙'}</span>
    </button>
  );
}
