import { useCallback, useMemo } from 'react';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import FormatterSelect from '@/components/ChartComponents/Common/FormatterSelect';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import SeriesLabelConfig from '@/components/ChartComponents/Common/SeriesLabelConfig';
import SimpleHueSelect from '@/components/ChartComponents/Common/SimpleHueSelect';
import { InputNumber as AutoInputNumber } from '@/components/ChartComponents/Common/NumberPositionConfig';
import GlobalConfig from '@/utils/Assist/GlobalConfig';
import { THorizontalBarConfig } from '../type';

const { Item } = ConfigList;

const SeriesConfig = (props: {
  value: THorizontalBarConfig['series'];
  onChange: ComponentData.ComponentConfigProps<THorizontalBarConfig>['onChange'];
}) => {
  const { value, onChange } = props;
  const { barWidth, label, itemStyle } = value;

  const onKeyChange = useCallback(
    (key: keyof THorizontalBarConfig['series'], value: any) => {
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
        ignore={['position']}
        onChange={onKeyChange.bind(null, 'label')}
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

  const itemStyleConfig = useMemo(() => {
    return (
      <Item label="柱子颜色">
        <SimpleHueSelect
          value={itemStyle.color}
          onChange={(value) => {
            onKeyChange('itemStyle', {
              color: value,
            });
          }}
          max={GlobalConfig.getChartSeriesCounter('HORIZONTAL_BAR')}
        />
      </Item>
    );
  }, [itemStyle, onKeyChange]);

  const barConfig = useMemo(() => {
    return (
      <>
        <Item label="柱子">
          <FullForm>
            <AutoInputNumber
              value={barWidth}
              onChange={onKeyChange.bind(null, 'barWidth')}
            />
          </FullForm>
        </Item>
      </>
    );
  }, [barWidth, onKeyChange]);

  return (
    <ConfigList>
      {labelConfig}
      {barConfig}
      {itemStyleConfig}
    </ConfigList>
  );
};

export default SeriesConfig;
