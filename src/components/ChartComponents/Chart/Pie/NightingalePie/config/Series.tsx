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
import MaxMinConfig from '@/components/ChartComponents/Common/MaxMinConfig';
import { TNightingaleConfig } from '../type';

const { Item } = ConfigList;

const SeriesConfig = (props: {
  value: TNightingaleConfig['series'];
  onChange: ComponentData.ComponentConfigProps<TNightingaleConfig>['onChange'];
}) => {
  const { value, onChange } = props;
  const { center, radius, label, itemStyle, labelLine } = value;

  const onKeyChange = useCallback(
    (key: keyof TNightingaleConfig['series'], value: any) => {
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
        <MaxMinConfig
          label="线段"
          subLabel={['第一线段', '第二线段']}
          value={{
            max: labelLine.length2,
            min: labelLine.length,
          }}
          onChange={(value) => {
            onKeyChange('labelLine', {
              length: value.min,
              length2: value.max,
            });
          }}
        />
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
      <Item label="饼图大小（%）">
        <HalfForm label="内">
          <InputNumber
            max={100}
            min={0}
            value={radius[0]}
            onChange={(value) => onKeyChange('radius', [value, radius[1]])}
            className="w-100"
          />
        </HalfForm>
        <HalfForm label="外">
          <InputNumber
            max={100}
            min={0}
            value={radius[1]}
            onChange={(value) => onKeyChange('radius', [radius[0], value])}
            className="w-100"
          />
        </HalfForm>
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
