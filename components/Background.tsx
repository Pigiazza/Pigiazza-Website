import styles from './Background.module.css';

const squares = [
  { top: '14%', left: '6%', size: 28, delay: '0s' },
  { top: '24%', left: '44%', size: 14, delay: '-4s' },
  { top: '64%', left: '3%', size: 40, delay: '-8s' },
  { top: '72%', left: '56%', size: 18, delay: '-2s' },
  { top: '40%', left: '90%', size: 22, delay: '-6s' },
];

// Autumn Minecraft biome from the Fiverr gig covers, blurred, plus floating orange squares.
export function Background() {
  return (
    <div className={styles.bg} aria-hidden="true">
      <div className={styles.photo} />
      <div className={styles.shade} />
      {squares.map((s) => (
        <span
          key={`${s.top}-${s.left}`}
          className={styles.square}
          style={{ top: s.top, left: s.left, width: s.size, height: s.size, animationDelay: s.delay }}
        />
      ))}
    </div>
  );
}
