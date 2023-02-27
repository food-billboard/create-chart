import { useCallback } from 'react';
import { merge } from 'lodash';
import { useMobxContext } from '@/hooks';
import ComponentOptionConfig, {
  Tab,
} from '@/components/ChartComponents/Common/ComponentOptionConfig';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import { getPath } from '@/utils/Assist/Component';
import DataChangePool from '@/utils/Assist/DataChangePool';
import KeyWordPosition from './components/KeyWordPosition';
import ConditionConfig from './components/ConditionConfig';
import TransformConfig from './components/TransformConfig';

const OrientConfig = (props: { component: ComponentData.TComponentData }) => {
  const { component } = props;

  const {
    global: {
      screenData: {
        config: {
          flag: { type: flag },
        },
      },
    },
  } = useMobxContext();

  const {
    id,
    config: { options },
    components,
  } = component;

  const onChange = useCallback(
    (value: SuperPartial<ComponentData.TComponentData>) => {
      const componentPath = getPath(id);

      DataChangePool.setComponent({
        value,
        id,
        path: componentPath,
        action: 'update',
      });
    },
    [id],
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
    [component],
  );

  return (
    <ComponentOptionConfig
      items={[
        ...(flag === 'PC'
          ? [
              {
                label: <Tab>基础</Tab>,
                children: (
                  <ConfigList level={1}>
                    <KeyWordPosition onChange={onOrientChange} />
                  </ConfigList>
                ),
                key: '1',
              },
            ]
          : []),
        {
          label: <Tab>条件</Tab>,
          children: (
            <ConfigList level={1}>
              <ConditionConfig
                value={
                  ((options as any)?.condition ||
                    []) as ComponentData.ComponentConditionConfig
                }
                onChange={onChange}
              />
            </ConfigList>
          ),
          key: '2',
        },
        {
          label: <Tab>3d变换</Tab>,
          children: (
            <ConfigList level={1}>
              <TransformConfig
                value={
                  ((options as any)?.transform ||
                    {}) as ComponentData.TGroupComponentTransformConfig
                }
                childComponents={components}
                onChange={onChange}
              />
            </ConfigList>
          ),
          key: '3',
        },
      ]}
    />
  );
};

export default OrientConfig;
