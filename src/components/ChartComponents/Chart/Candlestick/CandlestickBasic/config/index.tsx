import { Component } from 'react';
import { Tabs } from 'antd';
import ComponentOptionConfig, {
  Tab,
} from '@/components/ChartComponents/Common/ComponentOptionConfig';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import TooltipConfig from './Tooltip';
import AxisConfig from './Axis';
import SeriesConfig from './Series';
import AnimationConfig from './Animation';
import ConditionConfig from './Condition';
import GridConfig from './GridConfig';
import { TCandlestickBasicConfig } from '../type';

const { TabPane } = Tabs;

class Config extends Component<
  ComponentData.ComponentConfigProps<TCandlestickBasicConfig>
> {
  render() {
    const { value, onChange } = this.props;
    const {
      config: {
        options: { series, xAxis, yAxis, tooltip, animation, condition, grid },
      },
    } = value;

    return (
      <ComponentOptionConfig>
        <TabPane key={'1'} tab={<Tab>网格</Tab>}>
          <ConfigList level={1}>
            <GridConfig value={grid} onChange={onChange} />
          </ConfigList>
        </TabPane>
        <TabPane key={'2'} tab={<Tab>坐标轴</Tab>}>
          <ConfigList level={1}>
            <AxisConfig
              value={{
                xAxis,
                yAxis,
              }}
              onChange={onChange}
            />
          </ConfigList>
        </TabPane>
        <TabPane key={'3'} tab={<Tab>提示文字</Tab>}>
          <ConfigList level={1}>
            <TooltipConfig value={tooltip} onChange={onChange} />
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
        <TabPane key="6" tab={<Tab>条件</Tab>}>
          <ConfigList level={1}>
            <ConditionConfig value={condition} onChange={onChange} />
          </ConfigList>
        </TabPane>
      </ComponentOptionConfig>
    );
  }
}

export default Config;
