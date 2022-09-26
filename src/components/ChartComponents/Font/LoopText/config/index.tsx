import { Component } from 'react';
import ComponentOptionConfig, {
  Tab,
} from '@/components/ChartComponents/Common/ComponentOptionConfig';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import { SingleCollapse as Collapse } from '@/components/ChartComponents/Common/Collapse';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import { FontConfigList } from '@/components/ChartComponents/Common/FontConfig';
import TextAlignConfig from '@/components/ChartComponents/Common/TextAlignConfig';
import InputNumber from '@/components/ChartComponents/Common/InputNumber';
import ConditionConfig from './Condition';
import { TLoopTextConfig } from '../type';

const { Item } = ConfigList;
class Config extends Component<
  ComponentData.ComponentConfigProps<TLoopTextConfig>
> {
  onKeyChange = (key: keyof TLoopTextConfig, value: any) => {
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
          textStyle,
          align,
          animation,
          condition,
          addonBefore,
          addonAfter,
        },
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
                <TextAlignConfig
                  value={align}
                  onChange={this.onKeyChange.bind(this, 'align')}
                />
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
                    header: '动画',
                    key: 'animation',
                  }}
                  parent={{
                    activeKey: ['animation'],
                  }}
                >
                  <Item label="速度">
                    <FullForm>
                      <InputNumber
                        value={animation.interval}
                        onChange={(value) => {
                          this.onKeyChange('animation', {
                            interval: value || 100,
                          });
                        }}
                      />
                    </FullForm>
                  </Item>
                  <Item label="延迟">
                    <InputNumber
                      value={animation.delay}
                      onChange={(value) => {
                        this.onKeyChange('animation', {
                          delay: value || 0,
                        });
                      }}
                    />
                  </Item>
                </Collapse>
              </ConfigList>
            ),
            key: '2',
          },
          // {
          //   label: (
          //     <Tab>
          //       前后文字
          //     </Tab>
          //   ),
          //   children: (
          //     <ConfigList level={1}>
          //       <Collapse
          //         child={{
          //           header: '前缀',
          //           key: 'addonBefore',
          //           visibleRender: true,
          //           value: addonBefore.show,
          //           onChange: value => {
          //             this.onKeyChange('addonBefore', {
          //               show: value
          //             })
          //           }
          //         }}
          //       >
          //         <Item
          //           label='内容'
          //         >
          //           <FullForm>
          //             <Input
          //               value={addonBefore.value}
          //               onChange={value => {
          //                 this.onKeyChange('addonBefore', {
          //                   value
          //                 })
          //               }}
          //             />
          //           </FullForm>
          //         </Item>
          //         <FontConfigList
          //           value={addonBefore.textStyle}
          //           onChange={value => {
          //             this.onKeyChange('addonBefore', {
          //               textStyle: value
          //             })
          //           }}
          //         />
          //       </Collapse>
          //       <Collapse
          //         child={{
          //           header: '后缀',
          //           key: 'addonAfter',
          //           visibleRender: true,
          //           value: addonAfter.show,
          //           onChange: value => {
          //             this.onKeyChange('addonAfter', {
          //               show: value
          //             })
          //           }
          //         }}
          //       >
          //         <Item
          //           label='内容'
          //         >
          //           <FullForm>
          //             <Input
          //               value={addonAfter.value}
          //               onChange={value => {
          //                 this.onKeyChange('addonAfter', {
          //                   value
          //                 })
          //               }}
          //             />
          //           </FullForm>
          //         </Item>
          //         <FontConfigList
          //           value={addonAfter.textStyle}
          //           onChange={value => {
          //             this.onKeyChange('addonAfter', {
          //               textStyle: value
          //             })
          //           }}
          //         />
          //       </Collapse>
          //     </ConfigList>
          //   ),
          //   key: '3'
          // },
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
            key: '4',
          },
        ]}
      />
    );
  }
}

export default Config;
