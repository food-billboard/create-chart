import { ReactNode, useCallback, useMemo } from 'react';
import { CompatColorSelect } from '@/components/ColorSelect';
import ConfigList from '../Structure/ConfigList';
import { SingleCollapse as Collapse } from '../Collapse';
import FullForm from '../Structure/FullForm';
import MarginConfig from '../MarginConfig';

const { Item } = ConfigList;

export type GridConfigProps = {
  ignore?: ('show' | 'position' | 'backgroundColor')[];
  value: Partial<ComponentData.ComponentGrid> & { [key: string]: any };
  onChange?: (value: any) => void;
  children?: ReactNode;
};

const GridConfig = (props: GridConfigProps) => {
  const { ignore = ['show'], value, onChange, children } = props;
  const { show, backgroundColor, left, top, right, bottom } = value;

  const onKeyChange = useCallback(
    (key: string, value: any) => {
      onChange?.({
        [key]: value,
      });
    },
    [onChange],
  );

  const onPositionChange = useCallback(
    (value: ComponentData.TComponentMarginConfig) => {
      onChange?.(value);
    },
    [onChange],
  );

  const needShow = useMemo(() => {
    return !ignore.includes('show');
  }, [ignore]);

  const needBackgroundColor = useMemo(() => {
    return !ignore.includes('backgroundColor');
  }, [ignore]);

  const needPosition = useMemo(() => {
    return !ignore.includes('position');
  }, [ignore]);

  const backgroundColorConfig = useMemo(() => {
    if (!needBackgroundColor) return null;
    return (
      <Item label="背景颜色">
        <FullForm>
          <CompatColorSelect
            value={backgroundColor}
            onChange={onKeyChange.bind(null, 'backgroundColor')}
          />
        </FullForm>
      </Item>
    );
  }, [needBackgroundColor, backgroundColor, onKeyChange]);

  const positionConfig = useMemo(() => {
    if (!needPosition) return null;
    return (
      <MarginConfig
        value={{
          left: left!,
          top: top!,
          bottom: bottom!,
          right: right!,
        }}
        onChange={onPositionChange}
      />
    );
  }, [needPosition, left, top, bottom, right, onPositionChange]);

  if (needShow) {
    return (
      <Collapse
        child={{
          header: '网格',
          key: 'legend',
          visibleRender: true,
          onChange: onKeyChange.bind(null, 'show'),
          value: show,
        }}
        parent={{
          activeKey: ['legend'],
        }}
      >
        {backgroundColorConfig}
        {positionConfig}
        {children}
      </Collapse>
    );
  }

  return (
    <ConfigList>
      {backgroundColorConfig}
      {positionConfig}
      {children}
    </ConfigList>
  );
};

export default GridConfig;
