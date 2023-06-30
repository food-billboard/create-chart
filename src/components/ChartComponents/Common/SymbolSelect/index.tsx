import Select from '../Select';

const { Option } = Select;

const LINE_STYLE_MAP = [
  {
    label: 'circle',
    value: 'circle',
  },
  {
    label: 'rect',
    value: 'rect',
  },
  {
    label: 'roundRect',
    value: 'roundRect',
  },
  {
    label: 'triangle',
    value: 'triangle',
  },
  {
    label: 'diamond',
    value: 'diamond',
  },
  {
    label: 'pin',
    value: 'pin',
  },
  {
    label: 'arrow',
    value: 'arrow',
  },
  {
    label: 'none',
    value: 'none',
  },
];

const SymbolSelect = (props: {
  value: string;
  onChange: (value: string) => void;
}) => {
  const { value, onChange } = props;

  return (
    <Select
      value={value}
      onChange={onChange}
      className="w-100"
      options={LINE_STYLE_MAP}
    />
  );
};

export default SymbolSelect;
