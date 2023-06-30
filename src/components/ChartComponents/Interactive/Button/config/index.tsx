import { Component } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import ComponentOptionConfig, {
  Tab,
} from '@/components/ChartComponents/Common/ComponentOptionConfig';
import Select from '@/components/ChartComponents/Common/Select';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import { SingleCollapse as Collapse } from '@/components/ChartComponents/Common/Collapse';
import { FontConfigList } from '@/components/ChartComponents/Common/FontConfig';
import { CompatColorSelect } from '@/components/ColorSelect';
import BootstrapIconSelect from '@/components/ChartComponents/Common/BootstrapIconSelect';
import InputNumber from '@/components/ChartComponents/Common/InputNumber';
import IconTooltip from '@/components/IconTooltip';
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
        options: {
          backgroundColor,
          textStyle,
          icon,
          borderRadius,
          type,
          actionType,
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
          {
            label: <Tab>交互</Tab>,
            children: (
              <ConfigList level={1}>
                <Item
                  label="交互类型"
                  placeholder={
                    <IconTooltip
                      title={`设置为 "提交按钮" 时，当点击按钮时，交互的值会在按钮内容后加一个时间戳以达到每次都变化的目的，这样在其他组件的 "url" 上设置了按钮的交互属性时，就可以达到触发响应的目的。`}
                    >
                      <InfoCircleOutlined />
                    </IconTooltip>
                  }
                >
                  <FullForm>
                    <Select
                      value={actionType}
                      className="w-100"
                      onChange={this.onKeyChange.bind(this, 'actionType')}
                      options={[
                        {
                          label: '普通按钮',
                          value: 'normal',
                        },
                        {
                          label: '提交按钮',
                          value: 'submit',
                        },
                      ]}
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
