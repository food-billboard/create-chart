import { InfoCircleOutlined } from '@ant-design/icons';
import { Switch } from 'antd';
import { merge } from 'lodash';
import { Component } from 'react';
import { SingleCollapse as Collapse } from '@/components/ChartComponents/Common/Collapse';
import ComponentOptionConfig, {
  Tab,
} from '@/components/ChartComponents/Common/ComponentOptionConfig';
import { FontConfigList } from '@/components/ChartComponents/Common/FontConfig';
import Input from '@/components/ChartComponents/Common/Input';
import InputNumber from '@/components/ChartComponents/Common/InputNumber';
import MultipleSeriesConfig from '@/components/ChartComponents/Common/MultipleSeriesConfig';
import Select from '@/components/ChartComponents/Common/Select';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import HalfForm from '@/components/ChartComponents/Common/Structure/HalfForm';
import ColorSelect from '@/components/ColorSelect';
import IconTooltip from '@/components/IconTooltip';
import GlobalConfig from '@/utils/Assist/GlobalConfig';
import { DEFAULT_FONT_CONFIG } from '../../../Common/Constants/defaultConfig';
import { TListConfig } from '../type';
import ConditionConfig from './Condition';

const { Item } = ConfigList;

class Config extends Component<
  ComponentData.ComponentConfigProps<TListConfig>
