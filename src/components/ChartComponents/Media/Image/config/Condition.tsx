import ConditionConfigCommon from '@/components/ChartComponents/Common/ConditionConfig';
import { TImageConfig } from '../type';

const ConditionConfig = (props: {
  value: TImageConfig['condition'];
  onChange: ComponentData.ComponentConfigProps<TImageConfig>['onChange'];
}) => {
  const { value, onChange } = props;

  return <ConditionConfigCommon value={value} onChange={onChange} />;
};

export default ConditionConfig;
