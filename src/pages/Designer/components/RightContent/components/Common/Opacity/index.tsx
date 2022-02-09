import {} from 'react';
import { Slider } from 'antd';
import { SliderSingleProps } from 'antd/es/slider';

// 透明度配置表单
const Opacity = (props: SliderSingleProps) => {
  return <Slider {...props} />;
};

export default Opacity;
