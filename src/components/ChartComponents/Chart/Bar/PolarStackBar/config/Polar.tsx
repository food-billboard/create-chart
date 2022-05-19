import { useCallback, useMemo } from 'react';
import MaxMinConfig from '@/components/ChartComponents/Common/MaxMinConfig';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import { TPolarStackBarConfig } from '../type';

const PolarConfig = (props: {
  value: TPolarStackBarConfig['polar'];
  onChange: ComponentData.ComponentConfigProps<TPolarStackBarConfig>['onChange'];
}) => {
  const { value, onChange } = props;
  const { radius } = value;

  const onKeyChange = useCallback(
    (key: keyof TPolarStackBarConfig['polar'], value: any) => {
      onChange({
        config: {
          options: {
            polar: {
              [key]: value,
            },
          },
        },
      });
    },
    [onChange],
  );

  const radiusConfig = useMemo(() => {
    return (
      <MaxMinConfig
        label="大小"
        subLabel={['最小', '最大']}
        value={{
          max: radius[1],
          min: radius[0],
        }}
        onChange={(value) => {
          onKeyChange('radius', [value.min, value.max]);
        }}
      />
    );
  }, [radius, onKeyChange]);

  return <ConfigList>{radiusConfig}</ConfigList>;
};

export default PolarConfig;
