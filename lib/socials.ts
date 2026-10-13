import { FIVERR_PROFILE } from './services';

export type Social = { name: 'Fiverr' | 'GitHub' | 'YouTube' | 'Ko-fi'; href: string; icon: string };

export const socials: Social[] = [
  { name: 'Fiverr', href: FIVERR_PROFILE, icon: '/fiverr.jpg' },
  { name: 'GitHub', href: 'https://github.com/Pigiazza', icon: '/github.png' },
  { name: 'YouTube', href: 'https://www.youtube.com/channel/UCt-khCdmSNPxp9ktgGB0o-A', icon: '/youtube.svg' },
  { name: 'Ko-fi', href: 'https://ko-fi.com/pigiazza', icon: '/kofi.png' },
];
