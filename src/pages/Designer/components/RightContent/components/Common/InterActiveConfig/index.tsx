import {} from 'react';
import classnames from 'classnames';
import styles from './index.less';

const InterActiveConfig = () => {
  return (
    <div
      className={classnames(
        styles['design-config-interactive'],
        'design-config-format-font-size',
      )}
    ></div>
  );
};

export default InterActiveConfig;
