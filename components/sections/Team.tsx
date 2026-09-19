'use client';

import { Glass } from '../Glass';
import { useI18n } from '@/lib/i18n';
import section from './Section.module.css';
import cards from './Cards.module.css';

export function Team() {
  const { t } = useI18n();
  return (
    <section id="team" className={section.section}>
      <div className={section.inner}>
        <Glass radius="lg" className={cards.card}>
          <h2 className={section.heading}>{t.team.heading}</h2>
          <p className={section.sub}>{t.team.body}</p>
          <a
            href="https://www.bramble-games.com"
            className={`${section.btn} ${section.btnPrimary}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.team.cta}
          </a>
        </Glass>
      </div>
    </section>
  );
}
