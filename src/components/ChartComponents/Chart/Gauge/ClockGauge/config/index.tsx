import { Component } from 'react';
import ComponentOptionConfig, {
  Tab,
} from '@/components/ChartComponents/Common/ComponentOptionConfig';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import SeriesConfig from './Series';
import { TClockGaugeConfig } from '../type';
class Config extends Component<
  ComponentData.ComponentConfigProps<TClockGaugeConfig>
> {
  render() {
    const { value, onChange } = this.props;
    const {
      config: {
        options: { series },
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
        ]}
      />
    );
  }
}

export default Config;
