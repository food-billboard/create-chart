import { Component } from 'react';
import ComponentOptionConfig, {
  Tab,
} from '@/components/ChartComponents/Common/ComponentOptionConfig';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import { CompatColorSelect } from '@/components/ColorSelect';
import BootstrapIconSelect from '@/components/ChartComponents/Common/BootstrapIconSelect';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import { TIconConfig } from '../type';

const { Item } = ConfigList;
class Config extends Component<
  ComponentData.ComponentConfigProps<TIconConfig>
> {
  onKeyChange = (key: keyof TIconConfig, value: any) => {
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
        options: { color, value: iconValue },
      },
    } = value;

    return (
      <ComponentOptionConfig
        items={[
          {
            label: <Tab>基础样式</Tab>,
            children: (
              <ConfigList level={1}>
                <BootstrapIconSelect
                  value={iconValue}
                  onChange={this.onKeyChange.bind(this, 'value')}
                />
                <Item label="颜色">
                  <FullForm>
                    <CompatColorSelect
                      value={color}
                      onChange={this.onKeyChange.bind(this, 'color')}
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
