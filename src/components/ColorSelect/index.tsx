import { useControllableValue, useUpdateEffect, useUnmount } from 'ahooks';
import { Input, InputNumber, ColorPicker } from 'antd';
import type { ColorPickerProps } from 'antd';
import type { Color } from 'antd/es/color-picker/color';
import color from 'color';
import { merge, isEqual } from 'lodash';
import {
  useCallback,
  useEffect,
  useState,
  CSSProperties,
  useMemo,
} from 'react';
import { useColorThemeList } from '@/hooks';
import { getRgbaString, getHexString, getOpacity } from '@/utils/Assist/Theme';
import { DEFAULT_COLOR } from '@/utils/constants';

const DEFAULT_PRESET_COLOR_LIST = [
  '#D0021B',
  '#F5A623',
  '#F8E71C',
  '#8B572A',
  '#7ED321',
  '#417505',
  '#BD10E0',
  '#9013FE',
  '#4A90E2',
  '#50E3C2',
  '#B8E986',
  '#000000',
  '#4A4A4A',
  '#9B9B9B',
  '#FFFFFF',
];

// * 颜色选择组件

type TColorSelectProps = Partial<
  Omit<ColorPickerProps, 'value' | 'onChange' | 'defaultValue'>
> & {
  value?: ComponentData.TColorConfig;
  defaultValue?: ComponentData.TColorConfig;
  onChange?: (color: ComponentData.TColorConfig) => void;
  closeOnChangeComplete?: boolean;
};

const ColorSelect = (props: TColorSelectProps) => {
  const {
    value,
    onChange,
    defaultValue,
    closeOnChangeComplete = false,
    ...nextProps
  } = props;

  const [stateValue, setStateValue] =
    useControllableValue<ComponentData.TColorConfig>(props, {
      defaultValue: DEFAULT_COLOR,
    });

  const [open, onOpenChange] = useControllableValue(props, {
    trigger: 'onOpenChange',
    valuePropName: 'open',
    defaultValuePropName: 'defaultOpen',
    defaultValue: false,
  });

  const colorThemeList = useColorThemeList();

  const presetColorList = useMemo(() => {
    return [
      {
        label: '推荐颜色',
        colors: [
          ...colorThemeList,
          ...DEFAULT_PRESET_COLOR_LIST.filter(
            (item) => !colorThemeList.includes(item),
          ),
        ],
      },
    ];
  }, [colorThemeList]);

  const colorValue = useMemo(() => {
    return getRgbaString(stateValue);
  }, [stateValue]);

  const onInternalChange = useCallback(
    (value: Color) => {
      const rgb = value.toRgb();
      setStateValue(rgb);
      if (closeOnChangeComplete) onOpenChange(false);
    },
    [closeOnChangeComplete],
  );

  useUnmount(() => {
    if (!isEqual(value, stateValue)) onChange?.(stateValue);
  });

  return (
    <ColorPicker
      showText
      {...nextProps}
      presets={presetColorList}
      value={colorValue}
      onChangeComplete={onInternalChange}
      open={open}
      onOpenChange={(open) => {
        onOpenChange(open);
      }}
    />
  );
};

const WrapperColorSelect: typeof ColorSelect & {
  getOpacity: (color: ComponentData.TColorConfig) => number;
  getRgbaString: (color: ComponentData.TColorConfig) => string;
  getHexString: (color: ComponentData.TColorConfig, prefix?: boolean) => string;
} = ColorSelect as any;

WrapperColorSelect.getRgbaString = getRgbaString;

WrapperColorSelect.getHexString = getHexString;

WrapperColorSelect.getOpacity = getOpacity;

export const CompatColorSelect = (
  props: TColorSelectProps & { ignoreAlpha?: boolean; style?: CSSProperties },
) => {
  const {
    value: propsValue,
    defaultValue: propsDefaultValue,
    ignoreAlpha = false,
    style,
    children,
  } = props;
  const [value, onChange] = useControllableValue<ComponentData.TColorConfig>(
    props,
    {
      defaultValue: DEFAULT_COLOR,
    },
  );

  // 输入框颜色
  const [inputColor, setInputColor] = useState<string>(
    getHexString(value!, false),
  );

  // 透明度
  const [opacity, setOpacity] = useState<number>(
    WrapperColorSelect.getOpacity(value!),
  );

  const onInputColorChange = useCallback(
    (e) => {
      const nowColor = e.target.value;
      setInputColor(nowColor);
    },
    [value, onChange],
  );

  const onSelectChange = useCallback(
    (value) => {
      setInputColor(getHexString(value!, false));
      setOpacity(WrapperColorSelect.getOpacity(value!));
      onChange?.(value);
    },
    [onChange],
  );

  const onOpacityChange = useCallback(
    (opacity) => {
      let realOpacity = parseInt(opacity);
      realOpacity = Number.isNaN(realOpacity) ? 100 : realOpacity;
      realOpacity /= 100;
      realOpacity = parseFloat(realOpacity.toFixed(2));
      realOpacity = Math.max(Math.min(realOpacity, 1), 0);
      setOpacity(realOpacity);
    },
    [value],
  );

  const onOpacityBlur = useCallback(
    (judge: boolean) => {
      const newValue = merge({}, value, { a: opacity });
      if (!judge || !isEqual(newValue, value)) onChange?.(newValue);
    },
    [opacity, value],
  );

  const onInputBlur = useCallback(
    (judge: boolean) => {
      try {
        const rgbColor = color(`#${inputColor}`).object();
        const newValue = merge({}, value, rgbColor);
        if (!judge || !isEqual(newValue, value)) onChange?.(newValue);
      } catch (err) {}
    },
    [inputColor, value],
  );

  // * 避免外部刷新导致内部数据不刷新
  useEffect(() => {
    if (propsValue) {
      setOpacity(WrapperColorSelect.getOpacity(propsValue!));
      setInputColor(getHexString(propsValue!, false));
    } else if (propsDefaultValue) {
      setOpacity(WrapperColorSelect.getOpacity(propsDefaultValue!));
      setInputColor(getHexString(propsDefaultValue!, false));
    }
  }, [propsValue, propsDefaultValue]);

  useUnmount(() => {
    onOpacityBlur(true);
    onInputBlur(true);
  });

  return (
    <div className="dis-flex" style={style}>
      <ColorSelect
        value={props.value ?? props.defaultValue ?? value}
        onChange={onSelectChange}
        children={children}
      />
      <Input
        prefix={<span onClick={(e) => e.stopPropagation}>#</span>}
        value={inputColor}
        onChange={onInputColorChange}
        onBlur={onInputBlur.bind(null, false)}
      />
      {!ignoreAlpha && (
        <InputNumber
          max={100}
          min={0}
          step={1}
          value={opacity * 100}
          onChange={onOpacityChange}
          onBlur={onOpacityBlur.bind(null, false)}
        />
      )}
    </div>
  );
};

export default WrapperColorSelect;
