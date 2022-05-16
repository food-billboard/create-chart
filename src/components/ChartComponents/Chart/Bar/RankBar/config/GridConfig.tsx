import { useCallback } from 'react';
import GridConfigCommon from '@/components/ChartComponents/Common/GridConfig';
import { TRankBarConfig } from '../type';

const GridConfig = (props: {
  value: TRankBarConfig['grid'];
  onChange: ComponentData.ComponentConfigProps<TRankBarConfig>['onChange'];
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
