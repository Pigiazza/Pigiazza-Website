'use client';

import { Glass } from '../Glass';
import { useI18n } from '@/lib/i18n';
import section from './Section.module.css';
import styles from './Screens.module.css';

// PLACEHOLDER: replace with real screenshots (public/screens/*.png).
const COUNT = 6;

export function Screens() {
  const { t } = useI18n();
  return (
    <section id="screens" className={section.section}>
      <div className={section.inner}>
        <h2 className={section.heading}>{t.screens.heading}</h2>
        <p className={section.sub}>{t.screens.sub}</p>
        <div className={styles.grid}>
          {Array.from({ length: COUNT }, (_, i) => (
            <Glass key={i} radius="md" className={styles.card}>
              <div className={styles.shot} role="img" aria-label={`${t.screens.item} ${i + 1}`}>
                {t.screens.item} {i + 1}
              </div>
            </Glass>
          ))}
        </div>
      </div>
    </section>
  );
}
