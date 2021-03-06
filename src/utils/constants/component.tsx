import {
  InteractionOutlined,
  AreaChartOutlined,
  FontColorsOutlined,
  FundProjectionScreenOutlined,
  CompassOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';
import classnames from 'classnames';
import BarBasic from '../../../public/components/bar-basic.png';
import LineBasic from '../../../public/components/line-basic.png';
import PieBasic from '../../../public/components/pie-basic.png';
import ScatterBasic from '../../../public/components/scatter-basic.png';
import RadarBasic from '../../../public/components/radar-basic.png';
import BoxPlotBasic from '../../../public/components/box-plot.png';
import FunnelBasic from '../../../public/components/funnel-basic.png';
import GaugeBasic from '../../../public/components/gauge-basic.png';
import TreeMapBasic from '../../../public/components/tree-map-basic.png';
import SunBurstBasic from '../../../public/components/sub-burst-basic.png';
import PictorialBarBasic from '../../../public/components/pictorial-bar-basic.png';
import ParallelBarBasic from '../../../public/components/parallel-basic.png';
import CandlestickBasic from '../../../public/components/candlestick-basic.png';
import TitleBasic from '../../../public/components/title-basic.jpg';
import TimeMachineBasic from '../../../public/components/time-machine.jpg';
import CountUpNumberBasic from '../../../public/components/count-up-number.jpg';
import ImageBasic from '../../../public/components/image-basic.jpg';
import VideoBasic from '../../../public/components/video-basic.jpg';
import CarouselBasic from '../../../public/components/carousel-basic.jpg';
import WordCloudBasic from '../../../public/components/word-cloud.png';
import IframeBasic from '../../../public/components/iframe.jpg';
import ListBasic from '../../../public/components/list-basic.jpg';
import TabBasic from '../../../public/components/tab-basic.jpg';
import SelectBasic from '../../../public/components/select-basic.jpg';
import CachetBar from '../../../public/components/cachet-bar.png';
import CirclePie from '../../../public/components/circle-pie.png';
import ClockGauge from '../../../public/components/clock-gauge.png';
import HorizontalBar from '../../../public/components/horizontal-bar.png';
import LineBar from '../../../public/components/line-bar.png';
import NegativeBar from '../../../public/components/negative-bar.png';
import NightingalePie from '../../../public/components/nightingale-pie.png';
import PercentBar from '../../../public/components/percent-bar.png';
import ProgressBar from '../../../public/components/progress-bar.png';
import RadialBar from '../../../public/components/radial-bar.png';
import RadialLine from '../../../public/components/radial-line.png';
import RadialStackLine from '../../../public/components/radial-stack-line.png';
import RankBar from '../../../public/components/rank-bar.png';
import StackBar from '../../../public/components/stack-bar.png';
import Tree from '../../../public/components/tree.png';
import WaterFallBar from '../../../public/components/waterfall-bar.png';
import ZebraBar from '../../../public/components/zebra-bar.png';
import TextCarousel from '../../../public/components/text-carousel.jpg';
import Text from '../../../public/components/text.jpg';
import PercentPie from '../../../public/components/percent-pie.png';
import WaterBall from '../../../public/components/water-ball.png';
import ScatterMap from '../../../public/components/scatter-map.png';
import BubbleScatter from '../../../public/components/bubble-scatter.png';
import PolarBar from '../../../public/components/polar-bar.png';
import StepLine from '../../../public/components/step-line.png';
import CarouselText from '../../../public/components/carousel-text.jpg';
import Icon from '../../../public/components/icon.jpg';
import Steps from '../../../public/components/steps.jpg';
import Switch from '../../../public/components/switch.jpg';
import Input from '../../../public/components/input.jpg';
import Checkbox from '../../../public/components/checkbox.jpg';
import Radio from '../../../public/components/radio.jpg';
import StateCard from '../../../public/components/state-card.jpg';
import PictureWall from '../../../public/components/picture-wall.jpg';
import DatePicker from '../../../public/components/date-picker.jpg';
import PolarStackBar from '../../../public/components/polar-stack-bar.png';
import Rate from '../../../public/components/rate.jpg';
import StateList from '../../../public/components/state-list.jpg';
import Tag from '../../../public/components/tag.jpg';

const commonClass: string = classnames('ac-i-size-m');

export const COMPONENT_TYPE_LIST = [
  {
    type: 'chart',
    icon: <AreaChartOutlined className={classnames(commonClass)} />,
    title: '??????',
    children: [
      {
        type: 'bar',
        title: '?????????',
        children: [
          {
            type: 'BAR_BASIC',
            title: '???????????????',
            icon: BarBasic,
            description: '',
          },
          {
            type: 'RADIAL_BAR',
            title: '???????????????',
            icon: RadialBar,
            description: '',
          },
          {
            type: 'PROGRESS_BAR',
            title: '?????????',
            icon: ProgressBar,
            description: '',
          },
          {
            type: 'RANK_BAR',
            title: '??????',
            icon: RankBar,
            description: '',
          },
          {
            type: 'HORIZONTAL_BAR',
            title: '???????????????',
            icon: HorizontalBar,
            description: '',
          },
          {
            type: 'CACHET_BAR',
            title: '?????????',
            icon: CachetBar,
            description: '',
          },
          {
            type: 'STACK_BAR',
            title: '???????????????',
            icon: StackBar,
            description: '',
          },
          {
            type: 'NEGATIVE_BAR',
            title: '??????????????????',
            icon: NegativeBar,
            description: '',
          },
          {
            type: 'PERCENT_BAR',
            title: '???????????????',
            icon: PercentBar,
            description: '',
          },
          {
            type: 'LINE_BAR',
            title: '???????????????',
            icon: LineBar,
            description: '',
          },
          {
            type: 'ZEBRA_BAR',
            title: '?????????',
            icon: ZebraBar,
            description: '',
          },
          {
            type: 'WATER_FALL_BAR',
            title: '?????????',
            icon: WaterFallBar,
            description: '',
          },
          {
            type: 'POLAR_BAR',
            title: '??????????????????',
            icon: PolarBar,
            description: '',
          },
          {
            type: 'POLAR_STACK_BAR',
            title: '???????????????????????????',
            icon: PolarStackBar,
            description: '',
          },
        ],
      },
      {
        type: 'line',
        title: '?????????',
        children: [
          {
            type: 'LINE_BASIC',
            title: '???????????????',
            icon: LineBasic,
            description: '',
          },
          {
            type: 'RADIAL_LINE',
            title: '???????????????',
            icon: RadialLine,
            description: '',
          },
          {
            type: 'RADIAL_STACK_LINE',
            title: '?????????????????????',
            icon: RadialStackLine,
            description: '',
          },
          {
            type: 'STEP_LINE',
            title: '?????????',
            icon: StepLine,
            description: '',
          },
        ],
      },
      {
        type: 'pie',
        title: '??????',
        children: [
          {
            type: 'PIE_BASIC',
            title: '????????????',
            icon: PieBasic,
            description: '',
          },
          {
            type: 'NIGHTINGALE_PIE',
            title: '?????????',
            icon: NightingalePie,
            description: '',
          },
          {
            type: 'CIRCLE_PIE',
            title: '?????????',
            icon: CirclePie,
            description: '',
          },
          {
            type: 'PERCENT_PIE',
            title: '????????????',
            icon: PercentPie,
            description: '',
          },
        ],
      },
      {
        type: 'scatter',
        title: '?????????',
        children: [
          {
            type: 'SCATTER_BASIC',
            title: '???????????????',
            icon: ScatterBasic,
            description: '',
          },
          {
            type: 'BUBBLE_SCATTER',
            title: '???????????????',
            icon: BubbleScatter,
            description: '',
          },
        ],
      },
      {
        type: 'radar',
        title: '?????????',
        children: [
          {
            type: 'RADAR_BASIC',
            title: '???????????????',
            icon: RadarBasic,
            description: '',
          },
        ],
      },
      {
        type: 'box-plot',
        title: '?????????',
        children: [
          {
            type: 'BOX_PLOT_BASIC',
            title: '???????????????',
            icon: BoxPlotBasic,
            description: '',
          },
        ],
      },
      {
        type: 'funnel',
        title: '?????????',
        children: [
          {
            type: 'FUNNEL_BASIC',
            title: '???????????????',
            icon: FunnelBasic,
            description: '',
          },
        ],
      },
      {
        type: 'gauge',
        title: '?????????',
        children: [
          {
            type: 'GAUGE_BASIC',
            title: '???????????????',
            icon: GaugeBasic,
            description: '',
          },
          {
            type: 'CLOCK_GAUGE',
            title: '??????',
            icon: ClockGauge,
            description: '',
          },
        ],
      },
      {
        type: 'tree-map',
        title: '????????????',
        children: [
          {
            type: 'TREE_MAP_BASIC',
            title: '??????????????????',
            icon: TreeMapBasic,
            description: '',
          },
        ],
      },
      {
        type: 'sub-burst',
        title: '?????????',
        children: [
          {
            type: 'SUN_BURST_BASIC',
            title: '???????????????',
            icon: SunBurstBasic,
            description: '',
          },
        ],
      },
      {
        type: 'pictorial-bar',
        title: '?????????',
        children: [
          {
            type: 'PICTORIAL_BAR_BASIC',
            title: '????????????',
            icon: PictorialBarBasic,
            description: '',
          },
        ],
      },
      {
        type: 'parallel',
        title: '???????????????',
        children: [
          {
            type: 'PARALLEL_BASIC',
            title: '?????????????????????',
            icon: ParallelBarBasic,
            description: '',
          },
        ],
      },
      {
        type: 'candlestick',
        title: 'K??????',
        children: [
          {
            type: 'CANDLESTICK_BASIC',
            title: '??????K??????',
            icon: CandlestickBasic,
            description: '',
          },
        ],
      },
      {
        type: 'tree',
        title: '?????????',
        children: [
          {
            type: 'TREE_BASIC',
            title: '???????????????',
            icon: Tree,
            description: '',
          },
        ],
      },
    ],
  },
  {
    type: 'font',
    title: '??????',
    icon: <FontColorsOutlined className={classnames(commonClass)} />,
    children: [
      {
        type: 'text',
        title: '??????',
        children: [
          {
            type: 'TITLE',
            title: '??????',
            icon: TitleBasic,
            description: '',
          },
          {
            type: 'TEXT',
            title: '????????????',
            icon: Text,
            description: '',
          },
          {
            type: 'TIME_MACHINE',
            title: '?????????',
            icon: TimeMachineBasic,
            description: '',
          },
          {
            type: 'COUNT_UP_NUMBER',
            title: '???????????????',
            icon: CountUpNumberBasic,
            description: '',
          },
          {
            type: 'FONT_CAROUSEL',
            title: '?????????',
            icon: TextCarousel,
            description: '',
          },
          {
            type: 'LOOP_TEXT',
            title: '????????????',
            icon: CarouselText,
            description: '',
          },
          {
            type: 'ICON',
            title: '??????',
            icon: Icon,
            description: '',
          },
          {
            type: 'TAG',
            title: '??????',
            icon: Tag,
            description: '',
          },
        ],
      },
    ],
  },
  {
    type: 'media',
    title: '??????',
    icon: <FundProjectionScreenOutlined className={classnames(commonClass)} />,
    children: [
      {
        type: 'media',
        title: '??????',
        children: [
          {
            type: 'IMAGE',
            title: '??????',
            icon: ImageBasic,
            description: '',
          },
          {
            type: 'VIDEO',
            title: '??????',
            icon: VideoBasic,
            description: '',
          },
          {
            type: 'CAROUSEL',
            title: '?????????',
            icon: CarouselBasic,
            description: '',
          },
          {
            type: 'PICTURE_WALL',
            title: '?????????',
            icon: PictureWall,
            description: '',
          },
        ],
      },
    ],
  },
  {
    type: 'map',
    title: '??????',
    icon: <CompassOutlined className={classnames(commonClass)} />,
    children: [
      {
        type: 'map-basic',
        title: '????????????',
        children: [
          {
            type: 'SCATTER_MAP',
            title: '????????????',
            icon: ScatterMap,
            description: '',
          },
        ],
      },
    ],
  },
  {
    type: 'other',
    title: '??????',
    icon: <AppstoreOutlined className={classnames(commonClass)} />,
    children: [
      {
        type: 'other',
        title: '??????',
        children: [
          {
            type: 'WORD_CLOUD_BASIC',
            title: '??????',
            icon: WordCloudBasic,
            description: '',
          },
          {
            type: 'IFRAME',
            title: 'iframe',
            icon: IframeBasic,
            description: '',
          },
          {
            type: 'LIST',
            title: '??????',
            icon: ListBasic,
            description: '',
          },
          {
            type: 'WATER_BALL',
            title: '??????',
            icon: WaterBall,
            description: '',
          },
          {
            type: 'STATE_CARD',
            title: '????????????',
            icon: StateCard,
            description: '',
          },
          {
            type: 'STATE_LIST',
            title: '????????????',
            icon: StateList,
            description: '',
          },
        ],
      },
    ],
  },
  {
    type: 'interactive',
    title: '??????',
    icon: <InteractionOutlined className={classnames(commonClass)} />,
    children: [
      {
        type: 'interactive',
        title: '??????',
        children: [
          {
            type: 'TAB',
            title: 'Tab??????',
            icon: TabBasic,
            description: '',
          },
          {
            type: 'SELECT',
            title: '?????????',
            icon: SelectBasic,
            description: '',
          },
          {
            type: 'STEPS',
            title: '?????????',
            icon: Steps,
            description: '',
          },
          {
            type: 'SWITCH',
            title: '??????',
            icon: Switch,
            description: '',
          },
          {
            type: 'INPUT',
            title: '?????????',
            icon: Input,
            description: '',
          },
          {
            type: 'CHECKBOX',
            title: '??????',
            icon: Checkbox,
            description: '',
          },
          {
            type: 'RADIO',
            title: '??????',
            icon: Radio,
            description: '',
          },
          {
            type: 'DATE_PICKER',
            title: '????????????',
            icon: DatePicker,
            description: '',
          },
          {
            type: 'RATE',
            title: '??????',
            icon: Rate,
            description: '',
          },
        ],
      },
    ],
  },
];

export const COMPONENT_ONLY_TYPE_LIST = COMPONENT_TYPE_LIST.reduce<
  {
    type: string;
    title: string;
    description: string;
    icon: string;
  }[]
>((acc, cur) => {
  const { children } = cur;
  children.forEach((item) => {
    if (item.children) {
      item.children.forEach((item) => {
        acc.push(item);
      });
    }
  });
  return acc;
}, []);
