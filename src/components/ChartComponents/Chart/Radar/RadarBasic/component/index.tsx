import classnames from 'classnames';
import { uniqueId, merge } from 'lodash';
import { useEffect, useMemo, useRef } from 'react';
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
import { DEFAULT_THEME_COLOR_LIST } from '@/components/ChartComponents/Common/Constants/defaultConfig';
import FetchFragment from '@/components/ChartComponents/Common/FetchFragment';
import ColorSelect from '@/components/ColorSelect';
import { useDeepUpdateEffect } from '@/hooks';
import { init } from '@/utils/Assist/EchartsLoader';
import { CHART_ID } from '../id';
import { TRadarBasicConfig } from '../type';

const { getRgbaString } = ColorSelect;

const RadarBasic = (
  props: ComponentData.CommonComponentProps<TRadarBasicConfig>,
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

  const { legend, series, tooltip, animation, radar, condition } =
    useChartPerConfig<TRadarBasicConfig>(options);

  const chartId = useRef<string>(uniqueId(CHART_ID));
  const chartInstance = useRef<echarts.ECharts>();

  useComponentResize(value, () => {
    chartInstance?.current?.resize();
  });

  const {
    request,
    getValue,
    linkageMethod,
    requestUrl,
    componentFilter,
    value: processedValue = [],
    componentFilterMap,
    onCondition,
  } = useComponent<TRadarBasicConfig>({
    component: value,
    global,
  });

  const { onCondition: propsOnCondition } = useCondition({
    onCondition,
    screenType,
    componentId: id,
  });

  const {
    x: xAxisKeys,
    y: yAxisValues,
    s: seriesKeys,
  } = useChartValueMapField(processedValue, {
    map: componentFilterMap,
    fields: {
      seriesKey: 's',
      xAxisKeyKey: 'name',
      yAxisValue: 'value',
    },
    formatMethod: (value) => {
      return value.reduce(
        (acc: any, cur: any) => {
          const { name, value, s, max } = cur;

          if (s && !acc.s.includes(s)) acc.s.push(s);
          if (name && !acc.x.includes(name)) acc.x.push(name);

          if (s) {
            if (!acc.y[s]) acc.y[s] = [];
            if (value !== undefined) {
              acc.y[s].push({
                value,
                max,
              });
            }
          } else {
            if (value !== undefined) {
              acc.y._defaultValue_.push({
                value,
                max,
              });
            }
          }

          return acc;
        },
        {
          x: [],
          y: {
            _defaultValue_: [],
          },
          s: [],
        },
      );
    },
  });

  const maxIndicator = useMemo(() => {
    if (seriesKeys.length) {
      const max = Math.max(
        ...seriesKeys.reduce((acc: any, cur: any) => {
          acc.push(...yAxisValues[cur].map((item: any) => item.value));
          return acc;
        }, []),
      );
      return yAxisValues[seriesKeys[0]].map((item: any) => item.max ?? max);
    }
    const max = Math.max(
      ...yAxisValues._defaultValue_.map((item: any) => item.value),
    );
    return yAxisValues._defaultValue_.map((item: any) => item.max ?? max);
  }, [seriesKeys, yAxisValues]);

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

  const getRadar = () => {
    const {
      center,
      radius,
      axisName,
      axisLine,
      splitLine,
      splitArea,
      ...nextRadar
    } = radar;
    return {
      ...nextRadar,
      center: center.map((item) => `${item}%`),
      radius: radius + '%',
      axisName: {
        ...axisName,
        color: getRgbaString(axisName.color),
      },
      axisLine: {
        ...axisLine,
        lineStyle: {
          ...axisLine.lineStyle,
          color: getRgbaString(axisLine.lineStyle.color),
        },
      },
      splitLine: {
        ...splitLine,
        lineStyle: {
          ...splitLine.lineStyle,
          color: getRgbaString(splitLine.lineStyle.color),
        },
      },
      splitArea: {
        ...splitArea,
        areaStyle: {
          ...splitArea.areaStyle,
          color: (Array.isArray(splitArea.areaStyle.color)
            ? splitArea.areaStyle.color
            : [splitArea.areaStyle.color]
          ).map((item) => {
            return getRgbaString(item);
          }),
        },
      },
      indicator: xAxisKeys.map((item: any, index: number) => {
        return {
          name: item,
          max: maxIndicator[index],
        };
      }),
    };
  };

  const onClick = (value: any) => {
    linkageMethod('click', {});
  };

  const getSeries = () => {
    const { itemStyle, label, lineStyle, areaStyle, ...nextSeries } = series;
    const { animation: show, animationDuration, animationEasing } = animation;
    const { color, ...nextItemStyle } = itemStyle;
    const { color: areaColor, ...nextAreaStyle } = areaStyle;
    const DEFAULT_THEME_COLOR_LIST_DATA = DEFAULT_THEME_COLOR_LIST();

    const baseSeries = {
      ...nextSeries,
      label: {
        ...label,
        color: getRgbaString(label.color),
      },
      type: 'radar',
      data: seriesKeys.length
        ? seriesKeys.map((item: any, index: number) => {
            return {
              itemStyle: {
                ...nextItemStyle,
                color: getRgbaString(color[index]),
              },
              areaStyle: {
                ...nextAreaStyle,
                color: getRgbaString(areaColor[index]),
              },
              lineStyle: {
                ...(lineStyle[index] || {}),
                color: getRgbaString(
                  lineStyle[index]?.color || {
                    ...(DEFAULT_THEME_COLOR_LIST_DATA[index] ||
                      DEFAULT_THEME_COLOR_LIST_DATA[0]),
                    a: 0.3,
                  },
                ),
              },
              value: (yAxisValues[item] || []).map((item: any) => item.value),
              name: item,
            };
          })
        : [
            {
              itemStyle: {
                ...nextItemStyle,
                color: getRgbaString(color[0]),
              },
              areaStyle: {
                ...nextAreaStyle,
                color: getRgbaString(
                  areaColor[0] || {
                    ...DEFAULT_THEME_COLOR_LIST_DATA[0],
                    a: 0.3,
                  },
                ),
              },
              lineStyle: {
                ...(lineStyle[0] || {}),
                color: getRgbaString(lineStyle[0]?.color),
              },
              value: yAxisValues._defaultValue_.map((item: any) => item.value),
            },
          ],
      animation: show,
      animationEasing,
      animationEasingUpdate: animationEasing,
      animationDuration,
      animationDurationUpdate: animationDuration,
    };

    return [baseSeries];
  };

  const setOption = () => {
    const { animation, ...nextTooltip } = tooltip;

    const series = getSeries();
    const radar = getRadar();

    chartInstance.current?.setOption(
      {
        grid: {
          show: false,
        },
        radar,
        legend,
        series,
        tooltip: nextTooltip,
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

  useEffect(() => {
    chartInstance.current?.off('click');
    chartInstance.current?.on('click', onClick);
  }, [linkageMethod]);

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

const WrapperRadarBasic: typeof RadarBasic & {
  id: ComponentData.TComponentSelfType;
} = RadarBasic as any;

WrapperRadarBasic.id = CHART_ID;

export default WrapperRadarBasic;
