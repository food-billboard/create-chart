import { usePrimaryColor } from '@/hooks';
import classnames from 'classnames';
import { connect } from 'umi';
import { mapDispatchToProps, mapStateToProps } from './connect';
import styles from './index.less';

const NameTag = (props: {
  componentName: string;
  componentId: string;
  loggerMode: boolean;
}) => {
  const { componentName, componentId, loggerMode } = props;

  const color = usePrimaryColor();

  return (
    <div
      className={classnames(styles['component-name-tag'], 'pos-ab p-4')}
      style={{
        visibility: loggerMode ? 'visible' : 'hidden',
        color: color,
      }}
    >
      <span>{componentName}</span>
      <span>({componentId})</span>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(NameTag);
