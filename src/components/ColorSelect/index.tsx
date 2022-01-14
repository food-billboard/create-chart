import { useCallback, useMemo, useState } from 'react';
import { useControllableValue } from 'ahooks';
import { Tooltip, Row, Col, Input, InputNumber } from 'antd';
import {
  SketchPicker,
  SketchPickerProps,
  ColorChangeHandler,
} from 'react-color';
import color from 'color';
import classnames from 'classnames';
import { omit, merge } from 'lodash';
import styles from './index.less';

// * 颜色选择组件

type TColorSelectProps = Partial<
  Exclude<SketchPickerProps, 'color' | 'onChange'>
> & {
  value?: ComponentData.TColorConfig;
  onChange?: (color: ComponentData.TColorConfig) => void;
};

function getOpacity(prevColor: ComponentData.TColorConfig) {
  return prevColor.a ?? 1;
}

function getRgbaString(prevColor: ComponentData.TColorConfig) {
  if (!prevColor) return prevColor;
  return `rgba(${color(omit(prevColor, 'a')).array().join(',')}, ${
    prevColor.a || 1
  })`;
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
      defaultValue: {
        r: 0,
        g: 0,
        b: 0,
        a: 1,
      },
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
          onChange={onInternalChange}
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
  getHexString: (color: ComponentData.TColorConfig) => string;
} = ColorSelect as any;

WrapperColorSelect.getRgbaString = getRgbaString;

WrapperColorSelect.getHexString = getHexString;

WrapperColorSelect.getOpacity = getOpacity;

export const CompatColorSelect = (props: TColorSelectProps) => {
  const { value, onChange } = props;
  const [inputColor, setInputColor] = useState<string>(
    getHexString(value!, false),
  );

  const opacity = useMemo(() => {
    return WrapperColorSelect.getOpacity(value!);
  }, [value]);

  const onInputColorChange = useCallback(
    (e) => {
      const nowColor = e.target.value;
      setInputColor(nowColor);
      try {
        const rgbColor = color(`#${nowColor}`).object();
        onChange?.(merge({}, value, rgbColor));
      } catch (err) {}
    },
    [value, onChange],
  );

  const onSelectChange = useCallback(
    (value) => {
      setInputColor(getHexString(value!, false));
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
      onChange?.(merge({}, value, { a: realOpacity }));
    },
    [value],
  );

  return (
    <Row gutter={24}>
      <Col span={4}>
        <ColorSelect value={value} onChange={onSelectChange} />
      </Col>
      <Col span={12}>
        <Input
          prefix="#"
          value={inputColor}
          onChange={onInputColorChange}
          className="w-100"
        />
      </Col>
      <Col span={8}>
        <InputNumber
          max={100}
          min={0}
          step={1}
          value={opacity * 100}
          onChange={onOpacityChange}
          className="w-100"
        />
      </Col>
    </Row>
  );
};

export default WrapperColorSelect;
