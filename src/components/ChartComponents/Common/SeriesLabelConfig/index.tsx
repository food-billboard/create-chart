import { ReactNode, useCallback, useMemo } from 'react';
import { SingleCollapse as Collapse, SingleCollapseProps } from '../Collapse';
import LabelPositionConfig from '../LabelPositionConfig';
import FontConfig from '../FontConfig';

const SeriesLabelConfig = (
  props: {
    onChange?: (
      value: SuperPartial<ComponentData.ComponentSeriesLabelConfig>,
    ) => void;
    children?: ReactNode;
    ignore?: string[];
    child: Partial<SingleCollapseProps['child']>;
    parent: Partial<SingleCollapseProps['parent']>;
  } & ComponentData.ComponentSeriesLabelConfig,
) => {
  const {
    show,
    children,
    fontSize,
    fontWeight,
    fontFamily,
    color,
    onChange,
    position,
    ignore,
    child,
    parent,
  } = props;

  const commonOnChange = useCallback(
    (key: keyof ComponentData.ComponentSeriesLabelConfig, value: any) => {
      onChange?.({
        [key]: value,
      });
    },
    [onChange],
  );

  const needPositionConfig = useMemo(() => {
    return !ignore?.includes('position');
  }, [ignore]);

  return (
    <Collapse
      child={{
        header: '文本标签',
        key: 'label',
        visibleRender: true,
        onChange: commonOnChange.bind(null, 'show'),
        value: show,
        ...child,
      }}
      parent={parent}
    >
      {needPositionConfig && (
        <LabelPositionConfig
          value={position}
          onChange={commonOnChange.bind(null, 'position')}
        />
      )}
      <FontConfig
        value={{
          fontFamily,
          fontSize,
          fontWeight,
          color,
        }}
        onChange={onChange}
      />
      {children}
    </Collapse>
  );
};

export default SeriesLabelConfig;
