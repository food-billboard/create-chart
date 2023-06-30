import Select from '../Select';

const { Option } = Select;

const LINE_STYLE_MAP = [
  {
    label: 'solid',
    value: 'solid',
  },
  {
    label: 'dashed',
    value: 'dashed',
  },
  {
    label: 'dotted',
    value: 'dotted',
  },
];

const LineStyle = (props: {
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

export default LineStyle;
