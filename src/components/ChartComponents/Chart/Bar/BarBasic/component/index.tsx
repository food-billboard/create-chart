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
import { TBarBasicConfig } from '../type';

const { getRgbaString } = ColorSelect;

const CHART_ID = 'BAR_BASIC';

const BarBasic = (props: {
  className?: string;
  style?: CSSProperties;
  value: ComponentData.TComponentData<TBarBasicConfig>;
  global: ComponentProps['global'];
}) => {
  const { className, style, value, global } = props;

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
  } = useComponent<TBarBasicConfig>(
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

  const initChart = () => {
    const chart = init(document.querySelector(`#${chartId.current!}`)!, {
      renderer: 'canvas',
    });
    chartInstance.current = chart;
    // setOption();
  };

  const getSeries = () => {
    const { itemStyle, backgroundStyle, label, ...nextSeries } = series;
    const { animation: show, animationDuration, animationEasing } = animation;
    const baseSeries = {
      ...nextSeries,
      backgroundStyle: {
        ...backgroundStyle,
        color: getRgbaString(backgroundStyle.color),
      },
      label: {
        ...label,
        color: getRgbaString(label.color),
      },
      type: 'bar',
      itemStyle: {
        ...itemStyle,
        color: getRgbaString(itemStyle.color[0]) || 'auto',
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
          return {
            ...baseSeries,
            itemStyle: {
              ...itemStyle,
              color: getRgbaString(itemStyle.color[index]) || 'auto',
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
    const { axisLabel: xAxisLabel, ...nextXAxis } = xAxis;
    const { axisLabel: yAxisLabel, ...nextYAxis } = yAxis;
    const series = getSeries();

    chartInstance.current?.setOption({
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
    });
  };

  useChartComponentResize(chartInstance.current!);

  useEffect(() => {
    initChart();
    return () => {
      chartInstance.current?.dispose();
    };
  }, []);

  // 数据发生变化时
  useDeepCompareEffect(() => {
    setOption();
    chartInstance.current?.resize();
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

const WrapperBarBasic: typeof BarBasic & {
  id: ComponentData.TComponentSelfType;
} = BarBasic as any;

WrapperBarBasic.id = CHART_ID;

export default WrapperBarBasic;
