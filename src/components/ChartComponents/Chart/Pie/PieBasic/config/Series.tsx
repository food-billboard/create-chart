import { useCallback, useMemo } from 'react';
import { Select, Switch } from 'antd';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import SeriesLabelConfig from '@/components/ChartComponents/Common/SeriesLabelConfig';
import SimpleHueSelect from '@/components/ChartComponents/Common/SimpleHueSelect';
import FormatterSelect from '@/components/ChartComponents/Common/FormatterSelect';
import { SingleCollapse as Collapse } from '@/components/ChartComponents/Common/Collapse';
import HalfForm from '@/components/ChartComponents/Common/Structure/HalfForm';
import InputNumber from '@/components/ChartComponents/Common/InputNumber';
import LineStyle from '@/components/ChartComponents/Common/LineStyleSelect';
import CenterPositionConfig from '@/components/ChartComponents/Common/CenterPositionConfig';
import { TPieBasicConfig } from '../type';

const { Item } = ConfigList;

const SeriesConfig = (props: {
  value: TPieBasicConfig['series'];
  onChange: ComponentData.ComponentConfigProps<TPieBasicConfig>['onChange'];
}) => {
  const { value, onChange } = props;
  const { center, radius, label, itemStyle, labelLine } = value;

  const onKeyChange = useCallback(
    (key: keyof TPieBasicConfig['series'], value: any) => {
      onChange({
        config: {
          options: {
            series: {
              [key]: value,
            },
          },
        },
      });
    },
    [onChange],
  );

  const labelConfig = useMemo(() => {
    return (
      <SeriesLabelConfig
        {...(label as any)}
        onChange={onKeyChange.bind(null, 'label')}
        ignore={['position']}
      >
        <Item label="位置">
          <FullForm>
            <Select
              className="w-100"
              value={label.position}
              onChange={(value) => {
                onKeyChange('label', {
                  position: value,
                });
              }}
            >
              <Select.Option key="inside" value="inside">
                内部
              </Select.Option>
              <Select.Option key="outside" value="outside">
                外部
              </Select.Option>
            </Select>
          </FullForm>
        </Item>
        <FormatterSelect
          value={label.formatter}
          onChange={(value) => {
            onKeyChange('label', {
              formatter: value,
            });
          }}
        />
      </SeriesLabelConfig>
    );
  }, [label, onKeyChange]);

  const labelLineConfig = useMemo(() => {
    return (
      <Collapse
        child={{
          header: '引导线',
          key: 'labelLine',
          visibleRender: true,
          onChange: (value) => {
            onKeyChange('labelLine', {
              show: value,
            });
          },
          value: labelLine.show,
        }}
      >
        <Item label="线段">
          <HalfForm label="第一线段">
            <InputNumber
              value={labelLine.length}
              onChange={(value) => {
                onKeyChange('labelLine', {
                  length: value,
                });
              }}
            />
          </HalfForm>
          <HalfForm label="第二线段">
            <InputNumber
              value={labelLine.length2}
              onChange={(value) => {
                onKeyChange('labelLine', {
                  length2: value,
                });
              }}
            />
          </HalfForm>
        </Item>
        <Item label="平滑曲线">
          <Switch
            checked={labelLine.smooth}
            onChange={(value) => {
              onKeyChange('labelLine', {
                smooth: value,
              });
            }}
          />
        </Item>
        <Item label="样式">
          <HalfForm label="宽度">
            <InputNumber
              value={labelLine.lineStyle.width}
              onChange={(value) => {
                onKeyChange('labelLine', {
                  lineStyle: {
                    width: value,
                  },
                });
              }}
            />
          </HalfForm>
          <HalfForm label="线条类型">
            <LineStyle
              value={labelLine.lineStyle.type}
              onChange={(value) => {
                onKeyChange('labelLine', {
                  lineStyle: {
                    type: value,
                  },
                });
              }}
            />
          </HalfForm>
        </Item>
      </Collapse>
    );
  }, [labelLine, onKeyChange]);

  const centerConfig = useMemo(() => {
    return (
      <CenterPositionConfig
        value={{
          left: center[0],
          top: center[1],
        }}
        onChange={(value) => {
          const { left, top } = value;
          onKeyChange('center', [left, top]);
        }}
      />
    );
  }, [center, onKeyChange]);

  const radiusConfig = useMemo(() => {
    return (
      <Item label="饼图大小">
        <FullForm>
          <InputNumber
            max={100}
            min={0}
            value={radius}
            onChange={onKeyChange.bind(null, 'radius')}
            className="w-100"
          />
        </FullForm>
      </Item>
    );
  }, [radius, onKeyChange]);

  const itemStyleConfig = useMemo(() => {
    return (
      <Item label="颜色">
        <SimpleHueSelect
          value={itemStyle.color}
          onChange={(value) => {
            onKeyChange('itemStyle', {
              color: value,
            });
          }}
          max={8}
        />
      </Item>
    );
  }, [itemStyle, onKeyChange, onChange]);

  return (
    <ConfigList>
      {centerConfig}
      {radiusConfig}
      {labelConfig}
      {labelLineConfig}
      {itemStyleConfig}
    </ConfigList>
  );
};

export default SeriesConfig;
