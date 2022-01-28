import { ReactNode } from 'react';
import classnames from 'classnames';
import styles from './index.less';

const PlaceHolder = (props: { children?: ReactNode }) => {
  const { children } = props;

  return (
    <i
      className={classnames(styles['design-right-placeholder'], {
        [styles['design-right-placeholder-show']]: !!children,
      })}
    >
      {children}
    </i>
  );
};

export default PlaceHolder;
