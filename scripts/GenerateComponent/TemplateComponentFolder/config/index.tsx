import { Component } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import ComponentOptionConfig, {
  Tab,
} from '@/components/ChartComponents/Common/ComponentOptionConfig';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import { CompatColorSelect } from '@/components/ColorSelect';
import { SingleCollapse as Collapse } from '@/components/ChartComponents/Common/Collapse';
import IconTooltip from '@/components/IconTooltip';
import InputNumber from '@/components/ChartComponents/Common/InputNumber';
import Input from '@/components/ChartComponents/Common/Input';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import { FontConfigList } from '@/components/ChartComponents/Common/FontConfig';
import ConditionConfig from './Condition';
import { T{{COMPONENT_NAME}}Config } from '../type';

const { Item } = ConfigList;
class Config extends Component<
  ComponentData.ComponentConfigProps<T{{COMPONENT_NAME}}Config>
> {
  onKeyChange = (key: keyof T{{COMPONENT_NAME}}Config, value: any) => {
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
        options: { textStyle, color, content, counter, condition },
      },
    } = value;

    return (
      <ComponentOptionConfig
        items={[
          {
            label: <Tab>配置项的标题</Tab>,
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
                <Item
                  label="颜色配置"
                >
                  <FullForm>
                    <CompatColorSelect
                      value={color}
                      onChange={this.onKeyChange.bind(null, 'color')}
                    />
                  </FullForm>
                </Item>
                <Item label="数字配置">
                  <FullForm>
                    <InputNumber
                      value={counter}
                      onChange={this.onKeyChange.bind(null, 'counter')}
                    />
                  </FullForm>
                </Item>
                <Item label={(
                  <IconTooltip
                    title="文字配置"
                  >
                    <InfoCircleOutlined />
                  </IconTooltip>
                )}>
                  <FullForm>
                    <Input
                      value={content}
                      onChange={this.onKeyChange.bind(null, 'content')}
                    />
                  </FullForm>
                </Item>
              </ConfigList>
            ),
            key: '1',
          },
          {
            label: <Tab>条件配置</Tab>,
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
