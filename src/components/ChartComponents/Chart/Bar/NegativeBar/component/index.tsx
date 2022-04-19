import { CSSProperties, useEffect, useRef } from 'react';
import { init } from 'echarts';
import { uniqueId, merge, pick } from 'lodash';
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
} from '@/components/ChartComponents/Common/Component/hook';
import { ComponentProps } from '@/components/ChartComponents/Common/Component/type';
import ColorSelect from '@/components/ColorSelect';
import FetchFragment, {
  TFetchFragmentRef,
} from '@/components/ChartComponents/Common/FetchFragment';
import { TNegativeBarConfig } from '../type';

const { getRgbaString } = ColorSelect;

const CHART_ID = 'NEGATIVE_BAR';

const NegativeBar = (props: {
  className?: string;
  style?: CSSProperties;
  value: ComponentData.TComponentData<TNegativeBarConfig>;
  global: ComponentProps['global'];
}) => {
  const { className, style, value, global } = props;
  const { screenTheme, screenType } = global;

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
  } = useComponent<TNegativeBarConfig>(
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

    const commonSeries = {
      ...nextSeries,
      legendHoverLink: false,
      type: 'bar',
      emphasis: {
        focus: 'none',
      },
      animation: show,
      animationEasing,
      animationEasingUpdate: animationEasing,
      animationDuration,
      animationDurationUpdate: animationDuration,
    };

    const baseSeries = [
      {
        ...commonSeries,
        itemStyle: {
          ...itemStyle,
          color: getRgbaString(itemStyle.color[0]) || 'auto',
        },
        label: {
          ...label[0],
          color: getRgbaString(label[0].color),
          formatter: label[0].formatter,
        },
        data: yAxisValues._defaultValue_?.map((item: any) => item?.[0] || 0),
        stack: '__default_stack__',
      },
      {
        ...commonSeries,
        itemStyle: {
          ...itemStyle,
          color: getRgbaString(itemStyle.color[1]) || 'auto',
        },
        label: {
          ...label[1],
          color: getRgbaString(label[1].color),
          formatter: label[1].formatter,
        },
        data: yAxisValues._defaultValue_?.map((item: any) => item?.[1] || 0),
        stack: '__default_stack__',
      },
    ];

    const realSeries = seriesKeys.length
      ? seriesKeys.reduce((acc: any, item: any, index: number) => {
          acc.push(
            {
              ...baseSeries[0],
              itemStyle: {
                ...itemStyle,
                color: getRgbaString(itemStyle.color[index * 2]) || 'auto',
              },
              data: (yAxisValues[item] || []).map((item: any) => item?.[0]),
              name: item,
              stack: item,
            },
            {
              ...baseSeries[1],
              itemStyle: {
                ...itemStyle,
                color: getRgbaString(itemStyle.color[index * 2 + 1]) || 'auto',
              },
              data: (yAxisValues[item] || []).map((item: any) => item?.[1]),
              name: item,
              stack: item,
            },
          );
        }, [])
      : baseSeries;

    return realSeries;
  };

  const setOption = () => {
    const { textStyle: legendTextStyle, ...nextLegend } = legend;
    const {
      backgroundColor,
      textStyle: tooltipTextStyle,
      animation,
      ...nextTooltip
    } = tooltip;
    const {
      splitLine,
      axisLabel: xAxisLabel,
      nameTextStyle: xNameTextStyle,
      ...nextXAxis
    } = xAxis;
    const {
      axisLabel: yAxisLabel,
      nameTextStyle: yNameTextStyle,
      ...nextYAxis
    } = yAxis;

    const realSeries = getSeries();

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
      series: realSeries,
      xAxis: [
        {
          ...nextXAxis,
          type: 'value',
          splitLine: {
            ...splitLine,
            lineStyle: {
              ...splitLine.lineStyle,
              color: getRgbaString(splitLine.lineStyle.color),
            },
          },
          axisLine: {
            show: true,
          },
          axisTick: {
            show: false,
          },
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
          type: 'category',
          data: xAxisKeys,
          axisTick: {
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

const WrapperNegativeBar: typeof NegativeBar & {
  id: ComponentData.TComponentSelfType;
} = NegativeBar as any;

WrapperNegativeBar.id = CHART_ID;

export default WrapperNegativeBar;
