'use client';

import { Wave } from '../Wave';
import { useI18n } from '@/lib/i18n';
import { FIVERR_PROFILE } from '@/lib/services';
import section from './Section.module.css';
import styles from './Hero.module.css';

type CubeProps = { x: number; y: number; s: number; top: string; left: string; right: string };

// Isometric block, a nod to the command blocks on the gig covers.
function Cube({ x, y, s, top, left, right }: CubeProps) {
  const h = s / 2;
  return (
    <g>
      <polygon points={`${x},${y} ${x + s},${y + h} ${x},${y + s} ${x - s},${y + h}`} fill={top} />
      <polygon points={`${x - s},${y + h} ${x},${y + s} ${x},${y + 2 * s} ${x - s},${y + s + h}`} fill={left} />
      <polygon points={`${x},${y + s} ${x + s},${y + h} ${x + s},${y + s + h} ${x},${y + 2 * s}`} fill={right} />
    </g>
  );
}

export function Hero() {
  const { t } = useI18n();
  return (
    <section id="top" className={`${section.section} ${styles.hero}`}>
      <Wave position="top" />
      <div className={`${section.inner} ${styles.grid}`}>
        <div>
          <p className={styles.eyebrow}>{t.hero.eyebrow}</p>
          <h1 className={styles.title}>
            <span>{t.hero.titleTop}</span>
            <span className={styles.accent}>{t.hero.titleAccent}</span>
            <span>{t.hero.titleBottom}</span>
          </h1>
          <p className={styles.sub}>{t.hero.sub}</p>
          <div className={styles.actions}>
            <a
              href={FIVERR_PROFILE}
              className={`${section.btn} ${section.btnPrimary}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.hero.ctaPrimary}
            </a>
            <a href="#services" className={`${section.btn} ${section.btnGhost}`}>
              {t.hero.ctaSecondary}
            </a>
          </div>
          <p className={styles.signature}>{t.hero.signature}</p>
        </div>
        <svg className={styles.blocks} viewBox="0 0 320 300" aria-hidden="true" focusable="false">
          <Cube x={200} y={20} s={80} top="#9b7bff" left="#6f4fd8" right="#5236b0" />
          <Cube x={250} y={130} s={64} top="#a8e6c8" left="#6cc49c" right="#4a9f7a" />
          <Cube x={130} y={110} s={80} top="#ffb36b" left="#e8853a" right="#c2621f" />
        </svg>
      </div>
    </section>
  );
}
