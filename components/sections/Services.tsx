'use client';

import { useRef, useState, type KeyboardEvent } from 'react';
import { Glass } from '../Glass';
import { PackageCard } from './PackageCard';
import { useI18n } from '@/lib/i18n';
import { services, type Tier } from '@/lib/services';
import { nextTabIndex } from '@/lib/tabs';
import section from './Section.module.css';
import styles from './Services.module.css';

const TIER_LABEL: Record<Tier, string> = { basic: 'Basic', standard: 'Standard', premium: 'Premium' };

export function Services() {
  const { t } = useI18n();
  const [index, setIndex] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const service = services[index];
  const copy = t.services.items[service.id];

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const next = nextTabIndex(index, e.key, services.length);
    if (next === null) return;
    e.preventDefault();
    setIndex(next);
    tabs.current[next]?.focus();
  }

  return (
    <section id="services" className={section.section}>
      <div className={section.inner}>
        <h2 className={section.heading}>{t.services.heading}</h2>
        <p className={section.sub}>{t.services.sub}</p>

        <Glass radius="pill" className={styles.tabs}>
          <div role="tablist" aria-label={t.services.tablist} onKeyDown={onKeyDown} className={styles.tablist}>
            {services.map((s, i) => (
              <button
                key={s.id}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`tab-${s.id}`}
                aria-selected={i === index}
                aria-controls={`panel-${s.id}`}
                tabIndex={i === index ? 0 : -1}
                className={styles.tab}
                onClick={() => setIndex(i)}
              >
                {t.services.items[s.id].tab}
              </button>
            ))}
          </div>
        </Glass>

        <div role="tabpanel" id={`panel-${service.id}`} aria-labelledby={`tab-${service.id}`} className={styles.grid}>
          {service.packages.map((pkg) => (
            <PackageCard
              key={`${service.id}-${pkg.tier}`}
              pkg={pkg}
              tierLabel={TIER_LABEL[pkg.tier]}
              name={copy.packages[pkg.tier].name}
              desc={copy.packages[pkg.tier].desc}
              gigUrl={service.gigUrl}
              featured={pkg.tier === 'standard'}
              labels={t.services}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
