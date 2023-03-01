import { ReactNode, useMemo, useEffect, Children } from 'react';
import { observer } from 'mobx-react-lite';
import { useMobxContext } from '@/hooks';
import {
  EVENT_NAME_MAP,
  GLOBAL_EVENT_EMITTER,
} from '@/utils/Assist/EventEmitter';
import AbstractComponent, {
  AbstractComponentProps,
  CAROUSEL_COMPONENT_MAP,
} from './AbstractComponent';
import EventEmitter from './EventEmitter';

const CarouselGroupWrapper = (props: {
  children?: ReactNode;
  groupCarousel: ComponentData.TGroupComponentCarouselConfig;
}) => {
  const {
    global: { screenType },
  } = useMobxContext();

  const { children, groupCarousel } = props;
  const { delay, verticalAlign, horizontalAlign } = groupCarousel;

  const childrenLength = useMemo(() => {
    return (children as any).length;
  }, [children]);

  useEffect(() => {
    const onIndexChange = (index: number) => {
      EventEmitter.emit('change', index);
    };
    const onPreviewChange = (state: boolean) => {
      if (state) {
        EventEmitter.emit('start');
        EventEmitter.emit('change', 0);
      } else {
        let called = false;
        EventEmitter.emit('stop', (index: number) => {
          if (called) return;
          called = true;
          EventEmitter.emit('change', index);
        });
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
      EventEmitter.emit('start');
    }
    EventEmitter.emit('change', 0);
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

export default observer(CarouselGroupWrapper);
