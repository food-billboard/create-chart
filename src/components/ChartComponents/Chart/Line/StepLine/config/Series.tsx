import { useCallback, useMemo } from 'react';
import Select from '@/components/ChartComponents/Common/Select';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import SeriesLabelConfig from '@/components/ChartComponents/Common/SeriesLabelConfig';
import SimpleHueSelect from '@/components/ChartComponents/Common/SimpleHueSelect';
import GlobalConfig from '@/utils/Assist/GlobalConfig';
import { TStepLineConfig } from '../type';

const { Item } = ConfigList;

const SeriesConfig = (props: {
  value: TStepLineConfig['series'];
  onChange: ComponentData.ComponentConfigProps<TStepLineConfig>['onChange'];
}) => {
  const { value, onChange } = props;
  const { lineStyle, label } = value;

  const onKeyChange = useCallback(
    (key: keyof TStepLineConfig['series'], value: any) => {
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
            />
          </FullForm>
        </Item>
      </SeriesLabelConfig>
    );
  }, [label, onKeyChange]);

  const itemStyleConfig = useMemo(() => {
    return (
      <Item label="线条颜色">
        <SimpleHueSelect
          value={lineStyle.map((item) => item.color)}
          onChange={(value) => {
            onKeyChange(
              'lineStyle',
              value.map((item) => ({ color: item })),
            );
          }}
          max={GlobalConfig.getChartSeriesCounter('STEP_LINE')}
        />
      </Item>
    );
  }, [lineStyle, onKeyChange, onChange]);

  return (
    <ConfigList>
      {labelConfig}
      {itemStyleConfig}
    </ConfigList>
  );
};

export default SeriesConfig;
