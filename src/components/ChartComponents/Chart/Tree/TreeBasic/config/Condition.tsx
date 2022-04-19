import { useCallback } from 'react';
import ConditionConfigCommon from '@/components/ChartComponents/Common/ConditionConfig';
import { TTreeBasicConfig } from '../type';

const ConditionConfig = (props: {
  value: TTreeBasicConfig['condition'];
  onChange: ComponentData.ComponentConfigProps<TTreeBasicConfig>['onChange'];
}) => {
  const { value, onChange } = props;

  const onKeyChange = useCallback(
    (value: any) => {
      onChange({
        config: {
          options: {
            condition: value,
          },
        },
      });
    },
    [onChange],
  );

  return <ConditionConfigCommon value={value} onChange={onKeyChange} />;
};

export default ConditionConfig;
