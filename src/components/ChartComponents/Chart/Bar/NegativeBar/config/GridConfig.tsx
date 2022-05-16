import { useCallback } from 'react';
import GridConfigCommon from '@/components/ChartComponents/Common/GridConfig';
import { TNegativeBarConfig } from '../type';

const GridConfig = (props: {
  value: TNegativeBarConfig['grid'];
  onChange: ComponentData.ComponentConfigProps<TNegativeBarConfig>['onChange'];
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
