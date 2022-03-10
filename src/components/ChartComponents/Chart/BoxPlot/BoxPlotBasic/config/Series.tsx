import { useCallback, useMemo } from 'react';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import MultipleSeriesConfig from '@/components/ChartComponents/Common/MultipleSeriesConfig';
import { SingleCollapse as Collapse } from '@/components/ChartComponents/Common/Collapse';
import { CompatColorSelect } from '@/components/ColorSelect';
import HalfForm from '@/components/ChartComponents/Common/Structure/HalfForm';
import LineStyle from '@/components/ChartComponents/Common/LineStyleSelect';
import InputNumber from '@/components/ChartComponents/Common/InputNumber';
import ThemeUtil from '@/utils/Assist/Theme';
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
      <Item label="宽度">
        <HalfForm label="最小">
          <InputNumber
            value={boxWidth[0]}
            onChange={(value) => {
              onKeyChange('boxWidth', [value, boxWidth[1]]);
            }}
          />
        </HalfForm>
        <HalfForm label="最大">
          <InputNumber
            value={boxWidth[0]}
            onChange={(value) => {
              onKeyChange('boxWidth', [boxWidth[0], value]);
            }}
          />
        </HalfForm>
      </Item>
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
              <Collapse
                child={{
                  header: '边框',
                  key: 'borderStyle',
                }}
              >
                <Item label="颜色">
                  <FullForm>
                    <CompatColorSelect
                      value={borderColor}
                      onChange={(value) => {
                        const newItemStyle = [...itemStyle];
                        newItemStyle.splice(index, 1, {
                          ...target,
                          borderColor: value,
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
                <Item label="宽度">
                  <InputNumber
                    value={borderWidth}
                    onChange={(value) => {
                      const newItemStyle = [...itemStyle];
                      newItemStyle.splice(index, 1, {
                        ...target,
                        borderWidth: value,
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
                </Item>
                <Item label="线条类型">
                  <LineStyle
                    value={borderType}
                    onChange={(value) => {
                      const newItemStyle = [...itemStyle];
                      newItemStyle.splice(index, 1, {
                        ...target,
                        borderType: value,
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
                </Item>
              </Collapse>
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
        max={4}
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
