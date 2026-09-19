'use client';

import { Glass } from '@/components/Glass';
import { useI18n } from '@/lib/i18n';
import section from '@/components/sections/Section.module.css';

export default function NotFound() {
  const { t } = useI18n();
  return (
    <main className={section.section} style={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
      <Glass radius="lg" style={{ padding: 'var(--s-12)', textAlign: 'center' }}>
        <h1 style={{ color: 'var(--text)' }}>404</h1>
        <p className={section.sub}>{t.notFound.title}</p>
        <a href="/" className={`${section.btn} ${section.btnPrimary}`}>
          {t.notFound.back}
        </a>
      </Glass>
    </main>
  );
}
