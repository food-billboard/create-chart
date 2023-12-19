import { Button } from 'antd';
import type { ButtonProps, TooltipProps } from 'antd';
import { useCallback, useMemo } from 'react';
import { useGlobalLoading, IsGlobalActionLoadingParams } from '@/hooks';
import Tooltip from '../Tooltip';

export type Props = Omit<ButtonProps, 'onClick'> & {
  onClick?: IsGlobalActionLoadingParams['globalLoadingAction'];
  Component?: any;
  triggerName?: string;
  tooltip?: false | Partial<TooltipProps>;
  [key: string]: any;
} & Omit<IsGlobalActionLoadingParams, 'globalLoadingAction'>;

const GlobalLoadingActonButton = (props: Props) => {
  const {
    onClick,
    Component,
    needLoading = true,
    force = false,
    triggerName = 'onClick',
    tooltip = false,
    ...nextProps
  } = props;

  const { isGlobalActionLoading } = useGlobalLoading();

  const handleClick = useCallback(async () => {
    return isGlobalActionLoading({
      globalLoadingAction: async () => {
        try {
          return onClick?.();
        } catch (err) {}
      },
      needLoading,
      force,
    });
  }, [onClick, needLoading, force]);

  const Comp = useMemo(() => {
    return Component || Button;
  }, [Component]);

  const children = (
    <Comp
      {...nextProps}
      {...{
        [triggerName]: handleClick,
      }}
    />
  );

  if (tooltip) {
    return <Tooltip {...tooltip}>{children}</Tooltip>;
  }

  return children;
};

export default GlobalLoadingActonButton;
