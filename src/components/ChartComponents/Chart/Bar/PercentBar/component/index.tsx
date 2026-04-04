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
  useChartPerConfig,
} from '@/components/ChartComponents/Common/Component/hook';
import FetchFragment from '@/components/ChartComponents/Common/FetchFragment';
import { radialGradientColor } from '@/components/ChartComponents/Common/utils';
import ColorSelect from '@/components/ColorSelect';
import { useDeepUpdateEffect } from '@/hooks';
import { init } from '@/utils/Assist/EchartsLoader';
import { CHART_ID } from '../id';
import { TPercentBarConfig } from '../type';

const { getRgbaString } = ColorSelect;

const PercentBar = (
  props: ComponentData.CommonComponentProps<TPercentBarConfig>,
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

  const { series, tooltip, animation, condition, grid } =
    useChartPerConfig<TPercentBarConfig>(options);

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
  } = useComponent<TPercentBarConfig>({
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
      seriesKey: 's',
      xAxisKeyKey: 'name',
      yAxisValue: 'value',
    },
  });

  const onClick = (params: any) => {
    const { seriesName, value } = params;
    const target = {
      value: value,
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
    const {
      itemStyle: itemStyleList,
      barWidth: _barWidth,
      ...nextSeries
    } = series;
    const { animation: show, animationDuration, animationEasing } = animation;
    // @ts-ignore
    const barWidth = _barWidth === 'auto' ? 20 : _barWidth;

    const { label, color } = itemStyleList[0] || {};

    function labelConfig(label: any) {
      if (!label) return {};
      return {
        show: label.show,
        formatter: (params: any) => {
          let before = params.seriesName;
          let after =
            params.value +
            (label.formatter.value.addonAfter.show
              ? label.formatter.value.addonAfter.value
              : '');
          before = label.formatter.name.show ? before : '';
          after = label.formatter.value.show ? after : '';

          return `{empty|${after}}{name|${before}}{center|}{value|${after}}{empty|${before}}`;
        },
        align: 'center',
        position: 'inside',
        rich: {
          empty: {
            color: 'rgba(0, 0, 0, 0)',
          },
          name: {
            ...label.formatter.name,
            color: getRgbaString(label.formatter.name.color),
            align: 'left',
          },
          center: {
            width: barWidth * 2,
            align: 'center',
          },
          value: {
            ...label.formatter.value,
            color: getRgbaString(label.formatter.value.color),
            align: 'right',
          },
        },
      };
    }

    const baseSeries = {
      ...nextSeries,
      barWidth,
      label: labelConfig(label),
      type: 'bar',
      stack: 'percent-bar',
      itemStyle: {
        color: radialGradientColor(color),
      },
      zlevel: 1,
      data: yAxisValues._defaultValue_,
      emphasis: {
        focus: 'series',
      },
      animation: show,
      animationEasing,
      animationEasingUpdate: animationEasing,
      animationDuration,
      animationDurationUpdate: animationDuration,
    };

    const realSeries = xAxisKeys.map((item: any, index: number) => {
      const { label, color } = itemStyleList[index] || {};
      let borderRadiusConfig = undefined;
      if (index === 0) {
        borderRadiusConfig = [0, 0, barWidth / 2, barWidth / 2];
      } else if (index === xAxisKeys.length - 1) {
        borderRadiusConfig = [barWidth / 2, barWidth / 2, 0, 0];
      }

      return {
        ...baseSeries,
        label: labelConfig(label),
        itemStyle: {
          color: radialGradientColor(color),
          borderRadius: borderRadiusConfig,
        },
        data: [yAxisValues._defaultValue_[index]],
        name: item,
      };
    });

    return realSeries;
  };

  const setOption = () => {
    const { ...nextTooltip } = tooltip;

    const realSeries = getSeries();

    chartInstance.current?.setOption(
      {
        grid: {
          ...grid,
        },
        series: realSeries,
        xAxis: {
          show: false,
          data: [''],
        },
        yAxis: [
          {
            show: false,
            type: 'value',
          },
        ],
        tooltip: {
          ...nextTooltip,
          trigger: 'axis',
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

const WrapperPercentBar: typeof PercentBar & {
  id: ComponentData.TComponentSelfType;
} = PercentBar as any;

WrapperPercentBar.id = CHART_ID;

export default WrapperPercentBar;
