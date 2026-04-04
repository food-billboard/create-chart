import { Select as AntSelect } from 'antd';
import type { SelectProps } from 'antd';
import { isEqual } from 'lodash';
import { useCallback, useRef, useState, useEffect } from 'react';

const { OptGroup, Option } = AntSelect;

const Select = (
  props: SelectProps & {
    children?: React.ReactNode;
  },
) => {
  const { value, onChange, onBlur, mode, ...nextProps } = props;

  const [stateValue, setStateValue] = useState<string[]>(value);

  const isFocus = useRef(false);

  const handleBlur = useCallback(
    (e) => {
      if (mode && !isEqual(value, stateValue)) {
        onChange?.(stateValue, { label: '', value: '' });
      }
      onBlur?.(e);
      isFocus.current = false;
    },
    [onChange, stateValue, onBlur, value, mode],
  );

  const handleFocus = useCallback(() => {
    isFocus.current = true;
  }, []);

  // ? 点击tag删除时，只是setState，不会触发onBlur，导致数据不同步
  const handleDeselect = useCallback(
    (value) => {
      // 如果是focus说明是打开面板的操作，可以通过blur处理
      if (isFocus.current) return;
      const templateStateValue = [...stateValue];
      const index = templateStateValue.indexOf(value);
      if (!!~index) templateStateValue.splice(index, 1);
      onChange?.(templateStateValue, { label: '', value: '' });
    },
    [stateValue, onChange],
  );

  const handleChange = useCallback(
    (value) => {
      if (!mode) {
        onChange?.(value, { label: '', value: '' });
      }
      setStateValue(value);
    },
    [onChange],
  );

  useEffect(() => {
    setStateValue(value);
  }, [value]);

  return (
    <AntSelect
      size="small"
      {...nextProps}
      mode={mode}
      value={stateValue}
      onFocus={handleFocus}
      onChange={handleChange}
      onBlur={handleBlur}
      onDeselect={handleDeselect}
    />
  );
};

const Wrapper: typeof Select & {
  Option: typeof Option;
  OptGroup: typeof OptGroup;
} = Select as any;

Wrapper.Option = Option;
Wrapper.OptGroup = OptGroup;

export default Wrapper;
