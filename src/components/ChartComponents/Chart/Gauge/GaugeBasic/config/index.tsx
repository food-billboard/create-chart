import { Component } from 'react';
import { Tabs } from 'antd';
import ComponentOptionConfig, {
  Tab,
} from '@/components/ChartComponents/Common/ComponentOptionConfig';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import SeriesConfig from './Series';
import AnimationConfig from './Animation';
import { TGaugeBasicConfig } from '../type';

const { TabPane } = Tabs;

class Config extends Component<
  ComponentData.ComponentConfigProps<TGaugeBasicConfig>
> {
  render() {
    const { value, onChange } = this.props;
    const {
      config: {
        options: { series, animation },
      },
    } = value;

    return (
      <ComponentOptionConfig>
        <TabPane key={'1'} tab={<Tab>表盘</Tab>}>
          <ConfigList level={1}>
            <SeriesConfig value={series} onChange={onChange} />
          </ConfigList>
        </TabPane>
        <TabPane key={'2'} tab={<Tab>动画</Tab>}>
          <ConfigList level={1}>
            <AnimationConfig value={animation} onChange={onChange} />
          </ConfigList>
        </TabPane>
      </ComponentOptionConfig>
    );
  }
}

export default Config;
