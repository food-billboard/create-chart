import { Select } from 'antd';

const { Option } = Select;

const LINE_STYLE_MAP = [
  {
    key: 'circle',
    value: 'circle',
  },
  {
    key: 'rect',
    value: 'rect',
  },
  {
    key: 'roundRect',
    value: 'roundRect',
  },
  {
    key: 'triangle',
    value: 'triangle',
  },
  {
    key: 'diamond',
    value: 'diamond',
  },
  {
    key: 'pin',
    value: 'pin',
  },
  {
    key: 'arrow',
    value: 'arrow',
  },
  {
    key: 'none',
    value: 'none',
  },
];

const SymbolSelect = (props: {
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

export default SymbolSelect;
