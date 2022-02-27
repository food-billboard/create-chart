import { useCallback } from 'react';
import { InputNumber } from 'antd';
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

const { Item } = ConfigList;

const TooltipConfig = (props: {
  value: TBarBasicConfig['tooltip'];
  onChange: ComponentData.ComponentConfigProps<TBarBasicConfig>['onChange'];
}) => {
  const { value, onChange } = props;

  const onKeyChange = useCallback(
    (key: keyof TBarBasicConfig['tooltip'], value: any) => {
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

  const onPositionChange = useCallback(
    (value: PositionValue) => {
      onChange({
        config: {
          options: {
            legend: value,
          },
        },
      });
    },
    [onChange],
  );

  return <div></div>;
};

export default TooltipConfig;
