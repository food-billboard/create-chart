import BackgroundSelect from '@/components/InternalBackground/components/BackgroundSelect';
import styles from './index.less';

const MediaManage = () => {
  return (
    <div className={styles['media-manage']}>
      <BackgroundSelect visibleType="page" mode="editable" />
    </div>
  );
};

export default MediaManage;
