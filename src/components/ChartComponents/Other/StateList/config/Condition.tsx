import { useCallback } from 'react';
import ConditionConfigCommon from '@/components/ChartComponents/Common/ConditionConfig';
import { TStateListConfig } from '../type';

const ConditionConfig = (props: {
  value: TStateListConfig['condition'];
  onChange: ComponentData.ComponentConfigProps<TStateListConfig>['onChange'];
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
