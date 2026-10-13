'use client';

import { ArrowLeft, Pickaxe } from 'lucide-react';
import { Glass } from '@/components/Glass';
import { useI18n } from '@/lib/i18n';
import section from '@/components/sections/Section.module.css';

export default function NotFound() {
  const { t } = useI18n();
  return (
    <main className={section.section} style={{ minHeight: '100svh', display: 'grid', placeItems: 'center' }}>
      <Glass
        radius="lg"
        style={{ display: 'grid', justifyItems: 'center', gap: 'var(--s-5)', padding: 'var(--s-12)', textAlign: 'center' }}
      >
        <Pickaxe aria-hidden="true" style={{ width: 48, height: 48, color: 'var(--accent-text)' }} />
        <h1 style={{ fontSize: 'var(--step-3)' }}>404</h1>
        <p className={section.sub}>{t.notFound.title}</p>
        <a href="/" className={`${section.btn} ${section.btnPrimary}`}>
          <ArrowLeft aria-hidden="true" />
          {t.notFound.back}
        </a>
      </Glass>
    </main>
  );
}
