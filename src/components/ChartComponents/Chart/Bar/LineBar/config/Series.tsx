import { useCallback, useMemo } from 'react';
import { Switch } from 'antd';
import { CompatColorSelect } from '@/components/ColorSelect';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import { SingleCollapse as Collapse } from '@/components/ChartComponents/Common/Collapse';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import SeriesLabelConfig from '@/components/ChartComponents/Common/SeriesLabelConfig';
import MultipleSeriesConfig from '@/components/ChartComponents/Common/MultipleSeriesConfig';
import ChartGradientSelect from '@/components/ChartComponents/Common/ChartGradientSelect';
import InputNumber from '@/components/ChartComponents/Common/InputNumber';
import ThemeUtil from '@/utils/Assist/Theme';
import { InputNumber as AutoInputNumber } from '@/components/ChartComponents/Common/NumberPositionConfig';
import GlobalConfig from '@/utils/Assist/GlobalConfig';
import { DEFAULT_RADIAL_CONFIG } from '../../../../Common/Constants/defaultConfig';
import { TLineBarConfig } from '../type';

const { Item } = ConfigList;

const SeriesConfig = (props: {
  value: TLineBarConfig['series'];
  onChange: ComponentData.ComponentConfigProps<TLineBarConfig>['onChange'];
}) => {
  const { value, onChange } = props;
  const { style, label, itemStyle } = value;

  const onKeyChange = useCallback(
    (key: keyof TLineBarConfig['series'], value: any) => {
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
        ignore={['position']}
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
          const target = itemStyle[index];
          const { line, bar } = target;
          return (
            <>
              <Collapse
                child={{
                  header: '柱图',
                  key: 'bar',
                }}
              >
                <Collapse
                  child={{
                    header: '颜色',
                    key: 'color',
                  }}
                  parent={{
                    defaultActiveKey: ['color'],
                  }}
                >
                  <ChartGradientSelect
                    value={bar.color}
                    onChange={(value) => {
                      const newItemStyle = [...itemStyle];
                      newItemStyle.splice(index, 1, {
                        line,
                        bar: {
                          ...bar,
                          color: value,
                        },
                      });
                      onKeyChange('itemStyle', newItemStyle);
                    }}
                  />
                </Collapse>
              </Collapse>
              <Collapse
                child={{
                  header: '折线',
                  key: 'line',
                }}
              >
                <Item label="线条颜色">
                  <FullForm>
                    <CompatColorSelect
                      value={line.color}
                      onChange={(value) => {
                        const newItemStyle = [...itemStyle];
                        newItemStyle.splice(index, 1, {
                          bar,
                          line: {
                            ...line,
                            color: value as any,
                          },
                        });
                        onKeyChange('itemStyle', newItemStyle);
                      }}
                    />
                  </FullForm>
                </Item>
                <Collapse
                  child={{
                    header: '区域颜色',
                    key: 'areaColor',
                  }}
                >
                  <ChartGradientSelect
                    value={line.areaColor}
                    onChange={(value) => {
                      const newItemStyle = [...itemStyle];
                      newItemStyle.splice(index, 1, {
                        bar,
                        line: {
                          ...line,
                          areaColor: value as any,
                        },
                      });
                      onKeyChange('itemStyle', newItemStyle);
                    }}
                  />
                </Collapse>
              </Collapse>
            </>
          );
        }}
        onAdd={() => {
          onKeyChange('itemStyle', [
            ...itemStyle,
            {
              bar: {
                color: {
                  ...DEFAULT_RADIAL_CONFIG,
                  start: ThemeUtil.generateNextColor4CurrentTheme(counter),
                  end: {
                    ...ThemeUtil.generateNextColor4CurrentTheme(counter),
                    a: 0.4,
                  },
                },
              },
              line: {
                color: ThemeUtil.generateNextColor4CurrentTheme(counter),
                areaColor: {
                  ...DEFAULT_RADIAL_CONFIG,
                  start: ThemeUtil.generateNextColor4CurrentTheme(counter),
                  end: {
                    ...ThemeUtil.generateNextColor4CurrentTheme(counter),
                    a: 0.4,
                  },
                },
              },
            },
          ]);
        }}
        onRemove={(index) => {
          const newItemStyle = [...itemStyle];

          newItemStyle.splice(index, 1);

          onKeyChange('itemStyle', newItemStyle);
        }}
        max={GlobalConfig.getChartSeriesCounter('LINE_BAR')}
      />
    );
  }, [itemStyle, onKeyChange]);

  const styleConfig = useMemo(() => {
    return (
      <Collapse
        child={{
          header: '基础样式',
          key: 'style',
        }}
      >
        <Collapse
          child={{
            header: '柱图',
            key: 'bar',
          }}
        >
          <Item label="柱子">
            <FullForm label="宽度">
              <AutoInputNumber
                value={style.bar.barWidth}
                onChange={(value) => {
                  onKeyChange('style', {
                    bar: {
                      barWidth: value,
                    },
                  });
                }}
              />
            </FullForm>
            <FullForm label="圆角">
              <InputNumber
                value={style.bar.borderRadius}
                onChange={(value) => {
                  onKeyChange('style', {
                    bar: {
                      borderRadius: value,
                    },
                  });
                }}
              />
            </FullForm>
          </Item>
        </Collapse>
        <Collapse
          child={{
            header: '折线',
            key: 'line',
          }}
        >
          <Item label="线条宽度">
            <FullForm>
              <InputNumber
                value={style.line.lineWidth}
                onChange={(value) => {
                  onKeyChange('style', {
                    line: {
                      lineWidth: value,
                    },
                  });
                }}
              />
            </FullForm>
          </Item>
          <Item>
            <FullForm label="平滑曲线">
              <Switch
                checked={style.line.smooth}
                onChange={(value) => {
                  onKeyChange('style', {
                    line: {
                      smooth: value,
                    },
                  });
                }}
              />
            </FullForm>
          </Item>
        </Collapse>
      </Collapse>
    );
  }, [style, onKeyChange]);

  return (
    <ConfigList>
      {labelConfig}
      {styleConfig}
      {itemStyleConfig}
    </ConfigList>
  );
};

export default SeriesConfig;
