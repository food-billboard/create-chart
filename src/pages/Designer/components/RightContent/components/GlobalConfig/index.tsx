import { useCallback } from 'react';
import { InputNumber, Input, Tabs } from 'antd';
import { connect } from 'dva';
import { set } from 'lodash';
import BackgroundSelect from '@/components/BackgroundSelect';
import Collapse from '@/pages/Designer/components/RightContent/components/Common/Collapse';
import HalfForm from '../Common/Structure/HalfForm';
import FullForm from '../Common/Structure/FullForm';
import ConfigList from '../Common/Structure/ConfigList';
import ComponentOptionConfig, { Tab } from '../Common/ComponentOptionConfig';
import { mapStateToProps, mapDispatchToProps } from './connect';

const { Item } = ConfigList;
const { TextArea } = Input;
const { TabPane } = Tabs;
const { Panel } = Collapse;

const GlobalConfig = (props: {
  screenData: ComponentData.TScreenData;
  setScreenData: (value: SuperPartial<ComponentData.TScreenData>) => void;
}) => {
  const { screenData, setScreenData } = props;

  const {
    config: {
      style: { width, height },
      attr: { poster },
    },
    description,
  } = screenData;

  const onValueChange = useCallback(
    (path: string, value: any) => {
      const newScreenData = {
        ...screenData,
      };
      let newValue = value;
      try {
        newValue = value.target.value;
      } catch (err) {}

      set(newScreenData, path, newValue);

      setScreenData(newScreenData);
    },
    [setScreenData, screenData],
  );

  return (
    <div>
      <ComponentOptionConfig>
        <TabPane key={'1'} tab={<Tab>2222</Tab>}>
          <ConfigList>
            <Collapse>
              <Panel header="2222" key="1">
                <Item
                  label="屏幕大小"
                  labelProps={{
                    level: 2,
                  }}
                >
                  <HalfForm label="宽度">
                    <InputNumber
                      defaultValue={width}
                      onBlur={onValueChange.bind(null, 'config.style.width')}
                    />
                  </HalfForm>
                  <HalfForm label="高度">
                    <InputNumber
                      defaultValue={height}
                      onBlur={onValueChange.bind(null, 'config.style.height')}
                    />
                  </HalfForm>
                </Item>
                <Collapse>
                  <Panel header="4444" key="2">
                    <Item
                      label="屏幕大小"
                      labelProps={{
                        level: 2,
                      }}
                    >
                      <HalfForm label="宽度">
                        <InputNumber
                          defaultValue={width}
                          onBlur={onValueChange.bind(
                            null,
                            'config.style.width',
                          )}
                        />
                      </HalfForm>
                      <HalfForm label="高度">
                        <InputNumber
                          defaultValue={height}
                          onBlur={onValueChange.bind(
                            null,
                            'config.style.height',
                          )}
                        />
                      </HalfForm>
                    </Item>
                  </Panel>
                </Collapse>
                <Item
                  label="屏幕大小"
                  labelProps={{
                    level: 2,
                  }}
                >
                  <HalfForm label="宽度">
                    <InputNumber
                      defaultValue={width}
                      onBlur={onValueChange.bind(null, 'config.style.width')}
                    />
                  </HalfForm>
                  <HalfForm label="高度">
                    <InputNumber
                      defaultValue={height}
                      onBlur={onValueChange.bind(null, 'config.style.height')}
                    />
                  </HalfForm>
                </Item>
              </Panel>
              <Panel header="4444" visibleRender key="2">
                4444
              </Panel>
            </Collapse>
            <Item label="屏幕大小">
              <HalfForm label="宽度">
                <InputNumber
                  defaultValue={width}
                  onBlur={onValueChange.bind(null, 'config.style.width')}
                />
              </HalfForm>
              <HalfForm label="高度">
                <InputNumber
                  defaultValue={height}
                  onBlur={onValueChange.bind(null, 'config.style.height')}
                />
              </HalfForm>
            </Item>
            <Item label="描述">
              <FullForm>
                <TextArea
                  defaultValue={description}
                  onBlur={onValueChange.bind(null, 'description')}
                />
              </FullForm>
            </Item>
            <Item label="背景">
              <FullForm>
                <BackgroundSelect
                  value={poster}
                  onChange={onValueChange.bind(null, 'config.attr.poster')}
                />
              </FullForm>
            </Item>
          </ConfigList>
        </TabPane>
        <TabPane key={'2'} tab={<Tab>2222</Tab>}>
          <Item label="描述">
            <FullForm>
              <TextArea
                defaultValue={description}
                onBlur={onValueChange.bind(null, 'description')}
              />
            </FullForm>
          </Item>
        </TabPane>
        <TabPane key={'3'} tab={<Tab>2222</Tab>}>
          <Item label="背景">
            <FullForm>
              <BackgroundSelect
                value={poster}
                onChange={onValueChange.bind(null, 'config.attr.poster')}
              />
            </FullForm>
          </Item>
        </TabPane>
      </ComponentOptionConfig>
      <ConfigList>
        <Item label="屏幕大小">
          <HalfForm label="宽度">
            <InputNumber
              defaultValue={width}
              onBlur={onValueChange.bind(null, 'config.style.width')}
            />
          </HalfForm>
          <HalfForm label="高度">
            <InputNumber
              defaultValue={height}
              onBlur={onValueChange.bind(null, 'config.style.height')}
            />
          </HalfForm>
        </Item>
        {/* <Item
          label='大屏名称'
        >
          <FullForm>
            <Input />
          </FullForm>
        </Item> */}
        <Item label="描述">
          <FullForm>
            <TextArea
              defaultValue={description}
              onBlur={onValueChange.bind(null, 'description')}
            />
          </FullForm>
        </Item>
        <Item label="背景">
          <FullForm>
            <BackgroundSelect
              value={poster}
              onChange={onValueChange.bind(null, 'config.attr.poster')}
            />
          </FullForm>
        </Item>
      </ConfigList>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(GlobalConfig);
