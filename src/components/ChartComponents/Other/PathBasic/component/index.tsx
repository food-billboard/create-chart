import { CSSProperties, useCallback, useRef, useMemo, ReactNode } from 'react';
import { uniqueId, merge } from 'lodash';
import classnames from 'classnames';
import Anime from 'animejs';
import { useDeepCompareEffect } from 'ahooks';
import { connect } from 'dva';
import {
  useComponent,
  useCondition,
} from '@/components/ChartComponents/Common/Component/hook';
import { ComponentProps } from '@/components/ChartComponents/Common/Component/type';
import ColorSelect from '@/components/ColorSelect';
import FilterDataUtil from '@/utils/Assist/FilterData';
import FetchFragment, {
  TFetchFragmentRef,
} from '@/components/ChartComponents/Common/FetchFragment';
import { ConnectState } from '@/models/connect';
import { sleep } from '@/utils';
import { TPathBasicConfig } from '../type';
import styles from './index.less';

const { getRgbaString } = ColorSelect;

const CHART_ID = 'PATH_BASIC';

const _PathBasic = (props: {
  className?: string;
  style?: CSSProperties;
  value: ComponentData.TComponentData<TPathBasicConfig>;
  global: ComponentProps['global'];
  scale: number;
  children?: ReactNode;
}) => {
  const { className, style, value, global, scale, children } = props;
  const { screenTheme, screenType } = global;

  const {
    id,
    config: {
      options,
      style: { width, height },
    },
  } = value;

  const { animation, condition, path, target, close } = options;

  const chartId = useRef<string>(uniqueId(CHART_ID));
  const chartInstance = useRef<Anime.AnimeInstance>();
  const requestRef = useRef<TFetchFragmentRef>(null);
  const svgId = useRef<string>(uniqueId(CHART_ID + '_svg'));
  const shapeId = useRef<string>(uniqueId(CHART_ID + '_shape'));

  const {
    linkageMethod,
    request,
    getValue,
    requestUrl,
    componentFilter,
    value: processedValue = [],
    componentFilterMap,
    onCondition,
  } = useComponent<TPathBasicConfig>(
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

  const shape = useMemo(() => {
    const { type, circle, custom, rect } = target;
    if (type === 'circle') {
      const { radius, color } = circle;
      return (
        <div
          className={styles['component-other-path-basic-shape']}
          id={shapeId.current}
          style={{
            borderRadius: '50%',
            backgroundColor: getRgbaString(color),
            width: radius,
            height: radius,
          }}
        />
      );
    } else if (type === 'rect') {
      const { width, height, color } = rect;
      return (
        <div
          className={styles['component-other-path-basic-shape']}
          id={shapeId.current}
          style={{
            backgroundColor: getRgbaString(color),
            width,
            height,
          }}
        />
      );
    } else {
      const { width, height, value } = custom;
      return (
        <div
          className={styles['component-other-path-basic-shape']}
          id={shapeId.current}
          style={{
            backgroundImage: `url(${value})`,
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
            width,
            height,
          }}
        />
      );
    }
  }, [target]);

  const getOpacity = useCallback((opacity: typeof animation['opacity']) => {
    if (opacity === 'none') return 1;
    return opacity.split('-').map((item) => parseInt(item));
  }, []);

  const getLoop = useCallback(
    (
      loop: typeof animation['type'],
      moveType: typeof animation['moveType'],
    ) => {
      if (loop === 'to' || loop === 'from') {
        const base = {
          loop: true,
        };
        if (loop === 'to') {
          return {
            ...base,
            direction: 'normal',
          };
        }
        return {
          ...base,
          direction: 'reverse',
        };
      } else if (loop === 'to-from') {
        return {
          loop: true,
          direction: 'alternate',
        };
      } else if (loop === 'from-to') {
        const base = {
          loop: true,
          direction: 'alternate',
        };
        switch (moveType) {
          case 'linear':
            return base;
          case 'easeInSine':
            return {
              ...base,
              easing: 'easeOutSine',
            };
          case 'easeOutSine':
            return {
              ...base,
              easing: 'easeInSine',
            };
          case 'easeInOutCubic':
            return {
              ...base,
              easing: 'cubicBezier(0.35, 0, 0.65, 1)',
            };
          case 'easeInQuad':
            return {
              ...base,
              easing: 'cubicBezier(0.5, 0, 0.11, 0)',
            };
        }
      }
      return {
        loop: true,
        direction: 'alternate',
      };
    },
    [],
  );

  const onClick = () => {
    linkageMethod('click', {});
  };

  const setOption = async () => {
    await sleep(1000);

    chartInstance.current && Anime.remove(chartInstance.current);

    const { type, opacity, autoRotate, moveType, speed } = animation;

    const pathData = Anime.path(`#${svgId.current} path`);
    chartInstance.current = Anime({
      targets: `#${shapeId.current}`,
      opacity: getOpacity(opacity),
      duration: speed,
      easing: moveType,
      translateX: [pathData('x')],
      translateY: [pathData('y')],
      ...getLoop(type, moveType),
      ...(autoRotate ? { rotate: pathData('angle') } : { rotate: [0, 0] }),
    });

    if (type === 'from-to') {
      chartInstance.current.seek(speed);
    }
  };

  // 数据发生变化时
  useDeepCompareEffect(() => {
    setOption();
  }, [
    processedValue,
    finalValue.value,
    screenTheme,
    width,
    height,
    scale,
    animation,
  ]);

  return (
    <>
      <div
        className={classnames(
          className,
          styles['component-other-path-basic'],
          conditionClassName,
        )}
        style={merge(
          {
            width: '100%',
            height: '100%',
          },
          style,
          conditionStyle,
        )}
        id={chartId.current}
        onClick={onClick}
      >
        {children}
        {shape}
        <svg id={svgId.current} width={width} height={height}>
          <path
            fill="none"
            d={`${finalValue.value} ${
              finalValue.value.trim().toUpperCase().endsWith('Z') || !close
                ? ''
                : 'Z'
            }`}
            stroke={getRgbaString(path.color)}
            strokeOpacity={path.show ? 1 : 0}
            strokeWidth={path.width}
            {...(path.line === 'dashed'
              ? { strokeDasharray: path.dashedValue }
              : {})}
          ></path>
        </svg>
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

const PathBasic = connect(
  (state: ConnectState) => {
    return {
      scale: state.global.scale,
    };
  },
  () => ({}),
)(_PathBasic);

const WrapperPathBasic: typeof PathBasic & {
  id: ComponentData.TComponentSelfType;
} = PathBasic as any;

WrapperPathBasic.id = CHART_ID;

export default WrapperPathBasic;
