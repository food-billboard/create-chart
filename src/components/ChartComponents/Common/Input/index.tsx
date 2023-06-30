import { useState, useCallback, useEffect, useRef } from 'react';
import { Input as AntInput } from 'antd';
import { InputProps } from 'antd/es/input';
import { useUnmount } from 'ahooks';
import { Validator, useValidatorChange } from '@/hooks';
import FormModal from '../FormModal';

type Props = InputProps & {
  triggerOnChangeInOnChange?: boolean;
  validator?: Validator[];
};

const Input = (props: Props) => {
  const {
    triggerOnChangeInOnChange = false,
    validator = [],
    ...nextProps
  } = props;
  const {
    value,
    defaultValue,
    onChange: propsOnChange,
    onBlur: propsOnBlur,
    onFocus: propsOnFocus,
  } = nextProps;

  const [stateValue, setStateValue] = useState<any>(value ?? defaultValue);
  const focus = useRef<boolean>(!!props.autoFocus);

  const onChange = useCallback(
    (e) => {
      const value = e.target.value;
      setStateValue(value);
      triggerOnChangeInOnChange && propsOnChange?.(value);
    },
    [propsOnChange, triggerOnChangeInOnChange],
  );

  const { validator: validatorValue } = useValidatorChange(onChange);

  const onBlur = useCallback(
    (e) => {
      const realValue = validatorValue(value, '', validator);
      if (realValue !== stateValue) propsOnChange?.(stateValue);
      propsOnBlur?.(e);
      focus.current = false;
    },
    [propsOnBlur, propsOnChange, stateValue, value, validator],
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
      setStateValue(value);
    }
  }, [value]);

  useUnmount(() => {
    if (value != stateValue && focus.current) propsOnChange?.(stateValue);
  });

  return (
    <AntInput
      {...nextProps}
      onFocus={onFocus}
      onChange={onChange}
      onBlur={onBlur}
      value={stateValue}
    />
  );
};

export const InputModal = FormModal<Props>(Input);

export default Input;
