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
} from '@/components/ChartComponents/Common/Component/hook';
import { ComponentProps } from '@/components/ChartComponents/Common/Component/type';
import ColorSelect from '@/components/ColorSelect';
import FetchFragment, {
  TFetchFragmentRef,
} from '@/components/ChartComponents/Common/FetchFragment';
import { TTreeMapBasicConfig } from '../type';

const { getRgbaString } = ColorSelect;

const CHART_ID = 'TREE_MAP_BASIC';

const TreeMapBasic = (props: {
  className?: string;
  style?: CSSProperties;
  value: ComponentData.TComponentData<TTreeMapBasicConfig>;
  global: ComponentProps['global'];
}) => {
  const { className, style, value, global } = props;
  const { screenTheme } = global;

  const {
    id,
    config: { options },
  } = value;

  const { series, tooltip, animation, condition } = options;

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
  } = useComponent<TTreeMapBasicConfig>(
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

  const { value: realValue } = useChartValueMapField(processedValue, {
    map: componentFilterMap,
    fields: {
      seriesKey: '',
      xAxisKeyKey: 'name',
      yAxisValue: 'value',
    },
    deep: true,
  });

  const onClick = (params: any) => {
    const { name, data } = params;
    syncInteractiveAction('click', {
      name: name,
      value: data,
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
    const { label, upperLabel, breadcrumb, ...nextSeries } = series;
    const { animation: show, animationDuration, animationEasing } = animation;

    const baseSeries = {
      ...nextSeries,
      label: {
        ...label,
        color: getRgbaString(label.color),
      },
      upperLabel: {
        ...upperLabel,
        color: getRgbaString(upperLabel.color),
      },
      type: 'treemap',
      breadcrumb: {
        ...breadcrumb,
        itemStyle: {
          ...breadcrumb.itemStyle,
          color: getRgbaString(breadcrumb.itemStyle.color),
          textStyle: {
            ...breadcrumb.itemStyle.textStyle,
            color: getRgbaString(breadcrumb.itemStyle.textStyle.color),
          },
        },
      },
      roam: 'move',
      data: realValue,
      animation: show,
      animationEasing,
      animationEasingUpdate: animationEasing,
      animationDuration,
      animationDurationUpdate: animationDuration,
    };

    return baseSeries;
  };

  const setOption = () => {
    const {
      backgroundColor,
      textStyle: tooltipTextStyle,
      ...nextTooltip
    } = tooltip;

    const series = getSeries();

    chartInstance.current?.setOption(
      {
        grid: {
          show: false,
        },
        series,
        tooltip: {
          ...nextTooltip,
          trigger: 'item',
          backgroundColor: getRgbaString(backgroundColor),
          textStyle: {
            ...tooltipTextStyle,
            color: getRgbaString(tooltipTextStyle.color),
          },
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

const WrapperTreeMapBasic: typeof TreeMapBasic & {
  id: ComponentData.TComponentSelfType;
} = TreeMapBasic as any;

WrapperTreeMapBasic.id = CHART_ID;

export default WrapperTreeMapBasic;
