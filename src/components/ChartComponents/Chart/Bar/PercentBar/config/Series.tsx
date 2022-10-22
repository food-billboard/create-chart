import { useCallback, useMemo } from 'react';
import { pick } from 'lodash';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import { SingleCollapse as Collapse } from '@/components/ChartComponents/Common/Collapse';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import ChartGradientSelect from '@/components/ChartComponents/Common/ChartGradientSelect';
import MultipleSeriesConfig from '@/components/ChartComponents/Common/MultipleSeriesConfig';
import InputNumber from '@/components/ChartComponents/Common/InputNumber';
import Input from '@/components/ChartComponents/Common/Input';
import { FontConfigList } from '@/components/ChartComponents/Common/FontConfig';
import ThemeUtil from '@/utils/Assist/Theme';
import GlobalConfig from '@/utils/Assist/GlobalConfig';
import { DEFAULT_RADIAL_CONFIG } from '../../../../Common/Constants/defaultConfig';
import { DEFAULT_LABEL } from '../defaultConfig';
import { TPercentBarConfig } from '../type';

const { Item } = ConfigList;

const SeriesConfig = (props: {
  value: TPercentBarConfig['series'];
  onChange: ComponentData.ComponentConfigProps<TPercentBarConfig>['onChange'];
}) => {
  const { value, onChange } = props;
  const { barWidth, itemStyle } = value;

  const onKeyChange = useCallback(
    (key: keyof TPercentBarConfig['series'], value: any) => {
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

  const onLabelChange = useCallback(
    (value: any, index: number) => {
      const newItemStyle = [...itemStyle];
      newItemStyle.splice(index, 1, value);
      onKeyChange('itemStyle', newItemStyle);
    },
    [onKeyChange, itemStyle],
  );

  const itemStyleConfig = useMemo(() => {
    const counter = itemStyle.length;
    return (
      <MultipleSeriesConfig
        counter={counter}
        renderContent={(index) => {
          const target = itemStyle[index];
          const { color, label } = itemStyle[index];
          return (
            <>
              <Collapse
                child={{
                  header: '颜色',
                  key: 'color',
                }}
              >
                <ChartGradientSelect
                  value={color}
                  onChange={(value) => {
                    const newItemStyle = [...itemStyle];
                    newItemStyle.splice(index, 1, {
                      ...itemStyle[index],
                      color: value as any,
                    });
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
              </Collapse>
              <Collapse
                child={{
                  header: '文本标签',
                  key: 'label',
                  visibleRender: true,
                  value: label.show,
                  onChange: (value) => {
                    onLabelChange(
                      {
                        ...target,
                        label: {
                          ...target.label,
                          show: value,
                        },
                      },
                      index,
                    );
                  },
                }}
              >
                <Collapse
                  child={{
                    header: '名称',
                    key: 'name',
                    visibleRender: true,
                    value: label.formatter.name.show,
                    onChange: (value) => {
                      onLabelChange(
                        {
                          ...target,
                          label: {
                            ...target.label,
                            formatter: {
                              ...target.label.formatter,
                              name: {
                                ...target.label.formatter.name,
                                show: value,
                              },
                            },
                          },
                        },
                        index,
                      );
                    },
                  }}
                >
                  <Collapse
                    child={{
                      header: '文字',
                      key: 'textStyle',
                    }}
                  >
                    <FontConfigList
                      value={pick(label.formatter.name, [
                        'fontSize',
                        'color',
                        'fontFamily',
                        'fontWeight',
                      ])}
                      onChange={(value) => {
                        onLabelChange(
                          {
                            ...target,
                            label: {
                              ...target.label,
                              formatter: {
                                ...target.label.formatter,
                                name: {
                                  ...target.label.formatter.name,
                                  ...value,
                                },
                              },
                            },
                          },
                          index,
                        );
                      }}
                    />
                  </Collapse>
                </Collapse>
                <Collapse
                  child={{
                    header: '值',
                    key: 'value',
                    visibleRender: true,
                    value: label.formatter.value.show,
                    onChange: (value) => {
                      onLabelChange(
                        {
                          ...target,
                          label: {
                            ...target.label,
                            formatter: {
                              ...target.label.formatter,
                              value: {
                                ...target.label.formatter.value,
                                show: value,
                              },
                            },
                          },
                        },
                        index,
                      );
                    },
                  }}
                >
                  <Collapse
                    child={{
                      header: '文字',
                      key: 'textStyle',
                    }}
                  >
                    <FontConfigList
                      value={pick(label.formatter.value, [
                        'fontSize',
                        'color',
                        'fontFamily',
                        'fontWeight',
                      ])}
                      onChange={(value) => {
                        onLabelChange(
                          {
                            ...target,
                            label: {
                              ...target.label,
                              formatter: {
                                ...target.label.formatter,
                                value: {
                                  ...target.label.formatter.value,
                                  ...value,
                                },
                              },
                            },
                          },
                          index,
                        );
                      }}
                    />
                  </Collapse>
                  <Collapse
                    child={{
                      header: '后缀',
                      key: 'addonAfter',
                      visibleRender: true,
                      value: label.formatter.value.addonAfter.show,
                      onChange: (value) => {
                        onLabelChange(
                          {
                            ...target,
                            label: {
                              ...target.label,
                              formatter: {
                                ...target.label.formatter,
                                value: {
                                  ...target.label.formatter.value,
                                  addonAfter: {
                                    ...target.label.formatter.value.addonAfter,
                                    show: value,
                                  },
                                },
                              },
                            },
                          },
                          index,
                        );
                      },
                    }}
                  >
                    <Item label="内容">
                      <FullForm>
                        <Input
                          value={label.formatter.value.addonAfter.value}
                          onChange={(value) => {
                            onLabelChange(
                              {
                                ...target,
                                label: {
                                  ...target.label,
                                  formatter: {
                                    ...target.label.formatter,
                                    value: {
                                      ...target.label.formatter.value,
                                      addonAfter: {
                                        ...target.label.formatter.value
                                          .addonAfter,
                                        value,
                                      },
                                    },
                                  },
                                },
                              },
                              index,
                            );
                          }}
                        />
                      </FullForm>
                    </Item>
                  </Collapse>
                </Collapse>
              </Collapse>
            </>
          );
        }}
        onAdd={() => {
          onKeyChange('itemStyle', [
            ...itemStyle,
            {
              label: DEFAULT_LABEL,
              color: {
                ...DEFAULT_RADIAL_CONFIG,
                start: ThemeUtil.generateNextColor4CurrentTheme(counter),
                end: {
                  ...ThemeUtil.generateNextColor4CurrentTheme(counter),
                  a: 0.5,
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
        max={GlobalConfig.getChartSeriesCounter('PERCENT_BAR')}
      />
    );
  }, [itemStyle, onKeyChange, onLabelChange, onChange]);

  const barConfig = useMemo(() => {
    return (
      <>
        <Item label="柱宽">
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
      {barConfig}
      {itemStyleConfig}
    </ConfigList>
  );
};

export default SeriesConfig;
