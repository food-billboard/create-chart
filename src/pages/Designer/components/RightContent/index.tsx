import { useMemo } from 'react';
import classnames from 'classnames';
import LazyWrapper from '@/components/LazyLoad';
import FocusWrapper from '@/components/FocusWrapper';
import { useComponentPath, useMobxContext } from '@/hooks';
import { isGroupComponent, getComponent } from '@/utils/Assist/Component';
import GlobalConfig from './components/GlobalConfig';
import styles from './index.less';

const GroupConfig = LazyWrapper(async () => {
  return import(
    /* webpackChunkName: "GROUP_CONFIG" */ './components/GroupConfig'
  );
});

const ComponentConfig = LazyWrapper(async () => {
  return import(
    /* webpackChunkName: "COMPONENT_CONFIG" */ './components/ComponentConfig'
  );
});

const MultiConfig = LazyWrapper(async () => {
  return import(
    /* webpackChunkName: "MULTI_CONFIG" */ './components/MultiConfig'
  );
});

const RightContent = () => {
  const {
    global: { select, components },
    local: { componentConfigCollapse },
  } = useMobxContext();

  const children = useMemo(() => {
    if (!select.length) return <GlobalConfig />;
    if (select.length > 1) {
      return <MultiConfig />;
    }

    const [selectId] = select;
    let component: ComponentData.TComponentData = getComponent(
      selectId,
      components,
    );

    if (!component) {
      useComponentPath(components);
      component = getComponent(selectId, components);
      if (!component) return null;
    }

    if (isGroupComponent(component)) {
      return <GroupConfig id={selectId} component={component} />;
    }

    return <ComponentConfig id={selectId} component={component} />;
  }, [select, components]);

  return (
    <FocusWrapper
      className={classnames(
        styles['design-page-right'],
        'normal-background',
        'design-page-right',
        {
          [styles['design-page-right-show']]: !componentConfigCollapse,
        },
      )}
    >
      {children}
    </FocusWrapper>
  );
};

export default RightContent;
