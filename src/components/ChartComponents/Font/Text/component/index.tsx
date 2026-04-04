import { useSize } from 'ahooks';
import classnames from 'classnames';
import { uniqueId, merge } from 'lodash';
import { CSSProperties, useMemo, useRef, useCallback } from 'react';
import {
  useComponent,
  useCondition,
  ConditionComponent,
} from '@/components/ChartComponents/Common/Component/hook';
import FetchFragment from '@/components/ChartComponents/Common/FetchFragment';
import ColorSelect from '@/components/ColorSelect';
import FilterDataUtil from '@/utils/Assist/FilterData';
import { CHART_ID } from '../id';
import { TTextConfig } from '../type';
import styles from './index.less';

const { getRgbaString } = ColorSelect;

const Text = (props: ComponentData.CommonComponentProps<TTextConfig>) => {
  const { className, style, value, global, children, wrapper: Wrapper } = props;
  const { screenType } = global;

  const {
    id,
    config: {
      style: { height, border },
      options,
    },
  } = value;
  const { animation, condition, textStyle } = options;

  const chartId = useRef<string>(uniqueId(CHART_ID));
  const textRef = useRef<any>(null);
  const textSize = useSize(textRef);

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
  } = useComponent<TTextConfig>({
    component: value,
    global,
  });

  const { onCondition: propsOnCondition } = useCondition({
    onCondition,
    screenType,
    componentId: id,
  });

  const isLimit = useMemo(() => {
    return (textSize?.height || 0) <= height;
  }, [textSize, height]);

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
    const { color, lineHeight, textIndent, letterSpacing, ...nextTextStyle } =
      textStyle;
    let baseStyle: CSSProperties = {
      ...nextTextStyle,
      color: getRgbaString(textStyle.color),
      lineHeight: lineHeight + 'px',
      textIndent: textIndent + 'px',
      letterSpacing: letterSpacing + 'px',
    };
    return baseStyle;
  }, [textStyle]);

  const componentClassName = useMemo(() => {
    return classnames(className, styles['component-font-text']);
  }, [className]);

  const element = useMemo(() => {
    if (isLimit || !animation.show) {
      return (
        <div style={componentStyle} ref={textRef}>
          {finalValue.value || ''}
        </div>
      );
    }
    return (
      <div
        className={styles['component-font-text-carousel']}
        style={{
          animationDuration: `${animation.speed / 1000 || 1}s`,
        }}
      >
        <div style={componentStyle} ref={textRef}>
          {finalValue.value || ''}
        </div>
        <div style={componentStyle}>{finalValue.value || ''}</div>
      </div>
    );
  }, [isLimit, componentStyle, finalValue, animation]);

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
        )}
        id={chartId.current}
        onClick={onClick}
      >
        <Wrapper border={border}>
          {children}
          {element}
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

const WrapperText: typeof Text & {
  id: ComponentData.TComponentSelfType;
} = Text as any;

WrapperText.id = CHART_ID;

export default WrapperText;
