import { useCallback } from 'react';
import { Tabs } from 'antd';
import { connect } from 'dva';
import { merge } from 'lodash';
import ComponentOptionConfig, {
  Tab,
} from '@/components/ChartComponents/Common/ComponentOptionConfig';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import { getPath } from '@/utils/Assist/Component';
import KeyWordPosition from './components/KeyWordPosition';
import ConditionConfig from './components/ConditionConfig';
import { mapDispatchToProps, mapStateToProps } from './connect';

const { TabPane } = Tabs;

const OrientConfig = (props: {
  component: ComponentData.TComponentData;
  setComponent: ComponentMethod.SetComponentMethod;
}) => {
  const { component, setComponent } = props;

  const {
    id,
    config: { options },
  } = component;

  const onChange = useCallback(
    (value: SuperPartial<ComponentData.TComponentData>) => {
      const componentPath = getPath(id);

      setComponent({
        value,
        id,
        path: componentPath,
        action: 'update',
      });
    },
    [setComponent, id],
  );

  const onOrientChange = useCallback(
    (value) => {
      const {
        components,
        config: {
          style: { width, height },
        },
      } = component;
      let newComponents: ComponentData.TComponentData[] = [];

      newComponents = components.map((component) => {
        const {
          config: {
            style: {
              left: componentLeft,
              top: componentTop,
              width: componentWidth,
              height: componentHeight,
            },
          },
        } = component;
        let newLeft = componentLeft;
        let newTop = componentTop;
        if (value.left) {
          switch (value.left) {
            case 'left':
              newLeft = 0;
              break;
            case 'center':
              newLeft = width / 2 - componentWidth / 2;
              break;
            case 'right':
              newLeft = width - componentWidth;
              break;
          }
        } else {
          switch (value.top) {
            case 'top':
              newTop = 0;
              break;
            case 'center':
              newTop = height / 2 - componentHeight / 2;
              break;
            case 'bottom':
              newTop = height - componentHeight;
              break;
          }
        }
        return merge(component, {
          config: {
            style: {
              left: newLeft,
              top: newTop,
            },
          },
        });
      });

      onChange({
        components: newComponents,
      });
    },
    [component, setComponent],
  );

  return (
    <ComponentOptionConfig>
      <TabPane key={'1'} tab={<Tab>基础</Tab>}>
        <ConfigList level={1}>
          <KeyWordPosition onChange={onOrientChange} />
        </ConfigList>
      </TabPane>
      <TabPane key="6" tab={<Tab>条件</Tab>}>
        <ConfigList level={1}>
          <ConditionConfig
            value={
              ((options as any)?.condition ||
                []) as ComponentData.ComponentCondition[]
            }
            onChange={onChange}
          />
        </ConfigList>
      </TabPane>
    </ComponentOptionConfig>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(OrientConfig);
