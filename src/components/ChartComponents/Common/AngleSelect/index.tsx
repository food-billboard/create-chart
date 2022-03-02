import InputNumber from '../InputNumber';

const AngleSelect = (props: {
  value?: number;
  onChange?: (value: number | string) => void;
}) => {
  const { value, onChange } = props;

  return <InputNumber value={value} onChange={onChange} className="w-100" />;
};

export default AngleSelect;
