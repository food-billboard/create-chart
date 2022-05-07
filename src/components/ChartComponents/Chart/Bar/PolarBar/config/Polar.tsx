import { useCallback, useMemo } from 'react';
import MaxMinConfig from '@/components/ChartComponents/Common/MaxMinConfig';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import { TPolarBarConfig } from '../type';

const PolarConfig = (props: {
  value: TPolarBarConfig['polar'];
  onChange: ComponentData.ComponentConfigProps<TPolarBarConfig>['onChange'];
}) => {
  const { value, onChange } = props;
  const { radius } = value;

  const onKeyChange = useCallback(
    (key: keyof TPolarBarConfig['polar'], value: any) => {
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
