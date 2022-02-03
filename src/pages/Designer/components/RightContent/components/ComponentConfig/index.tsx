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
import ConfigWrapper, { ConfigItem } from '../Common/ConfigWrapper';

const ComponentConfig = (props: { options?: ReactNode }) => {
  const { options } = props;

  return (
    <div className="h-100">
      <ConfigWrapper tabCounter={3}>
        <ConfigItem
          tab={
            <IconTooltip title="配置">
              <ProjectOutlined />
            </IconTooltip>
          }
          key="1"
        >
          <ConfigList>
            <BaseConfig />
            <ConfigList level={1}>{options}</ConfigList>
          </ConfigList>
        </ConfigItem>
        <ConfigItem
          tab={
            <IconTooltip title="数据">
              <CodeOutlined />
            </IconTooltip>
          }
          key="2"
        >
          <DataConfig />
        </ConfigItem>
        <ConfigItem
          tab={
            <IconTooltip title="交互">
              <ControlOutlined />
            </IconTooltip>
          }
          key="3"
        ></ConfigItem>
      </ConfigWrapper>
    </div>
  );
};

export default ComponentConfig;
