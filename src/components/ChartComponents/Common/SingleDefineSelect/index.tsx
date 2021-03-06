import {} from 'react';
import { Select } from 'antd';
import { SelectProps } from 'antd/es/select';
import { useControllableValue } from 'ahooks';

const SingleDefineSelect = (props: SelectProps) => {
  const [value, setValue] = useControllableValue(props);

  return (
    <Select
      {...props}
      value={value ? [value] : []}
      className="w-100"
      onChange={(value) => {
        const [target] = value.slice(-1);
        setValue(target || '');
      }}
      mode="tags"
    />
  );
};

export default SingleDefineSelect;
