import { useCallback } from 'react';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import ColorSelect from '@/components/ColorSelect';
import { TAli3DMapConfig } from '../type';

const { Item } = ConfigList;

const SeriesConfig = (props: {
  value: TAli3DMapConfig['scatter'];
  onChange: ComponentData.ComponentConfigProps<TAli3DMapConfig>['onChange'];
}) => {
  const { value, onChange } = props;
  const { color } = value;

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

  return (
    <ConfigList>
      <Item label="样式">
        <FullForm>
          <ColorSelect
            className="w-100"
            value={color}
            onChange={onKeyChange.bind(null, 'color')}
          />
        </FullForm>
      </Item>
    </ConfigList>
  );
};

export default SeriesConfig;
