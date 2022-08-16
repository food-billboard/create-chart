import { PathStyleMap } from '@/hooks/useClipPath';

export type TCarouselConfig = {
  speed: number;
  autoplay: boolean;
  clipPath: keyof typeof PathStyleMap;
  dot: {
    show: boolean;
    position: 'top' | 'bottom' | 'left' | 'right';
  };
  pauseOnHover: boolean;
  // easing: string
  fade: boolean;
  condition: ComponentData.ComponentConditionConfig;
};
