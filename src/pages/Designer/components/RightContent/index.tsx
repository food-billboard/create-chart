import classnames from 'classnames';
import { useMemo, CSSProperties } from 'react';
import { connect } from 'umi';
import FocusWrapper from '@/components/FocusWrapper';
import LazyWrapper from '@/components/LazyLoad';
import { useComponentPath } from '@/hooks';
import { getComponent, isGroupComponent } from '@/utils/Assist/Component';
import { LocalConfig } from '@/utils/Assist/LocalConfig';
import { MAX_CONFIG_WIDTH, MIN_CONFIG_WIDTH } from '@/utils/constants/another';
import { useResize } from '../LeftContent/components/LayerManage/components/Resize';
import GlobalConfig from './components/GlobalConfig';
import { mapDispatchToProps, mapStateToProps } from './connect';
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

const RightContent = (props: {
  select: string[];
  componentConfigCollapse: boolean;
  components: ComponentData.TComponentData[];
}) => {
  const { select = [], components, componentConfigCollapse } = props;

  const [resizeElement, resizeWidth, isResizing] = useResize({
    defaultSize: MIN_CONFIG_WIDTH + 30,
    max: MAX_CONFIG_WIDTH,
    min: MIN_CONFIG_WIDTH,
    direction: -1,
    localKey: LocalConfig.CONFIG_KEY_COMPONENT_CONFIG_WIDTH,
    style: {
      height: 'calc(100% - 4px)',
      right: 'unset',
      left: 0,
      zIndex: 1,
    },
  });

  const style = useMemo(() => {
    const baseStyle: CSSProperties = {
      width: !componentConfigCollapse ? resizeWidth : 0,
    };
    return baseStyle;
  }, [componentConfigCollapse, resizeWidth]);

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
      if (!component) return <GlobalConfig />;
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
        'pos-re',
        {
          [styles['design-page-right-show']]: !componentConfigCollapse,
          [styles['design-page-right-transition']]: !isResizing,
        },
      )}
      style={style}
    >
      {/* 有点搞不定，先留着 */}
      {/* {resizeElement} */}
      {children}
    </FocusWrapper>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(RightContent);
