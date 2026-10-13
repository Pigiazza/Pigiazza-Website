'use client';

import { Quote, Star } from 'lucide-react';
import type { Scores } from '@/lib/projects';
import { useI18n } from '@/lib/i18n';
import styles from './Portfolio.module.css';

type Props = { stars: number; scores: Scores; quote: string };

export function ReviewBlock({ stars, scores, quote }: Props) {
  const { t } = useI18n();
  const rows = [
    [t.portfolio.scores.communication, scores.communication],
    [t.portfolio.scores.quality, scores.quality],
    [t.portfolio.scores.value, scores.value],
  ] as const;

  return (
    <figure className={styles.review}>
      <Quote aria-hidden="true" className={styles.quoteMark} />
      <p className={styles.stars} role="img" aria-label={t.portfolio.stars}>
        {Array.from({ length: stars }, (_, i) => (
          <Star key={i} aria-hidden="true" style={{ '--i': i } as React.CSSProperties} />
        ))}
      </p>
      <blockquote className={styles.quote}>
        <p>{quote}</p>
      </blockquote>
      <dl className={styles.scores}>
        {rows.map(([label, value]) => (
          <div key={label} className={styles.score}>
            <dt>{label}</dt>
            <dd>
              <span className={styles.bar} aria-hidden="true">
                <span style={{ '--v': value / 5 } as React.CSSProperties} />
              </span>
              <span>
                {value}
                <span className="sr-only"> {t.portfolio.outOf}</span>
              </span>
            </dd>
          </div>
        ))}
      </dl>
      {t.portfolio.translatedNote && <figcaption className={styles.note}>{t.portfolio.translatedNote}</figcaption>}
    </figure>
  );
}
