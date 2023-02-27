import { useMemo, useRef, useCallback } from 'react';
import { Carousel } from 'antd';
import { uniqueId, merge } from 'lodash';
import classnames from 'classnames';
import { useMobxContext } from '@/hooks';
import {
  useComponent,
  useCondition,
  useComponentSize,
} from '@/components/ChartComponents/Common/Component/hook';
import { useClipPath } from '@/hooks';
import FetchFragment, {
  TFetchFragmentRef,
} from '@/components/ChartComponents/Common/FetchFragment';
import FilterDataUtil from '@/utils/Assist/FilterData';
import { DEFAULT_BORDER_RADIUS } from '@/components/ChartComponents/Common/Constants/defaultConfig';
import { TCarouselConfig } from '../type';
import { CHART_ID } from '../id';
import styles from './index.less';

const CarouselBasic = (
  props: ComponentData.CommonComponentProps<TCarouselConfig>,
) => {
  const { className, style, value, global, children, wrapper: Wrapper } = props;
  const { screenType } = global;

  const {
    global: {
      screenData: {
        config: {
          attr: {
            componentBorder: { width: borderWidth, padding },
          },
        },
      },
    },
  } = useMobxContext();

  const {
    config: {
      options,
      style: { height, border, width },
    },
    id,
  } = value;
  const { dot, speed, autoplay, fade, condition, pauseOnHover, clipPath } =
    options;

  const clipPathStyle = useClipPath(clipPath);

  const chartId = useRef<string>(uniqueId(CHART_ID));
  const requestRef = useRef<TFetchFragmentRef>(null);

  const { width: componentWidth, height: componentHeight } = useComponentSize(
    `.${chartId.current}`,
    { width, height },
    [width, height, borderWidth, padding],
  );

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
  } = useComponent<TCarouselConfig>(
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

  const onClick = useCallback(
    (value) => {
      syncInteractiveAction('click', value);
      linkageMethod('click-item', value);
    },
    [syncInteractiveAction],
  );

  const componentClassName = useMemo(() => {
    return classnames(
      className,
      styles['component-media-carousel'],
      conditionClassName,
    );
  }, [className, conditionClassName]);

  const imageList = useMemo(() => {
    return finalValue.map((item: any, index: number) => {
      const { value, name } = item;
      return (
        <div key={name || index}>
          <img
            src={value}
            onClick={onClick.bind(null, item)}
            style={{
              height: componentHeight,
              width: '100%',
              userSelect: 'none',
            }}
            data-id={id}
          />
        </div>
      );
    });
  }, [finalValue, onClick, componentHeight, componentWidth, id]);

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
          clipPathStyle,
          conditionStyle,
        )}
        id={chartId.current}
      >
        <Wrapper
          border={border}
          style={{
            pointerEvents: 'none',
          }}
        >
          {children}
          <div className="w-100 h-100">
            <Carousel
              autoplay={autoplay}
              dots={dot.show}
              dotPosition={dot.position}
              speed={speed}
              fade={fade}
              style={{
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                borderRadius: DEFAULT_BORDER_RADIUS,
              }}
              pauseOnFocus={pauseOnHover}
            >
              {imageList}
            </Carousel>
          </div>
        </Wrapper>
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

const WrapperCarousel: typeof CarouselBasic & {
  id: ComponentData.TComponentSelfType;
} = CarouselBasic as any;

WrapperCarousel.id = CHART_ID;

export default WrapperCarousel;
