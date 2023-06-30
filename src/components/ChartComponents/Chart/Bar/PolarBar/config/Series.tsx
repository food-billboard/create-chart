import { useCallback, useMemo } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import IconTooltip from '@/components/IconTooltip';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import Select from '@/components/ChartComponents/Common/Select';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import SeriesLabelConfig from '@/components/ChartComponents/Common/SeriesLabelConfig';
import SimpleHueSelect from '@/components/ChartComponents/Common/SimpleHueSelect';
import InputNumber from '@/components/ChartComponents/Common/InputNumber';
import GlobalConfig from '@/utils/Assist/GlobalConfig';
import { TPolarBarConfig } from '../type';

const { Item } = ConfigList;

const SeriesConfig = (props: {
  value: TPolarBarConfig['series'];
  onChange: ComponentData.ComponentConfigProps<TPolarBarConfig>['onChange'];
}) => {
  const { value, onChange } = props;
  const { barWidth, label, itemStyle } = value;

  const onKeyChange = useCallback(
    (key: keyof TPolarBarConfig['series'], value: any) => {
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
      <Item label="柱子颜色">
        <SimpleHueSelect
          value={itemStyle.color}
          onChange={(value) => {
            onKeyChange('itemStyle', {
              color: value,
            });
          }}
          max={GlobalConfig.getChartSeriesCounter('POLAR_BAR')}
        />
      </Item>
    );
  }, [itemStyle, onKeyChange]);

  const barConfig = useMemo(() => {
    return (
      <>
        <Item
          label="柱子"
          placeholder={
            <IconTooltip title="间距为柱子的宽度占比">
              <InfoCircleOutlined />
            </IconTooltip>
          }
        >
          <FullForm label="宽度">
            <InputNumber
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
