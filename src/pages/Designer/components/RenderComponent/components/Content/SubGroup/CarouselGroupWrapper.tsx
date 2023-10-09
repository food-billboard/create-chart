import { Children, ReactNode, useEffect, useMemo } from 'react';
import { connect } from 'umi';
import { ConnectState } from '@/models/connect';
import {
  EVENT_NAME_MAP,
  GLOBAL_EVENT_EMITTER,
} from '@/utils/Assist/EventEmitter';
import AbstractComponent, {
  AbstractComponentProps,
  CAROUSEL_COMPONENT_MAP,
} from './AbstractComponent';

const CarouselGroupWrapper = (props: {
  children?: ReactNode;
  screenType: ComponentData.ScreenType;
  groupCarousel: ComponentData.TGroupComponentCarouselConfig;
}) => {
  const { screenType, children, groupCarousel } = props;
  const { delay, verticalAlign, horizontalAlign } = groupCarousel;

  const childrenLength = useMemo(() => {
    return (children as any).length;
  }, [children]);

  useEffect(() => {
    const onIndexChange = (index: number) => {
      GLOBAL_EVENT_EMITTER.emit(
        EVENT_NAME_MAP.GROUP_CAROUSEL_INDEX_CHANGE,
        index,
      );
    };
    const onPreviewChange = (state: boolean) => {
      if (state) {
        GLOBAL_EVENT_EMITTER.emit(EVENT_NAME_MAP.GROUP_CAROUSEL_START);
        GLOBAL_EVENT_EMITTER.emit(
          EVENT_NAME_MAP.GROUP_CAROUSEL_INDEX_CHANGE,
          0,
        );
      } else {
        let called = false;
        GLOBAL_EVENT_EMITTER.emit(
          EVENT_NAME_MAP.GROUP_CAROUSEL_STOP,
          (index: number) => {
            if (called) return;
            called = true;
            GLOBAL_EVENT_EMITTER.emit(
              EVENT_NAME_MAP.GROUP_CAROUSEL_INDEX_CHANGE,
              index,
            );
          },
        );
      }
    };
    GLOBAL_EVENT_EMITTER.addListener(
      EVENT_NAME_MAP.GROUP_CAROUSEL_CLICK_INDEX_CHANGE,
      onIndexChange,
    );
    GLOBAL_EVENT_EMITTER.addListener(
      EVENT_NAME_MAP.GROUP_CAROUSEL_CLICK_PREVIEW_CHANGE,
      onPreviewChange,
    );
    return () => {
      GLOBAL_EVENT_EMITTER.removeListener(
        EVENT_NAME_MAP.GROUP_CAROUSEL_CLICK_INDEX_CHANGE,
        onIndexChange,
      );
      GLOBAL_EVENT_EMITTER.removeListener(
        EVENT_NAME_MAP.GROUP_CAROUSEL_CLICK_PREVIEW_CHANGE,
        onPreviewChange,
      );
    };
  }, []);

  useEffect(() => {
    if (screenType === 'preview') {
      GLOBAL_EVENT_EMITTER.emit(EVENT_NAME_MAP.GROUP_CAROUSEL_START);
    }
    GLOBAL_EVENT_EMITTER.emit(EVENT_NAME_MAP.GROUP_CAROUSEL_INDEX_CHANGE, 0);
  }, []);

  return (
    <div className="w-100 h-100 pos-ab over-hide">
      {Children.map(children, (child: any, index: number) => {
        const component: ComponentData.TComponentData = child.props.value;
        const {
          config: {
            style: { carouselConfig },
          },
          id,
        } = component;
        let props = {
          style: {
            justifyContent: {
              start: 'flex-start',
              center: 'center',
              end: 'flex-end',
            }[horizontalAlign],
            alignItems: {
              start: 'flex-start',
              center: 'center',
              end: 'flex-end',
            }[verticalAlign],
          },
          config: carouselConfig,
          index,
          delay: delay,
          length: childrenLength,
          children: child,
        } as AbstractComponentProps;

        if (carouselConfig.animation === 'fade') {
          props = {
            ...props,
            ...CAROUSEL_COMPONENT_MAP.fade,
          };
        } else {
          // TODO
          // 控制一下组件轮播的方向
          // if(carouselConfig.direction === 'left')
          props = {
            ...props,
            ...CAROUSEL_COMPONENT_MAP.left,
          };
        }

        return <AbstractComponent {...props} />;
      })}
    </div>
  );
};

export default connect(
  (state: ConnectState) => {
    return {
      screenType: state.global.screenType,
    };
  },
  () => {
    return {};
  },
)(CarouselGroupWrapper);
