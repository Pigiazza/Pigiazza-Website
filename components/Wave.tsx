import styles from './Wave.module.css';

// Orange swoosh from the Fiverr gig covers. Decorative only.
export function Wave({ position }: { position: 'top' | 'bottom' }) {
  const id = `wave-${position}`;
  if (position === 'top') {
    return (
      <svg className={`${styles.wave} ${styles.top}`} viewBox="0 0 600 400" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffb000" />
            <stop offset="1" stopColor="#ff6a00" />
          </linearGradient>
        </defs>
        <path d="M600 0H170C250 70 300 170 420 225C500 262 560 300 600 400Z" fill={`url(#${id})`} opacity="0.92" />
        <path d="M600 0H300C360 50 410 125 485 165C545 197 580 235 600 285Z" fill="#ffc94d" opacity="0.5" />
      </svg>
    );
  }
  return (
    <svg className={`${styles.wave} ${styles.bottom}`} viewBox="0 0 1200 240" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ff6a00" />
          <stop offset="1" stopColor="#ffb000" />
        </linearGradient>
      </defs>
      <path d="M0 240V120C200 40 420 200 640 140C860 80 1000 20 1200 60V240Z" fill={`url(#${id})`} />
      <path d="M0 240V170C240 110 460 230 700 190C920 150 1060 110 1200 130V240Z" fill="#ff6a00" opacity="0.7" />
    </svg>
  );
}
