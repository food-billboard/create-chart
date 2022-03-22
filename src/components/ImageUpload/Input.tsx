import { useState, useImperativeHandle, useCallback, forwardRef } from 'react';
import { Input as AntInput } from 'antd';
import { InputProps } from 'antd/es/input';

export type InputRef = {
  setValue: (value: string) => void;
  getValue: () => string;
};

const Input = forwardRef<InputRef, InputProps>((props, ref) => {
  const { onChange: propsOnChange, onBlur: propsOnBlur } = props;

  const [value, setValue] = useState<string>(
    (props.defaultValue as string) || '',
  );

  const onChange = useCallback(
    (e) => {
      const newValue = e.target.value;
      setValue(newValue);
      propsOnChange?.(e);
    },
    [propsOnChange],
  );

  const onBlur = useCallback(
    (e) => {
      propsOnBlur?.(e);
    },
    [propsOnBlur],
  );

  useImperativeHandle(
    ref,
    () => {
      return {
        setValue,
        getValue: () => value,
      };
    },
    [value],
  );

  return (
    <AntInput {...props} onChange={onChange} onBlur={onBlur} value={value} />
  );
});

export default Input;
