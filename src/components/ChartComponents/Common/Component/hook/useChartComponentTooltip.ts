import { noop, merge } from 'lodash';

export type TooltipOptions = {
  interval: number;
  loopSeries: boolean;
  seriesIndex: number;
};

const DEFAULT_OPTIONS: TooltipOptions = {
  interval: 2000,
  loopSeries: true,
  seriesIndex: 1,
};

export const useChartComponentTooltip = (
  chart: echarts.ECharts,
  series: any,
  options?: Partial<TooltipOptions>,
) => {
  let dataIndex: number = 0;
  let seriesIndex: number = 0;
  let chartType: string = '';
  let dataLength: number = 0;
  let lastShowSeriesIndex = 0;
  let lastShowDataIndex = 0;
  let first = true;
  let timeTicket: any = 0;
  const seriesLength = series.length;

  if (!chart || !seriesLength) {
    return {
      clearLoop: noop,
    };
  }

  const { interval, loopSeries } = merge({}, DEFAULT_OPTIONS, options);
  const zRender = chart.getZr();

  const clearLoop = () => {
    if (timeTicket) {
      clearInterval(timeTicket);
      timeTicket = 0;
    }
    clearListener();
  };

  const clearListener = () => {
    chart.off('mousemove', stopAutoShow);
    chart.off('mouseout', onMouseOut);
    zRender.off('mousemove', zRenderMouseMove);
    zRender.off('globalout', zRenderGlobalOut);
  };

  const cancelHighlight = () => {
    let tempSeriesIndex =
      dataIndex === 0
        ? loopSeries
          ? seriesIndex === 0
            ? seriesLength - 1
            : seriesIndex - 1
          : seriesIndex
        : seriesIndex;
    let tempType = series[tempSeriesIndex].type;

    if (tempType === 'pie' || tempType === 'radar') {
      chart.dispatchAction({
        type: 'downplay',
        seriesIndex: lastShowSeriesIndex,
        dataIndex: lastShowDataIndex,
      });
    }
  };

  /**
   * 自动轮播tooltip
   */
  const autoShowTip = () => {
    function showTip() {
      let currSeries = series[seriesIndex];
      if (
        !series ||
        series.length === 0 ||
        !currSeries ||
        !currSeries.type ||
        !currSeries.data ||
        !currSeries.data.length
      ) {
        return;
      }
      chartType = currSeries.type;
      dataLength = currSeries.data.length;

      let tipParams: any = {
        seriesIndex,
      };
      switch (chartType) {
        case 'pie':
        case 'map':
        case 'chord':
          tipParams.name = currSeries.data[dataIndex].name;
          break;
        case 'radar': // 雷达图
          tipParams.seriesIndex = seriesIndex;
          tipParams.dataIndex = dataIndex;
          break;
        default:
          tipParams.dataIndex = dataIndex;
          break;
      }

      if (chartType === 'pie' || chartType === 'radar') {
        if (!first) {
          cancelHighlight();
        }

        // 高亮当前图形
        chart.dispatchAction({
          type: 'highlight',
          seriesIndex,
          dataIndex,
        });
      }

      // 显示 tooltip
      tipParams.type = 'showTip';

      setTimeout(() => {
        chart.dispatchAction(tipParams);
      }, 0);

      lastShowSeriesIndex = seriesIndex;
      lastShowDataIndex = dataIndex;
      dataIndex = (dataIndex + 1) % dataLength;
      if (loopSeries && dataIndex === 0) {
        seriesIndex = (seriesIndex + 1) % seriesLength;
      }

      first = false;
    }

    showTip();
    timeTicket = setInterval(showTip, interval);
  };

  // 关闭轮播
  const stopAutoShow = () => {
    if (timeTicket) {
      clearInterval(timeTicket);
      timeTicket = 0;

      if (chartType === 'pie' || chartType === 'radar') {
        cancelHighlight();
      }
    }
  };

  // 离开图
  const onMouseOut = (e: any) => {
    const currentDataIndex = e.dataIndex;
    dataIndex = currentDataIndex;
  };

  const zRenderMouseMove = (param: any) => {
    if (param.event) {
      //阻止canvas上的鼠标移动事件冒泡
      param.event.cancelBubble = true;
    }

    stopAutoShow();
  };

  // 离开echarts图时恢复自动轮播
  const zRenderGlobalOut = () => {
    if (!timeTicket) {
      autoShowTip();
    }
  };

  clearLoop();

  chart.on('mousemove', stopAutoShow);
  chart.on('mouseout', onMouseOut);
  zRender.on('mousemove', zRenderMouseMove);
  zRender.on('globalout', zRenderGlobalOut);

  autoShowTip();

  return {
    clearLoop,
  };
};
