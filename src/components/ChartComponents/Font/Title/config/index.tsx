import { Component } from 'react';
import { Tabs, Select } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import ComponentOptionConfig, {
  Tab,
} from '@/components/ChartComponents/Common/ComponentOptionConfig';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import { SingleCollapse as Collapse } from '@/components/ChartComponents/Common/Collapse';
import SingleDefineSelect from '@/components/ChartComponents/Common/SingleDefineSelect';
import IconTooltip from '@/components/IconTooltip';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import { FontConfigList } from '@/components/ChartComponents/Common/FontConfig';
import OrientSelect from '@/components/ChartComponents/Common/OrientSelect';
import HalfForm from '@/components/ChartComponents/Common/Structure/HalfForm';
import ConditionConfig from './Condition';
import { TTitleConfig } from '../type';

const { TabPane } = Tabs;
const { Item } = ConfigList;

class Config extends Component<
  ComponentData.ComponentConfigProps<TTitleConfig>
> {
  alignOptions = [
    {
      value: 'flex-start',
      label: 'start',
    },
    {
      value: 'center',
      label: 'center',
    },
    {
      value: 'flex-end',
      label: 'end',
    },
  ].map((item) => {
    const { value, label } = item;
    return (
      <Select.Option key={value} value={value}>
        {label}
      </Select.Option>
    );
  });

  onKeyChange = (key: keyof TTitleConfig, value: any) => {
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
        options: { textStyle, align, orient, animation, condition },
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
            >
              <FontConfigList
                value={textStyle}
                onChange={this.onKeyChange.bind(null, 'textStyle')}
              />
            </Collapse>
            <Item label="对齐方式">
              <HalfForm label="水平">
                <Select
                  value={align.horizontal}
                  onChange={(value) => {
                    this.onKeyChange('align', {
                      horizontal: value,
                    });
                  }}
                  className="w-100"
                >
                  {this.alignOptions}
                </Select>
              </HalfForm>
              <HalfForm label="垂直">
                <Select
                  value={align.vertical}
                  onChange={(value) => {
                    this.onKeyChange('align', {
                      vertical: value,
                    });
                  }}
                  className="w-100"
                >
                  {this.alignOptions}
                </Select>
              </HalfForm>
            </Item>
            <Item label="文字方向">
              <OrientSelect
                value={orient === 'lr' ? 'horizontal' : 'vertical'}
                onChange={(value) => {
                  this.onKeyChange(
                    'orient',
                    value === 'vertical' ? 'vertical-lr' : 'lr',
                  );
                }}
              />
            </Item>
          </ConfigList>
        </TabPane>
        <TabPane key={'2'} tab={<Tab>动画</Tab>}>
          <ConfigList level={1}>
            <Collapse
              child={{
                header: '动画',
                key: 'animation',
                visibleRender: true,
                value: animation.show,
                onChange: (value) => {
                  this.onKeyChange('animation', {
                    show: value,
                  });
                },
              }}
              parent={{
                activeKey: ['animation'],
              }}
            >
              <Item
                label="动画"
                placeholder={
                  <IconTooltip
                    title={
                      <>
                        动画名称可以参考
                        <a target="_blank" href="https://animate.style/">
                          这里
                        </a>
                      </>
                    }
                  >
                    <InfoCircleOutlined />
                  </IconTooltip>
                }
              >
                <FullForm>
                  <SingleDefineSelect
                    value={animation.value}
                    onChange={(value) => {
                      this.onKeyChange('animation', {
                        value: value || '',
                      });
                    }}
                    options={[
                      'animate__bounce',
                      'animate__flash',
                      'animate__rubberBand',
                      'animate__heartBeat',
                      'animate__wobble',
                      'animate__pulse',
                      'animate__backInDown',
                      'animate__backInRight',
                      'animate__bounceIn',
                      'animate__fadeInDown',
                    ].map((item) => ({ label: item, value: item }))}
                  />
                </FullForm>
              </Item>
              <Item label="速度">
                <Select
                  className="w-100"
                  value={animation.speed}
                  onChange={(value) => {
                    this.onKeyChange('animation', {
                      speed: value,
                    });
                  }}
                >
                  {[
                    {
                      label: '正常',
                      value: '',
                    },
                    {
                      label: '慢',
                      value: 'animate__slow',
                    },
                    {
                      label: '很慢',
                      value: 'animate__slower',
                    },
                    {
                      label: '快',
                      value: 'animate__fast',
                    },
                    {
                      label: '很快',
                      value: 'animate__faster',
                    },
                  ].map((item) => {
                    const { label, value } = item;
                    return (
                      <Select.Option key={value} value={value}>
                        {label}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Item>
              <Item label="延迟">
                <Select
                  className="w-100"
                  value={animation.delay}
                  onChange={(value) => {
                    this.onKeyChange('animation', {
                      delay: value,
                    });
                  }}
                >
                  {[
                    {
                      label: '不延迟',
                      value: '',
                    },
                    {
                      label: '延迟2秒',
                      value: 'animate__delay-2s',
                    },
                    {
                      label: '延迟3秒',
                      value: 'animate__delay-3s',
                    },
                    {
                      label: '延迟4秒',
                      value: 'animate__delay-4s',
                    },
                    {
                      label: '延迟5秒',
                      value: 'animate__delay-5s',
                    },
                  ].map((item) => {
                    const { label, value } = item;
                    return (
                      <Select.Option key={value} value={value}>
                        {label}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Item>
              <Item label="重复">
                <Select
                  className="w-100"
                  value={animation.repeat}
                  onChange={(value) => {
                    this.onKeyChange('animation', {
                      repeat: value,
                    });
                  }}
                >
                  {[
                    {
                      label: '重复一次',
                      value: 'animate__repeat-1',
                    },
                    {
                      label: '重复两次',
                      value: 'animate__repeat-2',
                    },
                    {
                      label: '重复三次',
                      value: 'animate__repeat-3',
                    },
                    {
                      label: '无限重复',
                      value: 'animate__infinite',
                    },
                  ].map((item) => {
                    const { label, value } = item;
                    return (
                      <Select.Option key={value} value={value}>
                        {label}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Item>
            </Collapse>
          </ConfigList>
        </TabPane>
        <TabPane key="3" tab={<Tab>条件</Tab>}>
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
