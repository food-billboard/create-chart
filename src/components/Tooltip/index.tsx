import {} from 'react';
import { Tooltip as AntTooltip } from 'antd';
import type { TooltipProps } from 'antd/es/tooltip';
import { usePrimaryColor } from '@/hooks';

const Tooltip = (props: TooltipProps) => {
  const primaryColor = usePrimaryColor();

  return <AntTooltip color={primaryColor} {...props} />;
};

export default Tooltip;
