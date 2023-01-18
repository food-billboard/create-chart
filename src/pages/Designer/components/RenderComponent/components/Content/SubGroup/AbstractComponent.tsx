import {
  ReactNode,
  useMemo,
  useEffect,
  useRef,
  cloneElement,
  CSSProperties,
  useState,
  useCallback,
  useLayoutEffect,
} from 'react';
import { useUpdateEffect } from 'ahooks';
import classnames from 'classnames';
import AnimeJs from 'animejs';
import { uniqueId, isEqual } from 'lodash';
import EventEmitter from './EventEmitter';
import styles from './index.less';

export const CAROUSEL_COMPONENT_MAP = {
  fade: {
    defaultTransform: {
      opacity: 0,
    },
    keyframes: [
      {
        opacity: 1,
      },
      {
        opacity: 0,
      },
    ],
    className: styles['group-component-carousel-wrapper-children-fade'],
  },
  left: {
    defaultTransform: {
      transform: 'translateX(100%)',
    },
    keyframes: [
      {
        translateX: 0,
      },
      {
        translateX: '-100%',
      },
    ],
    className: styles['group-component-carousel-wrapper-children-left'],
  },
};

const COMPONENT_ID_PREFIX = 'COMPONENT_ID_PREFIX';
const EASING_MAP = {
  linear: 'linear',
  'ease-in': 'easeInQuad',
  'ease-out': 'easeOutQuad',
  'ease-in-out': 'easeInOutQuad',
};

export type ComponentProps = {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  config: ComponentData.TComponentCarouselAnimationConfig;
  index: number;
  delay: number;
  length: number;
};

export type AbstractComponentProps = ComponentProps & {
  keyframes: AnimeJs.AnimeAnimParams[];
  defaultTransform: CSSProperties;
};

const AbstractComponent = (props: AbstractComponentProps) => {
  const {
    children,
    style,
    className,
    config,
    index,
    delay,
    length,
    keyframes,
    defaultTransform: _defaultTransform,
  } = props;
  const { speed, easing } = config;

  const isStop = useRef(true);
  const uniqueComponentId = useRef(uniqueId(COMPONENT_ID_PREFIX));
  const elementRef = useRef<HTMLDivElement>(null);
  const animeStartInstance = useRef<AnimeJs.AnimeInstance>();
  const animeEndInstance = useRef<AnimeJs.AnimeInstance>();
  const isPlaying = useRef(false);
  const currentIndexCache = useRef(0);
  // 当开始预览时的当前索引
  const onStartCacheIndex = useRef(0);
  const defaultTransform = useRef(_defaultTransform);
  const delayTimer = useRef<NodeJS.Timeout>();

  const realChildren = useMemo(() => {
    return cloneElement(children as any, {
      style: {
        left: 0,
        top: 0,
        position: 'static',
      },
    });
  }, [children]);

  const reset = useCallback(() => {
    if (elementRef.current) {
      Object.entries(defaultTransform.current).forEach((item) => {
        const [key, value] = item;
        elementRef.current!.style[key as any] = value;
      });
    }
    isPlaying.current = false;
  }, []);

  const animeEnd = useCallback(
    (autoplay = true) => {
      const [start, end] = keyframes;
      // 出场
      animeEndInstance.current = AnimeJs({
        targets: `.${uniqueComponentId.current}`,
        easing: EASING_MAP[easing],
        loop: false,
        autoplay,
        duration: speed,
        keyframes: [end],
        complete: (anime) => {
          isPlaying.current = false;
          reset();
          if (!isStop.current)
            EventEmitter.emit('change', (index + 1) % length);
        },
      });
    },
    [keyframes, easing, reset, speed, index, length],
  );

  const animeStart = useCallback(
    (autoplay = true) => {
      isPlaying.current = true;
      const [start] = keyframes;
      // 进场
      animeStartInstance.current = AnimeJs({
        targets: `.${uniqueComponentId.current}`,
        easing: EASING_MAP[easing],
        loop: false,
        autoplay,
        keyframes: [start],
        duration: speed,
        complete: () => {
          if (!isStop.current) {
            delayTimer.current = setTimeout(animeEnd, delay);
          }
        },
      });
    },
    [keyframes, easing, reset, speed, index, length, animeEnd, delay],
  );

  const animeStop = useCallback(() => {
    animeStartInstance.current?.pause();
    animeEndInstance.current?.pause();
    clearTimeout(delayTimer.current);
    reset();
    isPlaying.current = false;
  }, [reset]);

  useEffect(() => {
    const onIndexChange = (currentIndex: number) => {
      currentIndexCache.current = currentIndex;
      if (index !== currentIndex && isPlaying.current) {
        // 出场
        animeEnd();
      }
      if (index === currentIndex) {
        animeStop();
        // 进场
        animeStart();
      }
    };
    const onStop = (callback: any) => {
      isStop.current = true;
      if (currentIndexCache.current === index) clearTimeout(delayTimer.current);
      callback(onStartCacheIndex.current);
    };
    const onStart = () => {
      onStartCacheIndex.current = currentIndexCache.current;
      animeStop();
      isStop.current = false;
    };
    EventEmitter.addListener('change', onIndexChange);
    EventEmitter.addListener('stop', onStop);
    EventEmitter.addListener('start', onStart);
    return () => {
      EventEmitter.removeListener('change', onIndexChange);
      EventEmitter.removeListener('stop', onStop);
      EventEmitter.removeListener('stop', onStart);
    };
  }, [index, animeStart, animeEnd, animeStop]);

  useLayoutEffect(() => {
    reset();
  }, []);

  useUpdateEffect(() => {
    if (!isEqual(defaultTransform.current, _defaultTransform)) {
      defaultTransform.current = _defaultTransform;
      animeStop();
      animeStart();
      isPlaying.current = true;
    }
  }, [_defaultTransform, animeStop, animeStart]);

  return (
    <div
      ref={elementRef}
      className={classnames(
        uniqueComponentId.current,
        'pos-ab dis-flex w-100 h-100',
        className,
      )}
      style={style}
    >
      {realChildren}
    </div>
  );
};

export default AbstractComponent;
