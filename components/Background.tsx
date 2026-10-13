import styles from './Background.module.css';

// Soft warm light behind the whole page, so the glass always has something to catch.
export function Background() {
  return (
    <div className={styles.bg} aria-hidden="true">
      <span className={`${styles.glow} ${styles.g1}`} />
      <span className={`${styles.glow} ${styles.g2}`} />
      <span className={`${styles.glow} ${styles.g3}`} />
    </div>
  );
}
