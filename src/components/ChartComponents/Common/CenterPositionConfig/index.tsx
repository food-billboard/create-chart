import { useCallback, ReactNode } from 'react';
import ConfigList from '../Structure/ConfigList';
import HalfForm from '../Structure/HalfForm';
import InputNumber from '../InputNumber';

const { Item } = ConfigList;

export type PositionValue = {
  left: number;
  top: number;
};

export type CenterPositionConfigProps = {
  value: PositionValue;
  onChange: (value: PositionValue) => void;
  parentLabel?: ReactNode;
  subLabel?: [ReactNode, ReactNode];
  level?: any;
};

const CenterPositionConfig = (props: CenterPositionConfigProps) => {
  const { value, onChange, parentLabel, subLabel, level } = props;
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
    <Item
      label={parentLabel || '位置'}
      labelProps={{
        level,
      }}
    >
      <HalfForm label={subLabel?.[0] || '左'}>
        <InputNumber value={left} onChange={onKeyChange.bind(null, 'left')} />
      </HalfForm>
      <HalfForm label={subLabel?.[1] || '上'}>
        <InputNumber value={top} onChange={onKeyChange.bind(null, 'top')} />
      </HalfForm>
    </Item>
  );
};

export default CenterPositionConfig;
