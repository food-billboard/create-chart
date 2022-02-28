import { BorderTopOutlined, BorderBottomOutlined } from '@ant-design/icons';
import RadioGroup, { Radio } from '../IconRadio';

const XAxisPosition = (props: {
  value: string;
  onChange: (value: string) => void;
}) => {
  const { value, onChange } = props;

  return (
    <RadioGroup onChange={onChange} value={value}>
      <Radio value="top" key="top" icon={<BorderTopOutlined title="上" />} />
      <Radio
        value="bottom"
        key="bottom"
        icon={<BorderBottomOutlined title="下" />}
      />
    </RadioGroup>
  );
};

export default XAxisPosition;
