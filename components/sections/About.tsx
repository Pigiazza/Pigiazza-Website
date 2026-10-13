'use client';

import Image from 'next/image';
import { Code, Layers, MapPin, Zap } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import section from './Section.module.css';
import styles from './About.module.css';

const factIcons = [MapPin, Code, Layers, Zap];

export function About() {
  const { t } = useI18n();
  return (
    <section id="about" className={section.section}>
      <div className={`${section.inner} ${styles.about}`}>
        <div className={styles.portrait} data-reveal="scale">
          <Image src="/profile-icon.png" alt={t.about.avatarAlt} width={420} height={420} className={styles.photo} />
        </div>
        <div className={styles.copy} data-reveal>
          <h2 className={section.heading}>
            {t.about.heading} <span className={styles.alias}>{t.about.alias}</span>
          </h2>
          <p className={styles.body}>{t.about.body}</p>
          <ul className={styles.facts}>
            {t.about.facts.map((fact, i) => {
              const Icon = factIcons[i];
              return (
                <li key={fact}>
                  <span className={styles.factIcon}>
                    <Icon aria-hidden="true" />
                  </span>
                  {fact}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
