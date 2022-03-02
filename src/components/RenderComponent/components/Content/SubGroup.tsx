import { ReactNode } from 'react';
import classnames from 'classnames';
import { useComponentChildrenStyle } from '@/hooks';
import styles from '../../index.less';

const SubGroup = (props: {
  children?: ReactNode;
  value: ComponentData.TComponentData;
  isOuter?: boolean;
  [key: string]: any;
}) => {
  const { children, value, className, isOuter = false } = props;

  const childrenStyle = useComponentChildrenStyle(value, {
    isOuter,
  });

  return (
    <div
      className={classnames(
        styles['render-component-wrapper-inner'],
        'pos-ab',
        className,
      )}
      style={childrenStyle}
    >
      {children}
    </div>
  );
};

export default SubGroup;
