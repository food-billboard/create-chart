import { useCallback } from 'react';
import TooltipConfigCommon from '@/components/ChartComponents/Common/TooltipCommon';
import { TPolarBarConfig } from '../type';

const TooltipConfig = (props: {
  value: TPolarBarConfig['tooltip'];
  onChange: ComponentData.ComponentConfigProps<TPolarBarConfig>['onChange'];
}) => {
  const { value, onChange } = props;

  const onKeyChange = useCallback(
    (value: any) => {
      onChange({
        config: {
          options: {
            tooltip: value,
          },
        },
      });
    },
    [onChange],
  );

  return (
    <TooltipConfigCommon
      value={value}
      onChange={onKeyChange}
    ></TooltipConfigCommon>
  );
};

export default TooltipConfig;
