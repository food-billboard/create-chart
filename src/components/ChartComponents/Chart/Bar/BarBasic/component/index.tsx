import { CSSProperties, useEffect, useRef } from 'react';
import echarts from 'echarts';
import { uniqueId } from 'lodash';
import {
  useComponent,
  useChartComponent,
} from '@/components/ChartComponents/Common/Component/hook';
import { ComponentProps } from '@/components/ChartComponents/Common/Component/type';
import { TBarBasicConfig } from '../type';

const CHART_ID = 'BAR_BASIC';

const BarBasic = (props: {
  className?: string;
  style?: CSSProperties;
  value: ComponentData.TComponentData<TBarBasicConfig>;
  global: ComponentProps['global'];
}) => {
  const { className, style, value, global } = props;

  const {
    config: {
      options: { legend, series, xAxis, yAxis, tooltip },
    },
  } = value;

  const chartId = useRef<string>(uniqueId(CHART_ID));
  const chartInstance = useRef<echarts.ECharts>();

  const { request, syncInteractiveAction, getValue } =
    useComponent<TBarBasicConfig>({
      component: value,
      global,
    });

  const initChart = () => {
    const chart = echarts.init(
      document.querySelector(`#${chartId.current!}`)!,
      {
        renderer: 'canvas',
      },
    );
    chartInstance.current = chart;
    setOption();
  };

  const setOption = () => {
    const { itemStyle, ...nextSeries } = series;
    chartInstance.current?.setOption({
      legend,
      series: {
        ...nextSeries,
      },
      xAxis,
      yAxis,
      tooltip,
    });
  };

  useChartComponent(chartInstance.current!);

  useEffect(() => {
    initChart();
    return () => {
      chartInstance.current?.dispose();
    };
  }, []);

  return (
    <div className={className} style={style} id={chartId.current}>
      hello
    </div>
  );
};

const WrapperBarBasic: typeof BarBasic & {
  id: ComponentData.TComponentSelfType;
} = BarBasic as any;

WrapperBarBasic.id = CHART_ID;

export default WrapperBarBasic;
