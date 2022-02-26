import { ReactNode } from 'react';
import styles from './index.less';

// 半行表单的占位符

const HalfFormPlaceHolder = (props: { children?: ReactNode }) => {
  const { children } = props;

  return (
    <i
      className={styles['design-config-half-form-placeholder']}
      style={{
        cursor: !!children ? 'pointer' : 'default',
      }}
    >
      {children}
    </i>
  );
};

export default HalfFormPlaceHolder;
