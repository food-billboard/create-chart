import { useMemo } from 'react';
import { connect } from 'dva';
import { getComponentConfigComponentByType } from '@/components/ChartComponents';
import { mapStateToProps, mapDispatchToProps } from './configConnect';

const ConfigComponent = (props: {
  component: ComponentData.TComponentData;
}) => {
  const { component } = props;
  const type = component.componentType;

  const ConfigComponent: any = useMemo(() => {
    return getComponentConfigComponentByType(type);
  }, [type]);

  return <ConfigComponent />;
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfigComponent);
