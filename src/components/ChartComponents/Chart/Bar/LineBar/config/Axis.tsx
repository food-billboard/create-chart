import { useCallback } from 'react';
import { Tabs } from 'antd';
import { TLineBarConfig } from '../type';
import AxisConfigCommon from '@/components/ChartComponents/Common/AxisConfig';
import styles from '../../../../Common/global.less';

type ValueType = Pick<TLineBarConfig, 'yAxis' | 'xAxis' | 'yAxis2'>;

const AxisConfig = (props: {
  value: ValueType;
  onChange: ComponentData.ComponentConfigProps<TLineBarConfig>['onChange'];
}) => {
  const { value, onChange } = props;
  const { xAxis, yAxis, yAxis2 } = value;

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
              ignore={['splitLine', 'position']}
            />
          ),
        },
        {
          label: 'y2轴',
          key: 'y2Axis',
          children: (
            <AxisConfigCommon
              type="yAxis"
              value={yAxis2}
              onChange={onKeyChange.bind(null, 'yAxis2')}
              ignore={['splitLine', 'position']}
            />
          ),
        },
      ]}
    />
  );
};

export default AxisConfig;
