import GradientBorder from './GradientBorder';
import RotateLoopBorder from './RotateLoopBorder';
import GradientLoopBorder from './GradientLoopBorder';
import DashedBorder from './DashedBorder';
import ConnorBorder from './ConnorBorder';
import FlickerBorder from './FlickerBorder';

export const DEFAULT_BORDER = 'GradientLoopBorder';

export default {
  // GradientBorder: {
  //   value: GradientBorder,
  //   title: '渐变',
  // },
  // RotateLoopBorder: {
  //   value: RotateLoopBorder,
  //   title: '旋转流光',
  // },
  GradientLoopBorder: {
    value: GradientLoopBorder,
    title: '渐变流光',
  },
  DashedBorder: {
    value: DashedBorder,
    title: '虚线',
  },
  ConnorBorder: {
    value: ConnorBorder,
    title: '四角',
  },
  FlickerBorder: {
    value: FlickerBorder,
    title: '闪烁',
  },
};
