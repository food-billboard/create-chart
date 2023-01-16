import {
  ReactNode,
  useState,
  useMemo,
  useEffect,
  useRef,
  cloneElement,
} from 'react';
import { connect } from 'dva';
import classnames from 'classnames';
import { ConnectState } from '@/models/connect';
import {
  EVENT_NAME_MAP,
  GLOBAL_EVENT_EMITTER,
} from '@/utils/Assist/EventEmitter';
import styles from './index.less';

const CarouselGroupWrapper = (props: {
  children?: ReactNode;
  screenType: ComponentData.ScreenType;
  groupCarousel: ComponentData.TGroupComponentCarouselConfig;
}) => {
  const { screenType, children, groupCarousel } = props;
  const { delay, verticalAlign, horizontalAlign } = groupCarousel;

  const [stateIndex, setStateIndex] = useState(0);
  const [previewable, setPreviewable] = useState(false);

  const timerRef = useRef<NodeJS.Timeout>();

  const childrenLength = useMemo(() => {
    return (children as any).length;
  }, [children]);

  const currentChild = useMemo(() => {
    const child = (children as any)[stateIndex];
    return cloneElement(child, {
      style: {
        left: 0,
        top: 0,
        position: 'static',
      },
    });
  }, [stateIndex, children]);

  useEffect(() => {
    const onIndexChange = (index: number) => {
      setStateIndex(index);
    };
    const onPreviewChange = (state: boolean) => {
      setPreviewable(state);
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
    if (!previewable && screenType !== 'preview') return;
    timerRef.current = setInterval(() => {
      setStateIndex((prev) => (prev + 1) % childrenLength);
    }, delay);
    return () => {
      clearInterval(timerRef.current);
    };
  }, [delay, previewable, childrenLength]);

  return (
    <div
      className={classnames(
        styles['group-component-carousel-wrapper'],
        'dis-flex w-100 h-100',
      )}
      style={{
        justifyContent: {
          start: 'flex-start',
          center: 'center',
          end: 'flex-end',
        }[horizontalAlign],
        alignItems: { start: 'flex-start', center: 'center', end: 'flex-end' }[
          verticalAlign
        ],
      }}
    >
      {currentChild}
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
