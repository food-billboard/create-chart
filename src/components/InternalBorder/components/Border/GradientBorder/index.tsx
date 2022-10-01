import { CSSProperties } from 'react';
import { CommonBorderProps } from '../type';
import { useBorderWrapper } from '../hooks';
import './index.less';

const GradientBorder = (props: CommonBorderProps) => {
  const { origin, children, ...nextProps } = useBorderWrapper(
    props,
    'internal-border-gradient-border',
    {
      colorType: 'item',
    },
  );

  return <div {...nextProps}>{children}</div>;
};

const GradientBorderWrapper: typeof GradientBorder & {
  getOuterStyle: (
    props: ComponentData.TScreenData['config']['attr']['componentBorder'],
  ) => CSSProperties;
} = GradientBorder as any;

GradientBorderWrapper.getOuterStyle = ({ width, padding }) => {
  return {
    padding: padding.map((item) => `${item + width}px`).join(' '),
  };
};

export default GradientBorderWrapper;
