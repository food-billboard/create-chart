import { Component } from 'react';
import ComponentOptionConfig, {
  Tab,
} from '@/components/ChartComponents/Common/ComponentOptionConfig';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import { TGaugeBasicConfig } from '../type';
import AnimationConfig from './Animation';
import ConditionConfig from './Condition';
import SeriesConfig from './Series';

class Config extends Component<
  ComponentData.ComponentConfigProps<TGaugeBasicConfig>
> {
  render() {
    const { value, onChange } = this.props;
    const {
      config: {
        options: { series, animation, condition },
      },
    } = value;

    return (
      <ComponentOptionConfig
        items={[
          {
            label: <Tab>表盘</Tab>,
            children: (
              <ConfigList level={1}>
                <SeriesConfig value={series} onChange={onChange} />
              </ConfigList>
            ),
            key: '1',
          },
          {
            label: <Tab>动画</Tab>,
            children: (
              <ConfigList level={1}>
                <AnimationConfig value={animation} onChange={onChange} />
              </ConfigList>
            ),
            key: '2',
          },
          {
            label: <Tab>条件</Tab>,
            children: (
              <ConfigList level={1}>
                <ConditionConfig value={condition} onChange={onChange} />
              </ConfigList>
            ),
            key: '3',
          },
        ]}
      />
    );
  }
}

export default Config;
