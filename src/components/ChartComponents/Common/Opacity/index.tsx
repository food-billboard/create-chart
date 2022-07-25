import { useCallback } from 'react';
import Slider from '../Slider';
import { SliderSingleProps } from 'antd/es/slider';

// 透明度配置表单
const Opacity = (props: SliderSingleProps) => {
  const { onChange: propsOnChange, onAfterChange, value, ...nextProps } = props;

  const onChange = useCallback(
    (newValue) => {
      if (newValue !== value) propsOnChange?.(newValue);
    },
    [value, propsOnChange],
  );

  return <Slider {...nextProps} onAfterChange={onChange} value={value} />;
};

export default Opacity;
