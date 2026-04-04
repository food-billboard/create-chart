import classnames from 'classnames';
import { uniqueId, merge } from 'lodash';
import { useEffect, useRef, useMemo } from 'react';
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
import { parseTextStyle } from '@/components/ChartComponents/Common/utils';
import ColorSelect from '@/components/ColorSelect';
import { useDeepUpdateEffect } from '@/hooks';
import { init } from '@/utils/Assist/EchartsLoader';
import FilterDataUtil from '@/utils/Assist/FilterData';
import { CHART_ID } from '../id';
import { TPercentPieBasicConfig } from '../type';
import styles from './index.less';

const { getRgbaString } = ColorSelect;

const PercentPieBasic = (
  props: ComponentData.CommonComponentProps<TPercentPieBasicConfig>,
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

  const { series, animation, condition, statistics } =
    useChartPerConfig<TPercentPieBasicConfig>(options);

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
  } = useComponent<TPercentPieBasicConfig>({
    component: value,
    global,
  });

  const { onCondition: propsOnCondition } = useCondition({
    onCondition,
    screenType,
    componentId: id,
  });

  const finalValue = useMemo(() => {
    return FilterDataUtil.getFieldMapValue(processedValue, {
      map: componentFilterMap,
    });
  }, [processedValue, componentFilterMap]);

  const { xAxisKeys, yAxisValues } = useChartValueMapField(processedValue, {
    map: componentFilterMap,
    fields: {
      seriesKey: '',
      xAxisKeyKey: 'name',
      yAxisValue: 'value',
    },
  });

  const statisticsElement = useMemo(() => {
    const { show, align, addonBefore, addonAfter, textStyle } = statistics;
    if (!show) return null;
    return (
      <div
        className={classnames(
          'pos-ab dis-flex',
          styles['percent-pie-basic-statistics'],
        )}
        style={{
          flexDirection: align === 'vertical' ? 'column' : 'row',
          ...parseTextStyle(textStyle),
        }}
      >
        {addonBefore.show && (
          <div style={parseTextStyle(addonBefore.textStyle)}>
            {addonBefore.value}
          </div>
        )}
        <div>{finalValue.value}</div>
        {addonAfter.show && (
          <div style={parseTextStyle(addonAfter.textStyle)}>
            {addonAfter.value}
          </div>
        )}
      </div>
    );
  }, [statistics]);

  const onClick = () => {
    const target = {
      value: finalValue.value,
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
    const { radius, colorPrimary, colorSecondary, ...nextSeries } = series;
    const { animation: show, animationDuration, animationEasing } = animation;

    return {
      ...nextSeries,
      radius: radius.map((item) => `${item}%`),
      center: ['50%', '50%'],
      type: 'pie',
      itemStyle: {
        borderRadius: 0,
      },
      label: {
        show: false,
      },
      labelLine: {
        show: false,
      },
      data: [
        {
          value: finalValue.value,
          itemStyle: {
            color: getRgbaString(colorPrimary),
          },
        },
        {
          value: 100 - finalValue.value,
          name: 'invisible',
          itemStyle: {
            color: getRgbaString(colorSecondary),
          },
        },
      ],
      animation: show,
      animationEasing,
      animationEasingUpdate: animationEasing,
      animationDuration,
      animationDurationUpdate: animationDuration,
    };
  };

  const setOption = () => {
    const chartSeries = getSeries();

    chartInstance.current?.setOption(
      {
        grid: {
          show: false,
        },
        series: chartSeries,
        tooltip: {
          show: false,
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
          {statisticsElement}
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

const WrapperPercentPieBasic: typeof PercentPieBasic & {
  id: ComponentData.TComponentSelfType;
} = PercentPieBasic as any;

WrapperPercentPieBasic.id = CHART_ID;

export default WrapperPercentPieBasic;
