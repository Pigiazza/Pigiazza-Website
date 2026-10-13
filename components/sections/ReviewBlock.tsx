'use client';

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
      <p className={styles.stars} role="img" aria-label={t.portfolio.stars}>
        {'★'.repeat(stars)}
      </p>
      <blockquote className={styles.quote}>
        <p>“{quote}”</p>
      </blockquote>
      {t.portfolio.translatedNote && <figcaption className={styles.note}>{t.portfolio.translatedNote}</figcaption>}
      <dl className={styles.scores}>
        {rows.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>
              <span aria-hidden="true">★ </span>
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </figure>
  );
}
