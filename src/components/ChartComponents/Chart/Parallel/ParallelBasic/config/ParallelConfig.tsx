import { useCallback, useMemo } from 'react';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import OrientSelect from '@/components/ChartComponents/Common/OrientSelect';
import NumberPositionConfig from '@/components/ChartComponents/Common/NumberPositionConfig';
import { TParallelBasicConfig } from '../type';

const { Item } = ConfigList;

const ParallelConfig = (props: {
  value: TParallelBasicConfig['parallel'];
  onChange: ComponentData.ComponentConfigProps<TParallelBasicConfig>['onChange'];
}) => {
  const { value, onChange } = props;
  const { left, top, right, bottom, layout } = value;

  const onKeyChange = useCallback(
    (key: keyof TParallelBasicConfig['parallel'], value: any) => {
      onChange({
        config: {
          options: {
            parallel: {
              [key]: value,
            },
          },
        },
      });
    },
    [onChange],
  );

  const positionConfig = useMemo(() => {
    return (
      <NumberPositionConfig
        value={{
          left,
          top,
          right,
          bottom,
        }}
        onChange={(value) => {
          onChange({
            config: {
              options: {
                parallel: value,
              },
            },
          });
        }}
      />
    );
  }, [left, top, right, bottom, onKeyChange]);

  const layoutConfig = useMemo(() => {
    return (
      <Item label="位置">
        <FullForm>
          <OrientSelect
            value={layout}
            onChange={onKeyChange.bind(null, 'layout')}
          />
        </FullForm>
      </Item>
    );
  }, [layout, onKeyChange]);

  return (
    <ConfigList>
      {positionConfig}
      {layoutConfig}
    </ConfigList>
  );
};

export default ParallelConfig;
