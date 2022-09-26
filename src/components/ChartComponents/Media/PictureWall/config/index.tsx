import { Component } from 'react';
import { Switch } from 'antd';
import ComponentOptionConfig, {
  Tab,
} from '@/components/ChartComponents/Common/ComponentOptionConfig';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import InputNumber from '@/components/ChartComponents/Common/InputNumber';
import { TPictureWallConfig } from '../type';
import HalfForm from '@/components/ChartComponents/Common/Structure/HalfForm';

const { Item } = ConfigList;
class Config extends Component<
  ComponentData.ComponentConfigProps<TPictureWallConfig>
> {
  onKeyChange = (key: keyof TPictureWallConfig, value: any) => {
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
        options: { margin, maxCount, columnCount, preview },
      },
    } = value;

    return (
      <ComponentOptionConfig
        items={[
          {
            label: <Tab>样式</Tab>,
            children: (
              <ConfigList level={1}>
                <Item label="图片数量">
                  <FullForm>
                    <InputNumber
                      value={maxCount}
                      min={1}
                      onChange={this.onKeyChange.bind(this, 'maxCount')}
                    />
                  </FullForm>
                </Item>
                <Item label="单行图片数">
                  <FullForm>
                    <InputNumber
                      value={columnCount}
                      min={1}
                      onChange={this.onKeyChange.bind(this, 'columnCount')}
                    />
                  </FullForm>
                </Item>
                <Item label="间距">
                  <HalfForm label="水平">
                    <InputNumber
                      value={margin[0]}
                      onChange={(value) => {
                        this.onKeyChange('margin', [value, margin[1]]);
                      }}
                    />
                  </HalfForm>
                  <HalfForm label="垂直">
                    <InputNumber
                      value={margin[1]}
                      onChange={(value) => {
                        this.onKeyChange('margin', [margin[0], value]);
                      }}
                    />
                  </HalfForm>
                </Item>
                <Item label="预览">
                  <FullForm>
                    <Switch
                      checked={preview.show}
                      onChange={(value) => {
                        this.onKeyChange('preview', {
                          show: value,
                        });
                      }}
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
