import { Component } from 'react';
import { Switch } from 'antd';
import ComponentOptionConfig, {
  Tab,
} from '@/components/ChartComponents/Common/ComponentOptionConfig';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import ConditionConfig from './Condition';
import { TAudioConfig } from '../type';

const { Item } = ConfigList;
class Config extends Component<
  ComponentData.ComponentConfigProps<TAudioConfig>
> {
  onKeyChange = (key: keyof TAudioConfig, value: any) => {
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
        options: { autoplay, loop, controls, condition },
      },
    } = value;

    return (
      <ComponentOptionConfig
        items={[
          {
            label: <Tab>全局样式</Tab>,
            children: (
              <ConfigList level={1}>
                <Item label="自动播放">
                  <FullForm>
                    <Switch
                      checked={autoplay}
                      onChange={this.onKeyChange.bind(this, 'autoplay')}
                    />
                  </FullForm>
                </Item>
                <Item label="循环播放">
                  <FullForm>
                    <Switch
                      checked={loop}
                      onChange={this.onKeyChange.bind(this, 'loop')}
                    />
                  </FullForm>
                </Item>
                <Item label="控制条">
                  <FullForm>
                    <Switch
                      checked={controls}
                      onChange={this.onKeyChange.bind(this, 'controls')}
                    />
                  </FullForm>
                </Item>
              </ConfigList>
            ),
            key: '1',
          },
          {
            label: <Tab>条件</Tab>,
            children: (
              <ConfigList level={1}>
                <ConditionConfig
                  value={condition}
                  onChange={this.onKeyChange.bind(null, 'condition')}
                />
              </ConfigList>
            ),
            key: '2',
          },
        ]}
      />
    );
  }
}

export default Config;
