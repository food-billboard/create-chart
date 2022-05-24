import { useCallback, useMemo, ReactNode } from 'react';
import { CompatColorSelect } from '@/components/ColorSelect';
import ConfigList, { TConfigListItemProps } from '../Structure/ConfigList';
import { SingleCollapse as Collapse, SingleCollapseProps } from '../Collapse';
import FullForm from '../Structure/FullForm';
import InputNumber from '../InputNumber';

const { Item } = ConfigList;

const BoxShadowConfig = (props: {
  value: Partial<ComponentData.TBoxShadow>;
  onChange: (value: Partial<ComponentData.TBoxShadow>) => void;
  labelProps?: TConfigListItemProps['labelProps'];
  ignore?: (keyof ComponentData.TBoxShadow)[];
  children?: ReactNode;
  collapseProps?: SingleCollapseProps;
  level?: any;
}) => {
  const { ignore, children, value, onChange, collapseProps, level } = props;

  const { color, vShadow, hShadow, blur, spread } = value;

  const { labelProps = { level: 2 } } = props;

  const onKeyChange = useCallback(
    (key: keyof ComponentData.TBoxShadow, changeValue: any) => {
      let realValue = changeValue;
      try {
        realValue = changeValue.target.value;
      } catch (err) {}
      onChange({
        ...value,
        [key]: realValue,
      });
    },
    [value, onChange],
  );

  const vShadowConfig = useMemo(() => {
    if (ignore?.includes('vShadow')) return null;
    return (
      <Item label="垂直阴影" labelProps={labelProps}>
        <FullForm>
          <InputNumber
            value={vShadow!}
            onChange={onKeyChange.bind(null, 'vShadow')}
          />
        </FullForm>
      </Item>
    );
  }, [ignore, vShadow, onKeyChange]);

  const hShadowConfig = useMemo(() => {
    if (ignore?.includes('hShadow')) return null;
    return (
      <Item label="水平阴影" labelProps={labelProps}>
        <FullForm>
          <InputNumber
            value={hShadow!}
            onChange={onKeyChange.bind(null, 'hShadow')}
          />
        </FullForm>
      </Item>
    );
  }, [ignore, hShadow, onKeyChange]);

  const blurConfig = useMemo(() => {
    if (ignore?.includes('blur')) return null;
    return (
      <Item label="模糊距离" labelProps={labelProps}>
        <FullForm>
          <InputNumber
            defaultValue={blur}
            onChange={onKeyChange.bind(null, 'blur')}
          />
        </FullForm>
      </Item>
    );
  }, [ignore, blur, onKeyChange]);

  const spreadConfig = useMemo(() => {
    if (ignore?.includes('spread')) return null;
    return (
      <Item label="阴影大小" labelProps={labelProps}>
        <FullForm>
          <InputNumber
            defaultValue={spread}
            onChange={onKeyChange.bind(null, 'spread')}
          />
        </FullForm>
      </Item>
    );
  }, [ignore, spread, onKeyChange]);

  const colorConfig = useMemo(() => {
    if (ignore?.includes('color')) return null;
    return (
      <Item label="颜色" labelProps={labelProps}>
        <FullForm>
          <CompatColorSelect
            defaultValue={color}
            onChange={onKeyChange.bind(null, 'color')}
          />
        </FullForm>
      </Item>
    );
  }, [ignore, color, onKeyChange]);

  return (
    <Collapse
      child={{
        header: '阴影',
        key: 'boxShadow',
      }}
      level={level}
      {...collapseProps}
    >
      {hShadowConfig}
      {vShadowConfig}
      {blurConfig}
      {spreadConfig}
      {colorConfig}
      {children}
    </Collapse>
  );
};

export default BoxShadowConfig;
