import ConditionConfigCommon from '@/components/ChartComponents/Common/ConditionConfig';
import { TAudioConfig } from '../type';

const ConditionConfig = (props: {
  value: TAudioConfig['condition'];
  onChange: ComponentData.ComponentConfigProps<TAudioConfig>['onChange'];
}) => {
  const { value, onChange } = props;

  return <ConditionConfigCommon value={value} onChange={onChange} />;
};

export default ConditionConfig;
