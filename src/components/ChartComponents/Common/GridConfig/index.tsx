import { ReactNode, useCallback, useMemo } from 'react';
import ConfigList from '../Structure/ConfigList';
import { SingleCollapse as Collapse } from '../Collapse';
import MarginConfig from '../MarginConfig';

export type GridConfigProps = {
  ignore?: ('show' | 'position')[];
  value: Partial<ComponentData.ComponentGrid> & { [key: string]: any };
  onChange?: (value: any) => void;
  children?: ReactNode;
};

const GridConfig = (props: GridConfigProps) => {
  const { ignore = ['show'], value, onChange, children } = props;
  const { show, left, top, right, bottom } = value;

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

  const needPosition = useMemo(() => {
    return !ignore.includes('position');
  }, [ignore]);

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
        {positionConfig}
        {children}
      </Collapse>
    );
  }

  return (
    <ConfigList>
      {positionConfig}
      {children}
    </ConfigList>
  );
};

export default GridConfig;
