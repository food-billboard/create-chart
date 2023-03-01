import { useCallback } from 'react';
import classnames from 'classnames';
import { observer } from 'mobx-react-lite';
import { useMobxContext } from '@/hooks';
import ConfigWrapper, {
  ConfigItem,
} from '@/components/ChartComponents/Common/ConfigWrapper';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import {
  getTopParentComponent,
  isComponentDisabled,
  getDvaGlobalModelData,
} from '@/utils/Assist/Component';
import DataChangePool from '@/utils/Assist/DataChangePool';
import { ConnectState } from '@/models/connect';
import KeyWordPosition from '../GroupConfig/components/OptionConfig/components/KeyWordPosition';
import styles from './index.less';

const MultiConfig = () => {
  const {
    global: {
      screenData: {
        config: {
          flag: { type: flag },
        },
      },
    },
  } = useMobxContext();

  const onOrientChange = useCallback((value) => {
    const { components, select } =
      getDvaGlobalModelData() as ConnectState['global'];

    let newComponents: ComponentMethod.SetComponentMethodParamsData[] = [];

    let left = 99999;
    let right = 0;
    let top = 99999;
    let bottom = 0;

    const needUpdateComponents = select.reduce<ComponentData.TComponentData[]>(
      (acc, cur) => {
        const topComponent = getTopParentComponent(cur, components);

        if (!isComponentDisabled(topComponent.id)) {
          const {
            config: {
              style: {
                width: currentWidth,
                height: currentHeight,
                left: currentLeft,
                top: currentTop,
              },
            },
          } = topComponent;

          left = Math.min(left, currentLeft);
          top = Math.min(top, currentTop);
          right = Math.max(right, currentLeft + currentWidth);
          bottom = Math.max(bottom, currentTop + currentHeight);

          acc.push(topComponent);
        }

        return acc;
      },
      [],
    );

    const width = right - left;
    const height = bottom - top;

    newComponents = needUpdateComponents.map((component) => {
      const {
        config: {
          style: {
            left: componentLeft,
            top: componentTop,
            width: componentWidth,
            height: componentHeight,
          },
        },
        id,
      } = component;
      let newLeft = componentLeft;
      let newTop = componentTop;
      if (value.left) {
        switch (value.left) {
          case 'left':
            newLeft = left;
            break;
          case 'center':
            newLeft = left + width / 2 - componentWidth / 2;
            break;
          case 'right':
            newLeft = right - componentWidth;
            break;
        }
      } else {
        switch (value.top) {
          case 'top':
            newTop = top;
            break;
          case 'center':
            newTop = top + height / 2 - componentHeight / 2;
            break;
          case 'bottom':
            newTop = bottom - componentHeight;
            break;
        }
      }
      return {
        value: {
          config: {
            style: {
              left: newLeft,
              top: newTop,
            },
          },
        },
        action: 'update',
        id,
      };
    });
    DataChangePool.setComponent(newComponents);
  }, []);

  return (
    <div className={classnames('h-100', styles['design-config-multi'])}>
      <ConfigWrapper
        tabCounter={1}
        items={[
          {
            label: '多组件配置',
            key: '1',
            children: (
              <ConfigItem>
                <div>
                  <ConfigList level={1}>
                    {flag === 'PC' && (
                      <KeyWordPosition onChange={onOrientChange} />
                    )}
                  </ConfigList>
                </div>
              </ConfigItem>
            ),
          },
        ]}
      />
    </div>
  );
};

export default observer(MultiConfig);
