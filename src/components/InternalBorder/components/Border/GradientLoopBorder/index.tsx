import { CSSProperties } from 'react';
import { CommonBorderProps } from '../type';
import { useBorderWrapper } from '../hooks';
import './index.less';

const GradientLoopBorder = (props: CommonBorderProps) => {
  const { origin, children, style, ...nextProps } = useBorderWrapper(
    props,
    'internal-border-gradient-loop-border',
    {
      colorType: 'list',
    },
  );

  return (
    <>
      <div {...nextProps} style={style}></div>
      <div
        className={'w-100 h-100 internal-border-gradient-loop-border-outer'}
        style={style}
      >
        {children}
      </div>
    </>
  );
};

const GradientLoopBorderWrapper: typeof GradientLoopBorder & {
  getOuterStyle: (
    props: ComponentData.TScreenData['config']['attr']['componentBorder'],
  ) => CSSProperties;
  getOuterPadding: (
    props: ComponentData.TScreenData['config']['attr']['componentBorder'],
  ) => number[];
} = GradientLoopBorder as any;

GradientLoopBorderWrapper.getOuterStyle = ({ width, padding }) => {
  return {
    padding: padding.map((item) => `${item + width}px`).join(' '),
  };
};
GradientLoopBorderWrapper.getOuterPadding = ({ width, padding }) => {
  return padding.map((item) => item + width);
};

export default GradientLoopBorderWrapper;
