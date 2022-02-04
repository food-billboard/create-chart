import { Tabs } from 'antd';
import ConfigWrapper from '../Common/ConfigWrapper';

const GroupConfig = () => {
  return (
    <div>
      <ConfigWrapper tabCounter={1}>
        <Tabs.TabPane tab="组合配置" key="1"></Tabs.TabPane>
      </ConfigWrapper>
    </div>
  );
};

export default GroupConfig;
