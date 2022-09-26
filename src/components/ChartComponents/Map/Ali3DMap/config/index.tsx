import { Component } from 'react';
import ComponentOptionConfig, {
  Tab,
} from '@/components/ChartComponents/Common/ComponentOptionConfig';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import TooltipConfig from './Tooltip';
import ScatterConfig from './Scatter';
import Base from './Base';
import ConditionConfig from './Condition';
import { TAli3DMapConfig } from '../type';
class Config extends Component<
  ComponentData.ComponentConfigProps<TAli3DMapConfig>
> {
  render() {
    const { value, onChange } = this.props;
    const {
      config: {
        options: { tooltip, condition, scatter, style, zoom },
      },
    } = value;

    return (
      <ComponentOptionConfig
        items={[
          {
            label: <Tab>基础</Tab>,
            children: (
              <ConfigList level={1}>
                <Base
                  value={{
                    style,
                    zoom,
                  }}
                  onChange={onChange}
                />
              </ConfigList>
            ),
            key: '1',
          },
          {
            label: <Tab>标记</Tab>,
            children: (
              <ConfigList level={1}>
                <ScatterConfig value={scatter} onChange={onChange} />
              </ConfigList>
            ),
            key: '2',
          },
          {
            label: <Tab>提示文字</Tab>,
            children: (
              <ConfigList level={1}>
                <TooltipConfig value={tooltip} onChange={onChange} />
              </ConfigList>
            ),
            key: '3',
          },
          {
            label: <Tab>条件</Tab>,
            children: (
              <ConfigList level={1}>
                <ConditionConfig value={condition} onChange={onChange} />
              </ConfigList>
            ),
            key: '4',
          },
        ]}
      />
    );
  }
}

export default Config;
