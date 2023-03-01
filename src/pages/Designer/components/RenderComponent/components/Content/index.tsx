import { useMemo, useCallback, CSSProperties } from 'react';
import { get } from 'lodash';
import { observer } from 'mobx-react-lite';
import { useMobxContext } from '@/hooks';
import { getComponentByType } from '@/components/ChartComponents';
import {
  InternalBorderWrapper,
  getTargetBorder,
} from '@/components/InternalBorder';
import { EComponentType } from '@/utils/constants';
import { mergeWithoutArray } from '@/utils';
import ChildrenWrapper from './ChildrenWrapper';
import SubGroup from './SubGroup';
import styles from './index.less';

const Content = (props: {
  component: ComponentData.ComponentProps['component'];
  timestamps?: number;
}) => {
  const { component, timestamps } = props;

  const {
    global: {
      setParams,
      screenType,
      screenData: {
        config: {
          attr: {
            theme: { value: screenTheme },
            componentBorder,
          },
          flag: { type: flag },
        },
      },
    },
  } = useMobxContext();

  const getScale = useCallback((component?: ComponentData.TComponentData) => {
    if (!component)
      return {
        scaleX: 1,
        scaleY: 1,
      };
    return {
      scaleX: component.config.attr.scaleX ?? 1,
      scaleY: component.config.attr.scaleY ?? 1,
    };
  }, []);

  // 组存在边框的情况下，需要重新计算组的scale
  const getComponentGroupBorderScale = useCallback(
    (component: ComponentData.TComponentData) => {
      const {
        config: {
          style: { border, width, height },
        },
        componentType,
      } = component;
      if (!border.show || componentType !== 'GROUP_COMPONENT')
        return { x: 1, y: 1 };
      const padding = getTargetBorder(border)?.getOuterPadding(
        componentBorder,
      ) || [0, 0];
      return {
        x: (width - padding[0] * 2) / width,
        y: (height - padding[1] * 2) / height,
      };
    },
    [componentBorder],
  );

  const children = useMemo(() => {
    const renderChildren: (
      value: ComponentData.TComponentData[],
      parent: ComponentData.TComponentData | null,
      isOuter?: boolean,
    ) => any = (value, parent = null, isOuter = false) => {
      const { scaleX, scaleY } = getScale(parent || undefined);
      return value.map((component) => {
        const { type, id } = component;
        const border = get(component, 'config.style.border') || {};

        const scale = getComponentGroupBorderScale(component);

        const newComponent = mergeWithoutArray({}, component, {
          config: {
            style: {
              width: component.config.style.width * scaleX,
              height: component.config.style.height * scaleY,
              ...(flag === 'H5'
                ? {
                    left: 0,
                    top: 0,
                  }
                : {
                    left: component.config.style.left * scaleX,
                    top: component.config.style.top * scaleY,
                  }),
            },
            attr: {
              scaleX: (component.config.attr.scaleX ?? 1) * scaleX * scale.x,
              scaleY: (component.config.attr.scaleY ?? 1) * scaleY * scale.y,
            },
          },
        });

        // 组内的3d变换
        const internalComponentTransform: CSSProperties = {};
        if (!isOuter && get(parent, 'config.options.transform.show')) {
          const {
            config: {
              style: {
                groupTransform: { scale, rotate, translate },
              },
            },
          } = component;
          internalComponentTransform.transform = `scale3d(${scale.x}, ${scale.y}, 1) translate3d(${translate.x}px, ${translate.y}px, ${translate.z}px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) rotateZ(${rotate.z}deg)`;
          internalComponentTransform.willChange = 'transform';
        }

        if (type === EComponentType.GROUP_COMPONENT) {
          return (
            <ChildrenWrapper
              value={newComponent}
              borderNone={isOuter}
              parent={parent}
              flag={flag}
              key={component.id}
            >
              <SubGroup
                value={newComponent}
                isOuter={isOuter}
                flag={flag}
                wrapper={InternalBorderWrapper}
                style={internalComponentTransform}
              >
                {renderChildren(newComponent.components, newComponent, false)}
              </SubGroup>
            </ChildrenWrapper>
          );
          return (
            <InternalBorderWrapper
              border={border}
              key={component.id}
              id={component.id}
            >
              <ChildrenWrapper
                value={newComponent}
                borderNone={isOuter}
                parent={parent}
                flag={flag}
              >
                <SubGroup
                  value={newComponent}
                  isOuter={isOuter}
                  flag={flag}
                  wrapper={InternalBorderWrapper}
                >
                  {renderChildren(newComponent.components, newComponent, false)}
                </SubGroup>
              </ChildrenWrapper>
            </InternalBorderWrapper>
          );
        }

        const TargetComponent: any = getComponentByType(newComponent)?.render;

        if (!TargetComponent) return null;

        return (
          <ChildrenWrapper
            value={newComponent}
            key={newComponent.id}
            borderNone={isOuter}
            parent={parent}
            flag={flag}
          >
            <TargetComponent
              className={styles['render-component-children']}
              value={newComponent}
              key={id}
              wrapper={InternalBorderWrapper}
              style={internalComponentTransform}
              global={{
                setParams,
                screenType,
                screenTheme,
              }}
            />
          </ChildrenWrapper>
        );
      });
    };
    return renderChildren([component], null, true);
  }, [
    component,
    setParams,
    screenType,
    timestamps,
    getScale,
    flag,
    getComponentGroupBorderScale,
  ]);

  return <>{children}</>;
};

export default observer(Content);
