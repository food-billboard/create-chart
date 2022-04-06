import { CSSProperties, useEffect, useRef } from 'react';
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
  const { screenTheme } = global;

  const {
    id,
    config: { options },
  } = value;

  const { legend, series, xAxis, yAxis, tooltip, animation, condition } =
    options;

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
  } = useComponent<TBarBasicConfig>(
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
  } = useCondition(onCondition);

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
    const {
      axisLabel: xAxisLabel,
      nameTextStyle: xNameTextStyle,
      ...nextXAxis
    } = xAxis;
    const {
      axisLabel: yAxisLabel,
      nameTextStyle: yNameTextStyle,
      splitLine,
      ...nextYAxis
    } = yAxis;
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
            ...splitLine,
            lineStyle: {
              ...splitLine.lineStyle,
              color: getRgbaString(splitLine.lineStyle.color),
            },
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
        className={classnames(className, conditionClassName)}
        style={merge(
          {
            width: '100%',
            height: '100%',
          },
          style,
          conditionStyle,
        )}
        id={chartId.current}
      ></div>
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

const WrapperBarBasic: typeof BarBasic & {
  id: ComponentData.TComponentSelfType;
} = BarBasic as any;

WrapperBarBasic.id = CHART_ID;

export default WrapperBarBasic;
