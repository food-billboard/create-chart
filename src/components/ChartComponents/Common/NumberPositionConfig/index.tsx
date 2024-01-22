import { InputNumber as AntInputNumber, Switch } from 'antd';
import { useCallback, useMemo, useState, useEffect } from 'react';
import ConfigList from '../Structure/ConfigList';
import FullForm from '../Structure/FullForm';

const { Item } = ConfigList;

export type PositionValue = {
  left: number | 'auto';
  right: number | 'auto';
  bottom: number | 'auto';
  top: number | 'auto';
};

export const InputNumber = (props: {
  value: number | 'auto';
  onChange: (value: number | 'auto') => void;
  defaultValue?: number;
}) => {
  const { value, onChange, defaultValue = 0 } = props;

  const [stateValue, setStateValue] = useState<number>(
    value === 'auto' ? defaultValue : value,
  );

  const disabled = useMemo(() => {
    return value === 'auto';
  }, [value]);

  const onBlur = useCallback(
    (e) => {
      const value = e.target.value;
      onChange(value);
    },
    [onChange],
  );

  const onSwitchChange = useCallback(
    (value) => {
      onChange(value ? 'auto' : stateValue);
    },
    [onChange, stateValue],
  );

  useEffect(() => {
    setStateValue(value === 'auto' ? 0 : value);
  }, [value]);

  return (
    <AntInputNumber
      onBlur={onBlur}
      onChange={setStateValue as any}
      value={stateValue}
      addonAfter={<Switch checked={disabled} onChange={onSwitchChange} />}
      disabled={disabled}
    />
  );
};

const NumberPositionConfig = (props: {
  value: PositionValue;
  onChange: (value: PositionValue) => void;
  level?: any;
}) => {
  const { value, onChange, level } = props;
  const { left, top, right, bottom } = value;

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
      label="位置"
      labelProps={{
        level,
      }}
    >
      <FullForm label="上">
        <InputNumber value={top} onChange={onKeyChange.bind(null, 'top')} />
      </FullForm>
      <FullForm label="右">
        <InputNumber value={right} onChange={onKeyChange.bind(null, 'right')} />
      </FullForm>
      <FullForm label="下">
        <InputNumber
          value={bottom}
          onChange={onKeyChange.bind(null, 'bottom')}
        />
      </FullForm>
      <FullForm label="左">
        <InputNumber value={left} onChange={onKeyChange.bind(null, 'left')} />
      </FullForm>
    </Item>
  );
};

export default NumberPositionConfig;
