import { useCallback } from 'react';
import AnimationConfigCommon from '@/components/ChartComponents/Common/AnimationConfig';
import { TStepLineConfig } from '../type';

const AnimationConfig = (props: {
  value: TStepLineConfig['animation'];
  onChange: ComponentData.ComponentConfigProps<TStepLineConfig>['onChange'];
}) => {
  const { value, onChange } = props;

  const onKeyChange = useCallback(
    (value: any) => {
      onChange({
        config: {
          options: {
            animation: value,
          },
        },
      });
    },
    [onChange],
  );

  return <AnimationConfigCommon value={value} onChange={onKeyChange} />;
};

export default AnimationConfig;
