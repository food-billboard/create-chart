import { useCallback, useMemo } from 'react';
import { Select } from 'antd';
import { merge } from 'lodash';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import SeriesLabelConfig from '@/components/ChartComponents/Common/SeriesLabelConfig';
import AngleSelect from '@/components/ChartComponents/Common/AngleSelect';
import MultipleSeriesConfig from '@/components/ChartComponents/Common/MultipleSeriesConfig';
import { SingleCollapse as Collapse } from '@/components/ChartComponents/Common/Collapse';
import { CompatColorSelect } from '@/components/ColorSelect';
import HalfForm from '@/components/ChartComponents/Common/Structure/HalfForm';
import LineStyle from '@/components/ChartComponents/Common/LineStyleSelect';
import InputNumber from '@/components/ChartComponents/Common/InputNumber';
import SymbolSelect from '@/components/ChartComponents/Common/SymbolSelect';
import LineStyleGroupConfig from '@/components/ChartComponents/Common/LineStyleGroupConfig';
import FormatterSelect from '@/components/ChartComponents/Common/FormatterSelect';
import {
  TCandlestickBasicConfig,
  markPointTypeConfig,
  markLineTypeConfig,
} from '../type';

const { Item } = ConfigList;

const SeriesConfig = (props: {
  value: TCandlestickBasicConfig['series'];
  onChange: ComponentData.ComponentConfigProps<TCandlestickBasicConfig>['onChange'];
}) => {
  const { value, onChange } = props;
  const { barWidth, markPoint, markLine, itemStyle } = value;
  const { data } = markLine;

  const onKeyChange = useCallback(
    (key: keyof TCandlestickBasicConfig['series'], value: any) => {
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

  const itemStyleConfig = useMemo(() => {
    return (
      <Collapse
        child={{
          header: '图形样式',
          key: 'itemStyle',
        }}
      >
        <Collapse
          child={{
            header: '阳线',
            key: 'itemStyle0',
          }}
        >
          <Item label="背景颜色">
            <FullForm>
              <CompatColorSelect
                value={itemStyle.color}
                onChange={(value) => {
                  onKeyChange('itemStyle', {
                    color: value,
                  });
                }}
              />
            </FullForm>
          </Item>
          <Item label="边框颜色">
            <FullForm>
              <CompatColorSelect
                value={itemStyle.borderColor}
                onChange={(value) => {
                  onKeyChange('itemStyle', {
                    borderColor: value,
                  });
                }}
              />
            </FullForm>
          </Item>
        </Collapse>
        <Collapse
          child={{
            header: '阴线',
            key: 'itemStyle1',
          }}
        >
          <Item label="背景颜色">
            <FullForm>
              <CompatColorSelect
                value={itemStyle.color0}
                onChange={(value) => {
                  onKeyChange('itemStyle', {
                    color0: value,
                  });
                }}
              />
            </FullForm>
          </Item>
          <Item label="边框颜色">
            <FullForm>
              <CompatColorSelect
                value={itemStyle.borderColor0}
                onChange={(value) => {
                  onKeyChange('itemStyle', {
                    borderColor0: value,
                  });
                }}
              />
            </FullForm>
          </Item>
        </Collapse>
        <Item label="边框">
          <HalfForm label="类型">
            <LineStyle
              value={itemStyle.borderType}
              onChange={(value) => {
                onKeyChange('itemStyle', {
                  borderType: value,
                });
              }}
            />
          </HalfForm>
          <HalfForm label="宽度">
            <InputNumber
              className="w-100"
              value={itemStyle.borderWidth}
              onChange={(value) => {
                onKeyChange('itemStyle', {
                  borderWidth: value,
                });
              }}
            />
          </HalfForm>
        </Item>
      </Collapse>
    );
  }, [itemStyle, onKeyChange]);

  const barWidthConfig = useMemo(() => {
    return (
      <Item label="图形宽度">
        <FullForm>
          <InputNumber
            className="w-100"
            value={barWidth}
            onChange={onKeyChange.bind(null, 'barWidth')}
          />
        </FullForm>
      </Item>
    );
  }, [barWidth, onKeyChange]);

  const markPointConfigDetail = useCallback(
    (
      value: markPointTypeConfig,
      onChange: (value: SuperPartial<markPointTypeConfig>) => void,
      label: string,
      key: string,
    ) => {
      return (
        <Collapse
          child={{
            header: label,
            key,
            visibleRender: true,
            value: value.show,
            onChange: (value) => {
              onChange({
                show: value,
              });
            },
          }}
        >
          <Collapse
            child={{
              header: '图形',
              key: key + 'symbol',
            }}
          >
            <Item label="类型">
              <FullForm>
                <SymbolSelect
                  value={value.symbol}
                  onChange={(value) => {
                    onChange({
                      symbol: value as any,
                    });
                  }}
                />
              </FullForm>
            </Item>
            <Item label="大小">
              <FullForm>
                <InputNumber
                  className="w-100"
                  value={value.symbolSize}
                  onChange={(value) => {
                    onChange({
                      symbolSize: value as number,
                    });
                  }}
                />
              </FullForm>
            </Item>
            <AngleSelect
              value={value.symbolRotate}
              onChange={(value) => {
                onChange({
                  symbolRotate: value as number,
                });
              }}
            />
            <Item label="标注颜色">
              <FullForm>
                <CompatColorSelect
                  value={value.itemStyle.color}
                  onChange={(value) => {
                    onChange({
                      itemStyle: {
                        color: value as any,
                      },
                    });
                  }}
                />
              </FullForm>
            </Item>
          </Collapse>
          <SeriesLabelConfig
            {...(value.label as any)}
            onChange={(value) => {
              onChange({
                label: value,
              });
            }}
          >
            <Item label="距离">
              <FullForm>
                <InputNumber
                  value={value.label.distance}
                  onChange={(value) => {
                    onChange({
                      label: {
                        distance: value as number,
                      },
                    });
                  }}
                />
              </FullForm>
            </Item>
            <FormatterSelect
              value={value.label.formatter}
              onChange={(value) => {
                onChange({
                  label: {
                    formatter: value,
                  },
                });
              }}
            />
          </SeriesLabelConfig>
        </Collapse>
      );
    },
    [],
  );

  const markLineDataConfigDetail = useCallback(
    (
      value: markLineTypeConfig,
      onChange: (value: SuperPartial<markLineTypeConfig>) => void,
      label: string,
      key: string,
    ) => {
      return (
        <Collapse
          child={{
            header: label,
            key: key,
            visibleRender: true,
            value: value.show,
            onChange: (value) => {
              onChange({
                show: value,
              });
            },
          }}
        >
          <SeriesLabelConfig
            {...(value.label as any)}
            onChange={(value) => {
              onChange({
                label: value,
              });
            }}
            ignore={['position']}
          >
            <FormatterSelect
              value={value.label.formatter}
              onChange={(value) => {
                onChange({
                  label: {
                    formatter: value,
                  },
                });
              }}
            />
          </SeriesLabelConfig>
          <LineStyleGroupConfig
            value={value.lineStyle}
            onChange={(value) => {
              onChange({
                lineStyle: value,
              });
            }}
          />
        </Collapse>
      );
    },
    [],
  );

  const markPointConfig = useMemo(() => {
    return (
      <Collapse
        child={{
          header: '图表标注',
          key: 'markPoint',
        }}
      >
        {markPointConfigDetail(
          markPoint.min,
          (value) => {
            onKeyChange('markPoint', {
              min: value,
            });
          },
          '最小值',
          'min',
        )}
        {markPointConfigDetail(
          markPoint.max,
          (value) => {
            onKeyChange('markPoint', {
              max: value,
            });
          },
          '最大值',
          'max',
        )}
        {markPointConfigDetail(
          markPoint.average,
          (value) => {
            onKeyChange('markPoint', {
              average: value,
            });
          },
          '平均值',
          'average',
        )}
      </Collapse>
    );
  }, [markPoint, onKeyChange, markPointConfigDetail]);

  const markLineConfig = useMemo(() => {
    return (
      <>
        {markLineDataConfigDetail(
          data.min,
          (value) => {
            onKeyChange('markLine', {
              data: {
                min: value,
              },
            });
          },
          '最小',
          'min',
        )}
        {markLineDataConfigDetail(
          data.max,
          (value) => {
            onKeyChange('markLine', {
              data: {
                max: value,
              },
            });
          },
          '最大',
          'max',
        )}
        {markLineDataConfigDetail(
          data.median,
          (value) => {
            onKeyChange('markLine', {
              data: {
                median: value,
              },
            });
          },
          '中位数',
          'median',
        )}
        {markLineDataConfigDetail(
          data.average,
          (value) => {
            onKeyChange('markLine', {
              data: {
                average: value,
              },
            });
          },
          '平均值',
          'average',
        )}
      </>
    );
  }, [data, onKeyChange, onChange]);

  return (
    <ConfigList>
      {barWidthConfig}
      {itemStyleConfig}
      {markPointConfig}
      <Collapse
        child={{
          header: '图表标线',
          key: 'markLine',
        }}
      >
        {markLineConfig}
      </Collapse>
    </ConfigList>
  );
};

export default SeriesConfig;
