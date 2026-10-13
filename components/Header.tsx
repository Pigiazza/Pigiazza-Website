'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, Blocks, CircleHelp, FolderGit2, Hammer, Send, User } from 'lucide-react';
import { LangDropdown } from './LangDropdown';
import { useI18n } from '@/lib/i18n';
import { FIVERR_PROFILE } from '@/lib/services';
import { socials } from '@/lib/socials';
import styles from './Header.module.css';

const links = [
  { key: 'services', href: '#services', Icon: Blocks },
  { key: 'process', href: '#process', Icon: Hammer },
  { key: 'portfolio', href: '#portfolio', Icon: FolderGit2 },
  { key: 'about', href: '#about', Icon: User },
  { key: 'faq', href: '#faq', Icon: CircleHelp },
  { key: 'contact', href: '#contact', Icon: Send },
] as const;

export function Header() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    if (open) {
      wasOpen.current = true;
      document.body.style.overflow = 'hidden';
      firstLink.current?.focus({ preventScroll: true });
      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setOpen(false);
      };
      document.addEventListener('keydown', onKey);
      return () => document.removeEventListener('keydown', onKey);
    }
    document.body.style.overflow = '';
    if (wasOpen.current) toggle.current?.focus({ preventScroll: true });
  }, [open]);

  return (
    <>
      <header className={styles.header} data-menu-open={open}>
        <div className={styles.bar}>
          <a href="#top" className={styles.logo} aria-label="Pigiazza, home">
            <Image src="/pigiazza.png" alt="Pigiazza" width={160} height={46} priority />
          </a>
          <div className={styles.controls}>
            <LangDropdown />
            <button
              ref={toggle}
              type="button"
              className={styles.burger}
              data-open={open}
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label={open ? t.toggles.menuClose : t.toggles.menuOpen}
              onClick={() => setOpen((v) => !v)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div className={styles.backdrop} data-open={open} onClick={() => setOpen(false)} aria-hidden="true" />

      <nav id="site-menu" className={styles.menu} data-open={open} aria-label={t.nav.menuTitle} inert={!open}>
        <ul className={styles.links}>
          {links.map(({ key, href, Icon }, i) => (
            <li key={key} style={{ '--i': i } as React.CSSProperties}>
              <a href={href} ref={i === 0 ? firstLink : undefined} onClick={() => setOpen(false)}>
                <span className={styles.linkIcon}>
                  <Icon aria-hidden="true" />
                </span>
                {t.nav[key]}
              </a>
            </li>
          ))}
        </ul>

        <div className={styles.menuFoot} style={{ '--i': links.length } as React.CSSProperties}>
          <p className={styles.follow}>{t.nav.follow}</p>
          <ul className={styles.socials}>
            {socials.map((s) => (
              <li key={s.name}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.name}>
                  <Image src={s.icon} alt="" width={28} height={28} />
                </a>
              </li>
            ))}
          </ul>
          <a href={FIVERR_PROFILE} target="_blank" rel="noopener noreferrer" className={styles.menuCta}>
            {t.hero.ctaPrimary}
            <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </nav>
    </>
  );
}
