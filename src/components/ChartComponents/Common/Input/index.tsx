import { useState, useCallback, useEffect } from 'react';
import { Input as AntInput } from 'antd';
import { InputProps } from 'antd/es/input';

const Input = (
  props: InputProps & {
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

  const [stateValue, setStateValue] = useState<any>(
    value ?? defaultValue ?? '',
  );

  const onChange = useCallback(
    (e) => {
      const value = e.target.value;
      setStateValue(value);
      triggerOnChangeInOnChange && propsOnChange?.(value);
    },
    [propsOnChange, triggerOnChangeInOnChange],
  );

  const onBlur = useCallback(
    (e) => {
      if (value !== stateValue) propsOnChange?.(stateValue);
      propsOnBlur?.(e);
    },
    [propsOnBlur, propsOnChange, stateValue, value],
  );

  useEffect(() => {
    if (value !== undefined) {
      setStateValue(value);
    }
  }, [value]);

  return (
    <AntInput
      {...props}
      onChange={onChange}
      onBlur={onBlur}
      value={stateValue}
    />
  );
};

export default Input;
