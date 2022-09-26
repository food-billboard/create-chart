import { Component } from 'react';
import { Switch } from 'antd';
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
import ClipPathSelect from '@/components/ChartComponents/Common/ClipPathSelect';
import ThemeUtil from '@/utils/Assist/Theme';
import ConditionConfig from './Condition';
import { TImageConfig } from '../type';

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
      if (realValue.a && realValue.g && realValue.b) {
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
        options: { type, content, repeat, condition, preview, clipPath },
      },
    } = value;

    return (
      <ComponentOptionConfig
        items={[
          {
            label: <Tab>内容</Tab>,
            children: (
              <ConfigList level={1}>
                <Item label="类型">
                  <FullForm>
                    <RadioGroup value={type} onChange={this.onTypeChange}>
                      <Radio
                        icon={<PictureOutlined />}
                        key="image"
                        value="image"
                      />
                      <Radio
                        icon={<BgColorsOutlined />}
                        key="color"
                        value="color"
                      />
                    </RadioGroup>
                  </FullForm>
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
                        onChange={this.onContentChange}
                      />
                    )}
                    {type === 'image' && this.backgroundForm()}
                  </FullForm>
                </Item>
                <ClipPathSelect
                  value={clipPath}
                  onChange={this.onKeyChange.bind(this, 'clipPath')}
                />
                {type === 'image' && (
                  <>
                    <Item label="预览">
                      <FullForm>
                        <Switch
                          checked={preview.show}
                          onChange={(value) =>
                            this.onKeyChange('preview', {
                              show: value,
                            })
                          }
                        />
                      </FullForm>
                    </Item>
                    {/* <Collapse
                  child={{
                    header: '预览',
                    key: 'preview',
                    visibleRender: true,
                    value: preview.show,
                    onChange: value => {
                      this.onKeyChange('preview', {
                        show: value
                      })
                    }
                  }}
                >
                  <Item
                    label='放大比例'
                  >
                    <FullForm>
                      <InputNumber
                        value={preview.rate}
                        onChange={value => this.onKeyChange('preview', {
                          rate: value
                        })}
                      />
                    </FullForm>
                  </Item>
                </Collapse> */}
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
                  </>
                )}
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
