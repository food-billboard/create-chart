import { Component } from 'react';
import ComponentOptionConfig, {
  Tab,
} from '@/components/ChartComponents/Common/ComponentOptionConfig';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import { CompatColorSelect } from '@/components/ColorSelect';
import { TDecoration8Config } from '../type';

const { Item } = ConfigList;
class Config extends Component<
  ComponentData.ComponentConfigProps<TDecoration8Config>
> {
  onKeyChange = (key: keyof TDecoration8Config, value: any) => {
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
        options: { color },
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
