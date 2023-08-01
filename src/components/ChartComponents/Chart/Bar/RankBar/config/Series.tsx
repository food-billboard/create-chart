import { useCallback, useMemo } from 'react';
import BarCarouselConfig from '@/components/ChartComponents/Common/BarCarouselConfig';
import ChartGradientSelect from '@/components/ChartComponents/Common/ChartGradientSelect';
import { SingleCollapse as Collapse } from '@/components/ChartComponents/Common/Collapse';
import FormatterSelect from '@/components/ChartComponents/Common/FormatterSelect';
import InputNumber from '@/components/ChartComponents/Common/InputNumber';
import Select from '@/components/ChartComponents/Common/Select';
import SeriesLabelConfig from '@/components/ChartComponents/Common/SeriesLabelConfig';
import { SimpleHueRadialSelect } from '@/components/ChartComponents/Common/SimpleHueSelect';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import ColorSelect from '@/components/ColorSelect';
import GlobalConfig from '@/utils/Assist/GlobalConfig';
import { TRankBarConfig } from '../type';

const { Item } = ConfigList;

const SeriesConfig = (props: {
  value: TRankBarConfig['series'];
  onChange: ComponentData.ComponentConfigProps<TRankBarConfig>['onChange'];
}) => {
  const { value, onChange } = props;
  const { barWidth, label, itemStyle, backgroundStyle, carousel } = value;

  const onKeyChange = useCallback(
    (key: keyof TRankBarConfig['series'], value: any) => {
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

  const backgroundStyleConfig = useMemo(() => {
    return (
      <Collapse
        child={{
          header: '背景',
          key: 'backgroundStyle',
          visibleRender: true,
          value: backgroundStyle.show,
          onChange: (value) => {
            onKeyChange('backgroundStyle', {
              show: value,
            });
          },
        }}
      >
        <Item label="颜色">
          <FullForm>
            <ColorSelect
              value={backgroundStyle.color}
              onChange={(value) => {
                onKeyChange('backgroundStyle', {
                  color: value,
                });
              }}
            />
          </FullForm>
        </Item>
      </Collapse>
    );
  }, [backgroundStyle, onKeyChange]);

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
              options={[
                {
                  label: '中间',
                  value: 'center',
                },
                {
                  label: '上方',
                  value: 'top',
                },
                {
                  label: '正上方',
                  value: 'deep-top',
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

  const itemStyleConfig = useMemo(() => {
    return (
      <>
        <Collapse
          child={{
            header: '默认颜色',
            key: 'defaultColor',
          }}
        >
          <ChartGradientSelect
            value={itemStyle.defaultColor}
            onChange={(value) => {
              onKeyChange('itemStyle', {
                defaultColor: value,
              });
            }}
          />
        </Collapse>
        <Collapse
          child={{
            header: '柱子颜色',
            key: 'itemColor',
          }}
          parent={{
            activeKey: ['itemColor'],
          }}
        >
          <SimpleHueRadialSelect
            value={itemStyle.color}
            onChange={(value) => {
              onKeyChange('itemStyle', {
                color: value,
              });
            }}
            max={GlobalConfig.getChartSeriesCounter('RANK_BAR')}
          />
        </Collapse>
      </>
    );
  }, [itemStyle, onKeyChange]);

  const barConfig = useMemo(() => {
    return (
      <>
        <Item label="柱宽">
          <FullForm>
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
      <BarCarouselConfig
        value={carousel}
        onChange={onKeyChange.bind(null, 'carousel')}
      />
      {labelConfig}
      {barConfig}
      {backgroundStyleConfig}
      {itemStyleConfig}
    </ConfigList>
  );
};

export default SeriesConfig;
