'use client';

import Image from 'next/image';
import { Glass } from '../Glass';
import { useI18n } from '@/lib/i18n';
import styles from './Footer.module.css';

const socials = [
  ['GitHub', 'https://github.com/Pigiazza', '/github.png'],
  ['Modrinth', 'https://modrinth.com/user/Pigiazza', '/modrinth.png'],
  ['Fiverr', 'https://www.fiverr.com/sellers/pigiazza', '/fiverr.jpg'],
  ['Ko-fi', 'https://ko-fi.com/pigiazza', '/kofi.png'],
] as const;

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className={styles.footer}>
      <Glass radius="pill" className={styles.bar}>
        <ul className={styles.socials}>
          {socials.map(([name, href, icon]) => (
            <li key={name}>
              <a href={href} target="_blank" rel="noopener noreferrer" aria-label={name} className={styles.social}>
                <Image src={icon} alt="" width={24} height={24} />
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
