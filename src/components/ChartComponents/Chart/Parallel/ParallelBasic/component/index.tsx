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
  useChartPerConfig,
} from '@/components/ChartComponents/Common/Component/hook';
import FetchFragment from '@/components/ChartComponents/Common/FetchFragment';
import ColorSelect from '@/components/ColorSelect';
import { useDeepUpdateEffect } from '@/hooks';
import { init } from '@/utils/Assist/EchartsLoader';
import { CHART_ID } from '../id';
import { TParallelBasicConfig } from '../type';

const { getRgbaString } = ColorSelect;

const ParallelBasic = (
  props: ComponentData.CommonComponentProps<TParallelBasicConfig>,
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

  const { legend, series, animation, parallel, parallelAxis, condition } =
    useChartPerConfig<TParallelBasicConfig>(options);

  const chartId = useRef<string>(uniqueId(CHART_ID));
  const chartInstance = useRef<echarts.ECharts>();

  useComponentResize(value, () => {
    chartInstance?.current?.resize();
  });

  const {
    request,
    getValue,
    requestUrl,
    linkageMethod,
    componentFilter,
    value: processedValue = [],
    componentFilterMap,
    onCondition,
  } = useComponent<TParallelBasicConfig>({
    component: value,
    global,
  });

  const { onCondition: propsOnCondition } = useCondition({
    onCondition,
    screenType,
    componentId: id,
  });

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

  const generateValue = (value: any) => {
    return value.reduce((acc: any, cur: any) => {
      cur.forEach((item: any, index: number) => {
        if (!acc[index]) acc[index] = [];
        acc[index].push(item);
      });
      return acc;
    }, []);
  };

  const getSeries = () => {
    const { lineStyle, ...nextSeries } = series;
    const { animation: show, animationDuration, animationEasing } = animation;

    const baseSeries = {
      ...nextSeries,
      type: 'parallel',
      lineStyle: {
        ...(lineStyle[0] || {}),
        color: getRgbaString(lineStyle[0]?.color),
      },
      data: generateValue(yAxisValues._defaultValue_),
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
            lineStyle: {
              ...(lineStyle[index] || {}),
              color: getRgbaString(lineStyle[index]?.color),
            },
            data: generateValue(yAxisValues[item] || []),
            name: item,
          };
        })
      : baseSeries;

    return realSeries;
  };

  const onClick = () => {
    linkageMethod('click', {});
  };

  const setOption = () => {
    const {
      areaSelectStyle,
      nameTextStyle,
      axisLine,
      axisLabel,
      ...nextParallelAxis
    } = parallelAxis;
    const series = getSeries();

    chartInstance.current?.setOption(
      {
        grid: {
          show: false,
        },
        parallel: {
          axisExpandable: true,
          ...parallel,
        },
        parallelAxis: xAxisKeys.map((item: any, index: number) => {
          return {
            ...nextParallelAxis,
            realTime: false,
            areaSelectStyle: {
              borderWidth: 0,
              opacity: 1,
              ...areaSelectStyle,
              color: getRgbaString(areaSelectStyle.color),
            },
            nameTextStyle: {
              ...nameTextStyle,
              color: getRgbaString(nameTextStyle.color),
            },
            axisLine: {
              ...axisLine,
              lineStyle: {
                ...axisLine.lineStyle,
                color: getRgbaString(axisLine.lineStyle.color),
              },
            },
            axisLabel: {
              ...axisLabel,
              color: getRgbaString(axisLabel.color),
            },
            dim: index,
            name: item,
          };
        }),
        legend: {
          ...legend,
          data: seriesKeys,
        },
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
  }, [processedValue, seriesKeys, xAxisKeys, yAxisValues]);

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

const WrapperParallelBasic: typeof ParallelBasic & {
  id: ComponentData.TComponentSelfType;
} = ParallelBasic as any;

WrapperParallelBasic.id = CHART_ID;

export default WrapperParallelBasic;
