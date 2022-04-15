import { useCallback } from 'react';
import AnimationConfigCommon from '@/components/ChartComponents/Common/AnimationConfig';
import { SingleCollapse as Collapse } from '@/components/ChartComponents/Common/Collapse';
import { TLineBarConfig } from '../type';

const AnimationConfig = (props: {
  value: TLineBarConfig['animation'];
  onChange: ComponentData.ComponentConfigProps<TLineBarConfig>['onChange'];
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

  return (
    <>
      <Collapse
        child={{
          header: '柱图',
          key: 'bar',
        }}
      >
        <AnimationConfigCommon
          value={value.bar}
          onChange={(value) => {
            onKeyChange({
              bar: value,
            });
          }}
        />
      </Collapse>
      <Collapse
        child={{
          header: '折线',
          key: 'line',
        }}
      >
        <AnimationConfigCommon
          value={value.line}
          onChange={(value) => {
            onKeyChange({
              line: value,
            });
          }}
        />
      </Collapse>
    </>
  );
};

export default AnimationConfig;
