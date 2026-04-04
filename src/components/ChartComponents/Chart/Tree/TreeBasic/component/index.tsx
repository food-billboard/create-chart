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
import { TTreeBasicConfig } from '../type';

const { getRgbaString } = ColorSelect;

const TreeBasic = (
  props: ComponentData.CommonComponentProps<TTreeBasicConfig>,
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

  const { series, tooltip, animation, condition } =
    useChartPerConfig<TTreeBasicConfig>(options);

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
  } = useComponent<TTreeBasicConfig>({
    component: value,
    global,
  });

  const { onCondition: propsOnCondition } = useCondition({
    onCondition,
    screenType,
    componentId: id,
  });

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
    const { itemStyle, label, symbolSize, defaultSymbolSize, ...nextSeries } =
      series;
    const { animation: show, animationDuration, animationEasing } = animation;
    const { color, ...nextItemStyle } = itemStyle;

    const calString = symbolSize.replaceAll(/[^\d\/\+\-\*\(\)\.]/g, '');

    function calSymbolSize(current: number) {
      try {
        return eval(`${current}${calString}`);
      } catch (err) {
        return current - 20;
      }
    }

    function formatData(
      value: any,
      config: any,
      parentIndex = 0,
      colorIndex = 0,
    ) {
      let currentColorIndex = colorIndex;
      return value.map((item: any) => {
        let nextConfig: any = config ? { ...config } : null;

        if (!nextConfig) {
          nextConfig = {
            symbolSize: defaultSymbolSize,
          };
        } else {
          nextConfig.symbolSize = calSymbolSize(nextConfig.symbolSize);
        }

        if (parentIndex === 0 || parentIndex === 1) {
          nextConfig.color = getRgbaString(itemStyle.color[currentColorIndex]);
          currentColorIndex++;
        }

        const { children } = item;
        let base = {
          ...item,
          lineStyle: {
            color: nextConfig.color,
          },
          symbolSize: nextConfig.symbolSize,
        };

        if (parentIndex === 0 || parentIndex === 1) {
          base.label = {
            position: 'inside',
          };
        }

        if (Array.isArray(children) && children.length) {
          base.itemStyle = {
            borderColor: nextConfig.color,
            color: nextConfig.color,
          };
          base.children = formatData(
            children,
            nextConfig,
            parentIndex + 1,
            currentColorIndex,
          );
        } else {
          base.itemStyle = {
            color: 'transparent',
            borderColor: nextConfig.color,
          };
        }
        return base;
      });
    }

    const baseSeries = {
      ...nextSeries,
      label: {
        ...label,
        color: getRgbaString(label.color),
        position: 'inside',
      },
      type: 'tree',
      expandAndCollapse: true,
      initialTreeDepth: 2,
      roam: true,
      itemStyle: nextItemStyle,
      data: formatData(realValue, null),
      animation: show,
      animationEasing,
      animationEasingUpdate: animationEasing,
      animationDuration,
      animationDurationUpdate: animationDuration,
    };

    return [baseSeries];
  };

  const setOption = () => {
    const { animation, ...nextTooltip } = tooltip;

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
        },
      },
      true,
    );
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
  }, [processedValue, realValue]);

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

const WrapperTreeBasic: typeof TreeBasic & {
  id: ComponentData.TComponentSelfType;
} = TreeBasic as any;

WrapperTreeBasic.id = CHART_ID;

export default WrapperTreeBasic;
