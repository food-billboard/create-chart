import { BorderLeftOutlined, BorderRightOutlined } from '@ant-design/icons';
import RadioGroup, { Radio } from '../IconRadio';

const YAxisPosition = (props: {
  value: string;
  onChange: (value: string) => void;
}) => {
  const { value, onChange } = props;

  return (
    <RadioGroup onChange={onChange} value={value}>
      <Radio value="left" key="left" icon={<BorderLeftOutlined title="左" />} />
      <Radio
        value="right"
        key="right"
        icon={<BorderRightOutlined title="右" />}
      />
    </RadioGroup>
  );
};

export default YAxisPosition;
