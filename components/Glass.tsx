import type { HTMLAttributes } from 'react';
import styles from './Glass.module.css';

type Radius = 'sm' | 'md' | 'lg' | 'pill';
type Tag = 'div' | 'nav' | 'section' | 'article' | 'header' | 'footer';

type Props = HTMLAttributes<HTMLElement> & { as?: Tag; radius?: Radius };

export function Glass({ as: Tag = 'div', radius = 'lg', className, ...rest }: Props) {
  const classes = [styles.glass, styles[radius], className].filter(Boolean).join(' ');
  return <Tag className={classes} {...rest} />;
}
