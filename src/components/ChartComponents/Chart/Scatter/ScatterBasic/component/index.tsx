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
import { TScatterBasicConfig } from '../type';

const { getRgbaString } = ColorSelect;

const CHART_ID = 'SCATTER_BASIC';

const ScatterBasic = (props: {
  className?: string;
  style?: CSSProperties;
  value: ComponentData.TComponentData<TScatterBasicConfig>;
  global: ComponentProps['global'];
}) => {
  const { className, style, value, global } = props;
  const { screenTheme } = global;

  const {
    config: { options },
  } = value;

  const { legend, series, tooltip, animation, xAxis, yAxis } = options;

  const chartId = useRef<string>(uniqueId(CHART_ID));
  const chartInstance = useRef<echarts.ECharts>();
  const requestRef = useRef<TFetchFragmentRef>(null);

  useComponentResize(value, () => {
    chartInstance?.current?.resize();
  });

  const {
    request,
    getValue,
    requestUrl,
    componentFilter,
    value: processedValue = [],
    componentFilterMap,
  } = useComponent<TScatterBasicConfig>(
    {
      component: value,
      global,
    },
    requestRef,
  );

  const { xAxisKeys, yAxisValues, seriesKeys } = useChartValueMapField(
    processedValue,
    {
      map: componentFilterMap,
      fields: {
        seriesKey: 's',
        xAxisKeyKey: 'name',
        yAxisValue: 'value',
      },
    },
  );

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
      type: 'scatter',
      itemStyle: {
        ...(itemStyle[0] || {}),
        color: getRgbaString(itemStyle[0]?.color) || 'auto',
      },
      data: yAxisValues._defaultValue_,
      animation: show,
      animationEasing,
      animationEasingUpdate: animationEasing,
      animationDuration,
      animationDurationUpdate: animationDuration,
      emphasis: {
        focus: 'series',
        blurScope: 'coordinateSystem',
        scale: true,
      },
    };

    const realSeries = seriesKeys.length
      ? seriesKeys.map((item: any, index: number) => {
          return {
            ...baseSeries,
            itemStyle: {
              ...(itemStyle[index] || {}),
              color: getRgbaString(itemStyle[index]?.color) || 'auto',
            },
            data: yAxisValues[item],
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
          textStyle: {
            ...legendTextStyle,
            color: getRgbaString(legendTextStyle.color),
          },
        },
        xAxis: [
          {
            ...nextXAxis,
            scale: true,
            splitLine: {
              show: false,
            },
            axisLabel: {
              ...xAxisLabel,
              color: getRgbaString(xAxisLabel.color),
            },
            data: xAxisKeys,
            nameTextStyle: {
              ...xNameTextStyle,
              color: getRgbaString(xNameTextStyle.color),
            },
          },
        ],
        yAxis: [
          {
            ...nextYAxis,
            scale: true,
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
        series,
        tooltip: {
          ...nextTooltip,
          trigger: 'item',
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

const WrapperPieBasic: typeof ScatterBasic & {
  id: ComponentData.TComponentSelfType;
} = ScatterBasic as any;

WrapperPieBasic.id = CHART_ID;

export default WrapperPieBasic;
