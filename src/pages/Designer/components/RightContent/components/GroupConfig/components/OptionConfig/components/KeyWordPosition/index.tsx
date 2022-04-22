import { useMemo, useCallback } from 'react';
import {
  BorderTopOutlined,
  BorderBottomOutlined,
  BorderVerticleOutlined,
  BorderLeftOutlined,
  BorderRightOutlined,
  BorderHorizontalOutlined,
} from '@ant-design/icons';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import RadioGroup, {
  Radio,
} from '@/components/ChartComponents/Common/IconRadio';
import IconTooltip from '@/components/IconTooltip';
import HalfForm from '@/components/ChartComponents/Common/Structure/HalfForm';

const { Item } = ConfigList;

const POSITION_VERTICAL_MAP = [
  {
    label: '顶对齐',
    value: 'top',
    icon: <BorderTopOutlined />,
  },
  {
    label: '垂直居中',
    value: 'center',
    icon: <BorderVerticleOutlined />,
  },
  {
    label: '底对齐',
    value: 'bottom',
    icon: <BorderBottomOutlined />,
  },
];

const POSITION_HORIZONTAL_MAP = [
  {
    label: '左对齐',
    value: 'left',
    icon: <BorderLeftOutlined />,
  },
  {
    label: '水平居中',
    value: 'center',
    icon: <BorderHorizontalOutlined />,
  },
  {
    label: '右对齐',
    value: 'right',
    icon: <BorderRightOutlined />,
  },
];

const LabelPositionConfig = (props: {
  onChange: (value: Partial<ComponentData.KeyWordPositionType>) => void;
}) => {
  const { onChange: propsOnChange } = props;

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
    (key: string, newValue: string) => {
      propsOnChange({
        [key]: newValue,
      });
    },
    [propsOnChange],
  );

  return (
    <Item label="布局">
      <HalfForm label="水平">
        <RadioGroup onChange={onChange.bind(null, 'left')}>
          {horizontalList}
        </RadioGroup>
      </HalfForm>
      <HalfForm label="垂直">
        <RadioGroup onChange={onChange.bind(null, 'top')}>
          {verticalList}
        </RadioGroup>
      </HalfForm>
    </Item>
  );
};

export default LabelPositionConfig;
