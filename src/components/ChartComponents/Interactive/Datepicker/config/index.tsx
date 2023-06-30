import { Component } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import ComponentOptionConfig, {
  Tab,
} from '@/components/ChartComponents/Common/ComponentOptionConfig';
import Select from '@/components/ChartComponents/Common/Select';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import { SingleCollapse as Collapse } from '@/components/ChartComponents/Common/Collapse';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import { CompatColorSelect } from '@/components/ColorSelect';
import Input from '@/components/ChartComponents/Common/Input';
import InputNumber from '@/components/ChartComponents/Common/InputNumber';
import { FontConfigList } from '@/components/ChartComponents/Common/FontConfig';
import CodeEditor from './components/CodeEditor';
import IconTooltip from '@/components/IconTooltip';
import { TDatePickerConfig } from '../type';

const { Item } = ConfigList;
class Config extends Component<
  ComponentData.ComponentConfigProps<TDatePickerConfig>
> {
  onKeyChange = (key: keyof TDatePickerConfig, value: any) => {
    this.props.onChange({
      config: {
        options: {
          [key]: value,
        },
      },
    });
  };

  render() {
    const { value } = this.props;
    const {
      config: {
        options: {
          defaultDate,
          mode,
          format,
          filterDate,
          filterTime,
          arrow,
          yearAndMonthAndTime,
          week,
          dateAndTime,
          confirmBtn,
          input,
        },
      },
    } = value;

    return (
      <ComponentOptionConfig
        items={[
          {
            label: <Tab>样式</Tab>,
            children: (
              <ConfigList level={1}>
                <Collapse
                  child={{
                    header: '输入框样式',
                    key: 'input',
                  }}
                >
                  <Item label="边框颜色">
                    <FullForm>
                      <CompatColorSelect
                        value={input.borderColor}
                        onChange={(value) => {
                          this.onKeyChange('input', {
                            borderColor: value,
                          });
                        }}
                      />
                    </FullForm>
                  </Item>
                  <Item label="选中边框颜色">
                    <FullForm>
                      <CompatColorSelect
                        value={input.activeBorderColor}
                        onChange={(value) => {
                          this.onKeyChange('input', {
                            activeBorderColor: value,
                          });
                        }}
                      />
                    </FullForm>
                  </Item>
                  <Collapse
                    child={{
                      header: '文字样式',
                      key: 'textStyle',
                    }}
                  >
                    <FontConfigList
                      value={input.textStyle}
                      onChange={(value) =>
                        this.onKeyChange('input', {
                          textStyle: value,
                        })
                      }
                    />
                  </Collapse>
                </Collapse>
                <Collapse
                  child={{
                    header: '年月及时间文字',
                    key: 'header',
                  }}
                >
                  <FontConfigList
                    value={yearAndMonthAndTime.textStyle}
                    onChange={(value) =>
                      this.onKeyChange('yearAndMonthAndTime', {
                        textStyle: value,
                      })
                    }
                  />
                </Collapse>
                <Collapse
                  child={{
                    header: '周文字',
                    key: 'week',
                  }}
                >
                  <FontConfigList
                    value={week.textStyle}
                    onChange={(value) =>
                      this.onKeyChange('week', {
                        textStyle: value,
                      })
                    }
                  />
                </Collapse>
                <Collapse
                  child={{
                    key: 'dateAndTime',
                    header: '日期及时间',
                  }}
                >
                  <Item label="圆角">
                    <FullForm>
                      <InputNumber
                        value={dateAndTime.borderRadius}
                        onChange={(value) => {
                          this.onKeyChange('dateAndTime', {
                            borderRadius: value,
                          });
                        }}
                      />
                    </FullForm>
                  </Item>
                  <Item label="背景色">
                    <FullForm>
                      <CompatColorSelect
                        value={dateAndTime.backgroundColor}
                        onChange={(value) => {
                          this.onKeyChange('dateAndTime', {
                            backgroundColor: value,
                          });
                        }}
                      />
                    </FullForm>
                  </Item>
                  <Collapse
                    child={{
                      header: '文字样式',
                      key: 'textStyle',
                    }}
                  >
                    <FontConfigList
                      value={dateAndTime.textStyle}
                      onChange={(value) => {
                        this.onKeyChange('dateAndTime', {
                          textStyle: value,
                        });
                      }}
                    />
                  </Collapse>
                  <Collapse
                    child={{
                      header: '上下时间样式',
                      key: 'prevAndNext',
                    }}
                  >
                    <Item label="背景色">
                      <FullForm>
                        <CompatColorSelect
                          value={dateAndTime.prevAndNext.backgroundColor}
                          onChange={(value) => {
                            this.onKeyChange('dateAndTime', {
                              prevAndNext: {
                                backgroundColor: value,
                              },
                            });
                          }}
                        />
                      </FullForm>
                    </Item>
                    <Collapse
                      child={{
                        header: '文字样式',
                        key: 'textStyle',
                      }}
                    >
                      <FontConfigList
                        value={dateAndTime.prevAndNext.textStyle}
                        onChange={(value) => {
                          this.onKeyChange('dateAndTime', {
                            prevAndNext: {
                              textStyle: value,
                            },
                          });
                        }}
                      />
                    </Collapse>
                  </Collapse>
                  <Collapse
                    child={{
                      header: '移入样式',
                      key: 'hover',
                    }}
                  >
                    <Item label="背景色">
                      <FullForm>
                        <CompatColorSelect
                          value={dateAndTime.hover.backgroundColor}
                          onChange={(value) => {
                            this.onKeyChange('dateAndTime', {
                              hover: {
                                backgroundColor: value,
                              },
                            });
                          }}
                        />
                      </FullForm>
                    </Item>
                    <Collapse
                      child={{
                        header: '文字样式',
                        key: 'textStyle',
                      }}
                    >
                      <FontConfigList
                        value={dateAndTime.hover.textStyle}
                        onChange={(value) => {
                          this.onKeyChange('dateAndTime', {
                            hover: {
                              textStyle: value,
                            },
                          });
                        }}
                      />
                    </Collapse>
                  </Collapse>
                  <Collapse
                    child={{
                      header: '选中样式',
                      key: 'active',
                    }}
                  >
                    <Item label="背景色">
                      <FullForm>
                        <CompatColorSelect
                          value={dateAndTime.active.backgroundColor}
                          onChange={(value) => {
                            this.onKeyChange('dateAndTime', {
                              active: {
                                backgroundColor: value,
                              },
                            });
                          }}
                        />
                      </FullForm>
                    </Item>
                    <Collapse
                      child={{
                        header: '文字样式',
                        key: 'textStyle',
                      }}
                    >
                      <FontConfigList
                        value={dateAndTime.active.textStyle}
                        onChange={(value) => {
                          this.onKeyChange('dateAndTime', {
                            active: {
                              textStyle: value,
                            },
                          });
                        }}
                      />
                    </Collapse>
                  </Collapse>
                  <Collapse
                    child={{
                      header: '禁用样式',
                      key: 'disabled',
                    }}
                  >
                    <Item label="背景色">
                      <FullForm>
                        <CompatColorSelect
                          value={dateAndTime.disabled.backgroundColor}
                          onChange={(value) => {
                            this.onKeyChange('dateAndTime', {
                              disabled: {
                                backgroundColor: value,
                              },
                            });
                          }}
                        />
                      </FullForm>
                    </Item>
                    <Collapse
                      child={{
                        header: '文字样式',
                        key: 'textStyle',
                      }}
                    >
                      <FontConfigList
                        value={dateAndTime.disabled.textStyle}
                        onChange={(value) => {
                          this.onKeyChange('dateAndTime', {
                            disabled: {
                              textStyle: value,
                            },
                          });
                        }}
                      />
                    </Collapse>
                  </Collapse>
                </Collapse>
                <Collapse
                  child={{
                    key: 'arrow',
                    header: '切换箭头',
                  }}
                >
                  <Item label="颜色">
                    <FullForm>
                      <CompatColorSelect
                        value={arrow.color}
                        onChange={(value) =>
                          this.onKeyChange('arrow', {
                            color: value,
                          })
                        }
                      />
                    </FullForm>
                  </Item>
                  <Item label="移入颜色">
                    <FullForm>
                      <CompatColorSelect
                        value={arrow.active.color}
                        onChange={(value) =>
                          this.onKeyChange('arrow', {
                            active: {
                              color: value,
                            },
                          })
                        }
                      />
                    </FullForm>
                  </Item>
                </Collapse>
                <Collapse
                  child={{
                    key: 'confirmBtn',
                    header: '确认按钮',
                  }}
                >
                  <FontConfigList
                    value={confirmBtn.textStyle}
                    onChange={(value) =>
                      this.onKeyChange('confirmBtn', {
                        textStyle: value,
                      })
                    }
                  />
                </Collapse>
              </ConfigList>
            ),
            key: '1',
          },
          {
            label: <Tab>交互</Tab>,
            children: (
              <ConfigList level={1}>
                <Item label="选择类型">
                  <FullForm>
                    <Select
                      className="w-100"
                      value={mode}
                      onChange={this.onKeyChange.bind(this, 'mode')}
                      options={[
                        {
                          label: '选择到年',
                          value: 'year',
                        },
                        {
                          label: '选择到月',
                          value: 'month',
                        },
                        {
                          label: '选择到日',
                          value: 'date',
                        },
                        {
                          label: '选择到时间',
                          value: 'time',
                        },
                        {
                          label: '选择到周',
                          value: 'week',
                        },
                      ]}
                    />
                  </FullForm>
                </Item>
                <Item
                  label="显示格式"
                  placeholder={
                    <IconTooltip title="需要和选择的时间类型格式对应">
                      <InfoCircleOutlined />
                    </IconTooltip>
                  }
                >
                  <FullForm>
                    <Input
                      value={format}
                      onChange={this.onKeyChange.bind(this, 'format')}
                    />
                  </FullForm>
                </Item>
                <Item label="初始选中">
                  <FullForm>
                    <Input
                      value={defaultDate}
                      onChange={this.onKeyChange.bind(this, 'defaultDate')}
                    />
                  </FullForm>
                </Item>
                <Item label="过滤日期">
                  <FullForm>
                    <CodeEditor
                      functionName="filterDate"
                      value={filterDate}
                      onChange={this.onKeyChange.bind(this, 'filterDate')}
                    />
                  </FullForm>
                </Item>
                <Item label="过滤时间">
                  <FullForm>
                    <CodeEditor
                      functionName="filterTime"
                      value={filterTime}
                      onChange={this.onKeyChange.bind(this, 'filterTime')}
                    />
                  </FullForm>
                </Item>
              </ConfigList>
            ),
            key: '2',
          },
        ]}
      />
    );
  }
}

export default Config;
