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
  ConditionComponent,
  useChartComponentTooltip,
  useChartPerConfig,
} from '@/components/ChartComponents/Common/Component/hook';
import { DEFAULT_BORDER_RADIUS } from '@/components/ChartComponents/Common/Constants/defaultConfig';
import FetchFragment from '@/components/ChartComponents/Common/FetchFragment';
import ColorSelect from '@/components/ColorSelect';
import { useDeepUpdateEffect } from '@/hooks';
import { init } from '@/utils/Assist/EchartsLoader';
import { CHART_ID } from '../id';
import { TCirclePieConfig } from '../type';

const { getRgbaString } = ColorSelect;

const CirclePie = (
  props: ComponentData.CommonComponentProps<TCirclePieConfig>,
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

  const { legend, series, tooltip, animation, condition, statistics } =
    useChartPerConfig<TCirclePieConfig>(options);

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
  } = useComponent<TCirclePieConfig>({
    component: value,
    global,
  });

  const { onCondition: propsOnCondition } = useCondition({
    onCondition,
    screenType,
    componentId: id,
  });

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
    const target = {
      name,
      value,
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
      itemStyle: {
        ...nextItemStyle,
        borderRadius: DEFAULT_BORDER_RADIUS,
      },
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

const WrapperCirclePie: typeof CirclePie & {
  id: ComponentData.TComponentSelfType;
} = CirclePie as any;

WrapperCirclePie.id = CHART_ID;

export default WrapperCirclePie;
