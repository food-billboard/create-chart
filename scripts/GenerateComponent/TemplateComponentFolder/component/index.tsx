import { CSSProperties, useMemo, useRef, useCallback } from 'react';
import { uniqueId, merge } from 'lodash';
import classnames from 'classnames';
import {
  useComponent,
  useCondition,
  ConditionComponent,
} from '@/components/ChartComponents/Common/Component/hook';
import FetchFragment from '@/components/ChartComponents/Common/FetchFragment';
import ColorSelect from '@/components/ColorSelect';
import FilterDataUtil from '@/utils/Assist/FilterData';
import { T{{COMPONENT_NAME}}Config } from '../type';
import { CHART_ID } from '../id'

const { getRgbaString } = ColorSelect;

const Component = (
  props: ComponentData.CommonComponentProps<T{{COMPONENT_NAME}}Config>,
) => {
  const { className, style, value, global, children, wrapper: Wrapper } = props;

  const {
    id,
    config: {
      options,
      style: { border },
    },
  } = value;
  const { counter, content, color, condition, textStyle } = options;
  const { screenType } = global;

  const chartId = useRef<string>(uniqueId(CHART_ID));

  const {
    request,
    syncInteractiveAction,
    linkageMethod,
    getValue,
    requestUrl,
    componentFilter,
    value: processedValue = [],
    componentFilterMap,
    onCondition,
  } = useComponent<T{{COMPONENT_NAME}}Config>(
    {
      component: value,
      global,
    }
  );

  const {
    onCondition: propsOnCondition,
    actionAble
  } = useCondition({
    onCondition, 
    screenType,
    componentId: id
  });

  const finalValue = useMemo(() => {
    return FilterDataUtil.getFieldMapValue(processedValue, {
      map: componentFilterMap,
    });
  }, [processedValue, componentFilterMap]);

  const onClick = useCallback(() => {
    syncInteractiveAction('click', {
      value: finalValue.value,
    });
    linkageMethod('click', {
      value: finalValue.value,
    });
  }, [syncInteractiveAction, finalValue]);

  const componentStyle = useMemo(() => {
    let baseStyle: CSSProperties = {
      ...textStyle,
      color: getRgbaString(textStyle.color),
    };
    return baseStyle;
  }, [textStyle]);

  const componentClassName = useMemo(() => {
    return classnames(
      className,
      'dis-flex',
    );
  }, [className]);

  return (
    <>
      <ConditionComponent
        componentId={id}
        className={componentClassName}
        style={merge(
          {
            width: '100%',
            height: '100%',
          },
          style,
          componentStyle,
        )}
        id={chartId.current}
        onClick={onClick}
      >
        <Wrapper border={border}>
          {children}
          组件render的地方
        </Wrapper>
      </ConditionComponent>
      <FetchFragment
        id={id}
        url={requestUrl}
        reFetchData={request}
        reGetValue={getValue}
        reCondition={propsOnCondition}
        componentFilter={componentFilter}
        componentCondition={condition}
      />
    </>
  );
};

const WrapperComponent: typeof Component & {
  id: ComponentData.TComponentSelfType;
} = Component as any;

WrapperComponent.id = CHART_ID;

export default WrapperComponent;
