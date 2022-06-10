import { useMemo, useCallback } from 'react';
import classnames from 'classnames';
import { connect } from 'dva';
import { getComponent, isComponentDisabled } from '@/utils/Assist/Component';
import ConfigWrapper, {
  ConfigItem,
} from '@/components/ChartComponents/Common/ConfigWrapper';
import BaseConfig from '@/components/ChartComponents/Common/BaseConfig';
import OptionConfig from './components/OptionConfig';
import { mapStateToProps, mapDispatchToProps } from './connect';
import styles from './index.less';

const GroupConfig = (props: {
  id: string;
  components: ComponentData.TComponentData[];
  component: ComponentData.TComponentData;
  setSelect: (value: string[]) => void;
}) => {
  const { id, components, component, setSelect } = props;

  const title = useMemo(() => {
    const component: ComponentData.TComponentData = getComponent(
      id,
      components,
    );
    return component?.name;
  }, [components, id]);

  const disabled = isComponentDisabled(id);

  const onBack = useCallback(() => {
    const { parent } = component;
    setSelect([parent!]);
  }, [component, setSelect]);

  const hasBack = useMemo(() => {
    return !!component?.parent;
  }, [component]);

  return (
    <div
      className={classnames('h-100', styles['design-config-group'])}
      style={{
        pointerEvents: disabled ? 'none' : 'unset',
      }}
    >
      <ConfigWrapper
        tabCounter={1}
        title={title}
        hasBack={hasBack}
        onBack={onBack}
      >
        <ConfigItem tab="组合配置" key="1">
          <BaseConfig isGroupComponent id={id} />
          <OptionConfig component={component} />
        </ConfigItem>
      </ConfigWrapper>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupConfig);
