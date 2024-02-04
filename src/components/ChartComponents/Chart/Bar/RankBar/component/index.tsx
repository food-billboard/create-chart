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
  useChartComponentTooltip,
  useChartPerConfig,
} from '@/components/ChartComponents/Common/Component/hook';
import FetchFragment from '@/components/ChartComponents/Common/FetchFragment';
import { radialGradientColor } from '@/components/ChartComponents/Common/utils';
import ColorSelect from '@/components/ColorSelect';
import { useDeepUpdateEffect } from '@/hooks';
import { init } from '@/utils/Assist/EchartsLoader';
import { CHART_ID } from '../id';
import { TRankBarConfig } from '../type';

const { getRgbaString } = ColorSelect;

const RankBar = (props: ComponentData.CommonComponentProps<TRankBarConfig>) => {
  const { className, style, value, global, children, wrapper: Wrapper } = props;
  const { screenTheme, screenType } = global;

  const {
    id,
    config: {
      options,
      style: { border },
    },
  } = value;

  const { series, yAxis, tooltip, animation, condition, grid } =
    useChartPerConfig<TRankBarConfig>(options, ['yAxis']);
  const { carousel } = series;

  const chartId = useRef<string>(uniqueId(CHART_ID));
  const chartInstance = useRef<echarts.ECharts>();

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
  } = useComponent<TRankBarConfig>({
    component: value,
    global,
  });

  const {
    onCondition: propsOnCondition,
    style: conditionStyle,
    className: conditionClassName,
  } = useCondition(onCondition, screenType);

  const { xAxisKeys, yAxisValues } = useChartValueMapField(processedValue, {
    map: componentFilterMap,
    fields: {
      seriesKey: 's',
      xAxisKeyKey: 'name',
      yAxisValue: 'value',
    },
  });

  const onClick = (params: any) => {
    const { seriesName, value } = params;
    const target = {
      value,
      name: seriesName,
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
    const { itemStyle, label, backgroundStyle, ...nextSeries } = series;
    const { animation: show, animationDuration, animationEasing } = animation;
    const { color, defaultColor, ...nextItemStyle } = itemStyle;

    const commonStyle = {
      ...nextSeries,
      type: 'bar',
      animation: show,
      animationEasing,
      animationEasingUpdate: animationEasing,
      animationDuration,
      animationDurationUpdate: animationDuration,
    };

    const baseSeries = {
      ...commonStyle,
      label: {
        ...label,
        show: label.position !== 'deep-top' ? label.show : false,
        color: getRgbaString(label.color),
        formatter: label.formatter,
        position: label.position === 'center' ? 'inside' : 'right',
      },
      zlevel: 1,
      itemStyle: {
        ...nextItemStyle,
        borderRadius: nextSeries.barWidth / 2,
      },
      data: yAxisValues._defaultValue_.map((item: any, index: number) => {
        return {
          value: item,
          itemStyle: {
            color:
              radialGradientColor(color[index]) ||
              radialGradientColor(defaultColor) ||
              'auto',
          },
        };
      }),
      emphasis: {
        focus: 'series',
      },
    };

    return [
      baseSeries,
      {
        ...commonStyle,
        itemStyle: {
          borderRadius: nextSeries.barWidth / 2,
          color: getRgbaString({
            ...backgroundStyle.color,
            a: backgroundStyle.show ? backgroundStyle.color.a : 0,
          }),
        },
        barGap: '-100%',
        data: new Array(xAxisKeys.length).fill(
          Math.max(...yAxisValues._defaultValue_) || 0,
        ),
        silent: true,
      },
    ];
  };

  const setOption = () => {
    const { animation, ...nextTooltip } = tooltip;
    const { textStyle, rankIcon, ...nextYAxis } = yAxis;
    const {
      label,
      itemStyle: { color, defaultColor },
    } = series;
    const { show, position, ...nextLabel } = label;

    const realSeries = getSeries();
    const colorLength = color.length;

    const baseRankIconStyle = {
      ...rankIcon.textStyle,
      color: getRgbaString(rankIcon.textStyle.color),
      align: 'center',
      borderRadius: rankIcon.textStyle.fontSize * 2,
      width: rankIcon.textStyle.fontSize * 2,
      height: rankIcon.textStyle.fontSize * 2,
    };

    chartInstance.current?.setOption(
      {
        grid: {
          ...grid,
        },
        legend: {
          show: false,
        },
        series: realSeries,
        xAxis: [
          {
            type: 'value',
            splitLine: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
          },
        ],
        yAxis: [
          {
            ...nextYAxis,
            type: 'category',
            inverse: true,
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            data: xAxisKeys,
            axisLabel: {
              ...textStyle,
              align: 'left',
              margin: 100,
              color: getRgbaString(textStyle.color),
              formatter: function (value: any, index: number) {
                let realIndex = index + 1;
                let rankIconText = '';
                if (rankIcon.show) {
                  if (!rankIcon.showBackground) {
                    rankIconText = `{rankNoBg|${realIndex}}  `;
                  } else if (realIndex > colorLength) {
                    rankIconText = `{rank|${realIndex}}  `;
                  } else {
                    rankIconText = `{rank${realIndex}|${realIndex}}  `;
                  }
                }

                return `${rankIconText}${value}`;
              },
              rich: new Array(colorLength + 1).fill(0).reduce(
                (acc, cur, index) => {
                  const key =
                    colorLength === index ? 'rank' : `rank${index + 1}`;
                  const targetColor = color[index] || defaultColor;
                  acc[key] = {
                    ...baseRankIconStyle,
                    backgroundColor: getRgbaString(targetColor.start),
                  };
                  return acc;
                },
                {
                  rankNoBg: {
                    ...baseRankIconStyle,
                  },
                },
              ),
            },
          },
          ...(show && position === 'deep-top'
            ? [
                {
                  type: 'category',
                  inverse: true,
                  axisTick: 'none',
                  axisLine: 'none',
                  show: true,
                  axisLabel: {
                    ...nextLabel,
                    color: getRgbaString(label.color),
                    formatter: label.formatter,
                    margin: 0,
                  },
                  data: yAxisValues._defaultValue_,
                },
              ]
            : []),
        ],
        tooltip: {
          ...nextTooltip,
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
      },
      screenType === 'edit',
    );

    screenType !== 'edit' &&
      animation.show &&
      !carousel.show &&
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
  }, [processedValue, xAxisKeys, yAxisValues]);

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
      >
        <Wrapper border={border}>
          <div id={chartId.current} className="w-100 h-100"></div>
          {children}
        </Wrapper>
      </div>
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

const WrapperRankBar: typeof RankBar & {
  id: ComponentData.TComponentSelfType;
} = RankBar as any;

WrapperRankBar.id = CHART_ID;

export default WrapperRankBar;
