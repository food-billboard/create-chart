import {} from 'react';
import classnames from 'classnames';
import styles from './index.less';

const LinearBackground = () => {
  return (
    <div className={styles['home-linear-background']}>
      <div
        className={classnames(
          styles['home-linear-background-polygon'],
          styles['home-linear-background-polygon-one'],
        )}
      ></div>
      <div
        className={classnames(
          styles['home-linear-background-polygon'],
          styles['home-linear-background-polygon-two'],
        )}
      ></div>
      <div
        className={classnames(
          styles['home-linear-background-polygon'],
          styles['home-linear-background-polygon-three'],
        )}
      ></div>
    </div>
  );
};

export default LinearBackground;
