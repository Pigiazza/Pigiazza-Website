'use client';

import { useRef } from 'react';
import { ArrowUpRight, Clock, Gem, RotateCcw, Rocket, Sparkles } from 'lucide-react';
import { useCountUp, useTilt } from '../hooks';
import { useI18n } from '@/lib/i18n';
import type { Package, Tier } from '@/lib/services';
import styles from './Services.module.css';

const TIER_LABEL: Record<Tier, string> = { basic: 'Basic', standard: 'Standard', premium: 'Premium' };
const TIER_ICON = { basic: Sparkles, standard: Rocket, premium: Gem };

type Props = {
  pkg: Package;
  order: number;
  swapKey: string;
  name: string;
  desc: string;
  gigUrl: string;
  featured: boolean;
};

// Cards stay mounted across service switches so the price can roll; only the
// text is re-keyed by `swapKey` to replay its entrance.
export function PackageCard({ pkg, order, swapKey, name, desc, gigUrl, featured }: Props) {
  const { t } = useI18n();
  const Icon = TIER_ICON[pkg.tier];
  const card = useRef<HTMLElement>(null);
  useTilt(card, 6);
  const price = useCountUp(pkg.priceUsd);

  return (
    <article ref={card} className={styles.card} data-featured={featured} style={{ '--i': order } as React.CSSProperties}>
      <span className={styles.glare} aria-hidden="true" />
      <header className={styles.cardHead}>
        <span className={styles.tierIcon}>
          <Icon aria-hidden="true" />
        </span>
        <span className={styles.tier}>{TIER_LABEL[pkg.tier]}</span>
      </header>
      <h3 key={`n-${swapKey}`} className={`${styles.name} ${styles.swap}`}>
        {name}
      </h3>
      <p className={styles.price}>
        <span className={styles.currency}>$</span>
        <span className="sr-only">{pkg.priceUsd}</span>
        <span aria-hidden="true">{price}</span>
      </p>
      <p key={`d-${swapKey}`} className={`${styles.desc} ${styles.swap}`}>
        {desc}
      </p>
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
