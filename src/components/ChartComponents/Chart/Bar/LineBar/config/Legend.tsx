import { useCallback } from 'react';
import LegendConfigCommon from '@/components/ChartComponents/Common/LegendConfig';
import { TLineBarConfig } from '../type';

const LegendConfig = (props: {
  value: TLineBarConfig['legend'];
  onChange: ComponentData.ComponentConfigProps<TLineBarConfig>['onChange'];
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
