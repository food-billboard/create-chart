import { InfoCircleOutlined } from '@ant-design/icons';
import { useControllableValue } from 'ahooks';
import { Radio } from 'antd';
import { merge } from 'lodash';
import { useCallback } from 'react';
import ColorSelect from '@/components/ColorSelect';
import IconTooltip from '@/components/IconTooltip';
import { DEFAULT_GRADIENT_COLOR } from '@/utils/constants';
import InputNumber from '../InputNumber';
import ConfigList from '../Structure/ConfigList';
import FullForm from '../Structure/FullForm';
import HalfForm from '../Structure/HalfForm';

const { Item } = ConfigList;

const CommonPlaceholder = () => (
  <IconTooltip title="0-1">
    <InfoCircleOutlined />
  </IconTooltip>
);

const ChartGradientSelect = (props: {
  value?: ComponentData.TGradientColorConfig;
  onChange?: (value: ComponentData.TGradientColorConfig) => void;
  level?: number;
}) => {
  const [value, setValue] =
    useControllableValue<ComponentData.TGradientColorConfig>(props, {
      defaultValue: DEFAULT_GRADIENT_COLOR,
    });

  const { start, end, type, radialPosition, linearPosition } = value;
  const { level = 1 } = props;

  const onChange = useCallback(
    (key: keyof ComponentData.TGradientColorConfig, newValue) => {
      setValue(merge({}, value, { [key]: newValue }));
    },
    [value],
  );

  const labelProps: any = {
    level,
  };

  return (
    <>
      <Item label="颜色类型" labelProps={labelProps}>
        <FullForm>
          <Radio.Group
            value={type}
            onChange={(e) => {
              onChange('type', e.target.value);
            }}
            options={[
              {
                label: '线性渐变',
                value: 'linear',
              },
              {
                label: '径向渐变',
                value: 'radial',
              },
            ]}
          />
        </FullForm>
      </Item>
      <Item label="起始颜色" labelProps={labelProps}>
        <FullForm>
          <ColorSelect value={start} onChange={onChange.bind(null, 'start')} />
        </FullForm>
      </Item>
      <Item label="结束颜色" labelProps={labelProps}>
        <FullForm>
          <ColorSelect value={end} onChange={onChange.bind(null, 'end')} />
        </FullForm>
      </Item>
      {type === 'linear' && (
        <>
          <Item
            label="起始方向坐标"
            placeholder={<CommonPlaceholder />}
            labelProps={labelProps}
          >
            <HalfForm label="x">
              <InputNumber
                value={linearPosition.startX}
                onChange={(value) => {
                  onChange('linearPosition', {
                    startX: value,
                  });
                }}
              />
            </HalfForm>
            <HalfForm label="y">
              <InputNumber
                value={linearPosition.startY}
                onChange={(value) => {
                  onChange('linearPosition', {
                    startY: value,
                  });
                }}
              />
            </HalfForm>
          </Item>
          <Item
            label="结束方向坐标"
            placeholder={<CommonPlaceholder />}
            labelProps={labelProps}
          >
            <HalfForm label="x">
              <InputNumber
                value={linearPosition.endX}
                onChange={(value) => {
                  onChange('linearPosition', {
                    endX: value,
                  });
                }}
              />
            </HalfForm>
            <HalfForm label="y">
              <InputNumber
                value={linearPosition.endY}
                onChange={(value) => {
                  onChange('linearPosition', {
                    endY: value,
                  });
                }}
              />
            </HalfForm>
          </Item>
        </>
      )}
      {type === 'radial' && (
        <>
          <Item
            label="位置"
            placeholder={<CommonPlaceholder />}
            labelProps={labelProps}
          >
            <HalfForm label="x">
              <InputNumber
                value={radialPosition.x}
                onChange={(value) => {
                  onChange('radialPosition', {
                    x: value,
                  });
                }}
              />
            </HalfForm>
            <HalfForm label="y">
              <InputNumber
                value={radialPosition.y}
                onChange={(value) => {
                  onChange('radialPosition', {
                    y: value,
                  });
                }}
              />
            </HalfForm>
          </Item>
          <Item label="大小" labelProps={labelProps}>
            <FullForm>
              <InputNumber
                value={radialPosition.r}
                onChange={(value) => {
                  onChange('radialPosition', {
                    r: value,
                  });
                }}
              />
            </FullForm>
          </Item>
        </>
      )}
    </>
  );
};

export default ChartGradientSelect;
