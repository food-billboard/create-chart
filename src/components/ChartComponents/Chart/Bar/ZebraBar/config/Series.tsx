import { useCallback, useMemo } from 'react';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import SeriesLabelConfig from '@/components/ChartComponents/Common/SeriesLabelConfig';
import SimpleHueSelect from '@/components/ChartComponents/Common/SimpleHueSelect';
import InputNumber from '@/components/ChartComponents/Common/InputNumber';
import { TZebraBarConfig } from '../type';
import HalfForm from '@/components/ChartComponents/Common/Structure/HalfForm';

const { Item } = ConfigList;

const SeriesConfig = (props: {
  value: TZebraBarConfig['series'];
  onChange: ComponentData.ComponentConfigProps<TZebraBarConfig>['onChange'];
}) => {
  const { value, onChange } = props;
  const { space, barWidth, label, itemStyle } = value;

  const onKeyChange = useCallback(
    (key: keyof TZebraBarConfig['series'], value: any) => {
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

  const SpaceConfig = useMemo(() => {
    return (
      <Item label="间距">
        <FullForm>
          <InputNumber
            value={space.margin}
            onChange={(value) => {
              onKeyChange('space', {
                margin: value,
              });
            }}
          />
        </FullForm>
      </Item>
    );
  }, [space, onKeyChange]);

  const labelConfig = useMemo(() => {
    return (
      <SeriesLabelConfig
        {...(label as any)}
        onChange={onKeyChange.bind(null, 'label')}
      />
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
          max={8}
        />
      </Item>
    );
  }, [itemStyle, onKeyChange]);

  const barConfig = useMemo(() => {
    return (
      <Item label="线条尺寸">
        <HalfForm label="长">
          <InputNumber
            value={barWidth[0]}
            onChange={(value) => onKeyChange('barWidth', [value, barWidth[1]])}
          />
        </HalfForm>
        <HalfForm label="宽">
          <InputNumber
            value={barWidth[1]}
            onChange={(value) => onKeyChange('barWidth', [barWidth[0], value])}
          />
        </HalfForm>
      </Item>
    );
  }, [barWidth, onKeyChange]);

  return (
    <ConfigList>
      {SpaceConfig}
      {labelConfig}
      {barConfig}
      {itemStyleConfig}
    </ConfigList>
  );
};

export default SeriesConfig;
