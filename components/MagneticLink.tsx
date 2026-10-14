'use client';

import { useRef, type AnchorHTMLAttributes } from 'react';
import { useMagnetic } from './hooks';

// A link that leans towards the cursor. The offset lands in --mx/--my, which
// the .btn style feeds into the `translate` property.
export function MagneticLink(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const ref = useRef<HTMLAnchorElement>(null);
  useMagnetic(ref, 0.28);
  return <a ref={ref} {...props} />;
}
