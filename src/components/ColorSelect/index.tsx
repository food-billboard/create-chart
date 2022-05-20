import { useCallback, useEffect, useState } from 'react';
import { useControllableValue } from 'ahooks';
import { Input, InputNumber } from 'antd';
import {
  SketchPicker,
  SketchPickerProps,
  ColorChangeHandler,
} from 'react-color';
import color from 'color';
import classnames from 'classnames';
import { omit, merge, debounce } from 'lodash';
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

function getRgbaString(prevColor: ComponentData.TColorConfig) {
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
  const [state, setState] = useControllableValue<ComponentData.TColorConfig>(
    props,
    {
      defaultValue: DEFAULT_COLOR,
    },
  );

  const { value, onChange, ...nextProps } = props;

  const onInternalChange: ColorChangeHandler = useCallback((value) => {
    const rgb = value.rgb;
    setState(rgb);
  }, []);

  return (
    <Tooltip
      title={
        <SketchPicker
          {...nextProps}
          onChange={debounce(onInternalChange, 20)}
          color={state}
        />
      }
      trigger="click"
      overlayClassName={styles['component-color-select-tooltip']}
    >
      <div
        className={classnames(
          styles['component-color-select'],
          'border-1',
          'c-po',
        )}
        style={{
          backgroundColor: getRgbaString(state),
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

  const onOpacityBlur = useCallback(() => {
    onChange?.(merge({}, value, { a: opacity }));
  }, [opacity, value]);

  const onInputBlur = useCallback(() => {
    try {
      const rgbColor = color(`#${inputColor}`).object();
      onChange?.(merge({}, value, rgbColor));
    } catch (err) {}
  }, [inputColor, value]);

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
        onBlur={onInputBlur}
      />
      {!ignoreAlpha && (
        <InputNumber
          max={100}
          min={0}
          step={1}
          value={opacity * 100}
          onChange={onOpacityChange}
          onBlur={onOpacityBlur}
        />
      )}
    </div>
  );
};

export default WrapperColorSelect;
