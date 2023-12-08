import LazyLoadWrapper from '../../../LazyLoad';
import DoodleBubbleBackground from './DoodleBubbleBackground';
import GradientMixBackground from './GradientMixBackground';
import gradientMixBackground from './images/logo.jpg';

const ColorLineBackground = LazyLoadWrapper(async () => {
  // @ts-ignore
  return import(
    /* webpackChunkName: "COLOR_LINE_BACKGROUND" */ './ColorLineBackground' as any
  );
});

export default {
  GRADIENT_MIX_BACKGROUND: {
    value: <GradientMixBackground />,
    title: '混合渐变',
    image: gradientMixBackground,
  },
  DoodleBubbleBackground: {
    value: <DoodleBubbleBackground />,
    title: '气泡',
    image: gradientMixBackground,
  },
  ColorLineBackground: {
    value: <ColorLineBackground />,
    title: '彩色线条',
    image: gradientMixBackground,
  },
};
