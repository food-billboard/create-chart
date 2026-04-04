import { useCallback } from 'react';
import ConditionConfigCommon from '@/components/ChartComponents/Common/ConditionConfig';
import { TStateListConfig } from '../type';

const ConditionConfig = (props: {
  value: TStateListConfig['condition'];
  onChange: ComponentData.ComponentConfigProps<TStateListConfig>['onChange'];
}) => {
  const { value, onChange } = props;

  return <ConditionConfigCommon value={value} onChange={onChange} />;
};

export default ConditionConfig;
