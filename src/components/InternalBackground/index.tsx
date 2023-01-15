import { Select } from 'antd';
import { useControllableValue } from 'ahooks';
import BackgroundMap from './components/Background';

export { default as BackgroundMap } from './components/Background';

export const InternalBackgroundSelect = (props: {
  value?: string;
  onChange?: (value: string) => void;
}) => {
  const [value, onChange] = useControllableValue(props);

  return (
    <Select
      className="w-100"
      value={value}
      onChange={onChange}
      options={Object.entries(BackgroundMap).map((item) => {
        const [key, { title }] = item;
        return {
          label: title,
          value: key,
        };
      })}
    />
  );
};
