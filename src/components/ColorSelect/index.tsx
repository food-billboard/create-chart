import { useCallback, useEffect, useState, CSSProperties } from 'react';
import { useControllableValue, useUpdateEffect, useUnmount } from 'ahooks';
import { Input, InputNumber } from 'antd';
import {
  SketchPicker,
  SketchPickerProps,
  ColorChangeHandler,
} from 'react-color';
import color from 'color';
import classnames from 'classnames';
import { merge, debounce, isEqual } from 'lodash';
import { DEFAULT_COLOR } from '@/utils/constants';
import ThemeUtil, {
  getRgbaString,
  getHexString,
  getOpacity,
} from '@/utils/Assist/Theme';
import {
  GLOBAL_EVENT_EMITTER,
  EVENT_NAME_MAP,
} from '@/utils/Assist/EventEmitter';
import Tooltip from '../ChartComponents/Common/Tooltip';
import styles from './index.less';

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
  Exclude<SketchPickerProps, 'color' | 'onChange'>
> & {
  value?: ComponentData.TColorConfig;
  defaultValue?: ComponentData.TColorConfig;
  onChange?: (color: ComponentData.TColorConfig) => void;
};

const ColorSelect = (props: TColorSelectProps) => {
  const { value, onChange, ...nextProps } = props;

  const [stateValue, setStateValue] = useState<ComponentData.TColorConfig>(
    value || DEFAULT_COLOR,
  );
  const [presetColorList, setPresetColorList] = useState<string[]>(() => {
    const colorList = ThemeUtil.currentThemeColor;
    return [
      ...colorList,
      ...DEFAULT_PRESET_COLOR_LIST.filter((item) => !colorList.includes(item)),
    ];
  });

  const onInternalChange: ColorChangeHandler = useCallback((value) => {
    const rgb = value.rgb;
    setStateValue(rgb);
  }, []);

  const onVisibleChange = useCallback(
    (visible) => {
      if (!visible) onChange?.(stateValue);
    },
    [stateValue],
  );

  const onThemeChange = () => {
    const colorList = ThemeUtil.currentThemeColor;
    setPresetColorList((prev) => {
      return [
        ...colorList,
        ...prev.filter((item) => !colorList.includes(item)),
      ];
    });
  };

  useUpdateEffect(() => {
    value && setStateValue(value);
  }, [value]);

  useEffect(() => {
    GLOBAL_EVENT_EMITTER.addListener(
      EVENT_NAME_MAP.SCREEN_THEME_CHANGE,
      onThemeChange,
    );
    return () => {
      GLOBAL_EVENT_EMITTER.removeListener(
        EVENT_NAME_MAP.SCREEN_THEME_CHANGE,
        onThemeChange,
      );
    };
  }, []);

  useUnmount(() => {
    if (!isEqual(value, stateValue)) onChange?.(stateValue);
  });

  return (
    <Tooltip
      title={
        <SketchPicker
          {...nextProps}
          onChange={debounce(onInternalChange, 20)}
          color={stateValue}
          presetColors={presetColorList}
        />
      }
      trigger="click"
      overlayClassName={styles['component-color-select-tooltip']}
      onOpenChange={onVisibleChange}
    >
      <div
        className={classnames(
          styles['component-color-select'],
          'border-1',
          'c-po',
        )}
        style={{
          backgroundColor: getRgbaString(stateValue),
        }}
      ></div>
    </Tooltip>
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
      />
      <Input
        prefix="#"
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
