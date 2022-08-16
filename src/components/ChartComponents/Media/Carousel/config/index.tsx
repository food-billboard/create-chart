import { Component } from 'react';
import { Tabs, Switch } from 'antd';
import {
  BorderTopOutlined,
  BorderRightOutlined,
  BorderBottomOutlined,
  BorderLeftOutlined,
} from '@ant-design/icons';
import ComponentOptionConfig, {
  Tab,
} from '@/components/ChartComponents/Common/ComponentOptionConfig';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import ColorSelect from '@/components/ColorSelect';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import { SingleCollapse as Collapse } from '@/components/ChartComponents/Common/Collapse';
import RadioGroup, {
  Radio,
} from '@/components/ChartComponents/Common/IconRadio';
import ClipPathSelect from '@/components/ChartComponents/Common/ClipPathSelect';
import InputNumber from '@/components/ChartComponents/Common/InputNumber';
import ConditionConfig from './Condition';
import { TCarouselConfig } from '../type';

const { TabPane } = Tabs;
const { Item } = ConfigList;

const { getRgbaString } = ColorSelect;

class Config extends Component<
  ComponentData.ComponentConfigProps<TCarouselConfig>
> {
  onKeyChange = (key: keyof TCarouselConfig, value: any) => {
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
          speed,
          dot,
          autoplay,
          fade,
          condition,
          pauseOnHover,
          clipPath,
        },
      },
    } = value;

    return (
      <ComponentOptionConfig>
        <TabPane key={'1'} tab={<Tab>样式</Tab>}>
          <ConfigList level={1}>
            <Item label="轮播速度">
              <FullForm>
                <InputNumber
                  value={speed}
                  onChange={this.onKeyChange.bind(this, 'speed')}
                  className="w-100"
                />
              </FullForm>
            </Item>
            <Item label="自动播放">
              <FullForm>
                <Switch
                  checked={autoplay}
                  onChange={this.onKeyChange.bind(this, 'autoplay')}
                />
              </FullForm>
            </Item>
            {autoplay && (
              <Item label="移入停止">
                <FullForm>
                  <Switch
                    checked={pauseOnHover}
                    onChange={this.onKeyChange.bind(this, 'pauseOnHover')}
                  />
                </FullForm>
              </Item>
            )}
            <Collapse
              child={{
                header: '指示点',
                key: 'dot',
                visibleRender: true,
                value: dot.show,
                onChange: (value) => {
                  this.onKeyChange('dot', {
                    show: value,
                  });
                },
              }}
            >
              <Item label="位置">
                <FullForm>
                  <RadioGroup
                    value={dot.position}
                    onChange={(value) => {
                      this.onKeyChange('dot', {
                        position: value,
                      });
                    }}
                  >
                    <Radio key="top" value="top" icon={<BorderTopOutlined />} />
                    <Radio
                      key="right"
                      value="right"
                      icon={<BorderRightOutlined />}
                    />
                    <Radio
                      key="bottom"
                      value="bottom"
                      icon={<BorderBottomOutlined />}
                    />
                    <Radio
                      key="left"
                      value="left"
                      icon={<BorderLeftOutlined />}
                    />
                  </RadioGroup>
                </FullForm>
              </Item>
            </Collapse>
            <Item label={'渐隐渐显'}>
              <FullForm>
                <Switch
                  checked={fade}
                  onChange={this.onKeyChange.bind(this, 'fade')}
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
