import { useCallback } from 'react';
import ConditionConfigCommon from '@/components/ChartComponents/Common/ConditionConfig';
import { TPaginationConfig } from '../type';

const ConditionConfig = (props: {
  value: TPaginationConfig['condition'];
  onChange: ComponentData.ComponentConfigProps<TPaginationConfig>['onChange'];
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
