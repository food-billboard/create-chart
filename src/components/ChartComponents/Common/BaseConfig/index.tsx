import { useCallback, useMemo } from 'react';
import { InputNumber } from 'antd';
import { connect } from 'dva';
import { get } from 'lodash';
import { getComponent, getPath } from '@/utils/Assist/Component';
import ConfigList from '../Structure/ConfigList';
import Opacity from '../Opacity';
import HalfForm from '../Structure/HalfForm';
import { mapStateToProps, mapDispatchToProps } from './connect';
import styles from './index.less';

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
  }, [components, id]);

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

  return (
    <div className={styles['component-design-config-base']}>
      <ConfigList>
        <Item label="图表尺寸">
          <HalfForm>
            <InputNumber
              value={width}
              onChange={(value) => {
                onValueChange('width', value >= 20 ? value : 20);
              }}
              min={20}
            />
          </HalfForm>
          <HalfForm>
            <InputNumber
              value={height}
              onChange={(value) => {
                onValueChange('height', value >= 20 ? value : 20);
              }}
              min={20}
            />
          </HalfForm>
        </Item>
        <Item label="图表位置">
          <HalfForm>
            <InputNumber
              value={left}
              onChange={onValueChange.bind(null, 'left')}
            />
          </HalfForm>
          <HalfForm>
            <InputNumber
              value={top}
              onChange={onValueChange.bind(null, 'top')}
            />
          </HalfForm>
        </Item>
        <Item label="旋转角度">
          <HalfForm>
            <InputNumber
              value={rotate}
              onChange={onValueChange.bind(null, 'rotate')}
            />
          </HalfForm>
        </Item>
        <Item label="不透明度">
          <HalfForm>
            <Opacity
              value={opacity}
              onChange={onValueChange.bind(null, 'opacity')}
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
