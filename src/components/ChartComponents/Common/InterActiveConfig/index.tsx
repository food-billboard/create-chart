import { connect } from 'dva';
import classnames from 'classnames';
import BaseConfig from './components/BaseConfig';
import { mapStateToProps, mapDispatchToProps } from './connect';
import styles from './index.less';

const InterActiveConfig = (props: {
  id: string;
  components: ComponentData.TComponentData[];
  setComponent: ComponentMethod.SetComponentMethod;
}) => {
  const { id, components, setComponent } = props;

  return (
    <div
      className={classnames(
        styles['design-config-interactive'],
        'design-config-format-font-size',
      )}
    >
      <BaseConfig id={id} components={components} onChange={setComponent} />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(InterActiveConfig);
