import { Component } from 'react';
import { Radio, Switch } from 'antd';
import ComponentOptionConfig, {
  Tab,
} from '@/components/ChartComponents/Common/ComponentOptionConfig';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import { SingleCollapse as Collapse } from '@/components/ChartComponents/Common/Collapse';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import { FontConfigList } from '@/components/ChartComponents/Common/FontConfig';
import HalfForm from '@/components/ChartComponents/Common/Structure/HalfForm';
import ConditionConfig from './Condition';
import { TFontCarouselConfig } from '../type';
import InputNumber from '@/components/ChartComponents/Common/InputNumber';

const { Item } = ConfigList;
class Config extends Component<
  ComponentData.ComponentConfigProps<TFontCarouselConfig>
> {
  onKeyChange = (key: keyof TFontCarouselConfig, value: any) => {
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
        options: {
          textStyle,
          play,
          pauseOnHover,
          speed,
          direction,
          delay,
          condition,
        },
      },
    } = value;

    return (
      <ComponentOptionConfig
        items={[
          {
            label: <Tab>基础</Tab>,
            children: (
              <ConfigList level={1}>
                <Collapse
                  child={{
                    header: '文字样式',
                    key: 'textStyle',
                  }}
                >
                  <FontConfigList
                    value={textStyle}
                    onChange={this.onKeyChange.bind(null, 'textStyle')}
                  />
                </Collapse>
                <Item label="滚动方向">
                  <Radio.Group
                    value={direction}
                    onChange={(e) =>
                      this.onKeyChange('direction', e.target.value)
                    }
                    options={[
                      {
                        label: '从左向右',
                        value: 'right',
                      },
                      {
                        label: '从右向左',
                        value: 'left',
                      },
                    ]}
                  />
                </Item>
                <Item label="滚动速度">
                  <FullForm>
                    <InputNumber
                      value={speed}
                      onChange={this.onKeyChange.bind(this, 'speed')}
                    />
                  </FullForm>
                </Item>
                <Item label="滚动">
                  <HalfForm label="默认滚动">
                    <Switch
                      checked={play}
                      onChange={this.onKeyChange.bind(this, 'play')}
                    />
                  </HalfForm>
                  <HalfForm label="鼠标移入暂停">
                    <Switch
                      checked={pauseOnHover}
                      onChange={this.onKeyChange.bind(this, 'pauseOnHover')}
                    />
                  </HalfForm>
                </Item>
                <Item label="延迟滚动">
                  <HalfForm>
                    <InputNumber
                      value={delay}
                      onChange={this.onKeyChange.bind(this, 'delay')}
                    />
                  </HalfForm>
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
