import { useMemo, useCallback } from 'react';
import { connect } from 'dva';
import { get } from 'lodash';
import { ConnectState } from '@/models/connect';
import { EComponentType } from '@/utils/constants';
import { mergeWithoutArray } from '@/utils';
import { InternalBorderWrapper } from '../../../InternalBorder';
import ChildrenWrapper from './ChildrenWrapper';
import SubGroup from './SubGroup';
import { getComponentByType } from '../../../ChartComponents';
import styles from './index.less';

const Content = (props: {
  setParams: (value: ComponentData.TParams[]) => void;
  screenType: ComponentData.ScreenType;
  component: ComponentData.ComponentProps['component'];
  timestamps?: number;
  screenTheme: string;
  flag: ComponentData.ScreenFlagType;
}) => {
  const { component, setParams, screenType, timestamps, screenTheme, flag } =
    props;

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
        const border = get(component, 'config.style.border') || {};

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
              scaleX: (component.config.attr.scaleX ?? 1) * scaleX,
              scaleY: (component.config.attr.scaleY ?? 1) * scaleY,
            },
          },
        });

        if (type === EComponentType.GROUP_COMPONENT) {
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
                <SubGroup value={newComponent} isOuter={isOuter} flag={flag}>
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
  }, [component, setParams, screenType, timestamps, getScale, flag]);

  return <>{children}</>;
};

export default connect(
  (state: ConnectState) => {
    return {
      screenType: state.global.screenType,
      screenTheme: state.global.screenData.config.attr.theme.value,
      flag: state.global.screenData.config.flag.type,
    };
  },
  (dispatch) => {
    return {
      setParams: (value: ComponentData.TParams[]) =>
        dispatch({ type: 'global/setParams', value }),
    };
  },
)(Content);
