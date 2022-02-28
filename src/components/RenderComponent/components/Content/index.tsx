import { useMemo } from 'react';
import { connect } from 'dva';
import { ConnectState } from '@/models/connect';
import { EComponentType } from '@/utils/constants';
import { ComponentProps } from '../../../ChartComponents/Common/Component/type';
import ChildrenWrapper from './ChildrenWrapper';
import SubGroup from './SubGroup';
import { getComponentByType } from '../../../ChartComponents';

const Content = (props: {
  setParams: (value: ComponentData.TParams[]) => void;
  filter: ComponentData.TFilterConfig[];
  screenType: string;
  component: ComponentProps['component'];
}) => {
  const { component, setParams, filter, screenType } = props;

  const children = useMemo(() => {
    const renderChildren: (
      value: ComponentData.TComponentData[],
      isOuter?: boolean,
    ) => any = (value, isOuter = false) => {
      return value.map((component) => {
        const { type, id } = component;

        if (type === EComponentType.GROUP_COMPONENT) {
          return (
            <ChildrenWrapper
              value={component}
              key={component.id}
              borderNone={isOuter}
            >
              <SubGroup value={component} isOuter={isOuter}>
                {renderChildren(component.components)}
              </SubGroup>
            </ChildrenWrapper>
          );
        }

        const TargetComponent: any = getComponentByType(component)?.render;

        if (!TargetComponent) return null;

        return (
          <ChildrenWrapper
            value={component}
            key={component.id}
            borderNone={isOuter}
          >
            <TargetComponent
              value={component}
              key={id}
              global={{
                setParams,
                filter,
                screenType,
              }}
            />
          </ChildrenWrapper>
        );
      });
    };
    return renderChildren([component], true);
  }, [component, setParams, filter, screenType]);

  return <>{children}</>;
};

export default connect(
  (state: ConnectState) => {
    return {
      filter: state.global.screenData.config.attr.filter,
      screenType: state.global.screenType,
    };
  },
  (dispatch) => {
    return {
      setParams: (value: ComponentData.TParams[]) =>
        dispatch({ type: 'global/setParams', value }),
    };
  },
)(Content);
