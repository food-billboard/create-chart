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
import { TCandlestickBasicConfig } from '../type';

const { getRgbaString } = ColorSelect;

const CHART_ID = 'CANDLESTICK_BASIC';

const CandlestickBasic = (props: {
  className?: string;
  style?: CSSProperties;
  value: ComponentData.TComponentData<TCandlestickBasicConfig>;
  global: ComponentProps['global'];
}) => {
  const { className, style, value, global } = props;
  const { screenTheme } = global;

  const {
    id,
    config: { options },
  } = value;

  const { series, xAxis, yAxis, tooltip, animation, condition } = options;

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
  } = useComponent<TCandlestickBasicConfig>(
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

  const { xAxisKeys, yAxisValues } = useChartValueMapField(processedValue, {
    map: componentFilterMap,
    fields: {
      seriesKey: '',
      xAxisKeyKey: 'x',
      yAxisValue: 'y',
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
    const { itemStyle, markPoint, markLine, ...nextSeries } = series;
    const { animation: show, animationDuration, animationEasing } = animation;
    const { color, color0, borderColor, borderColor0, ...nextItemStyle } =
      itemStyle;
    const { data, ...nextMarkLine } = markLine;

    const baseSeries = {
      ...nextSeries,
      type: 'candlestick',
      itemStyle: {
        ...nextItemStyle,
        color: getRgbaString(color),
        color0: getRgbaString(color0),
        borderColor: getRgbaString(borderColor),
        borderColor0: getRgbaString(borderColor0),
      },
      markPoint: {
        data: Object.entries(markPoint).reduce((acc, cur) => {
          const [key, value] = cur;
          if (!value.show) return acc;
          acc.push({
            ...value,
            type: key,
            label: {
              ...value.label,
              color: getRgbaString(value.label.color),
            },
            itemStyle: {
              color: getRgbaString(value.itemStyle.color),
            },
          });
          return acc;
        }, [] as any),
      },
      markLine: {
        ...nextMarkLine,
        data: Object.entries(data).reduce((acc, cur) => {
          const [key, value] = cur;
          if (!value.show) return acc;
          acc.push({
            ...value,
            type: key,
            label: {
              ...value.label,
              color: getRgbaString(value.label.color),
            },
            lineStyle: {
              ...value.lineStyle,
              color: getRgbaString(value.lineStyle.color),
            },
          });
          return acc;
        }, [] as any),
      },
      data: yAxisValues._defaultValue_,
      animation: show,
      animationEasing,
      animationEasingUpdate: animationEasing,
      animationDuration,
      animationDurationUpdate: animationDuration,
    };

    return baseSeries;
  };

  const setOption = () => {
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
        series,
        xAxis: {
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
        yAxis: {
          ...nextYAxis,
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
        tooltip: {
          ...nextTooltip,
          backgroundColor: getRgbaString(backgroundColor),
          textStyle: {
            ...tooltipTextStyle,
            color: getRgbaString(tooltipTextStyle.color),
          },
          axisPointer: {
            type: 'cross',
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

const WrapperCandlestickBasic: typeof CandlestickBasic & {
  id: ComponentData.TComponentSelfType;
} = CandlestickBasic as any;

WrapperCandlestickBasic.id = CHART_ID;

export default WrapperCandlestickBasic;
