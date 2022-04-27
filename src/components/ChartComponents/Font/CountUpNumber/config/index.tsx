import { Component } from 'react';
import { Tabs, Select } from 'antd';
import ComponentOptionConfig, {
  Tab,
} from '@/components/ChartComponents/Common/ComponentOptionConfig';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import { SingleCollapse as Collapse } from '@/components/ChartComponents/Common/Collapse';
import Input from '@/components/ChartComponents/Common/Input';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import { FontConfigList } from '@/components/ChartComponents/Common/FontConfig';
import InputNumber from '@/components/ChartComponents/Common/InputNumber';
import TextAlignConfig from '@/components/ChartComponents/Common/TextAlignConfig';
import ConditionConfig from './Condition';
import { TCountUpNumberConfig } from '../type';

const { TabPane } = Tabs;
const { Item } = ConfigList;

class Config extends Component<
  ComponentData.ComponentConfigProps<TCountUpNumberConfig>
> {
  onKeyChange = (key: keyof TCountUpNumberConfig, value: any) => {
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
          textStyle,
          addonAfter,
          addonBefore,
          animation,
          round,
          decimal,
          thousands,
          condition,
          align,
        },
      },
    } = value;

    return (
      <ComponentOptionConfig>
        <TabPane key={'1'} tab={<Tab>样式</Tab>}>
          <ConfigList level={1}>
            <Collapse
              child={{
                header: '文字样式',
                key: 'textStyle',
              }}
              parent={{
                defaultActiveKey: ['textStyle'],
              }}
            >
              <FontConfigList
                value={textStyle}
                onChange={this.onKeyChange.bind(null, 'textStyle')}
              />
              <TextAlignConfig
                value={align}
                onChange={this.onKeyChange.bind(null, 'align')}
              />
            </Collapse>
          </ConfigList>
        </TabPane>
        <TabPane key={'2'} tab={<Tab>数字</Tab>}>
          <ConfigList level={1}>
            <Item label="小数符号">
              <FullForm>
                <Input
                  value={decimal}
                  onChange={this.onKeyChange.bind(this, 'decimal')}
                  className="w-100"
                />
              </FullForm>
            </Item>
            <Collapse
              child={{
                header: '四舍五入',
                key: 'round',
                visibleRender: true,
                value: round.show,
                onChange: (value) => {
                  this.onKeyChange('round', {
                    show: value,
                  });
                },
              }}
            >
              <Item label="保留小数">
                <FullForm>
                  <InputNumber
                    min={0}
                    className="w-100"
                    value={round.length}
                    onChange={(value) => {
                      this.onKeyChange('round', {
                        length: value,
                      });
                    }}
                  />
                </FullForm>
              </Item>
            </Collapse>
            <Collapse
              child={{
                header: '前缀',
                key: 'prefix',
                visibleRender: true,
                value: addonBefore.show,
                onChange: (value) => {
                  this.onKeyChange('addonBefore', {
                    show: value,
                  });
                },
              }}
            >
              <Item label="内容">
                <FullForm>
                  <Input
                    className="w-100"
                    value={addonBefore.content}
                    onChange={(value) => {
                      this.onKeyChange('addonBefore', {
                        content: value,
                      });
                    }}
                  />
                </FullForm>
              </Item>
            </Collapse>
            <Collapse
              child={{
                header: '后缀',
                key: 'suffix',
                visibleRender: true,
                value: addonAfter.show,
                onChange: (value) => {
                  this.onKeyChange('addonAfter', {
                    show: value,
                  });
                },
              }}
            >
              <Item label="内容">
                <FullForm>
                  <Input
                    className="w-100"
                    value={addonAfter.content}
                    onChange={(value) => {
                      this.onKeyChange('addonAfter', {
                        content: value,
                      });
                    }}
                  />
                </FullForm>
              </Item>
            </Collapse>
            <Collapse
              child={{
                header: '千分位',
                key: 'thousands',
                visibleRender: true,
                value: thousands.show,
                onChange: (value) => {
                  this.onKeyChange('thousands', {
                    show: value,
                  });
                },
              }}
            >
              <Item label="内容">
                <FullForm>
                  <Input
                    className="w-100"
                    value={thousands.content}
                    onChange={(value) => {
                      this.onKeyChange('thousands', {
                        content: value,
                      });
                    }}
                  />
                </FullForm>
              </Item>
            </Collapse>
          </ConfigList>
        </TabPane>
        <TabPane key={'3'} tab={<Tab>动画</Tab>}>
          <ConfigList level={1}>
            <Item label="动画时间(秒)">
              <FullForm>
                <InputNumber
                  className="w-100"
                  min={0}
                  value={animation.duration}
                  onChange={(value) => {
                    this.onKeyChange('animation', {
                      duration: value,
                    });
                  }}
                />
              </FullForm>
            </Item>
            <Item label="动画类型">
              <Select
                className="w-100"
                value={animation.easingFn}
                onChange={(value) => {
                  this.onKeyChange('animation', {
                    easingFn: value,
                  });
                }}
              >
                {['easeOutExpo', 'outQuintic', 'outCubic'].map((item) => {
                  return (
                    <Select.Option key={item} value={item}>
                      {item}
                    </Select.Option>
                  );
                })}
              </Select>
            </Item>
          </ConfigList>
        </TabPane>
        <TabPane key="4" tab={<Tab>条件</Tab>}>
          <ConfigList level={1}>
            <ConditionConfig
              value={condition}
              onChange={this.onKeyChange.bind(null, 'condition')}
            />
          </ConfigList>
        </TabPane>
      </ComponentOptionConfig>
    );
  }
}

export default Config;
