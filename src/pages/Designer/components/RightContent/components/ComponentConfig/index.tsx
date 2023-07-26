import BaseConfig from '@/components/ChartComponents/Common/BaseConfig';
import ConfigWrapper, {
  ConfigItem,
} from '@/components/ChartComponents/Common/ConfigWrapper';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import IconTooltip from '@/components/IconTooltip';
import LazyLoadWrapper from '@/components/LazyLoad';
import {
  CodeOutlined,
  ControlOutlined,
  ProjectOutlined,
} from '@ant-design/icons';
import { useCallback, useMemo } from 'react';
import { connect } from 'umi';
import ConfigComponent from './ConfigComponent';
import { mapDispatchToProps, mapStateToProps } from './connect';
import styles from './index.less';

const DataConfig = LazyLoadWrapper(async () => {
  return import(
    /* webpackChunkName: "DATA_CONFIG" */ '@/components/ChartComponents/Common/DataConfig'
  );
});

const InterActiveConfig = LazyLoadWrapper(async () => {
  return import(
    /* webpackChunkName: "INTERACTIVE_CONFIG" */ '@/components/ChartComponents/Common/InterActiveConfig'
  );
});

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
        items={[
          {
            label: (
              <IconTooltip title="配置">
                <ProjectOutlined />
              </IconTooltip>
            ),
            key: '1',
            children: (
              <ConfigItem>
                <ConfigList>
                  <BaseConfig id={id} isGroupComponent={false} />
                  <ConfigList level={1}>
                    <ConfigComponent component={component} id={id} />
                  </ConfigList>
                </ConfigList>
              </ConfigItem>
            ),
          },
          {
            label: (
              <IconTooltip title="数据">
                <CodeOutlined />
              </IconTooltip>
            ),
            key: '2',
            children: (
              <ConfigItem>
                <DataConfig id={id} component={component} />
              </ConfigItem>
            ),
          },
          {
            label: (
              <IconTooltip title="交互">
                <ControlOutlined />
              </IconTooltip>
            ),
            key: '3',
            children: (
              <ConfigItem>
                <InterActiveConfig id={id} />
              </ConfigItem>
            ),
          },
        ]}
      />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ComponentConfig);
