import { useCallback, useMemo, ReactNode } from 'react';
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

// const FONT_TYPE_ENUM = [
//   {
//     key: '默认',
//     value: 'sans-serif'
//   },
//   {
//     key: '宋体',
//     value: 'SimSun STSong',
//   },
//   {
//     key: '黑体',
//     value: 'SimHei STHeiti',
//   },
//   {
//     key: '楷体',
//     value: 'KaiTi STKaiti',
//   },
//   {
//     key: '仿宋',
//     value: 'FangSong STFangsong',
//   },
// ];

// * 暂时先用这个
// * 待改进
const FONT_TYPE_ENUM = [
  {
    key: 'sans-serif',
    value: 'sans-serif',
  },
  {
    key: 'serif',
    value: 'serif',
  },
  {
    key: 'monospace',
    value: 'monospace',
  },
  {
    key: 'Arial',
    value: 'Arial',
  },
  {
    key: 'Courier New',
    value: 'Courier New',
  },
  {
    key: 'Microsoft YaHei',
    value: 'Microsoft YaHei',
  },
];

const FontConfig = (props: {
  value?: ComponentData.TFontConfig;
  defaultValue?: ComponentData.TFontConfig;
  onChange?: (value: ComponentData.TFontConfig) => void;
  ignore?: (keyof ComponentData.TFontConfig)[];
  children?: ReactNode;
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
  const { ignore, children } = props;

  const { fontSize, fontWeight, fontFamily, color } = value || {};

  const onChange = useCallback(
    (key: keyof ComponentData.TFontConfig, changeValue: any) => {
      let realValue = changeValue;
      try {
        realValue = changeValue.target.value;
      } catch (err) {}
      setValue({
        ...value,
        [key]: realValue,
      });
    },
    [value],
  );

  const fontFamilyConfig = useMemo(() => {
    if (ignore?.includes('fontFamily')) return null;
    return (
      <HalfForm label="字体">
        <Select
          defaultValue={fontFamily}
          onChange={onChange.bind(null, 'fontFamily')}
          className="w-100"
          allowClear
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
    );
  }, [ignore, fontFamily, onChange]);

  const fontWeightConfig = useMemo(() => {
    if (ignore?.includes('fontWeight')) return null;
    return (
      <HalfForm label="文字粗细">
        <Select
          defaultValue={fontWeight}
          onChange={onChange.bind(null, 'fontWeight')}
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
    );
  }, [ignore, fontWeight, onChange]);

  const fontSizeConfig = useMemo(() => {
    if (ignore?.includes('fontSize')) return null;
    return (
      <HalfForm label="字号">
        <InputNumber
          value={fontSize}
          onChange={onChange.bind(null, 'fontSize')}
          className="w-100"
        />
      </HalfForm>
    );
  }, [ignore, fontSize, onChange]);

  const colorConfig = useMemo(() => {
    if (ignore?.includes('color')) return null;
    return (
      <HalfForm label="颜色">
        <CompatColorSelect
          defaultValue={color}
          onChange={onChange.bind(null, 'color')}
        />
      </HalfForm>
    );
  }, [ignore, color, onChange]);

  return (
    <Item label="文本">
      {fontFamilyConfig}
      {fontWeightConfig}
      {fontSizeConfig}
      {colorConfig}
      {children}
    </Item>
  );
};

export const FontConfigList = (props: {
  value?: ComponentData.TFontConfig;
  defaultValue?: ComponentData.TFontConfig;
  onChange?: (value: ComponentData.TFontConfig) => void;
  labelProps?: TConfigListItemProps['labelProps'];
  ignore?: (keyof ComponentData.TFontConfig)[];
  children?: ReactNode;
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

  const { ignore, children } = props;

  const { fontSize, fontWeight, fontFamily, color } = value || {};

  const { labelProps = { level: 2 } } = props;

  const onChange = useCallback(
    (key: keyof ComponentData.TFontConfig, changeValue: any) => {
      let realValue = changeValue;
      try {
        realValue = changeValue.target.value;
      } catch (err) {}
      setValue({
        ...value,
        [key]: realValue,
      });
    },
    [value],
  );

  const fontFamilyConfig = useMemo(() => {
    if (ignore?.includes('fontFamily')) return null;
    return (
      <Item label="字体" labelProps={labelProps}>
        <FullForm>
          <Select
            defaultValue={fontFamily}
            onChange={onChange.bind(null, 'fontFamily')}
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
    );
  }, [ignore, fontFamily, onChange]);

  const fontWeightConfig = useMemo(() => {
    if (ignore?.includes('fontWeight')) return null;
    return (
      <Item label="文字粗细" labelProps={labelProps}>
        <FullForm>
          <Select
            defaultValue={fontWeight}
            onChange={onChange.bind(null, 'fontWeight')}
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
    );
  }, [ignore, fontWeight, onChange]);

  const fontSizeConfig = useMemo(() => {
    if (ignore?.includes('fontSize')) return null;
    return (
      <Item label="字号" labelProps={labelProps}>
        <FullForm>
          <InputNumber
            value={fontSize}
            onChange={onChange.bind(null, 'fontSize')}
            className="w-100"
          />
        </FullForm>
      </Item>
    );
  }, [ignore, fontSize, onChange]);

  const colorConfig = useMemo(() => {
    if (ignore?.includes('color')) return null;
    return (
      <Item label="颜色" labelProps={labelProps}>
        <FullForm>
          <CompatColorSelect
            defaultValue={color}
            onChange={onChange.bind(null, 'color')}
          />
        </FullForm>
      </Item>
    );
  }, [ignore, color, onChange]);

  return (
    <>
      {fontFamilyConfig}
      {fontWeightConfig}
      {fontSizeConfig}
      {colorConfig}
      {children}
    </>
  );
};

export default FontConfig;
