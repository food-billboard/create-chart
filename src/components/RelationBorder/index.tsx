import { ReactNode } from 'react';
import classnames from 'classnames';
import styles from './index.less';

const RelationBorder = (props: { children?: ReactNode }) => {
  const { children } = props;

  return (
    <div className={styles['component-relation-border-wrapper']}>
      <div
        className={classnames(styles['component-relation-border'], 'border-1')}
      ></div>
      <div className={styles['component-relation-border-main']}>{children}</div>
    </div>
  );
};

export default RelationBorder;
