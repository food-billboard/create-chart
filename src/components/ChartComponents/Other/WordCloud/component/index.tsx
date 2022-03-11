import { CSSProperties, useEffect, useRef } from 'react';
import { init } from 'echarts';
import { uniqueId, merge } from 'lodash';
import { Random } from 'mockjs';
import { useUpdateEffect, useDeepCompareEffect } from 'ahooks';
import 'echarts-wordcloud';
import {
  useComponent,
  useChartComponentResize,
  useChartValueMapField,
  useComponentResize,
} from '@/components/ChartComponents/Common/Component/hook';
import { ComponentProps } from '@/components/ChartComponents/Common/Component/type';
import ColorSelect from '@/components/ColorSelect';
import FetchFragment, {
  TFetchFragmentRef,
} from '@/components/ChartComponents/Common/FetchFragment';
import { TWordCloudBasicConfig } from '../type';

const { getRgbaString } = ColorSelect;

const CHART_ID = 'WORD_CLOUD_BASIC';

const WordCloudBasic = (props: {
  className?: string;
  style?: CSSProperties;
  value: ComponentData.TComponentData<TWordCloudBasicConfig>;
  global: ComponentProps['global'];
}) => {
  const { className, style, value, global } = props;
  const { screenTheme } = global;

  const {
    config: { options },
  } = value;

  const { series, tooltip } = options;

  const chartId = useRef<string>(uniqueId(CHART_ID));
  const chartInstance = useRef<echarts.ECharts>();
  const requestRef = useRef<TFetchFragmentRef>(null);
  const isFirst = useRef<boolean>(true);

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
  } = useComponent<TWordCloudBasicConfig>(
    {
      component: value,
      global,
    },
    requestRef,
  );

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
    const { textStyle, ...nextSeries } = series;
    const {
      color: {
        range: { r, g, b },
      },
      ...nextTextStyle
    } = textStyle;

    const baseSeries = {
      ...nextSeries,
      left: 'center',
      top: 'center',
      width: '70%',
      height: '80%',
      drawOutOfBound: false,
      textStyle: {
        ...nextTextStyle,
        color: function () {
          return (
            'rgb(' +
            [
              Math.round(Random.natural(...r)),
              Math.round(Random.natural(...g)),
              Math.round(Random.natural(...b)),
            ].join(',') +
            ')'
          );
        },
      },
      type: 'wordCloud',
      data: xAxisKeys.map((item: any, index: number) => {
        return {
          name: item,
          value: yAxisValues._defaultValue_[index],
        };
      }),
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
  useDeepCompareEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
    } else {
      setOption();
      chartInstance.current?.resize();
    }
  }, [processedValue]);

  // 配置发生变化时
  useUpdateEffect(() => {
    setOption();
    chartInstance.current?.resize();
  }, [options]);

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
        id={chartId.current}
      ></div>
      <FetchFragment
        url={requestUrl}
        ref={requestRef}
        reFetchData={request}
        reGetValue={getValue}
        componentFilter={componentFilter}
      />
    </>
  );
};

const WrapperWordCloudBasic: typeof WordCloudBasic & {
  id: ComponentData.TComponentSelfType;
} = WordCloudBasic as any;

WrapperWordCloudBasic.id = CHART_ID;

export default WrapperWordCloudBasic;
