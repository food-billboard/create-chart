import { CSSProperties, useEffect, useRef, ReactNode } from 'react';
import { init } from 'echarts';
import { uniqueId, merge } from 'lodash';
import { useDeepUpdateEffect } from '@/hooks';
import {
  useChartComponentResize,
  useComponentResize,
  useChartPerConfig,
} from '@/components/ChartComponents/Common/Component/hook';
import { ComponentProps } from '@/components/ChartComponents/Common/Component/type';
import ColorSelect from '@/components/ColorSelect';
import { TClockGaugeConfig } from '../type';

const { getRgbaString } = ColorSelect;

const CHART_ID = 'CLOCK_GAUGE';

const ClockGauge = (props: {
  className?: string;
  style?: CSSProperties;
  value: ComponentData.TComponentData<TClockGaugeConfig>;
  global: ComponentProps['global'];
  children?: ReactNode;
}) => {
  const { className, style, value, global, children } = props;
  const { screenTheme } = global;

  const {
    config: { options },
  } = value;

  const { series } = useChartPerConfig<TClockGaugeConfig>(options);

  const chartId = useRef<string>(uniqueId(CHART_ID));
  const chartInstance = useRef<echarts.ECharts>();
  const timerRef = useRef<any>(null);

  useComponentResize(value, () => {
    chartInstance?.current?.resize();
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
    const {
      center,
      radius,
      splitLine,
      axisTick,
      axisLabel,
      hourPointer,
      minutePointer,
      secondPointer,
      axisLine,
      minuteAnchor,
      secondAnchor,
      ...nextSeries
    } = series;

    const commonSeries = {
      startAngle: 90,
      endAngle: -270,
      center: center.map((item) => `${item}%`),
      radius: radius + '%',
      type: 'gauge',
      clockwise: true,
      detail: {
        show: false,
      },
      data: [
        {
          value: 0,
        },
      ],
    };

    const baseSeries = [
      {
        name: 'hour',
        ...nextSeries,
        ...commonSeries,
        min: 0,
        max: 12,
        splitNumber: 12,
        axisLine: {
          show: true,
          ...axisLine,
          lineStyle: {
            ...axisLine.lineStyle,
            color: [[1, getRgbaString(axisLine.lineStyle.color)]],
          },
        },
        splitLine: {
          show: true,
          ...splitLine,
          lineStyle: {
            width: splitLine.width,
            color: getRgbaString(splitLine.color),
          },
        },
        axisTick: {
          ...axisTick,
          lineStyle: {
            ...axisTick.lineStyle,
            color: getRgbaString(axisTick.lineStyle.color),
          },
        },
        axisLabel: {
          ...axisLabel,
          color: getRgbaString(axisLabel.color),
          formatter: function (value: any) {
            if (value === 0) {
              return '';
            }
            return value + '';
          },
        },
        pointer: {
          show: true,
          icon: 'path://M2.9,0.7L2.9,0.7c1.4,0,2.6,1.2,2.6,2.6v115c0,1.4-1.2,2.6-2.6,2.6l0,0c-1.4,0-2.6-1.2-2.6-2.6V3.3C0.3,1.9,1.4,0.7,2.9,0.7z',
          ...hourPointer,
          length: hourPointer.length + '%',
          offsetCenter: [0, '8%'],
          itemStyle: {
            ...hourPointer.itemStyle,
            color: getRgbaString(hourPointer.itemStyle.color),
          },
        },
        title: {
          offsetCenter: [0, '30%'],
        },
      },
      {
        name: 'minute',
        ...nextSeries,
        ...commonSeries,
        min: 0,
        max: 60,
        axisLine: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        anchor: {
          ...minuteAnchor,
          show: true,
          showAbove: false,
          size: 20,
          itemStyle: {
            ...minuteAnchor.itemStyle,
            shadowColor: 'rgba(0, 0, 0, 0.3)',
            shadowBlur: 8,
            shadowOffsetX: 2,
            shadowOffsetY: 4,
            borderColor: getRgbaString(minuteAnchor.itemStyle.borderColor),
          },
        },
        pointer: {
          show: true,
          ...minutePointer,
          icon: 'path://M2.9,0.7L2.9,0.7c1.4,0,2.6,1.2,2.6,2.6v115c0,1.4-1.2,2.6-2.6,2.6l0,0c-1.4,0-2.6-1.2-2.6-2.6V3.3C0.3,1.9,1.4,0.7,2.9,0.7z',
          length: minutePointer.length + '%',
          offsetCenter: [0, '8%'],
          itemStyle: {
            ...minutePointer.itemStyle,
            color: getRgbaString(minutePointer.itemStyle.color),
          },
        },
        title: {
          offsetCenter: ['0%', '-40%'],
        },
      },
      {
        name: 'second',
        ...nextSeries,
        ...commonSeries,
        min: 0,
        max: 60,
        animationEasingUpdate: 'bounceOut',
        axisLine: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        anchor: {
          ...secondAnchor,
          show: true,
          showAbove: true,
          itemStyle: {
            ...secondAnchor.itemStyle,
            shadowColor: 'rgba(0, 0, 0, 0.3)',
            shadowBlur: 8,
            shadowOffsetX: 2,
            shadowOffsetY: 4,
            color: getRgbaString(secondAnchor.itemStyle.color),
          },
        },
        pointer: {
          show: true,
          ...secondPointer,
          icon: 'path://M2.9,0.7L2.9,0.7c1.4,0,2.6,1.2,2.6,2.6v115c0,1.4-1.2,2.6-2.6,2.6l0,0c-1.4,0-2.6-1.2-2.6-2.6V3.3C0.3,1.9,1.4,0.7,2.9,0.7z',
          length: secondPointer.length + '%',
          offsetCenter: [0, '8%'],
          itemStyle: {
            ...secondPointer.itemStyle,
            color: getRgbaString(secondPointer.itemStyle.color),
          },
        },
        title: {
          offsetCenter: ['0%', '-40%'],
        },
      },
    ];

    return baseSeries;
  };

  const setOption = () => {
    const series = getSeries();

    chartInstance.current?.setOption({
      series,
      animationDurationUpdate: 300,
    });
  };

  useChartComponentResize(chartInstance.current!);

  useEffect(() => {
    initChart();
    return () => {
      chartInstance.current?.dispose();
    };
  }, [screenTheme]);

  // 配置发生变化时
  useDeepUpdateEffect(() => {
    setOption();
    chartInstance.current?.resize();
  }, [options]);

  useEffect(() => {
    timerRef.current = setInterval(function () {
      var date = new Date();
      var second = date.getSeconds();
      var minute = date.getMinutes() + second / 60;
      var hour = (date.getHours() % 12) + minute / 60;
      chartInstance.current?.setOption({
        series: [
          {
            name: 'hour',
            animation: hour !== 0,
            data: [{ value: hour }],
          },
          {
            name: 'minute',
            animation: minute !== 0,
            data: [{ value: minute }],
          },
          {
            animation: second !== 0,
            name: 'second',
            data: [{ value: second }],
          },
        ],
      });
    }, 1000);
    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  return (
    <>
      <div
        className={className}
        style={merge(
          {
            width: '100%',
            height: '100%',
          },
          style,
        )}
      >
        <div id={chartId.current} className="w-100 h-100"></div>
        {children}
      </div>
    </>
  );
};

const WrapperClockGauge: typeof ClockGauge & {
  id: ComponentData.TComponentSelfType;
} = ClockGauge as any;

WrapperClockGauge.id = CHART_ID;

export default WrapperClockGauge;
