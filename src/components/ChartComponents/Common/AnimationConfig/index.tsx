import { ReactNode, useCallback, useMemo } from 'react';
import ConfigList from '../Structure/ConfigList';
import { SingleCollapse as Collapse } from '../Collapse';
import FullForm from '../Structure/FullForm';
import InputNumber from '../InputNumber';
import ChartAnimationTypeSelect from '../ChartAnimationTypeSelect';

const { Item } = ConfigList;

export type AnimationConfigProps = {
  ignore?: string[];
  value: Partial<ComponentData.ComponentChartAnimationConfig> & {
    [key: string]: any;
  };
  onChange?: (value: any) => void;
  children?: ReactNode;
};

const AnimationConfig = (props: AnimationConfigProps) => {
  const { ignore = [], value, onChange, children } = props;
  const { animation, animationEasing, animationDuration } = value;

  const onKeyChange = useCallback(
    (key: string, value: any) => {
      onChange?.({
        [key]: value,
      });
    },
    [onChange],
  );

  const needAnimation = useMemo(() => {
    return !ignore.includes('animation');
  }, [ignore]);

  const needAnimationEasing = useMemo(() => {
    return !ignore.includes('animationEasing');
  }, [ignore]);

  const needAnimationDuration = useMemo(() => {
    return !ignore.includes('animationDuration');
  }, [ignore]);

  const animationEasingConfig = useMemo(() => {
    if (!needAnimationEasing) return null;
    return (
      <Item label="排列方式">
        <FullForm>
          <ChartAnimationTypeSelect
            value={animationEasing!}
            onChange={onKeyChange.bind(null, 'animationEasing')}
          />
        </FullForm>
      </Item>
    );
  }, [needAnimationEasing, animationEasing, onKeyChange]);

  const animationDurationConfig = useMemo(() => {
    if (!needAnimationDuration) return null;
    return (
      <Item label="间距">
        <FullForm>
          <InputNumber
            className="w-100"
            value={animationDuration}
            onChange={onKeyChange.bind(null, 'animationDuration')}
          />
        </FullForm>
      </Item>
    );
  }, [needAnimationDuration, animationDuration, onKeyChange]);

  if (needAnimation) {
    return (
      <Collapse
        child={{
          header: '动画',
          key: 'animation',
          visibleRender: true,
          onChange: onKeyChange.bind(null, 'animation'),
          value: animation,
        }}
        parent={{
          activeKey: ['animation'],
        }}
      >
        {animationEasingConfig}
        {animationDurationConfig}
        {children}
      </Collapse>
    );
  }

  return (
    <ConfigList>
      {animationEasingConfig}
      {animationDurationConfig}
    </ConfigList>
  );
};

export default AnimationConfig;
