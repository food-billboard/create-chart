import ConditionConfigCommon from '@/components/ChartComponents/Common/ConditionConfig';
import { TPaginationConfig } from '../type';

const ConditionConfig = (props: {
  value: TPaginationConfig['condition'];
  onChange: ComponentData.ComponentConfigProps<TPaginationConfig>['onChange'];
}) => {
  const { value, onChange } = props;

  return <ConditionConfigCommon value={value} onChange={onChange} />;
};

export default ConditionConfig;
