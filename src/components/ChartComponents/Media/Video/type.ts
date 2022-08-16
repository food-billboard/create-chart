import { PathStyleMap } from '@/hooks/useClipPath';

export type TVideoConfig = {
  autoplay: boolean;
  loop: boolean;
  controls: boolean;
  muted: boolean;
  condition: ComponentData.ComponentConditionConfig;
  clipPath: keyof typeof PathStyleMap;
};
