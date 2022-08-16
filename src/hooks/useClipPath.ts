import { CSSProperties } from 'react';

// 原 椭圆 矩形 三角形 菱形 梯形 平行四边形 五边形 六边形 七边形 八边形 斜角 槽口 左箭头 右箭头 星星 十字架 叉号
type PathType =
  | 'circle'
  | 'ellipse'
  | 'rect'
  | 'triangle'
  | 'diamond'
  | 'trapezoid'
  | 'parallelogram'
  | 'pentagon'
  | 'hexagon'
  | 'heptagon'
  | 'octagon'
  | 'bevel-angle'
  | 'notch'
  | 'left-arrow'
  | 'right-arrow'
  | 'star'
  | 'cross'
  | 'cross-2';

export const PathStyleMap = {
  none: {
    label: '无',
    value: 'unset',
  },
  circle: {
    label: '圆形',
    value: 'circle(50% at 50% 50%)',
  },
  ellipse: {
    value: 'ellipse(25% 40% at 50% 50%)',
    label: '椭圆',
  },
  // rect: {
  //   value: 'inset(5% 20% 15% 10%)',
  //   label: '矩形'
  // },
  triangle: {
    value: 'polygon(50% 0%, 0% 100% 100% 100%)',
    label: '三角形',
  },
  diamond: {
    value: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
    label: '菱形',
  },
  trapezoid: {
    value: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)',
    label: '梯形',
  },
  parallelogram: {
    value: 'polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)',
    label: '平行四边形',
  },
  pentagon: {
    value: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
    label: '五边形',
  },
  hexagon: {
    value: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
    label: '六边形',
  },
  heptagon: {
    value:
      'polygon(50% 0%, 90% 20%, 100% 60%, 75% 100%, 25% 100%, 0% 60%, 10% 20%)',
    label: '七边形',
  },
  octagon: {
    value:
      'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
    label: '八边形',
  },
  'bevel-angle': {
    value:
      'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)',
    label: '斜角',
  },
  notch: {
    value:
      'polygon(0% 15%, 15% 15%, 15% 0%, 85% 0%, 85% 15%, 100% 15%, 100% 85%, 85% 85%, 85% 100%, 15% 100%, 15% 85%, 0% 85%)',
    label: '槽口',
  },
  'left-arrow': {
    value:
      'polygon(40% 0%, 40% 20%, 100% 20%, 100% 80%, 40% 80%, 40% 100%, 0% 50%)',
    label: '左箭头',
  },
  'right-arrow': {
    value:
      'polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%)',
    label: '右箭头',
  },
  star: {
    value:
      'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
    label: '星星',
  },
  cross: {
    value:
      'polygon(10% 25%, 35% 25%, 35% 0%, 65% 0%, 65% 25%, 90% 25%, 90% 50%, 65% 50%, 65% 100%, 35% 100%, 35% 50%, 10% 50%)',
    label: '十字架',
  },
  'cross-2': {
    value:
      'polygon(20% 0%, 0% 20%, 30% 50%, 0% 80%, 20% 100%, 50% 70%, 80% 100%, 100% 80%, 70% 50%, 100% 20%, 80% 0%, 50% 30%)',
    label: '叉号',
  },
};

export const useClipPath: (type: keyof typeof PathStyleMap) => CSSProperties = (
  type,
) => {
  return {
    clipPath: PathStyleMap[type]?.value,
  };
};
