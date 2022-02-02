import { ReactNode } from 'react';
import classnames from 'classnames';
import styles from './index.less';

// 基础配置的半行表单

const HalfForm = ({
  children,
  label,
}: {
  children?: ReactNode;
  label?: string | ReactNode;
}) => {
  return (
    <div className={styles['design-config-half-form']}>
      <div className={styles['design-config-half-form-content']}>
        {children}
      </div>
      {label && (
        <div
          className={classnames(
            styles['design-config-half-form-label'],
            'text-ellipsis',
          )}
        >
          {label}
        </div>
      )}
    </div>
  );
};

export default HalfForm;
