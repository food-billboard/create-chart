import { useMemo } from 'react';
import classnames from 'classnames';
import styles from './index.less';

const HomeBackground = () => {
  const children = useMemo(() => {
    return (
      <>
        <div className={styles['g-group']}>
          <div
            className={classnames(styles['g-item'], styles['item-right'])}
          ></div>
          <div
            className={classnames(styles['g-item'], styles['item-left'])}
          ></div>
          <div
            className={classnames(styles['g-item'], styles['item-top'])}
          ></div>
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
          <div
            className={classnames(styles['g-item'], styles['item-top'])}
          ></div>
          <div
            className={classnames(styles['g-item'], styles['item-bottom'])}
          ></div>
          <div
            className={classnames(styles['g-item'], styles['item-middle'])}
          ></div>
        </div>
      </>
    );
  }, []);

  return <div className={styles['g-container']}>{children}</div>;
};

export default HomeBackground;
