'use client';

import Image from 'next/image';
import { Glass } from '../Glass';
import { useI18n } from '@/lib/i18n';
import section from './Section.module.css';
import cards from './Cards.module.css';

export function About() {
  const { t } = useI18n();
  return (
    <section id="about" className={section.section}>
      <div className={section.inner}>
        <Glass radius="lg" className={cards.card}>
          <div className={cards.row}>
            <Image
              src="/profile-icon.png"
              alt="Pigiazza's dog, the closest thing this site has to a team photo"
              width={200}
              height={200}
              className={cards.portrait}
            />
            <div>
              <h2 className={section.heading}>
                {t.about.name} <span className={cards.alias}>{t.about.alias}</span>
              </h2>
              <p className={section.sub}>{t.about.body}</p>
            </div>
          </div>
        </Glass>
      </div>
    </section>
  );
}
