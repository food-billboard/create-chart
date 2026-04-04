import { useCallback } from 'react';
import ConditionConfigCommon from '@/components/ChartComponents/Common/ConditionConfig';
import { TVideoConfig } from '../type';

const ConditionConfig = (props: {
  value: TVideoConfig['condition'];
  onChange: ComponentData.ComponentConfigProps<TVideoConfig>['onChange'];
}) => {
  const { value, onChange } = props;

  return <ConditionConfigCommon value={value} onChange={onChange} />;
};

export default ConditionConfig;
