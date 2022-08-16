import { PathStyleMap } from '@/hooks/useClipPath';

export type TImageConfig = {
  type: 'image' | 'color';
  clipPath: keyof typeof PathStyleMap;
  content: string | ComponentData.TColorConfig;
  repeat: {
    x: boolean;
    y: boolean;
  };
  condition: ComponentData.ComponentConditionConfig;
  preview: {
    show: boolean;
  };
};
