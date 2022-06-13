import { connect } from 'dva';
import classnames from 'classnames';
import DataChangePool from '@/utils/Assist/DataChangePool';
import BaseConfig from './components/BaseConfig';
import { mapStateToProps, mapDispatchToProps } from './connect';
import styles from './index.less';

const InterActiveConfig = (props: {
  id: string;
  components: ComponentData.TComponentData[];
}) => {
  const { id, components } = props;

  return (
    <div
      className={classnames(
        styles['design-config-interactive'],
        'design-config-format-font-size',
      )}
    >
      <BaseConfig
        id={id}
        components={components}
        onChange={DataChangePool.setComponent}
      />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(InterActiveConfig);
