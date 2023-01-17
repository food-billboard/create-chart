import { ReactNode, useState, useMemo, useEffect, Children } from 'react';
import { connect } from 'dva';
import { ConnectState } from '@/models/connect';
import {
  EVENT_NAME_MAP,
  GLOBAL_EVENT_EMITTER,
} from '@/utils/Assist/EventEmitter';
import { ComponentProps } from './AbstractComponent';
import LeftDirectionComponent from './LeftDirectionComponent';
import FadeComponent from './FadeComponent';
import EventEmitter from './EventEmitter';

const CarouselGroupWrapper = (props: {
  children?: ReactNode;
  screenType: ComponentData.ScreenType;
  groupCarousel: ComponentData.TGroupComponentCarouselConfig;
}) => {
  const { screenType, children, groupCarousel } = props;
  const { delay, verticalAlign, horizontalAlign } = groupCarousel;

  const [previewAble, setPreviewAble] = useState(false);

  const childrenLength = useMemo(() => {
    return (children as any).length;
  }, [children]);

  useEffect(() => {
    const onIndexChange = (index: number) => {
      EventEmitter.emit('change', index);
    };
    const onPreviewChange = (state: boolean) => {
      setPreviewAble(state);
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
    console.log(33333333);
    if (!previewAble && screenType !== 'preview') {
      EventEmitter.emit('change', 0);
      return;
    }
    EventEmitter.emit('start');
    EventEmitter.emit('change', 0);
    return () => {
      EventEmitter.emit('stop');
    };
  }, [delay, previewAble, childrenLength]);

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
        const props: ComponentProps = {
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
          index: index,
          delay: delay,
          length: childrenLength,
          children: child,
        };
        // TODO
        // 控制一下组件轮播的方向
        // if(carouselConfig.direction === 'left')
        if (carouselConfig.animation === 'fade') {
          return <FadeComponent {...props} key={id} />;
        }
        return <LeftDirectionComponent {...props} key={id} />;
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
