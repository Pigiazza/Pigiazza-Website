import { ArrowLeftRight, Blocks, Plug, Puzzle, type LucideIcon } from 'lucide-react';
import type { ServiceId } from '@/lib/services';

export const SERVICE_ICONS: Record<ServiceId, LucideIcon> = {
  mod: Blocks,
  plugin: Plug,
  addon: Puzzle,
  port: ArrowLeftRight,
};
