import { Component } from 'react';
import { Tabs, Switch, Select } from 'antd';
import ComponentOptionConfig, {
  Tab,
} from '@/components/ChartComponents/Common/ComponentOptionConfig';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import { SingleCollapse as Collapse } from '@/components/ChartComponents/Common/Collapse';
import InputNumber from '@/components/ChartComponents/Common/InputNumber';
import { CompatColorSelect } from '@/components/ColorSelect';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import ConditionConfig from './Condition';
import { TPathBasicConfig } from '../type';

const { TabPane } = Tabs;
const { Item } = ConfigList;

class Config extends Component<
  ComponentData.ComponentConfigProps<TPathBasicConfig>
> {
  render() {
    const { value, onChange } = this.props;
    const {
      config: {
        options: { close, target, path, animation, condition },
      },
    } = value;

    return (
      <ComponentOptionConfig>
        <TabPane key={'1'} tab={<Tab>全局样式</Tab>}>
          <ConfigList level={1}>
            <Item label="闭合">
              <FullForm>
                <Switch checked={close} />
              </FullForm>
            </Item>
            <Item label="运动物体">
              <FullForm>
                <Select
                  className="w-100"
                  value={target.type}
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
                    <InputNumber value={target.circle.radius} />
                  </FullForm>
                </Item>
                <Item label="填充色">
                  <FullForm>
                    <CompatColorSelect value={target.circle.color} />
                  </FullForm>
                </Item>
              </>
            )}
            {target.type === 'rect' && (
              <>
                <Item label="长">
                  <FullForm>
                    <InputNumber value={target.rect.width} />
                  </FullForm>
                </Item>
                <Item label="宽">
                  <FullForm>
                    <InputNumber value={target.rect.height} />
                  </FullForm>
                </Item>
                <Item label="填充色">
                  <FullForm>
                    <CompatColorSelect value={target.rect.color} />
                  </FullForm>
                </Item>
              </>
            )}
            {target.type === 'custom' && (
              <>
                <Item label="图片">
                  <FullForm>图片上传</FullForm>
                </Item>
                <Item label="长">
                  <FullForm>
                    <InputNumber value={target.custom.width} />
                  </FullForm>
                </Item>
                <Item label="宽">
                  <FullForm>
                    <InputNumber value={target.custom.height} />
                  </FullForm>
                </Item>
              </>
            )}
            <Item label="运动类型">
              <FullForm>
                <Select
                  className="w-100"
                  value={animation.type}
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
                <InputNumber value={animation.speed} />
              </FullForm>
            </Item>
            <Item label="自动旋转">
              <FullForm>
                <Switch checked={animation.autoRotate} />
              </FullForm>
            </Item>
            <Item label="速度曲线">
              <FullForm>
                <Select
                  className="w-100"
                  value={animation.moveType}
                  options={[
                    {
                      label: '匀速',
                      value: 'linear',
                    },
                    {
                      label: '低速开始和结束',
                      value: 'ease-in-out',
                    },
                    {
                      label: '低速开始',
                      value: 'ease-in',
                    },
                    {
                      label: '低速结束',
                      value: 'ease-out',
                    },
                    {
                      label: '先加速后减速',
                      value: 'ease',
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
                onChange: (value) => {},
              }}
            >
              <Item label="路径形式">
                <FullForm>
                  <Select
                    className="w-100"
                    value={path.line}
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
              <Item label="宽度">
                <FullForm>
                  <InputNumber value={path.width} />
                </FullForm>
              </Item>
              <Item label="颜色">
                <FullForm>
                  <CompatColorSelect value={path.color} />
                </FullForm>
              </Item>
            </Collapse>
          </ConfigList>
        </TabPane>
        <TabPane key="2" tab={<Tab>条件</Tab>}>
          <ConfigList level={1}>
            <ConditionConfig value={condition} onChange={onChange} />
          </ConfigList>
        </TabPane>
      </ComponentOptionConfig>
    );
  }
}

export default Config;
