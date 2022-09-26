import { Component } from 'react';
import ComponentOptionConfig, {
  Tab,
} from '@/components/ChartComponents/Common/ComponentOptionConfig';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import { SingleCollapse as Collapse } from '@/components/ChartComponents/Common/Collapse';
import { CompatColorSelect } from '@/components/ColorSelect';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import { FontConfigList } from '@/components/ChartComponents/Common/FontConfig';
import LineStyleGroupConfig from '@/components/ChartComponents/Common/LineStyleGroupConfig';
import InputNumber from '@/components/ChartComponents/Common/InputNumber';
import { TTabConfig } from '../type';

const { Item } = ConfigList;

class Config extends Component<ComponentData.ComponentConfigProps<TTabConfig>> {
  onKeyChange = (key: keyof TTabConfig, value: any) => {
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
        options: { base, active, loop },
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
                    <CompatColorSelect
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
                    <CompatColorSelect
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
