'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import styles from './LiveClock.module.css';

const ROME = 'Europe/Rome';

// Tommaso's local time, so clients in other timezones know when to expect a reply.
// Rendered only after mount: the server has no idea what time the visitor sees.
export function LiveClock() {
  const { t, lang } = useI18n();
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), 15_000);
    return () => window.clearInterval(id);
  }, []);

  if (!now) return <div className={styles.clock} aria-hidden="true" />;

  const time = new Intl.DateTimeFormat(lang === 'it' ? 'it-IT' : 'en-GB', {
    timeZone: ROME,
    hour: '2-digit',
    minute: '2-digit',
  }).format(now);
  const hour = Number(new Intl.DateTimeFormat('en-GB', { timeZone: ROME, hour: 'numeric', hourCycle: 'h23' }).format(now));
  const awake = hour >= 8 && hour < 24;
  const Icon = awake ? Sun : Moon;

  return (
    <div className={styles.clock} data-awake={awake}>
      <span className={styles.icon}>
        <Icon aria-hidden="true" />
      </span>
      <span className={styles.text}>
        <span className={styles.label}>{t.about.clockLabel}</span>
        <span className={styles.time}>{time}</span>
      </span>
      <span className={styles.status}>
        <span className={styles.dot} aria-hidden="true" />
        {awake ? t.about.awake : t.about.asleep}
      </span>
    </div>
  );
}
