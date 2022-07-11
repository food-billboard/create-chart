import {} from 'react';
import classnames from 'classnames';
import styles from './index.less';

const HomeBackground = () => {
  return (
    <div className={styles['g-container']}>
      <div className={styles['g-group']}>
        <div
          className={classnames(styles['g-item'], styles['item-right'])}
        ></div>
        <div
          className={classnames(styles['g-item'], styles['item-left'])}
        ></div>
        <div className={classnames(styles['g-item'], styles['item-top'])}></div>
        <div
          className={classnames(styles['g-item'], styles['item-bottom'])}
        ></div>
        <div
          className={classnames(styles['g-item'], styles['item-middle'])}
        ></div>
      </div>
      <div className={styles['g-group']}>
        <div
          className={classnames(styles['g-item'], styles['item-right'])}
        ></div>
        <div
          className={classnames(styles['g-item'], styles['item-left'])}
        ></div>
        <div className={classnames(styles['g-item'], styles['item-top'])}></div>
        <div
          className={classnames(styles['g-item'], styles['item-bottom'])}
        ></div>
        <div
          className={classnames(styles['g-item'], styles['item-middle'])}
        ></div>
      </div>
    </div>
  );
};

export default HomeBackground;
