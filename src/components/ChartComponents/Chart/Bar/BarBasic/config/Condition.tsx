import { useCallback } from 'react';
import ConditionConfigCommon from '@/components/ChartComponents/Common/ConditionConfig';
import { TBarBasicConfig } from '../type';

const ConditionConfig = (props: {
  value: TBarBasicConfig['condition'];
  onChange: ComponentData.ComponentConfigProps<TBarBasicConfig>['onChange'];
}) => {
  const { value, onChange } = props;

  const onKeyChange = useCallback(
    (value: any) => {
      onChange({
        config: {
          options: {
            condition: value,
          },
        },
      });
    },
    [onChange],
  );

  return <ConditionConfigCommon value={value} onChange={onKeyChange} />;
};

export default ConditionConfig;
