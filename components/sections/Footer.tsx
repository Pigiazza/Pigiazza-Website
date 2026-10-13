'use client';

import Image from 'next/image';
import { Glass } from '../Glass';
import { Wave } from '../Wave';
import { useI18n } from '@/lib/i18n';
import { socials } from '@/lib/socials';
import styles from './Footer.module.css';

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className={styles.footer}>
      <Wave position="bottom" />
      <Glass radius="pill" className={styles.bar}>
        <ul className={styles.socials}>
          {socials.map((s) => (
            <li key={s.name}>
              <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.name} className={styles.social}>
                <Image src={s.icon} alt="" width={24} height={24} />
              </a>
            </li>
          ))}
        </ul>
        <p className={styles.copy} suppressHydrationWarning>
          © {new Date().getFullYear()} Pigiazza. {t.footer.rights}
        </p>
      </Glass>
    </footer>
  );
}
