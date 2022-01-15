import {} from 'react';
import classnames from 'classnames';
import styles from './index.less';

const LeftContent = () => {
  return (
    <div className={classnames(styles['design-page-left'], 'p-lr-24')}>
      left content
    </div>
  );
};

export default LeftContent;
