import { Component } from 'react';
import { Tabs } from 'antd';
import ComponentOptionConfig, {
  Tab,
} from '@/components/ChartComponents/Common/ComponentOptionConfig';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import InputNumber from '@/components/ChartComponents/Common/InputNumber';
import { CompatColorSelect } from '@/components/ColorSelect';
import { SingleCollapse as Collapse } from '@/components/ChartComponents/Common/Collapse';
import { TModelConfig } from '../type';

const { TabPane } = Tabs;
const { Item } = ConfigList;

class Config extends Component<
  ComponentData.ComponentConfigProps<TModelConfig>
> {
  onKeyChange = (key: keyof TModelConfig, value: any) => {
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
        options: { position, focus, scale, color, rotate },
      },
    } = value;

    return (
      <ComponentOptionConfig>
        <TabPane key={'1'} tab={<Tab>相机</Tab>}>
          <ConfigList level={1}>
            <Item label="位置">
              <FullForm label="x">
                <InputNumber
                  value={position.x}
                  onChange={(value) =>
                    this.onKeyChange('position', { ...position, x: value })
                  }
                />
              </FullForm>
              <FullForm label="y">
                <InputNumber
                  value={position.y}
                  onChange={(value) =>
                    this.onKeyChange('position', { ...position, y: value })
                  }
                />
              </FullForm>
              <FullForm label="z">
                <InputNumber
                  value={position.z}
                  onChange={(value) =>
                    this.onKeyChange('position', { ...position, z: value })
                  }
                />
              </FullForm>
            </Item>
            <Item label="聚焦">
              <FullForm label="x">
                <InputNumber
                  value={focus.x}
                  onChange={(value) =>
                    this.onKeyChange('focus', { ...focus, x: value })
                  }
                />
              </FullForm>
              <FullForm label="y">
                <InputNumber
                  value={focus.y}
                  onChange={(value) =>
                    this.onKeyChange('focus', { ...focus, y: value })
                  }
                />
              </FullForm>
              <FullForm label="z">
                <InputNumber
                  value={focus.z}
                  onChange={(value) =>
                    this.onKeyChange('focus', { ...focus, z: value })
                  }
                />
              </FullForm>
            </Item>
          </ConfigList>
        </TabPane>
        <TabPane key={'2'} tab={<Tab>相机</Tab>}>
          <ConfigList level={1}>
            <Item label="缩放">
              <FullForm>
                <InputNumber
                  value={scale}
                  onChange={this.onKeyChange.bind(this, 'scale')}
                />
              </FullForm>
            </Item>
            <Item label="循环播放">
              <FullForm>
                <CompatColorSelect
                  value={color}
                  onChange={this.onKeyChange.bind(this, 'color')}
                />
              </FullForm>
            </Item>
            <Collapse
              child={{
                header: '旋转',
                key: 'rotate',
                visibleRender: true,
                onChange: (value) =>
                  this.onKeyChange('rotate', {
                    show: value,
                    speed: rotate.speed,
                  }),
                value: rotate.show,
              }}
              parent={{
                activeKey: ['rotate'],
              }}
            >
              <Item label="速度">
                <FullForm>
                  <InputNumber
                    value={rotate.speed}
                    onChange={(value) =>
                      this.onKeyChange('rotate', {
                        show: rotate.show,
                        speed: value,
                      })
                    }
                  />
                </FullForm>
              </Item>
            </Collapse>
          </ConfigList>
        </TabPane>
      </ComponentOptionConfig>
    );
  }
}

export default Config;
