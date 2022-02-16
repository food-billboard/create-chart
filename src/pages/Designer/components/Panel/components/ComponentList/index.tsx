import { useMemo } from 'react';
import { connect } from 'dva';
import { useIdPathMap } from '@/hooks';
import RenderComponent from '@/components/RenderComponent';
import { getPath } from '@/utils/Assist/Component';
import { mapStateToProps, mapDispatchToProps } from './connect';

const ComponentList = (props: {
  components: ComponentData.TComponentData[];
}) => {
  const { components = [] } = props;

  const list = useMemo(() => {
    useIdPathMap(true, components);
    return components.map((item, index) => {
      const path = getPath(item.id);
      return (
        <RenderComponent value={item} key={item.id} index={index} path={path} />
      );
    });
  }, [components]);

  return <>{list}</>;
};

export default connect(mapStateToProps, mapDispatchToProps)(ComponentList);
