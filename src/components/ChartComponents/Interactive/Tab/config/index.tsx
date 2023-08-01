import { Component } from 'react';
import { SingleCollapse as Collapse } from '@/components/ChartComponents/Common/Collapse';
import ComponentOptionConfig, {
  Tab,
} from '@/components/ChartComponents/Common/ComponentOptionConfig';
import { FontConfigList } from '@/components/ChartComponents/Common/FontConfig';
import Input from '@/components/ChartComponents/Common/Input';
import InputNumber from '@/components/ChartComponents/Common/InputNumber';
import LineStyleGroupConfig from '@/components/ChartComponents/Common/LineStyleGroupConfig';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import { updateInteractiveAndSyncParams4Component } from '@/components/ChartComponents/Common/utils';
import ColorSelect from '@/components/ColorSelect';
import { TTabConfig } from '../type';

const { Item } = ConfigList;

class Config extends Component<ComponentData.ComponentConfigProps<TTabConfig>> {
  onKeyChange = (key: keyof TTabConfig, value: any) => {
    this.props.onChange(
      updateInteractiveAndSyncParams4Component<TTabConfig>({
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
        options: { base, active, loop, defaultValue },
      },
    } = value;

    return (
      <ComponentOptionConfig
        items={[
          {
            label: <Tab>基础样式</Tab>,
            children: (
              <ConfigList level={1}>
                <Collapse
                  child={{
                    header: '文字样式',
                    key: 'textStyle',
                  }}
                >
                  <FontConfigList
                    value={base.textStyle}
                    onChange={(value) => {
                      this.onKeyChange('base', {
                        textStyle: value,
                      });
                    }}
                  />
                </Collapse>
                <LineStyleGroupConfig
                  value={base.border}
                  onChange={(value) => {
                    this.onKeyChange('base', {
                      border: value,
                    });
                  }}
                />
                <Item label="背景颜色">
                  <FullForm>
                    <ColorSelect
                      value={base.backgroundColor}
                      onChange={(value) => {
                        this.onKeyChange('base', {
                          backgroundColor: value,
                        });
                      }}
                    />
                  </FullForm>
                </Item>
              </ConfigList>
            ),
            key: '1',
          },
          {
            label: <Tab>选中样式</Tab>,
            children: (
              <ConfigList level={1}>
                <Collapse
                  child={{
                    header: '文字样式',
                    key: 'textStyle',
                  }}
                >
                  <FontConfigList
                    value={active.textStyle}
                    onChange={(value) => {
                      this.onKeyChange('active', {
                        textStyle: value,
                      });
                    }}
                  />
                </Collapse>
                <LineStyleGroupConfig
                  value={active.border}
                  onChange={(value) => {
                    this.onKeyChange('active', {
                      border: value,
                    });
                  }}
                />
                <Item label="背景颜色">
                  <FullForm>
                    <ColorSelect
                      value={active.backgroundColor}
                      onChange={(value) => {
                        this.onKeyChange('active', {
                          backgroundColor: value,
                        });
                      }}
                    />
                  </FullForm>
                </Item>
              </ConfigList>
            ),
            key: '2',
          },
          {
            label: <Tab>交互</Tab>,
            children: (
              <ConfigList level={1}>
                <Item label="默认值">
                  <FullForm>
                    <Input
                      className="w-100"
                      value={defaultValue}
                      onChange={this.onKeyChange.bind(this, 'defaultValue')}
                    />
                  </FullForm>
                </Item>
              </ConfigList>
            ),
            key: '4',
          },
          {
            label: <Tab>轮播</Tab>,
            children: (
              <ConfigList level={1}>
                <Collapse
                  child={{
                    header: '是否轮播',
                    key: 'loop',
                    visibleRender: true,
                    value: loop.show,
                    onChange: (value) => {
                      this.onKeyChange('loop', {
                        show: value,
                      });
                    },
                  }}
                  parent={{
                    activeKey: ['loop'],
                  }}
                >
                  <Item label="时间间隔">
                    <FullForm>
                      <InputNumber
                        className="w-100"
                        value={loop.speed}
                        onChange={(value) => {
                          this.onKeyChange('loop', {
                            speed: value,
                          });
                        }}
                      />
                    </FullForm>
                  </Item>
                </Collapse>
              </ConfigList>
            ),
            key: '3',
          },
        ]}
      />
    );
  }
}

export default Config;
