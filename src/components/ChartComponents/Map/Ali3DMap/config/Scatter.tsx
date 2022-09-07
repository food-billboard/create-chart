import { useCallback } from 'react';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import { TAli3DMapConfig } from '../type';

const SeriesConfig = (props: {
  value: TAli3DMapConfig['scatter'];
  onChange: ComponentData.ComponentConfigProps<TAli3DMapConfig>['onChange'];
}) => {
  const { value, onChange } = props;
  const {} = value;

  const onKeyChange = useCallback(
    (key: keyof TAli3DMapConfig['scatter'], value: any) => {
      onChange({
        config: {
          options: {
            scatter: {
              [key]: value,
            },
          },
        },
      });
    },
    [onChange],
  );

  return <ConfigList></ConfigList>;
};

export default SeriesConfig;
