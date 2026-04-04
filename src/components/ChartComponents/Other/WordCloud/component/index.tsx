import 'echarts-wordcloud';
import { uniqueId, merge, random } from 'lodash';
import { useEffect, useRef } from 'react';
import {
  useComponent,
  useChartComponentResize,
  useChartValueMapField,
  useComponentResize,
  useCondition,
  ConditionComponent,
} from '@/components/ChartComponents/Common/Component/hook';
import FetchFragment from '@/components/ChartComponents/Common/FetchFragment';
import ColorSelect from '@/components/ColorSelect';
import { useDeepUpdateEffect } from '@/hooks';
import { init } from '@/utils/Assist/EchartsLoader';
import { CHART_ID } from '../id';
import { TWordCloudBasicConfig } from '../type';

const { getRgbaString } = ColorSelect;

const WordCloudBasic = (
  props: ComponentData.CommonComponentProps<TWordCloudBasicConfig>,
) => {
  const { className, style, value, global, children, wrapper: Wrapper } = props;
  const { screenTheme, screenType } = global;

  const {
    config: {
      options,
      style: { border },
    },
    id,
  } = value;

  const { series, tooltip, condition } = options;

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
  } = useComponent<TWordCloudBasicConfig>({
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
              Math.round(random(...r, false)),
              Math.round(random(...g, false)),
              Math.round(random(...g, false)),
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
  useDeepUpdateEffect(() => {
    setOption();
  }, [processedValue, xAxisKeys, yAxisValues]);

  // 配置发生变化时
  useDeepUpdateEffect(() => {
    setOption();
    chartInstance.current?.resize();
  }, [options]);

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

const WrapperWordCloudBasic: typeof WordCloudBasic & {
  id: ComponentData.TComponentSelfType;
} = WordCloudBasic as any;

WrapperWordCloudBasic.id = CHART_ID;

export default WrapperWordCloudBasic;
