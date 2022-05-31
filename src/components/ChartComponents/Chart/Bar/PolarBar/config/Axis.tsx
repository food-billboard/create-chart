import { useCallback, useMemo } from 'react';
import MaxMinConfig from '@/components/ChartComponents/Common/MaxMinConfig';
import AngleSelect from '@/components/ChartComponents/Common/AngleSelect';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import SeriesLabelConfig from '@/components/ChartComponents/Common/SeriesLabelConfig';
import InputNumber from '@/components/ChartComponents/Common/InputNumber';
import { TPolarBarConfig } from '../type';

const { Item } = ConfigList;

const AxisConfig = (props: {
  value: TPolarBarConfig['angleAxis'];
  onChange: ComponentData.ComponentConfigProps<TPolarBarConfig>['onChange'];
}) => {
  const { value, onChange } = props;
  const { min, max, startAngle, axisLabel } = value;

  const onKeyChange = useCallback(
    (key: keyof TPolarBarConfig['angleAxis'], value: any) => {
      onChange({
        config: {
          options: {
            angleAxis: {
              [key]: value,
            },
          },
        },
      });
    },
    [onChange],
  );

  const angleConfig = useMemo(() => {
    return (
      <AngleSelect
        value={startAngle}
        onChange={onKeyChange.bind(null, 'startAngle')}
        label="起始角度"
      />
    );
  }, [startAngle, onKeyChange]);

  const labelConfig = useMemo(() => {
    return (
      <SeriesLabelConfig
        {...(axisLabel as any)}
        onChange={onKeyChange.bind(null, 'axisLabel')}
        ignore={['position']}
      >
        <Item label="间距">
          <FullForm>
            <InputNumber
              value={axisLabel.margin}
              onChange={(value) => {
                onKeyChange('axisLabel', {
                  margin: value,
                });
              }}
            />
          </FullForm>
        </Item>
      </SeriesLabelConfig>
    );
  }, [axisLabel, onKeyChange]);

  const minMaxConfig = useMemo(() => {
    return (
      <MaxMinConfig
        label="取值范围"
        value={{
          max,
          min,
        }}
        onChange={(value) => {
          onChange({
            config: {
              options: {
                angleAxis: {
                  max: value.max,
                  min: value.min,
                },
              },
            },
          });
        }}
      />
    );
  }, [max, min, onChange]);

  return (
    <ConfigList>
      {minMaxConfig}
      {angleConfig}
      {labelConfig}
    </ConfigList>
  );
};

export default AxisConfig;
