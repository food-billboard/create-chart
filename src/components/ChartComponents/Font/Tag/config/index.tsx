import { Component } from 'react';
import {
  InfoCircleOutlined,
  BorderLeftOutlined,
  BorderRightOutlined,
} from '@ant-design/icons';
import { merge } from 'lodash';
import ComponentOptionConfig, {
  Tab,
} from '@/components/ChartComponents/Common/ComponentOptionConfig';
import { CompatColorSelect } from '@/components/ColorSelect';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import RadioGroup, {
  Radio,
} from '@/components/ChartComponents/Common/IconRadio';
import { SingleCollapse as Collapse } from '@/components/ChartComponents/Common/Collapse';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import { FontConfigList } from '@/components/ChartComponents/Common/FontConfig';
import MultipleSeriesConfig from '@/components/ChartComponents/Common/MultipleSeriesConfig';
import InputNumber from '@/components/ChartComponents/Common/InputNumber';
import IconTooltip from '@/components/IconTooltip';
import ThemeUtil from '@/utils/Assist/Theme';
import GlobalConfig from '@/utils/Assist/GlobalConfig';
import BootstrapIconSelect from '@/components/ChartComponents/Common/BootstrapIconSelect';
import ConditionConfig from './Condition';
import { TTagConfig } from '../type';

const { Item } = ConfigList;

class Config extends Component<ComponentData.ComponentConfigProps<TTagConfig>> {
  onKeyChange = (key: keyof TTagConfig, value: any) => {
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
        data: { filter: { map = [] } = {} } = {},
        options: { margin, textStyle, icon, series, condition },
      },
    } = value;

    return (
      <ComponentOptionConfig
        items={[
          {
            label: <Tab>样式</Tab>,
            children: (
              <ConfigList level={1}>
                <Item label="间距">
                  <FullForm>
                    <InputNumber
                      className="w-100"
                      value={margin}
                      onChange={this.onKeyChange.bind(this, 'margin')}
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
                <Collapse
                  child={{
                    header: '图标',
                    key: 'icon',
                  }}
                >
                  <Item label="位置">
                    <FullForm>
                      <RadioGroup
                        value={icon.position}
                        onChange={(value) => {
                          this.onKeyChange('icon', {
                            position: value,
                          });
                        }}
                      >
                        <Radio
                          icon={<BorderLeftOutlined />}
                          value="start"
                        ></Radio>
                        <Radio
                          icon={<BorderRightOutlined />}
                          value="end"
                        ></Radio>
                      </RadioGroup>
                    </FullForm>
                  </Item>
                  <Item label="间距">
                    <FullForm>
                      <InputNumber
                        value={icon.margin}
                        onChange={(value) => {
                          this.onKeyChange('icon', {
                            margin: value,
                          });
                        }}
                      />
                    </FullForm>
                  </Item>
                </Collapse>
                <MultipleSeriesConfig
                  onAdd={() => {
                    const newIndex = series.length;
                    const newData = {
                      color: ThemeUtil.generateNextColor4CurrentTheme(newIndex),
                    };
                    const newDataList = [...series, newData];
                    this.onKeyChange('series', newDataList);
                  }}
                  onRemove={(index) => {
                    const newData = [...series];
                    newData.splice(index, 1);
                    this.onKeyChange('series', newData);
                  }}
                  counter={series.length}
                  max={GlobalConfig.getChartSeriesCounter('TAG')}
                  renderContent={(index) => {
                    const { color, icon } = series[index];
                    return (
                      <>
                        <BootstrapIconSelect
                          value={icon || ''}
                          onChange={(value) => {
                            const newData = [...series];
                            newData.splice(
                              index,
                              1,
                              merge(newData[index], {
                                icon: value,
                              }),
                            );
                            this.onKeyChange('series', newData);
                          }}
                        />
                        <Item
                          label="图标"
                          placeholder={
                            <IconTooltip title="与数据的value字段相关">
                              <InfoCircleOutlined />
                            </IconTooltip>
                          }
                        >
                          <FullForm>
                            <CompatColorSelect
                              value={color}
                              onChange={(value) => {
                                const newData = [...series];
                                newData.splice(
                                  index,
                                  1,
                                  merge(newData[index], {
                                    color: value,
                                  }),
                                );
                                this.onKeyChange('series', newData);
                              }}
                            />
                          </FullForm>
                        </Item>
                      </>
                    );
                  }}
                  buttonLabel="新增标签样式"
                  seriesLabel={(index) => {
                    return `标签${index + 1}`;
                  }}
                />
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
