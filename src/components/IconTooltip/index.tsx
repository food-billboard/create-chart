import { ReactNode, CSSProperties } from 'react';
import classnames from 'classnames';
import type { TooltipProps } from 'antd/es/tooltip';
import Tooltip from '../Tooltip';
import styles from './index.less';

export type Props = {
  children?: ReactNode;
  iconClassName?: string;
  iconStyle?: CSSProperties;
} & TooltipProps;

const IconTooltip = (props: Props) => {
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
      title={
        <div onClick={(e) => e.stopPropagation()}>
          {(title as any) || '提示'}
        </div>
      }
    >
      <span className={classnames('c-po', iconClassName)} style={iconStyle}>
        {children}
      </span>
    </Tooltip>
  );
};

export default IconTooltip;
