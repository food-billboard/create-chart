import { ReactNode } from 'react';
import styles from './index.less';

const FormContainer = ({ children }: { children?: ReactNode }) => {
  return (
    <div className={styles['design-config-form-item-container']}>
      {children}
    </div>
  );
};

export default FormContainer;
