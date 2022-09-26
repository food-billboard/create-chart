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

const alphaHexMap = {
  '1.00': 'FF',
  '0.99': 'FC',
  '0.98': 'FA',
  '0.97': 'F7',
  '0.96': 'F5',
  '0.95': 'F2',
  '0.94': 'F0',
  '0.93': 'ED',
  '0.92': 'EB',
  '0.91': 'E8',
  '0.90': 'E6',
  '0.89': 'E3',
  '0.88': 'E0',
  '0.87': 'DE',
  '0.86': 'DB',
  '0.85': 'D9',
  '0.84': 'D6',
  '0.83': 'D4',
  '0.82': 'D1',
  '0.81': 'CF',
  '0.80': 'CC',
  '0.79': 'C9',
  '0.78': 'C7',
  '0.77': 'C4',
  '0.76': 'C2',
  '0.75': 'BF',
  '0.74': 'BD',
  '0.73': 'BA',
  '0.72': 'B8',
  '0.71': 'B5',
  '0.70': 'B3',
  '0.69': 'B0',
  '0.68': 'AD',
  '0.67': 'AB',
  '0.66': 'A8',
  '0.65': 'A6',
  '0.64': 'A3',
  '0.63': 'A1',
  '0.62': '9E',
  '0.61': '9C',
  '0.60': '99',
  '0.59': '96',
  '0.58': '94',
  '0.57': '91',
  '0.56': '8F',
  '0.55': '8C',
  '0.54': '8A',
  '0.53': '87',
  '0.52': '85',
  '0.51': '82',
  '0.50': '80',
  '0.49': '7D',
  '0.48': '7A',
  '0.47': '78',
  '0.46': '75',
  '0.45': '73',
  '0.44': '70',
  '0.43': '6E',
  '0.42': '6B',
  '0.41': '69',
  '0.40': '66',
  '0.39': '63',
  '0.38': '61',
  '0.37': '5E',
  '0.36': '5C',
  '0.35': '59',
  '0.34': '57',
  '0.33': '54',
  '0.32': '52',
  '0.31': '4F',
  '0.30': '4D',
  '0.29': '4A',
  '0.28': '47',
  '0.27': '45',
  '0.26': '42',
  '0.25': '40',
  '0.24': '3D',
  '0.23': '3B',
  '0.22': '38',
  '0.21': '36',
  '0.20': '33',
  '0.19': '30',
  '0.18': '2E',
  '0.17': '2B',
  '0.16': '29',
  '0.15': '26',
  '0.14': '24',
  '0.13': '21',
  '0.12': '1F',
  '0.11': '1C',
  '0.10': '1A',
  '0.09': '17',
  '0.08': '14',
  '0.07': '12',
  '0.06': '0F',
  '0.05': '0D',
  '0.04': '0A',
  '0.03': '08',
  '0.02': '05',
  '0.01': '03',
  '0.00': '00',
};
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
  let result = color(omit(prevColor, 'a')).hex();
  const a = (prevColor.a ?? 1).toFixed(2);
  result += (alphaHexMap as any)[a] || 'FF';
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
