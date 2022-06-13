import { useCallback, useMemo } from 'react';
import { getComponentConfigComponentByType } from '@/components/ChartComponents';
import { getPath } from '@/utils/Assist/Component';
import DataChangePool from '@/utils/Assist/DataChangePool';

const ConfigComponent = (props: {
  component: ComponentData.TComponentData;
  id: string;
}) => {
  const { component } = props;
  const { componentType: type, id } = component;

  const ConfigComponent: any = useMemo(() => {
    return getComponentConfigComponentByType(type);
  }, [type]);

  const onChange: ComponentData.ComponentConfigProps['onChange'] = useCallback(
    (value) => {
      DataChangePool.setComponent({
        id,
        path: getPath(id),
        value,
        action: 'update',
      });
    },
    [id],
  );

  return <ConfigComponent value={component} onChange={onChange} id={id} />;
};

export default ConfigComponent;
