import {} from 'react';
import { Select } from 'antd';
import { useControllableValue } from 'ahooks';
import BorderMap from './components/Border';

export { default as BorderMap } from './components/Border';

export const InternalBorderSelect = (props: {
  value?: string;
  onChange?: (value: string) => void;
}) => {
  const [value, onChange] = useControllableValue(props);

  return (
    <Select
      className="w-100"
      value={value}
      onChange={onChange}
      options={Object.entries(BorderMap).map((item) => {
        const [key, { title }] = item;
        return {
          label: title,
          value: key,
        };
      })}
    />
  );
};
