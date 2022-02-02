import { ReactNode } from 'react';
import { Tabs } from 'antd';
import {
  CodeOutlined,
  ControlOutlined,
  ProjectOutlined,
} from '@ant-design/icons';
import IconTooltip from '@/components/IconTooltip';
import ConfigList from '../Common/Structure/ConfigList';
import BaseConfig from '../Common/BaseConfig';
import DataConfig from '../Common/DataConfig';
import ConfigWrapper from '../Common/ConfigWrapper';

const ComponentConfig = (props: { options?: ReactNode }) => {
  const { options } = props;

  return (
    <div>
      <ConfigWrapper tabCounter={3}>
        <Tabs.TabPane
          tab={
            <IconTooltip title="配置">
              <ProjectOutlined />
            </IconTooltip>
          }
          key="1"
        >
          <ConfigList>
            <BaseConfig />
            {options}
          </ConfigList>
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <IconTooltip title="数据">
              <CodeOutlined />
            </IconTooltip>
          }
          key="2"
        >
          <DataConfig />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <IconTooltip title="交互">
              <ControlOutlined />
            </IconTooltip>
          }
          key="3"
        ></Tabs.TabPane>
      </ConfigWrapper>
    </div>
  );
};

export default ComponentConfig;
