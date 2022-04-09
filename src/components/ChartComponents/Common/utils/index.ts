import * as echarts from 'echarts';
import ColorSelect from '@/components/ColorSelect';

const { getRgbaString } = ColorSelect;

export function radialGradientColor(value: ComponentData.TGradientColorConfig) {
  if (!value) return false;
  const { start, end, radialPosition, linearPosition, type } = value;
  const commonStepColor = [
    {
      offset: 0,
      color: getRgbaString(start),
    },
    {
      offset: 1,
      color: getRgbaString(end),
    },
  ];

  if (type === 'radial') {
    return new echarts.graphic.RadialGradient(
      radialPosition.x,
      radialPosition.y,
      radialPosition.r,
      commonStepColor,
    );
  }

  return new echarts.graphic.LinearGradient(
    linearPosition.startX,
    linearPosition.startY,
    linearPosition.endX,
    linearPosition.endY,
    commonStepColor,
  );
}
