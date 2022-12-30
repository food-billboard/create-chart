import { useEffect, useRef, useMemo } from 'react';
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
import { radialGradientColor } from '@/components/ChartComponents/Common/utils';
import ColorSelect from '@/components/ColorSelect';
import { init } from '@/utils/Assist/EchartsLoader';
import FilterDataUtil from '@/utils/Assist/FilterData';
import FetchFragment, {
  TFetchFragmentRef,
} from '@/components/ChartComponents/Common/FetchFragment';
import { TProgressBarConfig } from '../type';
import { CHART_ID } from '../id';

const { getRgbaString } = ColorSelect;

const ProgressBar = (
  props: ComponentData.CommonComponentProps<TProgressBarConfig>,
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
    linkageMethod,
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
  } = useCondition(onCondition, screenType);

  const finalValue = useMemo(() => {
    return FilterDataUtil.getFieldMapValue(processedValue, {
      map: componentFilterMap,
    });
  }, [processedValue, componentFilterMap]);

  const onClick = () => {
    syncInteractiveAction('click', {
      value: finalValue.value,
    });
    linkageMethod('click', { value: finalValue.value });
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
      itemStyle,
      backgroundStyle,
      label,
      barWidth: _barWidth,
      ...nextSeries
    } = series;
    const { animation: show, animationDuration, animationEasing } = animation;
    // @ts-ignore
    const barWidth = _barWidth === 'auto' ? 20 : _barWidth;
    const baseSeries = {
      ...nextSeries,
      backgroundStyle: {
        ...backgroundStyle,
        borderRadius: barWidth * 1.5,
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
        borderRadius: barWidth / 2,
        color: radialGradientColor(itemStyle.color),
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

    chartInstance.current?.setOption(
      {
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
  }, [processedValue, finalValue]);

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
