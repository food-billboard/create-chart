import { Tooltip as AntTooltip } from 'antd';
import type { TooltipProps } from 'antd/es/tooltip';
import Tooltip from '@/components/ChartComponents/Common/Tooltip';
import { DEFAULT_THEME_COLOR } from '@/utils/Assist/Theme';

// 携带input focus相关事件的tooltip
// 为了避免键盘事件在弹唱时响应
export const ScreenTooltip = (props: TooltipProps) => {
  return <Tooltip {...props} color={DEFAULT_THEME_COLOR} />;
};

const CusTooltip = (props: TooltipProps) => {
  return <AntTooltip {...props} color={DEFAULT_THEME_COLOR} />;
};

export default CusTooltip;
