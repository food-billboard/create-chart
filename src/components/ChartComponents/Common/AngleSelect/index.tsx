import { useCallback, ReactNode } from 'react';
import HalfForm from '../Structure/HalfForm';
import ConfigList, { TConfigListItemProps } from '../Structure/ConfigList';
import InputNumber from '../InputNumber';
import CircleSelect from './CircleSelect';

const { Item } = ConfigList;

const AngleSelect = (props: {
  value?: number;
  onChange?: (value: number | string) => void;
  labelProps?: TConfigListItemProps['labelProps'];
  label?: string | ReactNode;
  level?: any;
}) => {
  const {
    value,
    onChange,
    labelProps: perLabelProps = { level: 1 },
    level,
    label,
  } = props;

  const internalOnChange = useCallback(
    (value) => {
      const realValue = (parseInt(value) || 0) % 360;
      onChange?.(realValue);
    },
    [onChange],
  );

  const labelProps = {
    ...perLabelProps,
    level: level ?? perLabelProps.level,
  };

  return (
    <Item label={label || '旋转'} labelProps={labelProps}>
      <HalfForm>
        <InputNumber value={value} onChange={internalOnChange} />
      </HalfForm>
      <HalfForm>
        <CircleSelect value={value} onChange={internalOnChange as any} />
      </HalfForm>
    </Item>
  );
};

export default AngleSelect;
