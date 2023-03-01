import { useMemo } from 'react';
import classnames from 'classnames';
import { get } from 'lodash';
import { observer } from 'mobx-react-lite';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useMobxContext } from '@/hooks';
import DataChangePool from '@/utils/Assist/DataChangePool';
import { getComponent } from '@/utils/Assist/Component';
import BaseConfig from './components/BaseConfig';
import LinkageConfig from './components/LinkageConfig';
import styles from './index.less';

const InterActiveConfig = (props: { id: string }) => {
  const { id } = props;

  const {
    global: { components },
  } = useMobxContext();

  const component = useMemo(() => {
    return getComponent(id, components);
  }, [id, components]);

  const {
    base: baseInteractive = [],
    linkage: linkageInteractive = [],
  }: Pick<ComponentData.TInteractiveConfig, 'base' | 'linkage'> =
    useMemo(() => {
      return get(component, 'config.interactive')!;
    }, [component]);

  return (
    <div
      className={classnames(
        styles['design-config-interactive'],
        'design-config-format-font-size',
      )}
    >
      {!baseInteractive.length && !linkageInteractive.length && (
        <div className={styles['design-config-interactive-base-empty']}>
          <InfoCircleOutlined style={{ marginRight: 4 }} />
          该组件无交互事件
        </div>
      )}
      {!!baseInteractive.length && (
        <BaseConfig
          id={id}
          component={component}
          onChange={DataChangePool.setComponent}
        />
      )}
      {!!linkageInteractive.length && (
        <LinkageConfig
          id={id}
          component={component}
          onChange={DataChangePool.setComponent}
        />
      )}
    </div>
  );
};

export default observer(InterActiveConfig);
