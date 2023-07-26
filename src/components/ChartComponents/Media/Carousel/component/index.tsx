import {
  useComponent,
  useComponentSize,
  useCondition,
} from '@/components/ChartComponents/Common/Component/hook';
import { DEFAULT_BORDER_RADIUS } from '@/components/ChartComponents/Common/Constants/defaultConfig';
import FetchFragment from '@/components/ChartComponents/Common/FetchFragment';
import { useClipPath } from '@/hooks';
import { ConnectState } from '@/models/connect';
import FilterDataUtil from '@/utils/Assist/FilterData';
import { Carousel } from 'antd';
import classnames from 'classnames';
import { get, merge, uniqueId } from 'lodash';
import { useCallback, useMemo, useRef } from 'react';
import { connect } from 'umi';
import { CHART_ID } from '../id';
import { TCarouselConfig } from '../type';
import styles from './index.less';

const CarouselBasic = (
  props: ComponentData.CommonComponentProps<TCarouselConfig> & {
    componentBorder: ComponentData.TScreenData['config']['attr']['componentBorder'];
  },
) => {
  const {
    className,
    style,
    value,
    global,
    children,
    wrapper: Wrapper,
    componentBorder: { width: borderWidth, padding },
  } = props;
  const { screenType } = global;

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
  } = useComponent<TCarouselConfig>({
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

export default connect(
  (state: ConnectState) => {
    return {
      componentBorder: get(
        state,
        'global.screenData.config.attr.componentBorder',
      ),
    };
  },
  () => ({}),
)(WrapperCarousel);
