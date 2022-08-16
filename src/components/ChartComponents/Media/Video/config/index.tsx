import { Component } from 'react';
import { Tabs, Switch } from 'antd';
import ComponentOptionConfig, {
  Tab,
} from '@/components/ChartComponents/Common/ComponentOptionConfig';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import ClipPathSelect from '@/components/ChartComponents/Common/ClipPathSelect';
import ConditionConfig from './Condition';
import { TVideoConfig } from '../type';

const { TabPane } = Tabs;
const { Item } = ConfigList;

class Config extends Component<
  ComponentData.ComponentConfigProps<TVideoConfig>
> {
  onKeyChange = (key: keyof TVideoConfig, value: any) => {
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
        options: { autoplay, loop, muted, controls, condition, clipPath },
      },
    } = value;

    return (
      <ComponentOptionConfig>
        <TabPane key={'1'} tab={<Tab>视频</Tab>}>
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
            <Item label="静音">
              <FullForm>
                <Switch
                  checked={muted}
                  onChange={this.onKeyChange.bind(this, 'muted')}
                />
              </FullForm>
            </Item>
            <Item label="控制栏">
              <FullForm>
                <Switch
                  checked={controls}
                  onChange={this.onKeyChange.bind(this, 'controls')}
                />
              </FullForm>
            </Item>
            <ClipPathSelect
              value={clipPath}
              onChange={this.onKeyChange.bind(this, 'clipPath')}
            />
          </ConfigList>
        </TabPane>
        <TabPane key="2" tab={<Tab>条件</Tab>}>
          <ConfigList level={1}>
            <ConditionConfig
              value={condition}
              onChange={this.onKeyChange.bind(null, 'condition')}
            />
          </ConfigList>
        </TabPane>
      </ComponentOptionConfig>
    );
  }
}

export default Config;
