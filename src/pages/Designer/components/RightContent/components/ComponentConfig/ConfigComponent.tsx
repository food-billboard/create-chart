import { useCallback, useMemo } from 'react';
import { connect } from 'dva';
import { getComponentConfigComponentByType } from '@/components/ChartComponents';
import { getPath } from '@/utils/Assist/Component';
import { mapStateToProps, mapDispatchToProps } from './configConnect';

const ConfigComponent = (props: {
  component: ComponentData.TComponentData;
  setComponent: ComponentMethod.SetComponentMethod;
}) => {
  const { component, setComponent } = props;
  const { componentType: type, id } = component;

  const ConfigComponent: any = useMemo(() => {
    return getComponentConfigComponentByType(type);
  }, [type]);

  const onChange: ComponentData.ComponentConfigProps['onChange'] = useCallback(
    (value) => {
      setComponent({
        id,
        path: getPath(id),
        value,
        action: 'update',
      });
    },
    [setComponent, id],
  );

  return <ConfigComponent value={component} onChange={onChange} />;
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfigComponent);
