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
        <h2 className={section.heading}>{t.portfolio.heading}</h2>
        <p className={section.sub}>{t.portfolio.sub}</p>
        <div className={styles.grid}>
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
