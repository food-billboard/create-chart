import classnames from 'classnames';
import { merge } from 'lodash';
import { CSSProperties } from 'react';
import commonStyles from '../index.less';
import { CommonBorderProps } from '../type';
import './index.less';

const RotateLoopBorder = (props: CommonBorderProps) => {
  const { children, className, style, width, padding, ...nextProps } = props;

  return (
    <div
      {...nextProps}
      style={merge(
        {
          // @ts-ignore
          '--internal-border-rotate-loop-border-width': width + 'px',
          padding: padding.map((item) => `${item}px`).join(' '),
        },
        style,
      )}
      className={classnames(
        'internal-border-rotate-loop-border',
        commonStyles['internal-border-common'],
        className,
      )}
    >
      {children}
    </div>
  );
};

const RotateLoopBorderWrapper: typeof RotateLoopBorder & {
  getOuterStyle: (
    props: ComponentData.TScreenData['config']['attr']['componentBorder'],
  ) => CSSProperties;
  getOuterPadding: (
    props: ComponentData.TScreenData['config']['attr']['componentBorder'],
  ) => number[];
} = RotateLoopBorder as any;

RotateLoopBorderWrapper.getOuterStyle = ({ width, padding }) => {
  return {
    padding: padding.map((item) => `${item + width}px`).join(' '),
  };
};
RotateLoopBorderWrapper.getOuterPadding = ({ width, padding }) => {
  return padding.map((item) => item + width);
};

export default RotateLoopBorderWrapper;
