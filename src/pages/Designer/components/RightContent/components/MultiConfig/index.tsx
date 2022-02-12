import classnames from 'classnames';
import ConfigWrapper, { ConfigItem } from '../Common/ConfigWrapper';
import styles from './index.less';

const MultiConfig = () => {
  return (
    <div className={classnames('h-100', styles['design-config-multi'])}>
      <ConfigWrapper tabCounter={1}>
        <ConfigItem tab="多组件配置" key="1"></ConfigItem>
      </ConfigWrapper>
    </div>
  );
};

export default MultiConfig;
