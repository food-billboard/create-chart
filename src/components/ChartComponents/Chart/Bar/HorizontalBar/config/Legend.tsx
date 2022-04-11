import { useCallback } from 'react';
import LegendConfigCommon from '@/components/ChartComponents/Common/LegendConfig';
import { THorizontalBarConfig } from '../type';

const LegendConfig = (props: {
  value: THorizontalBarConfig['legend'];
  onChange: ComponentData.ComponentConfigProps<THorizontalBarConfig>['onChange'];
}) => {
  const { value, onChange } = props;

  const onKeyChange = useCallback(
    (value: any) => {
      onChange({
        config: {
          options: {
            legend: value,
          },
        },
      });
    },
    [onChange],
  );

  return (
    <LegendConfigCommon
      value={value}
      ignore={['type']}
      onChange={onKeyChange}
    />
  );
};

export default LegendConfig;
