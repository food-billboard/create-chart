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
  useChartPerConfig,
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
    id,
    config: { options },
  } = value;

  const { legend, series, xAxis, yAxis, tooltip, animation, condition, grid } =
    useChartPerConfig<TBoxPlotBasicConfig>(options);

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
  } = useComponent<TBoxPlotBasicConfig>(
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
    const series = getSeries();

    chartInstance.current?.setOption(
      {
        grid: {
          ...grid,
        },
        legend: {
          ...legend,
          data: seriesKeys,
        },
        series,
        xAxis: [
          {
            ...xAxis,
            data: xAxisKeys,
          },
        ],
        yAxis: [yAxis],
        tooltip: {
          ...tooltip,
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
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

  // ?????????????????????
  useDeepUpdateEffect(() => {
    setOption();
  }, [processedValue, seriesKeys, xAxisKeys, yAxisValues]);

  // ?????????????????????
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

const WrapperBoxPlotBasic: typeof BoxPlotBasic & {
  id: ComponentData.TComponentSelfType;
} = BoxPlotBasic as any;

WrapperBoxPlotBasic.id = CHART_ID;

export default WrapperBoxPlotBasic;
