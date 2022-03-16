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
import { TGaugeBasicConfig } from '../type';

const { getRgbaString } = ColorSelect;

const CHART_ID = 'GAUGE_BASIC';

const GaugeBasic = (props: {
  className?: string;
  style?: CSSProperties;
  value: ComponentData.TComponentData<TGaugeBasicConfig>;
  global: ComponentProps['global'];
}) => {
  const { className, style, value, global } = props;
  const { screenTheme } = global;

  const {
    config: { options },
  } = value;

  const { series, animation } = options;

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
  } = useComponent<TGaugeBasicConfig>(
    {
      component: value,
      global,
    },
    requestRef,
  );

  const { xAxisKeys, yAxisValues } = useChartValueMapField(processedValue, {
    map: componentFilterMap,
    fields: {
      seriesKey: '',
      xAxisKeyKey: 'name',
      yAxisValue: 'value',
    },
  });

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
    const {
      center,
      radius,
      progress,
      splitLine,
      axisTick,
      axisLabel,
      pointer,
      title,
      detail,
      ...nextSeries
    } = series;
    const { animation: show, animationDuration, animationEasing } = animation;

    const baseSeries = {
      ...nextSeries,
      center: center.map((item) => `${item}%`),
      radius: radius + '%',
      type: 'gauge',
      progress: {
        ...progress,
        itemStyle: {
          color: getRgbaString(progress.color),
        },
      },
      splitLine: {
        ...splitLine,
        color: getRgbaString(splitLine.color),
      },
      axisLabel: {
        ...axisLabel,
        color: getRgbaString(axisLabel.color),
      },
      pointer: {
        ...pointer,
        itemStyle: {
          ...pointer.itemStyle,
          color: getRgbaString(pointer.itemStyle.color),
        },
      },
      title: {
        ...title,
        color: getRgbaString(title.color),
      },
      detail: {
        ...detail,
        color: getRgbaString(detail.color),
      },
      axisTick: {
        ...axisTick,
        lineStyle: {
          ...axisTick.lineStyle,
          color: getRgbaString(axisTick.lineStyle.color),
        },
      },
      data: xAxisKeys.map((item: any, index: number) => {
        return {
          name: item,
          value: yAxisValues._defaultValue_[index],
        };
      }),
      animation: show,
      animationEasing,
      animationEasingUpdate: animationEasing,
      animationDuration,
      animationDurationUpdate: animationDuration,
    };

    return baseSeries;
  };

  const setOption = () => {
    const series = getSeries();

    chartInstance.current?.setOption(
      {
        series,
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

const WrapperGaugeBasic: typeof GaugeBasic & {
  id: ComponentData.TComponentSelfType;
} = GaugeBasic as any;

WrapperGaugeBasic.id = CHART_ID;

export default WrapperGaugeBasic;
