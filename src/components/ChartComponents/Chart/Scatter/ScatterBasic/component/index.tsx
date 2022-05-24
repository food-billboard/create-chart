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
  const { screenTheme, screenType } = global;

  const {
    id,
    config: { options },
  } = value;

  const { legend, series, tooltip, animation, xAxis, yAxis, condition, grid } =
    useChartPerConfig<TScatterBasicConfig>(options);

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
  } = useComponent<TScatterBasicConfig>(
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
    const { itemStyle, symbolSize, ...nextSeries } = series;
    const { animation: show, animationDuration, animationEasing } = animation;

    const baseSeries = {
      ...nextSeries,
      symbolSize: function (dataItem: any) {
        return dataItem * symbolSize;
      },
      type: 'scatter',
      itemStyle: {
        ...(itemStyle[0] || {}),
        color: getRgbaString(itemStyle[0]?.color),
        shadowOffsetX: itemStyle[0]?.shadow.hShadow || 0,
        shadowOffsetY: itemStyle[0]?.shadow.vShadow || 0,
        shadowBlur: itemStyle[0]?.shadow.blur || 10,
        shadowColor: getRgbaString(itemStyle[0]?.shadow.color),
      },
      data: [...yAxisValues._defaultValue_],
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
              color: getRgbaString(itemStyle[index]?.color),
              shadowOffsetX: itemStyle[index].shadow.hShadow,
              shadowOffsetY: itemStyle[index].shadow.vShadow,
              shadowBlur: itemStyle[index].shadow.blur,
              shadowColor: getRgbaString(itemStyle[index].shadow.color),
            },
            data: yAxisValues[item],
            name: item,
          };
        })
      : [baseSeries];

    return realSeries;
  };

  const setOption = () => {
    const { animation, ...nextTooltip } = tooltip;

    const series = getSeries();

    chartInstance.current?.setOption(
      {
        grid: {
          ...grid,
        },
        legend,
        xAxis: [
          {
            ...xAxis,
            scale: true,
            data: xAxisKeys,
          },
        ],
        yAxis: [
          {
            ...yAxis,
            scale: true,
          },
        ],
        series,
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

const WrapperScatterBasic: typeof ScatterBasic & {
  id: ComponentData.TComponentSelfType;
} = ScatterBasic as any;

WrapperScatterBasic.id = CHART_ID;

export default WrapperScatterBasic;
