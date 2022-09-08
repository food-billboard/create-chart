import { useCallback } from 'react';
import { Select } from 'antd';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import { TAli3DMapConfig } from '../type';

const { Item } = ConfigList;

const STYLE_OPTIONS = [
  {
    label: '标准',
    value: 'normal',
  },
  {
    label: '幻影黑',
    value: 'dark',
  },
  {
    label: '月光银',
    value: 'light',
  },
  {
    label: '远山黛',
    value: 'whitesmoke',
  },
  {
    label: '草色青',
    value: 'fresh',
  },
  {
    label: '雅士灰',
    value: 'grey',
  },
  {
    label: '涂鸦',
    value: 'graffiti',
  },
  {
    label: '马卡龙',
    value: 'macaron',
  },
  {
    label: '靛青蓝',
    value: 'blue',
  },
  {
    label: '极夜蓝',
    value: 'darkblue',
  },
  {
    label: '酱籽',
    value: 'wine',
  },
];

type Value = Pick<TAli3DMapConfig, 'style'>;

const BaseConfig = (props: {
  value: Value;
  onChange: ComponentData.ComponentConfigProps<TAli3DMapConfig>['onChange'];
}) => {
  const { value, onChange } = props;
  const { style } = value;

  const onKeyChange = useCallback(
    (key: keyof Value, value: any) => {
      onChange({
        config: {
          options: {
            [key]: value,
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
          <Select
            className="w-100"
            value={style}
            onChange={onKeyChange.bind(null, 'style')}
            options={STYLE_OPTIONS}
          />
        </FullForm>
      </Item>
    </ConfigList>
  );
};

export default BaseConfig;
