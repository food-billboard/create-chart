import GradientMixBackground from './GradientMixBackground';
import DoodleBubbleBackground from './DoodleBubbleBackground';
import LazyLoadWrapper from '../../../LazyLoad';

const ColorLineBackground = LazyLoadWrapper(async () => {
  return import(
    /* webpackChunkName: "COLOR_LINE_BACKGROUND" */ './ColorLineBackground' as any
  );
});

export default {
  GRADIENT_MIX_BACKGROUND: {
    value: <GradientMixBackground />,
    title: '混合渐变',
  },
  DoodleBubbleBackground: {
    value: <DoodleBubbleBackground />,
    title: '气泡',
  },
  ColorLineBackground: {
    value: <ColorLineBackground />,
    title: '彩色线条',
  },
};
