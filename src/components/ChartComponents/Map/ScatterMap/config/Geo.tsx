import { useCallback, useMemo } from 'react';
import { pick } from 'lodash';
import { CompatColorSelect } from '@/components/ColorSelect';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import { SingleCollapse as Collapse } from '@/components/ChartComponents/Common/Collapse';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import InputNumber from '@/components/ChartComponents/Common/InputNumber';
import CenterPositionConfig from '@/components/ChartComponents/Common/CenterPositionConfig';
import ChartGradientSelect from '@/components/ChartComponents/Common/ChartGradientSelect';
import ShadowConfig from '@/components/ChartComponents/Common/ShadowConfig';
import { TScatterMapConfig } from '../type';

const { Item } = ConfigList;

const GeoConfig = (props: {
  value: TScatterMapConfig['geo'];
  onChange: ComponentData.ComponentConfigProps<TScatterMapConfig>['onChange'];
}) => {
  const { value, onChange } = props;
  const { itemStyle, center } = value;

  const onKeyChange = useCallback(
    (key: keyof TScatterMapConfig['geo'], value: any) => {
      onChange({
        config: {
          options: {
            geo: {
              [key]: value,
            },
          },
        },
      });
    },
    [onChange],
  );

  const centerConfig = useMemo(() => {
    return (
      <CenterPositionConfig
        value={{
          left: center[0],
          top: center[1],
        }}
        parentLabel="中心位置"
        subLabel={['经度', '纬度']}
        onChange={(value) => {
          const { left, top } = value;
          onKeyChange('center', [left, top]);
        }}
      />
    );
  }, [center, onKeyChange]);

  const itemStyleConfig = useMemo(() => {
    return (
      <Collapse
        child={{
          header: '区块样式',
          key: 'itemStyle',
        }}
      >
        <Collapse
          child={{
            header: '基础样式',
            key: 'normal',
          }}
        >
          <Item label="边框">
            <FullForm label="宽度">
              <InputNumber
                value={itemStyle.normal.borderWidth}
                onChange={(value) => {
                  onKeyChange('itemStyle', {
                    normal: {
                      borderWidth: value,
                    },
                  });
                }}
              />
            </FullForm>
            <FullForm label="颜色">
              <CompatColorSelect
                value={itemStyle.normal.borderColor}
                onChange={(value) => {
                  onKeyChange('itemStyle', {
                    normal: {
                      borderColor: value,
                    },
                  });
                }}
              />
            </FullForm>
          </Item>
          <Collapse
            child={{
              header: '区域颜色',
              key: 'areaStyle',
            }}
          >
            <ChartGradientSelect
              value={itemStyle.normal.areaColor}
              onChange={(value) => {
                onKeyChange('itemStyle', {
                  normal: {
                    areaColor: value,
                  },
                });
              }}
            />
          </Collapse>
          <Collapse
            child={{
              header: '阴影',
              key: 'shadow',
            }}
          >
            <ShadowConfig
              value={pick(itemStyle.normal, [
                'shadowColor',
                'shadowOffsetX',
                'shadowOffsetY',
                'shadowBlur',
              ])}
              onChange={(value) => {
                onKeyChange('itemStyle', {
                  normal: value,
                });
              }}
            />
          </Collapse>
        </Collapse>
        <Collapse
          child={{
            header: '选中样式',
            key: 'emphasis',
          }}
        >
          <Item label="边框">
            <FullForm label="宽度">
              <InputNumber
                value={itemStyle.emphasis.borderWidth}
                onChange={(value) => {
                  onKeyChange('itemStyle', {
                    emphasis: {
                      borderWidth: value,
                    },
                  });
                }}
              />
            </FullForm>
            <FullForm label="颜色">
              <CompatColorSelect
                value={itemStyle.emphasis.borderColor}
                onChange={(value) => {
                  onKeyChange('itemStyle', {
                    emphasis: {
                      borderColor: value,
                    },
                  });
                }}
              />
            </FullForm>
          </Item>
          <Collapse
            child={{
              header: '区域颜色',
              key: 'areaStyle',
            }}
          >
            <ChartGradientSelect
              value={itemStyle.emphasis.areaColor}
              onChange={(value) => {
                onKeyChange('itemStyle', {
                  emphasis: {
                    areaColor: value,
                  },
                });
              }}
            />
          </Collapse>
          <Collapse
            child={{
              header: '阴影',
              key: 'shadow',
            }}
          >
            <ShadowConfig
              value={pick(itemStyle.emphasis, [
                'shadowColor',
                'shadowOffsetX',
                'shadowOffsetY',
                'shadowBlur',
              ])}
              onChange={(value) => {
                onKeyChange('itemStyle', {
                  emphasis: value,
                });
              }}
            />
          </Collapse>
        </Collapse>
      </Collapse>
    );
  }, [itemStyle, onKeyChange]);

  return (
    <ConfigList>
      {centerConfig}
      {itemStyleConfig}
    </ConfigList>
  );
};

export default GeoConfig;