> {
  onKeyChange = (key: keyof TListConfig, value: any) => {
    this.props.onChange({
      config: {
        options: {
          [key]: value,
        },
      },
    });
  };

  onKeyChangeAndForceUpdate = (key: keyof TListConfig, value: any) => {
    this.props.onChange({
      config: {
        options: {
          [key]: {
            ...value,
            // ! 暂时用这个方法强制刷新
            timestamps: Date.now(),
          },
        },
      },
    });
  };

  render() {
    const { value } = this.props;
    const {
      config: {
        data: { filter: { map = [] } = {} } = {},
        options: { global, header, index, columns, condition },
      },
    } = value;

    return (
      <ComponentOptionConfig
        items={[
          {
            label: <Tab>全局样式</Tab>,
            children: (
              <ConfigList level={1}>
                <Item label="列表显示行数">
                  <FullForm>
                    <InputNumber
                      className="w-100"
                      value={global.column}
                      onChange={(value) => {
                        this.onKeyChange('global', {
                          column: value,
                        });
                      }}
                    />
                  </FullForm>
                </Item>
                <Collapse
                  child={{
                    header: '动画',
                    key: 'animation',
                    visibleRender: true,
                    value: global.animation.show,
                    onChange: (value) => {
                      this.onKeyChange('global', {
                        animation: {
                          show: value,
                        },
                      });
                    },
                  }}
                  parent={{
                    activeKey: 'animation',
                  }}
                >
                  <Item label="滚动类型">
                    <FullForm>
                      <Select
                        className="w-100"
                        value={global.animation.type}
                        onChange={(value) => {
                          this.onKeyChange('global', {
                            animation: {
                              type: value,
                            },
                          });
                        }}
                        options={[
                          {
                            label: '逐条滚动',
                            value: 'column',
                          },
                          {
                            label: '整页滚动',
                            value: 'page',
                          },
                        ]}
                      />
                    </FullForm>
                  </Item>
                  <Item label="时间">
                    <HalfForm label="滚动时间">
                      <InputNumber
                        className="w-100"
                        value={global.animation.speed}
                        onChange={(value) => {
                          this.onKeyChange('global', {
                            animation: {
                              speed: value,
                            },
                          });
                        }}
                      />
                    </HalfForm>
                    <HalfForm label="时间间隔">
                      <InputNumber
                        className="w-100"
                        value={global.animation.autoplaySpeed}
                        onChange={(value) => {
                          this.onKeyChange('global', {
                            animation: {
                              autoplaySpeed: value,
                            },
                          });
                        }}
                      />
                    </HalfForm>
                  </Item>
                </Collapse>
                <Collapse
                  child={{
                    header: (
                      <>
                        指标
                        <IconTooltip title="列设置数据类型为指标时生效">
                          <InfoCircleOutlined className="m-l-4" />
                        </IconTooltip>
                      </>
                    ),
                    key: 'animation',
                    value: global.numberPoint.animation,
                  }}
                >
                  <Item label="动画">
                    <FullForm>
                      <Switch
                        checked={global.numberPoint.animation}
                        onChange={(value) => {
                          this.onKeyChange('global', {
                            numberPoint: {
                              animation: value,
                            },
                          });
                        }}
                      />
                    </FullForm>
                  </Item>
                  <Item label="指标色">
                    <HalfForm label="上升">
                      <ColorSelect
                        value={global.numberPoint.positiveColor}
                        onChange={(value) => {
                          this.onKeyChange('global', {
                            numberPoint: {
                              positiveColor: value,
                            },
                          });
                        }}
                      />
                    </HalfForm>
                    <HalfForm label="下降">
                      <ColorSelect
                        value={global.numberPoint.negativeColor}
                        onChange={(value) => {
                          this.onKeyChange('global', {
                            numberPoint: {
                              negativeColor: value,
                            },
                          });
                        }}
                      />
                    </HalfForm>
                  </Item>
                </Collapse>
              </ConfigList>
            ),
            key: '1',
          },
          {
            label: <Tab>表头</Tab>,
            children: (
              <ConfigList level={1}>
                <Collapse
                  child={{
                    header: '表头',
                    key: 'header',
                    visibleRender: true,
                    value: header.show,
                    onChange: (value) => {
                      this.onKeyChange('header', {
                        show: value,
                      });
                    },
                  }}
                  parent={{
                    activeKey: ['header'],
                  }}
                >
                  <Item label="高度">
                    <FullForm>
                      <InputNumber
                        className="w-100"
                        value={header.height}
                        onChange={(value) => {
                          this.onKeyChange('header', {
                            height: value,
                          });
                        }}
                      />
                    </FullForm>
                  </Item>
                  <Item label="背景颜色">
                    <FullForm>
                      <ColorSelect
                        value={header.backgroundColor}
                        onChange={(value) => {
                          this.onKeyChange('header', {
                            backgroundColor: value,
                          });
                        }}
                      />
                    </FullForm>
                  </Item>
                  <Collapse
                    child={{
                      header: '文本',
                      key: 'textStyle',
                    }}
                  >
                    <FontConfigList
                      value={header.textStyle}
                      onChange={(value) => {
                        this.onKeyChange('header', {
                          textStyle: value,
                        });
                      }}
                    />
                  </Collapse>
                </Collapse>
              </ConfigList>
            ),
            key: '2',
          },
          {
            label: <Tab>行</Tab>,
            children: (
              <ConfigList level={1}>
                <Item label="上下间距">
                  <FullForm>
                    <InputNumber
                      className="w-100"
                      value={columns.margin}
                      onChange={(value) => {
                        this.onKeyChange('columns', {
                          margin: value,
                        });
                      }}
                    />
                  </FullForm>
                </Item>
                <Collapse
                  child={{
                    header: '背景颜色',
                    key: 'backgroundColor',
                  }}
                >
                  <Item label="奇行">
                    <FullForm>
                      <ColorSelect
                        value={columns.odd.backgroundColor}
                        onChange={(value) => {
                          this.onKeyChange('columns', {
                            odd: {
                              backgroundColor: value,
                            },
                          });
                        }}
                      />
                    </FullForm>
                  </Item>
                  <Item label="偶行">
                    <FullForm>
                      <ColorSelect
                        value={columns.even.backgroundColor}
                        onChange={(value) => {
                          this.onKeyChange('columns', {
                            even: {
                              backgroundColor: value,
                            },
                          });
                        }}
                      />
                    </FullForm>
                  </Item>
                </Collapse>
                <MultipleSeriesConfig
                  onAdd={() => {
                    const newIndex = columns.data.length;
                    const key = `fields_${newIndex + 1}`;
                    const name = `字段_${newIndex + 1}`;
                    const newData = {
                      key,
                      name,
                      width: 20,
                      type: 'text',
                      textStyle: {
                        ...DEFAULT_FONT_CONFIG,
                        fontSize: 14,
                        textAlign: 'center',
                      },
                      header: {
                        show: true,
                      },
                      scroll: {
                        show: false,
                      },
                    };
                    const newDataList = [...columns.data, newData];
                    this.onKeyChange('columns', {
                      data: newDataList,
                    });

                    // update fields
                    const newMap: any = [
                      ...map,
                      {
                        field: key,
                        map: '',
                        description: name,
                        id: key,
                        type: 'string',
                      },
                    ];
                    this.props.onChange({
                      config: {
                        data: {
                          filter: {
                            map: newMap,
                          },
                        },
                      },
                    });
                  }}
                  onRemove={(index) => {
                    const newData = [...columns.data];
                    newData.splice(index, 1);
                    this.onKeyChange('columns', {
                      data: newData,
                    });

                    // update fields
                    const newMap: any = [...map];
                    newMap.splice(index, 1);
                    this.props.onChange({
                      config: {
                        data: {
                          filter: {
                            map: newMap,
                          },
                        },
                      },
                    });
                  }}
                  counter={columns.data.length}
                  max={GlobalConfig.getChartSeriesCounter('LIST')}
                  renderContent={(index) => {
                    const {
                      key,
                      name,
                      width,
                      type,
                      textStyle,
                      header,
                      scroll,
                    } = columns.data[index];
                    return (
                      <>
                        <Item label="字段">
                          <HalfForm label="key">
                            <Input
                              className="w-100"
                              value={key}
                              onChange={(value) => {
                                const newData = [...columns.data];
                                newData.splice(
                                  index,
                                  1,
                                  merge(newData[index], {
                                    key: value,
                                  }),
                                );
                                this.onKeyChange('columns', {
                                  data: newData,
                                });

                                const newMap: any = map.map((item) => {
                                  const { field } = item;
                                  if (field !== key) return item;
                                  return {
                                    ...item,
                                    field: value,
                                    id: value,
                                  };
                                });
                                this.props.onChange({
                                  config: {
                                    data: {
                                      filter: {
                                        map: newMap,
                                      },
                                    },
                                  },
                                });
                              }}
                            />
                          </HalfForm>
                          <HalfForm label="name">
                            <Input
                              className="w-100"
                              value={name}
                              onChange={(value) => {
                                const newData = [...columns.data];
                                newData.splice(
                                  index,
                                  1,
                                  merge(newData[index], {
                                    name: value,
                                  }),
                                );
                                this.onKeyChange('columns', {
                                  data: newData,
                                });

                                const newMap: any = map.map((item) => {
                                  const { field } = item;
                                  if (field !== key) return item;
                                  return {
                                    ...item,
                                    description: value,
                                  };
                                });
                                this.props.onChange({
                                  config: {
                                    data: {
                                      filter: {
                                        map: newMap,
                                      },
                                    },
                                  },
                                });
                              }}
                            />
                          </HalfForm>
                        </Item>
                        <Item label="宽度（%）">
                          <FullForm>
                            <InputNumber
                              className="w-100"
                              value={width}
                              onChange={(value) => {
                                const newData = [...columns.data];
                                newData.splice(
                                  index,
                                  1,
                                  merge(newData[index], {
                                    width: value,
                                  }),
                                );
                                this.onKeyChangeAndForceUpdate('columns', {
                                  data: newData,
                                });
                              }}
                            />
                          </FullForm>
                        </Item>
                        <Item label="内容类型">
                          <FullForm>
                            <Select
                              className="w-100"
                              value={type}
                              onChange={(value) => {
                                const newData = [...columns.data];
                                newData.splice(
                                  index,
                                  1,
                                  merge(newData[index], {
                                    type: value,
                                  }),
                                );
                                this.onKeyChangeAndForceUpdate('columns', {
                                  data: newData,
                                });
                              }}
                              options={[
                                {
                                  label: '文字',
                                  value: 'text',
                                },
                                {
                                  label: '图片',
                                  value: 'image',
                                },
                                {
                                  label: '数字指标',
                                  value: 'number-point',
                                },
                              ]}
                            />
                          </FullForm>
                        </Item>
                        <Item
                          label="是否滚动"
                          placeholder={
                            <IconTooltip title={'只对文字类型内容生效'}>
                              <InfoCircleOutlined />
                            </IconTooltip>
                          }
                        >
                          <FullForm>
                            <Switch
                              checked={scroll.show}
                              onChange={(value) => {
                                const newData = [...columns.data];
                                newData.splice(
                                  index,
                                  1,
                                  merge(newData[index], {
                                    scroll: {
                                      show: value,
                                    },
                                  }),
                                );
                                this.onKeyChangeAndForceUpdate('columns', {
                                  data: newData,
                                });
                              }}
                            />
                          </FullForm>
                        </Item>
                        <Collapse
                          child={{
                            header: '文本',
                            key: 'textStyle',
                          }}
                        >
                          <FontConfigList
                            value={textStyle}
                            onChange={(value) => {
                              const newData = [...columns.data];
                              newData.splice(
                                index,
                                1,
                                merge(newData[index], {
                                  textStyle: value,
                                }),
                              );
                              this.onKeyChangeAndForceUpdate('columns', {
                                data: newData,
                              });
                            }}
                          />
                        </Collapse>
                        {/* 暂时不需要 */}
                        {/* <Collapse
                      child={{
                        header: '自定义表头',
                        key: 'column-header',
                        visibleRender: true,
                        value: header.show,
                        onChange: value => {
                          const newData = [...columns.data]
                          newData.splice(index, 1, merge(newData[index], {
                            header: {
                              show: value
                            }
                          }))
                          this.onKeyChange('columns', {
                            data: newData
                          })
                        }
                      }}
                    >
                      <Item
                        label='背景颜色'
                      >
                        <FullForm>
                          <ColorSelect
                            value={header.backgroundColor}
                            onChange={value => {
                              const newData = [...columns.data]
                              newData.splice(index, 1, merge(newData[index], {
                                header: {
                                  backgroundColor: value
                                }
                              }))
                              this.onKeyChange('columns', {
                                data: newData
                              })
                            }}
                          />
                        </FullForm>
                      </Item>
                      <Collapse
                        child={{
                          header: '文本',
                          key: 'column-header-textStyle'
                        }}
                      >
                        <FontConfigList
                          value={header.textStyle}
                          onChange={value => {
                            const newData = [...columns.data]
                            newData.splice(index, 1, merge(newData[index], {
                              header: {
                                textStyle: value
                              }
                            }))
                            this.onKeyChange('columns', {
                              data: newData
                            })
                          }}
                        />
                      </Collapse>
                    </Collapse> */}
                      </>
                    );
                  }}
                  buttonLabel="新增字段"
                  seriesLabel={(index) => {
                    return columns.data[index]?.name || `字段${index + 1}`;
                  }}
                />
              </ConfigList>
            ),
            key: '3',
          },
          {
            label: <Tab>索引</Tab>,
            children: (
              <ConfigList level={1}>
                <Collapse
                  child={{
                    header: '索引',
                    key: 'indexes',
                    visibleRender: true,
                    value: index.show,
                    onChange: (value) => {
                      this.onKeyChange('index', {
                        show: value,
                      });
                    },
                  }}
                  parent={{
                    defaultActiveKey: ['indexes'],
                  }}
                >
                  <Item label="宽度（%）">
                    <FullForm>
                      <InputNumber
                        className="w-100"
                        value={index.width}
                        onChange={(value) => {
                          this.onKeyChange('index', {
                            width: value,
                          });
                        }}
                      />
                    </FullForm>
                  </Item>
                  <Item label="大小">
                    <FullForm>
                      <InputNumber
                        className="w-100"
                        value={index.size}
                        onChange={(value) => {
                          this.onKeyChange('index', {
                            size: value,
                          });
                        }}
                      />
                    </FullForm>
                  </Item>
                  <Item label="背景颜色">
                    <FullForm>
                      <ColorSelect
                        value={index.backgroundColor}
                        onChange={(value) => {
                          this.onKeyChange('index', {
                            backgroundColor: value,
                          });
                        }}
                      />
                    </FullForm>
                  </Item>
                  <Item label="圆角">
                    <FullForm>
                      <InputNumber
                        className="w-100"
                        value={index.radius}
                        onChange={(value) => {
                          this.onKeyChange('index', {
                            radius: value,
                          });
                        }}
                      />
                    </FullForm>
                  </Item>
                  <Collapse
                    child={{
                      header: '文本',
                      key: 'textStyle',
                    }}
                  >
                    <FontConfigList
                      value={index.textStyle}
                      onChange={(value) => {
                        this.onKeyChange('index', {
                          textStyle: value,
                        });
                      }}
                    />
                  </Collapse>
                </Collapse>
              </ConfigList>
            ),
            key: '4',
          },
          {
            label: <Tab>条件</Tab>,
            children: (
              <ConfigList level={1}>
                <ConditionConfig
                  value={condition}
                  onChange={this.onKeyChange.bind(null, 'condition')}
                />
              </ConfigList>
            ),
            key: '5',
          },
        ]}
      />
    );
  }
}

export default Config;
