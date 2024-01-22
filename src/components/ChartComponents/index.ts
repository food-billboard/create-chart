import { get, omit } from 'lodash';
import { getDvaGlobalModelData } from '@/utils/Assist/Component';
import { isGroupComponent } from '@/utils/Assist/Component';
import { DEFAULT_GROUP_CONFIG } from '@/utils/constants/screenData';
import { mergeWithoutArray } from '@/utils/tool';
// Chart
import BarBasic from './Chart/Bar/BarBasic';
import CachetBar from './Chart/Bar/CachetBar';
import HorizontalBar from './Chart/Bar/HorizontalBar';
import LineBar from './Chart/Bar/LineBar';
import NegativeBar from './Chart/Bar/NegativeBar';
import PercentBar from './Chart/Bar/PercentBar';
import PolarBar from './Chart/Bar/PolarBar';
import PolarStackBar from './Chart/Bar/PolarStackBar';
import ProgressBar from './Chart/Bar/ProgressBar';
import RadialBar from './Chart/Bar/RadialBar';
import RankBar from './Chart/Bar/RankBar';
import StackBar from './Chart/Bar/StackBar';
import ThreeBar from './Chart/Bar/ThreeBar';
import WaterFallBar from './Chart/Bar/WaterFallBar';
import ZebraBar from './Chart/Bar/ZebraBar';
import BoxPlotBasic from './Chart/BoxPlot/BoxPlotBasic';
import CandlestickBasic from './Chart/Candlestick/CandlestickBasic';
import FunnelBasic from './Chart/Funnel/FunnelBasic';
import ClockGauge from './Chart/Gauge/ClockGauge';
import GaugeBasic from './Chart/Gauge/GaugeBasic';
import LineBasic from './Chart/Line/LineBasic';
import RadialLine from './Chart/Line/RadialLine';
import RadialStackLine from './Chart/Line/RadialStackLine';
import StepLine from './Chart/Line/StepLine';
import ParallelBasic from './Chart/Parallel/ParallelBasic';
import PictorialBarBasic from './Chart/PictorialBar/PictorialBarBasic';
import CirclePie from './Chart/Pie/CirclePie';
import NightingalePie from './Chart/Pie/NightingalePie';
import PercentPie from './Chart/Pie/PercentPie';
import PieBasic from './Chart/Pie/PieBasic';
import RadarBasic from './Chart/Radar/RadarBasic';
import BubbleScatter from './Chart/Scatter/BubbleScatter';
import ScatterBasic from './Chart/Scatter/ScatterBasic';
import SunBurstBasic from './Chart/SunBurst/SunBurstBasic';
import TreeBasic from './Chart/Tree/TreeBasic';
import TreeMapBasic from './Chart/TreeMap/TreeMapBasic';
import RenderWrapper from './Common/RenderWrapper';
import CountUpNumber from './Font/CountUpNumber';
import FontCarousel from './Font/FontCarousel';
import Icon from './Font/Icon';
import LoopText from './Font/LoopText';
import Tag from './Font/Tag';
import Text from './Font/Text';
import TimeMachine from './Font/TimeMachine';
// font
import Title from './Font/Title';
import Button from './Interactive/Button';
import Checkbox from './Interactive/Checkbox';
import Datepicker from './Interactive/Datepicker';
import FullScreen from './Interactive/FullScreen';
import Input from './Interactive/Input';
import Pagination from './Interactive/Pagination';
import Radio from './Interactive/Radio';
import Rate from './Interactive/Rate';
import Select from './Interactive/Select';
import Steps from './Interactive/Steps';
import Switch from './Interactive/Switch';
// interactive
import Tab from './Interactive/Tab';
import Ali3DMap from './Map/Ali3DMap';
// map
import ScatterMap from './Map/ScatterMap';
import Audio from './Media/Audio';
import Carousel from './Media/Carousel';
// media
import Image from './Media/Image';
import LottieAnime from './Media/LottieAnime';
import Model from './Media/Model';
import PictureWall from './Media/PictureWall';
import Video from './Media/Video';
import Iframe from './Other/Iframe';
import List from './Other/List';
import LuckyDraw from './Other/LuckyDraw';
import PathBasic from './Other/PathBasic';
import QrCode from './Other/QrCode';
import StateCard from './Other/StateCard';
import StateList from './Other/StateList';
import WaterBall from './Other/WaterBall';
import Weather from './Other/Weather';
// other
import WordCloud from './Other/WordCloud';
import Decoration1 from './Source/Decoration1';
import Decoration2 from './Source/Decoration2';
import Decoration3 from './Source/Decoration3';
import Decoration4 from './Source/Decoration4';
import Decoration5 from './Source/Decoration5';
import Decoration6 from './Source/Decoration6';
import Decoration7 from './Source/Decoration7';
import Decoration8 from './Source/Decoration8';
// source
import Ticket from './Source/Ticket';
import Typed from './Source/Typed';

