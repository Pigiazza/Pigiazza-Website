import type { ServiceId } from './services';

export type ProjectId = 'hugMarry' | 'createRaw';
export type Scores = { communication: number; quality: number; value: number };
export type Project = { id: ProjectId; kind: ServiceId; image: string | null; stars: number; scores: Scores };

export const projects: Project[] = [
  // PLACEHOLDER: image for Hug & Marry
  { id: 'hugMarry', kind: 'port', image: null, stars: 5, scores: { communication: 5, quality: 5, value: 5 } },
  {
    id: 'createRaw',
    kind: 'addon',
    image: '/projects/create-raw.webp',
    stars: 5,
    scores: { communication: 5, quality: 5, value: 5 },
  },
];
