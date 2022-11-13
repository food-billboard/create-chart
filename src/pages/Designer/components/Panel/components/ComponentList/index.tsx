import { useMemo } from 'react';
import { connect } from 'dva';
import { useIdPathMap } from '@/hooks';
import RenderComponent from '@/components/RenderComponent';
import {
  getPath,
  isGroupComponent as isGroupComponentFunc,
} from '@/utils/Assist/Component';
import { mapStateToProps, mapDispatchToProps } from './connect';

const ComponentList = (props: {
  components: ComponentData.TComponentData[];
  flag: ComponentData.ScreenFlagType;
}) => {
  const { components = [], flag } = props;

  const list = useMemo(() => {
    useIdPathMap(true, components);
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
        flag,
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
  }, [components, flag]);

  return <>{list}</>;
};

export default connect(mapStateToProps, mapDispatchToProps)(ComponentList);
