import { FIVERR_PROFILE } from './services';

export type Social = { name: 'Fiverr' | 'GitHub' | 'Modrinth' | 'Ko-fi'; href: string; icon: string };

export const socials: Social[] = [
  { name: 'Fiverr', href: FIVERR_PROFILE, icon: '/fiverr.jpg' },
  { name: 'GitHub', href: 'https://github.com/Pigiazza', icon: '/github.png' },
  { name: 'Modrinth', href: 'https://modrinth.com/user/Pigiazza', icon: '/modrinth.png' },
  { name: 'Ko-fi', href: 'https://ko-fi.com/pigiazza', icon: '/kofi.png' },
];