// component-map-import-prefix

type MapKey = ComponentData.TComponentSelfType;
type MapValue = {
  themeConfig: {
    convert: (colorList: string[], options: any) => any;
  };
  defaultConfig: () => object;
  configComponent: (props: any) => JSX.Element;
  render: (props: any) => JSX.Element;
};

const COMPONENT_MAP = new Map<MapKey, MapValue>();

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
COMPONENT_MAP.set(PercentPie.type, PercentPie);
COMPONENT_MAP.set(StackBar.type, StackBar);
COMPONENT_MAP.set(NegativeBar.type, NegativeBar);
COMPONENT_MAP.set(PercentBar.type, PercentBar);
COMPONENT_MAP.set(LineBar.type, LineBar);
COMPONENT_MAP.set(ScatterMap.type, ScatterMap);
COMPONENT_MAP.set(FontCarousel.type, FontCarousel);
COMPONENT_MAP.set(Text.type, Text);
COMPONENT_MAP.set(ZebraBar.type, ZebraBar);
COMPONENT_MAP.set(TreeBasic.type, TreeBasic);
COMPONENT_MAP.set(WaterFallBar.type, WaterFallBar);
COMPONENT_MAP.set(BubbleScatter.type, BubbleScatter);
COMPONENT_MAP.set(LoopText.type, LoopText);
COMPONENT_MAP.set(PictureWall.type, PictureWall);
COMPONENT_MAP.set(StateCard.type, StateCard);
COMPONENT_MAP.set(Icon.type, Icon);
COMPONENT_MAP.set(Steps.type, Steps);
COMPONENT_MAP.set(Switch.type, Switch);
COMPONENT_MAP.set(Input.type, Input);
COMPONENT_MAP.set(Checkbox.type, Checkbox);
COMPONENT_MAP.set(Radio.type, Radio);
COMPONENT_MAP.set(PolarBar.type, PolarBar);
COMPONENT_MAP.set(StepLine.type, StepLine);
COMPONENT_MAP.set(Datepicker.type, Datepicker);
COMPONENT_MAP.set(PolarStackBar.type, PolarStackBar);
COMPONENT_MAP.set(StateList.type, StateList);
COMPONENT_MAP.set(Rate.type, Rate);
COMPONENT_MAP.set(Tag.type, Tag);
COMPONENT_MAP.set(Weather.type, Weather);
COMPONENT_MAP.set(Audio.type, Audio);
COMPONENT_MAP.set(Model.type, Model);
COMPONENT_MAP.set(Ali3DMap.type, Ali3DMap);
COMPONENT_MAP.set(PathBasic.type, PathBasic);
COMPONENT_MAP.set(QrCode.type, QrCode);
COMPONENT_MAP.set(LuckyDraw.type, LuckyDraw);
COMPONENT_MAP.set(Ticket.type, Ticket);
COMPONENT_MAP.set(Button.type, Button);
COMPONENT_MAP.set(Typed.type, Typed);
COMPONENT_MAP.set(Decoration1.type, Decoration1);
COMPONENT_MAP.set(Decoration2.type, Decoration2);
COMPONENT_MAP.set(Decoration3.type, Decoration3);
COMPONENT_MAP.set(Decoration4.type, Decoration4);
COMPONENT_MAP.set(Decoration5.type, Decoration5);
COMPONENT_MAP.set(Decoration6.type, Decoration6);
COMPONENT_MAP.set(Decoration7.type, Decoration7);
COMPONENT_MAP.set(Decoration8.type, Decoration8);
COMPONENT_MAP.set(Pagination.type, Pagination);
COMPONENT_MAP.set(FullScreen.type, FullScreen);
COMPONENT_MAP.set(ThreeBar.type, ThreeBar);
COMPONENT_MAP.set(LottieAnime.type, LottieAnime);
// component-map-insert-prefix

