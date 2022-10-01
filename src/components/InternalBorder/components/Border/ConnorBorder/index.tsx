import { CSSProperties } from 'react';
import { CommonBorderProps } from '../type';
import { useBorderWrapper } from '../hooks';
import './index.less';

const ConnorBorder = (props: CommonBorderProps) => {
  const {
    origin: {
      props: { width, padding },
    },
    children,
    style,
    ...nextProps
  } = useBorderWrapper(props, 'internal-border-connor-border', {
    colorType: 'item',
  });

  return (
    <>
      <div
        {...nextProps}
        style={{
          ...style,
          backgroundSize: `${width * 0.4}px ${width * 2}px, ${width * 2}px ${
            width * 0.4
          }px, ${width * 0.4}px ${width * 2}px, ${width * 2}px ${
            width * 0.4
          }px`,
          borderRadius: padding.map((item) => `${item}px`).join(' '),
        }}
      >
        {children}
      </div>
    </>
  );
};

const ConnorBorderWrapper: typeof ConnorBorder & {
  getOuterStyle: (
    props: ComponentData.TScreenData['config']['attr']['componentBorder'],
  ) => CSSProperties;
} = ConnorBorder as any;

ConnorBorderWrapper.getOuterStyle = ({ width, padding }) => {
  return {
    padding: padding.map((item) => `${item + width * 0.4}px`).join(' '),
  };
};

export default ConnorBorderWrapper;
