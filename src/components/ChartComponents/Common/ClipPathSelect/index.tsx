import { Select } from 'antd';
import { PathStyleMap } from '@/hooks/useClipPath';
import ConfigList from '../Structure/ConfigList';
import FullForm from '../Structure/FullForm';

const { Item } = ConfigList;

const options = Object.entries(PathStyleMap).map((item) => {
  const [value, { label }] = item;
  return {
    value,
    label,
  };
});

const ClipPathSelect = (props: {
  value?: keyof typeof PathStyleMap;
  onChange?: (value: any) => void;
  level?: any;
}) => {
  const { level, ...nextProps } = props;

  return (
    <Item
      label="外框形状"
      labelProps={{
        level,
      }}
    >
      <FullForm>
        <Select className="w-100" options={options} {...nextProps} />
      </FullForm>
    </Item>
  );
};

export default ClipPathSelect;
