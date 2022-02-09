import React, { useCallback, useMemo } from 'react';
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

  const onValueChange = useCallback(
    (path: keyof ComponentData.TBaseConfig['style'], value: any) => {
      const componentPath = getPath(id);
      setComponent({
        value: {
          config: {
            style: {
              [path]: value,
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

  return (
    <div>
      <ConfigList>
        <Item label="图表尺寸">
          <HalfForm>
            <InputNumber
              defaultValue={width}
              onBlur={onValueChange.bind(null, 'width')}
            />
          </HalfForm>
          <HalfForm>
            <InputNumber
              defaultValue={height}
              onBlur={onValueChange.bind(null, 'height')}
            />
          </HalfForm>
        </Item>
        <Item label="图表位置">
          <HalfForm>
            <InputNumber
              defaultValue={left}
              onBlur={onValueChange.bind(null, 'left')}
            />
          </HalfForm>
          <HalfForm>
            <InputNumber
              defaultValue={top}
              onBlur={onValueChange.bind(null, 'top')}
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
            />
          </HalfForm>
        </Item>
      </ConfigList>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(BaseConfig);
