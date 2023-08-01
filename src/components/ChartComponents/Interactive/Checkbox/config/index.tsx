import { InfoCircleOutlined } from '@ant-design/icons';
import { Component } from 'react';
import { SingleCollapse as Collapse } from '@/components/ChartComponents/Common/Collapse';
import ComponentOptionConfig, {
  Tab,
} from '@/components/ChartComponents/Common/ComponentOptionConfig';
import { FontConfigList } from '@/components/ChartComponents/Common/FontConfig';
import Input from '@/components/ChartComponents/Common/Input';
import InputNumber from '@/components/ChartComponents/Common/InputNumber';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import { updateInteractiveAndSyncParams4Component } from '@/components/ChartComponents/Common/utils';
import ColorSelect from '@/components/ColorSelect';
import IconTooltip from '@/components/IconTooltip';
import { TCheckboxConfig } from '../type';

const { Item } = ConfigList;
class Config extends Component<
  ComponentData.ComponentConfigProps<TCheckboxConfig>
> {
  onKeyChange = (key: keyof TCheckboxConfig, value: any) => {
    this.props.onChange(
      updateInteractiveAndSyncParams4Component<TCheckboxConfig>({
        key,
        defaultValueKey: 'defaultChecked',
        callback: (field) => {
          return field.key === 'value' && field._defaultValue_ === false;
        },
        props: this.props,
        newValue: value,
      }),
    );
  };

  render() {
    const { value } = this.props;
    const {
      config: {
        options: {
          borderColor,
          borderRadius,
          backgroundColor,
          textStyle,
          defaultChecked,
          size,
          active,
          check,
        },
      },
    } = value;

    return (
      <ComponentOptionConfig
        items={[
          {
            label: <Tab>基础样式</Tab>,
            children: (
              <ConfigList level={1}>
                <Item label="边框颜色">
                  <FullForm>
                    <ColorSelect
                      value={borderColor}
                      onChange={this.onKeyChange.bind(this, 'borderColor')}
                    />
                  </FullForm>
                </Item>
                <Item label="背景色">
                  <FullForm>
                    <ColorSelect
                      value={backgroundColor}
                      onChange={this.onKeyChange.bind(this, 'backgroundColor')}
                    />
                  </FullForm>
                </Item>
                <Item label="圆角">
                  <FullForm>
                    <InputNumber
                      value={borderRadius}
                      onChange={this.onKeyChange.bind(this, 'borderRadius')}
                    />
                  </FullForm>
                </Item>
                <Item label="大小">
                  <FullForm>
                    <InputNumber
                      value={size}
                      onChange={this.onKeyChange.bind(this, 'size')}
                    />
                  </FullForm>
                </Item>
                <Collapse
                  child={{
                    key: 'textStyle',
                    header: '文字样式',
                  }}
                >
                  <FontConfigList
                    value={textStyle}
                    onChange={this.onKeyChange.bind(this, 'textStyle')}
                  />
                </Collapse>
                <Collapse
                  child={{
                    key: 'focus',
                    header: '选中',
                  }}
                >
                  <Item label="边框颜色">
                    <FullForm>
                      <ColorSelect
                        value={active.borderColor}
                        onChange={(value) =>
                          this.onKeyChange('active', {
                            borderColor: value,
                          })
                        }
                      />
                    </FullForm>
                  </Item>
                  <Item label="背景颜色">
                    <FullForm>
                      <ColorSelect
                        value={active.backgroundColor}
                        onChange={(value) =>
                          this.onKeyChange('active', {
                            backgroundColor: value,
                          })
                        }
                      />
                    </FullForm>
                  </Item>
                  <Item label="符号颜色">
                    <FullForm>
                      <ColorSelect
                        value={check.color}
                        onChange={(value) =>
                          this.onKeyChange('check', {
                            color: value,
                          })
                        }
                      />
                    </FullForm>
                  </Item>
                </Collapse>
              </ConfigList>
            ),
            key: '1',
          },
          {
            label: <Tab>交互</Tab>,
            children: (
              <ConfigList level={1}>
                <Item
                  label="默认选中"
                  placeholder={
                    <IconTooltip title={`多个值使用','分隔`}>
                      <InfoCircleOutlined />
                    </IconTooltip>
                  }
                >
                  <FullForm>
                    <Input
                      value={defaultChecked}
                      onChange={this.onKeyChange.bind(this, 'defaultChecked')}
                    />
                  </FullForm>
                </Item>
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
