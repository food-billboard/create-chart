import { useCallback } from 'react';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import InputNumber from '@/components/ChartComponents/Common/InputNumber';
import { TPercentPieConfig } from '../type';

const { Item } = ConfigList;

const AnimationConfig = (props: {
  value: TPercentPieConfig['animation'];
  onChange: ComponentData.ComponentConfigProps<TPercentPieConfig>['onChange'];
}) => {
  const { value, onChange } = props;

  const onKeyChange = useCallback(
    (value: any) => {
      onChange({
        config: {
          options: {
            animation: value,
          },
        },
      });
    },
    [onChange],
  );

  return (
    <ConfigList>
      <Item label="动画时间（毫秒）">
        <InputNumber
          value={value.scrollTimes}
          onChange={(value) => {
            onKeyChange({
              scrollTimes: value,
            });
          }}
        />
      </Item>
    </ConfigList>
  );
};

export default AnimationConfig;
