import styles from './Background.module.css';

// PLACEHOLDER: swap the blobs for Porch Pirates key art when it exists.
export function Background() {
  return (
    <div className={styles.bg} aria-hidden="true">
      <span className={`${styles.blob} ${styles.b1}`} />
      <span className={`${styles.blob} ${styles.b2}`} />
      <span className={`${styles.blob} ${styles.b3}`} />
    </div>
  );
}
