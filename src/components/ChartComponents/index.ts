import { ReactNode } from 'react';
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
// other
import WordCloud from './Other/WordCloud';
import Iframe from './Other/Iframe';
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
