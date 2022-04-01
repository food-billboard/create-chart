import { useMemo } from 'react';
import OuterConnectLeft from '../OuterConnectLeft';
import OuterConnectRight from '../OuterConnectRight';
import InnerConnectLeft from '../InnerConnectLeft';
import InnerConnectRight from '../InnerConnectRight';
import styles from './index.less';

const RuleHeader = (props: { isTop?: boolean; value: 'and' | 'or' }) => {
  const { isTop = false, value } = props;

  const connectLeft = useMemo(() => {
    if (isTop) return <OuterConnectLeft />;
    return <InnerConnectLeft />;
  }, [isTop]);

  const connectRight = useMemo(() => {
    if (isTop) return <OuterConnectRight />;
    return <InnerConnectRight />;
  }, [isTop]);

  return (
    <div className={styles['component-rule-tree-header']}>
      <div className={styles['component-rule-tree-header-action']}>
        <div className={styles['component-rule-tree-header-action-and']}></div>
        <div className={styles['component-rule-tree-header-action-or']}></div>
      </div>
      <div className={styles['component-rule-tree-header-connect']}>
        <div
          className={styles['component-rule-tree-header-connect-left']}
        ></div>
        <div
          className={styles['component-rule-tree-header-connect-right']}
        ></div>
      </div>
    </div>
  );
};

export default RuleHeader;
