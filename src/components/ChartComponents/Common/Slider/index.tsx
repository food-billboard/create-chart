import { useState, useCallback, useEffect } from 'react';
import { Slider as AntSlider } from 'antd';
import { SliderSingleProps } from 'antd/es/slider';

const Slider = (
  props: SliderSingleProps & {
    triggerOnChangeInOnChange?: boolean;
  },
) => {
  const {
    value,
    defaultValue,
    onChange: propsOnChange,
    onAfterChange: propsOnAfterChange,
    triggerOnChangeInOnChange = false,
  } = props;

  const [stateValue, setStateValue] = useState<number>(
    value ?? defaultValue ?? 0,
  );

  const onChange = useCallback(
    (value) => {
      setStateValue(value);
      triggerOnChangeInOnChange && propsOnChange?.(value);
    },
    [propsOnChange, triggerOnChangeInOnChange],
  );

  const onAfterChange = useCallback(
    (e) => {
      propsOnChange?.(stateValue);
      propsOnAfterChange?.(e);
    },
    [propsOnAfterChange, propsOnChange, stateValue],
  );

  useEffect(() => {
    if (value !== undefined) {
      setStateValue(value);
    }
  }, [value]);

  return (
    <AntSlider
      {...props}
      value={stateValue}
      onChange={onChange}
      onAfterChange={onAfterChange}
    />
  );
};

export default Slider;
