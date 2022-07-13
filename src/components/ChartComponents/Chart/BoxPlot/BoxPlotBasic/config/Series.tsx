import { useCallback, useMemo } from 'react';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import MultipleSeriesConfig from '@/components/ChartComponents/Common/MultipleSeriesConfig';
import { CompatColorSelect } from '@/components/ColorSelect';
import MaxMinConfig from '@/components/ChartComponents/Common/MaxMinConfig';
import LineStyleGroupConfig from '@/components/ChartComponents/Common/LineStyleGroupConfig';
import ThemeUtil from '@/utils/Assist/Theme';
import GlobalConfig from '@/utils/Assist/GlobalConfig';
import { TBoxPlotBasicConfig } from '../type';

const { Item } = ConfigList;

const SeriesConfig = (props: {
  value: TBoxPlotBasicConfig['series'];
  onChange: ComponentData.ComponentConfigProps<TBoxPlotBasicConfig>['onChange'];
}) => {
  const { value, onChange } = props;
  const { boxWidth, itemStyle } = value;

  const onKeyChange = useCallback(
    (key: keyof TBoxPlotBasicConfig['series'], value: any) => {
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

  const boxWidthConfig = useMemo(() => {
    return (
      <MaxMinConfig
        label="宽度"
        value={{
          max: boxWidth[1],
          min: boxWidth[0],
        }}
        onChange={(value) => {
          onKeyChange('boxWidth', [value.min, value.max]);
        }}
      />
    );
  }, [boxWidth, onKeyChange]);

  const itemStyleConfig = useMemo(() => {
    const counter = itemStyle.length;
    return (
      <MultipleSeriesConfig
        counter={counter}
        renderContent={(index) => {
          const target = itemStyle[index];
          const { color, borderColor, borderWidth, borderType } = target;
          return (
            <>
              <Item label="颜色">
                <FullForm>
                  <CompatColorSelect
                    value={color}
                    onChange={(value) => {
                      const newItemStyle = [...itemStyle];
                      newItemStyle.splice(index, 1, {
                        ...target,
                        color: value,
                      } as any);
                      onChange({
                        config: {
                          options: {
                            series: {
                              itemStyle: newItemStyle,
                            },
                          },
                        },
                      });
                    }}
                  />
                </FullForm>
              </Item>
              <LineStyleGroupConfig
                collapseProps={{
                  child: {
                    header: '边框',
                    key: 'borderStyle',
                  },
                }}
                value={{
                  width: borderWidth,
                  color: borderColor,
                  type: borderType,
                }}
                onChange={(value) => {
                  const newItemStyle = [...itemStyle];
                  newItemStyle.splice(index, 1, {
                    ...target,
                    borderColor: value.color,
                    borderType: value.type,
                    borderWidth: value.width,
                  } as any);
                  onChange({
                    config: {
                      options: {
                        series: {
                          itemStyle: newItemStyle,
                        },
                      },
                    },
                  });
                }}
              />
            </>
          );
        }}
        onAdd={() => {
          onChange({
            config: {
              options: {
                series: {
                  itemStyle: [
                    ...itemStyle,
                    {
                      color: {
                        ...ThemeUtil.generateNextColor4CurrentTheme(counter),
                        a: 0,
                      },
                      borderColor:
                        ThemeUtil.generateNextColor4CurrentTheme(counter),
                      borderType: 'solid',
                      borderWidth: 1,
                    },
                  ],
                },
              },
            },
          });
        }}
        onRemove={(index) => {
          const newItemStyle = [...itemStyle];

          newItemStyle.splice(index, 1);

          onChange({
            config: {
              options: {
                series: {
                  itemStyle: newItemStyle,
                },
              },
            },
          });
        }}
        max={GlobalConfig.getChartSeriesCounter('BOX_PLOT_BASIC')}
      />
    );
  }, [itemStyle, onKeyChange, onChange]);

  return (
    <ConfigList>
      {boxWidthConfig}
      {itemStyleConfig}
    </ConfigList>
  );
};

export default SeriesConfig;
