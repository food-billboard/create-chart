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
import { TLineBarConfig } from '../type';

const { getRgbaString } = ColorSelect;

const LineBar = (props: ComponentData.CommonComponentProps<TLineBarConfig>) => {
  const { className, style, value, global, children, wrapper: Wrapper } = props;
  const { screenTheme, screenType } = global;

  const {
    id,
    config: {
      options,
      style: { border },
    },
  } = value;

  const {
    legend,
    series,
    xAxis,
    yAxis,
    yAxis2,
    tooltip,
    animation,
    condition,
    grid,
  } = useChartPerConfig<TLineBarConfig>(options);

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
  } = useComponent<TLineBarConfig>({
    component: value,
    global,
  });

  const { onCondition: propsOnCondition } = useCondition({
    onCondition,
    screenType,
    componentId: id,
  });

  const {
    s: seriesKeys,
    x: xAxisKeys,
    y: yAxisValues,
    y2: y2AxisValues,
    s2: series2Keys,
  } = useChartValueMapField(processedValue, {
    map: componentFilterMap,
    fields: {
      seriesKey: 's',
      xAxisKeyKey: 'x',
      yAxisValue: 'y',
    },
    formatMethod: (value) => {
      return value.reduce(
        (acc: any, cur: any) => {
          const { x, y, s, y2, s2 } = cur;

          if (s && !acc.s.includes(s)) acc.s.push(s);
          if (s2 && !acc.s2.includes(s2)) acc.s2.push(s2);
          if (x && !acc.x.includes(x)) acc.x.push(x);

          if (s) {
            if (!acc.y[s]) acc.y[s] = [];
            if (y !== undefined) {
              acc.y[s].push(y);
            }
          } else if (s2) {
            if (!acc.y2[s2]) acc.y2[s2] = [];
            if (y2 !== undefined) {
              acc.y2[s2].push(y2);
            }
          } else {
            if (y !== undefined) {
              acc.y._defaultValue_.push(y);
            }
            if (y2 !== undefined) {
              acc.y2._defaultValue_.push(y2);
            }
          }

          return acc;
        },
        {
          x: [],
          y: {
            _defaultValue_: [],
          },
          y2: {
            _defaultValue_: [],
          },
          s: [],
          s2: [],
        },
      );
    },
  });

  const onClick = (params: any) => {
    const { seriesName, name, value, componentSubType } = params;

    let target: any = {};

    if (componentSubType === 'bar') {
      target = {
        x: name,
        y: value,
        s: seriesName,
      };
    } else {
      target = {
        x: name,
        y2: value,
        s2: seriesName,
      };
    }
    syncInteractiveAction(`click-${componentSubType}`, target);
    linkageMethod(`click-item-${componentSubType}`, target);
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
    const { itemStyle, label, style, ...nextSeries } = series;
    const baseLineSeries = {
      ...nextSeries,
      z: 2,
      label: {
        ...label,
        color: getRgbaString(label.color),
      },
      type: 'line',
      yAxisIndex: 1,
      symbolSize: 6,
      areaStyle: {
        color: radialGradientColor(itemStyle[0]?.line.areaColor),
      },
      lineStyle: {
        width: style.line.lineWidth,
        color: getRgbaString(itemStyle[0]?.line.color),
      },
      smooth: style.line.smooth,
      data: y2AxisValues._defaultValue_,
      emphasis: {
        focus: 'series',
      },
      animation: animation.line.animation,
      animationEasing: animation.line.animationEasing,
      animationEasingUpdate: animation.line.animationEasing,
      animationDuration: animation.bar.animationDuration,
      animationDurationUpdate: animation.line.animationDuration,
    };
    const baseBarSeries = {
      ...nextSeries,
      z: 3,
      label: {
        ...label,
        position: 'inside',
        color: getRgbaString(label.color),
      },
      type: 'bar',
      itemStyle: {
        color: radialGradientColor(itemStyle[0]?.bar.color),
        borderRadius: [style.bar.borderRadius, style.bar.borderRadius, 0, 0],
      },
      barWidth: style.bar.barWidth,
      data: yAxisValues._defaultValue_,
      emphasis: {
        focus: 'series',
      },
      animation: animation.bar.animation,
      animationEasing: animation.bar.animationEasing,
      animationEasingUpdate: animation.bar.animationEasing,
      animationDuration: animation.bar.animationDuration,
      animationDurationUpdate: animation.bar.animationDuration,
    };
    const realBarSeries = seriesKeys.length
      ? seriesKeys.map((item: any, index: number) => {
          return {
            ...baseBarSeries,
            itemStyle: {
              color: radialGradientColor(itemStyle[index]?.bar.color),
            },
            data: yAxisValues[item] || [],
            name: item,
          };
        })
      : [baseBarSeries];
    const realLineSeries = series2Keys.length
      ? series2Keys.map((item: any, index: number) => {
          return {
            ...baseLineSeries,
            areaStyle: {
              color: radialGradientColor(itemStyle[0]?.line.areaColor),
            },
            lineStyle: {
              width: style.line.lineWidth,
              color: getRgbaString(itemStyle[0]?.line.color),
            },
            data: y2AxisValues[series2Keys[index] || item] || [],
            name: series2Keys[index] || item,
          };
        })
      : [baseLineSeries];

    return [...realLineSeries, ...realBarSeries];
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
        data: seriesKeys,
      },
      series: realSeries,
      xAxis: [
        {
          ...xAxis,
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitArea: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          data: xAxisKeys,
        },
      ],
      yAxis: [
        {
          ...yAxis,
          type: 'value',
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          position: 'left',
        },
        {
          ...yAxis2,
          type: 'value',
          position: 'right',
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          splitLine: {
            show: false,
          },
        },
      ],
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
  }, [
    processedValue,
    seriesKeys,
    xAxisKeys,
    yAxisValues,
    y2AxisValues,
    series2Keys,
  ]);

  // 配置发生变化时
  useDeepUpdateEffect(() => {
    setOption();
    chartInstance.current?.resize();
  }, [options]);

  useAnimationChange(chartInstance.current!, animation.bar, setOption);
  useAnimationChange(chartInstance.current!, animation.line, setOption);

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

const WrapperLineBar: typeof LineBar & {
  id: ComponentData.TComponentSelfType;
} = LineBar as any;

WrapperLineBar.id = CHART_ID;

export default WrapperLineBar;
