import { useCallback } from 'react';
import ConditionConfigCommon from '@/components/ChartComponents/Common/ConditionConfig';
import { TAli3DMapConfig } from '../type';

const ConditionConfig = (props: {
  value: TAli3DMapConfig['condition'];
  onChange: ComponentData.ComponentConfigProps<TAli3DMapConfig>['onChange'];
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
