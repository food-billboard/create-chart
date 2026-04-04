import ConditionConfigCommon from '@/components/ChartComponents/Common/ConditionConfig';
import { TStateCardConfig } from '../type';

const ConditionConfig = (props: {
  value: TStateCardConfig['condition'];
  onChange: ComponentData.ComponentConfigProps<TStateCardConfig>['onChange'];
}) => {
  const { value, onChange } = props;

  return <ConditionConfigCommon value={value} onChange={onChange} />;
};

export default ConditionConfig;
