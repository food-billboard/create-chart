import { InfoCircleOutlined } from '@ant-design/icons';
import { Component } from 'react';
import ComponentOptionConfig, {
  Tab,
} from '@/components/ChartComponents/Common/ComponentOptionConfig';
import InputNumber from '@/components/ChartComponents/Common/InputNumber';
import LocalUpload, {
  MAX_FILE_SIZE,
} from '@/components/ChartComponents/Common/LocalUpload';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import { CompatColorSelect } from '@/components/ColorSelect';
import IconTooltip from '@/components/IconTooltip';
import { TFullScreenConfig } from '../type';

const { Item } = ConfigList;
class Config extends Component<
  ComponentData.ComponentConfigProps<TFullScreenConfig>
> {
  onKeyChange = (key: keyof TFullScreenConfig, value: any) => {
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
        options: { backgroundColor, icon, borderRadius },
      },
    } = value;

    return (
      <ComponentOptionConfig
        items={[
          {
            label: <Tab>基础样式</Tab>,
            children: (
              <ConfigList level={1}>
                <Item
                  label="全屏显示"
                  placeholder={
                    <IconTooltip
                      title={`尽量上传小一点的图片(${MAX_FILE_SIZE / 1024}KB)`}
                    >
                      <InfoCircleOutlined />
                    </IconTooltip>
                  }
                >
                  <FullForm>
                    <LocalUpload
                      value={icon.enter}
                      onChange={(value) => {
                        this.onKeyChange('icon', {
                          enter: value,
                        });
                      }}
                    />
                  </FullForm>
                </Item>
                <Item
                  label="退出全屏"
                  placeholder={
                    <IconTooltip
                      title={`尽量上传小一点的图片(${MAX_FILE_SIZE / 1024}KB)`}
                    >
                      <InfoCircleOutlined />
                    </IconTooltip>
                  }
                >
                  <FullForm>
                    <LocalUpload
                      value={icon.quit}
                      onChange={(value) => {
                        this.onKeyChange('icon', {
                          quit: value,
                        });
                      }}
                    />
                  </FullForm>
                </Item>
                <Item label="背景色">
                  <FullForm>
                    <CompatColorSelect
                      value={backgroundColor}
                      onChange={this.onKeyChange.bind(this, 'backgroundColor')}
                    />
                  </FullForm>
                </Item>
                <Item label="圆角(%)">
                  <FullForm>
                    <InputNumber
                      value={borderRadius}
                      onChange={this.onKeyChange.bind(this, 'borderRadius')}
                    />
                  </FullForm>
                </Item>
              </ConfigList>
            ),
            key: '1',
          },
        ]}
      />
    );
  }
}

export default Config;
