import { useMemo } from 'react';
import Select from '../Select';
import ConfigList from '../Structure/ConfigList';
import HalfForm from '../Structure/HalfForm';

const { Item } = ConfigList;

export type ValueType = {
  horizontal: 'flex-start' | 'flex-end' | 'center';
  vertical: 'flex-start' | 'flex-end' | 'center';
};

const TextAlignConfig = (props: {
  value: ValueType;
  onChange?: (value: ValueType) => void;
  level?: any;
}) => {
  const { value, onChange, level } = props;

  const options = useMemo(() => {
    return [
      {
        value: 'flex-start',
        label: 'start',
      },
      {
        value: 'center',
        label: 'center',
      },
      {
        value: 'flex-end',
        label: 'end',
      },
    ];
  }, []);

  return (
    <Item label="对齐方式" labelProps={{ level }}>
      <HalfForm label="水平">
        <Select
          value={value.horizontal}
          onChange={(target) => {
            onChange?.({
              ...value,
              horizontal: target,
            });
          }}
          className="w-100"
          options={options}
        />
      </HalfForm>
      <HalfForm label="垂直">
        <Select
          value={value.vertical}
          onChange={(target) => {
            onChange?.({
              ...value,
              vertical: target,
            });
          }}
          options={options}
          className="w-100"
        />
      </HalfForm>
    </Item>
  );
};

export default TextAlignConfig;
