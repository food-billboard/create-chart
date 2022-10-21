import { Component } from 'react';
import { Switch } from 'antd';
import ComponentOptionConfig, {
  Tab,
} from '@/components/ChartComponents/Common/ComponentOptionConfig';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import InputNumbr from '@/components/ChartComponents/Common/InputNumber';
import { CompatColorSelect } from '@/components/ColorSelect';
import { TDecoration4Config } from '../type';

const { Item } = ConfigList;
class Config extends Component<
  ComponentData.ComponentConfigProps<TDecoration4Config>
> {
  onKeyChange = (key: keyof TDecoration4Config, value: any) => {
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
        options: { color, reverse, dur },
      },
    } = value;

    return (
      <ComponentOptionConfig
        items={[
          {
            label: <Tab>全局配置</Tab>,
            children: (
              <ConfigList level={1}>
                <Item label="颜色">
                  <FullForm label="主色调">
                    <CompatColorSelect
                      value={color[0]}
                      onChange={(value) =>
                        this.onKeyChange('color', [value, color[1]])
                      }
                    />
                  </FullForm>
                  <FullForm label="副色调">
                    <CompatColorSelect
                      value={color[1]}
                      onChange={(value) =>
                        this.onKeyChange('color', [color[0], value])
                      }
                    />
                  </FullForm>
                </Item>
                <Item label="是否水平">
                  <FullForm>
                    <Switch
                      checked={reverse}
                      onChange={this.onKeyChange.bind(this, 'reverse')}
                    />
                  </FullForm>
                </Item>
                <Item label="动画时间">
                  <FullForm>
                    <InputNumbr
                      value={dur}
                      onChange={this.onKeyChange.bind(this, 'dur')}
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
