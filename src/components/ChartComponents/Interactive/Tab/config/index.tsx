import { Component } from 'react';
import { Tabs, Select } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import ComponentOptionConfig, {
  Tab,
} from '@/components/ChartComponents/Common/ComponentOptionConfig';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import { SingleCollapse as Collapse } from '@/components/ChartComponents/Common/Collapse';
import { CompatColorSelect } from '@/components/ColorSelect';
import IconTooltip from '@/components/IconTooltip';
import Input from '@/components/ChartComponents/Common/Input';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import { FontConfigList } from '@/components/ChartComponents/Common/FontConfig';
import OrientSelect from '@/components/ChartComponents/Common/OrientSelect';
import LineStyleGroupConfig from '@/components/ChartComponents/Common/LineStyleGroupConfig';
import HalfForm from '@/components/ChartComponents/Common/Structure/HalfForm';
import InputNumber from '@/components/ChartComponents/Common/InputNumber';
import { TTabConfig } from '../type';

const { TabPane } = Tabs;
const { Item } = ConfigList;

class Config extends Component<ComponentData.ComponentConfigProps<TTabConfig>> {
  onKeyChange = (key: keyof TTabConfig, value: any) => {
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
        options: { base, active, loop },
      },
    } = value;

    return (
      <ComponentOptionConfig>
        <TabPane key={'1'} tab={<Tab>基础样式</Tab>}>
          <ConfigList level={1}>
            <Collapse
              child={{
                header: '文字样式',
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
            </Collapse>
            <LineStyleGroupConfig
              value={base.border}
              onChange={(value) => {
                this.onKeyChange('base', {
                  border: value,
                });
              }}
            />
            <Item label="背景颜色">
              <FullForm>
                <CompatColorSelect
                  value={base.backgroundColor}
                  onChange={(value) => {
                    this.onKeyChange('base', {
                      backgroundColor: value,
                    });
                  }}
                />
              </FullForm>
            </Item>
          </ConfigList>
        </TabPane>
        <TabPane key={'2'} tab={<Tab>选中样式</Tab>}>
          <ConfigList level={1}>
            <Collapse
              child={{
                header: '文字样式',
                key: 'textStyle',
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
            <LineStyleGroupConfig
              value={active.border}
              onChange={(value) => {
                this.onKeyChange('active', {
                  border: value,
                });
              }}
            />
            <Item label="背景颜色">
              <FullForm>
                <CompatColorSelect
                  value={active.backgroundColor}
                  onChange={(value) => {
                    this.onKeyChange('active', {
                      backgroundColor: value,
                    });
                  }}
                />
              </FullForm>
            </Item>
          </ConfigList>
        </TabPane>
        <TabPane key={'3'} tab={<Tab>轮播</Tab>}>
          <ConfigList level={1}>
            <Collapse
              child={{
                header: '是否轮播',
                key: 'loop',
                visibleRender: true,
                value: loop.show,
                onChange: (value) => {
                  this.onKeyChange('loop', {
                    show: value,
                  });
                },
              }}
              parent={{
                activeKey: ['loop'],
              }}
            >
              <Item label="时间间隔">
                <FullForm>
                  <InputNumber
                    className="w-100"
                    value={loop.speed}
                    onChange={(value) => {
                      this.onKeyChange('loop', {
                        speed: value,
                      });
                    }}
                  />
                </FullForm>
              </Item>
            </Collapse>
          </ConfigList>
        </TabPane>
      </ComponentOptionConfig>
    );
  }
}

export default Config;
