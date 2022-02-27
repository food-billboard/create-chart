import { useCallback } from 'react';
import { InputNumber, Tabs } from 'antd';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import { SingleCollapse as Collapse } from '@/components/ChartComponents/Common/Collapse';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import NumberPositionConfig, {
  PositionValue,
} from '@/components/ChartComponents/Common/NumberPositionConfig';
import OrientSelect from '@/components/ChartComponents/Common/OrientSelect';
import { FontConfigList } from '@/components/ChartComponents/Common/FontConfig';
import FormatterSelect from '@/components/ChartComponents/Common/FormatterSelect';
import { TBarBasicConfig } from '../type';
import styles from './index.less';

const { Item } = ConfigList;

type ValueType = Pick<TBarBasicConfig, 'yAxis' | 'xAxis'>;

const AxisConfig = (props: {
  value: ValueType;
  onChange: ComponentData.ComponentConfigProps<TBarBasicConfig>['onChange'];
}) => {
  const { value, onChange } = props;
  const {} = value;

  const onKeyChange = useCallback(
    (key: keyof ValueType, value: any) => {
      onChange({
        config: {
          options: {
            legend: {
              [key]: value,
            },
          },
        },
      });
    },
    [onChange],
  );

  return (
    <Tabs type="card" className={styles['axis-config']}>
      <Tabs.TabPane tab="x轴" key="xAxis">
        <ConfigList>
          <Item label="位置">
            <InputNumber />
          </Item>
        </ConfigList>
      </Tabs.TabPane>
      <Tabs.TabPane tab="y轴" key="yAxis">
        333
      </Tabs.TabPane>
    </Tabs>
  );
};

export default AxisConfig;
