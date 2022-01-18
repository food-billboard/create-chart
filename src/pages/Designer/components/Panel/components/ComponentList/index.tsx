import { connect } from 'dva';
import RenderComponent from '@/components/RenderComponent';
import { mapStateToProps, mapDispatchToProps } from './connect';

const ComponentList = (props: {
  components?: ComponentData.TComponentData[];
}) => {
  const { components = [] } = props;

  return (
    <>
      {components.map((item) => {
        return <RenderComponent value={item} key={item.id} />;
      })}
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ComponentList);
