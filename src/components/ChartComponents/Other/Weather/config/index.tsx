import { InfoCircleOutlined } from '@ant-design/icons';
import { Switch } from 'antd';
import { merge } from 'lodash';
import { Component } from 'react';
import BootstrapIconSelect from '@/components/ChartComponents/Common/BootstrapIconSelect';
import { SingleCollapse as Collapse } from '@/components/ChartComponents/Common/Collapse';
import ComponentOptionConfig, {
  Tab,
} from '@/components/ChartComponents/Common/ComponentOptionConfig';
import { FontConfigList } from '@/components/ChartComponents/Common/FontConfig';
import MultipleSeriesConfig from '@/components/ChartComponents/Common/MultipleSeriesConfig';
import Select from '@/components/ChartComponents/Common/Select';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import TextAlignConfig from '@/components/ChartComponents/Common/TextAlignConfig';
import ColorSelect from '@/components/ColorSelect';
import IconTooltip from '@/components/IconTooltip';
import { KEY_MAP } from '../defaultConfig';
import { TWeatherConfig } from '../type';

const { Item } = ConfigList;

class Config extends Component<
  ComponentData.ComponentConfigProps<TWeatherConfig>
> {
  onKeyChange = (key: keyof TWeatherConfig, value: any) => {
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
        options: { show, textStyle, widMap, align },
      },
    } = value;

    return (
      <ComponentOptionConfig
        items={[
          {
            label: <Tab>样式</Tab>,
            children: (
              <ConfigList level={1}>
                <Item
                  label="显示内容"
                  placeholder={
                    <IconTooltip title="选择顺序影响显示顺序">
                      <InfoCircleOutlined />
                    </IconTooltip>
                  }
                >
                  <FullForm>
                    <Select
                      className="w-100"
                      value={show}
                      mode="multiple"
                      onChange={this.onKeyChange.bind(this, 'show')}
                      options={Object.entries(KEY_MAP).map((item) => {
                        const [value, label] = item;
                        return {
                          label,
                          value,
                        };
                      })}
                    />
                  </FullForm>
                </Item>
                <Collapse
                  child={{
                    header: '文字样式',
                    key: 'textStyle',
                  }}
                >
                  <FontConfigList
                    value={textStyle}
                    onChange={this.onKeyChange.bind(this, 'textStyle')}
                  />
                </Collapse>
                <TextAlignConfig
                  value={align}
                  onChange={this.onKeyChange.bind(this, 'align')}
                />
                <Item label="天气图标">
                  <FullForm>
                    <Switch
                      checked={widMap.show}
                      onChange={(e) => {
                        this.props.onChange({
                          config: {
                            options: {
                              widMap: {
                                show: e,
                              },
                            },
                          },
                        });
                      }}
                    />
                  </FullForm>
                </Item>
                {widMap.show && (
                  <MultipleSeriesConfig
                    disabledCal
                    onAdd={() => {}}
                    onRemove={(index) => {}}
                    counter={widMap.value.length}
                    max={widMap.value.length}
                    renderContent={(index) => {
                      const { icon, color } = widMap.value[index];
                      return (
                        <>
                          <Item label="颜色">
                            <FullForm>
                              <ColorSelect
                                value={color}
                                onChange={(value) => {
                                  const newData = [...widMap.value];
                                  newData.splice(
                                    index,
                                    1,
                                    merge(newData[index], {
                                      backgroundColor: value,
                                    }),
                                  );
                                  this.onKeyChange('widMap', {
                                    ...widMap,
                                    value: newData,
                                  });
                                }}
                              />
                            </FullForm>
                          </Item>
                          <BootstrapIconSelect
                            value={icon!}
                            onChange={(value) => {
                              const newData = [...widMap.value];
                              newData.splice(
                                index,
                                1,
                                merge(newData[index], {
                                  icon: value,
                                }),
                              );
                              this.onKeyChange('widMap', {
                                ...widMap,
                                value: newData,
                              });
                            }}
                          />
                        </>
                      );
                    }}
                    seriesLabel={(index) => {
                      return widMap.value[index].weather || '天气';
                    }}
                  />
                )}
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
