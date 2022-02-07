import { Select, Tabs } from 'antd';
import classnames from 'classnames';
import ConfigWrapper from '../Common/ConfigWrapper';
import BaseConfig from './components/Config';
import styles from './index.less';

const GroupConfig = () => {
  return (
    <div className={classnames('h-100', styles['design-config-group'])}>
      <ConfigWrapper tabCounter={1}>
        <Tabs.TabPane tab="组合配置" key="1">
          <BaseConfig />
        </Tabs.TabPane>
      </ConfigWrapper>
    </div>
  );
};

export default GroupConfig;
