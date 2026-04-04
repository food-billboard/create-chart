import classnames from 'classnames';
import { uniqueId, merge } from 'lodash';
import { useEffect, useRef } from 'react';
import {
  useComponent,
  useChartComponentResize,
  useChartValueMapField,
  useComponentResize,
  useAnimationChange,
  useCondition,
  ConditionComponent,
  useChartComponentTooltip,
  useChartPerConfig,
} from '@/components/ChartComponents/Common/Component/hook';
import FetchFragment from '@/components/ChartComponents/Common/FetchFragment';
import ColorSelect from '@/components/ColorSelect';
import { useDeepUpdateEffect } from '@/hooks';
import { init } from '@/utils/Assist/EchartsLoader';
import { CHART_ID } from '../id';
import { TScatterBasicConfig } from '../type';

const { getRgbaString } = ColorSelect;

const ScatterBasic = (
  props: ComponentData.CommonComponentProps<TScatterBasicConfig>,
) => {
  const { className, style, value, global, children, wrapper: Wrapper } = props;
  const { screenTheme, screenType } = global;

  const {
    id,
    config: {
      options,
      style: { border },
    },
  } = value;

  const { legend, series, tooltip, animation, xAxis, yAxis, condition, grid } =
    useChartPerConfig<TScatterBasicConfig>(options);

  const chartId = useRef<string>(uniqueId(CHART_ID));
  const chartInstance = useRef<echarts.ECharts>();

  useComponentResize(value, () => {
    chartInstance?.current?.resize();
  });

  const {
    request,
    getValue,
    requestUrl,
    componentFilter,
    linkageMethod,
    value: processedValue = [],
    componentFilterMap,
    onCondition,
  } = useComponent<TScatterBasicConfig>({
    component: value,
    global,
  });

  const { onCondition: propsOnCondition } = useCondition({
    onCondition,
    screenType,
    componentId: id,
  });

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

  const onClick = () => {
    linkageMethod('click', {});
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
        borderColor: getRgbaString(itemStyle[0]?.borderColor),
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
              borderColor: getRgbaString(itemStyle[index]?.borderColor),
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
  }, [processedValue, xAxisKeys, yAxisValues, seriesKeys]);

  // 配置发生变化时
  useDeepUpdateEffect(() => {
    setOption();
    chartInstance.current?.resize();
  }, [options]);

  useAnimationChange(chartInstance.current!, animation, setOption);

  return (
    <>
      <ConditionComponent
        componentId={id}
        className={className}
        style={merge(
          {
            width: '100%',
            height: '100%',
          },
          style,
        )}
        onClick={onClick}
      >
        <Wrapper border={border}>
          <div id={chartId.current} className="w-100 h-100"></div>
          {children}
        </Wrapper>
      </ConditionComponent>
      <FetchFragment
        id={id}
        url={requestUrl}
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
