import RadioGroup, { Radio } from '../IconRadio';
import Icon from '../Icon';

const OrientSelect = (props: {
  value: string;
  onChange: (value: string) => void;
}) => {
  const { value, onChange } = props;

  return (
    <RadioGroup onChange={onChange} value={value}>
      <Radio
        value="vertical"
        key="vertical"
        icon={<Icon type="icon-grip-vertical" />}
      />
      <Radio
        value="horizontal"
        key="horizontal"
        icon={<Icon type="icon-grip-horizontal" />}
      />
    </RadioGroup>
  );
};

export default OrientSelect;
