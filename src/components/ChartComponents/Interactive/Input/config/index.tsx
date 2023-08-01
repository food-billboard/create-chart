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
import { TInputConfig } from '../type';

const { Item } = ConfigList;
class Config extends Component<
  ComponentData.ComponentConfigProps<TInputConfig>
> {
  onKeyChange = (key: keyof TInputConfig, value: any) => {
    this.props.onChange(
      updateInteractiveAndSyncParams4Component<TInputConfig>({
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
          border,
          borderRadius,
          backgroundColor,
          textStyle,
          placeholder,
          search,
          defaultValue,
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
                <LineStyleGroupConfig
                  collapseProps={{
                    child: {
                      header: '边框',
                      key: 'border',
                    },
                  }}
                  value={border}
                  onChange={this.onKeyChange.bind(this, 'border')}
                />
                <Item label="背景色">
                  <FullForm>
                    <ColorSelect
                      value={backgroundColor}
                      onChange={this.onKeyChange.bind(this, 'backgroundColor')}
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
                <Collapse
                  child={{
                    key: 'textStyle',
                    header: '文字样式',
                  }}
                >
                  <FontConfigList
                    value={textStyle}
                    onChange={this.onKeyChange.bind(this, 'textStyle')}
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
                <Item label="默认值">
                  <FullForm>
                    <Input
                      value={defaultValue}
                      onChange={this.onKeyChange.bind(this, 'defaultValue')}
                    />
                  </FullForm>
                </Item>
                <Collapse
                  child={{
                    header: '占位符',
                    key: 'placeholder',
                  }}
                >
                  <Item label="内容">
                    <FullForm>
                      <Input
                        value={placeholder.value}
                        onChange={(value) =>
                          this.onKeyChange('placeholder', {
                            value,
                          })
                        }
                      />
                    </FullForm>
                  </Item>
                  <Item label="颜色">
                    <FullForm>
                      <ColorSelect
                        value={placeholder.color}
                        onChange={(value) =>
                          this.onKeyChange('placeholder', {
                            color: value,
                          })
                        }
                      />
                    </FullForm>
                  </Item>
                </Collapse>
                <Collapse
                  child={{
                    header: '搜索按钮',
                    key: 'search',
                    visibleRender: true,
                    value: search.show,
                    onChange: (value) =>
                      this.onKeyChange('search', {
                        show: value,
                      }),
                  }}
                >
                  <Item label="宽度(%)">
                    <FullForm>
                      <InputNumber
                        value={search.width}
                        onChange={(value) =>
                          this.onKeyChange('search', {
                            width: value,
                          })
                        }
                      />
                    </FullForm>
                  </Item>
                  <Item label="内容">
                    <FullForm>
                      <Input
                        value={search.value}
                        onChange={(value) =>
                          this.onKeyChange('search', {
                            value,
                          })
                        }
                      />
                    </FullForm>
                  </Item>
                  <Item label="背景颜色">
                    <FullForm>
                      <ColorSelect
                        value={search.backgroundColor}
                        onChange={(value) =>
                          this.onKeyChange('search', {
                            backgroundColor: value,
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
                      value={search.textStyle}
                      onChange={(value) =>
                        this.onKeyChange('search', {
                          textStyle: value,
                        })
                      }
                    />
                  </Collapse>
                </Collapse>
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
