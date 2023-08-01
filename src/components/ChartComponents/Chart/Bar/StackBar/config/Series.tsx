import { useCallback, useMemo } from 'react';
import MultipleSeriesConfig from '@/components/ChartComponents/Common/MultipleSeriesConfig';
import { InputNumber as AutoInputNumber } from '@/components/ChartComponents/Common/NumberPositionConfig';
import SeriesLabelConfig from '@/components/ChartComponents/Common/SeriesLabelConfig';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import ColorSelect from '@/components/ColorSelect';
import GlobalConfig from '@/utils/Assist/GlobalConfig';
import ThemeUtil from '@/utils/Assist/Theme';
import { TStackBarConfig } from '../type';

const { Item } = ConfigList;

const SeriesConfig = (props: {
  value: TStackBarConfig['series'];
  onChange: ComponentData.ComponentConfigProps<TStackBarConfig>['onChange'];
}) => {
  const { value, onChange } = props;
  const { label, itemStyle } = value;

  const onKeyChange = useCallback(
    (key: keyof TStackBarConfig['series'], value: any) => {
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
    const counter = itemStyle.length;
    return (
      <MultipleSeriesConfig
        counter={counter}
        renderContent={(index) => {
          const targetItemStyle = itemStyle[index];
          return (
            <>
              <Item label="颜色">
                <FullForm>
                  <ColorSelect
                    value={targetItemStyle.color}
                    onChange={(value) => {
                      const newItemStyle = [...itemStyle];
                      newItemStyle.splice(index, 1, {
                        ...targetItemStyle,
                        color: value as any,
                      });
                      onKeyChange('itemStyle', newItemStyle);
                    }}
                  />
                </FullForm>
              </Item>
              <Item label="柱子宽度">
                <FullForm>
                  <AutoInputNumber
                    value={targetItemStyle.barWidth}
                    onChange={(value) => {
                      const newItemStyle = [...itemStyle];
                      newItemStyle.splice(index, 1, {
                        ...targetItemStyle,
                        barWidth: value,
                      });
                      onKeyChange('itemStyle', newItemStyle);
                    }}
                  />
                </FullForm>
              </Item>
            </>
          );
        }}
        onAdd={() => {
          onKeyChange('itemStyle', [
            ...itemStyle,
            {
              barWidth: 'auto',
              color: ThemeUtil.generateNextColor4CurrentTheme(counter),
            },
          ]);
        }}
        onRemove={(index) => {
          const newItemStyle = [...itemStyle];

          newItemStyle.splice(index, 1);

          onKeyChange('itemStyle', newItemStyle);
        }}
        max={GlobalConfig.getChartSeriesCounter('STACK_BAR')}
      />
    );
  }, [itemStyle, onKeyChange]);

  return (
    <ConfigList>
      {labelConfig}
      {itemStyleConfig}
    </ConfigList>
  );
};

export default SeriesConfig;
