import { useCallback } from 'react';
import GridConfigCommon from '@/components/ChartComponents/Common/GridConfig';
import { TCandlestickBasicConfig } from '../type';

const GridConfig = (props: {
  value: TCandlestickBasicConfig['grid'];
  onChange: ComponentData.ComponentConfigProps<TCandlestickBasicConfig>['onChange'];
}) => {
  const { value, onChange } = props;

  const onKeyChange = useCallback(
    (value: any) => {
      onChange({
        config: {
          options: {
            grid: value,
          },
        },
      });
    },
    [onChange],
  );

  return <GridConfigCommon value={value} onChange={onKeyChange} />;
};

export default GridConfig;
