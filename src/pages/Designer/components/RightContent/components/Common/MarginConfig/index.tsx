import { useCallback } from 'react';
import { InputNumber } from 'antd';
import { useControllableValue } from 'ahooks';
import ConfigList from '../Structure/ConfigList';
import HalfForm from '../Structure/HalfForm';

const { Item } = ConfigList;

// 边距配置

const MarginConfig = (props: {
  value?: ComponentData.TComponentMarginConfig;
  defaultValue?: ComponentData.TComponentMarginConfig;
  onChange?: (value: ComponentData.TComponentMarginConfig) => void;
}) => {
  const [value, setValue] =
    useControllableValue<ComponentData.TComponentMarginConfig>(props, {
      defaultValue: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
    });

  const { left, top, right, bottom } = value;

  const onChange = useCallback(
    (key: keyof ComponentData.TComponentMarginConfig, changeValue: any) => {
      setValue({
        ...value,
        [key]: changeValue,
      });
    },
    [value],
  );

  return (
    <Item label="边距">
      <HalfForm label="左">
        <InputNumber
          defaultValue={left}
          onBlur={onChange.bind(null, 'left')}
          className="w-100"
        />
      </HalfForm>
      <HalfForm label="右">
        <InputNumber
          defaultValue={right}
          onBlur={onChange.bind(null, 'right')}
          className="w-100"
        />
      </HalfForm>
      <HalfForm label="上">
        <InputNumber
          defaultValue={top}
          onBlur={onChange.bind(null, 'top')}
          className="w-100"
        />
      </HalfForm>
      <HalfForm label="下">
        <InputNumber
          defaultValue={bottom}
          onBlur={onChange.bind(null, 'bottom')}
          className="w-100"
        />
      </HalfForm>
    </Item>
  );
};

export default MarginConfig;
