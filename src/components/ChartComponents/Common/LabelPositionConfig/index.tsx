import {} from 'react';
import ConfigList from '../Structure/ConfigList';
import FullForm from '../Structure/FullForm';
import RadioGroup, { Radio } from '../IconRadio';
import Icon from '../Icon';

const { Item } = ConfigList;

const LabelPositionConfig = (props: {
  value: ComponentData.ComponentLabelPosition;
  onChange: (value: ComponentData.ComponentLabelPosition) => void;
}) => {
  const { value, onChange } = props;

  return (
    <Item label="位置">
      <FullForm>
        <RadioGroup value={value} onChange={onChange as any}>
          <Radio key="top" value="top" icon={<Icon type="icon-undo" />} />
          <Radio value="bottom" key="bottom" icon={<Icon type="icon-undo" />} />
          <Radio value="right" key="right" icon={<Icon type="icon-undo" />} />
        </RadioGroup>
      </FullForm>
    </Item>
  );
};

export default LabelPositionConfig;
