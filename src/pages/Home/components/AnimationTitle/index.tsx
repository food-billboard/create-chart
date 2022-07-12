import {} from 'react';
import classnames from 'classnames';
import styles from './index.less';

const AnimationTitle = () => {
  return (
    <h1
      className={classnames(
        styles['typed-title'],
        'animate__animated animate__infinite animate__slow',
        'animate__rubberBand',
      )}
      id="typed-title"
    >
      数据可视化大屏
    </h1>
  );
};

export default AnimationTitle;
