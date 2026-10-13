'use client';

import Image from 'next/image';
import { ArrowUp } from 'lucide-react';
import { Wave } from '../Wave';
import { useI18n } from '@/lib/i18n';
import { socials } from '@/lib/socials';
import styles from './Footer.module.css';

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className={styles.footer}>
      <Wave position="bottom" />
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Image src="/pigiazza.png" alt="Pigiazza" width={140} height={30} className={styles.logo} />
          <p className={styles.tagline}>{t.footer.tagline}</p>
        </div>
        <ul className={styles.socials}>
          {socials.map((s) => (
            <li key={s.name}>
              <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.name} className={styles.social}>
                <Image src={s.icon} alt="" width={28} height={28} />
              </a>
            </li>
          ))}
        </ul>
        <a href="#top" className={styles.top}>
          <ArrowUp aria-hidden="true" />
          {t.footer.top}
        </a>
      </div>
      <p className={styles.copy} suppressHydrationWarning>
        © {new Date().getFullYear()} Pigiazza. {t.footer.rights}
      </p>
    </footer>
  );
}
