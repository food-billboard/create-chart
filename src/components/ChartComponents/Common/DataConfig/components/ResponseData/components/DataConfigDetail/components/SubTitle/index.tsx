import { ReactNode } from 'react';
import {} from 'antd';
import styles from './index.less';

const SubTitle = (props: { children?: ReactNode }) => {
  const { children } = props;

  return (
    <div className={styles['design-config-data-detail-sub-title']}>
      {children}
    </div>
  );
};

export const SubForm = (props: { children?: ReactNode }) => {
  const { children } = props;

  return (
    <div className={styles['design-config-data-detail-sub-form']}>
      {children}
    </div>
  );
};

export default SubTitle;
