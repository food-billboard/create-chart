import { uniqueId, merge } from 'lodash';
import { useEffect, useRef } from 'react';
import {
  useComponent,
  useChartComponentResize,
  useChartValueMapField,
  useComponentResize,
  useAnimationChange,
  useCondition,
  ConditionComponent,
  useChartComponentTooltip,
  useChartPerConfig,
} from '@/components/ChartComponents/Common/Component/hook';
import FetchFragment from '@/components/ChartComponents/Common/FetchFragment';
import { radialGradientColor } from '@/components/ChartComponents/Common/utils';
import ColorSelect from '@/components/ColorSelect';
import { useDeepUpdateEffect } from '@/hooks';
import { init } from '@/utils/Assist/EchartsLoader';
import { CHART_ID } from '../id';
import { TCachetBarConfig } from '../type';

const { getRgbaString } = ColorSelect;

const CachetBar = (
  props: ComponentData.CommonComponentProps<TCachetBarConfig>,
) => {
  const { className, style, value, global, children, wrapper: Wrapper } = props;
  const { screenTheme, screenType } = global;

  const {
    id,
    config: {
      options,
      style: { border },
    },
  } = value;

  const { legend, series, xAxis, yAxis, tooltip, animation, condition, grid } =
    useChartPerConfig<TCachetBarConfig>(options);

  const chartId = useRef<string>(uniqueId(CHART_ID));
  const chartInstance = useRef<echarts.ECharts>();

  useComponentResize(value, () => {
    chartInstance?.current?.resize();
  });

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
  } = useComponent<TCachetBarConfig>({
    component: value,
    global,
  });

  const { onCondition: propsOnCondition } = useCondition({
    onCondition,
    screenType,
    componentId: id,
  });

  const { seriesKeys, xAxisKeys, yAxisValues } = useChartValueMapField(
    processedValue,
    {
      map: componentFilterMap,
      fields: {
        seriesKey: 's',
        xAxisKeyKey: 'x',
        yAxisValue: 'y',
      },
    },
  );

  const onClick = (params: any) => {
    const { seriesName, name, value } = params;
    const target = {
      x: name,
      y: value,
      s: seriesName,
    };
    syncInteractiveAction('click', target);
    linkageMethod('click-item', target);
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
    let max = Math.max(...(yAxisValues._defaultValue_ || []));
    const { itemStyle, label, backgroundStyle, borderRadius, ...nextSeries } =
      series;
    const { animation: show, animationDuration, animationEasing } = animation;
    const baseSeries = {
      ...nextSeries,
      label: {
        ...label,
        position: 'inside',
        color: getRgbaString(label.color),
      },
      xAxisIndex: 1,
      type: 'bar',
      itemStyle: {
        ...itemStyle,
        borderRadius,
        color: radialGradientColor(itemStyle.color[0]),
      },
      data: yAxisValues._defaultValue_,
      emphasis: {
        focus: 'series',
      },
      animation: show,
      animationEasing,
      animationEasingUpdate: animationEasing,
      animationDuration,
      animationDurationUpdate: animationDuration,
    };

    const realSeries = seriesKeys.length
      ? seriesKeys.map((item: any, index: number) => {
          max = Math.max(...yAxisValues[item], max);

          return {
            ...baseSeries,
            itemStyle: {
              ...itemStyle,
              borderRadius,
              color: radialGradientColor(itemStyle.color[index]),
            },
            data: yAxisValues[item] || [],
            name: item,
          };
        })
      : [baseSeries];

    return {
      series: realSeries,
      max: max * 1.2,
    };
  };

  const setOption = () => {
    const { animation, ...nextTooltip } = tooltip;
    const { barWidth, backgroundStyle } = series;

    const { series: realSeries, max } = getSeries();

    chartInstance.current?.setOption({
      grid: {
        ...grid,
      },
      legend: {
        ...legend,
        data: seriesKeys,
      },
      series: [
        {
          data: new Array(xAxisKeys?.length || 1).fill(max),
          type: 'bar',
          xAxisIndex: 0,
          silent: true,
          itemStyle: {
            color: getRgbaString(backgroundStyle.backgroundColor),
            borderColor: getRgbaString(backgroundStyle.borderColor),
            borderRadius: [
              backgroundStyle.borderRadius,
              backgroundStyle.borderRadius,
              0,
              0,
            ],
            borderWidth: backgroundStyle.borderWidth,
          },
          barWidth: ((seriesKeys.length || 1) + 1) * barWidth,
          tooltip: {
            show: false,
          },
        },
        ...realSeries,
      ],
      xAxis: [
        {
          data: new Array(xAxisKeys?.length || 1).fill(max),
          axisLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          position: 'bottom',
        },
        {
          ...xAxis,
          position: 'bottom',
          data: xAxisKeys,
          axisLine: {
            show: true,
            lineStyle: {
              color: getRgbaString(backgroundStyle.borderColor),
            },
          },
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
      <ConditionComponent
        componentId={id}
        className={className}
        style={merge(
          {
            width: '100%',
            height: '100%',
          },
          style,
        )}
      >
        <Wrapper border={border}>
          <div id={chartId.current} className="w-100 h-100"></div>
          {children}
        </Wrapper>
      </ConditionComponent>
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

const WrapperCachetBar: typeof CachetBar & {
  id: ComponentData.TComponentSelfType;
} = CachetBar as any;

WrapperCachetBar.id = CHART_ID;

export default WrapperCachetBar;
