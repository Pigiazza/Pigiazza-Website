'use client';

import { Glass } from '../Glass';
import { useI18n } from '@/lib/i18n';
import section from './Section.module.css';
import cards from './Cards.module.css';

export function Commissions() {
  const { t } = useI18n();
  return (
    <section id="commissions" className={section.section}>
      <div className={section.inner}>
        <Glass radius="lg" className={cards.card}>
          <h2 className={section.heading}>{t.commissions.heading}</h2>
          <p className={section.sub}>{t.commissions.body}</p>
          <ul className={cards.list}>
            {t.commissions.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className={cards.actions}>
            <a
              href="https://www.fiverr.com/sellers/pigiazza"
              className={`${section.btn} ${section.btnPrimary}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.commissions.fiverr}
            </a>
            <a
              href="https://modrinth.com/user/Pigiazza"
              className={`${section.btn} ${section.btnGhost}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.commissions.modrinth}
            </a>
          </div>
        </Glass>
      </div>
    </section>
  );
}
