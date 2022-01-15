import {} from 'react';
import classnames from 'classnames';
import styles from './index.less';

const RightContent = () => {
  return (
    <div className={classnames(styles['design-page-right'], 'p-lr-24')}>
      right content
    </div>
  );
};

export default RightContent;
