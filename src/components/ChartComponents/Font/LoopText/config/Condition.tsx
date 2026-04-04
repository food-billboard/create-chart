import { useCallback } from 'react';
import ConditionConfigCommon from '@/components/ChartComponents/Common/ConditionConfig';
import { TLoopTextConfig } from '../type';

const ConditionConfig = (props: {
  value: TLoopTextConfig['condition'];
  onChange: ComponentData.ComponentConfigProps<TLoopTextConfig>['onChange'];
}) => {
  const { value, onChange } = props;

  return <ConditionConfigCommon value={value} onChange={onChange} />;
};

export default ConditionConfig;
