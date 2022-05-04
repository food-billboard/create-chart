import { Component } from 'react';
import { Tabs } from 'antd';
import ComponentOptionConfig, {
  Tab,
} from '@/components/ChartComponents/Common/ComponentOptionConfig';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import { SingleCollapse as Collapse } from '@/components/ChartComponents/Common/Collapse';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import { CompatColorSelect } from '@/components/ColorSelect';
import Input from '@/components/ChartComponents/Common/Input';
import { FontConfigList } from '@/components/ChartComponents/Common/FontConfig';
import LineStyleGroupConfig from '@/components/ChartComponents/Common/LineStyleGroupConfig';
import InputNumber from '@/components/ChartComponents/Common/InputNumber';
import { TInputConfig } from '../type';

const { TabPane } = Tabs;
const { Item } = ConfigList;

class Config extends Component<
  ComponentData.ComponentConfigProps<TInputConfig>
> {
  onKeyChange = (key: keyof TInputConfig, value: any) => {
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
          border,
          borderRadius,
          backgroundColor,
          textStyle,
          placeholder,
          search,
        },
      },
    } = value;

    return (
      <ComponentOptionConfig>
        <TabPane key={'1'} tab={<Tab>基础样式</Tab>}>
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
                <CompatColorSelect
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
        </TabPane>
        <TabPane key={'2'} tab={<Tab>交互</Tab>}>
          <ConfigList level={1}>
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
                  <CompatColorSelect
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
              <Item label="宽度">
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
                  <CompatColorSelect
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
        </TabPane>
      </ComponentOptionConfig>
    );
  }
}

export default Config;
