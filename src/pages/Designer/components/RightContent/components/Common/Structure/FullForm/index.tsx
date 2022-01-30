import { ReactNode } from 'react';
import classnames from 'classnames';
import styles from './index.less';

const FullForm = ({
  children,
  label,
}: {
  children?: ReactNode;
  label?: string | ReactNode;
}) => {
  return (
    <div className={styles['design-config-full-form']}>
      <div className={styles['design-config-full-form-content']}>
        {children}
      </div>
      {label && (
        <div
          className={classnames(
            styles['design-config-full-form-label'],
            'text-ellipsis',
          )}
        >
          {label}
        </div>
      )}
    </div>
  );
};

export default FullForm;
