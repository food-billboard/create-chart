import { useCallback } from 'react';
import { Tabs } from 'antd';
import { TCachetBarConfig } from '../type';
import AxisConfigCommon from '@/components/ChartComponents/Common/AxisConfig';
import styles from '../../../../Common/global.less';

type ValueType = Pick<TCachetBarConfig, 'yAxis' | 'xAxis'>;

const AxisConfig = (props: {
  value: ValueType;
  onChange: ComponentData.ComponentConfigProps<TCachetBarConfig>['onChange'];
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
          ignore={['position', 'splitLine']}
          onChange={onKeyChange.bind(null, 'xAxis')}
        />
      </Tabs.TabPane>
      <Tabs.TabPane tab="y轴" key="yAxis">
        <AxisConfigCommon
          type="yAxis"
          value={yAxis}
          onChange={onKeyChange.bind(null, 'yAxis')}
          ignore={['position', 'splitLine']}
        />
      </Tabs.TabPane>
    </Tabs>
  );
};

export default AxisConfig;
