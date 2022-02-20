import { useMemo } from 'react';
import { EComponentType } from '@/utils/constants';
import ChildrenWrapper from './ChildrenWrapper';
import SubGroup from './SubGroup';
import { getComponentByType } from '../../../ChartComponents';

type ComponentContentProps = {
  value: ComponentData.TComponentData;
};

const Content = (props: ComponentContentProps) => {
  const { value } = props;

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
            <TargetComponent value={component} key={id} />
          </ChildrenWrapper>
        );
      });
    };
    return renderChildren([value], true);
  }, [value]);

  return <>{children}</>;
};

export default Content;
