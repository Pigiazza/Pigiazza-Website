'use client';

import { ProjectCard } from './ProjectCard';
import { useI18n } from '@/lib/i18n';
import { projects } from '@/lib/projects';
import section from './Section.module.css';
import styles from './Portfolio.module.css';

export function Portfolio() {
  const { t } = useI18n();
  return (
    <section id="portfolio" className={section.section}>
      <div className={section.inner}>
        <div className={section.head} data-reveal>
          <h2 className={section.heading}>{t.portfolio.heading}</h2>
          <p className={section.sub}>{t.portfolio.sub}</p>
        </div>
        <div className={styles.list}>
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} flip={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
