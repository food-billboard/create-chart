import { useCallback, useMemo } from 'react';
import Select from '@/components/ChartComponents/Common/Select';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import SeriesLabelConfig from '@/components/ChartComponents/Common/SeriesLabelConfig';
import SimpleHueSelect from '@/components/ChartComponents/Common/SimpleHueSelect';
import FormatterSelect from '@/components/ChartComponents/Common/FormatterSelect';
import { SingleCollapse as Collapse } from '@/components/ChartComponents/Common/Collapse';
import HalfForm from '@/components/ChartComponents/Common/Structure/HalfForm';
import InputNumber from '@/components/ChartComponents/Common/InputNumber';
import LineStyle from '@/components/ChartComponents/Common/LineStyleSelect';
import NumberPositionConfig from '@/components/ChartComponents/Common/NumberPositionConfig';
import MaxMinConfig from '@/components/ChartComponents/Common/MaxMinConfig';
import GlobalConfig from '@/utils/Assist/GlobalConfig';
import { TFunnelBasicConfig } from '../type';

const { Item } = ConfigList;

const SeriesConfig = (props: {
  value: TFunnelBasicConfig['series'];
  onChange: ComponentData.ComponentConfigProps<TFunnelBasicConfig>['onChange'];
}) => {
  const { value, onChange } = props;
  const {
    max,
    min,
    maxSize,
    minSize,
    label,
    itemStyle,
    labelLine,
    left,
    top,
    right,
    bottom,
  } = value;

  const onKeyChange = useCallback(
    (key: keyof TFunnelBasicConfig['series'], value: any) => {
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
        parent={{
          defaultActiveKey: ['label'],
        }}
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
              options={[
                {
                  label: '内部',
                  value: 'inside',
                },
                {
                  label: '外部',
                  value: 'outside',
                },
              ]}
            />
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
          <FullForm>
            <InputNumber
              value={labelLine.length}
              onChange={(value) => {
                onKeyChange('labelLine', {
                  length: value,
                });
              }}
              className="w-100"
            />
          </FullForm>
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
              className="w-100"
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

  const minMaxConfig = useMemo(() => {
    return (
      <MaxMinConfig
        label="数值范围"
        value={{
          max,
          min,
        }}
        onChange={(value) => {
          onChange({
            config: {
              options: {
                series: value,
              },
            },
          });
        }}
      />
    );
  }, [min, max, onKeyChange]);

  const minMaxSizeConfig = useMemo(() => {
    return (
      <MaxMinConfig
        label="宽度范围(%)"
        value={{
          max: maxSize,
          min: minSize,
        }}
        onChange={(value) => {
          onChange({
            config: {
              options: {
                series: {
                  minSize: value.min,
                  maxSize: value.max,
                },
              },
            },
          });
        }}
      />
    );
  }, [minSize, maxSize, onKeyChange]);

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
          max={GlobalConfig.getChartSeriesCounter('FUNNEL_BASIC')}
        />
      </Item>
    );
  }, [itemStyle, onKeyChange, onChange]);

  const positionConfig = useMemo(() => {
    return (
      <NumberPositionConfig
        value={{
          left,
          top,
          right,
          bottom,
        }}
        onChange={(value) => {
          onChange({
            config: {
              options: {
                series: value,
              },
            },
          });
        }}
      />
    );
  }, [left, top, right, bottom, onChange]);

  return (
    <ConfigList>
      {minMaxConfig}
      {minMaxSizeConfig}
      {positionConfig}
      {labelConfig}
      {labelLineConfig}
      {itemStyleConfig}
    </ConfigList>
  );
};

export default SeriesConfig;
