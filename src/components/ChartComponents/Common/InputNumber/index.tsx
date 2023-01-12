import { useState, useCallback, useEffect, useRef } from 'react';
import { InputNumber as AntInputNumber } from 'antd';
import { InputNumberProps as AntInputNumberProps } from 'antd/es/input-number';
import classnames from 'classnames';
import { useUnmount } from 'ahooks';

export type InputNumberProps = AntInputNumberProps & {
  triggerOnChangeInOnChange?: boolean;
};

const InputNumber = (props: InputNumberProps) => {
  const {
    value,
    defaultValue,
    onChange: propsOnChange,
    onBlur: propsOnBlur,
    triggerOnChangeInOnChange = false,
    className,
    onFocus: propsOnFocus,
  } = props;

  const [stateValue, setStateValue] = useState<number | string>(
    value ?? defaultValue ?? 0,
  );
  const focus = useRef<boolean>(!!props.autoFocus);

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
      focus.current = false;
    },
    [propsOnBlur, propsOnChange, stateValue, value],
  );

  const onFocus = useCallback(
    (e) => {
      propsOnFocus?.(e);
      focus.current = true;
    },
    [propsOnFocus],
  );

  useEffect(() => {
    if (value !== undefined) {
      setStateValue(value as any);
    }
  }, [value]);

  useUnmount(() => {
    if (value !== stateValue && focus.current) propsOnChange?.(stateValue);
  });

  return (
    <AntInputNumber
      {...props}
      className={classnames('w-100', className)}
      onChange={onChange}
      onBlur={onBlur}
      value={stateValue}
      onFocus={onFocus}
    />
  );
};

export default InputNumber;
