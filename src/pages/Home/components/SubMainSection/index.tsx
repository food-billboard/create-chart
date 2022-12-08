import {} from 'react';
import styles from './index.less';

const SubMainSection = () => {
  return (
    <div>
      <div className={styles['home-page-action-tag']}>
        <span className="animate__fadeInDown animate__animated animate__repeat-1 animate__delay-2s">
          组件丰富
        </span>
        <span className="animate__fadeInDown animate__animated animate__repeat-1 animate__delay-3s">
          千人千面
        </span>
        <span className="animate__fadeInDown animate__animated animate__repeat-1 animate__delay-4s">
          快速扩展
        </span>
      </div>
    </div>
  );
};

export default SubMainSection;
