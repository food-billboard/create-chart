import { CSSProperties, useMemo, useRef, useCallback } from 'react';
import { uniqueId, merge } from 'lodash';
import classnames from 'classnames';
import Marquee from 'react-fast-marquee';
import {
  useComponent,
  useCondition,
} from '@/components/ChartComponents/Common/Component/hook';
import FetchFragment from '@/components/ChartComponents/Common/FetchFragment';
import ColorSelect from '@/components/ColorSelect';
import FilterDataUtil from '@/utils/Assist/FilterData';
import { TFontCarouselConfig } from '../type';
import { CHART_ID } from '../id';
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

  const {
    onCondition: propsOnCondition,
    style: conditionStyle,
    className: conditionClassName,
  } = useCondition(onCondition, screenType);

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
      conditionClassName,
    );
  }, [className, conditionClassName]);

  return (
    <>
      <div
        className={componentClassName}
        style={merge(
          {
            width: '100%',
            height: '100%',
          },
          style,
          componentStyle,
          conditionStyle,
        )}
        id={chartId.current}
        onClick={onClick}
      >
        <Wrapper border={border}>
          {children}
          {
            <Marquee
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
      </div>
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
