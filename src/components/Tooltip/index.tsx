import { Tooltip as AntTooltip } from 'antd';
import type { TooltipProps } from 'antd/es/tooltip';
import { DEFAULT_THEME_COLOR } from '@/utils/Assist/Theme';

const Tooltip = (props: TooltipProps) => {
  return <AntTooltip {...props} color={DEFAULT_THEME_COLOR} />;
};

export default Tooltip;
