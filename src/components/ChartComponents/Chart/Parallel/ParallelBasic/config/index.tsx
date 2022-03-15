import { Component } from 'react';
import { Tabs } from 'antd';
import ComponentOptionConfig, {
  Tab,
} from '@/components/ChartComponents/Common/ComponentOptionConfig';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import LegendConfig from './Legend';
import ParallelConfig from './parallel';
import SeriesConfig from './Series';
import AnimationConfig from './Animation';
import ParallelAxisConfig from './parallelAxis';
import { TParallelBasicConfig } from '../type';

const { TabPane } = Tabs;

class Config extends Component<
  ComponentData.ComponentConfigProps<TParallelBasicConfig>
> {
  render() {
    const { value, onChange } = this.props;
    const {
      config: {
        options: { legend, series, animation, parallel, parallelAxis },
      },
    } = value;

    return (
      <ComponentOptionConfig>
        <TabPane key={'1'} tab={<Tab>图例</Tab>}>
          <ConfigList level={1}>
            <LegendConfig value={legend} onChange={onChange} />
          </ConfigList>
        </TabPane>
        <TabPane key={'2'} tab={<Tab>坐标系</Tab>}>
          <ConfigList level={1}>
            <ParallelConfig value={parallel} onChange={onChange} />
          </ConfigList>
        </TabPane>
        <TabPane key={'3'} tab={<Tab>坐标轴</Tab>}>
          <ConfigList level={1}>
            <ParallelAxisConfig value={parallelAxis} onChange={onChange} />
          </ConfigList>
        </TabPane>
        <TabPane key={'4'} tab={<Tab>系列</Tab>}>
          <ConfigList level={1}>
            <SeriesConfig value={series} onChange={onChange} />
          </ConfigList>
        </TabPane>
        <TabPane key={'5'} tab={<Tab>动画</Tab>}>
          <ConfigList level={1}>
            <AnimationConfig value={animation} onChange={onChange} />
          </ConfigList>
        </TabPane>
      </ComponentOptionConfig>
    );
  }
}

export default Config;
