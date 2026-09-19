'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Glass } from './Glass';
import { ThemeToggle } from './ThemeToggle';
import { LangToggle } from './LangToggle';
import { useI18n } from '@/lib/i18n';
import styles from './Nav.module.css';

const links = [
  ['game', '#game'],
  ['screens', '#screens'],
  ['team', '#team'],
  ['about', '#about'],
  ['commissions', '#commissions'],
] as const;

export function Nav() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.wrap}>
      <Glass as="nav" radius="pill" className={styles.bar} aria-label="Main">
        <a href="#game" className={styles.logo} aria-label="Pigiazza">
          <Image src="/pigiazza.png" alt="Pigiazza" width={96} height={28} />
        </a>
        <ul className={styles.links}>
          {links.map(([key, href]) => (
            <li key={key}>
              <a href={href}>{t.nav[key]}</a>
            </li>
          ))}
        </ul>
        <div className={styles.controls}>
          <LangToggle />
          <ThemeToggle />
          <button
            type="button"
            className={styles.burger}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={t.toggles.menu}
            onClick={() => setOpen((v) => !v)}
          >
            <span aria-hidden="true">☰</span>
          </button>
        </div>
      </Glass>
      {open && (
        <Glass id="mobile-menu" radius="lg" className={styles.mobile}>
          <ul>
            {links.map(([key, href]) => (
              <li key={key}>
                <a href={href} onClick={() => setOpen(false)}>
                  {t.nav[key]}
                </a>
              </li>
            ))}
          </ul>
        </Glass>
      )}
    </header>
  );
}
