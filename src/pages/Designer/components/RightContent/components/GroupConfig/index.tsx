import { useMemo } from 'react';
import classnames from 'classnames';
import { getComponent, isComponentDisabled } from '@/utils/Assist/Component';
import ConfigWrapper, {
  ConfigItem,
} from '@/components/ChartComponents/Common/ConfigWrapper';
import BaseConfig from '@/components/ChartComponents/Common/BaseConfig';
import OptionConfig from './components/OptionConfig';
import styles from './index.less';

const GroupConfig = (props: {
  id: string;
  components: ComponentData.TComponentData[];
  component: ComponentData.TComponentData;
}) => {
  const { id, components, component } = props;

  const title = useMemo(() => {
    const component: ComponentData.TComponentData = getComponent(
      id,
      components,
    );
    return component?.name;
  }, [components, id]);

  const disabled = isComponentDisabled(id);

  return (
    <div
      className={classnames('h-100', styles['design-config-group'])}
      style={{
        pointerEvents: disabled ? 'none' : 'unset',
      }}
    >
      <ConfigWrapper tabCounter={1} title={title}>
        <ConfigItem tab="组合配置" key="1">
          <BaseConfig isGroupComponent id={id} />
          <OptionConfig component={component} />
        </ConfigItem>
      </ConfigWrapper>
    </div>
  );
};

export default GroupConfig;
