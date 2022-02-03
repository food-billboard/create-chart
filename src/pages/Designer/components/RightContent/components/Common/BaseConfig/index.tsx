import React from 'react';
import { InputNumber, Tabs } from 'antd';
import ConfigList from '../Structure/ConfigList';
import Opacity from '../Opacity';

import ComponentOptionConfig, { Tab } from '../ComponentOptionConfig';
import CollapseA, { SingleCollapse as Collapse } from '../Collapse';
import FullForm from '../Structure/FullForm';
import FontConfig, { FontConfigList } from '../FontConfig';
import HalfForm from '../Structure/HalfForm';
import { PositionConfig } from '../PositionConfig';

const { Item } = ConfigList;
const { TabPane } = Tabs;

// 基础的组件配置

const BaseConfig = (props: ComponentData.TBaseConfig['style'] & {}) => {
  const { width, height, left, top, opacity, rotate } = props;

  return (
    <div>
      <ConfigList>
        <Item label="图表尺寸">
          <HalfForm>
            <InputNumber />
          </HalfForm>
          <HalfForm>
            <InputNumber />
          </HalfForm>
        </Item>
        <Item label="图表位置">
          <HalfForm>
            <InputNumber />
          </HalfForm>
          <HalfForm>
            <InputNumber />
          </HalfForm>
        </Item>
        <Item label="旋转角度">
          <HalfForm>
            <InputNumber />
          </HalfForm>
        </Item>
        <Item label="不透明度">
          <HalfForm>
            <Opacity />
          </HalfForm>
        </Item>

        <ComponentOptionConfig>
          <TabPane key={'1'} tab={<Tab>2222</Tab>}>
            <ConfigList level={1}>
              <Item label="位置">
                <FullForm>
                  <PositionConfig />
                </FullForm>
              </Item>
              <CollapseA>
                <CollapseA.Panel header="11111" key="222">
                  222222222
                </CollapseA.Panel>
              </CollapseA>
              <Collapse
                child={{
                  header: '2222',
                  key: '1',
                }}
              >
                <Item
                  label="屏幕大小"
                  labelProps={{
                    level: 2,
                  }}
                >
                  <HalfForm label="宽度">
                    <InputNumber />
                  </HalfForm>
                  <HalfForm label="高度">
                    <InputNumber />
                  </HalfForm>
                </Item>
                <Collapse
                  child={{
                    header: '4444',
                    key: '2',
                  }}
                >
                  <Item
                    label="屏幕大小"
                    labelProps={{
                      level: 2,
                    }}
                  >
                    <HalfForm label="宽度">
                      <InputNumber />
                    </HalfForm>
                    <HalfForm label="高度">
                      <InputNumber />
                    </HalfForm>
                  </Item>
                </Collapse>
                <Item
                  label="屏幕大小"
                  labelProps={{
                    level: 2,
                  }}
                >
                  <HalfForm label="宽度">
                    <InputNumber />
                  </HalfForm>
                  <HalfForm label="高度">
                    <InputNumber />
                  </HalfForm>
                </Item>
              </Collapse>
              <Collapse
                child={{
                  header: '文本',
                  key: 'font',
                }}
              >
                <FontConfigList />
              </Collapse>
              <Collapse
                child={{
                  header: '4444',
                  visibleRender: true,
                  key: '2',
                }}
              >
                33333
              </Collapse>
              <Item label="屏幕大小">
                <HalfForm label="宽度">
                  <InputNumber />
                </HalfForm>
                <HalfForm label="高度">
                  <InputNumber />
                </HalfForm>
              </Item>
              <FontConfig />
            </ConfigList>
          </TabPane>
        </ComponentOptionConfig>
      </ConfigList>
    </div>
  );
};

export default BaseConfig;
