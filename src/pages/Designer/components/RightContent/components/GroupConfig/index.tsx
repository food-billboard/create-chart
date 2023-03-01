import { useMemo, useCallback } from 'react';
import classnames from 'classnames';
import { observer } from 'mobx-react-lite';
import { useMobxContext } from '@/hooks';
import { isComponentDisabled } from '@/utils/Assist/Component';
import ConfigWrapper, {
  ConfigItem,
} from '@/components/ChartComponents/Common/ConfigWrapper';
import BaseConfig from '@/components/ChartComponents/Common/BaseConfig';
import OptionConfig from './components/OptionConfig';
import CarouselConfig from './components/CarouselConfig';
import styles from './index.less';

const GroupConfig = (props: {
  id: string;
  component: ComponentData.TComponentData;
}) => {
  const { id, component } = props;

  const {
    global: { setSelect },
  } = useMobxContext();

  const title = useMemo(() => {
    return component?.name;
  }, [component, id]);

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
        items={[
          {
            label: '组合配置',
            key: '1',
            children: (
              <ConfigItem>
                <BaseConfig isGroupComponent id={id} />
                <OptionConfig component={component} />
              </ConfigItem>
            ),
          },
          {
            label: '轮播配置',
            key: '2',
            children: (
              <ConfigItem>
                <CarouselConfig component={component} />
              </ConfigItem>
            ),
          },
        ]}
      />
    </div>
  );
};

export default observer(GroupConfig);
