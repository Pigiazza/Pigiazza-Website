'use client';

import { useId, useState } from 'react';
import { Plus } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import section from './Section.module.css';
import styles from './Faq.module.css';

export function Faq() {
  const { t } = useI18n();
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();

  return (
    <section id="faq" className={section.section}>
      <div className={`${section.inner} ${styles.faq}`}>
        <h2 className={section.heading} data-reveal>
          {t.faq.heading}
        </h2>
        <ul className={styles.list}>
          {t.faq.items.map((item, i) => {
            const isOpen = open === i;
            const panelId = `${base}-panel-${i}`;
            const buttonId = `${base}-button-${i}`;
            return (
              <li key={item.q} className={styles.item} data-open={isOpen} data-reveal>
                <h3 className={styles.q}>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    {item.q}
                    <span className={styles.icon}>
                      <Plus aria-hidden="true" />
                    </span>
                  </button>
                </h3>
                <div id={panelId} role="region" aria-labelledby={buttonId} className={styles.panel} inert={!isOpen}>
                  <div className={styles.panelInner}>
                    <p>{item.a}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
