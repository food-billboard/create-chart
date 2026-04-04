import { useCallback } from 'react';
import ConditionConfigCommon from '@/components/ChartComponents/Common/ConditionConfig';
import { TListConfig } from '../type';

const ConditionConfig = (props: {
  value: TListConfig['condition'];
  onChange: ComponentData.ComponentConfigProps<TListConfig>['onChange'];
}) => {
  const { value, onChange } = props;

  return <ConditionConfigCommon value={value} onChange={onChange} />;
};

export default ConditionConfig;
