import { ReactNode, useCallback } from 'react';
import {
  CodeOutlined,
  ControlOutlined,
  ProjectOutlined,
} from '@ant-design/icons';
import IconTooltip from '@/components/IconTooltip';
import ConfigList from '../Common/Structure/ConfigList';
import BaseConfig from '../Common/BaseConfig';
import DataConfig from '../Common/DataConfig';
import InterActiveConfig from '../Common/InterActiveConfig';
import ConfigWrapper, { ConfigItem } from '../Common/ConfigWrapper';
import styles from './index.less';
import { useMemo } from 'react';

const ComponentConfig = (props: { options?: ReactNode }) => {
  const { options } = props;

  const onBack = useCallback(() => {}, []);

  const hasBack = useMemo(() => {
    return false;
  }, []);

  return (
    <div className={styles['design-config-component']}>
      <ConfigWrapper hasBack={hasBack} onBack={onBack} tabCounter={3}>
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
        >
          <InterActiveConfig />
        </ConfigItem>
      </ConfigWrapper>
    </div>
  );
};

export default ComponentConfig;
