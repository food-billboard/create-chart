import { useMemo } from 'react';
import classnames from 'classnames';
import { merge } from 'lodash';
import { connect } from 'dva';
import ThemeUtil from '@/utils/Assist/Theme';
import ColorSelect from '../../../../ColorSelect';
import { mapStateToProps, mapDispatchToProps } from '../connect';
import { CommonBorderProps } from '../type';
import commonStyles from '../index.less';
import './index.less';

const { getRgbaString } = ColorSelect;

const GradientLoopBorder = (props: CommonBorderProps) => {
  const { children, className, style, width, padding, ...nextProps } = props;

  const color = useMemo(() => {
    return getRgbaString(ThemeUtil.generateNextColor4CurrentTheme(0));
  }, []);

  return (
    <>
      <div
        {...nextProps}
        style={merge(
          {
            // @ts-ignore
            '--internal-border-gradient-loop-border-width': width + 'px',
          },
          style,
        )}
        className={classnames(
          'internal-border-gradient-loop-border',
          commonStyles['internal-border-common'],
          className,
        )}
      ></div>
      <div
        className={'w-100 h-100 internal-border-gradient-loop-border-outer'}
        style={merge(
          {
            padding: padding.map((item) => `${item}px`).join(' '),
          },
          style,
        )}
      >
        {children}
      </div>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(GradientLoopBorder);
