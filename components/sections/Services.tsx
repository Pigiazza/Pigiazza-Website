'use client';

import { useRef, useState, type KeyboardEvent } from 'react';
import { PackageCard } from './PackageCard';
import { useI18n } from '@/lib/i18n';
import { services } from '@/lib/services';
import { SERVICE_ICONS } from '../serviceIcons';
import { nextTabIndex } from '@/lib/tabs';
import section from './Section.module.css';
import styles from './Services.module.css';

export function Services() {
  const { t } = useI18n();
  const [index, setIndex] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const service = services[index];
  const copy = t.services.items[service.id];
  const ActiveIcon = SERVICE_ICONS[service.id];

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    const next = nextTabIndex(index, e.key, services.length);
    if (next === null) return;
    e.preventDefault();
    setIndex(next);
    tabs.current[next]?.focus();
  }

  return (
    <section id="services" className={section.section}>
      <div className={section.inner}>
        <div className={section.head} data-reveal>
          <h2 className={section.heading}>{t.services.heading}</h2>
          <p className={section.sub}>{t.services.sub}</p>
        </div>

        <div
          role="tablist"
          aria-label={t.services.tablist}
          onKeyDown={onKeyDown}
          className={styles.tablist}
          style={{ '--active': index, '--count': services.length } as React.CSSProperties}
          data-reveal
        >
          <span className={styles.indicator} aria-hidden="true" />
          {services.map((s, i) => {
            const Icon = SERVICE_ICONS[s.id];
            return (
              <button
                key={s.id}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`tab-${s.id}`}
                aria-selected={i === index}
                aria-controls="services-panel"
                tabIndex={i === index ? 0 : -1}
                className={styles.tab}
                onClick={() => setIndex(i)}
              >
                <Icon aria-hidden="true" />
                <span className={styles.tabText}>
                  <span>{t.services.items[s.id].tab}</span>
                  <span className={styles.tabFrom}>{t.services.from.replace('{n}', String(s.packages[0].priceUsd))}</span>
                </span>
              </button>
            );
          })}
        </div>

        <div role="tabpanel" id="services-panel" aria-labelledby={`tab-${service.id}`} className={styles.panel}>
          <p key={`lead-${service.id}`} className={styles.lead}>
            <span className={styles.leadIcon}>
              <ActiveIcon aria-hidden="true" />
            </span>
            {copy.lead}
          </p>
          <div className={styles.grid}>
            {service.packages.map((pkg, i) => (
              <PackageCard
                key={pkg.tier}
                swapKey={service.id}
                pkg={pkg}
                order={i}
                name={copy.packages[pkg.tier].name}
                desc={copy.packages[pkg.tier].desc}
                gigUrl={service.gigUrl}
                featured={pkg.tier === 'standard'}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
