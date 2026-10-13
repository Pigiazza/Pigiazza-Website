'use client';

import { ArrowUpRight, Clock, Gem, RotateCcw, Rocket, Sparkles } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import type { Package, Tier } from '@/lib/services';
import styles from './Services.module.css';

const TIER_LABEL: Record<Tier, string> = { basic: 'Basic', standard: 'Standard', premium: 'Premium' };
const TIER_ICON = { basic: Sparkles, standard: Rocket, premium: Gem };

type Props = { pkg: Package; order: number; name: string; desc: string; gigUrl: string; featured: boolean };

export function PackageCard({ pkg, order, name, desc, gigUrl, featured }: Props) {
  const { t } = useI18n();
  const Icon = TIER_ICON[pkg.tier];

  return (
    <article className={styles.card} data-featured={featured} style={{ '--i': order } as React.CSSProperties}>
      <header className={styles.cardHead}>
        <span className={styles.tierIcon}>
          <Icon aria-hidden="true" />
        </span>
        <span className={styles.tier}>{TIER_LABEL[pkg.tier]}</span>
      </header>
      <h3 className={styles.name}>{name}</h3>
      <p className={styles.price}>
        <span className={styles.currency}>$</span>
        {pkg.priceUsd}
      </p>
      <p className={styles.desc}>{desc}</p>
      <ul className={styles.facts}>
        <li>
          <Clock aria-hidden="true" />
          <span>{t.services.delivery}</span>
          <strong>{t.services.days.replace('{n}', String(pkg.days))}</strong>
        </li>
        <li>
          <RotateCcw aria-hidden="true" />
          <span>{t.services.revisions}</span>
          <strong>{pkg.revisions}</strong>
        </li>
      </ul>
      <a href={gigUrl} className={styles.cta} target="_blank" rel="noopener noreferrer">
        {t.services.cta}
        <ArrowUpRight aria-hidden="true" />
      </a>
    </article>
  );
}
