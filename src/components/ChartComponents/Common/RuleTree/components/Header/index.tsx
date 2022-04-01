import { useMemo } from 'react';
import classnames from 'classnames';
import OuterConnectLeft from '../OuterConnectLeft';
import OuterConnectRight from '../OuterConnectRight';
import InnerConnectLeft from '../InnerConnectLeft';
import InnerConnectRight from '../InnerConnectRight';
import styles from './index.less';

const RuleHeader = (props: {
  isTop?: boolean;
  value: 'and' | 'or';
  onChange: (value: 'and' | 'or') => void;
}) => {
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
        <div
          className={classnames(
            styles['component-rule-tree-header-action-and'],
            {
              [styles['component-rule-tree-header-action-active']]:
                value === 'and',
            },
          )}
        >
          并且
        </div>
        <div
          className={classnames(
            styles['component-rule-tree-header-action-or'],
            {
              [styles['component-rule-tree-header-action-active']]:
                value === 'or',
            },
          )}
        >
          或者
        </div>
      </div>
      <div className={styles['component-rule-tree-header-connect']}>
        <div
          className={classnames(
            styles['component-rule-tree-header-connect-left'],
            {
              [styles['component-rule-tree-header-connect-active']]:
                value === 'and',
            },
          )}
        >
          {connectLeft}
        </div>
        <div
          className={classnames(
            styles['component-rule-tree-header-connect-right'],
            {
              [styles['component-rule-tree-header-connect-active']]:
                value === 'or',
            },
          )}
        >
          {connectRight}
        </div>
      </div>
    </div>
  );
};

export default RuleHeader;
