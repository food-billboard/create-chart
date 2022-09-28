import { useMemo, useCallback, Fragment } from 'react';
import { connect } from 'dva';
import { get } from 'lodash';
import { ConnectState } from '@/models/connect';
import { EComponentType } from '@/utils/constants';
import { mergeWithoutArray } from '@/utils';
import { BorderMap } from '../../../InternalBorder';
import { ComponentProps } from '../../../ChartComponents/Common/Component/type';
import ChildrenWrapper from './ChildrenWrapper';
import SubGroup from './SubGroup';
import { getComponentByType } from '../../../ChartComponents';
import styles from './index.less';

const Content = (props: {
  setParams: (value: ComponentData.TParams[]) => void;
  screenType: string;
  component: ComponentProps['component'];
  timestamps?: number;
  screenTheme: string;
}) => {
  const { component, setParams, screenType, timestamps, screenTheme } = props;

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

  const children = useMemo(() => {
    const renderChildren: (
      value: ComponentData.TComponentData[],
      parent: ComponentData.TComponentData | null,
      isOuter?: boolean,
    ) => any = (value, parent = null, isOuter = false) => {
      const { scaleX, scaleY } = getScale(parent || undefined);
      return value.map((component) => {
        const { type, id } = component;
        const { show, value } = get(component, 'config.style.border') || {};
        const Dom = show
          ? (BorderMap as any)[value]?.value || Fragment
          : Fragment;

        const newComponent = mergeWithoutArray({}, component, {
          config: {
            style: {
              width: component.config.style.width * scaleX,
              height: component.config.style.height * scaleY,
              left: component.config.style.left * scaleX,
              top: component.config.style.top * scaleY,
            },
            attr: {
              scaleX: (component.config.attr.scaleX ?? 1) * scaleX,
              scaleY: (component.config.attr.scaleY ?? 1) * scaleY,
            },
          },
        });

        if (type === EComponentType.GROUP_COMPONENT) {
          return (
            <Dom>
              <ChildrenWrapper
                value={newComponent}
                key={component.id}
                borderNone={isOuter}
                parent={parent}
              >
                <SubGroup value={newComponent} isOuter={isOuter}>
                  {renderChildren(newComponent.components, newComponent, false)}
                </SubGroup>
              </ChildrenWrapper>
            </Dom>
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
          >
            <TargetComponent
              className={styles['render-component-children']}
              value={newComponent}
              key={id}
              children={<Dom />}
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
  }, [component, setParams, screenType, timestamps, getScale]);

  return <>{children}</>;
};

export default connect(
  (state: ConnectState) => {
    return {
      screenType: state.global.screenType,
      screenTheme: state.global.screenData.config.attr.theme,
    };
  },
  (dispatch) => {
    return {
      setParams: (value: ComponentData.TParams[]) =>
        dispatch({ type: 'global/setParams', value }),
    };
  },
)(Content);
