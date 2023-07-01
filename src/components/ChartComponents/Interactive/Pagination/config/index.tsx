import { Component } from 'react';
import { Switch } from 'antd';
import { FontSizeOutlined, RocketOutlined } from '@ant-design/icons';
import ComponentOptionConfig, {
  Tab,
} from '@/components/ChartComponents/Common/ComponentOptionConfig';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import { CompatColorSelect } from '@/components/ColorSelect';
import { SingleCollapse as Collapse } from '@/components/ChartComponents/Common/Collapse';
import BootstrapIconSelect from '@/components/ChartComponents/Common/BootstrapIconSelect';
import InputNumber from '@/components/ChartComponents/Common/InputNumber';
import LineStyleGroupConfig from '@/components/ChartComponents/Common/LineStyleGroupConfig';
import { FontConfigList } from '@/components/ChartComponents/Common/FontConfig';
import IconRadio, {
  Radio,
} from '@/components/ChartComponents/Common/IconRadio';
import HalfForm from '@/components/ChartComponents/Common/Structure/HalfForm';
import Input from '@/components/ChartComponents/Common/Input';
import { updateInteractiveAndSyncParams4Component } from '@/components/ChartComponents/Common/utils';
import ConditionConfig from './Condition';
import { TPaginationConfig } from '../type';

const { Item } = ConfigList;
class Config extends Component<
  ComponentData.ComponentConfigProps<TPaginationConfig>
