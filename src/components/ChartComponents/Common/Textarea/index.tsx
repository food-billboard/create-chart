import { useUnmount } from 'ahooks';
import { Input as AntInput } from 'antd';
import { TextAreaProps } from 'antd/es/input';
import { useState, useCallback, useEffect, useRef } from 'react';
import { Validator, useValidatorChange } from '@/hooks';
import FormModal from '../FormModal';

export type Props = TextAreaProps & {
  triggerOnChangeInOnChange?: boolean;
  validator?: Validator[];
};

const Textarea = (props: Props) => {
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
    <AntInput.TextArea
      rows={3}
      {...nextProps}
      onChange={onChange}
      onBlur={onBlur}
      value={stateValue}
      onFocus={onFocus}
    />
  );
};

export const TextareaModal = FormModal<Props>(Textarea);

export default Textarea;
