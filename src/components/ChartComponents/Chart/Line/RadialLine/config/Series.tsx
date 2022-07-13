import { useCallback, useMemo } from 'react';
import { Switch } from 'antd';
import { omit } from 'lodash';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import SeriesLabelConfig from '@/components/ChartComponents/Common/SeriesLabelConfig';
import AngleSelect from '@/components/ChartComponents/Common/AngleSelect';
import MultipleSeriesConfig from '@/components/ChartComponents/Common/MultipleSeriesConfig';
import { SingleCollapse as Collapse } from '@/components/ChartComponents/Common/Collapse';
import { CompatColorSelect } from '@/components/ColorSelect';
import HalfForm from '@/components/ChartComponents/Common/Structure/HalfForm';
import InputNumber from '@/components/ChartComponents/Common/InputNumber';
import SymbolSelect from '@/components/ChartComponents/Common/SymbolSelect';
import LineStyleGroupConfig from '@/components/ChartComponents/Common/LineStyleGroupConfig';
import ChartGradientSelect from '@/components/ChartComponents/Common/ChartGradientSelect';
import ThemeUtil from '@/utils/Assist/Theme';
import GlobalConfig from '@/utils/Assist/GlobalConfig';
import { DEFAULT_DECAL, DEFAULT_LINE_STYLE } from '../defaultConfig';
import { TRadialLineConfig } from '../type';

const { Item } = ConfigList;

const SeriesConfig = (props: {
  value: TRadialLineConfig['series'];
  onChange: ComponentData.ComponentConfigProps<TRadialLineConfig>['onChange'];
}) => {
  const { value, onChange } = props;
  const { smooth, areaStyle, lineStyle, label, itemStyle } = value;

  const onKeyChange = useCallback(
    (key: keyof TRadialLineConfig['series'], value: any) => {
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

  const smoothConfig = useMemo(() => {
    return (
      <Item label="平滑曲线">
        <FullForm>
          <Switch
            checked={smooth}
            onChange={onKeyChange.bind(null, 'smooth')}
          />
        </FullForm>
      </Item>
    );
  }, [smooth, onKeyChange]);

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
    const { color, decal } = itemStyle;
    const { color: areaStyleColor } = areaStyle;
    const counter = lineStyle.length;
    return (
      <MultipleSeriesConfig
        counter={counter}
        renderContent={(index) => {
          const targetColor = color[index];
          const targetDecal = decal[index] || {};
          const targetAreaStyleColor = areaStyleColor[index] || {};
          const targetLineStyle = lineStyle[index];
          return (
            <>
              <Collapse
                child={{
                  header: '拐点',
                  key: 'itemStyle',
                }}
              >
                <Item label="颜色">
                  <FullForm>
                    <CompatColorSelect
                      value={targetColor}
                      onChange={(value) => {
                        const newColor = [...color];
                        newColor.splice(index, 1, value as any);
                        onChange({
                          config: {
                            options: {
                              series: {
                                itemStyle: {
                                  color: newColor,
                                },
                              },
                            },
                          },
                        });
                      }}
                    />
                  </FullForm>
                </Item>
                <Item label="形状">
                  <HalfForm label="类型">
                    <SymbolSelect
                      value={targetDecal.symbol}
                      onChange={(value) => {
                        const newDecal = [...decal];
                        newDecal.splice(index, 1, {
                          ...newDecal[index],
                          symbol: value,
                        } as any);
                        onChange({
                          config: {
                            options: {
                              series: {
                                itemStyle: {
                                  decal: newDecal,
                                },
                              },
                            },
                          },
                        });
                      }}
                    />
                  </HalfForm>
                  <HalfForm label="大小">
                    <InputNumber
                      value={targetDecal.symbolSize}
                      onChange={(value) => {
                        const newDecal = [...decal];
                        newDecal.splice(index, 1, {
                          ...newDecal[index],
                          symbolSize: value,
                        } as any);
                        onChange({
                          config: {
                            options: {
                              series: {
                                itemStyle: {
                                  decal: newDecal,
                                },
                              },
                            },
                          },
                        });
                      }}
                    />
                  </HalfForm>
                </Item>
              </Collapse>
              <LineStyleGroupConfig
                value={omit(targetLineStyle, ['color'])}
                onChange={(value) => {
                  const newColor = [...lineStyle];
                  newColor.splice(index, 1, {
                    ...(targetLineStyle as any),
                    ...value,
                  });
                  onChange({
                    config: {
                      options: {
                        series: {
                          lineStyle: newColor,
                        },
                      },
                    },
                  });
                }}
              >
                <Collapse
                  child={{
                    key: 'lineColor',
                    header: '颜色',
                  }}
                >
                  <ChartGradientSelect
                    value={targetLineStyle.color}
                    onChange={(value) => {
                      const newColor = [...lineStyle];
                      newColor.splice(index, 1, {
                        ...(targetLineStyle as any),
                        color: value,
                      });
                      onChange({
                        config: {
                          options: {
                            series: {
                              lineStyle: newColor,
                            },
                          },
                        },
                      });
                    }}
                  />
                </Collapse>
              </LineStyleGroupConfig>
              <Item label="区域颜色">
                <FullForm>
                  <CompatColorSelect
                    value={targetAreaStyleColor}
                    onChange={(value) => {
                      const newColor = [...areaStyleColor];
                      newColor.splice(index, 1, value as any);
                      onChange({
                        config: {
                          options: {
                            series: {
                              areaStyle: {
                                color: newColor,
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
                  itemStyle: {
                    color: [
                      ...color,
                      ThemeUtil.generateNextColor4CurrentTheme(counter),
                    ],
                    decal: [...decal, DEFAULT_DECAL as any],
                  },
                  areaStyle: {
                    color: [
                      ...areaStyleColor,
                      {
                        ...ThemeUtil.generateNextColor4CurrentTheme(counter),
                        a: 0,
                      },
                    ],
                  },
                  lineStyle: [
                    ...lineStyle,
                    {
                      ...DEFAULT_LINE_STYLE,
                      color: ThemeUtil.generateNextColor4CurrentTheme(counter),
                    } as any,
                  ],
                },
              },
            },
          });
        }}
        onRemove={(index) => {
          const newItemStyleColor = [...color];
          const newItemStyleDecal = [...decal];
          const newAreaStyleColor = [...areaStyleColor];
          const newLineStyle = [...lineStyle];

          newItemStyleColor.splice(index, 1);
          newItemStyleDecal.splice(index, 1);
          newAreaStyleColor.splice(index, 1);
          newLineStyle.splice(index, 1);

          onChange({
            config: {
              options: {
                series: {
                  itemStyle: {
                    color: newItemStyleColor,
                    decal: newItemStyleDecal,
                  },
                  areaStyle: {
                    color: newAreaStyleColor,
                  },
                  lineStyle: newLineStyle,
                },
              },
            },
          });
        }}
        max={GlobalConfig.getChartSeriesCounter('RADIAL_LINE')}
      />
    );
  }, [itemStyle, areaStyle, lineStyle, onKeyChange, onChange]);

  return (
    <ConfigList>
      {smoothConfig}
      {labelConfig}
      {itemStyleConfig}
    </ConfigList>
  );
};

export default SeriesConfig;
