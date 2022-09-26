import { useCallback } from 'react';
import { Tabs } from 'antd';
import { TRadialBarConfig } from '../type';
import AxisConfigCommon from '@/components/ChartComponents/Common/AxisConfig';
import styles from '../../../../Common/global.less';

type ValueType = Pick<TRadialBarConfig, 'yAxis' | 'xAxis'>;

const AxisConfig = (props: {
  value: ValueType;
  onChange: ComponentData.ComponentConfigProps<TRadialBarConfig>['onChange'];
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
    <Tabs
      type="card"
      className={styles['axis-config']}
      items={[
        {
          label: 'x轴',
          key: 'xAxis',
          children: (
            <AxisConfigCommon
              type="xAxis"
              value={xAxis}
              onChange={onKeyChange.bind(null, 'xAxis')}
            />
          ),
        },
        {
          label: 'y轴',
          key: 'yAxis',
          children: (
            <AxisConfigCommon
              type="yAxis"
              value={yAxis}
              onChange={onKeyChange.bind(null, 'yAxis')}
              ignore={[]}
            />
          ),
        },
      ]}
    />
  );
};

export default AxisConfig;
