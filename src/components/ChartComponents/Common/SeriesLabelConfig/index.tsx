import { ReactNode, useCallback, useMemo } from 'react';
import { SingleCollapse as Collapse } from '../Collapse';
import LabelPositionConfig from '../LabelPositionConfig';
import FontConfig from '../FontConfig';

const SeriesLabelConfig = (
  props: {
    onChange?: (
      value: SuperPartial<ComponentData.ComponentSeriesLabelConfig>,
    ) => void;
    children?: ReactNode;
    ignore?: string[];
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
      }}
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
