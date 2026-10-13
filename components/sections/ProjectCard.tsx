'use client';

import Image from 'next/image';
import { ImageIcon, Target } from 'lucide-react';
import { ReviewBlock } from './ReviewBlock';
import { SERVICE_ICONS } from '../serviceIcons';
import { useI18n } from '@/lib/i18n';
import type { Project } from '@/lib/projects';
import styles from './Portfolio.module.css';

export function ProjectCard({ project, flip }: { project: Project; flip: boolean }) {
  const { t } = useI18n();
  const copy = t.portfolio.items[project.id];
  const KindIcon = SERVICE_ICONS[project.kind];

  return (
    <article className={styles.project} data-flip={flip}>
      <div className={styles.media} data-reveal={flip ? 'right' : 'left'}>
        {project.image ? (
          <Image src={project.image} alt={copy.imageAlt} width={640} height={640} className={styles.image} />
        ) : (
          <div className={styles.placeholder}>
            <ImageIcon aria-hidden="true" />
            <span>{t.portfolio.imagePlaceholder}</span>
          </div>
        )}
      </div>
      <div className={styles.content} data-reveal>
        <p className={styles.kind}>
          <KindIcon aria-hidden="true" />
          {copy.kind}
        </p>
        <h3 className={styles.title}>{copy.title}</h3>
        <p className={styles.target}>
          <Target aria-hidden="true" />
          {copy.target}
        </p>
        <p className={styles.body}>{copy.body}</p>
        <ReviewBlock stars={project.stars} scores={project.scores} quote={copy.review} />
      </div>
    </article>
  );
}
