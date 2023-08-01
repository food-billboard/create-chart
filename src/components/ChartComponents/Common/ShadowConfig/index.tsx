import { ReactNode, useCallback, useMemo } from 'react';
import ColorSelect from '@/components/ColorSelect';
import InputNumber from '../InputNumber';
import ConfigList from '../Structure/ConfigList';
import FullForm from '../Structure/FullForm';
import HalfForm from '../Structure/HalfForm';

const { Item } = ConfigList;

export type ShadowConfigProps = {
  ignore?: string[];
  value: Partial<{
    shadowColor: ComponentData.TColorConfig;
    shadowOffsetX: number;
    shadowOffsetY: number;
    shadowBlur: number;
  }>;
  onChange?: (value: any) => void;
  children?: ReactNode;
};

const ShadowConfig = (props: ShadowConfigProps) => {
  const { ignore = [], value, onChange, children } = props;
  const { shadowColor, shadowOffsetX, shadowOffsetY, shadowBlur } = value;

  const onKeyChange = useCallback(
    (key: string, newValue: any) => {
      onChange?.({
        ...value,
        [key]: newValue,
      });
    },
    [onChange, value],
  );

  const needShadowColor = useMemo(() => {
    return !ignore.includes('shadowColor');
  }, [ignore]);

  const needShadowOffset = useMemo(() => {
    return !ignore.includes('shadowOffset');
  }, [ignore]);

  const needShadowBlur = useMemo(() => {
    return !ignore.includes('shadowBlur');
  }, [ignore]);

  const shadowColorConfig = useMemo(() => {
    if (!needShadowColor) return null;
    return (
      <Item label="颜色">
        <FullForm>
          <ColorSelect
            value={shadowColor}
            onChange={onKeyChange.bind(null, 'shadowColor')}
          />
        </FullForm>
      </Item>
    );
  }, [needShadowColor, shadowColor]);

  const shadowOffsetConfig = useMemo(() => {
    if (!needShadowOffset) return null;
    return (
      <Item label="距离">
        <HalfForm label="水平">
          <InputNumber
            value={shadowOffsetX}
            onChange={onKeyChange.bind(null, 'shadowOffsetX')}
          />
        </HalfForm>
        <HalfForm label="垂直">
          <InputNumber
            value={shadowOffsetY}
            onChange={onKeyChange.bind(null, 'shadowOffsetY')}
          />
        </HalfForm>
      </Item>
    );
  }, [needShadowOffset, shadowOffsetX, shadowOffsetY, onKeyChange]);

  const shadowBlurConfig = useMemo(() => {
    if (!needShadowBlur) return null;
    return (
      <Item label="模糊大小">
        <FullForm>
          <InputNumber
            value={shadowBlur}
            onChange={onKeyChange.bind(null, 'shadowBlur')}
          />
        </FullForm>
      </Item>
    );
  }, [needShadowBlur, shadowBlur, onKeyChange]);

  return (
    <ConfigList>
      {shadowColorConfig}
      {shadowOffsetConfig}
      {shadowBlurConfig}
      {children}
    </ConfigList>
  );
};

export default ShadowConfig;
