import React, { useCallback } from 'react';
import { useControllableValue } from 'ahooks';
import { Tooltip } from 'antd';
import {
  SketchPicker,
  SketchPickerProps,
  Color,
  ColorChangeHandler,
} from 'react-color';
import color from 'color';
import classnames from 'classnames';
import { omit } from 'lodash';
import styles from './index.less';

const ColorSelect = (
  props: Partial<Exclude<SketchPickerProps, 'color'>> & {
    value?: Color;
  },
) => {
  const [state, setState] = useControllableValue<string>(props, {
    defaultValue: '#000000',
  });

  const { value, onChange, ...nextProps } = props;

  const onInternalChange: ColorChangeHandler = useCallback((value) => {
    const rgb = value.rgb;
    setState(
      `rgba(${color(omit(rgb, ['a']))
        .array()
        .join(',')}, ${rgb.a})`,
    );
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
          backgroundColor: state,
        }}
      ></div>
    </Tooltip>
  );
};

const WrapperColorSelect: typeof ColorSelect & {
  setOpacity: (color: string, opacity: number) => string;
  getOpacity: (color: string) => number;
} = ColorSelect as any;

WrapperColorSelect.setOpacity = (prevColor: string, opacity: number) => {
  return `rgba(${color(prevColor).array().join(',')}, ${opacity})`;
};

WrapperColorSelect.getOpacity = (prevColor: string) => {
  return color(prevColor).a();
};

export default WrapperColorSelect;
