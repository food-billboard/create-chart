import { Component } from 'react';
import { Tabs } from 'antd';
import { merge } from 'lodash';
import ComponentOptionConfig, {
  Tab,
} from '@/components/ChartComponents/Common/ComponentOptionConfig';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import { FontConfigList } from '@/components/ChartComponents/Common/FontConfig';
import { CompatColorSelect } from '@/components/ColorSelect';
import InputNumber from '@/components/ChartComponents/Common/InputNumber';
import MultipleSeriesConfig from '@/components/ChartComponents/Common/MultipleSeriesConfig';
import HalfForm from '@/components/ChartComponents/Common/Structure/HalfForm';
import { SingleCollapse as Collapse } from '@/components/ChartComponents/Common/Collapse';
import TextAlignConfig from '@/components/ChartComponents/Common/TextAlignConfig';
import ThemeUtil from '@/utils/Assist/Theme';
import GlobalConfig from '@/utils/Assist/GlobalConfig';
import { TStateListConfig } from '../type';
import ConditionConfig from './Condition';

const { TabPane } = Tabs;
const { Item } = ConfigList;

class Config extends Component<
  ComponentData.ComponentConfigProps<TStateListConfig>
> {
  onKeyChange = (key: keyof TStateListConfig, value: any) => {
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
        options: {
          margin,
          count,
          column,
          textStyle,
          stateList,
          condition,
          align,
          padding,
        },
      },
    } = value;

    return (
      <ComponentOptionConfig>
        <TabPane key={'1'} tab={<Tab>样式</Tab>}>
          <ConfigList level={1}>
            <Item label="数量">
              <FullForm>
                <InputNumber
                  value={count}
                  min={1}
                  onChange={this.onKeyChange.bind(this, 'count')}
                />
              </FullForm>
            </Item>
            <Item label="单行数量">
              <FullForm>
                <InputNumber
                  value={column}
                  min={1}
                  onChange={this.onKeyChange.bind(this, 'column')}
                />
              </FullForm>
            </Item>
            <Item label="外间距">
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
            <Item label="内间距">
              <HalfForm label="上下">
                <InputNumber
                  value={padding[0]}
                  onChange={(value) => {
                    this.onKeyChange('padding', [value, padding[1]]);
                  }}
                />
              </HalfForm>
              <HalfForm label="左右">
                <InputNumber
                  value={padding[1]}
                  onChange={(value) => {
                    this.onKeyChange('padding', [padding[0], value]);
                  }}
                />
              </HalfForm>
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
            <MultipleSeriesConfig
              onAdd={() => {
                const newIndex = stateList.length;
                const newData = {
                  backgroundColor:
                    ThemeUtil.generateNextColor4CurrentTheme(newIndex),
                  borderRadius: [0, 0, 0, 0],
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
              max={GlobalConfig.getChartSeriesCounter('STATE_LIST')}
              renderContent={(index) => {
                const { backgroundColor, borderRadius } = stateList[index];
                return (
                  <>
                    <Item label="背景颜色">
                      <FullForm>
                        <CompatColorSelect
                          value={backgroundColor}
                          onChange={(value) => {
                            const newData = [...stateList];
                            newData.splice(
                              index,
                              1,
                              merge(newData[index], {
                                backgroundColor: value,
                              }),
                            );
                            this.onKeyChange('stateList', newData);
                          }}
                        />
                      </FullForm>
                    </Item>
                    <Item label="圆角">
                      <HalfForm label="上右">
                        <InputNumber
                          value={borderRadius[0]}
                          onChange={(value) => {
                            const newData = [...stateList];
                            newData.splice(
                              index,
                              1,
                              merge(newData[index], {
                                borderRadius: [
                                  value,
                                  borderRadius[1],
                                  borderRadius[2],
                                  borderRadius[3],
                                ],
                              }),
                            );
                            this.onKeyChange('stateList', newData);
                          }}
                        />
                      </HalfForm>
                      <HalfForm label="下右">
                        <InputNumber
                          value={borderRadius[1]}
                          onChange={(value) => {
                            const newData = [...stateList];
                            newData.splice(
                              index,
                              1,
                              merge(newData[index], {
                                borderRadius: [
                                  borderRadius[0],
                                  value,
                                  borderRadius[2],
                                  borderRadius[3],
                                ],
                              }),
                            );
                            this.onKeyChange('stateList', newData);
                          }}
                        />
                      </HalfForm>
                      <HalfForm label="下左">
                        <InputNumber
                          value={borderRadius[2]}
                          onChange={(value) => {
                            const newData = [...stateList];
                            newData.splice(
                              index,
                              1,
                              merge(newData[index], {
                                borderRadius: [
                                  borderRadius[0],
                                  borderRadius[1],
                                  value,
                                  borderRadius[3],
                                ],
                              }),
                            );
                            this.onKeyChange('stateList', newData);
                          }}
                        />
                      </HalfForm>
                      <HalfForm label="上左">
                        <InputNumber
                          value={borderRadius[3]}
                          onChange={(value) => {
                            const newData = [...stateList];
                            newData.splice(
                              index,
                              1,
                              merge(newData[index], {
                                borderRadius: [
                                  borderRadius[0],
                                  borderRadius[1],
                                  borderRadius[2],
                                  value,
                                ],
                              }),
                            );
                            this.onKeyChange('stateList', newData);
                          }}
                        />
                      </HalfForm>
                    </Item>
                  </>
                );
              }}
              buttonLabel="新增卡片"
              seriesLabel={(index) => {
                return `卡片${index + 1}`;
              }}
            />
          </ConfigList>
        </TabPane>
        <TabPane key={'2'} tab={<Tab>条件</Tab>}>
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
