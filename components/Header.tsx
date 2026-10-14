'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowUp, ArrowUpRight, Blocks, CircleHelp, FolderGit2, Hammer, Send, User } from 'lucide-react';
import { LangDropdown } from './LangDropdown';
import { useActiveSection, usePastElement } from './hooks';
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

const sectionIds = links.map((l) => l.href.slice(1));

export function Header() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);
  const wasOpen = useRef(false);
  const active = useActiveSection(sectionIds);
  const pastHero = usePastElement('top');
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
      <div className={styles.progress} aria-hidden="true" />
      {/* Same layout as the original site: hamburger left, wordmark centred,
          language on the right, all on a floating glass pill. With the menu open
          the whole bar sinks behind the dimmed backdrop like the rest of the page. */}
      <header className={styles.header} data-menu-open={open}>
        <div className={styles.bar} aria-hidden="true" />
        <span className={styles.toggleSlot} aria-hidden="true" />
        <a href="#top" className={styles.logo} aria-label="Pigiazza, home">
          <Image src="/pigiazza.png" alt="Pigiazza" width={242} height={52} priority />
        </a>
        <div className={styles.controls}>
          <LangDropdown />
        </div>
      </header>

      {/* Lives outside the header so it stays on top while the bar dims with the page. */}
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

      <div className={styles.backdrop} data-open={open} onClick={() => setOpen(false)} aria-hidden="true" />

      <nav id="site-menu" className={styles.menu} data-open={open} aria-label={t.nav.menuTitle} inert={!open}>
        <ul className={styles.links}>
          {links.map(({ key, href, Icon }, i) => (
            <li key={key} style={{ '--i': i } as React.CSSProperties}>
              <a
                href={href}
                ref={i === 0 ? firstLink : undefined}
                aria-current={active === href.slice(1) ? 'location' : undefined}
                onClick={() => setOpen(false)}
              >
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

      <a href="#top" className={styles.toTop} data-show={pastHero && !open} aria-label={t.footer.top} tabIndex={pastHero ? 0 : -1}>
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <circle cx="24" cy="24" r="22" pathLength={1} />
        </svg>
        <ArrowUp aria-hidden="true" />
      </a>
    </>
  );
}
