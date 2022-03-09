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
import { TRadarBasicConfig } from '../type';

const { Item } = ConfigList;

const SeriesConfig = (props: {
  value: TRadarBasicConfig['series'];
  onChange: ComponentData.ComponentConfigProps<TRadarBasicConfig>['onChange'];
}) => {
  const { value, onChange } = props;
  const { label, itemStyle, symbol, symbolSize, lineStyle, areaStyle } = value;

  const onKeyChange = useCallback(
    (key: keyof TRadarBasicConfig['series'], value: any) => {
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
      {labelConfig}
      {itemStyleConfig}
    </ConfigList>
  );
};

export default SeriesConfig;
