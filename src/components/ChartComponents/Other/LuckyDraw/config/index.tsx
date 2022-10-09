import { Component } from 'react';
import { Select } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { merge } from 'lodash';
import ComponentOptionConfig, {
  Tab,
} from '@/components/ChartComponents/Common/ComponentOptionConfig';
import { CompatColorSelect } from '@/components/ColorSelect';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import { SingleCollapse as Collapse } from '@/components/ChartComponents/Common/Collapse';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import { FontConfigList } from '@/components/ChartComponents/Common/FontConfig';
import HalfForm from '@/components/ChartComponents/Common/Structure/HalfForm';
import MultipleSeriesConfig from '@/components/ChartComponents/Common/MultipleSeriesConfig';
import InputNumber from '@/components/ChartComponents/Common/InputNumber';
import IconTooltip from '@/components/IconTooltip';
import Input from '@/components/ChartComponents/Common/Input';
import GlobalConfig from '@/utils/Assist/GlobalConfig';
import ThemeUtil from '@/utils/Assist/Theme';
import ConditionConfig from './Condition';
import { TLuckyDrawConfig } from '../type';

const { Item } = ConfigList;

class Config extends Component<
  ComponentData.ComponentConfigProps<TLuckyDrawConfig>
> {
  onKeyChange = (key: keyof TLuckyDrawConfig, value: any) => {
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
        options: { global, buttons, prizes, blocks, condition },
      },
    } = value;

    return (
      <ComponentOptionConfig
        items={[
          {
            label: <Tab>全局样式</Tab>,
            children: (
              <ConfigList level={1}>
                <Item label="背景色">
                  <FullForm>
                    <CompatColorSelect
                      value={global.style.background}
                      onChange={(value) => {
                        this.onKeyChange('global', {
                          style: {
                            background: value,
                          },
                        });
                      }}
                    />
                  </FullForm>
                </Item>
                <Item
                  label="旋转速度"
                  placeholder={
                    <IconTooltip title="建议配置范围 10 ~ 30">
                      <InfoCircleOutlined />
                    </IconTooltip>
                  }
                >
                  <FullForm>
                    <InputNumber
                      value={global.config.speed}
                      onChange={(value) => {
                        this.onKeyChange('global', {
                          config: {
                            speed: value,
                          },
                        });
                      }}
                    />
                  </FullForm>
                </Item>
                <Collapse
                  child={{
                    header: '文本',
                    key: 'textStyle',
                  }}
                >
                  <FontConfigList
                    value={global.style}
                    onChange={(value) => {
                      this.onKeyChange('global', {
                        style: {
                          ...value,
                        },
                      });
                    }}
                  />
                </Collapse>
              </ConfigList>
            ),
            key: '1',
          },
          {
            label: <Tab>按钮</Tab>,
            children: (
              <ConfigList level={1}>
                <Item label="类型">
                  <FullForm>
                    <Select
                      className="w-100"
                      value={buttons.type}
                      onChange={(value) => {
                        this.onKeyChange('buttons', {
                          type: value,
                        });
                      }}
                      options={[
                        {
                          label: '样式一',
                          value: 'custom_1',
                        },
                        {
                          label: '样式二',
                          value: 'custom_2',
                        },
                      ]}
                    />
                  </FullForm>
                </Item>
                <Item label="文案">
                  <FullForm>
                    <Input
                      value={buttons.content}
                      onChange={(value) => {
                        this.onKeyChange('buttons', {
                          content: value,
                        });
                      }}
                    />
                  </FullForm>
                </Item>
                <Collapse
                  child={{
                    header: '文本',
                    key: 'textStyle',
                  }}
                >
                  <FontConfigList
                    value={buttons.textStyle}
                    onChange={(value) => {
                      this.onKeyChange('buttons', {
                        textStyle: {
                          ...value,
                        },
                      });
                    }}
                  />
                </Collapse>
              </ConfigList>
            ),
            key: '2',
          },
          {
            label: <Tab>背景</Tab>,
            children: (
              <ConfigList level={1}>
                <Item label="类型">
                  <FullForm>
                    <Select
                      className="w-100"
                      value={blocks.type}
                      onChange={(value) => {
                        this.onKeyChange('blocks', {
                          type: value,
                        });
                      }}
                      options={[
                        {
                          label: '样式一',
                          value: 'custom_1',
                        },
                        {
                          label: '样式二',
                          value: 'custom_2',
                        },
                      ]}
                    />
                  </FullForm>
                </Item>
              </ConfigList>
            ),
            key: '3',
          },
          {
            label: <Tab>奖品</Tab>,
            children: (
              <ConfigList level={1}>
                <Item label="大小">
                  <HalfForm label="宽">
                    <InputNumber
                      value={prizes.size.width}
                      onChange={(value) => {
                        this.onKeyChange('prizes', {
                          size: {
                            width: value,
                          },
                        });
                      }}
                    />
                  </HalfForm>
                  <HalfForm label="高">
                    <InputNumber
                      value={prizes.size.height}
                      onChange={(value) => {
                        this.onKeyChange('prizes', {
                          size: {
                            height: value,
                          },
                        });
                      }}
                    />
                  </HalfForm>
                </Item>
                <MultipleSeriesConfig
                  onAdd={() => {
                    const newData = {
                      background: ThemeUtil.generateNextColor4CurrentTheme(
                        prizes.config.length,
                      ),
                    };
                    const newDataList = [...prizes.config, newData];
                    this.onKeyChange('prizes', {
                      config: newDataList,
                    });
                  }}
                  onRemove={(index) => {
                    const newData = [...prizes.config];
                    newData.splice(index, 1);
                    this.onKeyChange('prizes', {
                      config: newData,
                    });
                  }}
                  counter={prizes.config.length}
                  max={GlobalConfig.getChartSeriesCounter('LUCKY_DRAW')}
                  renderContent={(index) => {
                    const { background } = prizes.config[index];
                    return (
                      <>
                        <Item label="背景色">
                          <FullForm>
                            <CompatColorSelect
                              value={background}
                              onChange={(value) => {
                                const newData = [...prizes.config];
                                newData.splice(
                                  index,
                                  1,
                                  merge(newData[index], {
                                    background: value,
                                  }),
                                );
                                this.onKeyChange('prizes', {
                                  config: newData,
                                });
                              }}
                            />
                          </FullForm>
                        </Item>
                      </>
                    );
                  }}
                  buttonLabel="新增奖品"
                  seriesLabel={(index) => {
                    return `奖品${index + 1}`;
                  }}
                />
              </ConfigList>
            ),
            key: '4',
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
            key: '5',
          },
        ]}
      />
    );
  }
}

export default Config;
