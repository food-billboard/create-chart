import { Component } from 'react';
import { Tabs } from 'antd';
import {
  InfoCircleOutlined,
  PicLeftOutlined,
  PicRightOutlined,
} from '@ant-design/icons';
import { merge } from 'lodash';
import ComponentOptionConfig, {
  Tab,
} from '@/components/ChartComponents/Common/ComponentOptionConfig';
import { CompatColorSelect } from '@/components/ColorSelect';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import IconRadio, {
  Radio,
} from '@/components/ChartComponents/Common/IconRadio';
import { SingleCollapse as Collapse } from '@/components/ChartComponents/Common/Collapse';
import Input from '@/components/ChartComponents/Common/Input';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import { FontConfigList } from '@/components/ChartComponents/Common/FontConfig';
import MultipleSeriesConfig from '@/components/ChartComponents/Common/MultipleSeriesConfig';
import MaxMinConfig from '@/components/ChartComponents/Common/MaxMinConfig';
import InputNumber from '@/components/ChartComponents/Common/InputNumber';
import IconTooltip from '@/components/IconTooltip';
import AngleSelect from '@/components/ChartComponents/Common/AngleSelect';
import ThemeUtil from '@/utils/Assist/Theme';
import ConditionConfig from './Condition';
import { TStateCardConfig } from '../type';

const { TabPane } = Tabs;
const { Item } = ConfigList;

class Config extends Component<
  ComponentData.ComponentConfigProps<TStateCardConfig>
> {
  onKeyChange = (key: keyof TStateCardConfig, value: any) => {
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
        options: { margin, textStyle, stateIcon, stateList, condition },
      },
    } = value;

    return (
      <ComponentOptionConfig>
        <TabPane key={'1'} tab={<Tab>全局样式</Tab>}>
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
          </ConfigList>
        </TabPane>
        <TabPane key={'2'} tab={<Tab>状态</Tab>}>
          <ConfigList level={1}>
            <MultipleSeriesConfig
              onAdd={() => {
                const newIndex = stateList.length;
                const newData = {
                  value: newIndex,
                  stateIcon: {
                    color: ThemeUtil.generateNextColor4CurrentTheme(newIndex),
                  },
                };
                const newDataList = [...stateList, newData];
                this.onKeyChange('stateList', newDataList);
              }}
              onRemove={(index) => {
                const newData = [...stateList];
                newData.splice(index, 1);
                this.onKeyChange('stateList', newData);
              }}
              counter={stateList.length}
              max={10}
              renderContent={(index) => {
                const { value, stateIcon } = stateList[index];
                return (
                  <>
                    <Item
                      label="状态值"
                      placeholder={
                        <IconTooltip title="与数据的value字段相关">
                          <InfoCircleOutlined />
                        </IconTooltip>
                      }
                    >
                      <FullForm>
                        <Input
                          className="w-100"
                          value={value}
                          onChange={(value) => {
                            const newData = [...stateList];
                            newData.splice(
                              index,
                              1,
                              merge(newData[index], {
                                value,
                              }),
                            );
                            this.onKeyChange('stateList', newData);
                          }}
                        />
                      </FullForm>
                    </Item>
                    <Collapse
                      child={{
                        header: '圆点',
                        key: 'stateIcon',
                      }}
                    >
                      <Item label="颜色">
                        <FullForm>
                          <CompatColorSelect
                            value={stateIcon.color}
                            onChange={(value) => {
                              const newData = [...stateList];
                              newData.splice(
                                index,
                                1,
                                merge(newData[index], {
                                  stateIcon: {
                                    color: value,
                                  },
                                }),
                              );
                              this.onKeyChange('stateList', newData);
                            }}
                          />
                        </FullForm>
                      </Item>
                    </Collapse>
                  </>
                );
              }}
              buttonLabel="新增状态"
              seriesLabel={(index) => {
                return `状态${index + 1}`;
              }}
            />
          </ConfigList>
        </TabPane>
        <TabPane key={'3'} tab={<Tab>圆点</Tab>}>
          <ConfigList level={1}>
            <MaxMinConfig
              value={{
                max: stateIcon.size[1],
                min: stateIcon.size[0],
              }}
              onChange={(value) => {
                this.onKeyChange('stateIcon', {
                  size: [value.min, value.max],
                });
              }}
              subLabel={['宽', '高']}
            />
            <Item label="位置">
              <FullForm>
                <IconRadio
                  value={stateIcon.position}
                  onChange={(value) => {
                    this.onKeyChange('stateIcon', {
                      position: value,
                    });
                  }}
                >
                  <Radio value={'start'} icon={<PicLeftOutlined />} />
                  <Radio value={'end'} icon={<PicRightOutlined />} />
                </IconRadio>
              </FullForm>
            </Item>
            <Item label="圆角">
              <FullForm>
                <InputNumber
                  value={stateIcon.borderRadius}
                  onChange={(value) => {
                    this.onKeyChange('stateIcon', {
                      borderRadius: value,
                    });
                  }}
                />
              </FullForm>
            </Item>
            <Item label="旋转">
              <FullForm>
                <AngleSelect
                  value={stateIcon.rotate}
                  onChange={(value) => {
                    this.onKeyChange('stateIcon', {
                      rotate: value,
                    });
                  }}
                />
              </FullForm>
            </Item>
            <Item label="间距">
              <FullForm>
                <InputNumber
                  value={stateIcon.margin}
                  onChange={(value) => {
                    this.onKeyChange('stateIcon', {
                      margin: value,
                    });
                  }}
                />
              </FullForm>
            </Item>
          </ConfigList>
        </TabPane>
        <TabPane key="5" tab={<Tab>条件</Tab>}>
          <ConfigList level={1}>
            <ConditionConfig
              value={condition}
              onChange={this.onKeyChange.bind(null, 'condition')}
            />
          </ConfigList>
        </TabPane>
      </ComponentOptionConfig>
    );
  }
}

export default Config;
