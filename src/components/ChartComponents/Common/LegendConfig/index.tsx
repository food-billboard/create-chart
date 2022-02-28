import { ReactNode, useCallback, useMemo } from 'react';
import { InputNumber } from 'antd';
import ConfigList from '../Structure/ConfigList';
import { SingleCollapse as Collapse } from '../Collapse';
import { FontConfigList } from '../FontConfig';
import FullForm from '../Structure/FullForm';
import OrientSelect from '../OrientSelect';
import NumberPositionConfig, { PositionValue } from '../NumberPositionConfig';

const { Item } = ConfigList;

export type LegendConfigProps = {
  ignore?: string[];
  value: Partial<ComponentData.ComponentLegend> & { [key: string]: any };
  onChange?: (value: any) => void;
  children?: ReactNode;
};

const LegendConfig = (props: LegendConfigProps) => {
  const { ignore = [], value, onChange, children } = props;
  const { show, type, orient, itemGap, textStyle, left, top, right, bottom } =
    value;

  const onKeyChange = useCallback(
    (key: string, value: any) => {
      onChange?.({
        [key]: value,
      });
    },
    [onChange],
  );

  const onPositionChange = useCallback(
    (value: PositionValue) => {
      onChange?.(value);
    },
    [onChange],
  );

  const needShow = useMemo(() => {
    return !ignore.includes('show');
  }, [ignore]);

  const needType = useMemo(() => {
    return !ignore.includes('type');
  }, [ignore]);

  const needOrient = useMemo(() => {
    return !ignore.includes('orient');
  }, [ignore]);

  const needTextStyle = useMemo(() => {
    return !ignore.includes('textStyle');
  }, [ignore]);

  const needItemGap = useMemo(() => {
    return !ignore.includes('itemGap');
  }, [ignore]);

  const needPosition = useMemo(() => {
    return !ignore.includes('position');
  }, []);

  const typeConfig = useMemo(() => {
    if (!needType) return null;
    return <div></div>;
  }, [needType]);

  const orientConfig = useMemo(() => {
    if (!needOrient) return null;
    return (
      <Item label="排列方式">
        <FullForm>
          <OrientSelect
            value={orient!}
            onChange={onKeyChange.bind(null, 'orient')}
          />
        </FullForm>
      </Item>
    );
  }, [needOrient, orient, onKeyChange]);

  const textStyleConfig = useMemo(() => {
    if (!needTextStyle) return null;
    return (
      <Collapse
        child={{
          header: '文本',
          key: 'textStyle',
        }}
      >
        <FontConfigList
          value={textStyle}
          onChange={onKeyChange.bind(null, 'textStyle')}
        />
      </Collapse>
    );
  }, [needTextStyle, textStyle, onKeyChange]);

  const itemGapConfig = useMemo(() => {
    if (!needItemGap) return null;
    return (
      <Item label="间距">
        <FullForm>
          <InputNumber
            className="w-100"
            defaultValue={itemGap}
            onBlur={(e) => onKeyChange('itemGap', e.target.value)}
          />
        </FullForm>
      </Item>
    );
  }, [needItemGap, itemGap, onKeyChange]);

  const positionConfig = useMemo(() => {
    if (!needPosition) return null;
    return (
      <NumberPositionConfig
        value={{
          left: left!,
          right: right!,
          top: top!,
          bottom: bottom!,
        }}
        onChange={onPositionChange}
      />
    );
  }, [needPosition, left, top, right, bottom, onPositionChange]);

  if (needShow) {
    return (
      <Collapse
        child={{
          header: '图例',
          key: 'legend',
          visibleRender: true,
          onChange: onKeyChange.bind(null, 'show'),
          value: show,
        }}
        parent={{
          activeKey: ['legend'],
        }}
      >
        {typeConfig}
        {orientConfig}
        {itemGapConfig}
        {textStyleConfig}
        {positionConfig}
        {children}
      </Collapse>
    );
  }

  return (
    <ConfigList>
      {typeConfig}
      {orientConfig}
      {itemGapConfig}
      {textStyleConfig}
      {positionConfig}
      {children}
    </ConfigList>
  );
};

export default LegendConfig;
