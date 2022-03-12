import { Component } from 'react';
import { Tabs, Switch } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import {
  InfoCircleOutlined,
  PictureOutlined,
  BgColorsOutlined,
} from '@ant-design/icons';
import ComponentOptionConfig, {
  Tab,
} from '@/components/ChartComponents/Common/ComponentOptionConfig';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import ColorSelect, { CompatColorSelect } from '@/components/ColorSelect';
import IconTooltip from '@/components/IconTooltip';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import RadioGroup, {
  Radio,
} from '@/components/ChartComponents/Common/IconRadio';
import ImageUpload from '@/components/ImageUpload';
import HalfForm from '@/components/ChartComponents/Common/Structure/HalfForm';
import ThemeUtil from '@/utils/Assist/Theme';
import { TImageConfig } from '../type';

const { TabPane } = Tabs;
const { Item } = ConfigList;

const { getRgbaString } = ColorSelect;

class Config extends Component<
  ComponentData.ComponentConfigProps<TImageConfig>
> {
  onKeyChange = (key: keyof TImageConfig, value: any) => {
    this.props.onChange({
      config: {
        options: {
          [key]: value,
        },
      },
    });
  };

  onTypeChange = (value: any) => {
    if (value === 'image') {
      this.onContentChange('');
    } else {
      this.onContentChange(ThemeUtil.generateNextColor4CurrentTheme(0));
    }
    this.onKeyChange('type', value);
  };

  onContentChange = (value: any) => {
    this.onKeyChange('content', value);
    let realValue = value;
    // 上传失败或者是图片，修改静态数据
    if (typeof realValue !== 'string') {
      // 颜色
      if (realValue.a && realValue.b && realValue.c) {
        realValue = getRgbaString(realValue);
      } else {
        realValue = '';
      }
    }
    this.props.onChange({
      config: {
        data: {
          request: {
            value: {
              value: realValue,
            },
          },
        },
      },
    });
  };

  onBackgroundChange: any = (fileList: UploadFile<any>[]) => {
    const [target] = fileList;
    let realValue: any;
    if (!target) {
      realValue = '';
    } else {
      realValue = target.status === 'done' ? target.url : target;
    }
    this.onContentChange(realValue);
  };

  backgroundForm = () => {
    const { value } = this.props;
    const {
      config: {
        options: { content },
      },
    } = value;
    const realValue: any =
      typeof content === 'string' && !!content
        ? [{ url: content, uid: '-1', name: 'background', status: 'done' }]
        : [];
    return (
      <ImageUpload
        defaultFileList={realValue}
        onChange={this.onBackgroundChange}
      />
    );
  };

  render() {
    const { value } = this.props;
    const {
      config: {
        options: { type, content, repeat },
      },
    } = value;

    return (
      <ComponentOptionConfig>
        <TabPane key={'1'} tab={<Tab>内容</Tab>}>
          <ConfigList level={1}>
            <Item label="类型">
              <RadioGroup value={type} onChange={this.onTypeChange}>
                <Radio icon={<PictureOutlined />} key="image" value="image" />
                <Radio icon={<BgColorsOutlined />} key="color" value="color" />
              </RadioGroup>
            </Item>
            <Item
              label={type === 'color' ? '颜色' : '图片'}
              placeholder={
                <IconTooltip title="数据配置会影响到这里的配置">
                  <InfoCircleOutlined />
                </IconTooltip>
              }
            >
              <FullForm>
                {type === 'color' && (
                  <CompatColorSelect
                    value={content as ComponentData.TColorConfig}
                    onChange={this.onKeyChange.bind(this, 'content')}
                  />
                )}
                {type === 'image' && this.backgroundForm()}
              </FullForm>
            </Item>
            {type === 'image' && (
              <Item label="重复">
                <HalfForm label="x">
                  <Switch
                    checked={repeat.x}
                    onChange={(value) => {
                      this.onKeyChange('repeat', {
                        x: value,
                      });
                    }}
                  />
                </HalfForm>
                <HalfForm label="y">
                  <Switch
                    checked={repeat.y}
                    onChange={(value) => {
                      this.onKeyChange('repeat', {
                        y: value,
                      });
                    }}
                  />
                </HalfForm>
              </Item>
            )}
          </ConfigList>
        </TabPane>
      </ComponentOptionConfig>
    );
  }
}

export default Config;
