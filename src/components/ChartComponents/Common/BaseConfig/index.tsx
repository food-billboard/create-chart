import { useCallback, useMemo } from 'react';
import { connect } from 'dva';
import { get } from 'lodash';
import { getComponent, getPath } from '@/utils/Assist/Component';
import DataChangePool from '@/utils/Assist/DataChangePool';
import AngleSelect from '../AngleSelect';
import InputNumber from '../InputNumber';
import ConfigList from '../Structure/ConfigList';
import Opacity from '../Opacity';
import HalfForm from '../Structure/HalfForm';
import { mapStateToProps, mapDispatchToProps } from './connect';
import styles from './index.less';

const { Item } = ConfigList;

// 基础的组件配置

const BaseConfig = (props: {
  id: string;
  isGroupComponent: boolean;
  components: ComponentData.TComponentData[];
}) => {
  const { id, components, isGroupComponent } = props;

  const { style, attr } = useMemo(() => {
    const component: ComponentData.TComponentData = getComponent(
      id,
      components,
    );
    return get(component, 'config') || {};
  }, [components, id]);

  const { width, height, left, top, opacity, rotate, skew } = style;
  const { scaleX, scaleY } = attr;

  const onValueChange = useCallback(
    (path: keyof ComponentData.TBaseConfig['style'], value: any) => {
      let realValue = value;
      try {
        realValue = value.target.value;
      } catch (err) {}

      const componentPath = getPath(id);
      DataChangePool.setComponent({
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

  const onSizeChange = useCallback(
    (key: 'width' | 'height', value) => {
      const realValue = value >= 20 ? value : 20;
      if (isGroupComponent) {
        let changeState: any = {
          style: {
            [key]: realValue,
          },
        };
        if (key === 'width') {
          changeState = {
            ...changeState,
            attr: {
              scaleX: (realValue / width) * (scaleX || 1),
            },
          };
        } else {
          changeState = {
            ...changeState,
            attr: {
              scaleY: (realValue / height) * (scaleY || 1),
            },
          };
        }

        const componentPath = getPath(id);
        DataChangePool.setComponent({
          value: {
            config: {
              ...changeState,
            },
          },
          id,
          path: componentPath,
          action: 'update',
        });
      } else {
        onValueChange(key, realValue);
      }
    },
    [onValueChange, isGroupComponent, width, height, scaleX, scaleY, id],
  );

  return (
    <div className={styles['component-design-config-base']}>
      <ConfigList>
        <Item label="图表尺寸">
          <HalfForm>
            <InputNumber
              value={Math.floor(width)}
              onChange={onSizeChange.bind(null, 'width')}
              min={20}
            />
          </HalfForm>
          <HalfForm>
            <InputNumber
              value={Math.floor(height)}
              onChange={onSizeChange.bind(null, 'height')}
              min={20}
            />
          </HalfForm>
        </Item>
        <Item label="图表位置">
          <HalfForm>
            <InputNumber
              value={Math.floor(left)}
              onChange={onValueChange.bind(null, 'left')}
            />
          </HalfForm>
          <HalfForm>
            <InputNumber
              value={Math.floor(top)}
              onChange={onValueChange.bind(null, 'top')}
            />
          </HalfForm>
        </Item>
        <AngleSelect
          value={rotate}
          onChange={onValueChange.bind(null, 'rotate')}
        />
        <Item label="倾斜">
          <HalfForm>
            <InputNumber
              value={skew?.x}
              onChange={(value) => {
                onValueChange('skew', {
                  x: (parseInt(value as any) || 0) % 360,
                  y: skew?.y || 0,
                });
              }}
            />
          </HalfForm>
          <HalfForm>
            <InputNumber
              value={skew?.y}
              onChange={(value) => {
                onValueChange('skew', {
                  y: (parseInt(value as any) || 0) % 360,
                  x: skew?.x || 0,
                });
              }}
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
