import { Glass } from '../Glass';
import type { Package } from '@/lib/services';
import section from './Section.module.css';
import styles from './Services.module.css';

type Labels = { delivery: string; days: string; revisions: string; cta: string; featured: string };

type Props = { pkg: Package; tierLabel: string; name: string; desc: string; gigUrl: string; featured: boolean; labels: Labels };

export function PackageCard({ pkg, tierLabel, name, desc, gigUrl, featured, labels }: Props) {
  return (
    <Glass as="article" radius="lg" className={`${styles.card} ${featured ? styles.featured : ''}`}>
      <div className={styles.cardHead}>
        <span className={styles.tier}>{tierLabel}</span>
        {featured && <span className={styles.badge}>{labels.featured}</span>}
      </div>
      <h3 className={styles.name}>{name}</h3>
      <p className={styles.price}>${pkg.priceUsd}</p>
      <p className={styles.desc}>{desc}</p>
      <dl className={styles.facts}>
        <div>
          <dt>{labels.delivery}</dt>
          <dd>{labels.days.replace('{n}', String(pkg.days))}</dd>
        </div>
        <div>
          <dt>{labels.revisions}</dt>
          <dd>{pkg.revisions}</dd>
        </div>
      </dl>
      <a
        href={gigUrl}
        className={`${section.btn} ${featured ? section.btnPrimary : section.btnGhost} ${styles.cardCta}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {labels.cta}
      </a>
    </Glass>
  );
}
