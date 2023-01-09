import { ReactNode, CSSProperties } from 'react';
import classnames from 'classnames';
import styles from './index.less';

// 基础配置的半行表单

const HalfForm = ({
  children,
  label,
  style,
  className,
  prefix,
  suffix,
}: {
  children?: ReactNode;
  label?: string | ReactNode;
  style?: CSSProperties;
  className?: string;
  prefix?: string;
  suffix?: string;
}) => {
  return (
    <div
      className={classnames(styles['design-config-half-form'], className)}
      style={style}
    >
      <div className={styles['design-config-half-form-content']}>
        {prefix}
        {children}
        {suffix}
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
