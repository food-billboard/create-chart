import { useCallback, useMemo } from 'react';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import MultipleSeriesConfig from '@/components/ChartComponents/Common/MultipleSeriesConfig';
import HalfForm from '@/components/ChartComponents/Common/Structure/HalfForm';
import InputNumber from '@/components/ChartComponents/Common/InputNumber';
import SymbolSelect from '@/components/ChartComponents/Common/SymbolSelect';
import { CompatColorSelect } from '@/components/ColorSelect';
import LineStyleGroupConfig from '@/components/ChartComponents/Common/LineStyleGroupConfig';
import ThemeUtil from '@/utils/Assist/Theme';
import { TScatterBasicConfig } from '../type';

const { Item } = ConfigList;

const SeriesConfig = (props: {
  value: TScatterBasicConfig['series'];
  onChange: ComponentData.ComponentConfigProps<TScatterBasicConfig>['onChange'];
}) => {
  const { value, onChange } = props;
  const { symbol, symbolSize, itemStyle } = value;

  const onKeyChange = useCallback(
    (key: keyof TScatterBasicConfig['series'], value: any) => {
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
      <Item label="图形">
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

  const itemStyleConfig = useMemo(() => {
    const counter = itemStyle.length;
    return (
      <MultipleSeriesConfig
        counter={counter}
        renderContent={(index) => {
          const target = itemStyle[index];
          const { color, borderColor, borderType, borderWidth } = target;
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
                    key: 'border',
                  },
                }}
                value={{
                  color: borderColor,
                  width: borderWidth,
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
                      color: ThemeUtil.generateNextColor4CurrentTheme(counter),
                      borderColor: {
                        ...ThemeUtil.generateNextColor4CurrentTheme(counter),
                        a: 0.5,
                      },
                      borderType: 'solid',
                      borderWidth: 0,
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
      {symbolConfig}
      {itemStyleConfig}
    </ConfigList>
  );
};

export default SeriesConfig;
