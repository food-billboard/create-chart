import { useCallback, useMemo, useState, useEffect } from 'react';
import { InputNumber } from 'antd';
import { connect } from 'dva';
import { get } from 'lodash';
import { getComponent, getPath } from '@/utils/Assist/Component';
import ConfigList from '../Structure/ConfigList';
import Opacity from '../Opacity';
import HalfForm from '../Structure/HalfForm';
import { mapStateToProps, mapDispatchToProps } from './connect';

const { Item } = ConfigList;

// 基础的组件配置

const BaseConfig = (props: {
  id: string;
  components: ComponentData.TComponentData[];
  setComponent: ComponentMethod.SetComponentMethod;
}) => {
  const { id, components, setComponent } = props;

  const { width, height, left, top, opacity, rotate } = useMemo(() => {
    const component: ComponentData.TComponentData = getComponent(
      id,
      components,
    );
    return get(component, 'config.style') || {};
  }, [components]);

  const [stateWidth, setStateWidth] = useState<number>(width);
  const [stateHeight, setStateHeight] = useState<number>(height);
  const [stateLeft, setStateLeft] = useState<number>(left);
  const [stateTop, setStateTop] = useState<number>(top);

  const onValueChange = useCallback(
    (path: keyof ComponentData.TBaseConfig['style'], value: any) => {
      let realValue = value;
      try {
        realValue = value.target.value;
      } catch (err) {}

      const componentPath = getPath(id);
      setComponent({
        value: {
          config: {
            style: {
              [path]: realValue,
            },
          },
        },
        id,
        path: componentPath,
        action: 'update',
      });
    },
    [id],
  );

  useEffect(() => {
    setStateWidth(width);
  }, [width]);

  useEffect(() => {
    setStateHeight(height);
  }, [height]);

  useEffect(() => {
    setStateLeft(left);
  }, [left]);

  useEffect(() => {
    setStateTop(top);
  }, [top]);

  return (
    <div>
      <ConfigList>
        <Item label="图表尺寸">
          <HalfForm>
            <InputNumber
              value={stateWidth}
              onChange={(value) => setStateWidth(value)}
              onBlur={onValueChange.bind(null, 'width', stateWidth)}
            />
          </HalfForm>
          <HalfForm>
            <InputNumber
              value={stateHeight}
              onChange={(value) => setStateHeight(value)}
              onBlur={onValueChange.bind(null, 'height', stateHeight)}
            />
          </HalfForm>
        </Item>
        <Item label="图表位置">
          <HalfForm>
            <InputNumber
              value={stateLeft}
              onChange={(value) => setStateLeft(value)}
              onBlur={onValueChange.bind(null, 'left', stateLeft)}
            />
          </HalfForm>
          <HalfForm>
            <InputNumber
              value={stateTop}
              onChange={(value) => setStateTop(value)}
              onBlur={onValueChange.bind(null, 'top', stateTop)}
            />
          </HalfForm>
        </Item>
        <Item label="旋转角度">
          <HalfForm>
            <InputNumber
              defaultValue={rotate}
              onBlur={onValueChange.bind(null, 'rotate')}
            />
          </HalfForm>
        </Item>
        <Item label="不透明度">
          <HalfForm>
            <Opacity
              defaultValue={opacity}
              onAfterChange={onValueChange.bind(null, 'opacity')}
              max={1}
              min={0}
              step={0.1}
            />
          </HalfForm>
        </Item>
      </ConfigList>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(BaseConfig);
