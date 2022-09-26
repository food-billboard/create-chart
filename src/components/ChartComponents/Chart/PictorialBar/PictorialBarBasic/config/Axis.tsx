import { useCallback } from 'react';
import { Tabs } from 'antd';
import { TPictorialBarBasicConfig } from '../type';
import AxisConfigCommon from '@/components/ChartComponents/Common/AxisConfig';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import InputNumber from '@/components/ChartComponents/Common/InputNumber';
import styles from '../../../../Common/global.less';

type ValueType = Pick<TPictorialBarBasicConfig, 'yAxis' | 'xAxis'>;

const { Item } = ConfigList;

const AxisConfig = (props: {
  value: ValueType;
  onChange: ComponentData.ComponentConfigProps<TPictorialBarBasicConfig>['onChange'];
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
              ignore={['position', 'splitLine']}
            >
              <Item label="最大值">
                <FullForm>
                  <InputNumber
                    className="w-100"
                    value={xAxis.max}
                    onChange={(value) => {
                      onKeyChange('xAxis', {
                        max: value,
                      });
                    }}
                  />
                </FullForm>
              </Item>
            </AxisConfigCommon>
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
              ignore={['position', 'splitLine']}
            />
          ),
        },
      ]}
    />
  );
};

export default AxisConfig;
