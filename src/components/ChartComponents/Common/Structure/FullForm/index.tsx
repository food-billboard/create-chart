import { ReactNode, CSSProperties } from 'react';
import classnames from 'classnames';
import styles from './index.less';

// 基础配置的行表单

const FullForm = ({
  children,
  label,
  style,
  className,
}: {
  children?: ReactNode;
  label?: string | ReactNode;
  style?: CSSProperties;
  className?: string;
}) => {
  return (
    <div
      className={classnames(styles['design-config-full-form'], className)}
      style={style}
    >
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
