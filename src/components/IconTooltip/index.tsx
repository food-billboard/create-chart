import { ReactNode, CSSProperties } from 'react';
import classnames from 'classnames';
import type { TooltipProps } from 'antd/es/tooltip';
import Tooltip from '../Tooltip';
import styles from './index.less';

const IconTooltip = (
  props: {
    children?: ReactNode;
    iconClassName?: string;
    iconStyle?: CSSProperties;
  } & TooltipProps,
) => {
  const {
    children,
    title,
    iconClassName,
    iconStyle,
    overlayClassName,
    ...nextProps
  } = props;

  return (
    <Tooltip
      overlayClassName={classnames(
        styles['component-icon-tooltip'],
        overlayClassName,
      )}
      {...nextProps}
      title={title || '提示'}
    >
      <span className={classnames('c-po', iconClassName)} style={iconStyle}>
        {children}
      </span>
    </Tooltip>
  );
};

export default IconTooltip;
