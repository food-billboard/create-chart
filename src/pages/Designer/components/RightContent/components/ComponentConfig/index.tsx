import { ReactNode, useCallback, useMemo } from 'react';
import {
  CodeOutlined,
  ControlOutlined,
  ProjectOutlined,
} from '@ant-design/icons';
import { connect } from 'dva';
import IconTooltip from '@/components/IconTooltip';
import { getComponent, isComponentDisabled } from '@/utils/Assist/Component';
import ConfigList from '../Common/Structure/ConfigList';
import BaseConfig from '../Common/BaseConfig';
import DataConfig from '../Common/DataConfig';
import InterActiveConfig from '../Common/InterActiveConfig';
import ConfigWrapper, { ConfigItem } from '../Common/ConfigWrapper';
import { mapStateToProps, mapDispatchToProps } from './connect';
import styles from './index.less';

const ComponentConfig = (props: {
  options?: ReactNode;
  id: string;
  components: ComponentData.TComponentData[];
  setSelect: (value: string[]) => void;
}) => {
  const { options, id, components, setSelect } = props;

  const component = useMemo(() => {
    return getComponent(id, components);
  }, [id, components]);

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

  const disabled = isComponentDisabled(id);

  return (
    <div
      className={styles['design-config-component']}
      style={{
        pointerEvents: disabled ? 'none' : 'unset',
      }}
    >
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
            <BaseConfig id={id} />

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
          <DataConfig id={id} components={components} />
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
