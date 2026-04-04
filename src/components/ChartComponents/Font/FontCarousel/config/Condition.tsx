import { useCallback } from 'react';
import ConditionConfigCommon from '@/components/ChartComponents/Common/ConditionConfig';
import { TFontCarouselConfig } from '../type';

const ConditionConfig = (props: {
  value: TFontCarouselConfig['condition'];
  onChange: ComponentData.ComponentConfigProps<TFontCarouselConfig>['onChange'];
}) => {
  const { value, onChange } = props;

  return <ConditionConfigCommon value={value} onChange={onChange} />;
};

export default ConditionConfig;
