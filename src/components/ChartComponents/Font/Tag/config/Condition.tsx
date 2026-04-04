import ConditionConfigCommon from '@/components/ChartComponents/Common/ConditionConfig';
import { TTagConfig } from '../type';

const ConditionConfig = (props: {
  value: TTagConfig['condition'];
  onChange: ComponentData.ComponentConfigProps<TTagConfig>['onChange'];
}) => {
  const { value, onChange } = props;

  return <ConditionConfigCommon value={value} onChange={onChange} />;
};

export default ConditionConfig;
