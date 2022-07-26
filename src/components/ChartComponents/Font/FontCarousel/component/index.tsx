import { CSSProperties, useMemo, useRef, useCallback } from 'react';
import { uniqueId, merge } from 'lodash';
import classnames from 'classnames';
import Marquee from 'react-fast-marquee';
import {
  useComponent,
  useCondition,
} from '@/components/ChartComponents/Common/Component/hook';
import { ComponentProps } from '@/components/ChartComponents/Common/Component/type';
import FetchFragment, {
  TFetchFragmentRef,
} from '@/components/ChartComponents/Common/FetchFragment';
import ColorSelect from '@/components/ColorSelect';
import FilterDataUtil from '@/utils/Assist/FilterData';
import { TFontCarouselConfig } from '../type';
import styles from './index.less';

const { getRgbaString } = ColorSelect;

const CHART_ID = 'FONT_CAROUSEL';

const TFontCarousel = (props: {
  className?: string;
  style?: CSSProperties;
  value: ComponentData.TComponentData<TFontCarouselConfig>;
  global: ComponentProps['global'];
}) => {
  const { className, style, value, global } = props;
  const { screenType } = global;

  const {
    id,
    config: {
      options,
      style: { height },
    },
  } = value;
  const { textStyle, speed, direction, play, delay, pauseOnHover, condition } =
    options;

  const chartId = useRef<string>(uniqueId(CHART_ID));
  const requestRef = useRef<TFetchFragmentRef>(null);

  const {
    request,
    syncInteractiveAction,
    getValue,
    requestUrl,
    componentFilter,
    value: processedValue = [],
    componentFilterMap,
    onCondition,
  } = useComponent<TFontCarouselConfig>(
    {
      component: value,
      global,
    },
    requestRef,
  );

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
      </div>
      <FetchFragment
        id={id}
        url={requestUrl}
        ref={requestRef}
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
