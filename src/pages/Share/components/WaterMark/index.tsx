import { connect } from 'umi';
import { mapDispatchToProps, mapStateToProps } from './connect';
import styles from './index.less';

const WaterMark = (props: { waterMark: boolean }) => {
  const { waterMark } = props;

  return (
    <div
      className={styles['designer-water-mark']}
      style={{
        display: waterMark ? 'block' : 'none',
      }}
    />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(WaterMark);
