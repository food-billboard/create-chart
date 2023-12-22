import { InfoCircleOutlined } from '@ant-design/icons';
import { useCallback, useMemo } from 'react';
import AngleSelect from '@/components/ChartComponents/Common/AngleSelect';
import BarCarouselConfig from '@/components/ChartComponents/Common/BarCarouselConfig';
import { SingleCollapse as Collapse } from '@/components/ChartComponents/Common/Collapse';
import InputNumber from '@/components/ChartComponents/Common/InputNumber';
import SeriesLabelConfig from '@/components/ChartComponents/Common/SeriesLabelConfig';
import SimpleHueSelect from '@/components/ChartComponents/Common/SimpleHueSelect';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import IconTooltip from '@/components/IconTooltip';
import GlobalConfig from '@/utils/Assist/GlobalConfig';
import { TThreeBarConfig } from '../type';

const { Item } = ConfigList;

const SeriesConfig = (props: {
  value: TThreeBarConfig['series'];
  onChange: ComponentData.ComponentConfigProps<TThreeBarConfig>['onChange'];
}) => {
  const { value, onChange } = props;
  const { barGap, barWidth, label, itemStyle, carousel } = value;

  const onKeyChange = useCallback(
    (key: keyof TThreeBarConfig['series'], value: any) => {
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
        <AngleSelect
          value={label.rotate}
          onChange={(value) => {
            onKeyChange('label', {
              rotate: value,
            });
          }}
        />
      </SeriesLabelConfig>
    );
  }, [label, onKeyChange]);

  const itemStyleConfig = useMemo(() => {
    return (
      <Collapse
        child={{
          header: '柱子颜色',
          key: 'itemColor',
        }}
        parent={{
          activeKey: ['itemColor'],
        }}
      >
        <SimpleHueSelect
          value={itemStyle.color}
          onChange={(value) => {
            onKeyChange('itemStyle', {
              color: value,
            });
          }}
          max={GlobalConfig.getChartSeriesCounter('THREE_BAR')}
        />
      </Collapse>
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
          <FullForm label="间距">
            <InputNumber
              value={barGap}
              onChange={onKeyChange.bind(null, 'barGap')}
            />
          </FullForm>
        </Item>
      </>
    );
  }, [barWidth, barGap, onKeyChange]);

  return (
    <ConfigList>
      <BarCarouselConfig
        value={carousel}
        onChange={onKeyChange.bind(null, 'carousel')}
      />
      {labelConfig}
      {barConfig}
      {itemStyleConfig}
    </ConfigList>
  );
};

export default SeriesConfig;
