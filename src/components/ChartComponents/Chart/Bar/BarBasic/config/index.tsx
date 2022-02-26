import {} from 'react';
import { Tabs } from 'antd';
import ComponentOptionConfig, {
  Tab,
} from '@/components/ChartComponents/Common/ComponentOptionConfig';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import { TBarBasicConfig } from '../type';

const { TabPane } = Tabs;
const { Item } = ConfigList;

const Config = (props: ComponentData.ComponentConfigProps<TBarBasicConfig>) => {
  return (
    <ComponentOptionConfig>
      <TabPane key={'1'} tab={<Tab>图例</Tab>}>
        <ConfigList level={1}>
          <Item label="位置" placeholder disabled>
            <FullForm></FullForm>
          </Item>
        </ConfigList>
      </TabPane>
      <TabPane key={'2'} tab={<Tab>坐标轴</Tab>}></TabPane>
      <TabPane key={'3'} tab={<Tab>提示文字</Tab>}></TabPane>
      <TabPane key={'4'} tab={<Tab>系列</Tab>}></TabPane>
    </ComponentOptionConfig>
  );
};

export default Config;
