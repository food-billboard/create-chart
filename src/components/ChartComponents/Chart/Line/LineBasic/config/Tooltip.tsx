import { useCallback } from 'react';
import TooltipConfigCommon from '@/components/ChartComponents/Common/TooltipCommon';
import TooltipAnimationConfig from '@/components/ChartComponents/Common/TooltipAnimationConfig';
import { TLineBasicConfig } from '../type';

const TooltipConfig = (props: {
  value: TLineBasicConfig['tooltip'];
  onChange: ComponentData.ComponentConfigProps<TLineBasicConfig>['onChange'];
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
    <TooltipConfigCommon value={value} onChange={onKeyChange}>
      <TooltipAnimationConfig
        value={value.animation}
        onChange={(value) => {
          onKeyChange({
            animation: value,
          });
        }}
      />
    </TooltipConfigCommon>
  );
};

export default TooltipConfig;
