import Select from '../Select';

const LINE_STYLE_MAP = [
  {
    label: '圆',
    value: 'circle',
  },
  {
    label: '方块',
    value: 'rect',
  },
  {
    label: '圆角方块',
    value: 'roundRect',
  },
  {
    label: '三角',
    value: 'triangle',
  },
  {
    label: '菱形',
    value: 'diamond',
  },
  {
    label: '气球',
    value: 'pin',
  },
  {
    label: '箭头',
    value: 'arrow',
  },
  {
    label: '空',
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
