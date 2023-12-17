import { useMemo } from 'react';
import { connect } from 'umi';
import { useIdPathMap } from '@/hooks';
import { getPath } from '@/utils/Assist/Component';
import GlobalConfig from '@/utils/Assist/GlobalConfig';
import RenderComponent from '../../../RenderComponent';
import { mapDispatchToProps, mapStateToProps } from './connect';

const ComponentList = (props: {
  components: ComponentData.TComponentData[];
}) => {
  const { components = [] } = props;

  const list = useMemo(() => {
    useIdPathMap(true, components);
    if (GlobalConfig.COMPONENT_HIDDEN) return [];
    return components.map((item, index) => {
      const path = getPath(item.id);
      // * 暂时这样处理防止 组 内更新下面不刷新
      // ! 这里先不用了，因为要多个组件共同拖拽
      // const isGroupComponent = isGroupComponentFunc(item);
      // const props: any = {};
      // if (isGroupComponent) props.timestamps = Date.now();

      // * 多组件共同拖拽
      const props: any = {
        timestamps: Date.now(),
      };

      return (
        <RenderComponent
          value={item}
          key={item.id}
          index={index}
          path={path}
          {...props}
        />
      );
    });
  }, [components]);

  return <>{list}</>;
};

export default connect(mapStateToProps, mapDispatchToProps)(ComponentList);
