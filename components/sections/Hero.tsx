'use client';

import { ArrowDown, ArrowUpRight, Clock, RotateCcw, Star } from 'lucide-react';
import { Wave } from '../Wave';
import { RotatingWord } from '../RotatingWord';
import { SocialCarousel } from '../SocialCarousel';
import { MagneticLink } from '../MagneticLink';
import { useI18n } from '@/lib/i18n';
import { FIVERR_PROFILE } from '@/lib/services';
import section from './Section.module.css';
import styles from './Hero.module.css';

const trustIcons = [Star, Clock, RotateCcw];

export function Hero() {
  const { t } = useI18n();
  const { pre, words, post } = t.hero;

  return (
    <section id="top" className={styles.hero}>
      <div className={styles.scene} aria-hidden="true">
        <picture>
          <source srcSet="/bg/autumn-blur.webp" type="image/webp" />
          <img className={styles.photo} src="/bg/autumn-blur.jpg" alt="" fetchPriority="high" />
        </picture>
        <div className={styles.veil} />
      </div>
      <Wave position="top" />

      <div className={styles.grid}>
        <div className={styles.copy}>
          <h1 className={styles.title}>
            <span className="sr-only">{[pre, words.join(', '), post].filter(Boolean).join(' ')}</span>
            <span aria-hidden="true" className={styles.line} style={{ '--d': '0.15s' } as React.CSSProperties}>
              {pre && <>{pre} </>}
              <RotatingWord words={words} />
            </span>
            <span aria-hidden="true" className={styles.line} style={{ '--d': '0.28s' } as React.CSSProperties}>
              {post}
            </span>
          </h1>
          <p className={styles.sub}>{t.hero.sub}</p>
          <div className={styles.actions}>
            <MagneticLink
              href={FIVERR_PROFILE}
              className={`${section.btn} ${section.btnPrimary}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.hero.ctaPrimary}
              <ArrowUpRight aria-hidden="true" />
            </MagneticLink>
            <MagneticLink href="#services" className={`${section.btn} ${section.btnGhost}`}>
              {t.hero.ctaSecondary}
              <ArrowDown aria-hidden="true" />
            </MagneticLink>
          </div>
          <ul className={styles.trust}>
            {t.hero.trust.map((item, i) => {
              const Icon = trustIcons[i];
              return (
                <li key={item} style={{ '--i': i } as React.CSSProperties}>
                  <Icon aria-hidden="true" />
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
        <div className={styles.visual}>
          <SocialCarousel />
        </div>
      </div>
    </section>
  );
}
