import { CSSProperties, useEffect, useRef, ReactNode } from 'react';
import { init } from 'echarts';
import { uniqueId, merge } from 'lodash';
import classnames from 'classnames';
import { useDeepUpdateEffect } from '@/hooks';
import {
  useComponent,
  useChartComponentResize,
  useChartValueMapField,
  useComponentResize,
  useAnimationChange,
  useCondition,
  useChartComponentTooltip,
  useChartPerConfig,
} from '@/components/ChartComponents/Common/Component/hook';
import { ComponentProps } from '@/components/ChartComponents/Common/Component/type';
import ColorSelect from '@/components/ColorSelect';
import FetchFragment, {
  TFetchFragmentRef,
} from '@/components/ChartComponents/Common/FetchFragment';
import { TStackBarConfig } from '../type';

const { getRgbaString } = ColorSelect;

const CHART_ID = 'STACK_BAR';

const StackBar = (props: {
  className?: string;
  style?: CSSProperties;
  value: ComponentData.TComponentData<TStackBarConfig>;
  global: ComponentProps['global'];
  children?: ReactNode;
}) => {
  const { className, style, value, global, children } = props;
  const { screenTheme, screenType } = global;

  const {
    id,
    config: { options },
  } = value;

  const { legend, series, xAxis, yAxis, tooltip, animation, condition, grid } =
    useChartPerConfig<TStackBarConfig>(options);

  const chartId = useRef<string>(uniqueId(CHART_ID));
  const chartInstance = useRef<echarts.ECharts>();
  const requestRef = useRef<TFetchFragmentRef>(null);

  useComponentResize(value, () => {
    chartInstance?.current?.resize();
  });

  const {
    request,
    syncInteractiveAction,
    getValue,
    requestUrl,
    componentFilter,
    value: processedValue = [],
    componentFilterMap,
    onCondition,
  } = useComponent<TStackBarConfig>(
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

  const {
    s: seriesKeys,
    x: xAxisKeys,
    y: yAxisValues,
  } = useChartValueMapField(processedValue, {
    map: componentFilterMap,
    fields: {
      seriesKey: 's',
      xAxisKeyKey: 'x',
      yAxisValue: 'y',
    },
    formatMethod: (value: any) => {
      return value.reduce(
        (acc: any, cur: any) => {
          const { x, y, s, stack } = cur;

          if (s && !acc.s[s]) acc.s[s] = '__default__empty__';
          if (x && !acc.x.includes(x)) acc.x.push(x);

          if (s) {
            if (stack) acc.s[s] = stack;

            if (!acc.y[s]) acc.y[s] = [];
            acc.y[s].push(y);
          } else {
            acc.y.defaultValue.push(y);
          }

          return acc;
        },
        {
          x: [],
          y: {
            defaultValue: [],
          },
          s: {},
        },
      );
    },
  });

  const seriesLength = Object.keys(seriesKeys || {}).length;

  const onClick = (params: any) => {
    const { seriesName, name, value } = params;
    syncInteractiveAction('click', {
      x: name,
      y: value,
      s: seriesName,
    });
  };

  const initChart = () => {
    const chart = init(
      document.querySelector(`#${chartId.current!}`)!,
      screenTheme,
      {
        renderer: 'canvas',
      },
    );
    chartInstance.current = chart;
    setOption();
  };

  const getSeries = () => {
    const { itemStyle, label, ...nextSeries } = series;
    const { animation: show, animationDuration, animationEasing } = animation;
    const baseSeries = {
      ...nextSeries,
      label: {
        ...label,
        color: getRgbaString(label.color),
      },
      type: 'bar',
      itemStyle: {
        color: getRgbaString(itemStyle[0]?.color),
      },
      barWidth: itemStyle[0]?.barWidth,
      data: yAxisValues._defaultValue_,
      emphasis: {
        focus: 'series',
      },
      animation: show,
      animationEasing,
      animationEasingUpdate: animationEasing,
      animationDuration,
      animationDurationUpdate: animationDuration,
      animationDelay: function (idx: number) {
        return idx * 50 + 1000;
      },
    };

    const realSeries = seriesLength
      ? Object.entries(seriesKeys).map((item: any, index: number) => {
          const [name, stack] = item;
          let base: any = {
            ...baseSeries,
            itemStyle: {
              color: getRgbaString(itemStyle[index]?.color),
            },
            barWidth: itemStyle[index]?.barWidth,
            data: yAxisValues[name] || [],
            name,
          };
          if (stack === '__default__empty__') return base;
          base.stack = stack;
          return base;
        })
      : [baseSeries];

    return realSeries;
  };

  const setOption = () => {
    const { animation, ...nextTooltip } = tooltip;

    const realSeries = getSeries();

    chartInstance.current?.setOption({
      grid: {
        ...grid,
      },
      legend: {
        ...legend,
        data: Object.keys(seriesKeys),
      },
      series: realSeries,
      xAxis: [
        {
          ...xAxis,
          splitLine: {
            show: false,
          },
          data: xAxisKeys,
        },
      ],
      yAxis: [yAxis],
      tooltip: {
        ...nextTooltip,
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
    });

    screenType !== 'edit' &&
      animation.show &&
      useChartComponentTooltip(chartInstance.current!, realSeries, {
        interval: animation.speed,
      });
  };

  useChartComponentResize(chartInstance.current!);

  useEffect(() => {
    initChart();
    return () => {
      chartInstance.current?.dispose();
    };
  }, [screenTheme]);

  useEffect(() => {
    chartInstance.current?.off('click');
    chartInstance.current?.on('click', onClick);
  }, [syncInteractiveAction]);

  // 数据发生变化时
  useDeepUpdateEffect(() => {
    setOption();
  }, [processedValue, seriesKeys, xAxisKeys, yAxisValues]);

  // 配置发生变化时
  useDeepUpdateEffect(() => {
    setOption();
    chartInstance.current?.resize();
  }, [options]);

  useAnimationChange(chartInstance.current!, animation, setOption);

  return (
    <>
      <div
        className={classnames(className, conditionClassName)}
        style={merge(
          {
            width: '100%',
            height: '100%',
          },
          style,
          conditionStyle,
        )}
      >
        <div id={chartId.current} className="w-100 h-100"></div>
        {children}
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

const WrapperStackBar: typeof StackBar & {
  id: ComponentData.TComponentSelfType;
} = StackBar as any;

WrapperStackBar.id = CHART_ID;

export default WrapperStackBar;
