import { useCallback } from 'react';
import LegendConfigCommon from '@/components/ChartComponents/Common/LegendConfig';
import { TStackBarConfig } from '../type';

const LegendConfig = (props: {
  value: TStackBarConfig['legend'];
  onChange: ComponentData.ComponentConfigProps<TStackBarConfig>['onChange'];
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

  return <LegendConfigCommon value={value} onChange={onKeyChange} />;
};

export default LegendConfig;
