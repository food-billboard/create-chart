import {} from 'react';
import classnames from 'classnames';
import styles from './index.less';

const AnimationTitle = () => {
  return (
    <div
      className={classnames(
        styles['typed-title'],
        'animate__animated animate__repeat-1 animate__slow animate__delay-1s',
        'animate__flipInX',
      )}
      id="typed-title"
    >
      数据可视化大屏
    </div>
  );
};

export default AnimationTitle;
