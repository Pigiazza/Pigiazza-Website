'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { socials } from '@/lib/socials';
import styles from './SocialCarousel.module.css';

const SLIDE_MS = 2800;

// One profile at a time inside a glass ring. The ring's progress stroke is the
// timer: when its animation ends the next logo slides in, so pausing the ring
// (hover, focus) pauses the carousel too.
export function SocialCarousel() {
  const { t } = useI18n();
  const [index, setIndex] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [autoplay, setAutoplay] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setAutoplay(!mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  function go(next: number) {
    if (next === index) return;
    setPrev(index);
    setIndex(next);
  }

  const current = socials[index];

  return (
    <div
      className={styles.wrap}
      data-paused={paused}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className={styles.orbit}>
        <svg className={styles.ring} viewBox="0 0 100 100" aria-hidden="true">
          <circle className={styles.track} cx="50" cy="50" r="48" />
          {autoplay && (
            <circle
              key={index}
              className={styles.progress}
              cx="50"
              cy="50"
              r="48"
              pathLength={1}
              style={{ animationDuration: `${SLIDE_MS}ms` }}
              onAnimationEnd={() => go((index + 1) % socials.length)}
            />
          )}
        </svg>
        <div className={styles.window}>
          {socials.map((s, i) => {
            const state = i === index ? 'current' : i === prev ? 'leaving' : 'waiting';
            return (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.slide}
                data-state={state}
                aria-label={s.name}
                aria-hidden={state !== 'current'}
                tabIndex={state === 'current' ? 0 : -1}
              >
                <Image src={s.icon} alt="" width={320} height={320} />
              </a>
            );
          })}
        </div>
      </div>

      <a href={current.href} target="_blank" rel="noopener noreferrer" className={styles.label} tabIndex={-1} aria-hidden="true">
        <span key={current.name} className={styles.labelText}>
          {current.name}
        </span>
        <ArrowUpRight />
      </a>

      <div className={styles.dots} role="group" aria-label={t.hero.carousel}>
        {socials.map((s, i) => (
          <button
            key={s.name}
            type="button"
            className={styles.dot}
            aria-label={`${t.hero.carouselGo} ${s.name}`}
            aria-current={i === index}
            onClick={() => go(i)}
          />
        ))}
      </div>
    </div>
  );
}
