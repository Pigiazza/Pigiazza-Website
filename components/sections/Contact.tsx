'use client';

import { ArrowUpRight, MessagesSquare } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { MagneticLink } from '../MagneticLink';
import { FIVERR_PROFILE } from '@/lib/services';
import section from './Section.module.css';
import styles from './Contact.module.css';

export function Contact() {
  const { t } = useI18n();
  return (
    <section id="contact" className={section.section}>
      <div className={`${section.inner} ${styles.band}`} data-reveal="scale">
        <span className={styles.icon}>
          <MessagesSquare aria-hidden="true" />
        </span>
        <h2 className={styles.heading}>{t.contact.heading}</h2>
        <p className={styles.sub}>{t.contact.sub}</p>
        <MagneticLink
          href={FIVERR_PROFILE}
          target="_blank"
          rel="noopener noreferrer"
          className={`${section.btn} ${section.btnPrimary}`}
        >
          {t.contact.cta}
          <ArrowUpRight aria-hidden="true" />
        </MagneticLink>
      </div>
    </section>
  );
}
