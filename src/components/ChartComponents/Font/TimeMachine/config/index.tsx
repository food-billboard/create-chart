import { Component } from 'react';
import { Tabs } from 'antd';
import {
  InfoCircleOutlined,
  BorderLeftOutlined,
  BorderRightOutlined,
} from '@ant-design/icons';
import ComponentOptionConfig, {
  Tab,
} from '@/components/ChartComponents/Common/ComponentOptionConfig';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import { SingleCollapse as Collapse } from '@/components/ChartComponents/Common/Collapse';
import IconTooltip from '@/components/IconTooltip';
import SingleDefineSelect from '@/components/ChartComponents/Common/SingleDefineSelect';
import Input from '@/components/ChartComponents/Common/Input';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import { FontConfigList } from '@/components/ChartComponents/Common/FontConfig';
import HalfForm from '@/components/ChartComponents/Common/Structure/HalfForm';
import RadioGroup, {
  Radio,
} from '@/components/ChartComponents/Common/IconRadio';
import InputNumber from '@/components/ChartComponents/Common/InputNumber';
import { CompatColorSelect } from '@/components/ColorSelect';
import { TTimeMachineConfig } from '../type';

const { TabPane } = Tabs;
const { Item } = ConfigList;

class Config extends Component<
  ComponentData.ComponentConfigProps<TTimeMachineConfig>
> {
  onKeyChange = (key: keyof TTimeMachineConfig, value: any) => {
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
        options: { textStyle, icon, formatter },
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
            <Collapse
              child={{
                header: '图标',
                key: 'icon',
                visibleRender: true,
                value: icon.show,
                onChange: (value) => {
                  this.onKeyChange('icon', {
                    show: value,
                  });
                },
              }}
            >
              <Item
                label="图标名称"
                placeholder={
                  <IconTooltip
                    title={
                      <>
                        可以参考
                        <a target="_blank" href="https://icons.bootcss.com/">
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
                    value={icon.value}
                    onChange={(value) => {
                      this.onKeyChange('icon', {
                        value,
                      });
                    }}
                    options={[
                      'bi-alarm',
                      'bi-arrow-through-heart',
                      'bi-award',
                      'bi-balloon',
                      'bi-balloon-heart',
                      'bi-bell',
                      'bi-boombox',
                    ].map((item) => ({ label: item, value: item }))}
                  />
                </FullForm>
              </Item>
              <Item label="定位">
                <HalfForm label="位置">
                  <RadioGroup
                    value={icon.position}
                    onChange={(value) => {
                      this.onKeyChange('icon', {
                        position: value,
                      });
                    }}
                  >
                    <Radio icon={<BorderLeftOutlined />} value="before"></Radio>
                    <Radio icon={<BorderRightOutlined />} value="after"></Radio>
                  </RadioGroup>
                </HalfForm>
                <HalfForm label="边距">
                  <InputNumber
                    className="w-100"
                    value={icon.margin}
                    onChange={(value) => {
                      this.onKeyChange('icon', {
                        margin: value,
                      });
                    }}
                  />
                </HalfForm>
              </Item>
              <Item label="颜色">
                <FullForm>
                  <CompatColorSelect
                    value={icon.color}
                    onChange={(value) => {
                      this.onKeyChange('icon', {
                        color: value,
                      });
                    }}
                  />
                </FullForm>
              </Item>
              <Item label="大小">
                <FullForm>
                  <InputNumber
                    className="w-100"
                    value={icon.size}
                    onChange={(value) => {
                      this.onKeyChange('icon', {
                        size: value,
                      });
                    }}
                  />
                </FullForm>
              </Item>
            </Collapse>
            <Item
              label="格式化"
              placeholder={
                <IconTooltip
                  title={
                    <>
                      可以参考
                      <a target="_blank" href="http://momentjs.cn/">
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
                <Input
                  className="w-100"
                  value={formatter}
                  onChange={this.onKeyChange.bind(this, 'formatter')}
                />
              </FullForm>
            </Item>
          </ConfigList>
        </TabPane>
      </ComponentOptionConfig>
    );
  }
}

export default Config;
