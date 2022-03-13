import { Component } from 'react';
import { Tabs } from 'antd';
import ComponentOptionConfig, {
  Tab,
} from '@/components/ChartComponents/Common/ComponentOptionConfig';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import { SingleCollapse as Collapse } from '@/components/ChartComponents/Common/Collapse';
import { CompatColorSelect } from '@/components/ColorSelect';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import { FontConfigList } from '@/components/ChartComponents/Common/FontConfig';
import LineStyleGroupConfig from '@/components/ChartComponents/Common/LineStyleGroupConfig';
import { TSelectConfig } from '../type';

const { TabPane } = Tabs;
const { Item } = ConfigList;

class Config extends Component<
  ComponentData.ComponentConfigProps<TSelectConfig>
> {
  onKeyChange = (key: keyof TSelectConfig, value: any) => {
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
        options: { base, active },
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
      </ComponentOptionConfig>
    );
  }
}

export default Config;
