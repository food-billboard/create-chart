import {
  ReactNode,
  useMemo,
  useEffect,
  useRef,
  cloneElement,
  CSSProperties,
  useState,
  useCallback,
} from 'react';
import { useUpdateEffect } from 'ahooks';
import classnames from 'classnames';
import AnimeJs from 'animejs';
import { uniqueId } from 'lodash';
import EventEmitter from './EventEmitter';

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

const AbstractComponent = (
  props: ComponentProps & {
    keyframes: AnimeJs.AnimeAnimParams[];
    defaultTransform: CSSProperties;
  },
) => {
  const {
    children,
    style,
    className,
    config,
    index,
    delay,
    length,
    keyframes,
    defaultTransform,
  } = props;
  const { speed, easing, animation } = config;

  const [isStop, setIsStop] = useState(true);

  const uniqueComponentId = useRef(uniqueId(COMPONENT_ID_PREFIX));
  const elementRef = useRef<HTMLDivElement>(null);
  const animeStartInstance = useRef<AnimeJs.AnimeInstance>();
  const animeEndInstance = useRef<AnimeJs.AnimeInstance>();
  const isPlaying = useRef(false);
  const currentIndexCache = useRef(0);
  const isFirstUpdate = useRef(true);

  const realChildren = useMemo(() => {
    return cloneElement(children as any, {
      style: {
        left: 0,
        top: 0,
        position: 'static',
      },
    });
  }, [children]);

  const reset = () => {
    if (elementRef.current) {
      Object.entries(defaultTransform).forEach((item) => {
        const [key, value] = item;
        elementRef.current!.style[key as any] = value;
      });
    }
  };

  const animeEnd = (autoplay = true) => {
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
        if (!isStop) EventEmitter.emit('change', (index + 1) % length);
      },
    });
  };

  const animeStart = (autoplay = true) => {
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
        if (!isStop) {
          setTimeout(animeEnd, delay);
        }
      },
    });
  };

  const animeStop = () => {
    animeStartInstance.current?.pause();
    animeEndInstance.current?.pause();
    reset();
  };

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
        isPlaying.current = true;
      }
    };
    const onStop = () => {
      setIsStop(true);
    };
    const onStart = () => {
      setIsStop(false);
    };
    EventEmitter.addListener('change', onIndexChange);
    EventEmitter.addListener('stop', onStop);
    EventEmitter.addListener('start', onStart);
    return () => {
      EventEmitter.addListener('change', onIndexChange);
      EventEmitter.addListener('stop', onStop);
      EventEmitter.addListener('stop', onStart);
    };
  }, [index]);

  return (
    <div
      ref={elementRef}
      className={classnames(
        uniqueComponentId.current,
        'pos-ab dis-flex w-100 h-100',
        className,
      )}
      style={{
        ...style,
        ...defaultTransform,
      }}
    >
      {realChildren}
    </div>
  );
};

export default AbstractComponent;