// 根据组件类型获取组件信息
export function getComponentByType(
  component: Partial<ComponentData.TComponentData> &
    Pick<ComponentData.TComponentData, 'componentType'>,
): MapValue {
  const config = COMPONENT_MAP.get(component.componentType);
  const { render, ...nextConfig } = config as MapValue;
  return {
    ...nextConfig,
    render: RenderWrapper(render, component.componentType),
  };
}

// 根据组件类型获取组件默认配置
export function getComponentDefaultConfigByType(
  componentType: ComponentData.TComponentSelfType,
  // 是否是新增组件
  // ? 因为需要迎合下面的合并操作，如果是老组件，不需要去合并这个全局的配置
  isNew = false,
) {
  const defaultConfig =
    getComponentByType({ componentType })?.defaultConfig() || {};
  // ? 合并默认的数据请求配置到默认配置中
  if (isNew && !get(defaultConfig, 'config.data.disabled')) {
    const defaultRequest =
      get(getDvaGlobalModelData(), 'screenData.config.attr.request') || {};
    return mergeWithoutArray(defaultConfig, {
      data: {
        request: {
          ...omit(defaultRequest, ['body', 'headers']),
        },
      },
    });
  }
  return defaultConfig;
}

// 根据组件类型获取组件色调配置
export function getComponentThemeConfigByType(
  componentType: ComponentData.TComponentSelfType,
) {
  return COMPONENT_MAP.get(componentType)?.themeConfig || {};
}

// 根据组件类型获取组件render
export function getComponentRenderByType(
  componentType: ComponentData.TComponentSelfType,
) {
  return getComponentByType({ componentType })?.render;
}

// 根据组件类型获取组件配置
export function getComponentConfigComponentByType(
  componentType: ComponentData.TComponentSelfType,
) {
  return getComponentByType({ componentType })?.configComponent;
}

// 合并组件配置和默认配置
export function mergeComponentDefaultConfig(
  components: ComponentData.TComponentData[] | ComponentData.TComponentData,
): ComponentData.TComponentData[] {
  const realComponents = Array.isArray(components) ? components : [components];
  return realComponents.map((component) => {
    const { componentType } = component;
    let defaultConfig: any;
    if (isGroupComponent(component)) {
      defaultConfig = {
        ...DEFAULT_GROUP_CONFIG,
      };
    } else {
      defaultConfig = getComponentDefaultConfigByType(componentType);
    }
    return mergeWithoutArray(
      {},
      {
        config: defaultConfig,
      },
      component,
      ...(component.components
        ? [
            {
              components: mergeComponentDefaultConfig(component.components),
            },
          ]
        : []),
    );
  });
}

// 获取当前所有的组件
export function getAllComponent() {
  return Array.from(COMPONENT_MAP.entries()).map((item) => {
    const [key, value] = item;
    return {
      ...value,
      type: key,
    };
  });
}

// 获取当前组件的数量
export function getComponentLength() {
  return COMPONENT_MAP.size;
}
