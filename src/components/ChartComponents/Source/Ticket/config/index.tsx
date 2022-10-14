import { Component } from 'react';
import { Switch } from 'antd';
import ComponentOptionConfig, {
  Tab,
} from '@/components/ChartComponents/Common/ComponentOptionConfig';
import InputNumber from '@/components/ChartComponents/Common/InputNumber';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import HalfForm from '@/components/ChartComponents/Common/Structure/HalfForm';
import { CompatColorSelect } from '@/components/ColorSelect';
import { TTicketConfig } from '../type';

const { Item } = ConfigList;
class Config extends Component<
  ComponentData.ComponentConfigProps<TTicketConfig>
> {
  onKeyChange = (key: keyof TTicketConfig, value: any) => {
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
        options: { radius, length, dashed, shadow, color },
      },
    } = value;

    return (
      <ComponentOptionConfig
        items={[
          {
            label: <Tab>全局配置</Tab>,
            children: (
              <ConfigList level={1}>
                <Item label="背景颜色">
                  <FullForm>
                    <CompatColorSelect
                      value={color}
                      onChange={this.onKeyChange.bind(this, 'color')}
                    />
                  </FullForm>
                </Item>
                <Item label="长度">
                  <FullForm>
                    <InputNumber
                      value={length}
                      onChange={this.onKeyChange.bind(this, 'length')}
                    />
                  </FullForm>
                </Item>
                <Item label="半径">
                  <FullForm>
                    <InputNumber
                      value={radius}
                      onChange={this.onKeyChange.bind(this, 'radius')}
                    />
                  </FullForm>
                </Item>
                <Item label="虚线">
                  <FullForm>
                    <Switch
                      checked={dashed.show}
                      onChange={this.onKeyChange.bind(this, 'dashed', {
                        show: !dashed.show,
                      })}
                    />
                  </FullForm>
                  {dashed.show && (
                    <FullForm label="颜色">
                      <CompatColorSelect
                        value={dashed.color}
                        onChange={(value) =>
                          this.onKeyChange('dashed', {
                            color: value,
                          })
                        }
                      />
                    </FullForm>
                  )}
                </Item>
                <Item label="阴影">
                  <FullForm>
                    <Switch
                      checked={shadow.show}
                      onChange={this.onKeyChange.bind(this, 'shadow', {
                        show: !shadow.show,
                      })}
                    />
                  </FullForm>
                </Item>
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
