import { useCallback } from 'react';
import ConditionConfigCommon from '@/components/ChartComponents/Common/ConditionConfig';
import { T{{COMPONENT_NAME}}Config } from '../type';

const ConditionConfig = (props: {
  value: T{{COMPONENT_NAME}}Config['condition'];
  onChange: ComponentData.ComponentConfigProps<T{{COMPONENT_NAME}}Config>['onChange'];
}) => {
  const { value, onChange } = props;

  const onKeyChange = useCallback(
    (value: any) => {
      onChange(value);
    },
    [onChange],
  );

  return <ConditionConfigCommon value={value} onChange={onKeyChange} />;
};

export default ConditionConfig;
