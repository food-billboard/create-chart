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
import FetchFragment from '@/components/ChartComponents/Common/FetchFragment';
import ColorSelect from '@/components/ColorSelect';
import { useDeepUpdateEffect } from '@/hooks';
import { init } from '@/utils/Assist/EchartsLoader';
import { CHART_ID } from '../id';
import { TPictorialBarBasicConfig } from '../type';

const { getRgbaString } = ColorSelect;

const PictorialBar = (
  props: ComponentData.CommonComponentProps<TPictorialBarBasicConfig>,
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

  const { series, xAxis, yAxis, tooltip, animation, condition, grid } =
    useChartPerConfig<TPictorialBarBasicConfig>(options);

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
  } = useComponent<TPictorialBarBasicConfig>({
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
    const { spirit, symbolColor, symbol, ...nextSeries } = series;
    const { max } = xAxis;
    const { animation: show, animationDuration, animationEasing } = animation;
    const realSymbol = spirit.show ? 'image://' + spirit.value : symbol;
    const data = yAxisValues._defaultValue_;

    const baseSeries = {
      ...nextSeries,
      symbol: realSymbol,
      type: 'pictorialBar',
      itemStyle: {
        color: getRgbaString(symbolColor),
      },
      symbolClip: true,
      data,
      symbolBoundingData: max,
      animation: show,
      animationEasing,
      animationEasingUpdate: animationEasing,
      animationDuration,
      animationDurationUpdate: animationDuration,
      z: 10,
    };

    const realSeries = [
      baseSeries,
      {
        // full data
        ...nextSeries,
        symbol: realSymbol,
        type: 'pictorialBar',
        data,
        itemStyle: {
          opacity: 0.2,
          color: getRgbaString(symbolColor),
        },
        symbolColor: getRgbaString(symbolColor),
        symbolRepeat: 'fixed',
        animationDuration: 0,
        symbolBoundingData: max,
        z: 5,
      },
    ];

    return realSeries;
  };

  const setOption = () => {
    const { animation, ...nextTooltip } = tooltip;
    const series = getSeries();

    chartInstance.current?.setOption({
      grid: {
        ...grid,
      },
      series,
      xAxis: [xAxis],
      yAxis: [
        {
          ...yAxis,
          inverse: true,
          data: xAxisKeys,
          axisTick: { show: false },
          axisLine: { show: false },
        },
      ],
      tooltip: nextTooltip,
    });
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

const WrapperPictorialBarBasic: typeof PictorialBar & {
  id: ComponentData.TComponentSelfType;
} = PictorialBar as any;

WrapperPictorialBarBasic.id = CHART_ID;

export default WrapperPictorialBarBasic;
