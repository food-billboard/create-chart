import { ReactNode, CSSProperties } from 'react';
import { Tooltip } from 'antd';
import classnames from 'classnames';
import type { TooltipProps } from 'antd/es/tooltip';

const IconTooltip = (
  props: {
    children?: ReactNode;
    iconClassName?: string;
    iconStyle?: CSSProperties;
  } & TooltipProps,
) => {
  const { children, title, iconClassName, iconStyle, ...nextProps } = props;

  return (
    <Tooltip {...nextProps} title={title || '提示'}>
      <span
        className={classnames('m-l-8', 'c-po', iconClassName)}
        style={iconStyle}
      >
        {children}
      </span>
    </Tooltip>
  );
};

export default IconTooltip;
