import { Component } from 'react';
import { SingleCollapse as Collapse } from '@/components/ChartComponents/Common/Collapse';
import ComponentOptionConfig, {
  Tab,
} from '@/components/ChartComponents/Common/ComponentOptionConfig';
import { FontConfigList } from '@/components/ChartComponents/Common/FontConfig';
import Input from '@/components/ChartComponents/Common/Input';
import InputNumber from '@/components/ChartComponents/Common/InputNumber';
import LineStyleGroupConfig from '@/components/ChartComponents/Common/LineStyleGroupConfig';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import { updateInteractiveAndSyncParams4Component } from '@/components/ChartComponents/Common/utils';
import ColorSelect from '@/components/ColorSelect';
import { TSelectConfig } from '../type';

const { Item } = ConfigList;
class Config extends Component<
  ComponentData.ComponentConfigProps<TSelectConfig>
> {
  onKeyChange = (key: keyof TSelectConfig, value: any) => {
    this.props.onChange(
      updateInteractiveAndSyncParams4Component<TSelectConfig>({
        key,
        defaultValueKey: 'defaultValue',
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
          base,
          active,
          activeSelect,
          baseHover,
          activeHover,
          placeholder,
          menu,
          indicator,
          defaultValue,
        },
      },
    } = value;

    return (
      <ComponentOptionConfig
        items={[
          {
            label: <Tab>选择框</Tab>,
            children: (
              <ConfigList level={1}>
                <Collapse
                  child={{
                    key: 'active',
                    header: '内容',
                  }}
                >
                  <Collapse
                    child={{
                      key: 'active',
                      header: '文本',
                    }}
                  >
                    <FontConfigList
                      value={active.textStyle}
                      onChange={(value) => {
                        this.onKeyChange('active', {
                          textStyle: value,
                        });
                      }}
                    />
                  </Collapse>
                  <Item label="背景颜色">
                    <FullForm>
                      <ColorSelect
                        value={active.backgroundColor}
                        onChange={(value) => {
                          this.onKeyChange('active', {
                            backgroundColor: value,
                          });
                        }}
                      />
                    </FullForm>
                  </Item>
                  <LineStyleGroupConfig
                    value={active.border}
                    onChange={(value) => {
                      this.onKeyChange('active', {
                        border: value,
                      });
                    }}
                  />
                </Collapse>
                <Collapse
                  child={{
                    key: 'placeholder',
                    header: '占位符',
                  }}
                >
                  <Collapse
                    child={{
                      header: '文本',
                      key: 'textStyle',
                    }}
                    parent={{
                      defaultActiveKey: ['textStyle'],
                    }}
                  >
                    <FontConfigList
                      value={placeholder.textStyle}
                      onChange={(value) => {
                        this.onKeyChange('placeholder', {
                          textStyle: value,
                        });
                      }}
                    />
                  </Collapse>
                </Collapse>
                <Collapse
                  child={{
                    header: '选择箭头',
                    key: 'indicator',
                  }}
                >
                  <Item label="大小">
                    <FullForm>
                      <InputNumber
                        value={indicator.fontSize}
                        onChange={(value) => {
                          this.onKeyChange('indicator', {
                            fontSize: value,
                          });
                        }}
                        className="w-100"
                      />
                    </FullForm>
                  </Item>
                  <Item label="颜色">
                    <FullForm>
                      <ColorSelect
                        value={indicator.color}
                        onChange={(value) => {
                          this.onKeyChange('indicator', {
                            color: value,
                          });
                        }}
                      />
                    </FullForm>
                  </Item>
                </Collapse>
              </ConfigList>
            ),
            key: '1',
          },
          {
            label: <Tab>基础项样式</Tab>,
            children: (
              <ConfigList level={1}>
                <Collapse
                  child={{
                    header: '选中样式',
                    key: 'activeSelect',
                  }}
                >
                  <Collapse
                    child={{
                      header: '文本',
                      key: 'textStyle',
                    }}
                  >
                    <FontConfigList
                      value={activeSelect.textStyle}
                      onChange={(value) => {
                        this.onKeyChange('activeSelect', {
                          textStyle: value,
                        });
                      }}
                    />
                  </Collapse>
                  <Item label="背景颜色">
                    <FullForm>
                      <ColorSelect
                        value={activeSelect.backgroundColor}
                        onChange={(value) => {
                          this.onKeyChange('activeSelect', {
                            backgroundColor: value,
                          });
                        }}
                      />
                    </FullForm>
                  </Item>
                </Collapse>
                <Collapse
                  child={{
                    header: '基础样式',
                    key: 'base',
                  }}
                >
                  <Collapse
                    child={{
                      header: '文本',
                      key: 'textStyle',
                    }}
                  >
                    <FontConfigList
                      value={base.textStyle}
                      onChange={(value) => {
                        this.onKeyChange('base', {
                          textStyle: value,
                        });
                      }}
                    />
                    <Item label="背景颜色">
                      <FullForm>
                        <ColorSelect
                          value={base.backgroundColor}
                          onChange={(value) => {
                            this.onKeyChange('base', {
                              backgroundColor: value,
                            });
                          }}
                        />
                      </FullForm>
                    </Item>
                  </Collapse>
                </Collapse>
              </ConfigList>
            ),
            key: '2',
          },
          {
            label: <Tab>移入项样式</Tab>,
            children: (
              <ConfigList level={1}>
                <Collapse
                  child={{
                    header: '基础移入样式',
                    key: 'baseHover',
                  }}
                >
                  <Collapse
                    child={{
                      header: '文本',
                      key: 'textStyle',
                    }}
                  >
                    <FontConfigList
                      value={baseHover.textStyle}
                      onChange={(value) => {
                        this.onKeyChange('baseHover', {
                          textStyle: value,
                        });
                      }}
                    />
                  </Collapse>
                  <Item label="背景颜色">
                    <FullForm>
                      <ColorSelect
                        value={baseHover.backgroundColor}
                        onChange={(value) => {
                          this.onKeyChange('baseHover', {
                            backgroundColor: value,
                          });
                        }}
                      />
                    </FullForm>
                  </Item>
                </Collapse>
                <Collapse
                  child={{
                    header: '选中移入样式',
                    key: 'activeHover',
                  }}
                >
                  <Collapse
                    child={{
                      header: '文本',
                      key: 'textStyle',
                    }}
                  >
                    <FontConfigList
                      value={activeHover.textStyle}
                      onChange={(value) => {
                        this.onKeyChange('activeHover', {
                          textStyle: value,
                        });
                      }}
                    />
                  </Collapse>
                  <Item label="背景颜色">
                    <FullForm>
                      <ColorSelect
                        value={activeHover.backgroundColor}
                        onChange={(value) => {
                          this.onKeyChange('activeHover', {
                            backgroundColor: value,
                          });
                        }}
                      />
                    </FullForm>
                  </Item>
                </Collapse>
              </ConfigList>
            ),
            key: '3',
          },
          {
            label: <Tab>下拉列表</Tab>,
            children: (
              <ConfigList level={1}>
                <Item label="高度">
                  <FullForm>
                    <InputNumber
                      value={menu.height}
                      onChange={(value) => {
                        this.onKeyChange('menu', {
                          height: value,
                        });
                      }}
                      className="w-100"
                    />
                  </FullForm>
                </Item>
                <Item label="背景颜色">
                  <FullForm>
                    <ColorSelect
                      value={menu.backgroundColor}
                      onChange={(value) => {
                        this.onKeyChange('menu', {
                          backgroundColor: value,
                        });
                      }}
                    />
                  </FullForm>
                </Item>
              </ConfigList>
            ),
            key: '4',
          },
          {
            label: <Tab>交互</Tab>,
            children: (
              <ConfigList level={1}>
                <Item label="默认值">
                  <FullForm>
                    <Input
                      value={defaultValue}
                      onChange={this.onKeyChange.bind(this, 'defaultValue')}
                    />
                  </FullForm>
                </Item>
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
