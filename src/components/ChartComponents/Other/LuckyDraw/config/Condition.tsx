import { useCallback } from 'react';
import ConditionConfigCommon from '@/components/ChartComponents/Common/ConditionConfig';
import { TLuckyDrawConfig } from '../type';

const ConditionConfig = (props: {
  value: TLuckyDrawConfig['condition'];
  onChange: ComponentData.ComponentConfigProps<TLuckyDrawConfig>['onChange'];
}) => {
  const { value, onChange } = props;

  return <ConditionConfigCommon value={value} onChange={onChange} />;
};

export default ConditionConfig;
