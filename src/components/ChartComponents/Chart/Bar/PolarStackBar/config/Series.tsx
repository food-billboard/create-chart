import { useCallback, useMemo } from 'react';
import Select from '@/components/ChartComponents/Common/Select';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import SeriesLabelConfig from '@/components/ChartComponents/Common/SeriesLabelConfig';
import SimpleHueSelect from '@/components/ChartComponents/Common/SimpleHueSelect';
import GlobalConfig from '@/utils/Assist/GlobalConfig';
import { TPolarStackBarConfig } from '../type';

const { Item } = ConfigList;

const SeriesConfig = (props: {
  value: TPolarStackBarConfig['series'];
  onChange: ComponentData.ComponentConfigProps<TPolarStackBarConfig>['onChange'];
}) => {
  const { value, onChange } = props;
  const { label, itemStyle } = value;

  const onKeyChange = useCallback(
    (key: keyof TPolarStackBarConfig['series'], value: any) => {
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
      </SeriesLabelConfig>
    );
  }, [label, onKeyChange]);

  const itemStyleConfig = useMemo(() => {
    return (
      <Item label="扇形颜色">
        <SimpleHueSelect
          value={itemStyle.color}
          onChange={(value) => {
            onKeyChange('itemStyle', {
              color: value,
            });
          }}
          max={GlobalConfig.getChartSeriesCounter('POLAR_STACK_BAR')}
        />
      </Item>
    );
  }, [itemStyle, onKeyChange]);

  return (
    <ConfigList>
      {labelConfig}
      {itemStyleConfig}
    </ConfigList>
  );
};

export default SeriesConfig;
