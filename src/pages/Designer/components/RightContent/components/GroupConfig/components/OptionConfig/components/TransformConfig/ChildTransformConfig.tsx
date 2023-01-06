import { useCallback } from 'react';
import { get } from 'lodash';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import HalfForm from '@/components/ChartComponents/Common/Structure/HalfForm';
import InputNumber from '@/components/ChartComponents/Common/InputNumber';
import MultipleSeriesConfig from '@/components/ChartComponents/Common/MultipleSeriesConfig';
import { SingleCollapse as Collapse } from '@/components/ChartComponents/Common/Collapse';
import DataChangePool from '@/utils/Assist/DataChangePool';
import { getPath } from '@/utils/Assist/Component';
import { DEFAULT_CONFIG } from '@/utils/constants/screenData';

const { Item } = ConfigList;

const ChildTransformConfig = (props: {
  components: ComponentData.TComponentData[];
}) => {
  const { components } = props;

  const onKeyChange = useCallback(
    (
      component: ComponentData.TComponentData,
      key: keyof ComponentData.TComponentTransformConfig,
      value: any,
    ) => {
      const { id } = component;
      const componentPath = getPath(id);

      DataChangePool.setComponent({
        value: {
          config: {
            style: {
              groupTransform: {
                [key]: value,
              },
            },
          },
        },
        id,
        path: componentPath,
        action: 'update',
      });
    },
    [],
  );

  return (
    <Collapse
      child={{
        header: '3d变换',
        key: 'transform-config',
      }}
    >
      <MultipleSeriesConfig
        disabledCal
        counter={components.length}
        seriesLabel={(index) => components[index].name}
        renderContent={(index) => {
          const component = components[index];
          const transform: ComponentData.TComponentTransformConfig = get(
            component,
            'config.style.groupTransform',
          ) || {
            ...DEFAULT_CONFIG.style.groupTransform,
          };
          const { scale, rotate, translate } = transform;

          return (
            <>
              <Item label="旋转">
                <HalfForm label="x轴">
                  <InputNumber
                    value={rotate.x}
                    onChange={(value) =>
                      onKeyChange(component, 'rotate', {
                        x: value,
                      })
                    }
                  />
                </HalfForm>
                <HalfForm label="y轴">
                  <InputNumber
                    value={rotate.y}
                    onChange={(value) =>
                      onKeyChange(component, 'rotate', {
                        y: value,
                      })
                    }
                  />
                </HalfForm>
                <HalfForm label="z轴">
                  <InputNumber
                    value={rotate.z}
                    onChange={(value) =>
                      onKeyChange(component, 'rotate', {
                        z: value,
                      })
                    }
                  />
                </HalfForm>
              </Item>
              <Item label="缩放">
                <HalfForm label="x轴">
                  <InputNumber
                    value={scale.x}
                    onChange={(value) =>
                      onKeyChange(component, 'scale', {
                        x: value,
                      })
                    }
                  />
                </HalfForm>
                <HalfForm label="y轴">
                  <InputNumber
                    value={scale.y}
                    onChange={(value) =>
                      onKeyChange(component, 'scale', {
                        y: value,
                      })
                    }
                  />
                </HalfForm>
              </Item>
              <Item label="平移">
                <HalfForm label="x轴">
                  <InputNumber
                    value={translate.x}
                    onChange={(value) =>
                      onKeyChange(component, 'translate', {
                        x: value,
                      })
                    }
                  />
                </HalfForm>
                <HalfForm label="y轴">
                  <InputNumber
                    value={translate.y}
                    onChange={(value) =>
                      onKeyChange(component, 'translate', {
                        y: value,
                      })
                    }
                  />
                </HalfForm>
                <HalfForm label="z轴">
                  <InputNumber
                    value={translate.z}
                    onChange={(value) =>
                      onKeyChange(component, 'translate', {
                        z: value,
                      })
                    }
                  />
                </HalfForm>
              </Item>
            </>
          );
        }}
      />
    </Collapse>
  );
};

export default ChildTransformConfig;
