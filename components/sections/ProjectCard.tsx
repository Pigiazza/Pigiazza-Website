'use client';

import { useId } from 'react';
import Image from 'next/image';
import { ChevronDown, ImageIcon, Star, Target } from 'lucide-react';
import { ReviewBlock } from './ReviewBlock';
import { SERVICE_ICONS } from '../serviceIcons';
import { useI18n } from '@/lib/i18n';
import type { Project } from '@/lib/projects';
import styles from './Portfolio.module.css';

type Props = { project: Project; open: boolean; onToggle: () => void };

// Collapsed it is one compact row; opening it reveals the image, the story and the review.
export function ProjectCard({ project, open, onToggle }: Props) {
  const { t } = useI18n();
  const copy = t.portfolio.items[project.id];
  const KindIcon = SERVICE_ICONS[project.kind];
  const base = useId();
  const panelId = `${base}-panel`;
  const buttonId = `${base}-button`;

  return (
    <article className={styles.project} data-open={open} data-reveal>
      <h3 className={styles.summaryWrap}>
        <button id={buttonId} type="button" className={styles.summary} aria-expanded={open} aria-controls={panelId} onClick={onToggle}>
          <span className={styles.thumb}>
            {project.image ? (
              <Image src={project.image} alt="" width={96} height={96} />
            ) : (
              <KindIcon aria-hidden="true" />
            )}
          </span>
          <span className={styles.meta}>
            <span className={styles.kind}>
              <KindIcon aria-hidden="true" />
              {copy.kind}
            </span>
            <span className={styles.title}>{copy.title}</span>
            <span className={styles.target}>
              <Target aria-hidden="true" />
              {copy.target}
            </span>
          </span>
          <span className={styles.rating} aria-label={t.portfolio.stars}>
            <Star aria-hidden="true" />
            <span aria-hidden="true">{project.stars.toFixed(1)}</span>
          </span>
          <span className={styles.chevron}>
            <ChevronDown aria-hidden="true" />
          </span>
        </button>
      </h3>

      <div id={panelId} role="region" aria-labelledby={buttonId} className={styles.panel} inert={!open}>
        <div className={styles.panelInner}>
          <div className={styles.detail}>
            <div className={styles.media}>
              {project.image ? (
                <Image src={project.image} alt={copy.imageAlt} width={640} height={640} className={styles.image} />
              ) : (
                <div className={styles.placeholder}>
                  <ImageIcon aria-hidden="true" />
                  <span>{t.portfolio.imagePlaceholder}</span>
                </div>
              )}
            </div>
            <div className={styles.content}>
              <p className={styles.body}>{copy.body}</p>
              <ReviewBlock stars={project.stars} scores={project.scores} quote={copy.review} />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
