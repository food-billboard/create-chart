import { useControllableValue } from 'ahooks';
import { useCallback, useMemo, ReactNode } from 'react';
import ColorSelect from '@/components/ColorSelect';
import InputNumber from '../InputNumber';
import Select from '../Select';
import ConfigList, { TConfigListItemProps } from '../Structure/ConfigList';
import FullForm from '../Structure/FullForm';
import HalfForm from '../Structure/HalfForm';

const { Item } = ConfigList;

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
//     label: '默认',
//     value: 'sans-serif'
//   },
//   {
//     label: '宋体',
//     value: 'SimSun STSong',
//   },
//   {
//     label: '黑体',
//     value: 'SimHei STHeiti',
//   },
//   {
//     label: '楷体',
//     value: 'KaiTi STKaiti',
//   },
//   {
//     label: '仿宋',
//     value: 'FangSong STFangsong',
//   },
// ];

// * 暂时先用这个
// * 待改进
const FONT_TYPE_ENUM = [
  {
    label: 'sans-serif',
    value: 'sans-serif',
  },
  {
    label: 'serif',
    value: 'serif',
  },
  {
    label: 'monospace',
    value: 'monospace',
  },
  {
    label: 'Arial',
    value: 'Arial',
  },
  {
    label: 'Courier New',
    value: 'Courier New',
  },
  {
    label: 'Microsoft YaHei',
    value: 'Microsoft YaHei',
  },
];

const FontConfig = (props: {
  value?: ComponentData.TFontConfig;
  defaultValue?: ComponentData.TFontConfig;
  onChange?: (value: ComponentData.TFontConfig) => void;
  ignore?: (keyof ComponentData.TFontConfig)[];
  children?: ReactNode;
  level?: any;
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
  const { ignore, children, level } = props;

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
          options={FONT_TYPE_ENUM}
        />
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
          options={FONT_WEIGHT_ENUM.map((item) => ({ label: item }))}
        />
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
        <ColorSelect
          defaultValue={color}
          onChange={onChange.bind(null, 'color')}
        />
      </HalfForm>
    );
  }, [ignore, color, onChange]);

  return (
    <Item label="文本" labelProps={{ level }}>
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
  level?: any;
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

  const {
    ignore,
    children,
    level,
    labelProps: perLabelProps = { level: 2 },
  } = props;

  const { fontSize, fontWeight, fontFamily, color } = value || {};

  const labelProps = {
    ...perLabelProps,
    level: level ?? perLabelProps.level,
  };

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
            options={FONT_TYPE_ENUM}
          />
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
            options={FONT_WEIGHT_ENUM.map((item) => ({ label: item }))}
          />
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
          <ColorSelect
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
