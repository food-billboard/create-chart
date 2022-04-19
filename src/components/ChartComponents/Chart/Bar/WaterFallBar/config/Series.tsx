import { useCallback, useMemo } from 'react';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import { SingleCollapse as Collapse } from '@/components/ChartComponents/Common/Collapse';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import SeriesLabelConfig from '@/components/ChartComponents/Common/SeriesLabelConfig';
import InputNumber from '@/components/ChartComponents/Common/InputNumber';
import ChartGradientSelect from '@/components/ChartComponents/Common/ChartGradientSelect';
import { TWaterFallBarConfig } from '../type';

const { Item } = ConfigList;

const SeriesConfig = (props: {
  value: TWaterFallBarConfig['series'];
  onChange: ComponentData.ComponentConfigProps<TWaterFallBarConfig>['onChange'];
}) => {
  const { value, onChange } = props;
  const { barWidth, label, itemStyle } = value;

  const onKeyChange = useCallback(
    (key: keyof TWaterFallBarConfig['series'], value: any) => {
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
      />
    );
  }, [label, onKeyChange]);

  const itemStyleConfig = useMemo(() => {
    return (
      <Collapse
        child={{
          header: '柱子颜色',
          key: 'itemStyle',
        }}
      >
        <ChartGradientSelect
          value={itemStyle.color}
          onChange={(value) => {
            onKeyChange('itemStyle', {
              color: value,
            });
          }}
        />
      </Collapse>
    );
  }, [itemStyle, onKeyChange]);

  const barConfig = useMemo(() => {
    return (
      <>
        <Item label="柱子宽度">
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
      {labelConfig}
      {barConfig}
      {itemStyleConfig}
    </ConfigList>
  );
};

export default SeriesConfig;
