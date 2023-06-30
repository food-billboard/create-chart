import Select from '../../../Select';

const DATASOURCE = [
  {
    value: 'visible',
    label: '显示',
  },
  {
    value: 'hidden',
    label: '隐藏',
  },
];

const InitialStateConfig = (props: {
  value: 'visible' | 'hidden';
  onChange: (value: string) => void;
}) => {
  const { value, onChange } = props;

  return (
    <Select
      className="w-100"
      value={value}
      onChange={onChange}
      options={DATASOURCE}
    />
  );
};

export default InitialStateConfig;
