import { ReactNode, CSSProperties } from 'react';
import classnames from 'classnames';
import styles from './index.less';

// 基础配置的行占位符

const PlaceHolder = (props: {
  children?: ReactNode;
  style?: CSSProperties;
  className?: string;
}) => {
  const { children, style, className } = props;

  return (
    <i
      className={classnames(
        styles['design-right-placeholder'],
        {
          [styles['design-right-placeholder-show']]: !!children,
        },
        className,
      )}
      style={style}
    >
      {children}
    </i>
  );
};

export default PlaceHolder;
