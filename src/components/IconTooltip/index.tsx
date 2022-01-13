import { ReactNode } from 'react';
import { Tooltip } from 'antd';
import type { TooltipProps } from 'antd/es/tooltip';

const IconTooltip = (
  props: {
    children?: ReactNode;
  } & TooltipProps,
) => {
  const { children, title, ...nextProps } = props;

  return (
    <Tooltip {...nextProps} title={title || '提示'}>
      <span className="m-l-8 c-po">{children}</span>
    </Tooltip>
  );
};

export default IconTooltip;
