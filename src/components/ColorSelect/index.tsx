import { useCallback, useEffect, useState } from 'react';
import { useControllableValue, useUpdateEffect, useUnmount } from 'ahooks';
import { Input, InputNumber } from 'antd';
import {
  SketchPicker,
  SketchPickerProps,
  ColorChangeHandler,
} from 'react-color';
import color from 'color';
import classnames from 'classnames';
import { omit, merge, debounce, isEqual } from 'lodash';
import Tooltip from '../ChartComponents/Common/Tooltip';
import { DEFAULT_COLOR } from '@/utils/constants';
import styles from './index.less';

// * 颜色选择组件

type TColorSelectProps = Partial<
  Exclude<SketchPickerProps, 'color' | 'onChange'>
> & {
  value?: ComponentData.TColorConfig;
  defaultValue?: ComponentData.TColorConfig;
  onChange?: (color: ComponentData.TColorConfig) => void;
};

function getOpacity(prevColor: ComponentData.TColorConfig) {
  return prevColor?.a ?? 1;
}

export function getRgbaString(prevColor: ComponentData.TColorConfig) {
  if (!prevColor) return prevColor;
  try {
    return `rgba(${color(omit(prevColor, 'a')).array().join(',')}, ${
      prevColor.a ?? 1
    })`;
  } catch (err) {
    return '';
  }
}

function getHexString(prevColor: ComponentData.TColorConfig, prefix?: boolean) {
  if (!prevColor) return prevColor;
  const result = color(omit(prevColor, 'a')).hex();
  return prefix ? result : result.slice(1);
}

const ColorSelect = (props: TColorSelectProps) => {
  const { value, onChange, ...nextProps } = props;

  const [stateValue, setStateValue] = useState<ComponentData.TColorConfig>(
    value || DEFAULT_COLOR,
  );

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

  useUpdateEffect(() => {
    value && setStateValue(value);
  }, [value]);

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
        />
      }
      trigger="click"
      overlayClassName={styles['component-color-select-tooltip']}
      onVisibleChange={onVisibleChange}
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
  props: TColorSelectProps & { ignoreAlpha?: boolean },
) => {
  const {
    value: propsValue,
    defaultValue: propsDefaultValue,
    ignoreAlpha = false,
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
    <div className="dis-flex">
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
