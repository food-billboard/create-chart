import { useCallback, useMemo } from 'react';
import { Switch } from 'antd';
import {
  getComponent,
  getParentComponentIds,
  getPath,
} from '@/utils/Assist/Component';
import DataChangePool from '@/utils/Assist/DataChangePool';
import GroupUtil from '@/utils/Assist/Group';
import { mergeWithoutArray } from '@/utils';
import { useMobxContext } from '@/hooks';
import { InternalBorderSelect, DEFAULT_BORDER } from '../../../InternalBorder';
import AngleSelect from '../AngleSelect';
import InputNumber, { InputNumberProps } from '../InputNumber';
import ConfigList from '../Structure/ConfigList';
import Opacity from '../Opacity';
import HalfForm from '../Structure/HalfForm';
import styles from './index.less';

const { Item } = ConfigList;

const FormatterInputNumber = (
  props: InputNumberProps & {
    scale: number;
  },
) => {
  const { scale, onChange, value, ...nextProps } = props;

  const handleChange = useCallback(
    (value) => {
      onChange?.(parseInt(((parseInt(value || '0') || 0) / scale).toFixed(0)));
    },
    [scale, onChange],
  );

  const realValue = useMemo(() => {
    return ((parseInt(value as string) || 0) * scale).toFixed(0);
  }, [value]);

  return (
    <InputNumber {...nextProps} value={realValue} onChange={handleChange} />
  );
};

// 基础的组件配置

const BaseConfig = (props: { id: string; isGroupComponent: boolean }) => {
  const { id, isGroupComponent } = props;

  const {
    global: {
      components,
      screenData: {
        config: {
          flag: { type: flag },
        },
      },
    },
  } = useMobxContext();

  const {
    config: { style, attr },
    parent,
  } = useMemo(() => {
    const component: ComponentData.TComponentData = getComponent(
      id,
      components,
    );
    return component;
  }, [components, id]);

  const {
    width,
    height,
    left,
    top,
    opacity,
    rotate,
    skew,
    margin,
    border = { show: false, value: DEFAULT_BORDER, disabled: false },
  } = style;
  const { scaleX, scaleY } = attr;

  const { x: selfScaleX, y: selfScaleY } = useMemo(() => {
    const scale = {
      x: 1,
      y: 1,
    };
    if (!parent) return scale;
    const [, parentComponents] = getParentComponentIds(id);
    return parentComponents.reduce((acc, cur) => {
      const {
        config: {
          attr: { scaleX = 1, scaleY = 1 },
        },
      } = cur;
      acc.x *= scaleX;
      acc.y *= scaleY;
      return acc;
    }, scale);
  }, [width, height, left, top, id, parent]);

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

  const reCalGroupComponent = useCallback(
    (updateValue: SuperPartial<ComponentData.TComponentData>) => {
      return GroupUtil.reCalculateGroupComponentSizeAndPosition(
        components,
        mergeWithoutArray(
          {
            parent,
            id,
            config: {
              style: {
                width,
                height,
                left,
                top,
              },
              attr: {
                scaleX,
                scaleY,
              },
            },
          },
          updateValue,
        ),
      );
    },
    [components, parent, height, left, top, width, scaleX, scaleY, id],
  );

  const onPosChange = useCallback(
    (key: 'left' | 'top', value) => {
      const updateComponents: ComponentMethod.SetComponentMethodParamsData[] =
        [];
      const componentPath = getPath(id);
      let updateConfig: any = {
        config: {
          style: {
            [key]: value,
          },
        },
      };
      updateComponents.push(
        {
          value: {
            ...updateConfig,
          },
          id,
          path: componentPath,
          action: 'update',
        },
        ...reCalGroupComponent({ ...updateConfig }),
      );
      DataChangePool.setComponent(updateComponents);
    },
    [reCalGroupComponent, id],
  );

  const onSizeChange = useCallback(
    (key: 'width' | 'height', value) => {
      let realValue = Math.max(value, 20);
      const updateComponents: ComponentMethod.SetComponentMethodParamsData[] =
        [];
      const componentPath = getPath(id);
      if (key === 'width' && flag === 'H5')
        realValue = Math.min(realValue, 375);
      let updateConfig: any = {
        style: {
          [key]: realValue,
        },
      };
      if (isGroupComponent) {
        if (key === 'width') {
          updateConfig = {
            ...updateConfig,
            attr: {
              scaleX: (realValue / width) * (scaleX || 1),
            },
          };
        } else {
          updateConfig = {
            ...updateConfig,
            attr: {
              scaleY: (realValue / height) * (scaleY || 1),
            },
          };
        }
      }
      const newValue = {
        config: {
          ...updateConfig,
        },
      };
      updateComponents.push(
        {
          value: {
            ...newValue,
          },
          id,
          path: componentPath,
          action: 'update',
        },
        ...reCalGroupComponent({ ...newValue }),
      );
      DataChangePool.setComponent(updateComponents);
    },
    [
      onValueChange,
      isGroupComponent,
      width,
      height,
      scaleX,
      scaleY,
      id,
      flag,
      reCalGroupComponent,
    ],
  );

  return (
    <div className={styles['component-design-config-base']}>
      <ConfigList>
        <Item label="图表尺寸">
          <HalfForm>
            <FormatterInputNumber
              value={Math.floor(width)}
              onChange={onSizeChange.bind(null, 'width')}
              min={20}
              scale={selfScaleX}
            />
          </HalfForm>
          <HalfForm>
            <FormatterInputNumber
              value={Math.floor(height)}
              onChange={onSizeChange.bind(null, 'height')}
              min={20}
              scale={selfScaleY}
            />
          </HalfForm>
        </Item>
        <Item label="图表位置">
          <HalfForm>
            <FormatterInputNumber
              value={Math.floor(left)}
              onChange={onPosChange.bind(null, 'left')}
              scale={selfScaleX}
            />
          </HalfForm>
          <HalfForm>
            <FormatterInputNumber
              value={Math.floor(top)}
              onChange={onPosChange.bind(null, 'top')}
              scale={selfScaleY}
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
        {flag === 'H5' && (
          <Item label="间距">
            <HalfForm label="上下间距">
              <InputNumber
                value={margin.y}
                onChange={(value) =>
                  onValueChange('margin', {
                    ...margin,
                    y: value,
                  })
                }
              />
            </HalfForm>
          </Item>
        )}
        {!border.disabled && (
          <Item label="边框">
            <HalfForm>
              <Switch
                checked={border.show}
                onChange={(value) => {
                  onValueChange('border', {
                    ...border,
                    show: value,
                  });
                }}
              />
            </HalfForm>
            {!!border.show && (
              <HalfForm>
                <InternalBorderSelect
                  value={border.value}
                  onChange={(value) => {
                    onValueChange('border', {
                      ...border,
                      value: value,
                    });
                  }}
                />
              </HalfForm>
            )}
          </Item>
        )}
      </ConfigList>
    </div>
  );
};

export default BaseConfig;
