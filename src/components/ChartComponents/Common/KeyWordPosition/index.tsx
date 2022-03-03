import { useMemo, useCallback } from 'react';
import {
  BorderTopOutlined,
  BorderBottomOutlined,
  BorderVerticleOutlined,
  BorderLeftOutlined,
  BorderRightOutlined,
  BorderHorizontalOutlined,
} from '@ant-design/icons';
import ConfigList from '../Structure/ConfigList';
import RadioGroup, { Radio } from '../IconRadio';
import IconTooltip from '@/components/IconTooltip';
import HalfForm from '../Structure/HalfForm';

const { Item } = ConfigList;

const POSITION_VERTICAL_MAP = [
  {
    label: '上',
    value: 'top',
    icon: <BorderTopOutlined />,
  },
  {
    label: '中',
    value: 'center',
    icon: <BorderVerticleOutlined />,
  },
  {
    label: '下',
    value: 'bottom',
    icon: <BorderBottomOutlined />,
  },
];

const POSITION_HORIZONTAL_MAP = [
  {
    label: '左',
    value: 'left',
    icon: <BorderLeftOutlined />,
  },
  {
    label: '中',
    value: 'center',
    icon: <BorderHorizontalOutlined />,
  },
  {
    label: '右',
    value: 'right',
    icon: <BorderRightOutlined />,
  },
];

const LabelPositionConfig = (props: {
  value: ComponentData.KeyWordPositionType;
  onChange: (value: ComponentData.KeyWordPositionType) => void;
}) => {
  const { value, onChange: propsOnChange } = props;
  const { left, top } = value;

  const verticalList = useMemo(() => {
    return POSITION_VERTICAL_MAP.map((item) => {
      const { value, label, icon } = item;
      return (
        <Radio
          key={value}
          value={value}
          icon={<IconTooltip title={label}>{icon}</IconTooltip>}
        />
      );
    });
  }, []);

  const horizontalList = useMemo(() => {
    return POSITION_HORIZONTAL_MAP.map((item) => {
      const { value, label, icon } = item;
      return (
        <Radio
          key={value}
          value={value}
          icon={<IconTooltip title={label}>{icon}</IconTooltip>}
        />
      );
    });
  }, []);

  const onChange = useCallback(
    (key: keyof ComponentData.KeyWordPositionType, newValue: string) => {
      propsOnChange({
        ...value,
        [key]: newValue,
      });
    },
    [propsOnChange, value],
  );

  return (
    <Item label="位置">
      <HalfForm label="水平">
        <RadioGroup onChange={onChange.bind(null, 'left')} value={left}>
          {horizontalList}
        </RadioGroup>
      </HalfForm>
      <HalfForm label="垂直">
        <RadioGroup onChange={onChange.bind(null, 'top')} value={top}>
          {verticalList}
        </RadioGroup>
      </HalfForm>
    </Item>
  );
};

export default LabelPositionConfig;
