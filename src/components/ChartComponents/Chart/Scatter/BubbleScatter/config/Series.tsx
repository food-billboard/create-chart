import { useCallback, useMemo } from 'react';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import InputNumber from '@/components/ChartComponents/Common/InputNumber';
import GlobalConfig from '@/utils/Assist/GlobalConfig';
import SimpleHueSelect from '@/components/ChartComponents/Common/SimpleHueSelect';
import { TBubbleScatterConfig } from '../type';

const { Item } = ConfigList;

const SeriesConfig = (props: {
  value: TBubbleScatterConfig['series'];
  onChange: ComponentData.ComponentConfigProps<TBubbleScatterConfig>['onChange'];
}) => {
  const { value, onChange } = props;
  const { symbolSize, itemStyle } = value;

  const onKeyChange = useCallback(
    (key: keyof TBubbleScatterConfig['series'], value: any) => {
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

  const symbolConfig = useMemo(() => {
    return (
      <Item label="图形大小">
        <FullForm>
          <InputNumber
            max={100}
            min={0}
            value={symbolSize}
            onChange={onKeyChange.bind(null, 'symbolSize')}
          />
        </FullForm>
      </Item>
    );
  }, [symbolSize, onKeyChange]);

  const itemStyleConfig = useMemo(() => {
    return (
      <Item label="气泡颜色">
        <FullForm>
          <SimpleHueSelect
            value={itemStyle.color}
            onChange={(value) =>
              onKeyChange('itemStyle', {
                color: value,
              })
            }
            max={GlobalConfig.getChartSeriesCounter('BUBBLE_SCATTER')}
          />
        </FullForm>
      </Item>
    );
  }, [itemStyle, onKeyChange, onChange]);

  return (
    <ConfigList>
      {symbolConfig}
      {itemStyleConfig}
    </ConfigList>
  );
};

export default SeriesConfig;
