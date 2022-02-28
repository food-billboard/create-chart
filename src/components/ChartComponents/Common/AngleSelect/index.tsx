import { useCallback } from 'react';
import { InputNumber } from 'antd';

const AngleSelect = (props: {
  value?: number;
  onChange?: (value: number) => void;
}) => {
  const { value, onChange } = props;

  const onBlur = useCallback(
    (e) => {
      const value = e.target.value;
      onChange?.(value);
    },
    [onChange],
  );

  return <InputNumber defaultValue={value} onBlur={onBlur} className="w-100" />;
};

export default AngleSelect;
