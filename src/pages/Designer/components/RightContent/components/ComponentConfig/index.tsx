import { useCallback, useMemo } from 'react';
import {
  CodeOutlined,
  ControlOutlined,
  ProjectOutlined,
} from '@ant-design/icons';
import { connect } from 'dva';
import IconTooltip from '@/components/IconTooltip';
import ConfigComponent from './ConfigComponent';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import BaseConfig from '@/components/ChartComponents/Common/BaseConfig';
import DataConfig from '@/components/ChartComponents/Common/DataConfig';
import InterActiveConfig from '@/components/ChartComponents/Common/InterActiveConfig';
import ConfigWrapper, {
  ConfigItem,
} from '@/components/ChartComponents/Common/ConfigWrapper';
import { mapStateToProps, mapDispatchToProps } from './connect';
import styles from './index.less';

const ComponentConfig = (props: {
  id: string;
  component: ComponentData.TComponentData;
  setSelect: (value: string[]) => void;
}) => {
  const { id, component, setSelect } = props;

  const onBack = useCallback(() => {
    const { parent } = component;
    setSelect([parent!]);
  }, [component, setSelect]);

  const hasBack = useMemo(() => {
    return !!component?.parent;
  }, [component]);

  const title = useMemo(() => {
    return component?.name;
  }, [component]);

  return (
    <div className={styles['design-config-component']}>
      <ConfigWrapper
        hasBack={hasBack}
        onBack={onBack}
        tabCounter={3}
        title={title}
      >
        <ConfigItem
          tab={
            <IconTooltip title="配置">
              <ProjectOutlined />
            </IconTooltip>
          }
          key="1"
        >
          <ConfigList>
            <BaseConfig id={id} isGroupComponent={false} />
            <ConfigList level={1}>
              <ConfigComponent component={component} id={id} />
            </ConfigList>
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
          <DataConfig id={id} component={component} />
        </ConfigItem>
        <ConfigItem
          tab={
            <IconTooltip title="交互">
              <ControlOutlined />
            </IconTooltip>
          }
          key="3"
        >
          <InterActiveConfig id={id} />
        </ConfigItem>
      </ConfigWrapper>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ComponentConfig);
