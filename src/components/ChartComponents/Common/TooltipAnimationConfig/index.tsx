import { useCallback, useMemo } from 'react';
import ConfigList from '../Structure/ConfigList';
import { SingleCollapse as Collapse } from '../Collapse';
import FullForm from '../Structure/FullForm';
import InputNumber from '../InputNumber';

const { Item } = ConfigList;

export type TooltipAnimationConfigProps = {
  value: ComponentData.ComponentTooltipAnimation;
  onChange?: (value: any) => void;
};

const TooltipAnimationConfig = (props: TooltipAnimationConfigProps) => {
  const { value, onChange } = props;
  const { speed, show } = value;

  const onKeyChange = useCallback(
    (key: string, value: any) => {
      onChange?.({
        [key]: value,
      });
    },
    [onChange],
  );

  const speedConfig = useMemo(() => {
    return (
      <Item label="速度">
        <FullForm>
          <InputNumber
            className="w-100"
            value={speed}
            onChange={onKeyChange.bind(null, 'speed')}
          />
        </FullForm>
      </Item>
    );
  }, [speed, onKeyChange]);

  return (
    <Collapse
      child={{
        header: '动画',
        key: 'tooltip-animation',
        visibleRender: true,
        onChange: onKeyChange.bind(null, 'show'),
        value: show,
      }}
      parent={{
        activeKey: ['tooltip-animation'],
      }}
    >
      {speedConfig}
    </Collapse>
  );
};

export default TooltipAnimationConfig;
