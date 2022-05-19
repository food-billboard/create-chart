import { useCallback, useMemo } from 'react';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import SeriesLabelConfig from '@/components/ChartComponents/Common/SeriesLabelConfig';
import InputNumber from '@/components/ChartComponents/Common/InputNumber';
import { TPolarStackBarConfig } from '../type';

const { Item } = ConfigList;

const AxisConfig = (props: {
  value: TPolarStackBarConfig['angleAxis'];
  onChange: ComponentData.ComponentConfigProps<TPolarStackBarConfig>['onChange'];
}) => {
  const { value, onChange } = props;
  const { axisLabel } = value;

  const onKeyChange = useCallback(
    (key: keyof TPolarStackBarConfig['angleAxis'], value: any) => {
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

  return <ConfigList>{labelConfig}</ConfigList>;
};

export default AxisConfig;
