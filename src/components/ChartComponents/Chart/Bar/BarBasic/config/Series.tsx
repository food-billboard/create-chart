import { InfoCircleOutlined } from '@ant-design/icons';
import { useCallback, useMemo } from 'react';
import AngleSelect from '@/components/ChartComponents/Common/AngleSelect';
import BarCarouselConfig from '@/components/ChartComponents/Common/BarCarouselConfig';
import { SingleCollapse as Collapse } from '@/components/ChartComponents/Common/Collapse';
import InputNumber from '@/components/ChartComponents/Common/InputNumber';
import { InputNumber as AutoInputNumber } from '@/components/ChartComponents/Common/NumberPositionConfig';
import SeriesLabelConfig from '@/components/ChartComponents/Common/SeriesLabelConfig';
import SimpleHueSelect from '@/components/ChartComponents/Common/SimpleHueSelect';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import ColorSelect from '@/components/ColorSelect';
import IconTooltip from '@/components/IconTooltip';
import GlobalConfig from '@/utils/Assist/GlobalConfig';
import { TBarBasicConfig } from '../type';

const { Item } = ConfigList;

const SeriesConfig = (props: {
  value: TBarBasicConfig['series'];
  onChange: ComponentData.ComponentConfigProps<TBarBasicConfig>['onChange'];
}) => {
  const { value, onChange } = props;
  const {
    backgroundStyle,
    showBackground,
    barGap,
    barWidth,
    label,
    itemStyle,
    carousel,
  } = value;

  const onKeyChange = useCallback(
    (key: keyof TBarBasicConfig['series'], value: any) => {
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

  const backgroundConfig = useMemo(() => {
    return (
      <Collapse
        child={{
          key: 'background',
          header: '背景',
          visibleRender: true,
          value: showBackground,
          onChange: onKeyChange.bind(null, 'showBackground'),
        }}
      >
        <Item label="颜色">
          <FullForm>
            <ColorSelect
              defaultValue={backgroundStyle.color}
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
  }, [showBackground, backgroundStyle, onKeyChange]);

  const labelConfig = useMemo(() => {
    return (
      <SeriesLabelConfig
        {...(label as any)}
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
      <Item label="柱子颜色">
        <SimpleHueSelect
          value={itemStyle.color}
          onChange={(value) => {
            onKeyChange('itemStyle', {
              color: value,
            });
          }}
          max={GlobalConfig.getChartSeriesCounter('BAR_BASIC')}
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
            <AutoInputNumber
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
      {backgroundConfig}
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
