import classnames from 'classnames';
import { uniqueId, merge } from 'lodash';
import { CSSProperties, useMemo, useRef, useCallback } from 'react';
import {
  useComponent,
  useCondition,
  ConditionComponent,
} from '@/components/ChartComponents/Common/Component/hook';
import FetchFragment from '@/components/ChartComponents/Common/FetchFragment';
import Marquee from '@/components/ChartComponents/Common/Marquee';
import ColorSelect from '@/components/ColorSelect';
import FilterDataUtil from '@/utils/Assist/FilterData';
import { CHART_ID } from '../id';
import { TFontCarouselConfig } from '../type';
import styles from './index.less';

const { getRgbaString } = ColorSelect;

const TFontCarousel = (
  props: ComponentData.CommonComponentProps<TFontCarouselConfig>,
) => {
  const { className, style, value, global, children, wrapper: Wrapper } = props;
  const { screenType } = global;

  const {
    id,
    config: {
      options,
      style: { height, border },
    },
  } = value;
  const { textStyle, speed, direction, play, delay, pauseOnHover, condition } =
    options;

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
  } = useComponent<TFontCarouselConfig>({
    component: value,
    global,
  });

  const { onCondition: propsOnCondition } = useCondition({
    onCondition,
    screenType,
    componentId: id,
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
      // 'dis-flex',
      styles['component-font-carousel'],
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
          {
            <Marquee
              open
              gradient={false}
              play={screenType !== 'edit' && play}
              speed={speed}
              direction={direction}
              pauseOnHover={pauseOnHover}
              delay={delay}
            >
              <div
                className={styles['component-font-carousel-main']}
                style={{
                  height,
                }}
              >
                {finalValue.value || ''}
              </div>
            </Marquee>
          }
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

const WrapperTFontCarousel: typeof TFontCarousel & {
  id: ComponentData.TComponentSelfType;
} = TFontCarousel as any;

WrapperTFontCarousel.id = CHART_ID;

export default WrapperTFontCarousel;
