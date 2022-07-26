import { CSSProperties, useMemo, useRef, useCallback } from 'react';
import { Carousel } from 'antd';
import { uniqueId, merge } from 'lodash';
import classnames from 'classnames';
import {
  useComponent,
  useCondition,
} from '@/components/ChartComponents/Common/Component/hook';
import { ComponentProps } from '@/components/ChartComponents/Common/Component/type';
import FetchFragment, {
  TFetchFragmentRef,
} from '@/components/ChartComponents/Common/FetchFragment';
import FilterDataUtil from '@/utils/Assist/FilterData';
import { TCarouselConfig } from '../type';
import styles from './index.less';

const CHART_ID = 'CAROUSEL';

const CarouselBasic = (props: {
  className?: string;
  style?: CSSProperties;
  value: ComponentData.TComponentData<TCarouselConfig>;
  global: ComponentProps['global'];
}) => {
  const { className, style, value, global } = props;
  const { screenType } = global;

  const {
    config: {
      options,
      style: { height },
    },
    id,
  } = value;
  const { dot, speed, autoplay, fade, condition, pauseOnHover } = options;

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
              height: height - 4,
              width: '100%',
            }}
          />
        </div>
      );
    });
  }, [finalValue, onClick, height]);

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
          conditionStyle,
        )}
        id={chartId.current}
      >
        <Carousel
          autoplay={autoplay}
          dots={dot.show}
          dotPosition={dot.position}
          speed={speed}
          fade={fade}
          style={{
            width: '100%',
            height: '100%',
          }}
          pauseOnFocus={pauseOnHover}
        >
          {imageList}
        </Carousel>
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
