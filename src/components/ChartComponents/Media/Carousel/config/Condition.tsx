import ConditionConfigCommon from '@/components/ChartComponents/Common/ConditionConfig';
import { TCarouselConfig } from '../type';

const ConditionConfig = (props: {
  value: TCarouselConfig['condition'];
  onChange: ComponentData.ComponentConfigProps<TCarouselConfig>['onChange'];
}) => {
  const { value, onChange } = props;

  return <ConditionConfigCommon value={value} onChange={onChange} />;
};

export default ConditionConfig;
