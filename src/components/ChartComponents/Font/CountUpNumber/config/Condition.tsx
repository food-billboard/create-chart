import { useCallback } from 'react';
import ConditionConfigCommon from '@/components/ChartComponents/Common/ConditionConfig';
import { TCountUpNumberConfig } from '../type';

const ConditionConfig = (props: {
  value: TCountUpNumberConfig['condition'];
  onChange: ComponentData.ComponentConfigProps<TCountUpNumberConfig>['onChange'];
}) => {
  const { value, onChange } = props;

  return <ConditionConfigCommon value={value} onChange={onChange} />;
};

export default ConditionConfig;
