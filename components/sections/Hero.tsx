'use client';

import { Glass } from '../Glass';
import { useI18n } from '@/lib/i18n';
import section from './Section.module.css';
import styles from './Hero.module.css';

// PLACEHOLDER: wishlist and discord URLs, trailer/key art.
const WISHLIST_URL = '#';
const DISCORD_URL = '#';

export function Hero() {
  const { t } = useI18n();
  return (
    <section id="game" className={`${section.section} ${styles.hero}`}>
      <div className={section.inner}>
        <Glass radius="pill" className={styles.badge}>
          {t.hero.badge}
        </Glass>
        <h1 className={styles.title}>{t.hero.title}</h1>
        <p className={styles.pitch}>{t.hero.pitch}</p>
        <div className={styles.actions}>
          <a href={WISHLIST_URL} className={`${section.btn} ${section.btnPrimary}`}>
            {t.hero.wishlist}
          </a>
          <a href={DISCORD_URL} className={`${section.btn} ${section.btnGhost}`}>
            {t.hero.discord}
          </a>
        </div>
        <Glass radius="lg" className={styles.trailer}>
          <div className={styles.trailerInner} role="img" aria-label={t.hero.trailer}>
            <span className={styles.play} aria-hidden="true">
              ▶
            </span>
            <span>{t.hero.trailer}</span>
          </div>
        </Glass>
      </div>
    </section>
  );
}
