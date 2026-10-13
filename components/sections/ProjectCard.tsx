'use client';

import Image from 'next/image';
import { Glass } from '../Glass';
import { ReviewBlock } from './ReviewBlock';
import { useI18n } from '@/lib/i18n';
import type { Project } from '@/lib/projects';
import styles from './Portfolio.module.css';

export function ProjectCard({ project }: { project: Project }) {
  const { t } = useI18n();
  const copy = t.portfolio.items[project.id];

  return (
    <Glass as="article" radius="lg" className={styles.card}>
      {project.image ? (
        <Image src={project.image} alt={copy.imageAlt} width={640} height={640} className={styles.image} />
      ) : (
        <div className={`${styles.image} ${styles.placeholder}`}>{t.portfolio.imagePlaceholder}</div>
      )}
      <div className={styles.meta}>
        <span className={styles.badge}>{copy.badge}</span>
        <span className={styles.target}>{copy.target}</span>
      </div>
      <h3 className={styles.title}>{copy.title}</h3>
      <p className={styles.body}>{copy.body}</p>
      <ReviewBlock stars={project.stars} scores={project.scores} quote={copy.review} />
    </Glass>
  );
}
