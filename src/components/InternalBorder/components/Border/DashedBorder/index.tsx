import { CSSProperties } from 'react';
import { CommonBorderProps } from '../type';
import { useBorderWrapper } from '../hooks';
import './index.less';

const DashedBorder = (props: CommonBorderProps) => {
  const { origin, children, ...nextProps } = useBorderWrapper(
    props,
    'internal-border-dashed-border',
    {
      colorType: 'item',
    },
  );

  return (
    <>
      <div {...nextProps}>{children}</div>
    </>
  );
};

const DashedBorderWrapper: typeof DashedBorder & {
  getOuterStyle: (
    props: ComponentData.TScreenData['config']['attr']['componentBorder'],
  ) => CSSProperties;
  getOuterPadding: (
    props: ComponentData.TScreenData['config']['attr']['componentBorder'],
  ) => number[];
} = DashedBorder as any;

DashedBorderWrapper.getOuterStyle = ({ width, padding }) => {
  return {
    padding: padding.map((item) => `${item + width}px`).join(' '),
  };
};
DashedBorderWrapper.getOuterPadding = ({ width, padding }) => {
  return padding.map((item) => item + width);
};

export default DashedBorderWrapper;
