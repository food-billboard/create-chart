import { useMemo, CSSProperties } from 'react';
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
  className?: string;
  style?: CSSProperties;
}) => {
  const { isTop = false, value, className, style, onChange } = props;

  const connectLeft = useMemo(() => {
    if (isTop) return <OuterConnectLeft />;
    return <InnerConnectLeft />;
  }, [isTop]);

  const connectRight = useMemo(() => {
    if (isTop) return <OuterConnectRight />;
    return <InnerConnectRight />;
  }, [isTop]);

  return (
    <div
      className={classnames(styles['component-rule-tree-header'], className)}
      style={style}
    >
      <div className={styles['component-rule-tree-header-action']}>
        <div
          className={classnames(
            styles['component-rule-tree-header-action-and'],
            {
              [styles['component-rule-tree-header-action-active']]:
                value === 'and',
            },
          )}
          onClick={onChange.bind(null, 'and')}
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
          onClick={onChange.bind(null, 'or')}
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
