import { InfoCircleOutlined } from '@ant-design/icons';
import { Component } from 'react';
import { SingleCollapse as Collapse } from '@/components/ChartComponents/Common/Collapse';
import ComponentOptionConfig, {
  Tab,
} from '@/components/ChartComponents/Common/ComponentOptionConfig';
import InputNumber from '@/components/ChartComponents/Common/InputNumber';
import LineStyleGroupConfig from '@/components/ChartComponents/Common/LineStyleGroupConfig';
import LocalUpload from '@/components/ChartComponents/Common/LocalUpload';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import HalfForm from '@/components/ChartComponents/Common/Structure/HalfForm';
import ColorSelect from '@/components/ColorSelect';
import IconTooltip from '@/components/IconTooltip';
import { TQrCodeConfig } from '../type';
import ConditionConfig from './Condition';

const { Item } = ConfigList;
class Config extends Component<
  ComponentData.ComponentConfigProps<TQrCodeConfig>
> {
  onKeyChange = (key: keyof TQrCodeConfig, value: any) => {
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
        options: { condition, logo, base },
      },
    } = value;

    return (
      <ComponentOptionConfig
        items={[
          {
            label: <Tab>全局样式</Tab>,
            children: (
              <ConfigList level={1}>
                <Item
                  label="二维码颜色"
                  placeholder={
                    <IconTooltip title="颜色需要比背景颜色深">
                      <InfoCircleOutlined />
                    </IconTooltip>
                  }
                >
                  <FullForm>
                    <ColorSelect
                      value={base.codeColor}
                      onChange={(value) => {
                        this.onKeyChange('base', {
                          codeColor: value,
                        });
                      }}
                    />
                  </FullForm>
                </Item>
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
                <Item label="外边距">
                  <FullForm>
                    <InputNumber
                      value={base.margin}
                      onChange={(value) => {
                        this.onKeyChange('base', {
                          margin: value,
                        });
                      }}
                    />
                  </FullForm>
                </Item>
                <Collapse
                  child={{
                    header: 'logo',
                    key: 'logo',
                    visibleRender: true,
                    value: logo.show,
                    onChange: (value) => {
                      this.onKeyChange('logo', {
                        show: value,
                      });
                    },
                  }}
                  parent={{
                    activeKey: ['logo'],
                  }}
                >
                  <Item label="图形">
                    <FullForm>
                      <LocalUpload
                        value={logo.image}
                        onChange={(value) => {
                          this.onKeyChange('logo', {
                            image: value,
                          });
                        }}
                      />
                    </FullForm>
                  </Item>
                  <Item
                    label="图片尺寸"
                    placeholder={
                      <IconTooltip title="尺寸过大可能会影响扫码">
                        <InfoCircleOutlined />
                      </IconTooltip>
                    }
                  >
                    <HalfForm label="宽度">
                      <InputNumber
                        value={logo.size.width}
                        onChange={(value) => {
                          this.onKeyChange('logo', {
                            size: {
                              width: value,
                            },
                          });
                        }}
                      />
                    </HalfForm>
                    <HalfForm label="高度">
                      <InputNumber
                        value={logo.size.height}
                        onChange={(value) => {
                          this.onKeyChange('logo', {
                            size: {
                              height: value,
                            },
                          });
                        }}
                      />
                    </HalfForm>
                  </Item>
                  <Item label="圆角">
                    <FullForm>
                      <InputNumber
                        value={logo.borderRadius}
                        onChange={(value) => {
                          this.onKeyChange('logo', {
                            borderRadius: value,
                          });
                        }}
                      />
                    </FullForm>
                  </Item>
                  <LineStyleGroupConfig
                    value={logo.border}
                    onChange={(value) => {
                      this.onKeyChange('logo', {
                        border: value,
                      });
                    }}
                  />
                </Collapse>
              </ConfigList>
            ),
            key: '1',
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
            key: '2',
          },
        ]}
      />
    );
  }
}

export default Config;
