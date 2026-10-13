'use client';

import { useEffect, useState } from 'react';
import styles from './RotatingWord.module.css';

const INTERVAL_MS = 2200;

// Cycles through words letter by letter. Every word sits in the same grid cell
// (invisible) so the slot is as wide as the longest one and the heading never reflows.
export function RotatingWord({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % words.length), INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [words]);

  const word = words[index] ?? words[0];

  return (
    <span className={styles.slot} aria-hidden="true">
      {words.map((w) => (
        <span key={w} className={styles.sizer}>
          {w}
        </span>
      ))}
      <span key={word} className={styles.word}>
        {[...word].map((ch, i) => (
          <span key={i} className={styles.char} style={{ '--i': i } as React.CSSProperties}>
            {ch === ' ' ? ' ' : ch}
          </span>
        ))}
      </span>
    </span>
  );
}
