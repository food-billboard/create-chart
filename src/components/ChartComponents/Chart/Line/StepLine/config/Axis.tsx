import { useCallback } from 'react';
import { Tabs } from 'antd';
import AxisConfigCommon from '@/components/ChartComponents/Common/AxisConfig';
import { TStepLineConfig } from '../type';
import styles from '../../../../Common/global.less';

type ValueType = Pick<TStepLineConfig, 'yAxis' | 'xAxis'>;

const AxisConfig = (props: {
  value: ValueType;
  onChange: ComponentData.ComponentConfigProps<TStepLineConfig>['onChange'];
}) => {
  const { value, onChange } = props;
  const { xAxis, yAxis } = value;

  const onKeyChange = useCallback(
    (key: keyof ValueType, value: any) => {
      onChange({
        config: {
          options: {
            [key]: value,
          },
        },
      });
    },
    [onChange],
  );

  return (
    <Tabs type="card" className={styles['axis-config']}>
      <Tabs.TabPane tab="x轴" key="xAxis">
        <AxisConfigCommon
          type="xAxis"
          value={xAxis}
          onChange={onKeyChange.bind(null, 'xAxis')}
        />
      </Tabs.TabPane>
      <Tabs.TabPane tab="y轴" key="yAxis">
        <AxisConfigCommon
          type="yAxis"
          value={yAxis}
          onChange={onKeyChange.bind(null, 'yAxis')}
          ignore={[]}
        />
      </Tabs.TabPane>
    </Tabs>
  );
};

export default AxisConfig;
