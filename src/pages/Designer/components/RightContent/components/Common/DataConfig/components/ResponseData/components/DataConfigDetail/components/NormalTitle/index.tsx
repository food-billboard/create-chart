import { Badge } from 'antd';
import { ReactNode, useMemo } from 'react';
import styles from './index.less';

const Title = (props: { children?: ReactNode; visible?: boolean }) => {
  const { children, visible = true } = props;

  const status = useMemo(() => {
    return visible ? 'processing' : 'default';
  }, [visible]);

  return (
    <div className={styles['design-config-data-detail-title']}>
      <Badge status={status} size="default" />
      {children}
    </div>
  );
};

export default Title;
