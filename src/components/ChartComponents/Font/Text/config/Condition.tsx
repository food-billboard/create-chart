import ConditionConfigCommon from '@/components/ChartComponents/Common/ConditionConfig';
import { TTextConfig } from '../type';

const ConditionConfig = (props: {
  value: TTextConfig['condition'];
  onChange: ComponentData.ComponentConfigProps<TTextConfig>['onChange'];
}) => {
  const { value, onChange } = props;

  return <ConditionConfigCommon value={value} onChange={onChange} />;
};

export default ConditionConfig;
