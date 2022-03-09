import { CSSProperties, useEffect, useRef } from 'react';
import { init } from 'echarts';
import { uniqueId, merge } from 'lodash';
import { useUpdateEffect, useDeepCompareEffect } from 'ahooks';
import {
  useComponent,
  useChartComponentResize,
  useChartValueMapField,
  useComponentResize,
  useAnimationChange,
} from '@/components/ChartComponents/Common/Component/hook';
import { ComponentProps } from '@/components/ChartComponents/Common/Component/type';
import ColorSelect from '@/components/ColorSelect';
import FetchFragment, {
  TFetchFragmentRef,
} from '@/components/ChartComponents/Common/FetchFragment';
import { TLineBasicConfig } from '../type';

const { getRgbaString } = ColorSelect;

const CHART_ID = 'LINE_BASIC';

const LineBasic = (props: {
  className?: string;
  style?: CSSProperties;
  value: ComponentData.TComponentData<TLineBasicConfig>;
  global: ComponentProps['global'];
}) => {
  const { className, style, value, global } = props;
  const { screenTheme } = global;

  const {
    config: { options },
  } = value;

  const { legend, series, xAxis, yAxis, tooltip, animation } = options;

  const chartId = useRef<string>(uniqueId(CHART_ID));
  const chartInstance = useRef<echarts.ECharts>();
  const requestRef = useRef<TFetchFragmentRef>(null);
  const isFirst = useRef<boolean>(true);

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
  } = useComponent<TLineBasicConfig>(
    {
      component: value,
      global,
    },
    requestRef,
  );

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
    const { seriesName, name, data } = params;
    syncInteractiveAction('click', {
      x: name,
      y: data,
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
    const { itemStyle, label, areaStyle, lineStyle, ...nextSeries } = series;
    const { animation: show, animationDuration, animationEasing } = animation;
    const { decal, color, ...nextItemStyle } = itemStyle;

    const baseSeries = {
      ...nextSeries,
      ...(decal[0] || {}),
      smoothMonotone: 'x',
      label: {
        ...label,
        color: getRgbaString(label.color),
      },
      type: 'line',
      itemStyle: {
        ...nextItemStyle,
        color: getRgbaString(color[0]),
      },
      areaStyle: {
        color: getRgbaString(areaStyle.color[0]) || 'transparent',
      },
      lineStyle: {
        ...(lineStyle[0] || {}),
        color: getRgbaString(lineStyle[0]?.color),
      },
      data: yAxisValues._defaultValue_,
      animation: show,
      animationEasing,
      animationEasingUpdate: animationEasing,
      animationDuration,
      animationDurationUpdate: animationDuration,
    };

    const realSeries = seriesKeys.length
      ? seriesKeys.map((item: any, index: number) => {
          return {
            ...baseSeries,
            ...(decal[index] || {}),
            itemStyle: {
              ...nextItemStyle,
              color: getRgbaString(itemStyle.color[index]),
            },
            areaStyle: {
              color: getRgbaString(areaStyle.color[index]) || 'transparent',
            },
            lineStyle: {
              ...(lineStyle[index] || {}),
              color: getRgbaString(lineStyle[index]?.color),
            },
            data: yAxisValues[item] || [],
            name: item,
          };
        })
      : baseSeries;

    return realSeries;
  };

  const setOption = () => {
    const { textStyle: legendTextStyle, ...nextLegend } = legend;
    const {
      backgroundColor,
      textStyle: tooltipTextStyle,
      ...nextTooltip
    } = tooltip;
    const {
      axisLabel: xAxisLabel,
      nameTextStyle: xNameTextStyle,
      ...nextXAxis
    } = xAxis;
    const {
      axisLabel: yAxisLabel,
      nameTextStyle: yNameTextStyle,
      ...nextYAxis
    } = yAxis;
    const series = getSeries();

    chartInstance.current?.setOption(
      {
        grid: {
          show: false,
        },
        legend: {
          ...nextLegend,
          data: seriesKeys,
          textStyle: {
            ...legendTextStyle,
            color: getRgbaString(legendTextStyle.color),
          },
        },
        series,
        xAxis: [
          {
            ...nextXAxis,
            splitLine: {
              show: false,
            },
            data: xAxisKeys,
            axisLabel: {
              ...xAxisLabel,
              color: getRgbaString(xAxisLabel.color),
            },
            nameTextStyle: {
              ...xNameTextStyle,
              color: getRgbaString(xNameTextStyle.color),
            },
          },
        ],
        yAxis: [
          {
            ...nextYAxis,
            splitLine: {
              show: false,
            },
            axisLabel: {
              ...yAxisLabel,
              color: getRgbaString(yAxisLabel.color),
            },
            nameTextStyle: {
              ...yNameTextStyle,
              color: getRgbaString(yNameTextStyle.color),
            },
          },
        ],
        tooltip: {
          ...nextTooltip,
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
          backgroundColor: getRgbaString(backgroundColor),
          textStyle: {
            ...tooltipTextStyle,
            color: getRgbaString(tooltipTextStyle.color),
          },
        },
      },
      true,
    );
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
  useDeepCompareEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
    } else {
      setOption();
      chartInstance.current?.resize();
    }
  }, [processedValue]);

  // 配置发生变化时
  useUpdateEffect(() => {
    setOption();
    chartInstance.current?.resize();
  }, [options]);

  useAnimationChange(chartInstance.current!, animation, setOption);

  return (
    <>
      <div
        className={className}
        style={merge(
          {
            width: '100%',
            height: '100%',
          },
          style,
        )}
        id={chartId.current}
      ></div>
      <FetchFragment
        url={requestUrl}
        ref={requestRef}
        reFetchData={request}
        reGetValue={getValue}
        componentFilter={componentFilter}
      />
    </>
  );
};

const WrapperLineBasic: typeof LineBasic & {
  id: ComponentData.TComponentSelfType;
} = LineBasic as any;

WrapperLineBasic.id = CHART_ID;

export default WrapperLineBasic;
