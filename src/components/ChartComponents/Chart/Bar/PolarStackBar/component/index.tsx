import { merge, uniqueId } from 'lodash';
import { useEffect, useMemo, useRef } from 'react';
import {
  useAnimationChange,
  useChartComponentResize,
  useChartPerConfig,
  useChartValueMapField,
  useComponent,
  useComponentResize,
  useCondition,
  ConditionComponent,
} from '@/components/ChartComponents/Common/Component/hook';
import { DEFAULT_OPACITY } from '@/components/ChartComponents/Common/Constants/defaultConfig';
import FetchFragment from '@/components/ChartComponents/Common/FetchFragment';
import ColorSelect from '@/components/ColorSelect';
import { useDeepUpdateEffect, usePrimaryColorObject } from '@/hooks';
import { init } from '@/utils/Assist/EchartsLoader';
import { CHART_ID } from '../id';
import { TPolarStackBarConfig } from '../type';

const { getRgbaString } = ColorSelect;

const PolarStackBar = (
  props: ComponentData.CommonComponentProps<TPolarStackBarConfig>,
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

  const { legend, series, polar, angleAxis, tooltip, animation, condition } =
    useChartPerConfig<TPolarStackBarConfig>(options);

  const chartId = useRef<string>(uniqueId(CHART_ID));
  const chartInstance = useRef<echarts.ECharts>();

  const primaryColor = usePrimaryColorObject();

  const lineStyleColor = useMemo(() => {
    return getRgbaString({
      ...primaryColor,
      a: DEFAULT_OPACITY,
    });
  }, [primaryColor]);

  useComponentResize(value, () => {
    chartInstance?.current?.resize();
  });

  const {
    request,
    syncInteractiveAction,
    linkageMethod,
    getValue,
    requestUrl,
    componentFilter,
    value: processedValue = [],
    componentFilterMap,
    onCondition,
  } = useComponent<TPolarStackBarConfig>({
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
        seriesKey: 'stack',
        xAxisKeyKey: 'name',
        yAxisValue: 'value',
      },
    },
  );

  const onClick = (params: any) => {
    const { name, data } = params;
    const target = {
      name,
      value: data,
    };
    syncInteractiveAction('click', target);
    linkageMethod('click-item', target);
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
              color: lineStyleColor,
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
  }, [processedValue, xAxisKeys, yAxisValues, seriesKeys, lineStyleColor]);

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

const WrapperPolarStackBar: typeof PolarStackBar & {
  id: ComponentData.TComponentSelfType;
} = PolarStackBar as any;

WrapperPolarStackBar.id = CHART_ID;

export default WrapperPolarStackBar;
