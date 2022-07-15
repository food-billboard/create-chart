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
  useChartComponentTooltip,
  useChartPerConfig,
} from '@/components/ChartComponents/Common/Component/hook';
import { ComponentProps } from '@/components/ChartComponents/Common/Component/type';
import ColorSelect from '@/components/ColorSelect';
import FetchFragment, {
  TFetchFragmentRef,
} from '@/components/ChartComponents/Common/FetchFragment';
import { TBubbleScatterConfig } from '../type';

const { getRgbaString } = ColorSelect;

const CHART_ID = 'BUBBLE_SCATTER';

const BubbleScatter = (props: {
  className?: string;
  style?: CSSProperties;
  value: ComponentData.TComponentData<TBubbleScatterConfig>;
  global: ComponentProps['global'];
}) => {
  const { className, style, value, global } = props;
  const { screenTheme, screenType } = global;

  const {
    id,
    config: { options },
  } = value;

  const { series, tooltip, animation, xAxis, condition, title, grid } =
    useChartPerConfig<TBubbleScatterConfig>(options);

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
    onCondition,
  } = useComponent<TBubbleScatterConfig>(
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
    const { itemStyle, symbolSize } = series;
    const { animation: show, animationDuration, animationEasing } = animation;
    const { axisTick, axisLine, ...nextXAxis } = xAxis;

    const baseTitle: any = {
      show: title.show,
      textBaseline: 'middle',
      text: title.defaultValue,
      top: '50%',
      textStyle: {
        ...title.textStyle,
        color: getRgbaString(title.textStyle.color),
      },
    };

    const baseAxis: any = {
      ...nextXAxis,
      ...grid,
      type: 'category',
      boundaryGap: false,
      data: xAxisKeys,
      axisTick: {
        ...axisTick,
        lineStyle: {
          ...axisTick.lineStyle,
          color: getRgbaString(axisTick.lineStyle.color),
        },
      },
      axisLine: {
        ...axisLine,
        lineStyle: {
          ...axisLine.lineStyle,
          color: getRgbaString(axisLine.lineStyle.color),
        },
      },
    };

    const baseSeries = {
      type: 'scatter',
      itemStyle: {
        color: getRgbaString(itemStyle.color[0]),
      },
      symbolSize: function (dataItem: any) {
        return dataItem * symbolSize;
      },
      symbol: 'circle',
      singleAxisIndex: 0,
      coordinateSystem: 'singleAxis',
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
              ...itemStyle,
              color: getRgbaString(itemStyle.color[index]),
            },
            data: yAxisValues[item],
            name: item,
          };
        })
      : [baseSeries];

    return {
      series: realSeries,
      title: baseTitle,
      axis: [baseAxis],
    };
  };

  const setOption = () => {
    const { animation, ...nextTooltip } = tooltip;

    const { series, axis, title } = getSeries();

    chartInstance.current?.setOption(
      {
        title,
        yAxis: {
          show: false,
        },
        series,
        singleAxis: axis,
        tooltip: {
          ...nextTooltip,
          trigger: 'item',
        },
      },
      true,
    );
    screenType !== 'edit' &&
      animation.show &&
      useChartComponentTooltip(chartInstance.current!, series, {
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

const WrapperBubbleScatter: typeof BubbleScatter & {
  id: ComponentData.TComponentSelfType;
} = BubbleScatter as any;

WrapperBubbleScatter.id = CHART_ID;

export default WrapperBubbleScatter;
