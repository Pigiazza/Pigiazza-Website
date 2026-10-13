'use client';

import Image from 'next/image';
import { useI18n } from '@/lib/i18n';
import styles from './TechStrip.module.css';

const tech = [
  { name: 'Fabric', src: '/tech/fabric.webp' },
  { name: 'NeoForge', src: '/tech/neoforge.webp' },
  { name: 'Quilt', src: '/tech/quilt.webp' },
  { name: 'Java', src: '/tech/java.webp' },
  { name: 'Kotlin', src: '/tech/kotlin.webp' },
  { name: 'Gradle', src: '/tech/gradle.webp' },
  { name: 'Git', src: '/tech/git.webp' },
];

// Endless marquee: the list is rendered twice and slid by exactly one copy's width.
export function TechStrip() {
  const { t } = useI18n();
  return (
    <section className={styles.strip} aria-label={t.tech.label}>
      <p className={styles.label}>{t.tech.label}</p>
      <div className={styles.viewport}>
        <div className={styles.track}>
          {[0, 1].map((copy) => (
            <ul key={copy} className={styles.list} aria-hidden={copy === 1}>
              {tech.map((item) => (
                <li key={item.name}>
                  <Image src={item.src} alt="" width={40} height={40} />
                  <span>{item.name}</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
