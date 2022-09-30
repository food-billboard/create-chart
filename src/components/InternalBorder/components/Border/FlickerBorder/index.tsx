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

const FlickerBorder = (props: CommonBorderProps) => {
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
            '--internal-border-flicker-border-width': width + 'px',
            padding: padding.map((item) => `${item}px`).join(' '),
          },
          style,
        )}
        className={classnames(
          'internal-border-flicker-border',
          commonStyles['internal-border-common'],
          className,
        )}
      >
        {children}
      </div>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(FlickerBorder);
