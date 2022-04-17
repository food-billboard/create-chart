import { Component } from 'react';
import { Tabs } from 'antd';
import ComponentOptionConfig, {
  Tab,
} from '@/components/ChartComponents/Common/ComponentOptionConfig';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import TooltipConfig from './Tooltip';
import GeoConfig from './Geo';
import ScatterConfig from './Scatter';
import ConditionConfig from './Condition';
import { TScatterMapConfig } from '../type';

const { TabPane } = Tabs;

class Config extends Component<
  ComponentData.ComponentConfigProps<TScatterMapConfig>
> {
  render() {
    const { value, onChange } = this.props;
    const {
      config: {
        options: { tooltip, condition, geo, scatter },
      },
    } = value;

    return (
      <ComponentOptionConfig>
        <TabPane key={'1'} tab={<Tab>地图</Tab>}>
          <ConfigList level={1}>
            <GeoConfig value={geo} onChange={onChange} />
          </ConfigList>
        </TabPane>
        <TabPane key={'2'} tab={<Tab>标记</Tab>}>
          <ConfigList level={1}>
            <ScatterConfig value={scatter} onChange={onChange} />
          </ConfigList>
        </TabPane>
        <TabPane key={'3'} tab={<Tab>提示文字</Tab>}>
          <ConfigList level={1}>
            <TooltipConfig value={tooltip} onChange={onChange} />
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
