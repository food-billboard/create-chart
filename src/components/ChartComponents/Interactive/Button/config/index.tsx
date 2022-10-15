import { Component } from 'react';
import { Select } from 'antd';
import ComponentOptionConfig, {
  Tab,
} from '@/components/ChartComponents/Common/ComponentOptionConfig';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import { SingleCollapse as Collapse } from '@/components/ChartComponents/Common/Collapse';
import { FontConfigList } from '@/components/ChartComponents/Common/FontConfig';
import { CompatColorSelect } from '@/components/ColorSelect';
import BootstrapIconSelect from '@/components/ChartComponents/Common/BootstrapIconSelect';
import InputNumber from '@/components/ChartComponents/Common/InputNumber';
import { TButtonConfig } from '../type';

const { Item } = ConfigList;
class Config extends Component<
  ComponentData.ComponentConfigProps<TButtonConfig>
> {
  onKeyChange = (key: keyof TButtonConfig, value: any) => {
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
        options: { backgroundColor, textStyle, icon, borderRadius, type },
      },
    } = value;

    return (
      <ComponentOptionConfig
        items={[
          {
            label: <Tab>基础样式</Tab>,
            children: (
              <ConfigList level={1}>
                <Item label="类型">
                  <FullForm>
                    <Select
                      value={type}
                      className="w-100"
                      onChange={this.onKeyChange.bind(this, 'type')}
                      options={[
                        {
                          label: 'primary',
                          value: 'primary',
                        },
                        {
                          label: 'default',
                          value: 'default',
                        },
                      ]}
                    />
                  </FullForm>
                </Item>
                <Item label="背景色">
                  <FullForm>
                    <CompatColorSelect
                      value={backgroundColor}
                      onChange={this.onKeyChange.bind(this, 'backgroundColor')}
                    />
                  </FullForm>
                </Item>
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
                <Item label="圆角">
                  <FullForm>
                    <InputNumber
                      value={borderRadius}
                      onChange={this.onKeyChange.bind(this, 'borderRadius')}
                    />
                  </FullForm>
                </Item>
                <BootstrapIconSelect
                  itemProps={{
                    label: '图形',
                  }}
                  value={icon}
                  onChange={this.onKeyChange.bind(this, 'icon')}
                />
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
