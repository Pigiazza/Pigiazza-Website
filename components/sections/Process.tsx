'use client';

import { Hammer, MessageCircle, PackageCheck } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import section from './Section.module.css';
import styles from './Process.module.css';

const icons = [MessageCircle, Hammer, PackageCheck];

export function Process() {
  const { t } = useI18n();
  return (
    <section id="process" className={`${section.section} ${styles.process}`}>
      <div className={section.inner}>
        <h2 className={`${section.heading} ${styles.heading}`} data-reveal>
          {t.process.heading}
        </h2>
        <ol className={styles.steps}>
          {t.process.steps.map((step, i) => {
            const Icon = icons[i];
            return (
              <li key={step.title} className={styles.step} data-reveal>
                <span className={styles.icon}>
                  <Icon aria-hidden="true" />
                  <span className={styles.num} aria-hidden="true">
                    {i + 1}
                  </span>
                </span>
                <h3 className={styles.title}>{step.title}</h3>
                <p className={styles.body}>{step.body}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
