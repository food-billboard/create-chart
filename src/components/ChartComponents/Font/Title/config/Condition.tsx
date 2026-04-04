import ConditionConfigCommon from '@/components/ChartComponents/Common/ConditionConfig';
import { TTitleConfig } from '../type';

const ConditionConfig = (props: {
  value: TTitleConfig['condition'];
  onChange: ComponentData.ComponentConfigProps<TTitleConfig>['onChange'];
}) => {
  const { value, onChange } = props;

  return <ConditionConfigCommon value={value} onChange={onChange} />;
};

export default ConditionConfig;
