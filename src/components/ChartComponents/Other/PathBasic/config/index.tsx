import { InfoCircleOutlined } from '@ant-design/icons';
import { Switch } from 'antd';
import { Component } from 'react';
import { SingleCollapse as Collapse } from '@/components/ChartComponents/Common/Collapse';
import ComponentOptionConfig, {
  Tab,
} from '@/components/ChartComponents/Common/ComponentOptionConfig';
import Input from '@/components/ChartComponents/Common/Input';
import InputNumber from '@/components/ChartComponents/Common/InputNumber';
import LocalUpload from '@/components/ChartComponents/Common/LocalUpload';
import Select from '@/components/ChartComponents/Common/Select';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import ColorSelect from '@/components/ColorSelect';
import IconTooltip from '@/components/IconTooltip';
import { TPathBasicConfig } from '../type';
import ConditionConfig from './Condition';

const { Item } = ConfigList;
class Config extends Component<
  ComponentData.ComponentConfigProps<TPathBasicConfig>
> {
  onKeyChange = (key: keyof TPathBasicConfig, value: any) => {
    this.props.onChange({
      config: {
        options: {
          [key]: value,
        },
      },
    });
  };

  render() {
    const { value, onChange } = this.props;
    const {
      config: {
        options: { close, target, path, animation, condition },
      },
    } = value;

    return (
      <ComponentOptionConfig
        items={[
          {
            label: <Tab>全局样式</Tab>,
            children: (
              <ConfigList level={1}>
                <Item label="闭合">
                  <FullForm>
                    <Switch
                      checked={close}
                      onChange={this.onKeyChange.bind(this, 'close')}
                    />
                  </FullForm>
                </Item>
                <Item label="运动物体">
                  <FullForm>
                    <Select
                      className="w-100"
                      value={target.type}
                      onChange={(value) =>
                        this.onKeyChange('target', {
                          type: value,
                        })
                      }
                      options={[
                        {
                          label: '方形',
                          value: 'rect',
                        },
                        {
                          label: '圆',
                          value: 'circle',
                        },
                        {
                          label: '自定义图形',
                          value: 'custom',
                        },
                      ]}
                    />
                  </FullForm>
                </Item>
                {target.type === 'circle' && (
                  <>
                    <Item label="半径">
                      <FullForm>
                        <InputNumber
                          value={target.circle.radius}
                          onChange={(value) =>
                            this.onKeyChange('target', {
                              circle: {
                                radius: value,
                              },
                            })
                          }
                        />
                      </FullForm>
                    </Item>
                    <Item label="填充色">
                      <FullForm>
                        <ColorSelect
                          value={target.circle.color}
                          onChange={(value) =>
                            this.onKeyChange('target', {
                              circle: {
                                color: value,
                              },
                            })
                          }
                        />
                      </FullForm>
                    </Item>
                  </>
                )}
                {target.type === 'rect' && (
                  <>
                    <Item label="长">
                      <FullForm>
                        <InputNumber
                          value={target.rect.width}
                          onChange={(value) =>
                            this.onKeyChange('target', {
                              rect: {
                                width: value,
                              },
                            })
                          }
                        />
                      </FullForm>
                    </Item>
                    <Item label="宽">
                      <FullForm>
                        <InputNumber
                          value={target.rect.height}
                          onChange={(value) =>
                            this.onKeyChange('target', {
                              rect: {
                                height: value,
                              },
                            })
                          }
                        />
                      </FullForm>
                    </Item>
                    <Item label="填充色">
                      <FullForm>
                        <ColorSelect
                          value={target.rect.color}
                          onChange={(value) =>
                            this.onKeyChange('target', {
                              rect: {
                                color: value,
                              },
                            })
                          }
                        />
                      </FullForm>
                    </Item>
                  </>
                )}
                {target.type === 'custom' && (
                  <>
                    <Item label="图片">
                      <FullForm>
                        <LocalUpload
                          value={target.custom.value}
                          onChange={(value) => {
                            this.onKeyChange('target', {
                              custom: {
                                value,
                              },
                            });
                          }}
                        />
                      </FullForm>
                    </Item>
                    <Item label="长">
                      <FullForm>
                        <InputNumber
                          value={target.custom.width}
                          onChange={(value) =>
                            this.onKeyChange('target', {
                              custom: {
                                width: value,
                              },
                            })
                          }
                        />
                      </FullForm>
                    </Item>
                    <Item label="宽">
                      <FullForm>
                        <InputNumber
                          value={target.custom.height}
                          onChange={(value) =>
                            this.onKeyChange('target', {
                              custom: {
                                height: value,
                              },
                            })
                          }
                        />
                      </FullForm>
                    </Item>
                  </>
                )}
                <Item label="运动类型">
                  <FullForm>
                    <Select
                      className="w-100"
                      value={animation.type}
                      onChange={(value) =>
                        this.onKeyChange('animation', {
                          type: value,
                        })
                      }
                      options={[
                        {
                          label: '单向运动',
                          value: 'to',
                        },
                        {
                          label: '逆单向运动',
                          value: 'from',
                        },
                        {
                          label: '往返运动',
                          value: 'to-from',
                        },
                        {
                          label: '逆往返运动',
                          value: 'from-to',
                        },
                      ]}
                    />
                  </FullForm>
                </Item>
                <Item label="动画时间">
                  <FullForm>
                    <InputNumber
                      value={animation.speed}
                      onChange={(value) =>
                        this.onKeyChange('animation', {
                          speed: value,
                        })
                      }
                    />
                  </FullForm>
                </Item>
                <Item label="自动旋转">
                  <FullForm>
                    <Switch
                      checked={animation.autoRotate}
                      onChange={(value) =>
                        this.onKeyChange('animation', {
                          autoRotate: value,
                        })
                      }
                    />
                  </FullForm>
                </Item>
                <Item label="速度曲线">
                  <FullForm>
                    <Select
                      className="w-100"
                      value={animation.moveType}
                      onChange={(value) =>
                        this.onKeyChange('animation', {
                          moveType: value,
                        })
                      }
                      options={[
                        {
                          label: '匀速',
                          value: 'linear',
                        },
                        {
                          label: '低速开始和结束',
                          value: 'easeInOutCubic',
                        },
                        {
                          label: '低速开始',
                          value: 'easeInSine',
                        },
                        {
                          label: '低速结束',
                          value: 'easeOutSine',
                        },
                        {
                          label: '先加速后减速',
                          value: 'easeInQuad',
                        },
                      ]}
                    />
                  </FullForm>
                </Item>
                <Item label="透明度变化">
                  <FullForm>
                    <Select
                      className="w-100"
                      value={animation.opacity}
                      onChange={(value) =>
                        this.onKeyChange('animation', {
                          opacity: value,
                        })
                      }
                      options={[
                        {
                          label: '无',
                          value: 'none',
                        },
                        {
                          label: '从0到1',
                          value: '0-1',
                        },
                        {
                          label: '从1到0',
                          value: '1-0',
                        },
                        {
                          label: '从0到1再到0',
                          value: '0-1-0',
                        },
                        {
                          label: '从1到0再到1',
                          value: '1-0-1',
                        },
                      ]}
                    />
                  </FullForm>
                </Item>
                <Collapse
                  child={{
                    header: '路径',
                    key: 'path',
                    visibleRender: true,
                    value: path.show,
                    onChange: (value) => {
                      this.onKeyChange('path', {
                        show: value,
                      });
                    },
                  }}
                >
                  <Item label="路径形式">
                    <FullForm>
                      <Select
                        className="w-100"
                        value={path.line}
                        onChange={(value) =>
                          this.onKeyChange('path', {
                            line: value,
                          })
                        }
                        options={[
                          {
                            label: '实线',
                            value: 'solid',
                          },
                          {
                            label: '虚线',
                            value: 'dashed',
                          },
                        ]}
                      />
                    </FullForm>
                  </Item>
                  {path.line === 'dashed' && (
                    <Item
                      label="虚线尺寸"
                      placeholder={
                        <IconTooltip
                          title={
                            <>
                              详细写法查看：
                              <a
                                className="underline-anime underline-anime-color-white"
                                target="_blank"
                                href="https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/stroke-dasharray"
                              >
                                这里
                              </a>
                            </>
                          }
                        >
                          <InfoCircleOutlined />
                        </IconTooltip>
                      }
                    >
                      <FullForm>
                        <Input
                          value={path.dashedValue}
                          onChange={(value) =>
                            this.onKeyChange('path', {
                              dashedValue: value,
                            })
                          }
                        />
                      </FullForm>
                    </Item>
                  )}
                  <Item label="宽度">
                    <FullForm>
                      <InputNumber
                        value={path.width}
                        onChange={(value) =>
                          this.onKeyChange('path', {
                            width: value,
                          })
                        }
                      />
                    </FullForm>
                  </Item>
                  <Item label="颜色">
                    <FullForm>
                      <ColorSelect
                        value={path.color}
                        onChange={(value) =>
                          this.onKeyChange('path', {
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
            label: <Tab>条件</Tab>,
            children: (
              <ConfigList level={1}>
                <ConditionConfig value={condition} onChange={onChange} />
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
