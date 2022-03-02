import React, { useCallback } from 'react';
import { Select } from 'antd';
import { useControllableValue } from 'ahooks';
import { CompatColorSelect } from '@/components/ColorSelect';
import ConfigList, { TConfigListItemProps } from '../Structure/ConfigList';
import HalfForm from '../Structure/HalfForm';
import Collapse from '../Collapse';
import FullForm from '../Structure/FullForm';
import InputNumber from '../InputNumber';

const { Item } = ConfigList;
const { Option } = Select;
const { Panel } = Collapse;

// 文字配置

const FONT_WEIGHT_ENUM = [
  'normal',
  'bold',
  'bolder',
  'lighter',
  '100',
  '200',
  '300',
  '400',
  '500',
  '600',
  '700',
  '800',
];

const FONT_TYPE_ENUM = [
  {
    key: '1',
    value: '1',
  },
];

const FontConfig = (props: {
  value?: ComponentData.TFontConfig;
  defaultValue?: ComponentData.TFontConfig;
  onChange?: (value: ComponentData.TFontConfig) => void;
}) => {
  const [value, setValue] = useControllableValue<ComponentData.TFontConfig>(
    props,
    {
      defaultValue: {
        fontSize: 12,
        fontWeight: 'normal',
        fontFamily: '',
        color: {
          r: 0,
          g: 0,
          b: 0,
        },
      },
    },
  );

  const { fontSize, fontWeight, fontFamily, color } = value;

  const onChange = useCallback(
    (key: keyof ComponentData.TFontConfig, changeValue: any) => {
      setValue({
        ...value,
        [key]: changeValue,
      });
    },
    [value],
  );

  return (
    <Item label="文本">
      <HalfForm label="字体">
        <Select
          defaultValue={fontFamily}
          onBlur={onChange.bind(null, 'fontFamily')}
          className="w-100"
        >
          {FONT_TYPE_ENUM.map((item) => {
            const { key, value } = item;
            return (
              <Option key={value} value={value}>
                {key}
              </Option>
            );
          })}
        </Select>
      </HalfForm>
      <HalfForm label="文字粗细">
        <Select
          defaultValue={fontWeight}
          onBlur={onChange.bind(null, 'fontWeight')}
          className="w-100"
        >
          {FONT_WEIGHT_ENUM.map((item) => {
            return (
              <Option key={item} value={item}>
                {item}
              </Option>
            );
          })}
        </Select>
      </HalfForm>
      <HalfForm label="字号">
        <InputNumber
          value={fontSize}
          onChange={onChange.bind(null, 'fontSize')}
          className="w-100"
        />
      </HalfForm>
      <HalfForm label="颜色">
        <CompatColorSelect
          defaultValue={color}
          onChange={onChange.bind(null, 'color')}
        />
      </HalfForm>
    </Item>
  );
};

export const FontConfigList = (props: {
  value?: ComponentData.TFontConfig;
  defaultValue?: ComponentData.TFontConfig;
  onChange?: (value: ComponentData.TFontConfig) => void;
  labelProps?: TConfigListItemProps['labelProps'];
}) => {
  const [value, setValue] = useControllableValue<ComponentData.TFontConfig>(
    props,
    {
      defaultValue: {
        fontSize: 12,
        fontWeight: 'normal',
        fontFamily: '',
        color: {
          r: 0,
          g: 0,
          b: 0,
        },
      },
    },
  );

  const { fontSize, fontWeight, fontFamily, color } = value;

  const { labelProps = { level: 2 } } = props;

  const onChange = useCallback(
    (key: keyof ComponentData.TFontConfig, changeValue: any) => {
      setValue({
        ...value,
        [key]: changeValue,
      });
    },
    [value],
  );

  return (
    <>
      <Item label="字体" labelProps={labelProps}>
        <FullForm>
          <Select
            defaultValue={fontFamily}
            onBlur={onChange.bind(null, 'fontFamily')}
            className="w-100"
          >
            {FONT_TYPE_ENUM.map((item) => {
              const { key, value } = item;
              return (
                <Option key={value} value={value}>
                  {key}
                </Option>
              );
            })}
          </Select>
        </FullForm>
      </Item>
      <Item label="文字粗细" labelProps={labelProps}>
        <FullForm>
          <Select
            defaultValue={fontWeight}
            onBlur={onChange.bind(null, 'fontWeight')}
            className="w-100"
          >
            {FONT_WEIGHT_ENUM.map((item) => {
              return (
                <Option key={item} value={item}>
                  {item}
                </Option>
              );
            })}
          </Select>
        </FullForm>
      </Item>
      <Item label="字号" labelProps={labelProps}>
        <FullForm>
          <InputNumber
            value={fontSize}
            onChange={onChange.bind(null, 'fontSize')}
            className="w-100"
          />
        </FullForm>
      </Item>
      <Item label="颜色" labelProps={labelProps}>
        <FullForm>
          <CompatColorSelect
            defaultValue={color}
            onChange={onChange.bind(null, 'color')}
          />
        </FullForm>
      </Item>
    </>
  );
};

export default FontConfig;
