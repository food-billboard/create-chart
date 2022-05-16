import { useCallback } from 'react';
import { useControllableValue } from 'ahooks';
import InputNumber from '../InputNumber';
import ConfigList from '../Structure/ConfigList';
import HalfForm from '../Structure/HalfForm';

const { Item } = ConfigList;

// 边距配置

const MarginConfig = (props: {
  value: ComponentData.TComponentMarginConfig;
  onChange: (value: ComponentData.TComponentMarginConfig) => void;
  level?: any;
}) => {
  const { level, value, onChange: propsOnChange } = props;
  const { left, top, right, bottom } = value;

  const onChange = useCallback(
    (key: keyof ComponentData.TComponentMarginConfig, changeValue: any) => {
      propsOnChange({
        ...value,
        [key]: changeValue,
      });
    },
    [value, propsOnChange],
  );

  return (
    <Item label="边距" labelProps={{ level }}>
      <HalfForm label="左">
        <InputNumber value={left} onChange={onChange.bind(null, 'left')} />
      </HalfForm>
      <HalfForm label="右">
        <InputNumber value={right} onChange={onChange.bind(null, 'right')} />
      </HalfForm>
      <HalfForm label="上">
        <InputNumber value={top} onChange={onChange.bind(null, 'top')} />
      </HalfForm>
      <HalfForm label="下">
        <InputNumber value={bottom} onChange={onChange.bind(null, 'bottom')} />
      </HalfForm>
    </Item>
  );
};

export default MarginConfig;
