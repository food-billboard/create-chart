import { useCallback } from 'react';
import {} from 'antd';
import ConfigList from '../Structure/ConfigList';
import HalfForm from '../Structure/HalfForm';
import InputNumber from '../InputNumber';

const { Item } = ConfigList;

export type PositionValue = {
  left: number;
  top: number;
};

const CenterPositionConfig = (props: {
  value: PositionValue;
  onChange: (value: PositionValue) => void;
}) => {
  const { value, onChange } = props;
  const { left, top } = value;

  const onKeyChange = useCallback(
    (key: keyof PositionValue, newValue: any) => {
      onChange({
        ...value,
        [key]: newValue,
      });
    },
    [onChange, value],
  );

  return (
    <Item label="位置">
      <HalfForm label="左">
        <InputNumber value={left} onChange={onKeyChange.bind(null, 'left')} />
      </HalfForm>
      <HalfForm label="上">
        <InputNumber value={top} onChange={onKeyChange.bind(null, 'top')} />
      </HalfForm>
    </Item>
  );
};

export default CenterPositionConfig;
