import { uniqueId, merge } from 'lodash';
import { useEffect, useRef } from 'react';
import useBarCarousel from '@/components/ChartComponents/Common/BarCarouselConfig/useBarCarousel';
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
import { init, registerShape } from '@/utils/Assist/EchartsLoader';
import { CHART_ID } from '../id';
import { TThreeBarConfig } from '../type';

const { getRgbaString } = ColorSelect;

registerShape('CubeLeft', {
  shape: {
    x: 0,
    y: 0,
  },
  buildPath: function (ctx: any, shape: any) {
    const xAxisPoint = shape.xAxisPoint;
    const c0 = [shape.x, shape.y];
    const c1 = [shape.x - shape.widthB, shape.y];
    const c2 = [shape.x - shape.widthB, xAxisPoint[1]];
    const c3 = [shape.x, xAxisPoint[1]];
    ctx
      .moveTo(c0[0], c0[1])
      .lineTo(c1[0], c1[1])
      .lineTo(c2[0], c2[1])
      .lineTo(c3[0], c3[1])
      .closePath();
  },
});
// 绘制右侧面
registerShape('CubeRight', {
  shape: {
    x: 0,
    y: 0,
  },
  buildPath: function (ctx: any, shape: any) {
    const xAxisPoint = shape.xAxisPoint;
    const c1 = [shape.x, shape.y];
    const c2 = [shape.x, xAxisPoint[1]];
    const c3 = [
      shape.x + shape.widthA,
      xAxisPoint[1] - shape.widthB + shape.snapHeight,
    ];
    const c4 = [
      shape.x + shape.widthA,
      shape.y - shape.widthB + shape.snapHeight,
    ];
    ctx
      .moveTo(c1[0], c1[1])
      .lineTo(c2[0], c2[1])
      .lineTo(c3[0], c3[1])
      .lineTo(c4[0], c4[1])
      .closePath();
  },
});
// 绘制顶面
registerShape('CubeTop', {
  shape: {
    x: 0,
    y: 0,
  },
  buildPath: function (ctx: any, shape: any) {
    //
    const c1 = [shape.x, shape.y];
    const c2 = [
      shape.x + shape.widthA,
      shape.y - shape.widthB + shape.snapHeight,
    ]; //右点
    const c3 = [
      shape.x - shape.widthB + shape.widthA,
      shape.y - shape.widthB + shape.snapHeight,
    ];
    const c4 = [shape.x - shape.widthB, shape.y];
    ctx
      .moveTo(c1[0], c1[1])
      .lineTo(c2[0], c2[1])
      .lineTo(c3[0], c3[1])
      .lineTo(c4[0], c4[1])
      .closePath();
  },
});

const ThreeBar = (
  props: ComponentData.CommonComponentProps<TThreeBarConfig>,
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

  const { legend, series, xAxis, yAxis, tooltip, animation, condition, grid } =
    useChartPerConfig<TThreeBarConfig>(options);
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
    value: _processedValue = [],
    componentFilterMap,
    onCondition,
  } = useComponent<TThreeBarConfig>({
    component: value,
    global,
  });

  const { onCondition: propsOnCondition } = useCondition({
    onCondition,
    screenType,
    componentId: id,
  });

  const processedValue = useBarCarousel({
    config: carousel,
    screenType,
    value: _processedValue,
    seriesKey: 's',
    fieldMap: componentFilterMap,
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

  const onClick = (params: any) => {
    const { seriesName, name, value } = params;
    const target = {
      x: name,
      y: value,
      s: seriesName,
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
    const { itemStyle, label, barWidth, barGap, ...nextSeries } = series;
    const { animation: show, animationDuration, animationEasing } = animation;
    const widthA = Math.sin(Math.PI / 6) * barWidth;
    const widthB = Math.sin(Math.PI / 3) * barWidth;
    const snapHeight = barWidth / 2;
    const animationConfig = {
      animation: show,
      animationEasing,
      animationEasingUpdate: animationEasing,
      animationDuration,
      animationDurationUpdate: animationDuration,
      emphasis: {
        focus: 'series',
      },
    };

    const baseSeries = {
      ...nextSeries,
      barGap: `${barGap}%`,
      barWidth,
      label: {
        ...label,
        position: 'top',
        color: getRgbaString(label.color),
        offset: [widthA / 2, -widthB / 4],
      },
      type: 'bar',
      itemStyle: {
        ...itemStyle,
        color: 'transparent',
      },
      tooltip: {
        show: false,
      },
      data: yAxisValues._defaultValue_,
      silent: true,
    };

    const baseDecorationSeries = (
      color: ComponentData.TColorConfig,
      index: number = 0,
    ) => ({
      type: 'custom',
      renderItem: (_: any, api: any) => {
        const rate = ((barWidth * barGap) / 100 + barWidth) * index;
        const location = api.coord([api.value(0), api.value(1)]);
        location[0] = location[0] + rate;
        const xLocation = api.coord([api.value(0), 0]);
        xLocation[0] = xLocation[0] + rate;
        const shape = {
          api,
          xValue: api.value(0),
          yValue: api.value(1),
          x: location[0],
          y: location[1],
          xAxisPoint: xLocation,
          widthA,
          widthB,
          snapHeight,
        };
        const shadow = 0.5;
        const topShadow = 1.1;
        return {
          type: 'group',
          children: [
            {
              type: 'CubeLeft',
              shape,
              style: {
                fill: getRgbaString(color),
              },
            },
            {
              type: 'CubeRight',
              shape,
              style: {
                fill: getRgbaString({
                  ...color,
                  r: color.r * shadow,
                  g: color.g * shadow,
                  b: color.b * shadow,
                }),
              },
            },
            {
              type: 'CubeTop',
              shape,
              style: {
                fill: getRgbaString({
                  ...color,
                  r: Math.min(255, color.r * topShadow),
                  g: Math.min(255, color.g * topShadow),
                  b: Math.min(255, color.b * topShadow),
                }),
              },
            },
          ],
        };
      },
      data: yAxisValues._defaultValue_,
      ...animationConfig,
    });

    const realSeries = seriesKeys.length
      ? seriesKeys.reduce((acc: any, item: any, index: number) => {
          acc.push(
            {
              ...baseSeries,
              data: yAxisValues[item] || [],
              name: item,
            },
            {
              ...baseDecorationSeries(itemStyle.color[index], index),
              data: yAxisValues[item] || [],
              name: item,
            },
          );
          return acc;
        }, [])
      : [baseSeries, baseDecorationSeries(itemStyle.color[0], 0)];

    return realSeries;
  };

  const setOption = () => {
    const { animation, ...nextTooltip } = tooltip;
    const { itemStyle } = series;

    const realSeries = getSeries();

    chartInstance.current?.setOption(
      {
        grid: {
          ...grid,
        },
        legend: {
          ...legend,
          data: seriesKeys.map((item: string, index: number) => {
            return {
              name: item,
              itemStyle: {
                color: getRgbaString(itemStyle.color[index]),
              },
            };
          }),
        },
        series: realSeries,
        xAxis: [
          {
            ...xAxis,
            splitLine: {
              show: false,
            },
            data: xAxisKeys,
          },
        ],
        yAxis: [yAxis],
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

const WrapperThreeBar: typeof ThreeBar & {
  id: ComponentData.TComponentSelfType;
} = ThreeBar as any;

WrapperThreeBar.id = CHART_ID;

export default WrapperThreeBar;
