import { Switch } from 'antd';
import { Component } from 'react';
import ComponentOptionConfig, {
  Tab,
} from '@/components/ChartComponents/Common/ComponentOptionConfig';
import InputNumber from '@/components/ChartComponents/Common/InputNumber';
import JsonDataUpload from '@/components/ChartComponents/Common/JsonDataUpload';
import Select from '@/components/ChartComponents/Common/Select';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import { TLottieAnimeConfig } from '../type';
import ConditionConfig from './Condition';

const { Item } = ConfigList;
class Config extends Component<
  ComponentData.ComponentConfigProps<TLottieAnimeConfig>
> {
  onKeyChange = (key: keyof TLottieAnimeConfig, value: any) => {
    this.props.onChange({
      config: {
        options: {
          [key]: value,
        },
      },
    });
  };

  render() {
    const { value, onChange } = this.props;
    const {
      config: {
        options: { loop, speed, value: lottieData, direction, condition },
      },
    } = value;

    return (
      <ComponentOptionConfig
        items={[
          {
            label: <Tab>全局样式</Tab>,
            children: (
              <ConfigList level={1}>
                <Item label="lottie数据">
                  <FullForm>
                    <JsonDataUpload
                      value={lottieData}
                      onChange={this.onKeyChange.bind(this, 'value')}
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
                <Item label="播放速度">
                  <FullForm>
                    <InputNumber
                      className="w-100"
                      value={speed}
                      onChange={this.onKeyChange.bind(this, 'speed')}
                    />
                  </FullForm>
                </Item>
                {/* <Item label="运动类型">
                  <FullForm>
                    <Select
                      className="w-100"
                      value={direction}
                      onChange={this.onKeyChange.bind(this, 'direction')}
                      options={[
                        {
                          label: '正向运动',
                          value: 1,
                        },
                        {
                          label: '反向运动',
                          value: -1,
                        },
                        {
                          label: '往返运动',
                          value: 0,
                        },
                      ]}
                    />
                  </FullForm>
                </Item> */}
              </ConfigList>
            ),
            key: '1',
          },
          {
            label: <Tab>条件</Tab>,
            children: (
              <ConfigList level={1}>
                <ConditionConfig value={condition} onChange={onChange} />
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
