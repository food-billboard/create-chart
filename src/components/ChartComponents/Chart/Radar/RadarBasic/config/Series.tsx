import { useCallback, useMemo } from 'react';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import SeriesLabelConfig from '@/components/ChartComponents/Common/SeriesLabelConfig';
import FormatterSelect from '@/components/ChartComponents/Common/FormatterSelect';
import SymbolSelect from '@/components/ChartComponents/Common/SymbolSelect';
import MultipleSeriesConfig from '@/components/ChartComponents/Common/MultipleSeriesConfig';
import { SingleCollapse as Collapse } from '@/components/ChartComponents/Common/Collapse';
import HalfForm from '@/components/ChartComponents/Common/Structure/HalfForm';
import InputNumber from '@/components/ChartComponents/Common/InputNumber';
import LineStyle from '@/components/ChartComponents/Common/LineStyleSelect';
import ThemeUtil from '@/utils/Assist/Theme';
import { CompatColorSelect } from '@/components/ColorSelect';
import { TRadarBasicConfig } from '../type';

const { Item } = ConfigList;

const SeriesConfig = (props: {
  value: TRadarBasicConfig['series'];
  onChange: ComponentData.ComponentConfigProps<TRadarBasicConfig>['onChange'];
}) => {
  const { value, onChange } = props;
  const { label, itemStyle, symbol, symbolSize, lineStyle, areaStyle } = value;

  const onKeyChange = useCallback(
    (key: keyof TRadarBasicConfig['series'], value: any) => {
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

  const symbolConfig = useMemo(() => {
    return (
      <Item label="拐点图形">
        <HalfForm label="形状">
          <SymbolSelect
            value={symbol}
            onChange={onKeyChange.bind(null, 'symbol')}
          />
        </HalfForm>
        <HalfForm label="大小">
          <InputNumber
            max={100}
            min={0}
            value={symbolSize}
            onChange={onKeyChange.bind(null, 'symbolSize')}
            className="w-100"
          />
        </HalfForm>
      </Item>
    );
  }, [symbol, symbolSize, onKeyChange]);

  const labelConfig = useMemo(() => {
    return (
      <SeriesLabelConfig
        {...(label as any)}
        onChange={onKeyChange.bind(null, 'label')}
      >
        <Item label="距离">
          <FullForm>
            <InputNumber
              className="w-100"
              value={label.distance}
              onChange={(value) => {
                onKeyChange('label', {
                  distance: value,
                });
              }}
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

  const seriesConfig = useMemo(() => {
    const counter = lineStyle.length;
    return (
      <MultipleSeriesConfig
        counter={counter}
        renderContent={(index) => {
          const targetItemStyleColor = itemStyle.color[index];
          const targetLineStyle = lineStyle[index];
          const targetAreaStyleColor = areaStyle.color[index];
          const { color, width, type } = targetLineStyle;
          return (
            <>
              <Collapse
                child={{
                  header: '线条',
                  key: 'lineStyle',
                }}
              >
                <Item label="颜色">
                  <FullForm>
                    <CompatColorSelect
                      value={color}
                      onChange={(value) => {
                        const newLineStyle = [...lineStyle];
                        newLineStyle.splice(index, 1, {
                          ...targetLineStyle,
                          color: value,
                        } as any);
                        onChange({
                          config: {
                            options: {
                              series: {
                                lineStyle: newLineStyle,
                              },
                            },
                          },
                        });
                      }}
                    />
                  </FullForm>
                </Item>
                <Item label="宽度">
                  <InputNumber
                    value={width}
                    onChange={(value) => {
                      const newLineStyle = [...lineStyle];
                      newLineStyle.splice(index, 1, {
                        ...targetLineStyle,
                        width: value,
                      } as any);
                      onChange({
                        config: {
                          options: {
                            series: {
                              lineStyle: newLineStyle,
                            },
                          },
                        },
                      });
                    }}
                  />
                </Item>
                <Item label="线条类型">
                  <LineStyle
                    value={type}
                    onChange={(value) => {
                      const newLineStyle = [...lineStyle];
                      newLineStyle.splice(index, 1, {
                        ...targetLineStyle,
                        type: value,
                      } as any);
                      onChange({
                        config: {
                          options: {
                            series: {
                              lineStyle: newLineStyle,
                            },
                          },
                        },
                      });
                    }}
                  />
                </Item>
              </Collapse>
              <Item label="拐点颜色">
                <FullForm>
                  <CompatColorSelect
                    value={targetItemStyleColor}
                    onChange={(value) => {
                      const newItemColorStyle = [...itemStyle.color];
                      newItemColorStyle.splice(index, 1, value as any);
                      onChange({
                        config: {
                          options: {
                            series: {
                              itemStyle: {
                                ...itemStyle,
                                color: newItemColorStyle,
                              },
                            },
                          },
                        },
                      });
                    }}
                  />
                </FullForm>
              </Item>
              <Item label="区域颜色">
                <FullForm>
                  <CompatColorSelect
                    value={targetAreaStyleColor}
                    onChange={(value) => {
                      const newAreaColorStyle = [...areaStyle.color];
                      newAreaColorStyle.splice(index, 1, value as any);
                      onChange({
                        config: {
                          options: {
                            series: {
                              areaStyle: {
                                ...areaStyle,
                                color: newAreaColorStyle,
                              },
                            },
                          },
                        },
                      });
                    }}
                  />
                </FullForm>
              </Item>
            </>
          );
        }}
        onAdd={() => {
          onChange({
            config: {
              options: {
                series: {
                  lineStyle: [
                    ...lineStyle,
                    {
                      color: ThemeUtil.generateNextColor4CurrentTheme(counter),
                      width: 1,
                      type: 'solid',
                    },
                  ],
                  areaStyle: {
                    ...areaStyle,
                    color: [
                      ...areaStyle.color,
                      {
                        ...ThemeUtil.generateNextColor4CurrentTheme(counter),
                        a: 0.3,
                      },
                    ],
                  },
                  itemStyle: {
                    ...itemStyle,
                    color: [
                      ...itemStyle.color,
                      ThemeUtil.generateNextColor4CurrentTheme(counter),
                    ],
                  },
                },
              },
            },
          });
        }}
        onRemove={(index) => {
          const newLineStyle = [...lineStyle];
          const newAreaColorStyle = [...areaStyle.color];
          const newItemColorStyle = [...itemStyle.color];

          newLineStyle.splice(index, 1);
          newAreaColorStyle.splice(index, 1);
          newItemColorStyle.splice(index, 1);

          onChange({
            config: {
              options: {
                series: {
                  lineStyle: newLineStyle,
                  areaStyle: {
                    ...areaStyle,
                    color: newAreaColorStyle,
                  },
                  itemStyle: {
                    ...itemStyle,
                    color: newItemColorStyle,
                  },
                },
              },
            },
          });
        }}
        max={8}
      />
    );
  }, [lineStyle, areaStyle, itemStyle, onChange]);

  return (
    <ConfigList>
      {symbolConfig}
      {labelConfig}
      {seriesConfig}
    </ConfigList>
  );
};

export default SeriesConfig;
