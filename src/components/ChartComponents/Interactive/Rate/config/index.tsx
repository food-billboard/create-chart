import { Component } from 'react';
import { Switch } from 'antd';
import ComponentOptionConfig, {
  Tab,
} from '@/components/ChartComponents/Common/ComponentOptionConfig';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import { CompatColorSelect } from '@/components/ColorSelect';
import BootstrapIconSelect from '@/components/ChartComponents/Common/BootstrapIconSelect';
import InputNumber from '@/components/ChartComponents/Common/InputNumber';
import { updateInteractiveAndSyncParams4Component } from '@/components/ChartComponents/Common/utils';
import { TRateConfig } from '../type';

const { Item } = ConfigList;
class Config extends Component<
  ComponentData.ComponentConfigProps<TRateConfig>
> {
  onKeyChange = (key: keyof TRateConfig, value: any) => {
    this.props.onChange(
      updateInteractiveAndSyncParams4Component<TRateConfig>({
        key,
        defaultValueKey: 'defaultValue',
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
          backgroundColor,
          rateBackgroundColor,
          margin,
          size,
          count,
          allowClear,
          allowHalf,
          defaultValue,
          shape,
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
                <Item label="分数颜色">
                  <FullForm>
                    <CompatColorSelect
                      value={rateBackgroundColor}
                      onChange={this.onKeyChange.bind(
                        this,
                        'rateBackgroundColor',
                      )}
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
                <Item label="大小">
                  <FullForm>
                    <InputNumber
                      value={size}
                      onChange={this.onKeyChange.bind(this, 'size')}
                    />
                  </FullForm>
                </Item>
                <Item label="间距">
                  <FullForm>
                    <InputNumber
                      value={margin}
                      onChange={this.onKeyChange.bind(this, 'margin')}
                    />
                  </FullForm>
                </Item>
                <BootstrapIconSelect
                  itemProps={{
                    label: '图形',
                  }}
                  value={shape}
                  onChange={this.onKeyChange.bind(this, 'shape')}
                />
              </ConfigList>
            ),
            key: '1',
          },
          {
            label: <Tab>交互</Tab>,
            children: (
              <ConfigList level={1}>
                <Item label="默认评分">
                  <FullForm>
                    <InputNumber
                      value={defaultValue}
                      onChange={this.onKeyChange.bind(this, 'defaultValue')}
                    />
                  </FullForm>
                </Item>
                <Item label="允许半选">
                  <FullForm>
                    <Switch
                      checked={allowHalf}
                      onChange={this.onKeyChange.bind(this, 'allowHalf')}
                    />
                  </FullForm>
                </Item>
                <Item label="允许清除">
                  <FullForm>
                    <Switch
                      checked={allowClear}
                      onChange={this.onKeyChange.bind(this, 'allowClear')}
                    />
                  </FullForm>
                </Item>
                <Item label="最大评分">
                  <FullForm>
                    <InputNumber
                      value={count}
                      onChange={this.onKeyChange.bind(this, 'count')}
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
