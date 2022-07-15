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
import { DEFAULT_OPACITY } from '@/components/ChartComponents/Common/Constants/defaultConfig';
import ThemeUtil from '@/utils/Assist/Theme';
import { TPolarStackBarConfig } from '../type';

const { getRgbaString } = ColorSelect;

const CHART_ID = 'POLAR_STACK_BAR';

const PolarStackBar = (props: {
  className?: string;
  style?: CSSProperties;
  value: ComponentData.TComponentData<TPolarStackBarConfig>;
  global: ComponentProps['global'];
}) => {
  const { className, style, value, global } = props;
  const { screenTheme } = global;

  const {
    id,
    config: { options },
  } = value;

  const { legend, series, polar, angleAxis, tooltip, animation, condition } =
    useChartPerConfig<TPolarStackBarConfig>(options);

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
  } = useComponent<TPolarStackBarConfig>(
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
        seriesKey: 'stack',
        xAxisKeyKey: 'name',
        yAxisValue: 'value',
      },
    },
  );

  const onClick = (params: any) => {
    const { name, data } = params;
    syncInteractiveAction('click', {
      x: name,
      y: data,
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
    const baseSeries = {
      ...nextSeries,
      label: {
        ...label,
        color: getRgbaString(label.color),
      },
      coordinateSystem: 'polar',
      type: 'bar',
      itemStyle: {
        ...itemStyle,
        color: getRgbaString(itemStyle.color[0]),
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
              ...itemStyle,
              color: getRgbaString(itemStyle.color[index]),
            },
            data: yAxisValues[item] || [],
            name: item,
            stack: 'polar-stack',
          };
        })
      : [baseSeries];

    return realSeries;
  };

  const setOption = () => {
    const { ...nextTooltip } = tooltip;
    const { axisLabel, ...nextAngleAxis } = angleAxis;

    const realSeries = getSeries();

    chartInstance.current?.setOption(
      {
        grid: {
          show: false,
        },
        legend: {
          ...legend,
          data: seriesKeys,
        },
        radiusAxis: {
          show: true,
          axisLabel: {
            ...axisLabel,
            color: getRgbaString(axisLabel.color),
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: getRgbaString({
                ...ThemeUtil.generateNextColor4CurrentTheme(0),
                a: DEFAULT_OPACITY,
              }),
            },
          },
        },
        polar: {
          ...polar,
          radius: polar.radius.map((item) => `${item}%`),
        },
        angleAxis: {
          show: true,
          type: 'category',
          ...nextAngleAxis,
          axisLabel: {
            ...axisLabel,
            color: getRgbaString(axisLabel.color),
          },
          data: xAxisKeys,
        },
        series: realSeries,
        tooltip: {
          ...nextTooltip,
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

const WrapperPolarStackBar: typeof PolarStackBar & {
  id: ComponentData.TComponentSelfType;
} = PolarStackBar as any;

WrapperPolarStackBar.id = CHART_ID;

export default WrapperPolarStackBar;
