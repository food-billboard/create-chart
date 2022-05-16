import { useCallback } from 'react';
import GridConfigCommon from '@/components/ChartComponents/Common/GridConfig';
import { TBarBasicConfig } from '../type';

const GridConfig = (props: {
  value: TBarBasicConfig['grid'];
  onChange: ComponentData.ComponentConfigProps<TBarBasicConfig>['onChange'];
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
