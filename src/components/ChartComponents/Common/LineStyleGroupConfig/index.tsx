import { useCallback, useMemo, ReactNode } from 'react';
import ColorSelect from '@/components/ColorSelect';
import { SingleCollapse as Collapse, SingleCollapseProps } from '../Collapse';
import InputNumber from '../InputNumber';
import LineStyle from '../LineStyleSelect';
import ConfigList, { TConfigListItemProps } from '../Structure/ConfigList';
import FullForm from '../Structure/FullForm';

const { Item } = ConfigList;

const LineStyleGroupConfig = (props: {
  value: Partial<ComponentData.ComponentLineGroupConfig>;
  onChange: (value: Partial<ComponentData.ComponentLineGroupConfig>) => void;
  labelProps?: TConfigListItemProps['labelProps'];
  ignore?: (keyof ComponentData.ComponentLineGroupConfig)[];
  children?: ReactNode;
  collapseProps?: SingleCollapseProps;
  level?: any;
}) => {
  const { ignore, children, value, onChange, collapseProps, level } = props;

  const { type, width, color } = value;

  const { labelProps = { level: 2 } } = props;

  const onKeyChange = useCallback(
    (key: keyof ComponentData.ComponentLineGroupConfig, changeValue: any) => {
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

  const typeConfig = useMemo(() => {
    if (ignore?.includes('type')) return null;
    return (
      <Item label="类型" labelProps={labelProps}>
        <FullForm>
          <LineStyle value={type!} onChange={onKeyChange.bind(null, 'type')} />
        </FullForm>
      </Item>
    );
  }, [ignore, type, onKeyChange]);

  const widthConfig = useMemo(() => {
    if (ignore?.includes('width')) return null;
    return (
      <Item label="粗细" labelProps={labelProps}>
        <FullForm>
          <InputNumber
            defaultValue={width}
            onChange={onKeyChange.bind(null, 'width')}
            className="w-100"
          />
        </FullForm>
      </Item>
    );
  }, [ignore, width, onKeyChange]);

  const colorConfig = useMemo(() => {
    if (ignore?.includes('color')) return null;
    return (
      <Item label="颜色" labelProps={labelProps}>
        <FullForm>
          <ColorSelect
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
        header: '线条样式',
        key: 'lineStyle',
      }}
      level={level}
      {...collapseProps}
    >
      {typeConfig}
      {widthConfig}
      {colorConfig}
      {children}
    </Collapse>
  );
};

export default LineStyleGroupConfig;
