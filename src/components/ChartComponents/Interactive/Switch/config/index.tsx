import { Switch } from 'antd';
import { Component } from 'react';
import BootstrapIconSelect from '@/components/ChartComponents/Common/BootstrapIconSelect';
import BoxShadowConfig from '@/components/ChartComponents/Common/BoxShadowConfig';
import { SingleCollapse as Collapse } from '@/components/ChartComponents/Common/Collapse';
import ComponentOptionConfig, {
  Tab,
} from '@/components/ChartComponents/Common/ComponentOptionConfig';
import Input from '@/components/ChartComponents/Common/Input';
import Select from '@/components/ChartComponents/Common/Select';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import { updateInteractiveAndSyncParams4Component } from '@/components/ChartComponents/Common/utils';
import ColorSelect from '@/components/ColorSelect';
import { TSwitchConfig } from '../type';

const { Item } = ConfigList;
class Config extends Component<
  ComponentData.ComponentConfigProps<TSwitchConfig>
> {
  onKeyChange = (key: keyof TSwitchConfig, value: any) => {
    this.props.onChange(
      updateInteractiveAndSyncParams4Component<TSwitchConfig>({
        key,
        defaultValueKey: 'defaultChecked',
        callback: (field) => {
          return field.key === 'value' && field._defaultValue_ === false;
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
          defaultChecked,
          offColor,
          onColor,
          onHandleColor,
          offHandleColor,
          checkedIcon,
          uncheckedIcon,
          boxShadow,
          activeBoxShadow,
        },
      },
    } = value;

    return (
      <ComponentOptionConfig
        items={[
          {
            label: <Tab>状态样式</Tab>,
            children: (
              <ConfigList level={1}>
                <Collapse
                  child={{
                    key: 'on',
                    header: '开启状态',
                  }}
                  parent={{
                    defaultActiveKey: ['on'],
                  }}
                >
                  <Item label="背景色">
                    <FullForm>
                      <ColorSelect
                        value={onColor}
                        onChange={this.onKeyChange.bind(this, 'onColor')}
                      />
                    </FullForm>
                  </Item>
                  <Item label="按钮颜色">
                    <FullForm>
                      <ColorSelect
                        value={onHandleColor}
                        onChange={this.onKeyChange.bind(this, 'onHandleColor')}
                      />
                    </FullForm>
                  </Item>
                  <Collapse
                    child={{
                      header: '文案',
                      key: 'checkedIcon',
                      visibleRender: true,
                      value: checkedIcon.show,
                      onChange: (value) => {
                        this.onKeyChange('checkedIcon', {
                          show: value,
                        });
                      },
                    }}
                  >
                    <Item label="类型">
                      <FullForm>
                        <Select
                          value={checkedIcon.type}
                          onChange={(value) => {
                            this.onKeyChange('checkedIcon', {
                              type: value,
                            });
                          }}
                          className="w-100"
                          options={[
                            {
                              label: '图标',
                              value: 'icon',
                            },
                            {
                              label: '文字',
                              value: 'text',
                            },
                          ]}
                        />
                      </FullForm>
                    </Item>
                    {checkedIcon.type === 'icon' && (
                      <BootstrapIconSelect
                        value={checkedIcon.value}
                        onChange={(value) => {
                          this.onKeyChange('checkedIcon', {
                            value,
                          });
                        }}
                      />
                    )}
                    {checkedIcon.type === 'text' && (
                      <Item label="内容">
                        <FullForm>
                          <Input
                            value={checkedIcon.value}
                            onChange={(value) => {
                              this.onKeyChange('checkedIcon', {
                                value,
                              });
                            }}
                          />
                        </FullForm>
                      </Item>
                    )}
                    <Item label="颜色">
                      <FullForm>
                        <ColorSelect
                          value={checkedIcon.color}
                          onChange={(value) => {
                            this.onKeyChange('checkedIcon', {
                              color: value,
                            });
                          }}
                        />
                      </FullForm>
                    </Item>
                  </Collapse>
                </Collapse>
                <Collapse
                  child={{
                    key: 'off',
                    header: '关闭状态',
                  }}
                  parent={{
                    defaultActiveKey: ['off'],
                  }}
                >
                  <Item label="背景色">
                    <FullForm>
                      <ColorSelect
                        value={offColor}
                        onChange={this.onKeyChange.bind(this, 'offColor')}
                      />
                    </FullForm>
                  </Item>
                  <Item label="按钮颜色">
                    <FullForm>
                      <ColorSelect
                        value={offHandleColor}
                        onChange={this.onKeyChange.bind(this, 'offHandleColor')}
                      />
                    </FullForm>
                  </Item>
                  <Collapse
                    child={{
                      header: '文案',
                      key: 'uncheckedIcon',
                      visibleRender: true,
                      value: uncheckedIcon.show,
                      onChange: (value) => {
                        this.onKeyChange('uncheckedIcon', {
                          show: value,
                        });
                      },
                    }}
                  >
                    <Item label="类型">
                      <FullForm>
                        <Select
                          value={uncheckedIcon.type}
                          onChange={(value) => {
                            this.onKeyChange('uncheckedIcon', {
                              type: value,
                            });
                          }}
                          className="w-100"
                          options={[
                            {
                              label: '图标',
                              value: 'icon',
                            },
                            {
                              label: '文字',
                              value: 'text',
                            },
                          ]}
                        />
                      </FullForm>
                    </Item>
                    {uncheckedIcon.type === 'icon' && (
                      <BootstrapIconSelect
                        value={uncheckedIcon.value}
                        onChange={(value) => {
                          this.onKeyChange('uncheckedIcon', {
                            value,
                          });
                        }}
                      />
                    )}
                    {uncheckedIcon.type === 'text' && (
                      <Item label="内容">
                        <FullForm>
                          <Input
                            value={uncheckedIcon.value}
                            onChange={(value) => {
                              this.onKeyChange('uncheckedIcon', {
                                value,
                              });
                            }}
                          />
                        </FullForm>
                      </Item>
                    )}
                    <Item label="颜色">
                      <FullForm>
                        <ColorSelect
                          value={uncheckedIcon.color}
                          onChange={(value) => {
                            this.onKeyChange('uncheckedIcon', {
                              color: value,
                            });
                          }}
                        />
                      </FullForm>
                    </Item>
                  </Collapse>
                </Collapse>
                <Collapse
                  child={{
                    header: '阴影',
                    key: 'boxShadow',
                  }}
                >
                  <BoxShadowConfig
                    value={boxShadow}
                    onChange={this.onKeyChange.bind(this, 'boxShadow')}
                    collapseProps={{
                      child: {
                        header: '基础阴影',
                        key: 'boxShadow-base',
                      },
                    }}
                  />
                  <BoxShadowConfig
                    value={activeBoxShadow}
                    onChange={this.onKeyChange.bind(this, 'activeBoxShadow')}
                    collapseProps={{
                      child: {
                        header: '选中阴影',
                        key: 'boxShadow-active',
                      },
                    }}
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
                <Item label="初始状态">
                  <FullForm>
                    <Switch
                      checked={defaultChecked}
                      onChange={this.onKeyChange.bind(this, 'defaultChecked')}
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
