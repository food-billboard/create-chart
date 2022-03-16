import { CSSProperties, useEffect, useRef } from 'react';
import { init } from 'echarts';
import { uniqueId, merge } from 'lodash';
import { useDeepUpdateEffect } from '@/hooks';
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
import { TBoxPlotBasicConfig } from '../type';

const { getRgbaString } = ColorSelect;

const CHART_ID = 'BOX_PLOT_BASIC';

const BoxPlotBasic = (props: {
  className?: string;
  style?: CSSProperties;
  value: ComponentData.TComponentData<TBoxPlotBasicConfig>;
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
  } = useComponent<TBoxPlotBasicConfig>(
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
    const { itemStyle, ...nextSeries } = series;
    const { animation: show, animationDuration, animationEasing } = animation;

    const baseSeries = {
      ...nextSeries,
      type: 'boxplot',
      itemStyle: {
        ...(itemStyle[0] || {}),
        color: getRgbaString(itemStyle[0]?.color),
        borderColor: getRgbaString(itemStyle[0]?.borderColor),
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
            itemStyle: {
              ...(itemStyle[index] || {}),
              color: getRgbaString(itemStyle[index]?.color),
              borderColor: getRgbaString(itemStyle[index]?.borderColor),
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
  useDeepUpdateEffect(() => {
    setOption();
    chartInstance.current?.resize();
  }, [processedValue]);

  // 配置发生变化时
  useDeepUpdateEffect(() => {
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

const WrapperBoxPlotBasic: typeof BoxPlotBasic & {
  id: ComponentData.TComponentSelfType;
} = BoxPlotBasic as any;

WrapperBoxPlotBasic.id = CHART_ID;

export default WrapperBoxPlotBasic;
