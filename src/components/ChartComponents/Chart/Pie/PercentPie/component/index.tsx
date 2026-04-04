import { uniqueId, merge } from 'lodash';
import { useEffect, useRef, useMemo } from 'react';
import {
  useComponent,
  useChartComponentResize,
  useComponentResize,
  useCondition,
  ConditionComponent,
  useChartPerConfig,
} from '@/components/ChartComponents/Common/Component/hook';
import FetchFragment from '@/components/ChartComponents/Common/FetchFragment';
import ColorSelect from '@/components/ColorSelect';
import { useDeepUpdateEffect } from '@/hooks';
import { init } from '@/utils/Assist/EchartsLoader';
import FilterDataUtil from '@/utils/Assist/FilterData';
import { CHART_ID } from '../id';
import { TPercentPieConfig } from '../type';

const { getRgbaString } = ColorSelect;

//获取圆上面某点的坐标(x0,y0表示坐标，r半径，angle角度)
function getCirclePoint(x0: number, y0: number, r: number, angle: number) {
  let x1 = x0 + r * Math.cos((angle * Math.PI) / 180);
  let y1 = y0 + r * Math.sin((angle * Math.PI) / 180);
  return {
    x: x1,
    y: y1,
  };
}

const PercentPie = (
  props: ComponentData.CommonComponentProps<TPercentPieConfig>,
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

  const { series, animation, condition, statistics, lineStyle } =
    useChartPerConfig<TPercentPieConfig>(options);

  const chartId = useRef<string>(uniqueId(CHART_ID));
  const chartInstance = useRef<echarts.ECharts>();
  const animationTimerRef = useRef<any>();
  const angleRef = useRef<number>(0);

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
  } = useComponent<TPercentPieConfig>({
    component: value,
    global,
  });

  const { onCondition: propsOnCondition } = useCondition({
    onCondition,
    screenType,
    componentId: id,
  });

  const finalValue = useMemo(() => {
    return FilterDataUtil.getFieldMapValue(processedValue, {
      map: componentFilterMap,
    });
  }, [processedValue, componentFilterMap]);

  const drawPieAnimation = () => {
    angleRef.current = angleRef.current + 3;
  };

  const onClick = () => {
    const target = {
      value: finalValue.value,
    };
    syncInteractiveAction('click', target);
    linkageMethod('click', target);
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
    const { itemStyle, radius, backgroundColor } = series;
    const { color } = itemStyle;
    const {
      outer: [, outerRadius],
    } = radius;
    const innerLineRadius = (outerRadius + 8) / 100;
    const outerLineRadius = (outerRadius + 8 + 5) / 100;

    const colorLength = color.length;
    const colorStepsNumber = 1 / colorLength;
    const colorSteps = color.map((item, index) => {
      if (index + 1 === colorLength) {
        return {
          color: getRgbaString(item),
          offset: 1,
        };
      }
      return {
        color: getRgbaString(item),
        offset: index * colorStepsNumber,
      };
    });

    return [
      {
        name: 'ring5',
        type: 'custom',
        coordinateSystem: 'none',
        renderItem: (params: any, api: any) => {
          return {
            type: 'arc',
            shape: {
              cx: api.getWidth() / 2,
              cy: api.getHeight() / 2,
              r:
                (Math.min(api.getWidth(), api.getHeight()) / 2) *
                innerLineRadius,
              startAngle: ((0 + angleRef.current) * Math.PI) / 180,
              endAngle: ((90 + angleRef.current) * Math.PI) / 180,
            },
            style: {
              stroke: getRgbaString(lineStyle.color[0].line),
              fill: 'transparent',
              lineWidth: lineStyle.line.width,
            },
          };
        },
        data: [0],
      },
      {
        name: 'ring5',
        type: 'custom',
        coordinateSystem: 'none',
        renderItem: function (params: any, api: any) {
          let x0 = api.getWidth() / 2;
          let y0 = api.getHeight() / 2;
          let r =
            (Math.min(api.getWidth(), api.getHeight()) / 2) * innerLineRadius;
          let point = getCirclePoint(x0, y0, r, 90 + angleRef.current);
          return {
            type: 'circle',
            shape: {
              cx: point.x,
              cy: point.y,
              r: lineStyle.point.size,
            },
            style: {
              stroke: getRgbaString(lineStyle.color[0].point),
              fill: getRgbaString(lineStyle.color[0].point),
            },
          };
        },
        data: [0],
      },
      {
        name: 'ring5',
        type: 'custom',
        coordinateSystem: 'none',
        renderItem: (params: any, api: any) => {
          return {
            type: 'arc',
            shape: {
              cx: api.getWidth() / 2,
              cy: api.getHeight() / 2,
              r:
                (Math.min(api.getWidth(), api.getHeight()) / 2) *
                innerLineRadius,
              startAngle: ((180 + angleRef.current) * Math.PI) / 180,
              endAngle: ((270 + angleRef.current) * Math.PI) / 180,
            },
            style: {
              stroke: getRgbaString(lineStyle.color[1].line),
              fill: 'transparent',
              lineWidth: lineStyle.line.width,
            },
          };
        },
        data: [0],
      },
      {
        name: 'ring5',
        type: 'custom',
        coordinateSystem: 'none',
        renderItem: function (params: any, api: any) {
          let x0 = api.getWidth() / 2;
          let y0 = api.getHeight() / 2;
          let r =
            (Math.min(api.getWidth(), api.getHeight()) / 2) * innerLineRadius;
          let point = getCirclePoint(x0, y0, r, 180 + angleRef.current);
          return {
            type: 'circle',
            shape: {
              cx: point.x,
              cy: point.y,
              r: lineStyle.point.size,
            },
            style: {
              stroke: getRgbaString(lineStyle.color[1].point),
              fill: getRgbaString(lineStyle.color[1].point),
            },
          };
        },
        data: [0],
      },
      {
        name: 'ring5',
        type: 'custom',
        coordinateSystem: 'none',
        renderItem: (params: any, api: any) => {
          return {
            type: 'arc',
            shape: {
              cx: api.getWidth() / 2,
              cy: api.getHeight() / 2,
              r:
                (Math.min(api.getWidth(), api.getHeight()) / 2) *
                outerLineRadius,
              startAngle: ((270 + -angleRef.current) * Math.PI) / 180,
              endAngle: ((40 + -angleRef.current) * Math.PI) / 180,
            },
            style: {
              stroke: getRgbaString(lineStyle.color[2].line),
              fill: 'transparent',
              lineWidth: lineStyle.line.width,
            },
          };
        },
        data: [0],
      },
      {
        name: 'ring5',
        type: 'custom',
        coordinateSystem: 'none',
        renderItem: function (params: any, api: any) {
          let x0 = api.getWidth() / 2;
          let y0 = api.getHeight() / 2;
          let r =
            (Math.min(api.getWidth(), api.getHeight()) / 2) * outerLineRadius;
          let point = getCirclePoint(x0, y0, r, 270 + -angleRef.current);
          return {
            type: 'circle',
            shape: {
              cx: point.x,
              cy: point.y,
              r: lineStyle.point.size,
            },
            style: {
              stroke: getRgbaString(lineStyle.color[2].point),
              fill: getRgbaString(lineStyle.color[2].point),
            },
          };
        },
        data: [0],
      },
      {
        name: 'ring5',
        type: 'custom',
        coordinateSystem: 'none',
        renderItem: (params: any, api: any) => {
          return {
            type: 'arc',
            shape: {
              cx: api.getWidth() / 2,
              cy: api.getHeight() / 2,
              r:
                (Math.min(api.getWidth(), api.getHeight()) / 2) *
                outerLineRadius,
              startAngle: ((90 + -angleRef.current) * Math.PI) / 180,
              endAngle: ((220 + -angleRef.current) * Math.PI) / 180,
            },
            style: {
              stroke: getRgbaString(lineStyle.color[3].line),
              fill: 'transparent',
              lineWidth: lineStyle.line.width,
            },
          };
        },
        data: [0],
      },
      {
        name: 'ring5',
        type: 'custom',
        coordinateSystem: 'none',
        renderItem: function (params: any, api: any) {
          let x0 = api.getWidth() / 2;
          let y0 = api.getHeight() / 2;
          let r =
            (Math.min(api.getWidth(), api.getHeight()) / 2) * outerLineRadius;
          let point = getCirclePoint(x0, y0, r, 90 + -angleRef.current);
          return {
            type: 'circle',
            shape: {
              cx: point.x,
              cy: point.y,
              r: lineStyle.point.size,
            },
            style: {
              stroke: getRgbaString(lineStyle.color[3].point),
              fill: getRgbaString(lineStyle.color[3].point),
            },
          };
        },
        data: [0],
      },
      {
        name: CHART_ID,
        type: 'pie',
        radius: radius.outer.map((item) => `${item}%`),
        clockwise: true,
        startAngle: 90,
        z: 0,
        zlevel: 0,
        labelLine: {
          show: false,
        },
        data: [
          {
            value: finalValue.value || 0,
            name: '',
            itemStyle: {
              color: {
                // 完成的圆环的颜色
                colorStops: colorSteps,
              },
            },
          },
          {
            value: 100 - finalValue.value || 0,
            name: '',
            label: {
              show: false,
            },
            itemStyle: {
              color: getRgbaString(backgroundColor),
            },
          },
        ],
      },
      {
        name: CHART_ID,
        type: 'pie',
        radius: radius.inner.map((item) => `${item}%`),
        clockwise: true,
        startAngle: 270,
        z: 0,
        zlevel: 0,
        labelLine: {
          show: false,
        },
        data: [
          {
            value: finalValue.value || 0,
            name: '',
            itemStyle: {
              color: {
                // 完成的圆环的颜色
                colorStops: colorSteps,
              },
            },
          },
          {
            value: 100 - finalValue.value || 0,
            name: '',
            label: {
              show: false,
            },
            itemStyle: {
              color: getRgbaString(backgroundColor),
            },
          },
        ],
      },
    ];
  };

  const setOption = (cover: boolean = true) => {
    const { show, addonAfter, textStyle } = statistics;

    const chartSeries = getSeries();

    chartInstance.current?.setOption(
      {
        grid: {
          show: false,
        },
        legend: [
          {
            show,
            selectedMode: false,
            formatter: function () {
              const total = finalValue.value || 0;
              const totalText = total || '0';
              const addonAfterText = addonAfter.show
                ? `{addonAfter|${addonAfter.value}}`
                : '';
              const data = [totalText, addonAfterText].filter(Boolean);
              return data.join('');
            },
            data: [CHART_ID],
            left: 'center',
            top: 'center',
            icon: 'none',
            align: 'center',
            textStyle: {
              ...textStyle,
              color: getRgbaString(textStyle.color),
              align: 'center',
              rich: {
                addonAfter: {
                  ...addonAfter.textStyle,
                  color: getRgbaString(addonAfter.textStyle.color),
                },
              },
            },
          },
        ],
        series: chartSeries,
      },
      cover,
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

  // 配置发生变化时
  useDeepUpdateEffect(() => {
    setOption();
    chartInstance.current?.resize();
  }, [options, processedValue]);

  useEffect(() => {
    clearInterval(animationTimerRef.current);
    if (screenType === 'edit') return;
    animationTimerRef.current = setInterval(() => {
      drawPieAnimation();
      setOption(false);
      chartInstance.current?.resize();
    }, animation.scrollTimes);
    return () => {
      clearInterval(animationTimerRef.current);
    };
  }, [animation, screenType]);

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

const WrapperPercentPie: typeof PercentPie & {
  id: ComponentData.TComponentSelfType;
} = PercentPie as any;

WrapperPercentPie.id = CHART_ID;

export default WrapperPercentPie;
