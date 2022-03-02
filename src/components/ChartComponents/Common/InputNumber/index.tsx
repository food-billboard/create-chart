import { useState, useCallback, useEffect } from 'react';
import { InputNumber as AntInputNumber } from 'antd';
import { InputNumberProps } from 'antd/es/input-number';

const InputNumber = (
  props: InputNumberProps & {
    triggerOnChangeInOnChange?: boolean;
  },
) => {
  const {
    value,
    defaultValue,
    onChange: propsOnChange,
    onBlur: propsOnBlur,
    triggerOnChangeInOnChange = false,
  } = props;

  const [stateValue, setStateValue] = useState<number | string>(
    value ?? defaultValue ?? 0,
  );

  const onChange = useCallback(
    (value) => {
      setStateValue(value);
      triggerOnChangeInOnChange && propsOnChange?.(value);
    },
    [propsOnChange, triggerOnChangeInOnChange],
  );

  const onBlur = useCallback(
    (e) => {
      propsOnChange?.(stateValue);
      propsOnBlur?.(e);
    },
    [propsOnBlur, propsOnChange, stateValue],
  );

  useEffect(() => {
    if (value !== undefined) {
      setStateValue(value);
    }
  }, [value]);

  return (
    <AntInputNumber
      {...props}
      onChange={onChange}
      onBlur={onBlur}
      value={stateValue}
    />
  );
};

export default InputNumber;
