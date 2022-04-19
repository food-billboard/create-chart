import { Component } from 'react';
import { Tabs } from 'antd';
import ComponentOptionConfig, {
  Tab,
} from '@/components/ChartComponents/Common/ComponentOptionConfig';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import TooltipConfig from './Tooltip';
import SeriesConfig from './Series';
import AnimationConfig from './Animation';
import ConditionConfig from './Condition';
import { TTreeBasicConfig } from '../type';

const { TabPane } = Tabs;

class Config extends Component<
  ComponentData.ComponentConfigProps<TTreeBasicConfig>
> {
  render() {
    const { value, onChange } = this.props;
    const {
      config: {
        options: { series, tooltip, animation, condition },
      },
    } = value;

    return (
      <ComponentOptionConfig>
        <TabPane key={'1'} tab={<Tab>提示文字</Tab>}>
          <ConfigList level={1}>
            <TooltipConfig value={tooltip} onChange={onChange} />
          </ConfigList>
        </TabPane>
        <TabPane key={'2'} tab={<Tab>系列</Tab>}>
          <ConfigList level={1}>
            <SeriesConfig value={series} onChange={onChange} />
          </ConfigList>
        </TabPane>
        <TabPane key={'3'} tab={<Tab>动画</Tab>}>
          <ConfigList level={1}>
            <AnimationConfig value={animation} onChange={onChange} />
          </ConfigList>
        </TabPane>
        <TabPane key="4" tab={<Tab>条件</Tab>}>
          <ConfigList level={1}>
            <ConditionConfig value={condition} onChange={onChange} />
          </ConfigList>
        </TabPane>
      </ComponentOptionConfig>
    );
  }
}

export default Config;
