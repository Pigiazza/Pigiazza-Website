'use client';

import { useState } from 'react';
import { ProjectCard } from './ProjectCard';
import { useI18n } from '@/lib/i18n';
import { projects, type ProjectId } from '@/lib/projects';
import section from './Section.module.css';
import styles from './Portfolio.module.css';

export function Portfolio() {
  const { t } = useI18n();
  const [open, setOpen] = useState<ProjectId | null>(null);

  return (
    <section id="portfolio" className={section.section}>
      <div className={section.inner}>
        <div className={section.head} data-reveal>
          <h2 className={section.heading}>{t.portfolio.heading}</h2>
          <p className={section.sub}>{t.portfolio.sub}</p>
        </div>
        <div className={styles.list}>
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} open={open === p.id} onToggle={() => setOpen(open === p.id ? null : p.id)} />
          ))}
        </div>
      </div>
    </section>
  );
}
