import { Select } from 'antd';

const { Option } = Select;

const LINE_STYLE_MAP = [
  {
    key: 'solid',
    value: 'solid',
  },
  {
    key: 'dashed',
    value: 'dashed',
  },
  {
    key: 'dotted',
    value: 'dotted',
  },
];

const LineStyle = (props: {
  value: string;
  onChange: (value: string) => void;
}) => {
  const { value, onChange } = props;

  return (
    <Select value={value} onChange={onChange} className="w-100">
      {LINE_STYLE_MAP.map((item) => {
        const { key, value } = item;
        return (
          <Option key={value} value={value}>
            {key}
          </Option>
        );
      })}
    </Select>
  );
};

export default LineStyle;
