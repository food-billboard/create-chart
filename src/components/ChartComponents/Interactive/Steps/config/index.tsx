import { Component } from 'react';
import { Switch } from 'antd';
import ComponentOptionConfig, {
  Tab,
} from '@/components/ChartComponents/Common/ComponentOptionConfig';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import { SingleCollapse as Collapse } from '@/components/ChartComponents/Common/Collapse';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import { FontConfigList } from '@/components/ChartComponents/Common/FontConfig';
import LineStyleGroupConfig from '@/components/ChartComponents/Common/LineStyleGroupConfig';
import MultipleSeriesConfig from '@/components/ChartComponents/Common/MultipleSeriesConfig';
import InputNumber from '@/components/ChartComponents/Common/InputNumber';
import BootstrapIconSelect from '@/components/ChartComponents/Common/BootstrapIconSelect';
import OrientSelect from '@/components/ChartComponents/Common/OrientSelect';
import GlobalConfig from '@/utils/Assist/GlobalConfig';
import { DEFAULT_ICON } from '../defaultConfig';
import { TStepsConfig } from '../type';

const { Item } = ConfigList;
class Config extends Component<
  ComponentData.ComponentConfigProps<TStepsConfig>
> {
  onKeyChange = (key: keyof TStepsConfig, value: any) => {
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
          click,
          defaultCurrent,
          carousel,
          direction,
          labelPlacement,
          icons,
          style,
          size,
        },
      },
    } = value;

    return (
      <ComponentOptionConfig
        items={[
          {
            label: <Tab>基础</Tab>,
            children: (
              <ConfigList level={1}>
                <Item label="图标大小">
                  <FullForm>
                    <InputNumber
                      value={size}
                      onChange={this.onKeyChange.bind(this, 'size')}
                    />
                  </FullForm>
                </Item>
                <Item label="步骤排列">
                  <FullForm>
                    <OrientSelect
                      value={direction}
                      onChange={this.onKeyChange.bind(this, 'direction')}
                    />
                  </FullForm>
                </Item>
                {direction === 'horizontal' && (
                  <Item label="文字排列">
                    <FullForm>
                      <OrientSelect
                        value={labelPlacement}
                        onChange={this.onKeyChange.bind(this, 'labelPlacement')}
                      />
                    </FullForm>
                  </Item>
                )}
              </ConfigList>
            ),
            key: '1',
          },
          {
            label: <Tab>步骤图标</Tab>,
            children: (
              <ConfigList level={1}>
                <MultipleSeriesConfig
                  counter={icons.length}
                  renderContent={(index) => {
                    const target = icons[index];
                    return (
                      <>
                        <BootstrapIconSelect
                          itemProps={{
                            label: '等待图标',
                          }}
                          value={target.wait}
                          onChange={(value) => {
                            const newIcons = [...icons];
                            newIcons.splice(index, 1, {
                              ...target,
                              wait: value,
                            });
                            this.onKeyChange('icons', newIcons);
                          }}
                        />
                        <BootstrapIconSelect
                          itemProps={{
                            label: '执行图标',
                          }}
                          value={target.process}
                          onChange={(value) => {
                            const newIcons = [...icons];
                            newIcons.splice(index, 1, {
                              ...target,
                              process: value,
                            });
                            this.onKeyChange('icons', newIcons);
                          }}
                        />
                        <BootstrapIconSelect
                          itemProps={{
                            label: '完成图标',
                          }}
                          value={target.finish}
                          onChange={(value) => {
                            const newIcons = [...icons];
                            newIcons.splice(index, 1, {
                              ...target,
                              finish: value,
                            });
                            this.onKeyChange('icons', newIcons);
                          }}
                        />
                        <BootstrapIconSelect
                          itemProps={{
                            label: '错误图标',
                          }}
                          value={target.error}
                          onChange={(value) => {
                            const newIcons = [...icons];
                            newIcons.splice(index, 1, {
                              ...target,
                              error: value,
                            });
                            this.onKeyChange('icons', newIcons);
                          }}
                        />
                      </>
                    );
                  }}
                  onAdd={() => {
                    this.onKeyChange('icons', [
                      ...icons,
                      {
                        ...DEFAULT_ICON,
                      },
                    ]);
                  }}
                  onRemove={(index) => {
                    const newIcons = [...icons];

                    newIcons.splice(index, 1);

                    this.onKeyChange('icons', newIcons);
                  }}
                  max={GlobalConfig.getChartSeriesCounter('STEPS')}
                />
              </ConfigList>
            ),
            key: '2',
          },
          {
            label: <Tab>状态样式</Tab>,
            children: (
              <ConfigList level={1}>
                <Collapse
                  child={{
                    header: '等待',
                    key: 'wait',
                  }}
                >
                  <Collapse
                    child={{
                      header: '文字',
                      key: 'textStyle',
                    }}
                  >
                    <FontConfigList
                      value={style.wait.textStyle}
                      onChange={(value) => {
                        this.onKeyChange('style', {
                          wait: {
                            textStyle: value,
                          },
                        });
                      }}
                    />
                  </Collapse>
                  <LineStyleGroupConfig
                    value={style.wait.lineStyle}
                    ignore={['type', 'width']}
                    onChange={(value) =>
                      this.onKeyChange('style', {
                        wait: {
                          lineStyle: value,
                        },
                      })
                    }
                  />
                </Collapse>
                <Collapse
                  child={{
                    header: '执行中',
                    key: 'process',
                  }}
                >
                  <Collapse
                    child={{
                      header: '文字',
                      key: 'textStyle',
                    }}
                  >
                    <FontConfigList
                      value={style.process.textStyle}
                      onChange={(value) => {
                        this.onKeyChange('style', {
                          process: {
                            textStyle: value,
                          },
                        });
                      }}
                    />
                  </Collapse>
                  <LineStyleGroupConfig
                    value={style.process.lineStyle}
                    ignore={['type', 'width']}
                    onChange={(value) =>
                      this.onKeyChange('style', {
                        process: {
                          lineStyle: value,
                        },
                      })
                    }
                  />
                </Collapse>
                <Collapse
                  child={{
                    header: '完成',
                    key: 'finish',
                  }}
                >
                  <Collapse
                    child={{
                      header: '文字',
                      key: 'textStyle',
                    }}
                  >
                    <FontConfigList
                      value={style.finish.textStyle}
                      onChange={(value) => {
                        this.onKeyChange('style', {
                          finish: {
                            textStyle: value,
                          },
                        });
                      }}
                    />
                  </Collapse>
                  <LineStyleGroupConfig
                    value={style.finish.lineStyle}
                    ignore={['type', 'width']}
                    onChange={(value) =>
                      this.onKeyChange('style', {
                        finish: {
                          lineStyle: value,
                        },
                      })
                    }
                  />
                </Collapse>
                <Collapse
                  child={{
                    header: '错误',
                    key: 'error',
                  }}
                >
                  <Collapse
                    child={{
                      header: '文字',
                      key: 'textStyle',
                    }}
                  >
                    <FontConfigList
                      value={style.error.textStyle}
                      onChange={(value) => {
                        this.onKeyChange('style', {
                          error: {
                            textStyle: value,
                          },
                        });
                      }}
                    />
                  </Collapse>
                  <LineStyleGroupConfig
                    value={style.error.lineStyle}
                    ignore={['type', 'width']}
                    onChange={(value) =>
                      this.onKeyChange('style', {
                        error: {
                          lineStyle: value,
                        },
                      })
                    }
                  />
                </Collapse>
              </ConfigList>
            ),
            key: '3',
          },
          {
            label: <Tab>交互</Tab>,
            children: (
              <ConfigList level={1}>
                <Item label="可点击">
                  <FullForm>
                    <Switch
                      checked={click.show}
                      onChange={(value) => {
                        this.onKeyChange('click', {
                          show: value,
                        });
                      }}
                    />
                  </FullForm>
                </Item>
                <Item label="初始索引">
                  <FullForm>
                    <InputNumber
                      min={0}
                      value={defaultCurrent}
                      onChange={this.onKeyChange.bind(this, 'defaultCurrent')}
                    />
                  </FullForm>
                </Item>
                <Collapse
                  child={{
                    header: '轮播',
                    key: 'carousel',
                    visibleRender: true,
                    value: carousel.show,
                    onChange: (value) => {
                      this.onKeyChange('carousel', {
                        show: value,
                      });
                    },
                  }}
                >
                  <Item label="循环">
                    <FullForm>
                      <Switch
                        checked={carousel.loop}
                        onChange={(value) => {
                          this.onKeyChange('carousel', {
                            loop: value,
                          });
                        }}
                      />
                    </FullForm>
                  </Item>
                  <Item label="速度">
                    <FullForm>
                      <InputNumber
                        value={carousel.speed}
                        onChange={(value) => {
                          this.onKeyChange('carousel', {
                            speed: value,
                          });
                        }}
                      />
                    </FullForm>
                  </Item>
                </Collapse>
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
