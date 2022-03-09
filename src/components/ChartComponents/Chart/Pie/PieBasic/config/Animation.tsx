import { useCallback } from 'react';
import AnimationConfigCommon from '@/components/ChartComponents/Common/AnimationConfig';
import { TPieBasicConfig } from '../type';

const AnimationConfig = (props: {
  value: TPieBasicConfig['animation'];
  onChange: ComponentData.ComponentConfigProps<TPieBasicConfig>['onChange'];
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
