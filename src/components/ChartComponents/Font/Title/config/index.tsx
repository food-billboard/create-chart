import { Component } from 'react';
import { Tabs } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import ComponentOptionConfig, {
  Tab,
} from '@/components/ChartComponents/Common/ComponentOptionConfig';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import { SingleCollapse as Collapse } from '@/components/ChartComponents/Common/Collapse';
import IconTooltip from '@/components/IconTooltip';
import Input from '@/components/ChartComponents/Common/Input';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import { TTitleConfig } from '../type';

const { TabPane } = Tabs;
const { Item } = ConfigList;

class Config extends Component<
  ComponentData.ComponentConfigProps<TTitleConfig>
> {
  render() {
    const { value, onChange } = this.props;
    const {
      config: {
        options: { textStyle, align, orient },
      },
    } = value;

    return (
      <ComponentOptionConfig>
        <TabPane key={'1'} tab={<Tab>样式</Tab>}>
          <ConfigList level={1}></ConfigList>
        </TabPane>
        <TabPane key={'2'} tab={<Tab>动画</Tab>}>
          <ConfigList level={1}>
            <Collapse
              child={{
                header: '动画',
                key: 'animation',
              }}
            >
              <Item
                label="动画名称"
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
                  <Input />
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
