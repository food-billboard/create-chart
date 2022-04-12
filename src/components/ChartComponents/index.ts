import { ReactNode } from 'react';
import { mergeWithoutArray } from '@/utils/tool';
// Chart
import BarBasic from './Chart/Bar/BarBasic';
import LineBasic from './Chart/Line/LineBasic';
import PieBasic from './Chart/Pie/PieBasic';
import ScatterBasic from './Chart/Scatter/ScatterBasic';
import RadarBasic from './Chart/Radar/RadarBasic';
import BoxPlotBasic from './Chart/BoxPlot/BoxPlotBasic';
import FunnelBasic from './Chart/Funnel/FunnelBasic';
import GaugeBasic from './Chart/Gauge/GaugeBasic';
import TreeMapBasic from './Chart/TreeMap/TreeMapBasic';
import SunBurstBasic from './Chart/SunBurst/SunBurstBasic';
import PictorialBarBasic from './Chart/PictorialBar/PictorialBarBasic';
import ParallelBasic from './Chart/Parallel/ParallelBasic';
import CandlestickBasic from './Chart/Candlestick/CandlestickBasic';
import RadialBar from './Chart/Bar/RadialBar';
import RadialLine from './Chart/Line/RadialLine';
import ProgressBar from './Chart/Bar/ProgressBar';
import NightingalePie from './Chart/Pie/NightingalePie';
import RadialStackLine from './Chart/Line/RadialStackLine';
import ClockGauge from './Chart/Gauge/ClockGauge';
import CirclePie from './Chart/Pie/CirclePie';
import HorizontalBar from './Chart/Bar/HorizontalBar';
import RankBar from './Chart/Bar/RankBar';
import CachetBar from './Chart/Bar/CachetBar';
// other
import WordCloud from './Other/WordCloud';
import Iframe from './Other/Iframe';
import List from './Other/List';
import WaterBall from './Other/WaterBall';
// font
import Title from './Font/Title';
import TimeMachine from './Font/TimeMachine';
import CountUpNumber from './Font/CountUpNumber';
// media
import Image from './Media/Image';
import Video from './Media/Video';
import Carousel from './Media/Carousel';
// interactive
import Tab from './Interactive/Tab';
import Select from './Interactive/Select';

const COMPONENT_MAP = new Map<
  ComponentData.TComponentSelfType,
  {
    defaultConfig: object;
    configComponent: ReactNode;
    render: ReactNode;
  }
>();

COMPONENT_MAP.set(BarBasic.type, BarBasic);
COMPONENT_MAP.set(LineBasic.type, LineBasic);
COMPONENT_MAP.set(PieBasic.type, PieBasic);
COMPONENT_MAP.set(ScatterBasic.type, ScatterBasic);
COMPONENT_MAP.set(RadarBasic.type, RadarBasic);
COMPONENT_MAP.set(BoxPlotBasic.type, BoxPlotBasic);
COMPONENT_MAP.set(FunnelBasic.type, FunnelBasic);
COMPONENT_MAP.set(GaugeBasic.type, GaugeBasic);
COMPONENT_MAP.set(WordCloud.type, WordCloud);
COMPONENT_MAP.set(Title.type, Title);
COMPONENT_MAP.set(TimeMachine.type, TimeMachine);
COMPONENT_MAP.set(CountUpNumber.type, CountUpNumber);
COMPONENT_MAP.set(Image.type, Image);
COMPONENT_MAP.set(Carousel.type, Carousel);
COMPONENT_MAP.set(Iframe.type, Iframe);
COMPONENT_MAP.set(Tab.type, Tab);
COMPONENT_MAP.set(Select.type, Select);
COMPONENT_MAP.set(TreeMapBasic.type, TreeMapBasic);
COMPONENT_MAP.set(SunBurstBasic.type, SunBurstBasic);
COMPONENT_MAP.set(Video.type, Video);
COMPONENT_MAP.set(PictorialBarBasic.type, PictorialBarBasic);
COMPONENT_MAP.set(ParallelBasic.type, ParallelBasic);
COMPONENT_MAP.set(CandlestickBasic.type, CandlestickBasic);
COMPONENT_MAP.set(List.type, List);
COMPONENT_MAP.set(RadialBar.type, RadialBar);
COMPONENT_MAP.set(RadialLine.type, RadialLine);
COMPONENT_MAP.set(ProgressBar.type, ProgressBar);
COMPONENT_MAP.set(NightingalePie.type, NightingalePie);
COMPONENT_MAP.set(RadialStackLine.type, RadialStackLine);
COMPONENT_MAP.set(ClockGauge.type, ClockGauge);
COMPONENT_MAP.set(CirclePie.type, CirclePie);
COMPONENT_MAP.set(HorizontalBar.type, HorizontalBar);
COMPONENT_MAP.set(WaterBall.type, WaterBall);
COMPONENT_MAP.set(RankBar.type, RankBar);
COMPONENT_MAP.set(CachetBar.type, CachetBar);

export function getComponentByType(component: ComponentData.TComponentData) {
  return COMPONENT_MAP.get(component.componentType);
}

export function getComponentDefaultConfigByType(
  componentType: ComponentData.TComponentSelfType,
) {
  return COMPONENT_MAP.get(componentType)?.defaultConfig || {};
}

export function getComponentRenderByType(
  componentType: ComponentData.TComponentSelfType,
) {
  return COMPONENT_MAP.get(componentType)?.render;
}

export function getComponentConfigComponentByType(
  componentType: ComponentData.TComponentSelfType,
) {
  return COMPONENT_MAP.get(componentType)?.configComponent;
}

export function mergeComponentDefaultConfig(
  components: ComponentData.TComponentData[] | ComponentData.TComponentData,
) {
  const realComponents = Array.isArray(components) ? components : [components];
  return realComponents.map((component) => {
    const { componentType } = component;
    const defaultConfig = getComponentDefaultConfigByType(componentType);
    return mergeWithoutArray(
      {},
      {
        config: defaultConfig,
      },
      component,
    );
  });
}
