import { EComponentType } from '@/utils/constants';
import { getComponentByType } from '../../../ChartComponents';

type ComponentContentProps = {
  value: ComponentData.TComponentData;
};

const Content = (props: ComponentContentProps) => {
  const { value } = props;

  const renderChildren: (value: ComponentData.TComponentData[]) => any = (
    value,
  ) => {
    return value.map((component) => {
      const { type, id } = component;

      if (type === EComponentType.GROUP_COMPONENT) {
        return renderChildren(component.components);
      }

      const TargetComponent: any = getComponentByType(component)?.render;

      if (!TargetComponent) return null;

      return <TargetComponent value={component} key={id} />;
    });
  };

  return <>{renderChildren([value])}</>;
};

export default Content;
