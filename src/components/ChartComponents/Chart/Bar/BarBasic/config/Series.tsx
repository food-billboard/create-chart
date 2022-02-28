import { useCallback, useMemo } from 'react';
import { InputNumber } from 'antd';
import { CompatColorSelect } from '@/components/ColorSelect';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import { SingleCollapse as Collapse } from '@/components/ChartComponents/Common/Collapse';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import SeriesLabelConfig from '@/components/ChartComponents/Common/SeriesLabelConfig';
import AngleSelect from '@/components/ChartComponents/Common/AngleSelect';
import HalfForm from '@/components/ChartComponents/Common/Structure/HalfForm';
import SimpleHueSelect from '@/components/ChartComponents/Common/SimpleHueSelect';
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
            <CompatColorSelect
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
      <SeriesLabelConfig {...label} onChange={onKeyChange.bind(null, 'label')}>
        <Item label="旋转">
          <FullForm>
            <AngleSelect
              value={label.rotate}
              onChange={(value) => {
                onKeyChange('label', {
                  rotate: value,
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
      <Item label="柱子颜色">
        <SimpleHueSelect
          value={itemStyle.color}
          onChange={(value) => {
            onKeyChange('itemStyle', {
              color: value,
            });
          }}
        />
      </Item>
    );
  }, [itemStyle, onKeyChange]);

  const barConfig = useMemo(() => {
    return (
      <>
        <Item label="柱子">
          <HalfForm label="宽度">
            <InputNumber
              defaultValue={barWidth}
              onBlur={(e) => {
                onKeyChange('barWidth', e.target.value);
              }}
            />
          </HalfForm>
          <HalfForm label="间距">
            <InputNumber
              defaultValue={barGap}
              onBlur={(e) => {
                onKeyChange('barGap', e.target.value);
              }}
            />
          </HalfForm>
        </Item>
      </>
    );
  }, [barWidth, barGap, onKeyChange]);

  return (
    <ConfigList>
      {backgroundConfig}
      {labelConfig}
      {barConfig}
      {itemStyleConfig}
    </ConfigList>
  );
};

export default SeriesConfig;
