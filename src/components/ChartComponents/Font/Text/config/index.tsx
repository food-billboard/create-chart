import { Component } from 'react';
import { Select } from 'antd';
import ComponentOptionConfig, {
  Tab,
} from '@/components/ChartComponents/Common/ComponentOptionConfig';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import { SingleCollapse as Collapse } from '@/components/ChartComponents/Common/Collapse';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import { FontConfigList } from '@/components/ChartComponents/Common/FontConfig';
import InputNumber from '@/components/ChartComponents/Common/InputNumber';
import ConditionConfig from './Condition';
import { TTextConfig } from '../type';

const { Item } = ConfigList;
class Config extends Component<
  ComponentData.ComponentConfigProps<TTextConfig>
> {
  onKeyChange = (key: keyof TTextConfig, value: any) => {
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
        options: { textStyle, animation, condition },
      },
    } = value;

    return (
      <ComponentOptionConfig
        items={[
          {
            label: <Tab>样式</Tab>,
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
                <Item label="对齐方式">
                  <FullForm>
                    <Select
                      value={textStyle.textAlign}
                      onChange={(value) => {
                        this.onKeyChange('textStyle', {
                          textAlign: value,
                        });
                      }}
                      className="w-100"
                      options={[
                        {
                          value: 'left',
                          label: '左对齐',
                        },
                        {
                          value: 'right',
                          label: '右对齐',
                        },
                        {
                          value: 'justify',
                          label: '两端对齐',
                        },
                      ]}
                    />
                  </FullForm>
                </Item>
                <Item label="文字间距">
                  <FullForm>
                    <InputNumber
                      value={textStyle.letterSpacing}
                      onChange={(value) => {
                        this.onKeyChange('textStyle', {
                          letterSpacing: value,
                        });
                      }}
                      className="w-100"
                    />
                  </FullForm>
                </Item>
                <Item label="行高">
                  <FullForm>
                    <InputNumber
                      value={textStyle.lineHeight}
                      onChange={(value) => {
                        this.onKeyChange('textStyle', {
                          lineHeight: value,
                        });
                      }}
                      className="w-100"
                    />
                  </FullForm>
                </Item>
                <Item label="首行缩进">
                  <FullForm>
                    <InputNumber
                      value={textStyle.textIndent}
                      onChange={(value) => {
                        this.onKeyChange('textStyle', {
                          textIndent: value,
                        });
                      }}
                      className="w-100"
                    />
                  </FullForm>
                </Item>
              </ConfigList>
            ),
            key: '1',
          },
          {
            label: <Tab>动画</Tab>,
            children: (
              <ConfigList level={1}>
                <Collapse
                  child={{
                    header: '滚动',
                    key: 'animation',
                    visibleRender: true,
                    value: animation.show,
                    onChange: (value) => {
                      this.onKeyChange('animation', {
                        show: value,
                      });
                    },
                  }}
                  parent={{
                    activeKey: ['animation'],
                  }}
                >
                  <Item label="速度">
                    <InputNumber
                      value={animation.speed}
                      onChange={(value) => {
                        this.onKeyChange('animation', {
                          speed: value,
                        });
                      }}
                    />
                  </Item>
                </Collapse>
              </ConfigList>
            ),
            key: '2',
          },
          {
            label: <Tab>条件</Tab>,
            children: (
              <ConfigList level={1}>
                <ConditionConfig
                  value={condition}
                  onChange={this.onKeyChange.bind(null, 'condition')}
                />
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
