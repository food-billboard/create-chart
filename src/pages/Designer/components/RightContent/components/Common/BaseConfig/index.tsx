import React from 'react';
import { InputNumber } from 'antd';
import ConfigList from '../Structure/ConfigList';
import HalfForm from '../Structure/HalfForm';
import Opacity from '../Opacity';

const { Item } = ConfigList;

// 基础的组件配置

const BaseConfig = (props: ComponentData.TBaseConfig['style'] & {}) => {
  const { width, height, left, top, opacity, rotate } = props;

  return (
    <div className="">
      <ConfigList>
        <Item label="图表尺寸">
          <HalfForm>
            <InputNumber />
          </HalfForm>
          <HalfForm>
            <InputNumber />
          </HalfForm>
        </Item>
        <Item label="图表位置">
          <HalfForm>
            <InputNumber />
          </HalfForm>
          <HalfForm>
            <InputNumber />
          </HalfForm>
        </Item>
        <Item label="旋转角度">
          <HalfForm>
            <InputNumber />
          </HalfForm>
        </Item>
        <Item label="不透明度">
          <HalfForm>
            <Opacity />
          </HalfForm>
        </Item>
      </ConfigList>
    </div>
  );
};

export default BaseConfig;
