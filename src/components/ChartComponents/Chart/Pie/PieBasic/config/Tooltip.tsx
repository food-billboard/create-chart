import { useCallback } from 'react';
import TooltipConfigCommon from '@/components/ChartComponents/Common/TooltipCommon';
import { TPieBasicConfig } from '../type';

const TooltipConfig = (props: {
  value: TPieBasicConfig['tooltip'];
  onChange: ComponentData.ComponentConfigProps<TPieBasicConfig>['onChange'];
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
