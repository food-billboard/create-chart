import { useCallback } from 'react';
import AnimationConfigCommon from '@/components/ChartComponents/Common/AnimationConfig';
import { TPolarBarConfig } from '../type';

const AnimationConfig = (props: {
  value: TPolarBarConfig['animation'];
  onChange: ComponentData.ComponentConfigProps<TPolarBarConfig>['onChange'];
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
