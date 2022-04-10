import { useCallback } from 'react';
import TooltipConfigCommon from '@/components/ChartComponents/Common/TooltipCommon';
import TooltipAnimationConfig from '@/components/ChartComponents/Common/TooltipAnimationConfig';
import { TProgressBarConfig } from '../type';

const TooltipConfig = (props: {
  value: TProgressBarConfig['tooltip'];
  onChange: ComponentData.ComponentConfigProps<TProgressBarConfig>['onChange'];
}) => {
  const { value, onChange } = props;

  const onKeyChange = useCallback(
    (value: any) => {
      onChange({
        config: {
          options: {
            tooltip: value,
          },
        },
      });
    },
    [onChange],
  );

  return (
    <TooltipConfigCommon
      value={value}
      onChange={onKeyChange}
    ></TooltipConfigCommon>
  );
};

export default TooltipConfig;
