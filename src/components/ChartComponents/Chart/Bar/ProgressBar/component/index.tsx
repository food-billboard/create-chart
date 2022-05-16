import { CSSProperties, useEffect, useRef, useMemo } from 'react';
import { init } from 'echarts';
import { uniqueId, merge } from 'lodash';
import classnames from 'classnames';
import { useDeepUpdateEffect } from '@/hooks';
import {
  useComponent,
  useChartComponentResize,
  useComponentResize,
  useAnimationChange,
  useCondition,
  useChartPerConfig,
} from '@/components/ChartComponents/Common/Component/hook';
import { ComponentProps } from '@/components/ChartComponents/Common/Component/type';
import { radialGradientColor } from '@/components/ChartComponents/Common/utils';
import ColorSelect from '@/components/ColorSelect';
import FilterDataUtil from '@/utils/Assist/FilterData';
import FetchFragment, {
  TFetchFragmentRef,
} from '@/components/ChartComponents/Common/FetchFragment';
import { TProgressBarConfig } from '../type';

const { getRgbaString } = ColorSelect;

const CHART_ID = 'PROGRESS_BAR';

const ProgressBar = (props: {
  className?: string;
  style?: CSSProperties;
  value: ComponentData.TComponentData<TProgressBarConfig>;
  global: ComponentProps['global'];
}) => {
  const { className, style, value, global } = props;
  const { screenTheme } = global;

  const {
    id,
    config: { options },
  } = value;

  const { series, yAxis, tooltip, animation, condition, grid } =
    useChartPerConfig<TProgressBarConfig>(options, ['yAxis']);

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
  } = useComponent<TProgressBarConfig>(
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

  const finalValue = useMemo(() => {
    return FilterDataUtil.getFieldMapValue(processedValue, {
      map: componentFilterMap,
    });
  }, [processedValue, componentFilterMap]);

  const onClick = () => {
    syncInteractiveAction('click', {
      value: finalValue.value,
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
    const { itemStyle, backgroundStyle, label, ...nextSeries } = series;
    const { animation: show, animationDuration, animationEasing } = animation;
    const baseSeries = {
      ...nextSeries,
      backgroundStyle: {
        ...backgroundStyle,
        color: getRgbaString(backgroundStyle.color),
      },
      label: {
        ...label,
        color: getRgbaString(label.color),
        position: 'right',
      },
      yAxisIndex: 0,
      type: 'bar',
      itemStyle: {
        ...itemStyle,
        color: radialGradientColor(itemStyle.color) || 'auto',
      },
      data: [finalValue.value],
      animation: show,
      animationEasing,
      animationEasingUpdate: animationEasing,
      animationDuration,
      animationDurationUpdate: animationDuration,
    };

    return [baseSeries];
  };

  const setOption = () => {
    const { ...nextTooltip } = tooltip;
    const { axisLabel: yAxisLabel } = yAxis;

    const realSeries = getSeries();

    chartInstance.current?.setOption({
      series: realSeries,
      xAxis: {
        show: false,
        type: 'value',
        max: 100,
      },
      yAxis: [
        {
          type: 'category',
          inverse: true,
          axisLabel: {
            show: yAxisLabel.show,
            ...yAxisLabel.textStyle,
            color: getRgbaString(yAxisLabel.textStyle.color),
          },
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          data: [yAxisLabel.value],
        },
        {
          type: 'category',
          inverse: true,
          axisTick: 'none',
          axisLine: 'none',
          show: true,
          axisLabel: {
            show: false,
          },
          data: [processedValue.value],
        },
      ],
      tooltip: {
        ...nextTooltip,
        trigger: 'axis',
      },
      grid: {
        ...grid,
      },
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
    chartInstance.current?.resize();
  }, [processedValue]);

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

const WrapperProgressBar: typeof ProgressBar & {
  id: ComponentData.TComponentSelfType;
} = ProgressBar as any;

WrapperProgressBar.id = CHART_ID;

export default WrapperProgressBar;
