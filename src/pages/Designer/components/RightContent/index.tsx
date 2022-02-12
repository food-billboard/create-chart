import { useMemo, useRef } from 'react';
import classnames from 'classnames';
import { connect } from 'dva';
import { useComponentPath, usePanelFocus } from '@/hooks';
import { isGroupComponent, getComponent } from '@/utils/Assist/Component';
import GlobalConfig from './components/GlobalConfig';
import GroupConfig from './components/GroupConfig';
import ComponentConfig from './components/ComponentConfig';
import MultiConfig from './components/MultiConfig';
import { mapDispatchToProps, mapStateToProps } from './connect';
import styles from './index.less';

const RightContent = (props: {
  select: string[];
  components: ComponentData.TComponentData[];
}) => {
  const { select, components } = props;

  const ref = useRef<HTMLDivElement>(null);

  usePanelFocus(ref);

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
      return <GroupConfig id={selectId} components={components} />;
    }

    return <ComponentConfig id={selectId} components={components} />;
  }, [select, components]);

  return (
    <div
      className={classnames(styles['design-page-right'], 'normal-background')}
    >
      {children}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(RightContent);
