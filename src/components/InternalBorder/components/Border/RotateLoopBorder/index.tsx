import { useMemo, CSSProperties } from 'react';
import classnames from 'classnames';
import { merge } from 'lodash';
import ThemeUtil from '@/utils/Assist/Theme';
import ColorSelect from '../../../../ColorSelect';
import { CommonBorderProps } from '../type';
import commonStyles from '../index.less';
import './index.less';

const { getRgbaString } = ColorSelect;

const RotateLoopBorder = (props: CommonBorderProps) => {
  const { children, className, style, width, padding, ...nextProps } = props;

  const color = useMemo(() => {
    return getRgbaString(ThemeUtil.generateNextColor4CurrentTheme(0));
  }, []);

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
