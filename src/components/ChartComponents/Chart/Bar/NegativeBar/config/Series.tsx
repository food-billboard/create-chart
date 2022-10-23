import { useCallback, useMemo } from 'react';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import FormatterSelect from '@/components/ChartComponents/Common/FormatterSelect';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import SeriesLabelConfig from '@/components/ChartComponents/Common/SeriesLabelConfig';
import SimpleHueSelect from '@/components/ChartComponents/Common/SimpleHueSelect';
import { InputNumber as AutoInputNumber } from '@/components/ChartComponents/Common/NumberPositionConfig';
import GlobalConfig from '@/utils/Assist/GlobalConfig';
import { TNegativeBarConfig } from '../type';

const { Item } = ConfigList;

const SeriesConfig = (props: {
  value: TNegativeBarConfig['series'];
  onChange: ComponentData.ComponentConfigProps<TNegativeBarConfig>['onChange'];
}) => {
  const { value, onChange } = props;
  const { barWidth, label, itemStyle } = value;

  const onKeyChange = useCallback(
    (key: keyof TNegativeBarConfig['series'], value: any) => {
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
      <>
        <SeriesLabelConfig
          {...(label[0] as any)}
          onChange={(value) =>
            onKeyChange('label', [
              {
                ...label[0],
                ...value,
              },
              label[1],
            ])
          }
          child={{
            header: '负轴标签',
          }}
        >
          <FormatterSelect
            value={label[0].formatter}
            onChange={(value) => {
              onKeyChange('label', [
                {
                  ...label[0],
                  formatter: value,
                },
                label[1],
              ]);
            }}
          />
        </SeriesLabelConfig>
        <SeriesLabelConfig
          {...(label[1] as any)}
          onChange={(value) =>
            onKeyChange('label', [
              label[0],
              {
                ...label[1],
                ...value,
              },
            ])
          }
          child={{
            header: '正轴标签',
          }}
        >
          <FormatterSelect
            value={label[1].formatter}
            onChange={(value) => {
              onKeyChange('label', [
                label[0],
                {
                  ...label[1],
                  formatter: value,
                },
              ]);
            }}
          />
        </SeriesLabelConfig>
      </>
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
          max={GlobalConfig.getChartSeriesCounter('NEGATIVE_BAR')}
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
