import { useCallback } from 'react';
import TooltipConfigCommon from '@/components/ChartComponents/Common/TooltipCommon';
import { TCandlestickBasicConfig } from '../type';

const TooltipConfig = (props: {
  value: TCandlestickBasicConfig['tooltip'];
  onChange: ComponentData.ComponentConfigProps<TCandlestickBasicConfig>['onChange'];
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

  return <TooltipConfigCommon value={value} onChange={onKeyChange} />;
};

export default TooltipConfig;
