import { useCallback } from 'react';
import ConditionConfigCommon from '@/components/ChartComponents/Common/ConditionConfig';
import { THtmlFragmentConfig } from '../type';

const ConditionConfig = (props: {
  value: THtmlFragmentConfig['condition'];
  onChange: ComponentData.ComponentConfigProps<THtmlFragmentConfig>['onChange'];
}) => {
  const { value, onChange } = props;

  return <ConditionConfigCommon value={value} onChange={onChange} />;
};

export default ConditionConfig;
