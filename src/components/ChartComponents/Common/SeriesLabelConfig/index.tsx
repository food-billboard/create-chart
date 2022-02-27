import { ReactNode, useCallback } from 'react';
import { SingleCollapse as Collapse } from '../Collapse';
import LabelPositionConfig from '../LabelPositionConfig';
import FontConfig from '../FontConfig';

const SeriesLabelConfig = (
  props: {
    key: string;
    onChange?: (
      value: SuperPartial<ComponentData.ComponentSeriesLabelConfig>,
    ) => void;
    options?: ReactNode;
  } & ComponentData.ComponentSeriesLabelConfig,
) => {
  const {
    key,
    show,
    options,
    fontSize,
    fontWeight,
    fontFamily,
    color,
    onChange,
    position,
  } = props;

  const commonOnChange = useCallback(
    (key: keyof ComponentData.ComponentSeriesLabelConfig, value: any) => {
      onChange?.({
        [key]: value,
      });
    },
    [onChange],
  );

  return (
    <Collapse
      child={{
        header: '文本标签',
        key,
        visibleRender: true,
        onChange: commonOnChange.bind(null, 'show'),
        value: show,
      }}
    >
      <LabelPositionConfig
        value={position}
        onChange={commonOnChange.bind(null, 'position')}
      />
      <FontConfig
        value={{
          fontFamily,
          fontSize,
          fontWeight,
          color,
        }}
        onChange={onChange}
      />
      {options}
    </Collapse>
  );
};

export default SeriesLabelConfig;
