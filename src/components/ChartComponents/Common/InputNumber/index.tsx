import { useState, useCallback, useEffect } from 'react';
import { InputNumber as AntInputNumber } from 'antd';
import { InputNumberProps } from 'antd/es/input-number';
import classnames from 'classnames';

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
    className,
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
    <AntInputNumber
      {...props}
      className={classnames('w-100', className)}
      onChange={onChange}
      onBlur={onBlur}
      value={stateValue}
    />
  );
};

export default InputNumber;
