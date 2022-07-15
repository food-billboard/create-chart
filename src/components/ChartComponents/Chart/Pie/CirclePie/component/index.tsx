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
  useChartComponentTooltip,
  useChartPerConfig,
} from '@/components/ChartComponents/Common/Component/hook';
import { ComponentProps } from '@/components/ChartComponents/Common/Component/type';
import ColorSelect from '@/components/ColorSelect';
import FetchFragment, {
  TFetchFragmentRef,
} from '@/components/ChartComponents/Common/FetchFragment';
import { TCirclePieConfig } from '../type';

const { getRgbaString } = ColorSelect;

const CHART_ID = 'CIRCLE_PIE';

const CirclePie = (props: {
  className?: string;
  style?: CSSProperties;
  value: ComponentData.TComponentData<TCirclePieConfig>;
  global: ComponentProps['global'];
}) => {
  const { className, style, value, global } = props;
  const { screenTheme, screenType } = global;

  const {
    id,
    config: { options },
  } = value;

  const { legend, series, tooltip, animation, condition, statistics } =
    useChartPerConfig<TCirclePieConfig>(options);

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
  } = useComponent<TCirclePieConfig>(
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
      xAxisKeyKey: 'name',
      yAxisValue: 'value',
    },
  });

  const onClick = (params: any) => {
    const { name, value } = params;
    syncInteractiveAction('click', {
      name,
      value,
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
    const { itemStyle, label, radius, ...nextSeries } = series;
    const { animation: show, animationDuration, animationEasing } = animation;
    const { color, ...nextItemStyle } = itemStyle;

    const baseSeries = {
      ...nextSeries,
      radius: radius.map((item) => `${item}%`),
      center: ['50%', '50%'],
      label: {
        ...label,
        color: getRgbaString(label.color),
        position: 'outside',
      },
      type: 'pie',
      itemStyle: nextItemStyle,
      data: xAxisKeys.map((item: any, index: number) => {
        return {
          name: item,
          value: yAxisValues._defaultValue_[index],
          itemStyle: {
            color: getRgbaString(color[index]),
          },
        };
      }),
      animation: show,
      animationEasing,
      animationEasingUpdate: animationEasing,
      animationDuration,
      animationDurationUpdate: animationDuration,
    };

    return [
      {
        ...baseSeries,
        labelLine: {
          show: false,
        },
        radius: [`${radius[0] - 5}%`, `${radius[0] - 2}%`],
        silent: true,
        label: { show: false },
      },
      baseSeries,
    ];
  };

  const setOption = () => {
    const { show, align, addonBefore, addonAfter, textStyle } = statistics;
    const { animation, ...nextTooltip } = tooltip;

    const chartSeries = getSeries();

    chartInstance.current?.setOption(
      {
        grid: {
          show: false,
        },
        legend: [
          legend,
          {
            show,
            selectedMode: false,
            formatter: function () {
              const total = yAxisValues._defaultValue_.reduce(
                (acc: any, cur: any) => {
                  acc += cur;
                  return acc;
                },
                0,
              );
              const totalText = total || '0';
              const addonBeforeText = addonBefore.show
                ? `{addonBefore|${addonBefore.value}}`
                : '';
              const addonAfterText = addonAfter.show
                ? `{addonAfter|${addonAfter.value}}`
                : '';
              const data = [addonBeforeText, totalText, addonAfterText].filter(
                Boolean,
              );
              if (align === 'horizontal') return data.join('');
              return data.join('\n');
            },
            data: [xAxisKeys[0]],
            left: 'center',
            top: 'center',
            icon: 'none',
            align: 'center',
            textStyle: {
              ...textStyle,
              color: getRgbaString(textStyle.color),
              align: 'center',
              rich: {
                addonBefore: {
                  ...addonBefore.textStyle,
                  color: getRgbaString(addonBefore.textStyle.color),
                },
                addonAfter: {
                  ...addonAfter.textStyle,
                  color: getRgbaString(addonAfter.textStyle.color),
                },
              },
            },
          },
        ],
        series: chartSeries,
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
        loopSeries: false,
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

const WrapperCirclePie: typeof CirclePie & {
  id: ComponentData.TComponentSelfType;
} = CirclePie as any;

WrapperCirclePie.id = CHART_ID;

export default WrapperCirclePie;
