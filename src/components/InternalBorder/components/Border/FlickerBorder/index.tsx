import { CSSProperties } from 'react';
import { getRgbaString } from '@/utils/Assist/Theme';
import { CommonBorderProps } from '../type';
import { useBorderWrapper } from '../hooks';
import './index.less';

const FlickerBorder = (props: CommonBorderProps) => {
  const { origin, children, ...nextProps } = useBorderWrapper(
    props,
    'internal-border-flicker-border',
    {
      colorType: 'list',
    },
  );

  const ColorList = origin.color as ComponentData.TColorConfig[];

  return (
    <>
      <div
        {...nextProps}
        style={{
          ...nextProps.style,
          // @ts-ignore
          '--internal-border-flicker-border-shadow-0': getRgbaString({
            ...ColorList[1],
            a: 0.1,
          }),
          '--internal-border-flicker-border-shadow-1': getRgbaString({
            ...ColorList[1],
            a: 0.2,
          }),
          '--internal-border-flicker-border-shadow-2': getRgbaString({
            ...ColorList[1],
            a: 0.4,
          }),
          '--internal-border-flicker-border-shadow-3': getRgbaString({
            ...ColorList[2],
            a: 0.6,
          }),
        }}
      >
        {children}
      </div>
    </>
  );
};

const FlickerBorderWrapper: typeof FlickerBorder & {
  getOuterStyle: (
    props: ComponentData.TScreenData['config']['attr']['componentBorder'],
  ) => CSSProperties;
  getOuterPadding: (
    props: ComponentData.TScreenData['config']['attr']['componentBorder'],
  ) => number[];
} = FlickerBorder as any;

FlickerBorderWrapper.getOuterStyle = ({ width, padding }) => {
  return {
    padding: padding.map((item) => `${item + width}px`).join(' '),
  };
};
FlickerBorderWrapper.getOuterPadding = ({ width, padding }) => {
  return padding.map((item) => item + width);
};

export default FlickerBorderWrapper;