> {
  onKeyChange = (key: keyof TPaginationConfig, value: any) => {
    this.props.onChange(
      updateInteractiveAndSyncParams4Component<TPaginationConfig>({
        key,
        defaultValueKey: ['defaultValue', 'defaultPageSize'],
        callback: (field) => {
          if (field.key === 'current' && key === 'defaultValue') return true;
          if (field.key === 'pageSize' && key === 'defaultPageSize')
            return true;
          return false;
        },
        props: this.props,
        newValue: value,
      }),
    );
  };

  render() {
    const { value } = this.props;
    const {
      config: {
        options: {
          backgroundColor,
          borderRadius,
          margin,
          textStyle,
          border,
          active,
          total,
          pageButton,
          pageNumChanger,
          skip,
          condition,
          defaultValue = 1,
          defaultPageSize = 10,
        },
      },
    } = value;

    return (
      <ComponentOptionConfig
        items={[
          {
            label: <Tab>基础样式</Tab>,
            children: (
              <ConfigList level={1}>
                <Item label="页间距">
                  <FullForm>
                    <InputNumber
                      value={margin}
                      onChange={this.onKeyChange.bind(this, 'margin')}
                    />
                  </FullForm>
                </Item>
                <Item label="圆角">
                  <FullForm>
                    <InputNumber
                      value={borderRadius}
                      onChange={this.onKeyChange.bind(this, 'borderRadius')}
                    />
                  </FullForm>
                </Item>
                <Item label="背景颜色">
                  <FullForm>
                    <CompatColorSelect
                      value={backgroundColor}
                      onChange={this.onKeyChange.bind(this, 'backgroundColor')}
                    />
                  </FullForm>
                </Item>
                <LineStyleGroupConfig
                  value={border}
                  onChange={this.onKeyChange.bind(this, 'border')}
                  collapseProps={{
                    child: {
                      header: '边框样式',
                      key: 'border',
                    },
                  }}
                />
                <Collapse
                  child={{
                    header: '文字样式',
                    key: 'textStyle',
                  }}
                >
                  <FontConfigList
                    value={textStyle}
                    onChange={this.onKeyChange.bind(null, 'textStyle')}
                  />
                </Collapse>
                <Collapse
                  child={{
                    header: '选中样式',
                    key: 'active',
                  }}
                >
                  <Item label="背景颜色">
                    <FullForm>
                      <CompatColorSelect
                        value={active.backgroundColor}
                        onChange={(value) =>
                          this.onKeyChange('active', {
                            backgroundColor: value,
                          })
                        }
                      />
                    </FullForm>
                  </Item>
                  <LineStyleGroupConfig
                    value={active.border}
                    onChange={(value) =>
                      this.onKeyChange('active', {
                        border: value,
                      })
                    }
                    collapseProps={{
                      child: {
                        header: '边框样式',
                        key: 'active-border',
                      },
                    }}
                  />
                  <Collapse
                    child={{
                      header: '文字样式',
                      key: 'textStyle',
                    }}
                  >
                    <FontConfigList
                      value={active.textStyle}
                      onChange={(value) =>
                        this.onKeyChange('active', {
                          textStyle: value,
                        })
                      }
                    />
                  </Collapse>
                </Collapse>
                <Collapse
                  child={{
                    header: '翻页按钮',
                    key: 'pageButton',
                  }}
                >
                  <Item label="按钮类型">
                    <FullForm>
                      <IconRadio
                        value={pageButton.type}
                        onChange={(value) =>
                          this.onKeyChange('pageButton', {
                            type: value,
                          })
                        }
                      >
                        <Radio
                          value="text"
                          key="text"
                          icon={<FontSizeOutlined title="文字" />}
                        />
                        <Radio
                          value="icon"
                          key="icon"
                          icon={<RocketOutlined title="图标" />}
                        />
                      </IconRadio>
                    </FullForm>
                  </Item>
                  <Item label="内容">
                    <HalfForm label="左按钮">
                      {pageButton.type === 'text' ? (
                        <Input
                          value={pageButton.value[0]}
                          onChange={(value) =>
                            this.onKeyChange('pageButton', {
                              value: [value, pageButton.value[1]],
                            })
                          }
                        />
                      ) : (
                        <BootstrapIconSelect
                          value={pageButton.value[0]}
                          onChange={(value) =>
                            this.onKeyChange('pageButton', {
                              value: [value, pageButton.value[1]],
                            })
                          }
                        />
                      )}
                    </HalfForm>
                    <HalfForm label="右按钮">
                      {pageButton.type === 'text' ? (
                        <Input
                          value={pageButton.value[1]}
                          onChange={(value) =>
                            this.onKeyChange('pageButton', {
                              value: [pageButton.value[0], value],
                            })
                          }
                        />
                      ) : (
                        <BootstrapIconSelect
                          value={pageButton.value[1]}
                          onChange={(value) =>
                            this.onKeyChange('pageButton', {
                              value: [pageButton.value[0], value],
                            })
                          }
                        />
                      )}
                    </HalfForm>
                  </Item>
                  <Item label="大小">
                    <FullForm>
                      <InputNumber
                        value={pageButton.size}
                        onChange={(value) =>
                          this.onKeyChange('pageButton', {
                            size: value,
                          })
                        }
                      />
                    </FullForm>
                  </Item>
                  <Item label="颜色">
                    <FullForm>
                      <CompatColorSelect
                        value={pageButton.color}
                        onChange={(value) =>
                          this.onKeyChange('pageButton', {
                            color: value,
                          })
                        }
                      />
                    </FullForm>
                  </Item>
                  <Item label="背景颜色">
                    <FullForm>
                      <CompatColorSelect
                        value={pageButton.backgroundColor}
                        onChange={(value) =>
                          this.onKeyChange('pageButton', {
                            backgroundColor: value,
                          })
                        }
                      />
                    </FullForm>
                  </Item>
                  <Item label="边框">
                    <FullForm>
                      <Switch
                        checked={pageButton.border.show}
                        onChange={(value) =>
                          this.onKeyChange('pageButton', {
                            border: {
                              show: value,
                            },
                          })
                        }
                      />
                    </FullForm>
                  </Item>
                </Collapse>
                <Collapse
                  child={{
                    header: '切换器',
                    key: 'pageNumChanger',
                    value: pageNumChanger.show,
                    visibleRender: true,
                    onChange: (value) =>
                      this.onKeyChange('pageNumChanger', {
                        show: value,
                      }),
                  }}
                >
                  <Item label="显示条数">
                    <FullForm>
                      <Input
                        value={pageNumChanger.pageEnum}
                        onChange={(value) =>
                          this.onKeyChange('pageNumChanger', {
                            pageEnum: value,
                          })
                        }
                      />
                    </FullForm>
                  </Item>
                  <Item label="下拉箭头">
                    <FullForm label="大小">
                      <InputNumber
                        value={pageNumChanger.arrow.size}
                        onChange={(value) =>
                          this.onKeyChange('pageNumChanger', {
                            arrow: {
                              size: value,
                            },
                          })
                        }
                      />
                    </FullForm>
                    <FullForm label="颜色">
                      <CompatColorSelect
                        value={pageNumChanger.arrow.color}
                        onChange={(value) =>
                          this.onKeyChange('pageNumChanger', {
                            arrow: {
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
                    header: '跳转框',
                    key: 'skip',
                    value: skip.show,
                    visibleRender: true,
                    onChange: (value) =>
                      this.onKeyChange('skip', {
                        show: value,
                      }),
                  }}
                >
                  <Item label="间距">
                    <FullForm>
                      <InputNumber
                        value={skip.margin}
                        onChange={(value) =>
                          this.onKeyChange('skip', {
                            margin: value,
                          })
                        }
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
                      value={skip.textStyle}
                      onChange={(value) =>
                        this.onKeyChange('skip', {
                          textStyle: value,
                        })
                      }
                    />
                  </Collapse>
                </Collapse>
                <Collapse
                  child={{
                    header: '当前总量',
                    key: 'total_config',
                    value: total.show,
                    visibleRender: true,
                    onChange: (value) =>
                      this.onKeyChange('total', {
                        show: value,
                      }),
                  }}
                >
                  <Item label="间距">
                    <FullForm>
                      <InputNumber
                        value={total.margin}
                        onChange={(value) =>
                          this.onKeyChange('total', {
                            margin: value,
                          })
                        }
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
                      value={total.textStyle}
                      onChange={(value) =>
                        this.onKeyChange('total', {
                          textStyle: value,
                        })
                      }
                    />
                  </Collapse>
                </Collapse>
              </ConfigList>
            ),
            key: '1',
          },
          {
            label: <Tab>交互</Tab>,
            children: (
              <ConfigList level={1}>
                <Item label="默认页码">
                  <FullForm>
                    <InputNumber
                      value={defaultValue}
                      onChange={this.onKeyChange.bind(this, 'defaultValue')}
                    />
                  </FullForm>
                </Item>
                <Item label="默认每页数量">
                  <FullForm>
                    <InputNumber
                      value={defaultPageSize}
                      onChange={this.onKeyChange.bind(this, 'defaultPageSize')}
                    />
                  </FullForm>
                </Item>
              </ConfigList>
            ),
            key: '3',
          },
          {
            label: <Tab>条件</Tab>,
            children: (
              <ConfigList level={1}>
                <ConditionConfig
                  value={condition}
                  onChange={this.props.onChange}
                />
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
